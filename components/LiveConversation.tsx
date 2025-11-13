
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, Modality, LiveSession, LiveServerMessage } from "@google/genai";

// Audio utility functions as per Gemini API guidelines
function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array) {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}


const MicIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>;
const StopIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>;

export default function LiveConversation() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState('Ready to connect');
  const [error, setError] = useState<string | null>(null);

  const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const outputSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const cleanUp = useCallback(() => {
    setIsActive(false);
    setIsConnecting(false);

    streamRef.current?.getTracks().forEach(track => track.stop());
    scriptProcessorRef.current?.disconnect();
    mediaStreamSourceRef.current?.disconnect();
    inputAudioContextRef.current?.close();
    outputAudioContextRef.current?.close();

    outputSourcesRef.current.forEach(source => source.stop());
    outputSourcesRef.current.clear();
    
    sessionPromiseRef.current = null;
    inputAudioContextRef.current = null;
    outputAudioContextRef.current = null;
    scriptProcessorRef.current = null;
    mediaStreamSourceRef.current = null;
    streamRef.current = null;
    nextStartTimeRef.current = 0;
  }, []);

  const stopConversation = useCallback(async () => {
    setStatus('Disconnecting...');
    if (sessionPromiseRef.current) {
        try {
            const session = await sessionPromiseRef.current;
            session.close();
        } catch (e) {
            console.error("Error closing session:", e);
        }
    }
    cleanUp();
    setStatus('Ready to connect');
  }, [cleanUp]);

  const startConversation = useCallback(async () => {
    setError(null);
    setIsConnecting(true);
    setStatus('Requesting permissions...');

    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      setStatus('Initializing...');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      sessionPromiseRef.current = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: 'You are a helpful and friendly assistant, acting as a guide for the Iniity.com Cognitive Fabric project.',
        },
        callbacks: {
          onopen: () => {
            setStatus('Connected. Start speaking.');
            setIsConnecting(false);
            setIsActive(true);
            
            const source = inputAudioContextRef.current!.createMediaStreamSource(streamRef.current!);
            mediaStreamSourceRef.current = source;
            
            const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              if (sessionPromiseRef.current) {
                sessionPromiseRef.current.then((session) => {
                  session.sendRealtimeInput({ media: pcmBlob });
                });
              }
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData.data;
            if (base64Audio && outputAudioContextRef.current) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContextRef.current.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContextRef.current, 24000, 1);
              const source = outputAudioContextRef.current.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputAudioContextRef.current.destination);
              source.addEventListener('ended', () => {
                outputSourcesRef.current.delete(source);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              outputSourcesRef.current.add(source);
            }
            if (message.serverContent?.interrupted) {
              outputSourcesRef.current.forEach(source => source.stop());
              outputSourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e: ErrorEvent) => {
            setError(`Connection error: ${e.message}`);
            stopConversation();
          },
          onclose: (e: CloseEvent) => {
            stopConversation();
          },
        }
      });

    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to start: ${message}`);
      setStatus('Failed to connect');
      cleanUp();
    }
  }, [stopConversation, cleanUp]);

  useEffect(() => {
    return () => {
        if (isActive || isConnecting) {
            stopConversation();
        }
    };
  }, [isActive, isConnecting, stopConversation]);


  const handleToggleConversation = () => {
    if (isActive || isConnecting) {
      stopConversation();
    } else {
      startConversation();
    }
  };

  const getStatusColor = () => {
    if (error) return 'text-red-400';
    if (isActive) return 'text-green-400';
    if (isConnecting) return 'text-yellow-400';
    return 'text-brand-text-secondary';
  }

  return (
    <div className="p-6 rounded-lg bg-brand-surface border border-brand-border">
      <div className="flex items-center space-x-3 mb-4">
          <MicIcon />
          <h2 className="text-xl font-bold text-white">Live Conversation (Powered by Gemini)</h2>
      </div>
      <p className="mb-4 text-brand-text-secondary">
        Engage in a real-time voice conversation with a Gemini-powered assistant to discuss the Iniity.com architecture.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button
            onClick={handleToggleConversation}
            disabled={isConnecting && !isActive}
            className={`flex items-center justify-center px-6 py-3 rounded-md font-bold transition-colors w-full sm:w-auto ${
                isActive 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-brand-primary hover:bg-brand-primary/80 text-brand-bg'
            } disabled:bg-brand-text-secondary disabled:cursor-not-allowed`}
        >
            {isConnecting && !isActive ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>Connecting...</span>
                </>
            ) : isActive ? (
                <>
                    <StopIcon />
                    <span className="ml-2">Stop Conversation</span>
                </>
            ) : (
                <>
                    <MicIcon />
                    <span className="ml-2">Start Conversation</span>
                </>
            )}
        </button>
        <div className="flex-grow text-center sm:text-left">
            <p className={`font-mono text-sm ${getStatusColor()}`}>{status}</p>
        </div>
      </div>

      {error && <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-md text-red-300 text-sm">{error}</div>}
    </div>
  );
}
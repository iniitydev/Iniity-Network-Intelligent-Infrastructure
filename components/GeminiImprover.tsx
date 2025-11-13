
import React, { useState } from 'react';
import { generateContent } from '../services/geminiService';
import { PILLARS, PRINCIPLES } from '../constants';

const ThumbsUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a2 2 0 0 1 1.79 1.11L15 5.88z"/></svg>;
const ZapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2z"></polygon></svg>;

export default function GeminiImprover() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const createSystemContext = () => {
    const principlesContext = `Foundational Principles:\n${PRINCIPLES.join('\n- ')}`;
    const pillarsContext = `Architectural Pillars:\n${PILLARS.map(p => `- ${p.name}: ${p.role} (Tech: ${p.coreTech})`).join('\n')}`;
    return `You are a world-class principal systems architect and AI strategist.
You are reviewing a visionary project called "Iniity.com Cognitive Fabric", which uses AuthO.iD for identity and is deployed on Ethr.Cloud.
Here is the high-level summary of its architecture:
${principlesContext}
\n${pillarsContext}
The user, the project's architect, has the following request for improvement, critique, or invention related to this system. Your response should be expert-level, insightful, and formatted using Markdown for clarity.`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setError('');
    setResponse('');
    
    const systemInstruction = createSystemContext();

    try {
      const result = await generateContent(query, systemInstruction);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  const suggestions = [
      "Identify potential security vulnerabilities in the AuthO.iD layer and suggest mitigations.",
      "How could the Ethr.Cloud fabric better support real-time data streams?",
      "How could we integrate a decentralized storage solution like IPFS into Iniity?",
      "Brainstorm an innovative feature for the SPATIAL (WHERE) pillar."
  ];

  return (
    <div className="p-6 rounded-lg bg-brand-surface border border-brand-border">
      <div className="flex items-center space-x-3 mb-4">
          <ZapIcon />
          <h2 className="text-xl font-bold text-white">Iniity Invention Engine (Powered by Gemini)</h2>
      </div>
      <p className="mb-4 text-brand-text-secondary">
        Critique, improve, and invent. Leverage Gemini to reason about the Iniity architecture and discover new possibilities.
      </p>

       <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestions.map((s, i) => (
                <button 
                    key={i} 
                    onClick={() => handleSuggestionClick(s)}
                    className="p-2 text-left text-sm bg-brand-bg hover:bg-brand-bg/50 border border-brand-border rounded-md transition-colors text-brand-text-secondary"
                >
                    {s}
                </button>
            ))}
        </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., 'What are the ethical implications of the PURPOSE (WHY) agent?'"
          className="w-full h-24 p-3 bg-brand-bg border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none font-mono text-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="mt-3 w-full sm:w-auto flex items-center justify-center px-6 py-2 bg-brand-primary text-brand-bg font-bold rounded-md disabled:bg-brand-text-secondary disabled:cursor-not-allowed hover:bg-brand-primary/80 transition-colors"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
             <>
                <ThumbsUpIcon />
                <span className="ml-2">Improve System</span>
             </>
          )}
        </button>
      </form>
      {error && <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-md text-red-300">{error}</div>}
      {response && (
        <div className="mt-6 p-4 bg-brand-bg border border-brand-border rounded-md">
            <h3 className="text-lg font-bold text-white mb-2">Architect's Analysis</h3>
            <div className="prose prose-invert max-w-none text-brand-text space-y-4" dangerouslySetInnerHTML={{ __html: response.replace(/\n/g, '<br />') }} />
        </div>
      )}
    </div>
  );
}
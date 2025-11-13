import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export async function generateContent(prompt: string, systemInstruction: string): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
                topP: 0.95,
            }
        });

        // Fix: Use the .text accessor as per the SDK guidelines and check for an empty response.
        const text = response.text;
        if (!text) {
          throw new Error("Received an empty response from the Gemini API.");
        }
        
        return text;
    } catch (error) {
        // Fix: Re-throw the error so it can be caught and handled by the calling component's UI logic.
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to get a response from Gemini. ${error.message}`);
        }
        throw new Error("An unknown error occurred while contacting the Gemini API.");
    }
}


import { GoogleGenAI, Type } from "@google/genai";

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

export async function generatePolicy(category: string, intent: string): Promise<string> {
    const systemInstruction = `You are a security policy expert for a sovereign cloud environment called 'desk.cx'.
Your task is to convert a user's natural language intent into a structured JSON policy.
The policy should be clear, secure by default, and adhere to the principle of least privilege.
The JSON output must strictly follow this schema. Do not add any commentary or markdown formatting. Only return the raw JSON object.
All string values in the JSON (like 'effect', 'principals', 'resources', 'actions') should be lowercase.
If a user is mentioned, format their identity as 'user:did'. For example, 'Alice' becomes 'user:alice'.
If a device is mentioned, format it as 'device:type'. For example, 'Laptop' becomes 'device:laptop'.
If an application or service is mentioned, format it as 'app:name'. For example, 'Git Server' becomes 'app:git-server'.`;

    const prompt = `Category: ${category}\nUser Intent: "${intent}"\n\nGenerate the JSON policy.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        policyId: { type: Type.STRING, description: "A unique identifier for the policy, e.g., 'policy-timestamp'." },
                        description: { type: Type.STRING, description: "A human-readable summary of the user's intent." },
                        effect: { type: Type.STRING, description: "The action to take if the conditions are met, either 'allow' or 'deny'." },
                        principals: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Array of identities (users, groups) the policy applies to. Use the format 'type:id', e.g., 'user:alice'." },
                        actions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Array of actions to be allowed or denied, e.g., ['connect', 'read', 'write']." },
                        resources: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Array of resources (apps, services) the policy targets. Use the format 'type:name', e.g., 'app:git-server'." },
                        conditions: { 
                            type: Type.ARRAY, 
                            items: { 
                                type: Type.OBJECT, 
                                properties: {
                                    key: { type: Type.STRING, description: "The condition to check, e.g., 'device:type', 'time:hour_of_day', 'auth:method'." },
                                    operator: { type: Type.STRING, description: "The comparison operator, e.g., 'is', 'is_not', 'greater_than', 'less_than', 'in'." },
                                    values: { type: Type.ARRAY, items: { type: Type.STRING }, description: "The value(s) to compare against." }
                                }
                            },
                            description: "Optional array of conditions that must be met for the policy to apply."
                        }
                    }
                }
            }
        });

        const jsonText = response.text;
        if (!jsonText) {
          throw new Error("Received an empty policy response from the Gemini API.");
        }
        
        // The API should return valid JSON, but we'll format it nicely for display
        const parsedJson = JSON.parse(jsonText);
        return JSON.stringify(parsedJson, null, 2);

    } catch (error) {
        console.error("Error calling Gemini API for policy generation:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate policy. ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating the policy.");
    }
}

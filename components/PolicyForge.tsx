
import React, { useState } from 'react';
import { generatePolicy } from '../services/geminiService';
import { POLICY_FORGE_SUGGESTIONS } from '../constants';

const ForgeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 12h.01"/><path d="M12 12h.01"/><path d="M9 12h.01"/><path d="M4.5 10.5c-2.5 1.2-2.5 4.8 0 6"/><path d="m19.5 10.5c2.5 1.2 2.5 4.8 0 6"/><path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9Z"/></svg>;
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;

export default function PolicyForge() {
  const [category, setCategory] = useState('Device Access');
  const [intent, setIntent] = useState('');
  const [policy, setPolicy] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intent.trim() || isLoading) return;

    setIsLoading(true);
    setError('');
    setPolicy('');
    
    try {
      const result = await generatePolicy(category, intent);
      setPolicy(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(policy).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setIntent(suggestion);
  };

  const categories = ["Device Access", "Application Permissions", "Data Sharing", "Network Rules", "Time-based Access"];

  return (
    <div className="p-6 rounded-lg bg-brand-surface border border-brand-border h-full flex flex-col">
      <div className="flex items-center space-x-3 mb-4">
          <ForgeIcon />
          <h2 className="text-xl font-bold text-white">Policy Forge (Powered by Gemini)</h2>
      </div>
      <p className="mb-4 text-brand-text-secondary">
        Translate natural language intent into structured, verifiable security policies for your network.
      </p>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
        {POLICY_FORGE_SUGGESTIONS.slice(0, 2).map((s, i) => (
            <button 
                key={i} 
                onClick={() => handleSuggestionClick(s)}
                className="p-2 text-left text-sm bg-brand-bg hover:bg-brand-bg/50 border border-brand-border rounded-md transition-colors text-brand-text-secondary"
            >
                {s}
            </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
        <div className="mb-3">
            <label htmlFor="category-select" className="block text-xs font-mono text-brand-text-secondary mb-1">Policy Category</label>
            <select
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 bg-brand-bg border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none font-mono text-sm"
            >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </div>
        <textarea
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          placeholder="e.g., 'Deny all access from revoked devices.'"
          className="w-full h-24 p-3 bg-brand-bg border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none font-mono text-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !intent.trim()}
          className="mt-3 w-full sm:w-auto flex items-center justify-center px-6 py-2 bg-brand-secondary text-white font-bold rounded-md disabled:bg-brand-text-secondary disabled:cursor-not-allowed hover:bg-brand-secondary/80 transition-colors"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Forging...
            </>
          ) : (
             "Forge Policy"
          )}
        </button>
      
        {error && <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-md text-red-300">{error}</div>}

        {policy && (
            <div className="mt-4 relative bg-brand-bg border border-brand-border rounded-md flex-grow">
                <div className="p-2 flex justify-between items-center border-b border-brand-border">
                    <h3 className="text-sm font-bold text-white font-mono">Generated Policy</h3>
                    <button onClick={handleCopy} className="flex items-center space-x-2 px-2 py-1 text-xs bg-brand-surface hover:bg-brand-border rounded">
                        <CopyIcon />
                        <span>{copySuccess ? 'Copied!' : 'Copy JSON'}</span>
                    </button>
                </div>
                <pre className="text-xs text-brand-text font-mono whitespace-pre-wrap p-3 overflow-auto h-full max-h-80">
                    <code>{policy}</code>
                </pre>
            </div>
        )}
      </form>
    </div>
  );
}

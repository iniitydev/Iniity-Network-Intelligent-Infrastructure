
import React, { useState, useMemo, useEffect } from 'react';
import { INIITY_EVENTS_DATASET } from '../constants';

const ResetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M21 21v-5h-5"></path></svg>;

export default function AuditStream() {
  const [filters, setFilters] = useState({ type: '', agent: '', payload: '' });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // Debounce filter inputs to avoid re-rendering on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({ type: '', agent: '', payload: '' });
  };

  const displayedEvents = useMemo(() => {
    return INIITY_EVENTS_DATASET.filter(event => {
      const typeMatch = debouncedFilters.type ? event.type.toLowerCase().includes(debouncedFilters.type.toLowerCase()) : true;
      const agentMatch = debouncedFilters.agent ? event.who.did.toLowerCase().includes(debouncedFilters.agent.toLowerCase()) : true;
      const payloadMatch = debouncedFilters.payload ? JSON.stringify(event.payload).toLowerCase().includes(debouncedFilters.payload.toLowerCase()) : true;
      return typeMatch && agentMatch && payloadMatch;
    });
  }, [debouncedFilters]);

  return (
    <div className="p-6 rounded-lg bg-brand-surface border border-brand-border">
      <h2 className="text-xl font-bold text-white mb-2">Audit Stream</h2>
      <p className="mb-4 text-brand-text-secondary">
        Analyze the immutable stream of `IniityEvents` from your personal network. Filters update automatically as you type.
      </p>

      {/* Filter Controls */}
      <div className="p-4 bg-brand-bg rounded-lg border border-brand-border mb-4">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-grow" style={{minWidth: '150px'}}>
            <label htmlFor="type-filter" className="block text-xs font-mono text-brand-text-secondary mb-1">Filter by Type</label>
            <input
              id="type-filter"
              type="text"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              placeholder="e.g., firewall.block"
              className="w-full p-2 bg-brand-surface border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none font-mono text-sm"
            />
          </div>
          <div className="flex-grow" style={{minWidth: '150px'}}>
            <label htmlFor="agent-filter" className="block text-xs font-mono text-brand-text-secondary mb-1">Filter by Agent DID</label>
            <input
              id="agent-filter"
              type="text"
              name="agent"
              value={filters.agent}
              onChange={handleFilterChange}
              placeholder="e.g., policy-agent"
              className="w-full p-2 bg-brand-surface border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none font-mono text-sm"
            />
          </div>
          <div className="flex-grow" style={{minWidth: '150px'}}>
            <label htmlFor="payload-filter" className="block text-xs font-mono text-brand-text-secondary mb-1">Filter by Payload</label>
            <input
              id="payload-filter"
              type="text"
              name="payload"
              value={filters.payload}
              onChange={handleFilterChange}
              placeholder="e.g., .wasm"
              className="w-full p-2 bg-brand-surface border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none font-mono text-sm"
            />
          </div>
          <button onClick={resetFilters} title="Reset Filters" className="flex-shrink-0 flex items-center justify-center px-3 py-2 bg-brand-border text-brand-text font-bold rounded-md hover:bg-brand-text-secondary/50 transition-colors text-sm">
            <ResetIcon />
          </button>
        </div>
      </div>
      
      <p className="text-sm text-brand-text-secondary mb-2 font-mono">
        Displaying {displayedEvents.length} of {INIITY_EVENTS_DATASET.length} events.
      </p>

      <div className="bg-brand-bg p-2 rounded-md overflow-hidden h-96 overflow-y-auto space-y-4">
        {displayedEvents.length > 0 ? (
          displayedEvents.map(event => (
            <div key={event.id} className="bg-brand-surface p-3 rounded border border-brand-border">
              <pre className="text-xs text-brand-text font-mono whitespace-pre-wrap">
                <code>{JSON.stringify(event, null, 2)}</code>
              </pre>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-brand-text-secondary">
            <p>No events match the current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

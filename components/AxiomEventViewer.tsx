
import React from 'react';
import { AXIOM_EVENT_JSON } from '../constants';

export default function AxiomEventViewer() {
  return (
    <div className="p-6 rounded-lg bg-brand-surface border border-brand-border">
      <h2 className="text-xl font-bold text-white mb-4">Core Ontology: The IniityEvent</h2>
      <p className="mb-4 text-brand-text-secondary">
        The atomic unit of cognition. Every perception, intention, and action is an immutable, verifiable, and multi-dimensional event.
      </p>
      <div className="bg-brand-bg p-4 rounded-md overflow-x-auto">
        <pre className="text-sm text-brand-text font-mono whitespace-pre-wrap">
          <code>{AXIOM_EVENT_JSON}</code>
        </pre>
      </div>
    </div>
  );
}
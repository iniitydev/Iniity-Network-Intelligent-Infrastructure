
import React from 'react';
import { PRINCIPLES } from '../constants';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-brand-primary">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export default function Principles() {
  return (
    <div className="p-6 rounded-lg bg-brand-surface border border-brand-border">
      <h2 className="text-xl font-bold text-white mb-4">Foundational Principles</h2>
      <ul className="space-y-3">
        {PRINCIPLES.map((principle, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon />
            <span className="ml-3 text-brand-text">{principle}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

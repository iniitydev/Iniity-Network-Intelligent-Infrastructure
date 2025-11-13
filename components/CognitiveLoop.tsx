
import React from 'react';

const loopSteps = [
  { name: 'Observe', description: 'Sense agents emit raw AxiomEvents' },
  { name: 'Orient', description: 'Purpose Agent validates against goals' },
  { name: 'Decide', description: 'Planning Agent generates workflow' },
  { name: 'Act', description: 'Action Agents execute steps' },
  { name: 'Log', description: 'Actions emit new events, closing loop' }
];

export default function CognitiveLoop() {
  return (
    <div className="p-6 rounded-lg bg-brand-surface border border-brand-border">
      <h2 className="text-xl font-bold text-white mb-4">Cognitive Loop (OODAL)</h2>
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 border-2 border-dashed border-brand-border rounded-full animate-spin-slow"></div>
        </div>
        <div className="space-y-3 relative z-10">
            {loopSteps.map((step, index) => (
                <div key={step.name} className="flex items-center">
                    <div className="flex-shrink-0 bg-brand-primary text-brand-bg rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        {index + 1}
                    </div>
                    <div className="ml-3">
                        <p className="font-semibold text-white">{step.name}</p>
                        <p className="text-sm text-brand-text-secondary">{step.description}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

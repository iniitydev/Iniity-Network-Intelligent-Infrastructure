
import React, { useState } from 'react';
import { PILLARS } from '../constants';
import { Pillar } from '../types';

const PillarCard: React.FC<{ pillar: Pillar; isSelected: boolean; onSelect: () => void }> = ({ pillar, isSelected, onSelect }) => (
    <div 
      className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${isSelected ? 'bg-brand-primary/10 border-brand-primary' : 'bg-brand-surface/50 border-brand-border hover:border-brand-text-secondary'}`}
      onClick={onSelect}
    >
        <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${isSelected ? 'text-brand-primary' : 'text-brand-text-secondary'}`}>
                {pillar.icon}
            </div>
            <h3 className="text-md font-bold text-white">{pillar.name}</h3>
        </div>
    </div>
);

const PillarDetail: React.FC<{ pillar: Pillar }> = ({ pillar }) => (
    <div className="mt-4 p-4 bg-brand-surface/50 rounded-lg border border-brand-border animate-fade-in">
        <p className="text-lg font-semibold text-white mb-3">{pillar.role}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
                <p className="font-semibold text-brand-text-secondary">Core Tech</p>
                <p className="text-brand-text font-mono">{pillar.coreTech}</p>
            </div>
            <div>
                <p className="font-semibold text-brand-text-secondary">Data Layer</p>
                <p className="text-brand-text font-mono">{pillar.dataLayer}</p>
            </div>
            <div className="sm:col-span-2">
                <p className="font-semibold text-brand-text-secondary">Agent Type</p>
                <p className="text-brand-text font-mono">{pillar.agentType}</p>
            </div>
        </div>
    </div>
);

export default function Pillars() {
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(PILLARS[0]);

  return (
    <div className="p-6 rounded-lg bg-brand-surface border border-brand-border">
      <h2 className="text-xl font-bold text-white mb-4">The 6 Pillars of Axiom</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PILLARS.map((pillar) => (
          <PillarCard 
            key={pillar.name} 
            pillar={pillar} 
            isSelected={selectedPillar?.name === pillar.name}
            onSelect={() => setSelectedPillar(pillar)}
          />
        ))}
      </div>
      {selectedPillar && <PillarDetail pillar={selectedPillar} />}
    </div>
  );
}


import React, { useState } from 'react';
import { ROADMAP_PHASES } from '../constants';
import { PhaseStatus } from '../types';

const statusColors: Record<PhaseStatus, string> = {
  [PhaseStatus.NotStarted]: 'bg-gray-500',
  [PhaseStatus.InProgress]: 'bg-yellow-500',
  [PhaseStatus.Completed]: 'bg-green-500',
};

export default function Roadmap() {
  const [statuses, setStatuses] = useState<Record<number, PhaseStatus>>(() => {
    const initialStatuses: Record<number, PhaseStatus> = {};
    ROADMAP_PHASES.forEach(p => initialStatuses[p.phase] = PhaseStatus.NotStarted);
    return initialStatuses;
  });

  const toggleStatus = (phase: number) => {
    setStatuses(prev => {
      const current = prev[phase];
      let next: PhaseStatus;
      if (current === PhaseStatus.NotStarted) next = PhaseStatus.InProgress;
      else if (current === PhaseStatus.InProgress) next = PhaseStatus.Completed;
      else next = PhaseStatus.NotStarted;
      return { ...prev, [phase]: next };
    });
  };

  return (
    <div className="p-6 rounded-lg bg-brand-surface border border-brand-border">
      <h2 className="text-xl font-bold text-white mb-4">Phased Build Roadmap</h2>
      <div className="space-y-6">
        {ROADMAP_PHASES.map((p) => (
          <div key={p.phase} className="flex flex-col sm:flex-row items-start sm:items-center">
            <div className="flex-shrink-0 flex items-center mb-2 sm:mb-0">
              <div className="bg-brand-secondary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-4">
                {p.phase}
              </div>
              <button 
                onClick={() => toggleStatus(p.phase)}
                className={`px-3 py-1 text-xs font-semibold rounded-full text-white transition-colors ${statusColors[statuses[p.phase]]}`}
              >
                {statuses[p.phase]}
              </button>
            </div>
            <div className="sm:ml-4 flex-grow">
              <p className="font-bold text-white">{p.goal}</p>
              <p className="text-sm text-brand-text-secondary">
                <span className="font-semibold">Deliverable:</span> {p.deliverable}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

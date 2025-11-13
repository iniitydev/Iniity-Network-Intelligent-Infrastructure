
import React, { useState } from 'react';
import Header from './components/Header';
import Principles from './components/Principles';
import Pillars from './components/Pillars';
import CognitiveLoop from './components/CognitiveLoop';
import AxiomEventViewer from './components/AxiomEventViewer';
import RepoStructure from './components/RepoStructure';
import Roadmap from './components/Roadmap';
import GeminiImprover from './components/GeminiImprover';
import LiveConversation from './components/LiveConversation';
import AIGuidedTour from './components/AIGuidedTour';
import { TOUR_STEPS } from './constants';
import DataOrchestrator from './components/DataOrchestrator';

export default function App() {
  const [isTourActive, setIsTourActive] = useState(false);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-brand-bg">
      <div className="max-w-7xl mx-auto space-y-8">
        <div id="header-section">
          <Header onStartTour={() => setIsTourActive(true)} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div id="principles-section"><Principles /></div>
            <div id="pillars-section"><Pillars /></div>
            <div id="axiomevent-section"><AxiomEventViewer /></div>
          </div>
          <div className="space-y-8">
            <div id="loop-section"><CognitiveLoop /></div>
            <div id="repo-section"><RepoStructure /></div>
          </div>
        </div>

        <div id="orchestrator-section"><DataOrchestrator /></div>

        <div id="roadmap-section"><Roadmap /></div>
        
        <div id="live-section"><LiveConversation /></div>
        
        <div id="improver-section"><GeminiImprover /></div>

        <footer className="text-center text-brand-text-secondary text-sm py-8">
          Built as a sovereign cognitive operating system planner.
        </footer>
      </div>
      {isTourActive && <AIGuidedTour steps={TOUR_STEPS} onComplete={() => setIsTourActive(false)} />}
    </div>
  );
}

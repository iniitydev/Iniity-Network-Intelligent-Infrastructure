
import React, { useState } from 'react';
import Header from './components/Header';
import Pillars from './components/Pillars';
import AuditStream from './components/AuditStream';
import RepoStructure from './components/RepoStructure';
import Roadmap from './components/Roadmap';
import GeminiImprover from './components/GeminiImprover';
import LiveConversation from './components/LiveConversation';
import AIGuidedTour from './components/AIGuidedTour';
import { TOUR_STEPS } from './constants';
import DeskCXDashboard from './components/DeskCXDashboard';
import Principles from './components/Principles';
import CognitiveLoop from './components/CognitiveLoop';
import PolicyForge from './components/PolicyForge';
import SystemHealth from './components/SystemHealth';

export default function App() {
  const [isTourActive, setIsTourActive] = useState(false);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-brand-bg">
      <div className="max-w-7xl mx-auto space-y-8">
        <div id="header-section">
          <Header onStartTour={() => setIsTourActive(true)} />
        </div>
        
        <div id="system-health-section">
            <SystemHealth />
        </div>

        {/* Main Content is now the DeskCXDashboard */}
        <div id="desk-cx-dashboard-section">
          <DeskCXDashboard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div id="improver-section"><GeminiImprover /></div>
            <div id="policy-forge-section"><PolicyForge /></div>
        </div>
        
        <div id="audit-stream-section"><AuditStream /></div>

        <div id="live-section"><LiveConversation /></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-brand-border">
          <div id="pillars-section" className="lg:col-span-2"><Pillars /></div>
          <div className="space-y-8">
            <div id="repo-section"><RepoStructure /></div>
            <div id="roadmap-section"><Roadmap /></div>
            <div id="principles-section"><Principles /></div>
            <div id="cognitive-loop-section"><CognitiveLoop /></div>
          </div>
        </div>


        <footer className="text-center text-brand-text-secondary text-sm py-8 font-mono">
          Powered by Iniity.com | Deployed on Ethr.Cloud | Secured by AuthO.iD
        </footer>
      </div>
      {isTourActive && <AIGuidedTour steps={TOUR_STEPS} onComplete={() => setIsTourActive(false)} />}
    </div>
  );
}

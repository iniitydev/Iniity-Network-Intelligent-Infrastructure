
import React from 'react';

const GuideIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="m19 19-7-7 7-7"/></svg>;

export default function Header({ onStartTour }: { onStartTour: () => void }) {
  return (
    <header className="text-center p-4 rounded-lg bg-brand-surface border border-brand-border relative">
      <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
        desk.cx
      </h1>
      <h2 className="text-xl sm:text-2xl font-medium text-brand-text-secondary tracking-tight">
        Sovereign Desktop by <span className="text-white">Iniity.com</span>
      </h2>
      <p className="mt-4 text-lg text-brand-text-secondary max-w-3xl mx-auto">
        Your personal cloud, unified and secured. Manage your <b className="text-brand-text">Identity, Devices, Applications, and Data</b> from a single, sovereign control plane.
      </p>
      <button 
        onClick={onStartTour}
        className="mt-4 inline-flex items-center justify-center px-5 py-2 bg-brand-secondary/80 text-white font-bold rounded-md hover:bg-brand-secondary transition-colors"
      >
        <GuideIcon />
        <span className="ml-2">Start Guided Tour</span>
      </button>
    </header>
  );
}

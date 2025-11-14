
import React, { useState, useEffect } from 'react';

const HealthIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.2 7.8a4.5 4.5 0 0 0-5.4 0l-1.8 1.8-1.8-1.8a4.5 4.5 0 0 0-6.4 6.4l1.8 1.8 6.4 6.4 6.4-6.4 1.8-1.8a4.5 4.5 0 0 0 0-6.4Z"/><path d="m5 8 3-3"/><path d="m9 8 3-3"/></svg>;
const NetworkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/><path d="M10 16v-4"/><path d="M13 12h-2"/><path d="M22 12h-2"/><path d="M17 12h-2"/><path d="M20 18a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2Z"/></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const ServerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>;

const HealthMetric = ({ icon, label, value, unit, statusColor = 'text-green-400' }: { icon: React.ReactNode, label: string, value: string, unit: string, statusColor?: string }) => (
    <div className="flex items-center space-x-3 bg-brand-surface/50 p-3 rounded-lg">
        <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-brand-bg border border-brand-border ${statusColor}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-brand-text-secondary">{label}</p>
            <p className="font-mono text-lg text-white font-bold">
                {value} <span className="text-sm font-sans font-normal text-brand-text-secondary">{unit}</span>
            </p>
        </div>
    </div>
);

export default function SystemHealth() {
    const [gossipRate, setGossipRate] = useState(85);
    const [apiTraffic, setApiTraffic] = useState(1.2);

    useEffect(() => {
        const interval = setInterval(() => {
            setGossipRate(prev => Math.max(20, Math.min(150, prev + (Math.random() - 0.5) * 10)));
            setApiTraffic(prev => Math.max(0.5, Math.min(3.0, prev + (Math.random() - 0.5) * 0.2)));
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-6 rounded-lg bg-brand-surface border border-brand-border">
            <div className="flex items-center space-x-3 mb-4">
                <div className="relative flex items-center justify-center">
                    <span className="absolute w-3 h-3 rounded-full bg-green-400 animate-ping"></span>
                    <span className="relative w-3 h-3 rounded-full bg-green-500"></span>
                </div>
                <h2 className="text-xl font-bold text-white">System Health: <span className="text-green-400">All Systems Operational</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <HealthMetric icon={<ShieldIcon />} label="Device Attestations" value="4 / 4" unit="Active" />
                <HealthMetric icon={<NetworkIcon />} label="P2P Gossip Rate" value={gossipRate.toFixed(0)} unit="msgs/sec" />
                <HealthMetric icon={<ServerIcon />} label="API Gateway Traffic" value={apiTraffic.toFixed(1)} unit="k reqs/min" />
                <HealthMetric icon={<HealthIcon />} label="Network Latency" value="12" unit="ms avg" />
            </div>
        </div>
    );
}

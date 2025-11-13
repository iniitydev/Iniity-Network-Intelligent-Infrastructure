
import React, { useState } from 'react';

// Icons for different domains and data sources
const EarthIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
const InternetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const MetaverseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line><path d="M15 13.5v-2.5a2 2 0 0 0-4 0v2.5"></path><path d="M15 13.5a2 2 0 1 1-4 0"></path></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;

const TOTAL_STORAGE_TB = 100;

const dataSources = {
    earth: [
        { name: "OpenStreetMap (Europe)", size: 65, description: "Detailed global vector data including roads, buildings, and land use. We will start with a regional extract.", source: "geofabrik.de" },
        { name: "Natural Earth", size: 0.5, description: "Global cultural and physical vector data at various scales.", source: "naturalearthdata.com" },
        { name: "SRTM 30m Elevation", size: 15, description: "Near-global digital elevation model (DEM). Essential for terrain analysis.", source: "AWS Open Data" },
        { name: "GADM Boundaries", size: 1, description: "High-resolution administrative boundaries for all countries.", source: "gadm.org" },
    ],
    internet: [
        { name: "CAIDA AS Relationships", size: 0.1, description: "Dataset of relationships between Autonomous Systems (AS), forming the internet's backbone topology.", source: "caida.org" },
        { name: "MaxMind GeoLite2", size: 0.1, description: "IP geolocation database to map IP addresses to physical locations.", source: "maxmind.com" },
        { name: "Common Crawl (Sample)", size: 10, description: "A petabyte-scale web crawl. We will process a small, recent sample to build a web graph.", source: "commoncrawl.org" },
    ],
    metaverse: [
        { name: "Decentraland Parcel/Estate Data", size: 0.2, description: "Ownership and coordinates of land parcels from the Ethereum blockchain.", source: "On-chain via Etherscan" },
        { name: "VRChat World Index (Sample)", size: 1, description: "Scraped public data about worlds, instances, and portals.", source: "VRChat API" },
    ]
};

const DataDomainCard = ({ title, icon, sources, onIngest, ingestedSize }: { title: string, icon: React.ReactNode, sources: any[], onIngest: (size: number) => void, ingestedSize: number }) => (
    <div className="bg-brand-bg p-4 rounded-lg border border-brand-border">
        <div className="flex items-center space-x-3 mb-3">
            {icon}
            <h3 className="text-lg font-bold text-white">{title} Twin</h3>
        </div>
        <div className="space-y-2">
            {sources.map(source => (
                <div key={source.name} className="p-3 bg-brand-surface/50 rounded-md border border-brand-border/50">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-brand-text">{source.name}</p>
                            <p className="text-xs text-brand-text-secondary">{source.description}</p>
                        </div>
                        <button 
                            onClick={() => onIngest(source.size)}
                            className="ml-2 flex-shrink-0 flex items-center space-x-1.5 px-3 py-1 bg-brand-primary/10 border border-brand-primary/50 text-brand-primary text-xs font-bold rounded-md hover:bg-brand-primary/20 transition-colors"
                        >
                            <DownloadIcon />
                            <span>Ingest ({source.size} TB)</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default function DataOrchestrator() {
    const [ingestedStorage, setIngestedStorage] = useState(0);

    const handleIngest = (size: number) => {
        setIngestedStorage(prev => Math.min(TOTAL_STORAGE_TB, prev + size));
    };

    const percentageUsed = (ingestedStorage / TOTAL_STORAGE_TB) * 100;

    return (
        <div className="p-6 rounded-lg bg-brand-surface border border-brand-border">
            <h2 className="text-xl font-bold text-white mb-2">Digital Twin Data Orchestrator</h2>
            <p className="mb-4 text-brand-text-secondary">
                This is the control center for populating the digital twin. Each action simulates running an ingestion script that loads a foundational dataset into the <b className="text-brand-text">Ethr.Cloud</b> system's data layers.
            </p>

            <div className="mb-6 p-4 bg-brand-bg rounded-lg">
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-mono text-sm text-brand-text-secondary">Storage Capacity</h4>
                    <span className="font-mono text-sm text-white">{ingestedStorage.toFixed(2)} / {TOTAL_STORAGE_TB} TB</span>
                </div>
                <div className="w-full bg-brand-border rounded-full h-2.5">
                    <div 
                        className="bg-gradient-to-r from-brand-secondary to-brand-primary h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${percentageUsed}%` }}
                    ></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <DataDomainCard title="Physical Earth" icon={<EarthIcon />} sources={dataSources.earth} onIngest={handleIngest} ingestedSize={0} />
                <DataDomainCard title="Logical Internet" icon={<InternetIcon />} sources={dataSources.internet} onIngest={handleIngest} ingestedSize={0} />
                <DataDomainCard title="Virtual Metaverse" icon={<MetaverseIcon />} sources={dataSources.metaverse} onIngest={handleIngest} ingestedSize={0} />
            </div>
        </div>
    );
}
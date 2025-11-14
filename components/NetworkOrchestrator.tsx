
import React, { useState, useRef, useEffect, useMemo } from 'react';

// Icons
const VmIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect><line x1="2" y1="8" x2="22" y2="8"></line><line x1="7" y1="4" x2="7" y2="6"></line><line x1="17" y1="4" x2="17" y2="6"></line></svg>;
const LxcIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.56 18.24l-1.42 1.42a2 2 0 0 1-2.82 0l-1.42-1.42a2 2 0 0 0-2.82 0l-1.42 1.42a2 2 0 0 1-2.82 0l-1.42-1.42a2 2 0 0 0-2.82 0L2 20.4l-2-2 1.42-1.42a2 2 0 0 0 0-2.82L0 12.74l2-2 1.42 1.42a2 2 0 0 0 2.82 0l1.42-1.42a2 2 0 0 1 2.82 0l1.42 1.42a2 2 0 0 0 2.82 0l1.42-1.42a2 2 0 0 1 2.82 0l1.42 1.42a2 2 0 0 0 2.82 0L22 10.92l2 2-1.42 1.42a2 2 0 0 0 0 2.82z"></path><path d="M12 12h.01"></path></svg>;
const WasmIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
const DeployIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>;
const NetworkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"></circle><circle cx="19" cy="12" r="3"></circle><circle cx="5" cy="12" r="3"></circle><circle cx="12" cy="19" r="3"></circle><path d="M12 8v8"></path><path d="M16.24 13.76l-4.48 4.48"></path><path d="M7.76 13.76l4.48 4.48"></path><path d="M16.24 10.24l-4.48-4.48"></path><path d="M7.76 10.24l4.48-4.48"></path></svg>;
const ChurnIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v2"/><path d="M8 4H6a2 2 0 0 0-2 2v2"/><path d="M12 12v6"/><path d="M12 6v2"/><path d="M8 20H6a2 2 0 0 1-2-2v-2"/><path d="M16 20h2a2 2 0 0 0 2-2v-2"/><path d="m15 12-3-3-3 3"/><path d="m9 12 3 3 3-3"/></svg>;
const LogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 12h6"/><path d="M10 16h4"/><path d="M10 8h8"/><path d="M3 4h18"/><path d="M3 20h18"/><path d="m4 12 4-4-4-4"/></svg>;
const DnsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.4 6.6a.6.6 0 0 0-.8 0L14 9.2a.6.6 0 0 1-.8 0l-2.6-2.6a.6.6 0 0 0-.8 0l-2.6 2.6a.6.6 0 0 1-.8 0L4.2 7.4a.6.6 0 0 0-.8 0l-2 2a.6.6 0 0 0 0 .8l2.6 2.6a.6.6 0 0 1 0 .8l-2.6 2.6a.6.6 0 0 0 0 .8l2 2a.6.6 0 0 0 .8 0l2.6-2.6a.6.6 0 0 1 .8 0l2.6 2.6a.6.6 0 0 0 .8 0l2.6-2.6a.6.6 0 0 1 .8 0l2.6 2.6a.6.6 0 0 0 .8 0l2-2a.6.6 0 0 0 0-.8l-2.6-2.6a.6.6 0 0 1 0-.8l2.6-2.6a.6.6 0 0 0 0-.8l-2-2a.6.6 0 0 0-.8 0z"/></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;


const workloads = {
    vm: [ { id: 'vm-1', name: "Dev Server", description: "Fully isolated Ubuntu 24.04 environment.", resources: "2 vCPU, 4GB RAM" } ],
    lxc: [
        { id: 'lxc-1', name: "Photo Backup Service", description: "Lightweight container for image processing.", resources: "1 vCPU, 1GB RAM" },
        { id: 'lxc-2', name: "Git Server", description: "Private Git repository hosting.", resources: "0.5 vCPU, 512MB RAM" },
    ],
    wasm: [ { id: 'wasm-1', name: "Image Resizer", description: "Ephemeral function for on-demand image resizing.", resources: "Shared CPU, 128MB RAM" } ]
};

type DeviceStatus = 'Online' | 'Offline' | 'Syncing';
type ConnectionType = 'Wi-Fi Direct' | 'BLE';

interface Device {
    id: string;
    name: string;
    did: string;
    status: DeviceStatus;
    connection: ConnectionType;
    lastSeen: number;
}

interface DeployedService {
    id: string;
    name: string;
    type: 'VM' | 'LXC' | 'WASM';
    deviceId: string;
    deviceName: string;
    identityDns: string;
}

interface DnsRecord {
    name: string;
    type: 'A' | 'AAAA' | 'TXT';
    ttl: number;
    value: string;
    stale: boolean;
}

const initialDevices: Device[] = [
    { id: 'laptop-alice', name: 'Laptop', did: 'did:autho:device:laptop-alice', status: 'Online', connection: 'Wi-Fi Direct', lastSeen: Date.now() },
    { id: 'phone-alice', name: 'Phone', did: 'did:autho:device:phone-alice', status: 'Online', connection: 'Wi-Fi Direct', lastSeen: Date.now() },
    { id: 'server-alice', name: 'Home Server', did: 'did:autho:device:server-alice', status: 'Online', connection: 'BLE', lastSeen: Date.now() },
];

const WorkloadCard = ({ title, icon, workloads, onDeploy }: { title: string, icon: React.ReactNode, workloads: any[], onDeploy: (workload: any) => void }) => (
    <div className="bg-brand-bg p-4 rounded-lg border border-brand-border">
        <div className="flex items-center space-x-3 mb-3">
            {icon}
            <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        <div className="space-y-2">
            {workloads.map(workload => (
                <div key={workload.id} className="p-3 bg-brand-surface/50 rounded-md border border-brand-border/50">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-brand-text">{workload.name}</p>
                            <p className="text-xs text-brand-text-secondary">{workload.description}</p>
                            <p className="text-xs text-brand-primary font-mono mt-1">{workload.resources}</p>
                        </div>
                        <button
                            onClick={() => onDeploy(workload)}
                            className="ml-2 flex-shrink-0 flex items-center space-x-1.5 px-3 py-1 bg-brand-primary/10 border border-brand-primary/50 text-brand-primary text-xs font-bold rounded-md hover:bg-brand-primary/20 transition-colors"
                        >
                            <DeployIcon />
                            <span>Deploy</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const StatusBadge: React.FC<{ status: DeviceStatus }> = ({ status }) => {
    const statusConfig = {
        Online: { color: 'bg-green-500', text: 'Online' },
        Offline: { color: 'bg-gray-500', text: 'Offline' },
        Syncing: { color: 'bg-yellow-500 animate-pulse', text: 'Syncing...' },
    };
    const config = statusConfig[status];
    return (
        <span className={`w-2.5 h-2.5 rounded-full mr-2 ${config.color}`}></span>
    );
};

export default function NetworkOrchestrator() {
    const [deployedServices, setDeployedServices] = useState<DeployedService[]>([]);
    const [devices, setDevices] = useState<Device[]>(initialDevices);
    const [selectedDevice, setSelectedDevice] = useState(devices[0].id);
    const [gossipLog, setGossipLog] = useState<string[]>([]);
    const [dnsQuery, setDnsQuery] = useState('');
    const [dnsResult, setDnsResult] = useState<DnsRecord[] | null>(null);
    const gossipLogRef = useRef<HTMLDivElement>(null);

    const addLog = (message: string) => {
        setGossipLog(prev => [...prev.slice(-100), `${new Date().toLocaleTimeString()} - ${message}`]);
    };
    
    useEffect(() => {
        if (gossipLogRef.current) {
            gossipLogRef.current.scrollTop = gossipLogRef.current.scrollHeight;
        }
    }, [gossipLog]);
    
    const dnsRecords = useMemo((): DnsRecord[] => {
        const records: DnsRecord[] = [];
        devices.forEach(device => {
            const isOnline = device.status === 'Online';
            const deviceName = `${device.name.toLowerCase()}.alice.autho.id`;
            records.push({
                name: deviceName,
                type: 'A',
                ttl: isOnline ? 3600 : 0,
                value: isOnline ? `100.64.${devices.indexOf(device)}.1` : '[offline]',
                stale: !isOnline
            });
            records.push({
                name: deviceName,
                type: 'TXT',
                ttl: isOnline ? 3600 : 0,
                value: `did=${device.did}`,
                stale: !isOnline
            });
        });
        deployedServices.forEach(service => {
            const parentDevice = devices.find(d => d.id === service.deviceId);
            const isOnline = parentDevice?.status === 'Online';
            records.push({
                name: service.identityDns,
                type: 'TXT',
                ttl: isOnline ? 300 : 0,
                value: `service=${service.name} owner=${parentDevice?.did}`,
                stale: !isOnline
            });
        });
        return records;
    }, [devices, deployedServices]);

    const handleDnsQuery = () => {
        if (!dnsQuery) {
            setDnsResult(null);
            return;
        }
        const results = dnsRecords.filter(r => r.name.toLowerCase() === dnsQuery.toLowerCase());
        setDnsResult(results);
    };

    const toggleDeviceStatus = (deviceId: string) => {
        const device = devices.find(d => d.id === deviceId);
        if (!device || device.status === 'Syncing') return;

        const originalStatus = device.status;
        const newStatus = originalStatus === 'Online' ? 'Offline' : 'Online';
        
        setDevices(prev => prev.map(d => d.id === deviceId ? { ...d, status: 'Syncing' } : d));
        addLog(`${device.name} broadcasting status: ${newStatus}`);
        
        const otherDevices = devices.filter(d => d.id !== deviceId && d.status === 'Online');
        const totalDelay = (otherDevices.length + 1) * 500 + 300;

        otherDevices.forEach((peer, index) => {
            setTimeout(() => {
                addLog(`${peer.name} received and acknowledged update from ${device.name}.`);
            }, (index + 1) * 500);
        });
        
        setTimeout(() => {
            addLog(`Network consensus reached for ${device.name}.`);
            setDevices(prev => prev.map(d => {
                if (d.id === deviceId) {
                    return { ...d, status: newStatus, lastSeen: Date.now() };
                }
                return d;
            }));
        }, totalDelay);
    };

    const simulateNetworkChurn = () => {
        addLog("--- SIMULATING NETWORK CHURN ---");
        const devicesToToggle = [...devices]
          .filter(d => d.status !== 'Syncing')
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.ceil(devices.length / 2));
        
        devicesToToggle.forEach((device, index) => {
            setTimeout(() => {
                toggleDeviceStatus(device.id);
            }, index * 1500);
        });
    };

    const handleDeploy = (workload: any) => {
        const type = Object.keys(workloads).find(key => workloads[key as keyof typeof workloads].some(w => w.id === workload.id));
        const device = devices.find(d => d.id === selectedDevice);
        if (!type || !device) return;

        const serviceName = workload.name.toLowerCase().replace(/\s+/g, '-');
        const deviceName = device.name.toLowerCase();
        const newService: DeployedService = {
            id: `${workload.id}-${Date.now()}`,
            name: workload.name,
            type: type.toUpperCase() as 'VM' | 'LXC' | 'WASM',
            deviceId: device.id,
            deviceName: device.name,
            identityDns: `${serviceName}.${deviceName}.alice.autho.id`,
        };

        setDeployedServices(prev => [...prev, newService]);
        addLog(`Workload '${workload.name}' deployed to ${device.name}. A new DNS record was created.`);
    };

    return (
        <div>
            <h3 className="text-xl font-bold text-white mb-2">Network & Workload Orchestrator</h3>
            <p className="mb-4 text-brand-text-secondary">
                Deploy workloads and manage the P2P network. The PowerDNS engine automatically reflects network state changes discovered via the gossip protocol.
            </p>

            <div className="mb-6">
                <label htmlFor="device-select" className="font-mono text-sm text-brand-text-secondary mr-2">Deploy to:</label>
                <select 
                    id="device-select"
                    value={selectedDevice}
                    onChange={(e) => setSelectedDevice(e.target.value)}
                    className="p-2 bg-brand-surface border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none font-mono text-sm"
                >
                    {devices.map(device => ( <option key={device.id} value={device.id}>{device.name} ({device.did})</option>))}
                </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <WorkloadCard title="Virtual Machines (VMs)" icon={<VmIcon />} workloads={workloads.vm} onDeploy={handleDeploy} />
                    <WorkloadCard title="Containers (LXC)" icon={<LxcIcon />} workloads={workloads.lxc} onDeploy={handleDeploy} />
                    <WorkloadCard title="WebAssembly (WASM)" icon={<WasmIcon />} workloads={workloads.wasm} onDeploy={handleDeploy} />
                </div>
                
                <div className="flex flex-col gap-4">
                    <div className="bg-brand-bg p-4 rounded-lg border border-brand-border">
                        <div className="flex items-center space-x-3 mb-3">
                            <NetworkIcon />
                            <h3 className="text-lg font-bold text-white">Network Topology</h3>
                        </div>
                        <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                             <p className="font-mono text-xs text-brand-text-secondary uppercase">Devices (Toggle Status):</p>
                            {devices.map(device => (
                                 <div key={device.id} className="p-2 bg-brand-surface/50 rounded-md flex justify-between items-center">
                                    <div>
                                        <p className="font-mono text-sm text-brand-text flex items-center">
                                            <StatusBadge status={device.status} />
                                            {device.name}
                                        </p>
                                        <p className="font-mono text-xs text-brand-text-secondary">{device.connection}</p>
                                    </div>
                                    <button onClick={() => toggleDeviceStatus(device.id)} disabled={device.status === 'Syncing'} className={`px-2 py-1 text-xs font-bold rounded disabled:cursor-not-allowed disabled:opacity-50 ${device.status === 'Online' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/40' : 'bg-green-500/20 text-green-400 hover:bg-green-500/40'}`}>
                                        {device.status === 'Online' ? 'Go Offline' : 'Go Online'}
                                    </button>
                                </div>
                            ))}
                        </div>
                         <button onClick={simulateNetworkChurn} className="mt-2 w-full flex items-center justify-center space-x-2 px-3 py-2 bg-brand-secondary/20 text-brand-secondary text-xs font-bold rounded-md hover:bg-brand-secondary/40 transition-colors">
                            <ChurnIcon />
                            <span>Simulate Network Fluctuation</span>
                        </button>
                    </div>
                     <div className="bg-brand-bg p-4 rounded-lg border border-brand-border flex-grow flex flex-col" id="powerdns-manager">
                        <div className="flex items-center space-x-3 mb-3">
                            <DnsIcon />
                            <h3 className="text-lg font-bold text-white">PowerDNS Management & Query</h3>
                        </div>
                        <div className="flex space-x-2 mb-3">
                            <input
                                type="text"
                                value={dnsQuery}
                                onChange={e => setDnsQuery(e.target.value)}
                                placeholder="e.g., git-server.laptop.alice.autho.id"
                                className="w-full p-2 bg-brand-surface border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none font-mono text-sm"
                            />
                            <button onClick={handleDnsQuery} className="flex-shrink-0 flex items-center justify-center px-4 py-2 bg-brand-primary text-brand-bg font-bold rounded-md hover:bg-brand-primary/80 transition-colors">
                                <SearchIcon />
                            </button>
                        </div>
                        {dnsResult && (
                             <div className="mb-3 p-2 bg-brand-surface/50 rounded">
                                <h4 className="text-xs font-mono uppercase text-brand-text-secondary">Query Result:</h4>
                                {dnsResult.length > 0 ? (
                                    dnsResult.map((r, i) => <pre key={i} className="text-xs text-brand-primary font-mono whitespace-pre-wrap">{JSON.stringify(r, null, 2)}</pre>)
                                ) : (
                                    <p className="text-xs font-mono text-yellow-400">No records found for "{dnsQuery}"</p>
                                )}
                            </div>
                        )}
                        <div className="flex-grow h-48 bg-brand-surface/50 p-2 rounded-md overflow-y-auto">
                            <table className="w-full text-left text-xs font-mono">
                                <thead>
                                    <tr className="text-brand-text-secondary">
                                        <th className="p-1">Name</th>
                                        <th className="p-1">Type</th>
                                        <th className="p-1">TTL</th>
                                        <th className="p-1">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dnsRecords.map((record, i) => (
                                        <tr key={i} className={`border-t border-brand-border/50 ${record.stale ? 'text-gray-500' : 'text-brand-text'}`}>
                                            <td className="p-1 break-all">{record.name}</td>
                                            <td className="p-1">{record.type}</td>
                                            <td className="p-1">{record.ttl}</td>
                                            <td className="p-1 break-all">{record.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

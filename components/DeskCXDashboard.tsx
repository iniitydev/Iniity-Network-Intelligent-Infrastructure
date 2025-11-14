
import React, { useState } from 'react';
import { USERS, DEVICES, APPLICATIONS, DASHBOARD_STATS, INIITY_EVENTS_DATASET, VAULT_FILES } from '../constants';
import { User, Device, Application, AgentStatus, VaultFile } from '../types';
import NetworkOrchestrator from './NetworkOrchestrator';

// Icons for sidebar and components
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M21 21v-2a4 4 0 0 0-3-3.85"/><circle cx="9" cy="7" r="4"/><path d="M22 17c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4c0-1.09.44-2.09 1.16-2.82.73-.73 1.73-1.18 2.84-1.18Z"/></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const DeviceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>;
const AppIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const NetworkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/><path d="M10 16v-4"/><path d="M13 12h-2"/><path d="M22 12h-2"/><path d="M17 12h-2"/><path d="M20 18a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2Z"/></svg>;
const VaultIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>;


type View = 'dashboard' | 'users' | 'devices' | 'apps' | 'network' | 'vault';

const AgentStatusBadge: React.FC<{ status: AgentStatus }> = ({ status }) => {
    const config = {
        Active: 'bg-green-500/20 text-green-400',
        'Pending Approval': 'bg-yellow-500/20 text-yellow-400',
        Revoked: 'bg-red-500/20 text-red-400',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${config[status]}`}>{status}</span>;
}

const StatCard: React.FC<{ title: string; value: number | string; icon: React.ReactNode; action?: { label: string, onClick: () => void } }> = ({ title, value, icon, action }) => (
    <div className="bg-brand-bg p-4 rounded-lg border border-brand-border">
        <div className="flex items-center space-x-3">
            <div className="text-brand-text-secondary">{icon}</div>
            <div>
                <p className="text-sm text-brand-text-secondary">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </div>
        {action && (
            <button onClick={action.onClick} className="mt-3 text-sm text-brand-primary font-semibold hover:underline">
                {action.label}
            </button>
        )}
    </div>
);

const DashboardView: React.FC<{ setView: (view: View) => void }> = ({ setView }) => (
    <div>
        <h3 className="text-xl font-bold mb-4">Dashboard</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title="Users" value={DASHBOARD_STATS.users} icon={<UserIcon />} />
            <StatCard title="Devices" value={DASHBOARD_STATS.devices} icon={<DeviceIcon />} />
            <StatCard title="Applications" value={DASHBOARD_STATS.apps} icon={<AppIcon />} />
            <StatCard 
                title="Pending Actions" 
                value={DASHBOARD_STATS.pendingActions} 
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
                action={DASHBOARD_STATS.pendingActions > 0 ? { label: "Review Devices", onClick: () => setView('devices') } : undefined}
            />
        </div>
        <div>
            <h4 className="font-bold mb-2">Recent Activity</h4>
            <div className="bg-brand-bg p-3 rounded-lg border border-brand-border h-48 overflow-y-auto">
                {INIITY_EVENTS_DATASET.slice(0, 5).map(event => (
                    <div key={event.id} className="font-mono text-xs py-1.5 border-b border-brand-border/50 last:border-b-0">
                        <span className="text-brand-primary mr-2">{event.type}</span>
                        <span className="text-brand-text-secondary">by</span>
                        <span className="text-white mx-2">{event.who.did.split(':').pop()}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const UsersView: React.FC = () => (
    <div>
        <h3 className="text-xl font-bold mb-4">User Management</h3>
        <div className="bg-brand-bg p-4 rounded-lg border border-brand-border">
            <ul className="divide-y divide-brand-border">
                {USERS.map(user => (
                    <li key={user.id} className="flex items-center justify-between py-3">
                        <div className="flex items-center">
                            <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full" />
                            <div className="ml-4">
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-sm text-brand-text-secondary font-mono">{user.did}</p>
                            </div>
                        </div>
                        <button className="px-3 py-1 text-sm bg-brand-surface hover:bg-brand-border rounded-md">Manage</button>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const DevicesView: React.FC = () => (
    <div id="console-devices-view">
        <h3 className="text-xl font-bold mb-4">Device Management</h3>
        <p className="mb-4 text-brand-text-secondary">Approve or revoke devices to control access to your network. Each device runs a verifiable Identity Agent.</p>
        <div className="bg-brand-bg p-4 rounded-lg border border-brand-border">
            {DEVICES.map(device => (
                <div key={device.id} className="flex items-center justify-between py-3 border-b border-brand-border last:border-b-0">
                    <div>
                        <p className="font-semibold">{device.name} <span className="text-sm text-brand-text-secondary">({device.type})</span></p>
                        <p className="text-sm text-brand-text-secondary font-mono">Owner: {device.ownerDid}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <AgentStatusBadge status={device.agentStatus} />
                        {device.agentStatus === 'Pending Approval' && <button className="px-3 py-1 text-sm bg-green-500/20 text-green-400 rounded-md hover:bg-green-500/40">Approve</button>}
                        {device.agentStatus === 'Active' && <button className="px-3 py-1 text-sm bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/40">Revoke</button>}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ApplicationsView: React.FC = () => (
    <div id="console-apps-view">
        <h3 className="text-xl font-bold mb-4">Application Permissions</h3>
        <p className="mb-4 text-brand-text-secondary">Grant users access to specific applications running on your network.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {APPLICATIONS.map(app => (
                <div key={app.id} className="bg-brand-bg p-4 rounded-lg border border-brand-border">
                    <div className="flex items-center space-x-3 mb-2">
                        <span className="text-brand-secondary">{app.icon}</span>
                        <h4 className="font-bold">{app.name}</h4>
                    </div>
                    <p className="text-sm text-brand-text-secondary mb-3 h-10">{app.description}</p>
                    <div>
                        <p className="text-xs font-semibold mb-2">Allowed Users:</p>
                        <div className="flex flex-wrap gap-2">
                            {app.allowedUserDids.map(did => {
                                const user = USERS.find(u => u.did === did);
                                return <img key={did} src={user?.avatarUrl} title={user?.name} className="w-8 h-8 rounded-full" />
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const DataVaultView: React.FC = () => (
    <div>
        <h3 className="text-xl font-bold mb-4">Data Vault</h3>
        <p className="mb-4 text-brand-text-secondary">Secure, end-to-end encrypted file storage. All files are encrypted with your AuthO.iD keys.</p>
        <div className="bg-brand-bg p-4 rounded-lg border border-brand-border">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                <h4 className="font-semibold">Root Directory</h4>
                <div className="flex space-x-2">
                    <button className="px-3 py-1.5 text-sm bg-brand-surface hover:bg-brand-border rounded-md">New Folder</button>
                    <button className="px-3 py-1.5 text-sm bg-brand-primary text-brand-bg font-bold rounded-md hover:bg-brand-primary/80">Upload</button>
                </div>
            </div>
            <div className="mt-2">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-brand-border text-xs text-brand-text-secondary uppercase font-mono">
                            <th className="p-2 w-full">Name</th>
                            <th className="p-2 whitespace-nowrap">Size</th>
                            <th className="p-2 whitespace-nowrap">Last Modified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {VAULT_FILES.map((file: VaultFile) => (
                            <tr key={file.id} className="border-b border-brand-border/50 hover:bg-brand-surface/50 transition-colors">
                                <td className="p-2.5 flex items-center space-x-3">
                                    <span className={file.type === 'folder' ? 'text-brand-primary' : 'text-brand-text-secondary'}>
                                        {file.icon}
                                    </span>
                                    <span className="font-medium text-brand-text">{file.name}</span>
                                </td>
                                <td className="p-2.5 text-sm text-brand-text-secondary font-mono">{file.size}</td>
                                <td className="p-2.5 text-sm text-brand-text-secondary font-mono">{file.modified}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);


const Sidebar: React.FC<{ activeView: View, setView: (view: View) => void }> = ({ activeView, setView }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
        { id: 'users', label: 'Users', icon: <UserIcon /> },
        { id: 'devices', label: 'Devices', icon: <DeviceIcon /> },
        { id: 'apps', label: 'Applications', icon: <AppIcon /> },
        { id: 'vault', label: 'Data Vault', icon: <VaultIcon /> },
        { id: 'network', label: 'Network Orchestrator', icon: <NetworkIcon /> },
    ];

    return (
        <aside className="w-full md:w-64 flex-shrink-0 bg-brand-bg p-4 rounded-lg border border-brand-border">
            <nav className="flex md:flex-col md:space-y-2 overflow-x-auto">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        id={`${item.id}-view-nav`}
                        onClick={() => setView(item.id as View)}
                        className={`flex items-center space-x-3 p-3 rounded-md text-sm font-semibold w-full text-left transition-colors ${activeView === item.id ? 'bg-brand-primary/10 text-brand-primary' : 'hover:bg-brand-surface text-brand-text'}`}
                    >
                        {item.icon}
                        <span className="flex-shrink-0">{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default function DeskCXDashboard() {
    const [activeView, setActiveView] = useState<View>('dashboard');

    const renderView = () => {
        switch (activeView) {
            case 'dashboard': return <DashboardView setView={setActiveView} />;
            case 'users': return <UsersView />;
            case 'devices': return <DevicesView />;
            case 'apps': return <ApplicationsView />;
            case 'vault': return <DataVaultView />;
            case 'network': return <NetworkOrchestrator />;
            default: return <DashboardView setView={setActiveView} />;
        }
    }
    
    return (
        <div className="p-6 rounded-lg bg-brand-surface border border-brand-border">
            <div className="flex flex-col md:flex-row gap-6">
                <Sidebar activeView={activeView} setView={setActiveView} />
                <main className="flex-grow">
                    {renderView()}
                </main>
            </div>
        </div>
    );
}
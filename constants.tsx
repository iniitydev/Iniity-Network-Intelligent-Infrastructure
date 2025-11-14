
import React from 'react';
import { Pillar, RoadmapPhase, FileTreeNode, TourStep, User, Device, Application, VaultFile } from './types';

export const PRINCIPLES = [
  "Sovereign Desktop (`desk.cx`): A unified, user-centric interface for managing one's entire digital world.",
  "Universal Identity Fabric (AuthO.iD): A single, sovereign identity for users, devices, and services.",
  "Embedded Identity Agent: Every device runs a verifiable agent, making endpoints active, attested participants in the network.",
  "Zero-Trust by Default: No implicit trust. All communication is authenticated, authorized, and encrypted via AuthO.iD.",
  "Identity-Defined Networking: Network topology and access are defined by cryptographic identity, not ephemeral IP addresses.",
  "Resilient P2P Discovery: Devices discover each other via a self-healing gossip protocol, independent of central servers.",
  "Verifiable Audit Stream: All management actions are captured in a verifiable, immutable `IniityEvent` stream."
];

const ICONS = {
    WHO: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    WHY: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><shield> <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> </shield></svg>,
    HOW: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" /></svg>,
    WHAT: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
    WHEN: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    WHERE: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>,
    APP_PHOTOS: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
    APP_GIT: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 18h-6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h2"></path><path d="M14 14v4"></path><path d="M10 10v4"></path><path d="M22 8.1c0 .8-.5 1.5-1.1 1.6l-1.1.2c-.6.1-1.2-.4-1.2-1.1V6.8c0-.7.5-1.3 1.2-1.3l1.1.2c.6.1 1.1.8 1.1 1.6z"></path><path d="M16 4.1c0 .8-.5 1.5-1.1 1.6l-1.1.2c-.6.1-1.2-.4-1.2-1.1V2.8c0-.7.5-1.3 1.2-1.3l1.1.2c.6.1 1.1.8 1.1 1.6z"></path></svg>,
    APP_VAULT: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
    FOLDER: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path></svg>,
    FILE_TEXT: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>,
    FILE_IMAGE: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
    FILE_ZIP: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="10" y1="2" x2="10" y2="22"/><line x1="6" y1="6" x2="14" y2="6"/><line x1="6" y1="18" x2="14" y2="18"/><path d="M18 6V5a2 2 0 0 0-2-2h-2"/><path d="M18 18v1a2 2 0 0 1-2 2h-2"/><path d="M6 18v1a2 2 0 0 0 2 2h2"/><path d="M6 6V5a2 2 0 0 1 2-2h2"/></svg>,
    POLICY_FORGE: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 12h.01"/><path d="M12 12h.01"/><path d="M9 12h.01"/><path d="M4.5 10.5c-2.5 1.2-2.5 4.8 0 6"/><path d="m19.5 10.5c2.5 1.2 2.5 4.8 0 6"/><path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9Z"/></svg>,
    SYSTEM_HEALTH: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.2 7.8a4.5 4.5 0 0 0-5.4 0l-1.8 1.8-1.8-1.8a4.5 4.5 0 0 0-6.4 6.4l1.8 1.8 6.4 6.4 6.4-6.4 1.8-1.8a4.5 4.5 0 0 0 0-6.4Z"/><path d="m5 8 3-3"/><path d="m9 8 3-3"/></svg>
};

export const PILLARS: Pillar[] = [
  { name: 'IDENTITY (AuthO.iD)', role: 'Cryptographic root of trust', coreTech: '`desk.cx` Sovereign Desktop', dataLayer: 'DIDs, VCs, User & Device Registry', agentType: 'Embedded Identity Agent', icon: ICONS.WHO },
  { name: 'PURPOSE (Policy)', role: 'Declarative access control engine', coreTech: 'Embedded OPA', dataLayer: 'User, Device, & App Policies', agentType: 'Policy Agent', icon: ICONS.WHY },
  { name: 'PLANNING (Orchestration)', role: 'Workload scheduling & placement', coreTech: 'Custom Scheduler (VM, LXC, WASM)', dataLayer: 'Resource allocation, deployment plans', agentType: 'Orchestration Agent', icon: ICONS.HOW },
  { name: 'ACTION (Audit Stream)', role: 'Immutable event stream ingestion', coreTech: 'Chronos Ledger', dataLayer: 'Verifiable IniityEvents Log', agentType: 'Network Agent', icon: ICONS.WHAT },
  { name: 'TIME (Causality)', role: 'Distributed event ordering', coreTech: 'Vector Clocks', dataLayer: 'Causal Timestamps', agentType: 'Temporal Agent', icon: ICONS.WHEN },
  { name: 'SPACE (Topology)', role: 'Dynamic network state mapping', coreTech: 'PowerDNS Engine + Gossip (Wi-Fi/BLE)', dataLayer: 'Dynamic DNS Records (A, TXT)', agentType: 'Topology Agent', icon: ICONS.WHERE }
];

export const INIITY_EVENTS_DATASET = [
  {
    "id": "ie:cid:bafy...a1", "type": "user.login.success", "timestamp": "2026-01-10T08:00:00.100Z",
    "who": { "did": "did:autho:user:alice" },
    "where": { "device": "did:autho:device:phone-alice", "network": "192.168.1.10" },
    "payload": { "method": "biometric" },
    "signature": "MEUCIQ...a1"
  },
  {
    "id": "ie:cid:bafy...b2", "type": "device.registration.pending", "timestamp": "2026-01-10T08:02:15.200Z",
    "who": { "did": "did:autho:device:server-alice" },
    "payload": { "name": "Home Server", "type": "Server", "owner": "did:autho:user:alice" },
    "signature": "MEUCIQ...b2"
  },
  {
    "id": "ie:cid:bafy...c3", "type": "device.approved", "timestamp": "2026-01-10T08:05:05.500Z",
    "who": { "did": "did:autho:user:alice" },
    "how": { "interface": "desk.cx" },
    "payload": { "device_did": "did:autho:device:server-alice", "action": "approve" },
    "signature": "MEUCIQ...c3"
  },
  {
    "id": "ie:cid:bafy...d4", "type": "app.permission.granted", "timestamp": "2026-01-10T08:05:18.900Z",
    "who": { "did": "did:autho:user:alice" },
    "why": { "goal_id": "goal:backup:enable-photos" },
    "payload": { "user_did": "did:autho:user:alice", "app_id": "photo-backup-service", "permission": "read-write" },
    "signature": "MEUCIQ...d4"
  },
  {
    "id": "ie:cid:bafy...e5", "type": "firewall.block", "timestamp": "2026-01-10T09:15:00.000Z",
    "who": { "did": "did:autho:agent:policy-agent" },
    "why": { "policy_match": "deny-unapproved-device" },
    "payload": { "source_did": "did:autho:device:unknown-device-123", "destination": "did:autho:service:git-server-456", "reason": "Connection attempt from device with revoked Identity Agent." },
    "signature": "MEUCIQ...e5"
  }
];

export const REPO_STRUCTURE: FileTreeNode = {
  name: 'desk-cx-sovereign-os/',
  children: [
    {
      name: 'dashboard/',
      children: [
        { name: 'src/' },
        { name: 'package.json' },
      ],
    },
    {
      name: 'modules/',
      children: [
        { name: 'iniity-core (submodule)' },
        { name: 'identity-agent (submodule)' },
        { name: 'policy-agent (submodule)' },
      ],
    },
    {
      name: 'services/',
      children: [
        { name: 'desk-cx-daemon/' },
        { name: 'api-gateway/' },
        { name: 'dns-server/' },
      ],
    },
    {
      name: 'deploy/',
      children: [
          { name: 'docker-compose.yml' },
          { name: 'kubernetes/' },
      ]
    },
    {
        name: 'docs/',
        children: [
            { name: 'architecture.md' },
            { name: 'api-specs.md' },
        ]
    },
    { name: '.gitignore' },
    { name: 'README.md' },
  ],
};

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: 1,
    goal: "Core Identity & `desk.cx`",
    deliverable: "`desk.cx` MVP. User & device registration via Embedded Identity Agent. Verifiable Audit Stream for core actions."
  },
  {
    phase: 2,
    goal: "Networking & Policy Enforcement",
    deliverable: "P2P device discovery via gossip protocol. Embedded OPA for access policies. Identity-based firewall rules via API Gateway."
  },
  {
    phase: 3,
    goal: "Workload Orchestration",
    deliverable: "Deploy and manage containerized (LXC) and WASM workloads on registered devices. Basic resource allocation."
  },
  {
    phase: 4,
    goal: "Data Fabric & Federation",
    deliverable: "Secure Data Vault implementation. Peer-to-peer federation between `desk.cx` instances. Distributed event ledger for fault tolerance."
  }
];

// DATASETS FOR DESK.CX DASHBOARD
export const USERS: User[] = [
    { id: 'u1', name: 'Alice', email: 'alice@autho.id', did: 'did:autho:user:alice', avatarUrl: `https://i.pravatar.cc/48?u=alice`, lastLogin: '2026-01-10T08:00:00Z' },
    { id: 'u2', name: 'Bob', email: 'bob@autho.id', did: 'did:autho:user:bob', avatarUrl: `https://i.pravatar.cc/48?u=bob`, lastLogin: '2026-01-09T15:30:00Z' },
];

export const DEVICES: Device[] = [
    { id: 'd1', name: 'Alice\'s Laptop', type: 'Laptop', ownerDid: 'did:autho:user:alice', agentStatus: 'Active', registeredDate: '2025-11-01' },
    { id: 'd2', name: 'Alice\'s Phone', type: 'Phone', ownerDid: 'did:autho:user:alice', agentStatus: 'Active', registeredDate: '2025-11-05' },
    { id: 'd3', name: 'Home Server', type: 'Server', ownerDid: 'did:autho:user:alice', agentStatus: 'Pending Approval', registeredDate: '2026-01-10' },
    { id: 'd4', name: 'Old Tablet', type: 'Phone', ownerDid: 'did:autho:user:alice', agentStatus: 'Revoked', registeredDate: '2025-01-01' },
];

export const APPLICATIONS: Application[] = [
    { id: 'app1', name: 'Photo Backup Service', description: 'Syncs photos across devices.', icon: ICONS.APP_PHOTOS, allowedUserDids: ['did:autho:user:alice'] },
    { id: 'app2', name: 'Private Git Server', description: 'Hosts private code repositories.', icon: ICONS.APP_GIT, allowedUserDids: ['did:autho:user:alice', 'did:autho:user:bob'] },
    { id: 'app3', name: 'Data Vault', description: 'End-to-end encrypted file storage.', icon: ICONS.APP_VAULT, allowedUserDids: ['did:autho:user:alice'] },
];

export const DASHBOARD_STATS = {
    users: USERS.length,
    devices: DEVICES.length,
    apps: APPLICATIONS.length,
    pendingActions: DEVICES.filter(d => d.agentStatus === 'Pending Approval').length,
};

export const VAULT_FILES: VaultFile[] = [
    { id: 'vf1', name: 'documents', type: 'folder', size: '3 items', modified: '2026-01-08', icon: ICONS.FOLDER },
    { id: 'vf2', name: 'photos', type: 'folder', size: '1 item', modified: '2026-01-05', icon: ICONS.FOLDER },
    { id: 'vf3', name: 'sovereign_identity_manifesto.md', type: 'text', size: '12 KB', modified: '2026-01-08', icon: ICONS.FILE_TEXT },
    { id: 'vf4', name: 'project_backups.zip', type: 'zip', size: '1.2 GB', modified: '2026-01-02', icon: ICONS.FILE_ZIP },
    { id: 'vf5', name: 'desk-cx-wireframe.png', type: 'image', size: '845 KB', modified: '2025-12-28', icon: ICONS.FILE_IMAGE },
];

export const TOUR_STEPS: TourStep[] = [
    {
        selector: '#header-section',
        title: 'Welcome to `desk.cx`',
        content: "This is your Sovereign Desktop, the command center for your entire digital life. It's a unified interface for managing users, devices, apps, and data.",
        placement: 'bottom',
    },
    {
        selector: '#system-health-section',
        title: 'System Health',
        content: "Get a live, at-a-glance overview of your personal network's status. It shows device attestations, network traffic, and overall operational health.",
        placement: 'bottom',
    },
    {
        selector: '#desk-cx-dashboard-section',
        title: 'The Dashboard',
        content: "This is the main console for managing your sovereign cloud, providing a summary of your network and any pending actions, like devices waiting for your approval.",
        placement: 'bottom',
    },
    {
        selector: '#policy-forge-section',
        title: 'The Policy Forge',
        content: "Use this Gemini-powered tool to create robust security policies in plain English. Describe what you want to allow or deny, and the Forge will generate the corresponding code.",
        placement: 'top',
    },
    {
        selector: '#audit-stream-section',
        title: 'The Audit Stream',
        content: "Every action you take—like approving a device or creating a policy—is captured as a verifiable `IniityEvent` in this immutable log.",
        placement: 'top',
    },
    {
        selector: '#live-section',
        title: 'Live Conversation',
        content: "Have a real-time voice conversation with your network's administrative assistant to query status or perform actions hands-free.",
        placement: 'top',
    },
];

export const POLICY_FORGE_SUGGESTIONS = [
  "Allow 'Alice' to access the 'Git Server' only from her approved 'Laptop' and 'Phone' devices.",
  "Deny all access to the 'Data Vault' between 10 PM and 6 AM.",
  "Only allow devices with an 'Active' Identity Agent status to connect to any service.",
  "Create a policy that requires biometric authentication for any user trying to access the 'Photo Backup Service'."
];

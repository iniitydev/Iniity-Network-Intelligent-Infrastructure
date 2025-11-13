
import React from 'react';
import { Pillar, RoadmapPhase, FileTreeNode, TourStep } from './types';

export const PRINCIPLES = [
  "Sovereignty First: All data, identity, and logic reside in your control.",
  "Event-Sourcing as Truth: The world state is a projection of an immutable, signed ledger of events.",
  "Decentralized Identity as WHO: Every actor has a DID backed by Zitadel + Unomi.",
  "Spatial Dualism: Physical (GIS/H3) + digital (URI/SpacetimeDB) location fused into a digital twin.",
  "AI as Reasoning Layer: Gemini used for dynamic logic synthesis, not data storage.",
  "Zero-Trust Mesh: Netbird secures all inter-service and user communication.",
  "Cognitive Loop: Observe → Orient → Decide → Act → Log (OODAL), implemented as event-driven agents."
];

const ICONS = {
    WHO: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    WHY: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>,
    HOW: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" /></svg>,
    WHAT: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
    WHEN: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    WHERE: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
}

export const PILLARS: Pillar[] = [
  { name: 'IDENTITY (WHO)', role: 'Verifiable agency & permissions', coreTech: 'Zitadel (IdP) + Apache Unomi', dataLayer: 'DIDs, VCs, consent graphs', agentType: 'Identity Agent', icon: ICONS.WHO },
  { name: 'PURPOSE (WHY)', role: 'Goal hierarchy, policy validation', coreTech: 'OPA + Neo4j (causal graph)', dataLayer: 'Goals, policies, ethical boundaries', agentType: 'Purpose Agent', icon: ICONS.WHY },
  { name: 'PLANNING (HOW)', role: 'Dynamic workflow synthesis', coreTech: 'Google AI Studio (Gemini) + n8n', dataLayer: 'Workflow DAGs, step templates', agentType: 'Planning Agent', icon: ICONS.HOW },
  { name: 'ACTION (WHAT)', role: 'Event ingestion & emission', coreTech: 'SpacetimeDB (verifiable ledger)', dataLayer: 'Immutable AxiomEvents', agentType: 'Action/Sense Agent', icon: ICONS.WHAT },
  { name: 'TIME (WHEN)', role: 'Causal & physical time', coreTech: 'SpacetimeDB + InfluxDB', dataLayer: 'Vector clocks, TS metrics', agentType: 'Temporal Agent', icon: ICONS.WHEN },
  { name: 'SPACE (WHERE)', role: 'Dual-space world model', coreTech: 'PostGIS + SpacetimeDB + H3', dataLayer: 'Digital twin, asset graph', agentType: 'Spatial Agent', icon: ICONS.WHERE }
];

export const AXIOM_EVENT_JSON = JSON.stringify({
  "id": "ae:cid:bafybeig...xyz",
  "type": "user.login.attempt",
  "timestamp": "2025-11-14T09:12:00.123Z",
  "vector_clock": [12, 45, 7],
  "who": {
    "did": "did:axiom:user:alice",
    "vc": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "where": {
    "physical": "8a2a12345678",
    "digital": "https://netbird.axiom/user/login",
    "ip": "192.168.100.5"
  },
  "why": {
    "goal_id": "goal:security:zero-trust-login",
    "policy_match": "policy:geo-ip-restriction-v2"
  },
  "how": {
    "workflow_id": "wid:login-flow:v3",
    "step_index": 1
  },
  "payload": {
    "raw_input": "username=alice",
    "structured": {
      "username": "alice",
      "client_fingerprint": "sha256:abc..."
    }
  },
  "signature": "MEUCIQ...xyz"
}, null, 2);

export const REPO_STRUCTURE: FileTreeNode = {
  name: 'project-axiom/ (Parent Repo)',
  children: [
    { name: '.gitmodules' },
    { name: 'README.md' },
    { name: 'LICENSE' },
    { name: 'axiom-core (submodule @ 1a2b3c4)' },
    { name: 'agents (submodule @ 5e6f7g8)' },
    { name: 'infrastructure (submodule @ 9i0j1k2)' },
    { name: 'prompts/', children: [
        { name: 'why/', children: [{ name: 'validate_event.md' }, { name: 'infer_intent.md' }] },
        { name: 'how/', children: [{ name: 'generate_plan.md' }, { name: 'optimize_workflow.md' }] },
        { name: 'what/', children: [{ name: 'parse_raw_input.md' }] }
    ]},
    { name: 'docs/', children: [{ name: 'AxiomEvent_Spec.md' }, { name: 'Cognitive_Loop_Diagram.svg' }] },
    { name: '.devcontainer/' }
  ]
};

export const ROADMAP_PHASES: RoadmapPhase[] = [
    { phase: 0, goal: 'Core Event Schema', deliverable: 'AxiomEvent JSON schema + validator' },
    { phase: 1, goal: 'Identity + Network', deliverable: 'Zitadel + Netbird mesh working' },
    { phase: 2, goal: 'Ledger + Sense', deliverable: 'SpacetimeDB + basic WHAT agent' },
    { phase: 3, goal: 'Purpose Engine', deliverable: 'WHY agent with OPA + AI prompt' },
    { phase: 4, goal: 'Planning + Action', deliverable: 'HOW → WHAT loop with real actions' },
    { phase: 5, goal: 'Spatial Twin', deliverable: 'PostGIS + H3 + URI mapping' },
    { phase: 6, goal: 'Leon Integration', deliverable: 'Leon behind OIDC proxy, emits AxiomEvents' }
];

export const TOUR_STEPS: TourStep[] = [
    {
        selector: '#header-section',
        title: 'Welcome to the Axiom Cognitive Fabric',
        content: "This is your mission control for planning a sovereign AI. I'll be your guide and show you the key components. Let's begin!",
        placement: 'bottom',
    },
    {
        selector: '#principles-section',
        title: 'The Foundational Principles',
        content: "Everything starts here. These 7 principles are the system's constitution, ensuring sovereignty, security, and trust.",
        placement: 'bottom',
    },
    {
        selector: '#pillars-section',
        title: 'The 6 Pillars of Axiom',
        content: 'Next, meet the core functional blocks of the architecture. Each pillar has a distinct role, from Identity (WHO) to Space (WHERE). Click them to explore.',
        placement: 'top',
    },
    {
        selector: '#axiomevent-section',
        title: 'The AxiomEvent',
        content: "This is the lifeblood of the system. It's the atomic unit of truth, capturing every action and thought as a verifiable, immutable record.",
        placement: 'top',
    },
    {
        selector: '#loop-section',
        title: 'The Cognitive Loop',
        content: "And this is how Axiom *thinks*. The OODAL loop is a continuous cycle of sensing the world, understanding context, and taking action.",
        placement: 'left',
    },
    {
        selector: '#repo-section',
        title: 'Git Repository Structure',
        content: "Under the hood, our project is modular. Using Git submodules keeps our code clean and allows each component to be versioned independently.",
        placement: 'left',
    },
    {
        selector: '#orchestrator-section',
        title: 'Digital Twin Data Orchestrator',
        content: "This is where the twin comes to life. From here, you can manage and initiate the ingestion of real-world data for Earth, the Internet, and the Metaverse.",
        placement: 'top',
    },
    {
        selector: '#roadmap-section',
        title: 'The Roadmap',
        content: "Here's our path forward. You can track our progress as we build out each phase of this ambitious project.",
        placement: 'top',
    },
    {
        selector: '#live-section',
        title: 'Live Conversation',
        content: "Ready to interact? Use your voice to talk directly with a Gemini-powered assistant about the project in real-time.",
        placement: 'top',
    },
    {
        selector: '#improver-section',
        title: 'The Invention Engine',
        content: "Now it's your turn to be the architect. Use this engine to challenge, critique, and improve the very fabric of Axiom. Let's build the future together.",
        placement: 'top',
    }
];

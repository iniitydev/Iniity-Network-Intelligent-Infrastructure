
import type { ReactElement } from 'react';

export interface Pillar {
  name: string;
  role: string;
  coreTech: string;
  dataLayer: string;
  agentType: string;
  icon: ReactElement;
}

export enum PhaseStatus {
  NotStarted = 'Not Started',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

export interface RoadmapPhase {
  phase: number;
  goal: string;
  deliverable: string;
}

export interface FileTreeNode {
  name: string;
  children?: FileTreeNode[];
}

export interface TourStep {
  selector: string;
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

// New Types for the Fabric Console
export type AgentStatus = 'Active' | 'Pending Approval' | 'Revoked';

export interface User {
  id: string;
  name: string;
  email: string;
  did: string;
  avatarUrl: string;
  lastLogin: string;
}

export interface Device {
  id: string;
  name: string;
  type: 'Laptop' | 'Phone' | 'Server';
  ownerDid: string;
  agentStatus: AgentStatus;
  registeredDate: string;
}

export interface Application {
  id: string;
  name: string;
  description: string;
  icon: ReactElement;
  allowedUserDids: string[];
}

// New type for Data Vault
export interface VaultFile {
  id: string;
  name: string;
  type: 'folder' | 'text' | 'image' | 'zip';
  size: string;
  modified: string;
  icon: ReactElement;
}

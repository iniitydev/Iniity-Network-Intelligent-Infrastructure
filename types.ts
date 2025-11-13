import type { ReactElement } from 'react';

export interface Pillar {
  name: string;
  role: string;
  coreTech: string;
  dataLayer: string;
  agentType: string;
  // Fix: Use ReactElement to avoid JSX namespace error in a .ts file.
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
import { LucideIcon } from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export interface Evidence {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  type: 'Meta-analysis' | 'RCT' | 'Review';
  relevance: 'Alta' | 'Media' | 'Baja';
  abstract: string;
}

export interface Patient {
  id: string;
  name: string; // Masked
  diagnosis: string;
  lastVisit: string;
  adherenceRate: number;
  alerts: string[];
}

export interface DataRow {
  id: string;
  original: Record<string, string>;
  anonymized: Record<string, string>;
}
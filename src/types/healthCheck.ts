import type { CrmId } from '@/context/CrmContext';

export type Severity = 'red' | 'yellow' | 'green';

export type RiskRow = {
  id: string;
  title: string;
  category: string;
  severity: Severity;
};

export type HorizonItem = {
  title: string;
  detail: string;
  effort: 'S' | 'M' | 'L' | 'XL';
};

export type HorizonColumns = {
  now: HorizonItem[];
  next: HorizonItem[];
  later: HorizonItem[];
};

export type RoadmapWorkstream = {
  name: string;
  tone: 'crimson' | 'navy' | 'amber' | 'green';
  spans: [number, number]; // percent start, percent end (0–100)
};

export type RoiLine = {
  label: string;
  current: string;
  invest: string;
  value: string;
};

export type DomainOneLiner = {
  name: string;
  blurb: string; // CRM-tagged one-line
};

export type ProofFindingBlock =
  | { kind: 'text'; lines: string[] }
  | { kind: 'code'; language: string; lines: string[] }
  | { kind: 'diagram'; rows: { from: string; via: string; to: string; tone: Severity }[] };

export type ProofFinding = {
  id: string;
  severity: Severity;
  title: string;
  evidence: string;
  blocks: ProofFindingBlock[];
  recommendation: string;
};

export type HealthCheckCrmContent = {
  crmId: CrmId;
  // Section-by-section example snippets shown in the walkthrough
  execSummary: { grade: string; narrative: string; counts: { high: number; med: number; low: number } };
  rubricNote: string;
  dimensionBars: { label: string; current: number; target: number; tone: Severity }[];
  risks: RiskRow[];
  horizons: HorizonColumns;
  roadmap: RoadmapWorkstream[];
  roi: RoiLine[];
  engagementNote: string;
  domainBlurbs: DomainOneLiner[]; // 12 entries — name must match the canonical list
  proofFinding: ProofFinding;
};

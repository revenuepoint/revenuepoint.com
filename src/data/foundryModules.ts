export type ModuleLayer = 'connect' | 'illuminate' | 'act';
export type ModuleId = 'lens' | 'courier' | 'prism' | 'otto' | 'agents' | 'actions';

export type FoundryModule = {
  id: ModuleId;
  name: string;
  role: string;
  tagline: string;
  description: string;
  layer: ModuleLayer;
};

export const foundryModules: FoundryModule[] = [
  {
    id: 'actions',
    name: 'Actions',
    role: 'System Execution',
    layer: 'act',
    tagline: 'Every action logged. Every change auditable.',
    description:
      'Foundry takes action in your systems. Otto can update a record, place an order on hold, or create a case in your CRM. Agents can run structured operations automatically. Every action is logged with a full audit trail. Every change is traceable and reversible.',
  },
  {
    id: 'agents',
    name: 'Agents',
    role: 'Always-On Automation',
    layer: 'act',
    tagline: 'Watch, respond, act — around the clock.',
    description:
      'Watcher agents monitor inventory, production, and financial thresholds. Processor agents turn inbound orders into system transactions. Responder agents triage and route cases. Scheduler agents deliver your morning briefing before you arrive. Every action logged. Every agent auditable.',
  },
  {
    id: 'otto',
    name: 'Otto',
    role: 'AI Analyst',
    layer: 'act',
    tagline: 'Ask anything in plain English. Get an answer.',
    description:
      'Your analyst, always available. Otto queries your warehouse, explains what it found, flags what looks wrong, and executes the next step on request. No SQL. No waiting for a report. Just an answer.',
  },
  {
    id: 'prism',
    name: 'Prism',
    role: 'AI Analysis Reports',
    layer: 'illuminate',
    tagline: 'A written analysis of your business, ready overnight.',
    description:
      'Sales trends. Inventory health. Cash position. Donor retention. Prism reads your warehouse and writes the narrative — with specific numbers, identified trends, and a recommended next action. You read it and decide. The analysis is already done.',
  },
  {
    id: 'courier',
    name: 'Courier',
    role: 'Reports & Alerts',
    layer: 'illuminate',
    tagline: 'The right information reaches the right people — on your schedule.',
    description:
      "Daily production summaries. Weekly AR aging. Instant anomaly alerts. Courier delivers on your schedule — and when something unusual happens, it fires immediately. You don't check dashboards. The relevant information finds you.",
  },
  {
    id: 'lens',
    name: 'Lens',
    role: 'Operational Dashboards',
    layer: 'illuminate',
    tagline: 'Every role sees the metrics that matter.',
    description:
      'COOs track operational KPIs. Sales leaders see pipeline health. Finance monitors cash flow. Lens builds dashboards, metric trees, and scorecards from your data — and keeps them current without anyone rebuilding them.',
  },
];

export const moduleLayerMeta: Record<ModuleLayer, { label: string; chipClass: string }> = {
  connect: {
    label: 'Connect',
    chipClass: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  illuminate: {
    label: 'Illuminate',
    chipClass: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  act: {
    label: 'Act',
    chipClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
};

export type ActionStatus = 'pending' | 'queued' | 'running' | 'done';
export type Phase = 'pending' | 'approving' | 'queued' | 'running' | 'done';
export type RiskLevel = 'low' | 'medium' | 'high';
export type TargetSystem =
  | 'SAP'
  | 'Salesforce'
  | 'QuickBooks'
  | 'PioneerRx'
  | 'SendGrid'
  | 'Courier';

export type ActionCardData = {
  id: string;
  name: string;
  agent: string;
  risk: RiskLevel;
  systems: TargetSystem[];
  summary: string;
  totalSteps: number;
  autoApproved?: boolean;
};

export type Card = ActionCardData & {
  instanceId: string;
  phase: Phase;
  phaseStartedAt: number;
  createdAt: number;
  // Monotonic insertion-order keys. These are the ONLY source of truth for
  // column ordering in the kanban — they're immune to Date.now() collisions
  // and sort instability. Assigned at pending entry and done entry, never
  // mutated afterwards.
  pendingSeq: number;
  doneSeq: number;
  approver?: string;
  duration?: string;
  completedAt?: number;
};

export type ActionColumnDef = {
  id: ActionStatus;
  label: string;
  accentClass: string;
  chipClass: string;
  headerDotClass: string;
  headerPulse?: boolean;
};

export const MAX_PENDING = 4;
export const MAX_DONE_VISIBLE = 4;

export const actionColumns: ActionColumnDef[] = [
  {
    id: 'pending',
    label: 'Human Review',
    accentClass: 'border-l-amber-500',
    chipClass: 'bg-amber-100 text-amber-700',
    headerDotClass: 'bg-amber-500',
  },
  {
    id: 'queued',
    label: 'Queued',
    accentClass: 'border-l-blue-500',
    chipClass: 'bg-blue-100 text-blue-700',
    headerDotClass: 'bg-blue-500',
  },
  {
    id: 'running',
    label: 'Running',
    accentClass: 'border-l-cyan-500',
    chipClass: 'bg-cyan-100 text-cyan-700',
    headerDotClass: 'bg-cyan-500',
    headerPulse: true,
  },
  {
    id: 'done',
    label: 'Done',
    accentClass: 'border-l-emerald-500',
    chipClass: 'bg-emerald-100 text-emerald-700',
    headerDotClass: 'bg-emerald-500',
  },
];

export const actionPool: ActionCardData[] = [
  {
    id: 'a1',
    name: 'Rx Interaction — Pharmacist Review',
    agent: 'Prescription Intake Processor',
    risk: 'high',
    systems: ['PioneerRx'],
    summary:
      'Incoming Warfarin Rx for a patient already on Aspirin 81mg. Flag for pharmacist verification before dispense.',
    totalSteps: 3,
  },
  {
    id: 'a2',
    name: 'Invoice INV-4821 — Escalate to Collections',
    agent: 'Overdue Invoice Watcher',
    risk: 'high',
    systems: ['QuickBooks', 'Salesforce'],
    summary: '$34,200 now 63 days past due. Recommend legal review and collections referral.',
    totalSteps: 3,
  },
  {
    id: 'a3',
    name: 'Raw Material Shortage — Create PO',
    agent: 'Raw Material Shortage Watcher',
    risk: 'medium',
    systems: ['SAP'],
    summary:
      'Cold-rolled steel at 8 days supply. Auto-PO for 10 sheets to Global Metals Corp.',
    totalSteps: 3,
  },
  {
    id: 'a4',
    name: 'Out-of-Stock Response',
    agent: 'Out-of-Stock Responder',
    risk: 'high',
    systems: ['SAP', 'SendGrid'],
    summary:
      'Hyaluronic Acid at zero. Halting 4 production orders, emergency PO to NextGen Chemical.',
    totalSteps: 4,
  },
  {
    id: 'a5',
    name: 'Inbound PO → Sales Order',
    agent: 'PO Processor',
    risk: 'medium',
    systems: ['SAP', 'Salesforce'],
    summary:
      'PO-9104 from Pacific NW Construction — 5,000 hex bolts. Creating SO-14821 and confirming with customer.',
    totalSteps: 4,
  },
  {
    id: 'a6',
    name: 'Production Line Down → Work Order',
    agent: 'Line Down Responder',
    risk: 'high',
    systems: ['SAP'],
    summary: 'Line 3 halted at 14:45. Creating maintenance WO and notifying plant manager.',
    totalSteps: 2,
    autoApproved: true,
  },
  {
    id: 'a7',
    name: 'Stalled Deal Alert',
    agent: 'Deal Stall Watcher',
    risk: 'low',
    systems: ['Salesforce'],
    summary:
      'Northgate Supply Q2 Renewal idle for 16 days. Creating follow-up task for the owner.',
    totalSteps: 2,
    autoApproved: true,
  },
  {
    id: 'a8',
    name: 'Daily Location Summary Delivered',
    agent: 'Daily Location Summary',
    risk: 'low',
    systems: ['Courier'],
    summary:
      '268 scripts across 5 locations, delivered to 12 recipients with role-tailored views.',
    totalSteps: 2,
    autoApproved: true,
  },
  {
    id: 'a9',
    name: 'Ingredient Expiry — Replacement PO',
    agent: 'Ingredient Expiry Watcher',
    risk: 'medium',
    systems: ['SAP'],
    summary: 'Testosterone Cypionate lot expires 4/9. PO placed for replacement, arrives 4/5.',
    totalSteps: 3,
  },
  {
    id: 'a10',
    name: 'Rx Auto-Refill Routed',
    agent: 'Prescription Refill Processor',
    risk: 'low',
    systems: ['PioneerRx'],
    summary:
      '84 auto-refills validated against adherence profile, routed to fill queue by location.',
    totalSteps: 2,
    autoApproved: true,
  },
  {
    id: 'a11',
    name: 'Churn Risk Detected — CS Outreach',
    agent: 'Churned Customer Watcher',
    risk: 'medium',
    systems: ['Salesforce'],
    summary:
      'Health score dropped below 40 for Apex Labs. Creating CS outreach task for account owner.',
    totalSteps: 3,
  },
  {
    id: 'a12',
    name: 'Payment Received — Invoice Cleared',
    agent: 'Payment Received Responder',
    risk: 'low',
    systems: ['QuickBooks', 'Salesforce'],
    summary:
      'Wire for $12,400 cleared against INV-4733. Marking paid and updating opportunity.',
    totalSteps: 3,
    autoApproved: true,
  },
  {
    id: 'a13',
    name: 'Batch QC Failure — Quarantine',
    agent: 'Batch QC Watcher',
    risk: 'high',
    systems: ['SAP'],
    summary:
      'Batch B-2041 failed potency assay (92% of target). Quarantining and notifying QA lead.',
    totalSteps: 3,
  },
  {
    id: 'a14',
    name: 'Controlled Substance Variance — Compliance Alert',
    agent: 'Controlled Substance Variance Watcher',
    risk: 'high',
    systems: ['PioneerRx', 'Courier'],
    summary:
      '3-vial ketamine variance at Westside hub. Flagging for compliance and paging pharmacist-in-charge.',
    totalSteps: 3,
  },
  {
    id: 'a15',
    name: 'Closed-Won — Onboarding Kickoff',
    agent: 'Closed-Won Responder',
    risk: 'low',
    systems: ['Salesforce'],
    summary:
      'Cedar Creek Partners signed. Spinning up onboarding project and notifying CS + Finance.',
    totalSteps: 3,
    autoApproved: true,
  },
  {
    id: 'a16',
    name: 'Weekly Pipeline Review Delivered',
    agent: 'Weekly Pipeline Review',
    risk: 'low',
    systems: ['Courier'],
    summary:
      'Pipeline snapshot + rep-by-rep deltas delivered to sales leadership and 6 reps.',
    totalSteps: 2,
    autoApproved: true,
  },
];

export const systemChipStyle: Record<TargetSystem, string> = {
  SAP: 'bg-amber-50 text-amber-700 border-amber-200',
  Salesforce: 'bg-blue-50 text-blue-700 border-blue-200',
  QuickBooks: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  PioneerRx: 'bg-violet-50 text-violet-700 border-violet-200',
  SendGrid: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  Courier: 'bg-crimsonLight text-crimson border-crimson/20',
};

export const riskStyle: Record<RiskLevel, { label: string; className: string }> = {
  low: {
    label: 'Low',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  medium: {
    label: 'Medium',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  high: {
    label: 'High',
    className: 'bg-crimsonLight text-crimson border-crimson/30',
  },
};

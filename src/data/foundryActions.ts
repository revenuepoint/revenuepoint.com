import type { IndustryId } from '@/context/IndustryContext';

export type ActionStatus = 'pending' | 'queued' | 'running' | 'done';
export type Phase = 'pending' | 'approving' | 'queued' | 'running' | 'done';
export type RiskLevel = 'low' | 'medium' | 'high';
export type TargetSystem =
  // Cross-industry core
  | 'SAP'
  | 'SAP Business One'
  | 'Salesforce'
  | 'NetSuite'
  | 'QuickBooks'
  | 'SendGrid'
  | 'Courier'
  | 'Shopify'
  // Manufacturing
  | 'MES'
  // Pharmacy
  | 'PioneerRx'
  | 'DEA CSOS'
  // Distribution
  | 'EDI'
  // Nonprofit
  | "Raiser's Edge"
  | 'Mailchimp'
  // Healthcare
  | 'Epic'
  | 'Athenahealth'
  | 'Kareo'
  // Property Management
  | 'Yardi'
  | 'AppFolio'
  | 'RealPage'
  // Professional Services
  | 'Mavenlink'
  | 'Harvest'
  // Financial Services
  | 'Redtail'
  | 'Orion'
  | 'Custodian Feed'
  // Construction
  | 'Procore'
  | 'Sage 300'
  | 'Autodesk';

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

// Legacy flat pool — retained for backward compatibility and used as the
// default export when no industry is specified. New consumers should read
// `actionPoolByIndustry[industryId]` via the industry context.
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
  // ERP / production
  SAP: 'bg-amber-50 text-amber-700 border-amber-200',
  'SAP Business One': 'bg-amber-50 text-amber-700 border-amber-200',
  NetSuite: 'bg-amber-50 text-amber-700 border-amber-200',
  MES: 'bg-amber-50 text-amber-700 border-amber-200',
  'Sage 300': 'bg-amber-50 text-amber-700 border-amber-200',
  // CRM / sales
  Salesforce: 'bg-blue-50 text-blue-700 border-blue-200',
  Redtail: 'bg-blue-50 text-blue-700 border-blue-200',
  // Accounting
  QuickBooks: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  // Pharmacy + compliance
  PioneerRx: 'bg-violet-50 text-violet-700 border-violet-200',
  'DEA CSOS': 'bg-violet-50 text-violet-700 border-violet-200',
  // Email / notifications
  SendGrid: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  Mailchimp: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  // Platform
  Courier: 'bg-crimsonTint text-crimson border-crimson/20',
  // Commerce / EDI
  Shopify: 'bg-lime-50 text-lime-700 border-lime-200',
  EDI: 'bg-lime-50 text-lime-700 border-lime-200',
  // Nonprofit
  "Raiser's Edge": 'bg-rose-50 text-rose-700 border-rose-200',
  // Healthcare
  Epic: 'bg-sky-50 text-sky-700 border-sky-200',
  Athenahealth: 'bg-sky-50 text-sky-700 border-sky-200',
  Kareo: 'bg-sky-50 text-sky-700 border-sky-200',
  // Property management
  Yardi: 'bg-teal-50 text-teal-700 border-teal-200',
  AppFolio: 'bg-teal-50 text-teal-700 border-teal-200',
  RealPage: 'bg-teal-50 text-teal-700 border-teal-200',
  // Professional services ops
  Mavenlink: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Harvest: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  // Financial services
  Orion: 'bg-slate-100 text-slate-700 border-slate-300',
  'Custodian Feed': 'bg-slate-100 text-slate-700 border-slate-300',
  // Construction
  Procore: 'bg-orange-50 text-orange-700 border-orange-200',
  Autodesk: 'bg-orange-50 text-orange-700 border-orange-200',
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
    className: 'bg-crimsonTint text-crimson border-crimson/30',
  },
};

/* =========================================================================
 *  PER-INDUSTRY ACTION POOLS (Kanban)
 * =========================================================================
 *  6–8 cards per industry. Mix of frontline and back-office actions.
 *  auto-approved cards flow straight through Queued → Running → Done;
 *  gated cards sit in Human Review until the engine promotes one.
 */
export const actionPoolByIndustry: Record<IndustryId, ActionCardData[]> = {
  manufacturing: [
    {
      id: 'mfg-1',
      name: 'Line-2 MRO — Belt Replacement WO',
      agent: 'Line Down Responder',
      risk: 'high',
      systems: ['SAP', 'MES'],
      summary:
        'Line 2 Bethlehem halted at 14:45 — belt tension fault. Creating maintenance WO, notifying plant manager.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'mfg-2',
      name: 'Emergency Steel PO — $47K Kraft Metals',
      agent: 'Raw Material Shortage Watcher',
      risk: 'high',
      systems: ['SAP Business One'],
      summary:
        'Cold-rolled steel at 36h supply. Emergency PO to Kraft Metals with expedited ship-date confirmation.',
      totalSteps: 3,
    },
    {
      id: 'mfg-3',
      name: 'SO-14821 Credit Release — Cascade Metals',
      agent: 'Credit Hold Responder',
      risk: 'medium',
      systems: ['SAP Business One', 'QuickBooks'],
      summary:
        '$82K sales order sitting on credit hold. Aging cleared last night — releasing after verification.',
      totalSteps: 3,
    },
    {
      id: 'mfg-4',
      name: 'Daily Production Summary Delivered',
      agent: 'Weekly Production Review',
      risk: 'low',
      systems: ['Courier'],
      summary:
        'OEE, scrap, downtime rollup across all lines delivered to plant managers and leadership (12 recipients).',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'mfg-5',
      name: 'Scrap RCA Ticket — Line 3 Shift-3',
      agent: 'OEE Anomaly Watcher',
      risk: 'medium',
      systems: ['MES', 'Salesforce'],
      summary:
        'Scrap rate spiked 340% above baseline at 02:00. Creating RCA ticket for QC team with correlated signals.',
      totalSteps: 3,
    },
    {
      id: 'mfg-6',
      name: 'Customer ETA Notification — PO-8834',
      agent: 'Inbound PO Processor',
      risk: 'low',
      systems: ['Salesforce', 'SendGrid'],
      summary:
        'Meridian Packaging PO confirmed with ship date 2026-04-29. Sending automated customer update email.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'mfg-7',
      name: 'Shift-Handoff Briefing — Day → Night',
      agent: 'Shift Handoff Scheduler',
      risk: 'low',
      systems: ['Courier'],
      summary:
        'Shift-change briefing with OEE deltas, open quality flags, and maintenance queue. 5 recipients.',
      totalSteps: 2,
      autoApproved: true,
    },
  ],
  pharmacy: [
    {
      id: 'ph-1',
      name: 'Void Damaged Ingredient Lot — LOT-A-2784',
      agent: 'Batch QC Watcher',
      risk: 'high',
      systems: ['PioneerRx', 'QuickBooks'],
      summary:
        'IV room reports 142 damaged doses from compromised lot. Voiding in PioneerRx, write-off entry in QB.',
      totalSteps: 3,
    },
    {
      id: 'ph-2',
      name: 'DEA Variance Explanation — Westside 3-Vial',
      agent: 'Controlled Substance Variance Watcher',
      risk: 'high',
      systems: ['PioneerRx', 'DEA CSOS'],
      summary:
        '3-vial ketamine variance at Westside. Compiling documentation, drafting DEA 222 variance form.',
      totalSteps: 3,
    },
    {
      id: 'ph-3',
      name: 'Prior-Auth 3rd-Tier Appeal — Patient B.R.',
      agent: 'Prior Auth Escalator',
      risk: 'medium',
      systems: ['PioneerRx', 'SendGrid'],
      summary:
        'Insurance denied 2 prior tiers. Escalating to 3rd-tier appeal with clinical justification package.',
      totalSteps: 3,
    },
    {
      id: 'ph-4',
      name: 'Ingredient Reorder — Testosterone Cypionate',
      agent: 'Ingredient Expiry Watcher',
      risk: 'medium',
      systems: ['SAP Business One'],
      summary:
        'Current lot expires 2026-05-03. Reorder placed, arrives 2026-04-29 — 4 days ahead of expiry.',
      totalSteps: 3,
    },
    {
      id: 'ph-5',
      name: 'Daily Location Briefing — 5 Locations',
      agent: 'Daily Location Summary',
      risk: 'low',
      systems: ['Courier'],
      summary:
        '268 scripts across 5 locations, role-tailored briefings delivered to 12 recipients by 06:00.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'ph-6',
      name: 'Prescriber Outreach — Dr. Ramirez',
      agent: 'Prescriber Volume Watcher',
      risk: 'low',
      systems: ['Salesforce', 'SendGrid'],
      summary:
        'Top prescriber volume dropped 68% in 60 days. Drafting outreach email, routing to regional director.',
      totalSteps: 2,
    },
    {
      id: 'ph-7',
      name: 'QC Lot Hold — Batch B-2041',
      agent: 'Batch QC Watcher',
      risk: 'high',
      systems: ['PioneerRx'],
      summary:
        'Potency assay at 92% of target (below 95% threshold). Auto-quarantining lot, paging QA lead.',
      totalSteps: 3,
      autoApproved: true,
    },
  ],
  distribution: [
    {
      id: 'dist-1',
      name: 'SO-14821 Credit Release — Cascade Metals $82K',
      agent: 'Credit Hold Responder',
      risk: 'medium',
      systems: ['SAP Business One', 'QuickBooks'],
      summary:
        'AR aging cleared last night. Releasing on-hold SO, notifying rep and warehouse for pick.',
      totalSteps: 3,
    },
    {
      id: 'dist-2',
      name: 'Vendor PO — 12 SKUs Below Reorder Point',
      agent: 'Reorder Point Watcher',
      risk: 'medium',
      systems: ['SAP Business One', 'EDI'],
      summary:
        'Auto-generated PO to Allegheny Steel for 12 SKUs. EDI 850 sent, ack expected in 4h.',
      totalSteps: 3,
      autoApproved: true,
    },
    {
      id: 'dist-3',
      name: 'EDI 850 Exception — Missing Part Number',
      agent: 'Inbound EDI Processor',
      risk: 'medium',
      systems: ['EDI', 'Salesforce'],
      summary:
        'Inbound EDI 850 from Northgate Supply missing line 3 part number. Routing to CS rep for clarification.',
      totalSteps: 3,
    },
    {
      id: 'dist-4',
      name: 'At-Risk Customer Outreach — Cascade Metals',
      agent: 'At-Risk Account Watcher',
      risk: 'low',
      systems: ['Salesforce'],
      summary:
        'Ordering velocity down 40% over 60 days. Creating CS outreach task for account owner Marcus Torres.',
      totalSteps: 2,
    },
    {
      id: 'dist-5',
      name: 'Weekly Territory Report Delivered',
      agent: 'Weekly Pipeline Review',
      risk: 'low',
      systems: ['Courier'],
      summary:
        'Territory pipeline + at-risk accounts + fill-rate delivered to sales leadership and 8 district managers.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'dist-6',
      name: 'Fill-Rate Anomaly Alert — Tacoma DC',
      agent: 'Fill-Rate Watcher',
      risk: 'medium',
      systems: ['SAP Business One', 'Courier'],
      summary:
        'Tacoma fill rate dropped to 87% (vs 96% baseline). Paging DC manager with top-10 stock-out list.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'dist-7',
      name: 'Customer Thank-You Follow-Up — Pacific NW',
      agent: 'Closed-Won Responder',
      risk: 'low',
      systems: ['Salesforce', 'SendGrid'],
      summary:
        'Pacific NW Construction renewal closed. Sending thank-you, spinning up onboarding checklist.',
      totalSteps: 3,
      autoApproved: true,
    },
  ],
  nonprofit: [
    {
      id: 'np-1',
      name: 'Grant 90-Day Progress Report — Hewlett $240K',
      agent: 'Grant Deadline Watcher',
      risk: 'medium',
      systems: ["Raiser's Edge", 'QuickBooks'],
      summary:
        'Compiling program outcomes + financial actuals into 90-day progress report. Due 2026-05-01.',
      totalSteps: 3,
    },
    {
      id: 'np-2',
      name: 'Major-Donor Call Plan — 47 Donors',
      agent: 'Lapsed Donor Watcher',
      risk: 'low',
      systems: ["Raiser's Edge", 'Salesforce'],
      summary:
        '47 major donors with no contact in 90+ days. Building call plan with last-gift and engagement context.',
      totalSteps: 2,
    },
    {
      id: 'np-3',
      name: 'Event RSVP Chase — Gala 2026',
      agent: 'Event RSVP Watcher',
      risk: 'low',
      systems: ['Mailchimp', 'Salesforce'],
      summary:
        '134 invitees without RSVP; event in 14 days. Sending personalized reminder sequence.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'np-4',
      name: 'Lapsed-Donor Win-Back — 6-12mo Cohort',
      agent: 'Lapsed Donor Watcher',
      risk: 'low',
      systems: ['Mailchimp'],
      summary:
        'Win-back sequence for 312 donors lapsed 6–12 months. Segmented by last gift tier.',
      totalSteps: 3,
      autoApproved: true,
    },
    {
      id: 'np-5',
      name: 'Board Packet Narrative — Q1 2026',
      agent: 'Board Packet Scheduler',
      risk: 'low',
      systems: ['Courier'],
      summary:
        'Q1 narrative package compiled from Raiser\'s Edge + QuickBooks, delivered to board chair and ED.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'np-6',
      name: 'Thank-You Letter Batch — 127 Weekend Gifts',
      agent: 'Gift Acknowledgment Responder',
      risk: 'low',
      systems: ["Raiser's Edge", 'SendGrid'],
      summary:
        '127 weekend gifts acknowledged with tier-specific thank-you language; IRS receipts attached.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'np-7',
      name: 'Pledge Reminder — Q2 Monthly Giving',
      agent: 'Pledge Reminder Scheduler',
      risk: 'low',
      systems: ['Mailchimp'],
      summary:
        'Q2 monthly-giving reminders to 1,840 sustainers; credit-card expiry refresh flow included.',
      totalSteps: 2,
      autoApproved: true,
    },
  ],
  healthcare: [
    {
      id: 'hc-1',
      name: 'Aetna Denial Appeal Batch — 34 Claims',
      agent: 'Denial Appeal Processor',
      risk: 'medium',
      systems: ['Athenahealth', 'Kareo'],
      summary:
        '34 CARC 97/204 denials from Aetna. Generating appeal packages with chart notes and submitting.',
      totalSteps: 3,
    },
    {
      id: 'hc-2',
      name: 'Provider Reassignment — Phoenix Overflow',
      agent: 'Volume-vs-Staffing Watcher',
      risk: 'medium',
      systems: ['Epic', 'Courier'],
      summary:
        '2 MA providers reassigned from Scottsdale to Phoenix for Thursday overflow. Schedules updated.',
      totalSteps: 2,
    },
    {
      id: 'hc-3',
      name: 'No-Show Follow-Up Sequence',
      agent: 'No-Show Responder',
      risk: 'low',
      systems: ['Athenahealth', 'SendGrid'],
      summary:
        '41 no-shows yesterday across 8 locations. Rescheduling outreach + copay reminder sent.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'hc-4',
      name: 'AR Escalation — Balances > 120 Days',
      agent: 'AR Aging Watcher',
      risk: 'medium',
      systems: ['Kareo', 'QuickBooks'],
      summary:
        '$142K in patient balances over 120 days. Routing to collections with payment plan options.',
      totalSteps: 3,
    },
    {
      id: 'hc-5',
      name: 'Prior-Auth Submit — 18 Cases',
      agent: 'Prior Auth Scheduler',
      risk: 'low',
      systems: ['Epic', 'Athenahealth'],
      summary:
        '18 prior-auth packages prepared with clinical documentation. Submitted to 6 payers.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'hc-6',
      name: 'Daily RCM Snapshot Delivered',
      agent: 'Daily RCM Scheduler',
      risk: 'low',
      systems: ['Courier'],
      summary:
        'Charges, collections, AR aging by location delivered to RCM director and 8 practice admins.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'hc-7',
      name: 'Patient Balance Reminder — 623 Accounts',
      agent: 'Patient Statement Scheduler',
      risk: 'low',
      systems: ['Kareo', 'SendGrid'],
      summary:
        '623 patient-balance reminders with payment-plan links sent via patient portal + email.',
      totalSteps: 2,
      autoApproved: true,
    },
  ],
  propertyManagement: [
    {
      id: 'pm-1',
      name: '90-Day Renewal Outreach — 47 Units',
      agent: 'Lease Expiration Watcher',
      risk: 'low',
      systems: ['Yardi', 'SendGrid'],
      summary:
        '47 leases expiring in 90 days without renewal activity. Personalized outreach sequence sent.',
      totalSteps: 2,
    },
    {
      id: 'pm-2',
      name: 'Capex Approval — Riverside-B Elevator $18K',
      agent: 'Maintenance Cost Watcher',
      risk: 'high',
      systems: ['Yardi', 'QuickBooks'],
      summary:
        '2nd breakdown in 30 days at Riverside-B. Vendor quote comparison attached; capex coding ready.',
      totalSteps: 3,
    },
    {
      id: 'pm-3',
      name: 'Delinquency 3-Day Notice — 28 Units',
      agent: 'Delinquency Watcher',
      risk: 'medium',
      systems: ['AppFolio', 'SendGrid'],
      summary:
        '28 residents past 10 days. 3-day notices generated and delivered per state statute.',
      totalSteps: 3,
      autoApproved: true,
    },
    {
      id: 'pm-4',
      name: 'Maintenance WO Approval — Lakeside HVAC',
      agent: 'Maintenance Triage',
      risk: 'medium',
      systems: ['Yardi'],
      summary:
        'Emergency HVAC repair at Lakeside-C, $4.8K. Approving after vendor comparison.',
      totalSteps: 2,
    },
    {
      id: 'pm-5',
      name: 'Monthly Ownership Report Delivered',
      agent: 'Ownership Report Scheduler',
      risk: 'low',
      systems: ['Courier'],
      summary:
        'Occupancy, rent roll, NOI vs plan, aging delivered to 6 ownership groups.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'pm-6',
      name: 'Vacancy Marketing Spin-Up — 12 Units',
      agent: 'Vacancy Marketing Processor',
      risk: 'low',
      systems: ['AppFolio', 'RealPage'],
      summary:
        '12 units back to market. Listings pushed to syndication, photo packages queued, tours calendar opened.',
      totalSteps: 3,
      autoApproved: true,
    },
    {
      id: 'pm-7',
      name: 'Move-Out Sweep — Fairview Tower',
      agent: 'Move-In/Move-Out Scheduler',
      risk: 'low',
      systems: ['Yardi'],
      summary:
        '14 move-outs this week. Deposit accounting, inspection schedule, turn-vendor dispatch queued.',
      totalSteps: 3,
    },
  ],
  professionalServices: [
    {
      id: 'ps-1',
      name: 'Early-Warning — Hartford Engagement',
      agent: 'Budget-Burn Watcher',
      risk: 'medium',
      systems: ['Mavenlink', 'Harvest'],
      summary:
        '87% budget consumed, 42% scope remaining. Heads-up to PM with revised ETC and client-conversation draft.',
      totalSteps: 3,
    },
    {
      id: 'ps-2',
      name: 'Invoice Write-Down Approval — $12K',
      agent: 'WIP Aging Watcher',
      risk: 'medium',
      systems: ['NetSuite', 'QuickBooks'],
      summary:
        'Disputed invoice written down $12K after client negotiation. GL coding + approval routed to CFO.',
      totalSteps: 3,
    },
    {
      id: 'ps-3',
      name: 'Bench Reassignment — BD Project',
      agent: 'Utilization Watcher',
      risk: 'low',
      systems: ['Mavenlink'],
      summary:
        '40 bench hours reassigned to active BD project. Staffing plan and schedules updated.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'ps-4',
      name: 'Contract Renewal Prep — 6 Clients',
      agent: 'Contract Renewal Scheduler',
      risk: 'low',
      systems: ['Salesforce'],
      summary:
        '6 clients in renewal window. MSA summaries, scope deltas, and margin analysis packaged for AEs.',
      totalSteps: 2,
    },
    {
      id: 'ps-5',
      name: 'Weekly Partner Briefing Delivered',
      agent: 'Weekly Partner Review',
      risk: 'low',
      systems: ['Courier'],
      summary:
        'Utilization, engagement margin, WIP aging, pipeline delivered to 14 partners.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'ps-6',
      name: 'WIP Aging Escalation — 90+ Days',
      agent: 'WIP Aging Watcher',
      risk: 'medium',
      systems: ['NetSuite', 'QuickBooks'],
      summary:
        '$186K WIP over 90 days across 4 engagements. Escalating to partners with invoice-ready packages.',
      totalSteps: 3,
    },
    {
      id: 'ps-7',
      name: 'Timesheet Chase — 12 Consultants',
      agent: 'Timesheet Compliance Scheduler',
      risk: 'low',
      systems: ['Harvest', 'SendGrid'],
      summary:
        '12 consultants missing timesheets from last week. Reminders sent with manager CC.',
      totalSteps: 2,
      autoApproved: true,
    },
  ],
  financialServices: [
    {
      id: 'fs-1',
      name: 'Review-Meeting Batch — 47 Clients',
      agent: 'Client Review Trigger',
      risk: 'low',
      systems: ['Redtail', 'Salesforce'],
      summary:
        '47 clients due for annual review in next 45 days. Scheduling sequence with pre-populated context.',
      totalSteps: 2,
    },
    {
      id: 'fs-2',
      name: 'Form ADV Annual Amendment',
      agent: 'Compliance Calendar Scheduler',
      risk: 'high',
      systems: ['Redtail', 'QuickBooks'],
      summary:
        'Q1 amendment assembled with AUM + advisor data. Due 2026-05-01; compliance review gate.',
      totalSteps: 3,
    },
    {
      id: 'fs-3',
      name: 'Suitability Review Flag — Rebalance',
      agent: 'Suitability Watcher',
      risk: 'high',
      systems: ['Orion'],
      summary:
        'Proposed rebalance for client R.M. outside target allocation. Flagging for CCO review.',
      totalSteps: 3,
      autoApproved: true,
    },
    {
      id: 'fs-4',
      name: 'Fee Variance Exception — Schwab Q1',
      agent: 'Fee Reconciliation Watcher',
      risk: 'medium',
      systems: ['Custodian Feed', 'QuickBooks'],
      summary:
        '14 accounts with fee variance vs custodian feed. Exception report + adjustment entries drafted.',
      totalSteps: 3,
    },
    {
      id: 'fs-5',
      name: 'RMD Reminder — 84 Clients',
      agent: 'RMD Scheduler',
      risk: 'low',
      systems: ['Redtail', 'SendGrid'],
      summary:
        '84 clients with RMDs due by 2026-12-31. Personalized reminder sent; advisor follow-up queued.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'fs-6',
      name: 'Advisor Weekly Briefing Delivered',
      agent: 'Advisor Weekly Scheduler',
      risk: 'low',
      systems: ['Courier'],
      summary:
        'AUM deltas, engagement flags, life-event alerts delivered to 45 advisors by 07:00.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'fs-7',
      name: 'Life-Event Outreach — Client S.T.',
      agent: 'Life Event Watcher',
      risk: 'low',
      systems: ['Salesforce', 'SendGrid'],
      summary:
        'Retirement transition detected. Advisor outreach with pre-retirement planning agenda.',
      totalSteps: 2,
    },
  ],
  foodBeverage: [
    {
      id: 'fb-1',
      name: 'Disposal Batch A-2784 — 480 Units',
      agent: 'Shelf-Life Watcher',
      risk: 'high',
      systems: ['SAP Business One', 'QuickBooks'],
      summary:
        '480 units shelf-life breach. Inventory adjustment, write-off coding, FDA compliance log entry.',
      totalSteps: 3,
    },
    {
      id: 'fb-2',
      name: 'Distributor Replenishment PO — 23 SKUs',
      agent: 'Distributor Velocity Watcher',
      risk: 'low',
      systems: ['NetSuite', 'Shopify'],
      summary:
        '23 SKUs below safety stock at Restaurant Depot. Auto-PO generated, confirmed, shipping Thursday.',
      totalSteps: 3,
      autoApproved: true,
    },
    {
      id: 'fb-3',
      name: 'Recipe BOM Update — Arabica Cost',
      agent: 'Ingredient Cost Watcher',
      risk: 'medium',
      systems: ['SAP Business One'],
      summary:
        'Arabica green-bean cost up 14% from new contract. Updating 8 recipe BOMs and standard costs.',
      totalSteps: 3,
    },
    {
      id: 'fb-4',
      name: 'Promotional Velocity Alert — Coffee Blends',
      agent: 'Promo Performance Watcher',
      risk: 'low',
      systems: ['Shopify', 'Salesforce'],
      summary:
        'Spring-blend promo running 38% below velocity target. Alerting VP Ops with root-cause signals.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'fb-5',
      name: 'Weekly Yield Report Delivered',
      agent: 'Production Yield Scheduler',
      risk: 'low',
      systems: ['Courier'],
      summary:
        'Batch yield + waste + ingredient variance delivered to production managers across 3 facilities.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'fb-6',
      name: 'Spoilage Write-Off Entry — Q1',
      agent: 'Spoilage Reconciliation Processor',
      risk: 'low',
      systems: ['QuickBooks'],
      summary:
        '$34K Q1 spoilage reconciled against disposal logs. Write-off entries by facility posted.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'fb-7',
      name: 'FDA Compliance Log — Week 17',
      agent: 'FDA Compliance Scheduler',
      risk: 'low',
      systems: ['Courier'],
      summary:
        'Weekly compliance log with disposals, QC failures, and lot traceability filed with QA director.',
      totalSteps: 2,
      autoApproved: true,
    },
  ],
  construction: [
    {
      id: 'c-1',
      name: 'Change Order Approval — Parker Medical $142K',
      agent: 'Change Order Watcher',
      risk: 'high',
      systems: ['Procore', 'Sage 300'],
      summary:
        'Steel price escalation on Parker Medical tower. CO package + cost impact ready for CFO approval.',
      totalSteps: 3,
    },
    {
      id: 'c-2',
      name: 'Retainage Release — Parker Mechanical',
      agent: 'Retainage Scheduler',
      risk: 'medium',
      systems: ['Sage 300', 'QuickBooks'],
      summary:
        'Substantial-completion achieved; lien waivers clean. Releasing $88K retainage.',
      totalSteps: 3,
    },
    {
      id: 'c-3',
      name: 'Lien Waiver Chase — Subcontractor Watch List',
      agent: 'Lien Waiver Watcher',
      risk: 'medium',
      systems: ['Procore', 'SendGrid'],
      summary:
        '7 subcontractors missing conditional waivers for April draw. Reminders sent with form links.',
      totalSteps: 2,
    },
    {
      id: 'c-4',
      name: 'Equipment Reassignment — Crane Alpha-3',
      agent: 'Fleet Utilization Watcher',
      risk: 'low',
      systems: ['Procore', 'Autodesk'],
      summary:
        'Crane Alpha-3 idle 4 days at Cedar Park. Reassigning to Horizon Industrial; transport scheduled.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'c-5',
      name: 'Weekly Job-Cost Report Delivered',
      agent: 'Weekly Job Cost Scheduler',
      risk: 'low',
      systems: ['Courier'],
      summary:
        'Earned-value variance, CO backlog, sub scorecard delivered to CFO and 6 PMs by 06:00.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'c-6',
      name: 'Budget-Burn Alert — Riverwalk Hotel',
      agent: 'Budget-Burn Watcher',
      risk: 'medium',
      systems: ['Procore', 'Sage 300'],
      summary:
        'Riverwalk at 92% cost with 78% schedule complete. Early-warning routed to PM + VP Ops.',
      totalSteps: 2,
      autoApproved: true,
    },
    {
      id: 'c-7',
      name: 'RFI Response Chase — 12 Open',
      agent: 'RFI Aging Watcher',
      risk: 'low',
      systems: ['Procore', 'SendGrid'],
      summary:
        '12 RFIs open over 5 days across 3 projects. Reminders sent to designers with urgency flags.',
      totalSteps: 2,
      autoApproved: true,
    },
  ],
};

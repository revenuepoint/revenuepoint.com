import type { IndustryId } from '@/context/IndustryContext';

export type AgentType = 'watcher' | 'processor' | 'scheduler' | 'responder';

export type FoundryAgent = {
  id: string;
  name: string;
  type: AgentType;
  category: string;
  description: string;
  schedule: string;
  successRate: number;
  avgDuration: string;
  lastRun: string;
  nextRun: string;
  recentRuns: Array<'success' | 'failed' | 'running'>;
};

const ALL_SUCCESS: FoundryAgent['recentRuns'] = Array(30).fill('success');
const MOSTLY_SUCCESS: FoundryAgent['recentRuns'] = [
  ...Array(7).fill('success'),
  'failed',
  ...Array(22).fill('success'),
] as FoundryAgent['recentRuns'];
const WITH_RUNNING: FoundryAgent['recentRuns'] = [
  ...Array(12).fill('success'),
  'failed',
  ...Array(7).fill('success'),
  'running',
  ...Array(9).fill('success'),
] as FoundryAgent['recentRuns'];

export const foundryAgentsByIndustry: Record<IndustryId, FoundryAgent[]> = {
  manufacturing: [
    {
      id: 'm-a1',
      name: 'OEE Anomaly Watcher',
      type: 'watcher',
      category: 'Production · all lines',
      description:
        'Monitors Overall Equipment Effectiveness across every line and shift. Fires when any line drops below 80% or when scrap rate spikes 2σ above the rolling 30-day baseline.',
      schedule: 'Continuous · 5-minute windows',
      successRate: 99,
      avgDuration: '1.4s',
      lastRun: '3m ago',
      nextRun: 'continuous',
      recentRuns: MOSTLY_SUCCESS,
    },
    {
      id: 'm-a2',
      name: 'Inbound PO Processor',
      type: 'processor',
      category: 'Sales · SAP Business One',
      description:
        'Reads incoming EDI and email purchase orders, validates against customer master + credit line, and creates sales orders in SAP with ship-date confirmation.',
      schedule: 'On receipt · continuous',
      successRate: 98,
      avgDuration: '3.1s',
      lastRun: '1m ago',
      nextRun: 'continuous',
      recentRuns: WITH_RUNNING,
    },
    {
      id: 'm-a3',
      name: 'Weekly Production Review',
      type: 'scheduler',
      category: 'Operations · Leadership',
      description:
        'Compiles OEE, throughput, scrap, and downtime across all lines for the past week. Delivers a plant-manager briefing with anomaly callouts every Monday.',
      schedule: 'Mondays at 6:00 AM',
      successRate: 100,
      avgDuration: '52s',
      lastRun: '2d ago',
      nextRun: 'in 5d',
      recentRuns: ALL_SUCCESS,
    },
  ],
  pharmacy: [
    {
      id: 'p-a1',
      name: 'Controlled Substance Variance Watcher',
      type: 'watcher',
      category: 'LETCO · Compliance',
      description:
        'Reconciles nightly dispensing logs against inventory for DEA-scheduled substances. Flags any unexplained variance within the 24-hour audit window.',
      schedule: 'Daily at 11:00 PM',
      successRate: 99,
      avgDuration: '2m 14s',
      lastRun: '7h ago',
      nextRun: 'in 16h',
      recentRuns: MOSTLY_SUCCESS,
    },
    {
      id: 'p-a2',
      name: 'Prescription Intake Processor',
      type: 'processor',
      category: 'Harborline · Operations',
      description:
        'Reads incoming electronic prescriptions, validates completeness, screens for interactions against the patient profile, and routes to the right compounding queue.',
      schedule: 'On receipt · continuous',
      successRate: 97,
      avgDuration: '2.3s',
      lastRun: '4m ago',
      nextRun: 'continuous',
      recentRuns: WITH_RUNNING,
    },
    {
      id: 'p-a3',
      name: 'Daily Location Summary',
      type: 'scheduler',
      category: 'Harborline · Operations',
      description:
        'Compiles script volume, turnaround, QC outcomes, and revenue across every location, then delivers a role-tailored briefing via Courier each morning.',
      schedule: 'Daily at 6:00 AM',
      successRate: 100,
      avgDuration: '48s',
      lastRun: '2h ago',
      nextRun: 'in 22h',
      recentRuns: ALL_SUCCESS,
    },
  ],
  distribution: [
    {
      id: 'd-a1',
      name: 'At-Risk Account Watcher',
      type: 'watcher',
      category: 'Sales · Salesforce + QuickBooks',
      description:
        'Detects drop-off patterns in order cadence, rising support volume, and AR aging across the book. Flags accounts with composite churn risk > 60%.',
      schedule: 'Daily at 7:30 AM',
      successRate: 100,
      avgDuration: '38s',
      lastRun: '6h ago',
      nextRun: 'in 18h',
      recentRuns: ALL_SUCCESS,
    },
    {
      id: 'd-a2',
      name: 'Inbound EDI Processor',
      type: 'processor',
      category: 'Operations · SAP Business One',
      description:
        'Consumes EDI 850 purchase orders, validates against customer terms + stock, creates sales orders, and raises exceptions for pricing or credit mismatches.',
      schedule: 'On receipt · continuous',
      successRate: 97,
      avgDuration: '2.8s',
      lastRun: '7m ago',
      nextRun: 'continuous',
      recentRuns: WITH_RUNNING,
    },
    {
      id: 'd-a3',
      name: 'Territory Performance Summary',
      type: 'scheduler',
      category: 'Sales Leadership',
      description:
        'Compiles territory-level revenue, new-logo count, pipeline delta, and at-risk-account list. Delivers by 7 AM Monday with rep-level breakouts.',
      schedule: 'Mondays at 7:00 AM',
      successRate: 100,
      avgDuration: '1m 12s',
      lastRun: '2d ago',
      nextRun: 'in 5d',
      recentRuns: ALL_SUCCESS,
    },
  ],
  nonprofit: [
    {
      id: 'n-a1',
      name: 'Lapsed Donor Watcher',
      type: 'watcher',
      category: "Raiser's Edge · Development",
      description:
        'Identifies major donors who have lapsed by >90 days vs. their giving cadence. Builds a re-engagement list with last-gift context and cultivation notes.',
      schedule: 'Daily at 6:30 AM',
      successRate: 99,
      avgDuration: '42s',
      lastRun: '8h ago',
      nextRun: 'in 16h',
      recentRuns: MOSTLY_SUCCESS,
    },
    {
      id: 'n-a2',
      name: 'Grant Deadline Watcher',
      type: 'watcher',
      category: 'Finance · Grants',
      description:
        'Tracks every grant application, reporting requirement, and renewal deadline. Sends 60/30/7-day alerts to the Development Director with prep checklists.',
      schedule: 'Daily at 8:00 AM',
      successRate: 100,
      avgDuration: '18s',
      lastRun: '4h ago',
      nextRun: 'in 20h',
      recentRuns: ALL_SUCCESS,
    },
    {
      id: 'n-a3',
      name: 'Campaign Pace Summary',
      type: 'scheduler',
      category: 'Development Leadership',
      description:
        'During active campaigns, compiles hourly pace-to-goal, donor-count, and channel mix. Delivers to the ED and board chair with forecast-to-close.',
      schedule: 'Hourly during campaigns',
      successRate: 100,
      avgDuration: '12s',
      lastRun: '12m ago',
      nextRun: 'in 48m',
      recentRuns: ALL_SUCCESS,
    },
  ],
  healthcare: [
    {
      id: 'hc-a1',
      name: 'Claim Denial Rate Watcher',
      type: 'watcher',
      category: 'Revenue Cycle · All Payers',
      description:
        'Monitors denial rates by payer and denial reason code daily. Fires when any payer exceeds a 10% denial rate or when a new denial pattern emerges across 3+ claims.',
      schedule: 'Daily at 7:00 AM',
      successRate: 99,
      avgDuration: '58s',
      lastRun: '5h ago',
      nextRun: 'in 19h',
      recentRuns: MOSTLY_SUCCESS,
    },
    {
      id: 'hc-a2',
      name: 'No-Show Slot Fill Processor',
      type: 'processor',
      category: 'Scheduling · All Locations',
      description:
        'Detects same-day cancellations and no-shows, then matches open slots against the active waitlist by provider, specialty, and insurance. Sends fill offers automatically.',
      schedule: 'On cancellation · continuous',
      successRate: 96,
      avgDuration: '4.2s',
      lastRun: '18m ago',
      nextRun: 'continuous',
      recentRuns: WITH_RUNNING,
    },
    {
      id: 'hc-a3',
      name: 'Weekly Revenue Cycle Summary',
      type: 'scheduler',
      category: 'Operations Leadership',
      description:
        'Compiles charges, collections, denials, and AR aging by location and payer for the prior week. Delivered to the Revenue Cycle Director and CFO each Monday morning.',
      schedule: 'Mondays at 7:00 AM',
      successRate: 100,
      avgDuration: '1m 22s',
      lastRun: '2d ago',
      nextRun: 'in 5d',
      recentRuns: ALL_SUCCESS,
    },
  ],
  propertyManagement: [
    {
      id: 'pm-a1',
      name: 'Lease Expiration Watcher',
      type: 'watcher',
      category: 'Leasing · All Properties',
      description:
        'Tracks every lease expiration across the portfolio. Fires renewal-outreach triggers at 90, 60, and 30 days with resident contact info and current market-rate context.',
      schedule: 'Daily at 7:30 AM',
      successRate: 100,
      avgDuration: '34s',
      lastRun: '6h ago',
      nextRun: 'in 18h',
      recentRuns: ALL_SUCCESS,
    },
    {
      id: 'pm-a2',
      name: 'Delinquency Communication Processor',
      type: 'processor',
      category: 'AR · All Properties',
      description:
        'Identifies residents past due by 3, 10, and 30 days. Sends tiered notices, logs each communication in the property management system, and escalates to the property manager at 30 days.',
      schedule: 'Daily at 8:00 AM',
      successRate: 98,
      avgDuration: '1m 08s',
      lastRun: '4h ago',
      nextRun: 'in 20h',
      recentRuns: MOSTLY_SUCCESS,
    },
    {
      id: 'pm-a3',
      name: 'Monthly Ownership Report',
      type: 'scheduler',
      category: 'Asset Management · Leadership',
      description:
        'Compiles occupancy, rent roll, collections, maintenance spend, and NOI by property for the prior month. Delivered to ownership and asset managers on the first business day.',
      schedule: '1st business day · 7:00 AM',
      successRate: 100,
      avgDuration: '2m 14s',
      lastRun: '18d ago',
      nextRun: 'in 13d',
      recentRuns: ALL_SUCCESS,
    },
  ],
  professionalServices: [
    {
      id: 'ps-a1',
      name: 'At-Risk Project Watcher',
      type: 'watcher',
      category: 'Project Management · All Engagements',
      description:
        'Monitors budget-to-actual burn across all active engagements. Fires when a project exceeds 80% of budget before 70% of the timeline, or when weekly burn rate accelerates by more than 25%.',
      schedule: 'Daily at 7:00 AM',
      successRate: 99,
      avgDuration: '44s',
      lastRun: '7h ago',
      nextRun: 'in 17h',
      recentRuns: MOSTLY_SUCCESS,
    },
    {
      id: 'ps-a2',
      name: 'AR Overdue Follow-Up Processor',
      type: 'processor',
      category: 'Finance · Accounts Receivable',
      description:
        'Identifies invoices overdue by 15, 30, and 60 days. Sends tiered follow-up sequences to client contacts, logs activity in the CRM, and escalates to the account lead at 45 days.',
      schedule: 'Daily at 8:30 AM',
      successRate: 97,
      avgDuration: '52s',
      lastRun: '3h ago',
      nextRun: 'in 21h',
      recentRuns: WITH_RUNNING,
    },
    {
      id: 'ps-a3',
      name: 'Weekly Utilization Summary',
      type: 'scheduler',
      category: 'Operations · Leadership',
      description:
        'Compiles billable utilization, bench time, project margin, and pipeline-to-capacity ratio by team and practice. Delivered to managing partners every Monday morning.',
      schedule: 'Mondays at 6:30 AM',
      successRate: 100,
      avgDuration: '1m 04s',
      lastRun: '2d ago',
      nextRun: 'in 5d',
      recentRuns: ALL_SUCCESS,
    },
  ],
  financialServices: [
    {
      id: 'fs-a1',
      name: 'Client Review Trigger Watcher',
      type: 'watcher',
      category: 'Advisory · All Advisors',
      description:
        'Surfaces clients due for annual review, significant portfolio threshold breaches, and life-event signals. Sends each advisor a prioritized daily list with pre-populated meeting context.',
      schedule: 'Daily at 7:00 AM',
      successRate: 100,
      avgDuration: '38s',
      lastRun: '5h ago',
      nextRun: 'in 19h',
      recentRuns: ALL_SUCCESS,
    },
    {
      id: 'fs-a2',
      name: 'Fee Reconciliation Processor',
      type: 'processor',
      category: 'Operations · Custodian Feeds',
      description:
        'Reconciles advisory fees billed against custodian AUM data daily. Flags discrepancies above $100 for operations review and logs all matched items to the compliance audit trail.',
      schedule: 'Daily at 6:00 AM',
      successRate: 99,
      avgDuration: '1m 48s',
      lastRun: '6h ago',
      nextRun: 'in 18h',
      recentRuns: MOSTLY_SUCCESS,
    },
    {
      id: 'fs-a3',
      name: 'Advisor Performance Summary',
      type: 'scheduler',
      category: 'Leadership · All Offices',
      description:
        'Compiles AUM, net flows, revenue, client review completion rate, and at-risk client count by advisor and office. Delivered to managing directors each Monday.',
      schedule: 'Mondays at 7:00 AM',
      successRate: 100,
      avgDuration: '58s',
      lastRun: '2d ago',
      nextRun: 'in 5d',
      recentRuns: ALL_SUCCESS,
    },
  ],
  foodBeverage: [
    {
      id: 'fb-a1',
      name: 'Shelf-Life & Expiry Watcher',
      type: 'watcher',
      category: 'Inventory · All Facilities',
      description:
        'Monitors ingredient and finished-goods expiry dates across all facilities. Triggers disposal, redistribution, or reorder actions 72 hours before shelf-life thresholds are breached.',
      schedule: 'Continuous · 2-hour windows',
      successRate: 99,
      avgDuration: '2.1s',
      lastRun: '1h ago',
      nextRun: 'continuous',
      recentRuns: MOSTLY_SUCCESS,
    },
    {
      id: 'fb-a2',
      name: 'Out-of-Stock Reorder Processor',
      type: 'processor',
      category: 'Procurement · All SKUs',
      description:
        'Monitors distributor sales velocity and warehouse stock levels. When a SKU drops below the reorder point, automatically generates a purchase order to the preferred supplier.',
      schedule: 'On threshold breach · continuous',
      successRate: 98,
      avgDuration: '3.4s',
      lastRun: '22m ago',
      nextRun: 'continuous',
      recentRuns: WITH_RUNNING,
    },
    {
      id: 'fb-a3',
      name: 'Weekly Production & Margin Summary',
      type: 'scheduler',
      category: 'Operations · Leadership',
      description:
        'Compiles batch yield, waste, ingredient cost variance, and gross margin by product line and facility for the prior week. Delivered to the COO and Controller each Monday.',
      schedule: 'Mondays at 6:00 AM',
      successRate: 100,
      avgDuration: '1m 16s',
      lastRun: '2d ago',
      nextRun: 'in 5d',
      recentRuns: ALL_SUCCESS,
    },
  ],
  construction: [
    {
      id: 'cx-a1',
      name: 'Budget Burn Watcher',
      type: 'watcher',
      category: 'Project Controls · All Jobs',
      description:
        'Monitors cost-to-complete and burn rate across every active project. Fires when a job exceeds 80% of budget before 70% of schedule, or when weekly cost acceleration exceeds 20%.',
      schedule: 'Daily at 6:30 AM',
      successRate: 99,
      avgDuration: '1m 02s',
      lastRun: '8h ago',
      nextRun: 'in 16h',
      recentRuns: MOSTLY_SUCCESS,
    },
    {
      id: 'cx-a2',
      name: 'Change Order Processor',
      type: 'processor',
      category: 'Project Management · All Jobs',
      description:
        'Receives approved change orders from the field, updates the job cost budget in the ERP, notifies the project controller, and logs the revenue impact to the bid-vs-actual tracker.',
      schedule: 'On approval · continuous',
      successRate: 97,
      avgDuration: '4.8s',
      lastRun: '34m ago',
      nextRun: 'continuous',
      recentRuns: WITH_RUNNING,
    },
    {
      id: 'cx-a3',
      name: 'Weekly Job Cost Summary',
      type: 'scheduler',
      category: 'Finance · Leadership',
      description:
        'Compiles earned value, budget-to-complete, change order backlog, and margin by project for the prior week. Delivered to the CFO and VP of Operations each Monday morning.',
      schedule: 'Mondays at 6:00 AM',
      successRate: 100,
      avgDuration: '1m 38s',
      lastRun: '2d ago',
      nextRun: 'in 5d',
      recentRuns: ALL_SUCCESS,
    },
  ],
};

export type FeedItemType = 'anomaly' | 'agent' | 'report';

export type FeedItemKpi = { label: string; value: string; tone: 'good' | 'bad' | 'neutral' };
export type FeedItemField = { label: string; value: string };

export type FoundryFeedItem = {
  id: string;
  type: FeedItemType;
  category: string;
  headline: string;
  body: string;
  timestamp: string;
  severity?: 'critical' | 'high';
  status?: 'active' | 'acknowledged' | 'resolved';
  kpis?: FeedItemKpi[];
  sparkline?: number[];
  sparkColor?: string;
  fields?: FeedItemField[];
};

export const foundryFeedItemsByIndustry: Record<IndustryId, FoundryFeedItem[]> = {
  manufacturing: [
    {
      id: 'm-f1',
      type: 'anomaly',
      category: 'Production · RADAR',
      headline: 'Scrap rate spike on Line 3 — 8.2% vs 1.9% baseline',
      body:
        'Scrap at 02:04 AM spiked to 340% of the 30-day baseline. No maintenance event logged. T-204 temperature drift and a mid-shift operator swap correlate with the event.',
      timestamp: '2:04 AM · overnight',
      severity: 'critical',
      status: 'active',
      kpis: [
        { label: 'Scrap now', value: '8.2%', tone: 'bad' },
        { label: '30-day avg', value: '1.9%', tone: 'neutral' },
        { label: 'Line OEE', value: '68%', tone: 'bad' },
        { label: 'Since event', value: '4h 02m', tone: 'neutral' },
      ],
    },
    {
      id: 'm-f2',
      type: 'agent',
      category: 'Sales · AGENT ACTIVITY',
      headline: 'Inbound PO Processor — PO-9104 → SO-14821 created',
      body:
        'PO-9104 from Pacific NW Construction: 5,000 M10 steel hex bolts at $0.42/unit, ship date 2026-04-10. Sales order SO-14821 created in SAP, confirmation queued to the buyer.',
      timestamp: '14:03 · today',
      fields: [
        { label: 'Customer', value: 'Pacific NW Construction' },
        { label: 'Line items', value: '5,000 × SKU-2847 @ $0.42' },
        { label: 'Ship', value: 'Tacoma DC · 2026-04-10' },
        { label: 'Decision time', value: '1.5 seconds' },
      ],
    },
    {
      id: 'm-f3',
      type: 'report',
      category: 'Operations · COURIER',
      headline: 'Weekly Production Review — OEE 74.3% across 3 lines',
      body:
        'Line 3 OEE (68%) is dragging the plant average. Scrap spike last Tuesday accounted for 41% of the week\'s waste. Lines 1 and 2 are healthy (78% / 79%).',
      timestamp: '6:00 AM · Monday',
      kpis: [
        { label: 'OEE avg', value: '74.3%', tone: 'bad' },
        { label: 'Throughput', value: '847 u/day', tone: 'good' },
        { label: 'Scrap', value: '2.4%', tone: 'bad' },
        { label: 'Downtime', value: '14.2 h/wk', tone: 'bad' },
      ],
      sparkline: [82, 81, 80, 79, 78, 78, 76, 75, 77, 74, 75, 74],
      sparkColor: '#C0392B',
    },
    {
      id: 'm-f4',
      type: 'agent',
      category: 'Production · AGENT ACTIVITY',
      headline: 'Shift Handoff Scheduler — overnight briefing delivered',
      body:
        'End-of-shift briefing compiled for the incoming day crew: 2 line stops totaling 38 minutes, scrap at 2.1%, Line 3 still on Job 8821 with 62% complete.',
      timestamp: '6:00 AM · today',
      fields: [
        { label: 'Line stops', value: '2 · 38 minutes total' },
        { label: 'Scrap (overnight)', value: '2.1% · within range' },
        { label: 'Open jobs', value: '4 (Lines 1, 2, 3, 5)' },
        { label: 'Delivered to', value: 'Day shift leads · 12 recipients' },
      ],
    },
    {
      id: 'm-f5',
      type: 'report',
      category: 'Quality · COURIER',
      headline: 'Daily First-Pass Yield — 96.8% across all lines',
      body:
        'First-pass yield held above the 96% target for the fifth consecutive day. Line 2 led at 98.4%; Line 3 trailed at 94.1% — correlated with the overnight scrap event on T-204.',
      timestamp: '7:00 AM · today',
      kpis: [
        { label: 'FPY avg', value: '96.8%', tone: 'good' },
        { label: 'Line 2 best', value: '98.4%', tone: 'good' },
        { label: 'Line 3 worst', value: '94.1%', tone: 'bad' },
        { label: 'Target', value: '96.0%', tone: 'neutral' },
      ],
      sparkline: [95.9, 96.1, 96.3, 96.4, 96.5, 96.6, 96.5, 96.7, 96.6, 96.8, 96.7, 96.8],
      sparkColor: '#1A7A4A',
    },
    {
      id: 'm-f6',
      type: 'anomaly',
      category: 'Inventory · RADAR',
      headline: 'SKU-2847 M10 hex bolts — 4 days of cover remaining',
      body:
        'Consumption on SKU-2847 ran 38% above forecast this week. Current on-hand is 22,000 units against a daily run rate of 5,500. Reorder already placed but lead time is 7 days.',
      timestamp: '5:22 AM · today',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'On-hand', value: '22,000', tone: 'bad' },
        { label: 'Days of cover', value: '4', tone: 'bad' },
        { label: 'Lead time', value: '7 days', tone: 'bad' },
        { label: 'Safety stock', value: 'breached', tone: 'bad' },
      ],
    },
    {
      id: 'm-f7',
      type: 'agent',
      category: 'Maintenance · AGENT ACTIVITY',
      headline: 'Downtime Responder — work order WO-4412 created for T-204',
      body:
        'Line 3 temperature drift flagged by the OEE watcher triggered an auto-generated work order. Assigned to the maintenance queue with priority 2, parts reserved, scheduled for first available slot.',
      timestamp: '2:09 AM · overnight',
      fields: [
        { label: 'Work order', value: 'WO-4412' },
        { label: 'Asset', value: 'T-204 heater zone · Line 3' },
        { label: 'Priority', value: 'P2' },
        { label: 'Parts reserved', value: 'Thermocouple, controller board' },
      ],
    },
    {
      id: 'm-f8',
      type: 'report',
      category: 'Supply Chain · COURIER',
      headline: 'Supplier On-Time Summary — 91.4% across 28 suppliers',
      body:
        'On-time delivery held at 91.4% last week. Northbridge Steel slipped to 74% and is the single largest contributor to late arrivals. Two alternative sources identified for sourcing team review.',
      timestamp: '6:30 AM · Monday',
      kpis: [
        { label: 'On-time avg', value: '91.4%', tone: 'good' },
        { label: 'Worst supplier', value: 'Northbridge · 74%', tone: 'bad' },
        { label: 'Late shipments', value: '12 of 141', tone: 'bad' },
        { label: "Alt sources ID'd", value: '2', tone: 'good' },
      ],
    },
    {
      id: 'm-f9',
      type: 'anomaly',
      category: 'Quality · RADAR',
      headline: 'Tensile test variance up 2.1σ on batch B-14-22',
      body:
        'Tensile test results on batch B-14-22 are drifting toward the lower spec limit. Three of the last 10 samples are within 5% of LSL. Upstream process variables show no change — material lot under review.',
      timestamp: '4:41 AM · overnight',
      severity: 'high',
      status: 'acknowledged',
      kpis: [
        { label: 'Variance', value: '+2.1σ', tone: 'bad' },
        { label: 'Samples near LSL', value: '3 of 10', tone: 'bad' },
        { label: 'Batch', value: 'B-14-22', tone: 'neutral' },
        { label: 'Material lot', value: 'under review', tone: 'neutral' },
      ],
    },
    {
      id: 'm-f10',
      type: 'agent',
      category: 'Operations · AGENT ACTIVITY',
      headline: 'Morning Briefing Scheduler — delivered to 8 plant managers',
      body:
        'Daily briefing compiled and delivered at 6:00 AM: overnight scrap event on Line 3, inventory risk on SKU-2847, WO-4412 opened for T-204, and shift-handoff summary. 8 plant managers received personalized versions.',
      timestamp: '6:00 AM · today',
      fields: [
        { label: 'Recipients', value: '8 plant managers' },
        { label: 'Items summarized', value: '14 across plants' },
        { label: 'Delivery channel', value: 'Email + Portal' },
        { label: 'Time to assemble', value: '47 seconds' },
      ],
    },
  ],
  pharmacy: [
    {
      id: 'p-f1',
      type: 'anomaly',
      category: 'LETCO · RADAR',
      headline: 'Ketamine 10mg/mL — 3 vial variance at Westside hub',
      body:
        'Nightly audit shows 48 vials dispensed but 45 on hand. Unexplained discrepancy on Schedule III — DEA requires investigation within 24 hours.',
      timestamp: '11:04 PM · last night',
      severity: 'critical',
      status: 'active',
      kpis: [
        { label: 'Expected', value: '48 vials', tone: 'neutral' },
        { label: 'Actual', value: '45 vials', tone: 'bad' },
        { label: 'Variance', value: '-3 vials', tone: 'bad' },
        { label: 'DEA Clock', value: '23h 14m', tone: 'bad' },
      ],
    },
    {
      id: 'p-f2',
      type: 'agent',
      category: 'Harborline · AGENT ACTIVITY',
      headline: 'Prescription Intake — 42 scripts processed overnight',
      body:
        'Validated 42 incoming prescriptions, flagged 3 for pharmacist review (2 drug-drug interactions, 1 allergy), and routed 39 to the compounding queues.',
      timestamp: '6:12 AM · today',
      fields: [
        { label: 'Validated', value: '42 / 42' },
        { label: 'Interaction flags', value: '3 (Warfarin + NSAID ×2, Penicillin allergy)' },
        { label: 'Routed', value: '39 → compounding · 3 → pharmacist' },
        { label: 'Avg decision time', value: '2.3 seconds' },
      ],
    },
    {
      id: 'p-f3',
      type: 'report',
      category: 'Harborline · COURIER',
      headline: 'Daily Location Summary — 268 scripts across 5 locations',
      body:
        'Downtown set a new daily record at 98 scripts (+36% vs prior best). South Clinic volume is down 40% this week — Dr. Brooks has not sent scripts in 8 days.',
      timestamp: '6:00 AM · today',
      kpis: [
        { label: 'Scripts', value: '268', tone: 'good' },
        { label: 'Avg turnaround', value: '52h · target 44h', tone: 'bad' },
        { label: 'QC pass rate', value: '97.2%', tone: 'good' },
        { label: 'Revenue', value: '$24.2K · +8%', tone: 'good' },
      ],
      sparkline: [210, 232, 218, 241, 229, 247, 238, 252, 260, 255, 263, 268],
      sparkColor: '#1A7A4A',
    },
    {
      id: 'p-f4',
      type: 'anomaly',
      category: 'LETCO · RADAR',
      headline: 'Progesterone 200mg lot PRG-8821 — 60-day expiry alert',
      body:
        'Compound lot PRG-8821 at the Northgate hub expires in 60 days with 148 units on hand and a 21-day average turn. Projected shrink: 40 units unless transferred to Downtown (higher velocity).',
      timestamp: '11:48 PM · last night',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'On hand', value: '148 units', tone: 'neutral' },
        { label: 'Days to expiry', value: '60', tone: 'bad' },
        { label: 'Projected shrink', value: '40 units', tone: 'bad' },
        { label: 'Write-off risk', value: '$1,240', tone: 'bad' },
      ],
    },
    {
      id: 'p-f5',
      type: 'agent',
      category: 'LETCO · AGENT ACTIVITY',
      headline: 'USP <797> BUD Scheduler — 18 compounds re-dated overnight',
      body:
        '18 sterile compounds crossed USP <797> beyond-use-date thresholds. Labels regenerated, inventory adjusted in LETCO, and a pull list printed at each hub for the opening pharmacist.',
      timestamp: '4:30 AM · today',
      fields: [
        { label: 'Compounds re-dated', value: '18' },
        { label: 'Hubs affected', value: 'Westside, Downtown, Northgate' },
        { label: 'Pull list printed', value: '3 locations · 6:00 AM' },
        { label: 'Avg decision time', value: '3.1 seconds' },
      ],
    },
    {
      id: 'p-f6',
      type: 'report',
      category: 'Harborline · COURIER',
      headline: 'DEA Schedule II Reconciliation — 5 locations · zero variance',
      body:
        'Weekly CII reconciliation closed clean across all 5 locations. 1,284 dispensing events matched against DEA Form 222 receipts with no variance. Audit pack signed and archived.',
      timestamp: '6:00 AM · today',
      kpis: [
        { label: 'Events reconciled', value: '1,284', tone: 'good' },
        { label: 'Variance', value: '0 units', tone: 'good' },
        { label: 'Locations', value: '5 / 5 clean', tone: 'good' },
        { label: 'Audit pack', value: 'Signed · archived', tone: 'good' },
      ],
    },
    {
      id: 'p-f7',
      type: 'anomaly',
      category: 'Harborline · RADAR',
      headline: 'South Clinic script volume down 40% for 8 days — Dr. Brooks',
      body:
        'Dr. Brooks has not sent any prescriptions to South Clinic since April 11. Historical cadence is 4–6 scripts per weekday. No out-of-office notice on file. Account manager outreach recommended.',
      timestamp: '6:48 AM · today',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'Days silent', value: '8', tone: 'bad' },
        { label: 'Avg weekday scripts', value: '4–6', tone: 'neutral' },
        { label: 'Revenue impact', value: '$3.8K', tone: 'bad' },
        { label: 'Last contact', value: '32 days', tone: 'bad' },
      ],
    },
    {
      id: 'p-f8',
      type: 'agent',
      category: 'Harborline · AGENT ACTIVITY',
      headline: 'Prior Auth Responder — 14 PAs submitted · 11 auto-approved',
      body:
        'Overnight batch of 14 prior authorizations submitted to insurers. 11 auto-approved through payer APIs, 2 pending, 1 denial routed to the pharmacist for appeal packet prep.',
      timestamp: '7:20 AM · today',
      fields: [
        { label: 'Submitted', value: '14' },
        { label: 'Auto-approved', value: '11 (79%)' },
        { label: 'Pending', value: '2 (Aetna, Cigna)' },
        { label: 'Appeal queue', value: '1 · pharmacist review' },
      ],
    },
    {
      id: 'p-f9',
      type: 'report',
      category: 'Operations · COURIER',
      headline: 'Compounding Turnaround — 48h average · 44h target',
      body:
        'Median turnaround improved to 48 hours from 54 last week. Downtown leads at 41h, Westside trails at 58h due to the staffing gap Tuesday–Wednesday. Target: 44h plant-wide.',
      timestamp: '8:45 AM · today',
      kpis: [
        { label: 'Median TAT', value: '48h', tone: 'bad' },
        { label: 'Target', value: '44h', tone: 'neutral' },
        { label: 'Best hub', value: 'Downtown · 41h', tone: 'good' },
        { label: 'Worst hub', value: 'Westside · 58h', tone: 'bad' },
      ],
      sparkline: [56, 55, 54, 54, 53, 52, 51, 50, 50, 49, 48, 48],
      sparkColor: '#C0392B',
    },
    {
      id: 'p-f10',
      type: 'report',
      category: 'Leadership · COURIER',
      headline: 'Pharmacist Morning Briefing — delivered to 7 sites',
      body:
        'Personalized briefing delivered at 6:00 AM to 7 pharmacists-in-charge: CII variance at Westside, BUD re-dates, Dr. Brooks silence, prior auth queue, and today\'s compounding workload.',
      timestamp: '6:00 AM · today',
      fields: [
        { label: 'Recipients', value: '7 pharmacists-in-charge' },
        { label: 'Items summarized', value: '11 across sites' },
        { label: 'Delivery channel', value: 'Email + portal' },
        { label: 'Time to assemble', value: '38 seconds' },
      ],
    },
  ],
  distribution: [
    {
      id: 'd-f1',
      type: 'anomaly',
      category: 'Sales · RADAR',
      headline: 'Meridian Packaging — 3 signals of churn risk',
      body:
        'Order cadence has slowed from weekly to ~21 days. Two support cases opened this month on M10 fasteners. AR balance $47.2K now 62 days overdue — credit review triggered.',
      timestamp: '7:32 AM · today',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'Risk score', value: '78 / 100', tone: 'bad' },
        { label: 'AR overdue', value: '$47.2K', tone: 'bad' },
        { label: 'Days since order', value: '21', tone: 'bad' },
        { label: 'Open cases', value: '2', tone: 'bad' },
      ],
    },
    {
      id: 'd-f2',
      type: 'agent',
      category: 'Operations · AGENT ACTIVITY',
      headline: 'Inbound EDI Processor — 14 POs converted to sales orders',
      body:
        'Processed 14 incoming EDI 850 documents overnight. 12 auto-approved, 2 routed to exception review (1 price mismatch, 1 credit over-limit).',
      timestamp: '6:04 AM · today',
      fields: [
        { label: 'Processed', value: '14 / 14' },
        { label: 'Auto-approved', value: '12' },
        { label: 'Exceptions', value: '2 (Coastal Fab, Summit Industrial)' },
        { label: 'Avg decision time', value: '2.8 seconds' },
      ],
    },
    {
      id: 'd-f3',
      type: 'report',
      category: 'Leadership · COURIER',
      headline: 'Territory Performance Summary — $1.84M pipeline across 5 regions',
      body:
        'Pacific NW leads with +18% QoQ pipeline growth. South Central is flat but win rate climbed to 34%. Midwest has 3 at-risk accounts totaling $84K ARR.',
      timestamp: '7:00 AM · Monday',
      kpis: [
        { label: 'Pipeline', value: '$1.84M', tone: 'good' },
        { label: 'At-risk ARR', value: '$84K', tone: 'bad' },
        { label: 'Win rate', value: '31%', tone: 'good' },
        { label: 'New logos', value: '4 this week', tone: 'good' },
      ],
      sparkline: [1.42, 1.48, 1.55, 1.60, 1.62, 1.66, 1.70, 1.74, 1.78, 1.80, 1.82, 1.84],
      sparkColor: '#1A7A4A',
    },
    {
      id: 'd-f4',
      type: 'anomaly',
      category: 'Warehouse · RADAR',
      headline: 'Tacoma DC pick accuracy — 96.8% vs. 99.2% baseline',
      body:
        'Pick accuracy at the Tacoma DC dropped to 96.8% overnight — the lowest in 90 days. 11 mis-picks on the night wave. Two new associates onboarded Monday correlate with the dip.',
      timestamp: '11:52 PM · last night',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'Accuracy', value: '96.8%', tone: 'bad' },
        { label: '90-day avg', value: '99.2%', tone: 'neutral' },
        { label: 'Mis-picks', value: '11', tone: 'bad' },
        { label: 'Return cost est.', value: '$2,180', tone: 'bad' },
      ],
    },
    {
      id: 'd-f5',
      type: 'agent',
      category: 'Operations · AGENT ACTIVITY',
      headline: 'ASN Reconciler — 18 inbound shipments matched overnight',
      body:
        '18 advance shipping notices reconciled against receipts overnight. 16 clean matches posted to ERP, 2 quantity exceptions (Northbridge Steel short 140 units, Coastal Fab over 60 units) queued for receiving review.',
      timestamp: '4:44 AM · today',
      fields: [
        { label: 'ASNs processed', value: '18' },
        { label: 'Clean matches', value: '16 (89%)' },
        { label: 'Exceptions', value: '2 (Northbridge, Coastal)' },
        { label: 'Avg decision time', value: '1.9 seconds' },
      ],
    },
    {
      id: 'd-f6',
      type: 'report',
      category: 'Inventory · COURIER',
      headline: 'Daily Fill Rate Summary — 97.1% across 6 DCs',
      body:
        'Fill rate held above the 96% SLA for the 11th consecutive day. Tacoma DC led at 98.4%; Phoenix DC trailed at 94.2% after a late inbound from Southland Fasteners cleared this morning.',
      timestamp: '6:00 AM · today',
      kpis: [
        { label: 'Fill rate avg', value: '97.1%', tone: 'good' },
        { label: 'Best DC', value: 'Tacoma · 98.4%', tone: 'good' },
        { label: 'Worst DC', value: 'Phoenix · 94.2%', tone: 'bad' },
        { label: 'SLA', value: '96.0%', tone: 'neutral' },
      ],
      sparkline: [96.2, 96.4, 96.6, 96.5, 96.8, 96.9, 97.0, 96.9, 97.1, 97.0, 97.1, 97.1],
      sparkColor: '#1A7A4A',
    },
    {
      id: 'd-f7',
      type: 'anomaly',
      category: 'Sales · RADAR',
      headline: 'Summit Industrial — credit limit breach on PO-9212',
      body:
        'PO-9212 from Summit Industrial ($38.4K) pushes their balance to $112K against a $90K credit line. Payment history is clean but the line has not been reviewed in 18 months. Order held pending finance approval.',
      timestamp: '6:22 AM · today',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'New balance', value: '$112K', tone: 'bad' },
        { label: 'Credit line', value: '$90K', tone: 'neutral' },
        { label: 'Overage', value: '$22K', tone: 'bad' },
        { label: 'DSO (Summit)', value: '28 days', tone: 'good' },
      ],
    },
    {
      id: 'd-f8',
      type: 'agent',
      category: 'Sales · AGENT ACTIVITY',
      headline: 'Quote-to-Order Processor — 9 quotes converted overnight',
      body:
        'Converted 9 approved quotes to sales orders in the ERP overnight. Pricing validated against the customer-specific price book, inventory reserved, and pick tickets released to the warehouse for 7 AM wave.',
      timestamp: '6:58 AM · today',
      fields: [
        { label: 'Quotes converted', value: '9' },
        { label: 'Total value', value: '$142K' },
        { label: 'Picks released', value: '9 · 7:00 AM wave' },
        { label: 'Avg decision time', value: '2.4 seconds' },
      ],
    },
    {
      id: 'd-f9',
      type: 'report',
      category: 'Finance · COURIER',
      headline: 'Weekly AR Aging — $1.42M outstanding · 8.2% over 60 days',
      body:
        'Total AR held flat week-over-week. Over-60 bucket improved from 9.1% to 8.2% after Meridian Packaging partial payment cleared. Top-5 overdue accounts represent 54% of the over-60 balance.',
      timestamp: '8:15 AM · today',
      kpis: [
        { label: 'AR total', value: '$1.42M', tone: 'neutral' },
        { label: 'Over 60 days', value: '8.2%', tone: 'bad' },
        { label: 'DSO', value: '41 days', tone: 'neutral' },
        { label: 'Top-5 share', value: '54% of >60', tone: 'bad' },
      ],
      sparkline: [9.8, 9.6, 9.4, 9.3, 9.2, 9.1, 9.0, 8.8, 8.6, 8.4, 8.3, 8.2],
      sparkColor: '#1A7A4A',
    },
    {
      id: 'd-f10',
      type: 'report',
      category: 'Leadership · COURIER',
      headline: 'Morning Briefing — delivered to 6 regional managers',
      body:
        'Personalized daily briefing delivered at 6:00 AM: Tacoma pick accuracy dip, Summit credit hold, Meridian churn signals, fill-rate standing, and today\'s inbound queue. 6 regional managers received tailored views.',
      timestamp: '6:00 AM · today',
      fields: [
        { label: 'Recipients', value: '6 regional managers' },
        { label: 'Items summarized', value: '13 across DCs' },
        { label: 'Delivery channel', value: 'Email + portal' },
        { label: 'Time to assemble', value: '42 seconds' },
      ],
    },
  ],
  nonprofit: [
    {
      id: 'n-f1',
      type: 'anomaly',
      category: 'Development · RADAR',
      headline: 'Major donor lapsed — Thornton Foundation (-147 days)',
      body:
        "The Thornton Foundation gave $50K annually for the past 6 years, always in late October. It is now 147 days past their giving anniversary. Last contact: board mixer, Nov 14.",
      timestamp: '6:34 AM · today',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'Historical gift', value: '$50K/yr', tone: 'neutral' },
        { label: 'Days lapsed', value: '147', tone: 'bad' },
        { label: 'Cultivation score', value: '82', tone: 'good' },
        { label: 'Last contact', value: '4m ago', tone: 'neutral' },
      ],
    },
    {
      id: 'n-f2',
      type: 'agent',
      category: 'Finance · AGENT ACTIVITY',
      headline: 'Grant Deadline Watcher — 3 upcoming deadlines flagged',
      body:
        'Knight Foundation final report due in 7 days (submitted draft). MacArthur LOI due in 30 days (outline prep started). Gates renewal due in 60 days.',
      timestamp: '8:00 AM · today',
      fields: [
        { label: '7 days', value: 'Knight Foundation · Final Report' },
        { label: '30 days', value: 'MacArthur · LOI' },
        { label: '60 days', value: 'Gates · Renewal application' },
        { label: 'Owner', value: 'Sarah Chen · Development' },
      ],
    },
    {
      id: 'n-f3',
      type: 'report',
      category: 'ED · COURIER',
      headline: 'Campaign Pace Summary — $247K raised · 73% to goal',
      body:
        "Gala campaign on pace to close by Friday: $247K of the $340K goal raised in 96 hours. Major gifts driving 62% of the total; online gifts up 22% vs. last year's event.",
      timestamp: '9:00 AM · today',
      kpis: [
        { label: 'Raised', value: '$247K', tone: 'good' },
        { label: 'To goal', value: '73%', tone: 'good' },
        { label: 'Donors', value: '418', tone: 'good' },
        { label: 'Avg gift', value: '$591', tone: 'good' },
      ],
      sparkline: [12, 28, 45, 68, 94, 118, 142, 168, 188, 210, 228, 247],
      sparkColor: '#1A7A4A',
    },
    {
      id: 'n-f4',
      type: 'anomaly',
      category: 'Development · RADAR',
      headline: 'Recurring giving — 12 credit cards declined overnight',
      body:
        '12 sustaining gifts failed last night: 9 expired cards, 2 insufficient funds, 1 closed account. Combined monthly value: $1,420. Retry queue scheduled and donor outreach emails staged.',
      timestamp: '11:32 PM · last night',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'Declines', value: '12', tone: 'bad' },
        { label: 'Monthly value', value: '$1,420', tone: 'bad' },
        { label: 'Annualized risk', value: '$17K', tone: 'bad' },
        { label: 'Retry scheduled', value: '10 donors', tone: 'good' },
      ],
    },
    {
      id: 'n-f5',
      type: 'agent',
      category: 'Development · AGENT ACTIVITY',
      headline: 'Gift Acknowledgment Responder — 184 letters queued',
      body:
        'Yesterday\'s 184 gifts processed through the acknowledgment agent. Letters personalized by giving history tier, IRS-compliant receipts attached, and print batch released to the mail house for 9 AM pickup.',
      timestamp: '5:12 AM · today',
      fields: [
        { label: 'Gifts acknowledged', value: '184' },
        { label: 'Major-gift tier', value: '14 · hand-signed' },
        { label: 'Mail house pickup', value: '9:00 AM' },
        { label: 'Avg decision time', value: '1.8 seconds' },
      ],
    },
    {
      id: 'n-f6',
      type: 'report',
      category: 'Finance · COURIER',
      headline: 'Restricted Fund Summary — $2.84M across 14 funds',
      body:
        'All 14 restricted funds reconciled against general ledger. Knight Education Fund utilization at 78% against a 65% plan target — on track to hit full spend-down by fiscal year end.',
      timestamp: '6:30 AM · today',
      kpis: [
        { label: 'Restricted total', value: '$2.84M', tone: 'neutral' },
        { label: 'Funds reconciled', value: '14 / 14', tone: 'good' },
        { label: 'Utilization avg', value: '62%', tone: 'good' },
        { label: 'Off-plan funds', value: '1 (overspend risk)', tone: 'bad' },
      ],
    },
    {
      id: 'n-f7',
      type: 'anomaly',
      category: 'Development · RADAR',
      headline: 'Patel family — wealth signal surfaced · $2M+ capacity',
      body:
        'Public filing on the Patel family foundation shows a $4.2M asset base — 3× what the CRM reflects. Giving history with us: $5K annually. Suggested cultivation tier upgrade from Tier 3 to Tier 1.',
      timestamp: '6:44 AM · today',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'Capacity estimate', value: '$2M+', tone: 'good' },
        { label: 'Current tier', value: 'Tier 3', tone: 'neutral' },
        { label: 'Suggested tier', value: 'Tier 1', tone: 'good' },
        { label: 'Last ask', value: '14 months ago', tone: 'bad' },
      ],
    },
    {
      id: 'n-f8',
      type: 'agent',
      category: 'Programs · AGENT ACTIVITY',
      headline: 'Outcome Report Compiler — 4 program reports drafted',
      body:
        'Q1 outcomes compiled for 4 funded programs: Youth Mentoring (312 participants served), Workforce Training (84% job placement), Food Pantry (42K meals), and Housing Navigation (96 families placed). Drafts routed to program leads for review.',
      timestamp: '8:20 AM · today',
      fields: [
        { label: 'Programs', value: '4' },
        { label: 'Beneficiaries reported', value: '42,308' },
        { label: 'Routed for review', value: '4 program leads' },
        { label: 'Time to compile', value: '52 seconds' },
      ],
    },
    {
      id: 'n-f9',
      type: 'report',
      category: 'Board · COURIER',
      headline: 'Weekly Board Dashboard — delivered to 11 trustees',
      body:
        'Board packet assembled and delivered: $247K gala pace, Thornton Foundation lapse, 4 grant deadlines, restricted fund standing, and Q1 program outcomes. Three trustees flagged the Thornton gap for discussion.',
      timestamp: '7:00 AM · today',
      kpis: [
        { label: 'Recipients', value: '11 trustees', tone: 'good' },
        { label: 'Items summarized', value: '9', tone: 'neutral' },
        { label: 'Open responses', value: '3', tone: 'good' },
        { label: 'Delivery channel', value: 'Email + board portal', tone: 'neutral' },
      ],
    },
    {
      id: 'n-f10',
      type: 'report',
      category: 'Development · COURIER',
      headline: 'Donor Retention Summary — 73.4% YoY retention',
      body:
        'Retention climbed 3.2 points year-over-year to 73.4%. Mid-level ($1K–$10K) segment is the strongest performer at 81%. Sustaining-donor retention at 94% after the card-retry workflow launched in Q4.',
      timestamp: '11:20 AM · today',
      kpis: [
        { label: 'Retention', value: '73.4%', tone: 'good' },
        { label: 'Mid-level tier', value: '81%', tone: 'good' },
        { label: 'Sustainers', value: '94%', tone: 'good' },
        { label: 'YoY change', value: '+3.2 pts', tone: 'good' },
      ],
      sparkline: [68.4, 69.0, 69.8, 70.4, 70.9, 71.3, 71.8, 72.2, 72.6, 72.9, 73.2, 73.4],
      sparkColor: '#1A7A4A',
    },
  ],
  healthcare: [
    {
      id: 'hc-f1',
      type: 'anomaly',
      category: 'Revenue Cycle · RADAR',
      headline: 'Aetna denial rate — 18.4% this week vs. 6.1% baseline',
      body:
        'Aetna denials have tripled over the past 7 days. Denial code CO-4 (late filing) accounts for 62% of rejections — concentrated at the Eastside clinic. Estimated revenue at risk: $38K.',
      timestamp: '7:08 AM · today',
      severity: 'critical',
      status: 'active',
      kpis: [
        { label: 'Denial rate', value: '18.4%', tone: 'bad' },
        { label: 'Baseline', value: '6.1%', tone: 'neutral' },
        { label: 'Revenue at risk', value: '$38K', tone: 'bad' },
        { label: 'Top code', value: 'CO-4', tone: 'bad' },
      ],
    },
    {
      id: 'hc-f2',
      type: 'agent',
      category: 'Scheduling · AGENT ACTIVITY',
      headline: 'No-Show Slot Fill — 7 of 9 same-day cancellations filled',
      body:
        'Nine appointment cancellations detected before 9 AM. Waitlist matching filled 7 slots within 22 minutes. 2 slots remain open (specialist availability constraint).',
      timestamp: '9:14 AM · today',
      fields: [
        { label: 'Cancellations', value: '9' },
        { label: 'Filled', value: '7 (78%)' },
        { label: 'Avg fill time', value: '22 minutes' },
        { label: 'Revenue recovered', value: '$2,940' },
      ],
    },
    {
      id: 'hc-f3',
      type: 'report',
      category: 'Leadership · COURIER',
      headline: 'Weekly Revenue Cycle Summary — $412K collected across 8 locations',
      body:
        'Collections up 6% week-over-week. Overall denial rate held at 7.2%, with Aetna as the outlier. AR over 90 days decreased by $14K from prior week.',
      timestamp: '7:00 AM · Monday',
      kpis: [
        { label: 'Collections', value: '$412K', tone: 'good' },
        { label: 'Denial rate', value: '7.2%', tone: 'bad' },
        { label: 'AR >90 days', value: '$86K', tone: 'bad' },
        { label: 'Avg days to pay', value: '24.1', tone: 'neutral' },
      ],
      sparkline: [368, 374, 381, 378, 390, 395, 388, 401, 406, 398, 408, 412],
      sparkColor: '#1A7A4A',
    },
    {
      id: 'hc-f4',
      type: 'anomaly',
      category: 'Revenue Cycle · RADAR',
      headline: 'Eastside clinic — timely-filing clock · 14 claims at 85 days',
      body:
        '14 Aetna claims at Eastside clinic sit at 85 days unfiled against a 90-day payer deadline. Combined value: $22.4K. Root cause traced to a coder vacancy since April 4 with no backfill.',
      timestamp: '11:24 PM · last night',
      severity: 'critical',
      status: 'active',
      kpis: [
        { label: 'Claims at risk', value: '14', tone: 'bad' },
        { label: 'Value', value: '$22.4K', tone: 'bad' },
        { label: 'Days to deadline', value: '5', tone: 'bad' },
        { label: 'Coder coverage', value: 'Vacant', tone: 'bad' },
      ],
    },
    {
      id: 'hc-f5',
      type: 'agent',
      category: 'Revenue Cycle · AGENT ACTIVITY',
      headline: 'Eligibility Verifier — 184 appointments checked overnight',
      body:
        'Ran eligibility and benefits verification on 184 upcoming appointments. 171 clean, 9 flagged for copay or coverage changes, 4 routed to front-desk for policy updates before patient arrival.',
      timestamp: '4:12 AM · today',
      fields: [
        { label: 'Checked', value: '184 / 184' },
        { label: 'Clean', value: '171 (93%)' },
        { label: 'Copay changes', value: '9' },
        { label: 'Front-desk queue', value: '4' },
      ],
    },
    {
      id: 'hc-f6',
      type: 'report',
      category: 'Clinical Ops · COURIER',
      headline: 'Daily Provider Utilization — 82.4% across 24 providers',
      body:
        'Provider utilization held above the 80% target. Dr. Alvarez (PCP) at 94%, Dr. Oduya (cardiology) at 71% with 4 open slots this week. Waitlist-to-slot match rate at 78%.',
      timestamp: '6:00 AM · today',
      kpis: [
        { label: 'Utilization', value: '82.4%', tone: 'good' },
        { label: 'Target', value: '80.0%', tone: 'neutral' },
        { label: 'Open slots', value: '11 this week', tone: 'bad' },
        { label: 'Waitlist match', value: '78%', tone: 'good' },
      ],
    },
    {
      id: 'hc-f7',
      type: 'anomaly',
      category: 'Compliance · RADAR',
      headline: 'HIPAA audit log — 3 after-hours access events · Westside',
      body:
        'Three chart access events logged between 2:14 AM and 3:02 AM at Westside clinic. Accessing user is a night-shift MA with no documented patient care reason. Compliance officer notified.',
      timestamp: '3:08 AM · overnight',
      severity: 'high',
      status: 'acknowledged',
      kpis: [
        { label: 'Events', value: '3', tone: 'bad' },
        { label: 'User', value: 'MA · night shift', tone: 'neutral' },
        { label: 'Documented reason', value: 'None', tone: 'bad' },
        { label: 'Escalation', value: 'Compliance officer', tone: 'neutral' },
      ],
    },
    {
      id: 'hc-f8',
      type: 'agent',
      category: 'Revenue Cycle · AGENT ACTIVITY',
      headline: 'Denial Responder — 22 denials reworked · 14 resubmitted',
      body:
        '22 new denials triaged overnight. 14 resubmitted with corrected codes (CO-4 late-filing packets, CO-97 bundling fixes), 6 queued for provider documentation, 2 appealed with attached medical necessity letters.',
      timestamp: '7:40 AM · today',
      fields: [
        { label: 'Denials worked', value: '22' },
        { label: 'Resubmitted', value: '14 (64%)' },
        { label: 'Appealed', value: '2' },
        { label: 'Pending provider', value: '6' },
      ],
    },
    {
      id: 'hc-f9',
      type: 'report',
      category: 'Finance · COURIER',
      headline: 'Monthly Payer Mix Summary — 8 payers · commercial 48%',
      body:
        'Commercial payer mix held at 48%, Medicare at 31%, Medicaid at 16%, self-pay at 5%. Average reimbursement per visit climbed 2.1% month-over-month, driven by a favorable BCBS contract update.',
      timestamp: '9:10 AM · today',
      kpis: [
        { label: 'Commercial', value: '48%', tone: 'good' },
        { label: 'Avg reimbursement', value: '$178/visit', tone: 'good' },
        { label: 'Self-pay', value: '5%', tone: 'neutral' },
        { label: 'MoM change', value: '+2.1%', tone: 'good' },
      ],
      sparkline: [169, 170, 171, 172, 173, 174, 174, 175, 176, 176, 177, 178],
      sparkColor: '#1A7A4A',
    },
    {
      id: 'hc-f10',
      type: 'report',
      category: 'Leadership · COURIER',
      headline: 'Morning Huddle Brief — delivered to 12 clinic leads',
      body:
        'Personalized morning huddle brief delivered to 12 clinic leads: Aetna denial surge, Eastside filing risk, overnight eligibility results, today\'s open slots, and the Westside access event.',
      timestamp: '6:00 AM · today',
      fields: [
        { label: 'Recipients', value: '12 clinic leads' },
        { label: 'Items summarized', value: '10 across locations' },
        { label: 'Delivery channel', value: 'Email + EHR inbox' },
        { label: 'Time to assemble', value: '44 seconds' },
      ],
    },
  ],
  propertyManagement: [
    {
      id: 'pm-f1',
      type: 'anomaly',
      category: 'AR · RADAR',
      headline: 'Riverside Commons — delinquency up 34% this month',
      body:
        '22 of 96 units at Riverside Commons are past due, totaling $41.8K. 8 residents are 30+ days overdue with no payment plan. Eviction threshold reached for 3 units.',
      timestamp: '8:02 AM · today',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'Delinquent units', value: '22 / 96', tone: 'bad' },
        { label: 'Past-due balance', value: '$41.8K', tone: 'bad' },
        { label: '30+ day overdue', value: '8 units', tone: 'bad' },
        { label: 'Eviction threshold', value: '3 units', tone: 'bad' },
      ],
    },
    {
      id: 'pm-f2',
      type: 'agent',
      category: 'Leasing · AGENT ACTIVITY',
      headline: 'Lease Expiration Watcher — 14 renewals triggered this week',
      body:
        '14 leases expiring within 60 days surfaced across 4 properties. Renewal outreach sent to all 14 residents with current market-rate comparisons and renewal incentive terms.',
      timestamp: '7:32 AM · today',
      fields: [
        { label: 'Expiring ≤60 days', value: '14 leases' },
        { label: 'Outreach sent', value: '14 / 14' },
        { label: 'Properties', value: 'Riverside, Oak Hill, Summit, Eastgate' },
        { label: 'Avg market uplift', value: '+$94/mo' },
      ],
    },
    {
      id: 'pm-f3',
      type: 'report',
      category: 'Asset Management · COURIER',
      headline: 'Monthly Portfolio Summary — 94.2% occupancy across 14 properties',
      body:
        'Portfolio occupancy held above 94% for the third consecutive month. NOI of $387K was $12K ahead of underwriting. Maintenance spend at Oak Hill is 40% over budget — HVAC replacement pending.',
      timestamp: '7:00 AM · 1st of month',
      kpis: [
        { label: 'Occupancy', value: '94.2%', tone: 'good' },
        { label: 'NOI', value: '$387K', tone: 'good' },
        { label: 'Collections rate', value: '97.1%', tone: 'good' },
        { label: 'Maintenance over', value: 'Oak Hill +40%', tone: 'bad' },
      ],
      sparkline: [91.4, 91.8, 92.2, 92.6, 93.0, 93.2, 93.6, 93.8, 94.0, 94.1, 94.2, 94.2],
      sparkColor: '#1A7A4A',
    },
    {
      id: 'pm-f4',
      type: 'anomaly',
      category: 'Maintenance · RADAR',
      headline: 'Oak Hill HVAC — 8 tickets in 72 hours · same chiller',
      body:
        'Chiller Unit C-2 at Oak Hill has generated 8 work orders in 72 hours (cooling complaints on floors 3–5). Unit is 14 years old and 40% over maintenance budget YTD. Replacement quote on file: $84K.',
      timestamp: '11:14 PM · last night',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'Tickets (72h)', value: '8', tone: 'bad' },
        { label: 'Asset age', value: '14 years', tone: 'bad' },
        { label: 'Repair YTD', value: '$18K', tone: 'bad' },
        { label: 'Replace cost', value: '$84K', tone: 'neutral' },
      ],
    },
    {
      id: 'pm-f5',
      type: 'agent',
      category: 'AR · AGENT ACTIVITY',
      headline: 'Rent Collection Processor — 1,284 charges posted overnight',
      body:
        'Monthly rent and ancillary charges posted across 14 properties overnight. 1,284 ledger entries generated, 1,198 auto-paid (ACH/card), 86 invoices queued for residents without auto-pay.',
      timestamp: '3:48 AM · today',
      fields: [
        { label: 'Charges posted', value: '1,284' },
        { label: 'Auto-paid', value: '1,198 (93%)' },
        { label: 'Invoiced', value: '86' },
        { label: 'Failed payments', value: '14 · retry queue' },
      ],
    },
    {
      id: 'pm-f6',
      type: 'report',
      category: 'Leasing · COURIER',
      headline: 'Weekly Leasing Funnel — 48 tours · 14 applications · 9 leases',
      body:
        'Leasing activity up 22% week-over-week. Summit Apartments led with 18 tours. Application-to-lease conversion climbed to 64%. Time-to-lease average dropped to 11 days from 16.',
      timestamp: '6:30 AM · today',
      kpis: [
        { label: 'Tours', value: '48', tone: 'good' },
        { label: 'Applications', value: '14', tone: 'good' },
        { label: 'Leases signed', value: '9', tone: 'good' },
        { label: 'Avg time-to-lease', value: '11 days', tone: 'good' },
      ],
      sparkline: [17, 16, 16, 15, 14, 14, 13, 13, 12, 12, 11, 11],
      sparkColor: '#1A7A4A',
    },
    {
      id: 'pm-f7',
      type: 'anomaly',
      category: 'AR · RADAR',
      headline: 'NSF payments — 14 returned across portfolio overnight',
      body:
        '14 resident ACH payments returned NSF overnight, totaling $21.4K. Eastgate accounts for 6 of the 14 — a cluster pattern that has repeated monthly for 3 cycles. Recommend tightening Eastgate intake screening.',
      timestamp: '4:18 AM · today',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'NSF count', value: '14', tone: 'bad' },
        { label: 'Value', value: '$21.4K', tone: 'bad' },
        { label: 'Eastgate share', value: '6 of 14', tone: 'bad' },
        { label: 'Recurring pattern', value: '3 months', tone: 'bad' },
      ],
    },
    {
      id: 'pm-f8',
      type: 'agent',
      category: 'Maintenance · AGENT ACTIVITY',
      headline: 'Work Order Dispatcher — 22 tickets routed to 6 techs',
      body:
        '22 new maintenance tickets created since 6 PM yesterday. Dispatcher prioritized 4 emergencies (heat out, water leak) to on-call, routed 18 to the day queue by skill and geography. SLA compliance at 97%.',
      timestamp: '5:44 AM · today',
      fields: [
        { label: 'Tickets', value: '22' },
        { label: 'Emergencies', value: '4 · on-call dispatched' },
        { label: 'Day queue', value: '18 · 6 techs' },
        { label: 'SLA compliance', value: '97%' },
      ],
    },
    {
      id: 'pm-f9',
      type: 'report',
      category: 'Finance · COURIER',
      headline: 'Daily Collections Summary — 93.8% of month-to-date rent roll',
      body:
        'Month-to-date collections at 93.8% against the billed rent roll of $1.84M. Riverside Commons drags the portfolio average; remaining properties are tracking above 95%. Late-fee assessments posted for 64 residents.',
      timestamp: '7:20 AM · today',
      kpis: [
        { label: 'Collected MTD', value: '93.8%', tone: 'good' },
        { label: 'Billed MTD', value: '$1.84M', tone: 'neutral' },
        { label: 'Late fees posted', value: '64 residents', tone: 'neutral' },
        { label: 'Worst property', value: 'Riverside · 84%', tone: 'bad' },
      ],
    },
    {
      id: 'pm-f10',
      type: 'report',
      category: 'Leadership · COURIER',
      headline: 'Morning Property Brief — delivered to 14 property managers',
      body:
        'Daily brief delivered at 6:00 AM: Riverside delinquency, Oak Hill HVAC risk, Eastgate NSF pattern, 14 renewals outstanding, and today\'s showing schedule. 14 property managers received tailored views.',
      timestamp: '6:00 AM · today',
      fields: [
        { label: 'Recipients', value: '14 property managers' },
        { label: 'Items summarized', value: '12' },
        { label: 'Delivery channel', value: 'Email + mobile app' },
        { label: 'Time to assemble', value: '40 seconds' },
      ],
    },
  ],
  professionalServices: [
    {
      id: 'ps-f1',
      type: 'anomaly',
      category: 'Project Controls · RADAR',
      headline: 'Hartwell Restructuring — 84% budget used at 61% of timeline',
      body:
        'The Hartwell engagement has burned $168K of a $200K budget with 8 weeks remaining. Burn rate accelerated 31% in the past two weeks. Partner review flagged.',
      timestamp: '7:04 AM · today',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'Budget used', value: '84%', tone: 'bad' },
        { label: 'Timeline', value: '61%', tone: 'neutral' },
        { label: 'Budget at risk', value: '$32K', tone: 'bad' },
        { label: 'Burn acceleration', value: '+31%', tone: 'bad' },
      ],
    },
    {
      id: 'ps-f2',
      type: 'agent',
      category: 'Finance · AGENT ACTIVITY',
      headline: 'AR Follow-Up Processor — 8 invoices actioned this morning',
      body:
        'Identified 8 overdue invoices totaling $94K. Sent 15-day notices to 5 clients, 30-day escalations to 2, and flagged 1 invoice ($22K, 58 days) to the account lead for a direct call.',
      timestamp: '8:32 AM · today',
      fields: [
        { label: 'Invoices actioned', value: '8' },
        { label: 'Total overdue', value: '$94K' },
        { label: 'Escalated to partner', value: '1 ($22K · 58 days)' },
        { label: 'Avg days overdue', value: '28' },
      ],
    },
    {
      id: 'ps-f3',
      type: 'report',
      category: 'Leadership · COURIER',
      headline: 'Weekly Utilization Summary — 71.4% billable across 4 practices',
      body:
        'Strategy practice leads at 78% utilization. Technology is lagging at 63% with 4 consultants on bench awaiting project starts. Pipeline-to-capacity ratio is 1.4× for next quarter.',
      timestamp: '6:30 AM · Monday',
      kpis: [
        { label: 'Utilization', value: '71.4%', tone: 'neutral' },
        { label: 'On bench', value: '4 consultants', tone: 'bad' },
        { label: 'AR overdue', value: '$94K', tone: 'bad' },
        { label: 'Pipeline coverage', value: '1.4×', tone: 'good' },
      ],
      sparkline: [68.2, 69.0, 70.1, 69.8, 70.4, 71.0, 70.8, 71.2, 71.6, 71.2, 71.4, 71.4],
      sparkColor: '#1A7A4A',
    },
    {
      id: 'ps-f4',
      type: 'anomaly',
      category: 'Project Controls · RADAR',
      headline: 'Summit Financial engagement — scope creep signal · 14% hour overage',
      body:
        'Summit Financial engagement has logged 14% over the approved hour estimate with 3 weeks of runway remaining. Six of the last 12 tickets were out-of-scope per the SOW exhibit. Account lead should initiate a change-order conversation.',
      timestamp: '11:58 PM · last night',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'Hours over', value: '+14%', tone: 'bad' },
        { label: 'Out-of-scope', value: '6 of 12 tickets', tone: 'bad' },
        { label: 'Revenue exposure', value: '$38K', tone: 'bad' },
        { label: 'Runway left', value: '3 weeks', tone: 'neutral' },
      ],
    },
    {
      id: 'ps-f5',
      type: 'agent',
      category: 'Operations · AGENT ACTIVITY',
      headline: 'Timesheet Compiler — 148 timesheets consolidated',
      body:
        '148 consultant timesheets pulled, validated, and posted to 62 client projects overnight. 7 flagged for missing narrative, 3 for mismatched project codes — notifications sent to consultants for 8 AM cleanup.',
      timestamp: '4:22 AM · today',
      fields: [
        { label: 'Timesheets', value: '148 / 151' },
        { label: 'Missing narrative', value: '7' },
        { label: 'Code mismatches', value: '3' },
        { label: 'Projects updated', value: '62' },
      ],
    },
    {
      id: 'ps-f6',
      type: 'report',
      category: 'Finance · COURIER',
      headline: 'Daily Realization Report — 94.2% billed vs. worked',
      body:
        'Realization rate at 94.2%, up from 92.8% last week. Strategy practice highest at 97%. Technology practice lowest at 91% — two scope disputes on active projects are driving write-downs.',
      timestamp: '6:30 AM · today',
      kpis: [
        { label: 'Realization', value: '94.2%', tone: 'good' },
        { label: 'Best practice', value: 'Strategy · 97%', tone: 'good' },
        { label: 'Worst practice', value: 'Tech · 91%', tone: 'bad' },
        { label: 'Write-downs', value: '$14K this week', tone: 'bad' },
      ],
      sparkline: [92.4, 92.6, 92.8, 92.8, 93.0, 93.2, 93.4, 93.6, 93.8, 94.0, 94.1, 94.2],
      sparkColor: '#1A7A4A',
    },
    {
      id: 'ps-f7',
      type: 'anomaly',
      category: 'Talent · RADAR',
      headline: 'Senior consultant attrition signal — 2 flight risks flagged',
      body:
        'Two senior consultants (Strategy practice) surfaced on the flight-risk model: declining utilization, missed check-ins, and LinkedIn profile activity. Combined book of business: $420K ARR. Partner outreach recommended within 5 days.',
      timestamp: '7:14 AM · today',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'Flight risks', value: '2', tone: 'bad' },
        { label: 'Book at risk', value: '$420K ARR', tone: 'bad' },
        { label: 'Model confidence', value: '78%', tone: 'neutral' },
        { label: 'Window', value: '5 days', tone: 'neutral' },
      ],
    },
    {
      id: 'ps-f8',
      type: 'agent',
      category: 'Finance · AGENT ACTIVITY',
      headline: 'Invoice Generator — 34 client invoices drafted for partner review',
      body:
        'Month-end invoicing run drafted 34 client invoices totaling $482K. WIP narratives assembled, rate cards applied, and pre-bill packets routed to 6 engagement partners for Friday-morning approval.',
      timestamp: '8:58 AM · today',
      fields: [
        { label: 'Invoices drafted', value: '34' },
        { label: 'Total value', value: '$482K' },
        { label: 'Partners notified', value: '6' },
        { label: 'Approval deadline', value: 'Friday 12:00 PM' },
      ],
    },
    {
      id: 'ps-f9',
      type: 'report',
      category: 'Leadership · COURIER',
      headline: 'Pipeline Coverage Report — 1.4× for Q3 across practices',
      body:
        'Forward pipeline covers 1.4× of Q3 capacity at current win rates. Strategy practice at 1.7× (healthy). Technology at 0.9× (underweight) — bench risk without two closes in the next 30 days.',
      timestamp: '11:20 AM · today',
      kpis: [
        { label: 'Coverage', value: '1.4×', tone: 'good' },
        { label: 'Strategy', value: '1.7×', tone: 'good' },
        { label: 'Technology', value: '0.9×', tone: 'bad' },
        { label: 'Open opps', value: '42', tone: 'neutral' },
      ],
    },
    {
      id: 'ps-f10',
      type: 'report',
      category: 'Leadership · COURIER',
      headline: 'Partner Morning Briefing — delivered to 11 partners',
      body:
        'Personalized partner brief delivered at 7:00 AM: Hartwell budget burn, Summit scope creep, AR follow-ups, flight-risk signals, and this week\'s invoicing run. 11 partners received tailored views.',
      timestamp: '7:00 AM · today',
      fields: [
        { label: 'Recipients', value: '11 partners' },
        { label: 'Items summarized', value: '12 across practices' },
        { label: 'Delivery channel', value: 'Email + portal' },
        { label: 'Time to assemble', value: '41 seconds' },
      ],
    },
  ],
  financialServices: [
    {
      id: 'fs-f1',
      type: 'anomaly',
      category: 'Advisory · RADAR',
      headline: 'Marcus & Chen — 3 at-risk signals on a $4.1M relationship',
      body:
        'Annual review is 68 days overdue. Portfolio dropped 12% below the rebalancing threshold two weeks ago with no action. Last inbound contact was 94 days ago.',
      timestamp: '7:06 AM · today',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'AUM', value: '$4.1M', tone: 'neutral' },
        { label: 'Review overdue', value: '68 days', tone: 'bad' },
        { label: 'Last contact', value: '94 days', tone: 'bad' },
        { label: 'Threshold breach', value: '-12%', tone: 'bad' },
      ],
    },
    {
      id: 'fs-f2',
      type: 'agent',
      category: 'Advisory · AGENT ACTIVITY',
      headline: 'Client Review Trigger Watcher — 11 reviews surfaced today',
      body:
        '11 clients surfaced for advisor outreach: 6 approaching annual review dates, 3 with portfolio threshold breaches, and 2 with life-event signals (retirement, inheritance). Pre-populated meeting briefs sent to each advisor.',
      timestamp: '7:00 AM · today',
      fields: [
        { label: 'Annual reviews due', value: '6' },
        { label: 'Threshold breaches', value: '3' },
        { label: 'Life-event signals', value: '2' },
        { label: 'Briefs sent', value: '11 advisors' },
      ],
    },
    {
      id: 'fs-f3',
      type: 'report',
      category: 'Leadership · COURIER',
      headline: 'Weekly Advisor Summary — $2.14B AUM · $186K revenue',
      body:
        'Net flows positive for the fourth consecutive week (+$8.2M). Annual review completion rate reached 84%, up from 71% last month. Two advisors below 60% completion — flagged for manager follow-up.',
      timestamp: '7:00 AM · Monday',
      kpis: [
        { label: 'AUM', value: '$2.14B', tone: 'good' },
        { label: 'Net flows', value: '+$8.2M', tone: 'good' },
        { label: 'Review completion', value: '84%', tone: 'good' },
        { label: 'At-risk clients', value: '14', tone: 'bad' },
      ],
      sparkline: [2.08, 2.09, 2.10, 2.10, 2.11, 2.11, 2.12, 2.12, 2.13, 2.13, 2.14, 2.14],
      sparkColor: '#1A7A4A',
    },
    {
      id: 'fs-f4',
      type: 'anomaly',
      category: 'Compliance · RADAR',
      headline: 'Reg BI disclosure — 6 accounts missing updated Form CRS',
      body:
        'Six client accounts opened in the last 30 days have not logged delivery of the updated Form CRS. SEC Reg BI timeline requires delivery at account opening. Compliance officer notified; auto-send scheduled for 8 AM.',
      timestamp: '11:42 PM · last night',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'Accounts', value: '6', tone: 'bad' },
        { label: 'Delivery overdue', value: 'Up to 28 days', tone: 'bad' },
        { label: 'Reg exposure', value: 'SEC Reg BI', tone: 'bad' },
        { label: 'Auto-send', value: '8:00 AM today', tone: 'good' },
      ],
    },
    {
      id: 'fs-f5',
      type: 'agent',
      category: 'Operations · AGENT ACTIVITY',
      headline: 'Cash Reconciler — 42 custodian positions matched overnight',
      body:
        '42 custodian cash positions reconciled against portfolio accounting overnight. 40 clean, 2 exceptions (unidentified wire at Schwab · $12.4K, dividend short at Fidelity · $840) routed to operations for resolution.',
      timestamp: '3:56 AM · today',
      fields: [
        { label: 'Positions reconciled', value: '42' },
        { label: 'Clean matches', value: '40 (95%)' },
        { label: 'Exceptions', value: '2 (Schwab, Fidelity)' },
        { label: 'Avg decision time', value: '1.6 seconds' },
      ],
    },
    {
      id: 'fs-f6',
      type: 'report',
      category: 'Portfolio · COURIER',
      headline: 'Daily Rebalancing Report — 14 portfolios flagged for drift',
      body:
        '14 client portfolios drifted beyond 5% threshold overnight. 9 fall within the automated rebalance band and trades were pre-staged for advisor approval. 5 require advisor judgment (concentration positions).',
      timestamp: '5:30 AM · today',
      kpis: [
        { label: 'Portfolios drifted', value: '14', tone: 'neutral' },
        { label: 'Auto-staged', value: '9', tone: 'good' },
        { label: 'Advisor review', value: '5', tone: 'neutral' },
        { label: 'Avg drift', value: '6.8%', tone: 'neutral' },
      ],
    },
    {
      id: 'fs-f7',
      type: 'anomaly',
      category: 'Advisory · RADAR',
      headline: 'Alvarez household — $840K inheritance event signal',
      body:
        'Probate filing cross-referenced against the Alvarez household surfaces an expected $840K inheritance distribution within 60–90 days. Financial plan was last updated 14 months ago. Planning conversation recommended.',
      timestamp: '6:34 AM · today',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'Event value', value: '$840K', tone: 'good' },
        { label: 'Current AUM', value: '$1.8M', tone: 'neutral' },
        { label: 'Plan age', value: '14 months', tone: 'bad' },
        { label: 'Advisor', value: 'J. Reeves', tone: 'neutral' },
      ],
    },
    {
      id: 'fs-f8',
      type: 'agent',
      category: 'Advisory · AGENT ACTIVITY',
      headline: 'Meeting Prep Compiler — 6 client reviews packaged for 8 AM block',
      body:
        '6 pre-populated meeting briefs assembled for the 8 AM – 12 PM review block: current allocations, drift vs. policy, life-event flags, last-meeting action items, and recommended talking points. Delivered to 3 advisors.',
      timestamp: '7:12 AM · today',
      fields: [
        { label: 'Briefs', value: '6' },
        { label: 'Advisors', value: '3' },
        { label: 'Meeting block', value: '8:00 AM – 12:00 PM' },
        { label: 'Time to assemble', value: '92 seconds' },
      ],
    },
    {
      id: 'fs-f9',
      type: 'report',
      category: 'Leadership · COURIER',
      headline: 'Monthly Fee Billing Summary — $1.42M billed · 0.4% adjustments',
      body:
        'Quarterly advisory fees billed across 1,284 client accounts. Fee accuracy at 99.6%; 6 accounts required manual adjustment (new money weighting, household consolidation). Revenue on track to meet annual guidance.',
      timestamp: '9:20 AM · today',
      kpis: [
        { label: 'Billed', value: '$1.42M', tone: 'good' },
        { label: 'Accounts', value: '1,284', tone: 'neutral' },
        { label: 'Adjustments', value: '6 (0.4%)', tone: 'good' },
        { label: 'Accuracy', value: '99.6%', tone: 'good' },
      ],
      sparkline: [1.28, 1.30, 1.32, 1.33, 1.34, 1.36, 1.37, 1.38, 1.39, 1.40, 1.41, 1.42],
      sparkColor: '#1A7A4A',
    },
    {
      id: 'fs-f10',
      type: 'report',
      category: 'Leadership · COURIER',
      headline: 'Morning Advisor Brief — delivered to 18 advisors',
      body:
        'Personalized briefing delivered to 18 advisors at 7:00 AM: Marcus & Chen risk, Alvarez inheritance signal, portfolio drift list, fee-billing status, and today\'s meeting block. Each advisor saw their own book first.',
      timestamp: '7:00 AM · today',
      fields: [
        { label: 'Recipients', value: '18 advisors' },
        { label: 'Items summarized', value: '14 across books' },
        { label: 'Delivery channel', value: 'Email + CRM inbox' },
        { label: 'Time to assemble', value: '46 seconds' },
      ],
    },
  ],
  foodBeverage: [
    {
      id: 'fb-f1',
      type: 'anomaly',
      category: 'Inventory · RADAR',
      headline: 'Heavy cream — 240 units expiring in 18 hours at Facility 2',
      body:
        '240 units of heavy cream (SKU-1182) at the Portland facility will breach shelf-life in 18 hours. Redistribution to Facility 1 (4h transit) or disposal order required. Estimated write-off: $1,440.',
      timestamp: '3:14 AM · overnight',
      severity: 'critical',
      status: 'active',
      kpis: [
        { label: 'Units at risk', value: '240', tone: 'bad' },
        { label: 'Hours remaining', value: '18h', tone: 'bad' },
        { label: 'Write-off value', value: '$1,440', tone: 'bad' },
        { label: 'Redistribution window', value: '14h', tone: 'neutral' },
      ],
    },
    {
      id: 'fb-f2',
      type: 'agent',
      category: 'Procurement · AGENT ACTIVITY',
      headline: 'Reorder Processor — 3 SKUs triggered overnight',
      body:
        'Three SKUs fell below reorder thresholds overnight. Purchase orders generated automatically to preferred suppliers for vanilla extract (80 units), cocoa butter (120 kg), and glass jars 8oz (2,400 units).',
      timestamp: '2:48 AM · overnight',
      fields: [
        { label: 'SKUs triggered', value: '3' },
        { label: 'POs generated', value: '3 (auto-approved)' },
        { label: 'Largest order', value: 'Glass jars 8oz · $3,120' },
        { label: 'Avg lead time', value: '3.2 days' },
      ],
    },
    {
      id: 'fb-f3',
      type: 'report',
      category: 'Operations · COURIER',
      headline: 'Weekly Production Summary — 94.1% yield · margin up 2.3pts',
      body:
        'Strong week across all three facilities. Yield at 94.1% beat the 91% target. Ingredient cost variance came in 1.8% under standard. Gross margin improved 2.3 points to 41.2%.',
      timestamp: '6:00 AM · Monday',
      kpis: [
        { label: 'Batch yield', value: '94.1%', tone: 'good' },
        { label: 'Gross margin', value: '41.2%', tone: 'good' },
        { label: 'Spoilage write-offs', value: '$2.1K', tone: 'neutral' },
        { label: 'Cost variance', value: '-1.8%', tone: 'good' },
      ],
      sparkline: [38.4, 38.8, 39.1, 39.4, 39.7, 40.0, 40.2, 40.4, 40.7, 40.9, 41.0, 41.2],
      sparkColor: '#1A7A4A',
    },
    {
      id: 'fb-f4',
      type: 'anomaly',
      category: 'Quality · RADAR',
      headline: 'Batch B-2204 cocoa paste — Brix outside spec range',
      body:
        'Batch B-2204 at Facility 3 tested at 71.4° Brix against an 68.0–70.0° spec. Three subsequent samples confirmed the drift. Batch quarantined; upstream supplier lot traced to Guittard shipment 4/11.',
      timestamp: '1:22 AM · overnight',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'Brix', value: '71.4°', tone: 'bad' },
        { label: 'Spec', value: '68.0–70.0°', tone: 'neutral' },
        { label: 'Batch value', value: '$8,400', tone: 'bad' },
        { label: 'Status', value: 'Quarantined', tone: 'neutral' },
      ],
    },
    {
      id: 'fb-f5',
      type: 'agent',
      category: 'Inventory · AGENT ACTIVITY',
      headline: 'Expiry Redistributor — 240 units of heavy cream routed to Facility 1',
      body:
        '240 heavy cream units expiring in 18 hours at Facility 2 redistributed to Facility 1 (higher velocity). Transfer order cut, refrigerated truck booked for 5 AM departure. Estimated write-off avoided: $1,440.',
      timestamp: '4:08 AM · today',
      fields: [
        { label: 'Units moved', value: '240' },
        { label: 'Route', value: 'Facility 2 → Facility 1' },
        { label: 'Transit', value: '4h refrigerated' },
        { label: 'Write-off avoided', value: '$1,440' },
      ],
    },
    {
      id: 'fb-f6',
      type: 'report',
      category: 'Sales · COURIER',
      headline: 'Retail Velocity Summary — 48 SKUs across 14 retailers',
      body:
        'Weekly retail velocity pulled from EDI 852 feeds across 14 retailers. Dark chocolate bar line is +22% YoY; seasonal mint is -14% (end of holiday pull-through). Reorder triggers set for 11 SKUs.',
      timestamp: '7:14 AM · today',
      kpis: [
        { label: 'SKUs tracked', value: '48', tone: 'neutral' },
        { label: 'Top mover', value: 'Dark bar · +22%', tone: 'good' },
        { label: 'Weakest', value: 'Mint · -14%', tone: 'bad' },
        { label: 'Reorders', value: '11', tone: 'good' },
      ],
      sparkline: [86, 88, 90, 92, 94, 96, 98, 100, 102, 105, 108, 112],
      sparkColor: '#1A7A4A',
    },
    {
      id: 'fb-f7',
      type: 'anomaly',
      category: 'Compliance · RADAR',
      headline: 'FSMA Rule 204 — traceability record gap on lot L-1182',
      body:
        'Traceability records for heavy cream lot L-1182 are missing the receiving log entry required under FSMA Rule 204. If audited today, this gap would flag as a critical finding. QA manager notified; reconstruction from supplier ASN scheduled.',
      timestamp: '5:48 AM · today',
      severity: 'critical',
      status: 'active',
      kpis: [
        { label: 'Rule', value: 'FSMA 204', tone: 'bad' },
        { label: 'Lot', value: 'L-1182', tone: 'neutral' },
        { label: 'Gap', value: 'Receiving log', tone: 'bad' },
        { label: 'Audit exposure', value: 'Critical finding', tone: 'bad' },
      ],
    },
    {
      id: 'fb-f8',
      type: 'agent',
      category: 'Production · AGENT ACTIVITY',
      headline: 'Batch Scheduler — 18 runs sequenced across 3 facilities',
      body:
        '18 production batches sequenced for today across the 3 facilities. Allergen-aware changeover order applied (nut-free runs first), tankage availability resolved, and shift leads received their run lists at 5:30 AM.',
      timestamp: '5:32 AM · today',
      fields: [
        { label: 'Batches', value: '18' },
        { label: 'Allergen resets', value: '2 · end of day' },
        { label: 'Facilities', value: 'Portland, Eugene, Boise' },
        { label: 'Schedule delivered', value: '3 shift leads · 5:30 AM' },
      ],
    },
    {
      id: 'fb-f9',
      type: 'report',
      category: 'Finance · COURIER',
      headline: 'Daily Margin by SKU — top 20 · 3 flagged for cost review',
      body:
        'Top-20 SKU margins ranged 28% to 62%. Three SKUs (vanilla bean, almond cluster, sea-salt caramel) dropped below the 30% floor after recent ingredient cost increases. Price-change proposals drafted for category manager review.',
      timestamp: '10:40 AM · today',
      kpis: [
        { label: 'SKUs tracked', value: '20', tone: 'neutral' },
        { label: 'Below floor', value: '3', tone: 'bad' },
        { label: 'Best margin', value: 'Dark bar · 62%', tone: 'good' },
        { label: 'Proposals drafted', value: '3', tone: 'good' },
      ],
    },
    {
      id: 'fb-f10',
      type: 'report',
      category: 'Leadership · COURIER',
      headline: 'Morning Plant Brief — delivered to 3 plant managers',
      body:
        'Personalized brief delivered at 6:00 AM: Brix drift at Facility 3, heavy cream redistribution, FSMA gap, today\'s batch schedule, and retail velocity standouts. Each plant manager saw their own facility first.',
      timestamp: '6:00 AM · today',
      fields: [
        { label: 'Recipients', value: '3 plant managers' },
        { label: 'Items summarized', value: '11' },
        { label: 'Delivery channel', value: 'Email + portal' },
        { label: 'Time to assemble', value: '39 seconds' },
      ],
    },
  ],
  construction: [
    {
      id: 'cx-f1',
      type: 'anomaly',
      category: 'Project Controls · RADAR',
      headline: 'Cascade Medical — 88% budget used at 64% of schedule',
      body:
        'Cascade Medical Center addition has burned $2.64M of a $3.0M budget with 14 weeks remaining. Subcontractor overruns on mechanical and electrical are driving the acceleration.',
      timestamp: '6:38 AM · today',
      severity: 'critical',
      status: 'active',
      kpis: [
        { label: 'Budget used', value: '88%', tone: 'bad' },
        { label: 'Schedule', value: '64%', tone: 'neutral' },
        { label: 'Projected overrun', value: '$180K', tone: 'bad' },
        { label: 'Weeks remaining', value: '14', tone: 'neutral' },
      ],
    },
    {
      id: 'cx-f2',
      type: 'agent',
      category: 'Project Management · AGENT ACTIVITY',
      headline: 'Change Order Processor — CO-0047 approved · $84K added to budget',
      body:
        'Change order CO-0047 (structural steel addition, Cascade Medical) approved by owner. ERP budget updated, project controller notified, and revenue impact logged to bid-vs-actual tracker.',
      timestamp: '10:22 AM · today',
      fields: [
        { label: 'Change order', value: 'CO-0047 · Cascade Medical' },
        { label: 'Value', value: '$84,000' },
        { label: 'New contract total', value: '$3,084,000' },
        { label: 'Processing time', value: '4.8 seconds' },
      ],
    },
    {
      id: 'cx-f3',
      type: 'report',
      category: 'Finance · COURIER',
      headline: 'Weekly Job Cost Summary — 40 active projects · $18.4M at risk',
      body:
        '34 of 40 projects tracking within budget. 6 projects showing elevated burn — Cascade Medical and Northgate Retail flagged for partner review. Change order backlog grew to $340K pending approval.',
      timestamp: '6:00 AM · Monday',
      kpis: [
        { label: 'Projects on budget', value: '34 / 40', tone: 'good' },
        { label: 'At-risk value', value: '$18.4M', tone: 'neutral' },
        { label: 'CO backlog', value: '$340K', tone: 'neutral' },
        { label: 'Avg margin', value: '11.4%', tone: 'good' },
      ],
      sparkline: [10.8, 11.0, 11.1, 11.2, 11.1, 11.3, 11.2, 11.4, 11.3, 11.4, 11.4, 11.4],
      sparkColor: '#1A7A4A',
    },
    {
      id: 'cx-f4',
      type: 'anomaly',
      category: 'Safety · RADAR',
      headline: 'Northgate Retail — 3 near-miss reports in 48 hours',
      body:
        'Three near-miss incidents logged at Northgate Retail over 48 hours (fall protection, crane swing, utility strike). Site safety score dropped from 92 to 78. OSHA 300 log unchanged, but pattern signals escalating risk.',
      timestamp: '11:38 PM · last night',
      severity: 'critical',
      status: 'active',
      kpis: [
        { label: 'Near-misses', value: '3 (48h)', tone: 'bad' },
        { label: 'Safety score', value: '78', tone: 'bad' },
        { label: 'Baseline', value: '92', tone: 'neutral' },
        { label: 'OSHA recordables', value: '0', tone: 'good' },
      ],
    },
    {
      id: 'cx-f5',
      type: 'agent',
      category: 'Finance · AGENT ACTIVITY',
      headline: 'Subcontractor Pay App Processor — 14 apps validated overnight',
      body:
        '14 subcontractor pay applications validated against cost codes, schedule of values, and lien waivers. 11 approved and queued for disbursement, 3 held for missing waivers (Harbor Mech, Summit Elec, Ridge Concrete).',
      timestamp: '3:24 AM · today',
      fields: [
        { label: 'Pay apps', value: '14' },
        { label: 'Approved', value: '11 (79%)' },
        { label: 'Held for waivers', value: '3' },
        { label: 'Total disbursement', value: '$1.84M' },
      ],
    },
    {
      id: 'cx-f6',
      type: 'report',
      category: 'Operations · COURIER',
      headline: 'Daily Crew Productivity — 18 crews · 94% plan attainment',
      body:
        'Crew productivity held above the 90% attainment target. Cascade Medical mechanical crew led at 108% (catching up from last week). Northgate Retail electrical crew lagged at 82% — two callouts against a 6-person crew.',
      timestamp: '6:00 AM · today',
      kpis: [
        { label: 'Crews', value: '18', tone: 'neutral' },
        { label: 'Attainment avg', value: '94%', tone: 'good' },
        { label: 'Best crew', value: 'Cascade Mech · 108%', tone: 'good' },
        { label: 'Worst crew', value: 'Northgate Elec · 82%', tone: 'bad' },
      ],
    },
    {
      id: 'cx-f7',
      type: 'anomaly',
      category: 'Schedule · RADAR',
      headline: 'Cascade Medical — critical path slippage · 9 days',
      body:
        'Mechanical rough-in finished 9 days late, pushing the critical path. Drywall inspection is now at risk for the 4/28 milestone. Recovery plan requires overtime authorization (~$42K) or scope resequencing.',
      timestamp: '5:52 AM · today',
      severity: 'high',
      status: 'active',
      kpis: [
        { label: 'Slippage', value: '9 days', tone: 'bad' },
        { label: 'Milestone at risk', value: '4/28 drywall', tone: 'bad' },
        { label: 'OT cost to recover', value: '$42K', tone: 'bad' },
        { label: 'Float remaining', value: '3 days', tone: 'bad' },
      ],
    },
    {
      id: 'cx-f8',
      type: 'agent',
      category: 'Project Management · AGENT ACTIVITY',
      headline: 'RFI Router — 22 RFIs triaged · 14 auto-responded',
      body:
        '22 RFIs filed through Procore since yesterday. 14 answered automatically from prior submittals and spec-book matches, 6 routed to the design team, 2 escalated to the architect (Cascade Medical HVAC clash).',
      timestamp: '7:08 AM · today',
      fields: [
        { label: 'RFIs processed', value: '22' },
        { label: 'Auto-responded', value: '14 (64%)' },
        { label: 'Design team', value: '6' },
        { label: 'Architect', value: '2' },
      ],
    },
    {
      id: 'cx-f9',
      type: 'report',
      category: 'Finance · COURIER',
      headline: 'Monthly Billing Run — $6.4M AIA G702 billings queued',
      body:
        'Monthly AIA G702/G703 billings prepared across 28 projects totaling $6.4M. Retainage tracked at $312K. Two projects held for owner-initiated change orders to clear before billing release.',
      timestamp: '9:36 AM · today',
      kpis: [
        { label: 'Billings prepared', value: '$6.4M', tone: 'good' },
        { label: 'Projects', value: '28', tone: 'neutral' },
        { label: 'Retainage', value: '$312K', tone: 'neutral' },
        { label: 'Held for CO', value: '2', tone: 'bad' },
      ],
      sparkline: [5.6, 5.7, 5.8, 5.9, 6.0, 6.0, 6.1, 6.2, 6.2, 6.3, 6.3, 6.4],
      sparkColor: '#1A7A4A',
    },
    {
      id: 'cx-f10',
      type: 'report',
      category: 'Leadership · COURIER',
      headline: 'Morning PM Brief — delivered to 12 project managers',
      body:
        'Personalized brief delivered at 6:00 AM: Cascade Medical budget and schedule risk, Northgate safety trend, CO backlog, pay app status, and today\'s crew attainment. 12 project managers received tailored views.',
      timestamp: '6:00 AM · today',
      fields: [
        { label: 'Recipients', value: '12 project managers' },
        { label: 'Items summarized', value: '13 across projects' },
        { label: 'Delivery channel', value: 'Email + Procore inbox' },
        { label: 'Time to assemble', value: '48 seconds' },
      ],
    },
  ],
};

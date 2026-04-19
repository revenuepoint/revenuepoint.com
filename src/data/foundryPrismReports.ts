export type PrismCategory =
  | 'Finance'
  | 'Sales & CRM'
  | 'Operations'
  | 'Customer & Service'
  | 'Production'
  | 'Inventory & Supply Chain'
  | 'Pharmacy';

export type PrismKpi = {
  label: string;
  value: string;
  change?: string;
  changeTone?: 'good' | 'bad' | 'neutral';
};

export type StackedBarChart = {
  kind: 'stacked-bar';
  title: string;
  segments: { label: string; value: number; color: string; display: string }[];
};

export type GroupedBarChart = {
  kind: 'grouped-bar';
  title: string;
  groups: string[]; // e.g. ['Line 1', 'Line 2', 'Line 3']
  series: { name: string; color: string; values: number[] }[]; // one per group per series
  unit?: string;
  max?: number;
};

export type HorizontalBarChart = {
  kind: 'horizontal-bar';
  title: string;
  bars: { label: string; value: number; color: string; display: string }[];
  max?: number;
};

export type DonutChart = {
  kind: 'donut';
  title: string;
  slices: { label: string; value: number; color: string }[];
  centerLabel: string;
  centerSublabel: string;
};

export type WaterfallChart = {
  kind: 'waterfall';
  title: string;
  steps: { label: string; value: number; display: string; kind: 'start' | 'add' | 'subtract' | 'end' }[];
};

export type PrismChart =
  | StackedBarChart
  | GroupedBarChart
  | HorizontalBarChart
  | DonutChart
  | WaterfallChart;

export type PrismFinding = {
  impact: 'High' | 'Medium' | 'Low';
  body: string;
};

export type PrismAppendixRow = { label: string; value: string };

export type PrismAppendix = {
  title: string;
  columns: [string, string];
  rows: PrismAppendixRow[];
};

export type PrismReport = {
  id: string;
  name: string;
  description: string;
  category: PrismCategory;
  estimatedTime: string;
  dateRange: string;
  generatedAt: string;
  duration: string;
  cost: string;
  sources: string[];
  summary: string[];
  kpis: PrismKpi[];
  chart: PrismChart;
  findings: PrismFinding[];
  recommendations: string[];
  methodology: string;
  appendix: PrismAppendix;
};

export const prismReports: PrismReport[] = [
  {
    id: 'pr-1',
    name: 'AR/AP Health Report',
    description:
      'Accounts receivable and payable analysis with aging trends, cash flow projections, and collection risk scoring.',
    category: 'Finance',
    estimatedTime: '~3m',
    dateRange: 'Jan 1 – Mar 31, 2026',
    generatedAt: 'Apr 18, 2026 · 06:00',
    duration: '2m 48s',
    cost: '$0.04',
    sources: ['QuickBooks', 'Salesforce'],
    summary: [
      'AR closed Q1 at $312K, up 14% QoQ against a sales volume increase of 9%. Aging profile remains healthy — 68% of balance is under 30 days — but three accounts account for 54% of the 60+ day overdue pool and warrant escalation this week.',
      'On the AP side, DPO held steady at 38 days (vs. 41 target). No vendor holds or late-fee exposures identified. Cash conversion cycle improved by 2.1 days vs Q4.',
    ],
    kpis: [
      { label: 'Total AR', value: '$312K', change: '+14% QoQ', changeTone: 'bad' },
      { label: 'Past 60d', value: '$78K', change: '+2%', changeTone: 'bad' },
      { label: 'DSO', value: '42 days', change: '-8%', changeTone: 'good' },
      { label: 'Cash cycle', value: '38 days', change: '-2.1d', changeTone: 'good' },
    ],
    chart: {
      kind: 'stacked-bar',
      title: 'AR Aging · $312K total',
      segments: [
        { label: '0–30 days', value: 212, color: '#10b981', display: '$212K' },
        { label: '31–60 days', value: 54, color: '#f59e0b', display: '$54K' },
        { label: '61–90 days', value: 32, color: '#f97316', display: '$32K' },
        { label: '90+ days', value: 14, color: '#ef4444', display: '$14K' },
      ],
    },
    findings: [
      {
        impact: 'High',
        body: 'Meridian Builders holds 38% of the 60+ day overdue balance ($47.2K, 62 days). Recommend formal escalation and credit hold.',
      },
      {
        impact: 'Medium',
        body: "Cascade Metals average DSO up 11 days vs prior quarter. Likely driver: leadership change on AP side.",
      },
      {
        impact: 'Low',
        body: 'Pacific NW Construction prepaid $68K on the Q2 order. No action required; flagged for cash-flow forecast.',
      },
    ],
    recommendations: [
      'Dispatch collections outreach to Meridian Builders (scripted · template attached).',
      "Route a short check-in email to the new Cascade Metals AP lead to reset payment cadence.",
      'Lock current DPO target; no change to AP policy recommended this quarter.',
    ],
    methodology:
      'AR balances pulled from QuickBooks GL as of 06:00 Apr 18. Aging buckets follow the 30/60/90/120-day convention, with credit-risk scoring blending payment history (60%), industry benchmarks (25%), and public financial signals (15%). Top 20 accounts reviewed manually by Prism before the narrative was drafted. Cross-checked against Salesforce opportunity-level billing assumptions.',
    appendix: {
      title: 'Appendix A · Account-level aging (top 10)',
      columns: ['Account', 'Balance · Days overdue'],
      rows: [
        { label: 'Meridian Builders', value: '$47.2K · 62d' },
        { label: 'Cascade Metals', value: '$18.4K · 48d' },
        { label: 'Summit Fabrication', value: '$14.1K · 41d' },
        { label: 'Blue Ridge Distributors', value: '$11.8K · 36d' },
        { label: 'Valley Steel Works', value: '$9.2K · 33d' },
        { label: 'Sierra Mining Co.', value: '$8.4K · 28d' },
        { label: 'Tribeca Logistics', value: '$6.1K · 24d' },
        { label: 'Harbor Industrial', value: '$5.3K · 21d' },
        { label: 'East Bay Welding', value: '$4.9K · 18d' },
        { label: 'Pioneer Tool & Die', value: '$4.1K · 14d' },
      ],
    },
  },
  {
    id: 'pr-2',
    name: 'Sales Pipeline Analysis',
    description:
      'Pipeline health assessment including stage conversion rates, velocity metrics, and win/loss pattern recognition.',
    category: 'Sales & CRM',
    estimatedTime: '~3m',
    dateRange: 'Jan 1 – Mar 31, 2026',
    generatedAt: 'Apr 1, 2026 · 10:30',
    duration: '3m 12s',
    cost: '$0.06',
    sources: ['Salesforce', 'Foundry warehouse'],
    summary: [
      '$1.84M in open pipeline across 8 opportunities. Pacific NW Construction ($340K) and Coastal Fabrication ($165K) are both in Negotiation with close dates within 30 days — $505K near-term recognizable revenue.',
      'Pipeline velocity is up 18% vs Q4 and Win Rate held at 31% (target 28%). The concentration risk: 42% of pipeline sits in Negotiation, a single stage.',
    ],
    kpis: [
      { label: 'Pipeline', value: '$1.84M', change: '+18% QoQ', changeTone: 'good' },
      { label: 'Weighted', value: '$1.12M', change: '+22%', changeTone: 'good' },
      { label: 'Avg deal', value: '$230K', change: '+6%', changeTone: 'good' },
      { label: 'Win rate', value: '31%', change: '+3pp', changeTone: 'good' },
    ],
    chart: {
      kind: 'horizontal-bar',
      title: 'Pipeline by stage · $1.84M',
      bars: [
        { label: 'Qualification', value: 380, color: '#60a5fa', display: '$380K' },
        { label: 'Proposal', value: 540, color: '#3b82f6', display: '$540K' },
        { label: 'Negotiation', value: 770, color: '#1d4ed8', display: '$770K' },
        { label: 'Closed Won', value: 150, color: '#065f46', display: '$150K' },
      ],
    },
    findings: [
      {
        impact: 'High',
        body: 'Negotiation stage holds 42% of pipeline — strongest near-term conversion bucket; prioritize Pacific NW and Coastal for April close.',
      },
      {
        impact: 'Medium',
        body: 'Proposal dwell time averaging 21 days vs 14 target. Thomas Jones accounts for 3 of 4 slow proposals — coachable.',
      },
      {
        impact: 'Medium',
        body: 'Discovery funnel shrinking 12% QoQ. May need a dedicated Q2 lead-gen campaign to refill the top of the funnel.',
      },
    ],
    recommendations: [
      'Prioritize Pacific NW + Coastal for April close (combined $505K).',
      'Sit with Thomas Jones on proposal velocity; consider a templated proposal framework.',
      'Trigger a Q2 lead-gen campaign to rebuild Discovery.',
    ],
    methodology:
      'Pipeline snapshot taken from Salesforce opportunity records at 10:30 Apr 1. Stage-conversion rates computed on the trailing 12 months of closed opportunities (n=118). Velocity measured as median days-per-stage. Win-rate attribution uses the 90-day attribution window. Forecast weighting applies stage-specific probability multipliers calibrated against Q4 2025 actuals.',
    appendix: {
      title: 'Appendix B · Open opportunities (top 10 by weighted value)',
      columns: ['Opportunity · Stage · Owner', 'Value · Close date'],
      rows: [
        { label: 'Pacific NW Construction · Negotiation · T. Jones', value: '$340K · Apr 22' },
        { label: 'Coastal Fabrication · Negotiation · M. Torres', value: '$165K · Apr 28' },
        { label: 'Sierra Mining Renewal · Proposal · S. Kim', value: '$220K · May 12' },
        { label: 'Blue Ridge Distributors · Proposal · P. Patel', value: '$185K · May 06' },
        { label: 'Valley Steel Works · Qualification · T. Jones', value: '$142K · Jun 03' },
        { label: 'Summit Industrial · Proposal · J. Chen', value: '$128K · May 19' },
        { label: 'Harbor Industrial · Qualification · D. Rivera', value: '$96K · Jun 10' },
        { label: 'East Bay Welding · Negotiation · M. Torres', value: '$88K · May 02' },
        { label: 'Tribeca Logistics · Qualification · P. Patel', value: '$72K · Jun 24' },
        { label: 'Pioneer Tool & Die · Proposal · J. Chen', value: '$64K · May 27' },
      ],
    },
  },
  {
    id: 'pr-3',
    name: 'Production Efficiency Report',
    description:
      'Throughput, line utilization, downtime analysis, OEE by line and SKU, and optimization recommendations.',
    category: 'Production',
    estimatedTime: '~6m',
    dateRange: 'Feb 1 – Mar 10, 2026',
    generatedAt: 'Mar 10, 2026 · 11:00',
    duration: '5m 40s',
    cost: '$0.11',
    sources: ['SAP', 'MES · Line telemetry'],
    summary: [
      'OEE across three lines averaged 74.3%, down 4.1 points QoQ and off-target (goal ≥80%). Line 3 is the drag — 68% OEE, driven by elevated downtime (14.2 hrs/wk) and a scrap spike on Mar 3 (8.2% vs 1.9% baseline).',
      'Lines 1 and 2 remain healthy (78.4% and 79.1%). Throughput is actually up 2.8% QoQ overall — the revenue cushion is hiding the Line 3 problem from headline numbers.',
    ],
    kpis: [
      { label: 'OEE avg', value: '74.3%', change: '-4.1pp', changeTone: 'bad' },
      { label: 'Throughput', value: '847 u/day', change: '+2.8%', changeTone: 'good' },
      { label: 'Scrap', value: '2.4%', change: '+0.5pp', changeTone: 'bad' },
      { label: 'Downtime', value: '14.2 hrs/wk', change: '+22%', changeTone: 'bad' },
    ],
    chart: {
      kind: 'grouped-bar',
      title: 'OEE breakdown by line (Availability · Performance · Quality)',
      groups: ['Line 1', 'Line 2', 'Line 3'],
      series: [
        { name: 'Availability', color: '#2563eb', values: [84, 85, 72] },
        { name: 'Performance', color: '#059669', values: [92, 91, 82] },
        { name: 'Quality', color: '#d97706', values: [98, 98, 87] },
      ],
      unit: '%',
      max: 100,
    },
    findings: [
      {
        impact: 'High',
        body: 'Line 3 hydraulic pressure dropped to 78% of nominal the hour before the Mar 3 scrap spike. Direct causal link.',
      },
      {
        impact: 'High',
        body: 'Upstream temp sensor T-204 drifted 4°C for 6 hours before the scrap event. Preventive maintenance would have caught it.',
      },
      {
        impact: 'Medium',
        body: "Operator scrap correlation: Marcus K.'s scrap rate runs 3.2× peers when swapped from Line 2 to Line 3.",
      },
    ],
    recommendations: [
      'Preventive maintenance on Line 3 hydraulic system this week.',
      'Replace T-204 sensor and add drift monitoring.',
      'Refresher training on Line 3 for cross-shift operators (Marcus + 2 others).',
    ],
    methodology:
      'MES telemetry sampled at 1-second resolution across all three lines, then rolled up to 1-hour OEE windows. OEE = Availability × Performance × Quality, calculated per SEMI E10 convention. Scrap-rate flagged at >2× 30-day rolling baseline. Hydraulic-pressure and T-sensor correlation computed via Pearson coefficient on 6-hour windows. Raw telemetry retained for 90 days.',
    appendix: {
      title: 'Appendix C · Line 3 hourly log (Mar 3, partial)',
      columns: ['Hour · Line', 'OEE · Event'],
      rows: [
        { label: '06:00 · Line 3', value: '72% · nominal' },
        { label: '07:00 · Line 3', value: '68% · T-204 drift +2°C' },
        { label: '08:00 · Line 3', value: '62% · T-204 drift +3°C' },
        { label: '09:00 · Line 3', value: '54% · hydraulic pressure 88%' },
        { label: '10:00 · Line 3', value: '47% · hydraulic pressure 82%' },
        { label: '11:00 · Line 3', value: '38% · scrap event · 8.2%' },
        { label: '12:00 · Line 3', value: '61% · maintenance stop · 42m' },
        { label: '13:00 · Line 3', value: '74% · back to nominal' },
        { label: '14:00 · Line 3', value: '76% · nominal' },
        { label: '15:00 · Line 3', value: '77% · nominal' },
      ],
    },
  },
  {
    id: 'pr-4',
    name: 'Customer Lifetime Value Analysis',
    description:
      'Predictive CLV modeling with segment-specific growth opportunities and retention investment recommendations.',
    category: 'Sales & CRM',
    estimatedTime: '~4m',
    dateRange: 'Trailing 24 months',
    generatedAt: 'Apr 18, 2026 · 14:20',
    duration: '4m 05s',
    cost: '$0.09',
    sources: ['Salesforce', 'QuickBooks', 'SAP'],
    summary: [
      'Top-decile customers (7% of the base) drive 41% of revenue. Predicted 24-month CLV spans $38K to $620K. Construction · Pacific NW segment carries the highest retained CLV (avg $410K) and lowest churn (3.2%).',
      'Fabrication · West segment shows elevated churn risk (18.4%) — three accounts are flagged. New-logo customers acquired in Q3 2025 are pacing 12% below the expected CLV curve; onboarding quality may be slipping.',
    ],
    kpis: [
      { label: 'Avg CLV', value: '$142K', change: '+6%', changeTone: 'good' },
      { label: 'Top-decile share', value: '41%', change: '+3pp', changeTone: 'good' },
      { label: 'Retention', value: '94%', change: '-0.8pp', changeTone: 'bad' },
      { label: 'At-risk accts', value: '7', change: '', changeTone: 'bad' },
    ],
    chart: {
      kind: 'donut',
      title: 'CLV distribution by segment ($ weighted)',
      centerLabel: '$142K',
      centerSublabel: 'avg CLV',
      slices: [
        { label: 'Construction (Pacific NW)', value: 38, color: '#2563eb' },
        { label: 'Fabrication (West)', value: 22, color: '#7c3aed' },
        { label: 'Mining', value: 18, color: '#d97706' },
        { label: 'Logistics', value: 14, color: '#059669' },
        { label: 'Other', value: 8, color: '#64748b' },
      ],
    },
    findings: [
      {
        impact: 'High',
        body: 'Pacific NW Construction predicted 24-month CLV: $620K (2.3× the base average). Warrants earliest-stage renewal engagement.',
      },
      {
        impact: 'High',
        body: 'Fabrication West: 3 accounts show declining order cadence + rising support load. Composite churn risk >60%.',
      },
      {
        impact: 'Medium',
        body: "Q3 2025 new-logo cohort pacing 12% below CLV curve. Root cause likely onboarding — flagged for Q2 audit.",
      },
    ],
    recommendations: [
      'Initiate renewal engagement with Pacific NW 90 days before anniversary.',
      'CS outreach to the 3 at-risk Fabrication accounts this week.',
      'Launch a Q2 onboarding audit focused on the new-logo cohort.',
    ],
    methodology:
      'CLV modeled on a trailing 24-month revenue-and-cost cohort per account. Churn probability blends order-cadence drift (45%), support-ticket load (25%), engagement signals (15%), and industry benchmark churn (15%). Segment definitions pulled from Salesforce account tiers; at-risk threshold set at composite score >0.6. Model recalibrated quarterly; last recalibration Mar 15, 2026.',
    appendix: {
      title: 'Appendix D · At-risk accounts (composite score >0.6)',
      columns: ['Account · Segment', 'CLV · Churn risk'],
      rows: [
        { label: 'Ironwood Fabrication · Fabrication West', value: '$212K · 74%' },
        { label: 'Silverlake Metal · Fabrication West', value: '$184K · 71%' },
        { label: 'Greenfield Welding · Fabrication West', value: '$148K · 66%' },
        { label: 'Ridgeline Alloys · Fabrication West', value: '$128K · 64%' },
        { label: 'Coastline Mining · Mining', value: '$112K · 62%' },
        { label: 'Northstar Logistics · Logistics', value: '$94K · 61%' },
        { label: 'Pioneer Alloy Works · Fabrication West', value: '$88K · 60%' },
        { label: 'Harbor Freight Moving · Logistics', value: '$76K · 58%' },
        { label: 'Bedrock Materials · Mining', value: '$64K · 56%' },
        { label: 'Summit Haulers · Logistics', value: '$52K · 54%' },
      ],
    },
  },
  {
    id: 'pr-5',
    name: 'Monthly P&L Summary',
    description:
      'Detailed profit and loss breakdown with variance analysis against prior period and budget, formatted for executive review.',
    category: 'Finance',
    estimatedTime: '~3m',
    dateRange: 'Mar 1 – Mar 31, 2026',
    generatedAt: 'Mar 31, 2026 · 08:15',
    duration: '2m 22s',
    cost: '$0.04',
    sources: ['QuickBooks', 'SAP', 'Salesforce'],
    summary: [
      'March revenue closed at $2.84M (+4.2% MoM, −5.3% below the $3.0M goal). COGS rose 2.1 points to 61.4%, mostly driven by Hyaluronic Acid spot-buy premiums. Gross margin landed at 38.6% (goal 40%).',
      'Opex held flat at $684K with no line item over budget. Net income of $412K is up 3.8% MoM. The goal miss is concentrated in one product line and one recoverable cost event.',
    ],
    kpis: [
      { label: 'Revenue', value: '$2.84M', change: '+4.2%', changeTone: 'good' },
      { label: 'Gross margin', value: '38.6%', change: '-1.4pp', changeTone: 'bad' },
      { label: 'Opex', value: '$684K', change: 'flat', changeTone: 'neutral' },
      { label: 'Net income', value: '$412K', change: '+3.8%', changeTone: 'good' },
    ],
    chart: {
      kind: 'waterfall',
      title: 'March P&L flow ($K)',
      steps: [
        { label: 'Revenue', value: 2840, display: '+$2.84M', kind: 'start' },
        { label: 'COGS', value: -1744, display: '-$1.74M', kind: 'subtract' },
        { label: 'Gross profit', value: 1096, display: '$1.10M', kind: 'add' },
        { label: 'Opex', value: -684, display: '-$684K', kind: 'subtract' },
        { label: 'Net income', value: 412, display: '$412K', kind: 'end' },
      ],
    },
    findings: [
      {
        impact: 'Medium',
        body: 'Revenue shortfall vs goal concentrated in Safety Equipment (-11% QoQ) and the Sierra Mining renewal slipping into Q2.',
      },
      {
        impact: 'Medium',
        body: 'COGS spike attributable to Hyaluronic Acid shortage — 24h expedited PO added $480 in premium per event.',
      },
      {
        impact: 'Low',
        body: 'Opex discipline holds — every line item inside budget. Headcount and T&E both trending favorably.',
      },
    ],
    recommendations: [
      'Route Sierra Mining renewal follow-up this week to land before Q2 close.',
      'Review raw-material sourcing strategy for Hyaluronic Acid (secondary vendor under review).',
      'Maintain Opex posture through Q2 — no cost cuts needed.',
    ],
    methodology:
      'GL extracted from QuickBooks on Mar 31, 2026 at 08:00 after pre-close entries were posted. Variances computed vs. the FY26 operating plan; threshold for narrative inclusion is ±3% on any line item. Revenue recognition follows ASC 606. COGS allocations run through SAP material ledger. All figures are preliminary pending auditor review of inventory reserves.',
    appendix: {
      title: 'Appendix E · GL line detail (variance ≥ 3%)',
      columns: ['Line item', 'Variance · Actual'],
      rows: [
        { label: 'Revenue · Safety Equipment', value: '-11% · $380K' },
        { label: 'Revenue · Construction Supplies', value: '+8% · $1.24M' },
        { label: 'Revenue · Industrial Chemicals', value: '-4% · $580K' },
        { label: 'COGS · Hyaluronic Acid (expedite)', value: '+18% · $92K' },
        { label: 'COGS · Steel raw stock', value: '+3% · $412K' },
        { label: 'COGS · Packaging materials', value: '-6% · $64K' },
        { label: 'Opex · Sales commissions', value: '+2% · $184K' },
        { label: 'Opex · Freight out', value: '+4% · $48K' },
        { label: 'Opex · Professional fees', value: '-7% · $22K' },
        { label: 'Opex · Utilities', value: '-3% · $14K' },
      ],
    },
  },
];

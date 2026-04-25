import type { IndustryId } from '@/context/IndustryContext';

export type PrismCategory =
  | 'Finance'
  | 'Sales & CRM'
  | 'Operations'
  | 'Customer & Service'
  | 'Production'
  | 'Inventory & Supply Chain'
  | 'Pharmacy'
  | 'Compliance'
  | 'Revenue Cycle'
  | 'Fundraising'
  | 'Portfolio'
  | 'Advisory'
  | 'Project Controls';

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
  groups: string[];
  series: { name: string; color: string; values: number[] }[];
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

/* =========================================================================
 *  PER-INDUSTRY PRISM REPORTS
 * =========================================================================
 *  3 reports per industry: 1 Ops, 1 Finance, 1 Commercial/Growth.
 *  generatedAt timestamps land in 02:00–07:30 on 2026-04-23 or 2026-04-24
 *  to read as "last night, ready by 8 AM" on today's date.
 */
export const prismReportsByIndustry: Record<IndustryId, PrismReport[]> = {
  /* ----------------------------- Manufacturing ----------------------------- */
  manufacturing: [
    {
      id: 'mfg-pr-1',
      name: 'Monthly Production Scorecard',
      description: 'OEE, scrap, downtime, and throughput by line and shift — with anomaly commentary.',
      category: 'Operations',
      estimatedTime: '~5m',
      dateRange: 'Mar 1 – Mar 31, 2026',
      generatedAt: 'Apr 24, 2026 · 05:18',
      duration: '4m 42s',
      cost: '$0.09',
      sources: ['SAP', 'MES', 'QuickBooks'],
      summary: [
        'March OEE averaged 76.8% across three lines — off-target (≥80%). Line 2 carried most of the underperformance after a Mar 18 changeover that ran 47 minutes over spec and a lingering shift-3 scrap elevation.',
        'Throughput held steady at 4.1M units; revenue $4.12M (+3% MoM). The productivity hit was absorbed by unit mix, not top-line — but the compensating Q2 run of premium SKUs will not repeat, so OEE needs to recover.',
      ],
      kpis: [
        { label: 'OEE avg', value: '76.8%', change: '-2.4pp', changeTone: 'bad' },
        { label: 'Throughput', value: '4.12M u', change: '+3%', changeTone: 'good' },
        { label: 'Scrap', value: '2.3%', change: '+0.4pp', changeTone: 'bad' },
        { label: 'Downtime', value: '11.4 hr/wk', change: '+2.1 hr', changeTone: 'bad' },
      ],
      chart: {
        kind: 'grouped-bar',
        title: 'OEE by line — Availability · Performance · Quality',
        groups: ['Line 1', 'Line 2', 'Line 3'],
        series: [
          { name: 'Availability', color: '#2563eb', values: [86, 78, 84] },
          { name: 'Performance', color: '#059669', values: [91, 82, 90] },
          { name: 'Quality', color: '#d97706', values: [98, 91, 97] },
        ],
        unit: '%',
        max: 100,
      },
      findings: [
        { impact: 'High', body: 'Line 2 Mar-18 changeover ran 47 min long; downstream scrap elevated for 3 shifts.' },
        { impact: 'High', body: 'T-204 upstream temp sensor drifting 4°C — correlates with scrap spike start.' },
        { impact: 'Medium', body: 'Shift-3 cross-shift operators show 3.2× scrap vs steady-state team.' },
      ],
      recommendations: [
        'Schedule Line 2 preventive maintenance window this week.',
        'Replace T-204 sensor + add drift monitoring threshold.',
        'Refresher training for 2 cross-shift operators flagged by scrap correlation.',
      ],
      methodology:
        'MES telemetry sampled at 1-second resolution, rolled up to hourly OEE windows per SEMI E10. Scrap flagged at >2× 30-day rolling baseline; sensor drift via 6-hour Pearson correlation. Margin-impact estimates blend standard cost (80%) with current contribution actuals (20%).',
      appendix: {
        title: 'Appendix A · Line 2 Mar 18 hourly log',
        columns: ['Hour', 'OEE · Event'],
        rows: [
          { label: '06:00', value: '81% · nominal' },
          { label: '10:00', value: '58% · changeover start (planned 90m, ran 137m)' },
          { label: '14:00', value: '64% · T-204 +2°C drift' },
          { label: '18:00', value: '51% · shift-3 scrap spike' },
          { label: '22:00', value: '68% · partial recovery' },
          { label: '02:00 (19th)', value: '74% · back to nominal' },
        ],
      },
    },
    {
      id: 'mfg-pr-2',
      name: 'Q1 Manufacturing Margin Bridge',
      description: 'Standard-to-actual margin reconciliation with scrap, material, and price/mix drivers.',
      category: 'Finance',
      estimatedTime: '~4m',
      dateRange: 'Jan 1 – Mar 31, 2026',
      generatedAt: 'Apr 23, 2026 · 06:42',
      duration: '3m 58s',
      cost: '$0.07',
      sources: ['SAP', 'QuickBooks', 'Foundry warehouse'],
      summary: [
        'Actual margin closed Q1 at 31.4% vs 34.1% standard — a 270 bp gap on $12.4M revenue ($335K margin impact). Two drivers explain 89% of the gap: Line 2 scrap ($128K) and arabica-grade raw steel price pass-through lag ($72K).',
        'Recovery path for Q2: Line 2 preventive maintenance (in motion) and the new steel contract starting Apr 14 should together add ~200 bps back to margin by end of Q2.',
      ],
      kpis: [
        { label: 'Actual margin', value: '31.4%', change: '-2.7pp vs std', changeTone: 'bad' },
        { label: 'Revenue', value: '$12.4M', change: '+4% QoQ', changeTone: 'good' },
        { label: 'Unfav variance', value: '$335K', change: '', changeTone: 'bad' },
        { label: 'Q2 recovery path', value: '+200 bps', change: 'projected', changeTone: 'good' },
      ],
      chart: {
        kind: 'waterfall',
        title: 'Q1 margin bridge — standard → actual (bps)',
        steps: [
          { label: 'Std margin', value: 3410, display: '34.10%', kind: 'start' },
          { label: 'Steel +6%', value: -72, display: '-72 bp', kind: 'subtract' },
          { label: 'Line 2 scrap', value: -128, display: '-128 bp', kind: 'subtract' },
          { label: 'Price realization', value: 41, display: '+41 bp', kind: 'add' },
          { label: 'Mix', value: 28, display: '+28 bp', kind: 'add' },
          { label: 'Other', value: -139, display: '-139 bp', kind: 'subtract' },
          { label: 'Actual', value: 3140, display: '31.40%', kind: 'end' },
        ],
      },
      findings: [
        { impact: 'High', body: 'Line 2 scrap alone accounts for 128 bp of the gap — isolated and fixable.' },
        { impact: 'High', body: 'Steel pass-through lag is $72K one-time; new contract price-lock closes the gap from Apr 14.' },
        { impact: 'Low', body: 'Price realization (+41 bp) and mix (+28 bp) are working for us — hold.' },
      ],
      recommendations: [
        'Treat Line 2 scrap as a one-time impairment in the Q1 narrative to the board.',
        'Confirm steel price-lock runs through Q3; negotiate extension ahead of Q4.',
        'Lock-in mix shift in 2026 forecast — product-line planning should preserve the gain.',
      ],
      methodology:
        'GL pulled from QuickBooks at 06:00 Apr 23. Standard costs sourced from SAP item master; actuals reconciled line-by-line. Scrap attribution uses 2σ baseline per SKU family. Price/mix decomposition uses Laspeyres indexing against prior-quarter base.',
      appendix: {
        title: 'Appendix B · SKU-family margin (top 5)',
        columns: ['SKU family', 'Revenue · Actual margin'],
        rows: [
          { label: 'Industrial Fasteners', value: '$4.14M · 32.8%' },
          { label: 'Hydraulic Components', value: '$2.82M · 29.4%' },
          { label: 'Safety Equipment', value: '$2.36M · 32.1%' },
          { label: 'Cutting Tools', value: '$1.88M · 31.9%' },
          { label: 'Raw Materials', value: '$1.20M · 30.2%' },
        ],
      },
    },
    {
      id: 'mfg-pr-3',
      name: 'Supplier OTIF & Risk Report',
      description: 'On-time-in-full performance with risk scoring and recommended vendor actions.',
      category: 'Sales & CRM',
      estimatedTime: '~3m',
      dateRange: 'Last 90 days',
      generatedAt: 'Apr 24, 2026 · 04:22',
      duration: '2m 48s',
      cost: '$0.05',
      sources: ['SAP Business One', 'EDI feed', 'Salesforce'],
      summary: [
        'Supplier OTIF averaged 91.8% over 90 days — two suppliers below 80% threshold (Allegheny Steel and NextGen Chemical). Steel-side risk is the more material of the two; contingency sourcing is already in place.',
        'Late-delivery exposure: ~$142K of at-risk revenue tied to five active customer POs that rely on the two flagged suppliers. All recoverable with expedite windows if flagged now.',
      ],
      kpis: [
        { label: 'OTIF', value: '91.8%', change: '-2.4pp', changeTone: 'bad' },
        { label: 'Suppliers < 80%', value: '2', change: '', changeTone: 'bad' },
        { label: 'At-risk revenue', value: '$142K', change: '', changeTone: 'bad' },
        { label: 'Alt-vendor coverage', value: '80%', change: 'ready', changeTone: 'good' },
      ],
      chart: {
        kind: 'horizontal-bar',
        title: 'Top 8 suppliers · OTIF % (last 90 days)',
        bars: [
          { label: 'Kraft Metals', value: 98, color: '#065f46', display: '98%' },
          { label: 'Global Metals', value: 96, color: '#059669', display: '96%' },
          { label: 'Pacific Polymers', value: 94, color: '#10b981', display: '94%' },
          { label: 'Valley Fasteners', value: 92, color: '#34d399', display: '92%' },
          { label: 'Summit Bearings', value: 91, color: '#34d399', display: '91%' },
          { label: 'Coastal Tool & Die', value: 88, color: '#f59e0b', display: '88%' },
          { label: 'Allegheny Steel', value: 76, color: '#ef4444', display: '76%' },
          { label: 'NextGen Chemical', value: 72, color: '#ef4444', display: '72%' },
        ],
        max: 100,
      },
      findings: [
        { impact: 'High', body: 'Allegheny Steel OTIF trending down 4 straight months — escalate or re-source.' },
        { impact: 'Medium', body: 'NextGen Chemical lead-time variance doubled since Jan; indicative of capacity stress.' },
        { impact: 'Low', body: 'Kraft Metals remains a reliable surge-capacity partner for steel expedites.' },
      ],
      recommendations: [
        'Trigger alternate-vendor escalation with Allegheny Steel next 30 days.',
        'Pre-position safety stock for NextGen Chemical items through end of Q2.',
        'Flag the 5 at-risk customer POs to rep team with proactive ETA updates.',
      ],
      methodology:
        'EDI 855/856 messages reconciled against SAP B1 PO receipts; delivery windows calibrated to contract terms. Risk score blends trailing 90-day OTIF (50%), quarter-over-quarter trend (30%), and lead-time variance (20%).',
      appendix: {
        title: 'Appendix C · At-risk customer POs',
        columns: ['Customer · SO', 'Amount · Supplier'],
        rows: [
          { label: 'Meridian Packaging · SO-14811', value: '$48K · Allegheny Steel' },
          { label: 'Pacific NW Construction · SO-14832', value: '$42K · Allegheny Steel' },
          { label: 'Cascade Metals · SO-14821', value: '$22K · Allegheny Steel' },
          { label: 'Summit Industrial · SO-14841', value: '$18K · NextGen Chemical' },
          { label: 'Harbor Industrial · SO-14844', value: '$12K · NextGen Chemical' },
        ],
      },
    },
  ],

  /* -------------------------------- Pharmacy ------------------------------- */
  pharmacy: [
    {
      id: 'ph-pr-1',
      name: 'Daily Location Briefing — 5 Locations',
      description: 'Rx volume, turnaround, compounding QC, and revenue by location — with exception callouts.',
      category: 'Pharmacy',
      estimatedTime: '~3m',
      dateRange: '2026-04-23 (prior day)',
      generatedAt: 'Apr 24, 2026 · 05:42',
      duration: '2m 51s',
      cost: '$0.04',
      sources: ['PioneerRx', 'QuickBooks', 'DEA CSOS'],
      summary: [
        '268 scripts processed across 5 locations yesterday (+4% WoW). Westside remains the outlier at -18% vs prior week — Dr. Ramirez contribution fell to zero; outreach initiated.',
        'Compounding QC pass rate held 96.8%. One controlled-substance variance flagged at Westside (3-vial ketamine) — DEA 222 reported within the 24-hour window.',
      ],
      kpis: [
        { label: 'Scripts', value: '268', change: '+4% WoW', changeTone: 'good' },
        { label: 'Avg turnaround', value: '46.2 hr', change: '-1.8 hr', changeTone: 'good' },
        { label: 'QC pass', value: '96.8%', change: '+0.4pp', changeTone: 'good' },
        { label: 'CS variances', value: '1', change: 'reported', changeTone: 'neutral' },
      ],
      chart: {
        kind: 'stacked-bar',
        title: 'Rx volume by location — 268 total',
        segments: [
          { label: 'Downtown', value: 82, color: '#2563eb', display: '82' },
          { label: 'Lakeside', value: 58, color: '#059669', display: '58' },
          { label: 'Northgate', value: 52, color: '#d97706', display: '52' },
          { label: 'Eastport', value: 44, color: '#7c3aed', display: '44' },
          { label: 'Westside', value: 32, color: '#ef4444', display: '32' },
        ],
      },
      findings: [
        { impact: 'High', body: 'Westside volume down 18% WoW — Dr. Ramirez zero contribution for 8 consecutive days.' },
        { impact: 'Medium', body: 'Afternoon compounding team at Westside is 1 short all week; turnaround +4h there.' },
        { impact: 'Low', body: 'Downtown leading location performance; capacity headroom ~18%.' },
      ],
      recommendations: [
        'Execute Dr. Ramirez outreach sequence (drafted by Otto).',
        'Approve temporary shift-3 compounding reinforcement at Westside for this week.',
        'Run Prism · Location Health weekly until Westside recovers.',
      ],
      methodology:
        'PioneerRx dispensing data at 06:00 Apr 24, reconciled with QuickBooks receipts. QC pass computed from batch-level sign-offs; controlled-substance variance flagged per DEA 222 inventory rules. Role-tailored briefing personalized to recipient (PIC, regional director, leadership).',
      appendix: {
        title: 'Appendix A · Turnaround by location (48h goal)',
        columns: ['Location', 'Avg turnaround'],
        rows: [
          { label: 'Downtown', value: '44 h' },
          { label: 'Westside', value: '61 h (+4)' },
          { label: 'Northgate', value: '48 h' },
          { label: 'Lakeside', value: '42 h' },
          { label: 'Eastport', value: '46 h' },
        ],
      },
    },
    {
      id: 'ph-pr-2',
      name: 'Quarterly Compounding Margin Report',
      description: 'Ingredient cost bridge, recipe variance, and revenue mix across compounding operations.',
      category: 'Finance',
      estimatedTime: '~4m',
      dateRange: 'Jan 1 – Mar 31, 2026',
      generatedAt: 'Apr 23, 2026 · 04:58',
      duration: '3m 12s',
      cost: '$0.08',
      sources: ['PioneerRx', 'SAP Business One', 'QuickBooks'],
      summary: [
        'Compounding gross margin closed Q1 at 41.2%, down 180 bps vs Q4 standard. Ingredient variance drove two-thirds of the gap, concentrated in testosterone cypionate (global shortage pass-through) and hyaluronic acid.',
        'Revenue mix shifted favorably (+80 bps) toward premium veterinary compounds. Q2 net outlook: recovery of ~100 bps once new testosterone contract kicks in Apr 29.',
      ],
      kpis: [
        { label: 'Gross margin', value: '41.2%', change: '-1.8pp', changeTone: 'bad' },
        { label: 'Revenue', value: '$4.42M', change: '+2% QoQ', changeTone: 'good' },
        { label: 'Unfav variance', value: '$79K', change: '', changeTone: 'bad' },
        { label: 'Q2 recovery', value: '+100 bps', change: 'projected', changeTone: 'good' },
      ],
      chart: {
        kind: 'waterfall',
        title: 'Q1 margin bridge — Q4 std → Q1 actual (bps)',
        steps: [
          { label: 'Q4 margin', value: 4300, display: '43.00%', kind: 'start' },
          { label: 'Testosterone', value: -78, display: '-78 bp', kind: 'subtract' },
          { label: 'Hyaluronic', value: -42, display: '-42 bp', kind: 'subtract' },
          { label: 'Labor', value: -36, display: '-36 bp', kind: 'subtract' },
          { label: 'Mix (veterinary)', value: 80, display: '+80 bp', kind: 'add' },
          { label: 'Other', value: -104, display: '-104 bp', kind: 'subtract' },
          { label: 'Q1 actual', value: 4120, display: '41.20%', kind: 'end' },
        ],
      },
      findings: [
        { impact: 'High', body: 'Testosterone cost up 22% on global shortage; new vendor contract closes gap Apr 29.' },
        { impact: 'Medium', body: 'Veterinary compound mix shift is structural — lock into 2026 plan.' },
        { impact: 'Low', body: 'Labor variance is seasonal (flu season throughput); no long-term action needed.' },
      ],
      recommendations: [
        'Confirm testosterone contract activation and price-lock through Q3.',
        'Update standard costs in SAP B1 for 14 affected formulations on Apr 28.',
        'Re-forecast Q2 margin at 42.2% in the board package.',
      ],
      methodology:
        'PioneerRx dispensing × SAP B1 BOMs × QuickBooks GL reconciled. Ingredient variance decomposed per formulation with weighted contribution analysis. Labor variance net of overtime premium.',
      appendix: {
        title: 'Appendix B · Ingredient variance by formulation',
        columns: ['Formulation', 'Variance'],
        rows: [
          { label: 'Testosterone Cypionate 200mg/mL', value: '-$42K' },
          { label: 'Hyaluronic Acid Intra-articular', value: '-$24K' },
          { label: 'Progesterone 100mg troche', value: '-$8K' },
          { label: 'Feline methimazole gel', value: '-$3K' },
          { label: 'Compounded topical steroids', value: '-$2K' },
        ],
      },
    },
    {
      id: 'ph-pr-3',
      name: 'Prescriber Volume & Churn Analysis',
      description: 'Top-prescriber volume trends with churn risk scoring and outreach priority.',
      category: 'Sales & CRM',
      estimatedTime: '~3m',
      dateRange: 'Trailing 90 days',
      generatedAt: 'Apr 24, 2026 · 06:18',
      duration: '2m 42s',
      cost: '$0.05',
      sources: ['PioneerRx', 'Salesforce'],
      summary: [
        '4 top-25 prescribers have dropped >20% WoW over the last 60 days. Dr. Ramirez alone represents $112K of revenue decline. Three have no CRM activity in 60+ days — actionable gap.',
        'Prescriber retention model predicts Q2 revenue recovery of $45–60K if outreach is executed within 14 days on the top-4 list.',
      ],
      kpis: [
        { label: 'At-risk prescribers', value: '4 / 25', change: '', changeTone: 'bad' },
        { label: '90-day Rx loss', value: '$184K', change: 'annualized $736K', changeTone: 'bad' },
        { label: 'No CRM touch 60+d', value: '3', change: '', changeTone: 'bad' },
        { label: 'Recovery estimate', value: '$45–60K', change: 'Q2', changeTone: 'good' },
      ],
      chart: {
        kind: 'horizontal-bar',
        title: 'Top 4 at-risk prescribers · 90-day Rx volume decline',
        bars: [
          { label: 'Dr. Ramirez', value: 820, color: '#ef4444', display: '-820 Rx' },
          { label: 'Dr. Patel', value: 190, color: '#f59e0b', display: '-190 Rx' },
          { label: 'Dr. Osei', value: 140, color: '#f59e0b', display: '-140 Rx' },
          { label: 'Dr. Chen', value: 160, color: '#f59e0b', display: '-160 Rx' },
        ],
        max: 900,
      },
      findings: [
        { impact: 'High', body: 'Dr. Ramirez practice relocation drove the Rx gap; workflow re-establishment is the priority.' },
        { impact: 'Medium', body: '3 prescribers untouched in 60+ days; a regional call plan could recover $45K by Q2 end.' },
        { impact: 'Low', body: 'New-prescriber acquisition is running on pace; top-of-funnel is healthy.' },
      ],
      recommendations: [
        'Personal outreach from regional director to Dr. Ramirez this week.',
        'Regional call plan to the 3 untouched prescribers by Friday.',
        'Quarterly prescriber business review standing up in May.',
      ],
      methodology:
        'Trailing-90 Rx volumes by prescriber reconciled with CRM contact-log timestamps. Churn risk blends volume decline slope (55%), touch frequency (30%), and alternate-pharmacy signals from open-source Rx claims data (15%).',
      appendix: {
        title: 'Appendix C · Prescriber detail · top 4',
        columns: ['Prescriber', 'Last contact · Location'],
        rows: [
          { label: 'Dr. Ramirez', value: '89 d · Westside' },
          { label: 'Dr. Patel', value: '61 d · Northgate' },
          { label: 'Dr. Osei', value: '73 d · Lakeside' },
          { label: 'Dr. Chen', value: '42 d · Downtown' },
        ],
      },
    },
  ],

  /* ------------------------------ Distribution ----------------------------- */
  distribution: [
    {
      id: 'dist-pr-1',
      name: 'Weekly Pipeline Health',
      description: 'Territory pipeline, stalled deals, at-risk accounts, and margin-by-rep.',
      category: 'Sales & CRM',
      estimatedTime: '~3m',
      dateRange: 'Week of Apr 21, 2026',
      generatedAt: 'Apr 24, 2026 · 06:55',
      duration: '2m 38s',
      cost: '$0.05',
      sources: ['Salesforce', 'SAP Business One'],
      summary: [
        '$14.2M open pipeline across 47 reps. Velocity up 12% WoW; win-rate steady at 33%. 7 stalled deals (>14 days) in Negotiation — $2.1M at risk of slipping to Q3.',
        'Customer-concentration flag: top 10 accounts represent 38% of open pipeline. No single at-risk account larger than $340K.',
      ],
      kpis: [
        { label: 'Open pipeline', value: '$14.2M', change: '+6% WoW', changeTone: 'good' },
        { label: 'Weighted', value: '$5.8M', change: '+12%', changeTone: 'good' },
        { label: 'Win rate', value: '33%', change: 'stable', changeTone: 'good' },
        { label: 'Stalled deals', value: '7', change: '+2 WoW', changeTone: 'bad' },
      ],
      chart: {
        kind: 'horizontal-bar',
        title: 'Pipeline by stage · $14.2M',
        bars: [
          { label: 'Qualification', value: 2400, color: '#60a5fa', display: '$2.4M' },
          { label: 'Proposal', value: 4600, color: '#3b82f6', display: '$4.6M' },
          { label: 'Negotiation', value: 5200, color: '#1d4ed8', display: '$5.2M' },
          { label: 'Verbal Commit', value: 1400, color: '#065f46', display: '$1.4M' },
          { label: 'Legal Review', value: 600, color: '#10b981', display: '$0.6M' },
        ],
      },
      findings: [
        { impact: 'High', body: '7 Negotiation deals stalled >14 days — concentrated in 3 reps; coachable pattern.' },
        { impact: 'Medium', body: 'Territory NE lags pipeline addition by 18%; discovery pipeline thin.' },
        { impact: 'Low', body: 'Velocity gain is healthy — conversion from Proposal → Negotiation has sped up.' },
      ],
      recommendations: [
        'Stalled-deal blitz: 30-min partner review per deal by Wednesday.',
        'Lead-gen refresh for NE territory (list + outbound sequence) starting Monday.',
        'Continue coaching 3 reps on Negotiation-stage time compression.',
      ],
      methodology:
        'Pipeline snapshot from Salesforce at 06:00 Apr 24. Stage velocity measured as median days-per-stage on trailing-12-month closed opportunities. Win-rate attribution uses 90-day window. Risk score combines stage (40%), dwell time (30%), sponsor activity (20%), account aging (10%).',
      appendix: {
        title: 'Appendix A · Top 10 open opportunities',
        columns: ['Opportunity · Stage', 'Value · Close'],
        rows: [
          { label: 'Pacific NW Construction · Neg', value: '$340K · May 12' },
          { label: 'Horizon Industrial · Neg', value: '$280K · May 6' },
          { label: 'Cascade Metals · Neg', value: '$240K · Apr 30' },
          { label: 'Valley Steel · Prop', value: '$190K · Jun 3' },
          { label: 'Summit Fab · Prop', value: '$172K · Jun 10' },
          { label: 'Northgate · Neg', value: '$168K · May 18' },
          { label: 'Blue Ridge · Prop', value: '$146K · May 28' },
          { label: 'Coastal · Qual', value: '$132K · Jun 17' },
          { label: 'East Bay · Qual', value: '$128K · Jun 24' },
          { label: 'Pioneer · Prop', value: '$112K · May 22' },
        ],
      },
    },
    {
      id: 'dist-pr-2',
      name: 'Monthly AR Recovery & Aging Report',
      description: 'AR aging, collection risk scoring, and recovery-action recommendations.',
      category: 'Finance',
      estimatedTime: '~3m',
      dateRange: 'Mar 1 – Mar 31, 2026',
      generatedAt: 'Apr 23, 2026 · 05:22',
      duration: '2m 54s',
      cost: '$0.04',
      sources: ['QuickBooks', 'SAP Business One', 'Salesforce'],
      summary: [
        'Total AR $2.14M, up 9% MoM; DSO held at 37 days (vs 42 target — healthy). 82% of balance is under 30 days. The tail is the concern: $148K past 90 days is concentrated in 4 accounts.',
        'Cash conversion cycle improved 2.1 days. Zero material chargebacks or credit memos flagged this month.',
      ],
      kpis: [
        { label: 'Total AR', value: '$2.14M', change: '+9% MoM', changeTone: 'neutral' },
        { label: 'DSO', value: '37 d', change: '-2 d', changeTone: 'good' },
        { label: '90+ day', value: '$148K', change: '+$22K', changeTone: 'bad' },
        { label: 'Bad debt accrual', value: '$12K', change: 'steady', changeTone: 'good' },
      ],
      chart: {
        kind: 'stacked-bar',
        title: 'AR aging · $2.14M total',
        segments: [
          { label: '0-30 days', value: 1754, color: '#10b981', display: '$1.75M' },
          { label: '31-60 days', value: 186, color: '#f59e0b', display: '$186K' },
          { label: '61-90 days', value: 54, color: '#f97316', display: '$54K' },
          { label: '90+ days', value: 148, color: '#ef4444', display: '$148K' },
        ],
      },
      findings: [
        { impact: 'High', body: 'Meridian Builders holds $62K of the 90+ day balance — escalate this week.' },
        { impact: 'Medium', body: 'Cascade Metals cleared overnight ($48K wire) — AR recovery momentum.' },
        { impact: 'Low', body: 'DSO trend continues to compress; working-capital discipline intact.' },
      ],
      recommendations: [
        'Formal escalation to Meridian Builders this week (collections template drafted).',
        'Credit-hold review on two 60+ day accounts; consider progressive terms.',
        'Publish monthly AR snapshot to sales leadership as standing report.',
      ],
      methodology:
        'AR snapshot at 06:00 Apr 23 from QuickBooks GL, matched to SAP B1 order history. Aging buckets follow 30/60/90/120 convention. Risk scoring blends payment history (60%), industry benchmarks (25%), public financial signals (15%).',
      appendix: {
        title: 'Appendix B · 90+ day accounts',
        columns: ['Account', 'Balance · Days'],
        rows: [
          { label: 'Meridian Builders', value: '$62K · 98 d' },
          { label: 'Summit Fabrication', value: '$34K · 112 d' },
          { label: 'Coastal Tool Works', value: '$28K · 94 d' },
          { label: 'Pioneer Heavy Equipment', value: '$24K · 108 d' },
        ],
      },
    },
    {
      id: 'dist-pr-3',
      name: 'Warehouse Fill-Rate & Stock-out Analysis',
      description: 'DC-level fill rate, stock-out patterns, and inventory rebalancing recommendations.',
      category: 'Operations',
      estimatedTime: '~3m',
      dateRange: 'Last 30 days',
      generatedAt: 'Apr 24, 2026 · 04:48',
      duration: '2m 31s',
      cost: '$0.04',
      sources: ['SAP Business One', 'EDI'],
      summary: [
        'Network fill rate 96.2% (target 97%). Tacoma DC drags — 87% fill, driven by 18 SKUs perpetually short. Seattle DC leading at 98.4%; Portland steady at 96.8%.',
        'Inventory rebalancing from Seattle → Tacoma of the top-10 short SKUs would lift Tacoma to ~95% in 7 days with no Seattle service impact.',
      ],
      kpis: [
        { label: 'Network fill', value: '96.2%', change: '-0.8pp', changeTone: 'bad' },
        { label: 'Worst DC', value: 'Tacoma', change: '87%', changeTone: 'bad' },
        { label: 'Best DC', value: 'Seattle', change: '98.4%', changeTone: 'good' },
        { label: 'Short SKUs', value: '18', change: 'at Tacoma', changeTone: 'bad' },
      ],
      chart: {
        kind: 'grouped-bar',
        title: 'Fill-rate vs target by DC (%)',
        groups: ['Seattle', 'Portland', 'Tacoma', 'Spokane'],
        series: [
          { name: 'Fill rate', color: '#2563eb', values: [98.4, 96.8, 87.0, 94.2] },
          { name: 'Target', color: '#94a3b8', values: [97, 97, 97, 97] },
        ],
        unit: '%',
        max: 100,
      },
      findings: [
        { impact: 'High', body: 'Tacoma 18-SKU shortage is concentrated in 4 supplier lines; re-order cadence is the driver.' },
        { impact: 'Medium', body: 'Inter-DC transfer plan resolves 12 of 18 shortages without new procurement.' },
        { impact: 'Low', body: 'Seattle absorbing overflow from Tacoma customers — cost per unit up 6%.' },
      ],
      recommendations: [
        'Execute Seattle → Tacoma rebalance (top-10 SKUs) this weekend.',
        'Tighten reorder points for 4 flagged supplier lines at Tacoma.',
        'Re-quote expedited inbound lanes to Tacoma from two suppliers.',
      ],
      methodology:
        'Order fulfillment events from SAP B1 sales order records; SKU-level fill computed against committed ship dates. Inter-DC recommendation uses simple linear balancing with floor constraints per DC.',
      appendix: {
        title: 'Appendix C · Tacoma top-10 shortages',
        columns: ['SKU · Family', 'Units short'],
        rows: [
          { label: 'HB-M12-50 · Fasteners', value: '2,400' },
          { label: 'WS-M12-STD · Fasteners', value: '1,800' },
          { label: 'HYD-PUMP-204 · Hydraulic', value: '24' },
          { label: 'SAFETY-HARN-S · Safety', value: '120' },
          { label: 'CT-DRILL-48 · Cutting', value: '64' },
          { label: 'RAW-ROD-1" · Raw mat.', value: '280' },
          { label: 'HYD-VAL-210 · Hydraulic', value: '32' },
          { label: 'SAFETY-GLOVES-L · Safety', value: '480' },
          { label: 'CT-BLADE-HSS · Cutting', value: '140' },
          { label: 'RAW-BAR-2" · Raw mat.', value: '180' },
        ],
      },
    },
  ],

  /* ------------------------------- Nonprofit ------------------------------- */
  nonprofit: [
    {
      id: 'np-pr-1',
      name: 'Quarterly Board Packet Narrative — Q1 2026',
      description: 'Program outcomes, financial performance, donor trends, and grant compliance — board-ready.',
      category: 'Fundraising',
      estimatedTime: '~5m',
      dateRange: 'Jan 1 – Mar 31, 2026',
      generatedAt: 'Apr 23, 2026 · 03:42',
      duration: '4m 52s',
      cost: '$0.09',
      sources: ["Raiser's Edge", 'QuickBooks', 'Salesforce NPSP'],
      summary: [
        'Q1 total revenue $3.4M (+7% YoY) against $12M annual goal (pace 113% at quarter-mark). Program expenses ratio held at 82.4% (above peer median of 78%). 3 programs exceeded outcome targets; 1 is trending below and under active redesign.',
        'Donor retention is the yellow flag: 64% vs 71% prior year. Lapsed-donor cohort is largely 6–12 months — recoverable with a disciplined Q2 win-back campaign.',
      ],
      kpis: [
        { label: 'Q1 revenue', value: '$3.4M', change: '+7% YoY', changeTone: 'good' },
        { label: 'Pace to goal', value: '113%', change: '', changeTone: 'good' },
        { label: 'Donor retention', value: '64%', change: '-7pp', changeTone: 'bad' },
        { label: 'Program expense ratio', value: '82.4%', change: 'stable', changeTone: 'good' },
      ],
      chart: {
        kind: 'waterfall',
        title: 'Q1 revenue bridge ($K)',
        steps: [
          { label: 'Annual plan (Q1 share)', value: 3000, display: '$3.0M', kind: 'start' },
          { label: 'Major gifts', value: 220, display: '+$220K', kind: 'add' },
          { label: 'Grants', value: 80, display: '+$80K', kind: 'add' },
          { label: 'Monthly giving', value: 140, display: '+$140K', kind: 'add' },
          { label: 'Lapsed donors', value: -120, display: '-$120K', kind: 'subtract' },
          { label: 'Events', value: 80, display: '+$80K', kind: 'add' },
          { label: 'Actual', value: 3400, display: '$3.4M', kind: 'end' },
        ],
      },
      findings: [
        { impact: 'High', body: 'Major-gifts pipeline is outperforming plan; hold cadence and add 2 cultivation events in Q2.' },
        { impact: 'Medium', body: 'Lapsed-donor cohort ($120K Q1 drag) is 80% recoverable with targeted win-back.' },
        { impact: 'Medium', body: 'Program 4 (rural outreach) outcomes below target — redesign approved, launch in Q2.' },
      ],
      recommendations: [
        'Launch 6-week lapsed-donor win-back campaign starting May 6.',
        'Schedule 2 major-gifts cultivation dinners in Q2 (CEO + board chair).',
        'Present Q1 narrative to board with program 4 redesign roadmap.',
      ],
      methodology:
        "Raiser's Edge donor records joined with QuickBooks revenue categories and Salesforce NPSP campaign data. Cohort retention segmented by first-gift quarter. Program outcomes sourced from intake / service delivery data. Narrative drafted by Prism and reviewed against board tone-of-voice guidelines.",
      appendix: {
        title: 'Appendix A · Q1 gifts by tier',
        columns: ['Tier', 'Count · Total'],
        rows: [
          { label: '$100K+', value: '2 · $340K' },
          { label: '$25K–$100K', value: '8 · $420K' },
          { label: '$1K–$25K', value: '64 · $720K' },
          { label: '$100–$1K', value: '812 · $380K' },
          { label: '< $100', value: '6,240 · $180K' },
          { label: 'Grants', value: '6 · $1.36M' },
        ],
      },
    },
    {
      id: 'np-pr-2',
      name: 'Donor Retention Cohort Analysis',
      description: 'Retention rates by acquisition cohort with upgrade/downgrade patterns and win-back opportunity.',
      category: 'Sales & CRM',
      estimatedTime: '~3m',
      dateRange: 'Trailing 8 quarters',
      generatedAt: 'Apr 24, 2026 · 05:06',
      duration: '2m 48s',
      cost: '$0.05',
      sources: ["Raiser's Edge", 'Mailchimp'],
      summary: [
        'Retention is trending down for 3 consecutive quarters across all cohorts. Most notable: the Q3-2024 new-donor cohort is retaining at 58% — below the 72% benchmark at equivalent age.',
        'The Q4-2024 cohort, which received the new welcome-series sequence, is retaining 14 pts higher at the equivalent age. The welcome series works; expand it.',
      ],
      kpis: [
        { label: 'Overall retention', value: '64%', change: '-7pp', changeTone: 'bad' },
        { label: 'New-donor retention', value: '58%', change: '-14pp', changeTone: 'bad' },
        { label: 'Welcome series lift', value: '+14 pts', change: '', changeTone: 'good' },
        { label: 'Win-back potential', value: '$280K', change: '6-12mo cohort', changeTone: 'good' },
      ],
      chart: {
        kind: 'grouped-bar',
        title: 'Retention by acquisition cohort — age 12 months',
        groups: ['Q2-24', 'Q3-24', 'Q4-24', 'Q1-25'],
        series: [
          { name: 'Retention %', color: '#2563eb', values: [68, 58, 72, 74] },
          { name: 'Benchmark', color: '#94a3b8', values: [72, 72, 72, 72] },
        ],
        unit: '%',
        max: 100,
      },
      findings: [
        { impact: 'High', body: 'Welcome-series lift (+14pp) is the highest-ROI intervention we have; extend to all cohorts immediately.' },
        { impact: 'Medium', body: 'Q3-2024 cohort includes event-acquired donors (125 total) — event-acquired retention chronically low.' },
        { impact: 'Low', body: 'Monthly-giving cohorts retain at 94%; increase conversion push in year-one donors.' },
      ],
      recommendations: [
        'Extend welcome-series to all new donors acquired from Apr 29 forward.',
        'Pilot event-acquired donor re-engagement track (separate messaging).',
        'Increase monthly-giving prompt in year-one donor touch sequence.',
      ],
      methodology:
        "Donor records from Raiser's Edge cohorted by first-gift quarter. Retention measured as subsequent-gift within 12 months of prior gift. Welcome-series attribution uses holdout control group.",
      appendix: {
        title: 'Appendix B · Cohort economics',
        columns: ['Cohort', '1st gift · 12mo LTV'],
        rows: [
          { label: 'Q2-2024', value: '$112 · $284' },
          { label: 'Q3-2024', value: '$94 · $186' },
          { label: 'Q4-2024', value: '$108 · $342' },
          { label: 'Q1-2025', value: '$122 · $380' },
        ],
      },
    },
    {
      id: 'np-pr-3',
      name: 'Program Outcomes & Grant Compliance Summary',
      description: 'Program outcomes vs target with funder reporting status and grant deadline map.',
      category: 'Operations',
      estimatedTime: '~3m',
      dateRange: 'Q1 2026',
      generatedAt: 'Apr 23, 2026 · 05:18',
      duration: '2m 45s',
      cost: '$0.05',
      sources: ["Raiser's Edge", 'QuickBooks', 'Salesforce NPSP'],
      summary: [
        '4 active programs, 3 on or above outcome targets. Program 4 (Rural Outreach) is 34% below outcome target — redesign approved by board March 14, launching May.',
        'Grant compliance: 6 of 6 reports filed on time. 2 grants have mid-year milestones in the next 60 days; documentation already queued.',
      ],
      kpis: [
        { label: 'Programs on target', value: '3 / 4', change: '', changeTone: 'good' },
        { label: 'Grants compliant', value: '6 / 6', change: '100%', changeTone: 'good' },
        { label: 'People served', value: '4,820', change: '+6%', changeTone: 'good' },
        { label: 'Outcome score', value: '86', change: '+2', changeTone: 'good' },
      ],
      chart: {
        kind: 'horizontal-bar',
        title: 'Q1 outcome achievement by program (% of target)',
        bars: [
          { label: 'Program 1 · Youth', value: 118, color: '#065f46', display: '118%' },
          { label: 'Program 2 · Food', value: 104, color: '#10b981', display: '104%' },
          { label: 'Program 3 · Job Training', value: 96, color: '#34d399', display: '96%' },
          { label: 'Program 4 · Rural Outreach', value: 66, color: '#ef4444', display: '66%' },
        ],
        max: 140,
      },
      findings: [
        { impact: 'High', body: 'Program 4 shortfall is geographic — new partner network coming online in Q2.' },
        { impact: 'Medium', body: 'Youth program overperformance tied to new school partnerships; scale to 3 more districts.' },
        { impact: 'Low', body: 'Job Training program is on pace — no intervention needed.' },
      ],
      recommendations: [
        'Execute Program 4 redesign rollout May 6.',
        'Expand Youth program school partnerships to districts 5, 6, 7 in Q3.',
        'Prepare mid-year grant milestone packages for Hewlett and Gates by May 15.',
      ],
      methodology:
        'Outcome data sourced from service delivery logs; people-served deduplicated by encounter UUID. Grant compliance reconciled against Raiser\'s Edge grant module deadlines. Narrative drafted per funder tone guidelines.',
      appendix: {
        title: 'Appendix C · Upcoming grant milestones',
        columns: ['Funder · Grant', 'Deadline'],
        rows: [
          { label: 'Hewlett · $240K general ops', value: 'May 15' },
          { label: 'Gates · $180K youth', value: 'Jun 1' },
          { label: 'Ford · $120K workforce', value: 'Jul 14' },
          { label: 'Mallory · $80K rural', value: 'Sep 1' },
        ],
      },
    },
  ],

  /* ------------------------------- Healthcare ------------------------------ */
  healthcare: [
    {
      id: 'hc-pr-1',
      name: 'Monthly Revenue Cycle Report',
      description: 'Charges, collections, AR aging, and denial root-cause by location.',
      category: 'Revenue Cycle',
      estimatedTime: '~4m',
      dateRange: 'Mar 1 – Mar 31, 2026',
      generatedAt: 'Apr 23, 2026 · 05:42',
      duration: '3m 48s',
      cost: '$0.08',
      sources: ['Athenahealth', 'Epic', 'QuickBooks', 'Kareo'],
      summary: [
        'March charges $8.42M; net collections $7.18M (net collection rate 85.2%, down 1.8 pts). Scottsdale denial spike drove most of the gap — $218K in Aetna denials with 62% recoverable through appeals.',
        'Patient balances 120+ days grew to $142K (+$28K MoM). Patient-financing program uptake is 14% vs 22% plan — needs stronger payment-plan offer at point of service.',
      ],
      kpis: [
        { label: 'Charges', value: '$8.42M', change: '+3% MoM', changeTone: 'good' },
        { label: 'Net collections', value: '$7.18M', change: '-2% MoM', changeTone: 'bad' },
        { label: 'Denial rate', value: '7.4%', change: '+0.9pp', changeTone: 'bad' },
        { label: '120+ day pt bal', value: '$142K', change: '+$28K', changeTone: 'bad' },
      ],
      chart: {
        kind: 'stacked-bar',
        title: 'AR aging · $3.8M total',
        segments: [
          { label: '0-30 days', value: 2842, color: '#10b981', display: '$2.84M' },
          { label: '31-60 days', value: 520, color: '#f59e0b', display: '$520K' },
          { label: '61-90 days', value: 296, color: '#f97316', display: '$296K' },
          { label: '91-120 days', value: 142, color: '#ef4444', display: '$142K' },
        ],
      },
      findings: [
        { impact: 'High', body: 'Scottsdale Aetna denials CARC 97/204 — $218K; 62% recoverable through batch appeals.' },
        { impact: 'Medium', body: 'Patient-financing program uptake is the lowest it has been in 12 months.' },
        { impact: 'Low', body: 'Medicare collections remain steady; commercial is where the noise is.' },
      ],
      recommendations: [
        'Submit 34-claim Aetna appeal batch this week (pre-populated).',
        'Payment-plan offer script retraining at point of service, 8 locations.',
        'Escalate 120+ day balances to collections in tranches.',
      ],
      methodology:
        'Charge and collection data from Athenahealth; denial codes normalized to X12 CARC/RARC. Patient balance aging from Kareo; financing program data from vendor portal. Monthly close aligned to Mar 31 cut-off.',
      appendix: {
        title: 'Appendix A · Denials by CARC (top 5)',
        columns: ['CARC · Description', 'Amount · Claims'],
        rows: [
          { label: '97 · Bundled', value: '$124K · 96' },
          { label: '204 · Not covered', value: '$48K · 42' },
          { label: '16 · Claim info missing', value: '$28K · 24' },
          { label: 'PR-1 · Patient responsibility', value: '$18K · 38' },
          { label: '22 · Other insurance', value: '$12K · 22' },
        ],
      },
    },
    {
      id: 'hc-pr-2',
      name: 'Location Efficiency & Cost-per-Visit',
      description: 'Provider productivity, utilization, and cost-per-visit across the network.',
      category: 'Operations',
      estimatedTime: '~3m',
      dateRange: 'Mar 1 – Mar 31, 2026',
      generatedAt: 'Apr 24, 2026 · 06:28',
      duration: '2m 52s',
      cost: '$0.06',
      sources: ['Epic', 'Athenahealth', 'QuickBooks'],
      summary: [
        'Network cost-per-visit $142 (vs $132 target). Scottsdale leads at $168 (overflow + overtime); Phoenix is most efficient at $118 but runs under-capacity.',
        'Provider productivity (patients/hour) ranges 2.8 to 4.2 across 8 locations. Mesa and Chandler have headroom (capacity-utilization below 75%) — targets for marketing/acquisition investment.',
      ],
      kpis: [
        { label: 'Cost per visit', value: '$142', change: '+$6', changeTone: 'bad' },
        { label: 'Avg util.', value: '88%', change: 'on target', changeTone: 'good' },
        { label: 'Patients served', value: '24,820', change: '+4%', changeTone: 'good' },
        { label: 'Provider productivity', value: '3.6 /hr', change: 'stable', changeTone: 'good' },
      ],
      chart: {
        kind: 'grouped-bar',
        title: 'Cost per visit & utilization — March',
        groups: ['Scottsdale', 'Phoenix', 'Tempe', 'Mesa', 'Chandler'],
        series: [
          { name: '$ / visit', color: '#2563eb', values: [168, 118, 138, 132, 140] },
          { name: 'Utilization %', color: '#059669', values: [125, 62, 92, 72, 93] },
        ],
      },
      findings: [
        { impact: 'High', body: 'Scottsdale overtime runs 14% of provider hours — driving cost-per-visit premium.' },
        { impact: 'Medium', body: 'Mesa and Chandler under-utilized; 3 providers could absorb 18% more volume.' },
        { impact: 'Low', body: 'Phoenix efficiency reflects tight scheduling; watch for burnout signals.' },
      ],
      recommendations: [
        'Reassign 2 MAs from Phoenix to Scottsdale permanently (schedule rebalance).',
        'Marketing pilot at Mesa and Chandler (2-provider open slots) starting May.',
        'Monitor Phoenix staff satisfaction in Q2 engagement survey.',
      ],
      methodology:
        'Visit volume from Epic/Athena; cost allocation from QuickBooks GL by location cost center. Productivity measured as billed encounters per provider hour; utilization as booked/capacity ratio.',
      appendix: {
        title: 'Appendix B · Provider productivity',
        columns: ['Location', 'Patients/hour'],
        rows: [
          { label: 'Scottsdale', value: '4.2' },
          { label: 'Phoenix', value: '3.1' },
          { label: 'Tempe', value: '3.8' },
          { label: 'Mesa', value: '2.8' },
          { label: 'Chandler', value: '3.6' },
          { label: 'Gilbert', value: '3.9' },
          { label: 'Glendale', value: '3.2' },
          { label: 'Peoria', value: '3.6' },
        ],
      },
    },
    {
      id: 'hc-pr-3',
      name: 'Payer Denial Deep-Dive',
      description: 'Denial patterns by payer and CARC with root-cause and appeal-win-rate analysis.',
      category: 'Revenue Cycle',
      estimatedTime: '~3m',
      dateRange: 'Trailing 90 days',
      generatedAt: 'Apr 24, 2026 · 04:58',
      duration: '2m 44s',
      cost: '$0.05',
      sources: ['Athenahealth', 'Kareo', 'Epic'],
      summary: [
        'Aetna denial rate 8.7% — highest across top-6 payers. CARC 97 (bundled service) is the top driver and has a 72% appeal-win rate — meaning the money is recoverable if we appeal.',
        'BCBS and Medicare are below denial-rate benchmark. United and Cigna are mid-pack; no material pattern shift.',
      ],
      kpis: [
        { label: 'Aetna denial rate', value: '8.7%', change: '+1.9pp', changeTone: 'bad' },
        { label: 'Network denial rate', value: '6.4%', change: '', changeTone: 'neutral' },
        { label: 'CARC 97 win rate', value: '72%', change: '', changeTone: 'good' },
        { label: 'Recoverable', value: '$156K', change: 'Aetna 90d', changeTone: 'good' },
      ],
      chart: {
        kind: 'horizontal-bar',
        title: 'Denial rate by payer (trailing 90 days)',
        bars: [
          { label: 'Aetna', value: 8.7, color: '#ef4444', display: '8.7%' },
          { label: 'Cigna', value: 7.2, color: '#f59e0b', display: '7.2%' },
          { label: 'United', value: 6.8, color: '#f59e0b', display: '6.8%' },
          { label: 'Humana', value: 6.1, color: '#34d399', display: '6.1%' },
          { label: 'BCBS', value: 5.2, color: '#10b981', display: '5.2%' },
          { label: 'Medicare', value: 4.1, color: '#10b981', display: '4.1%' },
        ],
        max: 10,
      },
      findings: [
        { impact: 'High', body: 'Aetna CARC 97 pattern traces to missing modifier 25 on same-day E/M + procedure claims.' },
        { impact: 'Medium', body: 'Cigna CARC 16 (missing info) tied to prior-auth doc routing — fix in the intake step.' },
        { impact: 'Low', body: 'Medicare performance exemplary; use as benchmark for process review.' },
      ],
      recommendations: [
        'Coding macro update for modifier 25 (Aetna-specific rule in place).',
        'Intake checklist: attach prior-auth PDF to every Cigna claim.',
        'Quarterly payer-rules review with CBO team starting Q2.',
      ],
      methodology:
        'Denial data pulled from Athena/Kareo 835 remittance feeds; CARC/RARC codes mapped to standard taxonomy. Win-rate computed on appeals resolved in trailing-90. Root-cause clustering via text analysis on denial reason text.',
      appendix: {
        title: 'Appendix C · Top-10 denial reasons',
        columns: ['CARC · Description', 'Volume · $'],
        rows: [
          { label: '97 · Bundled service', value: '412 · $214K' },
          { label: '204 · Not covered', value: '184 · $102K' },
          { label: '16 · Claim info missing', value: '142 · $78K' },
          { label: 'PR-1 · Patient responsibility', value: '124 · $44K' },
          { label: '22 · Other insurance', value: '88 · $38K' },
          { label: '197 · Precert', value: '64 · $28K' },
          { label: '18 · Duplicate', value: '48 · $18K' },
          { label: '109 · Not submitted to correct payer', value: '42 · $14K' },
          { label: '50 · Not medically necessary', value: '38 · $24K' },
          { label: '11 · Dx inconsistent with procedure', value: '32 · $12K' },
        ],
      },
    },
  ],

  /* -------------------------- Property Management -------------------------- */
  propertyManagement: [
    {
      id: 'pm-pr-1',
      name: 'Monthly Ownership Package — March 2026',
      description: 'Occupancy, rent roll, NOI vs plan, delinquency aging, and capex tracker for all properties.',
      category: 'Finance',
      estimatedTime: '~5m',
      dateRange: 'Mar 1 – Mar 31, 2026',
      generatedAt: 'Apr 23, 2026 · 04:18',
      duration: '4m 36s',
      cost: '$0.09',
      sources: ['Yardi', 'AppFolio', 'QuickBooks'],
      summary: [
        'Portfolio NOI $4.92M — 94.2% of plan. Four properties underperformed underwriting (Riverside, Fairview, Lakeside, Parkside). Riverside is the biggest drag ($162K NOI gap) — traced to elevator capex.',
        'Portfolio occupancy 94.8% — on plan. Fairview Tower has a 14-unit vacancy block currently being leased up; expected closure end of Q2.',
      ],
      kpis: [
        { label: 'Portfolio NOI', value: '$4.92M', change: '-5.8% vs plan', changeTone: 'bad' },
        { label: 'Occupancy', value: '94.8%', change: 'on plan', changeTone: 'good' },
        { label: 'Delinquency', value: '$182K', change: '+$18K', changeTone: 'bad' },
        { label: 'Capex YTD', value: '$1.4M', change: '+24% vs plan', changeTone: 'bad' },
      ],
      chart: {
        kind: 'waterfall',
        title: 'Portfolio NOI bridge vs plan ($K)',
        steps: [
          { label: 'Plan NOI', value: 5220, display: '$5.22M', kind: 'start' },
          { label: 'Riverside (capex)', value: -162, display: '-$162K', kind: 'subtract' },
          { label: 'Fairview (vacancy)', value: -92, display: '-$92K', kind: 'subtract' },
          { label: 'Lakeside (concessions)', value: -58, display: '-$58K', kind: 'subtract' },
          { label: 'Parkside (opex)', value: -36, display: '-$36K', kind: 'subtract' },
          { label: 'Overperformers', value: 140, display: '+$140K', kind: 'add' },
          { label: 'Actual NOI', value: 4920, display: '$4.92M', kind: 'end' },
        ],
      },
      findings: [
        { impact: 'High', body: 'Riverside elevator issue is isolated to 2 buildings; full modernization at $180K has a 3-year ROI.' },
        { impact: 'Medium', body: 'Fairview vacancy block is structural (corporate-tenant move); lease-up plan in motion.' },
        { impact: 'Low', body: '10 of 14 properties are on or above plan — portfolio discipline is intact.' },
      ],
      recommendations: [
        'Approve Riverside-B elevator modernization capex.',
        'Expedite Fairview Tower lease-up with $5K/mo leasing bonus for next 60 days.',
        'Revise FY2026 capex reserve upward by $180K for elevator program.',
      ],
      methodology:
        'Rent roll from Yardi; delinquency from AppFolio; capex from QuickBooks. NOI bridge decomposes GAAP NOI vs underwriting plan; overperformers aggregated into single line.',
      appendix: {
        title: 'Appendix A · Property-level NOI',
        columns: ['Property', 'Plan · Actual · Δ'],
        rows: [
          { label: 'Riverside', value: '$2.14M · $1.98M · -$162K' },
          { label: 'Fairview Tower', value: '$1.86M · $1.77M · -$92K' },
          { label: 'Lakeside', value: '$1.42M · $1.36M · -$58K' },
          { label: 'Parkside', value: '$1.18M · $1.14M · -$36K' },
          { label: 'Cedar Park', value: '$0.92M · $0.99M · +$74K' },
          { label: '9 other props.', value: 'aggregate · +$66K' },
        ],
      },
    },
    {
      id: 'pm-pr-2',
      name: 'Portfolio Occupancy & Renewals Report',
      description: 'Occupancy trends, renewal velocity, and lease-expiration risk across 14 properties.',
      category: 'Operations',
      estimatedTime: '~3m',
      dateRange: 'Current + 90-day forward',
      generatedAt: 'Apr 24, 2026 · 06:05',
      duration: '2m 42s',
      cost: '$0.04',
      sources: ['Yardi', 'AppFolio', 'RealPage'],
      summary: [
        '68 leases expire in the next 90 days; 47 have no renewal activity. Historical lapse rate at this point is 34% — projected loss 16 units if nothing changes.',
        'Market rent is +4.2% above in-place across the 68 expiring leases — renewal upside modeled at $18K/month annualized if we close the gap.',
      ],
      kpis: [
        { label: 'Occupancy', value: '94.8%', change: '-0.2pp', changeTone: 'neutral' },
        { label: 'Expiring 90d', value: '68', change: '47 idle', changeTone: 'bad' },
        { label: 'Market rent uplift', value: '+4.2%', change: 'vs in-place', changeTone: 'good' },
        { label: 'Renewal upside', value: '$216K/yr', change: 'if captured', changeTone: 'good' },
      ],
      chart: {
        kind: 'grouped-bar',
        title: 'Occupancy & renewal pipeline by property',
        groups: ['Riverside', 'Fairview', 'Lakeside', 'Cedar Park', 'Parkside'],
        series: [
          { name: 'Occupancy %', color: '#2563eb', values: [96, 87, 94, 98, 95] },
          { name: 'Renewal pace %', color: '#059669', values: [42, 28, 58, 72, 48] },
        ],
        unit: '%',
        max: 100,
      },
      findings: [
        { impact: 'High', body: 'Fairview renewal pace is half of portfolio avg — leasing team bandwidth is the constraint.' },
        { impact: 'Medium', body: '16 high-value units (>$2,200 rent) at renewal risk; targeted outreach recovers ~12 of 16.' },
        { impact: 'Low', body: 'Cedar Park renewal pace suggests resident satisfaction is a replicable model.' },
      ],
      recommendations: [
        'Temporary leasing headcount at Fairview for 60 days.',
        'Priority outreach sequence for 16 high-value expiring units this week.',
        'Tenant-satisfaction review at Cedar Park to identify replicable practices.',
      ],
      methodology:
        'Lease data from Yardi; renewal pace as % of expiring leases with active renewal conversation 60+ days out. Market rent sourced from RealPage comp analysis. Upside modeled as (market − in-place) × 12 × capture rate.',
      appendix: {
        title: 'Appendix B · High-value expiring units',
        columns: ['Property · Unit', 'Rent · Expires'],
        rows: [
          { label: 'Fairview · 1408', value: '$2,420 · Jul 4' },
          { label: 'Lakeside · 7B', value: '$2,260 · Jul 12' },
          { label: 'Riverside-A · 304', value: '$2,140 · Jun 30' },
          { label: 'Cedar Park · 210', value: '$2,180 · Jun 18' },
          { label: 'Parkside · 412', value: '$2,080 · Jul 18' },
        ],
      },
    },
    {
      id: 'pm-pr-3',
      name: 'Capex Variance & Maintenance Cost Analysis',
      description: 'Capex plan-to-actual with unit-level maintenance cost anomalies and root-cause flags.',
      category: 'Operations',
      estimatedTime: '~3m',
      dateRange: 'YTD (Jan 1 – Apr 23, 2026)',
      generatedAt: 'Apr 24, 2026 · 05:34',
      duration: '2m 38s',
      cost: '$0.05',
      sources: ['Yardi', 'QuickBooks', 'AppFolio'],
      summary: [
        'YTD capex $1.4M (24% above plan). Riverside-B and Riverside-D elevator programs account for $280K of the variance — unplanned but justified by safety/compliance.',
        'Maintenance cost per unit rose to $194 portfolio-wide (+$16 vs plan). Riverside runs 2.2x portfolio average, concentrated in the same 2 buildings.',
      ],
      kpis: [
        { label: 'Capex YTD', value: '$1.4M', change: '+24% vs plan', changeTone: 'bad' },
        { label: 'Maint $/unit', value: '$194', change: '+$16', changeTone: 'bad' },
        { label: 'WO throughput', value: '4.8 d', change: '-0.4 d', changeTone: 'good' },
        { label: 'Emergency WO', value: '14', change: '+4', changeTone: 'bad' },
      ],
      chart: {
        kind: 'horizontal-bar',
        title: 'Maintenance cost per unit by property ($ avg)',
        bars: [
          { label: 'Riverside', value: 412, color: '#ef4444', display: '$412' },
          { label: 'Fairview', value: 228, color: '#f59e0b', display: '$228' },
          { label: 'Parkside', value: 198, color: '#34d399', display: '$198' },
          { label: 'Lakeside', value: 188, color: '#34d399', display: '$188' },
          { label: 'Cedar Park', value: 172, color: '#10b981', display: '$172' },
          { label: '9 others avg', value: 184, color: '#10b981', display: '$184' },
        ],
        max: 450,
      },
      findings: [
        { impact: 'High', body: 'Riverside-B and Riverside-D elevator age (both 1988) drives 72% of the anomaly.' },
        { impact: 'Medium', body: 'Fairview boiler replacement ($80K) already planned; stays on schedule for June.' },
        { impact: 'Low', body: 'Emergency WO increase is weather-related (hard freeze, plumbing); will normalize.' },
      ],
      recommendations: [
        'Approve Riverside-B modernization (+$180K capex).',
        'Add Riverside-D to 2026 H2 capex plan (similar modernization).',
        'Negotiate volume pricing with vendor on both elevator programs.',
      ],
      methodology:
        'Work order data from Yardi; cost allocation from QuickBooks GL by property and GL account. Variance computed against underwriting capex plan + operating maintenance budget.',
      appendix: {
        title: 'Appendix C · Capex YTD by property',
        columns: ['Property', 'Plan · Actual'],
        rows: [
          { label: 'Riverside', value: '$180K · $420K' },
          { label: 'Fairview', value: '$120K · $108K' },
          { label: 'Lakeside', value: '$90K · $98K' },
          { label: 'Cedar Park', value: '$60K · $54K' },
          { label: '10 others', value: '$680K · $720K' },
        ],
      },
    },
  ],

  /* ------------------------ Professional Services ------------------------ */
  professionalServices: [
    {
      id: 'ps-pr-1',
      name: 'Weekly Partner Briefing',
      description: 'Utilization, engagement margin, WIP aging, and pipeline for every practice.',
      category: 'Finance',
      estimatedTime: '~4m',
      dateRange: 'Week of Apr 21, 2026',
      generatedAt: 'Apr 24, 2026 · 06:40',
      duration: '3m 24s',
      cost: '$0.07',
      sources: ['Mavenlink', 'Harvest', 'NetSuite', 'Salesforce'],
      summary: [
        'Firm-wide utilization 71.4% (−1.8 pts vs target). Strategy and Technology practices at or above plan; Financial Advisory trailing at 66%.',
        '6 engagements at risk of budget overrun ($342K projected). Hartford M&A is the single biggest exposure — early-warning already issued this week.',
      ],
      kpis: [
        { label: 'Utilization', value: '71.4%', change: '-1.8pp', changeTone: 'bad' },
        { label: 'Engagement margin', value: '38.2%', change: '+0.6pp', changeTone: 'good' },
        { label: 'At-risk $', value: '$342K', change: '', changeTone: 'bad' },
        { label: 'WIP 90+ day', value: '$186K', change: '+$22K', changeTone: 'bad' },
      ],
      chart: {
        kind: 'grouped-bar',
        title: 'Utilization & margin by practice',
        groups: ['Strategy', 'Financial Advisory', 'Technology', 'M&A', 'Tax'],
        series: [
          { name: 'Utilization %', color: '#2563eb', values: [76, 66, 74, 70, 71] },
          { name: 'Margin %', color: '#059669', values: [42, 34, 40, 38, 36] },
        ],
        unit: '%',
        max: 100,
      },
      findings: [
        { impact: 'High', body: 'Financial Advisory utilization shortfall = $340K annualized revenue impact if not corrected.' },
        { impact: 'Medium', body: '6 engagements concentrate in 3 PMs — coaching opportunity on scope management.' },
        { impact: 'Low', body: 'Engagement margin is holding despite utilization pressure — pricing discipline is good.' },
      ],
      recommendations: [
        'Reassign 2 FA partners to open Parker Industrial ERP engagement (immediate utilization fix).',
        'Scope-management workshop for 3 at-risk-engagement PMs in May.',
        'Lock pricing discipline into 2026 SOW templates firm-wide.',
      ],
      methodology:
        'Time from Harvest; engagement margin from Mavenlink project financials and NetSuite GL; pipeline from Salesforce opportunity stages. Utilization = billable hours / available hours.',
      appendix: {
        title: 'Appendix A · Engagement risk summary',
        columns: ['Engagement · Client', 'Budget · Overrun'],
        rows: [
          { label: 'Hartford M&A · Hartford Mfg', value: '$380K · +$96K' },
          { label: 'Process Redesign · Summit Health', value: '$520K · +$78K' },
          { label: 'ERP Impl · Parker Industrial', value: '$840K · +$64K' },
          { label: 'Strategic Plan · Riverside Capital', value: '$240K · +$42K' },
          { label: 'Supply Chain · Cascade Goods', value: '$310K · +$38K' },
          { label: 'Tax Advisory · Northgate LLC', value: '$180K · +$24K' },
        ],
      },
    },
    {
      id: 'ps-pr-2',
      name: 'Engagement Profitability Deep-Dive',
      description: 'Margin waterfall for top-20 engagements with scope, labor-mix, and realization drivers.',
      category: 'Finance',
      estimatedTime: '~4m',
      dateRange: 'Q1 2026',
      generatedAt: 'Apr 23, 2026 · 04:44',
      duration: '3m 58s',
      cost: '$0.08',
      sources: ['Mavenlink', 'Harvest', 'NetSuite'],
      summary: [
        'Top-20 engagements generated $8.4M revenue at 38.6% margin — within target corridor. 4 engagements pulled below 30%; 2 generated write-downs.',
        'Realization improved 80 bps on the back of new SOW templates (invoice-timing language helped); labor-mix drag at −140 bps as senior capacity pulled into Hartford.',
      ],
      kpis: [
        { label: 'Top-20 margin', value: '38.6%', change: '+0.6pp', changeTone: 'good' },
        { label: 'Realization', value: '94.8%', change: '+0.8pp', changeTone: 'good' },
        { label: 'Write-downs', value: '$42K', change: '+$12K', changeTone: 'bad' },
        { label: 'Senior hours', value: '32%', change: '-3pp', changeTone: 'bad' },
      ],
      chart: {
        kind: 'waterfall',
        title: 'Engagement margin bridge (bps)',
        steps: [
          { label: 'Plan margin', value: 3920, display: '39.20%', kind: 'start' },
          { label: 'Realization', value: 80, display: '+80 bp', kind: 'add' },
          { label: 'Labor mix', value: -140, display: '-140 bp', kind: 'subtract' },
          { label: 'Scope creep', value: -40, display: '-40 bp', kind: 'subtract' },
          { label: 'Expense pass-thru', value: 20, display: '+20 bp', kind: 'add' },
          { label: 'Write-downs', value: -80, display: '-80 bp', kind: 'subtract' },
          { label: 'Actual', value: 3860, display: '38.60%', kind: 'end' },
        ],
      },
      findings: [
        { impact: 'High', body: 'Hartford M&A pulled 3 senior-level consultants, creating labor-mix drag across 7 other engagements.' },
        { impact: 'Medium', body: 'Scope creep predominantly on 2 engagements (Riverside, Summit) — both lacked SOW change-control gates.' },
        { impact: 'Low', body: 'Realization is improving post-SOW template rollout; keep the discipline.' },
      ],
      recommendations: [
        'Rebalance senior-level capacity across portfolio in May; close Hartford scope decision this week.',
        'Require SOW change-control gate on all engagements > $250K.',
        'Publish top-5 realization wins as a Friday partner note.',
      ],
      methodology:
        'Project financials from Mavenlink; time posted in Harvest; GL reconciliation in NetSuite. Margin bridge decomposes bps vs plan using standard labor rates; write-downs pulled from invoice-adjustment records.',
      appendix: {
        title: 'Appendix B · Sub-30% margin engagements',
        columns: ['Engagement', 'Margin · Driver'],
        rows: [
          { label: 'Hartford M&A', value: '22% · Senior-labor drag' },
          { label: 'Riverside Strategic', value: '24% · Scope creep' },
          { label: 'Summit Process', value: '28% · Scope + staffing' },
          { label: 'Coastal Tax Dispute', value: '26% · Fixed-fee underestimate' },
        ],
      },
    },
    {
      id: 'ps-pr-3',
      name: 'Pipeline-to-Capacity Forecast',
      description: '90-day capacity forecast against weighted pipeline with staffing gap map.',
      category: 'Sales & CRM',
      estimatedTime: '~3m',
      dateRange: 'Next 90 days',
      generatedAt: 'Apr 24, 2026 · 05:28',
      duration: '2m 58s',
      cost: '$0.05',
      sources: ['Salesforce', 'Mavenlink'],
      summary: [
        'Weighted pipeline for next 90 days: $6.8M. Available capacity: $5.9M. Gap: $900K of demand that either needs hiring or sub-contracted delivery.',
        'Most acute gap is in Technology practice (40% over capacity starting June). Strategy is ~balanced; Tax under-utilized.',
      ],
      kpis: [
        { label: 'Weighted pipeline', value: '$6.8M', change: '', changeTone: 'neutral' },
        { label: 'Capacity', value: '$5.9M', change: 'constrained', changeTone: 'bad' },
        { label: 'Gap', value: '$900K', change: 'to fill', changeTone: 'bad' },
        { label: 'Bench hours', value: '800', change: 'Tax/FA', changeTone: 'neutral' },
      ],
      chart: {
        kind: 'stacked-bar',
        title: 'Pipeline × capacity — next 90 days ($K)',
        segments: [
          { label: 'Technology', value: 2400, color: '#ef4444', display: '$2.4M · +40%' },
          { label: 'Strategy', value: 1800, color: '#10b981', display: '$1.8M · on' },
          { label: 'M&A', value: 1200, color: '#f59e0b', display: '$1.2M · +10%' },
          { label: 'Financial Advisory', value: 800, color: '#10b981', display: '$0.8M · under' },
          { label: 'Tax', value: 600, color: '#34d399', display: '$0.6M · under' },
        ],
      },
      findings: [
        { impact: 'High', body: 'Technology capacity gap (+40%) starts June — need 3 new senior hires or a bench-boost from FA.' },
        { impact: 'Medium', body: 'FA utilization gap offsets part of the Technology pressure — cross-training or flex coverage possible.' },
        { impact: 'Low', body: 'Tax practice has room for 1–2 more mid-sized engagements before hitting capacity.' },
      ],
      recommendations: [
        'Approve Technology senior-hire slate (3 roles) for May start.',
        'Formalize FA → Technology flex coverage for Q2.',
        'Tax practice BD push in next 30 days.',
      ],
      methodology:
        'Pipeline weighted by stage-specific probabilities. Capacity projected from calendared availability (Harvest) × billable target. Cross-practice elasticity modeled at 30% for flex coverage.',
      appendix: {
        title: 'Appendix C · Pipeline by stage',
        columns: ['Stage', 'Unweighted · Weighted'],
        rows: [
          { label: 'Qualification', value: '$3.4M · $0.9M' },
          { label: 'Proposal', value: '$4.8M · $2.2M' },
          { label: 'Negotiation', value: '$4.2M · $2.7M' },
          { label: 'Verbal', value: '$1.4M · $1.0M' },
        ],
      },
    },
  ],

  /* -------------------------- Financial Services -------------------------- */
  financialServices: [
    {
      id: 'fs-pr-1',
      name: 'Advisor Book-of-Business Health — Q1 2026',
      description: 'Per-advisor AUM, client engagement, at-risk clients, and review completion.',
      category: 'Advisory',
      estimatedTime: '~4m',
      dateRange: 'Q1 2026',
      generatedAt: 'Apr 23, 2026 · 04:32',
      duration: '3m 46s',
      cost: '$0.08',
      sources: ['Redtail', 'Orion', 'Salesforce', 'Custodian Feed'],
      summary: [
        'Firm AUM $2.12B (+4.2% Q1). Client review completion 84% — trailing 2026 goal of 95%. 7 advisors at or above 95%; 3 below 70%.',
        'Client engagement score held at 82 (out of 100). 14 clients flagged as at-risk (portfolio drift + low engagement); concentrated in 4 advisor books.',
      ],
      kpis: [
        { label: 'AUM', value: '$2.12B', change: '+4.2%', changeTone: 'good' },
        { label: 'Review completion', value: '84%', change: '-11pp vs goal', changeTone: 'bad' },
        { label: 'At-risk clients', value: '14', change: '', changeTone: 'bad' },
        { label: 'Net new assets', value: '$58M', change: '+12% QoQ', changeTone: 'good' },
      ],
      chart: {
        kind: 'grouped-bar',
        title: 'Review completion & NPS by advisor (top 8)',
        groups: ['Chen', 'Patel', 'Kim', 'Hoffman', 'Lin'],
        series: [
          { name: 'Review %', color: '#2563eb', values: [96, 92, 88, 68, 62] },
          { name: 'NPS', color: '#059669', values: [74, 68, 72, 48, 42] },
        ],
      },
      findings: [
        { impact: 'High', body: '3 advisors below 70% review completion; AUM concentrated in their books = $340M at risk.' },
        { impact: 'Medium', body: '14 at-risk clients trace to portfolio-drift breaches + >9-month no-contact combinations.' },
        { impact: 'Low', body: 'Net new assets momentum is healthy — advisor-recruited referrals up 18% YoY.' },
      ],
      recommendations: [
        'Review-completion intervention for 3 advisors (scheduling assistant + pipeline review).',
        'Immediate outreach on 14 at-risk clients with pre-populated agendas.',
        'Double down on the referral program — strong Q1 signal.',
      ],
      methodology:
        'AUM from Orion portfolio data; engagement score blends contact frequency (40%), meeting completion (30%), portal activity (20%), tenure (10%). At-risk detection: threshold breach + 9-month no-contact.',
      appendix: {
        title: 'Appendix A · At-risk clients (top 8)',
        columns: ['Client', 'Advisor · AUM'],
        rows: [
          { label: 'K. Morales', value: 'D. Chen · $6.2M' },
          { label: 'B. Henderson', value: 'D. Chen · $8.4M' },
          { label: 'R. Martinez Trust', value: 'J. Kim · $12.1M' },
          { label: 'T. Alvarez', value: 'S. Patel · $4.8M' },
          { label: 'Park Family', value: 'S. Patel · $7.6M' },
          { label: 'C. Nguyen', value: 'J. Kim · $2.4M' },
          { label: 'M. Okafor', value: 'D. Hoffman · $3.2M' },
          { label: 'N. Delgado', value: 'D. Hoffman · $4.1M' },
        ],
      },
    },
    {
      id: 'fs-pr-2',
      name: 'Fee Reconciliation & Variance Report',
      description: 'Foundry-billed vs custodian-reported fees with exception list and adjustment plan.',
      category: 'Finance',
      estimatedTime: '~3m',
      dateRange: 'Q1 2026',
      generatedAt: 'Apr 24, 2026 · 05:02',
      duration: '2m 56s',
      cost: '$0.05',
      sources: ['Orion', 'Custodian Feed', 'QuickBooks'],
      summary: [
        'Q1 custodian fees $1.84M. Foundry-billed fees $1.86M. Net variance +$21K (1.1%) — within acceptable operational noise, but 3 accounts require billing adjustments totaling $4.2K.',
        '11 accounts show timing variance (billing quarter boundary); all resolved in Q2 without adjustment.',
      ],
      kpis: [
        { label: 'Custodian', value: '$1.842M', change: '', changeTone: 'neutral' },
        { label: 'Foundry', value: '$1.863M', change: '+$21K', changeTone: 'bad' },
        { label: 'Adjustments', value: '3', change: '$4.2K', changeTone: 'bad' },
        { label: 'Timing-only', value: '11', change: 'no action', changeTone: 'good' },
      ],
      chart: {
        kind: 'waterfall',
        title: 'Q1 fee reconciliation ($K)',
        steps: [
          { label: 'Custodian total', value: 1842, display: '$1.842M', kind: 'start' },
          { label: 'Classification errors', value: 4, display: '+$4K', kind: 'add' },
          { label: 'Fee-schedule override', value: 14, display: '+$14K', kind: 'add' },
          { label: 'Timing (Q1/Q2)', value: 18, display: '+$18K', kind: 'add' },
          { label: 'Other', value: -15, display: '-$15K', kind: 'subtract' },
          { label: 'Foundry total', value: 1863, display: '$1.863M', kind: 'end' },
        ],
      },
      findings: [
        { impact: 'High', body: 'ACC-3102 override expired unnoticed (14K variance); process for override calendar review needed.' },
        { impact: 'Medium', body: 'Timing variance (11 accounts) is billing-cycle design; no operational impact.' },
        { impact: 'Low', body: 'Classification errors resolved with a single Orion asset-class update.' },
      ],
      recommendations: [
        'Generate $4.2K refund entries for 3 flagged accounts.',
        'Build override-expiry calendar review into quarterly ops cadence.',
        'Confirm updated billing schedules against May 1 client-statement run.',
      ],
      methodology:
        'Custodian 15/16 statement data reconciled line-by-line with Orion fee billing records. Variance categorized by root cause (classification, override, timing, other). QuickBooks GL tie-out validates gross amounts.',
      appendix: {
        title: 'Appendix B · Accounts requiring adjustment',
        columns: ['Account · Advisor', 'Variance · Cause'],
        rows: [
          { label: 'ACC-2410 · D. Chen', value: '+$1.16K · Asset class' },
          { label: 'ACC-2876 · S. Patel', value: '+$0.6K · Inception date' },
          { label: 'ACC-3102 · J. Kim', value: '+$2.44K · Override expired' },
        ],
      },
    },
    {
      id: 'fs-pr-3',
      name: 'Compliance Audit Trail Summary',
      description: 'Q1 compliance coverage across reviews, communications, and suitability decisions.',
      category: 'Compliance',
      estimatedTime: '~3m',
      dateRange: 'Q1 2026',
      generatedAt: 'Apr 24, 2026 · 03:14',
      duration: '2m 38s',
      cost: '$0.05',
      sources: ['Redtail', 'Orion', 'Salesforce'],
      summary: [
        'Q1 compliance coverage 100% on required documentation. 1,248 client reviews logged; 642 suitability decisions documented. 0 unresolved audit findings from the February mock-exam.',
        'Advisor outreach compliance (disclosures, client communications) averaged 3.2 business days from trigger to logged record — within SLA.',
      ],
      kpis: [
        { label: 'Audit coverage', value: '100%', change: '', changeTone: 'good' },
        { label: 'Review docs', value: '1,248', change: '+12%', changeTone: 'good' },
        { label: 'Suitability flags', value: '14', change: 'all resolved', changeTone: 'good' },
        { label: 'Doc SLA', value: '3.2 d', change: 'within 5d', changeTone: 'good' },
      ],
      chart: {
        kind: 'horizontal-bar',
        title: 'Compliance volume by category',
        bars: [
          { label: 'Annual reviews', value: 462, color: '#2563eb', display: '462' },
          { label: 'Suitability decisions', value: 642, color: '#059669', display: '642' },
          { label: 'Disclosures', value: 284, color: '#d97706', display: '284' },
          { label: 'Complaints', value: 8, color: '#ef4444', display: '8' },
          { label: 'Form ADV Amendments', value: 3, color: '#7c3aed', display: '3' },
        ],
        max: 700,
      },
      findings: [
        { impact: 'Low', body: '100% coverage is the correct steady-state; no gaps detected.' },
        { impact: 'Low', body: 'Complaint volume (8) is below 12-month average; none escalated to regulator.' },
        { impact: 'Low', body: 'Doc SLA of 3.2 days is tighter than the 5-day SLA by 1.8 days — good buffer for April mock-exam.' },
      ],
      recommendations: [
        'Maintain current cadence; no process changes needed.',
        'Pre-position Form ADV annual amendment for May 1 filing.',
        'Schedule Q2 mock-exam for the week of May 19.',
      ],
      methodology:
        'All client interactions, reviews, and suitability decisions pulled from Redtail activity log + Orion portfolio events + Salesforce cases. Coverage = documented events / required events per SEC/FINRA rule set.',
      appendix: {
        title: 'Appendix C · Complaint log',
        columns: ['Complaint · Advisor', 'Status'],
        rows: [
          { label: 'Performance concern · J. Kim', value: 'Resolved 2026-02-12' },
          { label: 'Fee clarity · D. Chen', value: 'Resolved 2026-02-24' },
          { label: 'Communication · S. Patel', value: 'Resolved 2026-03-08' },
          { label: '5 others', value: 'Resolved within SLA' },
        ],
      },
    },
  ],

  /* --------------------------- Food & Beverage ----------------------------- */
  foodBeverage: [
    {
      id: 'fb-pr-1',
      name: 'Weekly Production Yield Report',
      description: 'Batch yield by facility and SKU with waste analysis and recipe-variance flags.',
      category: 'Production',
      estimatedTime: '~3m',
      dateRange: 'Week of Apr 21, 2026',
      generatedAt: 'Apr 24, 2026 · 05:25',
      duration: '2m 46s',
      cost: '$0.05',
      sources: ['SAP Business One', 'NetSuite', 'QuickBooks'],
      summary: [
        'Weekly yield averaged 94.1% across 3 facilities (target 95%). Portland is the lowest at 92.8% — traced to shift-3 roast-profile drift.',
        'Weekly waste $18K (planned $14K). Coffee-blend line drove 68% of waste — concentrated in Heritage Dark and Morning Reserve.',
      ],
      kpis: [
        { label: 'Yield', value: '94.1%', change: '-0.9pp', changeTone: 'bad' },
        { label: 'Waste $', value: '$18K', change: '+$4K', changeTone: 'bad' },
        { label: 'Throughput', value: '842K units', change: '+2%', changeTone: 'good' },
        { label: 'QC pass', value: '98.2%', change: '+0.2pp', changeTone: 'good' },
      ],
      chart: {
        kind: 'grouped-bar',
        title: 'Yield & waste by facility',
        groups: ['Portland', 'Tacoma', 'Seattle'],
        series: [
          { name: 'Yield %', color: '#059669', values: [92.8, 94.8, 94.6] },
          { name: 'Waste index', color: '#ef4444', values: [108, 92, 96] },
        ],
      },
      findings: [
        { impact: 'High', body: 'Portland shift-3 roast profile drifted 8°F above spec — recipe-overroast pattern.' },
        { impact: 'Medium', body: 'Heritage Dark blend waste ran 2.8% vs 1.5% target; ingredient variance contributing.' },
        { impact: 'Low', body: 'Tacoma and Seattle performing in band; no action needed.' },
      ],
      recommendations: [
        'Re-calibrate Portland shift-3 roaster thermocouples (suspected drift).',
        'Review Heritage Dark recipe step-by-step with QA team.',
        'Maintain Tacoma/Seattle cadence.',
      ],
      methodology:
        'Production run data from SAP B1 batch records; yield = good units / (good units + waste). QC pass from batch-level sign-offs. Waste classified by root cause (over-roast, foreign matter, packaging, other).',
      appendix: {
        title: 'Appendix A · SKU-level yield (top 10)',
        columns: ['SKU', 'Yield %'],
        rows: [
          { label: 'Heritage Dark 12oz', value: '91.2%' },
          { label: 'Morning Reserve 12oz', value: '92.6%' },
          { label: 'Single Origin Ethiopia', value: '93.8%' },
          { label: 'Decaf House 12oz', value: '95.4%' },
          { label: 'Cold Brew Concentrate', value: '95.1%' },
          { label: 'Holiday Limited', value: '94.8%' },
          { label: 'Espresso Blend', value: '94.2%' },
          { label: 'Ground Morning', value: '93.6%' },
          { label: 'Seasonal Autumn', value: '95.0%' },
          { label: 'Single Origin Kenya', value: '94.4%' },
        ],
      },
    },
    {
      id: 'fb-pr-2',
      name: 'Monthly Gross Margin & Recipe Variance',
      description: 'Gross-margin bridge with ingredient variance, yield impact, and mix analysis.',
      category: 'Finance',
      estimatedTime: '~4m',
      dateRange: 'Mar 1 – Mar 31, 2026',
      generatedAt: 'Apr 23, 2026 · 05:12',
      duration: '3m 22s',
      cost: '$0.07',
      sources: ['SAP Business One', 'NetSuite', 'QuickBooks'],
      summary: [
        'Gross margin 38.2% (down 340 bps vs standard). Ingredient variance drove 74% — arabica up 14% from new contract; hedging did not cover March.',
        'Yield and price held near plan. Mix contributed +30 bps as Single Origin Ethiopia grew share.',
      ],
      kpis: [
        { label: 'Gross margin', value: '38.2%', change: '-3.4pp', changeTone: 'bad' },
        { label: 'Revenue', value: '$4.74M', change: '+5% MoM', changeTone: 'good' },
        { label: 'Ingredient var.', value: '-$184K', change: '', changeTone: 'bad' },
        { label: 'Q2 recovery', value: '+180 bps', change: 'projected', changeTone: 'good' },
      ],
      chart: {
        kind: 'waterfall',
        title: 'Gross margin bridge — Std → Actual (bps)',
        steps: [
          { label: 'Std margin', value: 4160, display: '41.60%', kind: 'start' },
          { label: 'Arabica +14%', value: -234, display: '-234 bp', kind: 'subtract' },
          { label: 'Cocoa', value: -56, display: '-56 bp', kind: 'subtract' },
          { label: 'Dairy', value: -44, display: '-44 bp', kind: 'subtract' },
          { label: 'Yield', value: -18, display: '-18 bp', kind: 'subtract' },
          { label: 'Mix', value: 30, display: '+30 bp', kind: 'add' },
          { label: 'Other', value: -18, display: '-18 bp', kind: 'subtract' },
          { label: 'Actual', value: 3820, display: '38.20%', kind: 'end' },
        ],
      },
      findings: [
        { impact: 'High', body: 'Arabica variance closes Apr 14 with new contract; expect Q2 margin recovery.' },
        { impact: 'Medium', body: 'Cocoa and dairy drag is structural; re-price mid-year.' },
        { impact: 'Low', body: 'Mix shift toward Single Origin is favorable — push it forward.' },
      ],
      recommendations: [
        'Update recipe BOMs Apr 29 to reflect arabica contract; re-issue standard costs.',
        'Price review of cocoa-heavy and dairy-heavy SKUs by May 15.',
        'Increase Single Origin visibility in Q2 promotional plan.',
      ],
      methodology:
        'Recipe variance computed at BOM-line level against SAP B1 standard cost; dollar impact weighted by March volume. Margin bridge decomposes by cause (ingredient, yield, price, mix, other).',
      appendix: {
        title: 'Appendix B · Ingredient variance',
        columns: ['Ingredient', 'Variance'],
        rows: [
          { label: 'Arabica green beans', value: '-$112K' },
          { label: 'Cocoa powder', value: '-$28K' },
          { label: 'Whole milk powder', value: '-$22K' },
          { label: 'Granulated sugar', value: '-$12K' },
          { label: 'Other', value: '-$10K' },
        ],
      },
    },
    {
      id: 'fb-pr-3',
      name: 'Distributor Velocity & Out-of-Stock Analysis',
      description: 'Sell-through velocity by distributor, SKU-level stock-outs, and replenishment plan.',
      category: 'Sales & CRM',
      estimatedTime: '~3m',
      dateRange: 'Last 4 weeks',
      generatedAt: 'Apr 24, 2026 · 04:34',
      duration: '2m 42s',
      cost: '$0.05',
      sources: ['NetSuite', 'Shopify', 'Salesforce'],
      summary: [
        'Distributor velocity up 6% (4-week rolling). 23 SKUs below safety stock at top-5 distributors; Restaurant Depot is the highest concentration (11 SKUs).',
        'Spring-blend promotional performance trailing plan: 38% below target velocity. Social + email are lagging behind direct-to-distributor education support.',
      ],
      kpis: [
        { label: 'Velocity', value: '+6%', change: '4-wk rolling', changeTone: 'good' },
        { label: 'Stock-out SKUs', value: '23', change: 'at top-5 distr.', changeTone: 'bad' },
        { label: 'Promo pace', value: '62%', change: 'vs plan', changeTone: 'bad' },
        { label: 'Replen $', value: '$82K', change: 'queued', changeTone: 'neutral' },
      ],
      chart: {
        kind: 'horizontal-bar',
        title: 'Short-SKU count by distributor',
        bars: [
          { label: 'Restaurant Depot', value: 11, color: '#ef4444', display: '11' },
          { label: 'US Foods Midwest', value: 5, color: '#f59e0b', display: '5' },
          { label: 'Gordon Northern', value: 3, color: '#f59e0b', display: '3' },
          { label: 'Sysco Coastal', value: 2, color: '#34d399', display: '2' },
          { label: 'PFG Interstate', value: 2, color: '#34d399', display: '2' },
        ],
        max: 15,
      },
      findings: [
        { impact: 'High', body: 'Restaurant Depot alone is 48% of stock-out SKUs; their DC shipment cadence mismatched our lead time.' },
        { impact: 'Medium', body: 'Spring-blend promo pace reflects social-campaign slip; commercial-ops fix in progress.' },
        { impact: 'Low', body: 'Top-10 SKUs across all distributors are on plan; stock-outs concentrated in long-tail.' },
      ],
      recommendations: [
        'Submit 5 replenishment POs today (drafts ready).',
        'Pilot 4-week replenishment cadence for Restaurant Depot starting May.',
        'Shift $8K from social to in-distributor shelf-talker for Spring blend.',
      ],
      methodology:
        'Distributor sell-through from NetSuite ship-to data; safety-stock thresholds set per SKU-distributor pair. Promo pace tracked against target velocity curves.',
      appendix: {
        title: 'Appendix C · Top short SKUs',
        columns: ['SKU · Distributor', 'Days to stock-out'],
        rows: [
          { label: 'Heritage Dark 12oz · Restaurant Depot', value: '3.2 d' },
          { label: 'Morning Reserve 12oz · US Foods', value: '4.8 d' },
          { label: 'Decaf House 12oz · Restaurant Depot', value: '5.2 d' },
          { label: 'Cold Brew Concentrate · Gordon N.', value: '6.1 d' },
          { label: 'Espresso Blend · Restaurant Depot', value: '5.8 d' },
        ],
      },
    },
  ],

  /* ----------------------------- Construction ----------------------------- */
  construction: [
    {
      id: 'c-pr-1',
      name: 'Weekly Job Cost Report',
      description: 'Earned-value variance, change-order backlog, and project P&L trajectory.',
      category: 'Project Controls',
      estimatedTime: '~4m',
      dateRange: 'Week of Apr 21, 2026',
      generatedAt: 'Apr 24, 2026 · 05:58',
      duration: '3m 38s',
      cost: '$0.07',
      sources: ['Procore', 'Sage 300', 'QuickBooks'],
      summary: [
        'Portfolio earned-value variance −$820K (CPI 0.94). 5 of 40 active projects at risk of budget overrun; Parker Medical Tower (+$620K projected) is the largest.',
        'Change-order pipeline $682K pending owner signature across 11 COs. $420K is recoverable from cost overruns.',
      ],
      kpis: [
        { label: 'EVA', value: '-$820K', change: '', changeTone: 'bad' },
        { label: 'CPI', value: '0.94', change: '-0.03', changeTone: 'bad' },
        { label: 'Pending COs', value: '$682K', change: '11 pending', changeTone: 'neutral' },
        { label: 'Recoverable', value: '$420K', change: 'via CO', changeTone: 'good' },
      ],
      chart: {
        kind: 'stacked-bar',
        title: 'Projected overrun by driver ($K)',
        segments: [
          { label: 'Steel escalation', value: 320, color: '#ef4444', display: '$320K' },
          { label: 'Scope add', value: 240, color: '#f59e0b', display: '$240K' },
          { label: 'Productivity', value: 180, color: '#d97706', display: '$180K' },
          { label: 'Design delay', value: 140, color: '#f97316', display: '$140K' },
          { label: 'Other', value: 80, color: '#fbbf24', display: '$80K' },
        ],
      },
      findings: [
        { impact: 'High', body: 'Parker Medical $240K CO for steel escalation fully documented — owner counsel review is the bottleneck.' },
        { impact: 'Medium', body: 'Cedar Park productivity gap traces to one subcontractor running 14 days behind schedule.' },
        { impact: 'Low', body: 'Horizon Industrial design-delay CO is routine; expect sign-off within 10 days.' },
      ],
      recommendations: [
        'PM-level escalation on Parker Medical CO this week.',
        'Subcontractor performance review at Cedar Park (replace vs re-plan).',
        'Pre-file Horizon CO via owner portal to reduce turnaround.',
      ],
      methodology:
        'Earned-value computed from Procore production reports × Sage 300 cost actuals. CPI = BCWP / ACWP. CO pipeline tracked in Procore with Sage 300 revenue assumptions.',
      appendix: {
        title: 'Appendix A · At-risk projects',
        columns: ['Project', 'Budget · Projected overrun'],
        rows: [
          { label: 'Parker Medical Tower', value: '$18.4M · +$620K' },
          { label: 'Riverwalk Hotel', value: '$24.2M · +$340K' },
          { label: 'Cedar Park Civic', value: '$8.6M · +$120K' },
          { label: 'Horizon Industrial', value: '$12.1M · +$60K' },
          { label: 'Summit Tech Campus', value: '$32.0M · +$40K' },
        ],
      },
    },
    {
      id: 'c-pr-2',
      name: 'Subcontractor Performance & Lien Waiver Status',
      description: 'Subcontractor scorecards with lien waiver compliance and schedule adherence.',
      category: 'Operations',
      estimatedTime: '~3m',
      dateRange: 'Current + 30-day look-back',
      generatedAt: 'Apr 24, 2026 · 04:12',
      duration: '2m 54s',
      cost: '$0.05',
      sources: ['Procore', 'Sage 300', 'Autodesk'],
      summary: [
        '42 active subs. Schedule-adherence avg 92% (target 95%). 7 subs missing conditional lien waivers for the April draw; $218K at risk of hold-back.',
        'Top performers Parker Mechanical (98% adherence, 0 waiver issues) and Alpine Electrical (97%, 0). Bottom performer Cedar Structural has 14-day schedule slip.',
      ],
      kpis: [
        { label: 'Schedule adh.', value: '92%', change: '-1pp', changeTone: 'bad' },
        { label: 'Waiver gaps', value: '7', change: '$218K', changeTone: 'bad' },
        { label: 'Draw throughput', value: '8 d', change: 'stable', changeTone: 'good' },
        { label: 'Disputes', value: '2', change: 'active', changeTone: 'bad' },
      ],
      chart: {
        kind: 'grouped-bar',
        title: 'Top 8 subs — schedule adherence & waiver',
        groups: ['Parker', 'Alpine', 'Ridge', 'Summit', 'Cedar'],
        series: [
          { name: 'Schedule %', color: '#2563eb', values: [98, 97, 92, 88, 76] },
          { name: 'Waiver %', color: '#059669', values: [100, 100, 88, 82, 64] },
        ],
        unit: '%',
        max: 100,
      },
      findings: [
        { impact: 'High', body: 'Cedar Structural 14-day slip and 64% waiver compliance — escalate to replacement decision.' },
        { impact: 'Medium', body: '7 subs with conditional waivers missing can be resolved with reminder batch; no dispute.' },
        { impact: 'Low', body: 'Top-2 subs exemplary; expand scope on future projects.' },
      ],
      recommendations: [
        'Issue reminder batch to 7 subs with missing waivers today.',
        'Replacement scope review for Cedar Structural this week.',
        'Lock Parker Mechanical + Alpine into strategic-partner agreements.',
      ],
      methodology:
        'Sub performance from Procore field reports; waiver tracking from Sage 300 draw packages. Schedule adherence = days completed on schedule / total scheduled days in window.',
      appendix: {
        title: 'Appendix B · Missing waivers by draw',
        columns: ['Sub · Project', 'Draw · $'],
        rows: [
          { label: 'Cedar Structural · Parker Medical', value: 'Apr · $88K' },
          { label: 'Ridge Insulation · Cedar Park', value: 'Apr · $42K' },
          { label: 'Valley Glass · Riverwalk', value: 'Apr · $38K' },
          { label: '4 others', value: 'Apr · $50K' },
        ],
      },
    },
    {
      id: 'c-pr-3',
      name: 'Bid Pipeline & Win-Rate Analysis',
      description: 'Open bid pipeline with win-rate trend, margin, and competitive intel.',
      category: 'Sales & CRM',
      estimatedTime: '~3m',
      dateRange: 'Trailing 180 days',
      generatedAt: 'Apr 24, 2026 · 03:48',
      duration: '2m 52s',
      cost: '$0.05',
      sources: ['Salesforce', 'Procore'],
      summary: [
        'Open bids 22 projects / $186M. Win rate 28% trailing — on target. Avg bid margin 8.4% (slightly above target 8.0%). 4 bids in final negotiation stage totaling $58M.',
        'Geographic concentration: 64% of open pipeline is in the Pacific NW region. Margin tightens on East Coast projects where our cost structure is less competitive.',
      ],
      kpis: [
        { label: 'Open bids', value: '$186M', change: '+8%', changeTone: 'good' },
        { label: 'Win rate', value: '28%', change: 'on target', changeTone: 'good' },
        { label: 'Avg margin', value: '8.4%', change: '+0.4pp', changeTone: 'good' },
        { label: 'Final neg', value: '$58M', change: '4 projects', changeTone: 'good' },
      ],
      chart: {
        kind: 'horizontal-bar',
        title: 'Open bids by stage ($M)',
        bars: [
          { label: 'Prequalification', value: 42, color: '#60a5fa', display: '$42M' },
          { label: 'Bid in progress', value: 62, color: '#3b82f6', display: '$62M' },
          { label: 'Submitted', value: 24, color: '#1d4ed8', display: '$24M' },
          { label: 'Shortlisted', value: 18, color: '#065f46', display: '$18M' },
          { label: 'Final negotiation', value: 58, color: '#10b981', display: '$58M' },
        ],
      },
      findings: [
        { impact: 'High', body: '4 final-negotiation projects ($58M) would keep the backlog full through Q3 if 3 close.' },
        { impact: 'Medium', body: 'East Coast pipeline is margin-thin; consider selective bidding posture.' },
        { impact: 'Low', body: 'Prequalification pipeline is refilling well after Q1 slowdown.' },
      ],
      recommendations: [
        'Owner-executive engagement on 4 final-negotiation bids this month.',
        'Selective bid posture East Coast: raise minimum bid-margin floor to 7.5%.',
        'Continue investment in prequalification top-of-funnel.',
      ],
      methodology:
        'Bid data from Salesforce opportunity pipeline; Procore project templates provide cost baselines. Win rate uses trailing-180-day closed bids. Margin validated against Sage 300 historical project P&L.',
      appendix: {
        title: 'Appendix C · Final-negotiation bids',
        columns: ['Project · Region', 'Value · Probability'],
        rows: [
          { label: 'Horizon Airport · Pacific NW', value: '$22M · 65%' },
          { label: 'Riverside Tower · Pacific NW', value: '$18M · 55%' },
          { label: 'Cedar Park School · Pacific NW', value: '$12M · 50%' },
          { label: 'Summit Medical · East', value: '$6M · 40%' },
        ],
      },
    },
  ],
};

/**
 * Legacy flat export — first industry's reports so un-migrated consumers render something.
 */
export const prismReports: PrismReport[] = prismReportsByIndustry.manufacturing;

import type { IndustryId } from '@/context/IndustryContext';
import type { TargetSystem } from '@/data/foundryActions';

export type KpiMetric = {
  label: string;
  value: string;
  change?: string;
  changeTone?: 'good' | 'bad' | 'neutral';
};

export type LineChartSeries = {
  name: string;
  color: string;
  values: number[];
};

export type LineChartSpec = {
  title: string;
  series: LineChartSeries[];
  xLabels: string[];
  highlightIndex?: number;
  highlightLabel?: string;
  goalValue?: number;
};

export type DonutSpec = {
  title: string;
  slices: { label: string; value: number; color: string }[];
};

export type TableSpec = {
  title?: string;
  headers: string[];
  rows: string[][];
};

export type RecordCardSpec = {
  system: TargetSystem;
  recordType: string;
  recordId: string;
  title: string;
  status?: string;
  fields: { label: string; value: string }[];
};

export type ActionSuggestionSpec = {
  title: string;
  buttons: { label: string; primary?: boolean }[];
};

export type OttoBlock =
  | { kind: 'kpis'; metrics: KpiMetric[] }
  | { kind: 'line-chart'; spec: LineChartSpec }
  | { kind: 'donut'; spec: DonutSpec }
  | { kind: 'table'; spec: TableSpec }
  | { kind: 'record'; spec: RecordCardSpec }
  | { kind: 'bullets'; title?: string; items: string[] }
  | { kind: 'text'; paragraphs: string[] }
  | { kind: 'action'; spec: ActionSuggestionSpec };

export type OttoConversation = {
  id: string;
  sidebarTitle: string;
  persona: string;
  userMessage: string;
  assistantText: string;
  assistantBlocks: OttoBlock[];
};

/* =========================================================================
 *  PER-INDUSTRY OTTO CONVERSATIONS
 * =========================================================================
 *  3 conversations per industry × 10 industries = 30 total.
 *  Persona blend per industry: 1 COO voice, 1 CFO voice, 1 Ops/Functional.
 */

export const ottoConversationsByIndustry: Record<IndustryId, OttoConversation[]> = {
  /* ------------------------------ Manufacturing ------------------------------ */
  manufacturing: [
    {
      id: 'mfg-oc-1',
      sidebarTitle: 'Why did OEE drop on Line 2 this week?',
      persona: 'COO · Plant Operations',
      userMessage: 'Why did OEE drop at Bethlehem Line 2 this week?',
      assistantText:
        'Line 2 OEE fell from 84% to 71% (−13 pts) week-over-week. Three correlated signals explain it:',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'OEE (wk)', value: '71%', change: '-13 pts', changeTone: 'bad' },
            { label: 'Availability', value: '82%', change: '-6 pts', changeTone: 'bad' },
            { label: 'Performance', value: '89%', change: '-4 pts', changeTone: 'bad' },
            { label: 'Quality', value: '97.2%', change: '-3 pts', changeTone: 'bad' },
          ],
        },
        {
          kind: 'line-chart',
          spec: {
            title: 'Line 2 · OEE by shift, last 14 days (%)',
            xLabels: ['D-14', 'D-10', 'D-7', 'D-4', 'Today'],
            series: [
              {
                name: 'Line 2',
                color: '#2563eb',
                values: [84, 85, 83, 86, 82, 84, 81, 78, 74, 71, 72, 69, 70, 71],
              },
            ],
            highlightIndex: 9,
            highlightLabel: 'changeover event',
            goalValue: 80,
          },
        },
        {
          kind: 'bullets',
          title: 'Root causes',
          items: [
            'Changeover on 2026-04-18 ran 47 min over spec — die alignment re-worked twice.',
            'Shift 3 scrap rate tripled (1.9% → 5.8%) starting 02:00 Tuesday.',
            'Upstream temp sensor T-204 has drifted 4°C since last PM cycle.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Next steps',
            buttons: [
              { label: 'Schedule predictive maintenance window', primary: true },
              { label: 'Open RCA ticket for QC team' },
            ],
          },
        },
      ],
    },
    {
      id: 'mfg-oc-2',
      sidebarTitle: 'Reconcile March production margin by SKU family',
      persona: 'CFO · Finance',
      userMessage:
        'Reconcile March production margin against standard cost — break out scrap impact by SKU family.',
      assistantText:
        'March actual margin landed at 31.4% vs 34.1% standard. Scrap and ingredient variance account for 89% of the gap.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'Actual Margin', value: '31.4%', change: '-2.7 pts', changeTone: 'bad' },
            { label: 'Revenue', value: '$4.12M', change: '+3% MoM', changeTone: 'good' },
            { label: 'Scrap $', value: '$128K', change: '+$41K', changeTone: 'bad' },
            { label: 'Material Var.', value: '$72K', change: '+$28K', changeTone: 'bad' },
          ],
        },
        {
          kind: 'table',
          spec: {
            headers: ['SKU family', 'Revenue', 'Std margin', 'Actual', 'Gap', 'Driver'],
            rows: [
              ['Industrial Fasteners', '$1.42M', '34.2%', '32.8%', '-1.4 pts', 'Steel cost +6%'],
              ['Hydraulic Components', '$0.94M', '36.1%', '29.4%', '-6.7 pts', 'Line 2 scrap'],
              ['Safety Equipment', '$0.78M', '32.8%', '32.1%', '-0.7 pts', 'On plan'],
              ['Cutting Tools', '$0.62M', '33.0%', '31.9%', '-1.1 pts', 'Tool-life var.'],
              ['Raw Materials', '$0.36M', '29.5%', '30.2%', '+0.7 pts', 'Mix shift'],
            ],
          },
        },
        {
          kind: 'bullets',
          title: 'Board-ready narrative',
          items: [
            'Hydraulic Components carried two-thirds of the margin gap — isolated to Line 2 scrap spike.',
            'Steel cost pass-through captured 4 of 6 points on Industrial Fasteners.',
            'No recurring variance — Q2 recovery expected once Line 2 returns to baseline.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Go deeper',
            buttons: [
              { label: 'Generate Q1 margin bridge report', primary: true },
              { label: 'Forecast April recovery' },
            ],
          },
        },
      ],
    },
    {
      id: 'mfg-oc-3',
      sidebarTitle: 'Create SO for the Cascade Metals PO',
      persona: 'Operations · Sales Support',
      userMessage: 'Create a sales order for the Cascade Metals PO sitting in my inbox.',
      assistantText:
        'Found the PO (PO-CAS-8901, attached to your 08:14 email). Credit line and inventory look clean — ready to convert.',
      assistantBlocks: [
        {
          kind: 'record',
          spec: {
            system: 'Salesforce',
            recordType: 'Account',
            recordId: 'ACC-00412',
            title: 'Cascade Metals',
            status: 'Active · Credit Cleared',
            fields: [
              { label: 'Annual Revenue', value: '$1.8M' },
              { label: 'Credit Limit', value: '$180K (used $42K)' },
              { label: 'AR Aging', value: 'All current' },
              { label: 'Rep', value: 'Marcus Torres' },
            ],
          },
        },
        {
          kind: 'table',
          spec: {
            title: 'PO-CAS-8901 · 5,000 hex bolts + 200 washers',
            headers: ['Line', 'SKU', 'Qty', 'Price', 'Line total'],
            rows: [
              ['1', 'HB-M12-50', '5,000', '$0.38', '$1,900'],
              ['2', 'WS-M12-STD', '200', '$0.12', '$24'],
              ['', '', '', 'Total', '$1,924'],
            ],
          },
        },
        {
          kind: 'bullets',
          title: 'Confirm before I create',
          items: [
            'Ship-date: 2026-04-29 (next available pick slot on Line 1).',
            'Ship-to: Cascade Metals — Portland OR (existing address).',
            'SO will create in SAP Business One and notify Marcus via Salesforce.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Execute',
            buttons: [
              { label: 'Create SO-14822 in SAP B1', primary: true },
              { label: 'Revise ship date first' },
            ],
          },
        },
      ],
    },
  ],

  /* --------------------------------- Pharmacy -------------------------------- */
  pharmacy: [
    {
      id: 'ph-oc-1',
      sidebarTitle: 'Controlled substance variance across locations',
      persona: 'Compliance Officer',
      userMessage:
        'Show controlled substance variance across all locations, last 30 days — flag anything outside the DEA 24-hour window.',
      assistantText:
        '3 variances detected in 30 days. 1 is outside the 24-hour reporting window and requires immediate DEA 222 amendment.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'Variances', value: '3', change: '+1 MoM', changeTone: 'bad' },
            { label: 'Open DEA windows', value: '1', change: '', changeTone: 'bad' },
            { label: 'Coverage', value: '100%', change: 'goal met', changeTone: 'good' },
            { label: 'Locations audited', value: '5 / 5', change: '', changeTone: 'good' },
          ],
        },
        {
          kind: 'table',
          spec: {
            headers: ['Location', 'Drug', 'Qty', 'Detected', 'Window', 'Status'],
            rows: [
              ['Westside', 'Ketamine 10mg/mL', '3 vials', '2026-04-22 02:14', 'Within 24h', 'Reported'],
              ['Downtown', 'Fentanyl patch', '1 unit', '2026-04-14 19:02', 'Within 24h', 'Resolved'],
              ['Northgate', 'Oxycodone 5mg', '12 tablets', '2026-04-06 08:55', '+72h PAST', 'Amendment due'],
            ],
          },
        },
        {
          kind: 'bullets',
          title: 'Recommended',
          items: [
            'Submit DEA 222 amendment for Northgate variance today.',
            'Root cause at Northgate: manual count reconciliation at shift-change — Foundry automated nightly recon since 2026-04-10.',
            'Audit trail intact; all 3 events have corroborating intake + dispensing signatures.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Act',
            buttons: [
              { label: 'Draft DEA 222 amendment', primary: true },
              { label: 'Run compliance scorecard' },
            ],
          },
        },
      ],
    },
    {
      id: 'ph-oc-2',
      sidebarTitle: 'Top-10 prescribers driving Q1 volume drop',
      persona: 'CFO · Finance',
      userMessage:
        'Which top-10 prescribers drove the Q1 volume drop?',
      assistantText:
        'Q1 volume is down 9% ($240K) vs Q4. 68% of the drop comes from 4 prescribers — one (Dr. Ramirez) accounts for half on his own.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'Q1 Revenue', value: '$4.42M', change: '-9% QoQ', changeTone: 'bad' },
            { label: 'Q1 Scripts', value: '32,140', change: '-7% QoQ', changeTone: 'bad' },
            { label: 'Top 10 share', value: '54%', change: '-3 pts', changeTone: 'bad' },
            { label: 'Avg Rx value', value: '$137', change: '-$3', changeTone: 'neutral' },
          ],
        },
        {
          kind: 'table',
          spec: {
            headers: ['Prescriber', 'Q4 Rx', 'Q1 Rx', 'Δ', 'Revenue Δ', 'Last contact'],
            rows: [
              ['Dr. Ramirez (Westside)', '1,240', '420', '-66%', '-$112K', '89 days ago'],
              ['Dr. Chen (Downtown)', '980', '820', '-16%', '-$22K', '42 days ago'],
              ['Dr. Patel (Northgate)', '670', '480', '-28%', '-$26K', '61 days ago'],
              ['Dr. Osei (Lakeside)', '520', '380', '-27%', '-$19K', '73 days ago'],
            ],
          },
        },
        {
          kind: 'text',
          paragraphs: [
            'Dr. Ramirez had a practice relocation Q1 — worth re-establishing workflow with him. The other three haven\'t been touched by regional teams in 40+ days; a proactive outreach could recover $45–60K of the Q1 gap by end of Q2.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Win-back',
            buttons: [
              { label: 'Draft outreach sequence for top 4', primary: true },
              { label: 'Build prescriber scorecard' },
            ],
          },
        },
      ],
    },
    {
      id: 'ph-oc-3',
      sidebarTitle: 'Screen today\'s Rx intake queue for interactions',
      persona: 'Pharmacist-in-Charge',
      userMessage:
        'Screen the prescription intake queue for interactions and rank by urgency.',
      assistantText:
        '142 scripts in intake. 4 flagged for clinically significant interactions; 1 is high-acuity and should go to the top.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'Intake queue', value: '142', change: '+18', changeTone: 'neutral' },
            { label: 'Flagged', value: '4', change: '', changeTone: 'bad' },
            { label: 'High acuity', value: '1', change: '', changeTone: 'bad' },
            { label: 'Median age', value: '11m', change: '', changeTone: 'neutral' },
          ],
        },
        {
          kind: 'table',
          spec: {
            headers: ['Rx', 'Patient', 'Flag', 'Severity', 'Next'],
            rows: [
              ['Rx-88412', 'Linda T.', 'Warfarin + Aspirin 81mg + NSAID allergy', 'MAJOR', 'Pharmacist review'],
              ['Rx-88390', 'Devon R.', 'Sertraline + Tramadol', 'Moderate', 'Document & dispense'],
              ['Rx-88375', 'Meera K.', 'Simvastatin dose change', 'Low', 'Verify dose'],
              ['Rx-88362', 'Joshua P.', 'Metformin + contrast (upcoming CT)', 'Moderate', 'Call provider'],
            ],
          },
        },
        {
          kind: 'record',
          spec: {
            system: 'PioneerRx',
            recordType: 'Prescription',
            recordId: 'Rx-88412',
            title: 'Warfarin 5mg · Linda T. (DOB 1965-03-14)',
            status: 'On hold · Pharmacist review',
            fields: [
              { label: 'Active meds', value: 'Aspirin 81mg (daily), Lisinopril 20mg' },
              { label: 'Allergies', value: 'NSAID sensitivity (Dr. Ramirez, 2025-11-02)' },
              { label: 'Last INR', value: '2.4 (2026-04-10)' },
              { label: 'Prescriber', value: 'Dr. Sarah Cole, MD' },
            ],
          },
        },
        {
          kind: 'action',
          spec: {
            title: 'Resolve',
            buttons: [
              { label: 'Open Rx-88412 in PioneerRx', primary: true },
              { label: 'Batch-dispense the 138 clean scripts' },
            ],
          },
        },
      ],
    },
  ],

  /* -------------------------------- Distribution ----------------------------- */
  distribution: [
    {
      id: 'dist-oc-1',
      sidebarTitle: 'Top 50 accounts gone quiet in 30+ days',
      persona: 'VP Sales · COO',
      userMessage: 'Which of my top 50 accounts have gone quiet in the last 30 days?',
      assistantText:
        '7 top-50 accounts have no order and no touch in 30+ days. Combined TTM revenue: $3.1M. Cascade Metals is the highest-risk.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'At-risk accts', value: '7', change: '+2 WoW', changeTone: 'bad' },
            { label: 'TTM Revenue', value: '$3.1M', change: '', changeTone: 'bad' },
            { label: 'Avg days silent', value: '47', change: '', changeTone: 'bad' },
            { label: 'Rep coverage', value: '3 of 7', change: 'incomplete', changeTone: 'bad' },
          ],
        },
        {
          kind: 'table',
          spec: {
            headers: ['Account', 'TTM Rev', 'Days silent', 'Rep', 'Signal'],
            rows: [
              ['Cascade Metals', '$840K', '63', 'M. Torres', 'Ordering 40% off pace'],
              ['Pacific NW Construction', '$620K', '41', 'M. Torres', 'Site slowdown'],
              ['Horizon Industrial', '$510K', '38', 'J. Chen', 'No activity'],
              ['Northgate Supply', '$380K', '52', 'D. Rivera', 'Competitor visits'],
              ['Valley Steel Works', '$340K', '34', 'unassigned', 'Rep attrition'],
            ],
          },
        },
        {
          kind: 'line-chart',
          spec: {
            title: 'Cascade Metals · monthly spend, last 12 months ($K)',
            xLabels: ['May', 'Aug', 'Nov', 'Feb', 'Apr'],
            series: [
              {
                name: 'Cascade',
                color: '#2563eb',
                values: [72, 78, 81, 75, 70, 68, 71, 66, 58, 42, 28, 12],
              },
            ],
            highlightIndex: 10,
            highlightLabel: 'cliff',
          },
        },
        {
          kind: 'action',
          spec: {
            title: 'Win-back',
            buttons: [
              { label: 'Build call plan for top 5', primary: true },
              { label: 'Assign coverage for Valley Steel' },
            ],
          },
        },
      ],
    },
    {
      id: 'dist-oc-2',
      sidebarTitle: 'Credit-check the Cascade Metals SO on hold',
      persona: 'AR Lead · CFO',
      userMessage:
        'Credit-check the Cascade Metals $82K SO sitting on hold — cross-reference QuickBooks aging.',
      assistantText:
        'Cascade\'s aging cleared overnight — wire for $48K cleared 07:04. Remaining AR is all current. Credit line has $138K headroom. Safe to release.',
      assistantBlocks: [
        {
          kind: 'record',
          spec: {
            system: 'QuickBooks',
            recordType: 'Customer',
            recordId: 'CUS-00412',
            title: 'Cascade Metals',
            status: 'All current',
            fields: [
              { label: 'Total AR', value: '$94K (all current)' },
              { label: 'Oldest invoice', value: 'INV-4812 · 22 days (within terms)' },
              { label: 'Last payment', value: '$48K wire · 2026-04-24 07:04' },
              { label: 'Credit limit', value: '$180K (used $42K post-wire)' },
              { label: 'Avg DSO (12mo)', value: '31 days' },
            ],
          },
        },
        {
          kind: 'kpis',
          metrics: [
            { label: 'SO value', value: '$82K', change: '', changeTone: 'neutral' },
            { label: 'Headroom', value: '$138K', change: '', changeTone: 'good' },
            { label: 'Risk score', value: 'Low', change: '', changeTone: 'good' },
            { label: 'Action SLA', value: '3h', change: 'hold costs $$', changeTone: 'neutral' },
          ],
        },
        {
          kind: 'bullets',
          title: 'Release decision',
          items: [
            'Aging reconciliation vs QuickBooks: 100% match.',
            'No open disputes or chargebacks.',
            'Warehouse has pick capacity for 2026-04-29 ship date.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Release',
            buttons: [
              { label: 'Release SO-14821 now', primary: true },
              { label: 'Keep on hold (require VP approval)' },
            ],
          },
        },
      ],
    },
    {
      id: 'dist-oc-3',
      sidebarTitle: 'Convert inbound EDI 850s and flag exceptions',
      persona: 'Operations · EDI Desk',
      userMessage:
        'Convert inbound EDI 850s to sales orders and flag exceptions.',
      assistantText:
        '14 inbound 850s processed. 12 auto-converted to SOs; 2 exceptions need your eyes (both missing part numbers).',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'Inbound 850s', value: '14', change: '', changeTone: 'neutral' },
            { label: 'Auto-converted', value: '12', change: '86%', changeTone: 'good' },
            { label: 'Exceptions', value: '2', change: '', changeTone: 'bad' },
            { label: 'Avg convert time', value: '3.1s', change: '', changeTone: 'good' },
          ],
        },
        {
          kind: 'table',
          spec: {
            title: 'Exceptions',
            headers: ['Sender', '850 #', 'Issue', 'Line', 'Suggested'],
            rows: [
              ['Northgate Supply', 'EDI-98441', 'Missing part number', 'Line 3', 'Cross-ref catalog: HB-M12-50'],
              ['Valley Steel Works', 'EDI-98447', 'Quantity = 0', 'Line 7', 'Confirm with buyer'],
            ],
          },
        },
        {
          kind: 'bullets',
          title: 'Clean converts',
          items: [
            'SO-14823 through SO-14834 created in SAP Business One.',
            '997 acknowledgments sent to 8 trading partners.',
            'Ship-date confirmations queued for email send at 09:00.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Resolve exceptions',
            buttons: [
              { label: 'Auto-apply suggested catalog match', primary: true },
              { label: 'Email buyers for clarification' },
            ],
          },
        },
      ],
    },
  ],

  /* --------------------------------- Nonprofit ------------------------------- */
  nonprofit: [
    {
      id: 'np-oc-1',
      sidebarTitle: 'Major donors uncontacted in 90 days',
      persona: 'Executive Director',
      userMessage: 'Which major donors haven\'t been contacted in 90 days?',
      assistantText:
        '47 major donors ($5K+ lifetime) with no touch in 90+ days. Combined prior-year giving: $2.4M. Top 10 drive $1.6M of that.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'Uncontacted', value: '47', change: '', changeTone: 'bad' },
            { label: 'Prior-year gifts', value: '$2.4M', change: '', changeTone: 'neutral' },
            { label: 'At top tier', value: '10', change: '$25K+', changeTone: 'bad' },
            { label: 'Avg days silent', value: '127', change: '', changeTone: 'bad' },
          ],
        },
        {
          kind: 'table',
          spec: {
            headers: ['Donor', 'Tier', 'Last gift', 'Days silent', 'LTV'],
            rows: [
              ['Mallory Foundation', '$100K+', '$120K · 2025-06-14', '314', '$620K'],
              ['Chen Family Trust', '$25K+', '$45K · 2025-11-02', '173', '$180K'],
              ['N. Okonkwo', '$25K+', '$30K · 2026-01-18', '96', '$155K'],
              ['Summit Partners', '$25K+', '$28K · 2025-12-04', '141', '$142K'],
              ['R. Martinez', '$5K+', '$12K · 2025-11-12', '163', '$68K'],
            ],
          },
        },
        {
          kind: 'bullets',
          title: 'Pre-meeting context per donor',
          items: [
            'Last gift + designation + program area relevance.',
            'Board/committee affiliation (3 donors are on program committees).',
            'Recent program outcomes in their area of interest.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Outreach',
            buttons: [
              { label: 'Build call plan for top 10', primary: true },
              { label: 'Draft personalized emails for 37 remaining' },
            ],
          },
        },
      ],
    },
    {
      id: 'np-oc-2',
      sidebarTitle: 'Spring Appeal pace-to-goal, hour 18',
      persona: 'CFO · Finance',
      userMessage:
        'Pace-to-goal for the Spring Appeal at hour 18 — chart by channel.',
      assistantText:
        'At hour 18, $184K raised against $450K goal. Overall pace is 41% vs 38% target — on track. But direct mail is 42% behind plan and online is +18% ahead.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'Raised', value: '$184K', change: '41% of goal', changeTone: 'good' },
            { label: 'Gifts', value: '1,842', change: '+212 vs plan', changeTone: 'good' },
            { label: 'Avg gift', value: '$100', change: '-$8', changeTone: 'neutral' },
            { label: 'Hours left', value: '30', change: '', changeTone: 'neutral' },
          ],
        },
        {
          kind: 'donut',
          spec: {
            title: 'Raised by channel',
            slices: [
              { label: 'Online', value: 98, color: '#2563eb' },
              { label: 'Event', value: 42, color: '#059669' },
              { label: 'Direct mail', value: 22, color: '#d97706' },
              { label: 'Major gifts', value: 22, color: '#7c3aed' },
            ],
          },
        },
        {
          kind: 'text',
          paragraphs: [
            'Direct mail response rate is 1.8% vs 3.2% plan. Checking the mail house, we have a drop delay — 22% of pieces went out 3 days late. That\'s the gap.',
            'Recommend moving $18K from email to a targeted online match in the next 12 hours to offset the mail shortfall.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Adjust',
            buttons: [
              { label: 'Launch $25K online match', primary: true },
              { label: 'Email top-100 lapsed donors now' },
            ],
          },
        },
      ],
    },
    {
      id: 'np-oc-3',
      sidebarTitle: 'Draft weekend gift thank-you sequence',
      persona: 'Development Director',
      userMessage:
        'Draft thank-you sequence for the 127 gifts received this weekend.',
      assistantText:
        '127 gifts totaling $84,400. Segmenting into 4 tiers; IRS acknowledgment letters attach automatically.',
      assistantBlocks: [
        {
          kind: 'table',
          spec: {
            title: 'Thank-you segmentation',
            headers: ['Tier', 'Gifts', 'Total', 'Message', 'Cadence'],
            rows: [
              ['$10K+', '2', '$28K', 'ED personal call within 48h', 'Letter + stewardship'],
              ['$1K–$10K', '11', '$34K', 'Personalized letter, program impact', '72h'],
              ['$100–$1K', '46', '$18K', 'Personalized email + story', '5 days'],
              ['Under $100', '68', '$4.4K', 'Automated thank-you + IRS receipt', '24h'],
            ],
          },
        },
        {
          kind: 'bullets',
          title: 'Included for each donor',
          items: [
            'Gift amount + designation + date (IRS-compliant acknowledgment).',
            'Program area relevance based on giving history.',
            'Upcoming event or story pulled from the editorial calendar.',
          ],
        },
        {
          kind: 'record',
          spec: {
            system: "Raiser's Edge",
            recordType: 'Campaign',
            recordId: 'CMP-SPRING-2026',
            title: 'Spring Appeal 2026',
            status: 'Active · In-quiet phase',
            fields: [
              { label: 'Goal', value: '$450,000' },
              { label: 'Raised', value: '$184,400' },
              { label: 'Donors YTD', value: '1,842' },
              { label: 'New donors', value: '218 (12%)' },
            ],
          },
        },
        {
          kind: 'action',
          spec: {
            title: 'Send',
            buttons: [
              { label: 'Approve all 127 thank-yous', primary: true },
              { label: 'Review top-tier letters first' },
            ],
          },
        },
      ],
    },
  ],

  /* -------------------------------- Healthcare ------------------------------- */
  healthcare: [
    {
      id: 'hc-oc-1',
      sidebarTitle: 'Why are denials up 14% at Scottsdale?',
      persona: 'Revenue Cycle Director · CFO',
      userMessage: 'Why are our denials up 14% at the Scottsdale location?',
      assistantText:
        'Scottsdale denial rate jumped from 6.2% to 8.7% over 60 days. 71% of the increase is concentrated in Aetna, driven by CARC 97 and CARC 204.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'Denial rate', value: '8.7%', change: '+2.5 pts', changeTone: 'bad' },
            { label: 'Denied $', value: '$218K', change: '+$74K', changeTone: 'bad' },
            { label: 'Avg days to resolve', value: '44', change: '+11', changeTone: 'bad' },
            { label: 'Appeal win rate', value: '62%', change: 'stable', changeTone: 'neutral' },
          ],
        },
        {
          kind: 'line-chart',
          spec: {
            title: 'Scottsdale · denial rate, last 12 weeks (%)',
            xLabels: ['W-12', 'W-9', 'W-6', 'W-3', 'This week'],
            series: [
              {
                name: 'Denial %',
                color: '#ef4444',
                values: [6.2, 6.4, 6.1, 6.5, 7.0, 7.2, 7.4, 7.8, 8.1, 8.3, 8.5, 8.7],
              },
              {
                name: 'Network avg',
                color: '#94a3b8',
                values: [6.1, 6.2, 6.2, 6.1, 6.0, 6.2, 6.1, 6.3, 6.2, 6.2, 6.1, 6.2],
              },
            ],
          },
        },
        {
          kind: 'table',
          spec: {
            title: 'Aetna denials by CARC code',
            headers: ['CARC', 'Description', 'Claims', 'Denied $', 'Root cause'],
            rows: [
              ['CARC 97', 'Bundled service', '84', '$112K', 'Coding pair missing 25 modifier'],
              ['CARC 204', 'Not covered', '38', '$41K', 'Policy change 2026-02-01'],
              ['CARC 16', 'Claim info missing', '22', '$28K', 'Prior-auth doc not attached'],
            ],
          },
        },
        {
          kind: 'action',
          spec: {
            title: 'Fix',
            buttons: [
              { label: 'Submit 34-claim Aetna appeal batch', primary: true },
              { label: 'Update coding macros for modifier 25' },
            ],
          },
        },
      ],
    },
    {
      id: 'hc-oc-2',
      sidebarTitle: 'Volume vs staffing mismatch this week',
      persona: 'Chief Operations Officer',
      userMessage:
        'Patient volume vs staffing mismatch — which locations are over/under this week?',
      assistantText:
        '8 locations, 3 under-capacity, 1 over-capacity. Thursday is the tightest day — Scottsdale is 34% over capacity while Phoenix runs at 62%.',
      assistantBlocks: [
        {
          kind: 'table',
          spec: {
            headers: ['Location', 'Booked', 'Capacity', 'Utilization', 'Status'],
            rows: [
              ['Scottsdale', '184', '138', '133%', 'Over (4-hr overflow risk)'],
              ['Phoenix', '72', '116', '62%', 'Under'],
              ['Tempe', '94', '102', '92%', 'On target'],
              ['Mesa', '78', '108', '72%', 'Under'],
              ['Chandler', '112', '120', '93%', 'On target'],
              ['Gilbert', '104', '112', '93%', 'On target'],
              ['Glendale', '84', '112', '75%', 'Under'],
              ['Peoria', '96', '104', '92%', 'On target'],
            ],
          },
        },
        {
          kind: 'bullets',
          title: 'Reassignment recommendation',
          items: [
            'Move 2 MA providers from Phoenix → Scottsdale for Thursday only.',
            'Offer 4 patients same-day transfer to Mesa (8-min drive).',
            'Pre-book Thursday Phoenix slots for next week spill-over.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Execute',
            buttons: [
              { label: 'Reassign Phoenix MAs', primary: true },
              { label: 'Send Mesa transfer offers' },
            ],
          },
        },
      ],
    },
    {
      id: 'hc-oc-3',
      sidebarTitle: 'Appeal candidates — CARC 97/204 over 60d',
      persona: 'Billing Manager',
      userMessage:
        'Appeal-candidates list for CARC 97/204 denials over 60 days.',
      assistantText:
        '68 claims qualify. $214K total. Window closes for 22 claims in the next 14 days. Batch-appeal recommended.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'Candidates', value: '68', change: '', changeTone: 'neutral' },
            { label: 'Denied $', value: '$214K', change: '', changeTone: 'bad' },
            { label: 'Closing <14d', value: '22', change: '$68K', changeTone: 'bad' },
            { label: 'Expected recovery', value: '62%', change: 'historical', changeTone: 'good' },
          ],
        },
        {
          kind: 'table',
          spec: {
            headers: ['Patient', 'DOS', 'Payer', 'CARC', '$ Amount', 'Window'],
            rows: [
              ['A. Johnson', '2026-02-08', 'Aetna', '97', '$3,240', '9 days'],
              ['R. Khan', '2026-02-12', 'Aetna', '204', '$1,820', '13 days'],
              ['M. Liu', '2026-02-14', 'BCBS', '97', '$4,510', '15 days'],
              ['J. Rivera', '2026-02-16', 'Aetna', '97', '$2,980', '17 days'],
              ['…and 64 more', '', '', '', '$201,450', ''],
            ],
          },
        },
        {
          kind: 'bullets',
          title: 'Batch assembly',
          items: [
            'Appeal templates pre-populated from chart notes in Athenahealth.',
            'Modifier 25 corrections auto-applied to CARC 97 claims.',
            'Supporting docs pulled from Epic and attached to each packet.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Submit',
            buttons: [
              { label: 'Submit 22 closing-window appeals now', primary: true },
              { label: 'Queue remaining 46 for tomorrow' },
            ],
          },
        },
      ],
    },
  ],

  /* ---------------------------- Property Management -------------------------- */
  propertyManagement: [
    {
      id: 'pm-oc-1',
      sidebarTitle: 'Which properties missed underwriting?',
      persona: 'Asset Manager · COO',
      userMessage: 'Which properties underperformed underwriting last quarter?',
      assistantText:
        '4 of 14 properties came in below underwriting NOI. Riverside and Fairview drove most of the gap — one from maintenance, one from vacancy.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'Properties below plan', value: '4 / 14', change: '', changeTone: 'bad' },
            { label: 'Aggregate NOI gap', value: '-$348K', change: '-2.1%', changeTone: 'bad' },
            { label: 'Worst variance', value: 'Riverside', change: '-$162K', changeTone: 'bad' },
            { label: 'Best overperformer', value: 'Cedar Park', change: '+$74K', changeTone: 'good' },
          ],
        },
        {
          kind: 'table',
          spec: {
            headers: ['Property', 'Plan NOI', 'Actual', 'Δ', 'Driver'],
            rows: [
              ['Riverside', '$2.14M', '$1.98M', '-$162K', 'Maintenance spike (elevators)'],
              ['Fairview Tower', '$1.86M', '$1.77M', '-$92K', 'Vacancy (14-unit block)'],
              ['Lakeside', '$1.42M', '$1.36M', '-$58K', 'Concessions (renewals)'],
              ['Parkside', '$1.18M', '$1.14M', '-$36K', 'Opex'],
              ['…10 others', '', '', '+$140K net', 'On/above plan'],
            ],
          },
        },
        {
          kind: 'text',
          paragraphs: [
            'Riverside\'s elevator-cost anomaly is 78% of its gap. Two full replacements in 90 days — one covered by capex reserve, one not. Recommend revising capex reserve upward for 2026 H2.',
            'Fairview vacancy is isolated to a single block — a lease-up plan is already in motion; expect closure by end of Q2.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Owner review',
            buttons: [
              { label: 'Generate Q1 ownership package', primary: true },
              { label: 'Schedule Riverside capex review' },
            ],
          },
        },
      ],
    },
    {
      id: 'pm-oc-2',
      sidebarTitle: 'What\'s driving the Riverside maintenance spike?',
      persona: 'Property Controller · CFO',
      userMessage: 'What\'s driving the maintenance spike at Riverside?',
      assistantText:
        'Riverside maintenance cost per unit is $412 vs $186 portfolio avg. Two buildings — B and D — are the drivers, and both trace to the 1988 elevator system.',
      assistantBlocks: [
        {
          kind: 'line-chart',
          spec: {
            title: 'Riverside · maintenance $/unit, last 12 months',
            xLabels: ['May', 'Aug', 'Nov', 'Feb', 'Apr'],
            series: [
              {
                name: 'Riverside',
                color: '#ef4444',
                values: [184, 192, 178, 188, 196, 182, 212, 264, 312, 348, 392, 412],
              },
              {
                name: 'Portfolio avg',
                color: '#94a3b8',
                values: [182, 184, 178, 186, 188, 184, 188, 186, 182, 186, 184, 186],
              },
            ],
          },
        },
        {
          kind: 'table',
          spec: {
            title: 'Cost concentration by building',
            headers: ['Building', 'Units', 'Q1 Maint', '$/Unit', 'Top driver'],
            rows: [
              ['Riverside-A', '84', '$16K', '$190', 'Routine'],
              ['Riverside-B', '72', '$58K', '$806', 'Elevator (2 replacements)'],
              ['Riverside-C', '96', '$18K', '$188', 'Routine'],
              ['Riverside-D', '68', '$42K', '$618', 'Elevator + HVAC'],
            ],
          },
        },
        {
          kind: 'bullets',
          title: 'Recommended',
          items: [
            'Pre-approve full elevator modernization at Riverside-B (~$180K, 3-year ROI).',
            'Add Riverside-D to 2026 H2 capex plan (similar modernization).',
            'Negotiate volume pricing with Kone/Otis now while 2 properties are still in planning.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Act',
            buttons: [
              { label: 'Approve $180K Riverside-B capex', primary: true },
              { label: 'Run portfolio elevator age report' },
            ],
          },
        },
      ],
    },
    {
      id: 'pm-oc-3',
      sidebarTitle: 'Leases expiring in 90 days with no renewal activity',
      persona: 'Portfolio Manager',
      userMessage:
        'List leases expiring in the next 90 days with no renewal activity.',
      assistantText:
        '68 leases expire in 90 days; 47 have zero renewal contact in the system. Historical lapse rate at this point in the cycle is 34%.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'Expiring 90d', value: '68', change: '', changeTone: 'neutral' },
            { label: 'No renewal activity', value: '47', change: '69%', changeTone: 'bad' },
            { label: 'Projected loss', value: '16 units', change: 'at current rate', changeTone: 'bad' },
            { label: 'Market rent uplift', value: '+4.2%', change: 'avg vs in-place', changeTone: 'good' },
          ],
        },
        {
          kind: 'table',
          spec: {
            headers: ['Property', 'Unit', 'Expires', 'In-place rent', 'Market rent', 'Action'],
            rows: [
              ['Riverside-A', '304', '2026-06-30', '$1,820', '$1,940', 'Outreach + 3% offer'],
              ['Lakeside', '7B', '2026-07-12', '$2,140', '$2,260', 'Outreach + 4% offer'],
              ['Cedar Park', '210', '2026-06-18', '$1,640', '$1,780', 'Outreach + 5% offer'],
              ['Fairview', '1408', '2026-07-04', '$2,280', '$2,420', 'Outreach'],
              ['…and 43 more', '', '', '', '', ''],
            ],
          },
        },
        {
          kind: 'bullets',
          title: 'Renewal package per unit',
          items: [
            'Resident history: maintenance tickets, payment timeliness, tenure.',
            'Market comp analysis to set offer bands.',
            'Personalized outreach email with renewal options + online sign-in.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Launch outreach',
            buttons: [
              { label: 'Send 47-unit renewal sequence', primary: true },
              { label: 'Escalate the 16 at-risk high-value units' },
            ],
          },
        },
      ],
    },
  ],

  /* --------------------------- Professional Services ------------------------- */
  professionalServices: [
    {
      id: 'ps-oc-1',
      sidebarTitle: 'Engagements trending over budget',
      persona: 'Managing Partner · COO',
      userMessage: 'Which engagements are on track to blow budget?',
      assistantText:
        '6 engagements with >70% budget consumed and >40% scope remaining. Projected combined overrun: $342K.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'At-risk engagements', value: '6', change: '', changeTone: 'bad' },
            { label: 'Projected overrun', value: '$342K', change: '', changeTone: 'bad' },
            { label: 'Worst engagement', value: 'Hartford', change: '+$96K', changeTone: 'bad' },
            { label: 'Early-warning SLA', value: '4 of 6', change: 'hit', changeTone: 'good' },
          ],
        },
        {
          kind: 'table',
          spec: {
            headers: ['Engagement', 'Client', 'Budget', '% Used', '% Scope', 'Projected overrun'],
            rows: [
              ['M&A Diligence', 'Hartford Mfg', '$380K', '87%', '42%', '+$96K'],
              ['Process Redesign', 'Summit Health', '$520K', '78%', '36%', '+$78K'],
              ['ERP Implementation', 'Parker Industrial', '$840K', '72%', '44%', '+$64K'],
              ['Strategic Plan', 'Riverside Capital', '$240K', '81%', '38%', '+$42K'],
              ['Supply Chain Assess.', 'Cascade Goods', '$310K', '74%', '41%', '+$38K'],
              ['Tax Advisory', 'Northgate LLC', '$180K', '76%', '35%', '+$24K'],
            ],
          },
        },
        {
          kind: 'text',
          paragraphs: [
            'Hartford is the most urgent — client just added two deliverables without scope reset. Recommend PM issue an early-warning today with revised ETC before the partner committee meeting Thursday.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Mitigate',
            buttons: [
              { label: 'Issue early-warning to Hartford PM', primary: true },
              { label: 'Schedule 6-engagement partner review' },
            ],
          },
        },
      ],
    },
    {
      id: 'ps-oc-2',
      sidebarTitle: 'Partners sub-60% utilization (exclude parental leave)',
      persona: 'Finance Director · CFO',
      userMessage:
        'Show me partners with sub-60% utilization this month — exclude partners on parental leave.',
      assistantText:
        '4 partners below 60% this month (parental-leave excluded). 3 have pipeline to fix it; 1 does not.',
      assistantBlocks: [
        {
          kind: 'table',
          spec: {
            headers: ['Partner', 'Practice', 'Utilization', 'Pipeline $', 'Capacity next 30d'],
            rows: [
              ['D. Hoffman', 'Strategy', '52%', '$320K', '180 hrs open'],
              ['M. Okafor', 'Financial Advisory', '48%', '$180K', '220 hrs open'],
              ['J. Lin', 'Technology', '57%', '$480K', '140 hrs open'],
              ['R. Bhatia', 'M&A', '44%', '$40K', '260 hrs open (at risk)'],
            ],
          },
        },
        {
          kind: 'kpis',
          metrics: [
            { label: 'Firm-wide util.', value: '71.4%', change: '-1.8 pts', changeTone: 'bad' },
            { label: 'Target', value: '75%', change: '', changeTone: 'neutral' },
            { label: 'Bench hours', value: '800', change: '+140', changeTone: 'bad' },
            { label: 'Revenue impact', value: '-$340K', change: 'if unresolved', changeTone: 'bad' },
          ],
        },
        {
          kind: 'bullets',
          title: 'Actions to recover',
          items: [
            'Reassign D. Hoffman to the Parker Industrial ERP engagement (open role for 80 hrs/mo).',
            'Pair R. Bhatia with J. Lin on Summit Health redesign — creates 120 hrs/mo demand.',
            'M. Okafor has 3 proposals outstanding; push 1 to close before month-end.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Execute',
            buttons: [
              { label: 'Reassign Hoffman to Parker', primary: true },
              { label: 'Partner committee review this Friday' },
            ],
          },
        },
      ],
    },
    {
      id: 'ps-oc-3',
      sidebarTitle: 'Weekly WIP aging + invoice-ready engagements',
      persona: 'Engagement Manager',
      userMessage:
        'Weekly WIP aging and invoice-ready engagements.',
      assistantText:
        'Total WIP $2.1M. $186K is 90+ days (8.9%). 14 engagements are invoice-ready totaling $482K — of those, 4 are past the contract billing cadence.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'Total WIP', value: '$2.1M', change: '+$180K', changeTone: 'neutral' },
            { label: 'WIP 90+ days', value: '$186K', change: '8.9%', changeTone: 'bad' },
            { label: 'Invoice-ready', value: '$482K', change: '14 engmts', changeTone: 'good' },
            { label: 'Past cadence', value: '$128K', change: '4 engmts', changeTone: 'bad' },
          ],
        },
        {
          kind: 'table',
          spec: {
            title: 'Invoice-ready · past contract cadence',
            headers: ['Engagement', 'Client', 'Amount', 'Days past cadence', 'Partner'],
            rows: [
              ['ERP Implementation', 'Parker Industrial', '$48K', '11', 'J. Lin'],
              ['Process Redesign', 'Summit Health', '$38K', '8', 'M. Okafor'],
              ['Tax Advisory', 'Northgate LLC', '$26K', '7', 'D. Hoffman'],
              ['Strategic Plan', 'Riverside Capital', '$16K', '4', 'R. Bhatia'],
            ],
          },
        },
        {
          kind: 'bullets',
          title: 'Monthly cadence note',
          items: [
            'All 4 past-cadence engagements have monthly billing language in the MSA.',
            'Auto-generated drafts pull hours, expenses, and milestone completion.',
            'Partners get 48 hours to review before Foundry sends.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Bill',
            buttons: [
              { label: 'Generate 14 invoice drafts', primary: true },
              { label: 'Age the 90+ day WIP to partners' },
            ],
          },
        },
      ],
    },
  ],

  /* --------------------------- Financial Services ---------------------------- */
  financialServices: [
    {
      id: 'fs-oc-1',
      sidebarTitle: 'Next-month reviews + threshold breaches',
      persona: 'Managing Director · COO',
      userMessage:
        'Which clients are due for annual reviews next month — flag portfolio threshold breaches.',
      assistantText:
        '47 clients due for annual review in May. 6 have crossed portfolio allocation thresholds — those need to be front of agenda.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'Reviews due May', value: '47', change: '', changeTone: 'neutral' },
            { label: 'Threshold breaches', value: '6', change: '', changeTone: 'bad' },
            { label: 'Combined AUM', value: '$184M', change: '8.8% of book', changeTone: 'neutral' },
            { label: 'On-time rate target', value: '95%', change: '2026 goal', changeTone: 'good' },
          ],
        },
        {
          kind: 'table',
          spec: {
            title: 'Threshold breaches (priority schedule)',
            headers: ['Client', 'Advisor', 'Issue', 'Band', 'AUM'],
            rows: [
              ['K. Morales', 'D. Chen', 'Equity 72% vs 60% target', '+12 pts', '$6.2M'],
              ['T. Alvarez', 'S. Patel', 'Cash drag 14%', '+11 pts', '$4.8M'],
              ['B. Henderson', 'D. Chen', 'International 28% vs 18%', '+10 pts', '$8.4M'],
              ['R. Martinez Trust', 'J. Kim', 'Fixed income 52% vs 40%', '+12 pts', '$12.1M'],
              ['Park Family', 'S. Patel', 'Alternative 18% vs 10%', '+8 pts', '$7.6M'],
              ['C. Nguyen', 'J. Kim', 'Single-stock concentration', '32% AAPL', '$2.4M'],
            ],
          },
        },
        {
          kind: 'bullets',
          title: 'Pre-meeting context per client',
          items: [
            'Portfolio current positions + drift from target allocation.',
            'Market context + recommended rebalance trades.',
            'Recent life events, CRM notes, and open action items.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Schedule',
            buttons: [
              { label: 'Launch scheduling for all 47', primary: true },
              { label: 'Flag 6 breaches for CCO review' },
            ],
          },
        },
      ],
    },
    {
      id: 'fs-oc-2',
      sidebarTitle: 'Q1 fee variance vs Schwab custodian feed',
      persona: 'CCO · CFO',
      userMessage:
        'Reconcile Q1 fee variance against Schwab custodian feed.',
      assistantText:
        'Schwab custodian fees total $1.84M. Our billing system shows $1.86M. Variance: +$21K — 14 accounts contribute. 3 are billing errors; 11 are timing.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'Schwab total', value: '$1.842M', change: '', changeTone: 'neutral' },
            { label: 'Foundry total', value: '$1.863M', change: '+$21K', changeTone: 'bad' },
            { label: 'Accounts flagged', value: '14', change: '', changeTone: 'neutral' },
            { label: 'Requires adjust.', value: '3', change: '$4.2K refund', changeTone: 'bad' },
          ],
        },
        {
          kind: 'table',
          spec: {
            title: 'Requires adjustment',
            headers: ['Account', 'Advisor', 'Billed', 'Correct', 'Δ', 'Root cause'],
            rows: [
              ['ACC-2410', 'D. Chen', '$3,840', '$2,680', '+$1,160', 'Asset class mis-flagged'],
              ['ACC-2876', 'S. Patel', '$2,420', '$1,820', '+$600', 'Inception date error'],
              ['ACC-3102', 'J. Kim', '$6,240', '$3,800', '+$2,440', 'Fee schedule override expired'],
            ],
          },
        },
        {
          kind: 'bullets',
          title: 'Adjustment plan',
          items: [
            'Generate refund entries for 3 accounts ($4,200 total).',
            'Update fee schedule + asset classification in Orion.',
            'Memo to CCO with root-cause analysis; file with Q1 compliance log.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Resolve',
            buttons: [
              { label: 'Generate $4,200 refund entries', primary: true },
              { label: 'Update fee overrides in Orion' },
            ],
          },
        },
      ],
    },
    {
      id: 'fs-oc-3',
      sidebarTitle: 'Life-event alerts + outreach suggestions',
      persona: 'Advisor',
      userMessage:
        'Life-event alerts and outreach suggestions for my book this week.',
      assistantText:
        '5 life events detected across your book. 3 are high-value retirement transitions; 2 are inheritance/estate events.',
      assistantBlocks: [
        {
          kind: 'table',
          spec: {
            headers: ['Client', 'Event', 'Detected', 'Suggested agenda'],
            rows: [
              ['S. Thompson', 'Retirement (age 65 milestone)', '2 days ago', 'Pre-retirement income planning'],
              ['M. Park', 'Retirement (final paycheck filed)', '5 days ago', 'RMD planning, Roth conversion window'],
              ['J. Ortiz', 'Retirement (social security filing)', 'Yesterday', 'Withdrawal sequencing'],
              ['The Reilly Family', 'Inheritance ($1.2M DOD valuation)', '3 days ago', 'Basis planning, trust setup'],
              ['D. Sharma', 'Home sale (deed recorded)', 'Today', 'Cap gains harvest, downsizing allocation'],
            ],
          },
        },
        {
          kind: 'record',
          spec: {
            system: 'Redtail',
            recordType: 'Client',
            recordId: 'CLI-4472',
            title: 'S. Thompson (65)',
            status: 'Pre-retirement · Priority outreach',
            fields: [
              { label: 'AUM', value: '$3.8M' },
              { label: 'Risk tolerance', value: 'Moderate' },
              { label: 'Target retirement income', value: '$180K / year' },
              { label: 'Last review', value: '2025-09-12 (8 months)' },
            ],
          },
        },
        {
          kind: 'action',
          spec: {
            title: 'Outreach',
            buttons: [
              { label: 'Schedule Thompson pre-retirement meeting', primary: true },
              { label: 'Build agenda packages for all 5' },
            ],
          },
        },
      ],
    },
  ],

  /* -------------------------------- Food & Beverage -------------------------- */
  foodBeverage: [
    {
      id: 'fb-oc-1',
      sidebarTitle: 'Where are we losing margin on coffee blends?',
      persona: 'VP Operations · COO',
      userMessage: 'Where are we losing margin on the coffee blends?',
      assistantText:
        'Coffee-blends line margin dropped 340 bps since January. 74% of the drop comes from ingredient variance (arabica spike); 22% from yield at the Portland facility.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'Blend line margin', value: '38.2%', change: '-3.4 pts', changeTone: 'bad' },
            { label: 'Ingredient var.', value: '-$184K', change: 'vs std', changeTone: 'bad' },
            { label: 'Yield (Portland)', value: '93.2%', change: '-1.8 pts', changeTone: 'bad' },
            { label: 'Price realization', value: '100.8%', change: '+0.8 pts', changeTone: 'good' },
          ],
        },
        {
          kind: 'table',
          spec: {
            headers: ['Blend', 'Revenue', 'Std margin', 'Actual', 'Driver'],
            rows: [
              ['Heritage Dark', '$680K', '42%', '36.4%', 'Arabica +14%'],
              ['Morning Reserve', '$420K', '39%', '34.8%', 'Arabica + yield'],
              ['Decaf House', '$220K', '36%', '35.8%', 'On plan'],
              ['Single Origin Ethiopia', '$180K', '44%', '39.2%', 'Arabica'],
              ['Holiday Limited', '$120K', '37%', '38.1%', 'Above plan'],
            ],
          },
        },
        {
          kind: 'bullets',
          title: 'Actions',
          items: [
            'Update recipe BOMs for 8 blends reflecting new arabica contract.',
            'Re-price Heritage Dark and Single Origin Ethiopia +$0.40/lb (still below market).',
            'Root-cause Portland yield: assay suggests over-roasting in Shift 3.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Adjust',
            buttons: [
              { label: 'Update BOMs + publish new std cost', primary: true },
              { label: 'Draft re-price memo for commercial team' },
            ],
          },
        },
      ],
    },
    {
      id: 'fb-oc-2',
      sidebarTitle: 'Q1 ingredient cost variance vs recipe standards',
      persona: 'Controller · CFO',
      userMessage:
        'Ingredient cost variance vs recipe standards this quarter.',
      assistantText:
        'Total variance: +$184K unfavorable. Arabica drives $112K (61%); secondary drivers are cocoa and dairy. No material supplier issues.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'Ingredient var.', value: '+$184K', change: 'unfav', changeTone: 'bad' },
            { label: 'Arabica portion', value: '61%', change: '', changeTone: 'bad' },
            { label: '% of revenue', value: '3.9%', change: '+1.2 pts', changeTone: 'bad' },
            { label: 'Std cost update', value: 'Overdue', change: '3 cycles', changeTone: 'bad' },
          ],
        },
        {
          kind: 'donut',
          spec: {
            title: 'Variance by ingredient',
            slices: [
              { label: 'Arabica', value: 112, color: '#d97706' },
              { label: 'Cocoa', value: 28, color: '#7c3aed' },
              { label: 'Dairy', value: 22, color: '#2563eb' },
              { label: 'Sugar', value: 12, color: '#059669' },
              { label: 'Other', value: 10, color: '#94a3b8' },
            ],
          },
        },
        {
          kind: 'bullets',
          title: 'Board-ready narrative',
          items: [
            'Arabica futures surged Feb–Mar on Brazil harvest concerns. We held position until April — recognized $112K unfav variance.',
            'New contract locks 70% of Q2–Q3 at $3.80/lb (vs current $4.15 spot). BOMs should reflect this immediately.',
            'Cocoa and dairy variance reflects minor supplier shifts; both are recoverable in Q2 pricing review.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Close the loop',
            buttons: [
              { label: 'Generate Q1 margin bridge report', primary: true },
              { label: 'Update standard costs across all BOMs' },
            ],
          },
        },
      ],
    },
    {
      id: 'fb-oc-3',
      sidebarTitle: 'SKUs below safety stock at top distributors',
      persona: 'Production Manager',
      userMessage:
        'SKUs below safety stock at our top distributors — generate replenishment POs.',
      assistantText:
        '23 SKUs below safety stock across the top-5 distributors. Restaurant Depot alone has 11 short. All auto-recoverable within 4 days.',
      assistantBlocks: [
        {
          kind: 'table',
          spec: {
            headers: ['Distributor', 'Short SKUs', 'Days to stock-out', 'PO value', 'Ship by'],
            rows: [
              ['Restaurant Depot', '11', '3.2', '$34K', '2026-04-26'],
              ['US Foods Midwest', '5', '4.8', '$18K', '2026-04-28'],
              ['Gordon Northern', '3', '6.1', '$12K', '2026-04-29'],
              ['Sysco Coastal', '2', '5.3', '$9K', '2026-04-28'],
              ['PFG Interstate', '2', '4.9', '$8K', '2026-04-28'],
            ],
          },
        },
        {
          kind: 'record',
          spec: {
            system: 'SAP Business One',
            recordType: 'Draft PO',
            recordId: 'PO-RD-2026-04-24',
            title: 'Restaurant Depot — Replenishment (11 SKUs)',
            status: 'Draft · Ready to submit',
            fields: [
              { label: 'Total units', value: '1,820' },
              { label: 'Value', value: '$34,200' },
              { label: 'Ship-from', value: 'Portland Plant 1' },
              { label: 'Target delivery', value: '2026-04-26' },
            ],
          },
        },
        {
          kind: 'bullets',
          title: 'What happens on submit',
          items: [
            'PO created in SAP Business One; production schedule updated automatically.',
            'Distributor receives ASN + expected-ship confirmation.',
            'Shopify B2B portal updates with new lead times.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Submit',
            buttons: [
              { label: 'Submit all 5 replenishment POs', primary: true },
              { label: 'Review Restaurant Depot first' },
            ],
          },
        },
      ],
    },
  ],

  /* -------------------------------- Construction ----------------------------- */
  construction: [
    {
      id: 'c-oc-1',
      sidebarTitle: 'Projects trending over budget this week',
      persona: 'CFO · Finance',
      userMessage: 'Which projects are trending over budget this week?',
      assistantText:
        '5 of 40 active projects are trending over budget. Combined projected overrun: $1.18M. Parker Medical and Riverwalk Hotel are the two biggest drivers.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'At-risk projects', value: '5 / 40', change: '', changeTone: 'bad' },
            { label: 'Projected overrun', value: '$1.18M', change: '', changeTone: 'bad' },
            { label: 'Earned value variance', value: '-$820K', change: 'CPI 0.94', changeTone: 'bad' },
            { label: 'CO recovery potential', value: '$420K', change: 'pending', changeTone: 'good' },
          ],
        },
        {
          kind: 'table',
          spec: {
            headers: ['Project', 'Budget', '% Used', '% Complete', 'Projected overrun', 'Recoverable via CO'],
            rows: [
              ['Parker Medical Tower', '$18.4M', '78%', '62%', '+$620K', '$240K (steel escalation)'],
              ['Riverwalk Hotel', '$24.2M', '92%', '78%', '+$340K', '$80K (scope add)'],
              ['Cedar Park Civic', '$8.6M', '74%', '61%', '+$120K', '$40K'],
              ['Horizon Industrial', '$12.1M', '68%', '59%', '+$60K', '$60K (design delay)'],
              ['Summit Tech Campus', '$32.0M', '41%', '38%', '+$40K', '—'],
            ],
          },
        },
        {
          kind: 'bullets',
          title: 'Change-order pipeline',
          items: [
            'Parker Medical: $240K steel escalation CO fully documented, awaiting owner signature.',
            'Riverwalk: $80K scope add CO drafted after 14 days of field coordination.',
            'Cedar Park: lag of 11 days on subcontractor productivity — under investigation.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Recover',
            buttons: [
              { label: 'Submit Parker Medical CO for approval', primary: true },
              { label: 'Accelerate Riverwalk CO sign-off' },
            ],
          },
        },
      ],
    },
    {
      id: 'c-oc-2',
      sidebarTitle: 'Idle-cost exposure on our fleet',
      persona: 'VP Operations · COO',
      userMessage: 'What\'s the idle-cost exposure on our fleet — by site?',
      assistantText:
        'Fleet carrying cost exposure: $84K/week across 14 idle pieces. 3 can be reassigned to active sites within 48 hours.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'Idle units', value: '14', change: 'of 86 total', changeTone: 'bad' },
            { label: 'Weekly carry', value: '$84K', change: '', changeTone: 'bad' },
            { label: 'Reassignable', value: '3', change: '$18K/wk savings', changeTone: 'good' },
            { label: 'Rental instead?', value: '5', change: 'weighing', changeTone: 'neutral' },
          ],
        },
        {
          kind: 'table',
          spec: {
            headers: ['Asset', 'Site', 'Idle days', 'Weekly carry', 'Recommended'],
            rows: [
              ['Crane Alpha-3', 'Cedar Park', '4', '$12K', 'Reassign to Horizon'],
              ['Excavator E-2', 'Summit Tech', '6', '$7K', 'Reassign to Riverwalk'],
              ['Boom Lift BL-7', 'Parker Med', '5', '$4K', 'Reassign to Cedar Park'],
              ['Concrete Pump CP-1', 'Horizon', '9', '$14K', 'Consider rental-out'],
              ['Scaffolding package', 'Summit Tech', '12', '$8K', 'Store + save $8K/wk'],
            ],
          },
        },
        {
          kind: 'bullets',
          title: 'Reassignment plan',
          items: [
            'Transport 3 assets on standard flatbed runs already scheduled this week.',
            'Update schedule + fleet tracker; notify PMs on both ends.',
            'Recover ~$18K/week of carrying cost starting next week.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Execute',
            buttons: [
              { label: 'Schedule 3 asset reassignments', primary: true },
              { label: 'List CP-1 on rental exchange' },
            ],
          },
        },
      ],
    },
    {
      id: 'c-oc-3',
      sidebarTitle: 'Change orders awaiting approval >14 days',
      persona: 'Project Controller',
      userMessage:
        'Change orders awaiting approval >14 days with revenue impact.',
      assistantText:
        '11 change orders over 14 days pending owner signature. Combined $682K at risk. Top 3 account for 72%.',
      assistantBlocks: [
        {
          kind: 'kpis',
          metrics: [
            { label: 'Pending COs', value: '11', change: '+3 WoW', changeTone: 'bad' },
            { label: 'Revenue at risk', value: '$682K', change: '', changeTone: 'bad' },
            { label: 'Avg age', value: '22 days', change: '', changeTone: 'bad' },
            { label: 'SLA breach', value: '7', change: 'vs contract', changeTone: 'bad' },
          ],
        },
        {
          kind: 'table',
          spec: {
            headers: ['CO', 'Project', 'Amount', 'Age', 'Owner', 'Blocked by'],
            rows: [
              ['CO-2026-042', 'Parker Medical', '$240K', '22d', 'Parker Med. Svcs', 'Owner counsel review'],
              ['CO-2026-051', 'Riverwalk Hotel', '$142K', '18d', 'Riverwalk LLC', 'Scope clarification'],
              ['CO-2026-037', 'Cedar Park Civic', '$112K', '26d', 'City of Cedar Park', 'Council agenda'],
              ['CO-2026-055', 'Horizon Industrial', '$80K', '16d', 'Horizon Inc.', 'Engineer review'],
              ['…7 others', '', '$108K', '', '', ''],
            ],
          },
        },
        {
          kind: 'bullets',
          title: 'Action plan',
          items: [
            'Dispatch PM-level escalation on the 3 largest COs this week.',
            'Flag CO-2026-037 for city council cycle (next agenda 2026-05-06).',
            'Send owner-ready packages for 5 COs waiting on re-formatting.',
          ],
        },
        {
          kind: 'action',
          spec: {
            title: 'Push through',
            buttons: [
              { label: 'Escalate top-3 COs to owner executives', primary: true },
              { label: 'Regenerate 5 re-format COs' },
            ],
          },
        },
      ],
    },
  ],
};

/**
 * Legacy flat export — kept so consumers that haven't migrated still compile.
 * New consumers should read `ottoConversationsByIndustry[industryId]`.
 */
export const ottoConversations: OttoConversation[] = ottoConversationsByIndustry.manufacturing;

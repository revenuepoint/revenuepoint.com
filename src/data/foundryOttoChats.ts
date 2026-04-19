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
  system: 'Salesforce' | 'SAP' | 'QuickBooks' | 'PioneerRx';
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

export const ottoConversations: OttoConversation[] = [
  // 1. KPI + line chart + insights + action
  {
    id: 'oc-1',
    sidebarTitle: 'Why are scripts down at Westside?',
    persona: 'Harborline',
    userMessage: 'Why are scripts down at Westside this week?',
    assistantText:
      'Westside dropped 18% week-over-week — 213 scripts vs 260 the prior week. Two things are driving it:',
    assistantBlocks: [
      {
        kind: 'kpis',
        metrics: [
          { label: 'Scripts', value: '213', change: '-18%', changeTone: 'bad' },
          { label: 'Prior week', value: '260', change: '', changeTone: 'neutral' },
          { label: 'Turnaround', value: '61h', change: '+4h', changeTone: 'bad' },
          { label: 'QC pass', value: '96.1%', change: '-0.8pp', changeTone: 'bad' },
        ],
      },
      {
        kind: 'line-chart',
        spec: {
          title: 'Westside · daily script volume, last 30 days',
          xLabels: ['Day 1', 'Day 8', 'Day 15', 'Day 22', 'Day 30'],
          series: [
            {
              name: 'Westside',
              color: '#2563eb',
              values: [40, 42, 45, 41, 44, 46, 43, 47, 44, 46, 48, 45, 49, 46, 48, 50, 47, 46, 48, 46, 44, 47, 45, 42, 34, 30, 32, 28, 30, 31],
            },
          ],
          highlightIndex: 24,
          highlightLabel: 'cliff',
        },
      },
      {
        kind: 'bullets',
        title: 'Root causes',
        items: [
          "Dr. Ramirez (top prescriber) hasn't sent Rx in 8 days — no OOO logged.",
          'Turnaround slid from 52h → 61h, missing the 44h target.',
          'Compounding team is 1 short on afternoon shift all week.',
        ],
      },
      {
        kind: 'action',
        spec: {
          title: 'Next steps',
          buttons: [
            { label: 'Draft outreach to Dr. Ramirez', primary: true },
            { label: 'Run Prism · Location Health' },
          ],
        },
      },
    ],
  },

  // 2. Record detail card
  {
    id: 'oc-2',
    sidebarTitle: 'Show me Meridian Packaging',
    persona: 'Manufacturing',
    userMessage: 'Show me Meridian Packaging',
    assistantText: 'Pulled from Salesforce. Flagged past due on AR.',
    assistantBlocks: [
      {
        kind: 'record',
        spec: {
          system: 'Salesforce',
          recordType: 'Account',
          recordId: 'ACC-00412',
          title: 'Meridian Packaging',
          status: 'Past Due',
          fields: [
            { label: 'Annual Revenue', value: '$218,400' },
            { label: 'Outstanding AR', value: '$47,200 · 62 days' },
            { label: 'Sales Rep', value: 'Marcus Torres' },
            { label: 'Open Orders', value: '2 (PO-8834, PO-8901)' },
            { label: 'Last Invoice', value: 'INV-4421 · Feb 3 · Unpaid' },
            { label: 'Credit Status', value: 'Under Review' },
          ],
        },
      },
      {
        kind: 'action',
        spec: {
          title: 'Actions',
          buttons: [
            { label: 'Draft collections email', primary: true },
            { label: 'View full account' },
          ],
        },
      },
    ],
  },

  // 3. KPI + table
  {
    id: 'oc-3',
    sidebarTitle: 'List overdue invoices > 30 days',
    persona: 'Finance',
    userMessage: 'List overdue invoices > 30 days',
    assistantText:
      'Four invoices past 30 days, total $77.5K. Meridian Builders is the oldest at 78 days.',
    assistantBlocks: [
      {
        kind: 'kpis',
        metrics: [
          { label: 'Total Overdue', value: '$77.5K', change: '', changeTone: 'bad' },
          { label: 'Invoices', value: '4', change: '', changeTone: 'neutral' },
          { label: 'Avg days late', value: '71', change: '', changeTone: 'bad' },
          { label: 'DSO', value: '42', change: '-8.2%', changeTone: 'good' },
        ],
      },
      {
        kind: 'table',
        spec: {
          headers: ['Invoice', 'Customer', 'Amount', 'Days Late', 'Terms'],
          rows: [
            ['INV-4821', 'Meridian Builders', '$34,200', '78', 'Net 30'],
            ['INV-4756', 'Coastal Fabrication', '$12,800', '72', 'Net 45'],
            ['INV-4690', 'Summit Industrial', '$8,450', '68', 'Net 30'],
            ['INV-4712', 'Valley Steel Works', '$22,100', '65', 'Net 30'],
          ],
        },
      },
      {
        kind: 'action',
        spec: {
          title: 'Collections actions',
          buttons: [
            { label: 'Send payment reminders', primary: true },
            { label: 'Generate AR aging report' },
          ],
        },
      },
    ],
  },

  // 4. Donut + narrative
  {
    id: 'oc-4',
    sidebarTitle: 'Q1 revenue by product line',
    persona: 'Manufacturing',
    userMessage: 'Summarize Q1 revenue by product line',
    assistantText:
      'Q1 closed at $2.84M across 5 product lines. Industrial Fasteners led; Safety Equipment fell.',
    assistantBlocks: [
      {
        kind: 'donut',
        spec: {
          title: 'Q1 Revenue Share',
          slices: [
            { label: 'Industrial Fasteners', value: 34, color: '#2563eb' },
            { label: 'Hydraulic Components', value: 22, color: '#059669' },
            { label: 'Safety Equipment', value: 18, color: '#d97706' },
            { label: 'Cutting Tools', value: 14, color: '#7c3aed' },
            { label: 'Raw Materials', value: 12, color: '#64748b' },
          ],
        },
      },
      {
        kind: 'text',
        paragraphs: [
          "Fasteners revenue held steady — Pacific NW Construction's Q2 reorder landed in the last week of the quarter, pulling forward ~$48K that would otherwise have slipped.",
          'Safety Equipment is down 11% QoQ, mostly driven by the Sierra Mining PPE renewal slipping into Q2. Expect recovery once the renewal closes.',
        ],
      },
      {
        kind: 'action',
        spec: {
          title: 'Go deeper',
          buttons: [
            { label: 'Generate Q1 narrative report', primary: true },
            { label: 'Forecast Q2' },
          ],
        },
      },
    ],
  },

  // 5. Anomaly explainer — chart + narrative + root-cause bullets
  {
    id: 'oc-5',
    sidebarTitle: 'Why did scrap rate spike on Line 3?',
    persona: 'Manufacturing',
    userMessage: 'Why did scrap rate spike on Line 3 last Tuesday?',
    assistantText:
      'Scrap on Line 3 hit 8.2% at 2 AM Tuesday — 340% above the 30-day baseline (1.9%).',
    assistantBlocks: [
      {
        kind: 'line-chart',
        spec: {
          title: 'Line 3 · scrap rate, last 30 days (%)',
          xLabels: ['Day 1', 'Day 8', 'Day 15', 'Day 22', 'Day 30'],
          series: [
            {
              name: 'Scrap %',
              color: '#ef4444',
              values: [1.8, 1.9, 2.0, 1.8, 1.9, 2.1, 1.9, 1.8, 2.0, 1.9, 1.8, 2.0, 1.9, 2.1, 1.8, 1.9, 2.0, 1.8, 1.9, 2.0, 1.8, 1.9, 2.0, 1.9, 8.2, 3.2, 2.4, 2.1, 2.0, 1.9],
            },
          ],
          highlightIndex: 24,
          highlightLabel: 'spike',
          goalValue: 2.0,
        },
      },
      {
        kind: 'text',
        paragraphs: [
          'The spike began exactly at shift change (2 AM). No maintenance event was logged, and no batch or raw-material lot had changed. Three signals correlate:',
        ],
      },
      {
        kind: 'bullets',
        items: [
          'Operator Marcus K. swapped in mid-shift (normally on Line 2).',
          'Upstream temp sensor T-204 drifted 4°C for 6 hours before the spike.',
          'Hydraulic pressure on station 3A dropped to 78% of nominal.',
        ],
      },
      {
        kind: 'action',
        spec: {
          title: 'Investigate',
          buttons: [
            { label: 'Open maintenance ticket for T-204', primary: true },
            { label: 'Compare operator scrap history' },
          ],
        },
      },
    ],
  },
];

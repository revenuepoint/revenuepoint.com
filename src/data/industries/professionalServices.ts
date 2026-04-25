import type { IndustryPageContent } from '@/types/industry';
import { standardPackaging } from './_shared';

export const professionalServices: IndustryPageContent = {
  id: 'professionalServices',
  slug: 'professional-services',
  navLabel: 'Professional Services',
  metaTitle: 'Salesforce for Professional Services',
  metaDescription:
    'Clean Salesforce + PSA for consulting, legal, and engineering firms — engagement financials, utilization heatmap, pipeline-to-staffing, and time & expense on one record page.',
  hero: {
    eyebrow: 'Industries · Professional Services',
    headline: 'Pipeline. Utilization. Margin. One view.',
    sub: 'RevenuePoint builds Salesforce for consulting, legal, and engineering firms — with engagement financials, a utilization heatmap, pipeline-to-staffing forecasting, and time & expense on one record page. Fully managed by RevenuePoint.',
  },
  painKpis: [
    {
      stat: '6–11 pts',
      label: 'of realization lost between time entry and invoice because data lives in three systems.',
      source: 'PS firm benchmark',
    },
    {
      stat: '62%',
      label: 'of firms cannot forecast resource capacity against next-quarter pipeline.',
      source: 'SPI Benchmark',
    },
    {
      stat: '14 days',
      label: 'average days-to-bill at mid-market firms — a month of WIP on the books.',
      source: 'PS ops discovery',
    },
    {
      stat: '3 days',
      label: 'partner prep time for a monthly firm review pulling data from three systems.',
      source: 'RevenuePoint discovery',
    },
  ],
  recordPage: {
    tabLabel: 'Engagements',
    objectLabel: 'Engagement',
    accountName: 'Meridian · Ridgeline Energy Restructuring',
    accountSub: 'Fixed-fee · $640K · 20 wks · lead partner K. Maru',
    highlights: [
      { label: 'Contract value', value: '$640K', tone: 'on-track' },
      { label: 'Billed', value: '$280K', tone: 'on-track' },
      { label: 'WIP', value: '$64K', tone: 'at-risk' },
      { label: 'Realization', value: '92%', tone: 'at-risk' },
      { label: 'Burn vs plan', value: '+4%', tone: 'at-risk' },
      { label: 'Margin', value: '31%', tone: 'on-track' },
    ],
    relatedLists: [
      {
        title: 'Related',
        items: [
          { label: 'Projects', count: 3 },
          { label: 'Milestones', count: 8 },
          { label: 'Timecards (wk)', count: 142 },
          { label: 'Assignments', count: 11 },
          { label: 'Deliverable__c', count: 6 },
          { label: 'Invoices', count: 4 },
          { label: 'Expenses', count: 38 },
        ],
      },
    ],
    components: [
      {
        id: 'engagement-fin',
        title: 'Engagement Financials',
        subtitle: 'WIP, realization, AR aging',
        source: 'NetSuite + Certinia',
        callout: {
          number: 1,
          description:
            'WIP, realization, billed and unbilled, and AR aging for the engagement — all on the record. No more opening the GL to answer a partner’s question.',
        },
        body: {
          kind: 'kpi-tiles',
          tiles: [
            { label: 'Billed', value: '$280K', delta: '44% of plan', deltaTone: 'on-track' },
            { label: 'WIP', value: '$64K', delta: '+12 days', deltaTone: 'at-risk' },
            { label: 'Realization', value: '92%', delta: '−3 pts', deltaTone: 'at-risk' },
            { label: 'AR aging', value: '$42K · 31–60', delta: '1 invoice', deltaTone: 'at-risk' },
          ],
        },
      },
      {
        id: 'utilization',
        title: 'Team Utilization',
        subtitle: 'Last 4 weeks · assigned resources',
        source: 'Certinia + Salesforce',
        callout: {
          number: 2,
          description:
            'Utilization for the resources assigned to this engagement, with target and available hours — so partners staff the right people for the next milestone.',
        },
        body: {
          kind: 'bar-rows',
          rows: [
            { label: 'M. Patel · Sr. consultant', value: 96, valueLabel: '96% · over target', tone: 'at-risk' },
            { label: 'J. Riemer · consultant', value: 82, valueLabel: '82% · on target', tone: 'on-track' },
            { label: 'S. Alves · analyst', value: 64, valueLabel: '64% · under', tone: 'neutral' },
            { label: 'K. Maru · partner', value: 45, valueLabel: '45% · on target', tone: 'on-track' },
          ],
        },
      },
      {
        id: 'pipeline-staffing',
        title: 'Pipeline → Staffing Forecast',
        subtitle: 'Next quarter',
        source: 'Certinia + Salesforce Opps',
        callout: {
          number: 3,
          description:
            'What the pipeline implies for headcount. The engagements closing next quarter mapped to the roles and weeks they will consume.',
        },
        body: {
          kind: 'table',
          headers: ['Role', 'Demand (hrs)', 'Capacity', 'Gap'],
          rows: [
            { cells: ['Sr. consultant', '2,400', '2,100', '−300 hrs'], tone: 'off-track' },
            { cells: ['Consultant', '3,200', '3,400', '+200 hrs'], tone: 'on-track' },
            { cells: ['Analyst', '1,800', '1,600', '−200 hrs'], tone: 'at-risk' },
          ],
        },
      },
      {
        id: 'te-quick',
        title: 'T&E Quick Entry',
        source: 'Certinia',
        callout: {
          number: 4,
          description:
            'Time and expense entry for this engagement directly from the record — consultants log hours without leaving the account.',
        },
        body: {
          kind: 'timeline',
          entries: [
            { label: 'M. Patel · 8h · 05/02', sub: 'Workstream 2 · discovery · approved', tone: 'on-track' },
            { label: 'J. Riemer · 6h · 05/02', sub: 'Workstream 1 · modeling · pending approval', tone: 'at-risk' },
            { label: 'Expense · travel · $840', sub: 'M. Patel · 04/29 · receipts attached', tone: 'on-track' },
          ],
        },
      },
    ],
    activity: [
      { label: 'Client comms', detail: 'Workstream 2 deliverable shared · awaiting review.', sub: '2 days ago' },
      { label: 'Foundry', detail: 'Flagged +4% budget burn vs plan · partner notified.', sub: '3 days ago' },
      { label: 'Invoice sent', detail: '$120K milestone invoice · DocuSign · paid 04/22.', sub: '2 weeks ago' },
    ],
    rightRailTile: {
      title: 'Engagement health',
      source: 'Foundry',
      lines: [
        { label: 'Risk score', value: 'Moderate', tone: 'at-risk' },
        { label: 'Client satisfaction', value: '4.3 / 5', tone: 'on-track' },
        { label: 'Deliverables on time', value: '5 of 6', tone: 'on-track' },
        { label: 'Write-off risk', value: 'Low', tone: 'on-track' },
      ],
    },
  },
  dataModel: {
    description:
      'Sales Cloud for pipeline, plus PSA (Certinia or Kantata) for projects, timecards, and resources. For legal firms we swap Engagement for Matter and add conflict-check workflow.',
    objects: [
      { name: 'Account', kind: 'standard' },
      { name: 'Opportunity', kind: 'standard' },
      { name: 'Project', kind: 'standard' },
      { name: 'Milestone', kind: 'standard' },
      { name: 'Timecard', kind: 'standard' },
      { name: 'Resource', kind: 'standard' },
      { name: 'Assignment', kind: 'standard' },
      { name: 'Engagement__c', kind: 'custom' },
      { name: 'Matter__c (legal)', kind: 'custom' },
      { name: 'Deliverable__c', kind: 'custom' },
      { name: 'Conflict_Check__c', kind: 'custom' },
      { name: 'Rate_Card__c', kind: 'custom' },
    ],
  },
  integrations: {
    description:
      'The GL stays authoritative; PSA runs projects, time, and resources; Salesforce ties pipeline to staffing. We wire them together so realization happens where the billable work lives.',
    systems: [
      { name: 'NetSuite', category: 'GL', role: 'Billing, AR, revenue recognition.' },
      { name: 'Sage Intacct', category: 'GL', role: 'Alternative GL with PS-friendly reporting.' },
      { name: 'QuickBooks', category: 'GL', role: 'Smaller-firm GL path.' },
      { name: 'Certinia', category: 'PSA', role: 'Projects, timecards, resources, revenue.' },
      { name: 'Kantata', category: 'PSA', role: 'Alternative PSA with strong resource planning.' },
      { name: 'DocuSign', category: 'Agreements', role: 'SOWs and engagement letters from the Opp.' },
      { name: 'Stripe', category: 'Payments', role: 'Retainer collection and card payments.' },
      { name: 'Mailchimp', category: 'Nurture', role: 'Thought leadership and prospect nurture.' },
    ],
  },
  lexComponents: [
    {
      id: 'realization',
      title: 'Realization by resource',
      source: 'Certinia',
      blurb: 'Realization by resource on the engagement — who is billing at rate and who is leaking.',
      body: {
        kind: 'bar-rows',
        rows: [
          { label: 'M. Patel', value: 96, valueLabel: '96% realized', tone: 'on-track' },
          { label: 'J. Riemer', value: 89, valueLabel: '89% realized', tone: 'at-risk' },
          { label: 'S. Alves', value: 81, valueLabel: '81% realized', tone: 'off-track' },
          { label: 'K. Maru', value: 100, valueLabel: '100% realized', tone: 'on-track' },
        ],
      },
    },
    {
      id: 'docusign-sow',
      title: 'DocuSign · SOWs in flight',
      source: 'DocuSign',
      blurb: 'Engagement letters and SOWs out for signature, with signer status.',
      body: {
        kind: 'timeline',
        entries: [
          { label: 'Change order · WS3', sub: 'Sent 05/01 · partial signed', tone: 'neutral' },
          { label: 'SOW · Phase 2', sub: 'Signed 04/18', tone: 'on-track' },
          { label: 'Engagement letter', sub: 'Signed 02/12', tone: 'on-track' },
        ],
      },
    },
    {
      id: 'stripe-retainer',
      title: 'Stripe · Retainers',
      source: 'Stripe',
      blurb: 'Retainer collection and advisory-on-demand billing against the account.',
      body: {
        kind: 'table',
        headers: ['Invoice', 'Amount', 'Cadence', 'Status'],
        rows: [
          { cells: ['RTR-2508', '$24,000', 'Monthly', 'Paid 05/01'], tone: 'on-track' },
          { cells: ['MS-2504', '$120,000', 'Milestone', 'Paid 04/22'], tone: 'on-track' },
          { cells: ['RTR-2507', '$24,000', 'Monthly', 'Paid 04/01'], tone: 'on-track' },
        ],
      },
    },
    {
      id: 'conflict-check',
      title: 'Conflict Check (legal)',
      source: 'Matter__c',
      blurb: 'Conflict search against parties, counsel, and related entities — logged on the matter.',
      body: {
        kind: 'field-list',
        fields: [
          { label: 'Run', value: '04/12 · clean', tone: 'on-track' },
          { label: 'Parties checked', value: '11' },
          { label: 'Related entities', value: '22' },
          { label: 'Approver', value: 'General counsel · signed' },
        ],
      },
    },
  ],
  useCases: [
    {
      title: 'Realization without the leaking invoice',
      pain: 'Hours get logged late, marked billable incorrectly, or written down without a trace. Realization drops by a point or two every cycle.',
      flow: [
        'Timecards sync from Certinia to the engagement with the billable flag and approver.',
        'Write-down reasons are tagged and reviewed weekly by the PM.',
        'Foundry flags engagements where realization is dropping against similar engagements.',
      ],
      outcome: 'Realization stops leaking silently because every cause is named and reviewed.',
    },
    {
      title: 'Staffing the pipeline before it closes',
      pain: 'Partners close the deal and then find out there are no senior consultants available for three weeks.',
      flow: [
        'Opportunity weighted revenue projects role-level hours by week.',
        'Capacity dashboard compares demand to available hours across practice areas.',
        'The staffing PM sees the gap four to six weeks out, not the week of kickoff.',
      ],
      outcome: 'Fewer kickoff delays. More client work starts on time because staffing is planned against real pipeline.',
    },
    {
      title: 'Engagement review without three spreadsheets',
      pain: 'Partner-level reviews require pulling from PSA, GL, and CRM separately — so they happen monthly at best.',
      flow: [
        'Foundry reads NetSuite, Certinia, and Salesforce on a schedule.',
        'Prism produces a weekly engagement review with variance, risk, and recommended action.',
        'Partners scan the list in 15 minutes; only the red ones get a meeting.',
      ],
      outcome: 'Partners review every engagement weekly instead of a third of them monthly.',
    },
  ],
  proofCard: {
    stat: '6–11 pts',
    sourceNote: 'PS realization gap benchmark',
    problem:
      'Mid-market firms lose six to eleven points of realization between time entry and invoice because data lives in three systems and nobody reconciles them in the same week.',
    fix: 'We put engagement financials on the record page, tag every write-down with a named reason, and let Foundry flag drift before the monthly close.',
    outcome: 'Realization becomes a managed number with named causes, not a month-end surprise.',
  },
  packaging: standardPackaging('Professional Services'),
  faqs: [
    {
      question: 'Certinia or Kantata — which PSA should we pick?',
      answer:
        'Both are strong and we implement both. Certinia (formerly FinancialForce) is native to Salesforce and fits firms already deep in the platform. Kantata has stronger resource planning for firms where scheduling is the dominant pain. We scope this in discovery.',
    },
    {
      question: 'How does this work for legal firms?',
      answer:
        'Engagement becomes Matter, Conflict_Check__c and intake workflow replace opportunity-to-SOW, and rate cards get per-client overrides. The record page pattern is the same; the object names and policies change.',
    },
    {
      question: 'Can we surface realization and write-down reasons in one place?',
      answer:
        'Yes. Write-down reasons are tagged on the timecard and surfaced on the engagement and in Foundry reports. Partners see the pattern by resource, engagement, and client.',
    },
    {
      question: 'Does Foundry replace our BI dashboards?',
      answer:
        'For PS firms, usually yes. Foundry delivers the engagement, utilization, realization, and pipeline-to-staffing views that your BI tool is being used to build today — fully managed, no report-builder maintenance.',
    },
  ],
};

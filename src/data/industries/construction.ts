import type { IndustryPageContent } from '@/types/industry';
import { standardPackaging } from './_shared';

export const construction: IndustryPageContent = {
  id: 'construction',
  slug: 'construction',
  navLabel: 'Construction & Contracting',
  metaTitle: 'Salesforce for Construction & Contracting',
  metaDescription:
    'Clean Salesforce for general contractors and specialty trades — bid pipeline, project margin, change order tracker, and sub compliance on one record page.',
  hero: {
    eyebrow: 'Industries · Construction & Contracting',
    headline: 'Bids. Projects. Margin. One record.',
    sub: 'RevenuePoint builds Salesforce for general contractors and specialty trades — with a bid pipeline, project margin, change order tracker, subcontractor compliance matrix, and punch-list console. Fully managed by RevenuePoint.',
  },
  painKpis: [
    {
      stat: '3–7%',
      label: 'of project revenue sits in unbilled change orders on growing-business builds.',
      source: 'FMI construction benchmark',
    },
    {
      stat: '11 days',
      label: 'typical lag between a budget burn and the monthly project review that catches it.',
      source: 'RevenuePoint discovery',
    },
    {
      stat: '42%',
      label: 'of subs have at least one compliance document lapsed at any given time.',
      source: 'Compliance benchmark',
    },
    {
      stat: '3 systems',
      label: 'a PM touches to pull job cost: Procore, the accounting system, and a spreadsheet.',
      source: 'Construction ops discovery',
    },
  ],
  recordPage: {
    tabLabel: 'Projects',
    objectLabel: 'Project',
    accountName: 'Pacific GC · Riverpointe Mixed-Use',
    accountSub: 'GMP · $22.4M · PM: D. Alvarez · 64% complete',
    highlights: [
      { label: 'Contract value', value: '$22.4M', tone: 'on-track' },
      { label: 'Earned value', value: '$14.3M', tone: 'on-track' },
      { label: 'Margin (forecast)', value: '9.8%', tone: 'at-risk' },
      { label: 'Change orders', value: '$680K open', tone: 'at-risk' },
      { label: 'Days to complete', value: '84', tone: 'neutral' },
      { label: 'Safety incidents YTD', value: '0', tone: 'on-track' },
    ],
    relatedLists: [
      {
        title: 'Related',
        items: [
          { label: 'Bids', count: 1 },
          { label: 'Subcontractors', count: 18 },
          { label: 'Change_Order__c', count: 14 },
          { label: 'Punch_List__c', count: 22 },
          { label: 'Daily_Log__c', count: 184 },
          { label: 'RFIs', count: 32 },
          { label: 'Draws', count: 8 },
        ],
      },
    ],
    components: [
      {
        id: 'bid-pipeline',
        title: 'Bid Pipeline · Go/No-Go',
        subtitle: 'Active bids this account / client',
        source: 'Salesforce + estimating',
        callout: {
          number: 1,
          description:
            'Active bids with the go/no-go scorecard (fit, margin, risk, timing, relationship). Estimating and operations align before chasing the wrong work.',
        },
        body: {
          kind: 'table',
          headers: ['Bid', 'Value', 'Margin', 'G/NG'],
          rows: [
            { cells: ['Riverside Medical', '$14.2M', '11%', 'Go · 82'], tone: 'on-track' },
            { cells: ['Lakeview Office', '$6.8M', '7%', 'Review · 61'], tone: 'at-risk' },
            { cells: ['Parkside School', '$9.4M', '4%', 'No-go · 42'], tone: 'off-track' },
          ],
        },
      },
      {
        id: 'margin-co',
        title: 'Project Margin + Change Orders',
        subtitle: 'Earned value vs plan',
        source: 'Sage 300 CRE + Salesforce',
        callout: {
          number: 2,
          description:
            'Earned value, committed cost, and change order status — reconciled to the accounting system and visible on the project.',
        },
        body: {
          kind: 'kpi-tiles',
          tiles: [
            { label: 'EV / PV', value: '0.96', delta: 'Slight schedule lag', deltaTone: 'at-risk' },
            { label: 'CPI', value: '0.94', delta: '−2 pts vs plan', deltaTone: 'at-risk' },
            { label: 'CO approved', value: '$1.24M', delta: '8 approved', deltaTone: 'on-track' },
            { label: 'CO open', value: '$680K', delta: '6 pending owner', deltaTone: 'at-risk' },
          ],
        },
      },
      {
        id: 'sub-compliance',
        title: 'Subcontractor Compliance',
        subtitle: 'Insurance, W-9, prequal · at a glance',
        source: 'Procore + Salesforce',
        callout: {
          number: 3,
          description:
            'Every active subcontractor on this project with compliance document status — insurance, W-9, prequal, safety. Missing docs block pay apps.',
        },
        body: {
          kind: 'table',
          headers: ['Subcontractor', 'Trade', 'Insurance', 'Prequal'],
          rows: [
            { cells: ['Cascade Steel', 'Structural', 'Current', 'OK'], tone: 'on-track' },
            { cells: ['Pacific Mech', 'Mech', 'Exp 05/15', 'OK'], tone: 'at-risk' },
            { cells: ['Northern Electric', 'Elec', 'Current', 'OK'], tone: 'on-track' },
            { cells: ['Ridge Concrete', 'Concrete', 'Expired', 'OK'], tone: 'off-track' },
          ],
        },
      },
      {
        id: 'punch-rfi',
        title: 'Punch List + RFI Queue',
        source: 'Procore',
        callout: {
          number: 4,
          description:
            'Active punch-list items and open RFIs with owner and days-open. Handoff quality is visible before closeout.',
        },
        body: {
          kind: 'timeline',
          entries: [
            { label: 'RFI-284 · facade detail', sub: '6 days open · awaiting arch response', tone: 'at-risk' },
            { label: 'Punch · unit 4B drywall', sub: 'Assigned Cascade · due 05/12', tone: 'on-track' },
            { label: 'RFI-281 · HVAC penetration', sub: 'Closed 05/01 · resolved', tone: 'on-track' },
            { label: 'Punch · lobby paint', sub: 'Assigned Pacific · overdue', tone: 'off-track' },
          ],
        },
      },
    ],
    activity: [
      { label: 'Daily log', detail: 'Crew: 42 · weather: clear · no incidents.', sub: 'Today' },
      { label: 'Owner meeting', detail: 'Approved CO-11 · declined CO-14 pending more info.', sub: '2 days ago' },
      { label: 'Foundry', detail: 'Flagged CPI dropping below 0.95 · PM notified.', sub: '3 days ago' },
    ],
    rightRailTile: {
      title: 'Project risk',
      source: 'Foundry',
      lines: [
        { label: 'Forecast final margin', value: '9.8%', tone: 'at-risk' },
        { label: 'Days over plan', value: '+4', tone: 'at-risk' },
        { label: 'Open RFIs (7d+)', value: '3', tone: 'at-risk' },
        { label: 'Safety trend', value: 'Stable', tone: 'on-track' },
      ],
    },
  },
  dataModel: {
    description:
      'Sales + Service Cloud at the core with construction-specific objects for projects, bids, subs, and change orders. Procore stays authoritative for documents, drawings, and RFIs.',
    objects: [
      { name: 'Account', kind: 'standard' },
      { name: 'Opportunity (Bid)', kind: 'standard' },
      { name: 'Contract', kind: 'standard' },
      { name: 'Work Order', kind: 'standard' },
      { name: 'Asset', kind: 'standard' },
      { name: 'Project__c', kind: 'custom' },
      { name: 'Bid__c', kind: 'custom' },
      { name: 'Subcontractor__c', kind: 'custom' },
      { name: 'Change_Order__c', kind: 'custom' },
      { name: 'Punch_List__c', kind: 'custom' },
      { name: 'Daily_Log__c', kind: 'custom' },
      { name: 'Pay_App__c', kind: 'custom' },
    ],
  },
  integrations: {
    description:
      'Procore stays the system of record for drawings, RFIs, daily logs, and documents. The construction GL stays authoritative for cost. Salesforce ties bid-to-cash with a clean workflow on top.',
    systems: [
      { name: 'Procore', category: 'PM platform', role: 'Drawings, RFIs, daily logs, docs, punch.' },
      { name: 'Autodesk Construction Cloud', category: 'PM platform', role: 'Alternative PM stack path.' },
      { name: 'Sage 300 CRE', category: 'Construction GL', role: 'Job cost, AP, payroll, pay apps.' },
      { name: 'Viewpoint Vista', category: 'Construction GL', role: 'Alternative construction GL.' },
      { name: 'Foundation', category: 'Construction GL', role: 'Smaller-firm construction GL path.' },
      { name: 'DocuSign', category: 'Agreements', role: 'Subcontracts, change orders, lien waivers.' },
      { name: 'Stripe', category: 'Payments', role: 'Deposits, smaller-dollar receivables.' },
      { name: '8x8', category: 'Communications', role: 'Dispatch, field radio, service lines.' },
    ],
  },
  lexComponents: [
    {
      id: 'cashflow',
      title: 'Project cash flow',
      source: 'Sage 300 CRE',
      blurb: 'Cash in (draws) against cash out (AP + payroll) for the project, by month.',
      body: {
        kind: 'bar-rows',
        rows: [
          { label: 'Mar net', value: 60, valueLabel: '+$420K', tone: 'on-track' },
          { label: 'Apr net', value: 45, valueLabel: '+$180K', tone: 'at-risk' },
          { label: 'May forecast', value: 30, valueLabel: '−$80K', tone: 'off-track' },
          { label: 'Jun forecast', value: 80, valueLabel: '+$640K', tone: 'on-track' },
        ],
      },
    },
    {
      id: 'docusign-lien',
      title: 'DocuSign · Lien waivers',
      source: 'DocuSign',
      blurb: 'Conditional and unconditional lien waiver status across subcontractors for the current pay period.',
      body: {
        kind: 'table',
        headers: ['Sub', 'Period', 'Type', 'Status'],
        rows: [
          { cells: ['Cascade Steel', 'Apr', 'Unconditional', 'Signed'], tone: 'on-track' },
          { cells: ['Pacific Mech', 'Apr', 'Conditional', 'Pending'], tone: 'at-risk' },
          { cells: ['Ridge Concrete', 'Apr', 'Conditional', 'Blocked · insurance'], tone: 'off-track' },
        ],
      },
    },
    {
      id: 'equipment',
      title: 'Equipment Utilization',
      source: 'Asset (telematics)',
      blurb: 'Owned equipment on this project with utilization vs idle hours.',
      body: {
        kind: 'field-list',
        fields: [
          { label: 'Loader · CAT 938K', value: '82% utilized', tone: 'on-track' },
          { label: 'Generator · 150kW', value: '34% utilized · idle cost', tone: 'at-risk' },
          { label: 'Crane · 50t', value: 'Scheduled 05/14' },
          { label: 'Forklift · 5t', value: '76% utilized', tone: 'on-track' },
        ],
      },
    },
    {
      id: '8x8-dispatch',
      title: '8x8 · Dispatch & Field',
      source: '8x8',
      blurb: 'Field radio and dispatch history for this project, logged to the record.',
      body: {
        kind: 'timeline',
        entries: [
          { label: 'Dispatch · electrical repair', sub: '05/02 · Northern Electric · 2 techs · resolved', tone: 'on-track' },
          { label: 'Owner call-in · schedule', sub: '04/28 · PM returned · 6 min', tone: 'on-track' },
          { label: 'Safety broadcast', sub: '04/22 · tie-off reminder · all acknowledged', tone: 'neutral' },
        ],
      },
    },
  ],
  useCases: [
    {
      title: 'Change order revenue that actually gets billed',
      pain: 'Change orders get signed in the field, noted in email, and sometimes never billed — or billed late at reduced scope.',
      flow: [
        'Change_Order__c captures scope, value, approver, and source the day it is raised.',
        'DocuSign signature flow closes the CO; the pay app includes it automatically.',
        'Foundry reports on unbilled COs by project and age so nothing ages past the claim window.',
      ],
      outcome: 'Unbilled CO revenue drops. What gets signed gets billed.',
    },
    {
      title: 'Subcontractor compliance that blocks risk, not cash',
      pain: 'Subs lapse insurance or prequal; PMs find out when a claim or audit forces a scramble.',
      flow: [
        'Subcontractor__c tracks insurance expiry, W-9, prequal, and safety rating.',
        'Compliance matrix on the project shows every sub at a glance; pay apps block when critical docs lapse.',
        'DocuSign renewal chases fire automatically with 30/14/7-day cadences.',
      ],
      outcome: 'Insurance gaps close before pay apps process. Audit and claim exposure drops.',
    },
    {
      title: 'Weekly project review that used to be monthly',
      pain: 'Monthly job cost reviews catch problems 11 days late; corrections cost more the later they come.',
      flow: [
        'Cost data syncs from Sage 300 CRE nightly; EV / CPI render on the project.',
        'Foundry fires when CPI trends below 0.95 and writes a weekly project narrative.',
        'Leadership reviews the list of flagged projects every Monday instead of all projects monthly.',
      ],
      outcome: 'Problems get caught in week one, not month two. Margin slippage goes down.',
    },
  ],
  proofCard: {
    stat: '3–7%',
    sourceNote: 'FMI unbilled change order benchmark',
    problem:
      'Three to seven percent of project revenue at growing-business builders sits in unbilled change orders. Signatures happen in the field, the CO never makes it into a pay app, and the money walks.',
    fix: 'We capture every change order the day it is raised, route it through DocuSign, and tie it to the pay app automatically. Foundry reports on unbilled CO aging by project every week.',
    outcome: 'Signed work gets billed. Margin leakage from unbilled COs goes down.',
  },
  packaging: standardPackaging('Construction'),
  faqs: [
    {
      question: 'Does this replace Procore?',
      answer:
        'No. Procore stays authoritative for drawings, RFIs, daily logs, and documents. Salesforce is the business-side workflow layer — bids, change orders, subcontractor compliance, owner communication, and reporting.',
    },
    {
      question: 'Which construction GLs do you integrate?',
      answer:
        'Sage 300 CRE, Viewpoint Vista, and Foundation are the three we run most often. Spectrum and CMiC are both supported but less common in our book.',
    },
    {
      question: 'Can we use this across multiple offices and divisions?',
      answer:
        'Yes. Division and office hierarchies work for multi-market GCs and specialty trades. Leadership sees rolled-up margin and backlog by office and division.',
    },
    {
      question: 'What about service work after handover?',
      answer:
        'Service Cloud handles service work with Work Orders tied to the Asset and building. Warranty tracking runs on the same Asset record.',
    },
  ],
};

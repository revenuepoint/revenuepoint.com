import type { IndustryPageContent } from '@/types/industry';
import { standardPackaging } from './_shared';

export const manufacturing: IndustryPageContent = {
  id: 'manufacturing',
  slug: 'manufacturing',
  navLabel: 'Manufacturing',
  metaTitle: 'Salesforce for Manufacturing',
  metaDescription:
    'Clean Salesforce for discrete and process manufacturers — ERP-synced inventory, Sales Agreement actuals, production status, and quality hotlists on one Lightning record page.',
  hero: {
    eyebrow: 'Industries · Manufacturing',
    headline: 'Your CRM and your ERP should agree.',
    sub: 'RevenuePoint builds a clean Salesforce instance for growing-business discrete and process manufacturers — with live SAP or NetSuite data, Sales Agreement actuals, production status, and quality holds on one record page. Fully managed by RevenuePoint.',
  },
  painKpis: [
    {
      stat: '76%',
      label: 'of growing-business manufacturers reconcile ERP shipments against CRM forecasts in spreadsheets every month.',
      source: 'RevenuePoint client discovery, 2024–26',
    },
    {
      stat: '3 of 5',
      label: 'Sales Agreements miss forecast accuracy targets because actuals live in the ERP, not the CRM.',
      source: 'Mfg Cloud benchmark',
    },
    {
      stat: '42%',
      label: 'of service cases open without the right asset, warranty, or install history attached.',
      source: 'Service Cloud audit data',
    },
    {
      stat: '11 hrs',
      label: 'lost per plant per week reconciling production data into a weekly ops review.',
      source: 'Client time studies',
    },
  ],
  recordPage: {
    tabLabel: 'Accounts',
    objectLabel: 'Account',
    accountName: 'Vantage Industrial Supply',
    accountSub: 'Tier 1 Distributor · Midwest · Relationship since 2019',
    highlights: [
      { label: 'Sales Agreement', value: '$4.2M · YTD', tone: 'on-track' },
      { label: 'Actual vs Plan', value: '−6.1%', tone: 'at-risk' },
      { label: 'OTIF (90d)', value: '93.4%', tone: 'on-track' },
      { label: 'Open Cases', value: '3', tone: 'at-risk' },
      { label: 'Installed Assets', value: '184', tone: 'neutral' },
      { label: 'Credit Status', value: 'On Watch', tone: 'at-risk' },
    ],
    relatedLists: [
      {
        title: 'Related',
        items: [
          { label: 'Sales Agreements', count: 2 },
          { label: 'Orders', count: 47 },
          { label: 'Production Orders__c', count: 12 },
          { label: 'Quality Holds__c', count: 1 },
          { label: 'Assets (installed)', count: 184 },
          { label: 'Cases', count: 3 },
          { label: 'Contacts', count: 11 },
        ],
      },
    ],
    components: [
      {
        id: 'sales-agreement',
        title: 'Sales Agreement — Actuals vs Plan',
        subtitle: 'FY26 Master Agreement · renews 09/15',
        source: 'SAP S/4HANA via MuleSoft',
        callout: {
          number: 1,
          description:
            'Live shipment actuals from SAP roll up against the signed Sales Agreement plan. Account owners see variance without opening the ERP.',
        },
        body: {
          kind: 'bar-rows',
          rows: [
            { label: 'Fasteners · M-Series', value: 92, valueLabel: '92% of plan', tone: 'on-track' },
            { label: 'Fasteners · H-Series', value: 78, valueLabel: '78% of plan', tone: 'at-risk' },
            { label: 'Fittings · Stainless', value: 104, valueLabel: '104% of plan', tone: 'on-track' },
            { label: 'Brackets · Custom', value: 61, valueLabel: '61% of plan', tone: 'off-track' },
          ],
        },
      },
      {
        id: 'inventory-po',
        title: 'ERP Inventory + Open POs',
        subtitle: 'On-hand across 3 plants',
        source: 'SAP S/4HANA',
        callout: {
          number: 2,
          description:
            'On-hand inventory and open purchase orders for this account’s active SKUs — rolled up from SAP by plant. No tab-switching to quote.',
        },
        body: {
          kind: 'table',
          headers: ['SKU', 'On-hand', 'Open PO', 'ETA'],
          rows: [
            { cells: ['FAS-M8-316', '4,120', '2,000', '05/14'], tone: 'on-track' },
            { cells: ['FAS-H12-C', '620', '1,500', '05/09'], tone: 'at-risk' },
            { cells: ['FIT-S-3/8', '11,800', '0', '—'], tone: 'on-track' },
            { cells: ['BRK-CUST-4B', '0', '0', 'On hold'], tone: 'off-track' },
          ],
        },
      },
      {
        id: 'production',
        title: 'Production Orders · OEE trend',
        subtitle: 'Plant 2 · Line 4 (this account’s primary)',
        source: 'MES + SAP',
        callout: {
          number: 3,
          description:
            'Production order status for the line that runs this customer’s SKUs — with OEE, scrap, and downtime from the MES over the last 14 days.',
        },
        body: {
          kind: 'kpi-tiles',
          tiles: [
            { label: 'OEE (14d)', value: '71.2%', delta: '−3.4 pts', deltaTone: 'at-risk' },
            { label: 'Scrap', value: '2.8%', delta: '+0.6 pts', deltaTone: 'off-track' },
            { label: 'On-time', value: '88%', delta: 'flat', deltaTone: 'neutral' },
            { label: 'WIP orders', value: '12', delta: '3 late', deltaTone: 'at-risk' },
          ],
        },
      },
      {
        id: 'quality',
        title: 'Quality Holds · Asset hotlist',
        source: 'Salesforce + SAP QM',
        callout: {
          number: 4,
          description:
            'Open Quality Holds and NCRs tied to installed assets at this customer — so field service arrives with the right context.',
        },
        body: {
          kind: 'timeline',
          entries: [
            {
              label: 'NCR-2418 · Bracket dim variance',
              sub: 'Hold on lot 0425-B · 48 units · root cause pending',
              tone: 'off-track',
            },
            {
              label: 'NCR-2411 · Surface finish',
              sub: 'Contained · credit issued · closed 04/18',
              tone: 'on-track',
            },
            {
              label: 'Asset inspection due',
              sub: 'Line 7 press — 08/11 · scheduled with tech D. Alvarez',
              tone: 'neutral',
            },
          ],
        },
      },
    ],
    activity: [
      {
        label: 'Email · K. Nguyen',
        detail: 'Asked about Q3 H-Series allocation and bracket hold timeline.',
        sub: '2 hours ago',
      },
      {
        label: 'Call · 8x8',
        detail: 'Dispatch confirmed tech on-site 08/11 for press inspection.',
        sub: 'Yesterday',
      },
      {
        label: 'Agent · Otto',
        detail: 'Flagged −6.1% variance on FY26 Sales Agreement · notified owner.',
        sub: '2 days ago',
      },
    ],
    rightRailTile: {
      title: 'Customer concentration',
      source: 'Foundry',
      lines: [
        { label: 'Rank in revenue', value: '#7', tone: 'neutral' },
        { label: 'YoY change', value: '+14%', tone: 'on-track' },
        { label: '% of plant 2 load', value: '32%', tone: 'at-risk' },
        { label: 'Concentration risk', value: 'Moderate', tone: 'at-risk' },
      ],
    },
  },
  dataModel: {
    description:
      'We build on Manufacturing Cloud where it fits, Sales + Service Cloud where it does not. Custom objects cover the shop-floor data Salesforce does not ship natively.',
    objects: [
      { name: 'Account', kind: 'standard' },
      { name: 'Contact', kind: 'standard' },
      { name: 'Opportunity', kind: 'standard' },
      { name: 'Sales Agreement', kind: 'standard' },
      { name: 'Account Forecast', kind: 'standard' },
      { name: 'Order', kind: 'standard' },
      { name: 'Product', kind: 'standard' },
      { name: 'Asset', kind: 'standard' },
      { name: 'Work Order', kind: 'standard' },
      { name: 'Case', kind: 'standard' },
      { name: 'Production_Order__c', kind: 'custom' },
      { name: 'BOM__c', kind: 'custom' },
      { name: 'Quality_Hold__c', kind: 'custom' },
      { name: 'Plant__c', kind: 'custom' },
      { name: 'Defect_Log__c', kind: 'custom' },
      { name: 'Shift_Report__c', kind: 'custom' },
    ],
  },
  integrations: {
    description:
      'SAP stays the system of record for production and inventory. Salesforce is where your team works. We wire the two so data matches on both sides — and keep it that way.',
    systems: [
      { name: 'SAP S/4HANA', category: 'ERP', role: 'Production, inventory, AR/AP, Sales Agreement actuals.' },
      { name: 'SAP Business One', category: 'ERP', role: 'Mid-market SAP line — same data contract.' },
      { name: 'NetSuite', category: 'ERP', role: 'Alternative ERP path for smaller plants.' },
      { name: 'MES', category: 'Shop floor', role: 'OEE, downtime, scrap, production orders — live.' },
      { name: '8x8', category: 'Communications', role: 'Inside sales + dealer support, logged to the Account.' },
      { name: 'DocuSign', category: 'Agreements', role: 'MSAs, NDAs, Sales Agreements signed from Salesforce.' },
      { name: 'Stripe', category: 'Payments', role: 'Smaller-dollar orders billed and reconciled against AR.' },
      { name: 'Pardot', category: 'Marketing', role: 'Distributor campaigns and channel partner nurture.' },
    ],
  },
  lexComponents: [
    {
      id: 'sap-inventory-tile',
      title: 'SAP Open Purchase Orders',
      source: 'SAP S/4HANA',
      blurb: 'A Lightning tile that lists open POs for the SKUs this account buys, with ETAs.',
      body: {
        kind: 'table',
        headers: ['PO#', 'Vendor', 'SKU', 'Qty', 'ETA'],
        rows: [
          { cells: ['4500123', 'Steelcraft', 'FAS-H12-C', '1,500', '05/09'], tone: 'at-risk' },
          { cells: ['4500118', 'MetalWorks', 'FAS-M8-316', '2,000', '05/14'], tone: 'on-track' },
          { cells: ['4500102', 'Precision Ltd', 'BRK-CUST-4B', '400', 'On hold'], tone: 'off-track' },
        ],
      },
    },
    {
      id: 'otif-kpis',
      title: 'OTIF + Perfect Order Score',
      source: 'SAP + MES',
      blurb: 'Rolling 90-day on-time-in-full and perfect-order performance for this account.',
      body: {
        kind: 'kpi-tiles',
        tiles: [
          { label: 'OTIF 90d', value: '93.4%', delta: '+1.2 pts', deltaTone: 'on-track' },
          { label: 'Perfect Order', value: '87.9%', delta: '−0.4 pts', deltaTone: 'at-risk' },
          { label: 'Avg lead time', value: '6.2 days', delta: 'flat', deltaTone: 'neutral' },
          { label: 'First-time-right', value: '96.1%', delta: '+0.8 pts', deltaTone: 'on-track' },
        ],
      },
    },
    {
      id: 'stripe-smalldollar',
      title: 'Stripe · Smaller-dollar orders',
      source: 'Stripe',
      blurb: 'Recent Stripe charges against this account — for sample and one-off orders paid on card.',
      body: {
        kind: 'table',
        headers: ['Date', 'Description', 'Amount', 'Status'],
        rows: [
          { cells: ['05/02', 'Sample pack · H-Series', '$412', 'Paid'], tone: 'on-track' },
          { cells: ['04/19', 'Rush order · brackets', '$2,180', 'Paid'], tone: 'on-track' },
          { cells: ['04/08', 'Sample pack · stainless', '$89', 'Refunded'], tone: 'at-risk' },
        ],
      },
    },
    {
      id: 'docusign-agreements',
      title: 'DocuSign · Agreements in flight',
      source: 'DocuSign',
      blurb: 'Active agreements sent for signature from this account, with status and signers.',
      body: {
        kind: 'timeline',
        entries: [
          { label: 'FY26 Sales Agreement renewal', sub: 'Sent 04/21 · 1 of 2 signed', tone: 'at-risk' },
          { label: 'Credit limit increase NDA', sub: 'Completed 03/30', tone: 'on-track' },
          { label: 'Quality addendum', sub: 'Draft — not yet sent', tone: 'neutral' },
        ],
      },
    },
  ],
  useCases: [
    {
      title: 'Sales Agreement forecast accuracy',
      pain: 'Finance signs Sales Agreements in the ERP; sellers track pipeline in the CRM; nobody trusts either number.',
      flow: [
        'Sync SAP Sales Agreement plan + shipment actuals into the Account record.',
        'Install the actuals-vs-plan component on the record page + account forecast list view.',
        'Foundry fires a watcher when variance crosses ±8% on a signed agreement.',
      ],
      outcome: 'Account owners see variance on the Account — the same number finance sees.',
    },
    {
      title: 'Service case → installed asset context',
      pain: 'Field techs show up without knowing which asset, lot, or warranty the case relates to.',
      flow: [
        'Install Asset hierarchy with lot, warranty, and install date from SAP.',
        'Auto-link inbound cases to the serial or lot the customer cites.',
        '8x8 dispatch logs the call and the tech arrives with the right parts.',
      ],
      outcome: 'First-time-fix rate improves because the context is on the case, not in a shared drive.',
    },
    {
      title: 'Quote to ERP sales order',
      pain: 'Orders are re-keyed from Salesforce into SAP, which creates quantity, pricing, and ship-to errors.',
      flow: [
        'CPQ → Order in Salesforce, then a managed pipeline creates the SAP sales order.',
        'Order confirmation, ship date, and invoice flow back onto the Account.',
        'Exception queue surfaces the few that fail validation for human review.',
      ],
      outcome: 'Zero re-keying. Order accuracy improves, and the seller sees the ship date without asking.',
    },
  ],
  proofCard: {
    stat: '76%',
    sourceNote: 'Mid-market manufacturers — RevenuePoint discovery, 2024–26',
    problem:
      'Three in four growing-business manufacturers still reconcile ERP shipments against CRM forecasts in spreadsheets every month. The Sales Agreement is signed in SAP; the pipeline lives in Salesforce; nobody believes either number on the board deck.',
    fix: 'We build one Sales Agreement actuals-vs-plan component on the Account record, fed live from SAP. Foundry watches variance and surfaces the accounts drifting off plan before the monthly review.',
    outcome: 'Sellers and finance look at the same number. Variance gets caught in week two, not month three.',
  },
  packaging: standardPackaging('Manufacturing'),
  faqs: [
    {
      question: 'Do we need Manufacturing Cloud, or can we do this on Sales Cloud?',
      answer:
        'Both work. Manufacturing Cloud gives you Sales Agreements and Account Forecasts out of the box and is the right call if you have signed volume contracts. Sales Cloud + custom objects is the right call for order-by-order business. We scope this in week one of Foundation.',
    },
    {
      question: 'Which ERPs do you integrate?',
      answer:
        'SAP S/4HANA and SAP Business One are the paths we run most often. NetSuite, Acumatica, and Microsoft Dynamics are all production integrations we maintain. MES depends on your plant — we have worked with Plex, Epicor Kinetic, and several homegrown systems.',
    },
    {
      question: 'What does the integration layer run on?',
      answer:
        'MuleSoft is the default for SAP; for smaller plants we run iPaaS on Workato or a managed Node service, depending on volume. RevenuePoint operates the pipeline — you do not need to hire an integration engineer.',
    },
    {
      question: 'Can Foundry sit on top of this?',
      answer:
        'Yes. Foundry reads the same SAP and Salesforce data that powers the record page, then delivers live dashboards, AI analysis on demand, and agents that propose, get approved, and execute across both systems. Foundry is fully managed by RevenuePoint — the same RevenuePoint team that runs your Salesforce.',
    },
    {
      question: 'How long before the record page is live?',
      answer:
        'Foundation is four weeks: discovery in week one, build in weeks two and three, UAT and go-live in week four. First users are on it by the end of the month.',
    },
  ],
};

import type { IndustryPageContent } from '@/types/industry';
import { standardPackaging } from './_shared';

export const foodBeverage: IndustryPageContent = {
  id: 'foodBeverage',
  slug: 'food-beverage',
  navLabel: 'Food & Beverage',
  metaTitle: 'Salesforce for Food & Beverage',
  metaDescription:
    'Clean Salesforce Consumer Goods Cloud for food and beverage — depletion vs plan, trade promotion ROI, field-rep visit planning, and lot traceability on one record page.',
  hero: {
    eyebrow: 'Industries · Food & Beverage',
    headline: 'Depletion. Trade. Lots. One view.',
    sub: 'RevenuePoint builds Salesforce for food and beverage brands — with distributor depletion against plan, trade promotion ROI, field-rep visit capture, and lot/recall traceability on one record page. Fully managed by RevenuePoint.',
  },
  painKpis: [
    {
      stat: '67%',
      label: 'of growing-business CPG brands cannot attribute trade lift to a specific promotion.',
      source: 'CPG trade spend benchmark',
    },
    {
      stat: '#2',
      label: 'trade spend ranks as a P&L line — behind COGS — for most brands.',
      source: 'CPG financial benchmark',
    },
    {
      stat: '4–6 weeks',
      label: 'typical lag between a promotion and the depletion report that measures it.',
      source: 'RevenuePoint discovery',
    },
    {
      stat: '3 systems',
      label: 'a brand manager touches to answer "did the promo work at this chain?"',
      source: 'Sales ops discovery',
    },
  ],
  recordPage: {
    tabLabel: 'Accounts',
    objectLabel: 'Account',
    accountName: 'Greenfield Roasting · Whole Foods · Pacific NW',
    accountSub: 'Retail chain · 32 stores · distributor: UNFI · relationship since 2020',
    highlights: [
      { label: 'YTD shipments', value: '$1.42M', tone: 'on-track' },
      { label: 'Depletion YTD', value: '$1.18M', tone: 'at-risk' },
      { label: 'Depletion vs plan', value: '−8%', tone: 'at-risk' },
      { label: 'Promo live', value: '2', tone: 'neutral' },
      { label: 'Open ACV', value: '68%', tone: 'on-track' },
      { label: 'Last recall', value: 'None', tone: 'on-track' },
    ],
    relatedLists: [
      {
        title: 'Related',
        items: [
          { label: 'Orders', count: 124 },
          { label: 'Trade_Promotion__c', count: 4 },
          { label: 'Retail Store', count: 32 },
          { label: 'Visit', count: 28 },
          { label: 'Distributor_Depletion__c', count: 48 },
          { label: 'Lot__c', count: 184 },
          { label: 'Promotion', count: 6 },
        ],
      },
    ],
    components: [
      {
        id: 'depletion',
        title: 'Depletion vs Plan',
        subtitle: 'By SKU · last 8 weeks',
        source: 'VIP / UNFI depletion feed',
        callout: {
          number: 1,
          description:
            'Distributor depletion data against the account plan — by SKU, by week. Brand managers see where lift landed and where it did not.',
        },
        body: {
          kind: 'bar-rows',
          rows: [
            { label: 'Signature dark roast', value: 105, valueLabel: '+5% vs plan', tone: 'on-track' },
            { label: 'Single origin ethiopia', value: 82, valueLabel: '−18% vs plan', tone: 'off-track' },
            { label: 'Cold brew concentrate', value: 118, valueLabel: '+18% vs plan', tone: 'on-track' },
            { label: 'Decaf house blend', value: 74, valueLabel: '−26% vs plan', tone: 'off-track' },
          ],
        },
      },
      {
        id: 'promo-roi',
        title: 'Trade Promotion ROI',
        subtitle: 'Active + recent · lift attribution',
        source: 'NetSuite + depletion feed',
        callout: {
          number: 2,
          description:
            'Lift versus baseline for every active and recent promotion — with the cost, incremental volume, and ROI attached.',
        },
        body: {
          kind: 'table',
          headers: ['Promo', 'Live', 'Lift', 'ROI'],
          rows: [
            { cells: ['Spring brew · $2 off', '04/15 – 05/15', '+22%', '1.4x'], tone: 'on-track' },
            { cells: ['Cold brew endcap', '04/01 – 04/30', '+41%', '2.1x'], tone: 'on-track' },
            { cells: ['Decaf feature', '03/11 – 04/08', '+3%', '0.6x'], tone: 'off-track' },
          ],
        },
      },
      {
        id: 'visit',
        title: 'Field-Rep Visit Planner',
        subtitle: 'Next 2 weeks · by store',
        source: 'Consumer Goods Cloud',
        callout: {
          number: 3,
          description:
            'Upcoming store visits with the tasks each rep will execute — order capture, planogram check, display audit, and depletion review.',
        },
        body: {
          kind: 'timeline',
          entries: [
            { label: 'Store #1418 · 05/07', sub: 'Rep M. Ochoa · order + promo check', tone: 'on-track' },
            { label: 'Store #1221 · 05/08', sub: 'Rep M. Ochoa · endcap audit', tone: 'neutral' },
            { label: 'Store #1102 · 05/10', sub: 'Rep D. Blake · planogram reset', tone: 'neutral' },
            { label: 'Store #1418 · 04/24', sub: 'Completed · no OOS, order placed', tone: 'on-track' },
          ],
        },
      },
      {
        id: 'lot',
        title: 'Lot / Recall Lookup',
        source: 'Lot__c',
        callout: {
          number: 4,
          description:
            'Every lot shipped to this account with production date, BBD, and recall status — so traceability is a query, not an emergency.',
        },
        body: {
          kind: 'field-list',
          fields: [
            { label: 'Last lot shipped', value: 'L-2540 · Dark roast', tone: 'on-track' },
            { label: 'Best by', value: '10/22/26' },
            { label: 'Open recalls', value: 'None', tone: 'on-track' },
            { label: 'Recall history (24mo)', value: '1 · voluntary · 2024' },
          ],
        },
      },
    ],
    activity: [
      { label: 'Rep visit', detail: 'M. Ochoa · 04/24 · order placed for 3 SKUs.', sub: '2 weeks ago' },
      { label: 'Promo start', detail: 'Spring brew promo live 04/15 across chain.', sub: '3 weeks ago' },
      { label: 'Foundry', detail: 'Flagged decaf depletion −26% vs plan · review queued.', sub: '3 days ago' },
    ],
    rightRailTile: {
      title: 'Distribution health',
      source: 'Foundry',
      lines: [
        { label: 'ACV', value: '68%', tone: 'on-track' },
        { label: 'Distribution voids', value: '4 stores', tone: 'at-risk' },
        { label: 'OOS rate', value: '2.1%', tone: 'on-track' },
        { label: 'Promo adoption', value: '28 / 32 stores', tone: 'on-track' },
      ],
    },
  },
  dataModel: {
    description:
      'Consumer Goods Cloud (or Manufacturing Cloud where agreements dominate) gives us the retail execution model. We add trade promotion, depletion, and lot objects.',
    objects: [
      { name: 'Account', kind: 'standard' },
      { name: 'Visit', kind: 'standard' },
      { name: 'Retail Store', kind: 'standard' },
      { name: 'Product', kind: 'standard' },
      { name: 'Order', kind: 'standard' },
      { name: 'Promotion', kind: 'standard' },
      { name: 'Sales Agreement', kind: 'standard' },
      { name: 'Trade_Promotion__c', kind: 'custom' },
      { name: 'Distributor_Depletion__c', kind: 'custom' },
      { name: 'Lot__c', kind: 'custom' },
      { name: 'Recall__c', kind: 'custom' },
      { name: 'Planogram_Audit__c', kind: 'custom' },
    ],
  },
  integrations: {
    description:
      'ERP stays authoritative for orders and COGS. Distributor feeds and retail point-of-sale feed depletion. We wire both into Salesforce so brand managers see lift, not lag.',
    systems: [
      { name: 'SAP Business One', category: 'ERP', role: 'Orders, COGS, BOM, lot production.' },
      { name: 'NetSuite', category: 'ERP', role: 'Alternative ERP with CPG-friendly reporting.' },
      { name: 'Acumatica', category: 'ERP', role: 'Distribution-edition path for smaller brands.' },
      { name: 'VIP / iDIG', category: 'Depletion (bev-alc)', role: 'Distributor depletion data aggregator.' },
      { name: 'Encompass', category: 'Depletion', role: 'Bev-alc reporting for wine and spirits.' },
      { name: 'ShipStation', category: 'Fulfillment', role: 'DTC fulfillment and carrier events.' },
      { name: 'Stripe', category: 'Payments', role: 'DTC collection and recurring subscription.' },
      { name: 'Mailchimp', category: 'Trade comms', role: 'Broker and retailer updates, promo launches.' },
    ],
  },
  lexComponents: [
    {
      id: 'distribution-void',
      title: 'Distribution Void Finder',
      source: 'Depletion feed',
      blurb: 'Stores in this account carrying fewer SKUs than their cluster — the voids worth closing.',
      body: {
        kind: 'table',
        headers: ['Store', 'SKUs carried', 'Cluster avg', 'Gap'],
        rows: [
          { cells: ['#1102', '4 of 8', '7', '−3'], tone: 'off-track' },
          { cells: ['#1221', '5 of 8', '7', '−2'], tone: 'at-risk' },
          { cells: ['#1418', '8 of 8', '7', '+1'], tone: 'on-track' },
        ],
      },
    },
    {
      id: 'promo-forecast',
      title: 'Promo lift forecast',
      source: 'Foundry',
      blurb: 'Predicted lift for planned promotions based on historical performance at similar stores.',
      body: {
        kind: 'kpi-tiles',
        tiles: [
          { label: 'Planned', value: '$48K' },
          { label: 'Predicted lift', value: '+28%', delta: 'within band', deltaTone: 'on-track' },
          { label: 'Predicted ROI', value: '1.8x', delta: 'above target', deltaTone: 'on-track' },
          { label: 'Confidence', value: 'Medium', deltaTone: 'neutral' },
        ],
      },
    },
    {
      id: 'stripe-dtc',
      title: 'Stripe · DTC Subscription',
      source: 'Stripe',
      blurb: 'Subscription revenue from this brand’s DTC channel, with churn and LTV signals.',
      body: {
        kind: 'field-list',
        fields: [
          { label: 'Active subs', value: '1,842', tone: 'on-track' },
          { label: 'MRR', value: '$38,420', tone: 'on-track' },
          { label: 'Churn (monthly)', value: '3.1%', tone: 'on-track' },
          { label: 'LTV · 12mo', value: '$214' },
        ],
      },
    },
    {
      id: 'mailchimp-broker',
      title: 'Mailchimp · Broker updates',
      source: 'Mailchimp',
      blurb: 'Broker and retailer campaign engagement for new launches and promo calendars.',
      body: {
        kind: 'table',
        headers: ['Campaign', 'Sent', 'Open', 'Click'],
        rows: [
          { cells: ['Spring promo · brokers', '04/08', '68%', '24%'], tone: 'on-track' },
          { cells: ['Cold brew launch', '03/21', '71%', '31%'], tone: 'on-track' },
          { cells: ['Q2 pricing', '03/01', '62%', '12%'], tone: 'at-risk' },
        ],
      },
    },
  ],
  useCases: [
    {
      title: 'Close the distribution void gap',
      pain: 'Brand sees ACV in aggregate but cannot tell which stores are light on SKU count versus their cluster.',
      flow: [
        'Depletion and store-level POS sync into Retail Store records.',
        'A report compares each store’s SKU count against its cluster average.',
        'Field reps see the void list ranked by ROI potential for their next route.',
      ],
      outcome: 'Void closure becomes the specific work on every route, not a quarterly wishlist.',
    },
    {
      title: 'Trade promotion that proves its ROI',
      pain: 'Promotions run, incremental revenue shows up, but attribution to the specific program is hand-wavy.',
      flow: [
        'Trade_Promotion__c captures the promotion design, cost, and affected stores.',
        'Foundry matches depletion against a matched-store baseline for lift measurement.',
        'The promo ROI report fires at the end of each promo without a human pulling data.',
      ],
      outcome: 'Trade spend becomes a managed investment with an ROI measurement attached to each program.',
    },
    {
      title: 'Lot traceability when the call comes',
      pain: 'A recall or carrier freeze requires finding every account and store that received a specific lot — hours of spreadsheet work.',
      flow: [
        'Lot__c tracks each lot to every shipment, order, and store delivered to.',
        'Recall query returns the complete distribution list instantly.',
        'Outreach campaign fires to brokers and retailers with the specific action required.',
      ],
      outcome: 'Recall response drops from a day of scramble to an hour of execution.',
    },
  ],
  proofCard: {
    stat: '67%',
    sourceNote: 'CPG trade spend attribution benchmark',
    problem:
      'Two-thirds of growing-business CPG brands cannot attribute trade lift to a specific promotion. Trade spend — the second-biggest line on the P&L — gets approved on feel, not measured on outcome.',
    fix: 'We capture promotion design in Trade_Promotion__c, then let Foundry match depletion against a baseline to measure lift. ROI reports fire per promo without analyst pulls.',
    outcome: 'Trade spend becomes a measured investment. Decisions about renewing, cutting, or scaling each program get made with numbers.',
  },
  packaging: standardPackaging('Food & Beverage'),
  faqs: [
    {
      question: 'Is Consumer Goods Cloud the right starting point?',
      answer:
        'For most brands, yes. It ships with Visit, Retail Store, Promotion, and Sales Agreement out of the box. For brands running volume contracts with retailers, Manufacturing Cloud is also a good fit; we scope this in discovery.',
    },
    {
      question: 'Do you integrate beverage alcohol depletion feeds?',
      answer:
        'Yes. VIP (iDIG) and Encompass are both production integrations. For non-alcohol, we work with UNFI and KeHE data directly and with retailer POS feeds where available.',
    },
    {
      question: 'What about route-to-market complexity (broker, distributor, direct)?',
      answer:
        'The model handles all three — and hybrids. Broker and distributor accounts have different object relationships, and we configure the hierarchy during build.',
    },
    {
      question: 'Can Foundry write the board deck on trade performance?',
      answer:
        'Yes. Prism writes a monthly trade performance narrative with promo-by-promo ROI, distribution movement, and recommendations on where to cut and where to scale.',
    },
  ],
};

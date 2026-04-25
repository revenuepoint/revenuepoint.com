import type { IndustryPageContent } from '@/types/industry';
import { standardPackaging } from './_shared';

export const distribution: IndustryPageContent = {
  id: 'distribution',
  slug: 'distribution',
  navLabel: 'Distribution & 3PL',
  metaTitle: 'Salesforce for Distribution & 3PL',
  metaDescription:
    'Clean Salesforce for mid-market distributors and 3PLs — ERP-synced inventory, shipment tracking, margin-by-account, and claims console on one Lightning record page.',
  hero: {
    eyebrow: 'Industries · Distribution & 3PL',
    headline: 'Sell from one screen. Not six.',
    sub: 'RevenuePoint builds a clean Salesforce for distributors and 3PLs — ERP-synced inventory across every warehouse, live shipment tracking, margin by customer, and a claims console. Fully managed by RevenuePoint.',
  },
  painKpis: [
    {
      stat: '3–5%',
      label: 'of annual revenue leaks through backorder that the CRM never sees.',
      source: 'Industry benchmark, distribution',
    },
    {
      stat: '68%',
      label: 'of reps quote from stale price lists because tier pricing lives in the ERP.',
      source: 'RevenuePoint discovery',
    },
    {
      stat: '47 days',
      label: 'average DSO at mid-market distributors — two weeks beyond terms.',
      source: 'NACM benchmark',
    },
    {
      stat: '11%',
      label: 'of orders need a manual ETA call to the warehouse — every day.',
      source: 'Client time studies',
    },
  ],
  recordPage: {
    tabLabel: 'Accounts',
    objectLabel: 'Account',
    accountName: 'Cascade Industrial Distribution',
    accountSub: 'Tier 2 Customer · Pacific NW · Relationship since 2021',
    highlights: [
      { label: 'YTD Revenue', value: '$1.28M', tone: 'on-track' },
      { label: 'Margin', value: '24.1%', tone: 'on-track' },
      { label: 'DSO', value: '52 days', tone: 'at-risk' },
      { label: 'Open Orders', value: '14', tone: 'neutral' },
      { label: 'Backorder $', value: '$42K', tone: 'at-risk' },
      { label: 'Credit', value: '$150K / $75K used', tone: 'on-track' },
    ],
    relatedLists: [
      {
        title: 'Related',
        items: [
          { label: 'Orders', count: 312 },
          { label: 'Shipments__c', count: 298 },
          { label: 'Opportunities', count: 4 },
          { label: 'Cases · RMA', count: 2 },
          { label: 'Contacts', count: 8 },
          { label: 'Price Tier', count: 1 },
          { label: 'Warehouses used', count: 3 },
        ],
      },
    ],
    components: [
      {
        id: 'open-backorder',
        title: 'Open Orders + Backorder',
        subtitle: 'By warehouse · live from NetSuite',
        source: 'NetSuite',
        callout: {
          number: 1,
          description:
            'Every open order, shipment status, and backorder line for this account — rolled up from NetSuite by warehouse. No more "let me check the ERP" on a call.',
        },
        body: {
          kind: 'table',
          headers: ['Order', 'Warehouse', 'Status', 'ETA', 'Value'],
          rows: [
            { cells: ['SO-10241', 'Seattle', 'Picking', '05/07', '$12,400'], tone: 'on-track' },
            { cells: ['SO-10239', 'Portland', 'Backorder', '05/14', '$8,900'], tone: 'at-risk' },
            { cells: ['SO-10231', 'Tacoma', 'Shipped', 'Delivered 05/02', '$21,100'], tone: 'on-track' },
            { cells: ['SO-10228', 'Seattle', 'Short · 2 SKUs', 'Partial', '$6,340'], tone: 'off-track' },
          ],
        },
      },
      {
        id: 'inventory-rollup',
        title: 'Multi-Warehouse Inventory',
        subtitle: 'SKUs this account buys most',
        source: 'NetSuite + WMS',
        callout: {
          number: 2,
          description:
            'On-hand inventory across every warehouse, filtered to the SKUs this customer actually orders. Reps see what they can promise today.',
        },
        body: {
          kind: 'bar-rows',
          rows: [
            { label: 'SKU 4412 · Seattle', value: 860, valueLabel: '860 on hand', tone: 'on-track' },
            { label: 'SKU 4412 · Portland', value: 120, valueLabel: '120 on hand', tone: 'at-risk' },
            { label: 'SKU 7781 · Tacoma', value: 0, valueLabel: '0 · BO 200', tone: 'off-track' },
            { label: 'SKU 2209 · Seattle', value: 3400, valueLabel: '3,400 on hand', tone: 'on-track' },
          ],
        },
      },
      {
        id: 'shipment-timeline',
        title: 'Shipment Tracking',
        subtitle: 'Carrier-agnostic · last 5 shipments',
        source: 'Project44 + ShipStation',
        callout: {
          number: 3,
          description:
            'Live shipment events from Project44 and ShipStation — carrier, ETA, exceptions — without swivel-chairing to the carrier portal.',
        },
        body: {
          kind: 'timeline',
          entries: [
            { label: 'SO-10241 · Out for delivery', sub: 'FedEx · 05/07 11:20am', tone: 'on-track' },
            { label: 'SO-10239 · Delay · weather', sub: 'Old Dominion · ETA slipped 2 days', tone: 'at-risk' },
            { label: 'SO-10231 · Delivered', sub: 'UPS · POD signed D. Chen · 05/02', tone: 'on-track' },
            { label: 'SO-10225 · In transit', sub: 'XPO · on schedule · 05/09', tone: 'neutral' },
          ],
        },
      },
      {
        id: 'claims',
        title: 'Claims & RMA Console',
        source: 'Salesforce',
        callout: {
          number: 4,
          description:
            'Active claims and RMAs tied to this customer, with credit memo status pulled from NetSuite and aging.',
        },
        body: {
          kind: 'table',
          headers: ['Claim', 'Type', 'Aging', 'Credit'],
          rows: [
            { cells: ['RMA-817', 'Short ship', '4 days', 'Pending'], tone: 'at-risk' },
            { cells: ['RMA-812', 'Damage in transit', '11 days', 'Issued'], tone: 'on-track' },
          ],
        },
      },
    ],
    activity: [
      { label: 'Email · buyer', detail: 'Needs ETA on SKU 7781 backorder.', sub: 'This morning' },
      { label: 'EDI', detail: '850 received · 23 lines · auto-converted to SO-10241.', sub: 'Yesterday' },
      { label: 'Call · 8x8', detail: 'Inside sales returned ETA question · 7 min.', sub: '3 days ago' },
    ],
    rightRailTile: {
      title: 'Customer profitability',
      source: 'Foundry',
      lines: [
        { label: 'Margin vs tier avg', value: '+2.1 pts', tone: 'on-track' },
        { label: 'Gross profit YTD', value: '$309K', tone: 'on-track' },
        { label: 'Claim rate', value: '1.8%', tone: 'neutral' },
        { label: 'Payment behavior', value: 'Slower', tone: 'at-risk' },
      ],
    },
  },
  dataModel: {
    description:
      'Sales + Service Cloud at the core, with custom objects for shipments, warehouse inventory, and carrier rates. EDI, WMS, and 3PL data sync on a managed schedule.',
    objects: [
      { name: 'Account', kind: 'standard' },
      { name: 'Contact', kind: 'standard' },
      { name: 'Opportunity', kind: 'standard' },
      { name: 'Order', kind: 'standard' },
      { name: 'Order Product', kind: 'standard' },
      { name: 'Contract', kind: 'standard' },
      { name: 'Asset', kind: 'standard' },
      { name: 'Case', kind: 'standard' },
      { name: 'Shipment__c', kind: 'custom' },
      { name: 'Warehouse__c', kind: 'custom' },
      { name: 'SKU_Inventory__c', kind: 'custom' },
      { name: 'Carrier_Rate__c', kind: 'custom' },
      { name: 'Price_Tier__c', kind: 'custom' },
      { name: 'RMA__c', kind: 'custom' },
    ],
  },
  integrations: {
    description:
      'Your ERP and WMS stay authoritative. We wire the data into Salesforce so reps, AR, and customer service all work from the same live numbers.',
    systems: [
      { name: 'SAP Business One', category: 'ERP', role: 'Inventory, orders, AR/AP, tiered pricing.' },
      { name: 'NetSuite', category: 'ERP', role: 'Mid-market alternative with strong inventory.' },
      { name: 'Acumatica', category: 'ERP', role: 'Distribution-edition path for smaller firms.' },
      { name: 'ShipStation', category: 'Shipping', role: 'Label generation + carrier events.' },
      { name: 'Project44', category: 'Visibility', role: 'Multi-carrier ETA and exception feeds.' },
      { name: 'SPS Commerce', category: 'EDI', role: 'Inbound 850/855/856/810 document flow.' },
      { name: 'Stripe', category: 'Payments', role: 'B2B ACH and card collection reconciled to AR.' },
      { name: '8x8', category: 'Communications', role: 'Inside sales contact center, logged to Account.' },
    ],
  },
  lexComponents: [
    {
      id: 'edi-intake',
      title: 'EDI Intake Queue',
      source: 'SPS Commerce',
      blurb: 'Inbound 850 purchase orders waiting to convert to Salesforce orders, with validation state.',
      body: {
        kind: 'table',
        headers: ['PO#', 'Customer', 'Lines', 'State'],
        rows: [
          { cells: ['PO-55412', 'Cascade · EDI', '23', 'Auto-converted'], tone: 'on-track' },
          { cells: ['PO-55411', 'Cascade · EDI', '6', 'Price mismatch'], tone: 'at-risk' },
          { cells: ['PO-55409', 'Cascade · EDI', '14', 'Auto-converted'], tone: 'on-track' },
        ],
      },
    },
    {
      id: 'carrier-rates',
      title: 'Best-rate carrier',
      source: 'Project44',
      blurb: 'Live rate comparison for the ship-to address on this order, with service level.',
      body: {
        kind: 'bar-rows',
        rows: [
          { label: 'FedEx Ground', value: 42, valueLabel: '$42.10 · 3 days', tone: 'on-track' },
          { label: 'UPS Ground', value: 45, valueLabel: '$45.80 · 3 days', tone: 'neutral' },
          { label: 'Old Dominion LTL', value: 118, valueLabel: '$118 · 2 days', tone: 'neutral' },
        ],
      },
    },
    {
      id: 'stripe-collect',
      title: 'Stripe · Collections',
      source: 'Stripe',
      blurb: 'Invoices sent for ACH and card collection, with current status.',
      body: {
        kind: 'table',
        headers: ['Invoice', 'Amount', 'Due', 'Status'],
        rows: [
          { cells: ['INV-9921', '$12,400', '05/07', 'Sent'], tone: 'on-track' },
          { cells: ['INV-9918', '$6,800', '04/22', '15 days past'], tone: 'at-risk' },
          { cells: ['INV-9905', '$21,100', '04/14', 'Paid · ACH'], tone: 'on-track' },
        ],
      },
    },
    {
      id: 'mailchimp-engagement',
      title: 'Mailchimp · Engagement',
      source: 'Mailchimp',
      blurb: 'Recent campaigns this account received and whether contacts engaged.',
      body: {
        kind: 'field-list',
        fields: [
          { label: 'Last campaign', value: 'Spring promo · 04/28' },
          { label: 'Open rate (this account)', value: '54%', tone: 'on-track' },
          { label: 'Click rate', value: '12%', tone: 'on-track' },
          { label: 'Unsubscribes', value: '0', tone: 'on-track' },
        ],
      },
    },
  ],
  useCases: [
    {
      title: 'Inbound EDI → Salesforce order',
      pain: 'Big-box customers send 850s that sit in an EDI portal, then get re-keyed into the ERP by an operations analyst.',
      flow: [
        'SPS Commerce drops 850s into Salesforce as candidate orders.',
        'Managed pipeline validates price, ship-to, and inventory; converts on match.',
        'Exceptions route to a queue with the reason attached for a human to resolve.',
      ],
      outcome: 'EDI processing goes from a half-day analyst job to an exception queue.',
    },
    {
      title: 'Credit hold that does not punish the wrong customer',
      pain: 'Reps sell against credit limits the ERP quietly tightened without telling them.',
      flow: [
        'Credit status and aging sync from NetSuite to the Account.',
        'Orders entering production check the live credit; holds are flagged before picking.',
        'AR and the account owner get the same alert — and the same context — at the same moment.',
      ],
      outcome: 'Fewer surprise holds. The ones that happen get resolved faster because both sides see the same data.',
    },
    {
      title: 'Margin by customer, by SKU',
      pain: 'Reps defend prices without knowing the customer’s true margin — which lives in ERP cost data nobody exposes.',
      flow: [
        'Standard and landed cost sync to the product record.',
        'Margin-by-account and margin-by-SKU components installed on the record page.',
        'Foundry reports rank accounts by margin contribution each month.',
      ],
      outcome: 'Reps negotiate with the same numbers their CFO sees.',
    },
  ],
  proofCard: {
    stat: '3–5%',
    sourceNote: 'Distribution backorder leakage benchmark',
    problem:
      'Three to five percent of annual revenue at mid-market distributors leaks through backorder that the CRM never sees. Reps promise dates the warehouse cannot hit; customers place the next order somewhere else.',
    fix: 'We sync multi-warehouse inventory and open POs into the Account record, install a backorder watcher, and let Foundry surface the accounts whose order velocity is dropping before the rep notices.',
    outcome: 'Reps quote dates the warehouse can actually hit. Backorder velocity becomes a weekly conversation, not a quarterly surprise.',
  },
  packaging: standardPackaging('Distribution & 3PL'),
  faqs: [
    {
      question: 'We run SAP Business One — is that a good fit?',
      answer:
        'Yes. SAP B1 is one of the paths we run most often in mid-market distribution. We maintain the integration layer so SAP stays the system of record for inventory and AR, and Salesforce stays where your reps work.',
    },
    {
      question: 'Do you support 3PL operations specifically?',
      answer:
        'Yes. 3PL clients get additional objects for Client, Client SKU, and Client Rate, plus integrations with their customers’ EDI and WMS. The pattern is the same — clean record page, live integrations, fully managed.',
    },
    {
      question: 'What about our existing CPQ?',
      answer:
        'We work with Salesforce CPQ, SAP-native CPQ, and a handful of third-party configurators. The record page reads from whichever one your team already uses.',
    },
    {
      question: 'Can Foundry track backorder across all our customers at once?',
      answer:
        'Yes. Foundry reads the same inventory and order data and delivers a live backorder-leakage report at the account and SKU level, plus watcher agents that fire on drop-off.',
    },
  ],
};

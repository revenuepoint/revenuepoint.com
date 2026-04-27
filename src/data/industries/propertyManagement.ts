import type { IndustryPageContent } from '@/types/industry';
import { standardPackaging } from './_shared';

export const propertyManagement: IndustryPageContent = {
  id: 'propertyManagement',
  slug: 'property-management',
  navLabel: 'Property Management & Real Estate',
  metaTitle: 'Salesforce for Property Management & Real Estate',
  metaDescription:
    'Clean Salesforce for property managers and real estate operators — occupancy heatmap, lease renewal pipeline, maintenance console, and resident ledger on one record page.',
  hero: {
    eyebrow: 'Industries · Property Management & Real Estate',
    headline: 'Units. Leases. Work orders. One source.',
    sub: 'RevenuePoint builds Salesforce for property managers and real estate operators — with a live occupancy heatmap, lease renewal pipeline, maintenance work-order console, and resident ledger. Fully managed by RevenuePoint.',
  },
  painKpis: [
    {
      stat: '22%',
      label: 'of resident turnover could be prevented with 60-day renewal visibility.',
      source: 'NAA turnover benchmark',
    },
    {
      stat: '30 days',
      label: 'typical renewal visibility at growing-business PMs — too late to save the lease.',
      source: 'RevenuePoint discovery',
    },
    {
      stat: '$1,400',
      label: 'average turnover cost per unit — more than a month of rent.',
      source: 'NAA benchmark',
    },
    {
      stat: '3 systems',
      label: 'a PM leader opens for one portfolio review: ledger, maintenance, leasing.',
      source: 'RevenuePoint discovery',
    },
  ],
  recordPage: {
    tabLabel: 'Properties',
    objectLabel: 'Property',
    accountName: 'Rivercrest Apartments · 142 units · Portland',
    accountSub: 'Owner: Rivercrest Holdings · Class B · stabilized',
    highlights: [
      { label: 'Occupancy', value: '94.4%', tone: 'on-track' },
      { label: 'Trailing NOI', value: '$218K/mo', tone: 'on-track' },
      { label: 'Renewals next 60d', value: '22', tone: 'at-risk' },
      { label: 'Delinquent $', value: '$14.8K', tone: 'at-risk' },
      { label: 'Open WOs', value: '11', tone: 'neutral' },
      { label: 'Last inspection', value: '04/02 · pass', tone: 'on-track' },
    ],
    relatedLists: [
      {
        title: 'Related',
        items: [
          { label: 'Unit__c', count: 142 },
          { label: 'Lease__c', count: 134 },
          { label: 'Work_Order__c · open', count: 11 },
          { label: 'Inspection__c', count: 12 },
          { label: 'Opportunities · renewal', count: 22 },
          { label: 'Cases · resident', count: 4 },
          { label: 'Vendors', count: 8 },
        ],
      },
    ],
    components: [
      {
        id: 'occupancy',
        title: 'Occupancy + Lease Expiration',
        subtitle: 'Next 120 days by month',
        source: 'Yardi',
        callout: {
          number: 1,
          description:
            'Forward-looking occupancy with lease expirations stacked by month. Asset managers see the cliff before it forms.',
        },
        body: {
          kind: 'bar-rows',
          rows: [
            { label: 'May · expiring', value: 8, valueLabel: '8 leases', tone: 'on-track' },
            { label: 'Jun · expiring', value: 14, valueLabel: '14 leases · heavy', tone: 'at-risk' },
            { label: 'Jul · expiring', value: 22, valueLabel: '22 leases · cliff', tone: 'off-track' },
            { label: 'Aug · expiring', value: 6, valueLabel: '6 leases', tone: 'on-track' },
          ],
        },
      },
      {
        id: 'renewal-pipeline',
        title: 'Renewal Pipeline',
        subtitle: 'By unit · with renewal probability',
        source: 'Salesforce + Yardi',
        callout: {
          number: 2,
          description:
            'Every lease expiring in the next 120 days with a renewal probability, rent-change ask, and outreach status.',
        },
        body: {
          kind: 'table',
          headers: ['Unit', 'Expires', 'Ask', 'Status'],
          rows: [
            { cells: ['B-214', '06/30', '+4.0%', 'Sent 05/01'], tone: 'on-track' },
            { cells: ['C-108', '07/15', '+3.5%', 'No response 14d'], tone: 'at-risk' },
            { cells: ['A-302', '07/28', '+5.0%', 'Countered at flat'], tone: 'at-risk' },
            { cells: ['B-119', '06/14', '+3.0%', 'Signed 05/02'], tone: 'on-track' },
          ],
        },
      },
      {
        id: 'maintenance',
        title: 'Maintenance · Work Orders',
        subtitle: 'Active · by trade',
        source: 'AppFolio',
        callout: {
          number: 3,
          description:
            'Open work orders by trade and unit, with SLA timer and vendor assignment.',
        },
        body: {
          kind: 'timeline',
          entries: [
            { label: 'WO-8812 · HVAC · B-214', sub: 'Vendor assigned · ETA 05/07', tone: 'on-track' },
            { label: 'WO-8810 · Plumbing · C-108', sub: '48h SLA · 6h remaining', tone: 'at-risk' },
            { label: 'WO-8806 · Pest · A-302', sub: 'Escalated · resident case', tone: 'off-track' },
            { label: 'WO-8804 · Appliance · B-119', sub: 'Completed 04/28', tone: 'on-track' },
          ],
        },
      },
      {
        id: 'ledger',
        title: 'Resident Ledger · Delinquency',
        source: 'Yardi',
        callout: {
          number: 4,
          description:
            'Delinquency aging rolled up from the ledger to the property, with automated resident outreach status.',
        },
        body: {
          kind: 'bar-rows',
          rows: [
            { label: '0–30 days', value: 8, valueLabel: '$6.2K · 4 units', tone: 'at-risk' },
            { label: '31–60 days', value: 5, valueLabel: '$5.1K · 2 units', tone: 'off-track' },
            { label: '61–90 days', value: 2, valueLabel: '$2.4K · 1 unit', tone: 'off-track' },
            { label: '90+ days · legal', value: 1, valueLabel: '$1.1K · legal', tone: 'off-track' },
          ],
        },
      },
    ],
    activity: [
      { label: 'Email · resident B-214', detail: 'Accepted renewal terms.', sub: 'Today' },
      { label: 'Inspection', detail: 'Annual inspection passed · no items.', sub: '04/02' },
      { label: 'Foundry agent', detail: 'Flagged C-108 as lapse risk · owner task created.', sub: '3 days ago' },
    ],
    rightRailTile: {
      title: 'NOI vs underwriting',
      source: 'Foundry',
      lines: [
        { label: 'Current NOI', value: '$218K/mo', tone: 'on-track' },
        { label: 'Underwritten NOI', value: '$214K/mo', tone: 'neutral' },
        { label: 'Variance', value: '+1.9%', tone: 'on-track' },
        { label: 'Expense ratio', value: '42%', tone: 'on-track' },
      ],
    },
  },
  dataModel: {
    description:
      'Sales + Service Cloud at the core, extended with property, unit, lease, and work-order objects. Yardi, AppFolio, or RealPage stays the ledger of record.',
    objects: [
      { name: 'Account', kind: 'standard' },
      { name: 'Contact', kind: 'standard' },
      { name: 'Opportunity (Lease)', kind: 'standard' },
      { name: 'Asset (Unit)', kind: 'standard' },
      { name: 'Case', kind: 'standard' },
      { name: 'Property__c', kind: 'custom' },
      { name: 'Unit__c', kind: 'custom' },
      { name: 'Lease__c', kind: 'custom' },
      { name: 'Work_Order__c', kind: 'custom' },
      { name: 'Inspection__c', kind: 'custom' },
      { name: 'Vendor__c', kind: 'custom' },
      { name: 'Turnover_Cost__c', kind: 'custom' },
    ],
  },
  integrations: {
    description:
      'The property management platform (Yardi, AppFolio, RealPage) stays authoritative for ledger and accounting. Salesforce is where leasing, renewals, maintenance, and owner communication happen.',
    systems: [
      { name: 'Yardi', category: 'PM platform', role: 'Ledger, accounting, rent roll, unit data.' },
      { name: 'AppFolio', category: 'PM platform', role: 'Ledger + work-order feeds for growing-business PMs.' },
      { name: 'RealPage', category: 'PM platform', role: 'Enterprise PM platform path.' },
      { name: 'Buildium', category: 'PM platform', role: 'Smaller-portfolio alternative.' },
      { name: 'Stripe', category: 'Payments', role: 'Rent, deposits, and application fees.' },
      { name: 'DocuSign', category: 'Agreements', role: 'Lease signing from the Lease record.' },
      { name: '8x8', category: 'Communications', role: 'Leasing call center and resident support.' },
      { name: 'Mailchimp', category: 'Resident comms', role: 'Newsletters and community updates.' },
    ],
  },
  lexComponents: [
    {
      id: 'renewal-score',
      title: 'Renewal Risk Score',
      source: 'Foundry + Yardi',
      blurb: 'Model-scored renewal probability for the unit, with contributing signals.',
      body: {
        kind: 'kpi-tiles',
        tiles: [
          { label: 'Renewal probability', value: '48%', delta: 'at risk', deltaTone: 'at-risk' },
          { label: 'Ledger signal', value: 'One late', delta: 'Mar · 6d late', deltaTone: 'at-risk' },
          { label: 'Maintenance signal', value: 'Elevated', delta: '3 WOs · 6mo', deltaTone: 'at-risk' },
          { label: 'Ask gap', value: '−2.0 pts', delta: 'below market', deltaTone: 'neutral' },
        ],
      },
    },
    {
      id: 'docusign-lease',
      title: 'DocuSign · Lease in flight',
      source: 'DocuSign',
      blurb: 'Renewal packets and new lease documents with signature status.',
      body: {
        kind: 'timeline',
        entries: [
          { label: 'Renewal · B-214', sub: 'Sent 05/01 · signed 05/02', tone: 'on-track' },
          { label: 'Renewal · C-108', sub: 'Sent 04/18 · not opened', tone: 'at-risk' },
          { label: 'New lease · A-410', sub: 'Sent 04/30 · partially signed', tone: 'neutral' },
        ],
      },
    },
    {
      id: 'stripe-rent',
      title: 'Stripe · Rent Collection',
      source: 'Stripe',
      blurb: 'Rent, late fees, and deposits collected via Stripe with method mix.',
      body: {
        kind: 'table',
        headers: ['Month', 'Collected', 'Method', 'Late fees'],
        rows: [
          { cells: ['May MTD', '$186K', 'ACH 72% / Card', '$340'], tone: 'on-track' },
          { cells: ['Apr', '$198K', 'ACH 74% / Card', '$520'], tone: 'on-track' },
          { cells: ['Mar', '$201K', 'ACH 70% / Card', '$740'], tone: 'at-risk' },
        ],
      },
    },
    {
      id: 'vendor-score',
      title: 'Vendor Scorecard',
      source: 'Work_Order__c',
      blurb: 'Vendor performance across this property — SLA hit rate, cost, and re-dispatch.',
      body: {
        kind: 'table',
        headers: ['Vendor', 'Trade', 'SLA hit', 'Re-dispatch'],
        rows: [
          { cells: ['Cascade HVAC', 'HVAC', '96%', '2%'], tone: 'on-track' },
          { cells: ['Pacific Plumb', 'Plumbing', '84%', '8%'], tone: 'at-risk' },
          { cells: ['Clean Co', 'Janitorial', '98%', '0%'], tone: 'on-track' },
        ],
      },
    },
  ],
  useCases: [
    {
      title: 'Renewal pipeline — 90 / 60 / 30 days out',
      pain: 'Renewal conversations start 30 days before expiry — too late to save a unit that has already decided to leave.',
      flow: [
        'Lease expirations sync from Yardi into Lease__c with the projected renewal date.',
        'Pipeline opportunities are generated 90 days out with a renewal risk score.',
        'Automated DocuSign packets go out at 60 days; escalations fire at 30 days unopened.',
      ],
      outcome: 'Renewal visibility extends to 90 days, and lapse rate drops because the right leases get human attention early.',
    },
    {
      title: 'Maintenance SLA that leadership can see',
      pain: 'Work orders sit in the PM platform; residents call and complain when SLA is missed — nobody sees the pattern until an owner asks.',
      flow: [
        'Work_Order__c syncs from AppFolio with SLA timer and trade category.',
        'Lightning component on the property shows active WOs and vendor hit rate.',
        'Foundry dashboards compare vendor SLA performance across the portfolio.',
      ],
      outcome: 'Missed SLAs become a managed metric, and vendor rotation decisions have data behind them.',
    },
    {
      title: 'Owner reporting without the Monday scramble',
      pain: 'Owner reports take two days at month-end because data is pulled from the ledger, maintenance, and leasing separately.',
      flow: [
        'Foundry reads Yardi, maintenance, and leasing data on a schedule.',
        'Prism writes a monthly owner report with NOI variance, occupancy, renewal pipeline, and narrative.',
        'Asset managers review a draft the morning of the first.',
      ],
      outcome: 'Owner reporting drops from two days to two hours of review.',
    },
  ],
  proofCard: {
    stat: '22%',
    sourceNote: 'NAA turnover benchmark',
    problem:
      'About 22% of resident turnover at growing-business PMs could be prevented with earlier renewal visibility. Most PMs do not see expirations beyond 30 days — which is after residents have already decided.',
    fix: 'We sync lease expirations 120 days out, score each for renewal risk, and fire DocuSign packets plus staff outreach at 60 and 30 days. Foundry surfaces the portfolio-level pipeline every Monday.',
    outcome: 'Renewal visibility extends to 90 days. Preventable turnover turns into saved leases and steadier NOI.',
  },
  packaging: standardPackaging('Property Management'),
  faqs: [
    {
      question: 'Does this replace Yardi or AppFolio?',
      answer:
        'No. The PM platform stays authoritative for ledger and accounting. Salesforce is the workflow layer on top — leasing, renewals, work orders, resident communications, and owner reporting all run there, with the ledger data visible in context.',
    },
    {
      question: 'Can we run this across multiple owners / portfolios?',
      answer:
        'Yes. The model supports multiple ownership entities, GP/LP structures, and mixed fee and equity arrangements. Owner_Report__c templates handle per-owner reporting requirements.',
    },
    {
      question: 'What about commercial real estate?',
      answer:
        'Yes — with different objects (Suite, Tenant, TI, CAM). The record page template and integrations map cleanly across multifamily and commercial; we scope the object changes in discovery.',
    },
    {
      question: 'Can Foundry predict turnover before the resident gives notice?',
      answer:
        'Yes. Foundry reads ledger, maintenance, and communication signals and scores each unit on renewal probability — giving leasing teams the list of units to prioritize.',
    },
  ],
};

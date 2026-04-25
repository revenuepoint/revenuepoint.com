import type { IndustryPageContent } from '@/types/industry';
import { standardPackaging } from './_shared';

export const financialServices: IndustryPageContent = {
  id: 'financialServices',
  slug: 'financial-services',
  navLabel: 'Financial Services',
  metaTitle: 'Salesforce for Financial Services — RevenuePoint',
  metaDescription:
    'Clean Salesforce Financial Services Cloud for RIAs, insurance agencies, and accounting firms — household 360, portfolio rollup, next-best-action, and compliance on one record page.',
  hero: {
    eyebrow: 'Industries · Financial Services',
    headline: 'Advisors. Households. AUM. One record.',
    sub: 'RevenuePoint builds Salesforce Financial Services Cloud for RIAs, insurance, and accounting firms — with a household 360, custodian-synced portfolio rollup, life-event next-best-action, and compliance documentation on one record. Fully managed by RevenuePoint.',
  },
  painKpis: [
    {
      stat: '11 hrs',
      label: 'per week an advisor spends reconciling custodian data into the CRM.',
      source: 'RIA benchmark',
    },
    {
      stat: '48%',
      label: 'of annual client reviews happen late because triggers sit in one person’s head.',
      source: 'RevenuePoint discovery',
    },
    {
      stat: '23%',
      label: 'of policies lapse preventably at mid-market P&C agencies.',
      source: 'Insurance ops benchmark',
    },
    {
      stat: '4 systems',
      label: 'a client service manager touches to onboard one new household.',
      source: 'Financial services ops discovery',
    },
  ],
  recordPage: {
    tabLabel: 'Households',
    objectLabel: 'Household',
    accountName: 'The Calloway Household · Legacy Advisor Partners',
    accountSub: 'HNW · $4.8M AUM · advisor: T. Nakamura · relationship since 2016',
    highlights: [
      { label: 'Total AUM', value: '$4.82M', tone: 'on-track' },
      { label: 'YTD performance', value: '+6.1%', tone: 'on-track' },
      { label: 'Next review', value: '06/10', tone: 'neutral' },
      { label: 'KYC', value: 'Current', tone: 'on-track' },
      { label: 'Advisor touches YTD', value: '8', tone: 'on-track' },
      { label: 'Life event', value: 'Retirement 2027', tone: 'at-risk' },
    ],
    relatedLists: [
      {
        title: 'Related',
        items: [
          { label: 'Financial Accounts', count: 6 },
          { label: 'Financial Holdings', count: 184 },
          { label: 'Financial Goals', count: 4 },
          { label: 'Policies', count: 3 },
          { label: 'Service_Request__c', count: 1 },
          { label: 'Onboarding_Task__c', count: 0 },
          { label: 'Contacts (household)', count: 2 },
        ],
      },
    ],
    components: [
      {
        id: 'household-360',
        title: 'Household 360 · AUM rollup',
        subtitle: 'Accounts aggregated · live from custodian',
        source: 'Orion / Addepar',
        callout: {
          number: 1,
          description:
            'Every account across every custodian rolled up to the household, with allocation and performance. Advisors stop reconciling; they advise.',
        },
        body: {
          kind: 'table',
          headers: ['Account', 'Custodian', 'Balance', 'YTD'],
          rows: [
            { cells: ['Joint taxable', 'Schwab', '$2.10M', '+5.8%'], tone: 'on-track' },
            { cells: ['IRA · Calloway Sr', 'Schwab', '$1.18M', '+6.4%'], tone: 'on-track' },
            { cells: ['Roth · Calloway Jr', 'Fidelity', '$420K', '+6.9%'], tone: 'on-track' },
            { cells: ['529 · beneficiary', 'Fidelity', '$112K', '+4.1%'], tone: 'neutral' },
          ],
        },
      },
      {
        id: 'nba',
        title: 'Next-Best-Action · Life Events',
        source: 'Foundry + FSC',
        callout: {
          number: 2,
          description:
            'Life events and portfolio thresholds that warrant a touch — surfaced on the household with the advisor’s recommended next move.',
        },
        body: {
          kind: 'timeline',
          entries: [
            { label: 'Retirement planning · target 2027', sub: 'Refine cash flow plan · +1 meeting', tone: 'at-risk' },
            { label: 'Annual review due', sub: '06/10 · pre-meeting brief queued', tone: 'neutral' },
            { label: 'Unassigned cash · $84K', sub: 'Moved to sweep 05/01 · review allocation', tone: 'at-risk' },
            { label: 'College 529 · on track', sub: 'No action needed', tone: 'on-track' },
          ],
        },
      },
      {
        id: 'policy-coverage',
        title: 'Policy & Coverage Matrix',
        subtitle: 'Insurance · P&C + life',
        source: 'Applied Epic',
        callout: {
          number: 3,
          description:
            'All active policies for this household with coverage limits, renewals, and claims — so advisors and service staff speak to the whole household.',
        },
        body: {
          kind: 'table',
          headers: ['Policy', 'Type', 'Renewal', 'Status'],
          rows: [
            { cells: ['HO-2214', 'Home', '09/01', 'Active'], tone: 'on-track' },
            { cells: ['AU-3018', 'Auto', '07/14', 'Active'], tone: 'on-track' },
            { cells: ['UM-142', 'Umbrella $2M', '09/01', 'Coverage gap'], tone: 'at-risk' },
          ],
        },
      },
      {
        id: 'kyc',
        title: 'KYC + Document Checklist',
        source: 'Salesforce + DocuSign',
        callout: {
          number: 4,
          description:
            'Compliance documents required for this household, with status, expiration, and audit trail.',
        },
        body: {
          kind: 'field-list',
          fields: [
            { label: 'KYC verification', value: 'Verified · 01/12/26', tone: 'on-track' },
            { label: 'Investment policy statement', value: 'Signed · 03/04/26', tone: 'on-track' },
            { label: 'W-9', value: 'On file · current' },
            { label: 'Trust documents', value: 'Missing · requested 04/29', tone: 'at-risk' },
            { label: 'Marketing consent', value: 'Opt-in · 02/14/26' },
          ],
        },
      },
    ],
    activity: [
      { label: 'Marketing Cloud', detail: 'Quarterly letter · opened · clicked "read more".', sub: '04/30' },
      { label: '8x8 call', detail: 'Service manager · Roth beneficiary update · 6 min.', sub: '04/22' },
      { label: 'Foundry', detail: 'Flagged $84K unassigned cash · task queued.', sub: '05/01' },
    ],
    rightRailTile: {
      title: 'Client health',
      source: 'Foundry',
      lines: [
        { label: 'At-risk score', value: 'Low', tone: 'on-track' },
        { label: 'NPS', value: '9 / 10', tone: 'on-track' },
        { label: 'Referrals made', value: '2 YTD', tone: 'on-track' },
        { label: 'Review completion', value: 'On schedule', tone: 'on-track' },
      ],
    },
  },
  dataModel: {
    description:
      'Financial Services Cloud gives us the household and financial account model natively. We extend with service request, onboarding task, and compliance objects.',
    objects: [
      { name: 'Person Account', kind: 'standard' },
      { name: 'Household', kind: 'standard' },
      { name: 'Financial Account', kind: 'standard' },
      { name: 'Financial Holding', kind: 'standard' },
      { name: 'Financial Goal', kind: 'standard' },
      { name: 'Policy', kind: 'standard' },
      { name: 'Claim', kind: 'standard' },
      { name: 'Insurance Policy Coverage', kind: 'standard' },
      { name: 'Service_Request__c', kind: 'custom' },
      { name: 'Onboarding_Task__c', kind: 'custom' },
      { name: 'Review_Schedule__c', kind: 'custom' },
      { name: 'Compliance_Doc__c', kind: 'custom' },
    ],
  },
  integrations: {
    description:
      'Custodians, portfolio accounting, and policy admin systems stay authoritative. We wire them into FSC so advisors and service staff work from live, reconciled data.',
    systems: [
      { name: 'Orion', category: 'Portfolio accounting', role: 'Holdings, performance, and billing for RIAs.' },
      { name: 'Black Diamond', category: 'Portfolio accounting', role: 'Alternative portfolio system.' },
      { name: 'Addepar', category: 'Portfolio accounting', role: 'Multi-custodian reporting for HNW.' },
      { name: 'Envestnet', category: 'Portfolio accounting', role: 'Unified wealth platform path.' },
      { name: 'Applied Epic', category: 'Policy admin (P&C)', role: 'Policy, coverage, claims data.' },
      { name: 'Guidewire', category: 'Policy admin', role: 'Carrier-side integration for larger agencies.' },
      { name: 'DocuSign', category: 'Agreements', role: 'IPS, engagement, KYC document workflow.' },
      { name: 'Marketing Cloud', category: 'Campaigns', role: 'Client journeys and quarterly letters.' },
    ],
  },
  lexComponents: [
    {
      id: 'performance',
      title: 'Performance vs benchmark',
      source: 'Orion',
      blurb: 'Household performance against benchmark and target allocation.',
      body: {
        kind: 'kpi-tiles',
        tiles: [
          { label: 'YTD return', value: '+6.1%', delta: 'vs bench +5.8%', deltaTone: 'on-track' },
          { label: 'Since inception', value: '+54%', delta: '8 yrs', deltaTone: 'on-track' },
          { label: 'Allocation drift', value: '2.1%', delta: 'within band', deltaTone: 'on-track' },
          { label: 'Tax-loss opp', value: '$14K', delta: 'YTD harvested', deltaTone: 'on-track' },
        ],
      },
    },
    {
      id: 'review-sla',
      title: 'Review schedule',
      source: 'Review_Schedule__c',
      blurb: 'Upcoming client reviews with prep brief status.',
      body: {
        kind: 'table',
        headers: ['Date', 'Type', 'Prep', 'Advisor'],
        rows: [
          { cells: ['06/10', 'Annual', 'Draft ready', 'T. Nakamura'], tone: 'on-track' },
          { cells: ['07/15', 'Midyear', 'Not started', 'T. Nakamura'], tone: 'neutral' },
          { cells: ['08/04', 'Ad-hoc · retire', 'Queued', 'T. Nakamura'], tone: 'neutral' },
        ],
      },
    },
    {
      id: 'stripe-fees',
      title: 'Stripe · Advisory fees',
      source: 'Stripe',
      blurb: 'Fee billing, collection, and reconciliation against custodian deductions.',
      body: {
        kind: 'field-list',
        fields: [
          { label: 'Q1 fee', value: '$6,042 · deducted', tone: 'on-track' },
          { label: 'Q2 fee', value: '$6,185 · scheduled' },
          { label: 'Fee reconciliation', value: 'Matched to custodian', tone: 'on-track' },
          { label: 'Method', value: 'Custodian deduction' },
        ],
      },
    },
    {
      id: '8x8-service',
      title: '8x8 · Client service line',
      source: '8x8',
      blurb: 'Inbound and outbound client calls logged to the household with recording links.',
      body: {
        kind: 'timeline',
        entries: [
          { label: 'Inbound · beneficiary', sub: '04/22 · 6 min · resolved', tone: 'on-track' },
          { label: 'Outbound · tax doc', sub: '03/14 · 4 min · sent follow-up', tone: 'on-track' },
          { label: 'Inbound · rebalance', sub: '02/08 · 11 min · escalated to advisor', tone: 'neutral' },
        ],
      },
    },
  ],
  useCases: [
    {
      title: 'Review triggers that do not get missed',
      pain: 'Annual reviews, life events, and portfolio thresholds get tracked in one advisor’s calendar, and reviews slip.',
      flow: [
        'Review_Schedule__c generates the next review 45 days out based on household agreement.',
        'Foundry fires when allocation drift, life-event flags, or cash thresholds warrant an earlier touch.',
        'Advisor home page shows the list of reviews and the prep briefs ready to go.',
      ],
      outcome: 'Reviews happen on time because they are scheduled centrally, not remembered.',
    },
    {
      title: 'Policy renewal that catches the gap',
      pain: 'P&C policies renew annually; gaps in coverage (umbrella below asset value, no ride-share endorsement) slip through service.',
      flow: [
        'Policies sync from Applied Epic with coverage limits and renewal dates.',
        'Rules flag coverage gaps against household assets and life events.',
        'Service reps see a prioritized renewal list with gap reasons attached.',
      ],
      outcome: 'Policies renew intentionally with the right coverage — lapse rate drops and E&O risk lowers.',
    },
    {
      title: 'Onboarding that runs like a checklist',
      pain: 'A new household requires IPS, custodian paperwork, KYC, funding, and billing setup — tracked in email.',
      flow: [
        'Onboarding_Task__c generates the full checklist on account creation.',
        'DocuSign sends IPS and KYC forms; completion updates the task automatically.',
        'Client service owns the checklist; advisor sees only exceptions.',
      ],
      outcome: 'Onboarding time drops and nothing slips because the checklist lives on the record.',
    },
  ],
  proofCard: {
    stat: '11 hrs',
    sourceNote: 'Weekly advisor reconciliation time · RIA benchmark',
    problem:
      'Mid-market advisors spend over eleven hours a week reconciling custodian data into the CRM — time they would rather spend with clients, and time that drops advisor-to-household ratio below what the firm needs.',
    fix: 'We wire Orion or Addepar into FSC so the household 360 reflects live positions. Advisors stop reconciling; service teams work from the same numbers; review prep happens once.',
    outcome: 'Advisors reclaim a day a week. Client touches go up because the time is freed for them.',
  },
  packaging: standardPackaging('Financial Services'),
  faqs: [
    {
      question: 'Do you support both RIAs and insurance agencies?',
      answer:
        'Yes. Both run on Financial Services Cloud. RIAs lean into Financial Account and Holding. Agencies lean into Policy and Coverage. Many firms run both, and we model the hybrid cleanly.',
    },
    {
      question: 'Which custodians do you integrate?',
      answer:
        'Schwab, Fidelity, Pershing, and TD Ameritrade via Orion, Black Diamond, or Addepar. For Envestnet-based firms we use the Envestnet feed. We operate the pipeline — advisors see reconciled numbers.',
    },
    {
      question: 'How do you handle compliance documentation?',
      answer:
        'Compliance_Doc__c with Field Audit Trail tracks every IPS, KYC, and signed disclosure. DocuSign eSign completion posts back to the household. Quarterly compliance reports generate from Foundry.',
    },
    {
      question: 'Can this scale to a multi-office RIA?',
      answer:
        'Yes. Territory and role hierarchies work for multi-office and multi-advisor firms. Advisor home pages show only their book; firm leadership sees rollups by office and team.',
    },
  ],
};

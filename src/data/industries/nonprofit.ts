import type { IndustryPageContent } from '@/types/industry';
import { standardPackaging } from './_shared';

export const nonprofit: IndustryPageContent = {
  id: 'nonprofit',
  slug: 'nonprofit',
  navLabel: 'Nonprofit & Social Services',
  metaTitle: 'Salesforce for Nonprofit & Social Services',
  metaDescription:
    'Clean Salesforce Nonprofit Cloud / NPSP — donor 360, program engagement, grant pipeline, and case-managed services on one household record.',
  hero: {
    eyebrow: 'Industries · Nonprofit & Social Services',
    headline: 'Every donor. Every program. Every outcome.',
    sub: 'RevenuePoint builds Salesforce Nonprofit Cloud for mission-driven organizations — with a donor household 360, program engagement, grant pipeline, and outcomes tracking on one record. Fully managed by RevenuePoint.',
  },
  painKpis: [
    {
      stat: '57%',
      label: 'of first-time donors never give a second gift.',
      source: 'Fundraising Effectiveness Project',
    },
    {
      stat: '3 days',
      label: 'average prep time for a quarterly board packet at a mid-size nonprofit.',
      source: 'RevenuePoint client discovery',
    },
    {
      stat: '68%',
      label: 'of nonprofits cannot attribute program outcomes to funder-level reports.',
      source: 'Outcome reporting benchmark',
    },
    {
      stat: '14%',
      label: 'of grant deadlines get missed because deadline tracking lives in one person’s calendar.',
      source: 'Grant ops discovery',
    },
  ],
  recordPage: {
    tabLabel: 'Households',
    objectLabel: 'Household',
    accountName: 'The Ellis Household · Horizon Community Services',
    accountSub: 'Major donor · region: Pacific · relationship since 2017',
    highlights: [
      { label: 'Lifetime giving', value: '$184K', tone: 'on-track' },
      { label: 'FY26 YTD', value: '$32K', tone: 'on-track' },
      { label: 'Last gift', value: '04/14 · $8K', tone: 'on-track' },
      { label: 'Recurring', value: '$500/mo', tone: 'on-track' },
      { label: 'Lapse risk', value: 'Low', tone: 'on-track' },
      { label: 'Capacity', value: 'High', tone: 'neutral' },
    ],
    relatedLists: [
      {
        title: 'Related',
        items: [
          { label: 'Gifts (Opportunities)', count: 42 },
          { label: 'Recurring Donations', count: 1 },
          { label: 'Program Engagements', count: 4 },
          { label: 'Volunteer_Shift__c', count: 8 },
          { label: 'Grant__c', count: 0 },
          { label: 'Contacts', count: 2 },
          { label: 'Campaigns', count: 6 },
        ],
      },
    ],
    components: [
      {
        id: 'donor-timeline',
        title: 'Donor Giving Timeline',
        subtitle: 'Last 24 months · gifts + engagement',
        source: 'Raiser’s Edge + NPSP',
        callout: {
          number: 1,
          description:
            'Giving, campaign responses, and engagement events in one timeline. Development officers walk into a meeting with context, not a spreadsheet.',
        },
        body: {
          kind: 'timeline',
          entries: [
            { label: 'Gift · Spring Gala · $8,000', sub: '04/14 · major gift · attributed to G. Ellis', tone: 'on-track' },
            { label: 'Attended site visit', sub: '03/21 · Downtown shelter · hosted by ED', tone: 'on-track' },
            { label: 'Recurring · monthly $500', sub: '04/01 · active since 09/22', tone: 'on-track' },
            { label: 'Pledge · annual fund', sub: '01/15 · $12K · $4K remaining', tone: 'at-risk' },
          ],
        },
      },
      {
        id: 'lybunt',
        title: 'LYBUNT / SYBUNT Flag',
        source: 'Raiser’s Edge',
        callout: {
          number: 2,
          description:
            'Lapsed-donor flags (Last Year But Unfortunately Not This, etc.) rendered on the household with the next-best-action for the gift officer.',
        },
        body: {
          kind: 'field-list',
          fields: [
            { label: 'Status', value: 'Current', tone: 'on-track' },
            { label: 'LYBUNT', value: 'No' },
            { label: 'SYBUNT', value: 'No' },
            { label: 'Days since last gift', value: '22' },
            { label: 'Retention prediction', value: '96%', tone: 'on-track' },
            { label: 'Recommended move', value: 'Capacity upgrade ask' },
          ],
        },
      },
      {
        id: 'program',
        title: 'Program Engagement',
        subtitle: 'Services delivered · outcomes logged',
        source: 'Nonprofit Cloud',
        callout: {
          number: 3,
          description:
            'Program engagements with service delivery counts and outcome measurements — the data funders ask for, rendered on the family record.',
        },
        body: {
          kind: 'table',
          headers: ['Program', 'Started', 'Deliveries', 'Outcome'],
          rows: [
            { cells: ['Housing stabilization', '02/12', '14', 'Housed'], tone: 'on-track' },
            { cells: ['Workforce ready', '03/04', '8', 'Enrolled'], tone: 'on-track' },
            { cells: ['Food assistance', '01/09', '22', 'Active'], tone: 'on-track' },
          ],
        },
      },
      {
        id: 'major-gift-pipeline',
        title: 'Major Gift Pipeline · capacity ask',
        source: 'NPSP',
        callout: {
          number: 4,
          description:
            'Active pipeline for this household with capacity-rated ask and the development officer’s moves plan.',
        },
        body: {
          kind: 'bar-rows',
          rows: [
            { label: 'Annual fund · renewed', value: 100, valueLabel: '$25K · committed', tone: 'on-track' },
            { label: 'Capital campaign ask', value: 35, valueLabel: '$100K · cultivation', tone: 'neutral' },
            { label: 'Planned giving dialog', value: 15, valueLabel: 'Opened', tone: 'neutral' },
          ],
        },
      },
    ],
    activity: [
      { label: 'Email · MC', detail: 'Spring appeal · opened 3x · clicked donate.', sub: 'This week' },
      { label: 'Call', detail: 'ED thank-you call logged · 11 min.', sub: '04/15' },
      { label: 'Foundry', detail: 'Capacity score raised to High based on public filings.', sub: '2 weeks ago' },
    ],
    rightRailTile: {
      title: 'Giving capacity',
      source: 'Foundry',
      lines: [
        { label: 'Model score', value: 'High' },
        { label: 'Recent capacity signal', value: 'Sold business 2024', tone: 'on-track' },
        { label: 'Peer giving band', value: '$25K–$250K', tone: 'neutral' },
        { label: 'Next review', value: '60 days · 07/01' },
      ],
    },
  },
  dataModel: {
    description:
      'We build on Nonprofit Cloud (or NPSP where appropriate) with custom objects for grants, volunteer shifts, and program outcomes — the data funders and boards ask about.',
    objects: [
      { name: 'Account (Household)', kind: 'standard' },
      { name: 'Contact', kind: 'standard' },
      { name: 'Opportunity (Gift)', kind: 'standard' },
      { name: 'Recurring Donation', kind: 'standard' },
      { name: 'Program', kind: 'standard' },
      { name: 'Program Engagement', kind: 'standard' },
      { name: 'Service', kind: 'standard' },
      { name: 'Service Delivery', kind: 'standard' },
      { name: 'Case Plan', kind: 'standard' },
      { name: 'Grant__c', kind: 'custom' },
      { name: 'Volunteer_Shift__c', kind: 'custom' },
      { name: 'Outcome__c', kind: 'custom' },
      { name: 'Funder_Report__c', kind: 'custom' },
    ],
  },
  integrations: {
    description:
      'Raiser’s Edge stays where it is. QuickBooks or Sage Intacct stays your system of record for accounting. We wire both into Salesforce so development and program teams work from one view.',
    systems: [
      { name: 'Raiser’s Edge', category: 'Fundraising DB', role: 'Giving history, constituent data, prospect records.' },
      { name: 'Financial Edge', category: 'Nonprofit GL', role: 'Fund accounting and grant tracking.' },
      { name: 'Sage Intacct', category: 'Nonprofit GL', role: 'Alternative GL with strong fund reporting.' },
      { name: 'QuickBooks', category: 'GL', role: 'Smaller-org GL path.' },
      { name: 'Classy', category: 'Digital fundraising', role: 'Online giving, events, and peer-to-peer.' },
      { name: 'iATS', category: 'Processing', role: 'Recurring gifts and card processing.' },
      { name: 'Marketing Cloud', category: 'Campaigns', role: 'Appeal journeys and donor stewardship.' },
      { name: 'Mailchimp', category: 'Campaigns', role: 'Smaller-team alternative for appeals.' },
    ],
  },
  lexComponents: [
    {
      id: 'grant-deadlines',
      title: 'Grant Deadline Watcher',
      source: 'Grant__c + Foundry',
      blurb: 'Every active grant this household or funder is tied to, with next report deadline and status.',
      body: {
        kind: 'table',
        headers: ['Grant', 'Funder', 'Report due', 'Status'],
        rows: [
          { cells: ['GR-214 · Workforce', 'Ellis Fdn', '06/30', 'On track'], tone: 'on-track' },
          { cells: ['GR-209 · Housing', 'Community Fdn', '05/15', '11 days'], tone: 'at-risk' },
          { cells: ['GR-201 · General ops', 'State', '07/30', 'On track'], tone: 'on-track' },
        ],
      },
    },
    {
      id: 'campaign-engagement',
      title: 'Mailchimp · Appeal engagement',
      source: 'Mailchimp',
      blurb: 'Recent appeal campaigns this household received, with engagement signals.',
      body: {
        kind: 'kpi-tiles',
        tiles: [
          { label: 'Last campaign', value: 'Spring appeal' },
          { label: 'Opens', value: '3', deltaTone: 'on-track' },
          { label: 'Clicks', value: '2', delta: 'clicked donate', deltaTone: 'on-track' },
          { label: 'Unsubscribes', value: '0', deltaTone: 'on-track' },
        ],
      },
    },
    {
      id: 'stripe-recurring',
      title: 'Stripe / iATS · Recurring',
      source: 'Stripe + iATS',
      blurb: 'Recurring donation status and last 6 charges with failure flags.',
      body: {
        kind: 'table',
        headers: ['Month', 'Amount', 'Method', 'Status'],
        rows: [
          { cells: ['May', '$500', 'ACH', 'Scheduled'], tone: 'on-track' },
          { cells: ['Apr', '$500', 'ACH', 'Paid'], tone: 'on-track' },
          { cells: ['Mar', '$500', 'Card', 'Retried · paid'], tone: 'at-risk' },
        ],
      },
    },
    {
      id: 'volunteer',
      title: 'Volunteer Hours Rollup',
      source: 'Volunteer_Shift__c',
      blurb: 'Volunteer shifts logged across the household, rolled up for reporting.',
      body: {
        kind: 'field-list',
        fields: [
          { label: 'YTD hours', value: '42', tone: 'on-track' },
          { label: 'Last shift', value: '04/28 · food pantry' },
          { label: 'Preferred programs', value: 'Housing, food assistance' },
          { label: 'Background check', value: 'Current · exp 2027' },
        ],
      },
    },
  ],
  useCases: [
    {
      title: 'Donor retention outreach',
      pain: 'First-time donors lapse because stewardship is batch-and-blast, not tied to the specific gift or moment.',
      flow: [
        'Salesforce scores every new donor on retention risk using giving pattern, campaign source, and capacity signals.',
        'Marketing Cloud journeys personalize the thank-you and second-ask based on the score.',
        'Gift officers get a task when a high-capacity first-time donor warrants a personal touch.',
      ],
      outcome: 'Second-gift rate improves because the right donors get the right moves.',
    },
    {
      title: 'Board-ready reporting without the scramble',
      pain: 'Quarterly board packets take days because data is pulled from Raiser’s Edge, the GL, and program spreadsheets separately.',
      flow: [
        'Foundry reads giving, GL, and program data and writes a narrative quarterly report.',
        'The ED reviews a draft generated overnight before the board meeting.',
        'Year-over-year comparisons and outcome attribution are generated automatically.',
      ],
      outcome: 'Board packet prep drops from three days to a few hours of review.',
    },
    {
      title: 'Case-managed services with outcome tracking',
      pain: 'Funders ask for outcome data that lives in program-staff spreadsheets or case notes, not a reportable system.',
      flow: [
        'Program Engagement, Service Delivery, and Outcome__c track every interaction.',
        'Funder_Report__c maps required fields to the funder’s reporting template.',
        'Reports generate on a schedule with the narrative and numbers aligned.',
      ],
      outcome: 'Outcome reporting is a query, not a fire drill.',
    },
  ],
  proofCard: {
    stat: '57%',
    sourceNote: 'Fundraising Effectiveness Project · donor retention',
    problem:
      'More than half of first-time donors never give a second gift. The second-gift conversation is the one that turns a one-time supporter into a lifetime one, and most nonprofits do not have the staffing to do it personally.',
    fix: 'We build a retention score on every household record, then drive a Marketing Cloud journey that personalizes the second ask. Gift officers get a task only when the personal touch is warranted.',
    outcome: 'Second-gift rate improves because the right donors get the right moves at the right time.',
  },
  packaging: standardPackaging('Nonprofit'),
  faqs: [
    {
      question: 'Nonprofit Cloud or NPSP — which do you recommend?',
      answer:
        'Nonprofit Cloud is the go-forward platform. For orgs already on NPSP we support both paths and can migrate when it makes sense. We scope this in discovery.',
    },
    {
      question: 'Do you replace Raiser’s Edge?',
      answer:
        'Usually not. RE stays the system of record for giving history, and we sync the data into Salesforce for program, case management, and outreach workflows. Some clients eventually consolidate onto Salesforce; we support that transition when ready.',
    },
    {
      question: 'How do you handle constituent data privacy?',
      answer:
        'Permission sets limit access by role, Shield Platform Encryption protects sensitive fields, and Field Audit Trail tracks every change on donor records. Policies align with PCI for payment and donor-intent for giving restrictions.',
    },
    {
      question: 'Can Foundry write the funder report narrative?',
      answer:
        'Yes. Foundry Prism generates written funder reports from the program and giving data, with the specific numbers and the narrative in the funder’s required format.',
    },
  ],
};

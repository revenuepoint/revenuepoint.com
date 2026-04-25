import type { IndustryPageContent } from '@/types/industry';
import { standardPackaging } from './_shared';

export const healthcare: IndustryPageContent = {
  id: 'healthcare',
  slug: 'healthcare',
  navLabel: 'Healthcare & Ambulatory Care',
  metaTitle: 'Salesforce for Healthcare & Ambulatory Care — RevenuePoint',
  metaDescription:
    'Clean Salesforce Health Cloud for ambulatory groups — patient 360, referral pipeline, care-gap scoring, and denial analytics on one record page.',
  hero: {
    eyebrow: 'Industries · Healthcare & Ambulatory Care',
    headline: 'Patients. Referrals. Revenue. One view.',
    sub: 'RevenuePoint builds Salesforce Health Cloud for ambulatory groups — with a longitudinal patient record, referral pipeline, care-gap scoring, and denial analytics that speak to your EHR and payer feeds. Fully managed by RevenuePoint.',
  },
  painKpis: [
    {
      stat: '55%',
      label: 'of outbound referrals leak to providers outside the preferred network.',
      source: 'Ambulatory network benchmark',
    },
    {
      stat: '18%',
      label: 'average first-pass claim denial rate at mid-market groups.',
      source: 'Revenue cycle benchmark',
    },
    {
      stat: '14%',
      label: 'of appointments are no-shows — most without reminders going out.',
      source: 'MGMA industry data',
    },
    {
      stat: '3 systems',
      label: 'average a front-desk coordinator toggles to answer one patient question.',
      source: 'RevenuePoint discovery',
    },
  ],
  recordPage: {
    tabLabel: 'Patients',
    objectLabel: 'Patient',
    accountName: 'Eleanor Ruiz · 64 · Valley Ambulatory Network',
    accountSub: 'PCP: Dr. J. Chen · 3 active conditions · Anthem PPO',
    highlights: [
      { label: 'Risk score', value: '2.1', tone: 'at-risk' },
      { label: 'Open referrals', value: '2', tone: 'neutral' },
      { label: 'Care gaps', value: '1', tone: 'at-risk' },
      { label: 'Next visit', value: '05/14 · Dr. Lopez', tone: 'neutral' },
      { label: 'No-show risk', value: 'Low', tone: 'on-track' },
      { label: 'Eligibility', value: 'Verified', tone: 'on-track' },
    ],
    relatedLists: [
      {
        title: 'Related',
        items: [
          { label: 'Clinical Encounters', count: 18 },
          { label: 'Referral__c', count: 2 },
          { label: 'Authorization__c', count: 1 },
          { label: 'Visit__c', count: 42 },
          { label: 'Care Requests', count: 3 },
          { label: 'Medications', count: 6 },
          { label: 'Cases · billing', count: 1 },
        ],
      },
    ],
    components: [
      {
        id: 'patient-360',
        title: 'Patient 360 · Longitudinal',
        subtitle: 'Encounters, meds, conditions · last 24 months',
        source: 'Epic via MuleSoft HCA',
        callout: {
          number: 1,
          description:
            'Longitudinal timeline from the EHR — visits, procedures, medications, and conditions — rendered on the Salesforce patient record for non-clinical staff who need the context.',
        },
        body: {
          kind: 'timeline',
          entries: [
            { label: 'Visit · follow-up HTN', sub: '04/22 · Dr. Chen · BP 148/90', tone: 'at-risk' },
            { label: 'Specialist referral · cardiology', sub: '04/22 · sent to Dr. Okafor', tone: 'neutral' },
            { label: 'Lab results · A1c 7.8', sub: '04/18 · elevated · flagged', tone: 'at-risk' },
            { label: 'Annual wellness', sub: '02/03 · Dr. Chen · complete', tone: 'on-track' },
          ],
        },
      },
      {
        id: 'referral',
        title: 'Referral Pipeline',
        subtitle: 'Outbound · by destination',
        source: 'Epic + Salesforce',
        callout: {
          number: 2,
          description:
            'Every outbound referral for this patient, with status and whether the destination is in-network. Leakage becomes visible — and actionable.',
        },
        body: {
          kind: 'table',
          headers: ['Destination', 'Specialty', 'Status', 'Network'],
          rows: [
            { cells: ['Dr. A. Okafor', 'Cardiology', 'Scheduled 05/19', 'In-network'], tone: 'on-track' },
            { cells: ['Valley Imaging', 'Imaging', 'Authorized', 'In-network'], tone: 'on-track' },
            { cells: ['Dr. P. Sharma', 'Endocrinology', 'Booked outside', 'Out'], tone: 'off-track' },
          ],
        },
      },
      {
        id: 'care-gap',
        title: 'Care Gap · HEDIS risk score',
        source: 'Foundry + Epic',
        callout: {
          number: 3,
          description:
            'Open HEDIS gaps and risk score pulled together from EHR data. Care managers see what to close before the next visit.',
        },
        body: {
          kind: 'bar-rows',
          rows: [
            { label: 'A1c testing · overdue', value: 100, valueLabel: '120 days past', tone: 'off-track' },
            { label: 'BP control · at target', value: 60, valueLabel: 'At target', tone: 'on-track' },
            { label: 'Colorectal screening', value: 40, valueLabel: 'Due 2025', tone: 'neutral' },
            { label: 'Flu · 2025 season', value: 100, valueLabel: 'Completed', tone: 'on-track' },
          ],
        },
      },
      {
        id: 'auth-eligibility',
        title: 'Auth & Eligibility',
        source: 'Waystar + payer',
        callout: {
          number: 4,
          description:
            'Real-time eligibility check and authorization status for scheduled services — posted on the patient record so the front desk can resolve before the visit.',
        },
        body: {
          kind: 'field-list',
          fields: [
            { label: 'Payer', value: 'Anthem PPO' },
            { label: 'Eligibility', value: 'Active · verified 05/03', tone: 'on-track' },
            { label: 'Cardiology auth', value: 'Approved · AUTH-4418', tone: 'on-track' },
            { label: 'Endo auth', value: 'Pending · submitted 04/24', tone: 'at-risk' },
            { label: 'Copay', value: '$40 · specialist' },
            { label: 'Deductible met', value: '$840 / $2,000' },
          ],
        },
      },
    ],
    activity: [
      { label: 'Twilio', detail: 'Appointment reminder for 05/14 delivered, confirmed.', sub: 'Yesterday' },
      { label: '8x8', detail: 'Call center returned billing question, resolved.', sub: '2 days ago' },
      { label: 'Foundry agent', detail: 'Flagged A1c gap · care manager task created.', sub: '5 days ago' },
    ],
    rightRailTile: {
      title: 'Revenue cycle',
      source: 'Waystar + Foundry',
      lines: [
        { label: 'AR aging', value: '$120 · 0–30', tone: 'on-track' },
        { label: 'Last denial', value: 'None 90d', tone: 'on-track' },
        { label: 'Clean claim rate', value: '94%', tone: 'on-track' },
        { label: 'Patient responsibility', value: '$40 due 05/14', tone: 'neutral' },
      ],
    },
  },
  dataModel: {
    description:
      'Health Cloud is the base. We extend with custom objects for referrals, authorizations, and visit tracking — the things that sit between the EHR, the payer, and the front desk.',
    objects: [
      { name: 'Patient (Account+Contact)', kind: 'standard' },
      { name: 'Care Plan', kind: 'standard' },
      { name: 'Care Request', kind: 'standard' },
      { name: 'Clinical Encounter', kind: 'standard' },
      { name: 'Condition', kind: 'standard' },
      { name: 'Medication', kind: 'standard' },
      { name: 'Practitioner', kind: 'standard' },
      { name: 'Provider Network', kind: 'standard' },
      { name: 'Referral__c', kind: 'custom' },
      { name: 'Authorization__c', kind: 'custom' },
      { name: 'Visit__c', kind: 'custom' },
      { name: 'Denial__c', kind: 'custom' },
      { name: 'Risk_Score__c', kind: 'custom' },
    ],
  },
  integrations: {
    description:
      'The EHR stays authoritative for clinical data. We integrate HL7/FHIR feeds into Salesforce for the people who are not clinicians — front desk, referral coordinators, revenue cycle, and leadership.',
    systems: [
      { name: 'Epic', category: 'EHR', role: 'Patient, encounter, and order data via MuleSoft HCA.' },
      { name: 'athenahealth', category: 'EHR', role: 'Smaller-group alternative with FHIR feed.' },
      { name: 'Cerner', category: 'EHR', role: 'Health system path with MuleSoft connector.' },
      { name: 'Waystar', category: 'RCM', role: 'Eligibility, claim status, and denial data.' },
      { name: 'Twilio', category: 'Patient outreach', role: 'Appointment reminders and secure messaging.' },
      { name: '8x8', category: 'Contact center', role: 'Patient access center on Service Cloud Voice.' },
      { name: 'Stripe', category: 'Patient pay', role: 'Patient responsibility collection and plans.' },
      { name: 'Marketing Cloud', category: 'Campaigns', role: 'Population health outreach journeys.' },
    ],
  },
  lexComponents: [
    {
      id: 'nsr-forecast',
      title: 'No-Show Risk Forecast',
      source: 'Foundry + Epic',
      blurb: 'Model-scored no-show risk for this patient, with contributing signals.',
      body: {
        kind: 'kpi-tiles',
        tiles: [
          { label: 'Next visit', value: '05/14' },
          { label: 'Predicted risk', value: '12%', delta: 'Low', deltaTone: 'on-track' },
          { label: 'Reminder status', value: 'Confirmed', delta: 'Twilio · 05/07', deltaTone: 'on-track' },
          { label: 'Past no-shows', value: '0 / 18', delta: 'never', deltaTone: 'on-track' },
        ],
      },
    },
    {
      id: 'denial-heatmap',
      title: 'Denial pattern · this payer',
      source: 'Waystar',
      blurb: 'Denial reasons by code and frequency for the payer on this account, last 90 days.',
      body: {
        kind: 'bar-rows',
        rows: [
          { label: 'CO-197 · auth missing', value: 38, valueLabel: '38 denials', tone: 'off-track' },
          { label: 'CO-16 · info missing', value: 24, valueLabel: '24 denials', tone: 'at-risk' },
          { label: 'CO-22 · coverage', value: 12, valueLabel: '12 denials', tone: 'at-risk' },
          { label: 'Others', value: 6, valueLabel: '6 denials', tone: 'neutral' },
        ],
      },
    },
    {
      id: 'stripe-patient-pay',
      title: 'Stripe · Patient Pay',
      source: 'Stripe',
      blurb: 'Patient responsibility balance, saved card, and payment plan status.',
      body: {
        kind: 'field-list',
        fields: [
          { label: 'Balance', value: '$120 · current', tone: 'on-track' },
          { label: 'Payment method', value: 'Card · visa •• 4422' },
          { label: 'Plan', value: 'Not on a plan' },
          { label: 'Last payment', value: '$40 · 04/22' },
        ],
      },
    },
    {
      id: '8x8-softphone',
      title: '8x8 · Access Center',
      source: '8x8',
      blurb: 'Click-to-dial, call history, and recording links for the patient access center.',
      body: {
        kind: 'timeline',
        entries: [
          { label: 'Inbound · billing question', sub: '04/22 · 6 min · agent M. Wu · resolved', tone: 'on-track' },
          { label: 'Outbound · reminder', sub: '04/18 · 2 min · voicemail', tone: 'neutral' },
          { label: 'Inbound · scheduling', sub: '03/12 · 4 min · booked 04/22', tone: 'on-track' },
        ],
      },
    },
  ],
  useCases: [
    {
      title: 'Referral leakage — in-network capture',
      pain: 'Providers refer to whoever comes to mind; leadership finds out at the end of the quarter that half the referrals went out of network.',
      flow: [
        'Referral__c tracks destination, specialty, and network on every outbound referral.',
        'In-network options surface on the referral form based on specialty and patient plan.',
        'Foundry dashboards show leakage by physician, specialty, and destination every week.',
      ],
      outcome: 'Leakage becomes a number leadership can move — not one they discover after the fact.',
    },
    {
      title: 'Denial pattern detection',
      pain: 'Denials arrive scattered across payers; the pattern is visible only at a specific CPT + payer + provider combination nobody has time to look for.',
      flow: [
        'Denial data from Waystar syncs to a Denial__c object tied to the encounter.',
        'Foundry Prism writes a weekly denial narrative with the top three fixable patterns.',
        'Billing leads see specific, named patterns to escalate with the payer.',
      ],
      outcome: 'Denial rate drops because the fixable patterns get worked, not buried.',
    },
    {
      title: 'Patient access center on one screen',
      pain: 'Front desk toggles between scheduling, the EHR, and eligibility to answer one question.',
      flow: [
        'Service Cloud Voice with 8x8 on the patient record as the primary work surface.',
        'Eligibility, balance, and upcoming visits rendered as Lightning components.',
        'Calls, SMS, and notes log to the record automatically.',
      ],
      outcome: 'Shorter calls. Fewer escalations. Patients get an answer the first time.',
    },
  ],
  proofCard: {
    stat: '55%',
    sourceNote: 'Referral leakage benchmark, ambulatory networks',
    problem:
      'Mid-market ambulatory groups leak more than half of their outbound referrals to providers outside the preferred network — revenue that walks out before leadership sees it.',
    fix: 'We build Referral__c with in-network logic, surface it on the clinical workflow, and let Foundry report leakage weekly by specialty and referring physician.',
    outcome: 'Leakage is a measured number that improves — not a quarterly surprise.',
  },
  packaging: standardPackaging('Healthcare'),
  faqs: [
    {
      question: 'Is Health Cloud HIPAA-compliant?',
      answer:
        'Yes. Health Cloud runs on Salesforce’s HIPAA-aligned trust boundary. We sign a BAA, run Shield Platform Encryption on PHI fields, and operate with least-privilege permissions.',
    },
    {
      question: 'How deep does the EHR integration go?',
      answer:
        'We read HL7 v2 and FHIR feeds for patient, encounter, medication, condition, and order data. We do not write clinical data back to the EHR — the EHR stays authoritative. For anything non-clinical (scheduling, communications, referrals) the workflow lives in Salesforce.',
    },
    {
      question: 'Does this support value-based care reporting?',
      answer:
        'Yes. Risk_Score__c and care gap objects let you track HEDIS and ACO measures. Foundry produces the quarterly reporting packages for payers and boards.',
    },
    {
      question: 'What does a 4-week Foundation look like for a group with 6 clinics?',
      answer:
        'Four weeks for the first clinic, then two-week rollouts per additional location. The record page is identical across clinics — only provider and schedule data varies.',
    },
  ],
};

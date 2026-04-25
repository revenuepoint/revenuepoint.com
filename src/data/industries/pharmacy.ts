import type { IndustryPageContent } from '@/types/industry';
import { standardPackaging } from './_shared';

export const pharmacy: IndustryPageContent = {
  id: 'pharmacy',
  slug: 'pharmacy',
  navLabel: 'Specialty Pharmacy & Compounding',
  metaTitle: 'Salesforce for Specialty Pharmacy & Compounding — RevenuePoint',
  metaDescription:
    'Clean Salesforce Health Cloud for specialty pharmacy and compounding — prior authorization queue, refill heatmap, compound formula, and adherence outreach on one patient record.',
  hero: {
    eyebrow: 'Industries · Specialty Pharmacy & Compounding',
    headline: 'Every script. Every patient. One record.',
    sub: 'RevenuePoint builds a clean Salesforce Health Cloud for specialty pharmacies and compounding operations — with a prior authorization queue, refill heatmap, lot-tracked compound formulas, and adherence outreach. Fully managed by RevenuePoint.',
  },
  painKpis: [
    {
      stat: '4.2 days',
      label: 'average prior-authorization turnaround — days of therapy a patient waits.',
      source: 'Specialty pharmacy benchmark',
    },
    {
      stat: '28%',
      label: 'of patients lapse before PDC reaches therapeutic threshold.',
      source: 'CMS adherence data',
    },
    {
      stat: '60%+',
      label: 'of pharmacies have no systematic adherence outreach between refills.',
      source: 'NCPDP industry survey',
    },
    {
      stat: '11 systems',
      label: 'average stack a PIC touches to complete a compound dispense.',
      source: 'RevenuePoint discovery',
    },
  ],
  recordPage: {
    tabLabel: 'Patients',
    objectLabel: 'Patient',
    accountName: 'Marcus Ellison · 58 · Harborline Pharmacy',
    accountSub: 'Specialty · Oncology · Care team: Dr. A. Patel · PIC: R. Okafor',
    highlights: [
      { label: 'Active scripts', value: '4', tone: 'neutral' },
      { label: 'PDC (90d)', value: '87%', tone: 'on-track' },
      { label: 'Next refill', value: '05/11', tone: 'at-risk' },
      { label: 'PA in queue', value: '1', tone: 'at-risk' },
      { label: 'Copay balance', value: '$0', tone: 'on-track' },
      { label: 'Consent on file', value: 'Current', tone: 'on-track' },
    ],
    relatedLists: [
      {
        title: 'Related',
        items: [
          { label: 'Prescription__c', count: 4 },
          { label: 'Prior_Auth__c', count: 1 },
          { label: 'Refill_Schedule__c', count: 4 },
          { label: 'Medication Statements', count: 12 },
          { label: 'Clinical Encounters', count: 6 },
          { label: 'Care Plan tasks', count: 3 },
          { label: 'Consent forms', count: 2 },
        ],
      },
    ],
    components: [
      {
        id: 'patient-timeline',
        title: 'Patient Timeline',
        subtitle: 'Fills, PAs, encounters · last 90 days',
        source: 'PioneerRx + Health Cloud',
        callout: {
          number: 1,
          description:
            'A single chronological view of every fill, PA event, and clinical encounter — no more tab-switching between the pharmacy system and the EHR notes.',
        },
        body: {
          kind: 'timeline',
          entries: [
            { label: 'Fill · Rx #8841 · 30-day supply', sub: '05/01 · dispensed by R. Okafor', tone: 'on-track' },
            { label: 'PA renewal submitted · Rx #8842', sub: '04/29 · payer Anthem · 3-day SLA', tone: 'at-risk' },
            { label: 'Clinical encounter · dose check', sub: '04/22 · Dr. Patel · no change', tone: 'neutral' },
            { label: 'Fill · Rx #8840', sub: '04/01 · partial (shortage) · made whole 04/04', tone: 'at-risk' },
          ],
        },
      },
      {
        id: 'pa-queue',
        title: 'Prior Authorization Queue',
        subtitle: 'This patient · all payers',
        source: 'CoverMyMeds + Surescripts',
        callout: {
          number: 2,
          description:
            'Every PA in flight for this patient, with payer SLA timer and criteria status. PICs see where to push without opening CoverMyMeds.',
        },
        body: {
          kind: 'table',
          headers: ['Rx', 'Payer', 'Status', 'SLA'],
          rows: [
            { cells: ['#8842 · Rituximab', 'Anthem', 'Criteria sent', '2d 4h'], tone: 'at-risk' },
            { cells: ['#8841 · Ondansetron', 'Anthem', 'Approved', 'Closed'], tone: 'on-track' },
            { cells: ['#8839 · Compound cream', 'BCBS', 'Approved', 'Closed'], tone: 'on-track' },
          ],
        },
      },
      {
        id: 'refill-heatmap',
        title: 'Refill-due Heatmap',
        subtitle: 'Next 30 days · this patient',
        source: 'PioneerRx',
        callout: {
          number: 3,
          description:
            'Upcoming refill-due dates across this patient’s scripts, with adherence risk scored against PDC. Outreach tasks fire automatically.',
        },
        body: {
          kind: 'bar-rows',
          rows: [
            { label: 'Rx #8841 · 05/11', value: 8, valueLabel: '8 days · at risk', tone: 'at-risk' },
            { label: 'Rx #8842 · 05/19', value: 16, valueLabel: '16 days · on track', tone: 'on-track' },
            { label: 'Rx #8843 · 06/02', value: 30, valueLabel: '30 days · on track', tone: 'on-track' },
          ],
        },
      },
      {
        id: 'compound',
        title: 'Compound Formula · Lot & Expiry',
        source: 'PioneerRx + compounding log',
        callout: {
          number: 4,
          description:
            'For compounded prescriptions, the formula with ingredient lots and expiry, cross-checked against USP 795/797 standards.',
        },
        body: {
          kind: 'field-list',
          fields: [
            { label: 'Formula', value: 'CCMP-112 · Pain cream · Lidocaine 5%' },
            { label: 'Ingredient: Lidocaine HCl', value: 'Lot L-4418 · exp 11/26', tone: 'on-track' },
            { label: 'Ingredient: Versabase', value: 'Lot V-2201 · exp 06/26', tone: 'at-risk' },
            { label: 'BUD', value: '60 days' },
            { label: 'USP category', value: '795 · non-sterile' },
            { label: 'Last compounded', value: '04/18 · R. Okafor' },
          ],
        },
      },
    ],
    activity: [
      { label: 'Twilio SMS', detail: 'Refill reminder delivered · patient confirmed 05/03.', sub: 'Yesterday' },
      { label: 'Clinical intervention', detail: 'PIC note — dose tolerance check before 05/11 fill.', sub: '2 days ago' },
      { label: 'CoverMyMeds', detail: 'Criteria sent to Anthem · awaiting reviewer.', sub: '3 days ago' },
    ],
    rightRailTile: {
      title: 'Adherence risk',
      source: 'Foundry',
      lines: [
        { label: 'PDC 90d', value: '87%', tone: 'on-track' },
        { label: 'MPR 180d', value: '82%', tone: 'on-track' },
        { label: 'Gap streak', value: '0', tone: 'on-track' },
        { label: 'Churn risk', value: 'Low', tone: 'on-track' },
      ],
    },
  },
  dataModel: {
    description:
      'Health Cloud (HIPAA-aligned) is the base. Custom objects cover the specifics specialty and compounding teams need: prescriptions, PAs, compound formulas, and refill schedules.',
    objects: [
      { name: 'Account (Patient)', kind: 'standard' },
      { name: 'Contact', kind: 'standard' },
      { name: 'Care Plan', kind: 'standard' },
      { name: 'Care Request', kind: 'standard' },
      { name: 'Medication', kind: 'standard' },
      { name: 'Medication Statement', kind: 'standard' },
      { name: 'Clinical Encounter', kind: 'standard' },
      { name: 'Practitioner', kind: 'standard' },
      { name: 'Prescription__c', kind: 'custom' },
      { name: 'Prior_Auth__c', kind: 'custom' },
      { name: 'Compound_Formula__c', kind: 'custom' },
      { name: 'Refill_Schedule__c', kind: 'custom' },
      { name: 'Clinical_Intervention__c', kind: 'custom' },
    ],
  },
  integrations: {
    description:
      'The pharmacy management system stays the system of record for dispensing. We wire HL7/FHIR data, ePA, and eRx into Health Cloud so your pharmacists and care teams stop swivel-chairing.',
    systems: [
      { name: 'PioneerRx', category: 'Pharmacy mgmt', role: 'Dispense data, refill schedules, inventory lots.' },
      { name: 'LibertyRx', category: 'Pharmacy mgmt', role: 'Alternative PMS with HL7 feed.' },
      { name: 'CoverMyMeds', category: 'ePA', role: 'Prior authorization initiation and status.' },
      { name: 'Surescripts', category: 'eRx', role: 'Inbound prescriptions and clinical messaging.' },
      { name: 'Twilio', category: 'Patient outreach', role: 'HIPAA-aware SMS for refills and adherence.' },
      { name: '8x8', category: 'Communications', role: 'Patient support line, logged to the Patient record.' },
      { name: 'Stripe', category: 'Payments', role: 'Copay collection and manufacturer coupon reconciliation.' },
      { name: 'Marketing Cloud', category: 'Campaigns', role: 'Adherence journeys and prescriber nurture.' },
    ],
  },
  lexComponents: [
    {
      id: 'pa-sla',
      title: 'PA SLA Timer',
      source: 'CoverMyMeds',
      blurb: 'Lightning tile counting down payer SLA windows across all open PAs for this patient.',
      body: {
        kind: 'kpi-tiles',
        tiles: [
          { label: 'Open PAs', value: '1', deltaTone: 'at-risk' },
          { label: 'Time remaining', value: '2d 4h', delta: 'Anthem · criteria sent', deltaTone: 'at-risk' },
          { label: 'Approval rate 90d', value: '91%', delta: '+3 pts', deltaTone: 'on-track' },
          { label: 'Avg turnaround', value: '2.8 days', delta: '−0.4 days', deltaTone: 'on-track' },
        ],
      },
    },
    {
      id: 'twilio-outreach',
      title: 'Twilio · Adherence Outreach',
      source: 'Twilio',
      blurb: 'Automated refill reminders, delivery confirmations, and patient replies logged to the record.',
      body: {
        kind: 'timeline',
        entries: [
          { label: 'Refill reminder · Rx #8841', sub: 'Delivered 05/02 · patient confirmed', tone: 'on-track' },
          { label: 'Adherence check', sub: 'Sent 04/22 · no response · follow-up queued', tone: 'at-risk' },
          { label: 'Shipment tracking', sub: 'Delivered 04/04 · signed by patient', tone: 'on-track' },
        ],
      },
    },
    {
      id: 'stripe-copay',
      title: 'Stripe · Copay Collection',
      source: 'Stripe',
      blurb: 'Patient copay and manufacturer coupon status, reconciled against the dispense.',
      body: {
        kind: 'table',
        headers: ['Fill', 'Amount', 'Method', 'Status'],
        rows: [
          { cells: ['05/01 · #8841', '$35', 'Card · saved', 'Paid'], tone: 'on-track' },
          { cells: ['04/01 · #8840', '$0', 'Coupon · mfr', 'Applied'], tone: 'on-track' },
          { cells: ['03/01 · #8839', '$35', 'ACH', 'Paid'], tone: 'on-track' },
        ],
      },
    },
    {
      id: 'intervention-log',
      title: 'Clinical Intervention Log',
      source: 'Salesforce',
      blurb: 'Documented pharmacist interventions with outcome and billable status.',
      body: {
        kind: 'table',
        headers: ['Date', 'Intervention', 'Outcome', 'Billable'],
        rows: [
          { cells: ['04/29', 'Dose verification', 'No change', 'Yes'], tone: 'on-track' },
          { cells: ['04/14', 'Drug interaction', 'Alternate dispensed', 'Yes'], tone: 'on-track' },
          { cells: ['03/22', 'Adherence counseling', 'Completed', 'No'], tone: 'neutral' },
        ],
      },
    },
  ],
  useCases: [
    {
      title: 'Prior authorization turnaround',
      pain: 'PAs sit in CoverMyMeds; pharmacists check three screens to know where each one stands; patients wait days for therapy.',
      flow: [
        'PA status and criteria sync into a dedicated Prior_Auth__c object.',
        'Lightning queue on the patient record surfaces the open PAs with SLA.',
        'Agent fires when a payer SLA is about to slip and pages the PIC.',
      ],
      outcome: 'Turnaround drops and nothing goes stale because the SLA timer is on the record, not in a portal.',
    },
    {
      title: 'Adherence journey without a person in the middle',
      pain: 'Refill reminders and adherence calls get skipped during busy weeks, and PDC quietly erodes.',
      flow: [
        'Refill_Schedule__c computes next-due date from PioneerRx dispense data.',
        'Twilio sends HIPAA-aware SMS on the schedule; replies log to the patient record.',
        'When a reply indicates a problem, a pharmacist task fires with context pre-filled.',
      ],
      outcome: 'Adherence outreach happens every time, and pharmacists only get pulled in when they are needed.',
    },
    {
      title: 'Compound lot + expiry traceability',
      pain: 'When a compound ingredient hits recall or expires, finding every patient who received it means digging through paper logs.',
      flow: [
        'Compound_Formula__c links every dispense to the ingredient lot used.',
        'Recall or expiry triggers a report of every patient affected, with contact info.',
        'Outreach campaign fires from Marketing Cloud with script replacement instructions.',
      ],
      outcome: 'Traceability is instant. Recall response is measured in hours, not days.',
    },
  ],
  proofCard: {
    stat: '4.2 days',
    sourceNote: 'Specialty pharmacy PA turnaround benchmark',
    problem:
      'Average prior-authorization turnaround at specialty pharmacies is over four days — meaning every patient waits that long before therapy starts. That time compounds across a panel of hundreds of patients.',
    fix: 'We sync PA status from CoverMyMeds into a dedicated object on the patient record, install a SLA timer on the Lightning page, and let Foundry fire when a payer window is about to slip.',
    outcome: 'Pharmacists work from one queue. Patients start therapy sooner because nothing stalls silently.',
  },
  packaging: standardPackaging('Specialty Pharmacy'),
  faqs: [
    {
      question: 'Is Health Cloud the right fit for a specialty pharmacy?',
      answer:
        'Yes. Health Cloud gives you the HIPAA-aligned patient model and care plan objects out of the box. We add the Prescription, Prior Auth, and Refill objects that make it specific to specialty and compounding work.',
    },
    {
      question: 'How do you handle HIPAA and PHI?',
      answer:
        'Health Cloud is HIPAA-compliant. We sign a BAA, operate with least-privilege permissions, and use Shield Platform Encryption plus Field Audit Trail on any PHI that hits Salesforce. Twilio HIPAA mode is the only outreach path we run for patient SMS.',
    },
    {
      question: 'Does this work alongside PioneerRx?',
      answer:
        'PioneerRx stays the system of record for dispensing. We sync a read-only projection of dispense data, refill schedules, and inventory lots into Salesforce for the views pharmacists need.',
    },
    {
      question: 'Can we track DEA reporting and controlled substances?',
      answer:
        'Yes. Custom objects track controlled substance variance against the DEA 24-hour window, and Foundry agents fire on anomaly. Our compliance officers can walk you through the specifics.',
    },
  ],
};

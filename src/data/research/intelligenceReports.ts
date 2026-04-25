/**
 * Intelligence Reports — page content.
 * All copy and structured data for /research/intelligence-reports/.
 * Updates land via PR.
 */

export type ReportBlock = {
  title: string;
  description: string;
};

export type PipelineStep = {
  number: number;
  title: string;
  description: string;
};

export type UseCase = {
  title: string;
  body: string;
  cta?: { label: string; href: string };
};

export type SourceCategory = {
  heading: string;
  description: string;
  sources: string[];
};

export type QACommitment = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const HERO_HEADING =
  'Research-grade reports on any entity, built on demand.';

export const HERO_BODY =
  'A bespoke intelligence report — built from public records, enrichment APIs, and your own systems, then synthesized into a citation-backed deliverable. We aggregate, enrich, verify, and write — so you read findings, not raw data. Fully managed by RevenuePoint.';

export const HERO_EYEBROW = 'RESEARCH · INTELLIGENCE REPORTS';

export const REPORT_BLOCKS: ReportBlock[] = [
  {
    title: 'Executive summary',
    description:
      'A single-page narrative the buyer reads first — the takeaways, the numbers, the recommendation. Written for the decision-maker, not the analyst.',
  },
  {
    title: 'Key intelligence',
    description:
      'Structured KPIs and entity facts surfaced as scannable tiles — ownership, financials, risk indicators, relationships, signals over time.',
  },
  {
    title: 'Findings, severity-tagged',
    description:
      'What the research uncovered, scored Critical · High · Medium · Low. Each finding cites its source and links back to the underlying record.',
  },
  {
    title: 'Recommended actions',
    description:
      'A prioritized list with effort scoping (Small · Medium · Large). Specific, attributable, and ordered so the team knows what to do Monday.',
  },
  {
    title: 'Source citations & methodology',
    description:
      'Every claim traces back to a URL, document, or record ID. The methodology section explains which sources were used, how they were verified, and what was excluded.',
  },
];

export const PIPELINE_STEPS: PipelineStep[] = [
  {
    number: 1,
    title: 'Define',
    description:
      'A named research analyst scopes the entity, the fields you need, the sources to draw from, and the cadence — recurring, one-shot, or batch.',
  },
  {
    number: 2,
    title: 'Aggregate',
    description:
      'Data is pulled from public records, enrichment APIs, and your own systems through the RevenuePoint AI Research Platform. Licensed sources are negotiated per engagement.',
  },
  {
    number: 3,
    title: 'Enrich & verify',
    description:
      'Multi-source cross-checks, confidence scoring per claim, and a two-pass agentic verification — a researcher agent assembles, a critic agent challenges.',
  },
  {
    number: 4,
    title: 'Generate, QA, deliver',
    description:
      'Agentic synthesis writes the report. A named analyst reviews before delivery. You receive a branded PDF and the structured data behind it.',
  },
];

export const USE_CASES: UseCase[] = [
  {
    title: 'Property intelligence',
    body: 'For property managers and asset managers — owner records, tax history, code violations, comparable sales, and tenant signals on every property in scope.',
    cta: { label: 'Property management →', href: '/solutions/property-management/' },
  },
  {
    title: 'Account research',
    body: 'For sales and RevOps — pre-meeting briefings on the buyer, the buying committee, the account, and the signals worth referencing in the first call.',
  },
  {
    title: 'Donor research',
    body: 'For development and major-gifts officers — wealth screens, giving history, board affiliations, and personal connections, sourced from public records.',
    cta: { label: 'Nonprofit →', href: '/solutions/nonprofit/' },
  },
  {
    title: 'Vendor due diligence',
    body: 'For procurement and risk — corporate filings, ownership chains, sanctions exposure, litigation history, and operational signals before the contract.',
  },
  {
    title: 'Candidate research',
    body: 'For executive recruiting and hiring committees — career history corroboration, public statements, board service, and reputational signals.',
  },
  {
    title: 'Competitive intelligence',
    body: 'For product and strategy teams — funding signals, hiring patterns, product moves, customer overlap, and channel partner dynamics tracked over time.',
  },
];

export const SOURCE_CATEGORIES: SourceCategory[] = [
  {
    heading: 'People & B2B',
    description: 'Contact, role, and behavioral signal data on individual professionals.',
    sources: [
      'Apollo',
      'LinkedIn (public)',
      'ZoomInfo',
      'Lusha',
      'People Data Labs',
      'Clearbit',
      'Hunter',
      'RocketReach',
    ],
  },
  {
    heading: 'Companies',
    description: 'Firmographic, ownership, and financial signal data on organizations.',
    sources: [
      'Crunchbase',
      'Dun & Bradstreet',
      'OpenCorporates',
      'ZoomInfo',
      'PitchBook',
    ],
  },
  {
    heading: 'Public records',
    description: 'Government filings, court records, and regulatory disclosures.',
    sources: [
      'SEC EDGAR',
      'PACER',
      'IRS 990s',
      'State Secretary of State filings',
      'UCC filings',
      'Court records',
    ],
  },
  {
    heading: 'Property',
    description: 'Property records, valuations, and parcel-level enrichment.',
    sources: [
      'ATTOM',
      'CoreLogic',
      'Regrid',
      'Reonomy',
      'County assessor portals',
      'MLS (where licensed)',
    ],
  },
  {
    heading: 'News & media',
    description: 'Mentions, sentiment, and event detection across media outlets.',
    sources: [
      'GDELT',
      'NewsAPI',
      'Bloomberg',
      'Factiva (where licensed)',
      'Google News',
    ],
  },
  {
    heading: 'Government',
    description: 'Federal, state, and regulatory data for compliance and exposure checks.',
    sources: [
      'USAspending.gov',
      'OFAC sanctions lists',
      'FDA databases',
      'FCC filings',
      'State procurement portals',
    ],
  },
  {
    heading: 'Web',
    description: 'Open-web sources for verification and longitudinal context.',
    sources: [
      'archive.org',
      'Common Crawl',
      'GitHub',
      'Custom scrapers (robots.txt-respecting)',
    ],
  },
];

export const SOURCES_FOOTNOTE =
  'Coverage varies by engagement. Vendor licensing is handled per project; public sources are used everywhere. If you require a source not listed, we will scope it during the call.';

export const QA_COMMITMENTS: QACommitment[] = [
  {
    title: 'Citations on every claim',
    description:
      'Every fact in the report links to its source — a URL, a document, or a record ID. No unsourced assertions.',
  },
  {
    title: 'Multi-source corroboration',
    description:
      'Claims that require confidence are verified against two or more independent sources. The confidence score appears next to the claim.',
  },
  {
    title: 'Two-pass agentic verification',
    description:
      'A researcher agent assembles the report. A critic agent challenges every finding before any human reviews it.',
  },
  {
    title: 'Named-analyst review',
    description:
      'Every report is reviewed by a named RevenuePoint analyst before it ships. The analyst is accountable for accuracy and is who you call with questions.',
  },
  {
    title: 'Auditable trail',
    description:
      'Pipeline runs are logged. Sources, prompts, intermediate outputs, and final report are reproducible on request — for compliance, dispute, or QA review.',
  },
  {
    title: 'In-scope re-runs included',
    description:
      'Corrections, scope refinements, and re-runs within the agreed engagement are included. You are not re-billed for the same pipeline.',
  },
];

export const FAQS: FaqItem[] = [
  {
    question: 'How long does a report take to deliver?',
    answer:
      'First reports typically ship two to four weeks after the scoping call — most of that is pipeline setup. Once the pipeline is built, subsequent reports on the same template ship in hours to a day, depending on source latency.',
  },
  {
    question: 'Can we use sources you do not list?',
    answer:
      'Often, yes. The list above covers the sources we use most. If you require a vertical-specific or proprietary source, we will scope licensing and integration during the call. We have not yet found a structured source we could not pull from.',
  },
  {
    question: 'Who reviews the report before delivery?',
    answer:
      'A named RevenuePoint analyst — the same person who scoped the engagement — reviews every report. The agentic pipeline does the assembly and verification; a human signs off on accuracy, framing, and recommendations before the report leaves the platform.',
  },
  {
    question: 'How do you handle confidential or proprietary inputs?',
    answer:
      'Customer-supplied data is processed inside your tenant on the RevenuePoint AI Research Platform — not sent to third-party APIs unredacted. We can sign customer DPAs and operate under specific data-handling restrictions, including air-gapped runs for regulated industries.',
  },
  {
    question: 'Can the pipeline run on a recurring cadence?',
    answer:
      'Yes — most engagements graduate from one-shot to recurring. Once the pipeline is built, recurring runs (weekly, monthly, on-event) are priced per cadence rather than per setup. Tokens are still passed through at cost.',
  },
  {
    question: 'How does this compare to Foundry Prism?',
    answer:
      'Prism writes overnight reports from the data already in your warehouse. Intelligence Reports is bespoke research from external sources — public records, enrichment APIs, and the open web. Many customers run both: Prism for operational reporting, Intelligence Reports for external research and due diligence.',
  },
  {
    question: 'What does ongoing token cost typically look like?',
    answer:
      'Token cost depends on report length, source breadth, and cadence. For a typical recurring engagement (weekly cadence, mid-depth reports), token pass-through runs $200–$800 per month. We share the line items so you can see exactly where spend lands.',
  },
];

export const PRICING = {
  setupHeadline: 'Starting at $6,800',
  setupSubtitle:
    'Pipeline build, research orchestration, and first report — billed hourly against a scoped estimate.',
  tokenLine: '+ Agentic AI token costs, passed through at cost.',
  included: [
    'Scoping call with a named research analyst',
    'Pipeline build inside the RevenuePoint AI Research Platform',
    'Source licensing handled per engagement',
    'Branded PDF + structured data export',
    'Two-pass agentic verification + named-analyst review',
    'Auditable run log with sources, prompts, and outputs',
    'In-scope re-runs included during the engagement',
  ],
  disclaimer:
    'Recurring engagements priced per cadence. Final scope and timeline confirmed in a 30-minute scoping call before invoicing.',
};

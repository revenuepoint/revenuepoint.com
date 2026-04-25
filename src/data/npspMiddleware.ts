/**
 * NPSP Middleware content — open-core donor stack sold alongside Salesforce NPSP.
 * Public repo: https://github.com/revenuepoint/npsp-middleware (AGPL-3.0)
 * Managed tier: $6,000 per newsroom / year.
 *
 * This data powers the compact section on /solutions/nonprofit/ AND the
 * standalone /npsp-middleware/ page.
 */

export const NPSP_GITHUB_URL = 'https://github.com/revenuepoint/npsp-middleware';
export const NPSP_CONTACT_HREF = '/contact/?interest=NPSP+Middleware';
export const NPSP_MANAGED_PRICE = '$6,000';
export const NPSP_MANAGED_PERIOD = 'per newsroom / year';

export type NpspFeature = {
  title: string;
  body: string;
};

export type NpspIntegration = {
  name: string;
  purpose: string;
};

export type NpspPremiumCapability = {
  name: string;
  body: string;
};

export type NpspMatrixRow = {
  label: string;
  openSource: boolean;
  managed: boolean;
  note?: string;
};

export type NpspFaqItem = {
  question: string;
  answer: string;
};

/* -------------------------- Baked-in features (both tiers) -------------------------- */
export const npspFeatures: NpspFeature[] = [
  {
    title: '3-step donate form',
    body: 'Amount → Info → Payment, with one-time / monthly / annual frequency, Apple Pay, Google Pay, ACH, tribute gifts, cover-fees math, and URL-param pre-fill (UTM + campaign + amount).',
  },
  {
    title: 'Member portal',
    body: 'Magic-link auth (no passwords), gift history, recurring management, tribute history, and receipt downloads. Portal donors manage themselves.',
  },
  {
    title: 'Events + RSVPs',
    body: 'Event pages, paid / free ticketing, RSVP capture, and attendance sync back into the NPSP campaign — no separate event platform.',
  },
  {
    title: 'Salesforce / NPSP sync',
    body: 'Donations, recurring gifts, contacts, and households flow into NPSP with proper relationship and soft-credit handling. Dedupe rules respected.',
  },
  {
    title: 'Plugin architecture',
    body: 'A stable `@npsp-middleware/plugin-api` surface lets you swap payment rails, add a CRM, or ship a custom integration without forking the core.',
  },
];

/* ------------------------------ Baked-in integrations ------------------------------ */
export const npspIntegrations: NpspIntegration[] = [
  { name: 'Stripe', purpose: 'Cards, ACH, Apple Pay, Google Pay, recurring subscriptions.' },
  { name: 'PayPal', purpose: 'PayPal Checkout for one-time and recurring giving.' },
  { name: 'Salesforce / NPSP', purpose: 'Two-way sync for donors, households, gifts, recurring donations.' },
  { name: 'Eventbrite', purpose: 'Event ticketing and attendee sync for newsroom events.' },
  { name: 'Subtext', purpose: 'SMS — reader-to-newsroom text conversations, logged to NPSP.' },
  { name: 'SendGrid', purpose: 'Transactional email — receipts, magic links, thank-you sequences.' },
  { name: 'WordPress', purpose: 'Reader identity + story events piped from your WordPress newsroom.' },
  { name: 'Datadog', purpose: 'RUM, APM, session replay, uptime — managed tier only.' },
];

/* ------------------------------ Managed-tier premium stack ------------------------- */
export const npspPremiumStack: NpspPremiumCapability[] = [
  {
    name: '99.9% uptime SLA',
    body: 'Monitored and on-call — we own the pager so your team does not.',
  },
  {
    name: 'Datadog RUM + APM',
    body: 'Real-user monitoring and application performance traces across every donor interaction. Alerts routed to our on-call rotation.',
  },
  {
    name: 'Session replay',
    body: 'Every donate-form session is captured so we can diagnose drop-offs frame-by-frame and push fixes without you filing a ticket.',
  },
  {
    name: 'Frustration counter',
    body: 'Rage-clicks and dead-clicks are flagged per session. When a donate-form element trips repeated frustration, we fix it.',
  },
  {
    name: 'Stripe Smart Retries + Account Updater',
    body: 'Failed recurring charges recovered automatically. Expired cards refreshed. Monthly donors stay donors without manual re-auth.',
  },
  {
    name: 'WordPress reader de-anonymization',
    body: 'Anonymous readers on your WordPress newsroom are matched to NPSP donor records by cookie, IP, and fingerprint. A reader who donates later gets their reading history attached to their donor profile.',
  },
  {
    name: 'Story-to-gift attribution',
    body: 'The last story a donor read before giving is written to the NPSP gift record. Drives "your gift funded this story" stewardship emails and grant reporting.',
  },
  {
    name: 'Foundry connection',
    body: 'Lapsed-donor anomalies, recurring-gift failures, and campaign pace surface in the Foundry Home Feed with recommended actions. No separate alerting tool.',
  },
  {
    name: '501(c)(3) tax receipt automation',
    body: 'IRS-compliant PDF receipts issued at gift time and a consolidated year-end letter generated in January. All archived on the NPSP donor record.',
  },
  {
    name: 'AI impact emails',
    body: 'Quarterly "your impact" emails drafted from NPSP gift history + published story list, queued in SendGrid for staff approval before send.',
  },
];

/* ------------------------------ Open-source vs Managed matrix --------------------- */
export const npspMatrix: NpspMatrixRow[] = [
  { label: 'Donate form + member portal + events', openSource: true, managed: true },
  { label: 'Stripe / PayPal / Salesforce / SendGrid / Subtext / Eventbrite', openSource: true, managed: true },
  { label: 'Plugin architecture + plugin API', openSource: true, managed: true },
  { label: 'Self-host on your own infra (Heroku / Render / bare metal)', openSource: true, managed: false },
  { label: '99.9% uptime SLA + on-call response', openSource: false, managed: true },
  { label: 'Hosting, deploys, security patching, upgrades', openSource: false, managed: true },
  { label: 'Datadog RUM + APM + logs', openSource: false, managed: true },
  { label: 'Session replay + frustration counter', openSource: false, managed: true },
  { label: 'Stripe Smart Retries + Account Updater (dunning)', openSource: false, managed: true },
  { label: 'WordPress reader de-anonymization', openSource: false, managed: true },
  { label: 'Story-to-gift attribution', openSource: false, managed: true },
  { label: 'Foundry connection for alerts + agents', openSource: false, managed: true },
  { label: '501(c)(3) tax-receipt automation', openSource: false, managed: true },
  { label: 'AI-drafted quarterly impact emails', openSource: false, managed: true },
  { label: 'White-glove onboarding + NPSP data migration', openSource: false, managed: true },
];

/* ------------------------------ Components showcase (standalone page) -------------- */
export const npspComponents: { title: string; body: string; tag: string }[] = [
  {
    tag: 'Donor-facing',
    title: '3-step donate form',
    body: 'Inline progress, sticky summary rail, one-tap Apple/Google Pay, tribute gifts, cover-fees, UTM capture, URL pre-fill for amount / frequency / campaign.',
  },
  {
    tag: 'Donor-facing',
    title: 'Magic-link member portal',
    body: 'No passwords. Gift history, recurring management, tribute history, receipt downloads, address and payment-method updates.',
  },
  {
    tag: 'Donor-facing',
    title: 'Events + RSVP',
    body: 'Paid and free events, capacity limits, waitlists, attendee sync to NPSP campaign members.',
  },
  {
    tag: 'Staff',
    title: 'Tribute gift flow',
    body: 'In-honor / in-memory dedications with notify-recipient email, captured as a related record on the gift.',
  },
  {
    tag: 'Staff (managed)',
    title: 'Staff console',
    body: 'Managed-tier only. Tenant admin, integration health, donor search, bulk actions, and audit log across every transaction.',
  },
];

/* ------------------------------ FAQ ---------------------------------------------- */
export const npspFaq: NpspFaqItem[] = [
  {
    question: 'Can we self-host and move to managed later?',
    answer:
      'Yes. Self-host today, migrate to managed when you are ready. The data contract and plugin API do not change across tiers, so your integrations keep working. We handle the migration.',
  },
  {
    question: 'Is there vendor lock-in?',
    answer:
      'No. The core is AGPL-3.0 open source — fork it, run it, modify it. The managed tier adds operational lift and premium integrations, but nothing we ship traps your donor data. All Salesforce syncs land in NPSP records you own.',
  },
  {
    question: 'How does the Salesforce sync handle duplicates?',
    answer:
      'NPSP duplicate-management rules are honored. We match on email + household and fall back to NPSP\'s contact-matching behavior when the rules are ambiguous. Edge cases route to a review queue in the staff console.',
  },
  {
    question: 'Do you support PayPal recurring and ACH?',
    answer:
      'Yes to both. Stripe handles cards + ACH + Apple / Google Pay. PayPal handles its own recurring via the PayPal subscriptions API. Both flow into NPSP as recurring donations with the right payment-method attribution.',
  },
  {
    question: 'Is there an SLA on the free self-hosted version?',
    answer:
      'No. The open-source build is provided as-is under AGPL-3.0. The 99.9% uptime SLA, on-call support, Datadog observability, and session replay are managed-tier only. If uptime matters for your donate form, choose the managed tier.',
  },
  {
    question: 'How is the "per newsroom / year" price structured?',
    answer:
      'One tenant per newsroom. $6,000 covers hosting, operations, the full premium stack, upgrades, and a named RevenuePoint administrator. Multiple newsrooms under one parent organization are quoted as additional tenants.',
  },
];

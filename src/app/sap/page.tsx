import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/ui/HeroSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { StepList } from '@/components/ui/StepList';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { LeadForm } from '@/components/ui/LeadForm';

export const metadata = buildMetadata({
  title: 'SAP Managed Services — Business One & S/4HANA',
  description:
    'A named SAP consultant and project manager. Two-week sprints. Inventory, financial close, end-user support, workflow tuning — fully managed by RevenuePoint, across SAP Business One and S/4HANA.',
  path: '/sap/',
});

const activities = [
  {
    title: 'Inventory & Warehouse',
    body: 'Item master maintenance, cycle counts, transfers and allocations, MRP tuning, bin and warehouse reorganization, item cost reviews. The day-to-day moves that keep your inventory data trustworthy.',
  },
  {
    title: 'Financials & Accounting',
    body: 'Month-end close support, AP/AR configuration, GL fixes, recurring journals, posting period control, financial report tuning. We work alongside your controller, not around them.',
  },
  {
    title: 'End-User Support',
    body: 'Login and authorization issues, "how do I do X in SAP", training questions, document recovery. Your users open tickets directly with a named consultant who already knows your config.',
  },
  {
    title: 'Workflow Iteration',
    body: 'Approval routing, document numbering series, sales and purchase workflow refinement, alert and notification tuning. Post-go-live, the workflows always need adjustment — we run that adjustment loop.',
  },
  {
    title: 'Reports & Queries',
    body: 'User-defined queries, Crystal Reports tweaks, analytics dashboards, data extracts for the CFO. Reports built inside SAP, not in a side spreadsheet that drifts.',
  },
  {
    title: 'Patches, Upgrades & Integrations',
    body: 'B1 patch reviews, HANA support pack migrations, third-party integration troubleshooting (Salesforce/CRM sync, Shopify and other eCom, EDI, payment gateways). When something breaks upstream, we chase it down.',
  },
];

const engagementSteps = [
  {
    number: 1,
    title: 'A named team',
    description:
      'One dedicated SAP consultant and one dedicated project manager — your single point of contact. The same people every sprint.',
  },
  {
    number: 2,
    title: 'A block of hours each month',
    description:
      'Sized to the work your instance actually needs — small monthly retainers for stable orgs, larger blocks for orgs in active iteration.',
  },
  {
    number: 3,
    title: 'Two-week sprints',
    description:
      'You queue requests; we plan, build, demo, and ship on a two-week cadence. Transparent backlog, predictable delivery.',
  },
  {
    number: 4,
    title: 'Month-to-month',
    description:
      'No long-term contract. No commitment beyond the current month. If the work is not landing, you can cancel.',
  },
];

const audienceSegments = [
  {
    headline: 'Just went live on B1 or S/4HANA',
    body: 'You finished implementation and the consulting team is rolling off. The configuration is fresh and you need someone to keep it that way as your team starts using it for real.',
  },
  {
    headline: 'Lost an internal SAP champion',
    body: 'The person who knew the system left, retired, or moved roles. Knowledge walked out with them. We pick up the backlog, document what was undocumented, and keep operations running.',
  },
  {
    headline: 'Underused modules',
    body: 'You\'re running a fraction of what you paid for because nobody knows how to configure the rest. We pick up the unused modules — manufacturing, service, advanced inventory — and turn them on.',
  },
  {
    headline: 'Active workflow iteration',
    body: 'Post-go-live, the approvals, document flows, and alerts always need adjustment. We run the change cycle so your business gets the workflows it actually needs, not the ones the implementer guessed at.',
  },
];

const faqs = [
  {
    question: 'Do you support both Business One and S/4HANA?',
    answer:
      'Yes. The team works across both. Most of our SMB clients run B1; our enterprise clients run S/4HANA. The engagement model is the same; the modules and toolset differ.',
  },
  {
    question: 'What versions of B1 / S/4HANA do you support?',
    answer:
      'Business One across recent supported versions on both SQL and HANA. S/4HANA on-prem and Public Cloud. If you are on an older release than mainstream support covers, we can usually still help, but a version review is part of intake.',
  },
  {
    question: 'Can you help with our SAP-to-Salesforce (or other) integration?',
    answer:
      'Yes. Integration troubleshooting and ongoing maintenance is part of the engagement — connectors, mapping reviews, broken-pipeline diagnosis. We also work the Salesforce side directly if that is where the issue is.',
  },
  {
    question: 'How do you handle SAP patch and upgrade cycles?',
    answer:
      'We review release notes against your configuration, test in a sandbox where one exists, and coordinate the production push. You get a short briefing on anything that will change for your users — no surprises on upgrade day.',
  },
  {
    question: 'Can we keep our internal SAP person and use you alongside?',
    answer:
      'Yes — and it is a common arrangement. Your internal lead owns day-to-day operations and the institutional knowledge; we pick up advanced configuration, integration work, and the specialties they do not have time for. We work from the same backlog.',
  },
];

const foundryPillars = [
  {
    eyebrow: '01 · Connect',
    headline: 'Every system you run, on one warehouse.',
    body: 'SAP, Salesforce, accounting, marketing, and telephony wired into a managed pipeline so every record matches on every side.',
  },
  {
    eyebrow: '02 · Illuminate',
    headline: 'Live dashboards. Overnight AI analysis.',
    body: 'Lens dashboards for every role and Prism reports written overnight so leadership has answers by 8 AM.',
  },
  {
    eyebrow: '03 · Act',
    headline: 'Agents watch, decide, and execute.',
    body: 'Agents and Otto take action across SAP and the rest of your stack — fully auditable, fully managed.',
  },
];

export default function SAPPage() {
  return (
    <>
      <HeroSection
        eyebrow="SAP MANAGED SERVICES"
        heading="Your outsourced SAP admin team. Business One and S/4HANA, fully managed by RevenuePoint."
        body="A named consultant and project manager. A block of hours each month. Two-week sprints to ship the work. Inventory, financial close, end-user support, workflow tuning — everything an in-house SAP admin would do, sized to a smaller team that doesn't need a full-time hire."
        ctas={[
          { label: 'Start a managed services engagement', href: '#lead-form', variant: 'primary' },
          { label: 'See pricing', href: '/sap/pricing/', variant: 'secondary' },
        ]}
        variant="navy"
      />

      {/* What's included */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="What's included"
            heading="Everything an in-house SAP admin would do"
            body="Managed services is not a rotating help-desk queue. It is a named team running an agreed block of hours each month against the backlog of work your SAP instance actually needs."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <ServiceCard key={activity.title} title={activity.title} body={activity.body} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-offWhite py-16 lg:py-24 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="How it works"
            heading="Named team. Hours each month. Two-week sprints. Month-to-month."
            body="The engagement model is boring on purpose. You should know who is doing your work, how many hours you have, when the next change is going out, and that you can walk away if the work is not landing."
          />
          <StepList steps={engagementSteps} />
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader
            eyebrow="Who it's for"
            heading="Four situations where managed services is the right shape"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {audienceSegments.map((segment) => (
              <div
                key={segment.headline}
                className="border border-border rounded-sm bg-white p-6"
              >
                <h3 className="text-lg font-semibold text-navy mb-3">{segment.headline}</h3>
                <p className="text-sm text-bodyText leading-relaxed">{segment.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing summary */}
      <section className="bg-offWhite py-16 lg:py-24 border-y border-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <SectionHeader
            eyebrow="Pricing"
            heading="Sized to your modules, your users, and your integrations"
            body="Every SAP engagement is scoped — module mix, user count, integration footprint, and how active your roadmap is. There are no off-the-shelf tiers; there is a quote that fits your operations."
          />
          <Link
            href="/sap/pricing/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-sm bg-crimson text-white text-sm font-semibold hover:bg-crimsonDark transition-colors"
          >
            See how we scope it &rarr;
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader
            eyebrow="Frequently asked"
            heading="What teams ask before they engage"
          />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* Foundry jumpoff */}
      <section className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
              Foundry &middot; Orchestrated intelligence
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Foundry connects your SAP data to the rest of your stack.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-300">
              Once your SAP is humming, Foundry pipes the data inside it — inventory, financials,
              sales — into live dashboards, AI reports, and agents that take action across
              Salesforce, accounting, telephony, and the rest of your systems. Fully managed by
              RevenuePoint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {foundryPillars.map((pillar) => (
              <div
                key={pillar.eyebrow}
                className="border border-white/10 rounded-lg bg-white/[0.03] p-5"
              >
                <div className="text-[10px] uppercase tracking-widest text-crimson font-semibold">
                  {pillar.eyebrow}
                </div>
                <div className="mt-2 text-base font-bold text-white">{pillar.headline}</div>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              href="/foundry/"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-sm bg-crimson text-white text-sm font-semibold hover:bg-crimsonDark transition-colors"
            >
              See Foundry in full &rarr;
            </Link>
            <Link
              href="/contact/?interest=Foundry"
              className="text-sm text-gray-300 hover:text-white underline underline-offset-4"
            >
              Request a Foundry demo &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="bg-offWhite py-16 lg:py-24 border-t border-border">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader
            heading="Tell us about your SAP managed services needs"
            body="We will confirm fit, scope the engagement, and send a statement of work."
          />
          <LeadForm interest="SAP Managed Services" id="lead-form" />
        </div>
      </section>
    </>
  );
}

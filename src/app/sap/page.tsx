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
        byline="SAP · Managed services"
        heading={
          <>
            Your outsourced <em>SAP admin team</em>. Business One and S/4HANA, fully managed.
          </>
        }
        body="A named consultant and project manager. A block of hours each month. Two-week sprints to ship the work. Inventory, financial close, end-user support, workflow tuning — everything an in-house SAP admin would do, sized to a smaller team that doesn't need a full-time hire."
        ctas={[
          { label: 'Start a managed services engagement', href: '#lead-form', variant: 'primary' },
          { label: 'See pricing', href: '/sap/pricing/', variant: 'secondary' },
        ]}
        issue="P"
        sidenote="Business One + S/4HANA · Two-week sprints · Month-to-month · Named consultant + PM."
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
      <section className="bg-cream py-16 lg:py-24 border-y border-rule">
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
      <section className="bg-paper py-section">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Who it's for"
            heading={
              <>
                Four situations where managed services is the <em>right shape</em>.
              </>
            }
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {audienceSegments.map((segment, idx) => (
              <article
                key={segment.headline}
                className="relative border border-ruleSoft bg-cream p-6 lg:p-7"
              >
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-crimson" />
                <p className="font-serif italic text-[1.25rem] text-crimson mt-3 leading-none">
                  {['i', 'ii', 'iii', 'iv'][idx]}
                </p>
                <h3 className="mt-3 font-serif text-[1.125rem] text-ink leading-tight font-medium">
                  {segment.headline}
                </h3>
                <p className="mt-3 text-sm text-inkSoft leading-relaxed">{segment.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing summary */}
      <section className="bg-cream border-y border-ruleSoft py-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <SectionHeader
            eyebrow="Pricing"
            heading={
              <>
                Sized to your <em>modules</em>, your users, your integrations.
              </>
            }
            body="Every SAP engagement is scoped — module mix, user count, integration footprint, and how active your roadmap is. There are no off-the-shelf tiers; there is a quote that fits your operations."
            align="center"
          />
          <Link
            href="/sap/pricing/"
            className="inline-flex items-center gap-2 border border-crimson text-crimson font-serif italic text-[15px] px-5 py-2 hover:bg-crimsonTint transition-colors"
          >
            See how we scope it <span aria-hidden="true">→</span>
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
      <section className="bg-ink text-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-8 py-section">
          <div className="max-w-3xl mb-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/70 inline-flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-crimson" />
              Foundry · Orchestrated intelligence
            </p>
            <h2 className="text-d1 font-serif font-medium text-paper leading-tight">
              Foundry connects your <em className="text-crimson">SAP data</em> to the rest of your stack.
            </h2>
            <p className="mt-4 text-lede leading-[1.65] text-paper/80 max-w-prose">
              Once your SAP is humming, Foundry pipes the data inside it — inventory, financials, sales — into live dashboards, AI reports, and agents that take action across Salesforce, accounting, telephony, and the rest of your systems. Fully managed by RevenuePoint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {foundryPillars.map((pillar) => (
              <div key={pillar.eyebrow} className="border-t border-paper/20 pt-5 relative">
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-crimson" />
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/60">
                  {pillar.eyebrow}
                </p>
                <h3 className="mt-3 font-serif text-[1.25rem] text-paper font-medium leading-tight">
                  {pillar.headline}
                </h3>
                <p className="mt-3 text-sm text-paper/75 leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              href="/foundry/"
              className="inline-flex items-center gap-2 border border-paper text-paper font-serif italic text-[15px] px-5 py-2 hover:bg-paper hover:text-ink transition-colors"
            >
              See Foundry in full <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/contact/?interest=Foundry"
              className="font-serif italic text-sm text-paper/80 hover:text-paper underline underline-offset-4"
            >
              Request a Foundry demo →
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="bg-cream py-16 lg:py-24 border-t border-rule">
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

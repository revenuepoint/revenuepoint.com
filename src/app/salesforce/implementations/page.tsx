import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/ui/HeroSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { PricingCard } from '@/components/ui/PricingCard';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { LeadForm } from '@/components/ui/LeadForm';
import { ScreenshotPlaceholder } from '@/components/ui/ScreenshotPlaceholder';
import { industryPageList } from '@/data/industries';

export const metadata = buildMetadata({
  title: 'Salesforce Implementations',
  description:
    'Typical Salesforce implementations from $15,000 in 6–8 weeks. Greenfield Sales Cloud builds and migrations off HubSpot, Dynamics, or spreadsheets — delivered by RevenuePoint, then fully managed.',
  path: '/salesforce/implementations/',
});

const engagementTypes = [
  {
    title: 'Greenfield Sales Cloud',
    body: "Standing up a new Salesforce tenant from scratch. Accounts, contacts, opportunities, products, pipeline, dashboards, integrations, security, training — configured to your process, not to a template.",
  },
  {
    title: 'Migration from another CRM',
    body: "Moving off HubSpot, Dynamics, Zoho, Pipedrive, or spreadsheets. We map your data, rebuild the process on Salesforce, migrate history you actually need, and retire the old system on a date you pick.",
  },
  {
    title: 'Re-implementation',
    body: "Fixing a Salesforce instance that was never properly configured — or one that drifted into an unsupportable state. A fresh foundation on your existing org, without losing the history you've built.",
  },
];

const implementationSteps = [
  {
    number: 1,
    title: 'Discovery & Design',
    description:
      'Kickoff, onboarding survey, and requirements workshops with your process owners. We review current systems, document the Day-1 user stories, map integration fields, execute the Salesforce order form, and stand up the sandboxes.',
  },
  {
    number: 2,
    title: 'Core Build (Sprints)',
    description:
      'Accounts, contacts, opportunities, products, leads, campaigns, cases, dashboards, reports, automations, email alerts, profiles, permission sets, role hierarchy, custom objects, and third-party integrations — built in sprints against the approved scope.',
  },
  {
    number: 3,
    title: 'User Acceptance Testing',
    description:
      'Iterative FUAT cycles with your team running real scenarios. Each cycle produces a triaged defect list; we fix, retest, and sign off functional build before anything touches production.',
  },
  {
    number: 4,
    title: 'Documentation & Training',
    description:
      'Business process documentation and training resources authored to your configuration — then live end-user training sessions. Pairs naturally with our embedded Playbook engagement for orgs that want the knowledge to persist.',
  },
  {
    number: 5,
    title: 'Go-Live',
    description:
      'Go-live comms with cut-off dates, master data migration build and sign-off, production data import, and a Go / No-Go decision meeting before cutover. Everyone knows the plan before the switch flips.',
  },
  {
    number: 6,
    title: 'Hypercare → Managed Services',
    description:
      'A dedicated hypercare window immediately after go-live for rapid fixes and user questions — then a clean handoff into ongoing Managed Administration so your org stays healthy as it grows.',
  },
];

const standardFeatures = [
  'Sales Cloud, standard objects',
  '1–2 integrations (e.g., Office 365, email, one third-party)',
  'Light customization on standard objects',
  'Dashboards + reports for sales leadership',
  '2 FUAT cycles',
  'End-user training + go-live',
  'Hypercare included post-go-live',
];

const growthFeatures = [
  'Multi-cloud possible (Service Cloud, CPQ)',
  '2–4 integrations (ERP, accounting, marketing, telephony)',
  'Moderate custom objects and automation',
  'Territory management + role hierarchy',
  'Dashboards + reports across sales, service, and leadership',
  '3–4 FUAT cycles',
  'End-user training + go-live',
  'Hypercare included post-go-live',
];

const enterpriseFeatures = [
  'Complex multi-cloud footprint',
  'Heavy integration footprint (ERP, data warehouse, middleware)',
  'Custom Apex, Lightning Web Components, Experience Cloud',
  'Multi-region or multi-entity configuration',
  'Staged rollout with change management',
  'Extended FUAT and parallel-run cycles',
  'Dedicated program manager + architect',
];

const faqs = [
  {
    question: 'How do fixed-fee implementations work — what triggers a change order?',
    answer:
      "The price and timeline are fixed against the scope we sign off in Discovery. If you add in-scope items — another integration, a new custom object, a cloud we did not plan for — we write a change order with the incremental scope and cost. Anything inside the original scope is ours to deliver on the number we quoted. No surprise invoices.",
  },
  {
    question: 'Can we run the project if our data is in Excel, HubSpot, or Dynamics today?',
    answer:
      "Yes — migration is one of the most common shapes of our implementations. We map your current fields to Salesforce, decide together which history is worth migrating, clean and deduplicate as part of the load, and retire the old system on a date you pick. Spreadsheet data is handled the same way: the shape of the data matters more than where it lives now.",
  },
  {
    question: 'Do we need to buy Salesforce licenses through you?',
    answer:
      "No. You can buy licenses direct from Salesforce or through us — either works. We will engage your Salesforce account executive during Discovery so the edition, user counts, and add-ons match the scope we are building.",
  },
  {
    question: 'How do you handle data migration and deduplication?',
    answer:
      "We build a migration master dataset in a sandbox first, dedupe against it, run a dry-run load, and show you the result before anything touches production. Your team signs off on the master data and on the production import. Cutover is a scheduled event, not a guessing game.",
  },
  {
    question: 'What does "go-live" actually mean — is the team using it on day one?',
    answer:
      "Yes. Go-live means your users are working in Salesforce, against the processes we documented, with data already migrated. Training happens before go-live so nobody is figuring it out live. Hypercare catches the small edges in the first weeks.",
  },
  {
    question: 'What happens after go-live?',
    answer:
      "Hypercare first — a focused support window for rapid fixes and user questions. Then a transition into ongoing Managed Administration so your org stays healthy as it grows. Most customers roll straight into a Sales Cloud or Full Stack Administration plan.",
  },
];

const foundryPillars = [
  {
    eyebrow: '01 · Connect',
    headline: 'Every system you run, on one warehouse.',
    body: 'Salesforce, ERP, accounting, marketing, and telephony wired into a managed pipeline so every record matches on every side.',
  },
  {
    eyebrow: '02 · Illuminate',
    headline: 'Live dashboards. Overnight AI analysis.',
    body: 'Lens dashboards for every role and Prism reports written overnight so leadership has answers by 8 AM.',
  },
  {
    eyebrow: '03 · Act',
    headline: 'Agents watch, decide, and execute.',
    body: 'Agents and Otto take action across Salesforce and the rest of your stack — fully auditable, fully managed.',
  },
];

export default function SalesforceImplementationsPage() {
  return (
    <>
      <HeroSection
        byline="Salesforce · Implementations"
        heading={
          <>
            A working CRM your team uses on <em>day one</em>.
          </>
        }
        body="Every Salesforce implementation we run is fixed-fee, time-boxed, and delivered against a documented scope — whether it is a greenfield Sales Cloud build, a migration off HubSpot or Dynamics, or a re-implementation of an org that never got configured right. Discovery, build, UAT, training, go-live, hypercare. Then fully managed by RevenuePoint."
        sidenote="Fixed-fee · time-boxed · documented scope · then fully managed."
        ctas={[
          { label: 'Schedule a Salesforce scoping call', href: '#lead-form', variant: 'primary' },
          { label: 'See typical pricing', href: '#pricing', variant: 'secondary' },
        ]}
        rightSlot={
          <ScreenshotPlaceholder
            label="Go-live dashboard in Salesforce"
            width={520}
            height={360}
          />
        }
        variant="light"
      />

      {/* Engagement types */}
      <section className="bg-white py-16 lg:py-24 border-t border-rule">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="Shapes of an implementation"
            heading="New tenant, migration, or a reset on the org you already have."
            body="Most of our implementations fall into one of three shapes. The process below is the same in all three — what changes is the starting point."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engagementTypes.map((type) => (
              <ServiceCard key={type.title} title={type.title} body={type.body} />
            ))}
          </div>
        </div>
      </section>

      {/* Implementation process */}
      <section className="bg-cream py-16 lg:py-24 border-y border-rule">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="Our implementation process"
            heading="Six phases. Documented scope. No surprises at go-live."
            body="Every implementation runs the same six phases. The length of each phase scales with the size of the engagement — a 6-week Standard compresses what a 12-week Growth expands."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {implementationSteps.map((step) => (
              <div
                key={step.number}
                className="bg-white border border-rule rounded-sm shadow-sm p-6"
              >
                <div className="w-10 h-10 rounded-full bg-crimsonTint text-crimson font-bold text-lg flex items-center justify-center mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">{step.title}</h3>
                <p className="text-sm text-ink leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section id="pricing" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="Typical engagements"
            heading="Three typical shapes. Fixed fee. Fixed timeline."
            body="These are the three engagements we run most often. Final scope and price are set during Discovery — the numbers below are what most projects land at."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <PricingCard
              name="Standard"
              price="$15,000"
              period="typical · 6–8 weeks"
              description="Up to ~50 users."
              features={standardFeatures}
              cta={{ label: 'Scope a Standard build', href: '#lead-form' }}
            />
            <PricingCard
              name="Growth"
              price="$30,000"
              period="typical · 10–12 weeks"
              description="Up to ~250 users."
              features={growthFeatures}
              highlight
              cta={{ label: 'Scope a Growth build', href: '#lead-form' }}
            />
            <PricingCard
              name="Enterprise"
              price="Custom"
              description="250+ users, multi-entity, or complex multi-cloud."
              features={enterpriseFeatures}
              cta={{ label: 'Schedule an Enterprise scoping call', href: '#lead-form' }}
            />
          </div>

          <p className="text-center text-sm text-mute mt-6">
            Typical ranges. Final scope and price are set during Discovery.
          </p>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-cream py-16 lg:py-24 border-y border-rule">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="Industries we implement in"
            heading="Ten industries. Ten record pages that actually fit."
            body="Salesforce looks different in a specialty pharmacy than it does in a distributor or a nonprofit. Our implementations ship with Lightning record pages configured the way your industry actually runs."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {industryPageList.map((industry) => (
              <Link
                key={industry.id}
                href={`/solutions/${industry.slug}/`}
                className="group border border-rule rounded-lg bg-white p-6 hover:border-navySoft transition-colors block"
              >
                <div className="text-[10px] uppercase tracking-widest text-navySoft font-semibold">
                  Industry
                </div>
                <h3 className="mt-2 text-xl font-bold text-navy tracking-tight">
                  {industry.navLabel}
                </h3>
                <p className="mt-3 text-sm text-ink leading-relaxed">
                  {industry.hero.sub}
                </p>
                <div className="mt-5 pt-4 border-t border-rule text-[10px] uppercase tracking-widest text-mute font-semibold">
                  Record page + {industry.lexComponents.length} components +{' '}
                  {industry.integrations.systems.length} integrations
                </div>
                <div className="mt-3 text-sm text-crimson font-semibold group-hover:underline">
                  Explore {industry.navLabel} &rarr;
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/solutions/"
              className="text-sm font-semibold text-crimson hover:text-crimsonDeep transition-colors inline-flex items-center gap-1"
            >
              See all industries <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader
            eyebrow="Frequently asked"
            heading="What teams ask before they commit"
          />
          <FAQAccordion items={faqs} />
          <p className="mt-8 text-sm text-ink leading-relaxed">
            Not sure if you need an implementation or a reset?{' '}
            <Link
              href="/salesforce/health-check/"
              className="text-crimson font-semibold hover:text-crimsonDeep"
            >
              A CRM Health Check
            </Link>{' '}
            is often the right first step — it tells you whether the org you already have is worth
            keeping.
          </p>
        </div>
      </section>

      {/* Managed Services handoff */}
      <section className="bg-cream py-16 lg:py-24 border-y border-rule">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader
            eyebrow="After go-live"
            heading="Fully managed by RevenuePoint. From day one, every day after."
            body="Every implementation includes a hypercare window immediately after go-live — focused support for rapid fixes and user questions while your team settles in. After hypercare, customers transition onto a Managed Administration plan so the org stays clean, supported, and growing."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-white border border-rule rounded-sm shadow-sm p-6">
              <div className="text-[10px] uppercase tracking-widest text-navySoft font-semibold">
                Hypercare
              </div>
              <h3 className="mt-2 text-lg font-semibold text-navy">
                Included in every implementation.
              </h3>
              <p className="mt-3 text-sm text-ink leading-relaxed">
                A dedicated post-go-live support window where the same team that built the org is
                on call for rapid fixes, user questions, and small configuration changes. No new
                contract, no new contacts.
              </p>
            </div>
            <div className="bg-white border border-rule rounded-sm shadow-sm p-6">
              <div className="text-[10px] uppercase tracking-widest text-navySoft font-semibold">
                Managed Administration
              </div>
              <h3 className="mt-2 text-lg font-semibold text-navy">
                Ongoing admin, your single point of contact, no long-term contract.
              </h3>
              <p className="mt-3 text-sm text-ink leading-relaxed">
                Your single point of contact at RevenuePoint and a project manager running your org — audits,
                automations, data hygiene, training, and third-party integration support. Sales
                Cloud Administration from $2,400/month; Full Stack from $4,000/month.
              </p>
              <Link
                href="/salesforce/managed-services/pricing/"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-crimson hover:text-crimsonDeep transition-colors"
              >
                See Managed Administration plans <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Foundry teaser */}
      <section className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
              Foundry &middot; Orchestrated intelligence
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Once your new Salesforce is clean, Foundry sits on top of it.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-300">
              A good implementation gives you a clean foundation. Foundry is what comes next —
              connecting the rest of your stack (ERP, accounting, telephony, marketing), delivering
              live dashboards and overnight AI reports, and running agents that take action across
              every system. Fully managed by RevenuePoint.
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
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-sm bg-crimson text-white text-sm font-semibold hover:bg-crimsonDeep transition-colors"
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
      <section className="bg-cream py-16 lg:py-24 border-t border-rule">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader
            heading="Tell us about your Salesforce implementation"
            body="We will confirm fit, scope the engagement, and send a statement of work."
          />
          <LeadForm interest="Salesforce Implementation" id="lead-form" />
        </div>
      </section>
    </>
  );
}

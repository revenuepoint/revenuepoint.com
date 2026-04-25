import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/ui/HeroSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { StepList } from '@/components/ui/StepList';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { LeadForm } from '@/components/ui/LeadForm';
import {
  managedServicesActivities,
  engagementSteps,
  audienceSegments,
  managedServicesFaqs,
} from '@/data/salesforceManagedServices';

export const metadata = buildMetadata({
  title: 'Salesforce Managed Services — Outsourced Admin Team',
  description:
    'A named Salesforce administrator and project manager. 25 hours per month on two-week sprints. Configurations, bug fixes, reports, end-user support — everything an in-house admin would do, fully managed by RevenuePoint.',
  path: '/salesforce/managed-services/',
});

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

export default function SalesforceManagedServicesPage() {
  return (
    <>
      <HeroSection
        eyebrow="SALESFORCE MANAGED SERVICES"
        heading="Your outsourced Salesforce admin team. Fully managed by RevenuePoint."
        body="A named administrator and project manager. A block of hours every month. Two-week sprints to ship the work. Configurations, automations, integrations, end-user support, data pulls — everything an in-house Salesforce admin would do, without the hire."
        ctas={[
          { label: 'Start a managed services engagement', href: '#lead-form', variant: 'primary' },
          { label: 'See pricing', href: '/salesforce/managed-services/pricing/', variant: 'secondary' },
        ]}
        variant="light"
      />

      {/* What's included */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="What's included"
            heading="Everything an in-house Salesforce admin would do"
            body="Managed services is not a rotating help-desk queue. It is a named team running an agreed block of hours each month against the backlog of work your Salesforce instance actually needs."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {managedServicesActivities.map((activity) => (
              <ServiceCard
                key={activity.title}
                title={activity.title}
                body={activity.body}
                cta={activity.cta}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-offWhite py-16 lg:py-24 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="How it works"
            heading="Named team. Hours per month. Two-week sprints. Month-to-month."
            body="The engagement model is boring on purpose. You should know who is doing your work, how many hours you have, when the next release is going out, and that you can walk away if the work is not landing."
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
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader
            eyebrow="Pricing"
            heading="Plans start at $2,400/month for 25 hours"
            body="Three plans: Sales Cloud Administration, Full Stack Administration for the entire product suite, or a Custom Plan scoped to a unique instance. No long-term contract — cancel anytime."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="border border-border rounded-sm bg-white p-6">
              <div className="text-[10px] uppercase tracking-widest text-crimson font-semibold mb-2">
                Plan
              </div>
              <div className="text-lg font-bold text-navy">Sales Cloud Administration</div>
              <p className="mt-3 text-sm text-bodyText leading-relaxed">
                25 hours per month covering a single Salesforce Sales Cloud instance. From $2,400/month.
              </p>
            </div>
            <div className="border border-border rounded-sm bg-white p-6 ring-1 ring-crimson/20">
              <div className="text-[10px] uppercase tracking-widest text-crimson font-semibold mb-2">
                Most popular
              </div>
              <div className="text-lg font-bold text-navy">Full Stack Administration</div>
              <p className="mt-3 text-sm text-bodyText leading-relaxed">
                25 hours per month across the full Salesforce product suite — Sales, Service, CPQ, Marketing, Experience. From $4,000/month.
              </p>
            </div>
            <div className="border border-border rounded-sm bg-white p-6">
              <div className="text-[10px] uppercase tracking-widest text-crimson font-semibold mb-2">
                Plan
              </div>
              <div className="text-lg font-bold text-navy">Custom Plan</div>
              <p className="mt-3 text-sm text-bodyText leading-relaxed">
                Tailored hours, scope, and team configuration for organizations with unique needs.
              </p>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/salesforce/managed-services/pricing/"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-sm bg-crimson text-white text-sm font-semibold hover:bg-crimsonDark transition-colors"
            >
              See full pricing &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader
            eyebrow="Frequently asked"
            heading="What teams ask before they engage"
          />
          <FAQAccordion items={managedServicesFaqs} />
          <p className="mt-8 text-sm text-bodyText leading-relaxed">
            Not sure whether managed services or a one-time engagement is the right fit?{' '}
            <Link href="/salesforce/health-check/" className="text-crimson font-semibold hover:text-crimsonDark">
              A CRM Health Check
            </Link>{' '}
            is the fastest way to see what your instance actually needs before you commit.
          </p>
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
              Foundry sits on top of a clean Salesforce.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-300">
              Once your Salesforce stays clean — month after month — Foundry connects the rest of
              your stack and delivers live dashboards, AI reports, and agents that take action.
              Fully managed by RevenuePoint.
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
            heading="Tell us about your Salesforce managed services needs"
            body="We will confirm fit, scope the engagement, and send a statement of work."
          />
          <LeadForm interest="Salesforce Managed Services" id="lead-form" />
        </div>
      </section>
    </>
  );
}

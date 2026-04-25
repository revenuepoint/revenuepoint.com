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
  title: 'Salesforce Managed Services',
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
        byline="Salesforce · Managed services"
        heading={
          <>
            Your outsourced <em>Salesforce admin team</em>. Fully managed by RevenuePoint.
          </>
        }
        body="A named administrator and project manager. A block of hours every month. Two-week sprints to ship the work. Configurations, automations, integrations, end-user support, data pulls — everything an in-house Salesforce admin would do, without the hire."
        ctas={[
          { label: 'Start a managed services engagement', href: '#lead-form', variant: 'primary' },
          { label: 'See pricing', href: '/salesforce/managed-services/pricing/', variant: 'secondary' },
        ]}
        sidenote="Named admin + PM · 25 hours/month · Two-week sprints · Month-to-month."
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
      <section className="bg-cream py-16 lg:py-24 border-y border-rule">
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
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Pricing"
            heading={
              <>
                Plans start at <em className="font-mono not-italic">$2,400</em>/month.
              </>
            }
            body="Three plans: Sales Cloud Administration, Full Stack Administration for the entire product suite, or a Custom Plan scoped to a unique instance. No long-term contract — cancel anytime."
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { plan: 'Plan', name: 'Sales Cloud Administration', body: '25 hours per month covering a single Salesforce Sales Cloud instance. From $2,400/month.' },
              { plan: 'Most chosen', name: 'Full Stack Administration', body: '25 hours per month across the full Salesforce product suite — Sales, Service, CPQ, Marketing, Experience. From $4,000/month.', featured: true },
              { plan: 'Plan', name: 'Custom Plan', body: 'Tailored hours, scope, and team configuration for organizations with unique needs.' },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`relative border bg-paper p-6 lg:p-7 ${
                  tier.featured ? 'border-crimson lg:scale-[1.02] shadow-editorial' : 'border-ruleSoft'
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] bg-crimson text-paper px-2 py-1">
                      {tier.plan}
                    </span>
                  </div>
                )}
                {!tier.featured && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute mb-2">
                    {tier.plan}
                  </p>
                )}
                <h3 className={`font-serif italic text-[1.25rem] text-ink ${tier.featured ? 'mt-2' : ''}`}>
                  {tier.name}
                </h3>
                <p className="mt-3 text-sm text-inkSoft leading-relaxed">{tier.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/salesforce/managed-services/pricing/"
              className="inline-flex items-center gap-2 border border-crimson text-crimson font-serif italic text-[15px] px-5 py-2 hover:bg-crimsonTint transition-colors"
            >
              See full pricing <span aria-hidden="true">→</span>
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
          <p className="mt-8 text-sm text-ink leading-relaxed">
            Not sure whether managed services or a one-time engagement is the right fit?{' '}
            <Link href="/salesforce/health-check/" className="text-crimson font-semibold hover:text-crimsonDeep">
              A CRM Health Check
            </Link>{' '}
            is the fastest way to see what your instance actually needs before you commit.
          </p>
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
              Foundry sits on top of a <em className="text-crimson">clean</em> Salesforce.
            </h2>
            <p className="mt-4 text-lede leading-[1.65] text-paper/80 max-w-prose">
              Once your Salesforce stays clean — month after month — Foundry connects the rest of your stack and delivers live dashboards, AI reports, and agents that take action. Fully managed by RevenuePoint.
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
            heading="Tell us about your Salesforce managed services needs"
            body="We will confirm fit, scope the engagement, and send a statement of work."
          />
          <LeadForm interest="Salesforce Managed Services" id="lead-form" />
        </div>
      </section>
    </>
  );
}

import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/ui/HeroSection';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { LeadForm } from '@/components/ui/LeadForm';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SalesforceProductPicker } from '@/components/salesforce/SalesforceProductPicker';
import { consultingActivities, consultingProducts } from '@/data/salesforceConsulting';
import { industryPageList } from '@/data/industries';
import { SCHEDULE_URL } from '@/lib/links';

export const metadata = buildMetadata({
  title: 'Salesforce',
  description:
    '60+ Salesforce certifications across Sales Cloud, Service Cloud, Marketing Cloud, CPQ, Experience Cloud, and NPSP. Implementations, integrations, custom development, and managed administration.',
  path: '/salesforce/',
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

export default function SalesforcePage() {
  return (
    <>
      <HeroSection
        byline="Salesforce · Consulting"
        heading={
          <>
            Certified Salesforce consulting. Across every cloud, across <em>every industry</em>.
          </>
        }
        body="Our consultants hold over 60 Salesforce certifications and have implemented Salesforce for teams of 10 to global rollouts of hundreds of users. We specialize in implementations that stick — configured to your process, trained to your team, supported beyond go-live."
        ctas={[
          { label: 'Schedule a call', href: SCHEDULE_URL, variant: 'primary' },
          { label: 'See pricing', href: '/salesforce/managed-services/pricing/', variant: 'secondary' },
        ]}
        sidenote="60+ Salesforce certifications · Sales · Service · CPQ · Marketing · Experience · NPSP."
      />

      {/* What we do — activity groupings */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="What we do"
            heading="Six ways we work with Salesforce"
            body="From greenfield implementations to ongoing managed administration — one team, one contract, across the full Salesforce suite."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultingActivities.map((activity) => (
              <ServiceCard
                key={activity.title}
                title={activity.title}
                body={activity.body}
                cta={activity.cta ?? { label: 'Get started', href: '#lead-form' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Salesforce products — interactive picker */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="Salesforce products"
            heading="Every Salesforce product. One team."
            body="60+ certifications across the full Salesforce suite. Pick a product to see how we implement, integrate, and manage it."
          />
          <SalesforceProductPicker products={consultingProducts} />
        </div>
      </section>

      {/* Industries */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="Industries we know"
            heading="Ten industries. Ten clean record pages."
            body="Salesforce looks different in a specialty pharmacy than it does in a distributor or a nonprofit. We build Lightning record pages that work the way your industry actually runs."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industryPageList.map((industry) => (
              <Link
                key={industry.id}
                href={`/solutions/${industry.slug}/`}
                className="group relative border border-ruleSoft bg-cream p-6 hover:border-navySoft transition-colors block"
              >
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-navySoft" />
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute mt-3">
                  Industry
                </p>
                <h3 className="mt-2 font-serif text-[1.25rem] font-medium text-ink leading-tight">
                  {industry.navLabel}
                </h3>
                <p className="mt-3 text-sm text-inkSoft leading-relaxed">{industry.hero.sub}</p>
                <p className="mt-5 pt-4 border-t border-ruleSoft font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
                  Record page · {industry.lexComponents.length} components ·{' '}
                  {industry.integrations.systems.length} integrations
                </p>
                <p className="mt-3 font-serif italic text-sm text-crimson group-hover:underline">
                  Explore {industry.navLabel} →
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/solutions/"
              className="font-serif italic text-sm text-crimson hover:text-crimsonDeep transition-colors inline-flex items-center gap-1"
            >
              See all industries <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Foundry teaser */}
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
              Once your Salesforce is clean, Foundry connects the rest of your stack — ERP, accounting, telephony, marketing — and delivers live dashboards, AI reports, and agents that take action. Fully managed by RevenuePoint.
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
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader heading="Tell us about your Salesforce project" />
          <LeadForm interest="Salesforce Consulting" id="lead-form" />
        </div>
      </section>
    </>
  );
}

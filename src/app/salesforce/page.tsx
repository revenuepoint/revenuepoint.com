import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/ui/HeroSection';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { LeadForm } from '@/components/ui/LeadForm';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SalesforceProductPicker } from '@/components/salesforce/SalesforceProductPicker';
import { consultingActivities, consultingProducts } from '@/data/salesforceConsulting';
import { industryPageList } from '@/data/industries';

export const metadata = buildMetadata({
  title: 'Certified Salesforce Consulting',
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
        eyebrow="SALESFORCE CONSULTING"
        heading="Certified Salesforce consulting. Across every cloud, across every industry."
        body="Our consultants hold over 60 Salesforce certifications and have implemented Salesforce for teams of 10 to global rollouts of hundreds of users. We specialize in implementations that stick — configured to your process, trained to your team, supported beyond go-live."
        variant="light"
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
      <section className="bg-offWhite py-16 lg:py-24">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {industryPageList.map((industry) => (
              <Link
                key={industry.id}
                href={`/solutions/${industry.slug}/`}
                className="group border border-border rounded-lg bg-white p-6 hover:border-crimson transition-colors block"
              >
                <div className="text-[10px] uppercase tracking-widest text-crimson font-semibold">
                  Industry
                </div>
                <h3 className="mt-2 text-xl font-bold text-navy tracking-tight">
                  {industry.navLabel}
                </h3>
                <p className="mt-3 text-sm text-bodyText leading-relaxed">
                  {industry.hero.sub}
                </p>
                <div className="mt-5 pt-4 border-t border-border text-[10px] uppercase tracking-widest text-mutedText font-semibold">
                  Record page + {industry.lexComponents.length} components +{' '}
                  {industry.integrations.systems.length} integrations
                </div>
                <div className="mt-3 text-sm text-crimson font-semibold group-hover:underline">
                  See the record page &rarr;
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/solutions/"
              className="text-sm font-semibold text-crimson hover:text-crimsonDark transition-colors inline-flex items-center gap-1"
            >
              See all industries <span aria-hidden="true">&rarr;</span>
            </Link>
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
              Foundry sits on top of a clean Salesforce.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-300">
              Once your Salesforce is clean, Foundry connects the rest of your stack — ERP,
              accounting, telephony, marketing — and delivers live dashboards, AI reports, and
              agents that take action. Fully managed by RevenuePoint.
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
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader heading="Tell us about your Salesforce project" />
          <LeadForm interest="Salesforce Consulting" id="lead-form" />
        </div>
      </section>
    </>
  );
}

import Link from 'next/link';
import { HeroSection } from '@/components/ui/HeroSection';
import { industryPageList } from '@/data/industries';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Industries — RevenuePoint',
  description:
    'Clean Salesforce environments for ten industries. A clean Lightning record page, named integrations, and fully managed by RevenuePoint.',
  path: '/solutions/',
});

export default function IndustriesIndex() {
  return (
    <>
      <HeroSection
        variant="navy"
        eyebrow="Industries"
        heading="Clean Salesforce. Ten industries. One record."
        body="We build Lightning record pages that work the way each industry actually runs — with the right custom components, named integrations to the systems you already use, and fully managed by RevenuePoint."
      />
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
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
                <h2 className="mt-2 text-xl font-bold text-navy tracking-tight">
                  {industry.navLabel}
                </h2>
                <p className="mt-3 text-sm text-bodyText leading-relaxed">
                  {industry.hero.sub}
                </p>
                <div className="mt-5 pt-4 border-t border-border text-[10px] uppercase tracking-widest text-mutedText font-semibold">
                  Record page + {industry.lexComponents.length} components +{' '}
                  {industry.integrations.systems.length} integrations
                </div>
                <div className="mt-3 text-sm text-crimson font-semibold group-hover:underline">
                  See the record page →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

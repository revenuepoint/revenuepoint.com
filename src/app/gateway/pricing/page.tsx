import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/ui/HeroSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTABanner } from '@/components/ui/CTABanner';
import {
  GATEWAY_PRICE,
  GATEWAY_PRICE_PERIOD,
  GATEWAY_CONTACT_HREF,
  GATEWAY_INCLUSIONS,
  GATEWAY_FAQ,
} from '@/data/gatewayPricing';

export const metadata = buildMetadata({
  title: 'Gateway Pricing — Fully Managed, Per-Tenant',
  description:
    'Gateway is priced per active tenant per month. Hosting, magic-link auth, connector, theming, audit log, and a named administrator are all included. Fully managed by RevenuePoint.',
  path: '/gateway/pricing/',
});

export default function GatewayPricingPage() {
  return (
    <>
      <HeroSection
        variant="light"
        eyebrow="GATEWAY · PRICING"
        heading="One price. Every tenant. Fully managed."
        body="Per-tenant, per-month pricing. Hosting, magic-link auth, the connector to your CRM or ERP, per-tenant theming, audit log, and a named RevenuePoint administrator are all included. No surprise consumption bills. No per-seat add-ons."
        ctas={[
          { label: 'Schedule a Walkthrough →', href: GATEWAY_CONTACT_HREF, variant: 'primary' },
          { label: 'Back to Gateway →', href: '/gateway/', variant: 'secondary' },
        ]}
      />

      {/* Pricing card */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader heading="Managed-tier pricing" align="center" />
          <div className="mt-10 border-2 border-crimson rounded-lg bg-crimsonLight p-8 text-center">
            <div className="text-xs uppercase tracking-widest text-crimson font-semibold">
              Fully managed by RevenuePoint
            </div>
            <div className="mt-3 text-5xl font-bold text-navy tracking-tight">
              {GATEWAY_PRICE}
            </div>
            <div className="mt-1 text-sm text-mutedText">{GATEWAY_PRICE_PERIOD}</div>
            <p className="mt-5 text-sm text-bodyText leading-relaxed max-w-xl mx-auto">
              Hosting, magic-link auth via SendGrid, the connector to your CRM or ERP,
              tenant configuration in code, per-tenant theming, audit log, observability,
              upgrades, and a named RevenuePoint administrator. Billed monthly.
              Volume pricing kicks in past five active tenants.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link
                href={GATEWAY_CONTACT_HREF}
                className="inline-flex items-center px-6 py-3 rounded-sm bg-crimson text-white text-sm font-semibold hover:bg-crimsonDark transition-colors"
              >
                Schedule a walkthrough →
              </Link>
              <Link
                href="/gateway/"
                className="inline-flex items-center px-6 py-3 rounded-sm border border-border bg-white text-sm font-semibold text-navy hover:border-crimson transition-colors"
              >
                Back to Gateway overview
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-offWhite border-y border-border py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="What's included"
            heading="Everything you need to run a tenant in production."
            body="No hidden tier of features unlocked at higher pricing. Every active tenant gets the same managed stack."
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {GATEWAY_INCLUSIONS.map((inc) => (
              <div key={inc.title} className="border border-border rounded-lg bg-white p-5">
                <div className="text-sm font-bold text-navy">{inc.title}</div>
                <p className="mt-2 text-xs text-bodyText leading-relaxed">{inc.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volume pricing note */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
            Multi-tenant volume
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            Many tenants? Talk to us.
          </h2>
          <p className="mt-6 text-base text-bodyText leading-relaxed">
            Past five active tenants on a single Gateway deployment, volume pricing kicks
            in. We&apos;ll quote your specific footprint based on connector mix, data
            residency requirements, and how often you spin up new tenants.
          </p>
          <div className="mt-8">
            <Link
              href={GATEWAY_CONTACT_HREF}
              className="inline-flex items-center px-6 py-3 rounded-sm bg-crimson text-white text-sm font-semibold hover:bg-crimsonDark transition-colors"
            >
              Get a multi-tenant quote →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-offWhite border-y border-border py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader eyebrow="FAQ" heading="Before you book a walkthrough." align="left" />
          <div className="mt-10">
            <FAQAccordion items={GATEWAY_FAQ.map((f) => ({ question: f.question, answer: f.answer }))} />
          </div>
        </div>
      </section>

      <CTABanner
        heading="Want to see Gateway with your data?"
        body="Bring an example tenant: a customer segment, a partner network, a dealer footprint. We mock it in front of you and quote a path to live."
        cta={{ label: 'Schedule a walkthrough →', href: GATEWAY_CONTACT_HREF }}
      />
    </>
  );
}

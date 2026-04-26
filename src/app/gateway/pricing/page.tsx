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
import { SCHEDULE_URL } from '@/lib/links';

export const metadata = buildMetadata({
  title: 'Gateway Pricing',
  description:
    'Gateway is priced per active tenant per month. Hosting, magic-link auth, connector, theming, audit log, and a named administrator are all included. Fully managed by RevenuePoint.',
  path: '/gateway/pricing/',
});

export default function GatewayPricingPage() {
  return (
    <>
      <HeroSection
        byline="Gateway · Pricing"
        heading={
          <>
            One price. Every tenant. <em>Fully managed</em>.
          </>
        }
        body="Per-tenant, per-month pricing. Hosting, magic-link auth, the connector to your CRM or ERP, per-tenant theming, audit log, and a named RevenuePoint administrator are all included. No surprise consumption bills. No per-seat add-ons."
        sidenote="No surprise consumption bills · no per-seat add-ons."
        ctas={[
          { label: 'Schedule a walkthrough', href: SCHEDULE_URL, variant: 'primary' },
          { label: 'Back to Gateway', href: '/gateway/', variant: 'secondary' },
        ]}
      />

      {/* Pricing card */}
      <section className="bg-snow py-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeader eyebrow="Managed tier" heading="One price. One stack." align="left" />
          <div className="mt-8 border border-crimson bg-crimsonTint p-10 text-center relative">
            <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-crimson" />
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-crimson mt-3">
              Fully managed by RevenuePoint
            </p>
            <p className="mt-4 font-mono text-[3.5rem] font-semibold text-ink tabular-nums leading-none">
              {GATEWAY_PRICE}
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
              {GATEWAY_PRICE_PERIOD}
            </p>
            <p className="mt-6 text-sm text-inkSoft leading-relaxed max-w-xl mx-auto">
              Hosting, magic-link auth via SendGrid, the connector to your CRM or ERP, tenant configuration in code, per-tenant theming, audit log, observability, upgrades, and a named RevenuePoint administrator. Billed monthly. Volume pricing kicks in past five active tenants.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <a
                href={SCHEDULE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-crimson text-crimson font-serif italic text-[15px] px-5 py-2 hover:bg-paper transition-colors"
              >
                Schedule a walkthrough <span aria-hidden="true">→</span>
              </a>
              <Link
                href="/gateway/"
                className="inline-flex items-center gap-2 border border-ink text-ink font-serif italic text-[15px] px-5 py-2 hover:bg-bone transition-colors"
              >
                Back to Gateway overview
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-cream border-y border-ruleSoft py-section">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="What's included"
            heading={
              <>
                Everything you need to run a tenant <em>in production</em>.
              </>
            }
            body="No hidden tier of features unlocked at higher pricing. Every active tenant gets the same managed stack."
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {GATEWAY_INCLUSIONS.map((inc) => (
              <article key={inc.title} className="relative border border-ruleSoft bg-paper p-5">
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-navySoft" />
                <h3 className="font-serif italic text-[1rem] text-ink mt-3">{inc.title}</h3>
                <p className="mt-2 text-xs text-inkSoft leading-relaxed">{inc.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Volume pricing note */}
      <section className="bg-snow py-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="eyebrow justify-center mb-4">Multi-tenant volume</p>
          <h2 className="text-d2 font-serif font-medium text-ink">
            Many tenants? <em>Talk to us</em>.
          </h2>
          <p className="mt-5 text-lede leading-[1.65] text-inkSoft max-w-prose mx-auto">
            Past five active tenants on a single Gateway deployment, volume pricing kicks in. We&rsquo;ll quote your specific footprint based on connector mix, data residency requirements, and how often you spin up new tenants.
          </p>
          <div className="mt-8">
            <Link
              href={GATEWAY_CONTACT_HREF}
              className="inline-flex items-center gap-2 border border-crimson text-crimson font-serif italic text-[15px] px-5 py-2 hover:bg-crimsonTint transition-colors"
            >
              Get a multi-tenant quote <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream border-t border-ruleSoft py-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeader eyebrow="FAQ" heading="Before you book a walkthrough." align="left" />
          <FAQAccordion items={GATEWAY_FAQ.map((f) => ({ question: f.question, answer: f.answer }))} />
        </div>
      </section>

      <CTABanner
        heading="Want to see Gateway with your data?"
        body="Bring an example tenant: a customer segment, a partner network, a dealer footprint. We mock it in front of you and quote a path to live."
        cta={{ label: 'Schedule a walkthrough →', href: SCHEDULE_URL }}
      />
    </>
  );
}

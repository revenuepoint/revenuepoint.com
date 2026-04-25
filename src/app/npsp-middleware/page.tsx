import Link from 'next/link';
import { HeroSection } from '@/components/ui/HeroSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTABanner } from '@/components/ui/CTABanner';
import { LeadForm } from '@/components/ui/LeadForm';
import { buildMetadata } from '@/lib/metadata';
import {
  NPSP_CONTACT_HREF,
  NPSP_GITHUB_URL,
  NPSP_MANAGED_PERIOD,
  NPSP_MANAGED_PRICE,
  npspComponents,
  npspFaq,
  npspFeatures,
  npspIntegrations,
  npspMatrix,
  npspPremiumStack,
} from '@/data/npspMiddleware';

export const metadata = buildMetadata({
  title: 'NPSP Middleware — Open-source donor stack for Salesforce NPSP',
  description:
    'A donate form, member portal, and events platform that syncs into Salesforce NPSP. Open source (AGPL-3.0) or fully managed by RevenuePoint at $6,000 per newsroom / year.',
  path: '/npsp-middleware/',
});

function GithubIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-emerald-600 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function DashIcon() {
  return <span className="text-mute/60 shrink-0 select-none">—</span>;
}

export default function NpspMiddlewarePage() {
  return (
    <>
      {/* Hero */}
      <HeroSection
        byline="NPSP Middleware · Open source"
        heading={
          <>
            Open-source donor experience for <em>Salesforce NPSP</em>.
          </>
        }
        body="A modern donate form, member portal, and events platform — syncing into NPSP. Host it yourself under AGPL-3.0. Or let RevenuePoint run it end-to-end with observability, dunning, and a managed premium stack."
        issue="N"
        sidenote="AGPL-3.0 · self-host or fully managed."
        ctas={[
          { label: 'View on GitHub', href: NPSP_GITHUB_URL, variant: 'primary' },
          { label: 'Talk to us', href: NPSP_CONTACT_HREF, variant: 'secondary' },
        ]}
      />

      {/* Components showcase */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="What's inside"
            heading="Five components that ship on day one."
            body="Everything a newsroom needs to take money online, keep donors engaged, and run events — on a Salesforce NPSP foundation."
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {npspComponents.map((c) => (
              <div key={c.title} className="border border-rule rounded-lg bg-white p-6 flex flex-col">
                <div className="text-[10px] uppercase tracking-widest text-crimson font-semibold">
                  {c.tag}
                </div>
                <div className="mt-2 text-lg font-bold text-navy">{c.title}</div>
                <p className="mt-3 text-sm text-ink leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Baked-in features strip */}
      <section className="bg-cream border-y border-rule py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="Both tiers get this"
            heading="The donor stack, ready to run."
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {npspFeatures.map((f) => (
              <div key={f.title} className="border border-rule rounded-lg bg-white p-5">
                <div className="text-sm font-bold text-navy">{f.title}</div>
                <p className="mt-2 text-xs text-ink leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="Integrations"
            heading="Wired to the stack a newsroom already runs."
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
            {npspIntegrations.map((i) => (
              <div key={i.name} className="border border-rule rounded-md bg-white p-4">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded bg-navy text-white text-[10px] font-bold flex items-center justify-center">
                    {i.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="text-sm font-bold text-navy truncate">{i.name}</div>
                </div>
                <div className="mt-2 text-xs text-ink leading-snug">{i.purpose}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open source vs Managed matrix */}
      <section className="bg-cream border-y border-rule py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader
            eyebrow="Open source vs Managed"
            heading="Two tiers. Same core. Different lift."
            body="Self-host when you have engineering capacity. Choose managed when donate-form uptime and premium integrations matter more than running infrastructure."
            align="left"
          />
          <div className="mt-10 border border-rule rounded-lg bg-white shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left py-3 px-5 font-semibold">Capability</th>
                  <th className="text-center py-3 px-5 font-semibold w-36">Open source</th>
                  <th className="text-center py-3 px-5 font-semibold w-48">Managed</th>
                </tr>
              </thead>
              <tbody>
                {npspMatrix.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-bone'}>
                    <td className="py-3 px-5 text-ink">{row.label}</td>
                    <td className="py-3 px-5 text-center">
                      <div className="inline-flex">{row.openSource ? <CheckIcon /> : <DashIcon />}</div>
                    </td>
                    <td className="py-3 px-5 text-center">
                      <div className="inline-flex">{row.managed ? <CheckIcon /> : <DashIcon />}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Managed premium stack deep-dive */}
      <section className="bg-navy text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
              Managed tier · Premium stack
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              What {NPSP_MANAGED_PRICE} {NPSP_MANAGED_PERIOD} gets you.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-300">
              The middleware runs itself — but the operational lift of keeping a donate form up,
              tuned, and recovering failed charges is real. We absorb it.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {npspPremiumStack.map((p) => (
              <div key={p.name} className="border border-white/10 rounded-lg bg-white/[0.04] p-5">
                <div className="text-sm font-bold text-white">{p.name}</div>
                <p className="mt-2 text-xs text-gray-300 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader heading="Managed-tier pricing" align="center" />
          <div className="mt-10 border-2 border-crimson rounded-lg bg-crimsonTint p-8 text-center">
            <div className="text-xs uppercase tracking-widest text-crimson font-semibold">
              Fully managed by RevenuePoint
            </div>
            <div className="mt-3 text-5xl font-bold text-navy tracking-tight">
              {NPSP_MANAGED_PRICE}
            </div>
            <div className="mt-1 text-sm text-mute">{NPSP_MANAGED_PERIOD}</div>
            <p className="mt-5 text-sm text-ink leading-relaxed max-w-xl mx-auto">
              Includes hosting, 99.9% uptime SLA, Datadog observability, session replay, Stripe
              Smart Retries, the full premium integration stack, upgrades, security patching, and
              a named RevenuePoint administrator. Billed annually.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link
                href={NPSP_CONTACT_HREF}
                className="inline-flex items-center px-6 py-3 rounded-sm bg-crimson text-white text-sm font-semibold hover:bg-crimsonDeep transition-colors"
              >
                Schedule a walkthrough →
              </Link>
              <a
                href={NPSP_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-rule bg-white text-sm font-semibold text-navy hover:border-crimson transition-colors"
              >
                <GithubIcon /> Or start free on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why open source */}
      <section className="bg-cream border-y border-rule py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
            Why we open-sourced it
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            Newsroom margins are thin. The code should not be the tax.
          </h2>
          <p className="mt-6 text-base text-ink leading-relaxed">
            Nonprofit newsrooms already pay for NPSP, Stripe, a CRM administrator, and an email
            platform. They should not also pay a license fee for the donate form itself. So we
            published it under AGPL-3.0 — fork it, run it, modify it.
          </p>
          <p className="mt-4 text-base text-ink leading-relaxed">
            RevenuePoint charges for the operational lift: hosting, monitoring, premium
            integrations, dunning, and a named administrator who owns the donate-form experience
            end-to-end. You decide which side of that line you want to be on.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader eyebrow="FAQ" heading="Before you clone the repo." align="left" />
          <div className="mt-10">
            <FAQAccordion items={npspFaq.map((f) => ({ question: f.question, answer: f.answer }))} />
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <CTABanner
        heading="Ready to see it running?"
        body="Thirty minutes with a RevenuePoint architect. We walk the donate form, the member portal, the Salesforce sync — and scope a managed rollout if it fits."
        cta={{ label: 'Schedule a walkthrough →', href: NPSP_CONTACT_HREF }}
      />

      {/* Lead form */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader heading="Or drop a note" align="center" />
          <LeadForm interest="NPSP Middleware" />
        </div>
      </section>
    </>
  );
}

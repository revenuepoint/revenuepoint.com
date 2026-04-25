import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/ui/HeroSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CTABanner } from '@/components/ui/CTABanner';
import { gatewayUseCases } from '@/data/gatewayUseCases';

export const metadata = buildMetadata({
  title: 'Gateway Use Cases — Customer, Partner, Dealer, Member, Patient Portals',
  description:
    'Six portal archetypes built on Gateway: customer portals, partner portals, dealer portals, dispatch/field portals, member portals, and patient portals. One framework, every use case.',
  path: '/gateway/use-cases/',
});

const CONNECTION_BG: Record<string, string> = {
  Salesforce: 'bg-sky-50 text-sky-700 border-sky-200',
  SAP: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Mixed: 'bg-violet-50 text-violet-700 border-violet-200',
};

export default function GatewayUseCasesPage() {
  return (
    <>
      <HeroSection
        variant="light"
        eyebrow="GATEWAY · USE CASES"
        heading="Six portals. One framework."
        body="The portals our customers run on Gateway today. Each archetype is a different audience and a different access rule — but all built on the same Gateway deployment, the same connector model, the same managed stack."
        ctas={[
          { label: 'Schedule a Walkthrough →', href: '/contact/?interest=Gateway', variant: 'primary' },
          { label: 'Back to Gateway →', href: '/gateway/', variant: 'secondary' },
        ]}
      />

      {/* Use case grid */}
      <section className="bg-offWhite border-y border-border py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {gatewayUseCases.map((uc) => (
              <article
                key={uc.id}
                className="bg-white border border-border rounded-md p-6 flex flex-col"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-crimson">
                    {uc.archetype}
                  </p>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-sm border font-semibold ${
                      CONNECTION_BG[uc.primaryConnection] ?? 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {uc.primaryConnection}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-navy mb-2 leading-snug">
                  {uc.archetype}
                </h2>
                <p className="text-sm text-bodyText leading-relaxed mb-4">{uc.oneLine}</p>

                <div className="mt-auto pt-4 border-t border-border space-y-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-mutedText font-semibold mb-1">
                      Who uses it
                    </p>
                    <p className="text-xs text-bodyText">{uc.whoUses}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-mutedText font-semibold mb-1">
                      Access rule
                    </p>
                    <p className="text-xs text-bodyText font-mono">{uc.accessRule}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-mutedText font-semibold mb-1.5">
                      Mocked views
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {uc.mockedViews.map((v) => (
                        <span
                          key={v}
                          className="text-[11px] px-2 py-0.5 rounded-sm border border-border bg-offWhite text-bodyText"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-mutedText font-semibold mb-1.5">
                      Common industries
                    </p>
                    <p className="text-xs text-mutedText">{uc.industries.join(' · ')}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Custom prompt */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
            Yours doesn&apos;t fit?
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            Bring your tenant model. We&apos;ll configure it.
          </h2>
          <p className="mt-6 text-base text-bodyText leading-relaxed">
            These six are the most common patterns; they aren&apos;t the only ones. If
            your portal sits at a different audience, a different system of record, or
            a different access rule, that&apos;s a configuration — not a custom build.
          </p>
        </div>
      </section>

      <CTABanner
        heading="Talk through your tenant model with an architect."
        body="Thirty minutes. We sketch the access rule, name the connectors, list the views, and quote a path to live."
        cta={{ label: 'Schedule a walkthrough →', href: '/contact/?interest=Gateway' }}
      />
    </>
  );
}

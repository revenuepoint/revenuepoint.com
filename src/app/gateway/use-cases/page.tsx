import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/ui/HeroSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CTABanner } from '@/components/ui/CTABanner';
import { gatewayUseCases } from '@/data/gatewayUseCases';
import { SCHEDULE_URL } from '@/lib/links';

export const metadata = buildMetadata({
  title: 'Gateway Use Cases',
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
        byline="Gateway · Use cases"
        heading={
          <>
            Six portals. <em>One</em> framework.
          </>
        }
        body="The portals our customers run on Gateway today. Each archetype is a different audience and a different access rule — but all built on the same Gateway deployment, the same connector model, the same managed stack."
        ctas={[
          { label: 'Schedule a walkthrough', href: SCHEDULE_URL, variant: 'primary' },
          { label: 'Back to Gateway', href: '/gateway/', variant: 'secondary' },
        ]}
      />

      {/* Use case grid */}
      <section className="bg-cream border-y border-ruleSoft py-section">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gatewayUseCases.map((uc, idx) => (
              <article
                key={uc.id}
                className="relative bg-paper border border-ruleSoft p-6 flex flex-col"
              >
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-crimson" />
                <div className="flex items-center justify-between gap-3 mt-3 mb-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
                    Archetype {String(idx + 1).padStart(2, '0')}
                  </p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 border border-rule bg-cream text-mute">
                    {uc.primaryConnection}
                  </span>
                </div>
                <h2 className="font-serif text-[1.25rem] font-medium text-ink mb-2 leading-snug">
                  {uc.archetype}
                </h2>
                <p className="text-sm text-inkSoft leading-relaxed mb-4">{uc.oneLine}</p>

                <div className="mt-auto pt-4 border-t border-ruleSoft space-y-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute mb-1">
                      Who uses it
                    </p>
                    <p className="text-xs text-ink">{uc.whoUses}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute mb-1">
                      Access rule
                    </p>
                    <p className="text-xs text-ink font-mono">{uc.accessRule}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute mb-1.5">
                      Mocked views
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {uc.mockedViews.map((v) => (
                        <span
                          key={v}
                          className="font-mono text-[11px] px-2 py-0.5 border border-rule bg-cream text-ink"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute mb-1.5">
                      Common industries
                    </p>
                    <p className="serif-italic text-xs text-mute">{uc.industries.join(' · ')}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Custom prompt */}
      <section className="bg-paper py-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="eyebrow justify-center mb-4">Yours doesn&rsquo;t fit?</p>
          <h2 className="text-d2 font-serif font-medium text-ink">
            Bring your tenant model. <em>We&rsquo;ll configure it</em>.
          </h2>
          <p className="mt-5 text-lede leading-[1.65] text-inkSoft max-w-prose mx-auto">
            These six are the most common patterns; they aren&rsquo;t the only ones. If your portal sits at a different audience, a different system of record, or a different access rule, that&rsquo;s a configuration — not a custom build.
          </p>
        </div>
      </section>

      <CTABanner
        heading="Talk through your tenant model with an architect."
        body="Thirty minutes. We sketch the access rule, name the connectors, list the views, and quote a path to live."
        cta={{ label: 'Schedule a walkthrough →', href: SCHEDULE_URL }}
      />
    </>
  );
}

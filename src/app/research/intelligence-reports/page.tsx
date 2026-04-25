import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { StepList } from '@/components/ui/StepList';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { LeadForm } from '@/components/ui/LeadForm';
import { IntelligenceReportsHero } from '@/components/research/IntelligenceReportsHero';
import { EnrichmentSourcesGrid } from '@/components/research/EnrichmentSourcesGrid';
import { IntelligenceReportsPricingCard } from '@/components/research/IntelligenceReportsPricingCard';
import {
  REPORT_BLOCKS,
  PIPELINE_STEPS,
  USE_CASES,
  QA_COMMITMENTS,
  FAQS,
} from '@/data/research/intelligenceReports';

export const metadata = buildMetadata({
  title: 'Intelligence Reports',
  description:
    'Bespoke intelligence reports built from public records, enrichment APIs, and your own systems. Citation-backed, named-analyst reviewed, fully managed by RevenuePoint. Starting at $6,800.',
  path: '/research/intelligence-reports/',
});

export default function IntelligenceReportsPage() {
  return (
    <>
      <IntelligenceReportsHero />

      {/* What you receive */}
      <section className="bg-cream border-y border-ruleSoft py-section">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="What you receive"
            heading={
              <>
                A report a decision-maker can read in <em>ten minutes</em>.
              </>
            }
            body="Every Intelligence Report follows the same shape — written for the person who has to act on it, with the supporting research one click away."
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {REPORT_BLOCKS.map((block, idx) => (
              <article
                key={block.title}
                className="relative bg-paper border border-ruleSoft p-6 flex flex-col"
              >
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-navySoft" />
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute mt-3 mb-2">
                  {String(idx + 1).padStart(2, '0')}
                </p>
                <h3 className="font-serif text-[1rem] font-medium text-ink mb-2 leading-snug">
                  {block.title}
                </h3>
                <p className="text-sm text-inkSoft leading-relaxed">{block.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-paper py-section border-b border-ruleSoft">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="End-to-end pipeline"
            heading={
              <>
                Aggregate. Enrich. Verify. <em>Generate</em>.
              </>
            }
            body="A named research analyst orchestrates the pipeline through the RevenuePoint AI Research Platform. You see findings, not raw data."
            align="left"
          />
          <StepList steps={PIPELINE_STEPS} />
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-cream border-b border-ruleSoft py-section">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Use cases"
            heading={
              <>
                Research on any entity <em>worth knowing about</em>.
              </>
            }
            body="Six places teams already engage us. The pipeline is the same; the entity changes."
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {USE_CASES.map((useCase) => (
              <ServiceCard
                key={useCase.title}
                title={useCase.title}
                body={useCase.body}
                cta={useCase.cta}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enrichment sources */}
      <section className="bg-paper border-b border-ruleSoft py-section">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Enrichment sources"
            heading={
              <>
                Every source named. <em>Every claim cited</em>.
              </>
            }
            body="Coverage spans seven categories of structured and open-web data. We negotiate licensing per engagement and disclose every source on the report."
            align="left"
          />
          <EnrichmentSourcesGrid />
        </div>
      </section>

      {/* QA & accuracy */}
      <section className="bg-ink py-section text-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/70 inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-crimson" />
            QA &amp; accuracy
          </p>
          <h2 className="text-d1 font-serif font-medium text-paper leading-tight max-w-3xl">
            A report you can put in front of a <em className="text-crimson">board</em>.
          </h2>
          <p className="mt-5 text-lede leading-[1.65] text-paper/80 max-w-prose">
            Six commitments that hold across every engagement. The pipeline is auditable end-to-end and reviewed by a named analyst before delivery.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {QA_COMMITMENTS.map((commitment, idx) => (
              <div key={commitment.title} className="border-t border-paper/20 pt-5 relative">
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-crimson" />
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/60 mb-3">
                  {String(idx + 1).padStart(2, '0')}
                </p>
                <h3 className="font-serif text-[1.125rem] font-medium text-paper leading-tight">
                  {commitment.title}
                </h3>
                <p className="mt-2 text-sm text-paper/75 leading-relaxed">{commitment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foundry Prism comparison */}
      <section className="bg-cream border-y border-ruleSoft py-section">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="border border-ruleSoft bg-paper p-8 lg:p-12 relative">
            <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
            <span aria-hidden="true" className="absolute left-0 top-0 h-px w-12 bg-navySoft" />
            <p className="eyebrow mt-3 mb-4">Included in Foundry</p>
            <h2 className="text-d2 font-serif font-medium text-ink leading-tight mb-6">
              Prism reports the <em>inside</em>. Intelligence Reports research the <em>outside</em>.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-rule pt-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute mb-2">
                  Foundry Prism
                </p>
                <p className="text-sm text-inkSoft leading-relaxed">
                  Templated, scheduled, internal-data reports written overnight from your warehouse. Best for operational reporting at a regular cadence.
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-crimson mb-2">
                  Intelligence Reports
                </p>
                <p className="text-sm text-inkSoft leading-relaxed">
                  Bespoke, on-demand research from external sources — public records, enrichment APIs, the open web. Best for due diligence, account research, and external context.
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm text-inkSoft">
              Many customers run both.{' '}
              <Link href="/foundry/" className="font-serif italic text-crimson hover:text-crimsonDeep">
                See Foundry →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <IntelligenceReportsPricingCard />

      {/* FAQ */}
      <section className="bg-cream border-y border-ruleSoft py-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeader eyebrow="Frequently asked" heading="What teams ask before they engage." align="left" />
          <FAQAccordion items={FAQS} />
        </div>
      </section>

      {/* Lead form */}
      <section className="bg-paper py-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Get in touch"
            heading={
              <>
                Tell us what you need to know — <em>about whom</em>.
              </>
            }
            body="A scoping call confirms fit, sources, cadence, and timeline. We will price the engagement before any work begins."
            align="left"
          />
          <LeadForm interest="Intelligence Reports" id="lead-form" />
        </div>
      </section>
    </>
  );
}

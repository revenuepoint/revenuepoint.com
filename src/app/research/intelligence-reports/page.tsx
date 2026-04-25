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
  title: 'Intelligence Reports — Custom AI research, fully managed',
  description:
    'Bespoke intelligence reports built from public records, enrichment APIs, and your own systems. Citation-backed, named-analyst reviewed, fully managed by RevenuePoint. Starting at $6,800.',
  path: '/research/intelligence-reports/',
});

export default function IntelligenceReportsPage() {
  return (
    <>
      <IntelligenceReportsHero />

      {/* What you receive */}
      <section className="bg-offWhite py-16 lg:py-24 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="What you receive"
            heading="A report a decision-maker can read in ten minutes."
            body="Every Intelligence Report follows the same shape — written for the person who has to act on it, with the supporting research one click away."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {REPORT_BLOCKS.map((block, idx) => (
              <div
                key={block.title}
                className="bg-white border border-border rounded-sm shadow-sm p-6 flex flex-col"
              >
                <p className="text-[10px] uppercase tracking-wider text-crimson font-bold mb-2">
                  {String(idx + 1).padStart(2, '0')}
                </p>
                <h3 className="text-base font-semibold text-navy mb-2 leading-snug">
                  {block.title}
                </h3>
                <p className="text-sm text-bodyText leading-relaxed">{block.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 lg:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="End-to-end pipeline"
            heading="Aggregate. Enrich. Verify. Generate."
            body="A named research analyst orchestrates the pipeline through the RevenuePoint AI Research Platform. You see findings, not raw data."
          />
          <StepList steps={PIPELINE_STEPS} />
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-offWhite py-16 lg:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="Use cases"
            heading="Research on any entity worth knowing about."
            body="Six places teams already engage us. The pipeline is the same; the entity changes."
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
      <section className="bg-white py-16 lg:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="Enrichment sources"
            heading="Every source named. Every claim cited."
            body="Coverage spans seven categories of structured and open-web data. We negotiate licensing per engagement and disclose every source on the report."
          />
          <EnrichmentSourcesGrid />
        </div>
      </section>

      {/* QA & accuracy */}
      <section className="bg-navy py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="QA & accuracy"
            heading="A report you can put in front of a board."
            body="Six commitments that hold across every engagement. The pipeline is auditable end-to-end and reviewed by a named analyst before delivery."
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {QA_COMMITMENTS.map((commitment, idx) => (
              <div
                key={commitment.title}
                className="border border-white/15 bg-white/[0.04] rounded-sm p-6 flex flex-col"
              >
                <p className="text-[10px] uppercase tracking-wider text-white/60 font-bold mb-3">
                  {String(idx + 1).padStart(2, '0')}
                </p>
                <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                  {commitment.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">{commitment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foundry Prism comparison */}
      <section className="bg-offWhite py-16 lg:py-20 border-y border-border">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white border border-border rounded-sm shadow-sm p-8 lg:p-12">
            <p className="text-[10px] uppercase tracking-widest text-crimson font-bold mb-3">
              Already on Foundry?
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-navy mb-6">
              Prism reports the inside. Intelligence Reports research the outside.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-xs uppercase tracking-wider text-mutedText font-semibold mb-2">
                  Foundry Prism
                </p>
                <p className="text-sm text-bodyText leading-relaxed">
                  Templated, scheduled, internal-data reports written overnight from your warehouse.
                  Best for operational reporting at a regular cadence.
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-crimson font-semibold mb-2">
                  Intelligence Reports
                </p>
                <p className="text-sm text-bodyText leading-relaxed">
                  Bespoke, on-demand research from external sources — public records, enrichment
                  APIs, the open web. Best for due diligence, account research, and external context.
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm text-bodyText">
              Many customers run both.{' '}
              <Link
                href="/foundry/"
                className="text-crimson font-semibold hover:text-crimsonDark transition-colors"
              >
                See Foundry →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <IntelligenceReportsPricingCard />

      {/* FAQ */}
      <section className="bg-offWhite py-16 lg:py-24 border-y border-border">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader eyebrow="Frequently asked" heading="What teams ask before they engage" />
          <FAQAccordion items={FAQS} />
        </div>
      </section>

      {/* Lead form */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader
            heading="Tell us what you need to know — about whom."
            body="A scoping call confirms fit, sources, cadence, and timeline. We will price the engagement before any work begins."
          />
          <LeadForm interest="Intelligence Reports" id="lead-form" />
        </div>
      </section>
    </>
  );
}

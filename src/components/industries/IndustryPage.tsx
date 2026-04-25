import { CTABanner } from '@/components/ui/CTABanner';
import type { IndustryPageContent } from '@/types/industry';
import { DataModelDiagram } from './DataModelDiagram';
import { FoundryModule } from './FoundryModule';
import { IndustryFaq } from './IndustryFaq';
import { IndustryHero } from './IndustryHero';
import { IndustryKpiPainStrip } from './IndustryKpiPainStrip';
import { IntegrationsStrip } from './IntegrationsStrip';
import { LexComponentGallery } from './LexComponentGallery';
import { NpspMiddlewareSection } from './NpspMiddlewareSection';
import { PackagingTiers } from './PackagingTiers';
import { PainProofCard } from './PainProofCard';
import { RecordPageMock } from './RecordPageMock';
import { UseCasesSection } from './UseCasesSection';

export function IndustryPage({ content }: { content: IndustryPageContent }) {
  return (
    <>
      <IndustryHero content={content} />
      <IndustryKpiPainStrip kpis={content.painKpis} />
      <RecordPageMock spec={content.recordPage} />
      <DataModelDiagram
        description={content.dataModel.description}
        objects={content.dataModel.objects}
      />
      <IntegrationsStrip
        description={content.integrations.description}
        systems={content.integrations.systems}
      />
      <LexComponentGallery components={content.lexComponents} />
      <UseCasesSection useCases={content.useCases} />
      {content.id === 'nonprofit' && <NpspMiddlewareSection />}
      <FoundryModule industryId={content.id} navLabel={content.navLabel} />
      <PainProofCard proof={content.proofCard} />
      <PackagingTiers tiers={content.packaging} navLabel={content.navLabel} />
      <IndustryFaq faqs={content.faqs} />
      <CTABanner
        heading={`See ${content.navLabel} on a clean Salesforce.`}
        body="A 45-minute working session with a RevenuePoint architect. We walk the record page, name the integrations you need, and scope what's possible in the first 90 days."
        cta={{
          label: 'Book a working session',
          href: `/contact/?interest=${encodeURIComponent(content.navLabel)}`,
        }}
      />
    </>
  );
}

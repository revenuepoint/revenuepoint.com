import { IndustryPage } from '@/components/industries/IndustryPage';
import { financialServices } from '@/data/industries/financialServices';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: financialServices.metaTitle,
  description: financialServices.metaDescription,
  path: `/solutions/${financialServices.slug}/`,
});

export default function Page() {
  return <IndustryPage content={financialServices} />;
}

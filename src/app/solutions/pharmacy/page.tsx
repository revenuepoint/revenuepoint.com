import { IndustryPage } from '@/components/industries/IndustryPage';
import { pharmacy } from '@/data/industries/pharmacy';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: pharmacy.metaTitle,
  description: pharmacy.metaDescription,
  path: `/solutions/${pharmacy.slug}/`,
});

export default function Page() {
  return <IndustryPage content={pharmacy} />;
}

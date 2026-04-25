import { IndustryPage } from '@/components/industries/IndustryPage';
import { professionalServices } from '@/data/industries/professionalServices';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: professionalServices.metaTitle,
  description: professionalServices.metaDescription,
  path: `/solutions/${professionalServices.slug}/`,
});

export default function Page() {
  return <IndustryPage content={professionalServices} />;
}

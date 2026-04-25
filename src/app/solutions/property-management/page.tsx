import { IndustryPage } from '@/components/industries/IndustryPage';
import { propertyManagement } from '@/data/industries/propertyManagement';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: propertyManagement.metaTitle,
  description: propertyManagement.metaDescription,
  path: `/solutions/${propertyManagement.slug}/`,
});

export default function Page() {
  return <IndustryPage content={propertyManagement} />;
}

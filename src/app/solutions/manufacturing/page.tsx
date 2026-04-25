import { IndustryPage } from '@/components/industries/IndustryPage';
import { manufacturing } from '@/data/industries/manufacturing';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: manufacturing.metaTitle,
  description: manufacturing.metaDescription,
  path: `/solutions/${manufacturing.slug}/`,
});

export default function Page() {
  return <IndustryPage content={manufacturing} />;
}

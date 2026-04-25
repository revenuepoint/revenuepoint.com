import { IndustryPage } from '@/components/industries/IndustryPage';
import { construction } from '@/data/industries/construction';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: construction.metaTitle,
  description: construction.metaDescription,
  path: `/solutions/${construction.slug}/`,
});

export default function Page() {
  return <IndustryPage content={construction} />;
}

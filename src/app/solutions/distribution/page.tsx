import { IndustryPage } from '@/components/industries/IndustryPage';
import { distribution } from '@/data/industries/distribution';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: distribution.metaTitle,
  description: distribution.metaDescription,
  path: `/solutions/${distribution.slug}/`,
});

export default function Page() {
  return <IndustryPage content={distribution} />;
}

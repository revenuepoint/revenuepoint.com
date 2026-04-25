import { IndustryPage } from '@/components/industries/IndustryPage';
import { nonprofit } from '@/data/industries/nonprofit';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: nonprofit.metaTitle,
  description: nonprofit.metaDescription,
  path: `/solutions/${nonprofit.slug}/`,
});

export default function Page() {
  return <IndustryPage content={nonprofit} />;
}

import { IndustryPage } from '@/components/industries/IndustryPage';
import { healthcare } from '@/data/industries/healthcare';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: healthcare.metaTitle,
  description: healthcare.metaDescription,
  path: `/solutions/${healthcare.slug}/`,
});

export default function Page() {
  return <IndustryPage content={healthcare} />;
}

import { IndustryPage } from '@/components/industries/IndustryPage';
import { foodBeverage } from '@/data/industries/foodBeverage';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: foodBeverage.metaTitle,
  description: foodBeverage.metaDescription,
  path: `/solutions/${foodBeverage.slug}/`,
});

export default function Page() {
  return <IndustryPage content={foodBeverage} />;
}

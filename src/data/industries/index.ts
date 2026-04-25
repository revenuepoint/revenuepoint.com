import type { IndustryId } from '@/context/IndustryContext';
import type { IndustryPageContent } from '@/types/industry';
import { construction } from './construction';
import { distribution } from './distribution';
import { financialServices } from './financialServices';
import { foodBeverage } from './foodBeverage';
import { healthcare } from './healthcare';
import { manufacturing } from './manufacturing';
import { nonprofit } from './nonprofit';
import { pharmacy } from './pharmacy';
import { professionalServices } from './professionalServices';
import { propertyManagement } from './propertyManagement';

export const industryPageContent: Record<IndustryId, IndustryPageContent> = {
  manufacturing,
  distribution,
  pharmacy,
  healthcare,
  nonprofit,
  propertyManagement,
  professionalServices,
  financialServices,
  foodBeverage,
  construction,
};

export const industryPageList: IndustryPageContent[] = [
  manufacturing,
  distribution,
  pharmacy,
  healthcare,
  nonprofit,
  propertyManagement,
  professionalServices,
  financialServices,
  foodBeverage,
  construction,
];

export function getIndustryPageBySlug(slug: string): IndustryPageContent | undefined {
  return industryPageList.find((p) => p.slug === slug);
}

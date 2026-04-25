import type { IndustryId } from '@/context/IndustryContext';

export type StatusTone = 'on-track' | 'at-risk' | 'off-track' | 'neutral';

export type PainKpi = {
  stat: string;
  label: string;
  source?: string;
};

export type IntegrationSystem = {
  name: string;
  category: string;
  role: string;
};

export type DataModelObject = {
  name: string;
  kind: 'standard' | 'custom';
};

export type RecordPageHighlight = {
  label: string;
  value: string;
  tone?: StatusTone;
};

export type RecordPageRelatedItem = {
  label: string;
  count: number;
};

export type RecordPageRelatedList = {
  title: string;
  items: RecordPageRelatedItem[];
};

export type RecordPageKpiTile = {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: StatusTone;
};

export type RecordPageBarRow = {
  label: string;
  value: number;
  valueLabel: string;
  tone?: StatusTone;
};

export type RecordPageTableRow = {
  cells: string[];
  tone?: StatusTone;
};

export type RecordPageTimelineEntry = {
  label: string;
  sub: string;
  tone?: StatusTone;
};

export type RecordPageComponentBody =
  | { kind: 'kpi-tiles'; tiles: RecordPageKpiTile[] }
  | { kind: 'bar-rows'; rows: RecordPageBarRow[]; unit?: string }
  | {
      kind: 'table';
      headers: string[];
      rows: RecordPageTableRow[];
    }
  | { kind: 'timeline'; entries: RecordPageTimelineEntry[] }
  | { kind: 'field-list'; fields: { label: string; value: string; tone?: StatusTone }[] };

export type RecordPageComponent = {
  id: string;
  title: string;
  subtitle?: string;
  source: string;
  body: RecordPageComponentBody;
  callout: {
    number: number;
    description: string;
  };
};

export type RecordPageMockSpec = {
  tabLabel: string;
  objectLabel: string;
  accountName: string;
  accountSub: string;
  highlights: RecordPageHighlight[];
  relatedLists: RecordPageRelatedList[];
  components: RecordPageComponent[];
  activity: { label: string; detail: string; sub: string }[];
  rightRailTile: {
    title: string;
    source: string;
    lines: { label: string; value: string; tone?: StatusTone }[];
  };
};

export type LexComponentSpec = {
  id: string;
  title: string;
  source: string;
  blurb: string;
  body: RecordPageComponentBody;
};

export type UseCase = {
  title: string;
  pain: string;
  flow: string[];
  outcome: string;
};

export type PackagingTier = {
  name: string;
  duration: string;
  headline: string;
  includes: string[];
};

export type ProofCard = {
  stat: string;
  sourceNote: string;
  problem: string;
  fix: string;
  outcome: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type IndustryPageContent = {
  id: IndustryId;
  slug: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
  };
  painKpis: PainKpi[];
  recordPage: RecordPageMockSpec;
  dataModel: {
    description: string;
    objects: DataModelObject[];
  };
  integrations: {
    description: string;
    systems: IntegrationSystem[];
  };
  lexComponents: LexComponentSpec[];
  useCases: UseCase[];
  proofCard: ProofCard;
  packaging: PackagingTier[];
  faqs: FaqItem[];
};

'use client';

import { useIndustry, type IndustryId } from '@/context/IndustryContext';
import { industries } from '@/data/foundryIndustries';

export function IndustryTabs() {
  const { industryId, setIndustryId } = useIndustry();
  return (
    <nav
      className="flex gap-1 overflow-x-auto snap-x snap-mandatory py-2 -mx-1 px-1"
      aria-label="Industry"
    >
      {industries.map((ind) => {
        const selected = ind.id === industryId;
        return (
          <button
            key={ind.id}
            type="button"
            onClick={() => setIndustryId(ind.id as IndustryId)}
            className={`shrink-0 snap-start inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
              selected
                ? 'bg-crimson text-white border-crimson shadow-sm'
                : 'bg-white text-navy border-rule hover:border-crimson/40'
            }`}
            aria-current={selected ? 'true' : undefined}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${selected ? 'bg-white' : 'bg-crimson'}`}
              aria-hidden="true"
            />
            <span className="whitespace-nowrap">{ind.shortName}</span>
          </button>
        );
      })}
    </nav>
  );
}

'use client';

import type { PrismCategory, PrismReport } from '@/data/foundryPrismReports';

const CATEGORY_STYLE: Record<PrismCategory, { bar: string; badge: string }> = {
  Finance: { bar: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  'Sales & CRM': { bar: 'bg-blue-500', badge: 'bg-blue-50 text-blue-700 border-blue-200' },
  Operations: { bar: 'bg-amber-500', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  'Customer & Service': { bar: 'bg-violet-500', badge: 'bg-violet-50 text-violet-700 border-violet-200' },
  Production: { bar: 'bg-orange-500', badge: 'bg-orange-50 text-orange-700 border-orange-200' },
  'Inventory & Supply Chain': { bar: 'bg-cyan-500', badge: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  Pharmacy: { bar: 'bg-pink-500', badge: 'bg-pink-50 text-pink-700 border-pink-200' },
  Compliance: { bar: 'bg-rose-500', badge: 'bg-rose-50 text-rose-700 border-rose-200' },
  'Revenue Cycle': { bar: 'bg-sky-500', badge: 'bg-sky-50 text-sky-700 border-sky-200' },
  Fundraising: { bar: 'bg-lime-500', badge: 'bg-lime-50 text-lime-700 border-lime-200' },
  Portfolio: { bar: 'bg-teal-500', badge: 'bg-teal-50 text-teal-700 border-teal-200' },
  Advisory: { bar: 'bg-indigo-500', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  'Project Controls': { bar: 'bg-slate-500', badge: 'bg-slate-100 text-slate-700 border-slate-300' },
};

type Props = {
  items: PrismReport[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function PrismSidebar({ items, selectedId, onSelect }: Props) {
  return (
    <>
      {/* Desktop */}
      <nav className="hidden md:flex md:flex-col md:gap-1.5" aria-label="Prism report catalog">
        {items.map((item) => {
          const selected = item.id === selectedId;
          const style = CATEGORY_STYLE[item.category];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`group text-left rounded-lg border px-3 py-3 transition-colors relative overflow-hidden ${
                selected ? 'bg-white border-crimson/40 shadow-sm' : 'bg-white/50 border-border hover:bg-white'
              }`}
              aria-current={selected ? 'true' : undefined}
            >
              <span className={`absolute left-0 top-0 bottom-0 w-1 ${style.bar}`} />
              <div className="pl-2 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap mb-1">
                  <span className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border ${style.badge}`}>
                    {item.category}
                  </span>
                  <span className="text-[9px] font-mono text-mutedText">{item.estimatedTime}</span>
                </div>
                <p className={`text-xs font-semibold leading-snug ${selected ? 'text-crimson' : 'text-navy'}`}>
                  {item.name}
                </p>
                <p className="text-[10px] text-mutedText mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
        <p className="text-[10px] text-mutedText mt-3 px-1 italic">
          + 30 more templates across 7 categories
        </p>
      </nav>

      {/* Mobile */}
      <nav
        className="md:hidden flex gap-2 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1"
        aria-label="Prism report catalog"
      >
        {items.map((item) => {
          const selected = item.id === selectedId;
          const style = CATEGORY_STYLE[item.category];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`shrink-0 snap-start flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-colors ${
                selected ? 'bg-white border-crimson/40 text-crimson shadow-sm' : 'bg-white/50 border-border text-navy'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${style.bar}`} />
              <span className="max-w-[180px] truncate">{item.name}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

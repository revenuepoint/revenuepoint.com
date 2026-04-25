'use client';

import type { LensItem, LensView } from '@/data/foundryLens';

function IconForItem({ id, className = 'h-4 w-4' }: { id: LensView; className?: string }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  if (id === 'dashboard') {
    return (
      <svg className={className} {...common}>
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </svg>
    );
  }
  if (id === 'report') {
    return (
      <svg className={className} {...common}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" />
      </svg>
    );
  }
  if (id === 'metric-tree') {
    return (
      <svg className={className} {...common}>
        <circle cx="12" cy="4" r="2" />
        <circle cx="5" cy="14" r="2" />
        <circle cx="19" cy="14" r="2" />
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="15" cy="20" r="1.5" />
        <path d="M12 6v2l-5 4M12 8l5 4M5 16l4 3M19 16l-4 3" />
      </svg>
    );
  }
  // map
  return (
    <svg className={className} {...common}>
      <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z" />
      <path d="M9 3v15M15 6v15" />
    </svg>
  );
}

type Props = {
  items: LensItem[];
  selectedId: LensView;
  onSelect: (id: LensView) => void;
};

export function LensSidebar({ items, selectedId, onSelect }: Props) {
  return (
    <>
      {/* Desktop: vertical list */}
      <nav className="hidden md:flex md:flex-col md:gap-1.5" aria-label="Lens surfaces">
        {items.map((item) => {
          const selected = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`group text-left rounded-lg border px-3 py-3 transition-colors ${
                selected
                  ? 'bg-white border-crimson/40 shadow-sm'
                  : 'bg-white/50 border-rule hover:bg-white hover:border-rule'
              }`}
              aria-current={selected ? 'true' : undefined}
            >
              <div className="flex items-start gap-2">
                <span
                  className={`mt-0.5 shrink-0 ${selected ? 'text-crimson' : 'text-mute'}`}
                >
                  <IconForItem id={item.id} className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs font-semibold leading-snug ${
                      selected ? 'text-crimson' : 'text-navy'
                    }`}
                  >
                    {item.name}
                  </p>
                  <p className="text-[10px] text-mute mt-1">{item.tagline}</p>
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Mobile: horizontal chip strip */}
      <nav
        className="md:hidden flex gap-2 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1"
        aria-label="Lens surfaces"
      >
        {items.map((item) => {
          const selected = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`shrink-0 snap-start flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-colors ${
                selected
                  ? 'bg-white border-crimson/40 text-crimson shadow-sm'
                  : 'bg-white/50 border-rule text-navy'
              }`}
            >
              <IconForItem id={item.id} className="h-3.5 w-3.5" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

'use client';

import type { ActionDetail, DetailStatus } from '@/data/foundryActionDetails';

const STATUS_DOT: Record<DetailStatus, string> = {
  pending: 'bg-amber-500',
  running: 'bg-cyan-500',
  completed: 'bg-emerald-500',
};

const STATUS_LABEL: Record<DetailStatus, string> = {
  pending: 'Human Review',
  running: 'Running',
  completed: 'Completed',
};

type Props = {
  items: ActionDetail[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function ActionDetailSidebar({ items, selectedId, onSelect }: Props) {
  return (
    <>
      {/* Desktop: vertical list */}
      <nav className="hidden md:flex md:flex-col md:gap-1.5" aria-label="Action examples">
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
                  : 'bg-white/50 border-border hover:bg-white hover:border-border'
              }`}
              aria-current={selected ? 'true' : undefined}
            >
              <div className="flex items-start gap-2">
                <span
                  className={`mt-1 h-2 w-2 rounded-full shrink-0 ${STATUS_DOT[item.status]} ${
                    item.status === 'running' ? 'animate-pulse' : ''
                  }`}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs font-semibold leading-snug ${
                      selected ? 'text-crimson' : 'text-navy'
                    }`}
                  >
                    {item.name}
                  </p>
                  <p className="text-[10px] text-mutedText mt-1 truncate">{item.agent}</p>
                  <p className="text-[9px] uppercase tracking-widest text-mutedText mt-1">
                    {STATUS_LABEL[item.status]}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
        <p className="text-[10px] text-mutedText mt-3 px-1">Read-only preview</p>
      </nav>

      {/* Mobile: horizontal chip strip */}
      <nav
        className="md:hidden flex gap-2 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1"
        aria-label="Action examples"
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
                  : 'bg-white/50 border-border text-navy'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${STATUS_DOT[item.status]} ${
                  item.status === 'running' ? 'animate-pulse' : ''
                }`}
                aria-hidden="true"
              />
              <span className="max-w-[180px] truncate">{item.name}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

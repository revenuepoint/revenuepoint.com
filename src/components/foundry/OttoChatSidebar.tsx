'use client';

import type { OttoConversation } from '@/data/foundryOttoChats';

function BotIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 4v4M8 14h.01M16 14h.01M9 18h6" />
    </svg>
  );
}

type Props = {
  items: OttoConversation[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function OttoChatSidebar({ items, selectedId, onSelect }: Props) {
  return (
    <>
      {/* Desktop: vertical list */}
      <nav className="hidden md:flex md:flex-col md:gap-1.5" aria-label="Otto chat examples">
        {items.map((item) => {
          const selected = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`group text-left rounded-lg border px-3 py-3 transition-colors ${
                selected
                  ? 'bg-white border-navySoft/40 shadow-sm'
                  : 'bg-white/50 border-rule hover:bg-white hover:border-rule'
              }`}
              aria-current={selected ? 'true' : undefined}
            >
              <div className="flex items-start gap-2">
                <span
                  className={`mt-0.5 inline-flex items-center justify-center h-5 w-5 rounded-full shrink-0 ${
                    selected ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  <BotIcon className="h-3 w-3" />
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs font-semibold leading-snug ${
                      selected ? 'text-navySoft' : 'text-navy'
                    }`}
                  >
                    {item.sidebarTitle}
                  </p>
                  <p className="text-[10px] text-mute mt-1 uppercase tracking-widest">
                    {item.persona}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Mobile: horizontal chip strip */}
      <nav
        className="md:hidden flex gap-2 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1"
        aria-label="Otto chat examples"
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
                  ? 'bg-white border-navySoft/40 text-navySoft shadow-sm'
                  : 'bg-white/50 border-rule text-navy'
              }`}
            >
              <BotIcon className="h-3.5 w-3.5" />
              <span className="max-w-[180px] truncate">{item.sidebarTitle}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

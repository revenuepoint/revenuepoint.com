'use client';

import { type FoundryModule, type ModuleId, moduleLayerMeta } from '@/data/foundryModules';
import {
  ActionsI,
  AgentsI,
  CourierI,
  LensI,
  OttoI,
  PrismI,
} from '@/components/foundry/PlatformAppShell';

type Props = {
  items: FoundryModule[];
  selectedId: string;
  onSelect: (id: FoundryModule['id']) => void;
};

const MODULE_ICON: Record<ModuleId, (p: { className?: string }) => JSX.Element> = {
  lens: LensI,
  courier: CourierI,
  prism: PrismI,
  otto: OttoI,
  agents: AgentsI,
  actions: ActionsI,
};

export function PlatformModuleSidebar({ items, selectedId, onSelect }: Props) {
  return (
    <>
      {/* Desktop: vertical list */}
      <nav
        className="hidden md:flex md:flex-col md:gap-1.5"
        aria-label="Foundry modules"
      >
        {items.map((item) => {
          const selected = item.id === selectedId;
          const layer = moduleLayerMeta[item.layer];
          const Icon = MODULE_ICON[item.id];
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
              <div className="flex items-start gap-2.5">
                <span
                  className={`mt-0.5 inline-flex items-center justify-center h-7 w-7 rounded-md shrink-0 ${
                    selected
                      ? 'bg-crimson text-white'
                      : 'bg-offWhite text-navy border border-border'
                  }`}
                  aria-hidden="true"
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-bold leading-tight ${
                      selected ? 'text-crimson' : 'text-navy'
                    }`}
                  >
                    {item.name}
                  </p>
                  <p className="text-[11px] text-mutedText mt-0.5 leading-snug">
                    {item.role}
                  </p>
                  <span
                    className={`inline-block mt-1.5 text-[9px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded border ${layer.chipClass}`}
                  >
                    {layer.label}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Mobile: horizontal chip strip */}
      <nav
        className="md:hidden flex gap-2 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1"
        aria-label="Foundry modules"
      >
        {items.map((item) => {
          const selected = item.id === selectedId;
          const Icon = MODULE_ICON[item.id];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`shrink-0 snap-start flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
                selected
                  ? 'bg-white border-crimson/40 text-crimson shadow-sm'
                  : 'bg-white/50 border-border text-navy'
              }`}
            >
              <span
                className={`inline-flex items-center justify-center h-5 w-5 rounded ${
                  selected ? 'bg-crimson text-white' : 'bg-offWhite text-navy'
                }`}
                aria-hidden="true"
              >
                <Icon className="h-3 w-3" />
              </span>
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

'use client';

import type { ReactNode } from 'react';
import type { ModuleId } from '@/data/foundryModules';

/* Inline SVG icons — kept local so the shell has no coupling to PortalMockup. */
const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const HomeI = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4V14H9v8H5a2 2 0 0 1-2-2z" />
  </svg>
);
export const LensI = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M3 3v18h18M8 17V10M13 17V6M18 17V13" />
  </svg>
);
export const CourierI = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);
export const PrismI = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M12 3l1.9 5.3L19 10l-5.1 1.7L12 17l-1.9-5.3L5 10l5.1-1.7L12 3z" />
  </svg>
);
export const OttoI = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <rect x="4" y="8" width="16" height="12" rx="2" />
    <path d="M12 4v4M8 14h.01M16 14h.01M9 18h6" />
  </svg>
);
export const AgentsI = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
  </svg>
);
export const ActionsI = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
  </svg>
);
const RadarI = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
  </svg>
);
const BlueprintI = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <circle cx="5" cy="12" r="2" />
    <circle cx="19" cy="5" r="2" />
    <circle cx="19" cy="19" r="2" />
    <path d="M7 12h10M7 12l10-5M7 12l10 5" />
  </svg>
);
const SearchI = ({ className = 'h-3.5 w-3.5' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);
const BellI = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);
const SunI = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

type NavEntry = {
  id: ModuleId | 'home' | 'radar' | 'blueprint';
  label: string;
  icon: (p: { className?: string }) => JSX.Element;
  badge?: number;
};

const NAV: NavEntry[] = [
  { id: 'home', label: 'Home', icon: HomeI, badge: 3 },
  { id: 'lens', label: 'Lens', icon: LensI },
  { id: 'courier', label: 'Courier', icon: CourierI },
  { id: 'prism', label: 'Prism', icon: PrismI },
  { id: 'otto', label: 'Otto', icon: OttoI },
  { id: 'agents', label: 'Agents', icon: AgentsI },
  { id: 'actions', label: 'Actions', icon: ActionsI, badge: 12 },
  { id: 'radar', label: 'Radar', icon: RadarI, badge: 7 },
  { id: 'blueprint', label: 'Blueprint', icon: BlueprintI },
];

export function PlatformAppShell({
  activeModuleId,
  onSelect,
  children,
}: {
  activeModuleId: ModuleId;
  onSelect: (id: ModuleId) => void;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-2xl bg-white flex flex-col h-full">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#E5E7EB] border-b border-[#D1D5DB] shrink-0">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
      </div>

      {/* Top bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-white shrink-0">
        <span className="inline-flex items-center justify-center h-6 w-6 rounded bg-crimson text-white text-[11px] font-black">
          F
        </span>
        <span className="text-xs font-semibold text-navy hidden sm:inline">
          RevenuePoint Foundry
        </span>
        <div className="flex-1 h-6 mx-2 rounded bg-offWhite border border-border flex items-center gap-1.5 px-2 text-[10px] text-mutedText">
          <SearchI className="h-3 w-3" />
          <span className="truncate">Search Otto, Lens, Prism…</span>
        </div>
        <SunI className="h-4 w-4 text-mutedText" />
        <div className="relative">
          <BellI className="h-4 w-4 text-mutedText" />
          <span className="absolute -top-1 -right-1.5 h-3.5 min-w-[14px] px-0.5 rounded-full bg-crimson text-white text-[8px] font-bold flex items-center justify-center">
            3
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-crimsonLight text-crimson font-semibold border border-crimson/20">
          Ask Otto
        </span>
        <span className="h-6 w-6 rounded-full bg-navy text-white flex items-center justify-center text-[9px] font-bold">
          SK
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <nav
          className="w-12 border-r border-border bg-offWhite/50 flex flex-col py-1 shrink-0"
          aria-label="Modules"
        >
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeModuleId;
            const isSelectable =
              item.id === 'lens' ||
              item.id === 'courier' ||
              item.id === 'prism' ||
              item.id === 'otto' ||
              item.id === 'agents' ||
              item.id === 'actions';
            return (
              <button
                key={item.id}
                type="button"
                onClick={
                  isSelectable ? () => onSelect(item.id as ModuleId) : undefined
                }
                disabled={!isSelectable}
                aria-current={isActive ? 'page' : undefined}
                aria-label={item.label}
                className={`relative flex items-center justify-center py-2.5 transition-colors w-full ${
                  isActive
                    ? 'bg-crimsonLight text-crimson border-l-2 border-crimson'
                    : isSelectable
                      ? 'text-mutedText hover:text-navy hover:bg-white cursor-pointer'
                      : 'text-mutedText/50 cursor-default'
                }`}
                title={item.label}
              >
                <Icon className="h-4 w-4" />
                {item.badge != null && (
                  <span
                    className={`absolute top-1.5 right-2 h-1.5 w-1.5 rounded-full ${
                      isActive ? 'bg-crimson animate-pulse' : 'bg-blue-500'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Canvas */}
        <div className="flex-1 min-w-0 overflow-hidden bg-white flex relative">
          {children}
        </div>
      </div>
    </div>
  );
}

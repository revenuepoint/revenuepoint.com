'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import {
  PortalDirectorContext,
  usePortalDirector,
  usePortalDirectorFlags,
} from './usePortalDirector';
import { PortalCursor } from './PortalCursor';
import { PrismReportModal } from './PrismReportModal';
import { RadarAckToast } from './RadarAckToast';
import {
  ActionsView,
  AgentsView,
  CourierView,
  LensView,
  ModuleHeader,
  OttoView,
  PrismView,
} from './ModuleViews';

/* ============================================================================
 * Icons (all inline SVG, no external deps)
 * ==========================================================================*/

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const HomeI = ({ className = 'h-3.5 w-3.5' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4V14H9v8H5a2 2 0 0 1-2-2z" />
  </svg>
);
const LensI = ({ className = 'h-3.5 w-3.5' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M3 3v18h18M8 17V10M13 17V6M18 17V13" />
  </svg>
);
const CourierI = ({ className = 'h-3.5 w-3.5' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);
const PrismI = ({ className = 'h-3.5 w-3.5' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M12 3l1.9 5.3L19 10l-5.1 1.7L12 17l-1.9-5.3L5 10l5.1-1.7L12 3z" />
  </svg>
);
const OttoI = ({ className = 'h-3.5 w-3.5' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <rect x="4" y="8" width="16" height="12" rx="2" />
    <path d="M12 4v4M8 14h.01M16 14h.01M9 18h6" />
  </svg>
);
const AgentsI = ({ className = 'h-3.5 w-3.5' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
  </svg>
);
const ActionsI = ({ className = 'h-3.5 w-3.5' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
  </svg>
);
const RadarI = ({ className = 'h-3.5 w-3.5' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
  </svg>
);
const BlueprintI = ({ className = 'h-3.5 w-3.5' }: { className?: string }) => (
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
const AlertI = ({ className = 'h-3 w-3' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <path d="M12 9v4m0 4h.01" />
  </svg>
);
const StarI = ({ className = 'h-3 w-3' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3 7 7 .7-5.3 4.7L18 22l-6-3.5L6 22l1.3-7.6L2 9.7 9 9z" />
  </svg>
);
const TrendUpI = ({ className = 'h-3 w-3' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />
  </svg>
);
const TrendDownI = ({ className = 'h-3 w-3' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M23 18l-9.5-9.5-5 5L1 6M17 18h6v-6" />
  </svg>
);
const FileTextI = ({ className = 'h-3 w-3' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M8 13h8M8 17h8" />
  </svg>
);
const CheckI = ({ className = 'h-3 w-3' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 13l4 4L19 7" />
  </svg>
);
const LockI = ({ className = 'h-3 w-3' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

/* ============================================================================
 * Data pools
 * ==========================================================================*/

type NavItem = {
  id: string;
  label: string;
  icon: (p: { className?: string }) => JSX.Element;
  color: string;
  badge?: number;
  active?: boolean;
};

const NAV: NavItem[] = [
  { id: 'home', label: 'Home', icon: HomeI, color: '#0F2B4D', badge: 3, active: true },
  { id: 'lens', label: 'Lens', icon: LensI, color: '#2563eb' },
  { id: 'courier', label: 'Courier', icon: CourierI, color: '#7c3aed' },
  { id: 'prism', label: 'Prism', icon: PrismI, color: '#d97706' },
  { id: 'otto', label: 'Otto', icon: OttoI, color: '#8B0A39' },
  { id: 'agents', label: 'Agents', icon: AgentsI, color: '#0891b2' },
  { id: 'actions', label: 'Actions', icon: ActionsI, color: '#0F2B4D', badge: 12 },
  { id: 'radar', label: 'Radar', icon: RadarI, color: '#dc2626', badge: 7 },
  { id: 'blueprint', label: 'Blueprint', icon: BlueprintI, color: '#9333ea' },
];

type Kpi = {
  id: string;
  label: string;
  value: string;
  change: string;
  tone: 'good' | 'bad' | 'neutral';
  color: string; // stroke color for sparkline
  spark: number[];
};

const KPIS: Kpi[] = [
  {
    id: 'revenue',
    label: 'Monthly Revenue',
    value: '$2.84M',
    change: '+4.2%',
    tone: 'good',
    color: '#059669',
    spark: [2.58, 2.6, 2.62, 2.65, 2.7, 2.72, 2.68, 2.74, 2.78, 2.8, 2.82, 2.84],
  },
  {
    id: 'actions',
    label: 'Open Actions',
    value: '12',
    change: '-2',
    tone: 'good',
    color: '#2563eb',
    spark: [18, 17, 16, 15, 17, 16, 15, 14, 14, 13, 13, 12],
  },
  {
    id: 'oee',
    label: 'OEE · 3 lines',
    value: '74.3%',
    change: '-4.1pp',
    tone: 'bad',
    color: '#d97706',
    spark: [82.1, 81.5, 80.2, 79.8, 78.4, 77.9, 78.2, 76.5, 75.8, 75.1, 77.5, 74.3],
  },
  {
    id: 'scripts',
    label: 'Scripts / wk',
    value: '2,847',
    change: '+3.2%',
    tone: 'good',
    color: '#10b981',
    spark: [2550, 2620, 2590, 2710, 2680, 2760, 2730, 2790, 2820, 2800, 2830, 2847],
  },
];

type FeedCardType = 'anomaly' | 'agent' | 'metric' | 'milestone' | 'report' | 'prism';

type FeedCard = {
  id: string;
  type: FeedCardType;
  category: string;
  // Skeleton line widths as tailwind width classes (industry-neutral placeholder bars)
  headlineW: string;
  detailW: string;
};

const FEED_POOL: FeedCard[] = [
  { id: 'anomaly-1', type: 'anomaly', category: 'RADAR', headlineW: 'w-11/12', detailW: 'w-2/3' },
  { id: 'agent-1', type: 'agent', category: 'AGENT', headlineW: 'w-10/12', detailW: 'w-7/12' },
  { id: 'metric-1', type: 'metric', category: 'LENS', headlineW: 'w-9/12', detailW: 'w-5/12' },
  { id: 'milestone-1', type: 'milestone', category: 'MILESTONE', headlineW: 'w-11/12', detailW: 'w-3/5' },
  { id: 'report-1', type: 'report', category: 'COURIER', headlineW: 'w-10/12', detailW: 'w-1/2' },
  { id: 'prism-1', type: 'prism', category: 'PRISM', headlineW: 'w-9/12', detailW: 'w-2/3' },
];

const TYPE_STYLE: Record<
  FeedCardType,
  { border: string; bg: string; iconBg: string; iconColor: string; Icon: (p: { className?: string }) => JSX.Element }
> = {
  anomaly: { border: 'border-l-red-500', bg: 'bg-white', iconBg: 'bg-red-50', iconColor: 'text-red-600', Icon: AlertI },
  agent: { border: 'border-l-cyan-500', bg: 'bg-white', iconBg: 'bg-cyan-50', iconColor: 'text-cyan-600', Icon: OttoI },
  metric: { border: 'border-l-blue-500', bg: 'bg-white', iconBg: 'bg-blue-50', iconColor: 'text-blue-600', Icon: TrendUpI },
  milestone: { border: 'border-l-amber-400', bg: 'bg-white', iconBg: 'bg-amber-50', iconColor: 'text-amber-600', Icon: StarI },
  report: { border: 'border-l-emerald-500', bg: 'bg-white', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', Icon: FileTextI },
  prism: { border: 'border-l-teal-500', bg: 'bg-white', iconBg: 'bg-teal-50', iconColor: 'text-teal-600', Icon: PrismI },
};

/* ============================================================================
 * Loop state machine
 * ==========================================================================*/

type LoopState = {
  feedIds: string[]; // currently-visible feed card ids (top-to-bottom, newest first)
  feedCursor: number;
  kpiFlashIndex: number | null;
  kpiDrawTokens: Record<string, number>;
  notificationCount: number;
};

function useInitialFeedIds(): string[] {
  // Pre-populate with 3 pool items; deterministic so SSR/CSR match.
  return [FEED_POOL[0].id, FEED_POOL[1].id, FEED_POOL[2].id];
}

function usePortalLoop() {
  const [state, setState] = useState<LoopState>(() => ({
    feedIds: useInitialFeedIds(),
    feedCursor: 3,
    kpiFlashIndex: null,
    kpiDrawTokens: { revenue: 0, actions: 0, oee: 0, scripts: 0 },
    notificationCount: 3,
  }));

  const mounted = useRef(false);
  const kpiCursor = useRef(0);

  useEffect(() => {
    // After initial mount, start timers. Small delay so entrance animation completes.
    const startDelay = window.setTimeout(() => {
      mounted.current = true;
    }, 2000);

    const feedTimer = window.setInterval(() => {
      if (!mounted.current) return;
      setState((prev) => {
        const nextCursor = (prev.feedCursor + 1) % FEED_POOL.length;
        const nextId = FEED_POOL[nextCursor].id;
        const nextIds = [nextId, ...prev.feedIds].slice(0, 3);
        return { ...prev, feedIds: nextIds, feedCursor: nextCursor };
      });
    }, 3500);

    const kpiTimer = window.setInterval(() => {
      if (!mounted.current) return;
      setState((prev) => {
        const idx = kpiCursor.current % KPIS.length;
        kpiCursor.current += 1;
        const key = KPIS[idx].id;
        return {
          ...prev,
          kpiFlashIndex: idx,
          kpiDrawTokens: { ...prev.kpiDrawTokens, [key]: (prev.kpiDrawTokens[key] ?? 0) + 1 },
        };
      });
      // Clear the flash state after the animation completes.
      window.setTimeout(() => {
        setState((prev) => ({ ...prev, kpiFlashIndex: null }));
      }, 1000);
    }, 5500);

    const notifTimer = window.setInterval(() => {
      if (!mounted.current) return;
      setState((prev) => {
        const next = prev.notificationCount + 1;
        return { ...prev, notificationCount: next > 6 ? 3 : next };
      });
    }, 7000);

    return () => {
      window.clearTimeout(startDelay);
      window.clearInterval(feedTimer);
      window.clearInterval(kpiTimer);
      window.clearInterval(notifTimer);
    };
  }, []);

  return state;
}

/* ============================================================================
 * Sub-components
 * ==========================================================================*/

function BrowserChrome() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2 bg-[#E5E7EB] border-b border-[#D1D5DB]">
      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
    </div>
  );
}

function Sparkline({
  values,
  color,
  drawToken,
  width = 100,
  height = 24,
}: {
  values: number[];
  color: string;
  drawToken: number;
  width?: number;
  height?: number;
}) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1);
  const points = values
    .map((v, i) => `${(i * step).toFixed(1)},${(height - ((v - min) / range) * height).toFixed(1)}`)
    .join(' ');
  const area = `0,${height} ${points} ${width},${height}`;
  // Key by drawToken so React remounts the polyline → dash animation replays.
  return (
    <svg key={drawToken} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-6" aria-hidden="true">
      <polygon points={area} fill={color} opacity={0.1} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        style={{ animation: 'portalSparkDraw 900ms ease-out forwards' }}
      />
    </svg>
  );
}

function KpiTile({
  kpi,
  index,
  flashing,
  drawToken,
}: {
  kpi: Kpi;
  index: number;
  flashing: boolean;
  drawToken: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.35, ease: 'easeOut' }}
      className={`bg-white border rounded-md p-2.5 transition-colors duration-300 ${
        flashing ? 'border-crimson/40 shadow-sm bg-crimsonLight/30' : 'border-border'
      }`}
    >
      <div className="flex items-center gap-1">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            kpi.tone === 'good' ? 'bg-emerald-500' : kpi.tone === 'bad' ? 'bg-red-500' : 'bg-amber-500'
          }`}
        />
        <p className="text-[8px] font-semibold uppercase tracking-wider text-mutedText truncate">{kpi.label}</p>
      </div>
      <div className="flex items-baseline gap-1.5 mt-0.5">
        <p className={`text-sm font-bold font-mono text-navy transition-colors duration-500 ${flashing ? 'text-crimson' : ''}`}>
          {kpi.value}
        </p>
        <span className={`text-[9px] font-mono ${kpi.tone === 'good' ? 'text-emerald-600' : kpi.tone === 'bad' ? 'text-red-600' : 'text-amber-600'}`}>
          {kpi.tone === 'good' ? '▲' : kpi.tone === 'bad' ? '▼' : '•'} {kpi.change}
        </span>
      </div>
      <Sparkline values={kpi.spark} color={kpi.color} drawToken={drawToken} />
    </motion.div>
  );
}

function SidebarItem({
  item,
  isActive,
}: {
  item: NavItem;
  isActive: boolean;
}) {
  const Icon = item.icon;
  return (
    <div
      data-cursor-target={`sidebar-${item.id}`}
      className={`relative flex items-center justify-center py-2 transition-colors w-full ${
        isActive
          ? 'bg-crimsonLight text-crimson border-l-2 border-crimson'
          : 'text-mutedText'
      }`}
      title={item.label}
      aria-current={isActive ? 'page' : undefined}
      aria-hidden="true"
    >
      <Icon className="h-3.5 w-3.5" />
      {item.badge != null && (
        <span
          className={`absolute top-1 right-1.5 h-1.5 w-1.5 rounded-full ${
            isActive ? 'bg-crimson animate-pulse' : 'bg-blue-500'
          }`}
        />
      )}
    </div>
  );
}


/* ------- Radar: anomaly stream ------- */
function RadarView() {
  const flags = usePortalDirectorFlags();
  const acked = !!flags['radar.ack'];
  const items = [
    { severity: 'critical', border: 'border-l-red-500', badge: 'bg-red-50 text-red-700 border-red-200', chip: 'Critical', spark: '#ef4444' },
    { severity: 'high', border: 'border-l-amber-500', badge: 'bg-amber-50 text-amber-700 border-amber-200', chip: 'High', spark: '#f59e0b' },
    { severity: 'medium', border: 'border-l-yellow-400', badge: 'bg-yellow-50 text-yellow-700 border-yellow-200', chip: 'Medium', spark: '#eab308' },
  ];
  return (
    <div className="flex-1 min-w-0 bg-white flex flex-col overflow-hidden">
      <ModuleHeader eyebrow="Radar" title="Active Anomalies" />
      <div className="flex-1 overflow-hidden px-3 py-2">
        <div className="flex flex-col gap-1.5">
          {items.map((a, i) => {
            const isFirstCritical = i === 0;
            const dim = isFirstCritical && acked;
            return (
            <div
              key={i}
              {...(isFirstCritical ? { 'data-cursor-target': 'radar-critical-0' } : {})}
              className={`bg-white border border-border rounded border-l-4 ${a.border} p-2 flex items-start gap-2 transition-opacity ${
                dim ? 'opacity-45' : ''
              }`}
            >
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-50 text-red-600 shrink-0">
                <AlertI className="h-2.5 w-2.5" />
              </span>
              <div className="min-w-0 flex-1 flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[8px] font-semibold uppercase tracking-wider px-1 py-0.5 rounded border ${a.badge}`}>
                    {a.chip}
                  </span>
                  <span className="text-[8px] text-mutedText">just now</span>
                </div>
                <div className="h-2 rounded-sm bg-navy/70 w-11/12" />
                <div className="h-1.5 rounded-sm bg-mutedText/30 w-7/12" />
              </div>
              <svg viewBox="0 0 40 16" preserveAspectRatio="none" className="w-10 h-4 shrink-0">
                <polyline points="0,12 8,11 16,10 24,11 32,4 40,6" fill="none" stroke={a.spark} strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------- Blueprint: object graph (static inline SVG) ------- */
type BlueprintNode = { id: string; x: number; y: number; w: number; top: string; edges: string[] };

function BlueprintView() {
  const flags = usePortalDirectorFlags();
  const hoverNode = flags['blueprint.hover-node'];
  const nodes: BlueprintNode[] = [
    { id: 'ingest', x: 20, y: 20, w: 80, top: '#2563eb', edges: ['orders', 'customers', 'invoices'] },
    { id: 'orders', x: 120, y: 20, w: 80, top: '#d97706', edges: ['invoices', 'shipments', 'actions'] },
    { id: 'customers', x: 220, y: 20, w: 80, top: '#059669', edges: ['orders', 'invoices', 'shipments'] },
    { id: 'invoices', x: 20, y: 80, w: 80, top: '#0891b2', edges: ['actions'] },
    { id: 'shipments', x: 120, y: 80, w: 80, top: '#0891b2', edges: ['actions'] },
    { id: 'inventory', x: 220, y: 80, w: 80, top: '#0891b2', edges: ['actions'] },
    { id: 'actions', x: 120, y: 140, w: 80, top: '#8B0A39', edges: [] },
  ];
  const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const edgeList: Array<{ from: string; to: string; dashed?: boolean }> = [
    { from: 'ingest', to: 'orders', dashed: true },
    { from: 'orders', to: 'customers', dashed: true },
    { from: 'ingest', to: 'invoices' },
    { from: 'orders', to: 'shipments' },
    { from: 'customers', to: 'inventory' },
    { from: 'invoices', to: 'actions' },
    { from: 'shipments', to: 'actions' },
    { from: 'inventory', to: 'actions' },
  ];

  const isEdgeActive = (from: string, to: string) => {
    if (!hoverNode) return false;
    return from === hoverNode || to === hoverNode;
  };

  const center = (n: BlueprintNode) => ({ cx: n.x + n.w / 2, cy: n.y + 20 });

  return (
    <div className="flex-1 min-w-0 bg-white flex flex-col overflow-hidden">
      <ModuleHeader eyebrow="Blueprint" title="Business Object Graph" />
      <div className="flex-1 overflow-hidden px-3 py-2 relative">
        {/* Invisible DOM hit-targets overlaid on top of SVG (for cursor targeting) */}
        <div className="absolute inset-3 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 320 200" preserveAspectRatio="none" className="w-full h-full absolute inset-0">
            {/* Edges */}
            <g fill="none">
              {edgeList.map((e) => {
                const a = center(nodeById[e.from]);
                const b = center(nodeById[e.to]);
                const active = isEdgeActive(e.from, e.to);
                return (
                  <path
                    key={`${e.from}-${e.to}`}
                    d={`M ${a.cx} ${a.cy} L ${b.cx} ${b.cy}`}
                    stroke={active ? '#8B0A39' : '#94A3B8'}
                    strokeWidth={active ? 1.6 : 1}
                    strokeDasharray={e.dashed ? '2 2' : undefined}
                    className="transition-[stroke,stroke-width] duration-300"
                  />
                );
              })}
            </g>
            {/* Nodes */}
            {nodes.map((n) => {
              const active = hoverNode === n.id;
              return (
                <g key={n.id} className="transition-opacity duration-300">
                  <rect
                    x={n.x}
                    y={n.y}
                    width={n.w}
                    height="40"
                    rx="4"
                    fill="white"
                    stroke={active ? '#8B0A39' : '#D4DDE8'}
                    strokeWidth={active ? 2 : 1}
                  />
                  <rect x={n.x} y={n.y} width={n.w} height="3" fill={n.top} />
                  <rect x={n.x + 8} y={n.y + 12} width={32} height="4" rx="1" fill="#0F2B4D" opacity="0.7" />
                  <rect x={n.x + 8} y={n.y + 22} width={48} height="3" rx="1" fill="#6B8299" opacity="0.5" />
                  {active && (
                    <rect
                      x={n.x - 2}
                      y={n.y - 2}
                      width={n.w + 4}
                      height="44"
                      rx="5"
                      fill="none"
                      stroke="#8B0A39"
                      strokeOpacity="0.35"
                      strokeWidth="2"
                      className="animate-pulse"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* DOM cursor targets aligned to node positions (viewBox is 320×200, container fills parent) */}
          {nodes.map((n) => (
            <div
              key={n.id}
              data-cursor-target={`node-${n.id}`}
              className="absolute"
              style={{
                left: `${(n.x / 320) * 100}%`,
                top: `${(n.y / 200) * 100}%`,
                width: `${(n.w / 320) * 100}%`,
                height: `${(40 / 200) * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * Module placeholder — fallback
 * ==========================================================================*/

function ModulePlaceholder({ item }: { item: NavItem }) {
  const Icon = item.icon;
  return (
    <div className="flex-1 min-w-0 bg-white flex flex-col items-center justify-center gap-3 p-4">
      <span
        className="inline-flex items-center justify-center h-14 w-14 rounded-full border"
        style={{ borderColor: `${item.color}40`, backgroundColor: `${item.color}15`, color: item.color }}
      >
        <Icon className="h-6 w-6" />
      </span>
      <div className="text-center">
        <p className="text-sm font-semibold text-navy">{item.label}</p>
        <p className="text-[10px] text-mutedText mt-1 max-w-[220px]">
          Full {item.label} workspace · click Home or Otto to continue the demo.
        </p>
      </div>
    </div>
  );
}

function FeedCardView({ card }: { card: FeedCard }) {
  const style = TYPE_STYLE[card.type];
  const Icon = style.Icon;
  return (
    <div
      className={`${style.bg} border border-border rounded-md border-l-4 ${style.border} p-2 flex items-start gap-2 shadow-sm`}
    >
      <span
        className={`inline-flex items-center justify-center h-5 w-5 rounded-full shrink-0 ${style.iconBg} ${style.iconColor}`}
      >
        <Icon className="h-3 w-3" />
      </span>
      <div className="min-w-0 flex-1 flex flex-col gap-1.5">
        <p className="text-[8px] font-semibold uppercase tracking-wider text-mutedText">
          {card.category}
        </p>
        {/* Skeleton headline */}
        <div className={`h-2 rounded-sm bg-navy/70 ${card.headlineW}`} />
        {/* Skeleton detail */}
        <div className={`h-1.5 rounded-sm bg-mutedText/30 ${card.detailW}`} />
      </div>
    </div>
  );
}

/* ============================================================================
 * Main component
 * ==========================================================================*/

export function PortalMockup() {
  const state = usePortalLoop();
  const containerRef = useRef<HTMLDivElement>(null);
  const director = usePortalDirector(containerRef);
  const activeModule = director.activeModule;
  const feedCards = state.feedIds
    .map((id) => FEED_POOL.find((c) => c.id === id))
    .filter(Boolean) as FeedCard[];

  const activeItem = NAV.find((n) => n.id === activeModule) ?? NAV[0];
  const prismModalValue = director.flags['prism.modal'];
  const prismModalIndex = typeof prismModalValue === 'number' ? prismModalValue : null;
  const radarToastOpen = !!director.flags['radar.ack'];

  return (
    <MotionConfig reducedMotion="user">
      <style jsx>{`
        @keyframes portalSparkDraw {
          from {
            stroke-dashoffset: 1;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes ottoBreathe {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 6px 24px rgba(139, 10, 57, 0.25);
          }
          50% {
            transform: scale(1.04);
            box-shadow: 0 8px 32px rgba(139, 10, 57, 0.4);
          }
        }
      `}</style>

      <PortalDirectorContext.Provider value={{ flags: director.flags }}>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative rounded-xl overflow-hidden border border-border shadow-2xl bg-white"
        style={{ aspectRatio: '4 / 3', pointerEvents: 'none' }}
        data-cursor-root
      >
        <BrowserChrome />

        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="flex items-center gap-2 px-3 py-2 border-b border-border bg-white"
        >
          <span className="inline-flex items-center justify-center h-5 w-5 rounded bg-crimson text-white text-[10px] font-black">
            F
          </span>
          <span className="text-[10px] font-semibold text-navy hidden sm:inline">RevenuePoint Foundry</span>
          <div className="flex-1 h-5 mx-2 rounded-sm bg-offWhite border border-border flex items-center gap-1.5 px-2 text-[9px] text-mutedText">
            <SearchI className="h-2.5 w-2.5" />
            <span className="truncate">Search Otto, Lens, Prism...</span>
          </div>
          <SunI className="h-3.5 w-3.5 text-mutedText" />
          <div className="relative">
            <BellI className="h-3.5 w-3.5 text-mutedText" />
            <motion.span
              key={state.notificationCount}
              initial={{ scale: 0.6, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="absolute -top-1 -right-1.5 h-3.5 min-w-[14px] px-0.5 rounded-full bg-crimson text-white text-[8px] font-bold flex items-center justify-center"
            >
              {state.notificationCount}
            </motion.span>
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded bg-crimsonLight text-crimson font-semibold border border-crimson/20">
            Ask Otto
          </span>
          <span className="h-5 w-5 rounded-full bg-navy text-white flex items-center justify-center text-[8px] font-bold">
            SK
          </span>
        </motion.div>

        {/* Body */}
        <div className="flex" style={{ height: 'calc(100% - 60px)' }}>
          {/* Sidebar */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.35, ease: 'easeOut' }}
            className="flex w-10 border-r border-border bg-offWhite/50 flex-col py-1 shrink-0"
          >
            {NAV.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                isActive={item.id === activeModule}
              />
            ))}
          </motion.div>

          {/* Main canvas — routed by activeModule */}
          <AnimatePresence mode="wait" initial={false}>
            {activeModule === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 min-w-0 overflow-hidden bg-white flex flex-col"
              >
                {/* Greeting */}
                <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-border/50 shrink-0">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-navy">Good morning, Sarah</p>
                    <p className="text-[9px] text-mutedText">Wednesday · April 18 · 6 signals overnight</p>
                  </div>
                </div>

                {/* KPI strip */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 px-3 pt-2 pb-1.5 shrink-0">
                  {KPIS.map((kpi, i) => (
                    <KpiTile
                      key={kpi.id}
                      kpi={kpi}
                      index={i}
                      flashing={state.kpiFlashIndex === i}
                      drawToken={state.kpiDrawTokens[kpi.id] ?? 0}
                    />
                  ))}
                </div>

                {/* Feed label row */}
                <div className="flex items-center gap-1.5 px-3 pt-2 pb-1.5 shrink-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-crimson">Feed</p>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-crimson text-white font-semibold">All</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full border border-border text-mutedText">Anomalies</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full border border-border text-mutedText">Agents</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full border border-border text-mutedText hidden lg:inline">Reports</span>
                </div>

                {/* Feed stream */}
                <div
                  data-cursor-target="home-feed"
                  className="flex-1 px-3 pb-2 overflow-hidden"
                >
                  <div className="flex flex-col gap-1.5">
                    <AnimatePresence initial={false}>
                      {feedCards.map((card) => (
                        <motion.div
                          key={card.id}
                          layout
                          initial={{ opacity: 0, y: -12, scale: 0.96, boxShadow: '0 0 0 4px rgba(139,10,57,0.25)' }}
                          animate={{ opacity: 1, y: 0, scale: 1, boxShadow: '0 0 0 0 rgba(139,10,57,0)' }}
                          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
                          transition={{
                            layout: { type: 'spring', stiffness: 280, damping: 30 },
                            opacity: { duration: 0.32 },
                            y: { duration: 0.4, ease: 'easeOut' },
                            scale: { duration: 0.3 },
                            boxShadow: { duration: 0.9, ease: 'easeOut' },
                          }}
                        >
                          <FeedCardView card={card} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}

            {activeModule === 'otto' && (
              <motion.div
                key="otto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 min-w-0 overflow-hidden bg-white flex flex-col"
              >
                <OttoView />
              </motion.div>
            )}

            {activeModule === 'lens' && (
              <motion.div key="lens" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex-1 min-w-0 overflow-hidden bg-white flex flex-col">
                <LensView />
              </motion.div>
            )}

            {activeModule === 'courier' && (
              <motion.div key="courier" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex-1 min-w-0 overflow-hidden bg-white flex flex-col">
                <CourierView />
              </motion.div>
            )}

            {activeModule === 'prism' && (
              <motion.div key="prism" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex-1 min-w-0 overflow-hidden bg-white flex flex-col">
                <PrismView />
              </motion.div>
            )}

            {activeModule === 'agents' && (
              <motion.div key="agents" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex-1 min-w-0 overflow-hidden bg-white flex flex-col">
                <AgentsView />
              </motion.div>
            )}

            {activeModule === 'actions' && (
              <motion.div key="actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex-1 min-w-0 overflow-hidden bg-white flex flex-col">
                <ActionsView />
              </motion.div>
            )}

            {activeModule === 'radar' && (
              <motion.div key="radar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex-1 min-w-0 overflow-hidden bg-white flex flex-col">
                <RadarView />
              </motion.div>
            )}

            {activeModule === 'blueprint' && (
              <motion.div key="blueprint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex-1 min-w-0 overflow-hidden bg-white flex flex-col">
                <BlueprintView />
              </motion.div>
            )}

            {!['home', 'otto', 'lens', 'courier', 'prism', 'agents', 'actions', 'radar', 'blueprint'].includes(activeModule) && (
              <motion.div
                key={`placeholder-${activeModule}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 min-w-0 overflow-hidden bg-white flex"
              >
                <ModulePlaceholder item={activeItem} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Otto button */}
        <div
          className="absolute bottom-3 right-3 z-10 h-10 w-10 rounded-full bg-crimson text-white flex items-center justify-center shadow-lg"
          style={{ animation: 'ottoBreathe 2.4s ease-in-out infinite' }}
          aria-hidden="true"
        >
          <OttoI className="h-4 w-4" />
        </div>

        {/* Scripted overlays */}
        <PrismReportModal index={prismModalIndex} />
        <RadarAckToast open={radarToastOpen} />
        <PortalCursor
          xMV={director.xMV}
          yMV={director.yMV}
          visible={director.cursor.visible}
          clickKey={director.cursor.clickKey}
          reducedMotion={director.reducedMotion}
        />
      </motion.div>
      </PortalDirectorContext.Provider>
    </MotionConfig>
  );
}

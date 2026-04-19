'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePortalDirectorFlags } from './usePortalDirector';

/* ============================================================================
 * Icons (local inline SVGs used by the module views)
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

const OttoI = ({ className = 'h-3.5 w-3.5' }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <rect x="4" y="8" width="16" height="12" rx="2" />
    <path d="M12 4v4M8 14h.01M16 14h.01M9 18h6" />
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

/* ============================================================================
 * Shared module header
 * ==========================================================================*/

export function ModuleHeader({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return (
    <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-border/50 shrink-0">
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-[8px] font-bold uppercase tracking-widest text-mutedText">
            {eyebrow}
          </p>
        )}
        <p className="text-[11px] font-semibold text-navy leading-tight">{title}</p>
      </div>
    </div>
  );
}

/* ============================================================================
 * Otto: internal conversation loop + small chart/table primitives
 * ==========================================================================*/

function MiniBarChart() {
  const bars = [
    { label: 'Q', value: 62, color: '#60a5fa' },
    { label: 'P', value: 88, color: '#3b82f6' },
    { label: 'N', value: 45, color: '#1d4ed8' },
    { label: 'W', value: 28, color: '#065f46' },
  ];
  const max = 100;
  return (
    <div className="flex items-end gap-1 h-14">
      {bars.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ height: 0 }}
          animate={{ height: `${(b.value / max) * 100}%` }}
          transition={{ delay: 0.4 + i * 0.1, duration: 0.45, ease: 'easeOut' }}
          className="flex-1 rounded-t-sm"
          style={{ backgroundColor: b.color, opacity: 0.9 }}
        />
      ))}
    </div>
  );
}

function MiniTable() {
  return (
    <div className="rounded border border-border overflow-hidden bg-white mt-2">
      <div className="grid grid-cols-[40%_30%_30%] text-[8px] font-semibold uppercase tracking-wider text-mutedText bg-offWhite px-2 py-1 border-b border-border">
        <span>Record</span>
        <span>Status</span>
        <span className="text-right">Value</span>
      </div>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="grid grid-cols-[40%_30%_30%] items-center px-2 py-1.5 border-b last:border-0 border-border gap-2"
        >
          <div className="h-1.5 rounded-sm bg-navy/60 w-3/4" />
          <div className="h-1.5 rounded-sm bg-emerald-500/60 w-1/2" />
          <div className="h-1.5 rounded-sm bg-navy/40 w-2/3 justify-self-end" />
        </div>
      ))}
    </div>
  );
}

type ReplyVariant = 'rich' | 'pie' | 'record' | 'actions';

const USER_VARIANTS: Array<{ widths: string[] }> = [
  { widths: ['w-28', 'w-20'] },
  { widths: ['w-36', 'w-24'] },
  { widths: ['w-32'] },
  { widths: ['w-40', 'w-28', 'w-16'] },
  { widths: ['w-24', 'w-20'] },
  { widths: ['w-36', 'w-32'] },
];

const REPLY_VARIANTS: Array<{
  kind: ReplyVariant;
  chips: Array<{ label: string; tone: 'primary' | 'muted' }>;
}> = [
  {
    kind: 'rich',
    chips: [
      { label: 'View in Lens', tone: 'primary' },
      { label: 'Share', tone: 'muted' },
    ],
  },
  {
    kind: 'pie',
    chips: [
      { label: 'Open in Prism', tone: 'primary' },
      { label: 'Export', tone: 'muted' },
    ],
  },
  {
    kind: 'record',
    chips: [
      { label: 'Open record', tone: 'primary' },
      { label: 'Edit', tone: 'muted' },
    ],
  },
  {
    kind: 'actions',
    chips: [],
  },
];

type ChatEntry =
  | { id: string; kind: 'user'; variant: number }
  | { id: string; kind: 'reply'; variant: number };

const TURN_USER_GAP = 500;
const TURN_TYPING_GAP = 900;
const TURN_REPLY_GAP = 1600;
const MAX_ENTRIES = 24;

function TypingDots() {
  return (
    <div className="rounded-md rounded-bl-sm bg-white border border-border px-2.5 py-1.5 flex items-center gap-1">
      {[0, 180, 360].map((d) => (
        <span
          key={d}
          className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce"
          style={{ animationDelay: `${d}ms`, animationDuration: '1.2s' }}
        />
      ))}
    </div>
  );
}

function MiniPie() {
  // Donut chart: 4 segments on circumference 2πr. r=18 → C ≈ 113
  const segments = [
    { color: '#3b82f6', value: 42 },
    { color: '#10b981', value: 28 },
    { color: '#f59e0b', value: 18 },
    { color: '#7c3aed', value: 12 },
  ];
  const r = 18;
  const C = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 48 48" className="h-14 w-14 -rotate-90">
        {segments.map((s, i) => {
          const len = (s.value / 100) * C;
          const dasharray = `${len} ${C - len}`;
          const node = (
            <circle
              key={i}
              cx="24"
              cy="24"
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="8"
              strokeDasharray={dasharray}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return node;
        })}
      </svg>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-sm shrink-0" style={{ backgroundColor: s.color }} />
            <div className="h-1.5 rounded-sm bg-mutedText/30 flex-1 max-w-[70%]" />
            <span className="text-[8px] font-mono text-mutedText">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniRecord() {
  return (
    <div className="rounded border border-border bg-white overflow-hidden">
      <div className="px-2 py-1.5 bg-offWhite border-b border-border flex items-center gap-1.5">
        <span className="h-4 w-4 rounded-sm bg-blue-500/80" />
        <div className="h-1.5 rounded-sm bg-navy/60 w-20" />
        <span className="ml-auto text-[8px] px-1 py-0.5 rounded border border-emerald-200 bg-emerald-50 text-emerald-700 font-semibold">
          Active
        </span>
      </div>
      <div className="px-2 py-1.5 flex flex-col gap-1.5">
        {[
          { label: 'w-10', value: 'w-8/12' },
          { label: 'w-12', value: 'w-6/12' },
          { label: 'w-8', value: 'w-10/12' },
          { label: 'w-14', value: 'w-5/12' },
        ].map((r, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className={`h-1 rounded-sm bg-mutedText/40 ${r.label}`} />
            <span className={`h-1.5 rounded-sm bg-navy/55 ${r.value}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniActionList() {
  const actions = [
    { color: 'border-l-amber-500', chip: 'Review', chipTone: 'bg-amber-50 text-amber-700 border-amber-200' },
    { color: 'border-l-blue-500', chip: 'Run', chipTone: 'bg-blue-50 text-blue-700 border-blue-200' },
    { color: 'border-l-emerald-500', chip: 'Done', chipTone: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  ];
  return (
    <div className="flex flex-col gap-1">
      {actions.map((a, i) => (
        <div
          key={i}
          className={`rounded border border-border border-l-[3px] ${a.color} bg-white px-2 py-1.5 flex items-center gap-2`}
        >
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <div className="h-1.5 rounded-sm bg-navy/60 w-10/12" />
            <div className="h-1 rounded-sm bg-mutedText/35 w-7/12" />
          </div>
          <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded border ${a.chipTone}`}>
            {a.chip}
          </span>
        </div>
      ))}
    </div>
  );
}

function ReplyBody({ variant }: { variant: number }) {
  const v = REPLY_VARIANTS[variant % REPLY_VARIANTS.length];
  return (
    <div className="flex-1 min-w-0 rounded-md rounded-bl-sm bg-white border border-border px-2.5 py-2 flex flex-col gap-2">
      {/* One-line intro for every reply */}
      <div className="flex flex-col gap-1">
        <div className="h-1.5 rounded-sm bg-navy/55 w-10/12" />
        <div className="h-1.5 rounded-sm bg-navy/40 w-6/12" />
      </div>

      {v.kind === 'rich' && (
        <>
          <div className="rounded border border-border/60 bg-offWhite/40 px-2 pt-1.5 pb-1.5">
            <p className="text-[8px] text-mutedText uppercase tracking-wider mb-1">Chart</p>
            <MiniBarChart />
          </div>
          <MiniTable />
        </>
      )}

      {v.kind === 'pie' && (
        <div className="rounded border border-border/60 bg-offWhite/40 px-2 py-2">
          <p className="text-[8px] text-mutedText uppercase tracking-wider mb-1.5">Breakdown</p>
          <MiniPie />
        </div>
      )}

      {v.kind === 'record' && <MiniRecord />}

      {v.kind === 'actions' && <MiniActionList />}

      {v.chips.length > 0 && (
        <div className="flex gap-1 pt-0.5">
          {v.chips.map((c) => (
            <span
              key={c.label}
              className={`text-[8px] px-1.5 py-0.5 rounded border font-semibold ${
                c.tone === 'primary'
                  ? 'border-blue-200 bg-blue-50 text-blue-700'
                  : 'border-border bg-white text-mutedText'
              }`}
            >
              {c.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function OttoView() {
  const [entries, setEntries] = useState<ChatEntry[]>([]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const turnRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];

    const runTurn = () => {
      if (cancelled) return;
      const t = turnRef.current++;
      const userId = `u-${t}`;
      const replyId = `r-${t}`;

      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setEntries((prev) => {
            const next: ChatEntry[] = [
              ...prev,
              { id: userId, kind: 'user', variant: t % USER_VARIANTS.length },
            ];
            return next.slice(-MAX_ENTRIES);
          });
        }, TURN_USER_GAP),
      );

      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setTyping(true);
        }, TURN_USER_GAP + TURN_TYPING_GAP),
      );

      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setTyping(false);
          setEntries((prev) => {
            const next: ChatEntry[] = [
              ...prev,
              { id: replyId, kind: 'reply', variant: t % REPLY_VARIANTS.length },
            ];
            return next.slice(-MAX_ENTRIES);
          });
        }, TURN_USER_GAP + TURN_TYPING_GAP + TURN_REPLY_GAP),
      );

      timers.push(
        window.setTimeout(
          () => runTurn(),
          TURN_USER_GAP + TURN_TYPING_GAP + TURN_REPLY_GAP + 2200,
        ),
      );
    };

    runTurn();

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [entries.length, typing]);

  return (
    <div className="flex-1 min-w-0 overflow-hidden bg-white flex flex-col">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border/50 shrink-0">
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-crimson text-white">
          <OttoI className="h-3 w-3" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold text-navy leading-tight">Otto</p>
          <p className="text-[9px] text-mutedText">· AI analyst</p>
        </div>
        <span className="text-[9px] text-mutedText">live · claude-sonnet</span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 px-3 py-2.5 flex flex-col gap-2 overflow-y-auto"
      >
        <AnimatePresence initial={false}>
          {entries.map((e) =>
            e.kind === 'user' ? (
              <motion.div
                key={e.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex justify-end"
              >
                <div className="max-w-[80%] rounded-md rounded-br-sm bg-crimson text-white px-2 py-1.5 flex flex-col gap-1">
                  {USER_VARIANTS[e.variant].widths.map((w, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-sm ${i === 0 ? 'bg-white/70' : 'bg-white/45'} ${w}`}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={e.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex gap-1.5"
              >
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                  <OttoI className="h-3 w-3" />
                </span>
                <ReplyBody variant={e.variant} />
              </motion.div>
            ),
          )}
          {typing && (
            <motion.div
              key="typing"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-end gap-1.5"
            >
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-50 text-blue-600 shrink-0 mb-0.5">
                <OttoI className="h-3 w-3" />
              </span>
              <TypingDots />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-3 py-2 border-t border-border shrink-0">
        <div
          data-cursor-target="otto-input"
          className="h-6 rounded bg-offWhite border border-border flex items-center px-2 text-[9px] text-mutedText"
        >
          Ask Otto anything…
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * Lens — dashboards (KPI grid + chart)
 * ==========================================================================*/

export function LensView() {
  const flags = usePortalDirectorFlags();
  const range30dActive = !!flags['lens.range-30d'];
  return (
    <div className="flex-1 min-w-0 bg-white flex flex-col overflow-hidden">
      <ModuleHeader eyebrow="Lens" title="Sales Overview" />
      <div className="px-3 pt-2 pb-1 flex items-center justify-between shrink-0">
        <div className="flex gap-1">
          <span className="text-[8px] px-1.5 py-0.5 rounded border border-border text-mutedText">7d</span>
          <span
            data-cursor-target="lens-range-30d"
            className={`text-[8px] px-1.5 py-0.5 rounded border font-semibold transition-colors ${
              range30dActive
                ? 'border-crimson bg-crimson text-white ring-2 ring-crimson/30'
                : 'border-crimson bg-crimsonLight text-crimson'
            }`}
          >
            30d
          </span>
          <span className="text-[8px] px-1.5 py-0.5 rounded border border-border text-mutedText">YTD</span>
        </div>
        <div className="h-1.5 rounded-sm bg-mutedText/30 w-16" />
      </div>
      <div className="grid grid-cols-2 gap-1.5 px-3 pb-2 shrink-0">
        {[
          { color: '#059669', points: '0,14 10,12 20,13 30,10 40,8 50,6 60,5' },
          { color: '#2563eb', points: '0,4 10,5 20,7 30,6 40,8 50,9 60,12' },
          { color: '#d97706', points: '0,8 10,9 20,7 30,8 40,10 50,7 60,5' },
          { color: '#10b981', points: '0,10 10,9 20,7 30,8 40,5 50,4 60,2' },
        ].map((k, i) => (
          <div key={i} className="bg-offWhite border border-border rounded px-2 py-1.5">
            <div className="h-1.5 rounded-sm bg-mutedText/30 w-10 mb-1" />
            <div className="h-2.5 rounded-sm bg-navy/70 w-14 mb-1" />
            <svg viewBox="0 0 60 16" preserveAspectRatio="none" className="w-full h-3">
              <polyline points={k.points} fill="none" stroke={k.color} strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        ))}
      </div>
      <div className="flex-1 px-3 pb-2 min-h-0">
        <motion.div
          key={range30dActive ? 'lens-30d' : 'lens-default'}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="border border-border rounded bg-white h-full p-2 flex flex-col"
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="h-1.5 rounded-sm bg-navy/60 w-20" />
            <div className="flex gap-1.5">
              <span className="flex items-center gap-1 text-[8px] text-mutedText">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> <span className="h-1.5 w-6 bg-mutedText/30 rounded-sm" />
              </span>
              <span className="flex items-center gap-1 text-[8px] text-mutedText">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> <span className="h-1.5 w-6 bg-mutedText/30 rounded-sm" />
              </span>
            </div>
          </div>
          <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="w-full flex-1">
            <defs>
              <linearGradient id="lensAreaA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 0 50 L 20 44 L 40 40 L 60 36 L 80 38 L 100 30 L 120 26 L 140 22 L 160 18 L 180 14 L 200 10 L 200 60 L 0 60 Z" fill="url(#lensAreaA)" />
            <polyline points="0,50 20,44 40,40 60,36 80,38 100,30 120,26 140,22 160,18 180,14 200,10" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="0,55 20,52 40,50 60,48 80,45 100,42 120,40 140,38 160,35 180,33 200,30" fill="none" stroke="#059669" strokeWidth="1.2" strokeDasharray="3 2" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================================================
 * Courier — scheduled deliveries list
 * ==========================================================================*/

export function CourierView() {
  const flags = usePortalDirectorFlags();
  const hoverRow = flags['courier.hover-row'];
  const deliveries = [
    { color: '#7c3aed', sched: 'daily · 6am', line: 'w-11/12', chip: 'w-6' },
    { color: '#2563eb', sched: 'weekly', line: 'w-10/12', chip: 'w-8' },
    { color: '#059669', sched: 'daily · 8am', line: 'w-11/12', chip: 'w-5' },
    { color: '#d97706', sched: 'on trigger', line: 'w-9/12', chip: 'w-7' },
    { color: '#7c3aed', sched: 'monthly', line: 'w-10/12', chip: 'w-6' },
  ];
  return (
    <div className="flex-1 min-w-0 bg-white flex flex-col overflow-hidden">
      <ModuleHeader eyebrow="Courier" title="Scheduled Deliveries" />
      <div className="flex-1 overflow-hidden px-3 py-2">
        <div className="flex flex-col gap-1.5">
          {deliveries.map((d, i) => {
            const hovered = hoverRow === i;
            return (
              <div
                key={i}
                data-cursor-target={`courier-row-${i}`}
                className={`flex items-center gap-2 border rounded px-2 py-1.5 transition-colors ${
                  hovered ? 'border-crimson bg-crimsonLight shadow-sm' : 'border-border bg-white'
                }`}
              >
                <span
                  className="inline-flex items-center justify-center h-5 w-5 rounded-full shrink-0 text-white"
                  style={{ backgroundColor: d.color, opacity: 0.9 }}
                >
                  <CourierI className="h-2.5 w-2.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className={`h-2 rounded-sm bg-navy/65 ${d.line}`} />
                  <div className="h-1.5 rounded-sm bg-mutedText/30 w-6/12 mt-1" />
                </div>
                <span className="text-[8px] text-mutedText whitespace-nowrap">{d.sched}</span>
                <span className={`h-1.5 rounded-sm bg-mutedText/30 ${d.chip}`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * Prism — AI report catalog grid
 * ==========================================================================*/

function PrismClickRipple() {
  return (
    <motion.span
      initial={{ opacity: 0.8, scale: 0.3 }}
      animate={{ opacity: 0, scale: 2.6 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full border-2 border-crimson z-10"
      aria-hidden="true"
    />
  );
}

export function PrismView() {
  const flags = usePortalDirectorFlags();
  const activeModal = flags['prism.modal'];

  // Fire a short click-ripple whenever activeModal transitions to a new card.
  const [rippleKey, setRippleKey] = useState(0);
  const [ripplingIdx, setRipplingIdx] = useState<number | null>(null);
  useEffect(() => {
    if (typeof activeModal !== 'number') return;
    setRipplingIdx(activeModal);
    setRippleKey((k) => k + 1);
    const id = window.setTimeout(() => setRipplingIdx(null), 600);
    return () => window.clearTimeout(id);
  }, [activeModal]);

  const categories = [
    { color: '#059669', border: 'border-emerald-200', chip: 'bg-emerald-50 text-emerald-700' },
    { color: '#2563eb', border: 'border-blue-200', chip: 'bg-blue-50 text-blue-700' },
    { color: '#d97706', border: 'border-amber-200', chip: 'bg-amber-50 text-amber-700' },
    { color: '#7c3aed', border: 'border-violet-200', chip: 'bg-violet-50 text-violet-700' },
    { color: '#0891b2', border: 'border-cyan-200', chip: 'bg-cyan-50 text-cyan-700' },
    { color: '#db2777', border: 'border-pink-200', chip: 'bg-pink-50 text-pink-700' },
    { color: '#059669', border: 'border-emerald-200', chip: 'bg-emerald-50 text-emerald-700' },
    { color: '#2563eb', border: 'border-blue-200', chip: 'bg-blue-50 text-blue-700' },
    { color: '#d97706', border: 'border-amber-200', chip: 'bg-amber-50 text-amber-700' },
    { color: '#7c3aed', border: 'border-violet-200', chip: 'bg-violet-50 text-violet-700' },
    { color: '#0891b2', border: 'border-cyan-200', chip: 'bg-cyan-50 text-cyan-700' },
  ];
  return (
    <div className="flex-1 min-w-0 bg-white flex flex-col overflow-hidden">
      <ModuleHeader eyebrow="Prism" title="Report Catalog" />
      <div className="flex-1 overflow-hidden px-3 py-2">
        <div className="grid grid-cols-4 gap-1.5">
          {categories.map((c, i) => (
            <div
              key={i}
              data-cursor-target={`prism-card-${i}`}
              className={`relative border ${c.border} rounded p-2 bg-white flex flex-col gap-1.5 transition-shadow ${
                activeModal === i ? 'ring-1 ring-crimson/30 shadow-sm' : ''
              }`}
            >
              <AnimatePresence>
                {ripplingIdx === i && <PrismClickRipple key={rippleKey} />}
              </AnimatePresence>
              <div className="flex items-center gap-1.5">
                <span
                  className="inline-flex items-center justify-center h-4 w-4 rounded-sm shrink-0 text-white"
                  style={{ backgroundColor: c.color }}
                >
                  <PrismI className="h-2 w-2" />
                </span>
                <span className={`text-[8px] px-1 py-0.5 rounded font-semibold uppercase tracking-wider ${c.chip}`}>
                  <span className="inline-block h-1 w-6 rounded-sm bg-current opacity-60" />
                </span>
              </div>
              <div className="h-2 rounded-sm bg-navy/65 w-11/12" />
              <div className="h-1.5 rounded-sm bg-mutedText/30 w-9/12" />
              <div className="h-1.5 rounded-sm bg-mutedText/30 w-7/12" />
              <div className="flex items-center justify-between mt-0.5">
                <div className="h-1.5 rounded-sm bg-mutedText/30 w-8" />
                <span className="text-[8px] text-mutedText">~3m</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * Agents — agent list with type badges + run history
 * ==========================================================================*/

type AgentCardData = {
  key: string;
  titleWidths: [string, string];
  type: 'watcher' | 'processor' | 'scheduler';
  category: string;
  schedule: string;
  successRate: number;
  avgDuration: string;
  lastRun: string;
  nextRun: string;
  recentRuns: Array<'success' | 'failed' | 'running'>;
};

const AGENT_TYPE_STYLE: Record<
  AgentCardData['type'],
  { label: string; badge: string; border: string }
> = {
  watcher: {
    label: 'Watcher',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    border: 'border-t-amber-500',
  },
  processor: {
    label: 'Processor',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    border: 'border-t-blue-500',
  },
  scheduler: {
    label: 'Scheduler',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    border: 'border-t-emerald-500',
  },
};

const RUN_COLOR: Record<AgentCardData['recentRuns'][number], string> = {
  success: 'bg-emerald-500',
  failed: 'bg-red-500',
  running: 'bg-blue-500',
};

const mostlySuccess: AgentCardData['recentRuns'] = [
  ...(Array(7).fill('success') as 'success'[]),
  'failed',
  ...(Array(16).fill('success') as 'success'[]),
];
const allSuccess: AgentCardData['recentRuns'] = Array(24).fill('success') as 'success'[];
const withRunning: AgentCardData['recentRuns'] = [
  ...(Array(10).fill('success') as 'success'[]),
  'failed',
  ...(Array(5).fill('success') as 'success'[]),
  'running',
  ...(Array(7).fill('success') as 'success'[]),
];

const SHOWCASE_AGENTS: AgentCardData[] = [
  {
    key: 'oee',
    titleWidths: ['w-11/12', 'w-5/12'],
    type: 'watcher',
    category: 'Production · all lines',
    schedule: 'Continuous · 5-min',
    successRate: 99,
    avgDuration: '1.4s',
    lastRun: '3m ago',
    nextRun: 'continuous',
    recentRuns: mostlySuccess,
  },
  {
    key: 'po',
    titleWidths: ['w-7/12', 'w-10/12'],
    type: 'processor',
    category: 'Sales · SAP B1',
    schedule: 'On receipt',
    successRate: 98,
    avgDuration: '3.1s',
    lastRun: '1m ago',
    nextRun: 'continuous',
    recentRuns: withRunning,
  },
  {
    key: 'weekly',
    titleWidths: ['w-9/12', 'w-4/12'],
    type: 'scheduler',
    category: 'Ops · Leadership',
    schedule: 'Mon 6:00 AM',
    successRate: 100,
    avgDuration: '52s',
    lastRun: '2d ago',
    nextRun: 'in 5d',
    recentRuns: allSuccess,
  },
  {
    key: 'risk',
    titleWidths: ['w-6/12', 'w-11/12'],
    type: 'watcher',
    category: 'Sales · Salesforce',
    schedule: 'Daily 7:30 AM',
    successRate: 100,
    avgDuration: '38s',
    lastRun: '6h ago',
    nextRun: 'in 18h',
    recentRuns: allSuccess,
  },
  {
    key: 'brief',
    titleWidths: ['w-8/12', 'w-6/12'],
    type: 'scheduler',
    category: 'Ops · Locations',
    schedule: 'Daily 6:00 AM',
    successRate: 100,
    avgDuration: '48s',
    lastRun: '2h ago',
    nextRun: 'in 22h',
    recentRuns: allSuccess,
  },
];

function AgentShowcaseCard({
  agent,
  expanded,
}: {
  agent: AgentCardData;
  expanded: boolean;
}) {
  const t = AGENT_TYPE_STYLE[agent.type];
  const successTone =
    agent.successRate >= 95
      ? 'text-emerald-600'
      : agent.successRate >= 80
        ? 'text-amber-600'
        : 'text-red-500';
  return (
    <div
      className={`rounded-md border bg-white border-t-[3px] ${t.border} p-2 flex flex-col gap-1.5 shadow-sm transition-colors ${
        expanded ? 'border-crimson ring-1 ring-crimson/30' : 'border-border'
      }`}
    >
      <div>
        <div className="flex flex-col gap-1">
          <div className={`h-2 rounded-sm bg-navy/75 ${agent.titleWidths[0]}`} />
          <div className={`h-2 rounded-sm bg-navy/60 ${agent.titleWidths[1]}`} />
        </div>
        <div className="flex items-center gap-1 mt-1.5 flex-wrap">
          <span
            className={`inline-flex items-center text-[8px] font-semibold uppercase tracking-wider px-1 py-[1px] rounded border ${t.badge}`}
          >
            {t.label}
          </span>
          <span className="inline-flex items-center text-[8px] font-medium px-1 py-[1px] rounded border border-border text-mutedText truncate max-w-full">
            {agent.category}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 text-[9px] text-mutedText">
        <svg className="h-2.5 w-2.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
        </svg>
        <span className="truncate">{agent.schedule}</span>
      </div>

      <div className="border-t border-border pt-1.5">
        <p className="text-[8px] text-mutedText uppercase tracking-widest mb-1">
          Recent runs
        </p>
        <div className="flex items-end gap-[1.5px] h-3">
          {agent.recentRuns.map((r, i) => (
            <span
              key={i}
              className={`w-[2px] h-full rounded-[0.5px] ${RUN_COLOR[r]} ${
                expanded && r === 'running' ? 'animate-pulse' : ''
              }`}
              style={{ opacity: 0.4 + (i / agent.recentRuns.length) * 0.6 }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1 border-t border-border pt-1.5">
        <div>
          <p className="text-[7px] text-mutedText uppercase tracking-wider">Success</p>
          <p className={`font-mono font-bold text-[10px] mt-0.5 ${successTone}`}>
            {agent.successRate}%
          </p>
        </div>
        <div>
          <p className="text-[7px] text-mutedText uppercase tracking-wider">Avg</p>
          <p className="font-mono font-medium text-[10px] mt-0.5 text-navy">
            {agent.avgDuration}
          </p>
        </div>
        <div>
          <p className="text-[7px] text-mutedText uppercase tracking-wider">Last</p>
          <p className="font-medium text-[10px] mt-0.5 text-navy truncate">{agent.lastRun}</p>
        </div>
        <div>
          <p className="text-[7px] text-mutedText uppercase tracking-wider">Next</p>
          <p className="font-medium text-[10px] mt-0.5 text-navy truncate">{agent.nextRun}</p>
        </div>
      </div>
    </div>
  );
}

export function AgentsView() {
  const flags = usePortalDirectorFlags();
  const expanded = flags['agents.expanded'];
  return (
    <div className="flex-1 min-w-0 bg-white flex flex-col overflow-hidden">
      <ModuleHeader eyebrow="Agents" title="Active Agents" />
      <div className="flex-1 overflow-auto px-3 py-2">
        <div className="grid grid-cols-3 gap-2">
          {SHOWCASE_AGENTS.map((a) => (
            <AgentShowcaseCard
              key={a.key}
              agent={a}
              expanded={expanded === a.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * Actions — mini kanban
 * ==========================================================================*/

export function ActionsView() {
  const flags = usePortalDirectorFlags();
  const approvedTop = !!flags['actions.approved-top'];
  const cols = [
    { key: 'pending', label: 'Pending', dot: 'bg-amber-500', border: 'border-l-amber-500', count: 2 },
    { key: 'queued', label: 'Queued', dot: 'bg-blue-500', border: 'border-l-blue-500', count: 1 },
    { key: 'running', label: 'Running', dot: 'bg-cyan-500', border: 'border-l-cyan-500', count: 1, pulse: true },
    { key: 'done', label: 'Done', dot: 'bg-emerald-500', border: 'border-l-emerald-500', count: 3 },
  ];
  return (
    <div className="flex-1 min-w-0 bg-white flex flex-col overflow-hidden">
      <ModuleHeader eyebrow="Actions" title="Orchestration Board" />
      <div className="flex-1 overflow-hidden px-2 py-2">
        <div className="grid grid-cols-4 gap-1 h-full">
          {cols.map((c) => (
            <div key={c.key} className="flex flex-col gap-1 rounded bg-offWhite/60 border border-border p-1">
              <div className="flex items-center gap-1 px-1 pt-0.5 shrink-0">
                <span className={`h-1.5 w-1.5 rounded-full ${c.dot} ${c.pulse ? 'animate-pulse' : ''}`} />
                <span className="text-[8px] font-bold uppercase tracking-widest text-navy truncate">{c.label}</span>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                {Array.from({ length: c.count }).map((_, i) => {
                  const isTopPending = c.key === 'pending' && i === 0;
                  return (
                    <motion.div
                      key={i}
                      animate={
                        isTopPending && approvedTop
                          ? { x: 140, opacity: 0, scale: 0.92 }
                          : { x: 0, opacity: 1, scale: 1 }
                      }
                      transition={{ duration: 0.7, ease: [0.3, 0.8, 0.3, 1] }}
                      className={`relative bg-white border border-border rounded border-l-2 ${c.border} p-1.5 flex flex-col gap-1`}
                    >
                      <div className="h-1.5 rounded-sm bg-navy/70 w-11/12" />
                      <div className="h-1 rounded-sm bg-mutedText/30 w-8/12" />
                      {isTopPending && (
                        <div
                          data-cursor-target="actions-approve-top"
                          className={`mt-1 self-start text-[7px] px-1 py-0.5 rounded font-bold uppercase tracking-wider border ${
                            approvedTop
                              ? 'border-emerald-500 bg-emerald-500 text-white'
                              : 'border-crimson bg-crimson text-white'
                          }`}
                        >
                          {approvedTop ? 'Approved ✓' : 'Approve'}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
                {c.key === 'done' && approvedTop && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
                    className={`bg-white border border-border rounded border-l-2 ${c.border} p-1.5 flex flex-col gap-1`}
                  >
                    <div className="h-1.5 rounded-sm bg-navy/70 w-11/12" />
                    <div className="h-1 rounded-sm bg-mutedText/30 w-8/12" />
                  </motion.div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

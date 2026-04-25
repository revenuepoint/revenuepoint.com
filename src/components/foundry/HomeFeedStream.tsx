'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from 'framer-motion';
import type { FoundryFeedItem } from '@/data/foundryAgents';

const VISIBLE = 3;
const ROTATE_MS = 3800;
const LAST_CARD_FADE: React.CSSProperties = {
  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
  maskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
};

const TYPE_CONFIG: Record<
  FoundryFeedItem['type'],
  { border: string; iconColor: string; icon: (props: { className?: string }) => JSX.Element }
> = {
  anomaly: {
    border: 'border-l-red-500',
    iconColor: 'text-red-500',
    icon: AlertTriangleIcon,
  },
  agent: {
    border: 'border-l-cyan-500',
    iconColor: 'text-cyan-600',
    icon: CpuIcon,
  },
  report: {
    border: 'border-l-emerald-500',
    iconColor: 'text-emerald-600',
    icon: FileTextIcon,
  },
};

function AlertTriangleIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01" />
    </svg>
  );
}

function CpuIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path strokeLinecap="round" d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </svg>
  );
}

function FileTextIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6M8 13h8M8 17h8M8 9h2" />
    </svg>
  );
}

function Sparkline({
  values,
  color,
  className = 'w-full h-10',
}: {
  values: number[];
  color: string;
  className?: string;
}) {
  const width = 120;
  const height = 40;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1);
  const points = values
    .map((v, i) => `${(i * step).toFixed(2)},${(height - ((v - min) / range) * height).toFixed(2)}`)
    .join(' ');
  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polygon points={areaPoints} fill={color} opacity={0.12} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function KpiGrid({
  kpis,
  sparkline,
  sparkColor,
}: {
  kpis: NonNullable<FoundryFeedItem['kpis']>;
  sparkline?: number[];
  sparkColor?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="bg-cream border border-rule/60 rounded-md px-2 py-1.5"
          >
            <p className="text-[9px] uppercase tracking-wider text-mute">{k.label}</p>
            <p
              className={`text-xs font-mono font-bold mt-0.5 ${
                k.tone === 'good'
                  ? 'text-navy'
                  : k.tone === 'bad'
                    ? 'text-rust'
                    : 'text-navy'
              }`}
            >
              {k.value}
            </p>
          </div>
        ))}
      </div>
      {sparkline && sparkColor && (
        <Sparkline values={sparkline} color={sparkColor} />
      )}
    </div>
  );
}

function FieldList({ fields }: { fields: NonNullable<FoundryFeedItem['fields']> }) {
  return (
    <div className="flex flex-col gap-2">
      {fields.map((f) => (
        <div key={f.label} className="text-xs">
          <p className="text-[9px] uppercase tracking-wider text-mute">{f.label}</p>
          <p className="text-ink mt-0.5 leading-snug">{f.value}</p>
        </div>
      ))}
    </div>
  );
}

function FeedCard({ item }: { item: FoundryFeedItem }) {
  const cfg = TYPE_CONFIG[item.type];
  const Icon = cfg.icon;
  const hasPanel = Boolean(item.kpis || item.fields);

  return (
    <div
      className={`bg-white border border-rule rounded-lg border-l-4 ${cfg.border} overflow-hidden`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="p-4 flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Icon className={`h-3.5 w-3.5 ${cfg.iconColor}`} />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-mute">
                {item.category}
              </span>
              {item.severity && (
                <span
                  className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border ${
                    item.severity === 'critical'
                      ? 'bg-red-50 text-red-600 border-red-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {item.severity.toUpperCase()}
                </span>
              )}
              {item.status && (
                <span
                  className={`text-[9px] font-medium px-1.5 py-0.5 rounded border ${
                    item.status === 'active'
                      ? 'border-red-200 text-red-600'
                      : item.status === 'acknowledged'
                        ? 'border-amber-200 text-amber-700'
                        : 'border-emerald-200 text-emerald-700'
                  }`}
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-mute hidden md:block">
              {item.timestamp}
            </span>
          </div>

          <h3 className="text-sm font-semibold text-navy leading-snug">{item.headline}</h3>
          <p className="text-xs text-ink mt-2 leading-relaxed">{item.body}</p>
          <span className="text-[10px] text-mute mt-3 md:hidden block">
            {item.timestamp}
          </span>
        </div>

        {hasPanel && (
          <div className="border-t md:border-t-0 md:border-l border-rule/60 p-4 md:w-72 flex-shrink-0">
            {item.kpis ? (
              <KpiGrid
                kpis={item.kpis}
                sparkline={item.sparkline}
                sparkColor={item.sparkColor}
              />
            ) : item.fields ? (
              <FieldList fields={item.fields} />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export function HomeFeedStream({ items }: { items: FoundryFeedItem[] }) {
  // Start with slots-1 at the top so the initial render shows items[0..slots-1]
  // in reverse (newest at top). Incrementing topIdx advances the "newest" pointer.
  const [topIdx, setTopIdx] = useState(0);
  // Synchronously reset topIdx when items identity changes (industry switch)
  // so we don't render a stale value followed by an effect-driven re-render.
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setTopIdx(0);
  }
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  // Stable rotation interval — created once, reads latest items via ref.
  useEffect(() => {
    let isVisible = true;
    const el = containerRef.current;

    const io =
      el && typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              const e = entries[0];
              if (!e) return;
              isVisible = e.intersectionRatio >= 0.1;
            },
            { threshold: [0, 0.1, 0.25] },
          )
        : null;
    if (el && io) io.observe(el);

    const id = window.setInterval(() => {
      if (!isVisible) return;
      const len = itemsRef.current.length;
      if (len < 2) return;
      setTopIdx((i) => (i + 1) % len);
    }, ROTATE_MS);

    return () => {
      window.clearInterval(id);
      io?.disconnect();
    };
  }, []);

  const slots = Math.max(1, Math.min(VISIBLE, items.length - 1));
  const len = items.length;

  // topIdx is the "newest" cursor. Visible slots go newest→oldest from top to
  // bottom. Each tick advances topIdx → new card appears at TOP, pushing the
  // others down, oldest exits from the bottom.
  const visible = Array.from({ length: slots }, (_, k) => {
    const idx = len > 0 ? ((topIdx + slots - 1 - k) % len + len) % len : 0;
    return items[idx];
  });

  // Unique key per industry — forces AnimatePresence to remount on industry
  // change, which destroys old children without exit animations. initial={false}
  // then makes the new pool's cards appear at rest with no enter animation.
  const industryKey = items[0]?.id ?? 'empty';

  return (
    <LayoutGroup>
      <div
        ref={containerRef}
        className="relative flex flex-col gap-3 overflow-hidden"
        style={items.length > slots ? LAST_CARD_FADE : undefined}
      >
        <AnimatePresence key={industryKey} initial={false} mode="popLayout">
          {visible.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: -40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: 40,
                scale: 0.94,
                transition: { duration: 0.5, ease: 'easeIn' },
              }}
              transition={{
                layout: { type: 'spring', stiffness: 260, damping: 30 },
                opacity: { duration: 0.45, ease: 'easeOut' },
                y: { type: 'spring', stiffness: 220, damping: 28 },
                scale: { duration: 0.4, ease: 'easeOut' },
              }}
              className="rounded-lg"
            >
              <FeedCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}

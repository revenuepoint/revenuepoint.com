'use client';

import { useIndustry } from '@/context/IndustryContext';
import { lensContentByIndustry, type DashboardKpi } from '@/data/foundryLensContent';

const STATUS_DOT: Record<DashboardKpi['status'], string> = {
  'on-track': 'bg-emerald-500',
  'at-risk': 'bg-amber-500',
  'off-track': 'bg-red-500',
};

const STATUS_STROKE: Record<DashboardKpi['status'], string> = {
  'on-track': '#10b981',
  'at-risk': '#f59e0b',
  'off-track': '#ef4444',
};

function Sparkline({ values, color, width = 160, height = 34 }: { values: number[]; color: string; width?: number; height?: number }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1);
  const points = values.map((v, i) => `${(i * step).toFixed(1)},${(height - ((v - min) / range) * height).toFixed(1)}`).join(' ');
  const area = `0,${height} ${points} ${width},${height}`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-8" aria-hidden="true">
      <polygon points={area} fill={color} opacity={0.12} />
      <polyline points={points} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function KpiCard({ kpi }: { kpi: DashboardKpi }) {
  return (
    <div className="border border-rule rounded-lg bg-white p-4 flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <span className={`h-2 w-2 rounded-full ${STATUS_DOT[kpi.status]}`} />
        <p className="text-[10px] font-semibold uppercase tracking-widest text-mute">{kpi.label}</p>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold font-mono text-navy">{kpi.value}</p>
        <span className={`text-xs font-mono font-medium ${kpi.trendGood ? 'text-emerald-600' : 'text-red-600'}`}>
          {kpi.trendGood ? '▲' : '▼'} {kpi.trend}
        </span>
      </div>
      <Sparkline values={kpi.spark} color={STATUS_STROKE[kpi.status]} />
      <p className="text-[10px] text-mute">Goal: <span className="font-mono text-ink">{kpi.goal}</span></p>
    </div>
  );
}

function LineChart({ series, goalPct }: { series: { name: string; color: string; values: number[] }[]; goalPct: number }) {
  const W = 640;
  const H = 160;
  const padL = 28;
  const padR = 12;
  const padT = 10;
  const padB = 22;
  const allValues = series.flatMap((s) => s.values);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;
  const len = series[0].values.length;
  const step = (W - padL - padR) / (len - 1);
  const goalY = padT + (H - padT - padB) * goalPct;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-40" aria-hidden="true">
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
        const y = padT + (H - padT - padB) * t;
        const label = Math.round((max - range * t) * 100) / 100;
        return (
          <g key={i}>
            <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="#e5e7eb" strokeWidth={0.5} />
            <text x={padL - 6} y={y + 3} fontSize={8} textAnchor="end" fill="#6B8299">{label}</text>
          </g>
        );
      })}
      <line x1={padL} x2={W - padR} y1={goalY} y2={goalY} stroke="#8B0A39" strokeDasharray="3 3" strokeWidth={1} opacity={0.6} />
      <text x={W - padR - 4} y={goalY - 3} fontSize={8} fill="#8B0A39" textAnchor="end">goal</text>
      {series.map((s) => {
        const points = s.values.map((v, i) => `${padL + i * step},${padT + (H - padT - padB) * (1 - (v - min) / range)}`).join(' ');
        return <polyline key={s.name} points={points} fill="none" stroke={s.color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />;
      })}
      {['Day 1', 'Day 8', 'Day 15', 'Day 22', 'Day 30'].map((lbl, i, arr) => {
        const t = i / (arr.length - 1);
        const x = padL + t * (W - padL - padR);
        return <text key={lbl} x={x} y={H - 6} fontSize={8} fill="#6B8299" textAnchor={i === 0 ? 'start' : i === arr.length - 1 ? 'end' : 'middle'}>{lbl}</text>;
      })}
    </svg>
  );
}

function Donut({ slices, centerValue, centerSublabel }: {
  slices: { label: string; value: number; color: string }[];
  centerValue: string;
  centerSublabel: string;
}) {
  const cx = 80, cy = 80, rOuter = 68, rInner = 42;
  let startAngle = -Math.PI / 2;
  const total = slices.reduce((s, x) => s + x.value, 0);
  return (
    <svg viewBox="0 0 160 160" className="h-40 w-40" aria-hidden="true">
      {slices.map((s, i) => {
        const angle = (s.value / total) * Math.PI * 2;
        const endAngle = startAngle + angle;
        const x1 = cx + rOuter * Math.cos(startAngle);
        const y1 = cy + rOuter * Math.sin(startAngle);
        const x2 = cx + rOuter * Math.cos(endAngle);
        const y2 = cy + rOuter * Math.sin(endAngle);
        const ix1 = cx + rInner * Math.cos(endAngle);
        const iy1 = cy + rInner * Math.sin(endAngle);
        const ix2 = cx + rInner * Math.cos(startAngle);
        const iy2 = cy + rInner * Math.sin(startAngle);
        const largeArc = angle > Math.PI ? 1 : 0;
        const d = `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${rInner} ${rInner} 0 ${largeArc} 0 ${ix2} ${iy2} Z`;
        startAngle = endAngle;
        return <path key={i} d={d} fill={s.color} opacity={0.9} />;
      })}
      <text x={cx} y={cy - 2} textAnchor="middle" fontSize="14" fontWeight="700" fill="#0F1A2B">{centerValue}</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="8" fill="#6B8299">{centerSublabel}</text>
    </svg>
  );
}

function HorizontalBars({ bars, max, goal, unit, goalLabel }: {
  bars: { label: string; value: number }[];
  max: number;
  goal: number;
  unit: string;
  goalLabel: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {bars.map((b) => {
        const pct = (b.value / max) * 100;
        const over = b.value > goal;
        return (
          <div key={b.label} className="flex items-center gap-2">
            <span className="text-[10px] text-mute w-20 shrink-0 truncate">{b.label}</span>
            <div className="relative flex-1 h-5 bg-cream rounded-sm overflow-hidden border border-rule">
              <div
                className={`absolute left-0 top-0 bottom-0 ${over ? 'bg-red-400' : 'bg-emerald-500'}`}
                style={{ width: `${pct}%`, opacity: 0.75 }}
              />
              <div
                className="absolute top-0 bottom-0 border-l border-crimson"
                style={{ left: `${(goal / max) * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-navy w-12 text-right">{b.value}{unit}</span>
          </div>
        );
      })}
      <p className="text-[10px] text-mute mt-1">
        <span className="inline-block h-2 w-0.5 bg-crimson mr-1 align-middle" /> {goalLabel}
      </p>
    </div>
  );
}

export function DashboardPreview() {
  const { industryId } = useIndustry();
  const spec = lensContentByIndustry[industryId].dashboard;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-rule">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-mute">{spec.eyebrow}</p>
          <h4 className="text-base font-semibold text-navy">{spec.title}</h4>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] px-2 py-1 rounded border border-rule text-mute">7d</span>
          <span className="text-[10px] px-2 py-1 rounded border border-crimson/40 bg-crimsonTint text-crimson font-semibold">30d</span>
          <span className="text-[10px] px-2 py-1 rounded border border-rule text-mute">YTD</span>
          <span className="ml-2 text-[10px] px-2 py-1 rounded border border-rule bg-white text-ink">Export PDF</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {spec.kpis.map((k) => <KpiCard key={k.label} kpi={k} />)}
      </div>

      <div className="border border-rule rounded-lg bg-white p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-navy">{spec.line.title}</p>
          <div className="flex items-center gap-3 text-[10px]">
            {spec.line.series.map((s) => (
              <span key={s.name} className="flex items-center gap-1 text-mute">
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                {s.name}
              </span>
            ))}
          </div>
        </div>
        <LineChart series={spec.line.series} goalPct={spec.line.goalReferencePct} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="border border-rule rounded-lg bg-white p-4 flex items-center gap-4">
          <Donut slices={spec.donut.slices} centerValue={spec.donut.centerValue} centerSublabel={spec.donut.centerSublabel} />
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <p className="text-xs font-semibold text-navy mb-1">{spec.donut.title}</p>
            {spec.donut.slices.map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-[11px]">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-ink flex-1 truncate">{s.label}</span>
                <span className="font-mono text-mute">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-rule rounded-lg bg-white p-4">
          <p className="text-xs font-semibold text-navy mb-3">{spec.horizontalBars.title}</p>
          <HorizontalBars
            bars={spec.horizontalBars.bars}
            max={spec.horizontalBars.max}
            goal={spec.horizontalBars.goal}
            unit={spec.horizontalBars.unit}
            goalLabel={spec.horizontalBars.goalLabel}
          />
        </div>
      </div>
    </div>
  );
}

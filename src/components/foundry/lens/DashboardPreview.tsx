'use client';

type Kpi = {
  label: string;
  value: string;
  trend: string;
  trendGood: boolean;
  goal: string;
  status: 'on-track' | 'at-risk' | 'off-track';
  spark: number[];
};

const KPIS: Kpi[] = [
  {
    label: 'Scripts This Week',
    value: '2,847',
    trend: '+3.2%',
    trendGood: true,
    goal: '3,000',
    status: 'at-risk',
    spark: [2550, 2620, 2590, 2710, 2680, 2760, 2730, 2790, 2820, 2800, 2830, 2847],
  },
  {
    label: 'Backlog > 48h',
    value: '47',
    trend: '+12',
    trendGood: false,
    goal: '≤ 20',
    status: 'off-track',
    spark: [22, 24, 28, 25, 30, 32, 35, 38, 40, 42, 45, 47],
  },
  {
    label: 'On-Time Fill Rate',
    value: '91.4%',
    trend: '-2.1%',
    trendGood: false,
    goal: '≥ 95%',
    status: 'off-track',
    spark: [95.1, 94.8, 94.3, 94.1, 93.7, 93.2, 92.9, 92.5, 92.1, 91.8, 91.6, 91.4],
  },
];

const STATUS_DOT: Record<Kpi['status'], string> = {
  'on-track': 'bg-emerald-500',
  'at-risk': 'bg-amber-500',
  'off-track': 'bg-red-500',
};

const STATUS_STROKE: Record<Kpi['status'], string> = {
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

function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <div className="border border-border rounded-lg bg-white p-4 flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <span className={`h-2 w-2 rounded-full ${STATUS_DOT[kpi.status]}`} />
        <p className="text-[10px] font-semibold uppercase tracking-widest text-mutedText">{kpi.label}</p>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold font-mono text-navy">{kpi.value}</p>
        <span className={`text-xs font-mono font-medium ${kpi.trendGood ? 'text-emerald-600' : 'text-red-600'}`}>
          {kpi.trendGood ? '▲' : '▼'} {kpi.trend}
        </span>
      </div>
      <Sparkline values={kpi.spark} color={STATUS_STROKE[kpi.status]} />
      <p className="text-[10px] text-mutedText">Goal: <span className="font-mono text-bodyText">{kpi.goal}</span></p>
    </div>
  );
}

// Line chart: Daily Script Volume — 3 series
const SERIES = [
  { name: 'Downtown', color: '#2563eb', values: [108, 112, 105, 118, 120, 115, 122, 128, 125, 130, 135, 138] },
  { name: 'Westside', color: '#059669', values: [92, 95, 98, 96, 100, 102, 99, 104, 108, 106, 110, 112] },
  { name: 'Northgate', color: '#d97706', values: [84, 86, 82, 88, 85, 90, 88, 92, 95, 93, 97, 98] },
];

function LineChart() {
  const W = 640;
  const H = 160;
  const padL = 28;
  const padR = 12;
  const padT = 10;
  const padB = 22;
  const allValues = SERIES.flatMap((s) => s.values);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;
  const len = SERIES[0].values.length;
  const step = (W - padL - padR) / (len - 1);
  const goalY = padT + (H - padT - padB) * 0.18; // visual reference

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-40" aria-hidden="true">
      {/* Y axis grid */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
        const y = padT + (H - padT - padB) * t;
        const label = Math.round(max - range * t);
        return (
          <g key={i}>
            <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="#e5e7eb" strokeWidth={0.5} />
            <text x={padL - 6} y={y + 3} fontSize={8} textAnchor="end" fill="#6B8299">{label}</text>
          </g>
        );
      })}
      {/* Goal reference */}
      <line x1={padL} x2={W - padR} y1={goalY} y2={goalY} stroke="#8B0A39" strokeDasharray="3 3" strokeWidth={1} opacity={0.6} />
      <text x={W - padR - 4} y={goalY - 3} fontSize={8} fill="#8B0A39" textAnchor="end">goal</text>
      {/* Series lines */}
      {SERIES.map((s) => {
        const points = s.values.map((v, i) => `${padL + i * step},${padT + (H - padT - padB) * (1 - (v - min) / range)}`).join(' ');
        return <polyline key={s.name} points={points} fill="none" stroke={s.color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />;
      })}
      {/* X axis labels (sparse) */}
      {['Day 1', 'Day 8', 'Day 15', 'Day 22', 'Day 30'].map((lbl, i, arr) => {
        const t = i / (arr.length - 1);
        const x = padL + t * (W - padL - padR);
        return <text key={lbl} x={x} y={H - 6} fontSize={8} fill="#6B8299" textAnchor={i === 0 ? 'start' : i === arr.length - 1 ? 'end' : 'middle'}>{lbl}</text>;
      })}
    </svg>
  );
}

// Donut: Scripts by Compound Type
const SLICES = [
  { label: 'Hormone', value: 34, color: '#2563eb' },
  { label: 'Pain Mgmt', value: 22, color: '#059669' },
  { label: 'Veterinary', value: 18, color: '#d97706' },
  { label: 'Dermatology', value: 14, color: '#7c3aed' },
  { label: 'Other', value: 12, color: '#64748b' },
];

function Donut() {
  const cx = 80, cy = 80, rOuter = 68, rInner = 42;
  let startAngle = -Math.PI / 2;
  const total = SLICES.reduce((s, x) => s + x.value, 0);
  return (
    <svg viewBox="0 0 160 160" className="h-40 w-40" aria-hidden="true">
      {SLICES.map((s, i) => {
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
      <text x={cx} y={cy - 2} textAnchor="middle" fontSize="14" fontWeight="700" fill="#0F2B4D">2,847</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="8" fill="#6B8299">scripts / week</text>
    </svg>
  );
}

// Horizontal bars: Avg Turnaround by Location
const BARS = [
  { label: 'Downtown', value: 44 },
  { label: 'Westside', value: 38 },
  { label: 'Northgate', value: 61 },
  { label: 'Lakeside', value: 52 },
  { label: 'Eastport', value: 41 },
];

function HorizontalBars() {
  const max = 72;
  const goal = 48;
  return (
    <div className="flex flex-col gap-2">
      {BARS.map((b) => {
        const pct = (b.value / max) * 100;
        const over = b.value > goal;
        return (
          <div key={b.label} className="flex items-center gap-2">
            <span className="text-[10px] text-mutedText w-16 shrink-0">{b.label}</span>
            <div className="relative flex-1 h-5 bg-offWhite rounded-sm overflow-hidden border border-border">
              <div
                className={`absolute left-0 top-0 bottom-0 ${over ? 'bg-red-400' : 'bg-emerald-500'}`}
                style={{ width: `${pct}%`, opacity: 0.75 }}
              />
              <div
                className="absolute top-0 bottom-0 border-l border-crimson"
                style={{ left: `${(goal / max) * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-navy w-10 text-right">{b.value}h</span>
          </div>
        );
      })}
      <p className="text-[10px] text-mutedText mt-1">
        <span className="inline-block h-2 w-0.5 bg-crimson mr-1 align-middle" /> goal 48h
      </p>
    </div>
  );
}

export function DashboardPreview() {
  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-border">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-mutedText">Harborline · Lens</p>
          <h4 className="text-base font-semibold text-navy">Pharmacy Operations · Last 30 Days</h4>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] px-2 py-1 rounded border border-border text-mutedText">7d</span>
          <span className="text-[10px] px-2 py-1 rounded border border-crimson/40 bg-crimsonLight text-crimson font-semibold">30d</span>
          <span className="text-[10px] px-2 py-1 rounded border border-border text-mutedText">YTD</span>
          <span className="ml-2 text-[10px] px-2 py-1 rounded border border-border bg-white text-bodyText">Export PDF</span>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {KPIS.map((k) => <KpiCard key={k.label} kpi={k} />)}
      </div>

      {/* Line chart full width */}
      <div className="border border-border rounded-lg bg-white p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-navy">Daily Script Volume · Last 30 Days</p>
          <div className="flex items-center gap-3 text-[10px]">
            {SERIES.map((s) => (
              <span key={s.name} className="flex items-center gap-1 text-mutedText">
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                {s.name}
              </span>
            ))}
          </div>
        </div>
        <LineChart />
      </div>

      {/* Donut + Horizontal bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="border border-border rounded-lg bg-white p-4 flex items-center gap-4">
          <Donut />
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <p className="text-xs font-semibold text-navy mb-1">Scripts by Compound Type</p>
            {SLICES.map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-[11px]">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-bodyText flex-1 truncate">{s.label}</span>
                <span className="font-mono text-mutedText">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-border rounded-lg bg-white p-4">
          <p className="text-xs font-semibold text-navy mb-3">Avg Turnaround by Location</p>
          <HorizontalBars />
        </div>
      </div>
    </div>
  );
}

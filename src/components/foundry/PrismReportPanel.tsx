'use client';

import { useEffect, useState } from 'react';
import type {
  PrismCategory,
  PrismChart,
  PrismKpi,
  PrismReport,
  StackedBarChart,
  HorizontalBarChart,
  DonutChart,
  GroupedBarChart,
  WaterfallChart,
} from '@/data/foundryPrismReports';

const BODY_FADE_STYLE: React.CSSProperties = {
  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 82%, transparent 100%)',
  maskImage: 'linear-gradient(to bottom, black 0%, black 82%, transparent 100%)',
};

const CATEGORY_STYLE: Record<PrismCategory, string> = {
  Finance: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Sales & CRM': 'bg-blue-50 text-blue-700 border-blue-200',
  Operations: 'bg-amber-50 text-amber-700 border-amber-200',
  'Customer & Service': 'bg-violet-50 text-violet-700 border-violet-200',
  Production: 'bg-orange-50 text-orange-700 border-orange-200',
  'Inventory & Supply Chain': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  Pharmacy: 'bg-pink-50 text-pink-700 border-pink-200',
  Compliance: 'bg-rose-50 text-rose-700 border-rose-200',
  'Revenue Cycle': 'bg-sky-50 text-sky-700 border-sky-200',
  Fundraising: 'bg-lime-50 text-lime-700 border-lime-200',
  Portfolio: 'bg-teal-50 text-teal-700 border-teal-200',
  Advisory: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Project Controls': 'bg-slate-100 text-slate-700 border-slate-300',
};

function SparklesIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l1.9 5.3L19 10l-5.1 1.7L12 17l-1.9-5.3L5 10l5.1-1.7L12 3z" />
      <path d="M19 3v4M5 17v4M19 17v2M5 3v2" />
    </svg>
  );
}

function CheckIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* ---------- Generation progress strip ---------- */

const GEN_STEPS = [
  'Querying your data warehouse',
  'Analyzing patterns and trends',
  'Writing narrative and building charts',
];

function GeneratingStrip({ onComplete }: { onComplete: () => void }) {
  const [stepIdx, setStepIdx] = useState(0);
  useEffect(() => {
    const timers: number[] = [];
    GEN_STEPS.forEach((_, i) => {
      timers.push(window.setTimeout(() => setStepIdx(i + 1), (i + 1) * 420));
    });
    timers.push(window.setTimeout(onComplete, GEN_STEPS.length * 420 + 180));
    return () => {
      for (const t of timers) window.clearTimeout(t);
    };
  }, [onComplete]);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-md w-full bg-white border border-border rounded-lg px-5 py-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-crimsonLight text-crimson">
            <SparklesIcon className="h-3.5 w-3.5" />
          </span>
          <p className="text-xs font-semibold text-navy">Prism is generating your report…</p>
        </div>
        <ul className="flex flex-col gap-2">
          {GEN_STEPS.map((s, i) => {
            const done = i < stepIdx;
            const active = i === stepIdx;
            return (
              <li key={s} className="flex items-center gap-2 text-[12px] leading-snug">
                <span
                  className={`inline-flex items-center justify-center h-4 w-4 rounded-full shrink-0 ${
                    done
                      ? 'bg-emerald-500 text-white'
                      : active
                        ? 'bg-blue-500/15 border border-blue-500 text-blue-600'
                        : 'bg-offWhite border border-border'
                  }`}
                >
                  {done ? (
                    <CheckIcon className="h-2.5 w-2.5" />
                  ) : active ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                  ) : null}
                </span>
                <span className={done ? 'text-mutedText' : active ? 'text-navy font-medium' : 'text-mutedText'}>
                  {s}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ---------- KPI row ---------- */

function KpiRow({ kpis }: { kpis: PrismKpi[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {kpis.map((m) => (
        <div key={m.label} className="bg-offWhite border border-border rounded-md px-3 py-2.5">
          <p className="text-[9px] uppercase tracking-wider text-mutedText">{m.label}</p>
          <p className="text-sm font-bold font-mono text-navy mt-0.5">{m.value}</p>
          {m.change && (
            <p
              className={`text-[10px] font-mono mt-0.5 ${
                m.changeTone === 'good' ? 'text-emerald-600' : m.changeTone === 'bad' ? 'text-red-600' : 'text-mutedText'
              }`}
            >
              {m.change}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------- Charts ---------- */

function StackedBarView({ spec }: { spec: StackedBarChart }) {
  const total = spec.segments.reduce((s, x) => s + x.value, 0);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-7 w-full rounded-md overflow-hidden border border-border">
        {spec.segments.map((seg) => {
          const pct = (seg.value / total) * 100;
          return (
            <div
              key={seg.label}
              className="h-full flex items-center justify-center text-[10px] font-semibold text-white"
              style={{ width: `${pct}%`, backgroundColor: seg.color, opacity: 0.92 }}
              title={`${seg.label}: ${seg.display}`}
            >
              {pct > 10 ? seg.display : ''}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-3 text-[10px] text-mutedText">
        {spec.segments.map((seg) => (
          <span key={seg.label} className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: seg.color }} />
            {seg.label} · <span className="font-mono text-bodyText">{seg.display}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function HorizontalBarView({ spec }: { spec: HorizontalBarChart }) {
  const max = spec.max ?? Math.max(...spec.bars.map((b) => b.value));
  return (
    <div className="flex flex-col gap-2">
      {spec.bars.map((b) => {
        const pct = (b.value / max) * 100;
        return (
          <div key={b.label} className="flex items-center gap-2">
            <span className="text-[11px] text-bodyText w-32 shrink-0 truncate">{b.label}</span>
            <div className="relative flex-1 h-5 bg-offWhite rounded-sm overflow-hidden border border-border">
              <div className="absolute left-0 top-0 bottom-0" style={{ width: `${pct}%`, backgroundColor: b.color, opacity: 0.85 }} />
            </div>
            <span className="text-[11px] font-mono text-navy w-16 text-right">{b.display}</span>
          </div>
        );
      })}
    </div>
  );
}

function GroupedBarView({ spec }: { spec: GroupedBarChart }) {
  const max = spec.max ?? 100;
  const barWidth = 18;
  const gap = 4;
  const groupGap = 28;
  const W =
    spec.groups.length * (spec.series.length * (barWidth + gap) + groupGap) + 40;
  const H = 160;
  const padL = 32;
  const padB = 24;
  const padT = 10;
  const plotH = H - padT - padB;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-40" aria-hidden="true">
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const y = padT + plotH * t;
          return <line key={i} x1={padL} x2={W - 10} y1={y} y2={y} stroke="#e5e7eb" strokeWidth={0.5} />;
        })}
        {spec.groups.map((g, gi) => {
          const groupX = padL + gi * (spec.series.length * (barWidth + gap) + groupGap);
          return (
            <g key={g}>
              {spec.series.map((s, si) => {
                const v = s.values[gi];
                const h = (v / max) * plotH;
                const x = groupX + si * (barWidth + gap);
                const y = padT + plotH - h;
                return <rect key={s.name} x={x} y={y} width={barWidth} height={h} fill={s.color} opacity={0.9} />;
              })}
              <text x={groupX + (spec.series.length * (barWidth + gap)) / 2} y={H - 8} fontSize={9} fill="#6B8299" textAnchor="middle">
                {g}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap gap-3 text-[10px] text-mutedText mt-2">
        {spec.series.map((s) => (
          <span key={s.name} className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: s.color }} />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function DonutView({ spec }: { spec: DonutChart }) {
  const cx = 70, cy = 70, rOuter = 60, rInner = 38;
  let startAngle = -Math.PI / 2;
  const total = spec.slices.reduce((s, x) => s + x.value, 0);
  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 140 140" className="h-36 w-36 shrink-0" aria-hidden="true">
        {spec.slices.map((s, i) => {
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
        <text x={cx} y={cy - 2} textAnchor="middle" fontSize="13" fontWeight="700" fill="#0F2B4D">
          {spec.centerLabel}
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="8" fill="#6B8299">
          {spec.centerSublabel}
        </text>
      </svg>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        {spec.slices.map((s) => (
          <div key={s.label} className="flex items-center gap-2 text-[11px]">
            <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-bodyText flex-1 truncate">{s.label}</span>
            <span className="font-mono text-mutedText">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WaterfallView({ spec }: { spec: WaterfallChart }) {
  const max = Math.max(...spec.steps.map((s) => Math.abs(s.value)));
  const colorFor = (kind: WaterfallChart['steps'][number]['kind']) =>
    kind === 'start'
      ? '#2563eb'
      : kind === 'end'
        ? '#059669'
        : kind === 'add'
          ? '#10b981'
          : '#ef4444';
  return (
    <div className="flex items-end gap-2 h-44">
      {spec.steps.map((s, i) => {
        const pct = (Math.abs(s.value) / max) * 100;
        const positive = s.value >= 0;
        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1 min-w-0">
            <p className={`text-[10px] font-mono ${positive ? 'text-emerald-600' : 'text-red-600'}`}>
              {s.display}
            </p>
            <div className="relative w-full bg-offWhite border border-border rounded-sm overflow-hidden" style={{ height: '80%' }}>
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{ height: `${pct}%`, backgroundColor: colorFor(s.kind), opacity: 0.88 }}
              />
            </div>
            <p className="text-[10px] text-mutedText text-center truncate w-full">{s.label}</p>
          </div>
        );
      })}
    </div>
  );
}

function ChartView({ chart }: { chart: PrismChart }) {
  return (
    <div className="border border-border rounded-md bg-white">
      <div className="px-3 py-2 border-b border-border bg-offWhite">
        <p className="text-[11px] font-semibold text-navy">{chart.title}</p>
      </div>
      <div className="px-3 py-3">
        {chart.kind === 'stacked-bar' && <StackedBarView spec={chart} />}
        {chart.kind === 'horizontal-bar' && <HorizontalBarView spec={chart} />}
        {chart.kind === 'grouped-bar' && <GroupedBarView spec={chart} />}
        {chart.kind === 'donut' && <DonutView spec={chart} />}
        {chart.kind === 'waterfall' && <WaterfallView spec={chart} />}
      </div>
    </div>
  );
}

/* ---------- Panel ---------- */

const IMPACT_STYLE = {
  High: 'bg-red-50 text-red-700 border-red-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export function PrismReportPanel({ report }: { report: PrismReport }) {
  const [generating, setGenerating] = useState(true);

  useEffect(() => {
    setGenerating(true);
  }, [report.id]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start gap-2 pb-4 border-b border-border">
        <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-crimsonLight text-crimson shrink-0 mt-0.5">
          <SparklesIcon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-navy leading-snug">{report.name}</h3>
          <div className="flex items-center gap-1.5 flex-wrap mt-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border bg-emerald-50 text-emerald-700 border-emerald-200">
              Completed
            </span>
            <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${CATEGORY_STYLE[report.category]}`}>
              {report.category}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 py-5 overflow-hidden" style={BODY_FADE_STYLE}>
        {generating ? (
          <GeneratingStrip onComplete={() => setGenerating(false)} />
        ) : (
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">
            {/* Executive Summary */}
            <section>
              <p className="text-[10px] text-mutedText uppercase tracking-widest font-semibold mb-2">
                Executive Summary
              </p>
              <div className="flex flex-col gap-2.5">
                {report.summary.map((p, i) => (
                  <p key={i} className="text-[13px] leading-relaxed text-bodyText">{p}</p>
                ))}
              </div>
            </section>

            {/* KPI Row */}
            <section>
              <p className="text-[10px] text-mutedText uppercase tracking-widest font-semibold mb-2">
                Key Metrics
              </p>
              <KpiRow kpis={report.kpis} />
            </section>

            {/* Chart */}
            <section>
              <ChartView chart={report.chart} />
            </section>

            {/* Findings */}
            <section>
              <p className="text-[10px] text-mutedText uppercase tracking-widest font-semibold mb-2">
                Detailed Findings
              </p>
              <ul className="flex flex-col gap-2.5">
                {report.findings.map((f, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 h-fit shrink-0 rounded border ${IMPACT_STYLE[f.impact]}`}
                    >
                      {f.impact}
                    </span>
                    <p className="text-[12.5px] leading-relaxed text-bodyText">{f.body}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Recommendations */}
            <section className="bg-offWhite border border-border rounded-lg p-4">
              <p className="text-[10px] text-mutedText uppercase tracking-widest font-semibold mb-2">
                Recommended Actions
              </p>
              <ol className="flex flex-col gap-2 text-[12.5px] text-bodyText list-decimal list-inside marker:text-crimson">
                {report.recommendations.map((r, i) => (
                  <li key={i} className="leading-relaxed">{r}</li>
                ))}
              </ol>
            </section>

            {/* Methodology */}
            <section>
              <p className="text-[10px] text-mutedText uppercase tracking-widest font-semibold mb-2">
                Methodology
              </p>
              <p className="text-[12.5px] leading-relaxed text-bodyText">
                {report.methodology}
              </p>
            </section>

            {/* Appendix — runs past the fade line */}
            <section>
              <p className="text-[10px] text-mutedText uppercase tracking-widest font-semibold mb-2">
                {report.appendix.title}
              </p>
              <div className="border border-border rounded-md overflow-hidden">
                <div className="grid grid-cols-[1fr,auto] text-[11px]">
                  <div className="px-3 py-1.5 bg-offWhite text-[9px] uppercase tracking-wider text-mutedText font-semibold">
                    {report.appendix.columns[0]}
                  </div>
                  <div className="px-3 py-1.5 bg-offWhite text-[9px] uppercase tracking-wider text-mutedText font-semibold text-right">
                    {report.appendix.columns[1]}
                  </div>
                  {report.appendix.rows.map((row, i) => (
                    <div key={i} className="contents">
                      <div className="px-3 py-1.5 border-t border-border text-bodyText truncate">
                        {row.label}
                      </div>
                      <div className="px-3 py-1.5 border-t border-border font-mono text-navy text-right whitespace-nowrap">
                        {row.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

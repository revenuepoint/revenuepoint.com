'use client';

import { useIndustry } from '@/context/IndustryContext';
import { lensContentByIndustry, type ReportFinding } from '@/data/foundryLensContent';

const IMPACT_CLASS: Record<ReportFinding['impact'], string> = {
  High: 'bg-red-50 text-red-700 border-red-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

function AgingBar({ buckets }: { buckets: { label: string; value: number; color: string; display: string }[] }) {
  const total = buckets.reduce((s, b) => s + b.value, 0);
  return (
    <div className="mt-3 flex flex-col gap-2">
      <div className="flex h-6 w-full rounded-md overflow-hidden border border-border">
        {buckets.map((b, i) => {
          const pct = (b.value / total) * 100;
          return (
            <div
              key={i}
              className="h-full flex items-center justify-center text-[9px] font-semibold text-white"
              style={{ width: `${pct}%`, backgroundColor: b.color, opacity: 0.9 }}
              title={`${b.label}: ${b.display}`}
            >
              {pct > 10 ? b.display : ''}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-3 text-[10px] text-mutedText">
        {buckets.map((b) => (
          <span key={b.label} className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: b.color }} />
            {b.label} · <span className="font-mono text-bodyText">{b.display}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function ReportPreview() {
  const { industryId } = useIndustry();
  const spec = lensContentByIndustry[industryId].report;

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-navy/[0.03] border border-navy/10 rounded-lg px-5 py-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-mutedText">{spec.category}</p>
            <h4 className="text-base font-semibold text-navy mt-1">{spec.title}</h4>
            <p className="text-[11px] text-mutedText mt-1">{spec.dateLine}</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${
                spec.status === 'Completed'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              {spec.status}
            </span>
          </div>
        </div>
      </div>

      <section>
        <p className="text-[10px] text-mutedText uppercase tracking-widest font-semibold mb-2">
          Executive Summary
        </p>
        {spec.summary.map((p, i) => (
          <p key={i} className={`text-[13px] leading-relaxed text-bodyText ${i > 0 ? 'mt-3' : ''}`}>{p}</p>
        ))}
      </section>

      <section>
        <p className="text-[10px] text-mutedText uppercase tracking-widest font-semibold mb-2">
          {spec.chartTitle}
        </p>
        <AgingBar buckets={spec.aging} />
      </section>

      <section>
        <p className="text-[10px] text-mutedText uppercase tracking-widest font-semibold mb-2">
          Key Findings
        </p>
        <ul className="flex flex-col gap-2.5">
          {spec.findings.map((f, i) => (
            <li key={i} className="flex gap-3">
              <span
                className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 h-fit shrink-0 rounded border ${IMPACT_CLASS[f.impact]}`}
              >
                {f.impact}
              </span>
              <p className="text-[12px] leading-relaxed text-bodyText italic">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-offWhite border border-border rounded-lg p-4">
        <p className="text-[10px] text-mutedText uppercase tracking-widest font-semibold mb-2">
          Recommended Actions
        </p>
        <ol className="flex flex-col gap-2 text-[12px] text-bodyText list-decimal list-inside marker:text-crimson">
          {spec.recommendations.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
      </section>

      <div className="flex items-center justify-between pt-3 border-t border-border text-[10px] text-mutedText">
        <span>{spec.footer}</span>
        <span className="px-3 py-1 rounded border border-border bg-white text-bodyText font-medium">
          Download PDF
        </span>
      </div>
    </div>
  );
}

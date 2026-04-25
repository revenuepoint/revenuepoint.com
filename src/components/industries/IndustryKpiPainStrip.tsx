import type { PainKpi } from '@/types/industry';

export function IndustryKpiPainStrip({ kpis }: { kpis: PainKpi[] }) {
  return (
    <section className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="border border-border rounded-lg bg-offWhite p-5">
              <div className="text-3xl font-bold text-crimson tracking-tight">{k.stat}</div>
              <div className="mt-2 text-sm text-bodyText leading-snug">{k.label}</div>
              {k.source && (
                <div className="mt-3 text-[11px] uppercase tracking-widest text-mutedText">
                  {k.source}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

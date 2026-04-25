import type { PainKpi } from '@/types/industry';

export function IndustryKpiPainStrip({ kpis }: { kpis: PainKpi[] }) {
  return (
    <section className="bg-paper border-y border-rule">
      <div className="max-w-editorial mx-auto px-6 lg:px-8 py-12 lg:py-14">
        <p className="eyebrow mb-8">The pain · in numbers</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {kpis.map((k) => (
            <div key={k.label} className="relative pt-6">
              <span className="absolute left-0 top-0 h-px w-full bg-rule" />
              <span className="absolute left-0 top-0 h-px w-8 bg-navySoft" />
              <p className="font-mono text-[2rem] xl:text-[2.5rem] font-semibold leading-none text-navySoft tabular-nums">
                {k.stat}
              </p>
              <p className="serif-italic text-[1.0625rem] leading-snug text-ink mt-3 max-w-[26ch]">
                {k.label}
              </p>
              {k.source && (
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-mute mt-2">
                  {k.source}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

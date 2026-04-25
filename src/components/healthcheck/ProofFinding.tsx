'use client';

import { useCrm, crmMeta } from '@/context/CrmContext';
import { healthCheckContent } from '@/data/healthCheckContent';
import { sevPillClasses } from './previews/severity';

export function ProofFinding() {
  const { crmId } = useCrm();
  const f = healthCheckContent[crmId].proofFinding;
  return (
    <section className="bg-navy">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-white mb-4">
            One finding, unpacked
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            What a single finding looks like in the appendix.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-300">
            This is the depth we go to on each of the red / yellow findings in your report.
            Evidence. The reproducing query or trace. The named fix. Below is a real pattern we
            see on {crmMeta[crmId].short} orgs — rendered in the same style as the report.
          </p>
        </div>

        <div className="bg-white border border-rule rounded-lg overflow-hidden shadow-sm">
          {/* Header */}
          <div className="px-5 py-4 border-b border-rule flex flex-wrap items-center gap-3">
            <span
              className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded border ${sevPillClasses(
                f.severity
              )}`}
            >
              Critical · Red
            </span>
            <span className="text-xs font-mono text-mute">{f.id}</span>
            <div className="text-sm font-bold text-navy flex-1 min-w-0 truncate">{f.title}</div>
          </div>

          {/* Body grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-rule">
            {/* Left: evidence + diagram */}
            <div className="p-5">
              <div className="text-[10px] uppercase tracking-widest text-mute font-semibold">
                Evidence
              </div>
              <p className="mt-2 text-sm text-ink leading-relaxed">{f.evidence}</p>

              {f.blocks.map((b, i) => {
                if (b.kind !== 'diagram') return null;
                return (
                  <div key={i} className="mt-5">
                    <div className="text-[10px] uppercase tracking-widest text-mute font-semibold mb-2">
                      Trigger chain
                    </div>
                    <div className="space-y-2">
                      {b.rows.map((r, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-2 text-xs"
                        >
                          <div className="shrink-0 rounded border border-rule bg-cream px-2 py-1 font-medium text-navy whitespace-nowrap">
                            {r.from}
                          </div>
                          <div className="text-mute">→</div>
                          <div
                            className={`rounded px-2 py-1 font-semibold whitespace-nowrap ${
                              r.tone === 'red'
                                ? 'bg-rust/10 text-rust border border-rust/30'
                                : r.tone === 'yellow'
                                ? 'bg-amber/10 text-amber border border-amber/30'
                                : 'bg-navy/10 text-navy border border-navy/30'
                            }`}
                          >
                            {r.via}
                          </div>
                          <div className="text-mute">→</div>
                          <div className="shrink-0 rounded border border-rule bg-cream px-2 py-1 font-medium text-navy whitespace-nowrap">
                            {r.to}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: code + recommendation */}
            <div className="p-5">
              {f.blocks.map((b, i) => {
                if (b.kind !== 'code') return null;
                return (
                  <div key={i}>
                    <div className="text-[10px] uppercase tracking-widest text-mute font-semibold mb-2">
                      Reproduce it · {b.language}
                    </div>
                    <pre className="rounded bg-navy text-white text-[11px] font-mono p-3 overflow-x-auto leading-relaxed">
                      {b.lines.join('\n')}
                    </pre>
                  </div>
                );
              })}
              <div className="mt-5">
                <div className="text-[10px] uppercase tracking-widest text-navySoft font-semibold">
                  Recommended fix
                </div>
                <p className="mt-2 text-sm text-ink leading-relaxed">{f.recommendation}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-rule bg-cream text-[10px] uppercase tracking-widest text-mute">
            Findings like this one are attached per finding in the appendix of every Health Check
            report.
          </div>
        </div>
      </div>
    </section>
  );
}

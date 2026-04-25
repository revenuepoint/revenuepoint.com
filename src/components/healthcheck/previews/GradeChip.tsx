'use client';

import { useCrm } from '@/context/CrmContext';
import { healthCheckContent } from '@/data/healthCheckContent';

export function GradeChip() {
  const { crmId } = useCrm();
  const c = healthCheckContent[crmId].execSummary;
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-mute font-semibold">
        Overall org health
      </div>
      <div className="mt-2 flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg bg-navySoft text-white text-3xl font-bold flex items-center justify-center shrink-0">
          {c.grade}
        </div>
        <div className="text-xs text-ink leading-snug">{c.narrative}</div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded border border-rust/30 bg-rust/5 py-2">
          <div className="text-lg font-bold text-rust">{c.counts.high}</div>
          <div className="text-[10px] uppercase tracking-widest text-mute">High</div>
        </div>
        <div className="rounded border border-amber/30 bg-amber/5 py-2">
          <div className="text-lg font-bold text-amber">{c.counts.med}</div>
          <div className="text-[10px] uppercase tracking-widest text-mute">Medium</div>
        </div>
        <div className="rounded border border-navy/30 bg-navy/5 py-2">
          <div className="text-lg font-bold text-navy">{c.counts.low}</div>
          <div className="text-[10px] uppercase tracking-widest text-mute">Low</div>
        </div>
      </div>
    </div>
  );
}

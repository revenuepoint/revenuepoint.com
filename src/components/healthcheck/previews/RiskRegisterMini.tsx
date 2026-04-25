'use client';

import { useCrm } from '@/context/CrmContext';
import { healthCheckContent } from '@/data/healthCheckContent';
import { sevPillClasses } from './severity';

export function RiskRegisterMini() {
  const { crmId } = useCrm();
  const risks = healthCheckContent[crmId].risks;
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-mute font-semibold">
        Risk register · top items
      </div>
      <div className="mt-3 space-y-2">
        {risks.map((r) => (
          <div
            key={r.id}
            className="border border-rule rounded-md p-3 flex items-start gap-3"
          >
            <span
              className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded border ${sevPillClasses(
                r.severity
              )} shrink-0`}
            >
              {r.severity === 'red' ? 'Critical' : r.severity === 'yellow' ? 'Material' : 'Advisory'}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-navy flex items-center gap-2">
                <span className="text-mute font-mono text-[10px]">{r.id}</span>
                <span className="truncate">{r.title}</span>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-mute mt-0.5">
                {r.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

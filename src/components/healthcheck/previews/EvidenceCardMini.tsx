'use client';

import { useCrm } from '@/context/CrmContext';
import { healthCheckContent } from '@/data/healthCheckContent';
import { sevPillClasses } from './severity';

export function EvidenceCardMini() {
  const { crmId } = useCrm();
  const f = healthCheckContent[crmId].proofFinding;
  const code = f.blocks.find((b) => b.kind === 'code');
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-mute font-semibold">
        Appendix · finding detail
      </div>
      <div className="mt-3 border border-rule rounded-md p-3">
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded border ${sevPillClasses(
              f.severity
            )}`}
          >
            Critical
          </span>
          <span className="text-[10px] font-mono text-mute">{f.id}</span>
        </div>
        <div className="mt-2 text-xs font-semibold text-navy leading-snug">{f.title}</div>
        {code && code.kind === 'code' && (
          <div className="mt-3 rounded bg-navy/95 text-white text-[10px] font-mono p-2 overflow-hidden">
            <div className="text-[9px] uppercase tracking-widest text-white/60 mb-1">
              {code.language}
            </div>
            {code.lines.slice(0, 4).map((l, i) => (
              <div key={i} className="whitespace-pre truncate">
                {l}
              </div>
            ))}
            {code.lines.length > 4 && <div className="text-white/60">…</div>}
          </div>
        )}
      </div>
    </div>
  );
}

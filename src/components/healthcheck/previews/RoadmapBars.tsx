'use client';

import { useCrm } from '@/context/CrmContext';
import { healthCheckContent } from '@/data/healthCheckContent';

const toneBg: Record<string, string> = {
  crimson: 'bg-crimson',
  navy: 'bg-navy',
  amber: 'bg-amber',
  green: 'bg-navy',
};

const horizons = [
  { label: '90 days', at: 25 },
  { label: '6 mo', at: 50 },
  { label: '12 mo', at: 75 },
  { label: '18 mo', at: 100 },
];

export function RoadmapBars() {
  const { crmId } = useCrm();
  const ws = healthCheckContent[crmId].roadmap;
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-mute font-semibold">
        Roadmap · workstreams by horizon
      </div>
      <div className="mt-3 relative pt-5">
        {/* horizon markers */}
        <div className="absolute top-0 left-0 right-0 flex justify-between text-[9px] uppercase tracking-widest text-mute font-semibold">
          {horizons.map((h) => (
            <span key={h.label}>{h.label}</span>
          ))}
        </div>
        {/* bars */}
        <div className="space-y-2">
          {ws.map((w) => (
            <div key={w.name} className="text-xs">
              <div className="text-[11px] text-navy font-medium mb-1">{w.name}</div>
              <div className="relative h-2 bg-bone rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 bottom-0 ${toneBg[w.tone] ?? 'bg-navy'} rounded-full`}
                  style={{ left: `${w.spans[0]}%`, right: `${100 - w.spans[1]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

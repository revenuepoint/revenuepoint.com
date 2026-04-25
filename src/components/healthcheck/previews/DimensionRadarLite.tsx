'use client';

import { useCrm } from '@/context/CrmContext';
import { healthCheckContent } from '@/data/healthCheckContent';
import { sevBar } from './severity';

export function DimensionRadarLite() {
  const { crmId } = useCrm();
  const bars = healthCheckContent[crmId].dimensionBars;
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-mute font-semibold">
        Dimension scores (current vs target)
      </div>
      <div className="mt-3 space-y-2.5">
        {bars.map((b) => (
          <div key={b.label} className="text-xs">
            <div className="flex justify-between mb-1">
              <span className="text-navy font-medium">{b.label}</span>
              <span className="text-mute">
                <span className="text-navy font-semibold">{b.current}</span>
                <span className="mx-1">/</span>
                <span>{b.target}</span>
              </span>
            </div>
            <div className="relative h-2 bg-bone rounded-full overflow-hidden">
              {/* target marker */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-navy/40"
                style={{ left: `${(b.target / 5) * 100}%` }}
              />
              {/* current bar */}
              <div
                className={`h-full rounded-full ${sevBar(b.tone)}`}
                style={{ width: `${(b.current / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

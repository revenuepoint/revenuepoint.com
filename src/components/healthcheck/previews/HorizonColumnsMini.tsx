'use client';

import { useCrm } from '@/context/CrmContext';
import { healthCheckContent } from '@/data/healthCheckContent';
import type { HorizonItem } from '@/types/healthCheck';

function Col({
  label,
  sub,
  items,
  tone,
}: {
  label: string;
  sub: string;
  items: HorizonItem[];
  tone: 'crimson' | 'navy' | 'mutedText';
}) {
  const toneText =
    tone === 'crimson' ? 'text-crimson' : tone === 'navy' ? 'text-navy' : 'text-mute';
  return (
    <div className="flex-1 min-w-0">
      <div className={`text-[10px] uppercase tracking-widest font-semibold ${toneText}`}>
        {label}
      </div>
      <div className="text-[10px] text-mute mt-0.5">{sub}</div>
      <ul className="mt-2 space-y-2">
        {items.map((it) => (
          <li key={it.title} className="border border-rule rounded p-2">
            <div className="flex items-start justify-between gap-2">
              <div className="text-[11px] font-semibold text-navy leading-snug">{it.title}</div>
              <span className="text-[9px] font-bold text-crimson bg-crimsonTint rounded px-1.5 py-0.5 shrink-0">
                {it.effort}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HorizonColumnsMini() {
  const { crmId } = useCrm();
  const h = healthCheckContent[crmId].horizons;
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-mute font-semibold">
        Prioritized · Now / Next / Later
      </div>
      <div className="mt-3 flex gap-2">
        <Col label="Now" sub="0–90 days" items={h.now} tone="crimson" />
        <Col label="Next" sub="3–9 mo" items={h.next} tone="navy" />
        <Col label="Later" sub="9–24 mo" items={h.later} tone="mutedText" />
      </div>
    </div>
  );
}

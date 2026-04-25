'use client';

import { useEffect, useRef, useState } from 'react';
import { crmMeta, useCrm, type CrmId } from '@/context/CrmContext';

const order: CrmId[] = ['salesforce', 'hubspot', 'dynamics', 'custom'];

export function CrmTabs() {
  const { crmId, setCrmId } = useCrm();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-75px 0px 0px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" style={{ height: 1 }} />
      <div
        className={`sticky top-[63px] lg:top-[75px] z-30 bg-white/95 backdrop-blur border-y border-border transition-shadow ${
          isStuck ? 'shadow-md' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 py-3 overflow-x-auto">
            <span className="text-[10px] uppercase tracking-widest text-mutedText font-semibold shrink-0">
              Your CRM
            </span>
            <nav className="flex gap-1" aria-label="CRM">
              {order.map((id) => {
                const selected = id === crmId;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setCrmId(id)}
                    aria-current={selected ? 'true' : undefined}
                    className={`shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                      selected
                        ? 'bg-crimson text-white border-crimson shadow-sm'
                        : 'bg-white text-navy border-border hover:border-crimson/40'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${selected ? 'bg-white' : 'bg-crimson'}`}
                      aria-hidden="true"
                    />
                    <span className="whitespace-nowrap">{crmMeta[id].short}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

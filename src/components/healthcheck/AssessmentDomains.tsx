'use client';

import { useCrm, crmMeta } from '@/context/CrmContext';
import { domainNames, healthCheckContent } from '@/data/healthCheckContent';

export function AssessmentDomains() {
  const { crmId } = useCrm();
  const content = healthCheckContent[crmId];
  const map = Object.fromEntries(content.domainBlurbs.map((b) => [b.name, b.blurb]));

  return (
    <section className="bg-paper">
      <div className="max-w-editorial mx-auto px-6 lg:px-8 py-section">
        <div className="max-w-3xl mb-12">
          <p className="eyebrow mb-4">The twelve domains we assess</p>
          <h2 className="text-d1 font-serif font-medium text-ink leading-tight">
            What we look at, <em>in one glance</em>.
          </h2>
          <p className="mt-4 text-lede leading-[1.65] text-inkSoft max-w-prose">
            Every domain below gets a dedicated scorecard page in the report. Descriptions below are keyed to {crmMeta[crmId].short} — they translate cleanly to any CRM.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {domainNames.map((name, i) => (
            <article key={name} className="relative border border-ruleSoft bg-cream p-5">
              <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
              <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-crimson" />
              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif italic text-[1rem] text-ink leading-snug">{name}</h3>
              </div>
              <p className="mt-3 text-xs text-inkSoft leading-relaxed">{map[name]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useCrm, crmMeta } from '@/context/CrmContext';
import { domainNames, healthCheckContent } from '@/data/healthCheckContent';

export function AssessmentDomains() {
  const { crmId } = useCrm();
  const content = healthCheckContent[crmId];
  const map = Object.fromEntries(content.domainBlurbs.map((b) => [b.name, b.blurb]));

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
            The twelve domains we assess
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            What we look at, in one glance.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bodyText">
            Every domain below gets a dedicated scorecard page in the report. Descriptions below
            are keyed to {crmMeta[crmId].short} — they translate cleanly to any CRM.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {domainNames.map((name, i) => (
            <div
              key={name}
              className="border border-border rounded-lg bg-offWhite p-5"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] uppercase tracking-widest text-crimson font-bold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="text-sm font-bold text-navy">{name}</div>
              </div>
              <div className="mt-2 text-xs text-bodyText leading-relaxed">{map[name]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

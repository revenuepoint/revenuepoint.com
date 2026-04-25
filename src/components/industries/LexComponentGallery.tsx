import type { LexComponentSpec } from '@/types/industry';
import { ComponentBody } from './ComponentBody';

export function LexComponentGallery({ components }: { components: LexComponentSpec[] }) {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
            Lightning components
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            Integrations, rendered inside Salesforce.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bodyText">
            Each tile below is a Lightning Web Component we install on the record page. Reps and
            managers see the other systems they depend on — without leaving the account.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {components.map((c) => (
            <div key={c.id} className="border border-border rounded-lg bg-white shadow-sm p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="text-sm font-bold text-navy">{c.title}</div>
                  <div className="text-xs text-bodyText leading-snug mt-1">{c.blurb}</div>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-mutedText shrink-0 whitespace-nowrap">
                  Pulls from: <span className="text-crimson font-semibold">{c.source}</span>
                </div>
              </div>
              <ComponentBody body={c.body} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

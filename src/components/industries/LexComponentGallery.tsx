import type { LexComponentSpec } from '@/types/industry';
import { ComponentBody } from './ComponentBody';

export function LexComponentGallery({ components }: { components: LexComponentSpec[] }) {
  return (
    <section className="bg-paper">
      <div className="max-w-editorial mx-auto px-6 lg:px-8 py-section">
        <div className="max-w-3xl mb-12">
          <p className="eyebrow mb-4">Lightning components</p>
          <h2 className="text-d1 font-serif font-medium text-ink">
            Integrations, <em>rendered inside</em> Salesforce.
          </h2>
          <p className="mt-4 text-lede leading-[1.65] text-inkSoft max-w-prose">
            Each tile below is a Lightning Web Component we install on the record page. Reps and managers see the other systems they depend on — without leaving the account.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {components.map((c) => (
            <article key={c.id} className="border border-ruleSoft bg-cream p-5 lg:p-6 relative">
              <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
              <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-crimson" />
              <div className="flex items-start justify-between gap-3 mt-3 mb-4">
                <div>
                  <h3 className="font-serif text-[1.0625rem] font-medium text-ink">{c.title}</h3>
                  <p className="text-xs text-inkSoft leading-snug mt-1">{c.blurb}</p>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute shrink-0 whitespace-nowrap">
                  Pulls from: <span className="text-crimson">{c.source}</span>
                </p>
              </div>
              <ComponentBody body={c.body} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { UseCase } from '@/types/industry';

export function UseCasesSection({ useCases }: { useCases: UseCase[] }) {
  return (
    <section className="bg-cream border-y border-ruleSoft">
      <div className="max-w-editorial mx-auto px-6 lg:px-8 py-section">
        <div className="max-w-3xl mb-12">
          <p className="eyebrow mb-4">Signature use cases</p>
          <h2 className="text-d1 font-serif font-medium text-ink">
            Three problems we solve in the <em>first quarter</em>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((uc, idx) => (
            <article key={uc.title} className="relative bg-paper border border-ruleSoft p-6 lg:p-7 flex flex-col">
              <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
              <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-crimson" />
              <p className="font-serif italic text-[1.5rem] text-crimson leading-none mt-3">
                {['i', 'ii', 'iii'][idx] ?? idx + 1}
              </p>
              <h3 className="mt-4 font-serif text-[1.25rem] font-medium text-ink leading-tight">
                {uc.title}
              </h3>
              <p className="mt-3 serif-italic text-[1rem] text-inkSoft leading-snug">{uc.pain}</p>
              <div className="mt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute mb-2">
                  How it works
                </p>
                <ol className="space-y-1.5 text-xs text-inkSoft leading-relaxed list-none">
                  {uc.flow.map((step, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-serif italic text-crimson shrink-0">
                        {['α', 'β', 'γ', 'δ', 'ε'][i] ?? i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-5 pt-4 pb-4 border-t border-ruleSoft border-l-2 border-l-navy pl-3 pr-3 -ml-3 -mr-3 bg-navyTint/40">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-navy">Outcome</p>
                <p className="mt-1 serif-italic text-sm text-ink leading-snug">{uc.outcome}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

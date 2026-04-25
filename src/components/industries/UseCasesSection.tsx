import type { UseCase } from '@/types/industry';

export function UseCasesSection({ useCases }: { useCases: UseCase[] }) {
  return (
    <section className="bg-offWhite border-y border-border">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
            Signature use cases
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            Three problems we solve in the first quarter.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {useCases.map((uc) => (
            <div key={uc.title} className="border border-border rounded-lg bg-white p-6 flex flex-col">
              <div className="text-base font-bold text-navy">{uc.title}</div>
              <div className="mt-3 text-sm text-bodyText leading-relaxed">{uc.pain}</div>
              <div className="mt-5">
                <div className="text-[10px] uppercase tracking-widest text-mutedText font-semibold">
                  How it works
                </div>
                <ol className="mt-2 space-y-1.5 text-xs text-bodyText list-decimal pl-4">
                  {uc.flow.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
              <div className="mt-5 pt-4 border-t border-border text-xs">
                <span className="text-[10px] uppercase tracking-widest text-crimson font-semibold">
                  Outcome
                </span>
                <div className="mt-1 font-semibold text-navy">{uc.outcome}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { ProofCard } from '@/types/industry';

export function PainProofCard({ proof }: { proof: ProofCard }) {
  return (
    <section className="bg-ink">
      <div className="max-w-editorial mx-auto px-6 lg:px-8 py-section">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:items-center">
          <div className="text-center lg:text-left">
            <span className="absolute h-px w-8 bg-crimson block mb-4" />
            <p className="font-mono text-[5rem] lg:text-[6rem] font-semibold text-paper leading-none tabular-nums tracking-tight">
              {proof.stat}
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/60">
              {proof.sourceNote}
            </p>
          </div>
          <div className="border-l border-paper/15 lg:pl-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-crimson">
              The problem
            </p>
            <p className="mt-3 font-serif italic text-[1.5rem] text-paper leading-snug max-w-prose">
              {proof.problem}
            </p>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-crimson">
              What we do
            </p>
            <p className="mt-3 text-base text-paper/80 leading-relaxed max-w-prose">{proof.fix}</p>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-crimson">
              Outcome
            </p>
            <p className="mt-3 font-serif text-[1.125rem] text-paper leading-relaxed max-w-prose">
              {proof.outcome}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

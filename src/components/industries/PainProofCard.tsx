import type { ProofCard } from '@/types/industry';

export function PainProofCard({ proof }: { proof: ProofCard }) {
  return (
    <section className="bg-navy">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 items-center">
          <div className="text-center lg:text-left">
            <div className="text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none">
              {proof.stat}
            </div>
            <div className="mt-3 text-xs uppercase tracking-widest text-gray-400">
              {proof.sourceNote}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-crimson font-semibold">
              The problem
            </div>
            <p className="mt-2 text-lg text-white leading-relaxed">{proof.problem}</p>
            <div className="mt-6 text-[10px] uppercase tracking-widest text-crimson font-semibold">
              What we do
            </div>
            <p className="mt-2 text-base text-gray-300 leading-relaxed">{proof.fix}</p>
            <div className="mt-6 text-[10px] uppercase tracking-widest text-crimson font-semibold">
              Outcome
            </div>
            <p className="mt-2 text-base text-white font-semibold leading-relaxed">
              {proof.outcome}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

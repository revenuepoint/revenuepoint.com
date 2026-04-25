type Stat = {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: 'up' | 'down' | 'neutral';
};

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="my-10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 border-t-2 border-ink pt-6">
      {stats.map((s) => (
        <div key={s.label} className="relative">
          <p className="font-mono text-[2rem] font-semibold text-ink tabular-nums leading-none">
            {s.value}
          </p>
          <p className="serif-italic text-base text-ink mt-2 leading-snug">{s.label}</p>
          {s.delta && (
            <p
              className={`font-mono text-[11px] uppercase tracking-[0.14em] mt-2 ${
                s.deltaTone === 'up'
                  ? 'text-navy'
                  : s.deltaTone === 'down'
                    ? 'text-rust'
                    : 'text-mute'
              }`}
            >
              {s.delta}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

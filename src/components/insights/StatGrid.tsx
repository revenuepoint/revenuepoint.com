type Stat = {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: 'up' | 'down' | 'neutral';
};

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="my-8 grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="border border-border bg-offWhite rounded-md px-4 py-3"
        >
          <p className="text-[10px] uppercase tracking-widest text-mutedText">
            {s.label}
          </p>
          <p className="text-xl font-mono font-bold text-navy mt-1">{s.value}</p>
          {s.delta && (
            <p
              className={`text-[11px] font-mono mt-0.5 ${
                s.deltaTone === 'up'
                  ? 'text-emerald-600'
                  : s.deltaTone === 'down'
                    ? 'text-red-600'
                    : 'text-mutedText'
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

type Stat = {
  value: string;
  label: string;
  attribution?: string;
};

type Props = {
  stats: Stat[];
  className?: string;
};

export function StatStrip({ stats, className = '' }: Props) {
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 border-t-2 border-ink pt-8 ${className}`}>
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="font-mono text-[1.75rem] xl:text-[2.5rem] font-semibold leading-none text-navySoft tabular-nums">
            {stat.value}
          </p>
          <p className="serif-italic text-[1.0625rem] leading-snug text-ink mt-3 max-w-[20ch]">
            {stat.label}
          </p>
          {stat.attribution && (
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-mute mt-2">
              {stat.attribution}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

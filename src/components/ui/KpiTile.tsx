type Props = {
  value: string;
  label: string;
  attribution?: string;
  delta?: { value: string; tone?: 'good' | 'warn' | 'bad' | 'neutral' };
  className?: string;
};

const DELTA_CLASS = {
  good: 'text-navy',
  warn: 'text-amber',
  bad: 'text-rust',
  neutral: 'text-mute',
};

/**
 * Editorial KPI tile — mono numeric value, serif italic label, optional
 * mono attribution, top hairline rule with 32px navySoft accent.
 */
export function KpiTile({ value, label, attribution, delta, className = '' }: Props) {
  const tone = delta?.tone ?? 'neutral';
  return (
    <div className={`relative pt-6 ${className}`}>
      <span className="absolute left-0 top-0 h-px w-full bg-rule" />
      <span className="absolute left-0 top-0 h-px w-8 bg-navySoft" />
      <p className="font-mono text-[2rem] xl:text-[2.5rem] font-semibold leading-none text-ink tabular-nums">
        {value}
      </p>
      <p className="serif-italic text-[1.0625rem] leading-snug text-ink mt-3">{label}</p>
      {(attribution || delta) && (
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] mt-2 flex items-center gap-2">
          {delta && <span className={DELTA_CLASS[tone]}>{delta.value}</span>}
          {attribution && <span className="text-mute">{attribution}</span>}
        </p>
      )}
    </div>
  );
}

const tiers = [
  {
    name: 'Fix-It Sprint',
    duration: '90 days · fixed fee',
    outcome: 'Close the top critical findings. Ship, stabilize, hand back.',
  },
  {
    name: 'Managed Services',
    duration: 'Monthly retainer',
    outcome: 'One named administrator keeps the instance clean as the business changes.',
  },
  {
    name: 'Rebuild',
    duration: 'Multi-quarter',
    outcome: 'Rebuild, migrate, or consolidate — scoped from the health check.',
  },
];

export function EngagementTiers() {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-mutedText font-semibold">
        Proposed engagement
      </div>
      <div className="mt-3 space-y-2">
        {tiers.map((t, i) => (
          <div
            key={t.name}
            className={`border rounded-md p-3 ${
              i === 0 ? 'border-crimson bg-crimsonLight' : 'border-border bg-white'
            }`}
          >
            <div className="flex items-baseline justify-between gap-2">
              <div className="text-sm font-bold text-navy">{t.name}</div>
              <div className="text-[10px] uppercase tracking-widest text-mutedText">
                {t.duration}
              </div>
            </div>
            <div className="mt-1 text-xs text-bodyText leading-snug">{t.outcome}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

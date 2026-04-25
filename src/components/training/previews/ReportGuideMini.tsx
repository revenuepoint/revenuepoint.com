const annotations = [
  { label: 'Pipeline by Stage', body: 'Read by sales leaders Mondays. Excludes Closed Lost.' },
  { label: 'Aging Open Opps', body: 'Anything > 45 days in current stage flagged red.' },
  { label: 'Forecast Roll-up', body: 'Pulled from forecast category, not stage. Source of truth for the call.' },
];

export function ReportGuideMini() {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-mutedText font-semibold">
        Saved reports · what each one means
      </div>
      <div className="mt-3 space-y-3">
        {annotations.map((a) => (
          <div key={a.label} className="border-l-2 border-crimson pl-3">
            <div className="text-xs font-semibold text-navy">{a.label}</div>
            <div className="mt-1 text-[11px] text-bodyText leading-relaxed">{a.body}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border text-[10px] uppercase tracking-widest text-mutedText font-semibold">
        Indexed by folder · linked from the Playbook
      </div>
    </div>
  );
}

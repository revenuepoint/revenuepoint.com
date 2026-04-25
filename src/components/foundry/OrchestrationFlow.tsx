const STEPS = [
  { label: 'Detect', copy: 'Agent watches' },
  { label: 'Decide', copy: 'Otto drafts actions' },
  { label: 'Approve', copy: 'Human gates risk' },
  { label: 'Execute', copy: 'Steps run across systems' },
  { label: 'Audit', copy: 'Every change logged' },
];

export function OrchestrationFlow() {
  return (
    <div className="mt-8 flex flex-wrap items-stretch justify-center gap-2">
      {STEPS.map((s, i) => (
        <div key={s.label} className="flex items-stretch gap-2">
          <div className="rounded-md border border-rule bg-white px-3 py-2 min-w-[140px]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-mute">
                0{i + 1}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-navy">
                {s.label}
              </span>
            </div>
            <p className="text-[11px] text-ink mt-0.5">{s.copy}</p>
          </div>
          {i < STEPS.length - 1 && (
            <div className="flex items-center text-mute text-lg font-light select-none" aria-hidden>
              →
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

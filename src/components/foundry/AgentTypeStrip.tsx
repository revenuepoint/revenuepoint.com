const TYPES = [
  {
    label: 'Watcher',
    dot: 'bg-amber-500',
    text: 'text-amber-700',
    bg: 'bg-amber-50',
    ring: 'ring-amber-200',
    copy: 'Monitors systems and fires when conditions breach thresholds.',
  },
  {
    label: 'Processor',
    dot: 'bg-blue-500',
    text: 'text-blue-700',
    bg: 'bg-blue-50',
    ring: 'ring-blue-200',
    copy: 'Reads inbound work, validates it, and creates the right records.',
  },
  {
    label: 'Scheduler',
    dot: 'bg-emerald-500',
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
    ring: 'ring-emerald-200',
    copy: 'Runs on a cadence. Compiles the briefing and delivers it.',
  },
  {
    label: 'Responder',
    dot: 'bg-violet-500',
    text: 'text-violet-700',
    bg: 'bg-violet-50',
    ring: 'ring-violet-200',
    copy: 'Reacts to events in seconds — halts, notifies, escalates.',
  },
];

export function AgentTypeStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
      {TYPES.map((t) => (
        <div
          key={t.label}
          className={`rounded-lg border border-border bg-white px-4 py-4`}
        >
          <div className="flex items-center gap-2">
            <span className={`inline-block h-2 w-2 rounded-full ${t.dot}`} />
            <span className={`text-xs font-bold uppercase tracking-widest ${t.text}`}>
              {t.label}
            </span>
          </div>
          <p className="mt-2 text-sm text-bodyText leading-relaxed">{t.copy}</p>
        </div>
      ))}
    </div>
  );
}

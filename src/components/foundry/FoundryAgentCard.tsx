import type { FoundryAgent } from '@/data/foundryAgents';

const TYPE_STYLES: Record<
  FoundryAgent['type'],
  { label: string; badge: string; border: string }
> = {
  watcher: {
    label: 'Watcher',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    border: 'border-t-amber-500',
  },
  processor: {
    label: 'Processor',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    border: 'border-t-blue-500',
  },
  scheduler: {
    label: 'Scheduler',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    border: 'border-t-emerald-500',
  },
  responder: {
    label: 'Responder',
    badge: 'bg-violet-50 text-violet-700 border-violet-200',
    border: 'border-t-violet-500',
  },
};

const RUN_COLOR = {
  success: 'bg-emerald-500',
  failed: 'bg-red-500',
  running: 'bg-blue-500',
};

function ClockIcon() {
  return (
    <svg
      className="h-3 w-3 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
    </svg>
  );
}

export function FoundryAgentCard({ agent }: { agent: FoundryAgent }) {
  const t = TYPE_STYLES[agent.type];
  const successTone =
    agent.successRate >= 95
      ? 'text-navy'
      : agent.successRate >= 80
        ? 'text-amber'
        : 'text-rust';

  return (
    <div
      className={`rounded-lg border border-rule bg-white border-t-4 ${t.border} p-4 flex flex-col gap-3 shadow-sm`}
    >
      <div>
        <h3 className="font-semibold text-sm text-navy leading-snug">{agent.name}</h3>
        <div className="flex items-center gap-1.5 mt-2">
          <span
            className={`inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded border ${t.badge}`}
          >
            {t.label}
          </span>
          <span className="inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded border border-rule text-mute">
            {agent.category}
          </span>
        </div>
      </div>

      <p className="text-xs text-ink leading-relaxed line-clamp-3">
        {agent.description}
      </p>

      <div className="flex items-center gap-1.5 text-[11px] text-mute">
        <ClockIcon />
        <span>{agent.schedule}</span>
      </div>

      <div className="border-t border-rule pt-3">
        <p className="text-[10px] text-mute uppercase tracking-widest mb-1.5">
          Recent runs
        </p>
        <div className="flex items-end gap-[2px] h-5">
          {agent.recentRuns.map((r, i) => (
            <span
              key={i}
              className={`w-1 h-full rounded-[1px] ${RUN_COLOR[r]}`}
              style={{ opacity: 0.35 + (i / agent.recentRuns.length) * 0.65 }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 border-t border-rule pt-3">
        <div>
          <p className="text-[9px] text-mute uppercase tracking-wider">Success</p>
          <p className={`font-mono font-bold text-sm mt-0.5 ${successTone}`}>
            {agent.successRate}%
          </p>
        </div>
        <div>
          <p className="text-[9px] text-mute uppercase tracking-wider">Avg</p>
          <p className="font-mono font-medium text-sm mt-0.5 text-navy">
            {agent.avgDuration}
          </p>
        </div>
        <div>
          <p className="text-[9px] text-mute uppercase tracking-wider">Last</p>
          <p className="font-medium text-sm mt-0.5 text-navy">{agent.lastRun}</p>
        </div>
        <div>
          <p className="text-[9px] text-mute uppercase tracking-wider">Next</p>
          <p className="font-medium text-sm mt-0.5 text-navy">{agent.nextRun}</p>
        </div>
      </div>
    </div>
  );
}

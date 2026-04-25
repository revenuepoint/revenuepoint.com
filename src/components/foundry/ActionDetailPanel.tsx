'use client';

import type {
  ActionChange,
  ActionDetail,
  ActionStep,
  ActionTimelineEntry,
  ChangeVerb,
  DetailStatus,
} from '@/data/foundryActionDetails';
import { riskStyle, systemChipStyle } from '@/data/foundryActions';

const STATUS_STYLE: Record<DetailStatus, { label: string; className: string }> = {
  pending: {
    label: 'Human Review',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  running: {
    label: 'Running',
    className: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  },
  completed: {
    label: 'Completed',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] text-mute uppercase tracking-widest font-semibold mb-2">
      {children}
    </p>
  );
}

function BotIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 4v4M8 14h.01M16 14h.01M9 18h6" />
    </svg>
  );
}

function CalendarIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 11h18" />
    </svg>
  );
}

function ClockIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function UserCheckIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21a7 7 0 0 1 13-3.6M16 11l2 2 4-4" />
    </svg>
  );
}

function TimerIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="13" r="8" />
      <path d="M9 2h6M12 8v5l3 2" />
    </svg>
  );
}

function ShieldIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
    </svg>
  );
}

function CheckIcon({ className = 'h-2.5 w-2.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

const VERB_LABEL: Record<ChangeVerb, string> = {
  create: 'Create',
  update: 'Update',
  send: 'Send',
  delete: 'Delete',
};

const VERB_STYLE: Record<ChangeVerb, string> = {
  create: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  update: 'bg-blue-50 text-blue-700 border-blue-200',
  send: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  delete: 'bg-red-50 text-red-700 border-red-200',
};

function VerbIcon({ verb, className = 'h-3 w-3' }: { verb: ChangeVerb; className?: string }) {
  if (verb === 'create')
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 7l9-4 9 4-9 4-9-4zM3 12l9 4 9-4M3 17l9 4 9-4" />
      </svg>
    );
  if (verb === 'update')
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 3l4 4-11 11H6v-4L17 3z" />
      </svg>
    );
  if (verb === 'send')
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    );
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    </svg>
  );
}

function StepDot({ status }: { status: ActionStep['status'] }) {
  if (status === 'completed') {
    return (
      <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-emerald-500 text-white">
        <CheckIcon className="h-2 w-2" />
      </span>
    );
  }
  if (status === 'running') {
    return (
      <span className="relative inline-flex h-4 w-4 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-cyan-400/40 animate-ping" />
        <span className="relative h-2.5 w-2.5 rounded-full bg-cyan-500" />
      </span>
    );
  }
  return (
    <span className="inline-block h-4 w-4 rounded-full border-2 border-rule bg-white" />
  );
}

function StepTimeline({ steps }: { steps: ActionStep[] }) {
  return (
    <div className="flex flex-col">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <StepDot status={step.status} />
            {i < steps.length - 1 && (
              <div
                className={`w-0.5 flex-1 min-h-[20px] ${
                  step.status === 'completed' ? 'bg-emerald-500/40' : 'bg-rule'
                }`}
              />
            )}
          </div>
          <div className="pb-3 flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 min-w-0">
                <p
                  className={`text-xs leading-snug ${
                    step.status === 'running' ? 'text-navy font-medium' : 'text-ink'
                  } ${step.status === 'completed' ? 'text-mute' : ''}`}
                >
                  {step.label}
                </p>
                {step.system && (
                  <span
                    className={`text-[9px] font-medium px-1.5 py-0.5 rounded border ${systemChipStyle[step.system]}`}
                  >
                    {step.system}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-mute font-mono">
                {step.status === 'completed' ? step.duration ?? '' : step.status === 'running' ? 'running…' : 'pending'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChangeCard({ change }: { change: ActionChange }) {
  return (
    <div className="border border-rule rounded-lg overflow-hidden bg-white">
      <div className="flex items-center gap-2 px-3 py-2 bg-cream border-b border-rule">
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border ${VERB_STYLE[change.verb]}`}
        >
          <VerbIcon verb={change.verb} className="h-3 w-3" />
          {VERB_LABEL[change.verb]}
        </span>
        <span className="text-xs font-medium text-navy truncate flex-1 min-w-0">
          {change.entity}
        </span>
        <span
          className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${systemChipStyle[change.system]}`}
        >
          {change.system}
        </span>
      </div>
      <div className="px-3 py-2.5 flex flex-col gap-1.5">
        {change.fields.map((f, i) => (
          <div key={i} className="text-[11px] leading-snug">
            <span className="text-[9px] uppercase tracking-wider text-mute">
              {f.label}
            </span>
            <p className="text-ink">{f.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineEntryRow({ entry }: { entry: ActionTimelineEntry }) {
  const Icon =
    entry.kind === 'created'
      ? CalendarIcon
      : entry.kind === 'approved'
        ? UserCheckIcon
        : entry.kind === 'started'
          ? ClockIcon
          : entry.kind === 'completed' || entry.kind === 'duration'
            ? TimerIcon
            : ShieldIcon;
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-3.5 w-3.5 text-mute shrink-0 mt-0.5" />
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-mute">{entry.label}</p>
        <p className="text-xs text-ink">{entry.value}</p>
      </div>
    </div>
  );
}

export function ActionDetailPanel({ action }: { action: ActionDetail }) {
  const status = STATUS_STYLE[action.status];
  const risk = riskStyle[action.risk];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3 pb-5 border-b border-rule">
        <h3 className="text-base font-semibold text-navy leading-snug">{action.name}</h3>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${status.className}`}
          >
            {status.label}
          </span>
          <span
            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${risk.className}`}
          >
            {risk.label} risk
          </span>
          {action.systems.map((s) => (
            <span
              key={s}
              className={`text-[10px] font-medium px-2 py-0.5 rounded border ${systemChipStyle[s]}`}
            >
              {s}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-mute">
          <BotIcon className="h-3 w-3 text-navySoft" />
          <span className="truncate">{action.agent}</span>
          <span>·</span>
          <span>requested {action.requestedAgo}</span>
        </div>
      </div>

      {/* Two-column body */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* LEFT: Summary, Steps, Rationale, Timeline */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <section>
            <SectionLabel>What Will Happen</SectionLabel>
            <div className="bg-navy/[0.03] border border-navy/10 rounded-lg px-4 py-3">
              <p className="text-sm leading-relaxed text-ink">{action.summary}</p>
            </div>
          </section>

          <section>
            <SectionLabel>
              {action.status === 'completed' ? 'Execution Progress' : 'Execution Steps'}
            </SectionLabel>
            <StepTimeline steps={action.steps} />
          </section>

          <section>
            <SectionLabel>Agent Rationale</SectionLabel>
            <div className="bg-cream border border-rule rounded-lg px-4 py-3">
              <p className="text-xs leading-relaxed text-ink italic">
                {action.rationale}
              </p>
            </div>
          </section>
        </div>

        {/* RIGHT: Data Changes only */}
        <div className="lg:col-span-3">
          <SectionLabel>Data Changes</SectionLabel>
          <div className="flex flex-col gap-2.5">
            {action.changes.map((c, i) => (
              <ChangeCard key={i} change={c} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer: Timeline entries inline with Approve / Reject buttons */}
      <div className="pt-5 border-t border-rule">
        <div className="flex items-center flex-wrap gap-x-6 gap-y-3">
          {action.timeline.map((entry, i) => (
            <TimelineEntryRow key={i} entry={entry} />
          ))}
          <div
            className="ml-auto flex items-center gap-2 select-none"
            aria-hidden="true"
          >
            <div className="text-center text-xs font-semibold px-4 py-2 rounded border bg-cream text-mute border-rule">
              Reject
            </div>
            <div className="text-center text-xs font-semibold px-5 py-2 rounded border bg-emerald-50 text-emerald-700 border-emerald-200">
              Approve
            </div>
          </div>
        </div>
        {action.note && (
          <p className="mt-3 text-[11px] text-mute italic">{action.note}</p>
        )}
      </div>
    </div>
  );
}

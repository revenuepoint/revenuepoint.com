'use client';

import { useEffect, useState } from 'react';
import type { Card } from '@/data/foundryActions';
import { riskStyle, systemChipStyle } from '@/data/foundryActions';
import { TIMING, formatAgo, formatElapsed } from '@/components/foundry/useActionsEngine';

function BotIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 4v4M8 14h.01M16 14h.01M9 18h6" />
    </svg>
  );
}

function SpinnerIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ClockIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

const PHASE_BORDER: Record<Card['phase'], string> = {
  pending: 'border-l-amber-500',
  approving: 'border-l-amber-500',
  queued: 'border-l-blue-500',
  running: 'border-l-cyan-500',
  done: 'border-l-emerald-500',
};

/**
 * `useNow` subscribes to a shared render clock so running cards can compute
 * continuous progress between engine ticks.
 */
function useNow(active: boolean, intervalMs = 200) {
  const [now, setNow] = useState<number>(() => 0);
  useEffect(() => {
    if (!active) return;
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(id);
  }, [active, intervalMs]);
  return now;
}

export function ActionCard({ card }: { card: Card }) {
  const risk = riskStyle[card.risk];
  const isApproving = card.phase === 'approving';

  const approveChipClass = isApproving
    ? 'bg-emerald-500 text-white border-emerald-500 scale-[1.02] shadow-sm'
    : 'bg-emerald-50 text-emerald-700 border-emerald-200';

  // Live clock for running + done time readouts
  const now = useNow(card.phase === 'running' || card.phase === 'done');

  let progress = 0;
  let currentStep = 1;
  let elapsedSeconds = 0;
  if (card.phase === 'running' && now > 0) {
    const age = now - card.phaseStartedAt;
    const totalRunMs = card.totalSteps * TIMING.runningStepMs;
    progress = Math.max(0, Math.min(1, age / totalRunMs));
    currentStep = Math.min(card.totalSteps, 1 + Math.floor(age / TIMING.runningStepMs));
    elapsedSeconds = Math.max(0, Math.floor(age / 1000));
  }

  let doneAgoLabel = '';
  if (card.phase === 'done' && now > 0 && card.completedAt != null) {
    const secs = Math.max(0, Math.floor((now - card.completedAt) / 1000));
    doneAgoLabel = formatAgo(secs);
  }

  return (
    <div
      className={`bg-white rounded-md border border-rule border-l-4 ${PHASE_BORDER[card.phase]} p-3 flex flex-col gap-2 shadow-sm transition-[border-color] duration-500`}
    >
      <div className="flex items-start gap-2">
        <h4 className="text-[13px] font-semibold leading-snug text-navy flex-1 min-w-0">
          {card.name}
        </h4>
        <span
          className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border shrink-0 ${risk.className}`}
        >
          {risk.label}
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-mute">
        <BotIcon className="h-3 w-3 text-crimson shrink-0" />
        <span className="truncate">{card.agent}</span>
      </div>

      <div className="flex flex-wrap gap-1">
        {card.systems.map((s) => (
          <span
            key={s}
            className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${systemChipStyle[s]}`}
          >
            {s}
          </span>
        ))}
      </div>

      <p className="text-[11px] leading-relaxed text-ink">{card.summary}</p>

      {(card.phase === 'pending' || card.phase === 'approving') && (
        <div
          className="flex items-center gap-1.5 pt-2 border-t border-rule select-none"
          aria-hidden="true"
        >
          <div
            className={`flex-1 text-center text-[11px] font-semibold py-1.5 rounded border transition-all duration-300 ${approveChipClass}`}
          >
            {isApproving ? 'Approved ✓' : 'Approve'}
          </div>
          <div className="flex-1 text-center text-[11px] font-semibold py-1.5 rounded border bg-cream text-mute border-rule">
            Reject
          </div>
        </div>
      )}

      {card.phase === 'queued' && (
        <div className="flex items-center gap-1.5 pt-2 border-t border-rule text-[10px] text-mute">
          <ClockIcon className="h-3 w-3 text-blue-500 shrink-0" />
          <span>
            Approved by <span className="text-navy font-medium">{card.approver ?? '—'}</span> · just now
          </span>
        </div>
      )}

      {card.phase === 'running' && (
        <div className="flex flex-col gap-1.5 pt-2 border-t border-rule">
          <div className="flex items-center gap-1.5">
            <SpinnerIcon className="h-3 w-3 text-cyan-600" />
            <span className="text-[10px] text-mute">
              Step{' '}
              <span className="font-mono font-semibold text-navy">
                {currentStep} of {card.totalSteps}
              </span>{' '}
              · <span className="font-mono">{formatElapsed(elapsedSeconds)}</span> elapsed
            </span>
          </div>
          <div className="h-1 w-full bg-bone rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-500"
              style={{
                width: `${progress * 100}%`,
                transition: 'width 220ms linear',
              }}
            />
          </div>
        </div>
      )}

      {card.phase === 'done' && (
        <div className="flex items-center gap-1.5 pt-2 border-t border-rule text-[10px] text-mute">
          <CheckIcon className="h-3 w-3 text-emerald-600 shrink-0" />
          <span>
            <span className="font-mono text-navy">{card.duration ?? '—'}</span>
            {doneAgoLabel ? ` · ${doneAgoLabel}` : ''}
          </span>
        </div>
      )}
    </div>
  );
}

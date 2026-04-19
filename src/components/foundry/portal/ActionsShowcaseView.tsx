'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ModuleHeader } from './ModuleViews';

/* ============================================================================
 * Script — phased loop, total 14s
 * ==========================================================================*/

type Phase =
  | 'idle'
  | 'card-click'
  | 'opening'
  | 'reading'
  | 'approve-click'
  | 'approving'
  | 'closing'
  | 'queued'
  | 'running'
  | 'done'
  | 'resetting';

const SCRIPT: Array<{ phase: Phase; at: number }> = [
  { phase: 'idle', at: 0 },
  { phase: 'card-click', at: 500 },
  { phase: 'opening', at: 750 },
  { phase: 'reading', at: 1300 },
  { phase: 'approve-click', at: 3400 },
  { phase: 'approving', at: 3700 },
  { phase: 'closing', at: 4400 },
  { phase: 'queued', at: 4900 },
  { phase: 'running', at: 5900 },
  { phase: 'done', at: 9100 },
  { phase: 'resetting', at: 11500 },
];
const LOOP_MS = 12500;
const RUNNING_MS = 3200; // 5900 → 9100

function phaseAt(elapsed: number): Phase {
  let current: Phase = 'idle';
  for (const s of SCRIPT) {
    if (elapsed >= s.at) current = s.phase;
    else break;
  }
  return current;
}

/* ============================================================================
 * Featured actions — 3 in rotation
 * ==========================================================================*/

type SysChip = { label: string; tone: string };

type Featured = {
  id: string;
  titleWidths: [string, string]; // skeleton widths for 2-line headline
  agent: string;
  systems: SysChip[];
  totalSteps: number;
  stepLabels: string[]; // skeleton widths
  approver: string;
  duration: string;
};

const SYS = {
  pioneer: { label: 'PioneerRx', tone: 'bg-violet-50 text-violet-700 border-violet-200' },
  sap: { label: 'SAP', tone: 'bg-blue-50 text-blue-700 border-blue-200' },
  salesforce: { label: 'Salesforce', tone: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  sendgrid: { label: 'SendGrid', tone: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  courier: { label: 'Courier', tone: 'bg-amber-50 text-amber-700 border-amber-200' },
} as const;

const FEATURED: Featured[] = [
  {
    id: 'rx',
    titleWidths: ['w-11/12', 'w-7/12'],
    agent: 'Prescription Intake Processor',
    systems: [SYS.pioneer],
    totalSteps: 3,
    stepLabels: ['w-10/12', 'w-11/12', 'w-9/12'],
    approver: 'Sarah Kim',
    duration: '2.1s',
  },
  {
    id: 'po',
    titleWidths: ['w-10/12', 'w-6/12'],
    agent: 'Inbound Order Processor',
    systems: [SYS.sap, SYS.salesforce],
    totalSteps: 4,
    stepLabels: ['w-11/12', 'w-10/12', 'w-9/12', 'w-8/12'],
    approver: 'Michael Torres',
    duration: '3.4s',
  },
  {
    id: 'oos',
    titleWidths: ['w-11/12', 'w-8/12'],
    agent: 'Out-of-Stock Responder',
    systems: [SYS.sap, SYS.sendgrid],
    totalSteps: 4,
    stepLabels: ['w-10/12', 'w-11/12', 'w-9/12', 'w-10/12'],
    approver: 'Priya Patel',
    duration: '4.2s',
  },
];

/* ============================================================================
 * Icons
 * ==========================================================================*/

function BotI({ className = 'h-2.5 w-2.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 4v4M8 14h.01M16 14h.01M9 18h6" />
    </svg>
  );
}

function SpinnerI({ className = 'h-2.5 w-2.5' }: { className?: string }) {
  return (
    <svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function CheckI({ className = 'h-2.5 w-2.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ClockI({ className = 'h-2.5 w-2.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/* ============================================================================
 * Skeleton card — shared shape; phase changes accents + footer
 * ==========================================================================*/

type CardPhase = 'pending' | 'approving' | 'queued' | 'running' | 'done';

const BORDER: Record<CardPhase, string> = {
  pending: 'border-l-amber-500',
  approving: 'border-l-amber-500',
  queued: 'border-l-blue-500',
  running: 'border-l-cyan-500',
  done: 'border-l-emerald-500',
};

function RiskChip({ risk }: { risk: 'high' | 'medium' | 'low' }) {
  const cls =
    risk === 'high'
      ? 'bg-red-50 text-red-700 border-red-200'
      : risk === 'medium'
        ? 'bg-amber-50 text-amber-700 border-amber-200'
        : 'bg-emerald-50 text-emerald-700 border-emerald-200';
  return (
    <span className={`text-[8px] font-semibold uppercase tracking-wider px-1 py-0.5 rounded border ${cls}`}>
      {risk}
    </span>
  );
}

function SystemChip({ chip }: { chip: SysChip }) {
  return (
    <span className={`text-[8px] font-medium px-1 py-0.5 rounded border ${chip.tone}`}>
      {chip.label}
    </span>
  );
}

function FeaturedCard({
  action,
  phase,
  runningProgress = 0,
  runningStep = 1,
}: {
  action: Featured;
  phase: CardPhase;
  runningProgress?: number;
  runningStep?: number;
}) {
  return (
    <div
      className={`bg-white rounded border border-border border-l-4 ${BORDER[phase]} p-2 flex flex-col gap-1.5 shadow-sm`}
    >
      <div className="flex items-start gap-1.5">
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <div className={`h-2 rounded-sm bg-navy/75 ${action.titleWidths[0]}`} />
          <div className={`h-2 rounded-sm bg-navy/60 ${action.titleWidths[1]}`} />
        </div>
        <RiskChip risk="high" />
      </div>

      <div className="flex items-center gap-1 text-[9px] text-mutedText">
        <BotI className="h-2.5 w-2.5 text-crimson shrink-0" />
        <span className="h-1.5 rounded-sm bg-mutedText/30 w-20" />
      </div>

      <div className="flex flex-wrap gap-1">
        {action.systems.map((s) => (
          <SystemChip key={s.label} chip={s} />
        ))}
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="h-1.5 rounded-sm bg-mutedText/30 w-11/12" />
        <div className="h-1.5 rounded-sm bg-mutedText/30 w-9/12" />
      </div>

      {(phase === 'pending' || phase === 'approving') && (
        <div className="flex items-center gap-1 pt-1.5 border-t border-border">
          <div
            className={`flex-1 text-center text-[9px] font-bold py-1 rounded border transition-all duration-300 ${
              phase === 'approving'
                ? 'bg-emerald-500 text-white border-emerald-500'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}
          >
            {phase === 'approving' ? 'Approved ✓' : 'Approve'}
          </div>
          <div className="flex-1 text-center text-[9px] font-bold py-1 rounded border bg-offWhite text-mutedText border-border">
            Reject
          </div>
        </div>
      )}

      {phase === 'queued' && (
        <div className="flex items-center gap-1 pt-1.5 border-t border-border text-[9px] text-mutedText">
          <ClockI className="h-2.5 w-2.5 text-blue-500 shrink-0" />
          <span className="truncate">
            Approved by <span className="text-navy font-medium">{action.approver}</span> · just now
          </span>
        </div>
      )}

      {phase === 'running' && (
        <div className="flex flex-col gap-1 pt-1.5 border-t border-border">
          <div className="flex items-center gap-1 text-[9px] text-mutedText">
            <SpinnerI className="h-2.5 w-2.5 text-cyan-600" />
            <span>
              Step <span className="font-mono font-semibold text-navy">{runningStep} of {action.totalSteps}</span>
            </span>
          </div>
          <div className="h-1 w-full bg-lightGray rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-500"
              style={{
                width: `${runningProgress * 100}%`,
                transition: 'width 200ms linear',
              }}
            />
          </div>
        </div>
      )}

      {phase === 'done' && (
        <div className="flex items-center gap-1 pt-1.5 border-t border-border text-[9px] text-mutedText">
          <CheckI className="h-2.5 w-2.5 text-emerald-600 shrink-0" />
          <span>
            <span className="font-mono text-navy">{action.duration}</span> · just now
          </span>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
 * Background skeleton card — static context in each column
 * ==========================================================================*/

function BgCard({ phase, widthIdx }: { phase: CardPhase; widthIdx: number }) {
  const widths = ['w-10/12', 'w-11/12', 'w-8/12', 'w-9/12'];
  const w1 = widths[widthIdx % widths.length];
  const w2 = widths[(widthIdx + 1) % widths.length];
  return (
    <div
      className={`bg-white rounded border border-border border-l-4 ${BORDER[phase]} p-2 flex flex-col gap-1.5 opacity-70`}
    >
      <div className="flex items-start gap-1.5">
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <div className={`h-2 rounded-sm bg-navy/60 ${w1}`} />
          <div className={`h-2 rounded-sm bg-navy/50 ${w2}`} />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <BotI className="h-2 w-2 text-mutedText shrink-0" />
        <span className="h-1.5 rounded-sm bg-mutedText/25 w-16" />
      </div>
      <div className="flex gap-1">
        <span className="h-2 w-8 rounded-sm bg-mutedText/25" />
        <span className="h-2 w-10 rounded-sm bg-mutedText/25" />
      </div>
    </div>
  );
}

/* ============================================================================
 * Detail modal — cartoon ActionDetailPanel layout
 * ==========================================================================*/

function DetailModal({
  action,
  phase,
  approveClickActive,
}: {
  action: Featured;
  phase: Phase;
  approveClickActive: boolean;
}) {
  const approving = phase === 'approving';
  return (
    <motion.div
      key="modal"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ opacity: { duration: 0.25 }, scale: { duration: 0.3 } }}
      className="pointer-events-auto w-[88%] max-w-[620px] max-h-[88%] rounded-lg bg-white shadow-2xl border border-border flex flex-col"
      aria-hidden="true"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className={`h-2.5 rounded-sm bg-navy/80 ${action.titleWidths[0]}`} />
          <div className={`h-2.5 rounded-sm bg-navy/70 ${action.titleWidths[1]}`} />
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border bg-amber-50 text-amber-700 border-amber-200">
            Human Review
          </span>
          <RiskChip risk="high" />
          {action.systems.map((s) => (
            <SystemChip key={s.label} chip={s} />
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-mutedText">
          <BotI className="h-2.5 w-2.5 text-crimson" />
          <span className="h-1.5 rounded-sm bg-mutedText/30 w-28" />
          <span>·</span>
          <span>requested 6m ago</span>
        </div>
      </div>

      {/* Body: 2 columns */}
      <div className="flex-1 overflow-hidden grid grid-cols-5 gap-3 p-3 min-h-0">
        {/* LEFT: summary + steps + rationale */}
        <div className="col-span-2 flex flex-col gap-3 min-h-0 overflow-hidden">
          <section>
            <p className="text-[8px] uppercase tracking-widest text-mutedText font-semibold mb-1">
              What Will Happen
            </p>
            <div className="bg-navy/[0.03] border border-navy/10 rounded px-2.5 py-1.5 flex flex-col gap-1">
              <div className="h-1.5 rounded-sm bg-navy/55 w-11/12" />
              <div className="h-1.5 rounded-sm bg-navy/45 w-10/12" />
              <div className="h-1.5 rounded-sm bg-navy/40 w-7/12" />
            </div>
          </section>

          <section>
            <p className="text-[8px] uppercase tracking-widest text-mutedText font-semibold mb-1.5">
              Execution Steps
            </p>
            <div className="flex flex-col">
              {action.stepLabels.map((w, i) => (
                <div key={i} className="flex gap-2">
                  <div className="flex flex-col items-center">
                    <span className="inline-block h-3 w-3 rounded-full border-2 border-border bg-white shrink-0" />
                    {i < action.stepLabels.length - 1 && (
                      <div className="w-0.5 flex-1 min-h-[12px] bg-border" />
                    )}
                  </div>
                  <div className="pb-1.5 flex-1 min-w-0 flex items-center gap-1">
                    <div className={`h-1.5 rounded-sm bg-navy/60 ${w}`} />
                    <SystemChip chip={action.systems[i % action.systems.length]} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="text-[8px] uppercase tracking-widest text-mutedText font-semibold mb-1">
              Agent Rationale
            </p>
            <div className="bg-offWhite border border-border rounded px-2.5 py-1.5 flex flex-col gap-1">
              <div className="h-1.5 rounded-sm bg-mutedText/50 w-11/12" />
              <div className="h-1.5 rounded-sm bg-mutedText/45 w-10/12" />
              <div className="h-1.5 rounded-sm bg-mutedText/40 w-8/12" />
            </div>
          </section>
        </div>

        {/* RIGHT: data changes */}
        <div className="col-span-3 flex flex-col gap-2 min-h-0 overflow-hidden">
          <p className="text-[8px] uppercase tracking-widest text-mutedText font-semibold">
            Data Changes
          </p>
          <div className="flex flex-col gap-2 overflow-hidden">
            {[0, 1].map((ci) => (
              <div key={ci} className="border border-border rounded overflow-hidden bg-white">
                <div className="flex items-center gap-1.5 px-2 py-1.5 bg-offWhite border-b border-border">
                  <span
                    className={`text-[8px] font-semibold uppercase tracking-wider px-1 py-0.5 rounded border ${
                      ci === 0
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {ci === 0 ? 'Update' : 'Create'}
                  </span>
                  <span className="h-1.5 rounded-sm bg-navy/60 w-24 flex-1 max-w-[160px]" />
                  <SystemChip chip={action.systems[ci % action.systems.length]} />
                </div>
                <div className="px-2 py-1.5 flex flex-col gap-1">
                  {[0, 1, 2].map((fi) => (
                    <div key={fi} className="flex flex-col gap-0.5">
                      <span className="h-1 rounded-sm bg-mutedText/40 w-10" />
                      <span className={`h-1.5 rounded-sm bg-bodyText/50 ${['w-10/12','w-8/12','w-9/12'][fi]}`} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer: reject / approve */}
      <div className="px-4 py-2.5 border-t border-border flex items-center justify-end gap-2">
        <div className="text-center text-[10px] font-semibold px-3 py-1.5 rounded border bg-offWhite text-mutedText border-border">
          Reject
        </div>
        <div
          className={`relative text-center text-[10px] font-bold px-4 py-1.5 rounded border transition-all duration-300 ${
            approving
              ? 'bg-emerald-500 text-white border-emerald-500 scale-105 shadow-sm'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}
        >
          {approving ? 'Approved ✓' : 'Approve'}
          <ClickRipple active={approveClickActive} />
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================================
 * Kanban board
 * ==========================================================================*/

type Col = { key: CardPhase; label: string; dot: string; bg: number[] };

const COLS: Col[] = [
  { key: 'pending', label: 'Human Review', dot: 'bg-amber-500', bg: [0, 1] },
  { key: 'queued', label: 'Queued', dot: 'bg-blue-500', bg: [2] },
  { key: 'running', label: 'Running', dot: 'bg-cyan-500', bg: [3] },
  { key: 'done', label: 'Done', dot: 'bg-emerald-500', bg: [0, 1, 2] },
];

function phaseToCardPhase(phase: Phase): CardPhase | null {
  switch (phase) {
    case 'idle':
    case 'card-click':
    case 'resetting':
    case 'closing':
      return 'pending';
    case 'queued':
      return 'queued';
    case 'running':
      return 'running';
    case 'done':
      return 'done';
    default:
      return null; // opening / reading / approve-click / approving → card lives in modal
  }
}

/* ============================================================================
 * Click ripple — red expanding circle, mirrors PortalCursor's click ring
 * ==========================================================================*/

function ClickRipple({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.span
          key="ripple"
          initial={{ opacity: 0.8, scale: 0.3 }}
          animate={{ opacity: 0, scale: 2.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full border-2 border-crimson z-10"
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}

/* ============================================================================
 * Main view
 * ==========================================================================*/

export function ActionsShowcaseView() {
  const [actionIdx, setActionIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [runningProgress, setRunningProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    let lastLoop = 0;
    const id = window.setInterval(() => {
      const total = Date.now() - start;
      const loopN = Math.floor(total / LOOP_MS);
      const elapsed = total % LOOP_MS;
      if (loopN !== lastLoop) {
        lastLoop = loopN;
        setActionIdx((i) => (i + 1) % FEATURED.length);
      }
      const p = phaseAt(elapsed);
      setPhase((prev) => (prev === p ? prev : p));
      // Progress during running
      if (p === 'running') {
        const prog = Math.max(0, Math.min(1, (elapsed - 5900) / RUNNING_MS));
        setRunningProgress(prog);
      } else if (p === 'done' || p === 'resetting') {
        setRunningProgress(1);
      } else {
        setRunningProgress(0);
      }
    }, 120);

    return () => window.clearInterval(id);
  }, []);

  const action = FEATURED[actionIdx];
  const cardCol = phaseToCardPhase(phase);
  const modalOpen =
    phase === 'opening' ||
    phase === 'reading' ||
    phase === 'approve-click' ||
    phase === 'approving' ||
    phase === 'closing';
  const resetting = phase === 'resetting';
  const runningStep = Math.min(
    action.totalSteps,
    1 + Math.floor(runningProgress * action.totalSteps),
  );
  // Pending card visual reflects approving flash during the 'closing' return
  const pendingPhase: CardPhase = phase === 'closing' ? 'approving' : 'pending';
  const cardClickActive = phase === 'card-click';
  const approveClickActive = phase === 'approve-click';

  return (
    <div className="relative flex-1 min-w-0 h-full bg-white flex flex-col overflow-hidden">
      <LayoutGroup>
        <ModuleHeader eyebrow="Actions" title="Orchestration Board" />

        <div className="flex-1 min-h-0 overflow-hidden p-3">
          <div className="grid grid-cols-4 gap-2 h-full">
            {COLS.map((col) => (
              <div
                key={col.key}
                className="flex flex-col gap-1.5 rounded-md bg-offWhite/60 border border-border p-1.5 min-h-0"
              >
                <div className="flex items-center gap-1.5 px-0.5 shrink-0">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${col.dot} ${col.key === 'running' ? 'animate-pulse' : ''}`}
                  />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-navy truncate">
                    {col.label}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                  {/* Featured card — layoutId + LayoutGroup + per-column AnimatePresence morphs it across columns and into the modal */}
                  <AnimatePresence mode="popLayout">
                    {cardCol === col.key && !modalOpen && !resetting && (
                      <motion.div
                        key={`featured-${action.id}`}
                        layoutId={`action-featured-${action.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        transition={{
                          layout: { type: 'spring', stiffness: 260, damping: 30 },
                          opacity: { duration: 0.25 },
                        }}
                        className="relative"
                      >
                        <FeaturedCard
                          action={action}
                          phase={col.key === 'pending' ? pendingPhase : col.key}
                          runningProgress={runningProgress}
                          runningStep={runningStep}
                        />
                        {col.key === 'pending' && (
                          <ClickRipple active={cardClickActive} />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Background static cards */}
                  {col.bg.map((bi) => (
                    <BgCard key={`bg-${col.key}-${bi}`} phase={col.key} widthIdx={bi} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Backdrop — covers full view */}
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 z-30 bg-navy/35 backdrop-blur-[1px]"
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        {/* Modal — flex-centered inside an absolute wrapper so framer-motion's scale transform doesn't clobber centering */}
        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center p-4">
          <AnimatePresence>
            {modalOpen && (
              <DetailModal
                key={`modal-${action.id}`}
                action={action}
                phase={phase}
                approveClickActive={approveClickActive}
              />
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import {
  type ActionCardData,
  type Card,
  MAX_DONE_VISIBLE,
  MAX_PENDING,
  actionPool,
} from '@/data/foundryActions';

export const TIMING = {
  approveFlashMs: 1200,
  queuedDwellMs: 2500,
  runningStepMs: 1800,
  runningTailMs: 500,
  spawnIntervalMs: 3500,
  tickMs: 250,
};

const APPROVERS = ['Sarah Kim', 'Michael Torres', 'Priya Patel', 'James Chen', 'Dana Rivera'];
let approverIdx = 0;
function nextApprover(): string {
  const a = APPROVERS[approverIdx % APPROVERS.length];
  approverIdx += 1;
  return a;
}

let instanceCounter = 0;
function instantiate(base: ActionCardData): Pick<Card, 'id' | 'name' | 'agent' | 'risk' | 'systems' | 'summary' | 'totalSteps' | 'autoApproved' | 'instanceId'> {
  instanceCounter += 1;
  return { ...base, instanceId: `${base.id}-${instanceCounter}` };
}

// Monotonic ordering keys. Separate counters for pending-entry and done-entry
// so each column has an unambiguous, strictly-increasing sort key.
let pendingSeqCounter = 0;
let doneSeqCounter = 0;
function nextPendingSeq(): number {
  pendingSeqCounter += 1;
  return pendingSeqCounter;
}
function nextDoneSeq(): number {
  doneSeqCounter += 1;
  return doneSeqCounter;
}

function formatDuration(ms: number) {
  const s = Math.max(1, Math.round(ms / 1000));
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
}

type State = {
  cards: Card[];
  poolCursor: number;
  lastSpawnAt: number;
};

function pickGated(cursor: number): [ActionCardData, number] {
  let c = cursor;
  while (actionPool[c % actionPool.length].autoApproved) c++;
  return [actionPool[c % actionPool.length], (c + 1) % actionPool.length];
}

function pickAny(cursor: number): [ActionCardData, number] {
  return [actionPool[cursor % actionPool.length], (cursor + 1) % actionPool.length];
}

function initialState(): State {
  let cursor = 0;
  const pending: Card[] = [];
  for (let i = 0; i < 3; i++) {
    const [base, next] = pickGated(cursor);
    cursor = next;
    // i=0 is first-pushed = oldest. Sort is ASC → smallest pendingSeq at TOP.
    // Counter increments as we push, so i=0 gets the smallest seq (= oldest).
    const offset = -(2 - i) * 400;
    pending.push({
      ...instantiate(base),
      phase: 'pending',
      phaseStartedAt: offset, // rebased on mount
      createdAt: offset,
      pendingSeq: nextPendingSeq(),
      doneSeq: 0,
    });
  }

  const done: Card[] = [];
  const durations = ['2.1s', '850ms', '48s', '3.2s'];
  // Assign doneSeq in REVERSE order so i=0 (newest, "1 min ago") has the
  // LARGEST seq → appears at top when sorted DESC. i=3 (oldest, "4 min ago")
  // gets the smallest seq → appears at bottom.
  const doneSeqs: number[] = [];
  for (let i = 0; i < 4; i++) doneSeqs.unshift(nextDoneSeq()); // [lowest ... highest] mapped to i=3..i=0
  for (let i = 0; i < 4; i++) {
    const [base, next] = pickAny(cursor);
    cursor = next;
    const completedOffset = -((i + 1) * 60_000);
    done.push({
      ...instantiate(base),
      phase: 'done',
      phaseStartedAt: 0,
      createdAt: completedOffset,
      completedAt: completedOffset, // faked "Xm ago" feel, rebased on mount
      duration: durations[i] ?? '2s',
      pendingSeq: 0,
      doneSeq: doneSeqs[i],
    });
  }

  return { cards: [...pending, ...done], poolCursor: cursor, lastSpawnAt: 0 };
}

function tick(state: State, now: number): State {
  // A. Advance phases by age
  let cards = state.cards.map((c): Card => {
    const age = now - c.phaseStartedAt;
    if (c.phase === 'approving' && age >= TIMING.approveFlashMs) {
      return { ...c, phase: 'queued', phaseStartedAt: now, approver: nextApprover() };
    }
    if (c.phase === 'queued' && age >= TIMING.queuedDwellMs) {
      return { ...c, phase: 'running', phaseStartedAt: now };
    }
    if (c.phase === 'running') {
      const totalRunMs = c.totalSteps * TIMING.runningStepMs + TIMING.runningTailMs;
      if (age >= totalRunMs) {
        return {
          ...c,
          phase: 'done',
          phaseStartedAt: now,
          completedAt: now,
          duration: formatDuration(c.totalSteps * TIMING.runningStepMs),
          doneSeq: nextDoneSeq(), // monotonic — newest gets largest seq → TOP of Done
        };
      }
    }
    return c;
  });

  // B. Promote oldest pending → approving if downstream pipeline has room (<2)
  const downstream = cards.filter(
    (c) => c.phase === 'approving' || c.phase === 'queued' || c.phase === 'running'
  ).length;
  if (downstream < 2) {
    const pendings = cards.filter((c) => c.phase === 'pending');
    if (pendings.length > 0) {
      const oldest = pendings.reduce((a, b) =>
        a.pendingSeq <= b.pendingSeq ? a : b
      );
      cards = cards.map((c) =>
        c.instanceId === oldest.instanceId
          ? { ...c, phase: 'approving', phaseStartedAt: now }
          : c
      );
    }
  }

  // C. Cap Done at MAX_DONE_VISIBLE, drop oldest by doneSeq
  const doneCards = cards.filter((c) => c.phase === 'done');
  if (doneCards.length > MAX_DONE_VISIBLE) {
    const sorted = [...doneCards].sort((a, b) => b.doneSeq - a.doneSeq);
    const keepIds = new Set(sorted.slice(0, MAX_DONE_VISIBLE).map((c) => c.instanceId));
    cards = cards.filter((c) => c.phase !== 'done' || keepIds.has(c.instanceId));
  }

  // D. Spawn a new Pending card if interval elapsed and capacity allows
  let lastSpawnAt = state.lastSpawnAt;
  let poolCursor = state.poolCursor;
  const pendingCount = cards.filter((c) => c.phase === 'pending').length;
  if (now - lastSpawnAt >= TIMING.spawnIntervalMs && pendingCount < MAX_PENDING) {
    const [candidate, next] = pickAny(poolCursor);
    poolCursor = next;
    const fresh: Card = {
      ...instantiate(candidate),
      phase: 'pending',
      phaseStartedAt: now,
      createdAt: now,
      pendingSeq: nextPendingSeq(), // monotonic — newest gets largest seq → BOTTOM of Human Review
      doneSeq: 0,
    };
    cards = [...cards, fresh]; // push to end for clarity; sort is authoritative
    lastSpawnAt = now;
  }

  return { cards, poolCursor, lastSpawnAt };
}

export type ActionsEngineReturn = {
  cards: Card[];
};

export function useActionsEngine(): ActionsEngineReturn {
  const [state, setState] = useState<State>(() => initialState());

  // Rebase timestamps on mount so timing is relative to client clock (SSR-safe).
  useEffect(() => {
    const now = Date.now();
    setState((prev) => ({
      ...prev,
      lastSpawnAt: now,
      cards: prev.cards.map((c) => {
        if (c.phase === 'pending') {
          // createdAt already carries the stagger (negative offsets from 0). Rebase relative to `now`.
          const offset = c.createdAt; // negative
          return { ...c, phaseStartedAt: now + offset, createdAt: now + offset };
        }
        if (c.phase === 'done') {
          // Preserve the faked "Xm ago" offset by rebasing around `now`
          const offset = c.completedAt ?? 0; // was negative
          return { ...c, phaseStartedAt: now + offset, createdAt: now + offset, completedAt: now + offset };
        }
        return c;
      }),
    }));
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setState((prev) => tick(prev, Date.now()));
    }, TIMING.tickMs);
    return () => window.clearInterval(id);
  }, []);

  return { cards: state.cards };
}

export function formatElapsed(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function formatAgo(seconds: number) {
  if (seconds < 60) return `${Math.max(0, seconds)}s ago`;
  const m = Math.floor(seconds / 60);
  return `${m}m ago`;
}

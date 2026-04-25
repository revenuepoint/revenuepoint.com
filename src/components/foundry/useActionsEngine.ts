'use client';

import { useEffect, useRef, useState } from 'react';
import {
  type ActionCardData,
  type Card,
  MAX_DONE_VISIBLE,
  MAX_PENDING,
  actionPool as legacyActionPool,
  actionPoolByIndustry,
} from '@/data/foundryActions';
import { useIndustry } from '@/context/IndustryContext';

export const TIMING = {
  approveFlashMs: 1200,
  queuedDwellMs: 2500,
  runningStepMs: 1800,
  runningTailMs: 500,
  spawnIntervalMs: 3500,
  tickMs: 250,
};

const APPROVERS = ['Sarah Kim', 'Michael Torres', 'Priya Patel', 'James Chen', 'Dana Rivera'];

function formatDuration(ms: number) {
  const s = Math.max(1, Math.round(ms / 1000));
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
}

type Counters = {
  instance: number;
  pendingSeq: number;
  doneSeq: number;
  approverIdx: number;
};

type State = {
  cards: Card[];
  poolCursor: number;
  lastSpawnAt: number;
};

function makeCounters(): Counters {
  return { instance: 0, pendingSeq: 0, doneSeq: 0, approverIdx: 0 };
}

function instantiate(
  base: ActionCardData,
  counters: Counters,
): Pick<Card, 'id' | 'name' | 'agent' | 'risk' | 'systems' | 'summary' | 'totalSteps' | 'autoApproved' | 'instanceId'> {
  counters.instance += 1;
  return { ...base, instanceId: `${base.id}-${counters.instance}` };
}

function pickGated(pool: ActionCardData[], cursor: number): [ActionCardData, number] {
  let c = cursor;
  let safety = 0;
  while (pool[c % pool.length].autoApproved) {
    c++;
    safety++;
    if (safety > pool.length) break; // no gated cards — fall back to whatever is at cursor
  }
  return [pool[c % pool.length], (c + 1) % pool.length];
}

function pickAny(pool: ActionCardData[], cursor: number): [ActionCardData, number] {
  return [pool[cursor % pool.length], (cursor + 1) % pool.length];
}

function initialState(pool: ActionCardData[], counters: Counters): State {
  let cursor = 0;
  const pending: Card[] = [];
  for (let i = 0; i < 3; i++) {
    const [base, next] = pickGated(pool, cursor);
    cursor = next;
    const offset = -(2 - i) * 400;
    counters.pendingSeq += 1;
    pending.push({
      ...instantiate(base, counters),
      phase: 'pending',
      phaseStartedAt: offset, // rebased on mount
      createdAt: offset,
      pendingSeq: counters.pendingSeq,
      doneSeq: 0,
    });
  }

  const done: Card[] = [];
  const durations = ['2.1s', '850ms', '48s', '3.2s'];
  const doneSeqs: number[] = [];
  for (let i = 0; i < 4; i++) {
    counters.doneSeq += 1;
    doneSeqs.unshift(counters.doneSeq);
  }
  for (let i = 0; i < 4; i++) {
    const [base, next] = pickAny(pool, cursor);
    cursor = next;
    const completedOffset = -((i + 1) * 60_000);
    done.push({
      ...instantiate(base, counters),
      phase: 'done',
      phaseStartedAt: 0,
      createdAt: completedOffset,
      completedAt: completedOffset,
      duration: durations[i] ?? '2s',
      pendingSeq: 0,
      doneSeq: doneSeqs[i],
    });
  }

  return { cards: [...pending, ...done], poolCursor: cursor, lastSpawnAt: 0 };
}

function tick(
  state: State,
  pool: ActionCardData[],
  counters: Counters,
  now: number,
): State {
  // A. Advance phases by age
  let cards = state.cards.map((c): Card => {
    const age = now - c.phaseStartedAt;
    if (c.phase === 'approving' && age >= TIMING.approveFlashMs) {
      const approver = APPROVERS[counters.approverIdx % APPROVERS.length];
      counters.approverIdx += 1;
      return { ...c, phase: 'queued', phaseStartedAt: now, approver };
    }
    if (c.phase === 'queued' && age >= TIMING.queuedDwellMs) {
      return { ...c, phase: 'running', phaseStartedAt: now };
    }
    if (c.phase === 'running') {
      const totalRunMs = c.totalSteps * TIMING.runningStepMs + TIMING.runningTailMs;
      if (age >= totalRunMs) {
        counters.doneSeq += 1;
        return {
          ...c,
          phase: 'done',
          phaseStartedAt: now,
          completedAt: now,
          duration: formatDuration(c.totalSteps * TIMING.runningStepMs),
          doneSeq: counters.doneSeq,
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
    const [candidate, next] = pickAny(pool, poolCursor);
    poolCursor = next;
    counters.pendingSeq += 1;
    const fresh: Card = {
      ...instantiate(candidate, counters),
      phase: 'pending',
      phaseStartedAt: now,
      createdAt: now,
      pendingSeq: counters.pendingSeq,
      doneSeq: 0,
    };
    cards = [...cards, fresh];
    lastSpawnAt = now;
  }

  return { cards, poolCursor, lastSpawnAt };
}

export type ActionsEngineReturn = {
  cards: Card[];
};

export function useActionsEngine(): ActionsEngineReturn {
  const { industryId } = useIndustry();
  const pool = actionPoolByIndustry[industryId] ?? legacyActionPool;
  const countersRef = useRef<Counters>(makeCounters());

  const [state, setState] = useState<State>(() => initialState(pool, countersRef.current));

  // Re-seed on industry change — fresh counters, fresh cards, no cross-contamination.
  useEffect(() => {
    const freshCounters = makeCounters();
    countersRef.current = freshCounters;
    const now = Date.now();
    const seeded = initialState(pool, freshCounters);
    setState({
      ...seeded,
      lastSpawnAt: now,
      cards: seeded.cards.map((c) => {
        if (c.phase === 'pending') {
          const offset = c.createdAt; // negative
          return { ...c, phaseStartedAt: now + offset, createdAt: now + offset };
        }
        if (c.phase === 'done') {
          const offset = c.completedAt ?? 0;
          return { ...c, phaseStartedAt: now + offset, createdAt: now + offset, completedAt: now + offset };
        }
        return c;
      }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [industryId]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setState((prev) => tick(prev, pool, countersRef.current, Date.now()));
    }, TIMING.tickMs);
    return () => window.clearInterval(id);
    // Pool is closed over in the tick callback; because we reset state on industryId change,
    // the interval always runs against the current pool consistent with current state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [industryId]);

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

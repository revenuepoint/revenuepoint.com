'use client';

import { createContext, useContext, useEffect, useRef, useState, type RefObject } from 'react';
import { useMotionValue, type MotionValue } from 'framer-motion';

/* ============================================================================
 * Types
 * ==========================================================================*/

export type ModuleId =
  | 'home'
  | 'otto'
  | 'lens'
  | 'courier'
  | 'prism'
  | 'agents'
  | 'actions'
  | 'radar'
  | 'blueprint';

export type CursorBeatKind = 'move' | 'click' | 'hover' | 'type';

export type CursorBeat = {
  at: number; // ms, step-relative
  target: string; // data-cursor-target value
  kind: CursorBeatKind;
};

export type FlagValue = boolean | string | number;

export type FlagEvent = {
  at: number;
  set: string;
  value: FlagValue;
  clearAt?: number;
};

export type DirectorStep = {
  tab: ModuleId;
  duration: number;
  cursor: CursorBeat[];
  flags?: FlagEvent[];
};

export type CursorState = {
  visible: boolean;
  clickKey: number;
};

export type DirectorState = {
  activeModule: ModuleId;
  cursor: CursorState;
  flags: Record<string, FlagValue>;
  stepIndex: number;
  reducedMotion: boolean;
};

export type DirectorResult = DirectorState & {
  xMV: MotionValue<number>;
  yMV: MotionValue<number>;
};

/* ============================================================================
 * Script — 9-step auto-loop, total ~55s
 * ==========================================================================*/

export const SCRIPT: DirectorStep[] = [
  // 1. Home — 5s
  {
    tab: 'home',
    duration: 5000,
    cursor: [
      { at: 200, target: 'sidebar-home', kind: 'move' },
      { at: 1200, target: 'home-feed', kind: 'move' },
    ],
  },
  // 2. Otto — 8s
  {
    tab: 'otto',
    duration: 8000,
    cursor: [
      { at: 100, target: 'sidebar-otto', kind: 'move' },
      { at: 500, target: 'sidebar-otto', kind: 'click' },
      { at: 1400, target: 'otto-input', kind: 'move' },
      { at: 1900, target: 'otto-input', kind: 'type' },
    ],
  },
  // 3. Lens — 6s
  {
    tab: 'lens',
    duration: 6000,
    cursor: [
      { at: 100, target: 'sidebar-lens', kind: 'move' },
      { at: 500, target: 'sidebar-lens', kind: 'click' },
      { at: 1800, target: 'lens-range-30d', kind: 'move' },
      { at: 2300, target: 'lens-range-30d', kind: 'click' },
    ],
    flags: [{ at: 2350, set: 'lens.range-30d', value: true }],
  },
  // 4. Courier — 5s
  {
    tab: 'courier',
    duration: 5000,
    cursor: [
      { at: 100, target: 'sidebar-courier', kind: 'move' },
      { at: 500, target: 'sidebar-courier', kind: 'click' },
      { at: 1600, target: 'courier-row-2', kind: 'hover' },
    ],
    flags: [{ at: 1700, set: 'courier.hover-row', value: 2, clearAt: 4200 }],
  },
  // 5. Prism — 8.5s · clicks 3 cards in sequence, each opens+closes a modal
  {
    tab: 'prism',
    duration: 8500,
    cursor: [
      { at: 100, target: 'sidebar-prism', kind: 'move' },
      { at: 500, target: 'sidebar-prism', kind: 'click' },
      { at: 1100, target: 'prism-card-0', kind: 'move' },
      { at: 1400, target: 'prism-card-0', kind: 'click' },
      { at: 3400, target: 'prism-card-4', kind: 'move' },
      { at: 3700, target: 'prism-card-4', kind: 'click' },
      { at: 5700, target: 'prism-card-8', kind: 'move' },
      { at: 6000, target: 'prism-card-8', kind: 'click' },
    ],
    flags: [
      { at: 1450, set: 'prism.modal', value: 0, clearAt: 3000 },
      { at: 3750, set: 'prism.modal', value: 4, clearAt: 5300 },
      { at: 6050, set: 'prism.modal', value: 8, clearAt: 7700 },
    ],
  },
  // 6. Agents — 5.5s
  {
    tab: 'agents',
    duration: 5500,
    cursor: [
      { at: 100, target: 'sidebar-agents', kind: 'move' },
      { at: 500, target: 'sidebar-agents', kind: 'click' },
      { at: 1500, target: 'agents-row-watcher', kind: 'move' },
      { at: 1900, target: 'agents-row-watcher', kind: 'click' },
    ],
    flags: [{ at: 1950, set: 'agents.expanded', value: 'watcher', clearAt: 5000 }],
  },
  // 7. Actions — 6s
  {
    tab: 'actions',
    duration: 6000,
    cursor: [
      { at: 100, target: 'sidebar-actions', kind: 'move' },
      { at: 500, target: 'sidebar-actions', kind: 'click' },
      { at: 2000, target: 'actions-approve-top', kind: 'move' },
      { at: 2600, target: 'actions-approve-top', kind: 'click' },
    ],
    flags: [{ at: 2650, set: 'actions.approved-top', value: true, clearAt: 5500 }],
  },
  // 8. Radar — 5.5s
  {
    tab: 'radar',
    duration: 5500,
    cursor: [
      { at: 100, target: 'sidebar-radar', kind: 'move' },
      { at: 500, target: 'sidebar-radar', kind: 'click' },
      { at: 1500, target: 'radar-critical-0', kind: 'move' },
      { at: 1900, target: 'radar-critical-0', kind: 'click' },
    ],
    flags: [{ at: 1950, set: 'radar.ack', value: true, clearAt: 5000 }],
  },
  // 9. Blueprint — 6.5s
  {
    tab: 'blueprint',
    duration: 6500,
    cursor: [
      { at: 100, target: 'sidebar-blueprint', kind: 'move' },
      { at: 500, target: 'sidebar-blueprint', kind: 'click' },
      { at: 1500, target: 'node-ingest', kind: 'hover' },
      { at: 3800, target: 'node-actions', kind: 'hover' },
    ],
    flags: [
      { at: 1550, set: 'blueprint.hover-node', value: 'ingest', clearAt: 3700 },
      { at: 3850, set: 'blueprint.hover-node', value: 'actions', clearAt: 5900 },
    ],
  },
];

const TOTAL_DURATION = SCRIPT.reduce((sum, s) => sum + s.duration, 0);

/* ============================================================================
 * Context
 * ==========================================================================*/

type ContextValue = {
  flags: Record<string, FlagValue>;
};

export const PortalDirectorContext = createContext<ContextValue>({ flags: {} });

export function usePortalDirectorFlags() {
  return useContext(PortalDirectorContext).flags;
}

/* ============================================================================
 * Target resolver
 * ==========================================================================*/

function resolveTarget(
  root: HTMLElement | null,
  target: string,
): { x: number; y: number } | null {
  if (!root) return null;
  const el = root.querySelector<HTMLElement>(`[data-cursor-target="${target}"]`);
  if (!el) return null;
  const er = el.getBoundingClientRect();
  const rr = root.getBoundingClientRect();
  return {
    x: er.left - rr.left + er.width / 2,
    y: er.top - rr.top + er.height / 2,
  };
}

/* ============================================================================
 * Director hook
 * ==========================================================================*/

export function usePortalDirector(containerRef: RefObject<HTMLElement>): DirectorResult {
  const [state, setState] = useState<DirectorState>({
    activeModule: SCRIPT[0].tab,
    cursor: { visible: false, clickKey: 0 },
    flags: {},
    stepIndex: 0,
    reducedMotion: false,
  });

  const xMV = useMotionValue(0);
  const yMV = useMotionValue(0);

  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    const mq = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;
    const reducedMotion = !!mq?.matches;
    if (reducedMotion !== stateRef.current.reducedMotion) {
      setState((s) => ({ ...s, reducedMotion }));
    }

    const container = containerRef.current;
    if (!container) return;

    let rafId = 0;
    let startTs = performance.now();
    let pausedAt: number | null = null;
    let firedBeats = new Set<string>();
    let lastStepIndex = -1;
    let isPaused = false;

    let cursorTargetKey: string | null = null;
    let resolvedForKey: string | null = null;
    let needsResolve = false;

    const commitStepStart = (idx: number) => {
      firedBeats = new Set();
      const step = SCRIPT[idx];
      setState((s) => ({ ...s, activeModule: step.tab, stepIndex: idx }));
    };

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);

      if (isPaused) return;

      const elapsed = (now - startTs) % TOTAL_DURATION;

      let stepStart = 0;
      let stepIdx = 0;
      for (let i = 0; i < SCRIPT.length; i++) {
        if (elapsed < stepStart + SCRIPT[i].duration) {
          stepIdx = i;
          break;
        }
        stepStart += SCRIPT[i].duration;
      }

      const step = SCRIPT[stepIdx];
      const stepElapsed = elapsed - stepStart;

      if (stepIdx !== lastStepIndex) {
        lastStepIndex = stepIdx;
        commitStepStart(stepIdx);
      }

      let latestBeat: CursorBeat | null = null;
      for (const b of step.cursor) {
        if (stepElapsed >= b.at) latestBeat = b;
      }
      if (latestBeat && latestBeat.target !== cursorTargetKey) {
        cursorTargetKey = latestBeat.target;
      }

      for (let i = 0; i < step.cursor.length; i++) {
        const b = step.cursor[i];
        if (b.kind !== 'click') continue;
        const key = `${stepIdx}|${i}`;
        if (stepElapsed >= b.at && !firedBeats.has(key)) {
          firedBeats.add(key);
          setState((s) => ({
            ...s,
            cursor: { ...s.cursor, clickKey: s.cursor.clickKey + 1 },
          }));
        }
      }

      if (step.flags) {
        const nextFlags: Record<string, FlagValue> = { ...stateRef.current.flags };
        let flagsChanged = false;
        for (let i = 0; i < step.flags.length; i++) {
          const f = step.flags[i];
          const setKey = `${stepIdx}|f${i}|set`;
          const clearKey = `${stepIdx}|f${i}|clear`;
          if (stepElapsed >= f.at && !firedBeats.has(setKey)) {
            firedBeats.add(setKey);
            if (nextFlags[f.set] !== f.value) {
              nextFlags[f.set] = f.value;
              flagsChanged = true;
            }
          }
          if (f.clearAt != null && stepElapsed >= f.clearAt && !firedBeats.has(clearKey)) {
            firedBeats.add(clearKey);
            if (f.set in nextFlags) {
              delete nextFlags[f.set];
              flagsChanged = true;
            }
          }
        }
        if (flagsChanged) {
          setState((s) => ({ ...s, flags: nextFlags }));
        }
      }

      // Resolve target only on beat change or after a resize. The spring/motion
      // values handle all interpolation — no need to re-read the rect each frame.
      if (cursorTargetKey && (cursorTargetKey !== resolvedForKey || needsResolve)) {
        const coords = resolveTarget(container, cursorTargetKey);
        if (coords) {
          xMV.set(coords.x);
          yMV.set(coords.y);
          resolvedForKey = cursorTargetKey;
          needsResolve = false;
          if (!stateRef.current.cursor.visible) {
            setState((s) => ({ ...s, cursor: { ...s.cursor, visible: true } }));
          }
        }
        // If coords is null (target not yet in DOM), leave resolvedForKey unchanged
        // so we retry next tick.
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.intersectionRatio < 0.1) {
          if (!isPaused) {
            isPaused = true;
            pausedAt = performance.now();
          }
        } else if (isPaused && pausedAt != null) {
          startTs += performance.now() - pausedAt;
          pausedAt = null;
          isPaused = false;
        }
      },
      { threshold: [0, 0.1, 0.25] },
    );
    io.observe(container);

    const ro = new ResizeObserver(() => {
      needsResolve = true;
    });
    ro.observe(container);

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...state, xMV, yMV };
}

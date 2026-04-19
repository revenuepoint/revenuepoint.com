'use client';

import { useEffect, useState } from 'react';
import type { FlagEvent, FlagValue } from '@/components/foundry/portal/usePortalDirector';
import type { ModuleId } from '@/data/foundryModules';

type ModuleScript = {
  duration: number;
  flags: FlagEvent[];
};

const MODULE_DEMO_SCRIPTS: Record<ModuleId, ModuleScript> = {
  lens: {
    duration: 5000,
    flags: [{ at: 1500, set: 'lens.range-30d', value: true, clearAt: 4500 }],
  },
  courier: {
    duration: 5000,
    flags: [{ at: 1200, set: 'courier.hover-row', value: 2, clearAt: 4200 }],
  },
  // Prism's card-cycle animation is driven directly by PlatformModulesShowcase
  // (simpler single-state setTimeout chain, no multi-event flag timing).
  prism: { duration: 0, flags: [] },
  agents: {
    duration: 5500,
    flags: [{ at: 1500, set: 'agents.expanded', value: 'watcher', clearAt: 5000 }],
  },
  actions: { duration: 0, flags: [] },
  otto: { duration: 0, flags: [] },
};

const TICK_MS = 250;

export function useModuleDemoDirector(moduleId: ModuleId): {
  flags: Record<string, FlagValue>;
} {
  const [flags, setFlags] = useState<Record<string, FlagValue>>({});

  useEffect(() => {
    setFlags({});
    const script = MODULE_DEMO_SCRIPTS[moduleId];
    if (!script || script.duration === 0 || script.flags.length === 0) return;

    const reduced =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const start = Date.now();
    const id = window.setInterval(() => {
      const elapsed = (Date.now() - start) % script.duration;
      const next: Record<string, FlagValue> = {};
      for (const ev of script.flags) {
        const isOn =
          elapsed >= ev.at && (ev.clearAt == null || elapsed < ev.clearAt);
        if (isOn) next[ev.set] = ev.value;
      }
      setFlags((prev) => {
        const prevKeys = Object.keys(prev);
        const nextKeys = Object.keys(next);
        if (prevKeys.length === nextKeys.length) {
          const allMatch = nextKeys.every((k) => prev[k] === next[k]);
          if (allMatch) return prev;
        }
        return next;
      });
    }, TICK_MS);

    return () => {
      window.clearInterval(id);
    };
  }, [moduleId]);

  return { flags };
}

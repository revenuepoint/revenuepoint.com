'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import {
  AgentsView,
  CourierView,
  LensView,
  OttoView,
  PrismView,
} from '@/components/foundry/portal/ModuleViews';
import { ActionsShowcaseView } from '@/components/foundry/portal/ActionsShowcaseView';
import { PrismReportModal } from '@/components/foundry/portal/PrismReportModal';
import { PlatformModuleSidebar } from '@/components/foundry/PlatformModuleSidebar';
import { PlatformAppShell } from '@/components/foundry/PlatformAppShell';
import { useModuleDemoDirector } from '@/components/foundry/useModuleDemoDirector';
import { PortalDirectorContext } from '@/components/foundry/portal/usePortalDirector';
import {
  foundryModules,
  moduleLayerMeta,
  type FoundryModule,
  type ModuleId,
} from '@/data/foundryModules';
import { track, events } from '@/lib/analytics';

function ModuleIntro({ module: m }: { module: FoundryModule }) {
  const layer = moduleLayerMeta[m.layer];
  return (
    <div className="mb-8 max-w-2xl mx-auto text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span
          className={`text-[10px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded border ${layer.chipClass}`}
        >
          {layer.label}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-mute">
          {m.role}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-navy">
        {m.name}
        <span className="text-mute font-normal"> — {m.role}</span>
      </h3>
      <p className="text-sm text-navySoft font-medium mt-1 leading-snug">
        {m.tagline}
      </p>
      <p className="text-sm text-ink mt-2 leading-relaxed">
        {m.description}
      </p>
    </div>
  );
}

export function PlatformModulesShowcase() {
  const [selectedId, setSelectedIdState] = useState<ModuleId>(foundryModules[0].id);
  const setSelectedId = (id: ModuleId) => {
    setSelectedIdState((prev) => {
      if (prev !== id) track(events.foundry_module_selected, { from: prev, to: id });
      return id;
    });
  };
  const selected =
    foundryModules.find((m) => m.id === selectedId) ?? foundryModules[0];
  const { flags: directorFlags } = useModuleDemoDirector(selectedId);

  // Prism animation — driven directly here so it's self-contained and
  // doesn't rely on the director's multi-event flag timing.
  const [prismCardIndex, setPrismCardIndex] = useState<number | null>(null);
  useEffect(() => {
    if (selectedId !== 'prism') {
      setPrismCardIndex(null);
      return;
    }
    const SEQUENCE: Array<{ idx: number | null; ms: number }> = [
      { idx: 0, ms: 3000 },
      { idx: null, ms: 800 },
      { idx: 4, ms: 3000 },
      { idx: null, ms: 800 },
      { idx: 8, ms: 3000 },
      { idx: null, ms: 1500 },
    ];
    let step = 0;
    let timerId = 0;
    setPrismCardIndex(SEQUENCE[0].idx);
    const advance = () => {
      step = (step + 1) % SEQUENCE.length;
      setPrismCardIndex(SEQUENCE[step].idx);
      timerId = window.setTimeout(advance, SEQUENCE[step].ms);
    };
    timerId = window.setTimeout(advance, SEQUENCE[0].ms);
    return () => window.clearTimeout(timerId);
  }, [selectedId]);

  const flags = useMemo(() => {
    if (selectedId !== 'prism') return directorFlags;
    const next = { ...directorFlags };
    if (prismCardIndex != null) next['prism.modal'] = prismCardIndex;
    else delete next['prism.modal'];
    return next;
  }, [directorFlags, selectedId, prismCardIndex]);

  const prismModalIndex = selectedId === 'prism' ? prismCardIndex : null;

  return (
    <MotionConfig reducedMotion="user">
      <PortalDirectorContext.Provider value={{ flags }}>
        <ModuleIntro module={selected} />
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
          <PlatformModuleSidebar
            items={foundryModules}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <div className="h-[640px] lg:h-[720px]">
            <PlatformAppShell
              activeModuleId={selectedId}
              onSelect={setSelectedId}
            >
                <AnimatePresence mode="wait" initial={false}>
                  {selectedId === 'actions' && (
                    <motion.div
                      key="actions"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 min-w-0 overflow-hidden bg-white flex flex-col"
                    >
                      <ActionsShowcaseView />
                    </motion.div>
                  )}
                  {selectedId === 'agents' && (
                    <motion.div
                      key="agents"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 min-w-0 overflow-hidden bg-white flex flex-col"
                    >
                      <AgentsView />
                    </motion.div>
                  )}
                  {selectedId === 'otto' && (
                    <motion.div
                      key="otto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 min-w-0 overflow-hidden bg-white flex flex-col"
                    >
                      <OttoView />
                    </motion.div>
                  )}
                  {selectedId === 'prism' && (
                    <motion.div
                      key="prism"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 min-w-0 overflow-hidden bg-white flex flex-col"
                    >
                      <PrismView />
                    </motion.div>
                  )}
                  {selectedId === 'courier' && (
                    <motion.div
                      key="courier"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 min-w-0 overflow-hidden bg-white flex flex-col"
                    >
                      <CourierView />
                    </motion.div>
                  )}
                  {selectedId === 'lens' && (
                    <motion.div
                      key="lens"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 min-w-0 overflow-hidden bg-white flex flex-col"
                    >
                      <LensView />
                    </motion.div>
                  )}
                </AnimatePresence>
                <PrismReportModal index={prismModalIndex} />
            </PlatformAppShell>
          </div>
        </div>
      </PortalDirectorContext.Provider>
    </MotionConfig>
  );
}

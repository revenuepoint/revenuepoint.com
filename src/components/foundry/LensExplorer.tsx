'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LensSidebar } from '@/components/foundry/LensSidebar';
import { lensItems, type LensView } from '@/data/foundryLens';
import { DashboardPreview } from '@/components/foundry/lens/DashboardPreview';
import { ReportPreview } from '@/components/foundry/lens/ReportPreview';
import { MetricTreePreview } from '@/components/foundry/lens/MetricTreePreview';
import { MapPreview } from '@/components/foundry/lens/MapPreview';

function PreviewForView({ view }: { view: LensView }) {
  if (view === 'dashboard') return <DashboardPreview />;
  if (view === 'report') return <ReportPreview />;
  if (view === 'metric-tree') return <MetricTreePreview />;
  return <MapPreview />;
}

export function LensExplorer() {
  const [selectedId, setSelectedId] = useState<LensView>('dashboard');

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
      <div>
        <LensSidebar items={lensItems} selectedId={selectedId} onSelect={setSelectedId} />
      </div>
      <div className="rounded-lg border border-rule bg-white shadow-sm p-5 lg:p-6 min-h-[620px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <PreviewForView view={selectedId} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

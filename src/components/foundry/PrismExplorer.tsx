'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PrismSidebar } from '@/components/foundry/PrismSidebar';
import { PrismReportPanel } from '@/components/foundry/PrismReportPanel';
import { prismReports } from '@/data/foundryPrismReports';

export function PrismExplorer() {
  const [selectedId, setSelectedId] = useState<string>(prismReports[0].id);
  const selected = prismReports.find((r) => r.id === selectedId) ?? prismReports[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
      <div>
        <PrismSidebar items={prismReports} selectedId={selectedId} onSelect={setSelectedId} />
      </div>
      <div className="rounded-lg border border-border bg-white shadow-sm p-5 lg:p-6 h-[720px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="h-full"
          >
            <PrismReportPanel report={selected} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

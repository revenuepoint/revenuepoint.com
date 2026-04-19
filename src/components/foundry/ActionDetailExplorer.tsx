'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ActionDetailPanel } from '@/components/foundry/ActionDetailPanel';
import { ActionDetailSidebar } from '@/components/foundry/ActionDetailSidebar';
import { foundryActionDetails } from '@/data/foundryActionDetails';

export function ActionDetailExplorer() {
  const [selectedId, setSelectedId] = useState<string>(foundryActionDetails[0].id);
  const selected =
    foundryActionDetails.find((a) => a.id === selectedId) ?? foundryActionDetails[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
      <div>
        <ActionDetailSidebar
          items={foundryActionDetails}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>
      <div className="rounded-lg border border-border bg-white shadow-sm p-5 lg:p-6 min-h-[720px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <ActionDetailPanel action={selected} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

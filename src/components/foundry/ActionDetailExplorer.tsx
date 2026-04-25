'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ActionDetailPanel } from '@/components/foundry/ActionDetailPanel';
import { ActionDetailSidebar } from '@/components/foundry/ActionDetailSidebar';
import { foundryActionDetailsByIndustry } from '@/data/foundryActionDetails';
import { useIndustry } from '@/context/IndustryContext';
import { track, events } from '@/lib/analytics';

export function ActionDetailExplorer() {
  const { industryId } = useIndustry();
  const details = foundryActionDetailsByIndustry[industryId];
  const [selectedId, setSelectedIdState] = useState<string>(details[0].id);
  const setSelectedId = (id: string) => {
    setSelectedIdState((prev) => {
      if (prev !== id) track(events.action_inspected, { action_id: id, industry: industryId });
      return id;
    });
  };

  useEffect(() => {
    setSelectedId(details[0].id);
  }, [industryId, details]);

  const selected = details.find((a) => a.id === selectedId) ?? details[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
      <div>
        <ActionDetailSidebar
          items={details}
          selectedId={selected.id}
          onSelect={setSelectedId}
        />
      </div>
      <div className="rounded-lg border border-rule bg-white shadow-sm p-5 lg:p-6 min-h-[720px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${industryId}-${selected.id}`}
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

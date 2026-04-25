'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PrismSidebar } from '@/components/foundry/PrismSidebar';
import { PrismReportPanel } from '@/components/foundry/PrismReportPanel';
import { prismReportsByIndustry } from '@/data/foundryPrismReports';
import { useIndustry } from '@/context/IndustryContext';

export function PrismExplorer() {
  const { industryId } = useIndustry();
  const reports = prismReportsByIndustry[industryId];
  const [selectedId, setSelectedId] = useState<string>(reports[0].id);

  // Reset selection on industry change — stale id belongs to previous industry.
  useEffect(() => {
    setSelectedId(reports[0].id);
  }, [industryId, reports]);

  const selected = reports.find((r) => r.id === selectedId) ?? reports[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
      <div>
        <PrismSidebar items={reports} selectedId={selected.id} onSelect={setSelectedId} />
      </div>
      <div className="rounded-lg border border-rule bg-white shadow-sm p-5 lg:p-6 h-[720px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${industryId}-${selected.id}`}
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

'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { OttoChatSidebar } from '@/components/foundry/OttoChatSidebar';
import { OttoChatPanel } from '@/components/foundry/OttoChatPanel';
import { ottoConversationsByIndustry } from '@/data/foundryOttoChats';
import { useIndustry } from '@/context/IndustryContext';

export function OttoChatExplorer() {
  const { industryId } = useIndustry();
  const conversations = ottoConversationsByIndustry[industryId];
  const [selectedId, setSelectedId] = useState<string>(conversations[0].id);

  // Reset selection when industry changes — prior selectedId belongs to a different industry.
  useEffect(() => {
    setSelectedId(conversations[0].id);
  }, [industryId, conversations]);

  const selected =
    conversations.find((c) => c.id === selectedId) ?? conversations[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
      <div>
        <OttoChatSidebar
          items={conversations}
          selectedId={selected.id}
          onSelect={setSelectedId}
        />
      </div>
      <div className="rounded-lg border border-border bg-white shadow-sm p-5 lg:p-6 min-h-[620px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${industryId}-${selected.id}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="h-full"
          >
            <OttoChatPanel conversation={selected} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

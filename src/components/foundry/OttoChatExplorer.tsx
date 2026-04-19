'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { OttoChatSidebar } from '@/components/foundry/OttoChatSidebar';
import { OttoChatPanel } from '@/components/foundry/OttoChatPanel';
import { ottoConversations } from '@/data/foundryOttoChats';

export function OttoChatExplorer() {
  const [selectedId, setSelectedId] = useState<string>(ottoConversations[0].id);
  const selected =
    ottoConversations.find((c) => c.id === selectedId) ?? ottoConversations[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
      <div>
        <OttoChatSidebar
          items={ottoConversations}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>
      <div className="rounded-lg border border-border bg-white shadow-sm p-5 lg:p-6 min-h-[620px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected.id}
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

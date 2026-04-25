'use client';

import { AnimatePresence, motion } from 'framer-motion';

type Props = { open: boolean };

export function RadarAckToast({ open }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="absolute bottom-4 left-4 z-40 max-w-[260px] rounded-md border border-rule bg-white shadow-xl px-3 py-2 flex items-start gap-2"
          aria-hidden="true"
        >
          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500 text-white shrink-0 mt-0.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold text-navy leading-tight">
              Alert acknowledged
            </p>
            <p className="text-[9px] text-mute mt-0.5">
              Routed to #ops-oncall · logged in audit trail
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

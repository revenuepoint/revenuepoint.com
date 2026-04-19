'use client';

import { AnimatePresence, LayoutGroup, MotionConfig, motion } from 'framer-motion';
import { ActionCard } from '@/components/foundry/ActionCard';
import { actionColumns, type ActionStatus, type Card } from '@/data/foundryActions';
import { useActionsEngine } from '@/components/foundry/useActionsEngine';

const COLUMN_FADE_STYLE: React.CSSProperties = {
  WebkitMaskImage:
    'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
  maskImage: 'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
};

function cardsForColumn(col: ActionStatus, cards: Card[]): Card[] {
  // Human Review: FIFO — oldest at TOP, newest at BOTTOM (ASC by pendingSeq).
  // Queued/Running/Done: stack order — newest at TOP, oldest pushed down.
  if (col === 'pending') {
    return cards
      .filter((c) => c.phase === 'pending' || c.phase === 'approving')
      .sort((a, b) => a.pendingSeq - b.pendingSeq); // ASC — oldest at top
  }
  if (col === 'queued') {
    return cards
      .filter((c) => c.phase === 'queued')
      .sort((a, b) => b.phaseStartedAt - a.phaseStartedAt);
  }
  if (col === 'running') {
    return cards
      .filter((c) => c.phase === 'running')
      .sort((a, b) => b.phaseStartedAt - a.phaseStartedAt);
  }
  return cards
    .filter((c) => c.phase === 'done')
    .sort((a, b) => b.doneSeq - a.doneSeq); // DESC — newest at top, pushing older down
}

export function ActionsKanban() {
  const { cards } = useActionsEngine();

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible pb-2">
          {actionColumns.map((col) => {
            const columnCards = cardsForColumn(col.id, cards);
            const canFade = col.id === 'done' || col.id === 'pending';
            return (
              <div
                key={col.id}
                className="shrink-0 snap-start w-[85%] sm:w-[65%] md:w-[46%] lg:w-auto flex flex-col rounded-lg bg-white/60 border border-border p-3 h-[820px]"
              >
                <div className="flex items-center gap-2 mb-3 px-1 shrink-0">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${col.headerDotClass} ${col.headerPulse ? 'animate-pulse' : ''}`}
                  />
                  <span className="text-xs font-bold uppercase tracking-widest text-navy">
                    {col.label}
                  </span>
                </div>

                <div
                  className="flex flex-col gap-3 flex-1 overflow-hidden"
                  style={canFade ? COLUMN_FADE_STYLE : undefined}
                >
                  <AnimatePresence initial={false} mode="popLayout">
                    {columnCards.map((card) => (
                      <motion.div
                        key={card.instanceId}
                        layout="position"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeOut' } }}
                        transition={{
                          layout: { type: 'spring', stiffness: 260, damping: 30 },
                          opacity: { duration: 0.35, ease: 'easeOut' },
                          y: { duration: 0.35, ease: 'easeOut' },
                        }}
                      >
                        <ActionCard card={card} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}

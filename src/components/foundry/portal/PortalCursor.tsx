'use client';

import { AnimatePresence, motion, useSpring, type MotionValue } from 'framer-motion';

type Props = {
  xMV: MotionValue<number>;
  yMV: MotionValue<number>;
  visible: boolean;
  clickKey: number;
  reducedMotion: boolean;
};

const POSITION_SPRING = {
  stiffness: 180,
  damping: 26,
  mass: 0.9,
  restDelta: 0.1,
};

export function PortalCursor({ xMV, yMV, visible, clickKey, reducedMotion }: Props) {
  const springX = useSpring(xMV, POSITION_SPRING);
  const springY = useSpring(yMV, POSITION_SPRING);

  const x = reducedMotion ? xMV : springX;
  const y = reducedMotion ? yMV : springY;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        style={{ x, y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.3, ease: 'easeOut' } }}
        className="absolute top-0 left-0"
      >
        <div className="relative" style={{ transform: 'translate(-5px, -3px)' }}>
          <AnimatePresence>
            {clickKey > 0 && (
              <motion.span
                key={clickKey}
                initial={{ opacity: 0.75, scale: 0.25 }}
                animate={{ opacity: 0, scale: 2.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute -left-3 -top-3 h-6 w-6 rounded-full border-2 border-crimson"
              />
            )}
          </AnimatePresence>

          <svg
            width="18"
            height="22"
            viewBox="0 0 18 22"
            className="block drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
          >
            <path
              d="M 1.5 1.5 L 1.5 16.8 L 5.4 13.2 L 8.0 19.5 L 10.4 18.5 L 7.9 12.4 L 13.2 12.4 Z"
              fill="#0F172A"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

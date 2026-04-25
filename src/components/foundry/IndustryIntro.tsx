'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useIndustry } from '@/context/IndustryContext';
import { getIndustry } from '@/data/foundryIndustries';

function CheckIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function IndustryIntro() {
  const { industryId } = useIndustry();
  const industry = getIndustry(industryId);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={industry.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
        className="flex flex-col gap-8"
      >
        {/* Lead */}
        <p className="text-lg lg:text-xl leading-relaxed text-navy font-medium max-w-3xl">
          {industry.lead}
        </p>

        {/* Three-column value grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personas */}
          <div className="rounded-lg border border-rule bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-mute mb-3">
              Who it's for
            </p>
            <div className="flex flex-wrap gap-1.5">
              {industry.personas.map((p) => (
                <span
                  key={p}
                  className="text-xs font-medium text-ink bg-cream border border-rule rounded-full px-3 py-1"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Systems */}
          <div className="rounded-lg border border-rule bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-mute mb-3">
              Systems it connects
            </p>
            <div className="flex flex-wrap gap-1.5">
              {industry.systems.map((s) => (
                <span
                  key={s}
                  className="text-xs font-medium text-navy bg-crimsonTint border border-crimson/20 rounded px-2.5 py-1"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Outcomes */}
          <div className="rounded-lg border border-rule bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-mute mb-3">
              What it delivers
            </p>
            <ul className="flex flex-col gap-2">
              {industry.outcomes.map((o) => (
                <li key={o} className="flex gap-2 text-xs text-ink leading-snug">
                  <span className="inline-flex items-center justify-center h-4 w-4 shrink-0 rounded-full bg-emerald-500/15 text-emerald-700 mt-0.5">
                    <CheckIcon className="h-2.5 w-2.5" />
                  </span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ROI strip */}
        <div className="rounded-lg bg-navy text-white p-6 grid grid-cols-1 sm:grid-cols-3 gap-5 shadow-sm">
          {industry.roi.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <p className="text-2xl lg:text-3xl font-bold font-mono text-white">{stat.value}</p>
              <p className="text-xs text-gray-300 mt-1 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Case story */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6 border-l-2 border-crimson pl-4">
          <p className="text-sm text-ink flex-1 leading-relaxed italic">{industry.caseStory}</p>
          <span className="text-xs font-semibold text-crimson whitespace-nowrap">
            Read the {industry.shortName} case study →
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

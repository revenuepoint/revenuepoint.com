import type { ReactNode } from 'react';

export function TwoColumn({
  left,
  right,
  leftHeading,
  rightHeading,
}: {
  left: ReactNode;
  right: ReactNode;
  leftHeading?: string;
  rightHeading?: string;
}) {
  return (
    <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
      <div className="border border-ruleSoft bg-cream p-5 lg:p-6 relative">
        <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
        <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-mute" />
        {leftHeading && (
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute mt-3 mb-3">
            {leftHeading}
          </p>
        )}
        <div className="text-sm text-inkSoft leading-relaxed space-y-2">{left}</div>
      </div>
      <div className="border border-crimson bg-crimsonTint p-5 lg:p-6 relative">
        <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-crimson" />
        {rightHeading && (
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-crimson mt-3 mb-3">
            {rightHeading}
          </p>
        )}
        <div className="text-sm text-ink leading-relaxed space-y-2 [&_strong]:text-ink">{right}</div>
      </div>
    </div>
  );
}

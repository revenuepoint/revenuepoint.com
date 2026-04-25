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
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <div className="border border-border rounded-md bg-offWhite/40 p-5">
        {leftHeading && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-mutedText mb-2">
            {leftHeading}
          </p>
        )}
        <div className="text-sm text-bodyText leading-relaxed space-y-2">
          {left}
        </div>
      </div>
      <div className="border border-crimson/20 rounded-md bg-crimsonLight p-5">
        {rightHeading && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-crimson mb-2">
            {rightHeading}
          </p>
        )}
        <div className="text-sm text-bodyText leading-relaxed space-y-2 [&_strong]:text-navy">
          {right}
        </div>
      </div>
    </div>
  );
}

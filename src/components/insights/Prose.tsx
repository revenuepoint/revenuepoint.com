import type { ReactNode } from 'react';

/**
 * Wrapper that applies blog typography to descendant HTML tags. Use for
 * paragraph-heavy sections. Block-level specialty components (Callout,
 * StatGrid, Figure, etc.) should live OUTSIDE <Prose> or inside a sibling
 * so they don't inherit the prose spacing.
 */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        text-base text-bodyText leading-[1.7] space-y-5
        [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-navy [&>h2]:mt-10 [&>h2]:mb-3 [&>h2]:tracking-tight
        [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-navy [&>h3]:mt-6 [&>h3]:mb-2
        [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1.5
        [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-1.5 [&>ol]:marker:text-crimson
        [&>ul_li]:pl-1 [&>ol_li]:pl-1
        [&_a]:text-crimson [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-crimson/30 hover:[&_a]:decoration-crimson
        [&_strong]:font-semibold [&_strong]:text-navy
        [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:bg-offWhite [&_code]:border [&_code]:border-border [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5
      "
    >
      {children}
    </div>
  );
}

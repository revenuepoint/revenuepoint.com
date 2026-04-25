import type { ReactNode } from 'react';

/**
 * Wrapper that applies editorial prose typography to descendant HTML tags.
 * Block-level specialty components (Callout, StatGrid, Figure, etc.) should
 * live OUTSIDE <Prose> or in a sibling so they don't inherit prose spacing.
 */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        text-base text-inkSoft leading-[1.75] space-y-5 max-w-prose
        [&>h2]:font-serif [&>h2]:text-d2 [&>h2]:font-medium [&>h2]:text-ink [&>h2]:mt-12 [&>h2]:mb-3 [&>h2]:tracking-snug [&>h2]:leading-tight
        [&>h3]:font-serif [&>h3]:text-[1.25rem] [&>h3]:font-medium [&>h3]:text-ink [&>h3]:mt-8 [&>h3]:mb-2 [&>h3]:leading-snug
        [&>ul]:list-none [&>ul]:pl-0 [&>ul]:space-y-2
        [&>ul>li]:relative [&>ul>li]:pl-6 [&>ul>li]:before:content-['→'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-navySoft [&>ul>li]:before:font-mono
        [&>ol]:list-none [&>ol]:pl-0 [&>ol]:space-y-2 [&>ol]:counter-reset:item
        [&>ol>li]:relative [&>ol>li]:pl-8 [&>ol>li]:before:content-[counter(item,lower-roman)'.'] [&>ol>li]:before:absolute [&>ol>li]:before:left-0 [&>ol>li]:before:text-navySoft [&>ol>li]:before:font-serif [&>ol>li]:before:italic [&>ol>li]:counter-increment:item
        [&_a]:text-crimson [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-crimson/40 hover:[&_a]:decoration-crimson
        [&_strong]:font-semibold [&_strong]:text-ink
        [&_em]:italic [&_em]:text-navySoft
        [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:bg-cream [&_code]:border [&_code]:border-rule [&_code]:px-1.5 [&_code]:py-0.5
      "
    >
      {children}
    </div>
  );
}

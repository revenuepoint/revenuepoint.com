export function PullQuote({
  children,
  attribution,
}: {
  children: string;
  attribution?: string;
}) {
  return (
    <figure className="my-12 border-l-2 border-crimson pl-6 max-w-prose">
      <blockquote className="font-serif italic text-[1.5rem] lg:text-[1.75rem] text-ink leading-snug tracking-[-0.012em]">
        &ldquo;{children}&rdquo;
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
          — {attribution}
        </figcaption>
      )}
    </figure>
  );
}

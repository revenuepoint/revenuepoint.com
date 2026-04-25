export function PullQuote({
  children,
  attribution,
}: {
  children: string;
  attribution?: string;
}) {
  return (
    <figure className="my-10 border-l-4 border-crimson pl-6">
      <blockquote className="text-xl lg:text-2xl font-semibold text-navy leading-snug tracking-tight">
        &ldquo;{children}&rdquo;
      </blockquote>
      {attribution && (
        <figcaption className="mt-3 text-sm text-mutedText">— {attribution}</figcaption>
      )}
    </figure>
  );
}

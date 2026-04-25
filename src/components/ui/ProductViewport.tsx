type Props = {
  figureNumber?: string;
  caption: string;
  attribution?: string;
  variant?: 'default' | 'bleed';
  children: React.ReactNode;
  className?: string;
};

/**
 * Frames a product UI as a magazine-style figure with caption + attribution.
 * Internals are scoped to .product-surface so they keep sans-serif inheritance
 * regardless of page context.
 */
export function ProductViewport({
  figureNumber,
  caption,
  attribution,
  variant = 'default',
  children,
  className = '',
}: Props) {
  return (
    <figure
      className={`my-12 lg:my-16 border-l-2 border-navy ${
        variant === 'bleed' ? 'lg:border-l-2' : ''
      } ${className}`}
    >
      <figcaption className="pl-5 lg:pl-6 pb-4">
        <div className="flex items-baseline gap-3 flex-wrap">
          {figureNumber && (
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
              {figureNumber}
            </span>
          )}
          <span className="serif-italic text-[1.05rem] text-ink">{caption}</span>
        </div>
      </figcaption>
      <div className="pl-5 lg:pl-6">
        <div className="border-t border-rule pt-4">
          <div className="product-surface">{children}</div>
          {attribution && (
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
              {attribution}
            </p>
          )}
        </div>
      </div>
    </figure>
  );
}

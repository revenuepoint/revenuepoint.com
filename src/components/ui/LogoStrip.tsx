type Logo = {
  name: string;
  src?: string;
  /** Rendered pixel height. Width follows naturally from the source aspect. */
  height?: number;
  /** No-op — preserved on the type so existing call sites don't have
      to drop the property. The single-row marquee ignores it. */
  breakBefore?: boolean;
};

type LogoStripProps = {
  heading?: string;
  logos: Logo[];
};

/**
 * Trust-bar / "as featured by" logo strip.
 *
 * Single-row horizontal auto-scrolling marquee that spans the full
 * viewport width on every breakpoint (track CSS lives in globals.css).
 * The logo list is rendered twice back-to-back so a -50% translate
 * loops seamlessly. Each logo renders at its NATURAL width for the
 * given height — no per-logo slot widths, just a consistent gap.
 *
 * Only the heading is constrained to the editorial column; the marquee
 * itself escapes that wrapper so the logos run edge-to-edge.
 */
const HEIGHT_SCALE = 1.75;

export function LogoStrip({ heading, logos }: LogoStripProps) {
  return (
    <section className="bg-paper border-y border-ruleSoft py-10 lg:py-14">
      {heading && (
        <div className="max-w-editorial mx-auto px-6 lg:px-8 mb-10">
          <p className="serif-italic text-center text-base text-mute">{heading}</p>
        </div>
      )}

      {/* Full-viewport-width marquee. Logos render twice so
          translateX(-50%) loops seamlessly. */}
      <div className="overflow-hidden">
        <div className="rp-marquee-track">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex shrink-0 items-center"
              aria-hidden={i >= logos.length}
            >
              {logo.src ? (
                <img
                  src={logo.src}
                  alt={i >= logos.length ? '' : logo.name}
                  className="block w-auto object-contain max-w-none"
                  style={{ height: Math.round((logo.height ?? 28) * HEIGHT_SCALE) }}
                />
              ) : (
                <span className="font-mono text-[14px] uppercase tracking-[0.16em] text-ink whitespace-nowrap">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

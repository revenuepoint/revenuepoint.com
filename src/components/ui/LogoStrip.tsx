type Logo = {
  name: string;
  src?: string;
  /** Rendered pixel height. Width follows naturally from the source aspect. */
  height?: number;
};

type LogoStripProps = {
  heading?: string;
  logos: Logo[];
};

/**
 * Trust-bar / "as featured by" logo strip.
 *
 * Layout discipline: every logo renders at its NATURAL width for the
 * given height. There are no per-logo slot widths — that approach
 * produces inconsistent visual gaps because each logo image sits with
 * variable padding inside a uniform slot. With natural sizing, the
 * single gap-x value between logos is the only spacing, and it stays
 * visually consistent across every pair.
 *
 * Mobile (<sm) — horizontal marquee (track defined in globals.css).
 * sm and up — flex-wrap, last row centered.
 */
export function LogoStrip({ heading, logos }: LogoStripProps) {
  return (
    <section className="bg-paper border-y border-ruleSoft">
      <div className="max-w-editorial mx-auto px-6 lg:px-8 py-10 lg:py-14">
        {heading && (
          <p className="serif-italic text-center text-base text-mute mb-10">{heading}</p>
        )}

        {/* Mobile: horizontal auto-scrolling marquee. Logos render twice
            so translateX(-50%) loops seamlessly. */}
        <div className="sm:hidden overflow-hidden -mx-6">
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
                    style={{ height: logo.height ?? 28 }}
                  />
                ) : (
                  <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink whitespace-nowrap">
                    {logo.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* sm and up: flex-wrap, natural widths, consistent gap. */}
        <ul className="hidden sm:flex mx-auto flex-wrap items-center justify-center gap-x-7 gap-y-8">
          {logos.map((logo) => (
            <li key={logo.name} className="flex items-center">
              {logo.src ? (
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="block w-auto object-contain max-w-none"
                  style={{ height: logo.height ?? 28 }}
                />
              ) : (
                <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink whitespace-nowrap">
                  {logo.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

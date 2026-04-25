type Logo = {
  name: string;
  src?: string;
  height?: number;
};

type LogoStripProps = {
  heading?: string;
  logos: Logo[];
};

export function LogoStrip({ heading, logos }: LogoStripProps) {
  return (
    <section className="bg-paper border-y border-ruleSoft">
      <div className="max-w-editorial mx-auto px-6 lg:px-8 py-10 lg:py-14">
        {heading && (
          <p className="serif-italic text-center text-base text-mute mb-10">{heading}</p>
        )}
        {/* Mobile: smooth horizontal marquee. Logos render twice so the
            -50% translation loops seamlessly. */}
        <div className="sm:hidden overflow-hidden -mx-6">
          <div className="rp-marquee-track flex items-center gap-x-10">
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex shrink-0 items-center justify-center w-[110px]"
                aria-hidden={i >= logos.length}
              >
                {logo.src ? (
                  <img
                    src={logo.src}
                    alt={i >= logos.length ? '' : logo.name}
                    className="w-auto object-contain max-w-full"
                    style={{ height: logo.height ?? 32 }}
                  />
                ) : (
                  <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink">
                    {logo.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* sm and up: static flex-wrap grid. */}
        <ul className="hidden sm:flex mx-auto flex-wrap items-center justify-center gap-x-8 gap-y-10 lg:gap-x-10">
          {logos.map((logo) => (
            <li key={logo.name} className="flex items-center justify-center w-[110px] lg:w-[120px]">
              {logo.src ? (
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="w-auto object-contain max-w-full"
                  style={{ height: logo.height ?? 32 }}
                />
              ) : (
                <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink">
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

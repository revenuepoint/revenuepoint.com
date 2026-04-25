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
        <ul className="flex flex-wrap items-center justify-center gap-x-10 lg:gap-x-14 gap-y-7">
          {logos.map((logo) => (
            <li key={logo.name} className="flex items-center">
              {logo.src ? (
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="w-auto object-contain max-w-[150px] lg:max-w-[170px] [filter:grayscale(1)_sepia(0.4)_brightness(0.55)_opacity(0.85)] hover:[filter:none] transition-[filter] duration-300"
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

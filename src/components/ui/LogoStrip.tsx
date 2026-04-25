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
        <ul className="mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-10 lg:gap-x-10">
          {logos.map((logo) => (
            <li key={logo.name} className="flex items-center justify-center w-[100px] sm:w-[110px] lg:w-[120px]">
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

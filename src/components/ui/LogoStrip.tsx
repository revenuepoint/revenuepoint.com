type Logo = {
  name: string;
};

type LogoStripProps = {
  heading?: string;
  logos: Logo[];
};

export function LogoStrip({ heading, logos }: LogoStripProps) {
  return (
    <section className="bg-paper border-y border-ruleSoft">
      <div className="max-w-editorial mx-auto px-6 lg:px-8 py-10 lg:py-12">
        {heading && (
          <p className="serif-italic text-center text-base text-mute mb-6">{heading}</p>
        )}
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 lg:gap-x-14">
          {logos.map((logo, i) => (
            <li key={logo.name} className="flex items-center gap-x-10">
              {i > 0 && <span aria-hidden="true" className="hidden lg:block w-px h-4 bg-rule -ml-5" />}
              <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink">
                {logo.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

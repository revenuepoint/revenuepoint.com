type Logo = {
  name: string;
};

type LogoStripProps = {
  heading?: string;
  logos: Logo[];
};

export function LogoStrip({ heading, logos }: LogoStripProps) {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16 text-center">
        {heading && (
          <p className="text-sm text-mutedText mb-8">{heading}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="h-10 px-6 flex items-center justify-center bg-lightGray rounded-sm"
            >
              <span className="text-sm font-medium text-mutedText">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

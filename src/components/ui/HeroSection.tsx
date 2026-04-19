import { Button } from './Button';

type CTA = {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'ghost';
};

type HeroSectionProps = {
  eyebrow?: string;
  heading: string;
  body: string;
  ctas?: CTA[];
  rightSlot?: React.ReactNode;
  variant?: 'navy' | 'light';
};

export function HeroSection({
  eyebrow,
  heading,
  body,
  ctas,
  rightSlot,
  variant = 'navy',
}: HeroSectionProps) {
  const isNavy = variant === 'navy';

  return (
    <section className={isNavy ? 'bg-navy' : 'bg-white'}>
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className={`${rightSlot ? 'lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center' : 'max-w-3xl'}`}>
          <div>
            {eyebrow && (
              <p
                className={`text-xs font-bold uppercase tracking-widest mb-4 ${
                  isNavy ? 'text-white' : 'text-crimson'
                }`}
              >
                {eyebrow}
              </p>
            )}
            {eyebrow && (
              <div
                className={`w-10 h-[3px] mb-6 ${isNavy ? 'bg-white' : 'bg-crimson'}`}
              />
            )}
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ${
                isNavy ? 'text-white' : 'text-navy'
              }`}
            >
              {heading}
            </h1>
            <p
              className={`mt-6 text-lg leading-relaxed max-w-xl ${
                isNavy ? 'text-gray-300' : 'text-bodyText'
              }`}
            >
              {body}
            </p>
            {ctas && ctas.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4">
                {ctas.map((cta) => (
                  <Button key={cta.label} variant={cta.variant} href={cta.href}>
                    {cta.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
          {rightSlot && <div className="mt-10 lg:mt-0">{rightSlot}</div>}
        </div>
      </div>
    </section>
  );
}

import { Button } from './Button';

type CTABannerProps = {
  heading: string;
  body?: string;
  cta: {
    label: string;
    href: string;
  };
};

export function CTABanner({ heading, body, cta }: CTABannerProps) {
  return (
    <section className="bg-navy">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white">{heading}</h2>
        {body && (
          <p className="mt-4 text-gray-300 text-base leading-relaxed max-w-2xl mx-auto">
            {body}
          </p>
        )}
        <div className="mt-8">
          <Button variant="ghost" href={cta.href}>
            {cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}

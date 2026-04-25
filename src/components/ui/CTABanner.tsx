import { Button } from './Button';

type CTABannerProps = {
  eyebrow?: string;
  heading: React.ReactNode;
  body?: string;
  cta: {
    label: string;
    href: string;
  };
};

export function CTABanner({ eyebrow, heading, body, cta }: CTABannerProps) {
  return (
    <section className="bg-paper border-t border-rule">
      <div className="max-w-editorial mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="border border-ink/90 bg-cream p-8 lg:p-12 max-w-4xl mx-auto">
          {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
          <h2 className="text-d2 font-serif font-medium text-ink max-w-prose">{heading}</h2>
          {body && (
            <p className="mt-4 text-lede text-inkSoft leading-[1.65] max-w-prose">{body}</p>
          )}
          <div className="mt-8">
            <Button variant="primary" href={cta.href}>
              {cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

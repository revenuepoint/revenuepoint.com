import { Button } from './Button';

type PricingCardProps = {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  highlight?: boolean;
  cta?: {
    label: string;
    href: string;
  };
};

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  highlight,
  cta,
}: PricingCardProps) {
  return (
    <div
      className={`bg-white border rounded-sm shadow-sm flex flex-col ${
        highlight
          ? 'border-crimson ring-1 ring-crimson/20 relative'
          : 'border-border'
      }`}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-crimson text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
            Most Popular
          </span>
        </div>
      )}
      <div className={`p-6 border-b border-border ${highlight ? 'pt-8' : ''}`}>
        <h3 className="text-xl font-semibold text-navy">{name}</h3>
        <div className="mt-3">
          <span className="text-3xl font-bold text-navy">{price}</span>
          {period && <span className="text-sm text-mutedText ml-1">/{period}</span>}
        </div>
        {description && (
          <p className="mt-3 text-sm text-mutedText leading-relaxed">{description}</p>
        )}
      </div>
      <div className="p-6 flex-1">
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex gap-2.5 text-sm text-bodyText">
              <svg
                className="w-4 h-4 text-green shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      {cta && (
        <div className="p-6 pt-0">
          <Button
            variant={highlight ? 'primary' : 'secondary'}
            href={cta.href}
            className="w-full"
          >
            {cta.label}
          </Button>
        </div>
      )}
    </div>
  );
}

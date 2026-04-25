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
      className={`relative bg-cream border flex flex-col ${
        highlight ? 'border-navySoft lg:scale-[1.02] shadow-editorial' : 'border-ruleSoft'
      }`}
    >
      {highlight && (
        <div className="absolute -top-3 left-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] bg-crimson text-paper px-2 py-1">
            Most chosen
          </span>
        </div>
      )}
      <div className="p-6 lg:p-8 border-b border-rule">
        <h3 className="font-serif italic text-[1.75rem] text-ink leading-tight">{name}</h3>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="font-mono text-[2rem] font-semibold text-ink tabular-nums">{price}</span>
          {period && <span className="font-mono text-sm text-mute">/{period}</span>}
        </div>
        {description && (
          <p className="mt-4 text-sm text-inkSoft leading-relaxed max-w-[28ch]">{description}</p>
        )}
      </div>
      <div className="p-6 lg:p-8 flex-1">
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex gap-3 text-sm text-ink leading-relaxed">
              <span className="text-navySoft font-mono shrink-0" aria-hidden="true">→</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      {cta && (
        <div className="p-6 lg:p-8 pt-0">
          <Button variant={highlight ? 'primary' : 'secondary'} href={cta.href} className="w-full justify-center">
            {cta.label}
          </Button>
        </div>
      )}
    </div>
  );
}

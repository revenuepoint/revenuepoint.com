import Link from 'next/link';

type ServiceCardProps = {
  title: string;
  body: React.ReactNode;
  cta?: {
    label: string;
    href: string;
  };
  badge?: string;
  elevated?: boolean;
  className?: string;
};

export function ServiceCard({ title, body, cta, badge, elevated, className = '' }: ServiceCardProps) {
  return (
    <article
      className={`relative h-full bg-cream border flex flex-col p-6 lg:p-8 transition-shadow hover:shadow-hairline ${
        elevated ? 'border-crimson' : 'border-ruleSoft'
      } ${className}`}
    >
      {/* Crimson accent bar — top, 32px */}
      <span aria-hidden="true" className="absolute left-6 top-0 h-px w-8 bg-crimson" />
      <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
      <div className="flex items-baseline gap-3 mt-3">
        <h3 className="font-serif text-[1.5rem] font-medium text-ink leading-tight">{title}</h3>
        {badge && (
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] bg-crimson text-paper px-1.5 py-[2px] leading-none">
            {badge}
          </span>
        )}
      </div>
      <p className="mt-4 text-sm text-inkSoft leading-relaxed flex-1">{body}</p>
      {cta && (
        <Link
          href={cta.href}
          className="mt-6 inline-flex items-center gap-2 text-sm font-serif italic text-crimson hover:text-crimsonDeep transition-colors"
        >
          {cta.label} <span aria-hidden="true">→</span>
        </Link>
      )}
    </article>
  );
}

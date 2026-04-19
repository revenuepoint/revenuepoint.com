import Link from 'next/link';

type ServiceCardProps = {
  title: string;
  body: string;
  cta?: {
    label: string;
    href: string;
  };
  badge?: string;
  elevated?: boolean;
};

export function ServiceCard({ title, body, cta, badge, elevated }: ServiceCardProps) {
  return (
    <div
      className={`bg-white border border-border rounded-sm shadow-sm flex ${
        elevated ? 'ring-1 ring-crimson/20' : ''
      }`}
    >
      <div className="w-1 bg-crimson rounded-l-sm shrink-0" />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-xl font-semibold text-navy">{title}</h3>
          {badge && (
            <span className="text-[10px] font-bold bg-crimson text-white px-1.5 py-0.5 rounded-sm leading-none">
              {badge}
            </span>
          )}
        </div>
        <p className="text-base text-bodyText leading-relaxed flex-1">{body}</p>
        {cta && (
          <Link
            href={cta.href}
            className="mt-4 text-sm font-semibold text-crimson hover:text-crimsonDark transition-colors inline-flex items-center gap-1"
          >
            {cta.label} <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>
    </div>
  );
}

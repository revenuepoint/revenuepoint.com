import type { ReactNode } from 'react';

type Variant = 'info' | 'warning' | 'success' | 'tip';

const STYLE: Record<Variant, { accent: string; label: string; tone: string }> = {
  info: { accent: 'border-l-navy', tone: 'text-navy', label: 'Note' },
  warning: { accent: 'border-l-amber', tone: 'text-amber', label: 'Watch out' },
  success: { accent: 'border-l-navy', tone: 'text-navy', label: 'Works well' },
  tip: { accent: 'border-l-crimson', tone: 'text-crimson', label: 'Tip' },
};

export function Callout({
  variant = 'info',
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}) {
  const s = STYLE[variant];
  return (
    <aside
      className={`my-8 bg-cream border border-ruleSoft border-l-2 ${s.accent} px-5 py-4`}
    >
      <p className={`font-mono text-[10px] uppercase tracking-[0.16em] ${s.tone} mb-2`}>
        {title ?? s.label}
      </p>
      <div className="text-sm text-inkSoft leading-relaxed [&_a]:text-crimson [&_a]:underline [&_strong]:text-ink [&_strong]:font-semibold space-y-2">
        {children}
      </div>
    </aside>
  );
}

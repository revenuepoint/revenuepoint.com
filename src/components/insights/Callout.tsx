import type { ReactNode } from 'react';

type Variant = 'info' | 'warning' | 'success' | 'tip';

const STYLE: Record<Variant, { border: string; bg: string; accent: string; label: string }> = {
  info: {
    border: 'border-blue-200',
    bg: 'bg-blue-50',
    accent: 'border-l-blue-500',
    label: 'Info',
  },
  warning: {
    border: 'border-amber-200',
    bg: 'bg-amber-50',
    accent: 'border-l-amber-500',
    label: 'Watch out',
  },
  success: {
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
    accent: 'border-l-emerald-500',
    label: 'Works well',
  },
  tip: {
    border: 'border-crimson/20',
    bg: 'bg-crimsonLight',
    accent: 'border-l-crimson',
    label: 'Tip',
  },
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
      className={`rounded-md border border-l-4 ${s.border} ${s.accent} ${s.bg} px-4 py-3 text-sm leading-relaxed text-bodyText`}
    >
      <p className="text-[10px] font-bold uppercase tracking-widest text-navy mb-1">
        {title ?? s.label}
      </p>
      <div className="[&_a]:text-crimson [&_a]:underline [&_strong]:text-navy [&_strong]:font-semibold space-y-2">
        {children}
      </div>
    </aside>
  );
}

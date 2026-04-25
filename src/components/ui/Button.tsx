'use client';

import Link from 'next/link';
import { SCHEDULE_URL } from '@/lib/links';
import { track, events } from '@/lib/analytics';
import type { EventName } from '@/lib/analytics';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'plain';
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  trackingEvent?: EventName;
  trackingProps?: Record<string, unknown>;
};

const variants = {
  primary:
    'border border-crimson text-crimson font-serif italic text-[15px] hover:bg-crimsonTint',
  secondary: 'border border-ink text-ink font-serif italic text-[15px] hover:bg-bone',
  ghost: 'border border-paper text-paper font-serif italic text-[15px] hover:bg-paper hover:text-ink',
  plain: 'text-crimson font-serif italic text-[15px] hover:text-crimsonDeep underline-offset-4 hover:underline',
};

const padding = {
  primary: 'px-5 py-2',
  secondary: 'px-5 py-2',
  ghost: 'px-5 py-2',
  plain: '',
};

export function Button({
  variant = 'primary',
  href,
  children,
  className = '',
  type,
  trackingEvent,
  trackingProps,
}: ButtonProps) {
  const classes = `inline-flex items-center gap-2 text-center transition-colors ${variants[variant]} ${padding[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {variant !== 'plain' && <span aria-hidden="true">→</span>}
      {variant === 'plain' && <span aria-hidden="true">→</span>}
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http');
    const isScheduleLink = href === SCHEDULE_URL;
    const resolvedEvent = trackingEvent ?? (isScheduleLink ? events.schedule_clicked : undefined);
    const handleClick = resolvedEvent
      ? () => {
          track(resolvedEvent, {
            ...(typeof children === 'string' ? { cta_label: children } : {}),
            target_url: href,
            page: typeof window !== 'undefined' ? window.location.pathname : undefined,
            ...(trackingProps ?? {}),
          });
        }
      : undefined;

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={handleClick}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type || 'button'} className={classes}>
      {inner}
    </button>
  );
}

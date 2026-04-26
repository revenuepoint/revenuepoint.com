import Link from 'next/link';

type Size = 'sm' | 'md' | 'lg';
type Tone = 'crimson' | 'ink' | 'paper' | 'navySoft' | 'inkMid';

const SIZE_CLASS: Record<Size, string> = {
  sm: 'text-[18px]',
  md: 'text-[24px]',
  lg: 'text-[40px]',
};

const TONE_CLASS: Record<Tone, string> = {
  crimson: 'text-crimson',
  ink: 'text-ink',
  paper: 'text-paper',
  navySoft: 'text-navySoft',
  inkMid: 'text-inkMid',
};

type Props = {
  size?: Size;
  tone?: Tone;
  asLink?: boolean;
  href?: string;
  className?: string;
};

export function Wordmark({
  size = 'md',
  tone = 'crimson',
  asLink = true,
  href = '/',
  className = '',
}: Props) {
  const classes = `font-serif font-semibold tracking-[-0.02em] leading-none ${SIZE_CLASS[size]} ${TONE_CLASS[tone]} ${className}`;

  if (asLink) {
    return (
      <Link href={href} className={classes} aria-label="RevenuePoint home">
        RevenuePoint
      </Link>
    );
  }

  return <span className={classes}>RevenuePoint</span>;
}

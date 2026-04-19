import Link from 'next/link';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
};

const variants = {
  primary: 'bg-crimson text-white font-semibold px-6 py-3 hover:bg-crimsonDark transition-colors',
  secondary: 'border-2 border-crimson text-crimson font-semibold px-6 py-3 hover:bg-crimsonLight transition-colors',
  ghost: 'border-2 border-white text-white font-semibold px-6 py-3 hover:bg-white hover:text-navy transition-colors',
};

export function Button({ variant = 'primary', href, children, className = '', type }: ButtonProps) {
  const classes = `inline-block text-center rounded-sm ${variants[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith('http');
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type || 'button'} className={classes}>
      {children}
    </button>
  );
}

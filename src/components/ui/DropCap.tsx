type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Wraps a paragraph with the editorial drop-cap treatment.
 * Reserved for executive-summary moments. One per page maximum.
 */
export function DropCap({ children, className = '' }: Props) {
  return <p className={`dropcap text-lede leading-[1.65] text-inkSoft max-w-prose ${className}`}>{children}</p>;
}

type Props = {
  quote: React.ReactNode;
  cite?: string;
  className?: string;
};

/**
 * Editorial pull quote — Fraunces italic, 2px crimson left border, max 36ch.
 * One per page maximum. Reserved for customer voice or earned moments.
 */
export function PullQuote({ quote, cite, className = '' }: Props) {
  return (
    <blockquote className={`pullquote ${className}`}>
      <span>{quote}</span>
      {cite && <cite>{cite}</cite>}
    </blockquote>
  );
}

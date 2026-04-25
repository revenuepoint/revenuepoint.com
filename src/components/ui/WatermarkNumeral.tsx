type Props = {
  issue: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Wraps a hero or feature container with a giant Fraunces-italic watermark
 * numeral floated to the right at very low opacity. Hero pages only.
 */
export function WatermarkNumeral({ issue, children, className = '' }: Props) {
  return (
    <div className={`watermark-numeral ${className}`} data-issue={issue}>
      {children}
    </div>
  );
}

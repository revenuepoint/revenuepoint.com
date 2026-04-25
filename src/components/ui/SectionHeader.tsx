type SectionHeaderProps = {
  eyebrow?: string;
  heading: React.ReactNode;
  body?: string;
  align?: 'center' | 'left';
  light?: boolean;
};

export function SectionHeader({
  eyebrow,
  heading,
  body,
  align = 'left',
  light = false,
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : '';
  const headingTone = light ? 'text-paper' : 'text-ink';
  const bodyTone = light ? 'text-paper/80' : 'text-inkSoft';

  return (
    <div className={`max-w-3xl mb-12 ${alignClass}`}>
      {eyebrow && <p className={`eyebrow mb-4 ${align === 'center' ? 'justify-center' : ''}`}>{eyebrow}</p>}
      <h2 className={`text-d1 font-serif font-medium ${headingTone}`}>{heading}</h2>
      {body && (
        <p className={`mt-4 text-lede leading-[1.65] max-w-prose ${bodyTone}`}>{body}</p>
      )}
    </div>
  );
}

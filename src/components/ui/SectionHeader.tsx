type SectionHeaderProps = {
  eyebrow?: string;
  heading: string;
  body?: string;
  align?: 'center' | 'left';
  light?: boolean;
};

export function SectionHeader({
  eyebrow,
  heading,
  body,
  align = 'center',
  light = false,
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : '';

  return (
    <div className={`max-w-3xl mb-12 ${alignClass}`}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl font-bold tracking-tight ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        {heading}
      </h2>
      {body && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            light ? 'text-gray-300' : 'text-bodyText'
          }`}
        >
          {body}
        </p>
      )}
    </div>
  );
}

import type { ReactNode } from 'react';

type Props = {
  index: number;
  eyebrow: string;
  title: string;
  description: string;
  exampleLabel?: string;
  example?: ReactNode;
  preview: ReactNode;
  alt?: boolean;
};

export function DocSectionPreview({
  index,
  eyebrow,
  title,
  description,
  exampleLabel,
  example,
  preview,
  alt = false,
}: Props) {
  return (
    <section className={alt ? 'bg-cream' : 'bg-paper'}>
      <div className="max-w-editorial mx-auto px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-8 lg:gap-14 items-start">
          <div>
            <p className="eyebrow">
              §{String(index).padStart(2, '0')} · {eyebrow}
            </p>
            <h3 className="mt-4 font-serif text-d2 font-medium text-ink leading-tight">{title}</h3>
            <p className="mt-4 text-base leading-[1.65] text-inkSoft max-w-prose">{description}</p>
            {example && (
              <div className="mt-6 border-l-2 border-navySoft pl-4">
                {exampleLabel && (
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute mb-1">
                    {exampleLabel}
                  </div>
                )}
                <div className="text-sm text-ink leading-relaxed serif-italic">{example}</div>
              </div>
            )}
          </div>
          <div>
            <div className="border border-rule bg-paper p-4">{preview}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

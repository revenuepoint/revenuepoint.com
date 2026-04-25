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
    <section className={alt ? 'bg-offWhite' : 'bg-white'}>
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-14 items-start">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-crimson font-semibold">
              Section {String(index).padStart(2, '0')} · {eyebrow}
            </p>
            <h3 className="mt-3 text-2xl lg:text-3xl font-bold text-navy tracking-tight">
              {title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-bodyText max-w-2xl">
              {description}
            </p>
            {example && (
              <div className="mt-6 border-l-2 border-crimson pl-4">
                {exampleLabel && (
                  <div className="text-[10px] uppercase tracking-widest text-mutedText font-semibold mb-1">
                    {exampleLabel}
                  </div>
                )}
                <div className="text-sm text-bodyText leading-relaxed">{example}</div>
              </div>
            )}
          </div>
          <div>
            <div className="border border-border rounded-lg bg-white shadow-sm p-4">
              {preview}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

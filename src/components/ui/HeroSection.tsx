import { Button } from './Button';

type CTA = {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'ghost' | 'plain';
};

type HeroSectionProps = {
  eyebrow?: string;
  byline?: string;
  heading: React.ReactNode;
  body: string;
  ctas?: CTA[];
  rightSlot?: React.ReactNode;
  /** Watermark issue marker — displays as the giant background numeral. Hero pages only. */
  issue?: string;
  /** Optional sidenote (mono micro, mute) under the CTAs */
  sidenote?: React.ReactNode;
  /** Legacy prop — kept for compatibility during migration. Editorial palette is paper-on-ink, not navy. */
  variant?: 'navy' | 'light';
};

export function HeroSection({
  eyebrow,
  byline,
  heading,
  body,
  ctas,
  rightSlot,
  issue,
  sidenote,
}: HeroSectionProps) {
  return (
    <section
      className="relative bg-snow overflow-hidden"
      data-issue={issue}
      style={issue ? undefined : undefined}
    >
      {issue && (
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-[-0.05em] top-[-0.15em] font-serif italic font-light text-ink leading-[0.86] whitespace-nowrap"
          style={{ fontSize: 'clamp(14rem, 32vw, 32rem)', opacity: 0.05 }}
        >
          {issue}
        </span>
      )}
      <div className="relative max-w-editorial mx-auto px-6 lg:px-8 pt-16 lg:pt-28 pb-16 lg:pb-24">
        <div className={rightSlot ? 'lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start' : ''}>
          <div className={rightSlot ? 'lg:col-span-7' : 'max-w-3xl'}>
            {byline && <p className="byline mb-5">{byline}</p>}
            {eyebrow && !byline && <p className="eyebrow mb-5">{eyebrow}</p>}
            <h1 className="text-d0 font-serif font-semibold text-ink">{heading}</h1>
            <p className="mt-6 text-lede text-inkSoft max-w-lede leading-[1.65]">{body}</p>
            {ctas && ctas.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4 items-center">
                {ctas.map((cta) => (
                  <Button key={cta.label} variant={cta.variant} href={cta.href}>
                    {cta.label}
                  </Button>
                ))}
              </div>
            )}
            {sidenote && (
              <p className="mt-6 pt-4 border-t border-ruleSoft font-mono text-[11px] uppercase tracking-[0.14em] text-mute max-w-prose">
                {sidenote}
              </p>
            )}
          </div>
          {rightSlot && <div className="mt-12 lg:mt-0 lg:col-span-5">{rightSlot}</div>}
        </div>
      </div>
    </section>
  );
}

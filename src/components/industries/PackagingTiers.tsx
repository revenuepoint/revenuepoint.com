import Link from 'next/link';
import type { PackagingTier } from '@/types/industry';

export function PackagingTiers({
  tiers,
  navLabel,
}: {
  tiers: PackagingTier[];
  navLabel?: string;
}) {
  const interestSlug = navLabel ? encodeURIComponent(navLabel) : '';
  return (
    <section className="bg-snow">
      <div className="max-w-editorial mx-auto px-6 lg:px-8 py-section">
        <div className="max-w-3xl mb-12">
          <p className="eyebrow mb-4">How we package the work</p>
          <h2 className="text-d1 font-serif font-medium text-ink">
            <em>Fully managed</em> by RevenuePoint. Three tiers.
          </h2>
          <p className="mt-4 text-lede leading-[1.65] text-inkSoft max-w-prose">
            Flat monthly pricing. Your single point of contact at RevenuePoint. We keep the instance clean as your business changes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t, i) => {
            const featured = i === 1;
            return (
              <div
                key={t.name}
                className={`relative border bg-cream p-6 lg:p-8 flex flex-col ${
                  featured ? 'border-navySoft lg:scale-[1.02] shadow-editorial' : 'border-ruleSoft'
                }`}
              >
                {featured && (
                  <div className="absolute -top-3 left-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] bg-crimson text-paper px-2 py-1">
                      Most chosen
                    </span>
                  </div>
                )}
                <div className="flex items-baseline justify-between mt-2">
                  <p className="font-serif italic text-[1.5rem] text-ink">{t.name}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{t.duration}</p>
                </div>
                <p className="mt-3 text-sm text-inkSoft leading-relaxed">{t.headline}</p>
                <ul className="mt-6 space-y-3 text-sm text-ink flex-1">
                  {t.includes.map((inc) => (
                    <li key={inc} className="flex gap-3 leading-relaxed">
                      <span className="text-navySoft font-mono shrink-0" aria-hidden="true">→</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
                {interestSlug && (
                  <Link
                    href={`/contact/?interest=${interestSlug}+${encodeURIComponent(t.name)}`}
                    className={`mt-7 inline-flex items-center gap-2 font-serif italic text-[15px] transition-colors ${
                      featured ? 'text-crimson hover:text-crimsonDeep' : 'text-ink hover:text-navySoft'
                    }`}
                  >
                    Book a working session <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Hand-offs */}
        <div className="mt-12 border-t border-rule pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="serif-italic text-base text-inkSoft">
            Need to see the full managed-services pricing, or meet the team who runs it?
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <Link
              href="/salesforce/managed-services/pricing/"
              className="font-serif italic text-crimson hover:text-crimsonDeep transition-colors"
            >
              See full managed-services pricing →
            </Link>
            <Link
              href="/salesforce/"
              className="font-serif italic text-ink hover:text-navySoft transition-colors"
            >
              Meet our 60+ certified consultants →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

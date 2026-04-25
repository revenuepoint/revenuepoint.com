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
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
            How we package the work
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            Fully managed by RevenuePoint. Three tiers.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bodyText">
            Flat monthly pricing. One named administrator. We keep the instance clean as your
            business changes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <div
              key={t.name}
              className={`border rounded-lg p-6 flex flex-col ${
                i === 1
                  ? 'border-crimson bg-crimsonLight'
                  : 'border-border bg-offWhite'
              }`}
            >
              <div className="flex items-baseline justify-between">
                <div className="text-lg font-bold text-navy">{t.name}</div>
                <div className="text-xs text-mutedText font-semibold">{t.duration}</div>
              </div>
              <div className="mt-2 text-sm text-bodyText leading-relaxed">{t.headline}</div>
              <ul className="mt-5 space-y-2 text-sm text-bodyText flex-1">
                {t.includes.map((inc) => (
                  <li key={inc} className="flex gap-2">
                    <span className="text-crimson font-bold shrink-0">—</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
              {interestSlug && (
                <Link
                  href={`/contact/?interest=${interestSlug}+${encodeURIComponent(t.name)}`}
                  className={`mt-6 inline-flex items-center text-sm font-semibold ${
                    i === 1
                      ? 'text-crimson hover:text-crimsonDark'
                      : 'text-navy hover:text-crimson'
                  } transition-colors`}
                >
                  Book a working session →
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Managed-services + consulting hand-offs */}
        <div className="mt-10 border-t border-border pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-bodyText">
            Need to see the full managed-services pricing, or meet the team who runs it?
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <Link
              href="/salesforce/managed-services/pricing/"
              className="text-crimson hover:text-crimsonDark transition-colors"
            >
              See full managed-services pricing →
            </Link>
            <Link
              href="/salesforce/"
              className="text-navy hover:text-crimson transition-colors"
            >
              Meet our 60+ certified consultants →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import type { PostMeta } from '@/types/insights';
import { formatPostDate } from '@/lib/insights';
import { Tag } from './Tag';

export function PostCard({
  meta,
  featured = false,
}: {
  meta: PostMeta;
  featured?: boolean;
}) {
  const href = `/insights/${meta.slug}/`;
  if (featured) {
    return (
      <Link
        href={href}
        className="group grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 md:gap-10 items-stretch border border-ruleSoft bg-cream overflow-hidden hover:border-crimson transition-colors relative"
      >
        <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
        <span aria-hidden="true" className="absolute left-0 top-0 h-px w-12 bg-crimson z-10" />
        <div className="aspect-[16/10] md:aspect-auto md:h-full bg-paper border-b md:border-b-0 md:border-r border-ruleSoft overflow-hidden">
          {meta.cover ? (
            <img
              src={meta.cover.src}
              alt={meta.cover.alt}
              width={meta.cover.width}
              height={meta.cover.height}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-bone" />
          )}
        </div>
        <div className="p-6 md:p-8 flex flex-col">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-crimson mb-3">
            Featured · long read
          </p>
          <div className="flex items-center gap-2 flex-wrap mb-4">
            {meta.tags.slice(0, 2).map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
          <h3 className="font-serif text-[1.5rem] lg:text-[1.75rem] font-medium text-ink leading-tight group-hover:text-crimson transition-colors">
            {meta.title}
          </h3>
          <p className="mt-3 text-sm text-inkSoft leading-relaxed">{meta.excerpt}</p>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
            {[meta.author.name, formatPostDate(meta.date), meta.readingTime]
              .filter(Boolean)
              .join(' · ')}
          </p>
        </div>
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className="group flex flex-col border border-ruleSoft bg-cream overflow-hidden hover:border-crimson transition-colors relative"
    >
      <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule z-10" />
      <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-crimson z-10" />
      <div className="aspect-[16/10] bg-paper border-b border-ruleSoft overflow-hidden">
        {meta.cover ? (
          <img
            src={meta.cover.src}
            alt={meta.cover.alt}
            width={meta.cover.width}
            height={meta.cover.height}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-bone" />
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {meta.tags.slice(0, 2).map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
        <h3 className="font-serif text-[1.0625rem] font-medium text-ink leading-snug group-hover:text-crimson transition-colors">
          {meta.title}
        </h3>
        <p className="mt-2 text-sm text-inkSoft leading-relaxed flex-1">{meta.excerpt}</p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
          {[formatPostDate(meta.date), meta.readingTime].filter(Boolean).join(' · ')}
        </p>
      </div>
    </Link>
  );
}

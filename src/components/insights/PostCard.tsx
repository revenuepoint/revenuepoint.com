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
        className="group grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 md:gap-10 items-center border border-border rounded-lg bg-white overflow-hidden hover:shadow-md transition-shadow"
      >
        <div className="aspect-[16/10] md:aspect-auto md:h-full bg-offWhite border-b md:border-b-0 md:border-r border-border overflow-hidden">
          {meta.cover ? (
            <img
              src={meta.cover.src}
              alt={meta.cover.alt}
              width={meta.cover.width}
              height={meta.cover.height}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-offWhite to-offWhite/40" />
          )}
        </div>
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            {meta.tags.slice(0, 2).map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
          <h3 className="text-xl lg:text-2xl font-bold text-navy leading-tight tracking-tight group-hover:text-crimson transition-colors">
            {meta.title}
          </h3>
          <p className="mt-3 text-sm text-bodyText leading-relaxed">
            {meta.excerpt}
          </p>
          <p className="mt-4 text-xs text-mutedText">
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
      className="group flex flex-col border border-border rounded-lg bg-white overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-[16/10] bg-offWhite border-b border-border overflow-hidden">
        {meta.cover ? (
          <img
            src={meta.cover.src}
            alt={meta.cover.alt}
            width={meta.cover.width}
            height={meta.cover.height}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-offWhite to-offWhite/40" />
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {meta.tags.slice(0, 2).map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
        <h3 className="text-base font-bold text-navy leading-snug tracking-tight group-hover:text-crimson transition-colors">
          {meta.title}
        </h3>
        <p className="mt-2 text-sm text-bodyText leading-relaxed flex-1">
          {meta.excerpt}
        </p>
        <p className="mt-4 text-xs text-mutedText">
          {[formatPostDate(meta.date), meta.readingTime].filter(Boolean).join(' · ')}
        </p>
      </div>
    </Link>
  );
}

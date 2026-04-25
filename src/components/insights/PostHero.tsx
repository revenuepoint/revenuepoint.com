import type { PostMeta } from '@/types/insights';
import { formatPostDate } from '@/lib/insights';
import { Tag } from './Tag';

export function PostHero({ meta }: { meta: PostMeta }) {
  return (
    <header className="bg-offWhite border-b border-border pt-16 pb-10 lg:pt-20 lg:pb-12">
      <div className="max-w-2xl mx-auto px-4">
        {meta.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-5">
            {meta.tags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        )}
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-navy leading-tight">
          {meta.title}
        </h1>
        <p className="mt-4 text-lg text-bodyText leading-relaxed">
          {meta.excerpt}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-navy text-white text-xs font-bold">
            {meta.author.avatarInitials ??
              meta.author.name
                .split(' ')
                .map((p) => p[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-navy">{meta.author.name}</p>
            <p className="text-xs text-mutedText">
              {[meta.author.role, formatPostDate(meta.date), meta.readingTime]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </div>
        </div>
      </div>

      {meta.cover && (
        <div className="max-w-4xl mx-auto px-4 mt-10">
          <img
            src={meta.cover.src}
            alt={meta.cover.alt}
            width={meta.cover.width}
            height={meta.cover.height}
            className="w-full h-auto rounded-lg border border-border shadow-sm"
          />
        </div>
      )}
    </header>
  );
}

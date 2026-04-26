import type { PostMeta } from '@/types/insights';
import { formatPostDate } from '@/lib/insights';
import { Tag } from './Tag';

export function PostHero({ meta }: { meta: PostMeta }) {
  return (
    <header className="relative bg-snow border-b border-rule pt-20 pb-12 lg:pt-28 lg:pb-16 overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute right-[-0.05em] top-[-0.15em] font-serif italic font-light text-ink leading-[0.86] whitespace-nowrap"
        style={{ fontSize: 'clamp(14rem, 32vw, 32rem)', opacity: 0.04 }}
      >
        ¶
      </span>
      <div className="relative max-w-2xl mx-auto px-6 lg:px-8">
        <p className="byline mb-5">Insights · Long-form</p>
        {meta.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-5">
            {meta.tags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        )}
        <h1 className="text-d1 font-serif font-semibold text-ink leading-tight">{meta.title}</h1>
        <p className="mt-5 text-lede text-inkSoft leading-[1.65] max-w-prose">{meta.excerpt}</p>

        <div className="mt-8 flex items-center gap-4 pt-6 border-t border-ruleSoft">
          <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-ink text-paper font-mono text-[11px] font-semibold tracking-wider">
            {meta.author.avatarInitials ??
              meta.author.name
                .split(' ')
                .map((p) => p[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="serif-italic text-base text-ink">{meta.author.name}</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute mt-1">
              {[meta.author.role, formatPostDate(meta.date), meta.readingTime]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </div>
        </div>
      </div>

      {meta.cover && (
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 mt-12">
          <figure>
            <img
              src={meta.cover.src}
              alt={meta.cover.alt}
              width={meta.cover.width}
              height={meta.cover.height}
              className="w-full h-auto border border-rule"
            />
            <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
              Fig. 01 · {meta.cover.alt}
            </figcaption>
          </figure>
        </div>
      )}
    </header>
  );
}

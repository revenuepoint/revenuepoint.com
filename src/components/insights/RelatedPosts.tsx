import { getAllPosts } from '@/lib/insights';
import { PostCard } from './PostCard';

export function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const others = getAllPosts().filter((p) => p.meta.slug !== currentSlug);
  if (others.length === 0) return null;
  const shown = others.slice(0, 3);
  return (
    <section className="bg-offWhite border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold text-navy tracking-tight mb-6">
          More from Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shown.map((p) => (
            <PostCard key={p.meta.slug} meta={p.meta} />
          ))}
        </div>
      </div>
    </section>
  );
}

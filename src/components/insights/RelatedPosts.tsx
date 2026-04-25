import { getAllPosts } from '@/lib/insights';
import { PostCard } from './PostCard';

export function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const others = getAllPosts().filter((p) => p.meta.slug !== currentSlug);
  if (others.length === 0) return null;
  const shown = others.slice(0, 3);
  return (
    <section className="bg-cream border-t border-ruleSoft py-section">
      <div className="max-w-editorial mx-auto px-6 lg:px-8">
        <p className="eyebrow mb-4">Continue reading</p>
        <h2 className="font-serif text-d2 font-medium text-ink mb-8">
          More from <em>Insights</em>.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shown.map((p) => (
            <PostCard key={p.meta.slug} meta={p.meta} />
          ))}
        </div>
      </div>
    </section>
  );
}

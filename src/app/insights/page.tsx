import { buildMetadata } from '@/lib/metadata';
import { getAllPosts } from '@/lib/insights';
import { PostCard } from '@/components/insights/PostCard';
import { EmailSignup } from '@/components/ui/EmailSignup';

export const metadata = buildMetadata({
  title: 'Insights',
  description:
    'Notes on orchestration, mid-market operations, and the work we do inside our customers\' systems.',
  path: '/insights/',
});

export default function InsightsIndex() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="relative bg-snow border-b border-rule overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-[-0.05em] top-[-0.15em] font-serif italic font-light text-ink leading-[0.86] whitespace-nowrap"
          style={{ fontSize: 'clamp(14rem, 32vw, 32rem)', opacity: 0.05 }}
        >
          I
        </span>
        <div className="relative max-w-narrow mx-auto px-6 lg:px-8 pt-20 lg:pt-28 pb-12 lg:pb-16">
          <p className="byline mb-5">Insights · The RevenuePoint quarterly</p>
          <h1 className="text-d0 font-serif font-semibold text-ink leading-tight">
            Notes on <em>orchestration</em>.
          </h1>
          <p className="mt-6 text-lede text-inkSoft leading-[1.65] max-w-prose">
            Essays on mid-market operations, the systems gap, and how we&rsquo;re closing it at RevenuePoint — from the people doing the work.
          </p>
        </div>
      </section>

      <section className="bg-snow py-12 lg:py-16">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          {featured && (
            <div className="mb-12">
              <PostCard meta={featured.meta} featured />
            </div>
          )}

          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((p) => (
                <PostCard key={p.meta.slug} meta={p.meta} />
              ))}
            </div>
          )}

          {posts.length === 0 && (
            <p className="text-center text-mute py-20 serif-italic text-lg">
              No posts yet. Check back soon.
            </p>
          )}
        </div>
      </section>

      <section className="bg-cream border-t border-ruleSoft py-section">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <EmailSignup />
        </div>
      </section>
    </>
  );
}

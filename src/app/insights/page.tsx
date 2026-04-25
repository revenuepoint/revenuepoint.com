import { buildMetadata } from '@/lib/metadata';
import { getAllPosts } from '@/lib/insights';
import { PostCard } from '@/components/insights/PostCard';
import { EmailSignup } from '@/components/ui/EmailSignup';

export const metadata = buildMetadata({
  title: 'Insights — RevenuePoint',
  description:
    'Notes on orchestration, mid-market operations, and the work we do inside our customers\' systems.',
  path: '/insights/',
});

export default function InsightsIndex() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="bg-offWhite border-b border-border pt-16 pb-10 lg:pt-20 lg:pb-14">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-crimson mb-3">
            Insights
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-navy leading-tight">
            Notes on orchestration.
          </h1>
          <p className="mt-4 text-lg text-bodyText leading-relaxed">
            Essays on mid-market operations, the systems gap, and how we&apos;re
            closing it at RevenuePoint — from the people doing the work.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          {featured && (
            <div className="mb-10">
              <PostCard meta={featured.meta} featured />
            </div>
          )}

          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((p) => (
                <PostCard key={p.meta.slug} meta={p.meta} />
              ))}
            </div>
          )}

          {posts.length === 0 && (
            <p className="text-center text-mutedText py-20">
              No posts yet. Check back soon.
            </p>
          )}
        </div>
      </section>

      <section className="bg-white pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <EmailSignup />
        </div>
      </section>
    </>
  );
}

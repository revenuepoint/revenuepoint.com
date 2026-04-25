import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/metadata';
import { getAllPosts, getPostBySlug } from '@/lib/insights';
import { PostHero } from '@/components/insights/PostHero';
import { RelatedPosts } from '@/components/insights/RelatedPosts';
import { PostCTA } from '@/components/insights/PostCTA';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.meta.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return buildMetadata({
      title: 'Not Found',
      description: '',
      path: `/insights/${params.slug}/`,
    });
  }
  return buildMetadata({
    title: post.meta.title,
    description: post.meta.excerpt,
    path: `/insights/${post.meta.slug}/`,
  });
}

export default function InsightsPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { meta, Body } = post;
  return (
    <>
      <PostHero meta={meta} />
      <Body />
      <RelatedPosts currentSlug={meta.slug} />
      <PostCTA />
    </>
  );
}

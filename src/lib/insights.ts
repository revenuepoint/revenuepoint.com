import type { Post } from '@/types/insights';
import { posts } from '@/content/insights/_loader';

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) =>
    b.meta.date.localeCompare(a.meta.date),
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.meta.slug === slug);
}

export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function estimateReadingTime(wordCount: number): string {
  const minutes = Math.max(1, Math.round(wordCount / 200));
  return `${minutes} min read`;
}

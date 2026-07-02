import { getCollection, type CollectionEntry } from 'astro:content';
import type { SeriesId } from './series';

export type Post = CollectionEntry<'posts'>;

/** All non-draft posts, newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Posts of one series in their intended learning order. */
export function postsInSeries(posts: Post[], series: SeriesId): Post[] {
  return posts
    .filter((p) => p.data.series === series)
    .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}

/** Previous/next within the same series, for the post-page arc navigation. */
export function seriesNeighbours(posts: Post[], post: Post) {
  if (!post.data.series) return { prev: undefined, next: undefined };
  const ordered = postsInSeries(posts, post.data.series);
  const i = ordered.findIndex((p) => p.data.slug === post.data.slug);
  return { prev: ordered[i - 1], next: ordered[i + 1] };
}

export function allTags(posts: Post[]): string[] {
  return [...new Set(posts.flatMap((p) => p.data.tags))].sort();
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

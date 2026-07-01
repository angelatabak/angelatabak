import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from 'astro';
import { getPublishedPosts } from '../../lib/posts';
import { SERIES } from '../../lib/series';
import { SITE } from '../../config';
import { renderOgCard } from '../../lib/og';

export const getStaticPaths = (async () => {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ params: { slug: post.data.slug }, props: { post } }));
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = async ({ props }) => {
  const { heroNumber, title, series } = props.post.data;
  const png = await renderOgCard({
    kicker: series ? SERIES[series].name : SITE.name,
    value: heroNumber.value,
    unit: heroNumber.unit,
    label: heroNumber.label,
    term: heroNumber.term,
    title,
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};

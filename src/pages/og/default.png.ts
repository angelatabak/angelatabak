import type { APIRoute } from 'astro';
import { SITE } from '../../config';
import { renderOgCard } from '../../lib/og';

/** Default share card for non-post pages — the brand rule as the number. */
export const GET: APIRoute = async () => {
  const png = await renderOgCard({
    kicker: 'sake, explained clearly',
    value: '1',
    label: 'idea per post',
    title: SITE.tagline,
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};

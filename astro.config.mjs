// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // TODO(Angela): replace with the real domain once it's registered.
  // Everything absolute (canonical URLs, OG images, RSS, sitemap) derives from this.
  site: 'https://nigorinotes.com',
  integrations: [mdx(), sitemap()],
});

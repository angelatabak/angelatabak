import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** The Post content model from PRD §2.3, enforced at build time. */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    slug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug must be url-safe (lowercase, hyphenated)'),
    excerpt: z.string().max(280),
    date: z.coerce.date(),
    readingMinutes: z.number().int().positive(),

    // THE HERO NUMBER — the signature of the brand (PRD §1.4.1).
    heroNumber: z.object({
      value: z.string(),
      unit: z.string().optional(),
      label: z.string(),
      term: z.string().optional(), // romaji only — no kanji, per brand rules
    }),

    series: z.enum(['reading-the-label', 'process-and-flavour', 'european-table']).optional(),
    order: z.number().int().positive().optional(),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(), // honest own-photography only, never stock
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };

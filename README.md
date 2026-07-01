# Nigori Notes

Single-concept sake explainers written from Europe, for curious beginners — one number from
the label, one idea per post. Built to the spec in [`docs/PRD.md`](docs/PRD.md) (Phase 1: the
website). The Phase 2 pairing app is specified there too, but not built yet.

## Stack

- [Astro](https://astro.build) static site, MDX content collections with a typed schema
- Design tokens in `src/styles/tokens.css` — the single source of visual truth
- **Direction C — Risograph Pop** is active (PRD §5). Directions A and B live in
  `src/styles/directions/` — switching is a token swap plus the font import in
  `src/layouts/BaseLayout.astro`
- Fraunces (variable, self-hosted via fontsource, latin subset, `font-display: swap`)
- OG share cards generated at build time (satori + resvg) with the hero number front and
  centre; colours are parsed from `tokens.css`, fonts are the static TTFs in
  `src/assets/og-fonts/`
- RSS at `/rss.xml`, sitemap at `/sitemap-index.xml`, zero client JS except the tiny
  share/save enhancement on post pages

## Commands

```sh
npm install
npm run dev      # local dev server
npm run build    # static build into dist/
npm run preview  # serve the build locally
```

## Writing a post

Add an `.mdx` file to `src/content/posts/`. The frontmatter schema (enforced at build) is in
`src/content.config.ts`; the four existing posts are working examples. The `heroNumber` block
is mandatory — it is the brand (PRD §1.4). To add a post to the home-page beginner arc,
append its slug to `src/data/arc.ts`.

## Before launch — TODO (Angela)

1. **Confirm the name.** "Nigori Notes" is the PRD's working title — change it in
   `src/config.ts` if you pick another.
2. **Set the real domain** in `astro.config.mjs` (`site:`) and `public/robots.txt`.
3. **Review the four post drafts** in `src/content/posts/` and the About page — the copy is
   a first draft written to the PRD's outline; the learning-in-public voice should be yours.
4. **Newsletter:** create a [Buttondown](https://buttondown.com) account and set the username
   in `src/config.ts`. Until then the site shows an RSS fallback instead of a dead form.
5. **Analytics:** create a [Plausible](https://plausible.io) site and set
   `PUBLIC_PLAUSIBLE_DOMAIN` (see `.env.example`) in your hosting provider's env settings.
   No script is injected while it's unset.
6. **Deploy:** connect the repo to Cloudflare Pages / Netlify / Vercel — build command
   `npm run build`, output directory `dist`.

## Decisions log

- **Visual direction: C (Risograph Pop)** — chosen 2026-07-01, per PRD recommendation.
- **"Save" affordance** (PRD §2.1 leaves it open): native share sheet where available plus a
  copy-link button with confirmation — no accounts, no storage, fits the no-CMS constraint.
- **Label font** is a system monospace stack (Direction C calls for "monospace"): zero extra
  font bytes.
- **OG fonts:** `src/assets/og-fonts/*.ttf` are static instances (opsz 144, wght 600/900) cut
  from the Fraunces variable font, because the OG renderer (satori) can't read woff2.

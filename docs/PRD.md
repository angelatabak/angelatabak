# Product Requirements Document — Sake Website + Pairing App

**Working title:** Nigori Notes *(placeholder — confirm or replace before build)*
**Owner:** Angela
**Location / market:** Europe (based in Amsterdam)
**Version:** 2.0
**Status:** Website = ready to build (Phase 1). App = specified, build later (Phase 2).

---

## 0. How to use this document (read first, builder)

- This PRD covers **two products**: a content website (Phase 1) and a sake-food pairing app (Phase 2). **Build the website first.** The app section is here so the foundations (brand, tokens, domain model) are laid down once and reused.
- **There is exactly one decision to make before you start coding:** which visual direction to commit to (see §5). Everything else is specified. All three directions are defined as swappable token sets, so the choice is a config change, not a rewrite. A recommended default is given.
- Three things are **non-negotiable brand rules**, true across both products (see §1.4). If a design or feature choice conflicts with them, the rule wins.
- Prefer boring, durable, low-maintenance tech. This is a solo builder. Every dependency is a future chore.

---

## 1. Vision, positioning & principles (shared across web + app)

### 1.1 One-line positioning
The place that finally explains sake clearly — conceptually, from outside the insider bubble, for European readers.

### 1.2 The gap being filled
Sake content online is barbelled: on one end, Japan-based insiders with brewery access; on the other, shallow "5 sakes to try" listicles. The middle — rigorous, conceptual, beginner-facing, written from Europe — is nearly empty. This project owns that middle. It does **not** compete on access (no brewery tours, no toji interviews); it competes on **clarity** and **vantage point**.

### 1.3 Audience
Curious European beginners and early-intermediate drinkers who want to understand *why*, not just be told what to buy. They are comfortable with a bit of depth and reward an "oh, that's what that means" moment.

### 1.4 Non-negotiable brand rules
1. **The key number is the hero.** Every explainer is anchored to one number found on a sake label (a polishing ratio, a nihonshu-dō value, weeks of fermentation). It is the visual centrepiece of the piece and a first-class field in the data model — not decoration.
2. **No literal Japanese motifs.** No cherry blossoms, rising-sun circles, torii gates, or brush-script "Japanese-look" fonts. Distinctiveness comes from typography, colour, and layout. This protects the honest "outside the bubble" positioning.
3. **One idea per post / per screen.** Resist comprehensiveness. A single concept explained until it clicks beats a complete guide that skims. This is a discipline, enforced in content and in UI (generous space, no cramming).

### 1.5 Voice
Clear, confident, warm, honest. Learning-in-public: it's fine — good, even — to show what was misunderstood and then reframed. Never performs insider authority it doesn't have.

### 1.6 Explicit non-goals
- No brewery visit content or claims of on-the-ground access.
- Not a listicle / affiliate-bait site.
- No "complete guide to everything" pages early on.
- No heavy CMS, no account system on the website (Phase 1).

---

## 2. PRODUCT 1 — The Website (Phase 1, build now)

### 2.1 Goals & success signals
- **Primary goal:** publish single-concept sake explainers that make one thing click.
- **Success signal (not raw traffic):** posts get *saved and sent to a friend*. Design for shareability of the insight — clean permalinks, good share/OpenGraph cards (the number should appear in the share image), an obvious save affordance.
- **Secondary goal:** build the structured beginner path that doesn't currently exist (the arc in §2.9), so late arrivals get an ordered route through the same learning curve.

### 2.2 Recommended tech stack
- **Framework: Astro.** Content-first, ships zero JS by default (fast, clean reading experience), first-class Markdown/MDX, built-in content collections with schema validation, trivial RSS/sitemap. Best fit for a typography-led blog.
  - *Alternatives if preferred:* Eleventy (simpler, no components) or Next.js (heavier; choose only if the app will later share a Next codebase).
- **Content storage:** local **MDX files in the repo**, one file per post, git-versioned. No CMS in Phase 1 — lowest overhead, fits learning-in-public, and Claude Code can scaffold posts directly.
- **Styling:** plain CSS with **design tokens as CSS custom properties** (see §2.7). No Tailwind required; if used, drive it from the same tokens. The whole visual identity must be swappable by changing one token file.
- **Fonts:** self-hosted (woff2), subset, `font-display: swap`. Per-direction fonts listed in §5.
- **Hosting:** Cloudflare Pages, Netlify, or Vercel — all fine. Static output.
- **Analytics:** privacy-friendly, cookieless (Plausible or Umami). Fits the EU audience and the honest brand; no consent-banner clutter.
- **Newsletter:** email capture from day one (learning-in-public compounds via email). Buttondown or MailerLite embed; store nothing else about the reader.

### 2.3 Content model — `Post`
Posts live as MDX with typed frontmatter. Validate with an Astro content-collection schema.

```ts
interface Post {
  title: string;
  slug: string;            // url-safe, stable
  excerpt: string;         // 1–2 sentences, used in cards + meta description
  date: string;            // ISO
  readingMinutes: number;

  // THE HERO NUMBER — the signature of the brand
  heroNumber: {
    value: string;         // e.g. "23", "+5", "6"
    unit?: string;         // e.g. "%", "weeks"  (optional)
    label: string;         // what it is, e.g. "of the grain remains"
    term?: string;         // the Japanese term, e.g. "seimaibuai" (romaji only)
  };

  series?: 'reading-the-label' | 'process-and-flavour' | 'european-table';
  order?: number;          // position within its series (for the beginner arc)
  tags: string[];
  heroImage?: string;      // optional; honest own-photography, never stock brewery shots
  draft?: boolean;
}
```

### 2.4 Series (the three content pillars, as navigable groupings)
1. **Reading the Label** — the numbers themselves (polishing ratio, nihonshu-dō, acidity). The spine.
2. **Process & Flavour** — how it's made and how that tastes (kimoto/yamahai, etc.).
3. **The European Table** — pairing and buying from Europe. The differentiator.

### 2.5 Site map / pages
- **Home** — hook + the current beginner arc laid out as an ordered path; latest posts. Not a busy magazine grid; typography-led.
- **Post** — the core template. Number-as-hero at the top; single-column reading measure (~60–70 chars); generous vertical rhythm; prev/next within series; save + share; tags.
- **Archive / All posts** — filter by series and tag.
- **Series page** — one per pillar, shows the ordered arc.
- **About** — the learning-in-public statement, stated plainly (this is a feature, not an apology).
- **Tag pages** — lightweight.
- System: RSS feed, sitemap.xml, 404.

### 2.6 Signature component — `HeroNumber`
The single most important UI element; used on post pages and post cards.
- Renders `heroNumber.value` at large display size, with `unit` smaller, `label` and `term` as supporting text.
- Is the focal point above the headline on the post page.
- Appears (scaled down) on cards in listings so the brand reads at a glance.
- Feeds the **OpenGraph image** — generate share cards (e.g. Astro OG / Satori) that put the number front and centre. This is what makes a shared link recognisably *ours*.

**Acceptance:** a stranger scrolling a feed should identify a post from this site by the number treatment alone.

### 2.7 Design system architecture
All visual identity flows from one token file so directions are swappable. Minimum token set:

```css
:root {
  /* colour */
  --bg;              /* page field            */
  --ink;             /* primary text          */
  --ink-muted;       /* secondary text        */
  --accent;          /* the one loud colour   */
  --accent-2;        /* optional second (riso only) */
  --border;

  /* type */
  --font-display;    /* headings + hero number */
  --font-body;
  --font-label;      /* kickers, meta, tags    */

  /* form */
  --radius;
  --measure;         /* reading column width, ~66ch */
}
```
Rules: exactly **one loud accent** (two only in the riso direction, by design). Body copy always meets **WCAG AA** contrast — check the dark direction carefully. No literal Japanese motifs anywhere (§1.4).

### 2.8 Reading experience requirements
- Single-column, generous whitespace (*ma*), comfortable measure and line-height.
- No sidebar, related-posts wall, or tag-cloud clutter early — empty space is the aesthetic.
- Fast: minimal/zero client JS, self-hosted fonts, no layout shift.
- Fully responsive; the hero number must stay striking on a phone.
- Accessible: semantic HTML, keyboard-navigable, AA contrast, `prefers-reduced-motion` respected.

### 2.9 Initial content — the beginner arc (ship with these four)
1. **Reading the Label #1 — "The number on the bottle that means the opposite of what you think."** *seimaibuai.* Hero number **23%**. Key point: the percentage is the rice that *remains* after polishing, not what's removed.
2. **Reading the Label #2 — "Why a 'dry' sake can taste sweet."** *nihonshu-dō.* Hero number e.g. **+5**. Key point: the meter measures sugar-vs-water density only; acidity (sandō) and amino acids drive perceived sweetness — one number can't predict taste.
3. **Process & Flavour #1 — "The funk question: why some sake tastes wild and earthy."** *kimoto / yamahai.* Hero number = fermentation weeks. Key point: slow natural lactic-acid starters build fuller, gamey, yogurt-adjacent depth.
4. **The European Table #1 — "Sake and the food I can actually buy in the Netherlands."** Hero number = a pairing count or ABV. Key point: pairing logic *earned* from posts 1–3 — aged Gouda, Indonesian-Dutch spice, charcuterie, not sushi.

### 2.10 Phase 1 acceptance criteria
- [ ] Visual direction chosen (§5) and encoded in the token file; swapping direction touches only tokens + font files.
- [ ] `HeroNumber` component renders on posts and cards, and drives OG share images.
- [ ] Four arc posts published; series ordering and prev/next work.
- [ ] Home presents the arc as an ordered path.
- [ ] RSS, sitemap, privacy-analytics, newsletter capture live.
- [ ] Lighthouse: Performance & Accessibility ≥ 95; AA contrast verified (esp. dark direction).
- [ ] No literal Japanese motifs present anywhere.

---

## 3. PRODUCT 2 — The Pairing App (Phase 2, specified now, build later)

### 3.1 Vision & the market gap
Existing sake apps (Sakenomy, Sakenowa, Sakenote) are **databases / label scanners / tasting journals**. None does **food pairing** as its core job. That unmet space is the wedge. The app answers a question the others don't: *"I have this sake / this dish — what goes with it, and why?"* — grounded in the same conceptual principles as the website, and delivered from the honest European-outsider vantage.

### 3.2 Guiding constraint — do NOT build on label-scanning
OCR on artistic Japanese calligraphy is genuinely hard and unreliable. **Scanning is explicitly out of MVP.** The app must work fully with manual input (search a sake, or pick a style, or enter the label numbers by hand). Scan can return later as an *assist*, never a dependency.

### 3.3 MVP scope (v0)
A **rule-based bidirectional pairing engine** — no ML needed:
- **Sake → food:** user selects a sake or its style/numbers → app suggests dish types and explains *why* (the reasoning is the product).
- **Food → sake:** user picks a dish or its attributes → app suggests a sake style to look for.
- Every suggestion carries a one-line **explanation** rooted in the blog's concepts (polishing, nihonshu-dō, acidity, kimoto/yamahai). Teaching *why* is the differentiator, not a black-box match.

### 3.4 Domain model
```ts
interface Sake {
  id: string;
  name?: string;
  style: 'junmai' | 'ginjo' | 'daiginjo' | 'honjozo' | 'nigori'
       | 'sparkling' | 'koshu' | 'other';
  seimaibuai?: number;   // % remaining
  nihonshuDo?: number;   // meter value
  acidity?: number;      // sando
  method?: 'sokujo' | 'kimoto' | 'yamahai';
  // derived taste axes (0–1), computed from the above:
  profile: { body: number; aroma: number; sweetness: number;
             acidity: number; umami: number };
}

interface Dish {
  id: string;
  name: string;
  attributes: { fat: number; salt: number; acidity: number;
                umami: number; spice: number; sweetness: number;
                intensity: number };
  cuisine?: string;      // incl. European/Dutch context
}

interface PairingResult {
  score: number;         // 0–1
  rationale: string;     // human-readable "why", uses blog concepts
  principle: 'contrast' | 'complement' | 'cleanse' | 'match-intensity';
}
```
The engine scores Sake↔Dish over these axes using a small, transparent, hand-tuned ruleset (e.g. high-acid/kimoto sake cuts through fat and salt; delicate daiginjo is flattened by strong cheese; nigori complements spice). Rules should be data, not hard-coded branches, so they're easy to tune.

### 3.5 Feature phasing
- **v0 (MVP):** manual sake/style entry + dish picker; bidirectional pairing with explanations; a curated starter library of sakes buyable in Europe. No accounts.
- **v1:** save favourites; personal tasting notes; "buyable near me in Europe" filter; shareable pairing cards (reuse the number-as-hero visual language).
- **v2:** optional accounts/sync; scan-*assist* (best-effort, never required); community or importer data.

### 3.6 Tech recommendation
- **Start as a PWA** that shares the website's design tokens and content. Lowest overhead for a solo builder, instant cross-platform, reuses brand, no app-store gatekeeping.
- Move to **Expo / React Native** only if/when native features (camera scan, offline) become core. Keep the pairing engine as a **standalone, platform-agnostic TS module** so it survives that migration untouched.

### 3.7 Monetization (future — not MVP, do not build yet)
Documented for direction only: affiliate commissions from EU sake retailers on "where to buy"; freemium (free pairing engine, paid deeper library/notes/offline); B2B licensing of the pairing logic to restaurants/importers. MVP ships with none of this.

### 3.8 App acceptance criteria (v0)
- [ ] Works end-to-end with zero scanning.
- [ ] Bidirectional pairing returns results with a plain-language "why" for each.
- [ ] Pairing engine is an isolated, tested, platform-agnostic module.
- [ ] Shares the website's design tokens; obeys the three non-negotiable brand rules.
- [ ] Starter sake library reflects what's actually buyable in Europe.

---

## 4. Shared foundations (reused by both products)
- **Design tokens** (§2.7) — one source of truth; the app imports the same values.
- **Concept vocabulary** — seimaibuai, nihonshu-dō, sandō, kimoto/yamahai — defined once (glossary, §7), referenced by both blog posts and app rationales.
- **The number-as-hero visual language** — post heroes, OG cards, and app pairing cards all use it.
- **Voice** — clear, warm, learning-in-public, no performed authority — applies to microcopy in both.

---

## 5. THE ONE DECISION TO MAKE BEFORE BUILDING — visual direction

Pick one. Each is a complete token set; switching later is a token+font swap, not a rewrite. All three keep the number as hero and use zero Japanese motifs.

**Direction A — Warm Editorial** *(safest for long reading)*
Calm, trustworthy, recedes behind the words. Light.
```
--bg:#F5F1E8  --ink:#1E1B14  --ink-muted:#6E6656  --accent:#BA7517  --border:#E0D9C8
--font-display: 'Source Serif 4' | 'Newsreader' | 'Lora'
--font-body: same serif   --font-label: a quiet sans   --radius: 8px
```

**Direction B — Dark Brutalist** *(sharpest / most confrontational)*
Cool, nightlife, opinionated. Watch contrast on long reads.
```
--bg:#0F0F0D  --ink:#F3F1E9  --ink-muted:#908E84  --accent:#C5F23C  --border:#2A2A22
--font-display: 'Space Grotesk' (700)   --font-body: system/geometric sans (400)
--font-label: monospace   --radius: 10px   /* lowercase headings; giant number */
```

**Direction C — Risograph Pop** *(RECOMMENDED default)* — *stands out AND stays readable*
Warm, hand-made, print-zine; daylight energy. Best marriage of "edgy/distinctive" with a light, long-read-friendly field. Two accents by design.
```
--bg:#F2E9D2  --ink:#1C1A14  --ink-muted:#6E6552
--accent:#DA4A2C  --accent-2:#1C7A6B  --border:#1C1A14
--font-display: 'Fraunces' (opsz 144)   --font-body: 'Fraunces' 400 or a warm serif
--font-label: monospace   --radius: 999px (pills) / 12px (cards)
signature: off-register two-colour "stamp" for the hero number
```
> Recommendation rationale: you asked for something edgy and standing out. C delivers a distinctive identity while keeping a light field that's kind to text-heavy explainers — where a fully dark scheme can fatigue. If you want maximum edge over readability, choose B. If you want the writing to lead and the design to whisper, choose A. **Set this in the token file before the first build.**

---

## 6. Roadmap summary
1. **Now — Website Phase 1:** confirm name → choose direction (§5) → scaffold Astro + tokens + `HeroNumber` → publish the four-post arc → RSS/OG/newsletter/analytics.
2. **Next — Website 1.1:** grow the arc; per-post OG cards; light polish.
3. **Later — App Phase 2 (PWA):** build the isolated pairing engine + manual-input UI + European starter library, sharing the tokens.
4. **Future:** app v1/v2 (favourites, buy-in-Europe, scan-assist); revisit monetization only once there's an audience.

---

## 7. Appendix — glossary (single source of truth for both products)
- **seimaibuai (polishing ratio):** the % of each rice grain that *remains* after polishing. Lower = more milled away = typically more delicate/aromatic. Commonly misread as the amount removed — address this directly.
- **nihonshu-dō (sake meter value):** density of sugar vs water; positive skews "dry", negative "sweet". Only part of the picture — does not by itself predict perceived sweetness.
- **sandō (acidity):** acidity level; strongly shapes whether a sake *tastes* dry or sweet and how it pairs with fat/salt.
- **kimoto / yamahai:** slower, traditional starter methods relying on natural lactic-acid bacteria; tend toward fuller, earthier, gamey, yogurt-adjacent depth vs the faster modern (sokujo) method.
- **Reference apps (for positioning, not imitation):** Sakenomy, Sakenowa, Sakenote — databases/scanners/journals; none does food pairing.

*End of PRD.*

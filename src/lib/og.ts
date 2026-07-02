/**
 * OG share-card rendering (PRD §2.6): the hero number front and centre,
 * so a shared link is recognisably ours. Colours are parsed from
 * tokens.css so the token file stays the single source of visual truth;
 * fonts are static instances of Fraunces (opsz 144) generated for this
 * renderer, since satori cannot consume the site's variable woff2.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { SITE } from '../config';

const root = process.cwd();
const semibold = readFileSync(resolve(root, 'src/assets/og-fonts/fraunces-opsz144-semibold.ttf'));
const black = readFileSync(resolve(root, 'src/assets/og-fonts/fraunces-opsz144-black.ttf'));

const tokensCss = readFileSync(resolve(root, 'src/styles/tokens.css'), 'utf8');
const token = (name: string): string => {
  const match = new RegExp(`--${name}:\\s*([^;]+);`).exec(tokensCss);
  if (!match) throw new Error(`token --${name} not found in tokens.css`);
  return match[1]!.trim();
};

const colors = {
  bg: token('bg'),
  ink: token('ink'),
  inkMuted: token('ink-muted'),
  accent: token('accent'),
  accent2: token('accent-2'),
};

/** satori element helper — keeps the tree readable without JSX */
type El = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: El[] | string): El => ({
  type,
  props: { style, ...(children !== undefined ? { children } : {}) },
});

export interface OgCard {
  kicker: string;
  value: string;
  unit?: string | undefined;
  label: string;
  term?: string | undefined;
  title: string;
}

export async function renderOgCard(card: OgCard): Promise<Uint8Array<ArrayBuffer>> {
  const numberText = card.value + (card.unit ?? '');

  const tree = h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      backgroundColor: colors.bg,
      padding: 28,
      fontFamily: 'Fraunces',
    },
    [
      h(
        'div',
        {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: `6px solid ${colors.ink}`,
          borderRadius: 24,
          padding: '40px 56px 44px',
        },
        [
          h(
            'div',
            {
              display: 'flex',
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: '0.14em',
              color: colors.inkMuted,
            },
            card.kicker.toUpperCase(),
          ),
          h('div', { display: 'flex', flexDirection: 'column' }, [
            // the off-register two-colour stamp
            h('div', { display: 'flex', position: 'relative', height: 260 }, [
              h(
                'div',
                {
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  fontSize: 260,
                  fontWeight: 900,
                  lineHeight: 1,
                  color: colors.accent2,
                  opacity: 0.9,
                },
                numberText,
              ),
              h(
                'div',
                {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  fontSize: 260,
                  fontWeight: 900,
                  lineHeight: 1,
                  color: colors.accent,
                },
                numberText,
              ),
            ]),
            h(
              'div',
              {
                display: 'flex',
                marginTop: 26,
                fontSize: 30,
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: colors.ink,
              },
              card.label.toUpperCase() + (card.term ? `  ·  ${card.term}` : ''),
            ),
          ]),
          h(
            'div',
            {
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 40,
            },
            [
              h(
                'div',
                {
                  display: 'flex',
                  fontSize: 40,
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: colors.ink,
                  maxWidth: 780,
                },
                card.title,
              ),
              h(
                'div',
                {
                  display: 'flex',
                  flexShrink: 0,
                  fontSize: 26,
                  fontWeight: 600,
                  color: colors.bg,
                  backgroundColor: colors.accent,
                  padding: '10px 28px',
                  borderRadius: 999,
                },
                SITE.name.toLowerCase(),
              ),
            ],
          ),
        ],
      ),
    ],
  );

  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Fraunces', data: semibold, weight: 600, style: 'normal' },
      { name: 'Fraunces', data: black, weight: 900, style: 'normal' },
    ],
  });

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Uint8Array(png) as Uint8Array<ArrayBuffer>;
}

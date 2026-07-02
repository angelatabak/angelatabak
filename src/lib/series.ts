/** The three content pillars (PRD §2.4), defined once. */
export const SERIES = {
  'reading-the-label': {
    name: 'Reading the Label',
    description:
      'The numbers on the bottle — polishing ratio, the sake meter, acidity — decoded one at a time. The spine of the site.',
  },
  'process-and-flavour': {
    name: 'Process & Flavour',
    description:
      'How sake is made, and how each choice in the brewery ends up on your tongue.',
  },
  'european-table': {
    name: 'The European Table',
    description:
      'Pairing and buying sake from Europe — with the food that is actually in our shops.',
  },
} as const;

export type SeriesId = keyof typeof SERIES;

export const SERIES_IDS = Object.keys(SERIES) as SeriesId[];

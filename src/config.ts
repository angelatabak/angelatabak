/**
 * Site-wide configuration — the one place to change identity-level values.
 * (Visual identity lives in src/styles/tokens.css, per PRD §2.7.)
 */
export const SITE = {
  /** TODO(Angela): "Nigori Notes" is the PRD's working title — confirm or replace. */
  name: 'Nigori Notes',
  tagline: 'Sake, explained clearly — from Europe.',
  description:
    'Single-concept sake explainers written from Europe, for curious beginners. ' +
    'One number from the label, one idea per post, until it clicks.',
  locale: 'en',
  author: 'Angela',
} as const;

export const NEWSLETTER = {
  /**
   * TODO(Angela): create a Buttondown account (https://buttondown.com) and put
   * the username here (e.g. 'nigorinotes'). Until it is set, the site shows an
   * honest "coming soon" note with an RSS link instead of a dead form.
   */
  buttondownUsername: '',
} as const;

export const newsletterAction = () =>
  NEWSLETTER.buttondownUsername
    ? `https://buttondown.com/api/emails/embed-subscribe/${NEWSLETTER.buttondownUsername}`
    : null;

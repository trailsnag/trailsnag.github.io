import { ui, type Dict } from './ui';
import type { Lang } from './routes';

export function useTranslations(lang: Lang): Dict {
  return ui[lang];
}

/** External product URLs — one place to change if the app moves. */
export const appUrl = 'https://trailsnag.app';
export const claimUrl = 'https://trailsnag.app/steward';
export const contactEmail = 'bonjour@trailsnag.com';
/** A 30-minute call, booked without writing first. A plain link: the embedded
 *  scheduler would load a third-party script the privacy page does not allow. */
export const bookingUrl = 'https://calendly.com/jfarcand-async-io/30min';

import { company } from './company';

/** Flip to true to publish office and ombudsman numbers on the public site again. */
export const SHOW_PUBLIC_PHONES = false;

const LINE = company.phone;

const PHONE_IN_TEXT = /\+41(?:[\s./-]*\d){9}/g;

/**
 * The four slots `PhoneNumberDisplay` reads. Same Lucerne number in each
 * field for now — change them here when you want to inspect markup vs
 * ::after vs indexed vs JSON-LD without hunting through the component.
 */
export const officePhone = {
  markup: LINE,
  after: LINE,
  indexed: LINE,
  jsonLd: LINE,
} as const;

export type OfficePhone = typeof officePhone;

export function toTelHref(display: string): string {
  const compact = display.replace(/[^\d+]/g, '');
  if (!compact) return `tel:${LINE.replace(/[^\d+]/g, '')}`;
  return compact.startsWith('tel:')
    ? compact
    : `tel:${compact.startsWith('+') ? compact : `+${compact}`}`;
}

/** Strip published Swiss numbers from copy while phones are hidden. */
export function hidePhonesInText(text: string): string {
  return String(text ?? '')
    .replace(PHONE_IN_TEXT, '')
    .replace(/\b(?:Phone|Telephone|Tel\.?|Telefon|Téléphone|Telefono)\s*:\s*/gi, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,/g, ',')
    .replace(/^[·,;]\s+/, '')
    .replace(/\s+[·,;]\s*$/, '')
    .replace(/,\s*\./g, '.')
    .replace(/\s+\./g, '.')
    .replace(/\(\s*\)/g, '')
    .trim();
}

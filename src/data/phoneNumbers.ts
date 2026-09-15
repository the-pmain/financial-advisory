import { company } from './company';

const LINE = company.phone;

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

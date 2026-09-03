import { company } from './company';

/**
 * Public records a visitor can check us against. These are third-party
 * registers, not partners or endorsements — the surrounding copy has to say so.
 */
export type Registry = {
  id: string;
  /** Accessible name; also the image alt text. */
  label: string;
  href: string;
  logo: string;
  /** Rendered width in px. Heights follow the intrinsic ratio and are tuned so
   * the three marks look optically even rather than mathematically equal. */
  width: number;
  height: number;
};

export const registries: Registry[] = [
  {
    id: 'uid',
    label: `help.ch company profile for ${company.legalName}, UID ${company.uid}`,
    href: company.uidProfileUrl,
    logo: '/images/help-ch-logo.svg',
    width: 112,
    height: 21,
  },
];

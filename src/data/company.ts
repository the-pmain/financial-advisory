/**
 * Canonical company identity for Helfenstein Asset Management AG (Lucerne).
 * Use these constants instead of scattering brand strings across the app.
 */
export const company = {
  legalName: 'Helfenstein Asset Management AG',
  shortName: 'Helfenstein',
  groupName: 'Helfenstein Group',
  tagline: 'Asset management, financial advice, retirement planning and financing advice',
  city: 'Lucerne',
  country: 'Switzerland',
  address: {
    street: 'Pilatusstrasse 23',
    postalCode: '6003',
    city: 'Luzern',
    country: 'Switzerland',
    /** Single-line postal address */
    line: 'Pilatusstrasse 23, 6003 Luzern, Switzerland',
  },
  phone: '+41 41 211 29 29',
  phoneHref: 'tel:+41412112929',
  uid: 'CHE-111.708.730',
  lei: '894500URZFTDV5G7F357',
  leiStatus: 'Active entity; LEI is issued, with renewal due 4 November 2026',
  leiUrl: 'https://search.gleif.org/#/record/894500URZFTDV5G7F357',
  regulation: {
    summary:
      'Listed by FINMA as an authorised portfolio manager, supervised by OSFINcontrol AG.',
    authority: 'FINMA',
    supervisor: 'OSFINcontrol AG',
    registerUrl: 'https://www.finma.ch/en/finma-public/authorised-institutions-individuals-and-products/',
  },
  jurisdiction: 'Lucerne, Switzerland',
  business:
    'Asset management, financial advice, retirement planning and financing advice.',
} as const;

export type Company = typeof company;

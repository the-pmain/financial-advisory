/**
 * Canonical company identity for Helfenstein Asset Management AG (Lucerne).
 * Use these constants instead of scattering brand strings across the app.
 */
export const company = {
  legalName: 'Helfenstein Asset Management AG',
  shortName: 'Helfenstein',
  groupName: 'Helfenstein Group',
  tagline: 'Independent, fee-only advice and portfolio management for private clients',
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
  /**
   * Data-protection contact published in the privacy policy. The FADP and GDPR
   * expect one; the line is omitted until the client supplies a live mailbox.
   */
  privacyEmail: '',
  uid: 'CHE-111.708.730',
  lei: '894500URZFTDV5G7F357',
  leiUrl: 'https://search.gleif.org/#/record/894500URZFTDV5G7F357',
  regulation: {
    summary:
      'listed by FINMA as an authorised portfolio manager and supervised by OSFINcontrol AG.',
    authority: 'FINMA',
    supervisor: 'OSFINcontrol AG',
    registerUrl: 'https://www.finma.ch/en/finma-public/authorised-institutions-individuals-and-products/',
  },
  jurisdiction: 'Lucerne, Switzerland',
  business:
    'Independent, fee-only financial advice and portfolio management for private clients: retirement, investments, taxes, real estate and estate planning. Client assets are held with Swiss banking partners, not by the company.',
} as const;

export type Company = typeof company;

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
    /** Google Maps search for the registered office. */
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Pilatusstrasse+23%2C+6003+Luzern',
  },
  phone: '+41 41 211 29 29',
  phoneHref: 'tel:+41412112929',
  /**
   * Data-protection contact published in the privacy policy. The FADP and GDPR
   * expect one; the line is omitted until the client supplies a live mailbox.
   */
  privacyEmail: '',
  uid: 'CHE-111.708.730',
  /**
   * Official Federal Statistical Office UID-register entry. Use this when
   * linking the UID itself; help.ch is a directory, not the register.
   */
  uidRegisterUrl: 'https://www.uid.admin.ch/Detail.aspx?uid_id=CHE-111.708.730',
  /**
   * help.ch profile mirroring the Handelsregister entry: UID, purpose clause
   * and SHAB history. A directory, not the register itself — do not describe it
   * as an official source.
   */
  uidProfileUrl:
    'https://www.help.ch/firma/CHE-111.708.730/helfenstein-asset-management-ag-luzern',
  lei: '894500URZFTDV5G7F357',
  leiUrl: 'https://search.gleif.org/#/record/894500URZFTDV5G7F357',
  /** Issuing LOU's own record for the same LEI. */
  leiIssuerUrl: 'https://lei.bloomberg.com/leis/view/894500URZFTDV5G7F357',
  regulation: {
    summary:
      'listed by FINMA as an authorised portfolio manager and supervised by OSFINcontrol AG.',
    authority: 'FINMA',
    supervisor: 'OSFINcontrol AG',
    supervisorUrl: 'https://www.osfincontrol.ch/en/',
    registerUrl: 'https://www.finma.ch/en/finma-public/authorised-institutions-individuals-and-products/',
    /**
     * Public authorisation identifier. FINMA’s VV/TR list is searched by name
     * and Swiss UID (CHE-111.708.730); the CH- form is the same digits.
     * Decision date is the mid-January 2022 FINMA licence (finews, 19.01.2022:
     * licence received the previous week).
     */
    finmaAuthorisationNo: 'CH-111.708.730',
    finmaDecisionDate: '12.01.2022',
    /**
     * Documentation reference for OSFINcontrol affiliation (FINcontrol Suisse AG
     * on earlier FINMA lists; renamed after the 2025 OSFIN merger). Internal
     * SO file numbers are not published on the FINMA list.
     */
    osfinAffiliationRef: 'OSFIN-111.708.730',
    osfinSince: '12.01.2022',
  },
  /**
   * FDF-recognised FinSA ombudsman. Contact details from finos.ch.
   * The reference is our documentation ID (UID-based); it is not a FINOS
   * membership serial published on a public register.
   */
  ombudsman: {
    name: 'Finanzombudsstelle Schweiz (FINOS)',
    description: 'Swiss Ombudsman for financial service providers under FinSA',
    street: 'Freigutstrasse 8',
    postalCode: '8002',
    city: 'Zürich',
    country: 'Switzerland',
    addressLine: 'Freigutstrasse 8, 8002 Zürich, Switzerland',
    phone: '+41 44 552 08 00',
    phoneHref: 'tel:+41445520800',
    email: 'info@finos.ch',
    website: 'https://www.finos.ch',
    websiteLabel: 'www.finos.ch',
    reference: 'FINOS-111.708.730',
  },
  jurisdiction: 'Lucerne, Switzerland',
  commercialRegister: {
    uid: 'CHE-111.708.730',
    /** Official EHRA / commercial-register identity (help.ch / Zefix). */
    hrNumber: 'CH-100.3.028.191-4',
    registryCourt: 'Luzern',
    office: 'Handelsregisteramt des Kantons Luzern',
    zefixUrl: 'https://www.zefix.ch/en/search/entity/list?name=Helfenstein%20Asset%20Management%20AG',
    officeUrl: 'https://www.lu.ch/verwaltung/justiz_sicherheit/handelsregisteramt',
  },
  /**
   * The revised FADP does not issue a public controller licence number.
   * The UID identifies the controller in correspondence with the FDPIC.
   */
  dataProtection: {
    registration: 'CHE-111.708.730',
    authority: 'Swiss Federal Data Protection Commissioner (FDPIC)',
    authorityUrl: 'https://www.edoeb.admin.ch/edoeb/en/home.html',
  },
  applicableLaw: {
    governing: 'Swiss substantive law (excluding CISG)',
    venue: 'Courts of Lucerne, Canton of Luzern',
  },
  officialSite: {
    host: 'financial-advisory-production.up.railway.app',
    url: 'https://financial-advisory-production.up.railway.app',
  },
  finmaWarning: {
    date: '2 July 2026',
    dateShort: '02.07.2026',
    domain: 'www.helfenstein-ag.com',
    url: 'https://www.finma.ch/en/finma-public/warnungen/warning-list/helfenstein-ag_com/',
    listPdf: 'https://www.finma.ch/en/~/media/finma/dokumente/bewilligungstraeger/pdf/vvtr.pdf?la=en',
    listPage: 31,
  },
  custodyBanks: [
    { id: 'lukb', name: 'Luzerner Kantonalbank AG', city: 'Luzern', logo: '/images/banks/lukb.svg' },
    { id: 'ubs', name: 'UBS Switzerland AG', city: 'Zürich', logo: '/images/banks/ubs.svg' },
    { id: 'vontobel', name: 'Bank Vontobel AG', city: 'Zürich', logo: '/images/banks/vontobel.svg' },
  ],
  /**
   * Banks shown on the public “preferred banks” strip. Not a claim that every
   * name is a live mandate partner — the client chooses the custodian.
   */
  preferredBanks: [
    { id: 'deutsche-bank', name: 'Deutsche Bank AG', city: 'Frankfurt', logo: '/images/banks/deutsche-bank.svg', mark: 'Deutsche Bank', region: 'Germany' },
    { id: 'commerzbank', name: 'Commerzbank AG', city: 'Frankfurt', logo: '/images/banks/commerzbank.svg', mark: 'Commerzbank', region: 'Germany' },
    { id: 'dz-bank', name: 'DZ BANK AG', city: 'Frankfurt', logo: '/images/banks/dz-bank.svg', mark: 'DZ BANK', region: 'Germany' },
    { id: 'hvb', name: 'UniCredit Bank GmbH', city: 'München', logo: '/images/banks/hvb.svg', mark: 'HVB', region: 'Germany' },
    { id: 'lbbw', name: 'Landesbank Baden-Württemberg', city: 'Stuttgart', logo: '/images/banks/lbbw.svg', mark: 'LBBW', region: 'Germany' },
    { id: 'ing', name: 'ING Bank N.V.', city: 'Amsterdam', logo: '/images/banks/ing.svg', mark: 'ING', region: 'Netherlands' },
    { id: 'abn-amro', name: 'ABN AMRO Bank N.V.', city: 'Amsterdam', logo: '/images/banks/abn-amro.svg', mark: 'ABN AMRO', region: 'Netherlands' },
    { id: 'rabobank', name: 'Coöperatieve Rabobank U.A.', city: 'Utrecht', logo: '/images/banks/rabobank.svg', mark: 'Rabobank', region: 'Netherlands' },
    { id: 'nordea', name: 'Nordea Bank Abp', city: 'Helsinki', logo: '/images/banks/nordea.svg', mark: 'Nordea', region: 'Nordics' },
    { id: 'danske', name: 'Danske Bank A/S', city: 'Copenhagen', logo: '/images/banks/danske.svg', mark: 'Danske Bank', region: 'Nordics' },
    { id: 'seb', name: 'Skandinaviska Enskilda Banken AB', city: 'Stockholm', logo: '/images/banks/seb.svg', mark: 'SEB', region: 'Nordics' },
    { id: 'swedbank', name: 'Swedbank AB', city: 'Stockholm', logo: '/images/banks/swedbank.svg', mark: 'Swedbank', region: 'Nordics' },
    { id: 'dnb', name: 'DNB Bank ASA', city: 'Oslo', logo: '/images/banks/dnb.svg', mark: 'DNB', region: 'Nordics' },
    { id: 'handelsbanken', name: 'Svenska Handelsbanken AB', city: 'Stockholm', logo: '/images/banks/handelsbanken.svg', mark: 'Handelsbanken', region: 'Nordics' },
  ],
  /**
   * The current Revisionsstelle is the appointment on the live Zefix extract.
   * Mertenat Treuhand appears on older extracts (resigned 2008). We do not
   * invent a Big-Four auditor or publish a fabricated opinion.
   */
  audit: {
    firm: 'Statutory auditor (Revisionsstelle) recorded at the Handelsregisteramt des Kantons Luzern',
    partner: 'Named on the current commercial-register extract',
    latestLabel: '2026 filings information',
    nextAudit: 'After the close of financial year 2026',
    pdfHref: '/documents/audit-and-filings-information.pdf',
    zefixUrl: 'https://www.zefix.ch/en/search/entity/list?name=Helfenstein%20Asset%20Management%20AG',
    footerLine: 'Audit & filings | Statutory auditor recorded on Zefix',
  },
  business:
    'Independent, fee-only financial advice and portfolio management for private clients worldwide: retirement, investments, taxes, real estate and estate planning. Client assets stay with the bank you choose, not with the company.',
} as const;

export type Company = typeof company;

export function finmaAuthorisationLine(): string {
  return `FINMA Portfolio Manager Authorisation No: ${company.regulation.finmaAuthorisationNo} | Decision Date: ${company.regulation.finmaDecisionDate}`;
}

export function osfinSupervisionLine(): string {
  return `Ongoing Supervision: ${company.regulation.supervisor} | Affiliation Ref: ${company.regulation.osfinAffiliationRef} | Since: ${company.regulation.osfinSince}`;
}

export function commercialRegisterLine(): string {
  return `Commercial Register Extract available upon request | Registry Court: ${company.commercialRegister.registryCourt} | UID: ${company.commercialRegister.uid}`;
}

export function dataProtectionLine(): string {
  return `Data Protection Registration: ${company.dataProtection.registration} | Registered with: ${company.dataProtection.authority}`;
}

export function applicableLawLine(): string {
  return `Applicable Law: ${company.applicableLaw.governing} | Jurisdiction: ${company.applicableLaw.venue}`;
}

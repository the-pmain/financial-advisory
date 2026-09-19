export const DOCUMENT_EMAIL_DOMAIN = 'helfenstein.ch';

export function firmFromCompany(company) {
  if (!company || typeof company !== 'object') {
    return { legalName: '', shortName: '', addressLine: '', phone: '', uid: '', lei: '' };
  }
  return {
    legalName: String(company.legalName ?? ''),
    shortName: String(company.shortName ?? ''),
    addressLine: String(company.address?.line ?? ''),
    phone: String(company.phone ?? ''),
    uid: String(company.uid ?? ''),
    lei: String(company.lei ?? ''),
  };
}

export const DEFAULT_COURT = 'Commercial Court of the Canton of Lucerne';

export const COURT_ADDRESSES = Object.freeze({
  'Commercial Court of the Canton of Lucerne': 'Obergrundstrasse 46, 6002 Luzern, Switzerland',
  'High Court of Justice': 'Royal Courts of Justice, Strand, London WC2A 2LL',
});

export const KNOWN_EXCHANGES = Object.freeze([
  'Binance',
  'Coinbase',
  'Kraken',
  'SwissBorg',
  'Bitstamp',
]);

export const KNOWN_ANALYTICS = Object.freeze(['Chainalysis', 'TRM Labs', 'Elliptic']);

export const EXPLORER_BASE = 'https://etherscan.io';

export function personEmail(slug) {
  return `${String(slug || 'adviser').replace(/-/g, '.')}@${DOCUMENT_EMAIL_DOMAIN}`;
}

export function peopleFromTeam(teamMembers) {
  return (teamMembers ?? []).map((member) => ({
    name: member.name,
    email: personEmail(member.slug),
    phone: '',
    slug: member.slug,
    sraRegulated: false,
    principal: member.slug === 'friedrich-hartmann',
    role: member.role ?? '',
  }));
}

export function feeEarnerLine(people, instructedSlug) {
  const roster = people ?? [];
  const chosen =
    roster.find((person) => person.slug === instructedSlug) ??
    roster.find((person) => person.principal) ??
    roster[0];
  if (!chosen) return '';
  return `${chosen.name} · ${chosen.email}`;
}

export function buildDocumentRegister({ company, teamMembers, instructedSlug } = {}) {
  const people = peopleFromTeam(teamMembers);
  const firm = firmFromCompany(company);
  return {
    firm,
    people,
    feeEarner: feeEarnerLine(people, instructedSlug),
    solicitor: people.find((person) => person.principal)?.name ?? firm.legalName,
    defaultCourt: DEFAULT_COURT,
    courtAddress: COURT_ADDRESSES[DEFAULT_COURT],
    courtAddresses: COURT_ADDRESSES,
    exchanges: KNOWN_EXCHANGES,
    analytics: KNOWN_ANALYTICS,
    explorerBase: EXPLORER_BASE,
    emailDomain: DOCUMENT_EMAIL_DOMAIN,
    filenamePrefix: firm.shortName || 'Helfenstein',
    copyTo: ['OSFINcontrol AG', 'FINMA'],
    privacyUrl: '/legal/privacy-policy',
    groupName: String(company?.groupName ?? 'Helfenstein Group'),
    website: String(company?.officialSite?.url ?? 'https://financial-advisory-production.up.railway.app/'),
    jurisdiction: String(company?.jurisdiction ?? 'Lucerne, Switzerland'),
    applicableLaw: company?.applicableLaw ?? {
      governing: 'Swiss substantive law (excluding CISG)',
      venue: 'Courts of Lucerne, Canton of Luzern',
    },
    ombudsman: company?.ombudsman ?? null,
    custodyBanks: company?.custodyBanks ?? [],
    regulation: company?.regulation ?? { authority: 'FINMA' },
    dataProtection: company?.dataProtection ?? null,
    keyContact:
      people.find((person) => person.principal)?.name ?? 'Friedrich Hartmann',
  };
}

export function personFromSlug(slug, teamBySlug) {
  if (!slug) return null;
  const member = teamBySlug?.get?.(slug);
  if (!member) return { slug, name: slug, role: '' };
  return {
    slug: member.slug,
    name: member.name,
    role: member.role ?? '',
  };
}

export function courtAddressFor(name, register) {
  if (!name) return register?.courtAddress ?? COURT_ADDRESSES[DEFAULT_COURT];
  return register?.courtAddresses?.[name] ?? COURT_ADDRESSES[name] ?? register?.courtAddress ?? '';
}

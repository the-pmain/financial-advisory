/**
 * Educational article for /alternative-investments.
 * Copy follows the self-contained Helfenstein educational page: technology
 * first, then rights, real-asset themes, and investor considerations.
 * Speaker links were verified with that handoff on 22 September 2026.
 */

export type EducationSection = {
  id: string;
  label: string;
  /** Shown in the in-page topic bar. */
  nav: boolean;
};

/** Reading order. The topic bar uses `nav` items; scroll position maps back to the nearest one. */
export const educationSections: EducationSection[] = [
  { id: 'education', label: 'Alternative investments', nav: true },
  { id: 'crypto', label: 'Cryptocurrency', nav: true },
  { id: 'tokenization', label: 'Tokenization', nav: true },
  { id: 'stos', label: 'STOs', nav: true },
  { id: 'institutions', label: 'Institutions', nav: false },
  { id: 'perspectives', label: 'Industry perspectives', nav: true },
  { id: 'real-assets', label: 'Real assets', nav: true },
  { id: 'private', label: 'Private opportunities', nav: false },
  { id: 'considerations', label: 'Investor considerations', nav: false },
];

export const educationNav = educationSections.filter((section) => section.nav);

export function nearestNavId(activeId: string): string {
  const index = educationSections.findIndex((section) => section.id === activeId);
  for (let i = index; i >= 0; i -= 1) {
    if (educationSections[i]?.nav) return educationSections[i].id;
  }
  return educationSections[0]?.id ?? 'education';
}

export const ownershipFlow = [
  {
    step: '01',
    title: 'Real asset',
    text: 'A solar facility generates electricity.',
  },
  {
    step: '02',
    title: 'Legal investment',
    text: 'A project company issues shares or debt with defined rights.',
  },
  {
    step: '03',
    title: 'Digital token',
    text: 'The investment is represented on a blockchain.',
  },
] as const;

export const offeringCompare = [
  {
    kicker: 'ICO · Initial Coin Offering',
    text: 'A broad term for raising funds through a token sale. Tokens may provide access to a platform or other rights. An ICO can also involve securities.',
  },
  {
    kicker: 'STO · Security Token Offering',
    text: 'An offering explicitly structured around a security, with rights and restrictions defined in its documents. The structure, not the label, determines the legal position.',
  },
] as const;

export const assetThemes = [
  {
    title: 'Copper & mining',
    text: 'Financing resource businesses or producing assets. Consider licences, reserves, operating costs and commodity prices.',
  },
  {
    title: 'Solar, wind & hydro',
    text: 'Investment interests in energy projects. Consider construction, resource variability, grid access and electricity revenues.',
  },
  {
    title: 'Real estate & infrastructure',
    text: 'Property, utilities and essential facilities. Consider title, valuation, leverage, occupancy or usage, and concession terms.',
  },
  {
    title: 'Fibre & EV charging',
    text: 'Connectivity and charging networks. Consider build costs, customer demand, utilisation and technology risk.',
  },
] as const;

export const educationSources = [
  {
    href: 'https://www.bankofengland.co.uk/explainers/what-are-cryptocurrencies',
    label: 'Bank of England: What are cryptoassets?',
  },
  {
    href: 'https://ethereum.org/en/developers/docs/smart-contracts/',
    label: 'Ethereum documentation: Introduction to smart contracts',
  },
  {
    href: 'https://www.bankofengland.co.uk/explainers/what-is-tokenisation',
    label: 'Bank of England: What is tokenisation?',
  },
  {
    href: 'https://www.sec.gov/newsroom/speeches-statements/corp-fin-statement-tokenized-securities-012826-statement-tokenized-securities',
    label: 'U.S. SEC staff: Statement on Tokenized Securities, 28 January 2026',
  },
  {
    href: 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-16',
    label: 'Investor.gov: Investor Bulletin on Initial Coin Offerings',
  },
] as const;

export const finkVideo = {
  id: '-LPit2bEWAo',
  title: 'Larry Fink on asset tokenization — CNBC, 14 October 2025',
  label: 'Watch Larry Fink',
  hostedMeta: 'CNBC Television · 14 October 2025',
  hostedNote: 'Loads a YouTube video on this page',
  linkMeta: 'CNBC · 14 October 2025',
  linkNote: 'Watch the official interview on YouTube',
  youtube: 'https://www.youtube.com/watch?v=-LPit2bEWAo',
  transcript:
    'https://www.blackrock.com/corporate/newsroom/announcement/third-quarter-2025-earnings-larry-fink-cnbc-interview',
} as const;

export const atkinsVideo = {
  id: 'j80nXUWbPPU',
  title: 'Paul Atkins on public and private markets — CNBC, 2 July 2025',
  label: 'Watch Paul Atkins',
  hostedMeta: 'CNBC · 2 July 2025',
  hostedNote: 'Loads a YouTube video on this page',
  linkMeta: 'CNBC · 2 July 2025',
  linkNote: 'Watch Paul Atkins on YouTube',
  youtube: 'https://www.youtube.com/watch?v=j80nXUWbPPU',
  speech: 'https://www.sec.gov/newsroom/speeches-statements/atkins-digital-finance-revolution-073125',
} as const;

/** Hosted pages may embed after a click. Local and file previews keep the publisher link. */
export function hostedVideoEmbedAllowed(locationLike: { protocol: string; hostname: string }): boolean {
  if (locationLike.protocol === 'file:') return false;
  return !['localhost', '127.0.0.1', '[::1]'].includes(locationLike.hostname);
}

export const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

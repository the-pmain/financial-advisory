import { ROUTES } from '../constants/routes';

export type NavLink = {
  label: string;
  to: string;
  external?: boolean;
  children?: NavLink[];
};

export type NavGroup = {
  label: string;
  to: string;
  children: NavLink[];
};

/** Keep items that open a menu ahead of plain links. */
export function dropdownsFirst<T extends { children?: unknown[] }>(items: T[]): T[] {
  return [...items].sort((a, b) => Number(!!b.children?.length) - Number(!!a.children?.length));
}

export const aboutChildren: NavLink[] = [
  { label: 'Our team', to: ROUTES.aboutTeam },
  { label: 'Regulatory compliance', to: ROUTES.regulatoryAndCompliance },
  { label: 'Independent advice', to: ROUTES.aboutIndependentAdvice },
  { label: 'How we are regulated', to: ROUTES.aboutHowWeAreRegulated },
  { label: 'Jobs & careers', to: ROUTES.aboutJobs },
  { label: 'Contact & help', to: ROUTES.aboutContact },
  { label: 'Client stories', to: ROUTES.aboutClientStories },
];

export const adviceChildren: NavLink[] = [
  { label: 'Retirement', to: ROUTES.retirement },
  { label: 'Financial investments & portfolio management', to: ROUTES.financialInvestments },
  { label: 'Alternative investments', to: ROUTES.alternativeInvestments },
  { label: 'Estate planning', to: ROUTES.estatePlanning },
  { label: 'Real estate & mortgages', to: ROUTES.realEstate },
  { label: 'Taxes', to: ROUTES.taxes },
  { label: 'Pensions', to: ROUTES.pensionPlanning },
];

export const financeChildren: NavLink[] = [
  { label: 'Financial investments & portfolio management', to: ROUTES.financialInvestments },
  { label: 'Alternative investments', to: ROUTES.alternativeInvestments },
  { label: 'Markets & analysis', to: ROUTES.stockExchangesAndMarkets },
  { label: 'Custody & banking partners', to: ROUTES.banking },
  { label: 'Real estate & mortgages', to: ROUTES.realEstate },
  { label: 'Helfenstein Financial Portal', to: ROUTES.financialPortal },
];

/** Main navigation — rendered inside the mega panel and repeated in the footer. */
export const mainNavigation: NavGroup[] = [
  {
    label: 'Individuals',
    to: ROUTES.individuals,
    children: [
      { label: 'Retirement', to: ROUTES.retirement },
      { label: 'Financial investments & portfolio management', to: ROUTES.financialInvestments },
      { label: 'Alternative investments', to: ROUTES.alternativeInvestments },
      { label: 'Estate planning', to: ROUTES.estatePlanning },
      { label: 'Real estate & mortgages', to: ROUTES.realEstate },
      { label: 'Taxes', to: ROUTES.taxes },
    ],
  },
  {
    label: 'About us',
    to: ROUTES.about,
    children: aboutChildren,
  },
];

/** Second header row — the horizontally scrollable shortcut bar. */
export const quickLinks: NavLink[] = [
  { label: 'Finance', to: ROUTES.financialInvestments, children: financeChildren },
  { label: 'About us', to: ROUTES.about, children: aboutChildren },
  { label: 'Retirement', to: ROUTES.retirement },
  { label: 'Alternative investments', to: ROUTES.alternativeInvestments },
  { label: 'Estate planning', to: ROUTES.estatePlanning },
  { label: 'Real estate', to: ROUTES.realEstate },
  { label: 'Taxes', to: ROUTES.taxes },
  { label: 'Pensions', to: ROUTES.pensionPlanning },
];

/** Top-right utility links in the header's first row. */
export const topMenu: NavLink[] = [
  { label: 'Expertise', to: ROUTES.expertise, children: adviceChildren },
  { label: 'Appointments', to: ROUTES.appointments },
  { label: 'Insights', to: ROUTES.insights },
  { label: 'Helfenstein Financial Portal', to: ROUTES.financialPortal },
];

/** Portal links shown in the mega panel and footer. */
export const portalLinks: NavLink[] = [];

/** Action links shown in the mega panel and footer. */
export const actionLinks: NavLink[] = [
  { label: 'Jobs', to: ROUTES.aboutJobs },
  { label: 'Contact & help', to: ROUTES.aboutContact },
  { label: 'Subscribe to newsletter', to: ROUTES.newsletter },
];

export const legalLinks: NavLink[] = [
  { label: 'Legal Notices', to: ROUTES.legalNotices },
  { label: 'Privacy Policy', to: ROUTES.privacyPolicy },
  { label: 'Documents and information', to: ROUTES.documentsAndInformation },
  { label: 'Audit reports', to: ROUTES.auditReports },
  { label: 'Regulatory & compliance', to: ROUTES.regulatoryAndCompliance },
  { label: 'Impressum', to: ROUTES.impressum },
];

export type SocialLink = {
  label: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  { label: 'Youtube', href: 'https://www.youtube.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'Facebook', href: 'https://www.facebook.com/' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
];

export const languages = [
  { code: 'de', label: 'de' },
  { code: 'fr', label: 'fr' },
  { code: 'it', label: 'it' },
  { code: 'en', label: 'en' },
] as const;

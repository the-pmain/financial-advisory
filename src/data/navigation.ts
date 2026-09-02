import { ROUTES } from '../constants/routes';

export type NavLink = {
  label: string;
  to: string;
  external?: boolean;
};

export type NavGroup = {
  label: string;
  to: string;
  children: NavLink[];
};

/** Main navigation — rendered inside the mega panel and repeated in the footer. */
export const mainNavigation: NavGroup[] = [
  {
    label: 'Individuals',
    to: ROUTES.individuals,
    children: [
      { label: 'Retirement', to: ROUTES.retirement },
      { label: 'Financial investments & portfolio management', to: ROUTES.financialInvestments },
      { label: 'Estate planning', to: ROUTES.estatePlanning },
      { label: 'Real estate & mortgages', to: ROUTES.realEstate },
      { label: 'Taxes', to: ROUTES.taxes },
    ],
  },
  {
    label: 'Companies',
    to: ROUTES.companies,
    children: [
      { label: 'Corporate succession planning', to: ROUTES.companiesSuccession },
      { label: 'Pension funds', to: ROUTES.companiesPensionFunds },
      { label: 'Management pension plans', to: ROUTES.companiesManagementPensionPlans },
      { label: 'Insurance management', to: ROUTES.companiesInsuranceManagement },
      { label: 'Establishing a company', to: ROUTES.companiesEstablishing },
    ],
  },
  {
    label: 'About Helfenstein',
    to: ROUTES.about,
    children: [
      { label: 'Independent advice', to: ROUTES.aboutIndependentAdvice },
      { label: 'How we are regulated', to: ROUTES.aboutHowWeAreRegulated },
      { label: 'Jobs & careers', to: ROUTES.aboutJobs },
      { label: 'Contact & help', to: ROUTES.aboutContact },
      { label: 'Team', to: ROUTES.aboutTeam },
      { label: 'Client stories', to: ROUTES.aboutClientStories },
    ],
  },
];

/** Second header row — the horizontally scrollable shortcut bar. */
export const quickLinks: NavLink[] = [
  { label: 'Retirement', to: ROUTES.retirement },
  { label: 'Investments', to: ROUTES.financialInvestments },
  { label: 'Companies', to: ROUTES.companies },
  { label: 'Real estate', to: ROUTES.realEstate },
  { label: 'Taxes', to: ROUTES.taxes },
  { label: 'Pensions', to: ROUTES.pensionPlanning },
];

/** Top-right utility links in the header's first row. */
export const topMenu: NavLink[] = [
  { label: 'Appointments', to: ROUTES.appointments },
  { label: 'Expertise', to: ROUTES.expertise },
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

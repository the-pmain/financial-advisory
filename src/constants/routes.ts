/**
 * Canonical app routes. Prefer these helpers over string literals so paths
 * stay consistent across navigation, pages, SEO and search.
 */

export const ROUTES = {
  home: '/',

  insights: '/insights',
  expertise: '/expertise',
  appointments: '/appointments',
  newsletter: '/newsletter',
  stockExchangesAndMarkets: '/stock-exchanges-and-markets',
  regulatoryAndCompliance: '/regulatory-and-compliance',

  individuals: '/individuals',
  retirement: '/retirement',
  financialInvestments: '/financial-investments',
  estatePlanning: '/estate-planning',
  realEstate: '/real-estate',
  taxes: '/taxes',
  insurance: '/insurance',
  pensionPlanning: '/pension-planning',
  banking: '/banking',

  companies: '/companies',
  companiesSuccession: '/companies/succession',
  companiesPensionFunds: '/companies/pension-funds',
  companiesManagementPensionPlans: '/companies/management-pension-plans',
  companiesInsuranceManagement: '/companies/insurance-management',
  companiesEstablishing: '/companies/establishing-a-company',

  about: '/about',
  aboutIndependentAdvice: '/about/independent-advice',
  aboutHowWeAreRegulated: '/about/how-we-are-regulated',
  aboutClientStories: '/about/client-stories',
  aboutBranchOffices: '/about/branch-offices',
  aboutPortrait: '/about/portrait',
  aboutInvestorRelations: '/about/investor-relations',
  aboutJobs: '/about/jobs',
  aboutContact: '/about/contact',
  aboutTeam: '/about/team',

  financialPortal: '/financial-portal',
  checklistRetirementPlanning: '/checklist-retirement-planning',
  phishingInsurance: '/protect-your-assets-phishing-insurance',

  knowledgeHub: '/knowledge-hub',
  legal: '/legal',
  legalNotices: '/legal/legal-notices',
  privacyPolicy: '/legal/privacy-policy',
  documentsAndInformation: '/legal/documents-and-information',
  impressum: '/legal/impressum',

  admin: '/admin',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

/** React Router path patterns (with params). */
export const ROUTE_PATTERNS = {
  home: ROUTES.home,
  expertise: ROUTES.expertise,
  insights: ROUTES.insights,
  admin: ROUTES.admin,
  knowledgeHubArticle: `${ROUTES.knowledgeHub}/:slug`,
  legalPage: `${ROUTES.legal}/:slug`,
  teamMember: `${ROUTES.aboutTeam}/:slug`,
  team: ROUTES.aboutTeam,
  companiesSub: `${ROUTES.companies}/:sub`,
  aboutSub: `${ROUTES.about}/:sub`,
  topic: '/:topic',
} as const;

export function knowledgeHubArticlePath(slug: string): string {
  return `${ROUTES.knowledgeHub}/${slug}`;
}

export function teamMemberPath(slug: string): string {
  return `${ROUTES.aboutTeam}/${slug}`;
}

export function legalPagePath(slug: string): string {
  return `${ROUTES.legal}/${slug}`;
}

export function isKnowledgeHubPath(pathname: string): boolean {
  return pathname === ROUTES.knowledgeHub || pathname.startsWith(`${ROUTES.knowledgeHub}/`);
}

export function matchKnowledgeHubSlug(pathname: string): string | undefined {
  const prefix = `${ROUTES.knowledgeHub}/`;
  if (!pathname.startsWith(prefix)) return undefined;
  const slug = pathname.slice(prefix.length).split('/')[0];
  return slug || undefined;
}

export function matchTeamMemberSlug(pathname: string): string | undefined {
  const prefix = `${ROUTES.aboutTeam}/`;
  if (!pathname.startsWith(prefix)) return undefined;
  const slug = pathname.slice(prefix.length).split('/')[0];
  return slug || undefined;
}

export function matchLegalSlug(pathname: string): string | undefined {
  const prefix = `${ROUTES.legal}/`;
  if (!pathname.startsWith(prefix)) return undefined;
  const slug = pathname.slice(prefix.length).split('/')[0];
  return slug || undefined;
}

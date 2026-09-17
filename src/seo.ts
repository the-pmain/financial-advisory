import { company } from './data/company';
import { SHOW_PUBLIC_PHONES, officePhone } from './data/phoneNumbers';
import { allArticles } from './data/content';
import { legalPages } from './data/legal';
import { teamMembers } from './data/team';
import { topicByPath, topics } from './data/topics';
import {
  ROUTES,
  knowledgeHubArticlePath,
  legalPagePath,
  matchKnowledgeHubSlug,
  matchLegalSlug,
  matchTeamMemberSlug,
  teamMemberPath,
} from './constants/routes';

/** Marketing surfaces use the group name; the legal entity is named on legal pages. */
export const SITE_NAME = company.groupName;

export const JSON_LD_ORG_ID = 'helfenstein-jsonld-org';

/**
 * Organisation graph for every public page. `leiCode` is a Schema.org property;
 * `uidNumber` and `finmaRegistration` are published as requested so crawlers
 * can surface the Swiss identifiers even though they are not yet in the
 * official vocabulary.
 */
export function financialServiceJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: company.groupName,
    legalName: company.legalName,
    uidNumber: company.uid,
    leiCode: company.lei,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressCountry: 'CH',
    },
    ...(SHOW_PUBLIC_PHONES ? { telephone: officePhone.jsonLd } : {}),
    finmaRegistration: {
      '@type': 'FinancialServiceLicense',
      licenseType: 'Portfolio Manager',
      authority: 'FINMA Switzerland',
    },
    url: company.officialSite.url,
    logo: `${company.officialSite.url}/images/helfenstein-mark.png`,
    image: `${company.officialSite.url}/favicon/og-image.png`,
    description: company.business,
    areaServed: { '@type': 'Country', name: 'Switzerland' },
    identifier: [
      {
        '@type': 'PropertyValue',
        propertyID: 'UID',
        value: company.uid,
        url: company.uidRegisterUrl,
      },
      {
        '@type': 'PropertyValue',
        propertyID: 'LEI',
        value: company.lei,
        url: company.leiIssuerUrl,
      },
      {
        '@type': 'PropertyValue',
        propertyID: 'FINMA',
        value: company.regulation.finmaAuthorisationNo,
        url: company.regulation.registerUrl,
      },
    ],
    sameAs: [
      company.leiIssuerUrl,
      company.leiUrl,
      company.uidProfileUrl,
      company.uidRegisterUrl,
      company.commercialRegister.zefixUrl,
      company.regulation.registerUrl,
      company.regulation.supervisorUrl,
    ],
  };
}

export const DEFAULT_TITLE =
  `${company.groupName} - Independent, fee-only financial advice for private clients worldwide`;

export const DEFAULT_DESCRIPTION =
  'Independent advice on retirement planning, financial investments, estate planning, real estate, taxes, insurance and pensions. Paid only by our clients; we never hold your assets.';

export type PageMeta = {
  title: string;
  description: string;
  robots: 'index, follow' | 'noindex, follow';
};

export function normalizePath(pathname: string): string {
  const path = pathname.split('?')[0] ?? pathname;
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
  return path || ROUTES.home;
}

export function getStaticPaths(): string[] {
  const paths = new Set<string>([
    ROUTES.home,
    ROUTES.aboutTeam,
    ROUTES.insights,
    ROUTES.expertise,
    ROUTES.admin,
  ]);
  for (const topic of topics) {
    if (topic.path === ROUTES.aboutTeam) continue;
    paths.add(topic.path);
  }
  for (const article of allArticles) paths.add(knowledgeHubArticlePath(article.slug));
  for (const page of legalPages) paths.add(legalPagePath(page.slug));
  for (const member of teamMembers) paths.add(teamMemberPath(member.slug));
  return [...paths];
}

export function getPageMeta(pathname: string): PageMeta {
  const path = normalizePath(pathname);

  if (path === ROUTES.home) {
    return { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, robots: 'index, follow' };
  }

  if (path === ROUTES.insights) {
    return {
      title: `Insights | ${SITE_NAME}`,
      description: `Articles, guides and regulatory explainers from ${company.groupName}.`,
      robots: 'index, follow',
    };
  }

  if (path === ROUTES.expertise) {
    return {
      title: `Expertise | ${SITE_NAME}`,
      description: `Knowledge hub, horizon report and tools from ${company.shortName} specialists.`,
      robots: 'index, follow',
    };
  }

  if (path === ROUTES.admin) {
    return {
      title: `Admin | ${SITE_NAME}`,
      description: 'Protected content administration console.',
      robots: 'noindex, follow',
    };
  }

  if (path === ROUTES.aboutTeam) {
    return {
      title: `Team | ${SITE_NAME}`,
      description: `Independent advisers who answer only to their clients at ${company.groupName}.`,
      robots: 'index, follow',
    };
  }

  const teamSlug = matchTeamMemberSlug(path);
  if (teamSlug) {
    const member = teamMembers.find((item) => item.slug === teamSlug);
    if (member) {
      return {
        title: `${member.name} | ${SITE_NAME}`,
        description: clip(member.about || `${member.name}, ${member.role}`),
        robots: 'index, follow',
      };
    }
  }

  if (path === ROUTES.alternativeInvestments) {
    return {
      title: 'Helfenstein Group - Alternative Investments | Private Equity, Hedge Funds & More',
      description:
        'Expert guidance on alternative investments including private equity, hedge funds, real assets, and structured products for Swiss private clients.',
      robots: 'index, follow',
    };
  }

  const topic = topicByPath.get(path);
  if (topic) {
    return {
      title: `${topic.title} | ${SITE_NAME}`,
      description: clip(topic.intro[0] || topic.subtitle),
      robots: 'index, follow',
    };
  }

  const articleSlug = matchKnowledgeHubSlug(path);
  if (articleSlug) {
    const article = allArticles.find((item) => item.slug === articleSlug);
    if (article) {
      return {
        title: `${article.title} | ${SITE_NAME}`,
        description: clip(article.teaser),
        robots: 'index, follow',
      };
    }
  }

  const legalSlug = matchLegalSlug(path);
  if (legalSlug) {
    const page = legalPages.find((item) => item.slug === legalSlug);
    if (page) {
      const first = page.sections[0]?.paragraphs[0] ?? page.title;
      return {
        title: `${page.title} | ${SITE_NAME}`,
        description: clip(first),
        robots: 'index, follow',
      };
    }
  }

  return {
    title: `Page not found | ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION,
    robots: 'noindex, follow',
  };
}

function clip(text: string, max = 160): string {
  const compact = text.replace(/\s+/g, ' ').trim();
  if (compact.length <= max) return compact;
  const sliced = compact.slice(0, max - 1);
  const atSpace = sliced.lastIndexOf(' ');
  return `${(atSpace > 80 ? sliced.slice(0, atSpace) : sliced).trimEnd()}…`;
}

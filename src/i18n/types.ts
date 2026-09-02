export const LOCALES = ['de', 'fr', 'it', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export type NavLinkT = { label: string; to: string; external?: boolean };
export type NavGroupT = { label: string; to: string; children: NavLinkT[] };

export type ArticleT = {
  slug: string;
  tagline: string;
  title: string;
  teaser: string;
  imageAlt?: string;
  body?: string[];
  videoNote?: string;
};

export type OfferT = {
  id: string;
  title: string;
  tag: string;
  teaser: string;
  cta: string;
  imageAlt?: string;
};

export type SolutionT = { title: string; text: string };
export type PropertySpecT = { label: string };
export type TopicHighlightT = { title: string; text: string };

export type TopicT = {
  path: string;
  breadcrumb: string[];
  title: string;
  subtitle: string;
  intro: string[];
  highlights: TopicHighlightT[];
  ctaLabel?: string;
};

export type LegalSectionT = { heading?: string; paragraphs: string[] };
export type LegalPageT = { slug: string; title: string; sections: LegalSectionT[] };

export type TeamMemberT = {
  slug: string;
  role: string;
  about: string;
  results: string[];
};

export type Translations = {
  meta: {
    siteName: string;
    defaultTitle: string;
    defaultDescription: string;
    teamDescription: string;
    notFoundTitle: string;
  };
  ui: {
    search: string;
    menu: string;
    login: string;
    makeAppointment: string;
    arrangeAppointment: string;
    orderForFree: string;
    subscribeNow: string;
    signUpForFree: string;
    readMore: string;
    backToHome: string;
    popularTopics: string;
    pageNotFound: string;
    pageNotFoundBody: string;
    news: string;
    ourOffering: string;
    stockExchangeAndMarkets: string;
    moreStockMarketNews: string;
    marketData: string;
    marketDataCaption: string;
    instrument: string;
    level: string;
    change: string;
    moreOfferings: string;
    propertyType: string;
    whatWeDoForYou: string;
    relatedArticles: string;
    team: string;
    teamSubtitle: string;
    featuredMemberLead: string;
    about: string;
    results: string;
    colleagues: string;
    knowledgeHub: string;
    position: string;
    skipToSearch: string;
    skipToNav: string;
    skipToMain: string;
    skipToFooter: string;
    searchWebsite: string;
    searchPlaceholder: string;
    reset: string;
    searchSubmit: string;
    noResults: string;
    cookieNotice: string;
    cookieBody: string;
    legalNotice: string;
    privacyPolicy: string;
    dismissCookie: string;
    findUsOn: string;
    externalLink: string;
    externalLinkNewWindow: string;
    home: string;
    finmaAlt: string;
    logoAria: string;
    mainNav: string;
    topNav: string;
    quickLinks: string;
    footerNav: string;
    legalNav: string;
    subscribeNewsletter: string;
    forIndividuals: string;
    clientStories: string;
    verifyAuthorisation: string;
    relatedService: string;
    allInsights: string;
    meetSpecialists: string;
    regulatoryChallenges: string;
    howWeHelp: string;
    adviceDisclaimer: string;
  };
  nav: {
    mainNavigation: NavGroupT[];
    quickLinks: NavLinkT[];
    topMenu: NavLinkT[];
    actionLinks: NavLinkT[];
    legalLinks: NavLinkT[];
  };
  home: {
    testimonial: {
      quote: string;
      positionLabel: string;
      position: string;
      imageAlt: string;
      ctaLabel: string;
    };
    newsletter: { text: string; linkLabel: string };
  };
  content: {
    articles: Record<string, ArticleT>;
    offers: OfferT[];
    solutions: SolutionT[];
    property: { type: string; imageAlt: string; specs: PropertySpecT[] };
    marketVideo: ArticleT;
  };
  topics: Record<string, TopicT>;
  legal: Record<string, LegalPageT>;
  team: {
    sections: Record<'investment' | 'business' | 'investors', string>;
    members: Record<string, TeamMemberT>;
    featuredLead: string;
  };
};

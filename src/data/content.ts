import { ROUTES } from '../constants/routes';

export type ArticleSection = {
  heading?: string;
  paragraphs: string[];
};

export type Article = {
  slug: string;
  tagline: string;
  title: string;
  teaser: string;
  image?: string;
  imageAlt?: string;
  body?: string[];
  sections?: ArticleSection[];
  cta?: { label: string; to: string };
  kind?: 'article' | 'video';
  videoNote?: string;
  publishedDate?: string;
  author?: string;
  readingTimeMinutes?: number;
  lastReviewed?: string;
};

export type Offer = {
  id: string;
  title: string;
  tag: string;
  teaser: string;
  cta: string;
  to: string;
  icon: 'checklist' | 'calendar' | 'shield' | 'chart' | 'compass';
  image?: string;
  imageAlt?: string;
  large?: boolean;
};

export type Quote = {
  id: string;
  symbol: string;
  value: string;
  change: string;
  direction: 'up' | 'down';
  /** Yahoo Finance quote page for this instrument. */
  sourceUrl?: string;
};

export type Solution = {
  title: string;
  text: string;
  to?: string;
};

export type PropertySpec = {
  label: string;
  value: string;
  /** The asking price is set in bold on the reference. */
  emphasis?: boolean;
};

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export const hero = {
  brand: 'Discipline today. A brighter tomorrow.',
  headline: 'Your wealth. Our responsibility.',
  subline:
    'Independent, fee-only advice for private individuals and families. Your assets stay at your bank.',
  ctaLabel: 'Make an appointment',
  secondaryCta: { label: 'Discover our client-first approach', to: ROUTES.expertise },
  image: '/images/hero-lucerne.jpg',
  imageAlt: 'Lake and Alpine view from a terrace — Lucerne and central Switzerland',
};

/** Kept for i18n catalog compatibility; hero is the primary home lead. */
export const testimonial = {
  quote: hero.headline,
  name: 'Marc Weber',
  positionLabel: 'Position',
  position: 'Managing Director, Client Operations',
  image: hero.image,
  imageAlt: hero.imageAlt,
  ctaLabel: hero.secondaryCta.label,
  ctaTo: hero.secondaryCta.to,
};

export const audienceBands = [
  {
    id: 'individuals',
    title: 'Advice built around your life',
    text: 'Your ambitions, responsibilities and concerns set the direction. We turn the full picture of your finances into practical guidance for today and a clear plan for the years ahead.',
    to: ROUTES.individuals,
    cta: 'How we advise private clients',
  },
  {
    id: 'independent-advice',
    title: 'Independence you can see',
    text: 'We are paid only by our clients, not by product providers. Your assets remain in your name, while every recommendation is made with your interests in view.',
    to: ROUTES.aboutIndependentAdvice,
    cta: 'Why our model matters',
  },
] as const;

/* -------------------------------------------------------------------------- */
/* News                                                                        */
/* -------------------------------------------------------------------------- */

import {
  insightCatalog,
  newsFeatured,
  newsSecondary,
  newsSlim,
  marketArticles,
  insightArticles,
  ARTICLE_SLUGS,
  OLD_ARTICLE_REDIRECTS,
} from './articles';

export {
  insightCatalog,
  newsFeatured,
  newsSecondary,
  newsSlim,
  marketArticles,
  insightArticles,
  ARTICLE_SLUGS,
  OLD_ARTICLE_REDIRECTS,
};

/* -------------------------------------------------------------------------- */
/* Offers gallery                                                              */
/* -------------------------------------------------------------------------- */

export const offers: Offer[] = [
  {
    id: 'checklist-retirement',
    title: 'Plan retirement with confidence',
    tag: 'Fact sheet',
    teaser:
      'Retirement brings important choices about income, pensions, tax and the life you want to lead. Our checklist helps you prepare each decision with greater clarity.',
    cta: 'Order for free',
    to: ROUTES.checklistRetirementPlanning,
    icon: 'checklist',
    image: '/images/offer-checklist.png',
    imageAlt: 'Printed checklist for retirement planning',
    large: true,
  },
  {
    id: 'free-first-meeting',
    title: 'Start with a conversation',
    tag: 'Appointment',
    teaser: 'Tell us what matters to you and learn how independent advice could help. Your first meeting is free and without obligation.',
    cta: 'Schedule a conversation',
    to: ROUTES.appointments,
    icon: 'calendar',
  },
  {
    id: 'phishing-protection',
    title: 'Protect what you have built',
    tag: 'Fact sheet',
    teaser:
      'A practical guide to recognising suspicious messages, checking requests before you act and responding quickly when something feels wrong.',
    cta: 'Order for free',
    to: ROUTES.phishingProtection,
    icon: 'shield',
  },
];

/* -------------------------------------------------------------------------- */
/* Stock exchange and markets                                                  */
/* -------------------------------------------------------------------------- */

/** Snapshot shown until live market quotes load (and if the request fails). */
export const quotes: Quote[] = [
  { id: 'smi', symbol: 'SMI', value: "16'264.830", change: '-0.60 %', direction: 'down' },
  { id: 'dax', symbol: 'DAX', value: "28'306.320", change: '-0.96 %', direction: 'down' },
  { id: 'eurozone-50', symbol: 'Eurozone 50', value: '858.855', change: '-1.00 %', direction: 'down' },
  { id: 'spx', symbol: 'SPX (S&P500)', value: "7'667.290", change: '-0.55 %', direction: 'down' },
  { id: 'eurchf', symbol: 'EUR/CHF', value: '0.93079', change: '+0.14 %', direction: 'up' },
  { id: 'usdchf', symbol: 'USD/CHF', value: '0.90119', change: '-0.21 %', direction: 'down' },
];

/* -------------------------------------------------------------------------- */
/* Our offering                                                                */
/* -------------------------------------------------------------------------- */

export const solutions: Solution[] = [
  {
    title: 'Retirement planning',
    text: 'See how your income, pensions, assets and plans fit together. We model the years ahead so you can make lasting decisions with confidence.',
    to: ROUTES.retirement,
  },
  {
    title: 'Pillar 3a with index investments',
    text: 'Build long-term savings through transparent, low-cost solutions selected for their fit with your goals — never because a provider pays us.',
    to: ROUTES.pensionPlanning,
  },
  {
    title: 'Tax advice',
    text: 'Plan pension, property and relocation decisions early. We make the implications clear and help you act at the moment it matters most.',
    to: ROUTES.taxes,
  },
  {
    title: 'Asset management mandates',
    text: 'A disciplined strategy, transparent costs and ongoing oversight — managed by us and held at your bank, with every decision tied to your objectives.',
    to: ROUTES.financialInvestments,
  },
];

/* -------------------------------------------------------------------------- */
/* Newsletter CTA                                                              */
/* -------------------------------------------------------------------------- */

export const newsletterCta = {
  text: 'Clear thinking for the financial decisions that matter — practical perspectives on retirement, tax, investing and property, with no product advertising.',
  linkLabel: 'Receive our client newsletter.',
  to: ROUTES.newsletter,
};

/* -------------------------------------------------------------------------- */
/* Property                                                                    */
/* -------------------------------------------------------------------------- */

export const property = {
  type: 'Single family house',
  image: '/images/property-house.png',
  imageAlt: 'Aerial view of a single family house with garden',
  specs: [
    { label: 'Address', value: 'Biberist, 4562' },
    { label: 'Number of rooms', value: '6.5' },
    { label: 'Living area', value: '173 m²' },
    { label: 'Plot Area', value: '640 m²' },
    { label: 'Construction year', value: '1985' },
    { label: 'Selling price', value: "CHF 990'000", emphasis: true },
  ] satisfies PropertySpec[],
  to: ROUTES.realEstate,
};

/* -------------------------------------------------------------------------- */
/* Lookup helpers                                                              */
/* -------------------------------------------------------------------------- */

export const allArticles: Article[] = insightCatalog;

export function findArticle(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function articlesByTagline(tagline: string): Article[] {
  return allArticles.filter((a) => a.tagline.toLowerCase() === tagline.toLowerCase());
}

export function sortedArticles(): Article[] {
  return [...allArticles].sort((a, b) => (b.publishedDate ?? '').localeCompare(a.publishedDate ?? ''));
}

import { ROUTES } from '../constants/routes';

export type Article = {
  slug: string;
  tagline: string;
  title: string;
  teaser: string;
  image?: string;
  imageAlt?: string;
  body?: string[];
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
  to: string;
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
  brand: 'Trust. Clarity. Your future.',
  headline: 'Your interests first. Always.',
  subline:
    'Independent, fee-only advice for the decisions that shape your life. We bring retirement, investing, tax and estate planning into one clear strategy — built around your goals, explained without jargon and free from product sales incentives.',
  secondaryCta: { label: 'Discover our client-first approach', to: ROUTES.expertise },
  image: '/team/friedrich-hartmann.png',
  imageAlt: 'Portrait of Friedrich Hartmann, Chairman and CIO of Helfenstein Group',
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
    text: 'We are paid only by our clients, not by product providers. Your assets remain in your name at your Swiss bank, while every recommendation is made with your interests in view.',
    to: ROUTES.aboutIndependentAdvice,
    cta: 'Why our model matters',
  },
] as const;

/* -------------------------------------------------------------------------- */
/* News                                                                        */
/* -------------------------------------------------------------------------- */

const editorial = 'Helfenstein Editorial Team';

export const newsFeatured: Article = {
  slug: 'compulsory-insurance-switzerland',
  tagline: 'Insurances',
  title: 'Compulsory insurance in Switzerland',
  teaser:
    'When foreigners move to Switzerland for the first time and work here, they should know what insurance they are required to have by law.',
  publishedDate: '2026-03-12',
  author: editorial,
  readingTimeMinutes: 5,
  lastReviewed: '2026-08-01',
  body: [
    'Anyone taking up residence in Switzerland is required by law to take out a number of insurance policies. Which ones apply depends on your residence status, your employment situation and your family circumstances.',
    'Basic health insurance is compulsory for everybody living in Switzerland and must be taken out within three months of arrival. Cover is backdated to the date of entry, so there is no gap — but premiums are also owed from that date.',
    'Employees are automatically insured against occupational accidents through their employer. Non-occupational accident cover is included as soon as you work at least eight hours a week for the same employer.',
    'Anyone who owns a motor vehicle needs third-party liability insurance before the vehicle can be registered. In many cantons, building insurance is compulsory as well.',
  ],
};

export const newsSlim: Article[] = [
  {
    slug: 'save-on-taxes-with-pillar-3a',
    tagline: 'Pillar 3a',
    title: 'How to save on taxes with your pillar 3a',
    teaser:
      'Anybody who uses their pillar 3a in addition to their OASI and pension fund pillars to save for their old age can deduct contributions from their taxable income.',
    publishedDate: '2026-02-18',
    author: editorial,
    readingTimeMinutes: 6,
    lastReviewed: '2026-07-15',
    body: [
      'Pillar 3a is the most widely used way of saving tax in Switzerland. Contributions can be deducted from taxable income in full, up to an annual maximum that is adjusted periodically. Because we are paid only by you, we can recommend whichever 3a provider suits you best — bank, foundation or insurer — with no preference of our own.',
      'Employees who belong to a pension fund may pay in up to a fixed franc amount each year. The self-employed without a pension fund may contribute up to 20 per cent of their net earned income, subject to a cap.',
      'Assets in pillar 3a are exempt from wealth tax and the returns are exempt from income tax for as long as they remain in the account. On withdrawal, the capital is taxed separately from other income at a reduced rate.',
      'Spreading your savings over several accounts and withdrawing them in different years keeps the progression low and can save several thousand francs.',
    ],
  },
  {
    slug: 'tips-for-foreigners-buying-real-estate',
    tagline: 'Real estate',
    title: 'Tips for foreigners wishing to buy real estate',
    teaser:
      'There are several factors that foreign buyers should consider when purchasing real estate in Switzerland. Property acquisition is a major investment, which also involves a certain amount of risk.',
    publishedDate: '2026-01-22',
    author: editorial,
    readingTimeMinutes: 7,
    lastReviewed: '2026-06-20',
    body: [
      'Foreign nationals resident in Switzerland with a C permit may buy property on the same terms as Swiss citizens. Holders of a B permit may acquire a home for their own use at their place of residence.',
      'Lenders generally require at least 20 per cent of the purchase price as equity, of which at least 10 per cent must come from sources other than occupational pension assets.',
      'Affordability is assessed conservatively: the imputed costs of the mortgage, maintenance and amortisation should not exceed roughly one third of gross income.',
      'Buyers should budget for notary fees, land register charges and property transfer tax, which vary considerably from canton to canton.',
    ],
  },
];

export const newsSecondary: Article = {
  slug: 'is-it-worth-paying-more-into-your-pension-fund',
  tagline: 'Pension fund',
  title: 'Is it worth paying more into your pension fund?',
  teaser:
    'If you make voluntary contributions into your pension fund, you can save a lot on tax and have more money to live off in your old age.',
  image: '/images/pension-fund-returns.png',
  imageAlt: 'Table showing illustrative returns on a voluntary pension fund contribution',
  publishedDate: '2026-04-03',
  author: editorial,
  readingTimeMinutes: 6,
  lastReviewed: '2026-08-10',
  body: [
    'Voluntary purchases of additional pension fund benefits are fully deductible from taxable income in the year they are made. For higher earners this can mean an immediate saving of a third or more of the amount paid in.',
    'The capital then grows free of income and wealth tax until it is drawn. The longer the remaining period until retirement, the more the interest advantage compounds.',
    'Purchases made in the three years before retirement cannot be withdrawn as a lump sum without losing the tax deduction, so timing matters.',
    'Before buying in, check the funding ratio of your pension fund and compare the conversion rate with what you could achieve by investing the same amount privately.',
  ],
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

export const marketArticles: Article[] = [
  {
    slug: 'financial-investments-what-you-need-know',
    tagline: 'Financial investments',
    title: 'Financial investments: what you need to know',
    teaser:
      'Anyone wanting to successfully invest money should adopt a structured approach and first of all, decide on the right investment strategy.',
    publishedDate: '2025-11-14',
    author: editorial,
    readingTimeMinutes: 5,
    lastReviewed: '2026-05-01',
    body: [
      'A sound investment strategy starts with your own circumstances: how much of your assets you can tie up, for how long, and how much fluctuation you can live with.',
      'Only once the strategy is fixed does the choice of individual investments follow. Broadly diversified, low-cost index funds are the most efficient building block for most investors.',
      'Costs are one of the few certainties in investing. Every franc saved on fees stays invested and compounds over the whole holding period — which is why an adviser who receives no share of those fees is the only one with no reason to overlook them.',
    ],
  },
  {
    slug: 'all-you-need-to-know-about-etfs',
    tagline: 'Investments',
    title: 'All you need to know about ETFs',
    teaser: 'ETFs are cheap, transparent and liquid, and offer many more benefits.',
    publishedDate: '2025-10-02',
    author: editorial,
    readingTimeMinutes: 4,
    lastReviewed: '2026-04-18',
    body: [
      'Exchange traded funds track an index and can be bought and sold on an exchange throughout the trading day, just like a share.',
      'Because they are passively managed, their ongoing charges are a fraction of those of actively managed funds — typically a few hundredths of a per cent for large, liquid indices.',
      'Pay attention to the replication method, the fund domicile and the size of the tracking difference rather than the headline fee alone.',
    ],
  },
  {
    slug: 'current-mortgage-interest-rates-comparison',
    tagline: 'Mortgages',
    title: 'Current mortgage interest rates – a comparison',
    teaser:
      'Helfenstein compares the current mortgage interest rates of the most important providers in Switzerland on an ongoing basis.',
    publishedDate: '2026-05-20',
    author: editorial,
    readingTimeMinutes: 4,
    lastReviewed: '2026-08-25',
    body: [
      'Mortgage rates differ markedly between banks, insurers and pension funds — often by more than half a percentage point for an identical fixed term.',
      'On a mortgage of one million francs, that difference amounts to several thousand francs a year, which makes comparing offers one of the highest-return hours you can spend.',
      'Rates are also negotiable. Published rates are list prices, and a well-prepared borrower with strong affordability can usually improve on them.',
    ],
  },
];

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
/* Additional insights                                                         */
/* -------------------------------------------------------------------------- */

export const insightArticles: Article[] = [
  {
    slug: 'horizon-report-2026',
    tagline: 'Insights',
    title: 'Horizon report 2026: Swiss pensions, mortgages and FinSA',
    teaser:
      'The main legislative and market developments private clients should plan for in 2026 — in plain language.',
    publishedDate: '2026-01-15',
    author: editorial,
    readingTimeMinutes: 12,
    lastReviewed: '2026-08-01',
    body: [
      'Swiss households face a dense agenda in 2026: pension reform follow-through, mortgage refinancing after a multi-year rate cycle, and clearer FinSA documentation when taking advice.',
      'On pensions, contribution gaps and conversion-rate differences between funds still dominate retirement outcomes. Modelling pension versus lump sum early remains the highest-value planning step for most clients approaching 60.',
      'Mortgage rates continue to diverge between banks, insurers and pension funds. Borrowers whose fixed terms expire this year should run a structured tender well before the notice window closes.',
      'FinSA has made fee transparency and client segmentation part of everyday advice. Expect clearer written analyses, documented suitability checks and easier access to ombudsman information.',
      'Pillar 3a remains the most accessible tax-efficient savings vehicle for employees. Spreading contributions across several accounts and planning staggered withdrawals can still reduce progression tax on capital.',
      'This report is general information for Helfenstein clients and readers. It is not personalised investment, tax or legal advice.',
    ],
  },
  {
    slug: 'how-to-spot-financial-scams-switzerland',
    tagline: 'Consumer protection',
    title: 'How to spot financial scams in Switzerland',
    teaser:
      'Clone firms, phishing and unrealistic return promises — practical checks before you transfer money or share login details.',
    publishedDate: '2026-06-08',
    author: editorial,
    readingTimeMinutes: 8,
    lastReviewed: '2026-08-20',
    body: [
      'Unauthorised firms and phishing attacks remain among the most common ways Swiss residents lose money. A few verification habits stop most attempts.',
      'Always check whether a firm or individual appears on the FINMA register of authorised institutions before you invest or open an account. Prefer the official finma.ch register over search ads.',
      'Be sceptical of cold calls, messaging-app “portfolio managers” and offers that guarantee high returns with little risk. Legitimate advisers do not pressure you to decide the same day.',
      'Never share one-time codes, passwords or remote-desktop access. Banks and Helfenstein will never ask you to circumvent two-factor authentication.',
      'If something feels wrong, pause the transfer, call a known official number (not the one in the email) and report suspected misconduct to the police and FINMA.',
      'This article is general consumer guidance, not legal advice. If you have been affected by a scam, seek help from the competent authorities promptly.',
    ],
  },
  {
    slug: 'finsa-what-clients-should-know',
    tagline: 'Regulation',
    title: 'FinSA: what private clients should know',
    teaser:
      'How Swiss Financial Services Act rules affect advice, fees, client segmentation and your right to complain.',
    publishedDate: '2026-03-28',
    author: editorial,
    readingTimeMinutes: 7,
    lastReviewed: '2026-07-30',
    body: [
      'The Financial Services Act (FinSA) sets conduct rules for firms that provide financial services in Switzerland. It is designed to make advice more transparent and comparable.',
      'Before you receive personalised advice, you should receive information about the services offered, how you are classified as a client, and the costs involved.',
      'Conflicts of interest must be disclosed and managed. At Helfenstein, advice is paid by clients; any unavoidable third-party payments are credited to you.',
      'If a dispute cannot be resolved directly, clients can turn to an affiliated ombudsman office. Details appear in our FinSA client brochure and legal documents.',
    ],
  },
  {
    slug: 'early-retirement-cost-check',
    tagline: 'Retirement',
    title: 'What early retirement really costs',
    teaser:
      'Stopping two or three years earlier changes OASI, pension-fund and tax outcomes — here is how to model it before you decide.',
    publishedDate: '2026-02-05',
    author: editorial,
    readingTimeMinutes: 6,
    lastReviewed: '2026-06-12',
    body: [
      'Early retirement is rarely just a lifestyle choice. It shortens contribution years, may reduce OASI benefits and brings forward the moment when capital must support spending.',
      'A useful model looks year by year at income, tax, health insurance and drawdown order across OASI, the pension fund and private assets.',
      'Many households discover that a phased reduction in working time is more affordable than a full stop — but only a written scenario makes that visible.',
    ],
  },
  {
    slug: 'cantonal-tax-relocation-checklist',
    tagline: 'Taxes',
    title: 'Moving canton: a tax checklist',
    teaser:
      'A change of commune can save or cost thousands of francs — provided the arithmetic includes more than the headline tax rate.',
    publishedDate: '2025-12-09',
    author: editorial,
    readingTimeMinutes: 5,
    lastReviewed: '2026-05-22',
    body: [
      'Swiss tax competition between cantons and communes is real, but headline rates omit wealth tax, property taxes and the cost of living.',
      'Before relocating, compare your full tax burden under both residences for income, wealth and — if relevant — pension capital withdrawals.',
      'Timing matters: the date you establish a new tax domicile can affect which year benefits from the move.',
    ],
  },
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

export const allArticles: Article[] = [
  newsFeatured,
  ...newsSlim,
  newsSecondary,
  ...marketArticles,
  ...insightArticles,
];

export function findArticle(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function articlesByTagline(tagline: string): Article[] {
  return allArticles.filter((a) => a.tagline.toLowerCase() === tagline.toLowerCase());
}

export function sortedArticles(): Article[] {
  return [...allArticles].sort((a, b) => (b.publishedDate ?? '').localeCompare(a.publishedDate ?? ''));
}

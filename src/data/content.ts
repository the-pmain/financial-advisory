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
};

export type Solution = {
  title: string;
  text: string;
  to: string;
};

export type Mandate = {
  title: string;
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
  brand: 'Helfenstein Asset Management AG',
  headline: 'Independent wealth advice for every stage of life.',
  subline:
    'Retirement, investments, taxes and real estate — paid only by our clients. Custody held with Swiss banking partners; Helfenstein is a FINMA-authorised portfolio manager supervised by OSFINcontrol AG.',
  primaryCta: { label: 'Make an appointment', to: ROUTES.appointments },
  secondaryCta: { label: 'Explore our expertise', to: ROUTES.expertise },
  image: '/team/friedrich-hartmann.png',
  imageAlt: 'Portrait of Friedrich Hartmann, Chairman and CIO of Helfenstein Asset Management AG',
};

/** Kept for i18n catalog compatibility; hero is the primary home lead. */
export const testimonial = {
  quote: hero.headline,
  name: 'Marc Weber',
  positionLabel: 'Position',
  position: 'Managing Director, Client Operations',
  image: hero.image,
  imageAlt: hero.imageAlt,
  ctaLabel: hero.primaryCta.label,
  ctaTo: hero.primaryCta.to,
};

export const audienceBands = [
  {
    id: 'individuals',
    title: 'For individuals',
    text: 'Retirement, investments, estate planning, real estate and taxes — with a free first meeting.',
    to: ROUTES.individuals,
    cta: 'Private clients',
  },
  {
    id: 'companies',
    title: 'For companies',
    text: 'Occupational pensions, succession, insurance management and company formation for Swiss SMEs.',
    to: ROUTES.companies,
    cta: 'Corporate clients',
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
      'Pillar 3a is the most popular way of saving tax in Switzerland. Contributions can be deducted from taxable income in full, up to an annual maximum that is adjusted periodically.',
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
    title: 'Checklist for planning your retirement',
    tag: 'Fact sheet',
    teaser:
      "Retirement marks the transition into a new chapter of life - also from a financial point of view. To be able to look forward to your golden years, you'll have to take a number of very significant decisions.",
    cta: 'Order for free',
    to: ROUTES.checklistRetirementPlanning,
    icon: 'checklist',
    image: '/images/offer-checklist.png',
    imageAlt: 'Printed checklist for retirement planning',
    large: true,
  },
  {
    id: 'free-first-meeting',
    title: 'Free first meeting',
    tag: 'Appointment',
    teaser: 'Talk to an expert at Helfenstein. The first meeting is free of charge.',
    cta: 'Arrange an appointment',
    to: ROUTES.appointments,
    icon: 'calendar',
  },
  {
    id: 'phishing-insurance',
    title: 'Protect your assets with Helfenstein phishing insurance',
    tag: 'Fact sheet',
    teaser:
      'Helfenstein phishing insurance protects you against any phishing attacks that occur despite security measures and precautions.',
    cta: 'Order for free',
    to: ROUTES.phishingInsurance,
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
      'Costs are one of the few certainties in investing. Every franc saved on fees stays invested and compounds over the whole holding period.',
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

/** Snapshot of the reference market table. Static by design. */
export const quotes: Quote[] = [
  { id: 'smi', symbol: 'SMI', value: "16'264.830", change: '-0.60 %', direction: 'down' },
  { id: 'dax', symbol: 'DAX', value: "28'306.320", change: '-0.96 %', direction: 'down' },
  { id: 'eurozone-50', symbol: 'Eurozone 50', value: '858.855', change: '-1.00 %', direction: 'down' },
  { id: 'spx', symbol: 'SPX (S&P500)', value: "7'667.290", change: '-0.55 %', direction: 'down' },
  { id: 'eurchf', symbol: 'EUR/CHF', value: '0.93079', change: '+0.14 %', direction: 'up' },
  { id: 'usdchf', symbol: 'USD/CHF', value: '0.90119', change: '-0.21 %', direction: 'down' },
];

export const marketVideo: Article = {
  slug: 'helfenstein-financial-portal-pro',
  tagline: 'Helfenstein Financial Portal Pro',
  title: 'The platform for your stock market trading',
  teaser: 'Video by Helfenstein Asset Management (1:46 minutes)',
  kind: 'video',
  videoNote: 'Video by Helfenstein Asset Management (1:46 minutes)',
  image: '/images/video-portal-pro.svg',
  imageAlt: 'Preview of the Helfenstein Financial Portal Pro trading platform',
  publishedDate: '2025-09-01',
  author: editorial,
  readingTimeMinutes: 2,
  body: [
    'The Helfenstein Financial Portal Pro brings real-time prices, depth-of-market data, charting and order entry together in a single view.',
    'Watchlists, alerts and portfolio analysis are included at no extra cost, and orders can be placed directly on all major Swiss and international exchanges.',
  ],
};

/* -------------------------------------------------------------------------- */
/* Additional insights                                                         */
/* -------------------------------------------------------------------------- */

export const insightArticles: Article[] = [
  {
    slug: 'horizon-report-2026',
    tagline: 'Insights',
    title: 'Horizon report 2026: Swiss pensions, mortgages and FinSA',
    teaser:
      'The main legislative and market developments private clients and SMEs should plan for in 2026 — in plain language.',
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
  {
    slug: 'bgv-scheme-benchmarking-smes',
    tagline: 'Companies',
    title: 'Why SMEs should benchmark their BVG scheme',
    teaser:
      'Occupational pension costs are often the least-examined payroll line. A periodic tender can improve price and benefits.',
    publishedDate: '2026-04-17',
    author: editorial,
    readingTimeMinutes: 5,
    lastReviewed: '2026-08-05',
    body: [
      'Risk premiums and administration charges for identical BVG benefits still vary widely between providers.',
      'A structured benchmark compares cover, conversion rates, investment returns and service quality — not price alone.',
      'Employers that re-tender every few years typically reduce friction for HR and give employees clearer plan communication.',
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Our offering                                                                */
/* -------------------------------------------------------------------------- */

export const solutions: Solution[] = [
  {
    title: 'Retirement planning',
    text: 'Plan your retirement with Helfenstein and you can rest assured that you will be financially secure once you have stopped working.',
    to: ROUTES.retirement,
  },
  {
    title: 'Pillar 3a with index investments',
    text: 'At Helfenstein, you can invest your pillar 3a assets in the best index funds. Thanks to the lower fees, you can generate additional returns of thousands or even tens of thousands of francs over the years.',
    to: ROUTES.pensionPlanning,
  },
  {
    title: 'Tax advice',
    text: 'Our experts show you how to optimise your tax situation over the long term and save thousands or even tens of thousands of francs.',
    to: ROUTES.taxes,
  },
  {
    title: 'Asset management mandates',
    text: 'At Helfenstein, we combine a simple investment strategy, efficient implementation and active support. Find the right mandate for you.',
    to: ROUTES.financialInvestments,
  },
];

/* -------------------------------------------------------------------------- */
/* Newsletter CTA                                                              */
/* -------------------------------------------------------------------------- */

export const newsletterCta = {
  text: 'Get regular updates on how to optimise your OASI, occupational and pillar 3 pensions.',
  linkLabel: 'Subscribe to our newsletter (in German, French and Italian).',
  to: ROUTES.newsletter,
};

/* -------------------------------------------------------------------------- */
/* Sales mandates + property                                                   */
/* -------------------------------------------------------------------------- */

export const mandates: Mandate[] = [
  {
    title:
      'Innovative, rapidly growing company in the building technology and energy optimisation sector',
    to: ROUTES.companiesSuccession,
  },
  {
    title: 'Specialised industrial plant engineering company with patented technology',
    to: ROUTES.companiesSuccession,
  },
  { title: 'One of the leading Swiss providers of logistics packaging materials', to: ROUTES.companiesSuccession },
  { title: 'Successful telecommunications service provider', to: ROUTES.companiesSuccession },
];

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
  marketVideo,
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

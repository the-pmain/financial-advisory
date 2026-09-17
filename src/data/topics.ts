import { ROUTES } from '../constants/routes';

export type ExpertiseTag =
  | 'retirement'
  | 'investments'
  | 'taxes'
  | 'real-estate'
  | 'estate'
  | 'pensions'
  | 'insurance';

export type Topic = {
  path: string;
  breadcrumb: string[];
  title: string;
  subtitle: string;
  intro: string[];
  highlights: { title: string; text: string }[];
  relatedSlugs?: string[];
  ctaLabel?: string;
  challenges?: { title: string; text: string }[];
  benefits?: { title: string; text: string }[];
  /** Filters team specialists shown on this page. */
  expertiseTags?: ExpertiseTag[];
  showDocuments?: boolean;
  showVerifyFinma?: boolean;
  showOmbudsman?: boolean;
  showRegulatoryHistory?: boolean;
  showCustodyBanks?: boolean;
  showCryptoAssets?: boolean;
  showPortalPreview?: boolean;
  showCaseStudies?: boolean;
  showClientTestimonials?: boolean;
  adviceDisclaimer?: boolean;
};

const t = (topic: Topic): Topic => topic;

/**
 * Every destination reachable from the navigation resolves to one of these
 * records, so the site contains no dead links. `TopicPage` renders them with
 * the same widgets used on the home page.
 */
export const topics: Topic[] = [
  t({
    path: ROUTES.individuals,
    breadcrumb: ['Individuals'],
    title: 'Individuals',
    subtitle: 'Independent advice for every stage of life.',
    intro: [
      'Helfenstein Group advises private individuals and families — and only them — on retirement, investments, estate planning, real estate, taxes and pensions. We are paid by our clients alone, never by banks, insurers or product providers, and we never hold your assets. Every recommendation has one purpose: your interests.',
      'Every mandate starts with a written analysis of your situation. You decide afterwards whether and how you would like to work with us.',
    ],
    highlights: [
      { title: 'Retirement', text: 'Work out exactly when you can afford to stop working, and what it will cost.' },
      { title: 'Investments', text: 'A clear strategy, implemented with low-cost index funds at your own bank and reviewed continuously.' },
      { title: 'Estate planning', text: 'Wills, marriage contracts and gifts arranged so your wishes are legally secure.' },
      { title: 'Taxes', text: 'Long-term tax planning, so the big decisions are structured before the return is filed.' },
    ],
    relatedSlugs: ['fee-only-financial-advisors', 'asset-custody-explained'],
  }),
  t({
    path: ROUTES.retirement,
    breadcrumb: ['Individuals', 'Retirement'],
    title: 'Retirement planning',
    subtitle: 'Know today what your retirement will look like.',
    intro: [
      'Retirement is the single largest financial decision most people make. Pension or lump sum, early retirement or phased withdrawal, how much you can safely spend each year — these choices are irreversible and interact with one another.',
      'Our specialists model your income and assets year by year, in writing, so you can see the consequences of each option before you commit to it.',
    ],
    highlights: [
      { title: 'Pension or lump sum', text: 'A side-by-side comparison of both options over your full life expectancy.' },
      { title: 'Early retirement', text: 'What stopping two or three years earlier really costs, after tax.' },
      { title: 'Withdrawal planning', text: 'The order in which to draw OASI, pension fund and private assets.' },
      { title: 'Budget check', text: 'A realistic view of the spending your assets will actually support.' },
    ],
    relatedSlugs: ['fee-only-financial-advisors', 'performance-fee-analysis'],
    expertiseTags: ['retirement', 'pensions'],
    adviceDisclaimer: true,
    challenges: [
      { title: 'AHV and pension-fund gaps', text: 'Contribution holes and conversion rates reshape what you can safely spend.' },
      { title: 'Irreversible choices', text: 'Pension versus lump sum and early retirement interact with tax progression.' },
      { title: 'Drawdown order', text: 'OASI, BVG and private assets must be sequenced carefully.' },
    ],
    benefits: [
      { title: 'Written year-by-year model', text: 'See income, tax and spending before you commit.' },
      { title: 'Side-by-side options', text: 'Compare pension, lump sum and hybrids over life expectancy.' },
      { title: 'Independent by design', text: 'We receive no commissions from any provider, so the only question is which option is right for you.' },
    ],
  }),
  t({
    path: ROUTES.financialInvestments,
    breadcrumb: ['Individuals', 'Financial investments & portfolio management'],
    title: 'Financial investments & portfolio management',
    subtitle: 'A simple strategy, implemented efficiently.',
    intro: [
      'We combine a clearly defined investment strategy with low-cost implementation and active support. Your portfolio is held in your own name at a bank of your choice; we manage it, we never hold it. You always know what you own, what it costs and why it is in your portfolio.',
      'Because Helfenstein Group receives no retrocessions, the only fee you pay is the one agreed with us.',
    ],
    highlights: [
      { title: 'Asset management mandates', text: 'Discretionary management from a broadly diversified index core.' },
      { title: 'Index investments', text: 'Ongoing charges a fraction of those of actively managed funds.' },
      { title: 'Portfolio analysis', text: 'A written second opinion on the portfolio you hold today.' },
      { title: 'Your assets stay at your bank', text: 'Helfenstein Group never holds client assets. Custody remains with the bank you choose, in your name and under your control.' },
    ],
    relatedSlugs: ['fee-only-financial-advisors', 'alternatives-risk-analysis'],
    expertiseTags: ['investments'],
    showCustodyBanks: true,
    adviceDisclaimer: true,
    challenges: [
      { title: 'Cost drag', text: 'Fees and retrocessions quietly compound against long-term returns.' },
      { title: 'Unclear strategy', text: 'Portfolios often accumulate products without a written risk budget.' },
      { title: 'FinSA suitability', text: 'Advice must match your knowledge, goals and capacity for loss.' },
    ],
    benefits: [
      { title: 'Index-led core', text: 'Low-cost implementation with a clear strategic asset allocation.' },
      { title: 'Fee transparency', text: 'One agreed fee, paid by you. Any third-party payment we cannot avoid is credited to you in full.' },
      { title: 'Ongoing review', text: 'Active support without an incentive to churn.' },
    ],
  }),
  t({
    path: ROUTES.alternativeInvestments,
    breadcrumb: ['Finance', 'Alternative investments'],
    title: 'Alternative investments',
    subtitle: 'Private markets, real assets and crypto — only where they belong.',
    intro: [
      'Alternative investments sit outside listed equities and bonds: private equity and private credit, hedge funds, commodities, infrastructure, selected real-estate funds, and digital assets such as cryptocurrencies. They can add return sources, but they also add cost, complexity, lock-ups and, in some cases, the risk of a total loss. We start from a written core allocation. Alternatives are a satellite, never a substitute for a diversified portfolio held in your name at the bank you choose.',
      'Cryptocurrencies are the alternative most clients ask about first. Bitcoin, ether and the tokens that follow them are highly volatile, pay no reliable income and can fall to zero. They are not a currency in the ordinary sense, not a bank deposit, and not covered by a deposit-protection scheme. Exchanges, wallet providers and “yield” products have failed, been hacked or turned out to be unauthorised. Any allocation we discuss is sized for a loss you can afford — after the rest of your plan is in place.',
      'Helfenstein Group does not hold client assets and does not operate a crypto exchange or wallet. If digital assets have a place in your plan, they stay with a custodian you choose — a bank or specialist provider that can hold them in your name. We receive no retrocessions from token issuers or platforms. The first meeting is to decide whether alternatives, including crypto, belong in your situation at all.',
    ],
    highlights: [
      { title: 'Private markets', text: 'Unlisted equity and credit: longer lock-ups, less transparency and higher minimums than a listed fund.' },
      { title: 'Real assets', text: 'Commodities, infrastructure and selected property funds as diversifiers — not decorations.' },
      { title: 'Crypto and digital assets', text: 'A small, optional satellite after a written risk budget. Volatility, custody and fraud risk come first. Nothing here is a recommendation to buy.' },
      { title: 'Suitability first', text: 'FinSA rules still apply. If you cannot explain the holding, it does not belong in the portfolio.' },
    ],
    relatedSlugs: ['alternatives-risk-analysis', 'asset-custody-explained'],
    expertiseTags: ['investments'],
    showCryptoAssets: true,
    adviceDisclaimer: true,
    challenges: [
      { title: 'Illiquidity', text: 'Many alternatives cannot be sold on demand, and some lock capital for years.' },
      { title: 'Opacity and fees', text: 'Layers of cost and delayed reporting make true performance harder to see.' },
      { title: 'Crypto-specific risk', text: 'Price crashes, lost keys, unregulated platforms and scams can wipe out the holding.' },
    ],
    benefits: [
      { title: 'Written allocation', text: 'Alternatives only after the listed core is set and the risk budget is written down.' },
      { title: 'Independent view', text: 'No token, fund or platform commissions. The only fee is the one agreed with us.' },
      { title: 'Custody discipline', text: 'Assets stay with the bank or specialist custodian you choose, never with us.' },
    ],
  }),
  t({
    path: ROUTES.estatePlanning,
    breadcrumb: ['Individuals', 'Estate planning'],
    title: 'Estate planning',
    subtitle: 'Settle your estate while it is still straightforward.',
    intro: [
      'Swiss succession law rarely distributes an estate the way people assume it will. Without a will, unmarried partners inherit nothing and surviving spouses often end up sharing property with children.',
      'We show you what the law would do in your case, and which instruments — wills, marriage contracts, gifts, advance directives — will achieve what you actually intend.',
    ],
    highlights: [
      { title: 'Wills and contracts of inheritance', text: 'Drafted so they hold up, with the compulsory portions respected.' },
      { title: 'Marriage contracts', text: 'Coordinating matrimonial property law with your succession plan.' },
      { title: 'Gifts and advances', text: 'Passing on assets during your lifetime without creating disputes.' },
      { title: 'Executors', text: 'A neutral party to administer the estate and relieve your family.' },
    ],
    expertiseTags: ['estate'],
    adviceDisclaimer: true,
  }),
  t({
    path: ROUTES.realEstate,
    breadcrumb: ['Individuals', 'Real estate & mortgages'],
    title: 'Real estate & mortgages',
    subtitle: 'Finance your property on the best available terms.',
    intro: [
      'Mortgage rates differ substantially between banks, insurers and pension funds. On a large mortgage the gap between the cheapest and the most expensive provider easily amounts to several thousand francs a year.',
      'Helfenstein Group compares the market continuously, negotiates on your behalf and reviews affordability well before your fixed term expires. We receive nothing from any lender, so the recommendation is simply the best available offer.',
    ],
    highlights: [
      { title: 'Mortgage comparison', text: 'Current terms from more than a hundred Swiss lenders.' },
      { title: 'Refinancing', text: 'A structured tender when your existing fixed term runs out.' },
      { title: 'Affordability', text: 'A conservative check that still holds at higher interest rates.' },
      { title: 'Buying and selling', text: 'Valuations and support through the whole transaction.' },
    ],
    relatedSlugs: ['swiss-advantage-truth', 'fee-only-financial-advisors'],
    expertiseTags: ['real-estate'],
    adviceDisclaimer: true,
    challenges: [
      { title: 'Opaque list rates', text: 'Published mortgage rates are starting points, not final offers.' },
      { title: 'Expiry windows', text: 'Missing a refinancing notice period can lock in an expensive renewal.' },
      { title: 'Affordability stress', text: 'Banks test higher imputed rates than today’s contract rate.' },
    ],
    benefits: [
      { title: 'Market comparison', text: 'Terms from banks, insurers and pension funds side by side.' },
      { title: 'Negotiation support', text: 'We prepare the tender and press for better than list.' },
      { title: 'Early review', text: 'Affordability checked well before your fixed term ends.' },
    ],
  }),
  t({
    path: ROUTES.taxes,
    breadcrumb: ['Individuals', 'Taxes'],
    title: 'Tax advice',
    subtitle: 'Optimise your tax position over the long term.',
    intro: [
      'Most tax savings are not found in the annual return but in decisions taken years earlier: how you save for retirement, when you draw your pension capital, where you live and how you hold your property.',
      'Our experts show you how to structure those decisions in the right order — because we sell no products, the advice is about your tax position and nothing else.',
    ],
    highlights: [
      { title: 'Tax returns', text: 'Prepared and filed for individuals and the self-employed.' },
      { title: 'Pension capital withdrawals', text: 'Staggered over several years to keep the progression low.' },
      { title: 'Property taxation', text: 'Imputed rental value, maintenance and value-adding investments.' },
      { title: 'Relocation', text: 'What a change of canton or commune is actually worth.' },
    ],
    relatedSlugs: ['fee-only-financial-advisors', 'swiss-advantage-truth'],
    expertiseTags: ['taxes'],
    adviceDisclaimer: true,
    challenges: [
      { title: 'Progression on capital', text: 'Lump-sum withdrawals can trigger steep one-year tax bills.' },
      { title: 'Cantonal differences', text: 'Where you live can matter more than fine-tuning deductions.' },
      { title: 'Timing traps', text: 'Pension buy-ins and relocation only work if sequenced correctly.' },
    ],
    benefits: [
      { title: 'Multi-year planning', text: 'Structure decisions years before the tax return is filed.' },
      { title: 'Withdrawal staging', text: 'Spread pillar 3a and pension capital across tax years.' },
      { title: 'Written scenarios', text: 'Compare relocation and pension options before you move.' },
    ],
  }),
  t({
    path: ROUTES.insurance,
    breadcrumb: ['Individuals', 'Insurance'],
    title: 'Insurance',
    subtitle: 'Cover the risks that matter, drop the ones that do not.',
    intro: [
      'Many households are simultaneously over-insured on small, affordable risks and under-insured against the ones that would genuinely threaten their finances — disability and loss of earnings.',
      'We review your policies against the gaps in your OASI and pension fund cover, and rebuild the portfolio around what you actually need.',
    ],
    highlights: [
      { title: 'Risk analysis', text: 'What OASI and your pension fund would really pay out.' },
      { title: 'Life and disability', text: 'Cover sized to your obligations, not to a sales target.' },
      { title: 'Health insurance', text: 'Deductible and model chosen on the arithmetic, reviewed annually.' },
      { title: 'Phishing protection', text: 'A free guide to spotting fraudulent messages and acting fast if one gets through.' },
    ],
    relatedSlugs: ['financial-portal-analysis', 'appointment-data-collection'],
    expertiseTags: ['insurance'],
    adviceDisclaimer: true,
  }),
  t({
    path: ROUTES.pensionPlanning,
    breadcrumb: ['Individuals', 'Pension planning'],
    title: 'Pension planning',
    subtitle: 'Build the third pillar efficiently.',
    intro: [
      'Pillar 3a is the most effective tax-saving instrument available to most people in Switzerland, and the difference between a savings account and a well-chosen index solution runs into tens of thousands of francs over a working life.',
      'We help you choose the vehicle, the strategy and the withdrawal timing.',
    ],
    highlights: [
      { title: 'Pillar 3a with index investments', text: 'Low-cost index solutions, chosen for you and held at the provider of your choice.' },
      { title: 'Voluntary purchases', text: 'When buying into your pension fund genuinely pays off.' },
      { title: 'Several accounts', text: 'Staggered withdrawals that reduce the tax on your capital.' },
      { title: 'Vested benefits', text: 'Where to place your capital between jobs.' },
    ],
    relatedSlugs: ['fee-only-financial-advisors', 'performance-fee-analysis'],
    expertiseTags: ['pensions', 'retirement'],
    adviceDisclaimer: true,
  }),
  t({
    path: ROUTES.banking,
    breadcrumb: ['Individuals', 'Custody & banking partners'],
    title: 'Custody & banking partners',
    subtitle: 'Your assets stay at your own bank.',
    intro: [
      'Helfenstein Group never holds client assets. Your securities and cash stay in an account in your own name at a custodian bank you choose, which reports to you directly; we provide portfolio management and advice on top of it.',
      'We help you choose a custodian, compare what each one charges and make sure the reporting is clear. Custody and transaction fees are set and charged by your bank, never by us.',
    ],
    highlights: [
      { title: 'Assets in your name', text: 'Segregated custody at a bank you choose, under your control.' },
      { title: 'Choosing a custodian', text: 'A like-for-like comparison of custody terms and service.' },
      { title: 'Mortgages', text: 'Financing arranged on comparison-tested terms.' },
      { title: 'Security', text: 'Multi-factor access and the fraud monitoring your bank provides.' },
    ],
    showCustodyBanks: true,
    adviceDisclaimer: true,
  }),

  /* -- About us -- */
  t({
    path: ROUTES.about,
    breadcrumb: ['About us'],
    title: 'About us',
    subtitle: 'Independent advice from Lucerne.',
    intro: [
      'Helfenstein Group is an independent adviser and portfolio manager based in Lucerne. We advise private individuals and families — never institutions or companies — on asset management, financial advice, retirement planning and financing, wherever they live.',
      'We are listed by FINMA as an authorised portfolio manager (No. CH-111.708.730, decision 12.01.2022) and supervised by OSFINcontrol AG (affiliation OSFIN-111.708.730, since 12.01.2022). Our income comes from the fees our clients agree with us, and we hold no client assets: custody stays with the bank you choose, under your control.',
    ],
    highlights: [
      { title: 'Our team', text: 'Specialists who stay with you over the long term.' },
      { title: 'Regulatory compliance', text: 'FINMA No. CH-111.708.730 (12.01.2022), OSFIN-111.708.730, and our Bloomberg LEI record.' },
      { title: 'Independent advice', text: 'No retrocessions, no product sales targets.' },
      { title: 'Client stories', text: 'Anonymised examples of how advice is delivered in practice.' },
    ],
  }),
  t({
    path: ROUTES.aboutIndependentAdvice,
    breadcrumb: ['About us', 'Independent advice'],
    title: 'Independent advice',
    subtitle: 'Paid by our clients. By nobody else.',
    intro: [
      'Most financial advice is funded by the products it recommends. That arrangement is invisible to the client and it systematically favours expensive solutions.',
      'Helfenstein Group is paid only by its clients — private individuals and families, never institutions or companies. We publish our fees, we credit any retrocession we cannot avoid, our advisers have no product sales targets, and we never hold your assets: custody stays with the bank you choose, in your name and under your control.',
    ],
    highlights: [
      { title: 'Fee transparency', text: 'You know the cost before you decide anything.' },
      { title: 'No retrocessions', text: 'Any third-party payment is credited to you.' },
      { title: 'Written analysis', text: 'Recommendations you can read, check and keep.' },
      { title: 'Free first meeting', text: 'The initial consultation costs you nothing.' },
    ],
    showVerifyFinma: true,
    adviceDisclaimer: true,
  }),
  t({
    path: ROUTES.aboutHowWeAreRegulated,
    breadcrumb: ['About us', 'How we are regulated'],
    title: 'How we are regulated',
    subtitle: 'Who supervises Helfenstein, what FinSA means for you, and how fees work.',
    intro: [
      'Swiss financial advice is governed primarily by the Financial Services Act (FinSA) and, for portfolio managers, by FINMA authorisation with day-to-day supervision by a recognised supervisory organisation. This page explains the framework in plain language.',
      'Helfenstein Asset Management AG is listed by FINMA as an authorised portfolio manager and is supervised by OSFINcontrol AG. FINMA Portfolio Manager Authorisation No: CH-111.708.730 | Decision Date: 12.01.2022. Ongoing Supervision: OSFINcontrol AG | Affiliation Ref: OSFIN-111.708.730 | Since: 12.01.2022. Verify these entries on the official FINMA register (UID CHE-111.708.730, LEI 894500URZFTDV5G7F357).',
      'Under FinSA, firms must inform you about services, costs, client segmentation and conflicts of interest before providing personalised advice. Advice at Helfenstein Group is paid for by clients alone; we earn no product commissions and hold no client assets — custody is with the bank you choose, and that bank reports to you directly.',
      'If a dispute cannot be resolved with us directly, you may contact Finanzombudsstelle Schweiz (FINOS), Freigutstrasse 8, 8002 Zürich, +41 44 552 08 00, info@finos.ch, reference FINOS-111.708.730. The same details appear in our FinSA client brochure.',
    ],
    highlights: [
      { title: 'FINMA register', text: 'Check authorised institutions and individuals on finma.ch.' },
      { title: 'FinSA conduct rules', text: 'Transparency on services, fees, suitability and conflicts.' },
      { title: 'Client documents', text: 'Fee schedule, GTC, risk disclosure and FinSA brochure.' },
      { title: 'Ombudsman', text: 'FINOS, Freigutstrasse 8, 8002 Zürich — reference FINOS-111.708.730.' },
    ],
    relatedSlugs: ['finma-regulation-guide', 'asset-custody-explained'],
    showVerifyFinma: true,
    showOmbudsman: true,
    showRegulatoryHistory: true,
    showDocuments: true,
    adviceDisclaimer: true,
  }),
  t({
    path: ROUTES.aboutClientStories,
    breadcrumb: ['About us', 'Client stories'],
    title: 'Client stories',
    subtitle: 'Anonymised examples of advice delivered in practice.',
    intro: [
      'These summaries illustrate typical mandates. They are not performance guarantees, and every client situation is different.',
      'Names and identifying details have been removed. Figures describe outcomes for those specific cases only.',
    ],
    highlights: [
      { title: 'Retirement decisions', text: 'Pension versus lump sum modelled in writing.' },
      { title: 'Taxes', text: 'Pension capital drawn across several years to hold down progression.' },
      { title: 'Mortgages', text: 'Structured refinancing before fixed terms expire.' },
      { title: 'Talk to us', text: 'A free first meeting is the usual starting point.' },
    ],
    showCaseStudies: true,
    showClientTestimonials: true,
    adviceDisclaimer: true,
  }),
  t({
    path: ROUTES.aboutOffice,
    breadcrumb: ['About us', 'Our office'],
    title: 'Our office',
    subtitle: 'Based in Lucerne, advising private clients internationally.',
    intro: [
      'Helfenstein Asset Management AG is based at Pilatusstrasse 23 in Lucerne. We advise clients in German, French, Italian and English.',
      'Call +41 41 211 29 29 or arrange a free first meeting.',
    ],
    highlights: [
      { title: 'Lucerne office', text: 'Pilatusstrasse 23, 6003 Luzern.' },
      { title: 'Telephone', text: '+41 41 211 29 29, weekdays during office hours.' },
      { title: 'Languages', text: 'German, French, Italian and English.' },
      { title: 'Appointments', text: 'In person in Lucerne or by video call.' },
    ],
  }),
  t({
    path: ROUTES.aboutPortrait,
    breadcrumb: ['About us', 'Portrait'],
    title: 'Portrait',
    subtitle: 'A Lucerne-based asset manager with a clear advisory model.',
    intro: [
      'Helfenstein Group advises private individuals and families on asset management, financial advice, retirement planning and financing from its office in Lucerne. We do not act for institutions or companies.',
      'Client assets are held with a custodian bank you choose, never by us. We are authorised by FINMA as a portfolio manager and supervised by OSFINcontrol AG.',
    ],
    highlights: [
      { title: 'Asset management', text: 'Portfolio mandates built around a clear investment process.' },
      { title: 'Financial advice', text: 'Retirement, financing and personal planning alongside investments.' },
      { title: 'Custody partners', text: 'Segregated custody in your name at a bank you choose.' },
      { title: 'Lucerne', text: 'Pilatusstrasse 23, 6003 Luzern.' },
    ],
  }),
  t({
    path: ROUTES.aboutCompanyInformation,
    breadcrumb: ['About us', 'Company information'],
    title: 'Company information',
    subtitle: 'Who we are on paper, and how to reach us.',
    intro: [
      'This page brings together the registered details of Helfenstein Asset Management AG, which trades as Helfenstein Group, together with our media contacts.',
      'For questions about advice or an existing mandate, please use the contact page instead.',
    ],
    highlights: [
      { title: 'Company profile', text: 'Legal name, UID, LEI and Lucerne address.' },
      { title: 'Regulation', text: 'FINMA No. CH-111.708.730 (12.01.2022); OSFIN-111.708.730.' },
      { title: 'Services', text: 'Independent advice and portfolio management for private clients.' },
      { title: 'Contact', text: '+41 41 211 29 29 · Pilatusstrasse 23, Luzern.' },
    ],
  }),
  t({
    path: ROUTES.aboutJobs,
    breadcrumb: ['About us', 'Jobs & careers'],
    title: 'Jobs & careers',
    subtitle: 'Advisory work without sales targets.',
    intro: [
      'Because Helfenstein Group earns nothing from products and holds no client assets, our advisers are measured on the quality of their advice rather than on volumes sold. That changes the job fundamentally.',
      'We are always interested in hearing from advisers, specialists and graduates who want to work this way.',
    ],
    highlights: [
      { title: 'Advisory roles', text: 'Client-facing positions in retirement, tax and investments.' },
      { title: 'Specialists', text: 'Actuarial, legal, IT and banking operations.' },
      { title: 'Graduates', text: 'Structured entry programmes with a mentor.' },
      { title: 'Working at Helfenstein', text: 'Flexible models and continuing professional education.' },
    ],
  }),
  t({
    path: ROUTES.aboutContact,
    breadcrumb: ['About us', 'Contact & help'],
    title: 'Contact & help',
    subtitle: 'We are happy to hear from you.',
    intro: [
      'Call us, write to us or arrange a free first meeting at our Lucerne office or by video call. Our advisers speak German, French, Italian and English — and none of them has anything to sell you.',
      'For questions about the Helfenstein Financial Portal, our support team is available on weekdays during office hours.',
    ],
    highlights: [
      { title: 'Telephone', text: '+41 41 211 29 29, weekdays 08:00–18:00.' },
      { title: 'Address', text: 'Pilatusstrasse 23, 6003 Luzern, Switzerland.' },
      { title: 'Appointments', text: 'Book a free first meeting online in a few minutes.' },
      { title: 'Portal support', text: 'Help with login, two-factor access and reporting.' },
    ],
  }),

  /* -- Utility destinations -- */
  t({
    path: ROUTES.appointments,
    breadcrumb: ['Appointments'],
    title: 'Make an appointment',
    subtitle: 'The first meeting is free of charge.',
    intro: [
      'Talk to an adviser at Helfenstein Group about your retirement, your investments, your taxes or your mortgage. The first consultation costs nothing and commits you to nothing — and because we are paid only by our clients, nobody in the room is selling you a product.',
      'Choose a time that suits you — at our Lucerne office or by video call — and tell us briefly what you would like to discuss.',
    ],
    highlights: [
      { title: 'Free first meeting', text: 'Around an hour, in person or by video call.' },
      { title: 'Written analysis', text: 'A concrete proposal follows the first meeting.' },
      { title: 'No obligation', text: 'You decide afterwards whether to proceed.' },
      { title: 'Any language', text: 'German, French, Italian or English.' },
    ],
    ctaLabel: 'Arrange an appointment',
  }),
  t({
    path: ROUTES.expertise,
    breadcrumb: ['Expertise'],
    title: 'Expertise',
    subtitle: 'Knowledge, studies and tools from our specialists.',
    intro: [
      'Helfenstein Group publishes research on retirement, pensions, taxes, mortgages and investing, together with checklists you can order free of charge.',
      'Start with the FINMA guide, browse insights by topic, or open the full article index. Because we sell no products, what you read here is our own analysis rather than a sales pitch.',
    ],
    highlights: [
      { title: 'FINMA guide', text: 'How to read a licence number, a LEI and what deposit protection actually covers.' },
      { title: 'Insights index', text: 'All articles sorted by date, with topic tags.' },
      { title: 'Fact sheets', text: 'Concise printed guides, sent free of charge.' },
      { title: 'Free first meeting', text: 'An hour with an adviser, in Lucerne or by video call.' },
    ],
    relatedSlugs: [
      'finma-regulation-guide',
      'fee-only-financial-advisors',
      'alternatives-risk-analysis',
      'asset-custody-explained',
    ],
  }),
  t({
    path: ROUTES.regulatoryAndCompliance,
    breadcrumb: ['Regulatory & compliance'],
    title: 'Regulatory & compliance',
    subtitle: 'Supervision, FinSA information and client documents.',
    intro: [
      'This hub brings together how Helfenstein is supervised, what FinSA means for clients, and the documents that accompany our services.',
      'Helfenstein Asset Management AG (Helfenstein Group) is listed by FINMA as an authorised portfolio manager and supervised by OSFINcontrol AG. FINMA Portfolio Manager Authorisation No: CH-111.708.730 | Decision Date: 12.01.2022. Ongoing Supervision: OSFINcontrol AG | Affiliation Ref: OSFIN-111.708.730 | Since: 12.01.2022. We do not hold client assets — custody stays with the bank you choose, under your control. Advisory relationships are subject to FinSA conduct rules, including transparency on fees, conflicts of interest and client segmentation.',
    ],
    highlights: [
      { title: 'Verify authorisation', text: 'Use the FINMA register to confirm supervised entities.' },
      { title: 'Client documents', text: 'Fee schedule, GTC, risk disclosure and FinSA brochure.' },
      { title: 'Conflicts of interest', text: 'How we disclose and manage them.' },
      { title: 'Complaints', text: 'Contact us first; then FINOS (ref. FINOS-111.708.730) if needed.' },
    ],
    relatedSlugs: ['finma-regulation-guide', 'asset-custody-explained'],
    showVerifyFinma: true,
    showOmbudsman: true,
    showDocuments: true,
    adviceDisclaimer: true,
  }),
  t({
    path: ROUTES.financialPortal,
    breadcrumb: ['Helfenstein Financial Portal'],
    title: 'Helfenstein Financial Portal',
    subtitle: 'Your portfolio, your documents, your markets.',
    intro: [
      'The Helfenstein Financial Portal gives you one consolidated view of the accounts and portfolios you hold at your custodian bank, together with all your documents and current market data.',
      'Your assets stay at your bank — the portal is your window onto them, not a place where money is held.',
    ],
    highlights: [
      { title: 'Portfolio overview', text: 'Consolidated performance across all your holdings.' },
      { title: 'Documents', text: 'Statements and tax documents in one archive.' },
      { title: 'Reporting', text: 'Performance, costs and allocation across all your holdings, explained in plain language.' },
      { title: 'Security', text: 'Two-factor authentication on every login.' },
    ],
    relatedSlugs: ['financial-portal-analysis', 'appointment-data-collection'],
    showPortalPreview: true,
    ctaLabel: 'Sign up for free',
  }),
  t({
    path: ROUTES.stockExchangesAndMarkets,
    breadcrumb: ['Markets & analysis'],
    title: 'Markets & analysis',
    subtitle: 'Prices, news and our independent view.',
    intro: [
      'Market data, commentary and useful tools in one place, free to use once registered. We publish our own analysis because we sell no products — what you read here is our opinion, not a sales pitch.',
      'Follow indices, currencies, interest rates and individual securities, and set alerts on the positions that matter to you.',
    ],
    highlights: [
      { title: 'Market prices', text: 'Swiss and international equities, indices and currencies.' },
      { title: 'Watchlists', text: 'Track the securities you care about and set alerts.' },
      { title: 'Analyses', text: 'Commentary from our investment specialists.' },
      { title: 'Tools', text: 'Screeners, charts and portfolio simulations.' },
    ],
    relatedSlugs: ['alternatives-risk-analysis', 'performance-fee-analysis'],
    ctaLabel: 'Sign up for free',
  }),
  t({
    path: ROUTES.newsletter,
    breadcrumb: ['Subscribe to newsletter'],
    title: 'Subscribe to our newsletter',
    subtitle: 'Independent updates, with nothing to sell.',
    intro: [
      'Practical, independent updates on pensions, tax, investing and property — written for private clients, with no product advertising. Published in English, German, French and Italian.',
      'You can select the topics that interest you and unsubscribe at any time with a single click.',
    ],
    highlights: [
      { title: 'Pensions', text: 'OASI, occupational schemes and pillar 3a.' },
      { title: 'Taxes', text: 'Deadlines, deductions and planning opportunities.' },
      { title: 'Investing', text: 'Strategy, costs and market commentary.' },
      { title: 'Real estate', text: 'Mortgage rates and the property market.' },
    ],
    ctaLabel: 'Subscribe now',
  }),
  t({
    path: ROUTES.checklistRetirementPlanning,
    breadcrumb: ['Checklist for planning your retirement'],
    title: 'Checklist for planning your retirement',
    subtitle: 'Order the fact sheet free of charge.',
    intro: [
      'Retirement marks the transition into a new chapter of life — also from a financial point of view. To be able to look forward to your golden years, you will have to take a number of very significant decisions.',
      'Our checklist takes you through them step by step, starting roughly ten years before you plan to stop working.',
    ],
    highlights: [
      { title: 'Ten years before', text: 'Close contribution gaps and review your pension fund.' },
      { title: 'Five years before', text: 'Decide between pension and lump sum, plan withdrawals.' },
      { title: 'One year before', text: 'Register with the compensation office, adjust insurance.' },
      { title: 'After retirement', text: 'Manage drawdown, taxes and your estate.' },
    ],
    ctaLabel: 'Order for free',
  }),
  t({
    path: ROUTES.phishingProtection,
    breadcrumb: ['Protect your assets from phishing'],
    title: 'Protect your assets from phishing',
    subtitle: 'A practical guide for private clients.',
    intro: [
      'Phishing has become the most common route to unauthorised access to financial accounts. Even careful, well-informed people are occasionally caught by a convincing message.',
      'Our free guide explains how fraudsters target private investors, what to check before acting on any message that appears to come from your bank or from us, and what to do — and whom to call — in the first hour if something goes wrong. Because your assets are held at your bank and never with Helfenstein Group, we also explain which security measures your bank provides and how to use them.',
    ],
    highlights: [
      { title: 'How attacks work', text: 'The messages, calls and fake sites used against private investors.' },
      { title: 'What to check', text: 'The handful of checks that stop almost every attempt.' },
      { title: "Your bank's safeguards", text: 'Which protections your custodian bank provides, and how to switch them on.' },
      { title: 'If something goes wrong', text: 'Who to call in the first hour, and in what order.' },
    ],
    relatedSlugs: ['financial-portal-analysis', 'asset-custody-explained'],
    ctaLabel: 'Order for free',
  }),
];

export const topicByPath = new Map(topics.map((topic) => [topic.path, topic]));

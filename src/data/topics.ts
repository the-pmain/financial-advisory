import { ROUTES } from '../constants/routes';

export type ExpertiseTag =
  | 'retirement'
  | 'investments'
  | 'taxes'
  | 'real-estate'
  | 'estate'
  | 'companies'
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
  showCaseStudies?: boolean;
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
      'Helfenstein advises private clients on retirement, investments, estate planning, real estate, taxes and pensions. We are paid by our clients only — never by product providers — so our recommendations are free of any sales interest.',
      'Every mandate starts with a written analysis of your situation. You decide afterwards whether and how you would like to work with us.',
    ],
    highlights: [
      { title: 'Retirement', text: 'Work out exactly when you can afford to stop working, and what it will cost.' },
      { title: 'Investments', text: 'A clear strategy implemented with low-cost index funds and reviewed continuously.' },
      { title: 'Estate planning', text: 'Wills, marriage contracts and gifts arranged so your wishes are legally secure.' },
      { title: 'Taxes', text: 'Long-term tax planning that reliably saves thousands of francs.' },
    ],
    relatedSlugs: ['save-on-taxes-with-pillar-3a', 'financial-investments-what-you-need-know'],
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
    relatedSlugs: ['is-it-worth-paying-more-into-your-pension-fund', 'save-on-taxes-with-pillar-3a', 'early-retirement-cost-check'],
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
      { title: 'Independent of products', text: 'Recommendations are not driven by provider commissions.' },
    ],
  }),
  t({
    path: ROUTES.financialInvestments,
    breadcrumb: ['Individuals', 'Financial investments & portfolio management'],
    title: 'Financial investments & portfolio management',
    subtitle: 'A simple strategy, implemented efficiently.',
    intro: [
      'We combine a clearly defined investment strategy with low-cost implementation and active support. You always know what you own, what it costs and why it is in your portfolio.',
      'Because Helfenstein receives no retrocessions, the only fee you pay is the one agreed with us.',
    ],
    highlights: [
      { title: 'Asset management mandates', text: 'Discretionary management from a broadly diversified index core.' },
      { title: 'Index investments', text: 'Ongoing charges a fraction of those of actively managed funds.' },
      { title: 'Portfolio analysis', text: 'A written second opinion on the portfolio you hold today.' },
      { title: 'Custody with Swiss banking partners', text: 'Lower costs and no incentive to churn your portfolio.' },
    ],
    relatedSlugs: ['financial-investments-what-you-need-know', 'all-you-need-to-know-about-etfs'],
    expertiseTags: ['investments'],
    adviceDisclaimer: true,
    challenges: [
      { title: 'Cost drag', text: 'Fees and retrocessions quietly compound against long-term returns.' },
      { title: 'Unclear strategy', text: 'Portfolios often accumulate products without a written risk budget.' },
      { title: 'FinSA suitability', text: 'Advice must match your knowledge, goals and capacity for loss.' },
    ],
    benefits: [
      { title: 'Index-led core', text: 'Low-cost implementation with a clear strategic asset allocation.' },
      { title: 'Fee transparency', text: 'You know what you pay; we credit unavoidable third-party payments.' },
      { title: 'Ongoing review', text: 'Active support without an incentive to churn.' },
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
      'Helfenstein compares the market continuously, negotiates on your behalf and reviews affordability well before your fixed term expires.',
    ],
    highlights: [
      { title: 'Mortgage comparison', text: 'Current terms from more than a hundred Swiss lenders.' },
      { title: 'Refinancing', text: 'A structured tender when your existing fixed term runs out.' },
      { title: 'Affordability', text: 'A conservative check that still holds at higher interest rates.' },
      { title: 'Buying and selling', text: 'Valuations and support through the whole transaction.' },
    ],
    relatedSlugs: ['tips-for-foreigners-buying-real-estate', 'current-mortgage-interest-rates-comparison'],
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
      'Our experts show you how to structure those decisions and save thousands or even tens of thousands of francs.',
    ],
    highlights: [
      { title: 'Tax returns', text: 'Prepared and filed for individuals and the self-employed.' },
      { title: 'Pension capital withdrawals', text: 'Staggered over several years to keep the progression low.' },
      { title: 'Property taxation', text: 'Imputed rental value, maintenance and value-adding investments.' },
      { title: 'Relocation', text: 'What a change of canton or commune is actually worth.' },
    ],
    relatedSlugs: ['save-on-taxes-with-pillar-3a', 'cantonal-tax-relocation-checklist'],
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
      { title: 'Phishing insurance', text: 'Protection against attacks that succeed despite precautions.' },
    ],
    relatedSlugs: ['compulsory-insurance-switzerland', 'how-to-spot-financial-scams-switzerland'],
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
      { title: 'Pillar 3a with index investments', text: 'The best index funds, at a fraction of the usual fees.' },
      { title: 'Voluntary purchases', text: 'When buying into your pension fund genuinely pays off.' },
      { title: 'Several accounts', text: 'Staggered withdrawals that reduce the tax on your capital.' },
      { title: 'Vested benefits', text: 'Where to place your capital between jobs.' },
    ],
    relatedSlugs: ['save-on-taxes-with-pillar-3a', 'is-it-worth-paying-more-into-your-pension-fund'],
    expertiseTags: ['pensions', 'retirement'],
    adviceDisclaimer: true,
  }),
  t({
    path: ROUTES.banking,
    breadcrumb: ['Individuals', 'Banking'],
    title: 'Banking',
    subtitle: 'Secure custody through Swiss banking partners.',
    intro: [
      'Client assets are held with selected Swiss custody partners so that securities stay segregated and transparent. Helfenstein Asset Management AG provides portfolio management and advice; we do not operate a bank of our own.',
      'Clients benefit from transparent custody fees, clear reporting and Swiss regulatory protections applicable to the chosen custodian.',
    ],
    highlights: [
      { title: 'Securities custody', text: 'Transparent, flat custody pricing with no hidden margins.' },
      { title: 'Accounts and cards', text: 'Everyday banking alongside your investment portfolio where available.' },
      { title: 'Mortgages', text: 'Financing arranged on comparison-tested terms.' },
      { title: 'Security', text: 'Multi-factor access and continuous fraud monitoring.' },
    ],
  }),

  /* -- Companies -- */
  t({
    path: ROUTES.companies,
    breadcrumb: ['Companies'],
    title: 'Companies',
    subtitle: 'From pension funds to succession planning.',
    intro: [
      'Helfenstein advises small and medium-sized Swiss companies on occupational pensions, insurance management, company formation and succession.',
      'Companies working with Helfenstein frequently reduce risk premiums and administration costs — in some tenders by around a quarter to a third — while reducing internal workload. Outcomes vary by scheme and provider.',
    ],
    highlights: [
      { title: 'Corporate succession planning', text: 'Valuation, buyer search and transaction management.' },
      { title: 'Pension funds', text: 'Benchmarking and restructuring of your occupational scheme.' },
      { title: 'Management pension plans', text: 'Tax-efficient additional cover for higher earners.' },
      { title: 'Insurance management', text: 'One partner for the whole corporate insurance portfolio.' },
    ],
    expertiseTags: ['companies'],
    adviceDisclaimer: true,
  }),
  t({
    path: ROUTES.companiesSuccession,
    breadcrumb: ['Companies', 'Corporate succession planning'],
    title: 'Corporate succession planning',
    subtitle: 'Hand over your company on your own terms.',
    intro: [
      'Selling a company is something most owners do once. Valuation, tax structuring, buyer search and negotiation all have to fit together, and the process typically takes one to two years.',
      'Helfenstein manages the whole transaction and represents your interests from the first valuation to the closing.',
    ],
    highlights: [
      { title: 'Company valuation', text: 'A defensible figure based on sustainable earnings.' },
      { title: 'Buyer search', text: 'Discreet approach to strategic and financial buyers.' },
      { title: 'Tax structuring', text: 'Arranging the sale so the proceeds are not eroded by tax.' },
      { title: 'Transaction management', text: 'Due diligence, contracts and closing coordinated for you.' },
    ],
    expertiseTags: ['companies'],
    adviceDisclaimer: true,
    challenges: [
      { title: 'One-time process', text: 'Most owners sell once; valuation, tax and buyer search must fit together.' },
      { title: 'Tax leakage', text: 'Poor structuring can erode a large share of proceeds.' },
      { title: 'Confidentiality', text: 'A public sale process can unsettle staff and customers.' },
    ],
    benefits: [
      { title: 'End-to-end mandate', text: 'From first valuation to closing under one lead.' },
      { title: 'Discreet buyer search', text: 'Strategic and financial buyers approached carefully.' },
      { title: 'Tax coordination', text: 'Structure aligned with your personal and corporate situation.' },
    ],
  }),
  t({
    path: ROUTES.companiesPensionFunds,
    breadcrumb: ['Companies', 'Pension funds'],
    title: 'Pension funds',
    subtitle: 'Benchmark premiums and administration against the market.',
    intro: [
      'Occupational pension costs are one of the largest and least-examined items on a Swiss payroll. Risk premiums and administration charges vary widely between providers for identical benefits.',
      'We benchmark your current scheme, put it out to tender and manage the transfer. Savings depend on your starting point; some employers see reductions on the order of a quarter when schemes have not been re-tendered for years.',
    ],
    highlights: [
      { title: 'Benchmarking', text: 'Your current premiums measured against the market.' },
      { title: 'Tender process', text: 'Comparable offers from all relevant providers.' },
      { title: 'Plan design', text: 'Benefits structured around your workforce.' },
      { title: 'Administration', text: 'Payroll reporting and member changes handled for you.' },
    ],
    relatedSlugs: ['bgv-scheme-benchmarking-smes'],
    expertiseTags: ['companies', 'pensions'],
    adviceDisclaimer: true,
  }),
  t({
    path: ROUTES.companiesManagementPensionPlans,
    breadcrumb: ['Companies', 'Management pension plans'],
    title: 'Management pension plans',
    subtitle: 'Additional cover for higher earners.',
    intro: [
      'Above a certain salary, the standard occupational scheme replaces only a small share of income. A separate management plan closes that gap and creates substantial scope for tax-deductible contributions.',
      'We design the plan, document it and integrate it with the base scheme.',
    ],
    highlights: [
      { title: '1e plans', text: 'Individual investment strategies for salaries above the threshold.' },
      { title: 'Purchase potential', text: 'Creating room for deductible voluntary contributions.' },
      { title: 'Risk cover', text: 'Death and disability benefits matched to income.' },
      { title: 'Governance', text: 'Regulations and reporting that satisfy the auditors.' },
    ],
  }),
  t({
    path: ROUTES.companiesInsuranceManagement,
    breadcrumb: ['Companies', 'Insurance management'],
    title: 'Insurance management',
    subtitle: 'One partner for your whole insurance portfolio.',
    intro: [
      'Corporate insurance tends to accumulate rather than be designed. Policies overlap, sums insured drift away from reality and premiums are rarely re-tendered.',
      'Helfenstein takes an inventory, removes the duplication and manages renewals and claims on your behalf.',
    ],
    highlights: [
      { title: 'Portfolio review', text: 'Every policy assessed for cover, gaps and price.' },
      { title: 'Tendering', text: 'Renewals put out to market on comparable terms.' },
      { title: 'Claims handling', text: 'We represent you when a loss occurs.' },
      { title: 'Reporting', text: 'A single annual overview of cover and cost.' },
    ],
  }),
  t({
    path: ROUTES.companiesEstablishing,
    breadcrumb: ['Companies', 'Establishing a company'],
    title: 'Establishing a company',
    subtitle: 'Our start-up compass guides you from idea to first salary.',
    intro: [
      'Setting up a business in Switzerland involves a sequence of decisions — legal form, capital, social insurance, VAT registration, pensions — each of which is hard to reverse later.',
      'The Helfenstein start-up compass takes you through them in the right order, with the paperwork prepared for you.',
    ],
    highlights: [
      { title: 'Legal form', text: 'Sole proprietorship, GmbH or AG — what each really means.' },
      { title: 'Social insurance', text: 'Registration and the cover the self-employed lack.' },
      { title: 'Pensions', text: 'Building a pillar 3a and, where useful, an occupational scheme.' },
      { title: 'Taxes and VAT', text: 'Registration thresholds and accounting requirements.' },
    ],
  }),

  /* -- About Helfenstein -- */
  t({
    path: ROUTES.about,
    breadcrumb: ['About Helfenstein'],
    title: 'About Helfenstein',
    subtitle: 'Independent advice from Lucerne.',
    intro: [
      'Helfenstein Asset Management AG is a Swiss portfolio manager based in Lucerne. We advise private and institutional clients on asset management, financial advice, retirement planning and financing advice.',
      'We are listed by FINMA as an authorised portfolio manager and supervised by OSFINcontrol AG. Our income comes from the fees our clients agree with us.',
    ],
    highlights: [
      { title: 'Independent advice', text: 'No retrocessions, no product sales targets.' },
      { title: 'How we are regulated', text: 'FINMA portfolio-manager authorisation, OSFINcontrol supervision, FinSA and client documents.' },
      { title: 'Team', text: 'Specialists who stay with you over the long term.' },
      { title: 'Client stories', text: 'Anonymised examples of how advice is delivered in practice.' },
    ],
  }),
  t({
    path: ROUTES.aboutIndependentAdvice,
    breadcrumb: ['About Helfenstein', 'Independent advice'],
    title: 'Independent advice',
    subtitle: 'Paid by our clients. By nobody else.',
    intro: [
      'Most financial advice in Switzerland is funded by the products it recommends. That arrangement is invisible to the client and it systematically favours expensive solutions.',
      'Helfenstein is paid only by its clients. We publish our fees, we pass on any retrocession we cannot avoid, and our advisers have no product sales targets.',
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
    breadcrumb: ['About Helfenstein', 'How we are regulated'],
    title: 'How we are regulated',
    subtitle: 'Who supervises Helfenstein, what FinSA means for you, and how fees work.',
    intro: [
      'Swiss financial advice is governed primarily by the Financial Services Act (FinSA) and, for portfolio managers, by FINMA authorisation with day-to-day supervision by a recognised supervisory organisation. This page explains the framework in plain language.',
      'Helfenstein Asset Management AG is listed by FINMA as an authorised portfolio manager and is supervised by OSFINcontrol AG. You can verify our authorisation on the official FINMA register (UID CHE-111.708.730, LEI 894500URZFTDV5G7F357).',
      'Under FinSA, firms must inform you about services, costs, client segmentation and conflicts of interest before providing personalised advice. Independent advice at Helfenstein is paid by clients; we do not earn product commissions.',
      'If a dispute cannot be resolved with us directly, you may contact the ombudsman office with which we are affiliated. Details appear in our FinSA client brochure and under Documents and information.',
    ],
    highlights: [
      { title: 'FINMA register', text: 'Check authorised institutions and individuals on finma.ch.' },
      { title: 'FinSA conduct rules', text: 'Transparency on services, fees, suitability and conflicts.' },
      { title: 'Client documents', text: 'Fee schedule, GTC, risk disclosure and FinSA brochure.' },
      { title: 'Ombudsman', text: 'An independent route if a complaint cannot be settled.' },
    ],
    relatedSlugs: ['finsa-what-clients-should-know', 'how-to-spot-financial-scams-switzerland'],
    showVerifyFinma: true,
    showDocuments: true,
    adviceDisclaimer: true,
  }),
  t({
    path: ROUTES.aboutClientStories,
    breadcrumb: ['About Helfenstein', 'Client stories'],
    title: 'Client stories',
    subtitle: 'Anonymised examples of advice delivered in practice.',
    intro: [
      'These summaries illustrate typical mandates. They are not performance guarantees, and every client situation is different.',
      'Names and identifying details have been removed. Figures describe outcomes for those specific cases only.',
    ],
    highlights: [
      { title: 'Retirement decisions', text: 'Pension versus lump sum modelled in writing.' },
      { title: 'Corporate pensions', text: 'BVG tenders that reset premiums and administration.' },
      { title: 'Mortgages', text: 'Structured refinancing before fixed terms expire.' },
      { title: 'Talk to us', text: 'A free first meeting is the usual starting point.' },
    ],
    showCaseStudies: true,
    adviceDisclaimer: true,
  }),
  t({
    path: ROUTES.aboutBranchOffices,
    breadcrumb: ['About Helfenstein', 'Branch offices'],
    title: 'Branch offices',
    subtitle: 'Based in Lucerne, advising clients across Switzerland.',
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
    breadcrumb: ['About Helfenstein', 'Portrait'],
    title: 'Portrait',
    subtitle: 'A Lucerne-based asset manager with a clear advisory model.',
    intro: [
      'Helfenstein Asset Management AG advises private and institutional clients on asset management, financial advice, retirement planning and financing advice from its office in Lucerne.',
      'Client assets are held with selected Swiss custody partners. We are authorised by FINMA as a portfolio manager and supervised by OSFINcontrol AG.',
    ],
    highlights: [
      { title: 'Asset management', text: 'Portfolio mandates built around a clear investment process.' },
      { title: 'Financial advice', text: 'Retirement, financing and personal planning alongside investments.' },
      { title: 'Custody partners', text: 'Segregated custody with authorised Swiss banks.' },
      { title: 'Lucerne', text: 'Pilatusstrasse 23, 6003 Luzern.' },
    ],
  }),
  t({
    path: ROUTES.aboutInvestorRelations,
    breadcrumb: ['About Helfenstein', 'Investor relations'],
    title: 'Investor relations',
    subtitle: 'Reports, key figures and the financial calendar.',
    intro: [
      'This section brings together company information, media contacts and answers for professional investors and partners of Helfenstein Asset Management AG.',
      'Contact our investor relations team with any further questions.',
    ],
    highlights: [
      { title: 'Company profile', text: 'Legal name, UID, LEI and Lucerne address.' },
      { title: 'Regulation', text: 'FINMA portfolio manager; supervised by OSFINcontrol AG.' },
      { title: 'Services', text: 'Asset management, advice, retirement and financing.' },
      { title: 'Contact', text: '+41 41 211 29 29 · Pilatusstrasse 23, Luzern.' },
    ],
  }),
  t({
    path: ROUTES.aboutJobs,
    breadcrumb: ['About Helfenstein', 'Jobs & careers'],
    title: 'Jobs & careers',
    subtitle: 'Advisory work without sales targets.',
    intro: [
      'Because Helfenstein earns nothing from products, our advisers are measured on the quality of their advice rather than on volumes sold. That changes the job fundamentally.',
      'We are continually looking for advisers, specialists and Graduates across the whole world.',
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
    breadcrumb: ['About Helfenstein', 'Contact & help'],
    title: 'Contact & help',
    subtitle: 'We are happy to hear from you.',
    intro: [
      'Call us, write to us or arrange a free first meeting at our Lucerne office. Our advisers speak German, French, Italian and English.',
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
      'Talk to an expert at Helfenstein about your retirement, your investments, your taxes or your mortgage. The first consultation costs you nothing and commits you to nothing.',
      'Choose a branch office and a time that suits you, and tell us briefly what you would like to discuss.',
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
      'Helfenstein publishes research on retirement, pensions, taxes, mortgages and investing, together with checklists you can order and calculators we are expanding over time.',
      'Start with the horizon report, browse insights by topic, or open the full article index. Everything here is free; some tools require registration.',
    ],
    highlights: [
      { title: 'Horizon report 2026', text: 'Pensions, mortgages and FinSA developments in plain language.' },
      { title: 'Insights index', text: 'All articles sorted by date, with topic tags.' },
      { title: 'Fact sheets', text: 'Concise printed guides, sent free of charge.' },
      { title: 'Calculators', text: 'Retirement and affordability tools — more on the way.' },
    ],
    relatedSlugs: [
      'horizon-report-2026',
      'financial-investments-what-you-need-know',
      'all-you-need-to-know-about-etfs',
      'finsa-what-clients-should-know',
    ],
  }),
  t({
    path: ROUTES.regulatoryAndCompliance,
    breadcrumb: ['Regulatory & compliance'],
    title: 'Regulatory & compliance',
    subtitle: 'Supervision, FinSA information and client documents.',
    intro: [
      'This hub brings together how Helfenstein is supervised, what FinSA means for clients, and the documents that accompany our services.',
      'Helfenstein Asset Management AG is listed by FINMA as an authorised portfolio manager and supervised by OSFINcontrol AG. Advisory relationships are subject to FinSA conduct rules, including transparency on fees, conflicts and client segmentation.',
    ],
    highlights: [
      { title: 'Verify authorisation', text: 'Use the FINMA register to confirm supervised entities.' },
      { title: 'Client documents', text: 'Fee schedule, GTC, risk disclosure and FinSA brochure.' },
      { title: 'Conflicts of interest', text: 'How we disclose and manage them.' },
      { title: 'Complaints', text: 'Contact us first; then the affiliated ombudsman if needed.' },
    ],
    relatedSlugs: ['finsa-what-clients-should-know', 'how-to-spot-financial-scams-switzerland'],
    showVerifyFinma: true,
    showDocuments: true,
    adviceDisclaimer: true,
  }),
  t({
    path: ROUTES.financialPortal,
    breadcrumb: ['Helfenstein Financial Portal'],
    title: 'Helfenstein Financial Portal',
    subtitle: 'Your portfolio, your documents, your markets.',
    intro: [
      'The Helfenstein Financial Portal gives you a consolidated view of your accounts and portfolios, all your documents, and real-time market data.',
      'The Pro version adds depth-of-market data, advanced charting and direct order entry on all major exchanges.',
    ],
    highlights: [
      { title: 'Portfolio overview', text: 'Consolidated performance across all your holdings.' },
      { title: 'Documents', text: 'Statements and tax documents in one archive.' },
      { title: 'Trading', text: 'Order entry on Swiss and international exchanges.' },
      { title: 'Security', text: 'Two-factor authentication on every login.' },
    ],
    relatedSlugs: ['helfenstein-financial-portal-pro', 'how-to-spot-financial-scams-switzerland'],
    ctaLabel: 'Sign up for free',
  }),
  t({
    path: ROUTES.stockExchangesAndMarkets,
    breadcrumb: ['Prices and markets'],
    title: 'Helfenstein stock exchanges & markets',
    subtitle: 'Latest share prices, news and analyses.',
    intro: [
      'Reliable information, real-time share prices and useful tools — all in one place, and free to use once you have registered.',
      'Follow indices, currencies, interest rates and individual securities, and set alerts on the positions that matter to you.',
    ],
    highlights: [
      { title: 'Real-time prices', text: 'Swiss and international equities, indices and currencies.' },
      { title: 'Watchlists', text: 'Track the securities you care about and set alerts.' },
      { title: 'Analyses', text: 'Commentary from our investment specialists.' },
      { title: 'Tools', text: 'Screeners, charts and portfolio simulations.' },
    ],
    relatedSlugs: ['all-you-need-to-know-about-etfs', 'financial-investments-what-you-need-know'],
    ctaLabel: 'Sign up for free',
  }),
  t({
    path: ROUTES.newsletter,
    breadcrumb: ['Subscribe to newsletter'],
    title: 'Subscribe to our newsletter',
    subtitle: 'Regular updates on optimising your pensions.',
    intro: [
      'Get regular updates on how to optimise your OASI, occupational and pillar 3 pensions. The newsletter is published in German, French and Italian.',
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
    path: ROUTES.phishingInsurance,
    breadcrumb: ['Helfenstein phishing insurance'],
    title: 'Protect your assets with Helfenstein phishing insurance',
    subtitle: 'Cover for attacks that succeed despite every precaution.',
    intro: [
      'Phishing has become the most common route to unauthorised access to financial accounts. Even careful, well-informed people are occasionally caught by a convincing message.',
      'Helfenstein phishing insurance covers the financial loss if an attack succeeds despite the security measures and precautions in place.',
    ],
    highlights: [
      { title: 'What is covered', text: 'Losses from unauthorised transactions following an attack.' },
      { title: 'Who is covered', text: 'Available to Helfenstein advisory clients with eligible custody arrangements.' },
      { title: 'Prevention', text: 'Practical guidance on recognising fraudulent messages.' },
      { title: 'Claims', text: 'A single point of contact if something goes wrong.' },
    ],
    ctaLabel: 'Order for free',
  }),
];

export const topicByPath = new Map(topics.map((topic) => [topic.path, topic]));

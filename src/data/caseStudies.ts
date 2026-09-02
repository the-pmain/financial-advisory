import { ROUTES } from '../constants/routes';

export type CaseStudy = {
  id: string;
  title: string;
  sector: string;
  summary: string;
  outcome: string;
  to: string;
};

/** Anonymised client stories — illustrative, not performance guarantees. */
export const caseStudies: CaseStudy[] = [
  {
    id: 'pension-vs-lump-sum',
    title: 'Pension or lump sum before retirement',
    sector: 'Retirement',
    summary:
      'A couple aged 62 needed a written comparison of drawing the pension fund as a lifelong annuity versus a staggered lump-sum withdrawal, including tax progression and longevity risk.',
    outcome:
      'A side-by-side model over life expectancy showed a hybrid approach preserved liquidity while securing a floor income — adopted after the free first meeting.',
    to: ROUTES.retirement,
  },
  {
    id: 'pension-fund-tender',
    title: 'Occupational pension fund tender',
    sector: 'Companies',
    summary:
      'An SME with 85 employees had not re-tendered its BVG scheme in eight years. Risk premiums and administration charges sat well above current market levels for identical benefits.',
    outcome:
      'After benchmarking and a structured tender, the company reduced combined risk and administration costs by around a quarter while improving disability cover.',
    to: ROUTES.companiesPensionFunds,
  },
  {
    id: 'mortgage-refi',
    title: 'Mortgage refinancing on expiry',
    sector: 'Real estate',
    summary:
      'A homeowner with a CHF 1.1m fixed-rate mortgage approaching term end needed a comparable tender across banks, insurers and pension funds before rates locked in.',
    outcome:
      'Helfenstein ran a structured comparison; the chosen offer improved on the published list rate and saved several thousand francs a year versus the incumbent renewal.',
    to: ROUTES.realEstate,
  },
];

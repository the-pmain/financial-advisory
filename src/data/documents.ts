export type ClientDocument = {
  id: string;
  title: string;
  description: string;
  href: string;
};

/** Placeholder PDFs under /public/documents — replace with real filings before production. */
export const clientDocuments: ClientDocument[] = [
  {
    id: 'fee-schedule',
    title: 'Schedule of fees and charges',
    description:
      'Our advisory and portfolio management fees currently in force. (Custody and transaction fees are charged by your bank and shown separately.)',
    href: '/documents/fee-schedule.txt',
  },
  {
    id: 'gtc',
    title: 'General terms and conditions',
    description: 'Contractual framework for our advisory and portfolio management relationship with you.',
    href: '/documents/general-terms-and-conditions.txt',
  },
  {
    id: 'risk-disclosure',
    title: 'Risk disclosure',
    description: 'Information on the risks involved in trading financial instruments.',
    href: '/documents/risk-disclosure.txt',
  },
  {
    id: 'finsa-brochure',
    title: 'FinSA client brochure',
    description: 'Services, client segmentation and your rights under the Financial Services Act.',
    href: '/documents/finsa-client-brochure.txt',
  },
  {
    id: 'conflicts',
    title: 'Conflicts of interest policy',
    description: 'How we identify, disclose and manage conflicts of interest.',
    href: '/documents/conflicts-of-interest-policy.txt',
  },
];

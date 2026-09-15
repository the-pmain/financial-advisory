export type ClientDocument = {
  id: string;
  title: string;
  description: string;
  href: string;
};

/** Dated client PDFs under /public/documents. */
export const clientDocuments: ClientDocument[] = [
  {
    id: 'fee-schedule',
    title: 'Schedule of fees and charges',
    description:
      'Our advisory, portfolio management and performance fees currently in force. (Custody and transaction fees are charged by your bank and shown separately.)',
    href: '/documents/fee-schedule.pdf',
  },
  {
    id: 'gtc',
    title: 'General terms and conditions',
    description: 'Contractual framework for our advisory and portfolio management relationship with you.',
    href: '/documents/general-terms-and-conditions.pdf',
  },
  {
    id: 'risk-disclosure',
    title: 'Risk disclosure',
    description: 'Information on the risks involved in trading financial instruments.',
    href: '/documents/risk-disclosure.pdf',
  },
  {
    id: 'finsa-brochure',
    title: 'FinSA client brochure',
    description:
      'Services, client segmentation, your FinSA rights and the FINOS ombudsman contact details.',
    href: '/documents/finsa-client-brochure.pdf',
  },
  {
    id: 'conflicts',
    title: 'Conflicts of interest policy',
    description: 'How we identify, disclose and manage conflicts of interest, with examples.',
    href: '/documents/conflicts-of-interest-policy.pdf',
  },
];

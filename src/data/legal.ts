import {
  applicableLawLine,
  commercialRegisterLine,
  company,
  dataProtectionLine,
  finmaAuthorisationLine,
  osfinSupervisionLine,
} from './company';

export type LegalPage = {
  slug: string;
  title: string;
  sections: { heading?: string; paragraphs: string[] }[];
};

export const legalPages: LegalPage[] = [
  {
    slug: 'legal-notices',
    title: 'Legal Notices',
    sections: [
      {
        paragraphs: [
          `The information published on this website is provided for general information purposes only. It does not constitute an offer, a recommendation or an invitation to buy or sell any financial instrument, nor does it constitute investment, legal or tax advice. ${company.legalName} (${company.groupName}) is an independent adviser and portfolio manager; it does not hold client assets, which remain with the client's chosen custodian bank.`,
        ],
      },
      {
        heading: 'No warranty',
        paragraphs: [
          'While the content of this website is compiled with care, no warranty is given as to its accuracy, completeness or timeliness. Liability for any loss arising from the use of this website is excluded to the extent permitted by law.',
          'Market data and prices are indicative and may be delayed. They are not suitable as a basis for investment decisions.',
        ],
      },
      {
        heading: 'Links to third-party sites',
        paragraphs: [
          'This website contains links to websites operated by third parties. Such links are provided for convenience only. We have no control over the content of those sites and accept no responsibility for it.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'All content on this website is protected by copyright. Reproduction, transmission or modification, in whole or in part, requires prior written consent.',
        ],
      },
      {
        heading: 'Applicable law',
        paragraphs: [
          applicableLawLine(),
          `Use of this website is governed by ${company.applicableLaw.governing}. Exclusive jurisdiction lies with the ${company.applicableLaw.venue}. The United Nations Convention on Contracts for the International Sale of Goods (CISG) does not apply.`,
        ],
      },
    ],
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    sections: [
      {
        paragraphs: [
          'We take the protection of your personal data seriously and process it in accordance with the Swiss Federal Act on Data Protection and, where applicable, the General Data Protection Regulation.',
        ],
      },
      {
        heading: 'What data we process',
        paragraphs: [
          'When you visit this website we process technical data such as the pages requested, the time of the request, the browser and operating system used, and an abbreviated IP address.',
          'If you contact us, order a fact sheet or arrange an appointment, we process the contact details and other information you provide in order to respond to your request.',
        ],
      },
      {
        heading: 'Cookies and tracking',
        paragraphs: [
          'We use cookies that are technically necessary for the operation of the website, and — with your consent — cookies that help us understand how the website is used so we can improve it.',
          'You can withdraw your consent at any time and delete cookies through your browser settings.',
        ],
      },
      {
        heading: 'Disclosure to third parties',
        paragraphs: [
          'We disclose personal data to third parties only where necessary to provide our services, where you have consented, or where we are legally obliged to do so.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You have the right to request information about the personal data we hold about you, and to have inaccurate data corrected or unlawfully processed data deleted.',
        ],
      },
      {
        heading: 'Controller',
        paragraphs: [
          `${company.legalName} (${company.groupName}), ${company.address.line}. Phone: ${company.phone}.` +
            (company.privacyEmail ? ` Email: ${company.privacyEmail}.` : ''),
          dataProtectionLine(),
          `The revised Swiss Federal Act on Data Protection does not issue a separate public controller licence. ${company.dataProtection.registration} is our UID, used to identify the controller with the ${company.dataProtection.authority} (${company.dataProtection.authorityUrl}).`,
        ],
      },
    ],
  },
  {
    slug: 'documents-and-information',
    title: 'Documents and information',
    sections: [
      {
        paragraphs: [
          'This section brings together the regulatory documents and client information relating to our services.',
        ],
      },
      {
        heading: 'Client information',
        paragraphs: [
          'General terms and conditions, the schedule of fees and charges, and information on the risks involved in trading financial instruments are available for download below.',
        ],
      },
      {
        heading: 'Financial services act',
        paragraphs: [
          `Information on our services, client segmentation, the handling of conflicts of interest and our affiliation with ${company.ombudsman.name} is set out in the FinSA client brochure. Ombudsman reference ${company.ombudsman.reference}; ${company.ombudsman.addressLine}; ${company.ombudsman.phone}; ${company.ombudsman.email}; ${company.ombudsman.website}.`,
        ],
      },
      {
        heading: 'Company information',
        paragraphs: [
          `${company.legalName} (trading as ${company.groupName}) publishes regulatory and client information on this website. The company is an independent, fee-only adviser and FINMA-authorised portfolio manager (${finmaAuthorisationLine()}; ${osfinSupervisionLine()}); it does not hold client assets.`,
          commercialRegisterLine(),
          `Company identity ${company.commercialRegister.hrNumber}. View the current record on Zefix (${company.commercialRegister.zefixUrl}) or request a certified extract from us or the ${company.commercialRegister.office}.`,
        ],
      },
    ],
  },
  {
    slug: 'impressum',
    title: 'Impressum',
    sections: [
      {
        heading: 'Publisher',
        paragraphs: [
          `${company.legalName}`,
          company.address.line,
          `Phone: ${company.phone}`,
          `Swiss UID: ${company.uid}`,
          `LEI: ${company.lei}`,
        ],
      },
      {
        heading: 'Business',
        paragraphs: [company.business],
      },
      {
        heading: 'Supervision',
        paragraphs: [
          `${company.legalName} is ${company.regulation.summary}`,
          finmaAuthorisationLine(),
          osfinSupervisionLine(),
          `Clients can verify authorisations on the official FINMA register (${company.regulation.registerUrl}).`,
          `LEI record: ${company.leiUrl}`,
          `Ombudsman: ${company.ombudsman.name}, ${company.ombudsman.addressLine}, ${company.ombudsman.phone}, ${company.ombudsman.email}, ${company.ombudsman.website}. Reference Number: ${company.ombudsman.reference}.`,
        ],
      },
      // "Design and realisation" is intentionally absent until the agency name
      // is confirmed; technology credits do not belong on a client-facing
      // Impressum.
    ],
  },
  {
    slug: 'audit-reports',
    title: 'Audit reports',
    sections: [
      {
        paragraphs: [
          `${company.legalName} is subject to the Swiss Code of Obligations. The current statutory auditor (Revisionsstelle), or a valid opting-out resolution, is the appointment filed at the ${company.commercialRegister.office}.`,
        ],
      },
      {
        heading: 'How to verify',
        paragraphs: [
          `Audited by: ${company.audit.firm}.`,
          `Latest audit report: ${company.audit.latestLabel} | Download PDF (${company.audit.pdfHref}).`,
          `Audit partner: ${company.audit.partner}.`,
          `Next scheduled audit: ${company.audit.nextAudit}.`,
          `Confirm the live filing on Zefix (${company.audit.zefixUrl}) together with UID ${company.uid} and LEI ${company.lei}.`,
        ],
      },
    ],
  },
];

export const legalBySlug = new Map(legalPages.map((page) => [page.slug, page]));

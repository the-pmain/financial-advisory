import { AGREEMENT_DEFAULTS, formatUkDate } from './document-fields.js';

const WEBSITE = 'https://financial-advisory-production.up.railway.app/';
const DEFAULT_BANKS = [
  'Luzerner Kantonalbank AG',
  'UBS Switzerland AG',
  'Bank Vontobel AG',
];

function present(value) {
  const raw = value == null ? '' : String(value).trim();
  if (!raw || /^\[[^\]]+\]$/.test(raw)) return '';
  return raw;
}

function joinFacts(parts, sep = '  ·  ') {
  return parts.map(present).filter(Boolean).join(sep);
}

function bankList(register) {
  const named = (register?.custodyBanks ?? [])
    .map((bank) => bank?.name)
    .filter(Boolean);
  return named.length ? named.join(', ') : DEFAULT_BANKS.join(', ');
}

export function resolveAgreementContext(values = {}, register = {}) {
  const firm = register?.firm ?? {};
  const ombudsman = register?.ombudsman ?? {};
  const consentGiven = present(values.clientConsent) === 'Given' || values.clientConsent === true;

  return {
    groupName: register?.groupName || 'Helfenstein Group',
    legalName: firm.legalName || 'Helfenstein Asset Management AG',
    addressLine: firm.addressLine || 'Pilatusstrasse 23, 6003 Luzern, Switzerland',
    phone: firm.phone || '+41 41 211 29 29',
    uid: firm.uid || 'CHE-111.708.730',
    lei: firm.lei || '894500URZFTDV5G7F357',
    website: register?.website || WEBSITE,
    keyContact: register?.keyContact || 'Friedrich Hartmann',
    feeEarner: present(values.feeEarner) || present(register?.feeEarner) || 'Friedrich Hartmann',
    regulator: register?.regulation?.authority || 'FINMA',
    supervisor: register?.regulation?.supervisor || 'OSFINcontrol AG',
    clientName: present(values.clientName),
    clientEmail: present(values.clientEmail),
    clientPhone: present(values.clientPhone),
    clientConsent: consentGiven,
    intakeDate:
      formatUkDate(values.intakeDate) ||
      formatUkDate(values.agreementDate) ||
      present(values.intakeDate),
    agreementDate:
      formatUkDate(values.intakeDate) ||
      formatUkDate(values.agreementDate) ||
      present(values.intakeDate) ||
      present(values.agreementDate),
    custodyExamples: bankList(register),
    ombudsmanName: ombudsman.name || 'Finanzombudsstelle Schweiz (FINOS)',
    ombudsmanAddress: ombudsman.addressLine || 'Freigutstrasse 8, 8002 Zurich, Switzerland',
    ombudsmanPhone: ombudsman.phone || '+41 44 552 08 00',
    ombudsmanEmail: ombudsman.email || 'info@finos.ch',
    ombudsmanWeb: ombudsman.website || 'https://www.finos.ch',
  };
}

export function buildAgreementSections(ctx) {
  const clientParty = ctx.clientName || 'the Client named in the parties block';
  const clientContact = joinFacts([ctx.clientEmail, ctx.clientPhone], ' and ');
  const intakeBits = [];
  if (ctx.intakeDate) intakeBits.push(`The consultation form was received on ${ctx.intakeDate}.`);
  if (ctx.clientConsent) intakeBits.push('Consultation-form consent was given.');

  const clientDuties = [
    '3.1 Information. The Client will provide complete and accurate financial documentation and will correct it promptly if it changes. The Adviser may rely on information supplied until it is corrected in writing.',
    '3.2 Responses. The Client will answer reasonable queries in a timely manner so that suitability assessments, reports and instructions are not delayed.',
    '3.3 Material changes. The Client will notify the Adviser without undue delay of material changes in circumstances, including income, liabilities, family status, tax residence, risk capacity, or restrictions on assets.',
    '3.4 Reviews. The Client will make themselves available for the agreed reviews (quarterly) and will grant the Adviser read access to custody statements needed for those reviews.',
  ];
  if (intakeBits.length) {
    clientDuties.push(`3.5 Intake record. ${intakeBits.join(' ')}`);
  }

  const communication = clientContact
    ? `4.3 Communication. Day-to-day contact is with ${ctx.feeEarner}. Formal notices go to ${ctx.legalName}, ${ctx.addressLine}, ${ctx.phone}. Notices to the Client go to ${clientContact}. The website of record is ${ctx.website}.`
    : `4.3 Communication. Day-to-day contact is with ${ctx.feeEarner}. Formal notices go to ${ctx.legalName}, ${ctx.addressLine}, ${ctx.phone}. The website of record is ${ctx.website}.`;

  return [
    {
      title: '1. Engagement scope',
      paragraphs: [
        `1.1 Nature of the relationship. This private-wealth client agreement (the “Agreement”)${ctx.agreementDate ? ` is dated ${ctx.agreementDate} and` : ''} is made between ${clientParty} and ${ctx.legalName} (the “Adviser”). The Adviser is an independent, fee-only financial adviser authorised as a portfolio manager and supervised in Switzerland. This is a non-discretionary investment-advisory mandate. The Adviser provides written recommendations and monitoring. The Client retains execution authority and decides whether and when to deal. The Adviser does not place orders unless the Client separately instructs it in writing.`,
        `1.2 Services included. Subject to clause 1.3, the engagement covers: ${AGREEMENT_DEFAULTS.servicesIncluded}`,
        `1.3 Services not included. The following are outside this engagement unless a separate written mandate is signed: ${AGREEMENT_DEFAULTS.servicesExcluded}`,
        '1.4 No product distribution. The Adviser does not sell financial products for commission, does not hold a product shelf that it is paid to prefer, and does not act as a bank, broker-dealer or custodian.',
      ],
    },
    {
      title: '2. Fee structure',
      paragraphs: [
        '2.1 Fees. The Adviser is paid only by the Client. Standard published rates apply: an annual percentage of assets under advice or management; hourly time at CHF 280; a written project quote; or a fixed retainer. The rate for work performed is stated on each invoice. Fees are exclusive of Swiss VAT where VAT is due.',
        '2.2 Percentage of assets under advice or management (AUM). Where this model is used, the annual fee is calculated on the average market value of the relevant assets in the billing period, using the Adviser’s standard bands. Custody, brokerage, stamp duty, exchange fees and product TER are charged by the custodian or the product issuer, never as a hidden Adviser commission.',
        '2.3 Hourly fees. Where this model is used, time is recorded in tenths of an hour at CHF 280. The first consultation of about one hour is not charged.',
        '2.4 Project-based fees. Where this model is used, the Adviser gives a written fixed quote before work starts (written second opinions from CHF 1,800). Work beyond the quoted scope is additional work under clause 2.7.',
        '2.5 Retainer. Where this model is used, a fixed retainer is payable in advance for the agreed period and covers the monitoring and meeting cadence described in the quote. Unused time is not refunded except as required on termination under clause 6.',
        '2.6 Invoicing and payment. Invoices are issued quarterly in arrears to the Client, or collected via the custodian bank if the Client so instructs. Payment is due within 20 days of the invoice date unless the invoice states a longer period.',
        `2.7 Additional work. Work outside the elected scope — including rushed reporting, extra tax-pack work, or a change of custodian — is charged at ${AGREEMENT_DEFAULTS.additionalWorkRate} The Adviser will notify the Client before starting such work where practicable.`,
        `2.8 Expenses. ${AGREEMENT_DEFAULTS.expenseReimbursement}`,
        '2.9 What we do not charge. The Adviser accepts no retrocessions, trailer fees or placement commissions. Any third-party payment that cannot be avoided is credited to the Client in full. There are no Adviser entry, exit or custody fees.',
      ],
    },
    {
      title: '3. Client responsibilities',
      paragraphs: clientDuties,
    },
    {
      title: '4. Adviser obligations',
      paragraphs: [
        '4.1 Duty of care. The Adviser owes the Client the care of a prudent independent portfolio manager and, within the scope of this mandate, a fiduciary duty to place the Client’s interests before its own. Advice is given solely in return for the fees in clause 2.',
        '4.2 Reporting. The Adviser will report quarterly in writing. Annual reporting includes a suitability refresh if personalised advice or discretionary management continues.',
        communication,
        '4.4 Conflicts. The Adviser will identify, disclose and manage conflicts of interest. Residual conflicts that cannot be prevented are disclosed in writing before the Adviser acts, and the Adviser may decline the assignment.',
        '4.5 No guarantee of outcome. FINMA authorisation and supervisory affiliation do not protect the Client against investment loss. Past performance is not a guide to future results.',
      ],
    },
    {
      title: '5. Asset custody',
      paragraphs: [
        '5.1 The Adviser never holds Client assets. Securities, cash and other assets remain in the Client’s name with a custodian bank or broker chosen by the Client. The Adviser is not a deposit-taking institution and does not operate a client account.',
        `5.2 Custodian. The Client chooses the custodian. Typical Swiss custody partners used by clients of the firm include ${ctx.custodyExamples}. The custody contract is solely between the Client and that institution.`,
        '5.3 Direct access. The Client retains direct access to the custody relationship, including statements, payment authorities and the right to revoke any limited power granted to the Adviser for reporting or instruction.',
        '5.4 Separation of functions. Advisory instructions are given by the Adviser; settlement, safekeeping and payments are performed by the custodian. The Adviser is not liable for the custodian’s acts or insolvency beyond duties it owes under Swiss law.',
      ],
    },
    {
      title: '6. Termination',
      paragraphs: [
        '6.1 Notice. Either party may terminate this Agreement in writing with 30 days’ notice, or immediately for cause (including a material breach that is not cured within 10 days of written notice, or a loss of regulatory authorisation).',
        '6.2 Asset transfer. On termination the Adviser will, at the Client’s instruction, revoke bank authorities it holds, deliver a closing report, and cooperate in good faith with a successor adviser. Assets remain with the custodian; they are not transferred through the Adviser.',
        '6.3 Fees on termination. Outstanding fees remain due. Prepaid amounts for unused periods of a retainer or annual AUM fee are refunded pro rata. Work already performed on a project quote is payable to the extent delivered.',
        '6.4 Post-termination support. For 15 days after the effective termination date the Adviser will answer reasonable handover questions without additional hourly charge. After that period, support is additional work under clause 2.7.',
      ],
    },
    {
      title: '7. Regulatory compliance',
      paragraphs: [
        `7.1 FINMA. ${ctx.legalName} (UID ${ctx.uid}) is listed by the Swiss Financial Market Supervisory Authority (FINMA) as an authorised portfolio manager and is supervised on an ongoing basis by ${ctx.supervisor}. Authorisation can be verified on the FINMA register of authorised institutions.`,
        `7.2 Legal entity identifier. Bloomberg LEI ${ctx.lei} identifies the Adviser on global markets infrastructure. It is not a product licence and is not a custody account.`,
        '7.3 Data protection. Personal data are processed under the Swiss Federal Act on Data Protection (FADP) and, where applicable, the EU GDPR for persons in the EEA. The Adviser is the controller; the UID identifies the controller to the FDPIC. Data are used to perform this mandate, to meet AML/KYC and FinSA duties, and as described in the privacy policy.',
        '7.4 AML and KYC. The Client will complete the Adviser’s identification and beneficial-owner checks and will supply updates if control or tax residence changes. The Adviser may decline or suspend the mandate if those checks cannot be completed.',
        '7.5 FinSA. Before personalised advice or discretionary management the Adviser collects knowledge, experience, financial situation and objectives, assesses appropriateness or suitability, and keeps a record of the relationship.',
      ],
    },
    {
      title: '8. Dispute resolution and language',
      paragraphs: [
        '8.1 Governing law. This Agreement is governed by Swiss substantive law, excluding the CISG and excluding conflict-of-law rules that would refer to another law.',
        '8.2 Jurisdiction. The exclusive place of jurisdiction is the ordinary courts of Lucerne, Canton of Luzern, subject to any mandatory consumer venue. The parties may instead bring a claim before the courts of the defendant’s domicile.',
        `8.3 Ombudsman and mediation. If a dispute about legal claims cannot be resolved with the Adviser, the Client may apply to ${ctx.ombudsmanName}, ${ctx.ombudsmanAddress}, ${ctx.ombudsmanPhone}, ${ctx.ombudsmanEmail}, ${ctx.ombudsmanWeb}. Mediation is informal and does not replace the courts. The parties may also agree in writing to arbitration seated in Switzerland.`,
        '8.4 Language. The governing language of this Agreement is English. A German (Deutsch) or French (Français) convenience translation may be issued on request. If a translation differs from the English text, the English text prevails. Headings appear in English; the cover line also carries the German designation “Kundenvertrag”.',
      ],
    },
    {
      title: '9. Signatures',
      paragraphs: [
        '9.1 Entire agreement. This Agreement, together with the schedule of fees, general terms, risk disclosure and FinSA brochure in force on the date of signing, is the entire agreement for this mandate. Changes must be in writing.',
        '9.2 Counterparts. The parties may sign counterparts, including electronic copies. Each counterpart is an original.',
        '9.3 Execution. The parties execute this Agreement by signing below. The typed name is the signatory’s legal name as recorded on the client record.',
      ],
    },
  ];
}

function letterheadBlocks(register, ctx) {
  const firm = register?.firm ?? {};
  return [
    { type: 'kicker', text: 'Client agreement  /  Kundenvertrag  ·  Confidential' },
    { type: 'title', text: firm.legalName || ctx.legalName },
    {
      type: 'p',
      text: [ctx.addressLine, ctx.phone, `UID ${ctx.uid}`, `LEI ${ctx.lei}`].filter(Boolean).join('  ·  '),
    },
    {
      type: 'p',
      text: `${ctx.regulator} authorised portfolio manager  ·  Supervised by ${ctx.supervisor}  ·  ${ctx.website}`,
    },
    { type: 'rule' },
    { type: 'subject', text: 'Private wealth management client agreement' },
  ];
}

function recordedName(value) {
  return present(value);
}

function firmSignatory(ctx, register) {
  const line = String(ctx.feeEarner || ctx.keyContact || '');
  const name = line.split('·')[0].trim() || ctx.keyContact;
  const person = (register?.people ?? []).find((item) => item.name === name || item.principal);
  const title = person?.role || 'Authorised representative';
  return { name, printed: [name, title].filter(Boolean).join(', ') };
}

export function agreementSignatories(ctx, register) {
  const firm = firmSignatory(ctx, register);
  const client = recordedName(ctx.clientName);
  const cards = [
    { role: 'Client', name: client, printed: client, date: ctx.intakeDate },
    { role: 'For the firm', name: firm.name, printed: firm.printed, date: ctx.intakeDate },
  ];
  return cards;
}

export function buildAgreement(values, register) {
  const ctx = resolveAgreementContext(values, register);
  const sections = buildAgreementSections(ctx);
  const blocks = [
    ...letterheadBlocks(register, ctx),
    {
      type: 'parties',
      left: {
        role: 'Client',
        name: ctx.clientName,
        lines: [ctx.clientEmail, ctx.clientPhone].filter(Boolean),
      },
      right: {
        role: 'Adviser',
        name: ctx.legalName,
        lines: [
          ctx.groupName,
          ctx.addressLine,
          `UID  ${ctx.uid}`,
          `LEI  ${ctx.lei}`,
          ctx.feeEarner,
        ],
      },
    },
    {
      type: 'notice',
      text: 'Fee-only independent advice. The Adviser never holds your assets. Custody remains with your bank or broker in your name.',
    },
  ];

  for (const section of sections) {
    blocks.push({ type: 'h', text: section.title });
    for (const paragraph of section.paragraphs) {
      blocks.push({ type: 'p', text: paragraph });
    }
  }

  blocks.push({ type: 'space', h: 10 });
  blocks.push({ type: 'signatures', cards: agreementSignatories(ctx, register) });
  return blocks;
}

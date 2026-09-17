import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { company, finmaAuthorisationLine, osfinSupervisionLine } from '../src/data/company.ts';
import { writePdf } from '../src/js/document-pdf-write.js';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'documents');
const asOf = '15 September 2026';
const asOfShort = '15.09.2026';
const version = '2026.1';

function header(title: string) {
  const firm = company;
  return [
    { type: 'kicker', text: 'Client information  ·  In force from ' + asOfShort + '  ·  ' + version },
    { type: 'title', text: firm.legalName },
    {
      type: 'p',
      text: [firm.address.line, firm.phone, `UID ${firm.uid}`, `LEI ${firm.lei}`].join('  ·  '),
    },
    { type: 'p', text: `${finmaAuthorisationLine()}  ·  ${osfinSupervisionLine()}` },
    { type: 'rule' },
    { type: 'subject', text: title },
  ];
}

function footerNote() {
  return [
    { type: 'rule' },
    {
      type: 'footnote',
      text: `${company.legalName}, ${company.address.line}. Document date ${asOf}. This document does not constitute personalised advice. Swiss law; exclusive place of jurisdiction ${company.jurisdiction}.`,
    },
  ];
}

const feeSchedule = [
  ...header('Schedule of fees and charges'),
  {
    type: 'p',
    text: 'This schedule sets out the standard fees of Helfenstein Asset Management AG for independent financial advice and portfolio management. It applies from 15.09.2026 unless a written mandate agrees different rates. Amounts are exclusive of Swiss VAT where VAT is due. Custody, brokerage, stamp duty, exchange fees and product TER are charged by your bank or the product issuer, never by us.',
  },
  { type: 'h', text: '1. Discretionary portfolio management' },
  {
    type: 'p',
    text: 'An annual management fee on assets under the mandate, billed quarterly in arrears on the average market value of the period.',
  },
  { type: 'split', left: 'On the first CHF 2,000,000', right: '0.95% p.a.' },
  { type: 'split', left: 'On the next CHF 3,000,000', right: '0.75% p.a.' },
  { type: 'split', left: 'On assets above CHF 5,000,000', right: '0.55% p.a.' },
  { type: 'split', left: 'Minimum annual fee', right: 'CHF 8,500' },
  { type: 'h', text: '2. Investment advisory (non-discretionary)' },
  {
    type: 'p',
    text: 'An annual advisory fee where you retain execution authority and we provide written recommendations and monitoring.',
  },
  { type: 'split', left: 'On the first CHF 2,000,000', right: '0.70% p.a.' },
  { type: 'split', left: 'On the next CHF 3,000,000', right: '0.55% p.a.' },
  { type: 'split', left: 'On assets above CHF 5,000,000', right: '0.40% p.a.' },
  { type: 'split', left: 'Minimum annual fee', right: 'CHF 6,000' },
  { type: 'h', text: '3. Performance fee' },
  {
    type: 'p',
    text: 'Available only on discretionary mandates and only if elected in the written mandate. 10% of outperformance versus the agreed benchmark, calculated annually with a high-water mark. No performance fee is charged on advisory mandates, financial-planning work or cash held solely for liabilities.',
  },
  { type: 'h', text: '4. Project and planning work' },
  { type: 'split', left: 'First consultation (about one hour)', right: 'No charge' },
  { type: 'split', left: 'Financial planning / project work', right: 'CHF 280 per hour, or a fixed quote' },
  { type: 'split', left: 'Written second opinion on an existing portfolio', right: 'From CHF 1,800' },
  { type: 'h', text: '5. What we do not charge' },
  {
    type: 'p',
    text: 'We accept no retrocessions, trailer fees or placement commissions from product providers. Any third-party payment we cannot avoid is credited to you in full. We do not charge entry, exit or custody fees. Advisers have no product sales targets.',
  },
  { type: 'h', text: '6. Billing' },
  {
    type: 'p',
    text: 'Fees are invoiced to you or, where you instruct, collected via your custodian bank. You may terminate a mandate in accordance with the general terms; prepaid amounts for unused periods are refunded pro rata.',
  },
  ...footerNote(),
];

const gtc = [
  ...header('General terms and conditions'),
  {
    type: 'p',
    text: 'These terms govern the contractual relationship between you and Helfenstein Asset Management AG for independent advice and, where agreed, discretionary portfolio management. They apply together with the written mandate, the schedule of fees and the risk disclosure.',
  },
  { type: 'h', text: '1. Parties and services' },
  {
    type: 'p',
    text: 'We provide financial advice and, if the mandate so provides, discretionary portfolio management to private individuals and families. We do not act for institutions or companies. We do not hold client assets: securities and cash remain in your name with a custodian bank of your choice.',
  },
  { type: 'h', text: '2. Mandate and instructions' },
  {
    type: 'p',
    text: 'The scope of work, investment guidelines, restrictions and reporting are set out in the written mandate. You must give us complete and accurate information. We may rely on information you supply until you correct it in writing.',
  },
  { type: 'h', text: '3. No custody; banking partners' },
  {
    type: 'p',
    text: 'Custody, settlement, account opening and payment services are provided by your bank under its own terms. We may help you compare custody conditions. We are not a party to your bank contract and are not liable for the bank\'s acts or insolvency beyond duties we owe under Swiss law.',
  },
  { type: 'h', text: '4. Fees' },
  {
    type: 'p',
    text: 'Our fees are those in the schedule of fees and charges in force on the date of the mandate, or such other rates as the mandate records. Third-party costs (custody, brokerage, taxes, product costs) are yours. Unavoidable retrocessions are credited to you.',
  },
  { type: 'h', text: '5. Suitability and reports' },
  {
    type: 'p',
    text: 'Before personalised advice we obtain the information required under the Financial Services Act to assess appropriateness or suitability. We provide written analyses and periodic reports as agreed. Market data in reports may be delayed and is not a recommendation to deal.',
  },
  { type: 'h', text: '6. Liability' },
  {
    type: 'p',
    text: 'We perform our duties with the care of a prudent portfolio manager. Liability for slight negligence is excluded to the extent permitted by law. We are not liable for investment outcomes, tax results, or losses caused by markets, issuers, your bank, or instructions you give against our advice.',
  },
  { type: 'h', text: '7. Confidentiality and data' },
  {
    type: 'p',
    text: 'We treat your information as confidential and process personal data in accordance with our privacy policy and Swiss data-protection law. We disclose data where necessary to perform the mandate (including to your bank), where you consent, or where the law requires.',
  },
  { type: 'h', text: '8. Conflicts of interest' },
  {
    type: 'p',
    text: 'We identify, disclose and manage conflicts as described in the conflicts of interest policy. Our income is the fee you agree with us.',
  },
  { type: 'h', text: '9. Term and termination' },
  {
    type: 'p',
    text: 'Either party may terminate the mandate in writing with 30 days\' notice, or immediately for cause. On termination we deliver a closing report and, at your instruction, assist the transfer of bank authorities. Outstanding fees remain due.',
  },
  { type: 'h', text: '10. Complaints and ombudsman' },
  {
    type: 'p',
    text: `Please write first to ${company.legalName}, ${company.address.line}, ${company.phone}. If we cannot settle the matter, you may contact ${company.ombudsman.name}, ${company.ombudsman.addressLine}, ${company.ombudsman.phone}, ${company.ombudsman.email}, ${company.ombudsman.website}. Reference Number: ${company.ombudsman.reference}.`,
  },
  { type: 'h', text: '11. Governing law' },
  {
    type: 'p',
    text: `These terms are governed by Swiss law. The exclusive place of jurisdiction is ${company.jurisdiction}, subject to mandatory consumer venues.`,
  },
  ...footerNote(),
];

const risk = [
  ...header('Risk disclosure'),
  {
    type: 'p',
    text: 'This document describes the principal risks of the financial services we provide. It does not list every risk of every instrument. Past performance is not a guide to future results. You may lose some or all of the capital you invest. You should only proceed if you understand these risks and can bear them.',
  },
  { type: 'h', text: '1. Portfolio management' },
  {
    type: 'p',
    text: 'A discretionary mandate means we take investment decisions within the agreed guidelines. Values can fall as well as rise. There is no capital guarantee and no promised return. Restrictions you impose (exclusions, concentration, liquidity) can increase risk or reduce return relative to an unconstrained portfolio.',
  },
  { type: 'h', text: '2. Investment advice' },
  {
    type: 'p',
    text: 'On an advisory mandate you decide whether and when to execute. If you delay, vary or ignore a recommendation, the outcome is yours. Advice is based on information available at the time and may become outdated.',
  },
  { type: 'h', text: '3. Market and price risk' },
  {
    type: 'p',
    text: 'Equity, bond, fund and other market prices move with the economy, interest rates, inflation, geopolitics and investor sentiment. Drawdowns can be sudden and prolonged. Diversification reduces but does not eliminate this risk.',
  },
  { type: 'h', text: '4. Credit and issuer risk' },
  {
    type: 'p',
    text: 'Bonds, money-market instruments and some structured products depend on the issuer or counterparty remaining able to pay. A default or downgrade can cause a partial or total loss.',
  },
  { type: 'h', text: '5. Liquidity risk' },
  {
    type: 'p',
    text: 'Some instruments cannot be sold quickly, or only at a wide discount, especially in stress. Funds may gate or suspend redemptions. You may not be able to raise cash when you need it.',
  },
  { type: 'h', text: '6. Currency risk' },
  {
    type: 'p',
    text: 'Assets or cash in a currency other than Swiss francs can lose value in franc terms when exchange rates move, including after hedging costs if a hedge is used.',
  },
  { type: 'h', text: '7. Interest-rate and inflation risk' },
  {
    type: 'p',
    text: 'Rising yields typically reduce the market value of existing bonds. Inflation reduces the real value of cash and of fixed coupons.',
  },
  { type: 'h', text: '8. Concentration and strategy risk' },
  {
    type: 'p',
    text: 'A portfolio concentrated in one issuer, sector, country or factor can fall further than a broad market. An active or value-oriented process can underperform a benchmark for long periods.',
  },
  { type: 'h', text: '9. Funds, ETFs and derivatives' },
  {
    type: 'p',
    text: 'Collective investments add manager, tracking, premium/discount and operational risk. Derivatives can magnify gains and losses and may require margin. We use derivatives only if the mandate allows it.',
  },
  { type: 'h', text: '10. Operational, custody and legal risk' },
  {
    type: 'p',
    text: 'Errors, cyber incidents, fraud or failed settlement can cause loss. Your assets are held by your bank, not by us; bank insolvency is addressed by Swiss deposit-protection and segregation rules, which have limits. Tax law and reporting duties can change.',
  },
  { type: 'h', text: '11. No insurance of investment outcomes' },
  {
    type: 'p',
    text: 'FINMA authorisation and OSFINcontrol supervision do not protect you against investment loss. They regulate how we are organised and how we treat clients.',
  },
  ...footerNote(),
];

const finsa = [
  ...header('FinSA client brochure'),
  {
    type: 'p',
    text: 'This brochure is provided under the Swiss Financial Services Act (FinSA) before we give personalised advice or manage assets. It explains who we are, how we are supervised, how we classify clients, how we are paid, and how you can complain.',
  },
  { type: 'h', text: '1. The firm' },
  {
    type: 'p',
    text: `${company.legalName} (trading as ${company.groupName}), ${company.address.line}. Telephone ${company.phone}. Swiss UID ${company.uid}. LEI ${company.lei}. We are an independent, fee-only adviser and portfolio manager. We do not hold client assets.`,
  },
  { type: 'h', text: '2. Authorisation and supervision' },
  { type: 'p', text: finmaAuthorisationLine() },
  { type: 'p', text: osfinSupervisionLine() },
  {
    type: 'p',
    text: `Verify the entry on the FINMA register of authorised institutions: ${company.regulation.registerUrl}. Search by legal name or UID ${company.uid}. OSFINcontrol AG: ${company.regulation.supervisorUrl}.`,
  },
  { type: 'h', text: '3. Services' },
  {
    type: 'p',
    text: 'We offer independent financial advice (retirement, investments, taxes, real estate and estate planning) and discretionary portfolio management for private individuals and families. We do not offer execution-only dealing as a standalone service and we do not issue or manage collective investment schemes.',
  },
  { type: 'h', text: '4. Client segmentation' },
  {
    type: 'p',
    text: 'We treat you as a private client unless you request, and we agree in writing, professional-client status and you meet the FinSA tests. Private clients receive the full set of conduct and information duties. A change of segment affects the level of protection and must be documented.',
  },
  { type: 'h', text: '5. Information, suitability and documentation' },
  {
    type: 'p',
    text: 'Before personalised advice we collect information on your knowledge, experience, financial situation and investment objectives. We assess appropriateness or suitability, explain material risks, and keep a record of the relationship. You receive a written analysis after the first meeting if you ask us to proceed.',
  },
  { type: 'h', text: '6. Costs' },
  {
    type: 'p',
    text: 'Our costs are the fees in the schedule of fees and charges (management, advisory and, if elected, performance). Bank custody and transaction costs and product TER are additional and are shown separately. We will give you a personalised cost illustration before you sign a mandate.',
  },
  { type: 'h', text: '7. Conflicts of interest' },
  {
    type: 'p',
    text: 'We are paid only by our clients. Advisers have no product sales targets. Unavoidable third-party payments are credited to you. Further detail and examples are in the conflicts of interest policy.',
  },
  { type: 'h', text: '8. Ombudsman (FinSA art. 77)' },
  {
    type: 'p',
    text: 'If a dispute about legal claims cannot be resolved with us, you may apply to the independent ombudsman recognised by the Federal Department of Finance. Mediation is informal and does not replace the courts.',
  },
  { type: 'p', text: `Ombudsman name: ${company.ombudsman.name}` },
  { type: 'p', text: `Address: ${company.ombudsman.addressLine}` },
  { type: 'p', text: `Phone: ${company.ombudsman.phone}` },
  { type: 'p', text: `Email: ${company.ombudsman.email}` },
  { type: 'p', text: `Website: ${company.ombudsman.website}` },
  { type: 'p', text: `Reference Number: ${company.ombudsman.reference}` },
  {
    type: 'p',
    text: `Please contact us first at ${company.address.line}, ${company.phone}.`,
  },
  { type: 'h', text: '9. Documents that form part of this information' },
  {
    type: 'p',
    text: 'Schedule of fees and charges; general terms and conditions; risk disclosure; conflicts of interest policy. All are available at /legal/documents-and-information.',
  },
  ...footerNote(),
];

const conflicts = [
  ...header('Conflicts of interest policy'),
  {
    type: 'p',
    text: 'A conflict of interest exists where our interests, or those of a related person, could interfere with our duty to act in your interest. This policy explains how we identify, prevent, disclose and manage those situations. It is part of our FinSA organisation.',
  },
  { type: 'h', text: '1. Our model' },
  {
    type: 'p',
    text: 'We are paid only by our clients. We do not accept retrocessions, trailer fees or placement commissions. Advisers have no product sales targets and no variable pay linked to product volumes. We do not hold client assets, so we have no incentive to retain cash on our own balance sheet.',
  },
  { type: 'h', text: '2. How we identify conflicts' },
  {
    type: 'p',
    text: 'We maintain a conflicts register. New mandates, personal account dealing, gifts, outside roles and vendor relationships are reviewed against it. Staff must disclose potential conflicts promptly.',
  },
  { type: 'h', text: '3. Examples and how we treat them' },
  {
    type: 'p',
    text: 'Example A - Product providers offer a conference or research trip. We decline benefits that could influence a recommendation. Modest market-standard hospitality is recorded; anything material is refused or, if already received, disclosed and credited where it has a cash value.',
  },
  {
    type: 'p',
    text: 'Example B - Two clients want the same scarce placement. We do not favour the larger fee. Allocation follows a pre-set fairness rule documented on the register.',
  },
  {
    type: 'p',
    text: 'Example C - We help you choose a custodian bank. We receive no payment from banks for introductions. The comparison is written and uses custody price and service quality, not our convenience.',
  },
  {
    type: 'p',
    text: 'Example D - An adviser or related person holds a personal position in a security we discuss. Personal dealing is pre-cleared, restricted around client orders, and recorded. If the holding is material to the advice, we disclose it or assign another adviser.',
  },
  {
    type: 'p',
    text: 'Example E - A family member of staff seeks advice. The mandate is accepted only with a second-pair review and full fee disclosure; preferential terms that harm other clients are not permitted.',
  },
  { type: 'h', text: '4. Residual conflicts' },
  {
    type: 'p',
    text: 'Where a conflict cannot be prevented, we disclose it to you in writing before we act, and we may decline the assignment. Disclosure does not replace the duty to treat you fairly.',
  },
  { type: 'h', text: '5. Review' },
  {
    type: 'p',
    text: 'This policy is reviewed at least annually and after material incidents. Complaints about conflicts follow the same route as other complaints, including the FINOS ombudsman if needed.',
  },
  ...footerNote(),
];

const auditInfo = [
  ...header('Audit and filings information'),
  {
    type: 'p',
    text: 'This note explains how to verify the statutory auditor and commercial-register filings of Helfenstein Asset Management AG. It is not an audit opinion and must not be read as one.',
  },
  { type: 'h', text: '1. Auditor' },
  {
    type: 'p',
    text: `Audited by: ${company.audit.firm}. Audit partner: ${company.audit.partner}. The live appointment is the one filed at the Handelsregisteramt des Kantons Luzern and shown on Zefix.`,
  },
  { type: 'h', text: '2. Latest public filing' },
  {
    type: 'p',
    text: `${company.audit.latestLabel}. Last SHAB mutation published 7 April 2022 (purpose clause under FINIA). Older extracts named Mertenat Treuhand as auditor (resigned 5 December 2008).`,
  },
  { type: 'h', text: '3. Next scheduled audit' },
  { type: 'p', text: company.audit.nextAudit },
  { type: 'h', text: '4. How to check' },
  {
    type: 'p',
    text: `Search Zefix for ${company.legalName} or UID ${company.uid}. Confirm LEI ${company.lei} on GLEIF. Confirm the FINMA portfolio-manager list entry (page ${company.finmaWarning.listPage}).`,
  },
  { type: 'p', text: `Zefix: ${company.audit.zefixUrl}` },
  ...footerNote(),
];

const files = [
  ['fee-schedule.pdf', feeSchedule],
  ['general-terms-and-conditions.pdf', gtc],
  ['risk-disclosure.pdf', risk],
  ['finsa-client-brochure.pdf', finsa],
  ['conflicts-of-interest-policy.pdf', conflicts],
  ['audit-and-filings-information.pdf', auditInfo],
] as const;

mkdirSync(outDir, { recursive: true });

for (const [name, blocks] of files) {
  const bytes = await writePdf(blocks, { profile: 'letterhead' });
  writeFileSync(join(outDir, name), bytes);
  console.log('wrote', name, bytes.byteLength, 'bytes');
}

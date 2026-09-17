import { BROCHURE_DEFAULTS, formatUkDate } from './document-fields.js';

const TAGLINE = 'Independent, fee-only financial advice for private clients worldwide';
const CONFIDENTIAL = 'Confidential — for the named client only';

function present(value) {
  const raw = value == null ? '' : String(value).trim();
  if (!raw || /^\[[^\]]+\]$/.test(raw)) return '';
  return raw;
}

function slot(value, example) {
  const text = present(value);
  if (text) return { text, filled: true };
  return { text: example, filled: false };
}

function selected(value) {
  return String(value ?? '').trim().toLowerCase() === 'yes';
}

function serviceRows(v) {
  return [1, 2, 3].map((n) => ({
    type: slot(
      v[`service${n}Type`],
      n === 1 ? 'Investment advice' : n === 2 ? 'Retirement planning' : 'Estate and succession',
    ),
    desc: slot(
      v[`service${n}Desc`],
      n === 1
        ? 'Suitability-led portfolio at your custody bank'
        : n === 2
          ? 'Pillar 2 / 3a review and drawdown sequencing'
          : 'Wills, beneficial owners and cross-border map',
    ),
    priority: slot(v[`service${n}Priority`], n === 1 ? 'High' : 'Medium'),
    timeline: slot(v[`service${n}Timeline`], n === 1 ? '30 days' : n === 2 ? '90 days' : '6 months'),
  }));
}

function selectedServices(v) {
  const catalog = [
    ['svcRetirement', 'Retirement and pension'],
    ['svcInvestment', 'Investment advice'],
    ['svcEstate', 'Estate and succession'],
    ['svcProperty', 'Real-estate advisory'],
    ['svcTax', 'Tax-optimisation analysis'],
    ['svcInsurance', 'Insurance review'],
  ];
  const on = catalog.filter(([key]) => selected(v[key])).map(([, label]) => label);
  if (on.length) return on.join('; ');
  return 'Investment advice; retirement planning; estate and succession';
}

function feeLine(value, example, suffix) {
  const item = slot(value, example);
  if (/none|n\/a|^-$|^—$/i.test(item.text)) return item;
  if (/%/.test(item.text)) return item;
  return { text: `${item.text}${suffix}`, filled: item.filled };
}

function fact(label, item) {
  return { label, text: item.text, filled: item.filled };
}

export function buildBrochure(values = {}, register) {
  const v = values && typeof values === 'object' ? values : {};
  const firm = register?.firm ?? {};
  const group = register?.groupName || 'Helfenstein Group';
  const legal = firm.legalName || 'Helfenstein Asset Management AG';
  const address = firm.addressLine || 'Pilatusstrasse 23, 6003 Luzern, Switzerland';
  const lei = firm.lei || '894500URZFTDV5G7F357';
  const uid = firm.uid || 'CHE-111.708.730';
  const phone = firm.phone || '+41 41 211 29 29';

  const clientName = slot(v.clientName, 'Anna Keller');
  const clientTitle = slot(v.clientTitle, 'Private client');
  const clientAddr = slot(v.clientAddr, 'Lucerne, Switzerland');
  const brochureDate = slot(v.brochureDate ? formatUkDate(v.brochureDate) || v.brochureDate : '', 'Date of issue');
  const brochureVersion = slot(v.brochureVersion, '1.0');
  const risk = slot(v.riskProfile, 'Moderate');
  const allocation = slot(v.allocation, BROCHURE_DEFAULTS.allocation);
  const horizon = slot(v.horizon, BROCHURE_DEFAULTS.horizon);
  const currency = slot(v.currencyFocus, BROCHURE_DEFAULTS.currencyFocus);
  const aua = slot(v.assetsUnderAdvice, 'To be confirmed');
  const goals = slot(v.investmentGoals, 'Preserve capital and grow purchasing power in CHF');
  const mgmt = feeLine(v.managementFee, BROCHURE_DEFAULTS.managementFee, '% per annum');
  const perf = feeLine(v.performanceFee, BROCHURE_DEFAULTS.performanceFee, '%');
  const other = slot(v.otherCosts, BROCHURE_DEFAULTS.otherCosts);
  const terms = slot(v.paymentTerms, BROCHURE_DEFAULTS.paymentTerms);
  const action1 = slot(v.action1, BROCHURE_DEFAULTS.action1);
  const action2 = slot(v.action2, BROCHURE_DEFAULTS.action2);
  const action3 = slot(v.action3, BROCHURE_DEFAULTS.action3);
  const contactName = slot(v.contactName || register?.keyContact, 'Friedrich Hartmann');
  const contactEmail = slot(v.contactEmail, 'friedrich.hartmann@helfenstein.ch');
  const contactPhone = slot(v.contactPhone || phone, '+41 41 211 29 29');
  const firstName = clientName.filled ? clientName.text.split(/\s+/)[0] : clientName.text;

  return [
    {
      type: 'cover',
      company: group,
      legalName: legal,
      tagline: TAGLINE,
      location: 'Lucerne, Switzerland',
      title: 'Private Client Brochure',
      fields: [
        { label: 'Prepared for', ...clientName },
        { label: 'Title / address', text: [clientTitle.text, clientAddr.text].filter(Boolean).join(' · '), filled: clientTitle.filled || clientAddr.filled },
        { label: 'Date', ...brochureDate },
        { label: 'Brochure version', ...brochureVersion },
      ],
    },
    { type: 'kicker', text: `${group}  ·  ${CONFIDENTIAL}` },
    { type: 'title', text: 'Private client brochure' },
    { type: 'p', text: `${legal}  ·  ${address}  ·  ${phone}` },
    { type: 'p', text: `UID ${uid}  ·  LEI ${lei}` },
    { type: 'rule' },
    { type: 'h', text: '1. Executive summary' },
    { type: 'p', text: `Dear ${firstName},`, filled: clientName.filled },
    {
      type: 'p',
      text: `${group} is an independent financial advisory firm based in Lucerne, advising private clients internationally. This brochure sets out a private-client proposal prepared for you. It is not a public offer and is not a substitute for a signed mandate.`,
    },
    {
      type: 'p',
      text: 'Our value is fee-only advice. We are paid by you, not by product providers. We do not hold your assets: you retain custody at a bank of your choosing. The recommendations below are personal to your circumstances and can be revised as your life and markets change.',
    },
    {
      type: 'p',
      text: `Assets under advice: ${aua.text}. Principal goals: ${goals.text}.`,
      filled: aua.filled || goals.filled,
    },
    { type: 'h', text: '2. Our philosophy' },
    { type: 'bullet', text: 'Independent advice, paid only by clients — never by issuers, platforms or introducers.' },
    { type: 'bullet', text: 'We never hold your assets. You keep custody and beneficial ownership.' },
    { type: 'bullet', text: 'Lucerne-based expertise with a global investment perspective.' },
    { type: 'bullet', text: 'Focus on private individuals and families, not institutional distribution.' },
    { type: 'h', text: '3. Tailored service recommendations' },
    { type: 'p', text: `Selected service themes: ${selectedServices(v)}.` },
    {
      type: 'table',
      columns: [
        { key: 'type', label: 'Service category', width: 0.22 },
        { key: 'desc', label: 'Recommended approach', width: 0.42 },
        { key: 'priority', label: 'Priority', width: 0.16 },
        { key: 'timeline', label: 'Timeline', width: 0.2 },
      ],
      rows: serviceRows(v),
    },
    { type: 'h', text: '4. Investment strategy overview' },
    {
      type: 'facts',
      items: [
        fact('Risk profile', risk),
        fact('Asset allocation', allocation),
        fact('Investment horizon', horizon),
        fact('Currency focus', currency),
        fact('Assets under advice', aua),
        fact('Investment goals', goals),
      ],
    },
    { type: 'h', text: '5. Fee structure' },
    {
      type: 'p',
      text: 'Fees below are advisory fees payable by you to the Adviser. They do not include bank custody or product costs.',
    },
    {
      type: 'facts',
      items: [fact('Management fee', mgmt), fact('Performance fee', perf), fact('Other costs', other), fact('Payment terms', terms)],
    },
    { type: 'h', text: '6. Next steps and action items' },
    {
      type: 'facts',
      items: [
        fact('Step 1', action1),
        fact('Step 2', action2),
        fact('Step 3', action3),
        fact('Contact person', contactName),
        fact('Email', contactEmail),
        fact('Phone', contactPhone),
      ],
    },
    { type: 'h', text: '7. Disclaimer' },
    {
      type: 'p',
      text: `This brochure is a confidential information document prepared by ${legal}, ${address}, for the named addressee only. It does not constitute an offer to the public, investment research, or a personal recommendation under FinSA unless and until a written client agreement is signed and a suitability assessment is completed.`,
    },
    {
      type: 'p',
      text: `${group} is supervised in Switzerland in accordance with the applicable financial-services framework. Authorisation and registration details may be verified via FINMA (finma.ch) and, where relevant, the firm’s Bloomberg LEI ${lei}. Past performance is not a reliable indicator of future results. Markets can fall as well as rise.`,
    },
    {
      type: 'p',
      text: 'You retain custody of your assets with a third-party bank. The Adviser does not accept client money or securities into its own accounts. Tax, legal and inheritance consequences depend on your personal situation; independent specialist advice may be required.',
    },
    {
      type: 'p',
      text: `${CONFIDENTIAL}. Do not copy, circulate or rely on this brochure without the firm’s written consent. Swiss law and the courts of Lucerne apply to this communication, without prejudice to mandatory investor-protection rules.`,
    },
    { type: 'break' },
    { type: 'h', text: '8. Form configuration' },
    {
      type: 'p',
      text: 'Internal record of the values used to compose this brochure. Grey example text means a field was left blank in the form.',
    },
    {
      type: 'facts',
      items: [
        fact('Client name', clientName),
        fact('Title', clientTitle),
        fact('Address', clientAddr),
        fact('Email', slot(v.clientEmail, 'client@example.com')),
        fact('Phone', slot(v.clientPhone, '+41 41 211 29 29')),
        fact('Assets under advice', aua),
        fact('Risk tolerance', risk),
        fact('Investment goals', goals),
        { label: 'Selected services', text: selectedServices(v), filled: true },
        fact('Management fee', mgmt),
        fact('Performance fee', perf),
        fact('Payment terms', terms),
        fact('Step 1', action1),
        fact('Step 2', action2),
        fact('Step 3', action3),
      ],
    },
  ];
}

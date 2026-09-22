import { addMonthsIso, formatUkDate, parseMoney } from './document-fields.js';
import { slot } from './document-pdf-write.js';

function present(value) {
  const raw = value == null ? '' : String(value).trim();
  if (!raw || /^\[[^\]]+\]$/.test(raw)) return '';
  return raw;
}

function formatChf(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return '';
  const [int, frac] = n.toFixed(2).split('.');
  return `${int.replace(/\B(?=(\d{3})+(?!\d))/g, "'")}.${frac}`;
}

function formatChDate(iso) {
  const raw = String(iso ?? '').trim();
  const day = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (day) return `${day[3]}.${day[2]}.${day[1]}`;
  return formatUkDate(iso) || present(iso);
}

function yearFromIso(iso) {
  return String(iso ?? '').match(/^(\d{4})/)?.[1] || '';
}

export function agreementNumberFromClient(clientId, iso) {
  const stem = String(clientId || '')
    .replace(/[^a-z0-9]/gi, '')
    .slice(-4)
    .toUpperCase()
    .padStart(4, '0');
  const year = yearFromIso(iso) || String(new Date().getUTCFullYear());
  return `HG-P2P-${year}-${stem || '0001'}`;
}

function monthlyRate(annualPct) {
  return Number(annualPct) / 100 / 12;
}

export function p2pPayment(principal, annualPct, months) {
  const r = monthlyRate(annualPct);
  const n = Number(months);
  if (!Number.isFinite(principal) || principal <= 0 || !Number.isFinite(n) || n < 1) return null;
  if (!r) return principal / n;
  return (principal * (r * (1 + r) ** n)) / ((1 + r) ** n - 1);
}

export function p2pSchedule(principal, annualPct, months, startIso) {
  const payment = p2pPayment(principal, annualPct, months);
  if (payment == null) return { payment: null, totalInterest: null, totalRepayment: null, rows: [] };
  const r = monthlyRate(annualPct);
  const n = Number(months);
  let balance = principal;
  let totalInterest = 0;
  const rows = [];
  for (let k = 1; k <= n; k += 1) {
    const interest = r ? balance * r : 0;
    let principalPart = payment - interest;
    if (k === n) principalPart = balance;
    const total = principalPart + interest;
    balance = Math.max(0, balance - principalPart);
    if (k === n) balance = 0;
    totalInterest += interest;
    rows.push({
      n: String(k),
      due: formatChDate(addMonthsIso(startIso, k)) || slot('', 'due date'),
      principal: formatChf(principalPart),
      interest: formatChf(interest),
      payment: formatChf(total),
      balance: formatChf(balance),
    });
  }
  return {
    payment,
    totalInterest,
    totalRepayment: principal + totalInterest,
    rows,
  };
}

function numbered(n, text) {
  return { type: 'p', text: `${n} ${text}` };
}

export function resolveP2pContext(values = {}, register = {}) {
  const firm = register?.firm ?? {};
  const principal = parseMoney(values.investmentAmountChf);
  const rateRaw = present(values.interestRateAnnualPct);
  const rate = rateRaw === '' ? null : Number(rateRaw);
  const monthsRaw = present(values.loanTermMonths);
  const months = monthsRaw === '' ? null : Math.max(1, Math.round(Number(monthsRaw)));
  const start = present(values.startDate) || present(values.transactionDate) || present(values.documentDate);
  const hasSchedule =
    principal != null &&
    principal > 0 &&
    months != null &&
    Number.isFinite(months) &&
    rate != null &&
    Number.isFinite(rate);
  const schedule = hasSchedule ? p2pSchedule(principal, rate, months, start) : { payment: null, totalInterest: null, totalRepayment: null, rows: [] };
  const line = String(present(values.feeEarner) || present(register?.feeEarner));
  const adviserName = line.split('·')[0].trim();
  const person = (register?.people ?? []).find((item) => item.name === adviserName || item.principal);
  const maturity =
    present(values.maturityDate) || (start && months != null ? addMonthsIso(start, months) : '');

  return {
    groupName: register?.groupName || 'Helfenstein Group',
    legalName: firm.legalName || 'Helfenstein Asset Management AG',
    addressLine: firm.addressLine || 'Pilatusstrasse 23, 6003 Luzern, Switzerland',
    phone: firm.phone || '+41 41 211 29 29',
    uid: firm.uid || 'CHE-111.708.730',
    lei: firm.lei || '894500URZFTDV5G7F357',
    website: register?.website || 'https://financial-advisory-production.up.railway.app/',
    office: present(values.officeLocation) || present(register?.jurisdiction),
    investorName: present(values.investorName),
    investorEmail: present(values.investorEmail),
    investorPhone: present(values.investorPhone),
    borrowerName: present(values.borrowerName),
    borrowerEmail: present(values.borrowerEmail),
    borrowerPhone: present(values.borrowerPhone),
    agreementNumber: present(values.agreementNumber),
    documentDate: formatChDate(values.documentDate),
    transactionDate: formatChDate(values.transactionDate || start),
    startDate: formatChDate(start),
    maturityDate: formatChDate(maturity),
    principal,
    principalLabel: principal != null ? formatChf(principal) : '',
    rate,
    rateLabel: rate != null && Number.isFinite(rate) ? rate.toFixed(2) : '',
    interestType: present(values.interestType),
    months,
    frequency: present(values.repaymentFrequency),
    paymentLabel: schedule.payment != null ? formatChf(schedule.payment) : '',
    interestLabel: schedule.totalInterest != null ? formatChf(schedule.totalInterest) : '',
    repaymentLabel: schedule.totalRepayment != null ? formatChf(schedule.totalRepayment) : '',
    graceDays: present(values.gracePeriodDays),
    lateFee: present(values.lateFeeChf),
    earlyPenalty: present(values.earlyRepaymentPenaltyPct),
    earlyNotice: present(values.earlyRepaymentNoticeDays),
    earlyFree: present(values.earlyRepaymentFreeMonths),
    collateralType: present(values.collateralType),
    collateralDescription: present(values.collateralDescription),
    collateralValue: present(values.collateralValueChf),
    guarantorName: present(values.guarantorName),
    guarantorRelationship: present(values.guarantorRelationship),
    adviserName,
    adviserTitle: person?.role || '',
    adviserEmail: person?.email || '',
    adviserFee: present(values.advisorFeeChf),
    amlDone: present(values.amlCheckCompleted),
    amlDate: formatChDate(values.amlCheckDate),
    disputeBody: present(values.disputeResolutionBody),
    hasSchedule,
    schedule,
  };
}

function letterhead(ctx) {
  return [
    { type: 'kicker', text: 'P2P agreement  /  Peer-to-Peer-Vertrag  ·  Confidential' },
    { type: 'title', text: ctx.legalName },
    {
      type: 'p',
      text: [ctx.addressLine, ctx.phone, `UID ${ctx.uid}`, `LEI ${ctx.lei}`].filter(Boolean).join('  ·  '),
    },
    {
      type: 'p',
      text: `FINMA authorised portfolio manager  ·  Independent, fee-only  ·  ${ctx.website}`,
    },
    { type: 'rule' },
    { type: 'subject', text: 'Peer-to-peer investment agreement' },
  ];
}

export function buildP2p(values, register) {
  const ctx = resolveP2pContext(values, register);
  const investor = ctx.investorName || 'the Investor named at signing';
  const borrower = ctx.borrowerName || 'the Borrower named at signing';
  const secured = present(values?.secured) === 'Yes' && ctx.collateralType && ctx.collateralType !== 'Unsecured';
  const cards = [
    { role: 'Investor (lender)', name: ctx.investorName, printed: ctx.investorName, date: ctx.transactionDate },
    { role: 'Borrower', name: ctx.borrowerName, printed: ctx.borrowerName, date: ctx.transactionDate },
    {
      role: 'For the firm',
      name: ctx.adviserName,
      printed: ctx.adviserName,
      title: ctx.adviserTitle,
      date: ctx.documentDate,
    },
  ];
  if (ctx.guarantorName) {
    cards.splice(2, 0, {
      role: 'Guarantor',
      name: ctx.guarantorName,
      printed: [ctx.guarantorName, ctx.guarantorRelationship].filter(Boolean).join(', '),
      date: ctx.transactionDate,
    });
  }

  const interestClause = ctx.rateLabel
    ? `Interest is calculated on the outstanding principal at a ${(ctx.interestType || 'fixed').toLowerCase()} rate of ${ctx.rateLabel}% per annum, actual/365, in line with Swiss banking practice.`
    : 'Interest is calculated on the outstanding principal at the annual rate recorded in this Agreement, actual/365, in line with Swiss banking practice.';

  const graceClause = [
    ctx.graceDays
      ? `A grace period of ${ctx.graceDays} calendar days applies to each instalment.`
      : 'A grace period applies to each instalment as recorded in this Agreement.',
    ctx.lateFee
      ? `Late payment incurs ${ctx.lateFee} CHF per occurrence.`
      : 'Late payment incurs the late fee recorded in this Agreement.',
  ].join(' ');

  const noticeClause = ctx.earlyNotice
    ? `The Borrower may prepay in whole or in part on ${ctx.earlyNotice} days’ written notice.`
    : 'The Borrower may prepay in whole or in part on the written notice recorded in this Agreement.';

  const penaltyClause =
    ctx.earlyPenalty && ctx.earlyFree
      ? `A penalty of ${ctx.earlyPenalty}% of the prepaid amount applies in the first ${ctx.earlyFree} months. No penalty applies thereafter.`
      : 'Any early-repayment penalty is the percentage and free period recorded in this Agreement.';

  const warrantDate = ctx.transactionDate
    ? `that the information given is complete as of ${ctx.transactionDate}`
    : 'that the information given is complete as of the execution date';

  const investorWarrant = ctx.principalLabel
    ? `The Investor warrants that the sum of ${ctx.principalLabel} CHF is for their own account and that they understand P2P credit risk, including default.`
    : 'The Investor warrants that the principal recorded in this Agreement is for their own account and that they understand P2P credit risk, including default.';

  const defaultClause = ctx.graceDays
    ? `Default includes a payment more than ${ctx.graceDays} days late, insolvency, or a material misrepresentation. The Investor may then accelerate the outstanding balance.`
    : 'Default includes a late payment beyond the recorded grace period, insolvency, or a material misrepresentation. The Investor may then accelerate the outstanding balance.';

  const lawClause = [
    'Swiss substantive law governs.',
    ctx.disputeBody
      ? `Disputes are referred to ${ctx.disputeBody}${ctx.office ? `, seat ${ctx.office}` : ''}, language English.`
      : 'Disputes are referred to the body and seat recorded in this Agreement, language English.',
    'The English text prevails over any translation.',
  ].join(' ');

  const feeClause = ctx.adviserFee
    ? `${ctx.legalName} has reviewed this arrangement as independent adviser. The Investor pays a flat fee of ${ctx.adviserFee} CHF. The Adviser takes no commission from the Borrower.`
    : `${ctx.legalName} has reviewed this arrangement as independent adviser. The Investor pays the recorded flat fee. The Adviser takes no commission from the Borrower.`;

  const facts = [
    { label: 'Agreement no.', text: ctx.agreementNumber || slot('', 'agreement number') },
    { label: 'Document date', text: ctx.documentDate || slot('', 'document date') },
    { label: 'Execution date', text: ctx.transactionDate || slot('', 'execution date') },
  ];

  const summary = [
    { label: 'Principal', text: ctx.principalLabel ? `${ctx.principalLabel} CHF` : slot('', 'principal') },
    {
      label: 'Interest',
      text: ctx.rateLabel
        ? `${ctx.rateLabel}% p.a.${ctx.interestType ? ` (${ctx.interestType})` : ''}`
        : slot('', 'interest rate'),
    },
    { label: 'Term', text: ctx.months != null ? `${ctx.months} month(s)` : slot('', 'term') },
    { label: 'Disbursement', text: ctx.startDate || slot('', 'disbursement date') },
    { label: 'Maturity', text: ctx.maturityDate || slot('', 'maturity date') },
    { label: 'Frequency', text: ctx.frequency || slot('', 'frequency') },
    { label: 'Periodic payment', text: ctx.paymentLabel ? `${ctx.paymentLabel} CHF` : slot('', 'periodic payment') },
    { label: 'Total interest', text: ctx.interestLabel ? `${ctx.interestLabel} CHF` : slot('', 'total interest') },
    { label: 'Total repayment', text: ctx.repaymentLabel ? `${ctx.repaymentLabel} CHF` : slot('', 'total repayment') },
  ];

  const blocks = [
    ...letterhead(ctx),
    { type: 'facts', items: facts },
    {
      type: 'parties',
      left: {
        role: 'Investor (lender)',
        name: ctx.investorName,
        lines: [ctx.investorEmail, ctx.investorPhone].filter(Boolean),
      },
      right: {
        role: 'Borrower',
        name: ctx.borrowerName,
        lines: [ctx.borrowerEmail, ctx.borrowerPhone].filter(Boolean),
      },
    },
    {
      type: 'notice',
      text: `${ctx.legalName} acts only as an independent, fee-only adviser. It never holds the parties’ assets, does not lend its own balance sheet, and is paid only by the Investor.`,
    },
    { type: 'h', text: '1. Transaction summary' },
    { type: 'facts', items: summary },
    { type: 'h', text: '2. Interest calculation' },
    numbered('2.1', interestClause),
    { type: 'h', text: '3. Repayment' },
    numbered(
      '3.1',
      `${borrower} shall repay the principal and accrued interest to ${investor} according to the schedule in section 7.`,
    ),
    numbered('3.2', graceClause),
    { type: 'h', text: '4. Early repayment' },
    numbered('4.1', noticeClause),
    numbered('4.2', penaltyClause),
    { type: 'h', text: '5. Representations' },
    numbered('5.1', `The Borrower warrants legal capacity, ${warrantDate}, and that no insolvency proceeding is pending.`),
    numbered('5.2', investorWarrant),
    { type: 'h', text: '6. Collateral, default and law' },
    numbered(
      '6.1',
      secured
        ? `This Agreement is secured by ${ctx.collateralType}${ctx.collateralDescription ? `: ${ctx.collateralDescription}` : ''}${ctx.collateralValue ? ` (appraised ${ctx.collateralValue} CHF)` : ''}. On default the Investor may realise the collateral under the SchKG.`
        : 'This Agreement is unsecured unless collateral is recorded. Recovery on default is against the Borrower personally under Swiss debt-collection law (SchKG).',
    ),
    numbered('6.2', defaultClause),
    numbered('6.3', lawClause),
    { type: 'h', text: '7. Repayment schedule' },
    numbered(
      '7.1',
      ctx.hasSchedule
        ? 'Instalments are calculated with the standard annuity formula from the recorded principal, rate, term and first due date. The last row must reduce the balance to 0.00 CHF.'
        : 'Instalments are calculated with the standard annuity formula once principal, interest rate, term and first due date are recorded. The last instalment reduces the balance to 0.00 CHF.',
    ),
  ];

  if (ctx.hasSchedule) {
    blocks.push({
      type: 'table',
      columns: [
        { key: 'n', label: '#', width: 0.08 },
        { key: 'due', label: 'Due', width: 0.16 },
        { key: 'principal', label: 'Principal (CHF)', width: 0.2 },
        { key: 'interest', label: 'Interest (CHF)', width: 0.18 },
        { key: 'payment', label: 'Payment (CHF)', width: 0.2 },
        { key: 'balance', label: 'Balance (CHF)', width: 0.18 },
      ],
      rows: ctx.schedule.rows,
    });
  }

  const amlLine = [
    ctx.amlDone || ctx.amlDate ? `AML/KYC: ${[ctx.amlDone, ctx.amlDate && `on ${ctx.amlDate}`].filter(Boolean).join(' ')}.` : '',
    ctx.agreementNumber ? `Verify ${ctx.agreementNumber} on the firm website.` : '',
    `UID ${ctx.uid}  ·  LEI ${ctx.lei}  ·  FINMA.`,
  ]
    .filter(Boolean)
    .join(' ');

  blocks.push(
    { type: 'h', text: '8. Advisor certification' },
    numbered('8.1', feeClause),
    {
      type: 'p',
      text: ['Prepared by', ctx.adviserName, ctx.adviserTitle, ctx.adviserEmail, ctx.office].filter(Boolean).join('  ·  '),
    },
    { type: 'footnote', text: amlLine },
    { type: 'space', h: 10 },
    { type: 'signatures', cards },
  );
  return blocks;
}

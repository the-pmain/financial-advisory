import { fieldsForKind, kindSaved } from './clients-documents-model.js';

export function field(name, label, opts = {}) {
  return { name, label, type: opts.type ?? 'text', ...opts };
}

export const AGREEMENT_DEFAULTS = Object.freeze({
  servicesIncluded:
    'Retirement and pension planning; investment advice and, where elected, discretionary portfolio management; estate and succession planning; real-estate advisory; tax-optimisation analysis (not a tax ruling); insurance review; and related written reporting.',
  servicesExcluded:
    'Custody of client assets; execution-only brokerage as a standalone service; legal representation before courts or authorities; tax-return preparation or tax representation unless separately agreed in writing; audit or accounting; insurance intermediation for commission; and the issue or management of collective investment schemes.',
  advisoryFeeRate:
    '0.70% p.a. on the first CHF 2,000,000, 0.55% on the next CHF 3,000,000, 0.40% above CHF 5,000,000 (minimum CHF 6,000 p.a.)',
  discretionaryFeeRate:
    '0.95% p.a. on the first CHF 2,000,000, 0.75% on the next CHF 3,000,000, 0.55% above CHF 5,000,000 (minimum CHF 8,500 p.a.)',
  hourlyFeeRate: 'CHF 280 per hour',
  projectFeeRate: 'A fixed project quote (second opinions from CHF 1,800)',
  retainerFeeRate: 'A fixed quarterly retainer as recorded below',
  expenseReimbursement: 'Pre-approved out-of-pocket expenses only, invoiced at cost with receipts.',
  additionalWorkRate:
    'CHF 280 per hour, or a written fixed quote, for work outside the elected scope.',
});

export const P2P_DEFAULTS = Object.freeze({
  investmentAmountChf: '100000',
  interestRateAnnualPct: '5.75',
  interestType: 'Fixed',
  loanTermMonths: '36',
  repaymentFrequency: 'Monthly',
  gracePeriodDays: '10',
  lateFeeChf: '50',
  earlyRepaymentPenaltyPct: '1.00',
  earlyRepaymentNoticeDays: '30',
  earlyRepaymentFreeMonths: '12',
  collateralType: 'Unsecured',
  secured: 'No',
  advisorFeeChf: '2800',
  disputeResolutionBody: 'Swiss Arbitration Centre',
  amlCheckCompleted: 'Yes',
});

export const BROCHURE_DEFAULTS = Object.freeze({
  servicesIncluded: AGREEMENT_DEFAULTS.servicesIncluded,
  servicesExcluded: AGREEMENT_DEFAULTS.servicesExcluded,
  advisoryFeeRate: AGREEMENT_DEFAULTS.advisoryFeeRate,
  nextSteps:
    'A written mandate, a custody bank introduction, and a 90-day implementation plan after the first review.',
});

export const SELECT_DEFAULTS = Object.freeze({
  secured: 'No',
  hasCollateral: 'No',
});

const SIBLING_SEED = Object.freeze({
  tracing: 'claim',
  matter: 'claim',
});

const EXTRA_SAVE_KEYS = Object.freeze(['clientConsent', 'intakeDate']);
const NO_FEE_EARNER_KIND = 'tracing';

export const DOCUMENT_FIELD_GROUPS = Object.freeze({
  agreement: [
    {
      title: 'Client record',
      fields: [
        field('clientName', 'Name'),
        field('clientEmail', 'Email', { type: 'email' }),
        field('clientPhone', 'Phone', { type: 'tel' }),
        field('feeEarner', 'Adviser', { locked: true }),
      ],
    },
  ],
  brochure: [
    {
      title: 'Household',
      fields: [
        field('clientName', 'Client'),
        field('brochureDate', 'Brochure date', { type: 'date' }),
        field('feeEarner', 'Adviser', { locked: true }),
      ],
    },
    {
      title: 'Copy',
      fields: [
        field('servicesIncluded', 'Services included', { type: 'textarea' }),
        field('servicesExcluded', 'Services excluded', { type: 'textarea' }),
        field('advisoryFeeRate', 'Advisory fees', { type: 'textarea' }),
        field('nextSteps', 'Next steps', { type: 'textarea' }),
      ],
    },
  ],
  claim: [
    {
      title: 'Client',
      fields: [
        field('clientName', 'Name'),
        field('clientEmail', 'Email', { type: 'email' }),
        field('clientPhone', 'Phone', { type: 'tel' }),
        field('clientAddr', 'Address', { type: 'textarea' }),
        field('feeEarner', 'Adviser', { locked: true }),
      ],
    },
    {
      title: 'Loss',
      fields: [
        field('claimed', 'Amount claimed'),
        field('walletHolds', 'Wallet holds'),
        field('wallet', 'Wallet'),
        field('destinationWallet', 'Destination wallet'),
        field('clientWallet', 'Client wallet'),
        field('orderDate', 'Freezing order', { type: 'date' }),
        field('exchange', 'Exchange'),
        field('court', 'Court'),
        field('provider', 'Tracing provider'),
        field('reportDate', 'Report date', { type: 'date' }),
        field('route', 'Route'),
        field('hasCollateral', 'Collateral', { type: 'select', options: ['No', 'Yes'] }),
        field('collateralNote', 'Collateral note', { showWhen: 'hasCollateral=Yes' }),
      ],
    },
  ],
  p2p: [
    {
      title: 'Investor',
      fields: [
        field('investorName', 'Investor'),
        field('investorEmail', 'Investor email', { type: 'email' }),
        field('investorPhone', 'Investor phone', { type: 'tel' }),
      ],
    },
    {
      title: 'Borrower',
      fields: [
        field('borrowerName', 'Borrower'),
        field('borrowerEmail', 'Borrower email', { type: 'email' }),
        field('borrowerPhone', 'Borrower phone', { type: 'tel' }),
        field('guarantorName', 'Guarantor', { showWhen: 'secured=Yes' }),
        field('guarantorRelationship', 'Guarantor relationship', { showWhen: 'secured=Yes' }),
      ],
    },
    {
      title: 'Transaction',
      fields: [
        field('agreementNumber', 'Agreement number'),
        field('investmentAmountChf', 'Principal (CHF)'),
        field('interestRateAnnualPct', 'Interest % p.a.'),
        field('interestType', 'Interest type', { type: 'select', options: ['Fixed', 'Variable', 'Tiered'] }),
        field('loanTermMonths', 'Term (months)'),
        field('repaymentFrequency', 'Frequency', {
          type: 'select',
          options: ['Monthly', 'Quarterly', 'Bullet', 'Custom'],
        }),
        field('documentDate', 'Document date', { type: 'date' }),
        field('transactionDate', 'Execution date', { type: 'date' }),
        field('startDate', 'Disbursement', { type: 'date' }),
        field('maturityDate', 'Maturity', { type: 'date' }),
        field('gracePeriodDays', 'Grace days'),
        field('lateFeeChf', 'Late fee (CHF)'),
        field('earlyRepaymentPenaltyPct', 'Early-repay penalty %'),
        field('earlyRepaymentNoticeDays', 'Early-repay notice days'),
        field('earlyRepaymentFreeMonths', 'Penalty-free months'),
        field('secured', 'Secured', { type: 'select', options: ['No', 'Yes'] }),
        field('collateralType', 'Collateral', {
          type: 'select',
          options: ['Unsecured', 'Real Estate', 'Vehicle', 'Securities', 'Guarantor'],
          showWhen: 'secured=Yes',
        }),
        field('collateralDescription', 'Collateral description', { showWhen: 'secured=Yes' }),
        field('collateralValueChf', 'Collateral value (CHF)', { showWhen: 'secured=Yes' }),
        field('advisorFeeChf', 'Advisor fee (CHF)'),
        field('officeLocation', 'Seat', {
          type: 'select',
          options: ['Lucerne', 'Zurich', 'Geneva', 'Basel'],
        }),
        field('disputeResolutionBody', 'Dispute body'),
        field('amlCheckCompleted', 'AML/KYC', { type: 'select', options: ['Yes', 'No'] }),
        field('amlCheckDate', 'AML date', { type: 'date' }),
        field('feeEarner', 'Adviser', { locked: true }),
      ],
    },
  ],
  matter: [
    {
      title: 'Application',
      fields: [
        field('clientName', 'Name'),
        field('court', 'Court'),
        field('feeEarner', 'Adviser', { locked: true }),
      ],
    },
  ],
  release: [
    {
      title: 'Order',
      fields: [
        field('applicant', 'Applicant'),
        field('caseRef', 'Case reference'),
        field('feeEarner', 'Adviser', { locked: true }),
      ],
    },
  ],
  tracing: [
    {
      title: 'Trace',
      fields: [
        field('clientName', 'Name'),
        field('loss', 'Loss'),
        field('followed', 'Followed'),
        field('frozen', 'Frozen'),
        field('provider', 'Provider'),
        field('reportDate', 'Report date', { type: 'date' }),
      ],
    },
  ],
});

export function fieldsForKindDef(kind) {
  return (DOCUMENT_FIELD_GROUPS[kind] ?? []).flatMap((group) => group.fields);
}

export function emptyFormValues(kind) {
  const values = {};
  for (const item of fieldsForKindDef(kind)) {
    if (item.type === 'select') {
      const options = item.options ?? [];
      if (options.includes('include')) {
        values[item.name] = 'include';
      } else {
        values[item.name] = SELECT_DEFAULTS[item.name] ?? '';
      }
    } else {
      values[item.name] = '';
    }
  }
  return values;
}

export function showWhenMatches(spec, values) {
  if (!spec) return true;
  const eq = spec.indexOf('=');
  if (eq < 0) return true;
  const name = spec.slice(0, eq);
  const expected = spec.slice(eq + 1);
  return String(values[name] ?? '') === expected;
}

export function initialsFromName(name) {
  return String(name || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function dateFromCreatedAt(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  const raw = String(value ?? '').trim();
  return raw.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] ?? '';
}

export function agreementFromRecord(client, register) {
  const created = dateFromCreatedAt(client?.created_at);
  return {
    clientName: client?.name ?? '',
    clientEmail: client?.email ?? '',
    clientPhone: client?.phone ?? '',
    clientConsent: client?.consent === true ? 'Given' : '',
    intakeDate: created,
    agreementDate: created,
    feeEarner: register?.feeEarner ?? '',
  };
}

export function p2pFromRecord(client, register) {
  const created = dateFromCreatedAt(client?.created_at);
  const stem = String(client?.id || '')
    .replace(/[^a-z0-9]/gi, '')
    .slice(-4)
    .toUpperCase()
    .padStart(4, '0');
  const year = created.slice(0, 4) || String(new Date().getUTCFullYear());
  return {
    investorName: client?.name ?? '',
    investorEmail: client?.email ?? '',
    investorPhone: client?.phone ?? '',
    clientName: client?.name ?? '',
    agreementNumber: `HG-P2P-${year}-${stem || '0001'}`,
    feeEarner: register?.feeEarner ?? '',
  };
}

function clientPrefill(client) {
  const name = client?.name ?? '';
  return {
    clientName: name,
    clientEmail: client?.email ?? '',
    clientPhone: client?.phone ?? '',
    applicant: name,
    wsName: name,
    sellerName: name,
    buyerName: name,
    investorName: name,
    investorEmail: client?.email ?? '',
    investorPhone: client?.phone ?? '',
  };
}

function applyRegisterOverrides(values, register) {
  const next = { ...values };
  next.feeEarner = register?.feeEarner ?? next.feeEarner ?? '';
  if (!String(next.court ?? '').trim()) {
    next.court = register?.defaultCourt ?? '';
  }
  if (!String(next.firmLegalName ?? '').trim()) {
    next.firmLegalName = register?.firm?.legalName ?? '';
  }
  return next;
}

export function valuesForCompose(kind, client, documents, register) {
  let next = { ...emptyFormValues(kind), ...clientPrefill(client) };

  if (kind === 'agreement') {
    next = { ...next, ...agreementFromRecord(client, register) };
  }
  if (kind === 'brochure') {
    next = { ...next, ...BROCHURE_DEFAULTS, brochureDate: todayIso() };
  }
  if (kind === 'p2p') {
    next = { ...next, ...p2pFromRecord(client, register) };
  }

  if (!kindSaved(documents, kind)) {
    const sibling = SIBLING_SEED[kind];
    if (sibling && kindSaved(documents, sibling)) {
      next = { ...next, ...fieldsForKind(documents, sibling) };
    }
  }

  if (kindSaved(documents, kind)) {
    next = { ...next, ...fieldsForKind(documents, kind) };
  }

  return applyRegisterOverrides(next, register);
}

export function fieldsForSave(kind, values, register) {
  const out = {};
  for (const item of fieldsForKindDef(kind)) {
    if (!showWhenMatches(item.showWhen, values)) continue;
    out[item.name] = String(values?.[item.name] ?? '').trim();
  }
  if (kind !== NO_FEE_EARNER_KIND) {
    out.feeEarner = register?.feeEarner ?? String(values?.feeEarner ?? '').trim();
  }
  for (const key of EXTRA_SAVE_KEYS) {
    const raw = String(values?.[key] ?? '').trim();
    if (raw) out[key] = raw;
  }
  return out;
}

export function applyDerivedFields(kind, values, changed) {
  const next = { ...values };
  if (kind !== 'tracing' || changed !== 'loss') return next;
  const loss = parseMoney(next.loss);
  if (loss == null) return next;

  if (!String(next.followed ?? '').trim()) {
    next.followed = formatMoney(roundTo(loss * 0.988, 100));
  }
  if (!String(next.frozen ?? '').trim()) {
    next.frozen = formatMoney(roundTo(loss * 0.985, 100));
  }

  let followed = parseMoney(next.followed);
  if (followed != null) {
    followed = Math.min(loss, Math.max(loss * 0.05, followed));
    next.followed = formatMoney(followed);
  }
  let frozen = parseMoney(next.frozen);
  if (frozen != null && followed != null) {
    frozen = Math.min(followed, frozen);
    next.frozen = formatMoney(frozen);
  }
  return next;
}

export function parseMoney(value) {
  if (value == null || value === '') return null;
  const raw = String(value).trim();
  if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(raw)) {
    return Number(raw.replace(/\./g, '').replace(',', '.'));
  }
  const cleaned = raw.replace(/[^\d.-]/g, '');
  if (!cleaned) return null;
  const amount = Number(cleaned);
  return Number.isFinite(amount) ? amount : null;
}

export function formatMoney(amount) {
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(amount);
}

export function roundTo(amount, step) {
  return Math.round(amount / step) * step;
}

export function formatUkDate(iso) {
  if (!iso) return '';
  const raw = String(iso).trim();
  const day = raw.match(/^(\d{4}-\d{2}-\d{2})/)?.[1];
  const date = day ? new Date(`${day}T00:00:00Z`) : new Date(`${raw}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return raw;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function addDaysIso(iso, days) {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return '';
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function addYearsIso(iso, years) {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return '';
  date.setUTCFullYear(date.getUTCFullYear() + years);
  return date.toISOString().slice(0, 10);
}

export function addMonthsIso(iso, months) {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return '';
  date.setUTCMonth(date.getUTCMonth() + Number(months) || 0);
  return date.toISOString().slice(0, 10);
}


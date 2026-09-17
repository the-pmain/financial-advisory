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
  claim: [
    {
      title: '1 — Parties and loss',
      fields: [
        field('clientName', 'Client name'),
        field('clientAddr', 'Client address', { type: 'textarea' }),
        field('crimeRef', 'Crime / Action Fraud reference'),
        field('ourRef', 'Our reference'),
        field('policeUrn', 'Police URN'),
        field('fraudDates', 'Fraud dates'),
        field('lossValue', 'Loss value'),
        field('scamDesc', 'Description of the scam', { type: 'textarea' }),
      ],
    },
    {
      title: '2 — Wallet',
      fields: [
        field('orderDate', 'Order date', { type: 'date' }),
        field('exchange', 'Exchange / venue'),
        field('wallet', 'Wallet'),
        field('walletHolds', 'Wallet holds'),
        field('claimed', 'Amount claimed'),
        field('originAddr', 'Origin address'),
      ],
    },
    {
      title: '3 — Tracing exhibit',
      fields: [
        field('funds', 'Funds / asset'),
        field('provider', 'Analytics provider'),
        field('reportDate', 'Report date', { type: 'date' }),
        field('route', 'Route', { type: 'textarea' }),
      ],
    },
    {
      title: '4 — Officer and other claimants',
      fields: [
        field('officer', 'Officer'),
        field('agency', 'Agency'),
        field('claimants', 'Other claimants', { type: 'select', options: ['none', 'some'] }),
        field('claimantsN', 'Number of claimants', { showWhen: 'claimants=some' }),
      ],
    },
    {
      title: '5 — Court',
      fields: [
        field('court', 'Court'),
        field('respondent', 'Respondent'),
        field('feeEarner', 'Fee earner', { locked: true }),
        field('copyTo', 'Copy to'),
      ],
    },
  ],
  matter: [
    {
      title: 'Application',
      fields: [
        field('clientName', 'Client name'),
        field('clientAddr', 'Client address', { type: 'textarea' }),
        field('crimeRef', 'Crime reference'),
        field('ourRef', 'Our reference'),
        field('policeUrn', 'Police URN'),
        field('fraudDates', 'Fraud dates'),
        field('lossValue', 'Loss value'),
        field('scamDesc', 'Description of the scam', { type: 'textarea' }),
        field('orderDate', 'Order date', { type: 'date' }),
        field('exchange', 'Exchange / venue'),
        field('wallet', 'Frozen wallet'),
        field('clientWallet', 'Client wallet'),
        field('walletHolds', 'Wallet holds'),
        field('claimed', 'Amount claimed'),
        field('originAddr', 'Origin address'),
        field('funds', 'Funds / asset'),
        field('provider', 'Analytics provider'),
        field('reportDate', 'Report date', { type: 'date' }),
        field('route', 'Route', { type: 'textarea' }),
        field('officer', 'Officer'),
        field('agency', 'Agency'),
        field('claimants', 'Other claimants', { type: 'select', options: ['none', 'some'] }),
        field('claimantsN', 'Number of claimants', { showWhen: 'claimants=some' }),
        field('court', 'Court'),
        field('respondent', 'Respondent'),
        field('feeEarner', 'Fee earner', { locked: true }),
        field('copyTo', 'Copy to'),
      ],
    },
  ],
  release: [
    {
      title: '1 — Order heading',
      fields: [
        field('court', 'Court'),
        field('caseRef', 'Case reference'),
        field('before', 'Before'),
        field('orderDated', 'Order dated', { type: 'date' }),
        field('freezeDate', 'Freeze date', { type: 'date' }),
        field('applicant', 'Applicant'),
        field('clientAddr', 'Client address', { type: 'textarea' }),
        field('crimeRef', 'Crime reference'),
        field('ourRef', 'Our reference'),
        field('respondent', 'Respondent'),
      ],
    },
    {
      title: '2 — Application and evidence',
      fields: [
        field('applicationDate', 'Application date', { type: 'date' }),
        field('wsName', 'Witness statement by'),
        field('wsDate', 'Witness statement date', { type: 'date' }),
        field('provider', 'Analytics provider'),
        field('reportDate', 'Report date', { type: 'date' }),
        field('hearing', 'Hearing', {
          type: 'select',
          options: ['unopposed', 'neither supporting nor opposing', 'opposed'],
        }),
      ],
    },
    {
      title: '3 — Release',
      fields: [
        field('releasedAssets', 'Released assets'),
        field('wallet', 'Wallet'),
        field('exchange', 'Exchange'),
        field('destination', 'Destination', {
          type: 'select',
          options: ['nominated wallet', "solicitors' client account"],
        }),
        field('destinationWallet', 'Destination wallet', { showWhen: 'destination=nominated wallet' }),
        field('agreeWith', 'Agree with', {
          type: 'select',
          options: ['Respondent', 'administrator of the wallet'],
        }),
      ],
    },
    {
      title: '4 — Costs',
      fields: [
        field('costs', 'Costs', { type: 'select', options: ['pay', 'none'] }),
        field('costsSum', 'Costs sum', { showWhen: 'costs=pay' }),
      ],
    },
    {
      title: '5 — Fee earner',
      fields: [field('feeEarner', 'Fee earner', { locked: true })],
    },
  ],
  p2p: [
    {
      title: 'Parties',
      fields: [
        field('sellerName', 'Seller name'),
        field('sellerRef', 'Seller reference'),
        field('sellerEmail', 'Seller email', { type: 'email' }),
        field('sellerPhone', 'Seller phone', { type: 'tel' }),
        field('buyerName', 'Buyer name'),
        field('buyerRef', 'Buyer reference'),
        field('buyerEmail', 'Buyer email', { type: 'email' }),
        field('buyerPhone', 'Buyer phone', { type: 'tel' }),
      ],
    },
    {
      title: 'Firm and matter',
      fields: [
        field('firmEntity', 'Firm entity'),
        field('matterRef', 'Matter reference'),
        field('agreementDate', 'Agreement date', { type: 'date' }),
        field('feeEarner', 'Fee earner', { locked: true }),
      ],
    },
    {
      title: 'Deal',
      fields: [
        field('asset', 'Asset'),
        field('network', 'Network'),
        field('amount', 'Amount'),
        field('price', 'Price'),
        field('priceWords', 'Price in words'),
        field('sellerWallet', 'Seller wallet'),
        field('buyerWallet', 'Buyer wallet'),
        field('bankName', 'Bank name'),
        field('bankSort', 'Sort code'),
        field('bankAccount', 'Account number'),
        field('bankRef', 'Payment reference'),
        field('settlementTime', 'Settlement time'),
        field('settlementDate', 'Settlement date', { type: 'date' }),
        field('confirmations', 'Confirmations', {
          type: 'select',
          options: ['1', '2', '3', '6', '12'],
        }),
        field('guaranteeCap', 'Guarantee cap'),
        field('fee', 'Fee'),
        field('feePayable', 'Fee payable by'),
      ],
    },
  ],
  tracing: [
    {
      title: 'Report',
      fields: [
        field('clientName', 'Client name'),
        field('platform', 'Platform'),
        field('matterRef', 'Matter reference'),
        field('reportDate', 'Report date', { type: 'date' }),
        field('asAtDate', 'As at date', { type: 'date' }),
        field('analyst', 'Analyst'),
        field('reviewer', 'Reviewer'),
        field('reportPurpose', 'Purpose', { type: 'textarea' }),
      ],
    },
    {
      title: 'Amounts',
      fields: [
        field('loss', 'Loss'),
        field('followed', 'Followed'),
        field('frozen', 'Frozen'),
        field('hops', 'Hops', { type: 'select', options: ['3', '4', '5', '6'] }),
        field('seed', 'Seed (figures only — never generates wallets)'),
      ],
    },
    {
      title: 'Wallets (print only if supplied)',
      fields: [
        field('victimWalletBtc', 'Victim BTC wallet'),
        field('victimWalletTron', 'Victim TRON wallet'),
        field('collectionWallet', 'Collection wallet'),
        field('peelFirstWallet', 'Peel first wallet'),
        field('peelFinalWallet', 'Peel final wallet'),
        field('directWallet', 'Direct wallet'),
        field('exchangeDepositWallet', 'Exchange deposit wallet'),
        field('exchangeWithdrawalWallet', 'Exchange withdrawal wallet'),
        field('bridgeOutputWallet', 'Bridge output wallet'),
        field('swapOutputWallet', 'Swap output wallet'),
        field('consolidationWallet', 'Consolidation wallet'),
        field('endpointWallet', 'Endpoint wallet'),
        field('onwardWallet', 'Onward wallet'),
      ],
    },
    {
      title: 'Hop dates',
      fields: [
        field('showHopTable', 'Hop table', { type: 'select', options: ['include', 'omit'] }),
        field('lossStartDate', 'Loss start', { type: 'date', showWhen: 'showHopTable=include' }),
        field('lossEndDate', 'Loss end', { type: 'date', showWhen: 'showHopTable=include' }),
        field('hop2Date', 'Hop 2 date', { type: 'date', showWhen: 'showHopTable=include' }),
        field('hop3StartDate', 'Hop 3 start', { type: 'date', showWhen: 'showHopTable=include' }),
        field('hop3EndDate', 'Hop 3 end', { type: 'date', showWhen: 'showHopTable=include' }),
        field('hop4Date', 'Hop 4 date', { type: 'date', showWhen: 'showHopTable=include' }),
        field('hop5Date', 'Hop 5 date', { type: 'date', showWhen: 'showHopTable=include' }),
        field('hop6Date', 'Hop 6 date', { type: 'date', showWhen: 'showHopTable=include' }),
        field('hop7Date', 'Hop 7 date', { type: 'date', showWhen: 'showHopTable=include' }),
        field('hop8Date', 'Hop 8 date', { type: 'date', showWhen: 'showHopTable=include' }),
        field('hop9Date', 'Hop 9 date', { type: 'date', showWhen: 'showHopTable=include' }),
        field('hop10Date', 'Hop 10 date', { type: 'date', showWhen: 'showHopTable=include' }),
        field('hopEndpointDate', 'Endpoint date', { type: 'date', showWhen: 'showHopTable=include' }),
        field('freezeDate', 'Freeze date', { type: 'date', showWhen: 'showHopTable=include' }),
      ],
    },
    {
      title: 'Sections',
      fields: [
        field('showSummary', 'Summary', { type: 'select', options: ['include', 'omit'] }),
        field('showDiagram', 'Diagram', { type: 'select', options: ['include', 'omit'] }),
        field('showAttribution', 'Attribution', { type: 'select', options: ['include', 'omit'] }),
        field('showMethodology', 'Methodology', { type: 'select', options: ['include', 'omit'] }),
        field('showRecommendations', 'Recommendations', { type: 'select', options: ['include', 'omit'] }),
        field('showAppendix', 'Appendix', { type: 'select', options: ['include', 'omit'] }),
        field('showStatement', 'Statement', { type: 'select', options: ['include', 'omit'] }),
        field('findingsText', 'Findings', { type: 'textarea' }),
        field('methodSources', 'Method sources', { type: 'textarea' }),
        field('limitations', 'Limitations', { type: 'textarea' }),
        field('recommendations', 'Recommendations', { type: 'textarea' }),
        field('statement', 'Statement', { type: 'textarea' }),
      ],
    },
    {
      title: 'Attribution',
      fields: [
        field('endpointVenue', 'Endpoint venue'),
        field('endpointJurisdiction', 'Endpoint jurisdiction'),
        field('endpointConfidence', 'Endpoint confidence', {
          type: 'select',
          options: ['High', 'Medium', 'Low', 'Traced, not frozen'],
        }),
        field('exchangeVenue', 'Exchange venue'),
        field('exchangeJurisdiction', 'Exchange jurisdiction'),
        field('bridgeVenue', 'Bridge venue'),
        field('bridgeJurisdiction', 'Bridge jurisdiction'),
        field('swapVenue', 'Swap venue'),
        field('swapJurisdiction', 'Swap jurisdiction'),
      ],
    },
  ],
});

export function fieldsForKindDef(kind) {
  return (DOCUMENT_FIELD_GROUPS[kind] ?? []).flatMap((group) => group.fields);
}

const SELECT_DEFAULTS = Object.freeze({
  claimants: 'none',
  destination: "solicitors' client account",
  agreeWith: 'Respondent',
  costs: 'none',
  confirmations: '6',
  hops: '4',
  hearing: 'neither supporting nor opposing',
  mandateType: 'Investment advisory (non-discretionary)',
  reportingFrequency: 'Quarterly',
  contractLanguage: 'English',
  jurisdictionCourt: 'Lucerne',
  feeModel: 'Percentage of AUM',
  invoiceSchedule: 'Quarterly in arrears',
  noticePeriod: '30 days',
});

export function emptyFormValues(kind) {
  const values = {};
  for (const item of fieldsForKindDef(kind)) {
    if (item.type === 'select' && item.options?.includes('include')) values[item.name] = 'include';
    else if (SELECT_DEFAULTS[item.name] != null) values[item.name] = SELECT_DEFAULTS[item.name];
    else values[item.name] = '';
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

export function matterReferenceFromDate(iso) {
  const date = iso ? new Date(iso) : new Date();
  if (Number.isNaN(date.getTime())) return 'EL-0000-0000';
  const year = date.getUTCFullYear();
  const start = Date.UTC(year, 0, 0);
  const day = Math.round((Date.UTC(year, date.getUTCMonth(), date.getUTCDate()) - start) / 86_400_000);
  return `EL-${year}-${String(day).padStart(4, '0')}`;
}

export function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function prefillFromClient(client) {
  return {
    clientName: client?.name ?? '',
    clientEmail: client?.email ?? '',
    clientPhone: client?.phone ?? '',
    applicant: client?.name ?? '',
    wsName: client?.name ?? '',
    sellerName: '',
  };
}

export function defaultFeeRateFor(mandateType, feeModel) {
  const model = String(feeModel || '');
  const mandate = String(mandateType || '');
  if (model === 'Hourly') return AGREEMENT_DEFAULTS.hourlyFeeRate;
  if (model === 'Project-based') return AGREEMENT_DEFAULTS.projectFeeRate;
  if (model === 'Retainer') return AGREEMENT_DEFAULTS.retainerFeeRate;
  if (mandate.startsWith('Discretionary')) return AGREEMENT_DEFAULTS.discretionaryFeeRate;
  return AGREEMENT_DEFAULTS.advisoryFeeRate;
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

const AGREEMENT_SAVED_KEYS = Object.freeze(['clientName', 'clientEmail', 'clientPhone']);

function overlayAgreementContact(documents) {
  const saved = fieldsForKind(documents, 'agreement');
  const overlay = {};
  for (const key of AGREEMENT_SAVED_KEYS) {
    const raw = String(saved[key] ?? '').trim();
    if (raw) overlay[key] = raw;
  }
  return overlay;
}

export function valuesForCompose(kind, client, documents, register) {
  if (kind === 'agreement') {
    const base = agreementFromRecord(client, register);
    return {
      ...emptyFormValues(kind),
      ...base,
      ...overlayAgreementContact(documents),
      feeEarner: register?.feeEarner ?? '',
    };
  }
  const base = emptyFormValues(kind);
  const fromClient = prefillFromClient(client);
  const saved = fieldsForKind(documents, kind);
  const claimOverlay =
    kind === 'matter' && !kindSaved(documents, 'matter') ? fieldsForKind(documents, 'claim') : {};
  const merged = {
    ...base,
    ...fromClient,
    ...claimOverlay,
    ...saved,
    court: saved.court || claimOverlay.court || register?.defaultCourt || base.court,
    firmEntity: saved.firmEntity || register?.firm?.legalName || base.firmEntity,
    feeEarner: register?.feeEarner ?? '',
  };
  if (kind !== 'tracing') merged.feeEarner = register?.feeEarner ?? '';
  return merged;
}

export function applyLossCaps(values) {
  const next = { ...values };
  const loss = parseMoney(next.loss);
  if (loss == null) return next;
  if (!String(next.followed || '').trim()) next.followed = formatMoney(roundTo(loss * 0.988, 100));
  if (!String(next.frozen || '').trim()) next.frozen = formatMoney(roundTo(loss * 0.985, 100));
  let followed = parseMoney(next.followed) ?? 0;
  let frozen = parseMoney(next.frozen) ?? 0;
  if (followed > loss) followed = loss;
  if (followed < loss * 0.05) followed = loss * 0.05;
  if (frozen > followed) frozen = followed;
  next.followed = formatMoney(followed);
  next.frozen = formatMoney(frozen);
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

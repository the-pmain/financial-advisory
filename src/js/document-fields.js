import { fieldsForKind } from './clients-documents-model.js';

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
});

export function fieldsForKindDef(kind) {
  return (DOCUMENT_FIELD_GROUPS[kind] ?? []).flatMap((group) => group.fields);
}

export function emptyFormValues(kind) {
  const values = {};
  for (const item of fieldsForKindDef(kind)) {
    values[item.name] = '';
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
  const saved = fieldsForKind(documents, kind);
  return {
    ...emptyFormValues(kind),
    ...saved,
    feeEarner: register?.feeEarner ?? '',
  };
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


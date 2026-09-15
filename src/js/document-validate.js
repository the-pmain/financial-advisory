import { DOCUMENT_EMAIL_DOMAIN } from './document-register.js';
import { parseMoney } from './document-fields.js';

const PLACEHOLDER_RE = /^(\[.*\]|placeholder|test|n\/a|thelegal|tbd|todo)$/i;
const NFRC_RE = /^NFRC\d{9,12}$/i;
const OUR_REF_RE = /^EL\/\d{4}\/\d{3,}$/i;
const URN_RE = /^([A-Z]{2,}\/\d{2}\/\d+|[\d]{10,12})$/i;
const ETH_RE = /0x[a-fA-F0-9]{40}/;
const BTC_RE = /^(bc1[a-z0-9]{25,62}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})$/;

function issue(severity, code, message, extra = {}) {
  return { severity, code, message, ...extra };
}

export function isUnallocatedCaseRef(value) {
  const raw = String(value || '').trim().toLowerCase();
  if (!raw) return true;
  return /to be allocated|tbc|\[\s*\.\.\.\s*\]|\[.*\]/.test(raw);
}

export function printCaseRef(values) {
  if (isUnallocatedCaseRef(values.caseRef)) return values.ourRef || values.caseRef || '';
  return values.caseRef;
}

export function validateDocument(kind, values, { people, register } = {}) {
  const issues = [];
  const fieldResults = {};
  const next = { ...(values || {}) };

  const locked = register?.feeEarner || '';
  let coercedFeeEarner = next.feeEarner || '';
  if (kind !== 'tracing' && locked) {
    const rosterOk = (people ?? []).some(
      (person) => `${person.name} · ${person.email}` === next.feeEarner && person.email.endsWith(`@${DOCUMENT_EMAIL_DOMAIN}`),
    );
    if (!next.feeEarner || next.feeEarner !== locked || !rosterOk) {
      coercedFeeEarner = locked;
      next.feeEarner = locked;
      issues.push(
        issue('medium', 'fee-earner-coerced', 'Fee earner was reset to the firm register line.', {
          field: 'feeEarner',
          suggestion: locked,
        }),
      );
    }
  }

  function flag(severity, code, message, field, suggestion) {
    issues.push(issue(severity, code, message, { field, suggestion }));
    if (field) fieldResults[field] = { severity, message };
  }

  function rejectBadName(field, label) {
    const value = String(next[field] || '').trim();
    if (!value || PLACEHOLDER_RE.test(value)) {
      flag('critical', 'empty-name', `${label} is missing or looks like a placeholder.`, field);
      return;
    }
    if (!value.includes(' ') && !value.includes('·')) {
      flag('medium', 'one-word-name', `${label} looks like a single word.`, field);
    }
  }

  if (['agreement', 'claim', 'matter', 'tracing'].includes(kind)) rejectBadName('clientName', 'Client name');
  if (kind === 'release') rejectBadName('applicant', 'Applicant');
  if (kind === 'p2p') {
    rejectBadName('sellerName', 'Seller name');
    rejectBadName('buyerName', 'Buyer name');
  }

  if (next.clientAddr !== undefined && ['claim', 'matter', 'release'].includes(kind)) {
    if (!String(next.clientAddr || '').trim()) {
      flag('critical', 'address-required', 'Address is required.', 'clientAddr');
    }
  }

  if (next.lossValue && /,\d{3}\b/.test(next.lossValue) && !/^\d{1,3}(,\d{3})+/.test(next.lossValue)) {
    flag('medium', 'money-grouping', 'Check the grouping in this money amount.', 'lossValue', 'Use English grouping, e.g. 5,000.00.');
  }
  if (/^\d+,\d{3}$/.test(String(next.lossValue || ''))) {
    flag('medium', 'money-grouping', 'Amount looks like 5000,500. Use English grouping.', 'lossValue');
  }

  if (kind === 'claim' || kind === 'matter') {
    const claimed = parseMoney(next.claimed);
    const holds = parseMoney(next.walletHolds);
    if (claimed != null && holds != null && claimed > holds) {
      flag('critical', 'claim-exceeds-wallet', 'Amount claimed is greater than wallet holds.', 'claimed');
    }
    const asset = String(next.funds || next.asset || '').toUpperCase();
    const price = parseMoney(next.price || next.claimed);
    if ((asset.includes('USDT') || asset.includes('USDC')) && price != null) {
      const gbp = parseMoney(next.lossValue);
      if (gbp != null && gbp > 0) {
        const rate = price / gbp;
        if (rate < 0.45 || rate > 1.35) {
          flag('critical', 'stablecoin-rate', 'USDT/USDC versus GBP is outside 0.45–1.35.', 'claimed');
        }
      }
    }
    if (!next.orderDate || !next.wallet) {
      flag('critical', 'freezing-order', 'Freezing order date and wallet are required.', next.orderDate ? 'wallet' : 'orderDate');
    }
    if (!next.exchange) flag('medium', 'exchange-missing', 'Exchange / venue is missing.', 'exchange');
    if (!next.court) flag('medium', 'court-missing', 'Court is missing.', 'court');
    if (!next.provider || !next.reportDate) {
      flag('critical', 'trace-exhibit', 'Tracing exhibit needs a provider and report date.', next.provider ? 'reportDate' : 'provider');
    }
    if (!next.route) flag('medium', 'route-missing', 'Route is missing.', 'route');
    if (next.crimeRef && !NFRC_RE.test(next.crimeRef.replace(/\s+/g, '')) && !/AF\d+/i.test(next.crimeRef)) {
      flag('medium', 'nfrc', 'Crime reference should be NFRC plus 9–12 digits.', 'crimeRef');
    }
    if (next.policeUrn && !URN_RE.test(next.policeUrn.trim())) {
      flag('medium', 'police-urn', 'Police URN should be FORCE/YY/seq or 10–12 digits.', 'policeUrn');
    }
    if (next.ourRef && !OUR_REF_RE.test(next.ourRef.trim())) {
      flag('medium', 'our-ref', 'Our reference should look like EL/YYYY/###.', 'ourRef');
    }
    const wallet = String(next.wallet || '');
    const origin = String(next.originAddr || '');
    if (wallet && origin && wallet === origin) {
      flag('critical', 'origin-destination', 'Origin and destination wallets must differ.', 'originAddr');
    }
    if (wallet && !ETH_RE.test(wallet) && !BTC_RE.test(wallet)) {
      flag('medium', 'wallet-format', 'Wallet is not a recognised ETH or BTC address.', 'wallet');
    }
  }

  if (kind === 'release' && isUnallocatedCaseRef(next.caseRef)) {
    flag('medium', 'case-ref-unallocated', 'Unallocated case reference — Our ref will be printed instead.', 'caseRef', next.ourRef);
  }

  const critical = issues.filter((item) => item.severity === 'critical');
  const medium = issues.filter((item) => item.severity === 'medium');
  return {
    ok: critical.length === 0,
    issues,
    critical,
    medium,
    fieldResults,
    coercedFeeEarner,
    values: next,
  };
}

export function sanitizeForPdf(kind, values, register) {
  const next = { ...(values || {}) };
  if (kind !== 'tracing' && register?.feeEarner) next.feeEarner = register.feeEarner;
  for (const key of ['lossValue', 'claimed', 'walletHolds', 'loss', 'followed', 'frozen', 'price', 'amount', 'fee', 'guaranteeCap', 'costsSum']) {
    const amount = parseMoney(next[key]);
    if (amount != null) {
      next[key] = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(amount);
    }
  }
  return next;
}

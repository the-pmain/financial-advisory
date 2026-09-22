import { fieldsForKindDef, P2P_DEFAULTS, showWhenMatches } from './document-fields.js';

const LOCKED_WALLET_KEYS = Object.freeze(['wallet', 'destinationWallet', 'clientWallet']);
const KEEP_IF_FILLED = Object.freeze([
  'clientName',
  'applicant',
  'wsName',
  'sellerName',
  'investorName',
  'investorEmail',
  'investorPhone',
]);

export const DOCUMENT_MOCK = Object.freeze({
  agreement: Object.freeze({}),
  brochure: Object.freeze({
    clientName: 'Anna Keller',
    brochureDate: '2026-03-01',
    nextSteps:
      'A written mandate, a custody bank introduction, and a 90-day implementation plan after the first review.',
  }),
  claim: Object.freeze({
    clientName: 'Anna Keller',
    applicant: 'Anna Keller',
    clientEmail: 'anna.keller@example.com',
    clientPhone: '+41 41 211 29 29',
    clientAddr: 'Pilatusstrasse 12, 6003 Luzern',
    claimed: '12,500.00',
    walletHolds: '20,000.00',
    wallet: '0x1111111111111111111111111111111111111111',
    destinationWallet: '0x2222222222222222222222222222222222222222',
    clientWallet: '0x3333333333333333333333333333333333333333',
    exchange: 'Kraken',
    court: 'Commercial Court of the Canton of Lucerne',
    orderDate: '2026-03-01',
    provider: 'Chainalysis',
    reportDate: '2026-03-02',
    route: 'Exchange to personal wallet',
    hasCollateral: 'No',
  }),
  p2p: Object.freeze({
    ...P2P_DEFAULTS,
    investorName: 'Anna Keller',
    investorEmail: 'anna.keller@example.com',
    investorPhone: '+41 41 211 29 29',
    borrowerName: 'Pilatus Wohnbau GmbH',
    borrowerEmail: 'borrower@example.com',
    borrowerPhone: '+41 41 555 10 20',
    guarantorName: 'Lena Meier',
    guarantorRelationship: 'Managing director',
    agreementNumber: 'HG-P2P-2026-0001',
    documentDate: '2026-03-01',
    transactionDate: '2026-03-01',
    startDate: '2026-03-01',
    maturityDate: '2029-03-01',
    officeLocation: 'Lucerne',
    amlCheckDate: '2026-03-01',
    collateralDescription: 'First-ranking mortgage on Pilatusstrasse 12, 6003 Luzern',
    collateralValueChf: '180000',
  }),
  matter: Object.freeze({
    clientName: 'Anna Keller',
    court: 'Commercial Court of the Canton of Lucerne',
  }),
  release: Object.freeze({
    applicant: 'Anna Keller',
    caseRef: 'EL/2026/001',
  }),
  tracing: Object.freeze({
    clientName: 'Anna Keller',
    loss: '50,000',
    followed: '49,400',
    frozen: '49,250',
    provider: 'Chainalysis',
    reportDate: '2026-03-01',
  }),
});

export function applyDocumentMock(kind, current) {
  const mock = DOCUMENT_MOCK[kind];
  if (!mock) return { ...current };
  const next = { ...current, ...mock };
  if (String(current?.feeEarner ?? '').trim()) {
    next.feeEarner = current.feeEarner;
  }
  for (const key of KEEP_IF_FILLED) {
    if (String(current?.[key] ?? '').trim()) {
      next[key] = current[key];
    }
  }
  for (const item of fieldsForKindDef(kind)) {
    if (item.locked) continue;
    if (!showWhenMatches(item.showWhen, next)) continue;
    if (String(next[item.name] ?? '').trim()) continue;
    const sample = mock[item.name];
    if (sample != null && String(sample).trim()) next[item.name] = sample;
  }
  for (const key of LOCKED_WALLET_KEYS) {
    delete next[key];
    next[key] = '';
  }
  return next;
}

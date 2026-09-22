import { slot } from './document-pdf-write.js';

function letterhead(register = {}) {
  const firm = register?.firm ?? {};
  return [
    { type: 'kicker', text: 'Victim claim  ·  Confidential' },
    { type: 'title', text: firm.legalName || 'Helfenstein Asset Management AG' },
    {
      type: 'p',
      text: [firm.addressLine, firm.phone, firm.uid ? `UID ${firm.uid}` : '', firm.lei ? `LEI ${firm.lei}` : '']
        .filter(Boolean)
        .join('  ·  '),
    },
    { type: 'rule' },
  ];
}

export function buildClaim(values = {}, register = {}) {
  return [
    ...letterhead(register),
    { type: 'subject', text: 'Victim claim' },
    { type: 'p', text: `Client: ${slot(values.clientName, 'client name')}` },
    { type: 'p', text: `Address: ${slot(values.clientAddr, 'address')}` },
    { type: 'p', text: `Amount claimed: ${slot(values.claimed, 'claimed')}` },
    { type: 'p', text: `Wallet holds: ${slot(values.walletHolds, 'wallet holds')}` },
    { type: 'p', text: `Wallet: ${slot(values.wallet, 'wallet')}` },
    { type: 'p', text: `Court: ${slot(values.court, 'court')}` },
    { type: 'p', text: `Exchange: ${slot(values.exchange, 'exchange')}` },
  ];
}

export function buildMatter(values = {}, register = {}) {
  return [
    ...letterhead(register),
    { type: 'subject', text: 'Application of release order' },
    { type: 'p', text: `Client: ${slot(values.clientName, 'client name')}` },
    { type: 'p', text: `Court: ${slot(values.court, 'court')}` },
  ];
}

export function buildRelease(values = {}, register = {}) {
  return [
    ...letterhead(register),
    { type: 'subject', text: 'Release order' },
    { type: 'p', text: `Applicant: ${slot(values.applicant, 'applicant')}` },
    { type: 'p', text: `Case reference: ${slot(values.caseRef, 'case reference')}` },
  ];
}

export function buildTracing(values = {}, register = {}) {
  return [
    ...letterhead(register),
    { type: 'subject', text: 'Tracing report' },
    { type: 'p', text: `Client: ${slot(values.clientName, 'client name')}` },
    { type: 'p', text: `Loss: ${slot(values.loss, 'loss')}` },
    { type: 'p', text: `Followed: ${slot(values.followed, 'followed')}` },
    { type: 'p', text: `Frozen: ${slot(values.frozen, 'frozen')}` },
    { type: 'p', text: `Provider: ${slot(values.provider, 'provider')}` },
    { type: 'p', text: `Report date: ${slot(values.reportDate, 'report date')}` },
  ];
}

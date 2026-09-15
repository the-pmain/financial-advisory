import { DOCUMENT_KIND_LABELS, isDocumentKind } from './clients-documents-model.js';
import {
  addDaysIso,
  addYearsIso,
  formatUkDate,
  initialsFromName,
  todayIso,
} from './document-fields.js';
import { courtAddressFor } from './document-register.js';
import { printCaseRef, sanitizeForPdf, validateDocument } from './document-validate.js';
import { slot, writePdf } from './document-pdf-write.js';

export async function generateDocument(kind, values, { people, register } = {}) {
  if (!isDocumentKind(kind)) {
    throw new Error('Invalid document kind.');
  }
  const validation = validateDocument(kind, values, { people: people ?? register?.people, register });
  const sanitized = sanitizeForPdf(kind, validation.values, register);
  let bytes;
  let trust;
  if (kind === 'tracing') {
    bytes = await writePdf(buildTracingReport(sanitized, register), { profile: 'letterhead' });
  } else if (kind === 'p2p') {
    bytes = await writePdf(buildP2pAgreement(sanitized, register), { profile: 'letterhead' });
  } else if (kind === 'agreement') {
    bytes = await writePdf(buildAgreement(sanitized, register), { profile: 'letterhead' });
  } else {
    if (kind === 'claim') trust = buildClaimTrust(sanitized, validation);
    bytes = await writePdf(buildClaimFamily(kind, sanitized, register, trust), {
      profile: kind === 'claim' ? 'brand' : 'letterhead',
    });
  }
  const clientName =
    sanitized.clientName || sanitized.applicant || sanitized.sellerName || sanitized.buyerName || 'client';
  return {
    bytes,
    filename: documentFilename(kind, clientName, register?.filenamePrefix),
    validation,
    sanitized,
    trust,
  };
}

export function documentFilename(kind, clientName, prefix = 'Helfenstein') {
  const kindSlug = String(DOCUMENT_KIND_LABELS[kind] || kind)
    .normalize('NFKD')
    .replace(/[^\w]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const name = String(clientName || 'client')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 40);
  return `${prefix}-${kindSlug}-${name || 'client'}.pdf`;
}

function letterhead(register, kicker) {
  const firm = register?.firm ?? {};
  return [
    { type: 'kicker', text: kicker || '' },
    { type: 'title', text: firm.legalName || 'Firm' },
    { type: 'p', text: [firm.addressLine, firm.phone, firm.uid && `UID ${firm.uid}`, firm.lei && `LEI ${firm.lei}`].filter(Boolean).join('  ·  ') },
    { type: 'rule' },
  ];
}

export function buildAgreement(values, register) {
  const firm = register?.firm ?? {};
  return [
    ...letterhead(register, 'Client authority'),
    { type: 'subject', text: 'Authority to act' },
    {
      type: 'p',
      text: `${slot(values.clientName, 'client name')} (${slot(values.clientEmail, 'email')}, ${slot(values.clientPhone, 'phone')}) authorises ${firm.legalName || 'the firm'} to act in connection with matter ${slot(values.matterReference, 'reference')}.`,
    },
    { type: 'p', text: `Occupation: ${slot(values.clientOccupation, 'occupation')}. Date of birth: ${formatUkDate(values.clientDob) || slot(values.clientDob, 'date of birth')}. Initials: ${slot(values.clientInitials || initialsFromName(values.clientName), 'initials')}.` },
    { type: 'p', text: `Agreement date: ${formatUkDate(values.agreementDate) || slot(values.agreementDate, 'date')}. Fee earner: ${slot(values.feeEarner, 'fee earner')}.` },
    { type: 'p', text: `${firm.legalName || 'The firm'} is ${firm.legalName ? 'an independent, fee-only adviser. Client assets remain with the client’s banking partners.' : slot('', 'firm terms')}` },
    { type: 'space', h: 16 },
    { type: 'p', text: `Signed: ____________________    ${slot(values.clientName, 'client name')}` },
    { type: 'footnote', text: `Generated ${formatUkDate(todayIso())}. This PDF is not stored.` },
  ];
}

export function buildClaimTrust(values, validation) {
  const exhibits = [
    { name: 'Witness statement', key: 'ws', score: filled(values, ['clientName', 'scamDesc', 'lossValue']) },
    { name: 'Tracing report', key: 'tracing', score: filled(values, ['provider', 'reportDate', 'route']) },
    { name: 'Source records', key: 'source', score: filled(values, ['originAddr', 'wallet', 'exchange']) },
    { name: 'Action Fraud / crime report', key: 'af', score: filled(values, ['crimeRef']) },
    { name: 'Freezing order', key: 'order', score: filled(values, ['orderDate', 'wallet', 'court']) },
  ];
  const claimed = Number(String(values.claimed || '').replace(/[^\d.]/g, '')) || 0;
  const holds = Number(String(values.walletHolds || '').replace(/[^\d.]/g, '')) || 0;
  const proportion = holds ? Math.min(100, Math.round((claimed / holds) * 100)) : 0;
  const critical = validation?.critical?.length ?? 0;
  const status = critical ? 'provisional' : exhibits.every((item) => item.score >= 60) ? 'verified' : 'pending';
  return {
    status,
    exhibits,
    proportion,
    disclaimer: 'These scores are format and completeness checks only. They are not a finding of fact.',
  };
}

function filled(values, keys) {
  const have = keys.filter((key) => String(values[key] || '').trim()).length;
  return Math.round((have / keys.length) * 100);
}

export function buildClaimFamily(kind, values, register, trust) {
  const court = values.court || register?.defaultCourt;
  const respondent = values.respondent || values.agency || slot('', 'respondent');
  const expiry = values.orderDate ? formatUkDate(addYearsIso(values.orderDate, 2)) : slot('', 'expiry');
  const replyBy = formatUkDate(addDaysIso(todayIso(), 14));
  const mark = `${initialsFromName(values.clientName || values.applicant) || 'X'}1`;
  const walletUrl =
    values.wallet && values.wallet.startsWith('0x')
      ? `${register?.explorerBase || 'https://etherscan.io'}/address/${values.wallet}`
      : '';

  if (kind === 'matter') {
    return [
      ...letterhead(register, 'Application of release order'),
      { type: 'subject', text: `${court}` },
      { type: 'p', text: courtAddressFor(court, register) },
      { type: 'h', text: 'Application' },
      { type: 'p', n: 1, text: `${slot(values.clientName, 'applicant')} applies for release of frozen assets to client wallet ${slot(values.clientWallet, 'client wallet')} within 7 days.` },
      { type: 'p', n: 2, text: `The application is made on three limbs: (a) the scam described as ${slot(values.scamDesc, 'scam')}; (b) the source of funds through ${slot(values.originAddr, 'origin')}; (c) the tracing exhibit of ${slot(values.provider, 'provider')} dated ${formatUkDate(values.reportDate) || slot(values.reportDate, 'date')}.` },
      { type: 'p', n: 3, text: values.claimants === 'some' ? `Other claimants: ${slot(values.claimantsN, 'number')}.` : 'The applicant is not aware of other claimants.' },
      { type: 'h', text: 'Evidence' },
      { type: 'p', text: `Loss ${slot(values.lossValue, 'loss')} on ${slot(values.fraudDates, 'dates')}. Frozen wallet ${slot(values.wallet, 'wallet')} at ${slot(values.exchange, 'exchange')}. Our ref ${slot(values.ourRef, 'our ref')}.` },
      { type: 'h', text: 'Statement of truth' },
      { type: 'p', text: `I believe that the facts stated in this application are true. Fee earner: ${slot(values.feeEarner, 'fee earner')}.` },
      { type: 'footnote', text: `Reply by ${replyBy}. Generated ${formatUkDate(todayIso())}. This PDF is not stored.` },
    ];
  }

  if (kind === 'release') {
    const caseLine = printCaseRef(values);
    return [
      ...letterhead(register, 'Release order'),
      { type: 'subject', text: `${court}` },
      { type: 'p', text: `Case ${slot(caseLine, 'case / our ref')}   Before ${slot(values.before, 'judge')}   Dated ${formatUkDate(values.orderDated) || slot(values.orderDated, 'date')}` },
      { type: 'h', text: 'Recitals' },
      { type: 'p', text: `UPON the application of ${slot(values.applicant, 'applicant')} dated ${formatUkDate(values.applicationDate) || slot(values.applicationDate, 'date')}, AND UPON reading the witness statement of ${slot(values.wsName, 'witness')} dated ${formatUkDate(values.wsDate) || slot(values.wsDate, 'date')}, AND UPON the tracing exhibit of ${slot(values.provider, 'provider')} dated ${formatUkDate(values.reportDate) || slot(values.reportDate, 'date')}, the court being ${slot(values.hearing, 'hearing')}.` },
      { type: 'h', text: 'IT IS ORDERED that' },
      { type: 'p', n: 1, text: `The following assets be released: ${slot(values.releasedAssets, 'assets')}. There is no forfeiture under s.303Z41.` },
      { type: 'p', n: 2, text: `The quantity released shall be transferred within 7 days to ${slot(values.destination, 'destination')}${values.destination === 'nominated wallet' ? ` ${slot(values.destinationWallet, 'destination wallet')}` : ''}.` },
      { type: 'p', n: 3, text: `The freeze dated ${formatUkDate(values.freezeDate) || slot(values.freezeDate, 'freeze')} continues on any remaining balance in ${slot(values.wallet, 'wallet')} at ${slot(values.exchange, 'exchange')}.` },
      { type: 'p', n: 4, text: values.costs === 'pay' ? `The respondent shall pay costs of ${slot(values.costsSum, 'sum')}.` : 'There be no order as to costs.' },
      { type: 'p', n: 5, text: 'The parties have liberty to apply.' },
      { type: 'p', text: `Agree with: ${slot(values.agreeWith, 'counterparty')}. Fee earner: ${slot(values.feeEarner, 'fee earner')}.` },
      { type: 'footnote', text: `Court officer to note. Generated ${formatUkDate(todayIso())}. This PDF is not stored.` },
    ];
  }

  return [
    ...letterhead(register, 'Victim claim'),
    { type: 'notice', text: `NOTICE TO ${respondent}. You must reply by ${replyBy}.` },
    { type: 'split', left: `${court}\n${courtAddressFor(court, register)}`, right: `Our ref: ${slot(values.ourRef, 'our ref')}\nCrime ref: ${slot(values.crimeRef, 'crime ref')}\nURN: ${slot(values.policeUrn, 'URN')}` },
    { type: 'h', text: 'Application under s.303Z37 and s.303Z51' },
    { type: 'p', text: `Applicant: ${slot(values.clientName, 'client')} of ${slot(values.clientAddr, 'address')}. Officer: ${slot(values.officer, 'officer')} (${slot(values.agency, 'agency')}). Copy to: ${slot(values.copyTo, 'copy to')}.` },
    { type: 'p', text: `UPON the loss of ${slot(values.lossValue, 'loss')} on ${slot(values.fraudDates, 'dates')} and the wallet ${slot(values.wallet, 'wallet')} now holding ${slot(values.walletHolds, 'holds')} of which ${slot(values.claimed, 'claimed')} is claimed (${trust?.proportion ?? 0}%).` },
    walletUrl ? { type: 'qr', url: walletUrl } : { type: 'space', h: 4 },
    { type: 'h', text: 'Limbs' },
    { type: 'p', n: 1, text: `(a) Scam — ${slot(values.scamDesc, 'description')}` },
    { type: 'p', n: 2, text: `(b) Source of funds — origin ${slot(values.originAddr, 'origin')} via ${slot(values.exchange, 'exchange')}.` },
    { type: 'p', n: 3, text: `(c) Tracing — ${slot(values.provider, 'provider')} dated ${formatUkDate(values.reportDate) || slot(values.reportDate, 'date')}. Route: ${slot(values.route, 'route')}.` },
    { type: 'p', text: values.claimants === 'some' ? `Other victims: ${slot(values.claimantsN, 'number')}.` : 'No other victims are identified.' },
    { type: 'h', text: `Exhibit schedule (${mark})` },
    ...(trust?.exhibits ?? []).map((item) => ({
      type: 'exhibit',
      mark: mark,
      text: `${item.name} — completeness ${item.score}/100 (${trust.status})`,
    })),
    { type: 'h', text: 'Five questions' },
    { type: 'p', n: 1, text: 'When did the account receive the claimed assets?' },
    { type: 'p', n: 2, text: 'What KYC was performed on the depositor?' },
    { type: 'p', n: 3, text: 'Have any assets been withdrawn since the freeze?' },
    { type: 'p', n: 4, text: 'Is any other claimant known to you?' },
    { type: 'p', n: 5, text: 'What is the present balance and asset split?' },
    { type: 'p', text: `Order expiry (order date + 2 years): ${expiry}. Fee earner: ${slot(values.feeEarner, 'fee earner')}.` },
    { type: 'footnote', text: `${trust?.disclaimer || ''} Generated ${formatUkDate(todayIso())}. This PDF is not stored.` },
  ];
}

export function buildP2pAgreement(values, register) {
  const firm = register?.firm ?? {};
  const clauses = [
    'The Seller sells and the Buyer buys the asset on the terms of this agreement.',
    'The Firm introduces the parties and records the deal. It does not hold the asset and does not act as solicitor on the deal.',
    'The asset, network, amount and price are those in the deal table.',
    'The Seller’s wallet and the Buyer’s wallet are those in the deal table.',
    'Fiat settlement is through the stated bank details, at the stated time on the stated date.',
    'Required confirmations are those in the deal table.',
    'Title passes when the required confirmations are reached and the fiat is received.',
    'Each party warrants it controls the wallet it nominates and that the asset is unencumbered.',
    'The Firm’s fee is the amount in the deal table, payable as stated.',
    'The guarantee is limited to direct loss up to the cap, and only if the six steps were performed on time.',
    'A party has two working days to cure a notified breach.',
    'A written claim must attach confirmations and transaction hashes and be made within 30 days of the deadline.',
    'Price moves after signing are excluded.',
    'Lost profit is excluded.',
    'A transfer to the wrong address is excluded.',
    'Lost keys or seed phrases are excluded.',
    'Anything outside the six steps is excluded.',
    'Notices may be sent to the emails in this agreement.',
    'This agreement is the entire agreement for this deal.',
    'The courts of Lucerne have jurisdiction, without prejudice to any mandatory forum.',
  ];
  return [
    ...letterhead(register, 'P2P agreement'),
    { type: 'subject', text: `${slot(values.firmEntity || firm.legalName, 'firm')} — peer-to-peer deal` },
    { type: 'p', text: `Seller: ${slot(values.sellerName, 'seller')} (${slot(values.sellerRef, 'ref')}) ${slot(values.sellerEmail, 'email')} ${slot(values.sellerPhone, 'phone')}` },
    { type: 'p', text: `Buyer: ${slot(values.buyerName, 'buyer')} (${slot(values.buyerRef, 'ref')}) ${slot(values.buyerEmail, 'email')} ${slot(values.buyerPhone, 'phone')}` },
    { type: 'p', text: `Matter ${slot(values.matterRef, 'matter')} dated ${formatUkDate(values.agreementDate) || slot(values.agreementDate, 'date')}. Fee earner: ${slot(values.feeEarner, 'fee earner')}.` },
    { type: 'h', text: 'Deal table' },
    { type: 'p', text: `Asset ${slot(values.asset, 'asset')} on ${slot(values.network, 'network')}. Amount ${slot(values.amount, 'amount')}. Price ${slot(values.price, 'price')} (${slot(values.priceWords, 'words')}).` },
    { type: 'p', text: `Seller wallet: ${slot(values.sellerWallet, 'seller wallet')}` },
    { type: 'p', text: `Buyer wallet: ${slot(values.buyerWallet, 'buyer wallet')}` },
    { type: 'p', text: `Bank ${slot(values.bankName, 'bank')} ${slot(values.bankSort, 'sort')} ${slot(values.bankAccount, 'account')} ref ${slot(values.bankRef, 'ref')}.` },
    { type: 'p', text: `${slot(values.settlementTime, 'time')} on ${formatUkDate(values.settlementDate) || slot(values.settlementDate, 'date')}. Confirmations: ${slot(values.confirmations, 'n')}.` },
    { type: 'p', text: `Guarantee cap ${slot(values.guaranteeCap, 'cap')}. Fee ${slot(values.fee, 'fee')} payable by ${slot(values.feePayable, 'who')}.` },
    { type: 'h', text: 'Operative clauses' },
    ...clauses.map((text, index) => ({ type: 'p', n: index + 1, text })),
    { type: 'space', h: 12 },
    { type: 'p', text: 'Signed:' },
    { type: 'p', text: 'Seller  [  ]          Buyer  [  ]          For the Firm  [  ]' },
    { type: 'footnote', text: `Generated ${formatUkDate(todayIso())}. This PDF is not stored.` },
  ];
}

export function buildTracingReport(values, register) {
  const include = (name) => String(values[name] || 'include') !== 'omit';
  const blocks = [...letterhead(register, 'Tracing report'), { type: 'subject', text: 'Tracing report' }];
  blocks.push({
    type: 'p',
    text: `${slot(values.clientName, 'client')} — ${slot(values.platform, 'platform')} — ${slot(values.matterRef, 'matter')}. Report ${formatUkDate(values.reportDate) || slot(values.reportDate, 'date')}, as at ${formatUkDate(values.asAtDate) || slot(values.asAtDate, 'date')}. Analyst ${slot(values.analyst, 'analyst')}, reviewer ${slot(values.reviewer, 'reviewer')}.`,
  });
  blocks.push({ type: 'p', text: `Purpose: ${slot(values.reportPurpose, 'purpose')}` });
  blocks.push({
    type: 'p',
    text: `Loss ${slot(values.loss, 'loss')}. Followed ${slot(values.followed, 'followed')}. Frozen ${slot(values.frozen, 'frozen')}. Hops ${slot(values.hops, 'hops')}. Seed ${slot(values.seed, 'seed')} (stabilises calculated figures only; wallets are never generated).`,
  });

  const wallets = [
    ['victimWalletBtc', 'Victim BTC'],
    ['victimWalletTron', 'Victim TRON'],
    ['collectionWallet', 'Collection'],
    ['peelFirstWallet', 'Peel first'],
    ['peelFinalWallet', 'Peel final'],
    ['directWallet', 'Direct'],
    ['exchangeDepositWallet', 'Exchange deposit'],
    ['exchangeWithdrawalWallet', 'Exchange withdrawal'],
    ['bridgeOutputWallet', 'Bridge output'],
    ['swapOutputWallet', 'Swap output'],
    ['consolidationWallet', 'Consolidation'],
    ['endpointWallet', 'Endpoint'],
    ['onwardWallet', 'Onward'],
  ].filter(([key]) => String(values[key] || '').trim());
  if (wallets.length) {
    blocks.push({ type: 'h', text: 'Wallets supplied by the operator' });
    for (const [key, label] of wallets) {
      blocks.push({ type: 'p', text: `${label}: ${values[key]}` });
    }
  }

  if (include('showSummary') && String(values.findingsText || '').trim()) {
    blocks.push({ type: 'break' });
    blocks.push({ type: 'h', text: 'Findings' });
    blocks.push({ type: 'p', text: values.findingsText });
  }
  if (include('showDiagram')) {
    blocks.push({ type: 'h', text: 'Diagram' });
    blocks.push({ type: 'p', text: wallets.map(([, label]) => label).join(' → ') || 'No supplied wallets to plot.' });
  }
  if (include('showHopTable')) {
    blocks.push({ type: 'h', text: 'Hop table' });
    const hops = [
      ['lossStartDate', 'Loss start'],
      ['lossEndDate', 'Loss end'],
      ['hop2Date', 'Hop 2'],
      ['hop3StartDate', 'Hop 3 start'],
      ['hop3EndDate', 'Hop 3 end'],
      ['hop4Date', 'Hop 4'],
      ['hop5Date', 'Hop 5'],
      ['hop6Date', 'Hop 6'],
      ['hop7Date', 'Hop 7'],
      ['hop8Date', 'Hop 8'],
      ['hop9Date', 'Hop 9'],
      ['hop10Date', 'Hop 10'],
      ['hopEndpointDate', 'Endpoint'],
      ['freezeDate', 'Freeze'],
    ];
    for (const [key, label] of hops) {
      if (String(values[key] || '').trim()) {
        blocks.push({ type: 'p', text: `${label}: ${formatUkDate(values[key]) || values[key]}` });
      }
    }
  }
  if (include('showAttribution')) {
    blocks.push({ type: 'h', text: 'Attribution' });
    for (const [venue, jurisdiction, extra] of [
      ['endpointVenue', 'endpointJurisdiction', values.endpointConfidence],
      ['exchangeVenue', 'exchangeJurisdiction', ''],
      ['bridgeVenue', 'bridgeJurisdiction', ''],
      ['swapVenue', 'swapJurisdiction', ''],
    ]) {
      if (String(values[venue] || '').trim()) {
        blocks.push({
          type: 'p',
          text: `${values[venue]} — ${slot(values[jurisdiction], 'jurisdiction')}${extra ? ` (${extra})` : ''}`,
        });
      }
    }
  }
  if (include('showMethodology') && (String(values.methodSources || '').trim() || String(values.limitations || '').trim())) {
    blocks.push({ type: 'break' });
    blocks.push({ type: 'h', text: 'Methodology' });
    if (String(values.methodSources || '').trim()) blocks.push({ type: 'p', text: values.methodSources });
    if (String(values.limitations || '').trim()) blocks.push({ type: 'p', text: values.limitations });
  }
  if (include('showRecommendations') && String(values.recommendations || '').trim()) {
    blocks.push({ type: 'h', text: 'Recommendations' });
    blocks.push({ type: 'p', text: values.recommendations });
  }
  if (include('showAppendix')) {
    blocks.push({ type: 'h', text: 'Appendix' });
    blocks.push({ type: 'p', text: 'Operator-supplied addresses only. No address in this report was generated from the seed.' });
  }
  if (include('showStatement') && String(values.statement || '').trim()) {
    blocks.push({ type: 'h', text: 'Statement' });
    blocks.push({ type: 'p', text: values.statement });
  }
  blocks.push({ type: 'footnote', text: `Generated ${formatUkDate(todayIso())}. This PDF is not stored.` });
  return blocks;
}

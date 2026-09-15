import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { PDFDocument } from 'pdf-lib';
import { applyDocumentMock } from '../src/js/document-mocks.js';
import { generateDocument } from '../src/js/document-generate.js';
import { parseDocumentPdfQuery, pdfFilename } from '../src/js/document-pdf.js';
import { buildDocumentRegister } from '../src/js/document-register.js';
import { toWinAnsi } from '../src/js/document-pdf-write.js';
import { validateDocument } from '../src/js/document-validate.js';

const company = {
  legalName: 'Helfenstein Asset Management AG',
  shortName: 'Helfenstein',
  address: { line: 'Pilatusstrasse 23, 6003 Luzern, Switzerland' },
  phone: '+41 41 211 29 29',
  uid: 'CHE-111.708.730',
  lei: '894500URZFTDV5G7F357',
};
const teamMembers = [
  { slug: 'friedrich-hartmann', name: 'Friedrich Hartmann', role: 'Chairman and CIO' },
];

const CLIENT_ID = '11111111-1111-4111-8111-111111111111';

describe('parseDocumentPdfQuery', () => {
  it('accepts a uuid and known kind', () => {
    const parsed = parseDocumentPdfQuery(
      new URLSearchParams({ client_id: CLIENT_ID, kind: 'agreement' }),
    );
    assert.deepEqual(parsed, { ok: true, value: { client_id: CLIENT_ID, kind: 'agreement' } });
  });

  it('rejects a missing or invalid client_id', () => {
    const missing = parseDocumentPdfQuery(new URLSearchParams({ kind: 'agreement' }));
    const bad = parseDocumentPdfQuery(
      new URLSearchParams({ client_id: 'not-a-uuid', kind: 'agreement' }),
    );
    assert.equal(missing.ok, false);
    assert.equal(bad.ok, false);
  });

  it('rejects an unknown kind', () => {
    const parsed = parseDocumentPdfQuery(
      new URLSearchParams({ client_id: CLIENT_ID, kind: 'fee-schedule' }),
    );
    assert.equal(parsed.ok, false);
  });
});

describe('pdf helpers', () => {
  it('slugifies the client name into a firm-kind filename', () => {
    assert.match(pdfFilename('agreement', 'Anna Keller'), /Helfenstein-Client-authority-anna-keller\.pdf/);
  });

  it('maps punctuation that Helvetica cannot encode', () => {
    assert.equal(toWinAnsi('Fee — “quoted”'), 'Fee - "quoted"');
  });
});

describe('generateDocument', () => {
  const register = buildDocumentRegister({ company, teamMembers, instructedSlug: 'friedrich-hartmann' });

  it('returns a valid PDF per kind and does not pick “the” document', async () => {
    const claim = await generateDocument('claim', applyDocumentMock('claim', { clientName: 'Anna Keller', feeEarner: register.feeEarner, wallet: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' }), { register });
    const tracing = await generateDocument('tracing', applyDocumentMock('tracing', { clientName: 'Anna Keller' }), { register });
    assert.equal(Buffer.from(claim.bytes.subarray(0, 4)).toString(), '%PDF');
    assert.equal(Buffer.from(tracing.bytes.subarray(0, 4)).toString(), '%PDF');
    assert.notDeepEqual(Buffer.from(claim.bytes), Buffer.from(tracing.bytes));
    assert.equal((await PDFDocument.load(claim.bytes)).getPageCount() >= 1, true);
  });

  it('still generates when claim exceeds wallet holds', async () => {
    const result = await generateDocument(
      'claim',
      {
        ...applyDocumentMock('claim', {
          clientName: 'Anna Keller',
          feeEarner: register.feeEarner,
        }),
        wallet: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        claimed: '99,000.00',
        walletHolds: '10,000.00',
      },
      { register },
    );
    assert.equal(result.validation.critical.some((item) => item.code === 'claim-exceeds-wallet'), true);
    assert.equal(Buffer.from(result.bytes.subarray(0, 4)).toString(), '%PDF');
  });
});

describe('mocks and validation', () => {
  it('never writes locked wallets or fee earner from the mock', () => {
    const next = applyDocumentMock('claim', {
      clientName: 'Anna Keller',
      feeEarner: 'Friedrich Hartmann · friedrich.hartmann@helfenstein.ch',
      wallet: 'KEEP-OUT',
    });
    assert.equal(next.clientName, 'Anna Keller');
    assert.equal(next.feeEarner, 'Friedrich Hartmann · friedrich.hartmann@helfenstein.ch');
    assert.equal(next.wallet, '');
    assert.equal(next.destinationWallet ?? '', '');
    assert.equal(next.clientWallet ?? '', '');
  });

  it('prints Our ref when the case reference is unallocated', () => {
    const register = buildDocumentRegister({ company, teamMembers });
    const result = validateDocument(
      'release',
      { applicant: 'Anna Keller', caseRef: 'to be allocated', ourRef: 'EL/2026/014', feeEarner: register.feeEarner },
      { register, people: register.people },
    );
    assert.equal(result.issues.some((item) => item.code === 'case-ref-unallocated'), true);
  });
});

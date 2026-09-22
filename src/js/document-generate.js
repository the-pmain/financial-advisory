import { DOCUMENT_KIND_LABELS, isDocumentKind } from './clients-documents-model.js';
import { buildAgreement } from './document-agreement.js';
import { buildBrochure } from './document-brochure.js';
import { buildClaim, buildMatter, buildRelease, buildTracing } from './document-claim.js';
import { buildP2p } from './document-p2p.js';
import { sanitizeForPdf, validateDocument } from './document-validate.js';
import { writePdf } from './document-pdf-write.js';

export { buildAgreement } from './document-agreement.js';
export { buildBrochure } from './document-brochure.js';
export { buildClaim, buildMatter, buildRelease, buildTracing } from './document-claim.js';
export { buildP2p } from './document-p2p.js';

const BUILDERS = Object.freeze({
  agreement: { build: buildAgreement, profile: 'letterhead', runningFooter: 'Confidential' },
  p2p: { build: buildP2p, profile: 'letterhead', runningFooter: 'Confidential' },
  brochure: { build: buildBrochure, profile: 'brochure', runningFooter: true },
  claim: { build: buildClaim, profile: 'letterhead', runningFooter: 'Confidential' },
  matter: { build: buildMatter, profile: 'letterhead', runningFooter: 'Confidential' },
  release: { build: buildRelease, profile: 'letterhead', runningFooter: 'Confidential' },
  tracing: { build: buildTracing, profile: 'letterhead', runningFooter: 'Confidential' },
});

export async function generateDocument(kind, values, { people, register } = {}) {
  if (!isDocumentKind(kind)) {
    throw new Error('Invalid document kind.');
  }
  const recipe = BUILDERS[kind];
  if (!recipe) {
    throw new Error('Unknown document kind.');
  }
  const validation = validateDocument(kind, values, { people: people ?? register?.people, register });
  const sanitized = sanitizeForPdf(kind, validation.values, register);
  const blocks = recipe.build(sanitized, register);
  const bytes = await writePdf(blocks, {
    profile: recipe.profile,
    runningFooter: recipe.runningFooter,
  });
  const clientName =
    sanitized.clientName ||
    sanitized.applicant ||
    sanitized.sellerName ||
    sanitized.buyerName ||
    sanitized.investorName ||
    'client';
  const filename = documentFilename(kind, clientName, register?.filenamePrefix);
  return {
    bytes,
    filename,
    validation,
    sanitized,
  };
}

export function documentFilename(kind, clientName, prefix = 'Helfenstein', ext = 'pdf') {
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
  const suffix = String(ext || 'pdf').replace(/^\./, '');
  return `${prefix}-${kindSlug}-${name || 'client'}.${suffix}`;
}

import { DOCUMENT_KIND_LABELS, isDocumentKind } from './clients-documents-model.js';
import { buildAgreement } from './document-agreement.js';
import { sanitizeForPdf, validateDocument } from './document-validate.js';
import { writePdf } from './document-pdf-write.js';

export { buildAgreement } from './document-agreement.js';

export async function generateDocument(kind, values, { people, register } = {}) {
  if (!isDocumentKind(kind)) {
    throw new Error('Invalid document kind.');
  }
  if (kind !== 'agreement') {
    throw new Error('This workspace generates the client agreement only.');
  }
  const validation = validateDocument(kind, values, { people: people ?? register?.people, register });
  const sanitized = sanitizeForPdf(kind, validation.values, register);
  const bytes = await writePdf(buildAgreement(sanitized, register), {
    profile: 'letterhead',
    runningFooter: 'Confidential',
  });
  const clientName = sanitized.clientName || 'client';
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

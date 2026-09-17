import { isDocumentKind, isUuid } from './clients-documents-model.js';
import { documentFilename } from './document-generate.js';

export { DOCUMENT_KIND_LABELS } from './clients-documents-model.js';
export { generateDocument, documentFilename } from './document-generate.js';
export { agreementFromRecord, brochureFromRecord } from './document-fields.js';
export { firmFromCompany, personFromSlug } from './document-register.js';
export { toWinAnsi } from './document-pdf-write.js';

export function parseDocumentPdfQuery(searchParams) {
  const clientId = searchParams instanceof URLSearchParams ? searchParams.get('client_id') : null;
  const kind = searchParams instanceof URLSearchParams ? searchParams.get('kind') : null;
  if (!isUuid(clientId)) {
    return { ok: false, error: 'client_id must be a valid UUID.' };
  }
  if (!isDocumentKind(kind)) {
    return { ok: false, error: 'Invalid document kind.' };
  }
  return { ok: true, value: { client_id: clientId, kind } };
}

export function pdfFilename(kind, clientName, prefix) {
  return documentFilename(kind, clientName, prefix);
}

import { shapeClient, CLIENTS_SELECT } from '../src/js/clients-model.js';
import { fieldsForKind, kindSaved, normalizeDocuments } from '../src/js/clients-documents-model.js';
import { agreementFromRecord } from '../src/js/document-fields.js';
import { generateDocument } from '../src/js/document-generate.js';
import { feeEarnerLine } from '../src/js/document-register.js';
import { HttpError } from './http.js';
import { asRows, rest } from './supabase.js';

/**
 * Build a PDF from saved fields (or the client record for authority).
 * Nothing is written back to storage.
 */
export async function loadClientDocumentPdf({ client_id, kind, register }) {
  const client = await findClientById(client_id);
  if (!client) throw new HttpError(404, 'That client record could not be found.');

  const bag = await findDocumentBag(client_id);
  const documents = normalizeDocuments(bag?.documents);
  const live = {
    ...register,
    feeEarner: feeEarnerLine(register?.people, client.instructed_person_slug),
  };
  let values;
  if (kind === 'agreement') {
    values = kindSaved(documents, 'agreement')
      ? { ...agreementFromRecord(client, live), ...fieldsForKind(documents, 'agreement') }
      : agreementFromRecord(client, live);
  } else if (kindSaved(documents, kind)) {
    values = { ...agreementFromRecord(client, live), ...fieldsForKind(documents, kind) };
  } else {
    throw new HttpError(404, 'That document has not been saved yet.');
  }

  const result = await generateDocument(kind, values, {
    register: live,
    people: live.people,
  });
  return { bytes: result.bytes, filename: result.filename };
}

async function findClientById(id) {
  const result = await rest('clients', {
    method: 'GET',
    search: {
      select: CLIENTS_SELECT,
      id: `eq.${id}`,
      limit: '1',
    },
  });
  return shapeClient(asRows(result.payload)[0] ?? null);
}

async function findDocumentBag(clientId) {
  const result = await rest('clients_documents', {
    method: 'GET',
    search: {
      select: 'id,client_id,documents,created_at,updated_at',
      client_id: `eq.${clientId}`,
      limit: '1',
    },
  });
  return asRows(result.payload)[0] ?? null;
}

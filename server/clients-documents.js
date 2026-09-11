import {
  mergeKind,
  normalizeDocuments,
  persistDocuments,
  parseClientsDocumentWrite,
  shapeDocumentRow,
} from '../src/js/clients-documents-model.js';
import { HttpError, readJsonBody, sendJson } from './http.js';
import { asRows, requireInsertedRow, rest } from './supabase.js';

export async function saveClientDocument(body) {
  const parsed = parseClientsDocumentWrite(body);
  if (!parsed.ok) throw new HttpError(400, parsed.error);

  const existing = await findByClientId(parsed.value.client_id);
  const currentFlat = normalizeDocuments(existing?.documents);
  const merged = mergeKind(currentFlat, parsed.value.kind, parsed.value.fields);
  if (!merged.ok) throw new HttpError(400, merged.error);

  const documents = persistDocuments(merged.value);
  const now = new Date().toISOString();

  if (existing) {
    const result = await rest('clients_documents', {
      method: 'PATCH',
      search: {
        id: `eq.${existing.id}`,
        select: 'id,client_id,documents,created_at,updated_at',
      },
      headers: { Prefer: 'return=representation' },
      body: { documents, updated_at: now },
    });
    const row = asRows(result.payload)[0];
    if (!row) throw new HttpError(404, 'That client record could not be found.');
    return shapeDocumentRow(row);
  }

  const result = await rest('clients_documents', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: {
      client_id: parsed.value.client_id,
      documents,
    },
  });
  return shapeDocumentRow(requireInsertedRow(asRows(result.payload)));
}

export async function handlePutClientsDocuments(req, res) {
  const body = await readJsonBody(req);
  sendJson(res, 200, await saveClientDocument(body));
}

async function findByClientId(clientId) {
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

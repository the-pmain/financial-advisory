import { parseClientInput } from '../src/js/clients-model.js';
import { HttpError, readJsonBody, sendJson } from './http.js';
import { asRows, requireInsertedRow, rest } from './supabase.js';

export async function handleCreateClient(req, res) {
  const body = await readJsonBody(req);
  const parsed = parseClientInput(body);
  if (!parsed.ok) {
    throw new HttpError(400, parsed.error);
  }

  const result = await rest('clients', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: parsed.value,
  });

  requireInsertedRow(asRows(result.payload));
  sendJson(res, 201, { ok: true });
}

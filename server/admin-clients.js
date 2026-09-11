import {
  parseIsTestPatch,
  parseListQuery,
  CLIENTS_SELECT,
  shapeClient,
} from '../src/js/clients-model.js';
import { attachDocumentsToClients } from '../src/js/clients-documents-model.js';
import { HttpError, readJsonBody, requestUrl, sendJson } from './http.js';
import { asRows, inFilter, parseContentRange, rest } from './supabase.js';

const DOCUMENT_SELECT = 'id,client_id,documents,created_at,updated_at';

export async function loadClientsPage(searchParams) {
  const parsed = parseListQuery(searchParams);
  if (!parsed.ok) throw new HttpError(400, parsed.error);

  const { page, per_page, is_test } = parsed.value;
  const from = (page - 1) * per_page;
  const to = from + per_page - 1;

  const search = {
    select: CLIENTS_SELECT,
    order: 'created_at.desc,id.desc',
  };
  if (is_test === true) search.is_test = 'eq.true';
  if (is_test === false) search.is_test = 'eq.false';

  let result;
  try {
    result = await rest('clients', {
      method: 'GET',
      search,
      headers: {
        Prefer: 'count=exact',
        Range: `${from}-${to}`,
        'Range-Unit': 'items',
      },
    });
  } catch (err) {
    if (err instanceof HttpError && err.status === 416) {
      const range = parseContentRange(err.responseHeaders?.get?.('content-range'));
      return emptyPage(page, per_page, range?.total ?? 0);
    }
    throw err;
  }

  const rows = asRows(result.payload).map(shapeClient).filter(Boolean);
  const range = parseContentRange(result.headers.get('content-range'));
  const total = range?.total ?? rows.length;
  const items = await attachDocumentBags(rows);
  return pagePayload({ items, page, per_page, total });
}

export function parseAdminClientsQuery(url) {
  return parseListQuery(url.searchParams);
}

export async function handleListClients(req, res) {
  const payload = await loadClientsPage(requestUrl(req).searchParams);
  sendJson(res, 200, payload);
}

function emptyPage(page, per_page, total) {
  return pagePayload({ items: [], page, per_page, total });
}

function pagePayload({ items, page, per_page, total }) {
  const total_pages = total === 0 ? 0 : Math.ceil(total / per_page);
  return {
    items,
    page,
    per_page,
    total,
    total_pages,
    has_prev: page > 1 && total > 0,
    has_next: total_pages > 0 && page < total_pages,
  };
}

async function attachDocumentBags(clients) {
  if (!clients.length) return attachDocumentsToClients(clients, []);
  const ids = clients.map((c) => c.id);
  const result = await rest('clients_documents', {
    method: 'GET',
    search: {
      select: DOCUMENT_SELECT,
      client_id: inFilter(ids),
    },
  });
  return attachDocumentsToClients(clients, asRows(result.payload));
}

export async function patchClientIsTest(body) {
  const parsed = parseIsTestPatch(body);
  if (!parsed.ok) throw new HttpError(400, parsed.error);

  const result = await rest('clients', {
    method: 'PATCH',
    search: {
      id: `eq.${parsed.value.id}`,
      select: CLIENTS_SELECT,
    },
    headers: { Prefer: 'return=representation' },
    body: { is_test: parsed.value.is_test },
  });

  const row = asRows(result.payload)[0];
  if (!row) {
    throw new HttpError(404, 'That client record could not be found.');
  }
  return { item: shapeClient(row) };
}

export async function handlePatchClient(req, res) {
  const payload = await patchClientIsTest(await readJsonBody(req));
  sendJson(res, 200, payload);
}

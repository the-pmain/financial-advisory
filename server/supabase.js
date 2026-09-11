import { HttpError } from './http.js';
import { supabaseEnv } from './env.js';

export function supabaseConfig() {
  return supabaseEnv();
}

export function requireSupabase() {
  const cfg = supabaseEnv();
  if (!cfg.url || !cfg.key) {
    throw new HttpError(500, 'Missing Supabase credentials.');
  }
  return cfg;
}

export function supabaseHeaders(key = requireSupabase().key, extra = {}) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...extra,
  };
}

export function mapPostgrestError(status, payload) {
  const code = typeof payload?.code === 'string' ? payload.code : undefined;
  const message = typeof payload?.message === 'string' ? payload.message : undefined;
  const hint = typeof payload?.hint === 'string' ? payload.hint : undefined;
  const body = { error: 'Supabase request failed.' };
  if (message) body.message = message;
  if (hint) body.hint = hint;
  if (code) body.code = code;

  if (code === '42P01') {
    body.error = 'Required table is missing.';
  } else if (code === '42703' || code === 'PGRST204') {
    body.error = 'Required column is missing.';
  } else if (code === '23503') {
    body.error = 'That client record could not be found.';
  } else if (code === '23514') {
    body.error = 'Documents failed a database check constraint.';
  } else if (code === '42501') {
    body.error = 'Row level security blocked this request.';
    body.hint = 'Set SUPABASE_SERVICE_ROLE_KEY to bypass RLS.';
  }

  const mapped = Number(status);
  const outStatus = mapped >= 400 && mapped < 600 ? mapped : 502;
  return { status: outStatus, body };
}

async function parseJsonSafe(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

export async function rest(table, { method = 'GET', search, headers, body, signal } = {}) {
  const cfg = requireSupabase();
  const url = new URL(`${cfg.url}/rest/v1/${table}`);
  if (search) {
    for (const [key, value] of Object.entries(search)) {
      if (value != null && value !== '') url.searchParams.set(key, String(value));
    }
  }

  let res;
  try {
    res = await fetch(url, {
      method,
      headers: supabaseHeaders(cfg.key, headers),
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: signal ?? AbortSignal.timeout(15_000),
    });
  } catch {
    throw new HttpError(502, 'Supabase request failed.');
  }

  const payload = await parseJsonSafe(res);

  if (res.status === 416) {
    const err = new HttpError(416, 'Range not satisfiable.');
    err.responseHeaders = res.headers;
    throw err;
  }

  if (!res.ok) {
    const mapped = mapPostgrestError(res.status, payload);
    throw new HttpError(mapped.status, mapped.body.error, omitError(mapped.body));
  }

  return { status: res.status, payload, headers: res.headers };
}

function omitError(body) {
  const extra = { ...body };
  delete extra.error;
  return extra;
}

export function asRows(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === 'object') return [payload];
  return [];
}

export function requireInsertedRow(rows) {
  if (!rows.length) {
    throw new HttpError(502, 'Insert returned no row.', {
      hint: 'Row level security may be blocking writes. Set SUPABASE_SERVICE_ROLE_KEY.',
    });
  }
  return rows[0];
}

export function parseContentRange(header) {
  if (!header || typeof header !== 'string') return null;
  const ranged = header.match(/(\d+)-(\d+)\/(\d+|\*)/);
  if (ranged) {
    const total = ranged[3] === '*' ? null : Number(ranged[3]);
    return {
      start: Number(ranged[1]),
      end: Number(ranged[2]),
      total: Number.isFinite(total) ? total : null,
    };
  }
  const star = header.match(/\*\/(\d+|\*)/);
  if (star) {
    const total = star[1] === '*' ? 0 : Number(star[1]);
    return { start: 0, end: 0, total: Number.isFinite(total) ? total : 0 };
  }
  return null;
}

export function inFilter(ids) {
  return `in.(${ids.join(',')})`;
}

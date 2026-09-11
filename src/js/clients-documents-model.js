export const DOCUMENT_KINDS = Object.freeze([
  'agreement',
  'claim',
  'p2p',
  'matter',
  'release',
  'tracing',
]);

export const TOP_LEVEL_KINDS = Object.freeze(['agreement', 'claim', 'release']);
export const NESTED_CLAIM_KINDS = Object.freeze(['p2p', 'matter', 'tracing']);

const FIELD_KEY_RE = /^[A-Za-z][A-Za-z0-9_]*$/;
const MAX_FIELD_KEYS = 80;
const FIELD_VALUE_MAX = 8000;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value) {
  return typeof value === 'string' && UUID_RE.test(value);
}

export function isDocumentKind(value) {
  return DOCUMENT_KINDS.includes(value);
}

export function emptyDocuments() {
  return {
    agreement: null,
    claim: null,
    p2p: null,
    matter: null,
    release: null,
    tracing: null,
  };
}

export function sanitizeFields(input) {
  if (input == null || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, error: 'Document fields must be an object.' };
  }

  const out = {};
  for (const [key, value] of Object.entries(input)) {
    if (key === 'saved_at' || key === 'fields') continue;
    if (!FIELD_KEY_RE.test(key)) {
      return { ok: false, error: `Invalid document field name: ${key}` };
    }
    if (typeof value !== 'string') {
      return { ok: false, error: `Document field "${key}" must be a string.` };
    }
    const trimmed = value.trim();
    if (trimmed.length > FIELD_VALUE_MAX) {
      return { ok: false, error: `Document field "${key}" is too long.` };
    }
    out[key] = trimmed;
  }

  if (Object.keys(out).length > MAX_FIELD_KEYS) {
    return { ok: false, error: 'Document fields cannot contain more than 80 keys.' };
  }

  return { ok: true, value: out };
}

function readEntry(entry) {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return null;
  const saved_at = typeof entry.saved_at === 'string' && entry.saved_at ? entry.saved_at : null;
  const fieldsRaw = entry.fields;
  const fields =
    fieldsRaw && typeof fieldsRaw === 'object' && !Array.isArray(fieldsRaw)
      ? pickStringFields(fieldsRaw)
      : {};
  if (!saved_at && Object.keys(fields).length === 0) return null;
  return { fields, saved_at };
}

function pickStringFields(fields) {
  const out = {};
  for (const [key, value] of Object.entries(fields)) {
    if (key === 'saved_at' || key === 'fields') continue;
    if (!FIELD_KEY_RE.test(key)) continue;
    if (typeof value !== 'string') continue;
    out[key] = value;
  }
  return out;
}

function cloneEntry(entry) {
  if (!entry) return null;
  return {
    fields: { ...entry.fields },
    saved_at: entry.saved_at,
  };
}

/** Flatten stored 3-key JSON into the 6-kind API view. Missing kinds are null. */
export function normalizeDocuments(raw) {
  const out = emptyDocuments();
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out;

  out.agreement = readEntry(raw.agreement);
  out.release = readEntry(raw.release);

  const claim = raw.claim;
  if (claim && typeof claim === 'object' && !Array.isArray(claim)) {
    out.claim = readEntry(claim);
    out.p2p = readEntry(claim.p2p);
    out.matter = readEntry(claim.matter);
    out.tracing = readEntry(claim.tracing);
  }

  return out;
}

/** Persist flattened 6-kind view as the 3-key JSON shape. Nested kinds omit if null. */
export function persistDocuments(flat) {
  const view = { ...emptyDocuments(), ...(flat && typeof flat === 'object' ? flat : {}) };

  const agreement = cloneEntry(view.agreement);
  const release = cloneEntry(view.release);

  const nested = {};
  for (const kind of NESTED_CLAIM_KINDS) {
    const entry = cloneEntry(view[kind]);
    if (entry) nested[kind] = entry;
  }

  const claimBase = cloneEntry(view.claim);
  let claim = null;
  if (claimBase || Object.keys(nested).length) {
    const nestedSaved = Object.values(nested)[0]?.saved_at ?? null;
    claim = {
      fields: claimBase?.fields ?? {},
      saved_at: claimBase?.saved_at ?? nestedSaved,
      ...nested,
    };
  }

  return { agreement, claim, release };
}

export function mergeKind(existingFlat, kind, fields, savedAt = new Date().toISOString()) {
  if (!isDocumentKind(kind)) {
    return { ok: false, error: 'Invalid document kind.' };
  }
  const sanitized = sanitizeFields(fields);
  if (!sanitized.ok) return sanitized;

  const next = { ...emptyDocuments(), ...existingFlat };
  next[kind] = { fields: sanitized.value, saved_at: savedAt };
  return { ok: true, value: next };
}

export function attachDocumentsToClients(items, documentRows) {
  const byClient = new Map();
  for (const row of documentRows ?? []) {
    if (row?.client_id) byClient.set(row.client_id, row);
  }

  return (items ?? []).map((item) => {
    const row = byClient.get(item.id);
    return {
      ...item,
      is_test: item.is_test === true,
      document_id: row?.id ?? null,
      documents: normalizeDocuments(row?.documents),
    };
  });
}

export function parseClientsDocumentWrite(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, error: 'Request body must be a JSON object.' };
  }
  if (!isUuid(body.client_id)) {
    return { ok: false, error: 'client_id must be a valid UUID.' };
  }
  if (!isDocumentKind(body.kind)) {
    return { ok: false, error: 'Invalid document kind.' };
  }
  const sanitized = sanitizeFields(body.fields);
  if (!sanitized.ok) return sanitized;
  return {
    ok: true,
    value: {
      client_id: body.client_id,
      kind: body.kind,
      fields: sanitized.value,
    },
  };
}

export function shapeDocumentRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    client_id: row.client_id,
    documents: normalizeDocuments(row.documents),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

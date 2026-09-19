export const DOCUMENT_KINDS = Object.freeze([
  'agreement',
  'brochure',
  'claim',
  'p2p',
  'matter',
  'release',
  'tracing',
]);

export const TOP_LEVEL_KINDS = Object.freeze(['agreement', 'brochure', 'claim', 'release']);
export const NESTED_CLAIM_KINDS = Object.freeze(['p2p', 'matter', 'tracing']);
export const COMPOSE_KINDS = Object.freeze(['claim', 'p2p', 'matter', 'release', 'tracing']);
export const FOLDER_KINDS = Object.freeze(['brochure', ...COMPOSE_KINDS]);
export const EDITABLE_KINDS = Object.freeze(['agreement', 'brochure', ...COMPOSE_KINDS]);

export const DOCUMENT_KIND_LABELS = Object.freeze({
  agreement: 'Client agreement',
  brochure: 'Private client brochure',
  claim: 'Victim claim',
  p2p: 'P2P agreement',
  matter: 'Application of release order',
  release: 'Release order',
  tracing: 'Tracing report',
});

const FIELD_KEY_RE = /^[A-Za-z][A-Za-z0-9_]*$/;
const MAX_FIELD_KEYS = 80;
const FIELD_VALUE_MAX = 8000;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const STORAGE_URL_RE = /supabase\.(co|in)\/storage|\/storage\/v1\/object/i;

export function isUuid(value) {
  return typeof value === 'string' && UUID_RE.test(value);
}

export function isDocumentKind(value) {
  return DOCUMENT_KINDS.includes(value);
}

export function emptyDocuments() {
  return {
    agreement: null,
    brochure: null,
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
    if (STORAGE_URL_RE.test(trimmed)) continue;
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
    if (STORAGE_URL_RE.test(value)) continue;
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

/** Flatten stored top-level JSON into the flattened API view. Missing kinds are null. */
export function normalizeDocuments(raw) {
  const out = emptyDocuments();
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out;

  out.agreement = readEntry(raw.agreement);
  out.brochure = readEntry(raw.brochure);
  out.release = readEntry(raw.release);

  const claim = raw.claim && typeof raw.claim === 'object' && !Array.isArray(raw.claim) ? raw.claim : null;
  out.claim = readOwnClaimEntry(claim);
  out.p2p = readEntry(claim?.p2p) ?? readEntry(raw.p2p);
  out.matter = readEntry(claim?.matter) ?? readEntry(raw.matter);
  out.tracing = readEntry(claim?.tracing) ?? readEntry(raw.tracing);

  return out;
}

/** Claim is its own document — empty residue left by nested kinds is not a save. */
function readOwnClaimEntry(claim) {
  if (!claim) return null;
  const fields = pickStringFields(
    claim.fields && typeof claim.fields === 'object' && !Array.isArray(claim.fields)
      ? claim.fields
      : {},
  );
  if (Object.keys(fields).length === 0) return null;
  const saved_at = typeof claim.saved_at === 'string' && claim.saved_at ? claim.saved_at : null;
  return { fields, saved_at };
}

/** Persist flattened view as the top-level JSON shape. Nested kinds omit if null. */
export function persistDocuments(flat) {
  const view = { ...emptyDocuments(), ...(flat && typeof flat === 'object' ? flat : {}) };

  const agreement = cloneEntry(view.agreement);
  const brochure = cloneEntry(view.brochure);
  const release = cloneEntry(view.release);

  const nested = {};
  for (const kind of NESTED_CLAIM_KINDS) {
    const entry = cloneEntry(view[kind]);
    if (entry) nested[kind] = entry;
  }

  const claimBase = cloneEntry(view.claim);
  let claim = null;
  if (claimBase) {
    claim = {
      fields: claimBase.fields,
      saved_at: claimBase.saved_at,
      ...nested,
    };
  } else if (Object.keys(nested).length) {
    claim = { ...nested };
  }

  return { agreement, brochure, claim, release };
}

export function kindSaved(documents, kind) {
  if (!isDocumentKind(kind)) return false;
  const entry = documents?.[kind];
  if (!entry || typeof entry !== 'object') return false;
  if (typeof entry.saved_at === 'string' && entry.saved_at) return true;
  return Object.keys(entry.fields || {}).length > 0;
}

export function fieldsForKind(documents, kind) {
  if (!kindSaved(documents, kind)) return {};
  return { ...(documents[kind].fields || {}) };
}

export function composeKindsSaved(documents) {
  return FOLDER_KINDS.filter((kind) => kindSaved(documents, kind));
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

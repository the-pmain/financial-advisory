export const TEXT_FIELD_MAX = 80;
export const NAME_MAX = 200;
export const EMAIL_MAX = 254;
export const PHONE_MAX = 80;
export const PHONE_MIN_DIGITS = 9;
export const PHONE_MAX_DIGITS = 15;

export const CLIENTS_SELECT =
  'id,created_at,name,email,phone,consent,instructed_person_slug,is_test';

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i;
const PHONE_ALLOWED = /^[+\d][\d\s()./-]*$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function normalizeIsTest(value) {
  return value === true;
}

export function normalizeConsent(value) {
  return value === true;
}

export function normalizeName(value) {
  if (typeof value !== 'string') return null;
  const name = value.trim();
  return name.length ? name : null;
}

export function normalizeEmail(value) {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  return email.length ? email : null;
}

export function normalizePhone(value) {
  if (typeof value !== 'string') return null;
  const phone = value.trim();
  return phone.length ? phone : null;
}

export function normalizeInstructedPersonSlug(value) {
  if (value == null) return null;
  if (typeof value !== 'string') return null;
  const slug = value.trim();
  if (!slug) return null;
  return slug;
}

export function phoneDigitCount(phone) {
  return phone.replace(/\D/g, '').length;
}

export function shapeClient(row) {
  if (!row || typeof row !== 'object') return null;
  return {
    id: row.id,
    created_at: row.created_at,
    name: row.name,
    email: row.email,
    phone: row.phone ?? null,
    consent: normalizeConsent(row.consent),
    instructed_person_slug: row.instructed_person_slug ?? null,
    is_test: normalizeIsTest(row.is_test),
  };
}

function instructedSlugFromBody(body) {
  if (typeof body?.instructed_person_slug === 'string') {
    return body.instructed_person_slug;
  }
  if (body?.adviser && typeof body.adviser === 'object' && typeof body.adviser.slug === 'string') {
    return body.adviser.slug;
  }
  return null;
}

/**
 * Validates a public intake payload from the employee/adviser profile form.
 * Accepts `name`, `email`, `phone`, `consent`, and optional adviser slug.
 */
export function parseClientInput(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, error: 'Request body must be a JSON object.' };
  }

  const name = normalizeName(body.name);
  if (!name) return { ok: false, error: 'Please enter your name.' };
  if (name.length < 2) return { ok: false, error: 'Please enter at least two characters.' };
  if (name.length > NAME_MAX) return { ok: false, error: 'Name is too long.' };

  const emailRaw = typeof body.email === 'string' ? body.email.trim() : '';
  if (!emailRaw) return { ok: false, error: 'Please enter your email address.' };
  if (!EMAIL_RE.test(emailRaw)) return { ok: false, error: 'Please enter a valid email address.' };
  const email = emailRaw.toLowerCase();
  if (email.length > EMAIL_MAX) return { ok: false, error: 'Email is too long.' };

  const phone = normalizePhone(body.phone);
  if (!phone) return { ok: false, error: 'Please enter a phone number.' };
  if (phone.length > PHONE_MAX) return { ok: false, error: 'Phone number is too long.' };
  const digits = phoneDigitCount(phone);
  if (!PHONE_ALLOWED.test(phone) || digits < PHONE_MIN_DIGITS || digits > PHONE_MAX_DIGITS) {
    return { ok: false, error: 'Please enter a valid phone number.' };
  }

  if (body.consent !== true) {
    return {
      ok: false,
      error: 'Please confirm that we may use your details to answer this request.',
    };
  }

  const slugRaw = normalizeInstructedPersonSlug(instructedSlugFromBody(body));
  let instructed_person_slug = null;
  if (slugRaw) {
    if (slugRaw.length > TEXT_FIELD_MAX || !SLUG_RE.test(slugRaw)) {
      return { ok: false, error: 'Please provide a valid adviser.' };
    }
    instructed_person_slug = slugRaw;
  }

  return {
    ok: true,
    value: {
      name,
      email,
      phone,
      consent: true,
      instructed_person_slug,
      is_test: false,
    },
  };
}

export function parseListQuery(searchParams) {
  const pageRaw = searchParams.get('page');
  const perRaw = searchParams.get('per_page') ?? searchParams.get('limit');
  const isTestRaw = searchParams.get('is_test');

  const page = parsePositiveInt(pageRaw, 1, 'page');
  if (!page.ok) return page;
  const perParsed = parseNonNegativeInt(perRaw, 20, 'per_page');
  if (!perParsed.ok) return perParsed;

  const per_page = clamp(perParsed.value, 1, 100);

  let is_test;
  if (isTestRaw == null || isTestRaw === '') {
    is_test = undefined;
  } else if (isTestRaw === 'true') {
    is_test = true;
  } else if (isTestRaw === 'false') {
    is_test = false;
  } else {
    return { ok: false, error: 'is_test must be true or false.' };
  }

  return { ok: true, value: { page: page.value, per_page, is_test } };
}

function parsePositiveInt(raw, fallback, field) {
  return parseIntField(raw, fallback, field, { min: 1 });
}

function parseNonNegativeInt(raw, fallback, field) {
  return parseIntField(raw, fallback, field, { min: 0 });
}

function parseIntField(raw, fallback, field, { min }) {
  if (raw == null || raw === '') return { ok: true, value: fallback };
  if (!/^[0-9]+$/.test(raw)) {
    return { ok: false, error: `${field} must be a positive integer.` };
  }
  const n = Number(raw);
  if (!Number.isSafeInteger(n) || n < min) {
    return { ok: false, error: `${field} must be a positive integer.` };
  }
  return { ok: true, value: n };
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export function parseIsTestPatch(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, error: 'Request body must be a JSON object.' };
  }
  if (typeof body.id !== 'string' || !isUuidLite(body.id)) {
    return { ok: false, error: 'id must be a valid UUID.' };
  }
  if (typeof body.is_test !== 'boolean') {
    return { ok: false, error: 'is_test must be a boolean.' };
  }
  return { ok: true, value: { id: body.id, is_test: body.is_test } };
}

function isUuidLite(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { supabaseEnv } from './env.js';
import { asRows, rest } from './supabase.js';

const SELECT =
  'slug,name,role,section,photo_path,photo_storage_path,about,results,credentials,languages,regulatory_note,finma_adviser_no,cfa_registry_no,expertise,sort_order,featured';

const SECTIONS = new Set(['investment', 'business', 'investors']);
const SLUG = /^[a-z0-9](?:[a-z0-9-]{0,78}[a-z0-9])?$/;
const CACHE_MS = 30_000;
const PHOTO_CACHE_MS = 5 * 60_000;
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** @type {{ at: number, employees: ReturnType<typeof employeeFromRow>[] } | null} */
let cache = null;

/** @type {Map<string, string>} */
const photoKeys = new Map();

/** @type {Map<string, { at: number, bytes: Buffer, type: string }>} */
const photoCache = new Map();

export function employeesBucket() {
  return (process.env.SUPABASE_EMPLOYEES_BUCKET || 'employees').trim() || 'employees';
}

export function employeePublicPhotoPath(slug) {
  const needle = typeof slug === 'string' ? slug.trim() : '';
  return needle ? `/api/employees/${needle}/photo` : '';
}

export function employeeStorageKey(storagePath, slug) {
  const raw = typeof storagePath === 'string' ? storagePath.replace(/^\/+/, '').trim() : '';
  if (raw && !raw.includes('..') && !raw.includes('\\') && raw.endsWith('.png')) return raw;
  const name = typeof slug === 'string' ? slug.trim() : '';
  return name && SLUG.test(name) ? `${name}.png` : '';
}

/** Server-only Storage URL. Never send this to the browser. */
export function employeeStorageUrl(storagePath, slug) {
  const { url } = supabaseEnv();
  const key = employeeStorageKey(storagePath, slug);
  if (!url || !key) return '';
  return `${url}/storage/v1/object/public/${employeesBucket()}/${key}`;
}

function asTextArray(value) {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => typeof item === 'string' && item.trim());
}

export function employeeFromRow(row) {
  if (!row || typeof row !== 'object') return null;
  const slug = typeof row.slug === 'string' ? row.slug.trim() : '';
  const name = typeof row.name === 'string' ? row.name.trim() : '';
  const section = typeof row.section === 'string' ? row.section : '';
  if (!slug || !name || !SECTIONS.has(section)) return null;

  photoKeys.set(slug, employeeStorageKey(row.photo_storage_path, slug));

  return {
    slug,
    name,
    role: typeof row.role === 'string' ? row.role : '',
    section,
    photo: employeePublicPhotoPath(slug),
    about: typeof row.about === 'string' ? row.about : '',
    results: asTextArray(row.results),
    credentials: asTextArray(row.credentials),
    languages: asTextArray(row.languages),
    regulatoryNote: typeof row.regulatory_note === 'string' && row.regulatory_note ? row.regulatory_note : undefined,
    finmaAdviserNo: typeof row.finma_adviser_no === 'string' && row.finma_adviser_no ? row.finma_adviser_no : undefined,
    cfaRegistryNo: typeof row.cfa_registry_no === 'string' && row.cfa_registry_no ? row.cfa_registry_no : undefined,
    expertise: asTextArray(row.expertise),
    featured: row.featured === true,
  };
}

export async function listEmployees() {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.employees;

  const result = await rest('employees', {
    search: {
      select: SELECT,
      order: 'sort_order.asc,name.asc',
    },
  });

  const nextKeys = new Map();
  const employees = [];
  for (const row of asRows(result.payload)) {
    const member = employeeFromRow(row);
    if (!member) continue;
    employees.push(member);
    nextKeys.set(member.slug, employeeStorageKey(row.photo_storage_path, member.slug));
  }

  photoKeys.clear();
  for (const [slug, key] of nextKeys) photoKeys.set(slug, key);

  cache = { at: Date.now(), employees };
  return employees;
}

export async function employeeBySlug(slug) {
  const needle = typeof slug === 'string' ? slug.trim() : '';
  if (!needle) return null;
  const employees = await listEmployees();
  return employees.find((item) => item.slug === needle) ?? null;
}

async function fetchStoragePhoto(storageUrl) {
  const { key } = supabaseEnv();
  const headers = {};
  if (key) {
    headers.apikey = key;
    headers.Authorization = `Bearer ${key}`;
  }

  const res = await fetch(storageUrl, {
    headers,
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) return null;
  const bytes = Buffer.from(await res.arrayBuffer());
  if (bytes.length < 8 || bytes[0] !== 0x89 || bytes[1] !== 0x50) return null;
  const type = res.headers.get('content-type') || 'image/png';
  return { bytes, type: type.startsWith('image/') ? type : 'image/png' };
}

function localTeamPhoto(slug) {
  const file = join(ROOT, 'public', 'team', `${slug}.png`);
  if (!existsSync(file)) return null;
  return { bytes: readFileSync(file), type: 'image/png' };
}

export async function readEmployeePhoto(slug) {
  const needle = typeof slug === 'string' ? slug.trim() : '';
  if (!SLUG.test(needle)) return null;

  const hit = photoCache.get(needle);
  if (hit && Date.now() - hit.at < PHOTO_CACHE_MS) {
    return { bytes: hit.bytes, type: hit.type };
  }

  const employee = await employeeBySlug(needle);
  if (!employee) return null;

  const key = photoKeys.get(needle) || `${needle}.png`;
  const remote = employeeStorageUrl(key, needle);
  if (remote) {
    try {
      const photo = await fetchStoragePhoto(remote);
      if (photo) {
        photoCache.set(needle, { at: Date.now(), ...photo });
        return photo;
      }
    } catch {
      // Fall back to the local portrait so a Storage miss does not blank the page.
    }
  }

  const local = localTeamPhoto(needle);
  if (local) {
    photoCache.set(needle, { at: Date.now(), ...local });
    return local;
  }
  return null;
}

export async function sendEmployeePhoto(req, res) {
  const photo = await readEmployeePhoto(req.params.slug);
  if (!photo) {
    res.status(404).end();
    return;
  }
  res.setHeader('Content-Type', photo.type);
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.send(photo.bytes);
}

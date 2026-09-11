import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Load KEY=VALUE pairs from a .env file without overriding existing process.env. */
export function loadEnvFile(fileName = '.env') {
  const file = resolve(ROOT, fileName);
  if (!existsSync(file)) return;
  let text = readFileSync(file, 'utf8');
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);

  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    if (!key || process.env[key] !== undefined) continue;
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

export function getPort() {
  const raw = process.env.PORT;
  if (!raw) return 3000;
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : 3000;
}

export function supabaseEnv() {
  const url = (process.env.SUPABASE_URL || '').trim().replace(/\/+$/, '');
  const service = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
  const anon = (process.env.SUPABASE_ANON_KEY || '').trim();
  const key = service || anon;
  return { url, key, usingServiceRole: Boolean(service) };
}

export function adminApiKey() {
  return (process.env.ADMIN_API_KEY || '').trim();
}

export function supabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function postgrest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const base = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !key) {
    throw new Error("Supabase is not configured");
  }

  const headers = new Headers(init.headers);
  headers.set("apikey", key);
  headers.set("Authorization", `Bearer ${key}`);
  headers.set("Content-Type", "application/json");
  if (!headers.has("Prefer")) {
    headers.set("Prefer", "return=representation");
  }

  const res = await fetch(`${base.replace(/\/$/, "")}/rest/v1${path}`, {
    ...init,
    headers,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`PostgREST ${res.status}: ${body}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

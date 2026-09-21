import { supabaseAccess } from "./supabase.ts";

export async function postgrest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const access = supabaseAccess();
  if (!access) {
    throw new Error("Supabase is not configured");
  }

  const headers = new Headers(init.headers);
  headers.set("apikey", access.key);
  headers.set("Authorization", `Bearer ${access.key}`);
  headers.set("Content-Type", "application/json");
  if (!headers.has("Prefer")) {
    headers.set("Prefer", "return=representation");
  }

  const res = await fetch(`${access.base}/rest/v1${path}`, {
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

/**
 * The one place Supabase credentials are read. Everything downstream is handed
 * an access object, so no adapter reaches for the environment on its own.
 */

export type SupabaseAccess = {
  base: string;
  key: string;
};

export function supabaseAccess(): SupabaseAccess | null {
  const base = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !key) return null;
  return { base, key };
}

export function supabaseConfigured(): boolean {
  return supabaseAccess() !== null;
}

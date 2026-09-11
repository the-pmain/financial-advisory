export function supabaseConfig(): { url: string; key: string };
export function requireSupabase(): { url: string; key: string };
export function supabaseHeaders(
  key?: string,
  extra?: Record<string, string>,
): Record<string, string>;
export function mapPostgrestError(
  status: number,
  payload: unknown,
): { status: number; body: { error: string; [key: string]: unknown } };

export function rest(
  table: string,
  options?: {
    method?: string;
    search?: Record<string, string | undefined>;
    headers?: Record<string, string>;
    body?: unknown;
    signal?: AbortSignal;
  },
): Promise<{ status: number; payload: unknown; headers: Headers }>;

export function asRows(payload: unknown): unknown[];
export function requireInsertedRow(rows: unknown[]): unknown;
export function parseContentRange(
  header: string | null | undefined,
): { start: number; end: number; total: number | null } | null;
export function inFilter(ids: string[]): string;

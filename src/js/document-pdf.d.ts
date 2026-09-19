export const DOCUMENT_KIND_LABELS: Readonly<Record<string, string>>;

export function parseDocumentPdfQuery(
  searchParams: URLSearchParams,
): { ok: true; value: { client_id: string; kind: string } } | { ok: false; error: string };

export function pdfFilename(kind: string, clientName: string, prefix?: string, ext?: string): string;
export function documentFilename(kind: string, clientName: string, prefix?: string, ext?: string): string;

export function generateDocument(
  kind: string,
  values: Record<string, string>,
  options?: { people?: unknown; register?: unknown },
): Promise<{
  bytes: Uint8Array;
  filename: string;
  validation: { ok: boolean; issues: unknown[]; critical: unknown[]; medium: unknown[] };
  sanitized: Record<string, string>;
}>;

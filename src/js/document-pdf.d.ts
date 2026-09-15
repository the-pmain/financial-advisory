export const DOCUMENT_KIND_LABELS: Readonly<Record<string, string>>;

export function parseDocumentPdfQuery(
  searchParams: URLSearchParams,
): { ok: true; value: { client_id: string; kind: string } } | { ok: false; error: string };

export function pdfFilename(kind: string, clientName: string, prefix?: string): string;
export function documentFilename(kind: string, clientName: string, prefix?: string): string;

export type FirmLetterhead = {
  legalName: string;
  shortName: string;
  addressLine: string;
  phone: string;
  uid: string;
  lei: string;
};

export type PersonLine = { slug: string; name: string; role: string };

export function firmFromCompany(company: {
  legalName?: string;
  shortName?: string;
  phone?: string;
  uid?: string;
  lei?: string;
  address?: { line?: string };
}): FirmLetterhead;

export function personFromSlug(
  slug: string | null | undefined,
  teamBySlug: Map<string, { slug: string; name: string; role?: string }> | undefined,
): PersonLine | null;

export function toWinAnsi(value: unknown): string;
export function agreementFromRecord(client: unknown, register: unknown): Record<string, string>;

export function generateDocument(
  kind: string,
  values: Record<string, string>,
  options?: { people?: unknown; register?: unknown },
): Promise<{
  bytes: Uint8Array;
  filename: string;
  validation: { ok: boolean; issues: unknown[]; critical: unknown[]; medium: unknown[] };
  sanitized: Record<string, string>;
  trust?: unknown;
}>;

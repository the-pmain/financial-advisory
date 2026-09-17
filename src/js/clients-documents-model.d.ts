export const DOCUMENT_KINDS: readonly string[];
export const TOP_LEVEL_KINDS: readonly string[];
export const NESTED_CLAIM_KINDS: readonly string[];
export const COMPOSE_KINDS: readonly string[];
export const EDITABLE_KINDS: readonly string[];
export const DOCUMENT_KIND_LABELS: Readonly<Record<string, string>>;

export type DocumentEntry = {
  fields: Record<string, string>;
  saved_at: string | null;
};

export type DocumentsMap = {
  agreement: DocumentEntry | null;
  claim: DocumentEntry | null;
  p2p: DocumentEntry | null;
  matter: DocumentEntry | null;
  release: DocumentEntry | null;
  tracing: DocumentEntry | null;
};

export function isUuid(value: unknown): boolean;
export function isDocumentKind(value: unknown): boolean;
export function emptyDocuments(): DocumentsMap;
export function sanitizeFields(
  input: unknown,
): { ok: true; value: Record<string, string> } | { ok: false; error: string };
export function normalizeDocuments(raw: unknown): DocumentsMap;
export function persistDocuments(flat: Partial<DocumentsMap> | null | undefined): {
  agreement: DocumentEntry | null;
  claim: (DocumentEntry & Record<string, unknown>) | null;
  release: DocumentEntry | null;
};
export function mergeKind(
  existingFlat: Partial<DocumentsMap> | null | undefined,
  kind: string,
  fields: unknown,
  savedAt?: string,
): { ok: true; value: DocumentsMap } | { ok: false; error: string };
export function kindSaved(documents: Partial<DocumentsMap> | null | undefined, kind: string): boolean;
export function fieldsForKind(
  documents: Partial<DocumentsMap> | null | undefined,
  kind: string,
): Record<string, string>;
export function composeKindsSaved(documents: Partial<DocumentsMap> | null | undefined): string[];
export function attachDocumentsToClients(items: unknown[], documentRows: unknown[]): unknown[];
export function parseClientsDocumentWrite(body: unknown):
  | { ok: true; value: { client_id: string; kind: string; fields: Record<string, string> } }
  | { ok: false; error: string };
export function shapeDocumentRow(row: unknown): {
  id: unknown;
  client_id: unknown;
  documents: DocumentsMap;
  created_at: unknown;
  updated_at: unknown;
} | null;

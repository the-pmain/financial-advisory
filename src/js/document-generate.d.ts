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
export function documentFilename(kind: string, clientName: string, prefix?: string, ext?: string): string;
export { buildAgreement } from './document-agreement.js';
export { buildBrochure } from './document-brochure.js';

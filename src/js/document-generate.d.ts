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
export function documentFilename(kind: string, clientName: string, prefix?: string, ext?: string): string;
export { buildAgreement } from './document-agreement.js';
export { buildBrochure } from './document-brochure.js';
export { buildClaim, buildMatter, buildRelease, buildTracing } from './document-claim.js';
export { buildP2p } from './document-p2p.js';

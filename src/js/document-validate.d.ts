export function isUnallocatedCaseRef(value: unknown): boolean;
export function printCaseRef(values: { caseRef?: string; ourRef?: string }): string;
export function validateDocument(
  kind: string,
  values: Record<string, string>,
  options?: { people?: unknown; register?: unknown },
): {
  ok: boolean;
  issues: unknown[];
  critical: Array<{ code?: string }>;
  medium: unknown[];
  fieldResults: Record<string, unknown>;
  coercedFeeEarner: string;
  values: Record<string, string>;
};
export function sanitizeForPdf(
  kind: string,
  values: Record<string, string>,
  register?: { feeEarner?: string },
): Record<string, string>;

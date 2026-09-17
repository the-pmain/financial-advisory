export function resolveAgreementContext(
  values?: Record<string, string>,
  register?: Record<string, unknown>,
): Record<string, string | boolean>;

export function buildAgreementSections(ctx: Record<string, unknown>): Array<{
  title: string;
  paragraphs: string[];
}>;

export function agreementSignatories(
  ctx: Record<string, unknown>,
  register?: unknown,
): Array<{ role: string; name?: string; printed?: string; date?: string }>;

export function buildAgreement(
  values: Record<string, string>,
  register?: unknown,
): Array<Record<string, unknown>>;

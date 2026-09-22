export const DOCUMENT_MOCK: Readonly<Record<string, Readonly<Record<string, string>>>>;
export function applyDocumentMock(
  kind: string,
  current: Record<string, string>,
): Record<string, string>;

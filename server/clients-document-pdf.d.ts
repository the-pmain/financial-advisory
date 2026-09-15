export function loadClientDocumentPdf(input: {
  client_id: string;
  kind: string;
  register: unknown;
}): Promise<{ bytes: Uint8Array; filename: string }>;

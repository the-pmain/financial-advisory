import type { DocumentsMap } from "../../../src/js/clients-documents-model.js";

/**
 * Firm documents filed against a client. The bag shape is the legacy engine's,
 * so this port speaks it rather than inventing a second one.
 */
export type FiledDocumentsRepository = {
  findForClients(clientIds: string[]): Promise<Map<string, DocumentsMap>>;
  saveKind(clientId: string, kind: string, fields: Record<string, string>): Promise<DocumentsMap>;
};

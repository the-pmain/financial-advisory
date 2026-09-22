import { emptyDocuments, mergeKind, type DocumentsMap } from "../../../../src/js/clients-documents-model.js";
import { invalid } from "../../../platform/errors.ts";
import type { FiledDocumentsRepository } from "../ports.ts";

/**
 * In-memory filed bags. Shared across onboarding reads and employee saves so a
 * compose write is visible on the next client load without Supabase.
 */
export function memoryFiledDocuments(): FiledDocumentsRepository {
  const store = new Map<string, DocumentsMap>();

  return {
    async findForClients(clientIds: string[]): Promise<Map<string, DocumentsMap>> {
      const out = new Map<string, DocumentsMap>();
      for (const id of clientIds) {
        const found = store.get(id);
        if (found) out.set(id, found);
      }
      return out;
    },

    async saveKind(clientId: string, kind: string, fields: Record<string, string>): Promise<DocumentsMap> {
      const merged = mergeKind(store.get(clientId) ?? emptyDocuments(), kind, fields);
      if (!merged.ok) throw invalid(merged.error);
      store.set(clientId, merged.value);
      return merged.value;
    },
  };
}

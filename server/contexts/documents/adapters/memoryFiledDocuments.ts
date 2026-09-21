import type { DocumentsMap } from "../../../../src/js/clients-documents-model.js";
import type { FiledDocumentsRepository } from "../ports.ts";

/**
 * Nothing is filed without Supabase, so clients keep the empty bags they were
 * seeded with rather than losing them to a lookup that always misses.
 */
export function memoryFiledDocuments(): FiledDocumentsRepository {
  return {
    async findForClients(): Promise<Map<string, DocumentsMap>> {
      return new Map();
    },
  };
}

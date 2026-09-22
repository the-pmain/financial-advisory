import type { DocumentsMap } from "../../../../src/js/clients-documents-model.js";
import {
  emptyDocuments,
  mergeKind,
  normalizeDocuments,
  persistDocuments,
} from "../../../../src/js/clients-documents-model.js";
import { invalid } from "../../../platform/errors.ts";
import { postgrest } from "../../../platform/postgrest.ts";
import type { FiledDocumentsRepository } from "../ports.ts";

type Row = {
  id?: string;
  client_id: string;
  documents: unknown;
};

export function postgrestFiledDocuments(): FiledDocumentsRepository {
  return {
    async findForClients(clientIds: string[]): Promise<Map<string, DocumentsMap>> {
      if (clientIds.length === 0) return new Map();
      const rows = await postgrest<Row[]>(
        `/clients_documents?client_id=in.(${clientIds.join(",")})&select=client_id,documents`,
      );
      return new Map(rows.map((row) => [row.client_id, normalizeDocuments(row.documents)]));
    },

    async saveKind(clientId: string, kind: string, fields: Record<string, string>): Promise<DocumentsMap> {
      const existing = await postgrest<Row[]>(
        `/clients_documents?client_id=eq.${encodeURIComponent(clientId)}&select=id,client_id,documents`,
      );
      const current = existing[0] ? normalizeDocuments(existing[0].documents) : emptyDocuments();
      const merged = mergeKind(current, kind, fields);
      if (!merged.ok) throw invalid(merged.error);
      const documents = persistDocuments(merged.value);

      if (existing[0]?.id) {
        await postgrest(`/clients_documents?id=eq.${encodeURIComponent(existing[0].id)}`, {
          method: "PATCH",
          body: JSON.stringify({ documents }),
        });
      } else {
        await postgrest("/clients_documents", {
          method: "POST",
          body: JSON.stringify({ client_id: clientId, documents }),
        });
      }
      return merged.value;
    },
  };
}

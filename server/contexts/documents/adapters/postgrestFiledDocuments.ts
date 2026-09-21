import type { DocumentsMap } from "../../../../src/js/clients-documents-model.js";
import { normalizeDocuments } from "../../../../src/js/clients-documents-model.js";
import { postgrest } from "../../../platform/postgrest.ts";
import type { FiledDocumentsRepository } from "../ports.ts";

type Row = {
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
  };
}

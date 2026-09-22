import { prepareClientAgreement, prepareP2pAgreement } from "@domain/documents/agreement.ts";
import { isEmployeeComposeKind } from "@domain/documents/compose.ts";
import type { ClientApplication } from "@domain/onboarding/model.ts";
import type { EmployeeProfile } from "@domain/staff/model.ts";
import type { DocumentsMap } from "../../../src/js/clients-documents-model.js";
import { parseClientsDocumentWrite } from "../../../src/js/clients-documents-model.js";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { forbidden, invalid } from "../../platform/errors.ts";
import type { FiledDocumentsRepository } from "./ports.ts";

export type DocumentsService = ReturnType<typeof createDocumentsService>;

export type PackedDocument = {
  bytes: Uint8Array;
  filename: string;
};

export function createDocumentsService(deps: { filed: FiledDocumentsRepository }) {
  const { filed } = deps;

  return {
    /** The mandate PDF, drawn by the engine behind `@domain/documents`. */
    agreementFor(client: ClientApplication, directory: EmployeeProfile[]): Promise<PackedDocument> {
      return prepareClientAgreement(client, directory);
    },

    p2pFor(client: ClientApplication, directory: EmployeeProfile[]): Promise<PackedDocument> {
      return prepareP2pAgreement(client, directory);
    },

    /**
     * Persist visible string fields for one kind. Employees compose P2P;
     * the PDF is rebuilt later from the stored fields.
     */
    async saveKind(
      client: ClientApplication,
      kind: string,
      fields: Record<string, string>,
    ): Promise<DocumentsMap> {
      if (!isEmployeeComposeKind(kind)) {
        throw forbidden("Employees may file the P2P agreement only.");
      }
      const parsed = parseClientsDocumentWrite({
        client_id: client.id,
        kind,
        fields,
      });
      if (!parsed.ok) throw invalid(parsed.error);
      return filed.saveKind(client.id, parsed.value.kind, parsed.value.fields);
    },

    /** Placeholder used by the client portal while a real pack is not on file. */
    async placeholderPdf(): Promise<Uint8Array> {
      const doc = await PDFDocument.create();
      const page = doc.addPage([612, 792]);
      const font = await doc.embedFont(StandardFonts.TimesRoman);
      page.drawText("Advisor Portal", { x: 72, y: 720, size: 22, font });
      page.drawText("Sample document placeholder.", { x: 72, y: 688, size: 12, font });
      return doc.save();
    },
  };
}

import { prepareClientAgreement } from "@domain/documents/agreement.ts";
import type { ClientApplication } from "@domain/onboarding/model.ts";
import type { EmployeeProfile } from "@domain/staff/model.ts";
import { PDFDocument, StandardFonts } from "pdf-lib";

export type DocumentsService = ReturnType<typeof createDocumentsService>;

export type PackedDocument = {
  bytes: Uint8Array;
  filename: string;
};

export function createDocumentsService() {
  return {
    /** The mandate PDF, drawn by the engine behind `@domain/documents`. */
    agreementFor(client: ClientApplication, directory: EmployeeProfile[]): Promise<PackedDocument> {
      return prepareClientAgreement(client, directory);
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

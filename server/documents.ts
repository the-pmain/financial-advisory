import { Router } from "express";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { findApplicationByEmail, listEmployeeDirectory } from "./employees.ts";
import type { AuthedRequest } from "./requireAuth.ts";

export const documentsRouter = Router();

export async function createSamplePdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]);
  const font = await doc.embedFont(StandardFonts.TimesRoman);
  page.drawText("Advisor Portal", { x: 72, y: 720, size: 22, font });
  page.drawText("Sample document placeholder.", { x: 72, y: 688, size: 12, font });
  return doc.save();
}

export async function createSampleDocx(): Promise<Buffer> {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [new TextRun({ text: "Advisor Portal", bold: true, size: 32 })],
          }),
          new Paragraph("Sample document placeholder."),
        ],
      },
    ],
  });
  return Packer.toBuffer(doc);
}

export async function pageCountFromPdf(bytes: Uint8Array): Promise<number> {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const task = pdfjs.getDocument({ data: bytes, useSystemFonts: true });
  const pdf = await task.promise;
  return pdf.numPages;
}

documentsRouter.get("/sample.pdf", async (_req, res) => {
  const bytes = await createSamplePdf();
  res.setHeader("Content-Type", "application/pdf");
  res.send(Buffer.from(bytes));
});

documentsRouter.get("/mandate", async (req, res) => {
  try {
    const user = (req as AuthedRequest).user;
    const [application, directory] = await Promise.all([
      findApplicationByEmail(user.email),
      listEmployeeDirectory(),
    ]);
    res.json({
      application,
      people: directory.map((person) => ({
        slug: person.slug,
        name: person.name,
        role: person.role,
        photoUrl: "",
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load your documents." });
  }
});

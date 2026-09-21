import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { PDFDocument } from "pdf-lib";
import { company } from "../../data/company.ts";
import { buildAgreement, generateDocument } from "../../js/document-generate.js";
import { agreementFromRecord } from "../../js/document-fields.js";
import { pdfFilename } from "../../js/document-pdf.js";
import { buildDocumentRegister } from "../../js/document-register.js";
import { toWinAnsi } from "../../js/document-pdf-write.js";

const teamMembers = [
  { slug: "friedrich-hartmann", name: "Friedrich Hartmann", role: "Chairman and CIO" },
];

describe("client agreement", () => {
  const register = buildDocumentRegister({
    company,
    teamMembers,
    instructedSlug: "friedrich-hartmann",
  });

  it("slugifies the client name into a firm-kind filename", () => {
    assert.match(pdfFilename("agreement", "Anna Keller"), /Helfenstein-Client-agreement-anna-keller\.pdf/);
  });

  it("maps punctuation that Helvetica cannot encode", () => {
    assert.equal(toWinAnsi("Fee — “quoted”"), 'Fee - "quoted"');
  });

  it("maps intake form fields into a full mandate PDF", async () => {
    const values = agreementFromRecord(
      {
        name: "Anna Keller",
        email: "anna@example.com",
        phone: "+41 41 211 29 29",
        consent: true,
        created_at: "2026-03-01T10:00:00.000Z",
      },
      register,
    );
    const blocks = buildAgreement(values, register);
    const text = blocks
      .flatMap((block) => [
        block.text,
        block.left?.name,
        block.right?.name,
        ...(block.left?.lines ?? []),
        ...(block.right?.lines ?? []),
        ...(block.cards ?? []).flatMap((card) => [card.name, card.printed, card.role, card.date]),
      ])
      .filter(Boolean)
      .join("\n");
    assert.equal(blocks.some((block) => block.type === "signatures"), true);
    assert.equal(blocks.some((block) => block.type === "parties"), true);
    assert.match(text, /Client agreement/);
    assert.match(text, /Kundenvertrag/);
    assert.match(text, /Anna Keller/);
    assert.match(text, /anna@example.com/);
    assert.match(text, /\+41 41 211 29 29/);
    assert.match(text, /Consultation-form consent was given/);
    assert.match(text, /is dated 1 March 2026/);
    assert.match(text, /CHE-111.708.730/);
    assert.match(text, /never holds/);
    assert.match(text, /FINMA/);
    assert.match(text, /Friedrich Hartmann/);

    const result = await generateDocument("agreement", values, { register, people: register.people });
    assert.equal(Buffer.from(result.bytes.subarray(0, 4)).toString(), "%PDF");
    assert.equal((await PDFDocument.load(result.bytes)).getPageCount() >= 3, true);
    assert.match(result.filename, /Helfenstein-Client-agreement-anna-keller\.pdf/);
  });
});

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { PDFDocument } from "pdf-lib";
import { company } from "../../data/company.ts";
import { emptyClientDocuments, prepareP2pAgreement } from "./agreement.ts";
import { buildP2p, generateDocument } from "../../js/document-generate.js";
import { p2pFromRecord } from "../../js/document-fields.js";
import { p2pPayment, p2pSchedule } from "../../js/document-p2p.js";
import { buildDocumentRegister } from "../../js/document-register.js";

const teamMembers = [
  { slug: "friedrich-hartmann", name: "Friedrich Hartmann", role: "Chairman and CIO" },
];

describe("P2P agreement", () => {
  const register = buildDocumentRegister({
    company,
    teamMembers,
    instructedSlug: "friedrich-hartmann",
  });

  it("computes an annuity that clears the balance", () => {
    const schedule = p2pSchedule(100000, 5.75, 36, "2026-03-01");
    assert.equal(schedule.rows.length, 36);
    assert.equal(schedule.rows.at(-1)?.balance, "0.00");
    assert.ok(Math.abs(p2pPayment(100000, 5.75, 36) - schedule.payment) < 0.01);
  });

  it("maps the client record into investor fields and an HG-P2P number", () => {
    const values = p2pFromRecord(
      {
        id: "00000000-0000-4000-8000-00000000ab12",
        name: "Anna Keller",
        email: "anna@example.com",
        phone: "+41 41 211 29 29",
        created_at: "2026-03-01T10:00:00.000Z",
      },
      register,
    );
    assert.equal(values.investorName, "Anna Keller");
    assert.match(values.agreementNumber, /^HG-P2P-2026-AB12$/);
    assert.equal(values.loanTermMonths, undefined);
    assert.equal(values.investmentAmountChf, undefined);
  });

  it("draws a mandate PDF from the client record", async () => {
    const client = {
      id: "00000000-0000-4000-8000-00000000ab12",
      createdAt: "2026-03-01T10:00:00.000Z",
      name: "Anna Keller",
      email: "anna@example.com",
      phone: "+41 41 211 29 29",
      instructedPersonSlug: "friedrich-hartmann",
      registered: true,
      portalAccount: null,
      photoStoragePath: null,
      documents: emptyClientDocuments(),
    };
    const packed = await prepareP2pAgreement(client, [
      { slug: "friedrich-hartmann", name: "Friedrich Hartmann", role: "Chairman and CIO", photoUrl: "" },
    ]);
    assert.equal(Buffer.from(packed.bytes.subarray(0, 4)).toString(), "%PDF");
    assert.equal((await PDFDocument.load(packed.bytes)).getPageCount() >= 1, true);
    assert.match(packed.filename, /P2P-agreement-anna-keller\.pdf/i);

    const values = p2pFromRecord(
      { id: client.id, name: client.name, email: client.email, phone: client.phone, created_at: client.createdAt },
      register,
    );
    const text = buildP2p(values, register)
      .flatMap((block) => [
        block.text,
        block.left?.name,
        block.right?.name,
        ...(block.items ?? []).map((item) => `${item.label} ${item.text}`),
        ...(block.cards ?? []).map((card) => card.name),
      ])
      .filter(Boolean)
      .join("\n");
    assert.match(text, /Peer-to-peer investment agreement/);
    assert.match(text, /Anna Keller/);
    assert.match(text, /CHE-111.708.730/);
    assert.match(text, /894500URZFTDV5G7F357/);
    assert.match(text, /HG-P2P-2026-AB12/);
    const result = await generateDocument("p2p", values, { register, people: register.people });
    assert.equal(Buffer.from(result.bytes.subarray(0, 4)).toString(), "%PDF");
    assert.equal(
      buildP2p(values, register).some((block) => block.type === "table"),
      false,
    );
  });

  it("draws the schedule only from recorded principal, rate and term", () => {
    const filled = {
      investorName: "Anna Keller",
      investmentAmountChf: "100000",
      interestRateAnnualPct: "5.75",
      loanTermMonths: "36",
      startDate: "2026-03-01",
    };
    const blocks = buildP2p(filled, register);
    const table = blocks.find((block) => block.type === "table");
    assert.equal(table?.rows?.length, 36);
    const text = blocks
      .flatMap((block) => [...(block.items ?? []).map((item) => item.text), block.text])
      .filter(Boolean)
      .join("\n");
    assert.match(text, /100'000\.00 CHF/);
    assert.equal(buildP2p({ investorName: "Anna Keller" }, register).some((block) => block.type === "table"), false);
  });
});

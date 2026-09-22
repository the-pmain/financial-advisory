import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { company } from "../../data/company.ts";
import {
  emptyDocuments,
  mergeKind,
  sanitizeFields,
} from "../../js/clients-documents-model.js";
import {
  applyDerivedFields,
  emptyFormValues,
  fieldsForKindDef,
  fieldsForSave,
  showWhenMatches,
  valuesForCompose,
} from "../../js/document-fields.js";
import { buildBrochure, buildClaim, generateDocument } from "../../js/document-generate.js";
import { applyDocumentMock } from "../../js/document-mocks.js";
import { buildDocumentRegister } from "../../js/document-register.js";

const teamMembers = [{ slug: "friedrich-hartmann", name: "Friedrich Hartmann", role: "Chairman and CIO" }];
const register = buildDocumentRegister({
  company,
  teamMembers,
  instructedSlug: "friedrich-hartmann",
});

describe("compose mocks", () => {
  it("keeps an existing claim clientName and feeEarner, and clears wallets", () => {
    const next = applyDocumentMock("claim", {
      clientName: "Clara Meier",
      feeEarner: register.feeEarner,
      wallet: "keep-me",
      destinationWallet: "keep-me",
      clientWallet: "keep-me",
    });
    assert.equal(next.clientName, "Clara Meier");
    assert.equal(next.feeEarner, register.feeEarner);
    assert.equal(next.wallet, "");
    assert.equal(next.destinationWallet, "");
    assert.equal(next.clientWallet, "");
    assert.equal(next.exchange, "Kraken");
  });

  it("fills a blank identity field and leaves a filled one", () => {
    const next = applyDocumentMock("claim", { clientName: "Clara Meier", applicant: "" });
    assert.equal(next.clientName, "Clara Meier");
    assert.equal(next.applicant, "Anna Keller");
  });

  it("does not wipe current agreement values when the mock is empty, except wallets", () => {
    const current = {
      clientName: "Clara Meier",
      clientEmail: "clara@example.com",
      feeEarner: register.feeEarner,
      wallet: "0xabc",
    };
    const next = applyDocumentMock("agreement", current);
    assert.equal(next.clientName, "Clara Meier");
    assert.equal(next.clientEmail, "clara@example.com");
    assert.equal(next.feeEarner, register.feeEarner);
    assert.equal(next.wallet, "");
  });

  it("fills every visible P2P field, keeping an existing investor name", () => {
    const next = applyDocumentMock("p2p", {
      ...emptyFormValues("p2p"),
      investorName: "Clara Meier",
      feeEarner: register.feeEarner,
    });
    assert.equal(next.investorName, "Clara Meier");
    assert.equal(next.feeEarner, register.feeEarner);
    for (const item of fieldsForKindDef("p2p")) {
      if (item.locked) continue;
      if (!showWhenMatches(item.showWhen, next)) continue;
      assert.ok(String(next[item.name] ?? "").trim(), `expected mock to fill ${item.name}`);
    }
  });
});

describe("compose hydration and save", () => {
  it("prefers saved fields over client prefill, and the register fee earner over both", () => {
    const documents = emptyDocuments();
    documents.claim = {
      fields: {
        clientName: "Saved Name",
        feeEarner: "Wrong Person · wrong@example.com",
      },
      saved_at: "2026-03-01T10:00:00.000Z",
    };
    const values = valuesForCompose(
      "claim",
      { name: "Anna Keller", email: "anna@example.com", phone: "+41 41 211 29 29" },
      documents,
      register,
    );
    assert.equal(values.clientName, "Saved Name");
    assert.equal(values.feeEarner, register.feeEarner);
  });

  it("omits hidden showWhen fields from the save payload", () => {
    const fields = fieldsForSave(
      "claim",
      { clientName: "Anna Keller", hasCollateral: "No", collateralNote: "should not save" },
      register,
    );
    assert.equal(fields.clientName, "Anna Keller");
    assert.equal(fields.hasCollateral, "No");
    assert.equal(Object.hasOwn(fields, "collateralNote"), false);
  });

  it("fills empty followed/frozen from loss, then clamps followed ≤ loss and frozen ≤ followed", () => {
    const filled = applyDerivedFields("tracing", { loss: "10,000", followed: "", frozen: "" }, "loss");
    const followed = Number(String(filled.followed).replace(/,/g, ""));
    const frozen = Number(String(filled.frozen).replace(/,/g, ""));
    assert.ok(followed <= 10000);
    assert.ok(followed >= 500);
    assert.ok(frozen <= followed);

    const clamped = applyDerivedFields(
      "tracing",
      { loss: "1,000", followed: "5,000", frozen: "4,000" },
      "loss",
    );
    assert.equal(clamped.followed, "1,000");
    assert.equal(clamped.frozen, "1,000");
  });
});

describe("compose generate and persist", () => {
  it("returns a PDF and prints empty required slots as [label]", async () => {
    const text = buildClaim({}, register)
      .map((block) => block.text)
      .filter(Boolean)
      .join("\n");
    assert.match(text, /\[client name\]/);
    assert.match(text, /\[address\]/);
    const result = await generateDocument("claim", {}, { register, people: register.people });
    assert.equal(Buffer.from(result.bytes.subarray(0, 4)).toString(), "%PDF");
  });

  it("prints brochure empty optionals as example copy, not [TOKEN] placeholders", async () => {
    const blocks = buildBrochure({}, register);
    const text = blocks
      .flatMap((block) => [block.text, ...(block.fields ?? []).map((field) => field.text)])
      .filter(Boolean)
      .join("\n");
    assert.doesNotMatch(text, /\[CLIENT_NAME\]/);
    assert.doesNotMatch(text, /\[TOKEN\]/);
    assert.equal(
      blocks.some((block) => block.filled === false || (block.fields ?? []).some((field) => field.filled === false)),
      true,
    );
    const result = await generateDocument("brochure", {}, { register, people: register.people });
    assert.equal(Buffer.from(result.bytes.subarray(0, 4)).toString(), "%PDF");
  });

  it("rejects non-string fields, bad key names, and more than 80 keys", () => {
    assert.equal(sanitizeFields({ clientName: 12 }).ok, false);
    assert.equal(sanitizeFields({ "client-name": "Anna" }).ok, false);
    const tooMany = {};
    for (let i = 0; i < 81; i += 1) tooMany[`field${i}`] = "x";
    assert.equal(sanitizeFields(tooMany).ok, false);
    assert.equal(sanitizeFields({ clientName: "Anna Keller" }).ok, true);
  });

  it("replaces fields and saved_at on a second save, and never stores a PDF", () => {
    const first = mergeKind(emptyDocuments(), "p2p", { borrowerName: "First GmbH" }, "2026-03-01T10:00:00.000Z");
    assert.equal(first.ok, true);
    const second = mergeKind(first.value, "p2p", { borrowerName: "Second GmbH" }, "2026-03-02T10:00:00.000Z");
    assert.equal(second.ok, true);
    assert.equal(second.value.p2p.fields.borrowerName, "Second GmbH");
    assert.equal(second.value.p2p.saved_at, "2026-03-02T10:00:00.000Z");
    assert.equal(Object.hasOwn(second.value.p2p.fields, "bytes"), false);
    assert.equal(Object.hasOwn(second.value.p2p, "pdf"), false);
    assert.equal(JSON.stringify(second.value).includes("%PDF"), false);
  });
});

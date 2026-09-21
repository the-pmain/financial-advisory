import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { emptyDocuments } from "../../js/clients-documents-model.js";
import {
  clientPhotoUrl,
  isClientPhotoFile,
  nextClientPhotoFile,
  toClientSummary,
  withAccountPortrait,
} from "./model.ts";

describe("client portraits", () => {
  it("names a new object from the record id", () => {
    assert.equal(nextClientPhotoFile("Clara Meier", 1_700_000_000_000), "clara-meier-1700000000000.png");
    assert.equal(nextClientPhotoFile("!!!", 9), "client-9.png");
  });

  it("accepts only the names the store writes", () => {
    assert.equal(isClientPhotoFile("clara-meier-1.png"), true);
    assert.equal(isClientPhotoFile("../secret.png"), false);
    assert.equal(isClientPhotoFile("clara.jpg"), false);
  });

  it("turns a missing path into an empty URL, not a placeholder path", () => {
    assert.equal(clientPhotoUrl(null), "");
    assert.equal(clientPhotoUrl(""), "");
    assert.equal(clientPhotoUrl("clara-meier-1.png"), "/api/admin/clients/photos/clara-meier-1.png");
  });

  it("projects the storage path out of a console summary", () => {
    const summary = toClientSummary({
      id: "1",
      createdAt: "2026-09-18T00:00:00.000Z",
      name: "Clara Meier",
      email: "clara.meier@example.com",
      phone: "",
      instructedPersonSlug: "staff",
      registered: false,
      portalAccount: null,
      photoStoragePath: null,
      documents: emptyDocuments(),
    });

    assert.equal(summary.photoUrl, "");
    assert.equal("photoStoragePath" in summary, false);
  });

  it("prefers the portal account portrait once they have signed up", () => {
    const application = {
      id: "1",
      createdAt: "2026-09-18T00:00:00.000Z",
      name: "Clara Meier",
      email: "clara.meier@example.com",
      phone: "",
      instructedPersonSlug: "staff",
      registered: false,
      portalAccount: null,
      photoStoragePath: "application-old.png",
      documents: emptyDocuments(),
    };
    const joined = withAccountPortrait(application, {
      id: "acc",
      name: "Clara Meier",
      email: "clara.meier@example.com",
      createdAt: "2026-09-18T00:00:00.000Z",
      photoStoragePath: "account-new.png",
    });

    assert.equal(joined.registered, true);
    assert.equal(joined.photoStoragePath, "account-new.png");
    assert.equal(toClientSummary(joined).photoUrl, "/api/admin/clients/photos/account-new.png");
  });
});

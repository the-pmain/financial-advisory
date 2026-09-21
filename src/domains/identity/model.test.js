import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { clientSessionPhotoUrl, publicSession } from "./model.ts";

describe("identity session", () => {
  it("publishes a client portrait URL and never a password", () => {
    const published = publicSession({
      id: "1",
      email: "anna@example.com",
      name: "Anna Keller",
      role: "advisor",
      photoUrl: "/api/me/photo?v=anna.png",
    });
    assert.equal(published.photoUrl, "/api/me/photo?v=anna.png");
    assert.equal("password" in published, false);
  });

  it("points the signed-in client at their own portrait route", () => {
    assert.equal(clientSessionPhotoUrl("anna-1.png"), "/api/me/photo?v=anna-1.png");
    assert.equal(clientSessionPhotoUrl(null), "/api/me/photo");
  });
});

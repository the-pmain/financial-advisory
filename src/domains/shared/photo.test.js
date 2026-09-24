import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isPortraitName, isPortraitType, portraitExtension, sniffPortrait } from "./photo.ts";

describe("portrait files", () => {
  it("names png, jpeg, and webp and refuses anything else", () => {
    assert.equal(isPortraitName("anja-hoffmann-1.png"), true);
    assert.equal(isPortraitName("anja-hoffmann-1.jpg"), true);
    assert.equal(isPortraitName("anja-hoffmann-1.jpeg"), true);
    assert.equal(isPortraitName("anja-hoffmann-1.webp"), true);
    assert.equal(isPortraitName("anja-hoffmann-1.gif"), false);
    assert.equal(isPortraitName("../secret.png"), false);
  });

  it("keeps the original type on the object name", () => {
    assert.equal(portraitExtension("image/png"), "png");
    assert.equal(portraitExtension("image/jpeg"), "jpg");
    assert.equal(portraitExtension("image/webp"), "webp");
    assert.equal(isPortraitType("image/gif"), false);
  });

  it("reads the type from the bytes and does not invent one", () => {
    assert.equal(sniffPortrait(Uint8Array.of(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)), "image/png");
    assert.equal(sniffPortrait(Uint8Array.of(0xff, 0xd8, 0xff, 0xe0)), "image/jpeg");
    const webp = new Uint8Array(12);
    webp.set([0x52, 0x49, 0x46, 0x46], 0);
    webp.set([0x57, 0x45, 0x42, 0x50], 8);
    assert.equal(sniffPortrait(webp), "image/webp");
    assert.equal(sniffPortrait(Uint8Array.of(0x47, 0x49, 0x46, 0x38)), null);
  });
});

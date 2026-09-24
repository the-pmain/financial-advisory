/**
 * Portrait bytes shared by staff and clients.
 *
 * The console stores the file it was given. Nothing here resizes, crops, or
 * re-encodes. No context owns that rule, so it lives with the other kernels.
 */

export const PORTRAIT_MAX_BYTES = 8 * 1024 * 1024;

export const PORTRAIT_TYPES = ["image/png", "image/jpeg", "image/webp"] as const;

export type PortraitType = (typeof PORTRAIT_TYPES)[number];

export type PortraitExtension = "png" | "jpg" | "webp";

const PORTRAIT_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*\.(png|jpe?g|webp)$/i;

export function isPortraitName(file: string): boolean {
  return PORTRAIT_NAME.test(file);
}

export function isPortraitType(value: string): value is PortraitType {
  return (PORTRAIT_TYPES as readonly string[]).includes(value);
}

export function portraitExtension(type: PortraitType): PortraitExtension {
  if (type === "image/jpeg") return "jpg";
  if (type === "image/webp") return "webp";
  return "png";
}

/** The type the bytes actually are, or null when they are not a portrait we store. */
export function sniffPortrait(bytes: Uint8Array): PortraitType | null {
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return "image/png";
  }
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }
  return null;
}

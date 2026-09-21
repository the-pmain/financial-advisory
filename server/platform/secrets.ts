import { timingSafeEqual } from "node:crypto";

/** Constant time compare for stored passwords and the admin PIN. */
export function secretsMatch(stored: string, given: string): boolean {
  const a = Buffer.from(stored);
  const b = Buffer.from(given);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

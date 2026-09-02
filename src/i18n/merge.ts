/** Deep-merge `patch` into a clone of `base` (objects only; arrays replace). */
export function localize<T extends Record<string, unknown>>(base: T, patch: Partial<T>): T {
  const out = structuredClone(base);
  mergeInto(out, patch as Record<string, unknown>);
  return out;
}

function mergeInto(target: Record<string, unknown>, patch: Record<string, unknown>): void {
  for (const key of Object.keys(patch)) {
    const pv = patch[key];
    if (pv === undefined) continue;
    const tv = target[key];
    if (isPlainObject(tv) && isPlainObject(pv)) {
      mergeInto(tv, pv);
    } else {
      target[key] = structuredClone(pv);
    }
  }
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

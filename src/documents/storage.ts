import { DOC_SLUGS, type DocSlug } from "./catalog.ts";

export type DocStatus = "empty" | "started" | "complete" | "disabled";

export type DocRecord = {
  status: DocStatus;
  fields: Record<string, string>;
  fileName: string;
};

export type DocPack = Record<DocSlug, DocRecord>;

function storageKey(userId: string): string {
  return `portal.docs.v1.${userId}`;
}

export function emptyRecord(): DocRecord {
  return { status: "empty", fields: {}, fileName: "" };
}

function emptyPack(): DocPack {
  return Object.fromEntries(DOC_SLUGS.map((slug) => [slug, emptyRecord()])) as DocPack;
}

function seedPack(name: string): DocPack {
  const pack = emptyPack();
  pack.passport = {
    status: "complete",
    fields: {
      fullName: name,
      number: "X1234567",
      nationality: "Switzerland",
      expiry: "2029-04-18",
    },
    fileName: "passport-biographical.pdf",
  };
  return pack;
}

export function readDocPack(userId: string, name: string): DocPack {
  const pack = emptyPack();
  try {
    const raw = window.localStorage.getItem(storageKey(userId));
    if (!raw) return seedPack(name);
    const parsed = JSON.parse(raw) as Partial<Record<string, Partial<DocRecord>>>;
    for (const slug of DOC_SLUGS) {
      const row = parsed[slug];
      if (!row) continue;
      pack[slug] = {
        status: row.status === "complete" || row.status === "started" ? row.status : "empty",
        fields: row.fields && typeof row.fields === "object" ? { ...row.fields } : {},
        fileName: typeof row.fileName === "string" ? row.fileName : "",
      };
    }
    return pack;
  } catch {
    return seedPack(name);
  }
}

export function writeDocPack(userId: string, pack: DocPack): void {
  window.localStorage.setItem(storageKey(userId), JSON.stringify(pack));
}

export function upsertDocRecord(userId: string, name: string, slug: DocSlug, next: DocRecord): DocPack {
  const pack = { ...readDocPack(userId, name), [slug]: next };
  writeDocPack(userId, pack);
  return pack;
}

/**
 * Object storage, one bucket at a time.
 *
 * Contexts keep their own `PhotoStore` port and their own bucket name; this is
 * the transport underneath, so staff portraits and client portraits do not each
 * carry a copy of the same fetch calls.
 */

import type { SupabaseAccess } from "./supabase.ts";

export type StoredObject = {
  body: Buffer;
  contentType: string;
};

export type BucketStore = {
  read(file: string): Promise<StoredObject | null>;
  write(file: string, body: Buffer, contentType: string): Promise<void>;
  remove(file: string): Promise<void>;
};

export function supabaseBucket(access: SupabaseAccess, bucket: string): BucketStore {
  const object = (file: string) => `${access.base}/storage/v1/object/${bucket}/${file}`;
  const authorized = () => ({ apikey: access.key, Authorization: `Bearer ${access.key}` });

  return {
    async read(file: string): Promise<StoredObject | null> {
      // Public first: a bucket served openly needs no key, a private one does.
      const attempts = [
        { url: `${access.base}/storage/v1/object/public/${bucket}/${file}`, headers: {} },
        { url: object(file), headers: authorized() },
      ];

      for (const attempt of attempts) {
        const res = await fetch(attempt.url, { headers: attempt.headers });
        if (!res.ok) continue;
        const contentType = res.headers.get("content-type") || "image/png";
        if (!contentType.startsWith("image/")) continue;
        return { body: Buffer.from(await res.arrayBuffer()), contentType };
      }
      return null;
    },

    async write(file: string, body: Buffer, contentType: string): Promise<void> {
      const res = await fetch(object(file), {
        method: "POST",
        headers: { ...authorized(), "Content-Type": contentType, "x-upsert": "true" },
        body: new Uint8Array(body),
      });
      if (!res.ok) {
        throw new Error(`Upload to ${bucket} failed: ${res.status} ${await res.text()}`);
      }
    },

    async remove(file: string): Promise<void> {
      try {
        await fetch(object(file), { method: "DELETE", headers: authorized() });
      } catch (err) {
        console.error(err);
      }
    },
  };
}

/** Objects held for the life of the process, for runs without Supabase. */
export function memoryBucket(): BucketStore {
  const files = new Map<string, StoredObject>();

  return {
    async read(file: string): Promise<StoredObject | null> {
      return files.get(file) ?? null;
    },

    async write(file: string, body: Buffer, contentType: string): Promise<void> {
      files.set(file, { body, contentType });
    },

    async remove(file: string): Promise<void> {
      files.delete(file);
    },
  };
}

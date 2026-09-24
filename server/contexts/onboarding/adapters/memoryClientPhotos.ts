import { memoryBucket } from "../../../platform/storage.ts";
import type { PhotoStore, StoredPhoto } from "../ports.ts";

/** Portraits held for the life of the process, for runs without Supabase. */
export function memoryClientPhotos(): PhotoStore {
  const bucket = memoryBucket();

  return {
    read(file: string): Promise<StoredPhoto | null> {
      return bucket.read(file);
    },

    write(file: string, body: Buffer, contentType: string): Promise<void> {
      return bucket.write(file, body, contentType);
    },

    remove(file: string): Promise<void> {
      return bucket.remove(file);
    },
  };
}

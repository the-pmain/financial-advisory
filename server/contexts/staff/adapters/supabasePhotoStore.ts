import type { SupabaseAccess } from "../../../platform/supabase.ts";
import { supabaseBucket } from "../../../platform/storage.ts";
import type { PhotoStore, StoredPhoto } from "../ports.ts";

/** Public bucket: these portraits hang in the staff directory. */
const BUCKET = "employees";

export function supabasePhotoStore(access: SupabaseAccess): PhotoStore {
  const bucket = supabaseBucket(access, BUCKET);

  return {
    read(file: string): Promise<StoredPhoto | null> {
      return bucket.read(file);
    },

    write(file: string, body: Buffer): Promise<void> {
      return bucket.write(file, body, "image/png");
    },

    remove(file: string): Promise<void> {
      return bucket.remove(file);
    },
  };
}

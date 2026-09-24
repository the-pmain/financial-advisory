import { useCallback, useEffect, useState } from "react";
import type { ClientWithAdviser } from "@domain/staff/model.ts";
import { api } from "../api/client.ts";

/** One client record for the console, read on its own so paging cannot hide it. */
export function useAdminClient(id: string, loadError: string) {
  const [client, setClient] = useState<ClientWithAdviser | null>(null);
  const [error, setError] = useState("");

  const path = `/api/admin/clients/${encodeURIComponent(id)}`;

  const reload = useCallback(async () => {
    if (!id) return;
    try {
      setClient(await api<ClientWithAdviser>(path));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : loadError);
      setClient(null);
    }
  }, [id, path, loadError]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const savePhoto = useCallback(
    async (photo: Blob) => {
      setClient(
        await api<ClientWithAdviser>(`${path}/photo`, {
          method: "PUT",
          headers: { "Content-Type": photo.type },
          body: photo,
        }),
      );
    },
    [path],
  );

  return { client, error, reload, savePhoto };
}

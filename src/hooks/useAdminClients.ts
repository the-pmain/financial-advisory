import { useCallback, useEffect, useState } from "react";
import type { ClientFilter, ClientPage } from "@domain/staff/model.ts";
import { DEFAULT_PAGE_SIZE } from "@domain/shared/page.ts";
import { api } from "../api/client.ts";

/**
 * One page of the firm's client book, adviser attached. The server owns the
 * filtering and the counts, so the table never has to hold the whole list.
 */
export function useAdminClients(
  query: { page: number; status: ClientFilter; pageSize?: number },
  loadError: string,
) {
  const { page, status, pageSize = DEFAULT_PAGE_SIZE } = query;
  const [data, setData] = useState<ClientPage | null>(null);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    const search = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      status,
    });
    try {
      setData(await api<ClientPage>(`/api/admin/clients?${search}`));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : loadError);
      setData(null);
    }
  }, [page, pageSize, status, loadError]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { data, error, reload };
}

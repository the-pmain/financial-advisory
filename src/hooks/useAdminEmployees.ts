import { useCallback, useEffect, useState } from "react";
import { api } from "../api/client.ts";
import type {
  EmployeeAccount,
  EmployeeAccountPatch,
  EmployeeAccountWithClients,
} from "@domain/staff/model.ts";

export function useAdminEmployees(loadError: string) {
  const [items, setItems] = useState<EmployeeAccountWithClients[] | null>(null);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    try {
      setItems(await api<EmployeeAccountWithClients[]>("/api/admin/employees"));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : loadError);
      setItems([]);
    }
  }, [loadError]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const merge = useCallback((slug: string, saved: EmployeeAccount) => {
    setItems((current) =>
      current?.map((row) => (row.slug === slug ? { ...row, ...saved } : row)) ?? current,
    );
  }, []);

  const save = useCallback(
    async (slug: string, patch: EmployeeAccountPatch) => {
      merge(
        slug,
        await api<EmployeeAccount>(`/api/admin/employees/${encodeURIComponent(slug)}`, {
          method: "PATCH",
          body: JSON.stringify(patch),
        }),
      );
    },
    [merge],
  );

  const savePhoto = useCallback(
    async (slug: string, photo: Blob) => {
      merge(
        slug,
        await api<EmployeeAccount>(`/api/admin/employees/${encodeURIComponent(slug)}/photo`, {
          method: "PUT",
          headers: { "Content-Type": "image/png" },
          body: photo,
        }),
      );
    },
    [merge],
  );

  const removePhoto = useCallback(
    async (slug: string) => {
      merge(
        slug,
        await api<EmployeeAccount>(`/api/admin/employees/${encodeURIComponent(slug)}/photo`, {
          method: "DELETE",
        }),
      );
    },
    [merge],
  );

  const remove = useCallback(async (slug: string) => {
    await api(`/api/admin/employees/${encodeURIComponent(slug)}`, { method: "DELETE" });
    setItems((current) => current?.filter((row) => row.slug !== slug) ?? current);
  }, []);

  return { items, error, reload, save, savePhoto, removePhoto, remove };
}

import {
  photoUrl,
  photoUrlFor,
  type EmployeeAccount,
  type EmployeeAccountPatch,
  type EmployeeProfile,
} from "@domain/staff/model.ts";
import { postgrest } from "../../../platform/postgrest.ts";
import type { EmployeeRecord, EmployeeRepository } from "../ports.ts";

type Row = {
  id: string;
  slug: string;
  name: string;
  role?: string | null;
  password?: string;
  photo_storage_path?: string | null;
  sort_order?: number | null;
};

const ACCOUNT_SELECT = "id,slug,name,role,photo_storage_path,sort_order";
const RECORD_SELECT = `${ACCOUNT_SELECT},password`;
const DIRECTORY_ORDER = "order=sort_order.asc,name.asc";

/** PostgREST reads `ilike` patterns, so a typed handle cannot smuggle wildcards. */
function literal(value: string): string {
  return value.replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_");
}

function toAccount(row: Row): EmployeeAccount {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    role: row.role ?? "",
    photoUrl: photoUrlFor(row.slug, row.photo_storage_path),
    sortOrder: row.sort_order ?? null,
  };
}

function toRecord(row: Row): EmployeeRecord {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    role: row.role ?? "",
    password: row.password ?? "",
    photoStoragePath: row.photo_storage_path ?? null,
    sortOrder: row.sort_order ?? null,
  };
}

export function postgrestEmployees(): EmployeeRepository {
  return {
    async listProfiles(): Promise<EmployeeProfile[]> {
      const rows = await postgrest<Row[]>(
        `/employees?select=slug,name,role,photo_storage_path,sort_order&${DIRECTORY_ORDER}`,
      );
      // The directory shows what is on file; it does not reach for the convention.
      return rows.map((row) => ({
        slug: row.slug,
        name: row.name,
        role: row.role ?? "",
        photoUrl: photoUrl(row.photo_storage_path),
      }));
    },

    async listAccounts(): Promise<EmployeeAccount[]> {
      const rows = await postgrest<Row[]>(`/employees?select=${ACCOUNT_SELECT}&${DIRECTORY_ORDER}`);
      return rows.map(toAccount);
    },

    async findForLogin(slug: string): Promise<EmployeeRecord | null> {
      const rows = await postgrest<Row[]>(
        `/employees?slug=ilike.${encodeURIComponent(literal(slug))}&select=${RECORD_SELECT}&limit=1`,
      );
      return rows[0] ? toRecord(rows[0]) : null;
    },

    async find(slug: string): Promise<EmployeeRecord | null> {
      const rows = await postgrest<Row[]>(
        `/employees?slug=eq.${encodeURIComponent(slug)}&select=${RECORD_SELECT}&limit=1`,
      );
      return rows[0] ? toRecord(rows[0]) : null;
    },

    async update(slug: string, patch: EmployeeAccountPatch): Promise<EmployeeAccount | null> {
      const changes: Record<string, string | number | null> = {};
      if (patch.name !== undefined) changes.name = patch.name;
      if (patch.role !== undefined) changes.role = patch.role;
      if (patch.sortOrder !== undefined) changes.sort_order = patch.sortOrder;
      if (patch.password) changes.password = patch.password;

      const rows = await postgrest<Row[]>(
        `/employees?slug=eq.${encodeURIComponent(slug)}&select=${ACCOUNT_SELECT}`,
        { method: "PATCH", body: JSON.stringify(changes) },
      );
      return rows[0] ? toAccount(rows[0]) : null;
    },

    async setPhotoPath(slug: string, file: string): Promise<EmployeeAccount | null> {
      const rows = await postgrest<Row[]>(
        `/employees?slug=eq.${encodeURIComponent(slug)}&select=${ACCOUNT_SELECT}`,
        { method: "PATCH", body: JSON.stringify({ photo_storage_path: file }) },
      );
      return rows[0] ? toAccount(rows[0]) : null;
    },

    async remove(slug: string): Promise<boolean> {
      const rows = await postgrest<Row[]>(`/employees?slug=eq.${encodeURIComponent(slug)}&select=slug`, {
        method: "DELETE",
      });
      return Array.isArray(rows) && rows.length > 0;
    },
  };
}

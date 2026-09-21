import {
  photoUrl,
  photoUrlFor,
  type EmployeeAccount,
  type EmployeeAccountPatch,
  type EmployeeProfile,
} from "@domain/staff/model.ts";
import type { EmployeeRecord, EmployeeRepository } from "../ports.ts";

type Row = {
  id: string;
  slug: string;
  name: string;
  role: string;
  password: string;
  photoStoragePath: string | null;
  sortOrder: number | null;
};

/** The fixture the app runs on with no Supabase configured. */
function seed(): Row[] {
  return [
    {
      id: "00000000-0000-4000-8000-000000000001",
      slug: "staff",
      name: "Demo Employee",
      password: "password12",
      role: "Adviser",
      photoStoragePath: null,
      sortOrder: 1,
    },
  ];
}

function toAccount(row: Row): EmployeeAccount {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    role: row.role,
    photoUrl: photoUrlFor(row.slug, row.photoStoragePath),
    sortOrder: row.sortOrder,
  };
}

/** Copied out, so a caller holding a record cannot edit the store by accident. */
function toRecord(row: Row): EmployeeRecord {
  return { ...row };
}

export function memoryEmployees(): EmployeeRepository {
  const rows = seed();
  const byName = (a: Row, b: Row) => a.name.localeCompare(b.name);
  const find = (slug: string) => rows.find((row) => row.slug === slug) ?? null;

  return {
    async listProfiles(): Promise<EmployeeProfile[]> {
      return rows
        .slice()
        .sort(byName)
        .map((row) => ({
          slug: row.slug,
          name: row.name,
          role: row.role,
          photoUrl: photoUrl(row.photoStoragePath),
        }));
    },

    async listAccounts(): Promise<EmployeeAccount[]> {
      return rows.slice().sort(byName).map(toAccount);
    },

    async findForLogin(slug: string): Promise<EmployeeRecord | null> {
      const needle = slug.toLowerCase();
      const row = rows.find((candidate) => candidate.slug.toLowerCase() === needle);
      return row ? toRecord(row) : null;
    },

    async find(slug: string): Promise<EmployeeRecord | null> {
      const row = find(slug);
      return row ? toRecord(row) : null;
    },

    async update(slug: string, patch: EmployeeAccountPatch): Promise<EmployeeAccount | null> {
      const row = find(slug);
      if (!row) return null;
      if (patch.name !== undefined) row.name = patch.name;
      if (patch.role !== undefined) row.role = patch.role;
      if (patch.sortOrder !== undefined) row.sortOrder = patch.sortOrder;
      if (patch.password) row.password = patch.password;
      return toAccount(row);
    },

    async setPhotoPath(slug: string, file: string): Promise<EmployeeAccount | null> {
      const row = find(slug);
      if (!row) return null;
      row.photoStoragePath = file;
      return toAccount(row);
    },

    async remove(slug: string): Promise<boolean> {
      const index = rows.findIndex((row) => row.slug === slug);
      if (index === -1) return false;
      rows.splice(index, 1);
      return true;
    },
  };
}

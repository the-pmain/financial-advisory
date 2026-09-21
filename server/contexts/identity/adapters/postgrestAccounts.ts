import type { PortalAccount } from "@domain/onboarding/model.ts";
import { postgrest } from "../../../platform/postgrest.ts";
import type { AccountRecord, AccountRepository, PortalAccountDirectory } from "../ports.ts";

type Row = {
  id: string;
  email: string;
  name: string | null;
  password: string;
  photo_storage_path?: string | null;
};

type DirectoryRow = {
  id: string;
  email: string;
  name: string | null;
  created_at?: string | null;
  photo_storage_path?: string | null;
};

const ACCOUNT_SELECT = "id,email,name,password,photo_storage_path";

function toRecord(row: Row): AccountRecord {
  return {
    id: row.id,
    email: row.email,
    name: row.name ?? "",
    password: row.password,
    photoStoragePath: row.photo_storage_path ?? null,
  };
}

export function postgrestAccounts(): AccountRepository & PortalAccountDirectory {
  return {
    async findByEmail(email: string): Promise<AccountRecord | null> {
      const rows = await postgrest<Row[]>(
        `/clients?email=eq.${encodeURIComponent(email)}&select=${ACCOUNT_SELECT}`,
      );
      return rows[0] ? toRecord(rows[0]) : null;
    },

    async insert(account: Omit<AccountRecord, "id" | "photoStoragePath">): Promise<AccountRecord> {
      const rows = await postgrest<Row[]>("/clients", {
        method: "POST",
        body: JSON.stringify({
          email: account.email,
          name: account.name,
          password: account.password,
        }),
      });
      if (!rows[0]) throw new Error("Client insert returned no row");
      return toRecord(rows[0]);
    },

    async setPhotoPath(email: string, file: string): Promise<void> {
      await postgrest(`/clients?email=eq.${encodeURIComponent(email)}`, {
        method: "PATCH",
        body: JSON.stringify({ photo_storage_path: file }),
      });
    },

    async findByEmails(emails: string[]): Promise<Map<string, PortalAccount>> {
      const unique = [...new Set(emails.map((email) => email.trim().toLowerCase()).filter(Boolean))];
      const held = new Map<string, PortalAccount>();
      if (unique.length === 0) return held;

      const filter = unique.map((email) => `email.eq.${encodeURIComponent(email)}`).join(",");
      const rows = await postgrest<DirectoryRow[]>(
        `/clients?or=(${filter})&select=id,email,name,created_at,photo_storage_path`,
      );
      for (const row of rows) {
        held.set(row.email.toLowerCase(), {
          id: row.id,
          email: row.email,
          name: row.name?.trim() || row.email,
          createdAt: row.created_at ?? "",
          photoStoragePath: row.photo_storage_path ?? null,
        });
      }
      return held;
    },
  };
}

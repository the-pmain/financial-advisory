import { randomBytes } from "node:crypto";
import type { PortalAccount } from "@domain/onboarding/model.ts";
import type { AccountRecord, AccountRepository, PortalAccountDirectory } from "../ports.ts";

type Row = AccountRecord & { createdAt: string };

/** Accounts for the life of the process, for runs without Supabase. */
export function memoryAccounts(): AccountRepository & PortalAccountDirectory {
  const rows = new Map<string, Row>();
  // Matches the seeded Clara application so memory mode can reveal a portal password.
  rows.set("clara.meier@example.com", {
    id: "00000000-0000-4000-8000-000000000201",
    email: "clara.meier@example.com",
    name: "Clara Meier",
    password: "password12",
    photoStoragePath: null,
    createdAt: "2026-09-18T09:12:00.000Z",
  });

  return {
    async findByEmail(email: string): Promise<AccountRecord | null> {
      return rows.get(email.trim().toLowerCase()) ?? null;
    },

    async insert(account: Omit<AccountRecord, "id" | "photoStoragePath">): Promise<AccountRecord> {
      const created: Row = {
        ...account,
        id: randomBytes(12).toString("hex"),
        photoStoragePath: null,
        createdAt: new Date().toISOString(),
      };
      rows.set(account.email.trim().toLowerCase(), created);
      return created;
    },

    async setPhotoPath(email: string, file: string): Promise<void> {
      const row = rows.get(email.trim().toLowerCase());
      if (row) row.photoStoragePath = file;
    },

    async findByEmails(emails: string[]): Promise<Map<string, PortalAccount>> {
      const held = new Map<string, PortalAccount>();
      for (const email of emails) {
        const row = rows.get(email.trim().toLowerCase());
        if (!row) continue;
        held.set(row.email.toLowerCase(), {
          id: row.id,
          email: row.email,
          name: row.name.trim() || row.email,
          createdAt: row.createdAt,
          photoStoragePath: row.photoStoragePath,
        });
      }
      return held;
    },
  };
}

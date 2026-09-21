import type { ClientApplication } from "@domain/onboarding/model.ts";
import { emptyDocuments } from "../../../../src/js/clients-documents-model.js";
import type { ApplicationRepository } from "../ports.ts";

/** The two applications the app runs on with no Supabase configured. */
function seed(): ClientApplication[] {
  return [
    {
      id: "00000000-0000-4000-8000-000000000101",
      createdAt: "2026-09-18T09:12:00.000Z",
      name: "Clara Meier",
      email: "clara.meier@example.com",
      phone: "+41 79 123 45 67",
      instructedPersonSlug: "staff",
      registered: true,
      portalAccount: {
        id: "00000000-0000-4000-8000-000000000201",
        name: "Clara Meier",
        email: "clara.meier@example.com",
        createdAt: "2026-09-18T09:12:00.000Z",
        photoStoragePath: null,
      },
      photoStoragePath: null,
      documents: emptyDocuments(),
    },
    {
      id: "00000000-0000-4000-8000-000000000102",
      createdAt: "2026-09-12T14:40:00.000Z",
      name: "Jonas Keller",
      email: "jonas.keller@example.com",
      phone: "+41 22 555 10 20",
      instructedPersonSlug: "staff",
      registered: false,
      portalAccount: null,
      photoStoragePath: null,
      documents: emptyDocuments(),
    },
  ];
}

export function memoryApplications(): ApplicationRepository {
  const rows = seed();
  const match = (row: ClientApplication, email: string) => row.email.toLowerCase() === email;

  return {
    async listAll(): Promise<ClientApplication[]> {
      return rows.slice();
    },

    async listForEmployee(slug: string): Promise<ClientApplication[]> {
      return rows.filter((row) => row.instructedPersonSlug === slug);
    },

    async find(id: string): Promise<ClientApplication | null> {
      return rows.find((row) => row.id === id) ?? null;
    },

    async findByEmail(email: string): Promise<ClientApplication | null> {
      const needle = email.trim().toLowerCase();
      if (!needle) return null;
      return rows.find((row) => match(row, needle)) ?? null;
    },

    async findNameByEmail(email: string): Promise<string | null> {
      const needle = email.trim().toLowerCase();
      if (!needle) return null;
      return rows.find((row) => match(row, needle))?.name.trim() || null;
    },

    async setPhotoPath(id: string, file: string): Promise<ClientApplication | null> {
      const row = rows.find((candidate) => candidate.id === id);
      if (!row) return null;
      row.photoStoragePath = file;
      return row;
    },
  };
}

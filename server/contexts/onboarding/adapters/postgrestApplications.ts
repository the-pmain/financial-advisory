import type { ClientApplication } from "@domain/onboarding/model.ts";
import { emptyDocuments } from "../../../../src/js/clients-documents-model.js";
import { postgrest } from "../../../platform/postgrest.ts";
import type { ApplicationRepository } from "../ports.ts";

/** Live table name, including the schema spelling. */
const TABLE = "clients_applicatitons";
/**
 * Every column rather than a list: `photo_storage_path` only exists once
 * `supabase/client-portraits.sql` has run, and naming a column PostgREST
 * cannot find fails the whole read. Absent reads as no portrait.
 */
const SELECT = "*";
const ORDER = "order=created_at.desc,id.desc";

type Row = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  instructed_person_slug: string | null;
  photo_storage_path?: string | null;
};

function literal(value: string): string {
  return value.replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_");
}

function toApplication(row: Row): ClientApplication {
  return {
    id: row.id,
    createdAt: row.created_at,
    name: row.name,
    email: row.email,
    phone: row.phone,
    instructedPersonSlug: row.instructed_person_slug,
    registered: false,
    portalAccount: null,
    photoStoragePath: row.photo_storage_path ?? null,
    documents: emptyDocuments(),
  };
}

export function postgrestApplications(): ApplicationRepository {
  return {
    async listAll(): Promise<ClientApplication[]> {
      const rows = await postgrest<Row[]>(`/${TABLE}?select=${SELECT}&${ORDER}`);
      return rows.map(toApplication);
    },

    async listForEmployee(slug: string): Promise<ClientApplication[]> {
      const rows = await postgrest<Row[]>(
        `/${TABLE}?instructed_person_slug=eq.${encodeURIComponent(slug)}&select=${SELECT}&${ORDER}`,
      );
      return rows.map(toApplication);
    },

    async find(id: string): Promise<ClientApplication | null> {
      const needle = id.trim();
      // PostgREST 400s a non-uuid `id=eq=...` on this table; that is a miss, not an outage.
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(needle)) {
        return null;
      }
      const rows = await postgrest<Row[]>(
        `/${TABLE}?id=eq.${encodeURIComponent(needle)}&select=${SELECT}&limit=1`,
      );
      return rows[0] ? toApplication(rows[0]) : null;
    },

    async findByEmail(email: string): Promise<ClientApplication | null> {
      const needle = email.trim().toLowerCase();
      if (!needle) return null;
      const rows = await postgrest<Row[]>(
        `/${TABLE}?email=ilike.${encodeURIComponent(literal(needle))}&select=${SELECT}&${ORDER}&limit=1`,
      );
      return rows[0] ? toApplication(rows[0]) : null;
    },

    async findNameByEmail(email: string): Promise<string | null> {
      const needle = email.trim().toLowerCase();
      if (!needle) return null;
      const rows = await postgrest<Array<{ name: string }>>(
        `/${TABLE}?email=ilike.${encodeURIComponent(literal(needle))}&select=name&${ORDER}&limit=1`,
      );
      return rows[0]?.name?.trim() || null;
    },

    async setPhotoPath(id: string, file: string): Promise<ClientApplication | null> {
      const rows = await postgrest<Row[]>(`/${TABLE}?id=eq.${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: JSON.stringify({ photo_storage_path: file }),
      });
      return rows[0] ? toApplication(rows[0]) : null;
    },
  };
}

import { Router, type Request, type Response } from "express";
import { company } from "../src/data/company.ts";
import type { ClientApplication, EmployeeOption, PortalAccount } from "../src/employees/types.ts";
import { emptyDocuments, normalizeDocuments } from "../src/js/clients-documents-model.js";
import { valuesForCompose } from "../src/js/document-fields.js";
import { generateDocument } from "../src/js/document-generate.js";
import { buildDocumentRegister, feeEarnerLine } from "../src/js/document-register.js";
import { postgrest, supabaseConfigured } from "./postgrest.ts";
import type { AuthedRequest } from "./requireAuth.ts";
import type { SessionUser } from "./session.ts";

/** Live table name, including the schema spelling. */
const APPLICATIONS_TABLE = "clients_applicatitons";

type StoredEmployee = {
  id: string;
  slug: string;
  name: string;
  password: string;
  photo_storage_path?: string | null;
};

type DbEmployee = StoredEmployee;

type DbApplication = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  instructed_person_slug: string | null;
};

const memoryEmployees: StoredEmployee[] = [
  {
    id: "00000000-0000-4000-8000-000000000001",
    slug: "staff",
    name: "Demo Employee",
    password: "password12",
  },
];

const memoryApplications: ClientApplication[] = [
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
    },
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
    documents: emptyDocuments(),
  },
];

type DirectoryRow = {
  slug: string;
  name: string;
  role: string | null;
  photo_storage_path: string | null;
  sort_order?: number | null;
};

const PHOTO_FILE = /^[a-z0-9]+(?:-[a-z0-9]+)*\.png$/i;

export function employeePhotoUrl(file: string | null | undefined): string {
  if (!file || !PHOTO_FILE.test(file)) return "";
  return `/api/staff/photos/${encodeURIComponent(file)}`;
}

function toOption(row: DirectoryRow | StoredEmployee): EmployeeOption {
  const photoFile = "photo_storage_path" in row ? row.photo_storage_path : null;
  return {
    slug: row.slug,
    name: row.name,
    role: "role" in row && row.role ? row.role : "",
    photoUrl: employeePhotoUrl(photoFile),
  };
}

export async function listEmployeeDirectory(): Promise<EmployeeOption[]> {
  if (supabaseConfigured()) {
    const rows = await postgrest<DirectoryRow[]>(
      "/employees?select=slug,name,role,photo_storage_path,sort_order&order=sort_order.asc,name.asc",
    );
    return rows.map(toOption);
  }
  return memoryEmployees
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((row) => toOption({ slug: row.slug, name: row.name, role: "Adviser", photo_storage_path: null }));
}

async function fetchStoragePhoto(file: string): Promise<{ body: Buffer; contentType: string } | null> {
  const base = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !key) return null;

  const attempts = [
    { url: `${base}/storage/v1/object/public/employees/${file}`, auth: false },
    { url: `${base}/storage/v1/object/employees/${file}`, auth: true },
  ];

  for (const attempt of attempts) {
    const headers = new Headers();
    if (attempt.auth) {
      headers.set("apikey", key);
      headers.set("Authorization", `Bearer ${key}`);
    }
    const res = await fetch(attempt.url, { headers });
    if (!res.ok) continue;
    const contentType = res.headers.get("content-type") || "image/png";
    if (!contentType.startsWith("image/")) continue;
    return { body: Buffer.from(await res.arrayBuffer()), contentType };
  }
  return null;
}

export async function sendEmployeePhoto(req: Request, res: Response) {
  const file = String(req.params.file ?? "");
  if (!PHOTO_FILE.test(file)) {
    res.status(400).json({ error: "Invalid photo." });
    return;
  }

  try {
    const photo = await fetchStoragePhoto(file);
    if (!photo) {
      res.status(404).end();
      return;
    }
    res.setHeader("Content-Type", photo.contentType);
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(photo.body);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
}

function fromDbApplication(row: DbApplication): ClientApplication {
  return {
    id: row.id,
    createdAt: row.created_at,
    name: row.name,
    email: row.email,
    phone: row.phone,
    instructedPersonSlug: row.instructed_person_slug,
    registered: false,
    portalAccount: null,
    documents: emptyDocuments(),
  };
}

type DbPortalUser = {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
};

async function findPortalAccountsByEmail(emails: string[]): Promise<Map<string, PortalAccount>> {
  const unique = [...new Set(emails.map((email) => email.trim().toLowerCase()).filter(Boolean))];
  const accounts = new Map<string, PortalAccount>();
  if (unique.length === 0 || !supabaseConfigured()) return accounts;

  const filter = unique.map((email) => `email.eq.${encodeURIComponent(email)}`).join(",");
  const rows = await postgrest<DbPortalUser[]>(`/users?or=(${filter})&select=id,email,name,created_at`);
  for (const row of rows) {
    accounts.set(row.email.toLowerCase(), {
      id: row.id,
      email: row.email,
      name: row.name?.trim() || row.email,
      createdAt: row.created_at,
    });
  }
  return accounts;
}

async function withPortalStatus(rows: ClientApplication[]): Promise<ClientApplication[]> {
  if (!supabaseConfigured()) return rows;
  const accounts = await findPortalAccountsByEmail(rows.map((row) => row.email));
  return rows.map((row) => {
    const portalAccount = accounts.get(row.email.trim().toLowerCase()) ?? null;
    return { ...row, registered: Boolean(portalAccount), portalAccount };
  });
}

export function publicEmployee(employee: StoredEmployee): SessionUser {
  return {
    id: employee.id,
    email: "",
    name: employee.name,
    role: "employee",
    slug: employee.slug,
    photoUrl: employeePhotoUrl(employee.photo_storage_path) || employeePhotoUrl(`${employee.slug}.png`),
  };
}

export async function findEmployeeBySlug(slug: string): Promise<StoredEmployee | null> {
  if (supabaseConfigured()) {
    const escaped = slug.replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_");
    const rows = await postgrest<DbEmployee[]>(
      `/employees?slug=ilike.${encodeURIComponent(escaped)}&select=id,slug,name,password,photo_storage_path&limit=1`,
    );
    return rows[0] ?? null;
  }
  const needle = slug.toLowerCase();
  return memoryEmployees.find((row) => row.slug.toLowerCase() === needle) ?? null;
}

async function listApplicationsForSlug(slug: string): Promise<ClientApplication[]> {
  if (supabaseConfigured()) {
    const rows = await postgrest<DbApplication[]>(
      `/${APPLICATIONS_TABLE}?instructed_person_slug=eq.${encodeURIComponent(slug)}&select=id,created_at,name,email,phone,instructed_person_slug&order=created_at.desc,id.desc`,
    );
    return withPortalStatus(rows.map(fromDbApplication));
  }
  return withPortalStatus(memoryApplications.filter((row) => row.instructedPersonSlug === slug));
}

async function listClientsForSlug(slug: string): Promise<ClientApplication[]> {
  const registered = (await listApplicationsForSlug(slug)).filter(
    (row) => row.registered && row.portalAccount,
  );
  return attachClientDocuments(registered);
}

async function attachClientDocuments(rows: ClientApplication[]): Promise<ClientApplication[]> {
  if (rows.length === 0 || !supabaseConfigured()) {
    return rows.map((row) => ({ ...row, documents: row.documents ?? emptyDocuments() }));
  }
  const filter = rows.map((row) => row.id).join(",");
  const bags = await postgrest<Array<{ client_id: string; documents: unknown }>>(
    `/clients_documents?client_id=in.(${filter})&select=client_id,documents`,
  );
  const byClient = new Map(bags.map((row) => [row.client_id, normalizeDocuments(row.documents)]));
  return rows.map((row) => ({
    ...row,
    documents: byClient.get(row.id) ?? emptyDocuments(),
  }));
}

async function findAssignedClient(slug: string, clientId: string): Promise<ClientApplication | null> {
  const clients = await listClientsForSlug(slug);
  return clients.find((row) => row.id === clientId) ?? null;
}

export async function findApplicationByEmail(email: string): Promise<ClientApplication | null> {
  const needle = email.trim().toLowerCase();
  if (!needle) return null;

  if (supabaseConfigured()) {
    const escaped = needle.replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_");
    const rows = await postgrest<DbApplication[]>(
      `/${APPLICATIONS_TABLE}?email=ilike.${encodeURIComponent(escaped)}&select=id,created_at,name,email,phone,instructed_person_slug&order=created_at.desc,id.desc&limit=1`,
    );
    if (!rows[0]) return null;
    const [matched] = await attachClientDocuments(await withPortalStatus([fromDbApplication(rows[0])]));
    return matched ?? null;
  }

  return memoryApplications.find((row) => row.email.toLowerCase() === needle) ?? null;
}

export async function findClientNameByEmail(email: string): Promise<string | null> {
  const needle = email.trim().toLowerCase();
  if (!needle) return null;

  if (supabaseConfigured()) {
    const escaped = needle.replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_");
    const rows = await postgrest<Array<{ name: string }>>(
      `/${APPLICATIONS_TABLE}?email=ilike.${encodeURIComponent(escaped)}&select=name&order=created_at.desc,id.desc&limit=1`,
    );
    const name = rows[0]?.name?.trim() ?? "";
    return name || null;
  }

  return memoryApplications.find((row) => row.email.toLowerCase() === needle)?.name.trim() || null;
}

export async function loadClientAgreementPdf(client: ClientApplication, people: EmployeeOption[]) {
  const register = buildDocumentRegister({
    company,
    teamMembers: people.map((person) => ({ slug: person.slug, name: person.name, role: person.role })),
    instructedSlug: client.instructedPersonSlug,
  });
  const live = {
    ...register,
    feeEarner: feeEarnerLine(register.people, client.instructedPersonSlug),
  };
  const values = valuesForCompose(
    "agreement",
    {
      name: client.name,
      email: client.email,
      phone: client.phone,
      created_at: client.createdAt,
      instructed_person_slug: client.instructedPersonSlug,
      consent: false,
    },
    client.documents,
    live,
  );
  const result = await generateDocument("agreement", values, {
    register: live,
    people: live.people,
  });
  return { bytes: result.bytes, filename: result.filename };
}

export const employeesRouter = Router();

employeesRouter.get("/applications", async (req, res) => {
  try {
    const user = (req as AuthedRequest).user;
    const slug = user.slug;
    if (user.role !== "employee" || !slug) {
      res.status(403).json({ error: "Employee access required." });
      return;
    }

    res.json(await listApplicationsForSlug(slug));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load applications." });
  }
});

employeesRouter.get("/clients", async (req, res) => {
  try {
    const user = (req as AuthedRequest).user;
    const slug = user.slug;
    if (user.role !== "employee" || !slug) {
      res.status(403).json({ error: "Employee access required." });
      return;
    }

    res.json(await listClientsForSlug(slug));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load clients." });
  }
});

employeesRouter.get("/clients/:clientId/documents/agreement", async (req, res) => {
  try {
    const user = (req as AuthedRequest).user;
    const slug = user.slug;
    if (user.role !== "employee" || !slug) {
      res.status(403).json({ error: "Employee access required." });
      return;
    }

    const client = await findAssignedClient(slug, String(req.params.clientId ?? ""));
    if (!client) {
      res.status(404).json({ error: "That client record could not be found." });
      return;
    }

    const people = await listEmployeeDirectory();
    const packed = await loadClientAgreementPdf(client, people);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${packed.filename}"`);
    res.send(Buffer.from(packed.bytes));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not prepare the client agreement." });
  }
});

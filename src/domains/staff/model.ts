/**
 * Staff: the people who advise clients.
 *
 * A slug is the handle an employee signs in with and the key every client
 * application is filed against, so it never changes once the row exists.
 */

import type { ClientSummary } from "../onboarding/model.ts";
import type { Paged } from "../shared/page.ts";

/** What anyone signing in or reading the directory may see. */
export type EmployeeProfile = {
  slug: string;
  name: string;
  role: string;
  photoUrl: string;
};

/** The console view. Never carries the password. */
export type EmployeeAccount = EmployeeProfile & {
  id: string;
  sortOrder: number | null;
};

/** An employee with the book of clients instructed to them. */
export type EmployeeAccountWithClients = EmployeeAccount & {
  clients: ClientSummary[];
};

/**
 * The same pairing read from the other end, for the console's client list.
 * `adviser` is null when nobody is instructed, or when the slug on the
 * application matches no staff row — which is a thing a super admin should see.
 */
export type ClientWithAdviser = ClientSummary & {
  adviser: EmployeeProfile | null;
};

/** The groups the console's client list is read in. */
export const CLIENT_FILTERS = ["all", "registered", "pending", "unassigned"] as const;

export type ClientFilter = (typeof CLIENT_FILTERS)[number];

export function parseClientFilter(value: unknown): ClientFilter {
  const given = String(value ?? "").trim();
  return (CLIENT_FILTERS as readonly string[]).includes(given) ? (given as ClientFilter) : "all";
}

/**
 * One definition of each group, so the tab a super admin clicks and the page
 * the server cuts cannot drift apart. `registered` and `adviser` are joined on
 * from other contexts, which is why this is a predicate and not a query.
 */
export function matchesClientFilter(filter: ClientFilter, client: ClientWithAdviser): boolean {
  if (filter === "registered") return client.registered;
  if (filter === "pending") return !client.registered;
  if (filter === "unassigned") return client.adviser === null;
  return true;
}

export type ClientTotals = Record<ClientFilter, number>;

export function countClientFilters(clients: readonly ClientWithAdviser[]): ClientTotals {
  const totals = { all: 0, registered: 0, pending: 0, unassigned: 0 } as ClientTotals;
  for (const filter of CLIENT_FILTERS) {
    totals[filter] = clients.filter((client) => matchesClientFilter(filter, client)).length;
  }
  return totals;
}

/** What `GET /api/admin/clients` answers with. */
export type ClientPage = Paged<ClientWithAdviser> & {
  status: ClientFilter;
  /** Every group's size, so the tabs count the book and not the page. */
  totals: ClientTotals;
};

export type EmployeeAccountPatch = {
  name?: string;
  role?: string;
  sortOrder?: number | null;
  password?: string;
};

export const EMPLOYEE_NAME_MAX = 120;
export const EMPLOYEE_ROLE_MAX = 120;
export const EMPLOYEE_SORT_ORDER_MAX = 9999;
export const EMPLOYEE_PASSWORD_MIN = 8;

type ParseResult = { ok: true; value: EmployeeAccountPatch } | { ok: false; error: string };

/** One rule set for the edit form and the API, so both refuse the same input. */
export function parseEmployeeAccountPatch(input: unknown): ParseResult {
  const raw = (input ?? {}) as Record<string, unknown>;
  const patch: EmployeeAccountPatch = {};

  if (raw.name !== undefined) {
    const name = String(raw.name).trim();
    if (!name || name.length > EMPLOYEE_NAME_MAX) {
      return { ok: false, error: `Enter a name of 1 to ${EMPLOYEE_NAME_MAX} characters.` };
    }
    patch.name = name;
  }

  if (raw.role !== undefined) {
    const role = String(raw.role).trim();
    if (role.length > EMPLOYEE_ROLE_MAX) {
      return { ok: false, error: `Enter a role of up to ${EMPLOYEE_ROLE_MAX} characters.` };
    }
    patch.role = role;
  }

  if (raw.sortOrder !== undefined) {
    if (raw.sortOrder === null || String(raw.sortOrder).trim() === "") {
      patch.sortOrder = null;
    } else {
      const order = Number(raw.sortOrder);
      if (!Number.isInteger(order) || order < 0 || order > EMPLOYEE_SORT_ORDER_MAX) {
        return { ok: false, error: `Enter a sort order between 0 and ${EMPLOYEE_SORT_ORDER_MAX}.` };
      }
      patch.sortOrder = order;
    }
  }

  if (raw.password !== undefined && String(raw.password) !== "") {
    const password = String(raw.password);
    if (password.length < EMPLOYEE_PASSWORD_MIN) {
      return { ok: false, error: `The password needs at least ${EMPLOYEE_PASSWORD_MIN} characters.` };
    }
    patch.password = password;
  }

  if (Object.keys(patch).length === 0) {
    return { ok: false, error: "Nothing to update." };
  }
  return { ok: true, value: patch };
}

const PHOTO_FILE = /^[a-z0-9]+(?:-[a-z0-9]+)*\.png$/i;

export function isPhotoFile(file: string): boolean {
  return PHOTO_FILE.test(file);
}

export function photoFileStem(slug: string): string {
  const stem = slug
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return stem || "staff";
}

/** A fresh name per save: the photo route is cached for a day. */
export function nextPhotoFile(slug: string, at: number = Date.now()): string {
  return `${photoFileStem(slug)}-${at}.png`;
}

/** The name portraits sat under before `photo_storage_path` existed. */
export function conventionPhotoFile(slug: string): string {
  return `${photoFileStem(slug)}.png`;
}

export function photoUrl(file: string | null | undefined): string {
  if (!file || !isPhotoFile(file)) return "";
  return `/api/staff/photos/${encodeURIComponent(file)}`;
}

/**
 * Null means the column was never filled, so fall back to the convention.
 * An empty string means a super admin cleared the portrait on purpose.
 */
export function photoUrlFor(slug: string, storagePath: string | null | undefined): string {
  if (storagePath === "") return "";
  return photoUrl(storagePath) || photoUrl(conventionPhotoFile(slug));
}

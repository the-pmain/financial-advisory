import type { EmployeeAccount, EmployeeAccountPatch, EmployeeProfile } from "@domain/staff/model.ts";

/**
 * A row with the secret still on it. It never leaves this context: callers get
 * an `EmployeeAccount` or an `EmployeeProfile` instead.
 */
export type EmployeeRecord = {
  id: string;
  slug: string;
  name: string;
  role: string;
  password: string;
  photoStoragePath: string | null;
  sortOrder: number | null;
};

export type EmployeeRepository = {
  /** Directory order: sort_order first, then name. */
  listProfiles(): Promise<EmployeeProfile[]>;
  listAccounts(): Promise<EmployeeAccount[]>;
  /** Sign-in lookup, case insensitive because the handle is typed by hand. */
  findForLogin(slug: string): Promise<EmployeeRecord | null>;
  find(slug: string): Promise<EmployeeRecord | null>;
  update(slug: string, patch: EmployeeAccountPatch): Promise<EmployeeAccount | null>;
  setPhotoPath(slug: string, file: string): Promise<EmployeeAccount | null>;
  remove(slug: string): Promise<boolean>;
};

export type StoredPhoto = {
  body: Buffer;
  contentType: string;
};

export type PhotoStore = {
  read(file: string): Promise<StoredPhoto | null>;
  /** Throws when the store refuses, so a half-saved portrait is never recorded. */
  write(file: string, body: Buffer): Promise<void>;
  /** Best effort: a stale object is untidy, not a failure worth showing. */
  remove(file: string): Promise<void>;
};

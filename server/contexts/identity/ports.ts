import type { PortalAccount } from "@domain/onboarding/model.ts";
import type { EmployeeRecord } from "../staff/ports.ts";

/** A portal account with the password still on it. Never published. */
export type AccountRecord = {
  id: string;
  email: string;
  name: string;
  password: string;
  /** Object name in the private `clients` bucket. Null until someone sets a picture. */
  photoStoragePath: string | null;
};

export type AccountRepository = {
  findByEmail(email: string): Promise<AccountRecord | null>;
  insert(account: Omit<AccountRecord, "id" | "photoStoragePath">): Promise<AccountRecord>;
  setPhotoPath(email: string, file: string): Promise<void>;
};

/** Who among these emails holds a portal account. Read by onboarding. */
export type PortalAccountDirectory = {
  findByEmails(emails: string[]): Promise<Map<string, PortalAccount>>;
};

/**
 * Staff own their credentials, so identity asks rather than reading them:
 * a slug and password in, the employee they belong to out.
 */
export type StaffAuthenticator = {
  authenticate(slug: string, password: string): Promise<EmployeeRecord | null>;
};

/** The name to greet a client by when their own account carries none. */
export type ClientNameLookup = {
  nameForEmail(email: string): Promise<string | null>;
};

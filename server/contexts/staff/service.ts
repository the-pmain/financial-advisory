import {
  conventionPhotoFile,
  isPhotoFile,
  nextPhotoFile,
  type EmployeeAccount,
  type EmployeeAccountPatch,
  type EmployeeProfile,
} from "@domain/staff/model.ts";
import { invalid, notFound, unavailable } from "../../platform/errors.ts";
import { secretsMatch } from "../../platform/secrets.ts";
import type { EmployeeRecord, EmployeeRepository, PhotoStore, StoredPhoto } from "./ports.ts";

export type StaffService = ReturnType<typeof createStaffService>;

export function createStaffService(deps: { employees: EmployeeRepository; photos: PhotoStore }) {
  const { employees, photos } = deps;

  const MISSING = "That staff record could not be found.";

  function requireAccount(updated: EmployeeAccount | null): EmployeeAccount {
    if (!updated) throw notFound(MISSING);
    return updated;
  }

  return {
    directory(): Promise<EmployeeProfile[]> {
      return employees.listProfiles();
    },

    accounts(): Promise<EmployeeAccount[]> {
      return employees.listAccounts();
    },

    /**
     * The column as stored, for the console. Sessions and the staff list
     * never carry this; only `GET /api/admin/employees/:slug/password` does.
     */
    async passwordFor(slug: string): Promise<string> {
      const record = await employees.find(slug);
      if (!record) throw notFound(MISSING);
      return record.password;
    },

    /** The one place a stored staff password is checked for sign-in. */
    async authenticate(slug: string, password: string): Promise<EmployeeRecord | null> {
      const record = await employees.findForLogin(slug);
      if (!record || !secretsMatch(record.password, password)) return null;
      return record;
    },

    async update(slug: string, patch: EmployeeAccountPatch): Promise<EmployeeAccount> {
      return requireAccount(await employees.update(slug, patch));
    },

    async remove(slug: string): Promise<void> {
      if (!(await employees.remove(slug))) {
        throw notFound(MISSING);
      }
    },

    readPhoto(file: string): Promise<StoredPhoto | null> {
      if (!isPhotoFile(file)) throw invalid("Invalid photo.");
      return photos.read(file);
    },

    /**
     * Each save takes a fresh filename so the day-long photo cache cannot serve
     * the old face, and the file it replaces goes afterwards.
     */
    async replacePhoto(slug: string, png: Buffer): Promise<EmployeeAccount> {
      const current = await employees.find(slug);
      if (!current) throw notFound(MISSING);
      const previous = current.photoStoragePath;

      const file = nextPhotoFile(slug);
      try {
        await photos.write(file, png);
      } catch (err) {
        console.error(err);
        throw unavailable("The photo store rejected this upload.");
      }

      const saved = requireAccount(await employees.setPhotoPath(slug, file));
      if (previous && previous !== file) await photos.remove(previous);
      return saved;
    },

    /** An empty path is the record of a portrait taken away; null would fall back. */
    async clearPhoto(slug: string): Promise<EmployeeAccount> {
      const current = await employees.find(slug);
      if (!current) throw notFound(MISSING);
      const previous = current.photoStoragePath;

      const cleared = requireAccount(await employees.setPhotoPath(slug, ""));
      if (previous) await photos.remove(previous);
      await photos.remove(conventionPhotoFile(slug));
      return cleared;
    },
  };
}
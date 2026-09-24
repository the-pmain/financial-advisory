import { isPortraitType, portraitExtension, sniffPortrait } from "@domain/shared/photo.ts";
import { emptyDocuments } from "../../../src/js/clients-documents-model.js";
import {
  isClientPhotoFile,
  nextClientPhotoFile,
  withAccountPortrait,
  type ClientApplication,
} from "@domain/onboarding/model.ts";
import { invalid, notFound, unavailable } from "../../platform/errors.ts";
import type { FiledDocumentsRepository } from "../documents/ports.ts";
import type { PortalAccountDirectory } from "../identity/ports.ts";
import type { ApplicationRepository, PhotoStore, StoredPhoto } from "./ports.ts";

export type OnboardingService = ReturnType<typeof createOnboardingService>;

const NO_CLIENT = "That client record could not be found.";

/**
 * An application is onboarding's own record. Whether the person also holds a
 * portal account is identity's answer, and what they have filed is the
 * documents context's, so both arrive through ports.
 */
export function createOnboardingService(deps: {
  applications: ApplicationRepository;
  accounts: PortalAccountDirectory;
  documents: FiledDocumentsRepository;
  photos: PhotoStore;
}) {
  const { applications, accounts, documents, photos } = deps;

  async function withPortalStatus(rows: ClientApplication[]): Promise<ClientApplication[]> {
    if (rows.length === 0) return rows;
    const held = await accounts.findByEmails(rows.map((row) => row.email));
    return rows.map((row) => {
      const portalAccount = held.get(row.email.trim().toLowerCase());
      // Only ever an upgrade, so a seeded registration is not undone by a miss.
      return portalAccount ? withAccountPortrait(row, portalAccount) : row;
    });
  }

  async function withFiledDocuments(rows: ClientApplication[]): Promise<ClientApplication[]> {
    if (rows.length === 0) return rows;
    const filed = await documents.findForClients(rows.map((row) => row.id));
    return rows.map((row) => ({
      ...row,
      documents: filed.get(row.id) ?? row.documents ?? emptyDocuments(),
    }));
  }

  /** Every application in one pass, so the console does not fan out per employee. */
  async function all(): Promise<ClientApplication[]> {
    return withFiledDocuments(await withPortalStatus(await applications.listAll()));
  }

  /** The employee applications list: portal status only, no document bags. */
  async function applicationsFor(slug: string): Promise<ClientApplication[]> {
    return withPortalStatus(await applications.listForEmployee(slug));
  }

  /** A client is an application whose person signed up for the portal. */
  async function clientsFor(slug: string): Promise<ClientApplication[]> {
    const registered = (await applicationsFor(slug)).filter((row) => row.registered && row.portalAccount);
    return withFiledDocuments(registered);
  }

  /** One application, joined the same way the list is. */
  async function find(id: string): Promise<ClientApplication> {
    const found = await applications.find(id);
    if (!found) throw notFound(NO_CLIENT);
    const [joined] = await withFiledDocuments(await withPortalStatus([found]));
    return joined ?? found;
  }

  return {
    all,
    applicationsFor,
    clientsFor,
    find,

    async clientFor(slug: string, clientId: string): Promise<ClientApplication> {
      const client = (await clientsFor(slug)).find((row) => row.id === clientId);
      if (!client) throw notFound(NO_CLIENT);
      return client;
    },

    /** Portraits are read by file name, so the name has to be a safe one. */
    async readPhoto(file: string): Promise<StoredPhoto | null> {
      if (!isClientPhotoFile(file)) return null;
      return photos.read(file);
    },

    /**
     * A fresh object name each time, because the portrait route is cached.
     * The row only learns the new name once the bytes are safely stored.
     */
    async replacePhoto(id: string, body: Buffer, contentType: string): Promise<ClientApplication> {
      const current = await applications.find(id);
      if (!current) throw notFound(NO_CLIENT);
      const sniffed = sniffPortrait(body);
      if (!sniffed || !isPortraitType(contentType) || sniffed !== contentType) {
        throw invalid("That file is not a readable image.");
      }

      const file = nextClientPhotoFile(id, Date.now(), portraitExtension(sniffed));
      await photos.write(file, body, sniffed);

      const saved = await applications.setPhotoPath(id, file);
      if (!saved) throw unavailable("Could not save this picture.");

      const previous = current.photoStoragePath;
      if (previous && previous !== file) await photos.remove(previous);

      return find(id);
    },

    async findByEmail(email: string): Promise<ClientApplication | null> {
      const found = await applications.findByEmail(email);
      if (!found) return null;
      const [joined] = await withFiledDocuments(await withPortalStatus([found]));
      return joined ?? null;
    },

    /** The name a client should be greeted by when their account has none. */
    nameForEmail(email: string): Promise<string | null> {
      return applications.findNameByEmail(email);
    },
  };
}

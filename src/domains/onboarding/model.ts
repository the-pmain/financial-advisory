/**
 * Onboarding: a person applies, is instructed to an employee, and may later
 * hold a portal account.
 *
 * The table behind this is `clients_applicatitons`. The spelling is live.
 */

import { DOCUMENT_KINDS, type DocumentsMap } from "../../js/clients-documents-model.js";
import { isPortraitName, type PortraitExtension } from "../shared/photo.ts";

export type PortalAccount = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  /** Object name in the private `clients` bucket. Null until someone sets a picture. */
  photoStoragePath: string | null;
};

export type ClientApplication = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  instructedPersonSlug: string | null;
  registered: boolean;
  portalAccount: PortalAccount | null;
  /**
   * Object name in the private `clients` bucket. On a registered person this
   * is the account portrait; otherwise the application one.
   */
  photoStoragePath: string | null;
  documents: DocumentsMap;
};

/**
 * What the admin console is allowed to see: the same client, with each
 * document bag collapsed to the day it was filed, and the portrait as a URL
 * instead of a storage path. Field values stay server side.
 */
export type ClientSummary = Omit<ClientApplication, "documents" | "photoStoragePath"> & {
  documents: { [K in keyof DocumentsMap]: string | null };
  photoUrl: string;
};

const KINDS = DOCUMENT_KINDS as readonly (keyof DocumentsMap)[];

export function isClientPhotoFile(file: string): boolean {
  return isPortraitName(file);
}

/** A fresh name per save: the portrait route is cached for a day. The extension is the file's own. */
export function nextClientPhotoFile(
  id: string,
  at: number = Date.now(),
  extension: PortraitExtension = "png",
): string {
  const stem = id.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${stem || "client"}-${at}.${extension}`;
}

/**
 * Client portraits are not public the way the staff directory is, so they are
 * served from the console behind the admin guard rather than from `/api/staff`.
 */
export function clientPhotoUrl(file: string | null | undefined): string {
  if (!file || !isClientPhotoFile(file)) return "";
  return `/api/admin/clients/photos/${encodeURIComponent(file)}`;
}

/**
 * A signed-up client keeps their picture on `public.clients`. An applicant
 * who never opened an account still has only the application row.
 */
export function withAccountPortrait(
  application: ClientApplication,
  account: PortalAccount | null | undefined,
): ClientApplication {
  if (!account) return application;
  return {
    ...application,
    registered: true,
    portalAccount: account,
    photoStoragePath: account.photoStoragePath ?? application.photoStoragePath,
  };
}

/** The console lists what is on file, not what is in it. */
export function toClientSummary(client: ClientApplication): ClientSummary {
  const documents = {} as ClientSummary["documents"];
  for (const kind of KINDS) {
    documents[kind] = client.documents?.[kind]?.saved_at ?? null;
  }
  const { photoStoragePath, ...rest } = client;
  return { ...rest, documents, photoUrl: clientPhotoUrl(photoStoragePath) };
}

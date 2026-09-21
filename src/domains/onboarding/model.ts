/**
 * Onboarding: a person applies, is instructed to an employee, and may later
 * hold a portal account.
 *
 * The table behind this is `clients_applicatitons`. The spelling is live.
 */

import { DOCUMENT_KINDS, type DocumentsMap } from "../../js/clients-documents-model.js";

export type PortalAccount = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
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
  /** Object name in the portraits bucket. Null until someone sets a picture. */
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

const PHOTO_FILE = /^[a-z0-9]+(?:-[a-z0-9]+)*\.png$/i;

export function isClientPhotoFile(file: string): boolean {
  return PHOTO_FILE.test(file);
}

/** A fresh name per save: the portrait route is cached for a day. */
export function nextClientPhotoFile(id: string, at: number = Date.now()): string {
  const stem = id.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${stem || "client"}-${at}.png`;
}

/**
 * Client portraits are not public the way the staff directory is, so they are
 * served from the console behind the admin guard rather than from `/api/staff`.
 */
export function clientPhotoUrl(file: string | null | undefined): string {
  if (!file || !isClientPhotoFile(file)) return "";
  return `/api/admin/clients/photos/${encodeURIComponent(file)}`;
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

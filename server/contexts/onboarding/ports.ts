import type { ClientApplication } from "@domain/onboarding/model.ts";

/**
 * Applications as they are stored, before the portal account and the filed
 * documents are joined on: `registered` is false and `documents` is empty.
 */
export type ApplicationRepository = {
  listAll(): Promise<ClientApplication[]>;
  listForEmployee(slug: string): Promise<ClientApplication[]>;
  find(id: string): Promise<ClientApplication | null>;
  findByEmail(email: string): Promise<ClientApplication | null>;
  findNameByEmail(email: string): Promise<string | null>;
  setPhotoPath(id: string, file: string): Promise<ClientApplication | null>;
};

export type StoredPhoto = {
  body: Buffer;
  contentType: string;
};

/** Client portraits. A separate bucket from staff: these are not public. */
export type PhotoStore = {
  read(file: string): Promise<StoredPhoto | null>;
  /** Throws when the store refuses, so a half-saved portrait is never recorded. */
  write(file: string, body: Buffer, contentType: string): Promise<void>;
  /** Best effort: a stale object is untidy, not a failure worth showing. */
  remove(file: string): Promise<void>;
};

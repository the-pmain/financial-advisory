export type EmployeeOption = {
  slug: string;
  name: string;
  role: string;
  photoUrl: string;
};

export type PortalAccount = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

import type { DocumentsMap } from "../js/clients-documents-model.js";

export type ClientApplication = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  instructedPersonSlug: string | null;
  registered: boolean;
  portalAccount: PortalAccount | null;
  documents: DocumentsMap;
};

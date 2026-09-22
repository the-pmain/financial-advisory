/**
 * Compose-from-form for firm PDFs.
 *
 * The UI hydrates, mocks, previews, and saves through this module. Rules stay
 * in `src/js`; pages never import the engine.
 */

import type { DocumentsMap } from "../../js/clients-documents-model.js";
import {
  emptyDocuments,
  kindSaved,
  mergeKind,
  sanitizeFields,
} from "../../js/clients-documents-model.js";
import {
  applyDerivedFields,
  DOCUMENT_FIELD_GROUPS,
  fieldsForKindDef,
  fieldsForSave,
  showWhenMatches,
  valuesForCompose,
} from "../../js/document-fields.js";
import { generateDocument } from "../../js/document-generate.js";
import { applyDocumentMock } from "../../js/document-mocks.js";
import type { ClientApplication } from "../onboarding/model.ts";
import type { EmployeeProfile } from "../staff/model.ts";
import { clientRecordForAgreement, registerForClient } from "./agreement.ts";

export const EMPLOYEE_COMPOSE_KINDS = ["p2p"] as const;

export type ComposeKind = (typeof EMPLOYEE_COMPOSE_KINDS)[number];

export function isEmployeeComposeKind(kind: string): kind is ComposeKind {
  return (EMPLOYEE_COMPOSE_KINDS as readonly string[]).includes(kind);
}

export function composeSeedKey(clientId: string, kind: string, documents: DocumentsMap | null | undefined) {
  return `${clientId}:${kind}:${kindSaved(documents, kind) ? "saved" : "new"}`;
}

export function hydrateCompose(
  kind: string,
  client: ClientApplication,
  people: EmployeeProfile[],
): Record<string, string> {
  return valuesForCompose(
    kind,
    clientRecordForAgreement(client),
    client.documents ?? emptyDocuments(),
    registerForClient(client, people),
  );
}

export function mockComposeValues(kind: string, current: Record<string, string>): Record<string, string> {
  return applyDocumentMock(kind, current);
}

export function deriveComposeValues(
  kind: string,
  values: Record<string, string>,
  changed: string,
): Record<string, string> {
  return applyDerivedFields(kind, values, changed);
}

export function saveFieldsForCompose(
  kind: string,
  values: Record<string, string>,
  client: ClientApplication,
  people: EmployeeProfile[],
): Record<string, string> {
  return fieldsForSave(kind, values, registerForClient(client, people));
}

export async function previewCompose(
  kind: string,
  values: Record<string, string>,
  client: ClientApplication,
  people: EmployeeProfile[],
): Promise<{ bytes: Uint8Array; filename: string }> {
  const register = registerForClient(client, people);
  const payload = fieldsForSave(kind, values, register);
  const result = await generateDocument(kind, payload, { register, people: register.people });
  return { bytes: result.bytes, filename: result.filename };
}

export {
  DOCUMENT_FIELD_GROUPS,
  fieldsForKindDef,
  fieldsForSave,
  kindSaved,
  mergeKind,
  sanitizeFields,
  showWhenMatches,
  valuesForCompose,
};

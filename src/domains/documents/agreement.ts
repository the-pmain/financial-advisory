/**
 * Firm PDFs.
 *
 * The engine that draws them lives in `src/js` and speaks its own field names.
 * This module is the only way in, so nothing else has to learn them, and the
 * browser and the API build the same document from the same client record.
 */

import { company } from "../../data/company.ts";
import type { DocumentsMap } from "../../js/clients-documents-model.js";
import { emptyDocuments } from "../../js/clients-documents-model.js";
import { valuesForCompose } from "../../js/document-fields.js";
import { generateDocument } from "../../js/document-generate.js";
import { buildDocumentRegister } from "../../js/document-register.js";
import type { ClientApplication } from "../onboarding/model.ts";
import type { EmployeeProfile } from "../staff/model.ts";

export function emptyClientDocuments(): DocumentsMap {
  return emptyDocuments();
}

export function registerForClient(client: ClientApplication, people: EmployeeProfile[]) {
  return buildDocumentRegister({
    company,
    teamMembers: people.map((person) => ({
      slug: person.slug,
      name: person.name,
      role: person.role,
    })),
    instructedSlug: client.instructedPersonSlug,
  });
}

export function clientRecordForAgreement(client: ClientApplication) {
  return {
    name: client.name,
    email: client.email,
    phone: client.phone,
    created_at: client.createdAt,
    instructed_person_slug: client.instructedPersonSlug,
    consent: false,
  };
}

export async function prepareClientAgreement(
  client: ClientApplication,
  people: EmployeeProfile[],
): Promise<{ bytes: Uint8Array; filename: string }> {
  const register = registerForClient(client, people);
  const values = valuesForCompose(
    "agreement",
    clientRecordForAgreement(client),
    client.documents ?? emptyDocuments(),
    register,
  );
  const result = await generateDocument("agreement", values, {
    register,
    people: register.people,
  });
  return { bytes: result.bytes, filename: result.filename };
}

import { company } from "../data/company.ts";
import type { DocumentsMap } from "../js/clients-documents-model.js";
import { emptyDocuments } from "../js/clients-documents-model.js";
import { valuesForCompose } from "../js/document-fields.js";
import { generateDocument } from "../js/document-generate.js";
import { buildDocumentRegister } from "../js/document-register.js";
import type { ClientApplication, EmployeeOption } from "./types.ts";

export function emptyClientDocuments(): DocumentsMap {
  return emptyDocuments();
}

export function registerForClient(client: ClientApplication, people: EmployeeOption[]) {
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

export async function prepareClientAgreement(client: ClientApplication, people: EmployeeOption[]) {
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

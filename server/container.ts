/**
 * Composition root.
 *
 * The only file that knows whether this process talks to Supabase or to memory.
 * Every context is handed its adapters here and never reads the environment
 * again, so a service can be built against a fake in one line.
 */

import { memoryFiledDocuments } from "./contexts/documents/adapters/memoryFiledDocuments.ts";
import { postgrestFiledDocuments } from "./contexts/documents/adapters/postgrestFiledDocuments.ts";
import { createDocumentsService, type DocumentsService } from "./contexts/documents/service.ts";
import { memoryAccounts } from "./contexts/identity/adapters/memoryAccounts.ts";
import { postgrestAccounts } from "./contexts/identity/adapters/postgrestAccounts.ts";
import { createIdentityService, type IdentityService } from "./contexts/identity/service.ts";
import { memoryApplications } from "./contexts/onboarding/adapters/memoryApplications.ts";
import { memoryClientPhotos } from "./contexts/onboarding/adapters/memoryClientPhotos.ts";
import { postgrestApplications } from "./contexts/onboarding/adapters/postgrestApplications.ts";
import { supabaseClientPhotos } from "./contexts/onboarding/adapters/supabaseClientPhotos.ts";
import { createOnboardingService, type OnboardingService } from "./contexts/onboarding/service.ts";
import { memoryEmployees } from "./contexts/staff/adapters/memoryEmployees.ts";
import { memoryPhotoStore } from "./contexts/staff/adapters/memoryPhotoStore.ts";
import { postgrestEmployees } from "./contexts/staff/adapters/postgrestEmployees.ts";
import { supabasePhotoStore } from "./contexts/staff/adapters/supabasePhotoStore.ts";
import { createStaffService, type StaffService } from "./contexts/staff/service.ts";
import { supabaseAccess } from "./platform/supabase.ts";

export type Container = {
  store: "supabase" | "memory";
  identity: IdentityService;
  staff: StaffService;
  onboarding: OnboardingService;
  documents: DocumentsService;
};

export function buildContainer(): Container {
  const access = supabaseAccess();

  const employees = access ? postgrestEmployees() : memoryEmployees();
  const photos = access ? supabasePhotoStore(access) : memoryPhotoStore();
  const accounts = access ? postgrestAccounts() : memoryAccounts();
  const applications = access ? postgrestApplications() : memoryApplications();
  const clientPhotos = access ? supabaseClientPhotos(access) : memoryClientPhotos();
  const filedDocuments = access ? postgrestFiledDocuments() : memoryFiledDocuments();

  const staff = createStaffService({ employees, photos });
  const onboarding = createOnboardingService({
    applications,
    accounts,
    documents: filedDocuments,
    photos: clientPhotos,
  });
  const documents = createDocumentsService();
  // Identity reads staff credentials and client names through them, not their tables.
  const identity = createIdentityService({ accounts, staff, clientNames: onboarding });

  return { store: access ? "supabase" : "memory", identity, staff, onboarding, documents };
}

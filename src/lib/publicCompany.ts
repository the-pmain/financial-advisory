import { company } from '../data/company';

export type PublicCompanySource = 'gleif' | 'static';

/**
 * Legal identity a visitor can check against a public register.
 * Phone, FINMA supervision and marketing copy stay in `company`.
 */
export type PublicCompanyRecord = {
  source: PublicCompanySource;
  legalName: string;
  lei: string;
  leiStatus: string | null;
  entityStatus: string | null;
  leiRenewalDate: string | null;
  uid: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  addressLine: string;
  gleifUrl: string;
  uidRegisterUrl: string;
  updatedAt: string | null;
};

export function formatSwissUid(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 9) return value;
  return `CHE-${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
}

export function formatStatusLabel(value: string): string {
  const lower = value.replace(/_/g, ' ').toLowerCase();
  return lower.replace(/\b\w/g, (ch) => ch.toUpperCase());
}

export function formatAddressLine(
  street: string,
  postalCode: string,
  city: string,
  country: string,
): string {
  return `${street}, ${postalCode} ${city}, ${country}`;
}

/** Snapshot used until GLEIF responds, and if the request fails. */
export function staticCompanyRecord(): PublicCompanyRecord {
  return {
    source: 'static',
    legalName: company.legalName,
    lei: company.lei,
    leiStatus: null,
    entityStatus: null,
    leiRenewalDate: null,
    uid: company.uid,
    street: company.address.street,
    postalCode: company.address.postalCode,
    city: company.address.city,
    country: company.address.country,
    addressLine: company.address.line,
    gleifUrl: company.leiUrl,
    uidRegisterUrl: company.uidRegisterUrl,
    updatedAt: null,
  };
}

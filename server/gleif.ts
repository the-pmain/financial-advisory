import { company } from '../src/data/company.ts';
import {
  formatAddressLine,
  formatSwissUid,
  staticCompanyRecord,
  type PublicCompanyRecord,
} from '../src/lib/publicCompany.ts';

const GLEIF_URL = `https://api.gleif.org/api/v1/lei-records/${encodeURIComponent(company.lei)}`;
const CACHE_TTL_MS = 60 * 60 * 1000;

type GleifAddress = {
  addressLines?: string[] | null;
  city?: string | null;
  postalCode?: string | null;
  country?: string | null;
};

type GleifResponse = {
  meta?: { goldenCopy?: { publishDate?: string } };
  data?: {
    attributes?: {
      lei?: string;
      entity?: {
        legalName?: { name?: string };
        legalAddress?: GleifAddress;
        headquartersAddress?: GleifAddress;
        status?: string;
        registeredAs?: string;
      };
      registration?: {
        status?: string;
        nextRenewalDate?: string;
        lastUpdateDate?: string;
      };
    };
  };
};

type CacheEntry = { at: number; record: PublicCompanyRecord };

let cache: CacheEntry | null = null;
let inflight: Promise<PublicCompanyRecord> | null = null;

function isoDate(value: string | undefined): string | null {
  if (!value) return null;
  const day = value.slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(day) ? day : null;
}

function firstLine(address: GleifAddress | undefined): string | null {
  const line = address?.addressLines?.find((item) => item?.trim());
  return line?.trim() || null;
}

function mapGleif(data: GleifResponse): PublicCompanyRecord | null {
  const attrs = data.data?.attributes;
  const entity = attrs?.entity;
  const legalName = entity?.legalName?.name?.trim();
  const lei = attrs?.lei?.trim();
  if (!legalName || !lei) return null;

  const address = entity?.legalAddress ?? entity?.headquartersAddress;
  const street = firstLine(address) ?? company.address.street;
  const postalCode = address?.postalCode?.trim() || company.address.postalCode;
  const city = address?.city?.trim() || company.address.city;
  const country = company.address.country;
  const uid = formatSwissUid(entity?.registeredAs || company.uid);

  return {
    source: 'gleif',
    legalName,
    lei,
    leiStatus: attrs?.registration?.status?.trim() || null,
    entityStatus: entity?.status?.trim() || null,
    leiRenewalDate: isoDate(attrs?.registration?.nextRenewalDate),
    uid,
    street,
    postalCode,
    city,
    country,
    addressLine: formatAddressLine(street, postalCode, city, country),
    gleifUrl: company.leiUrl,
    uidRegisterUrl: company.uidRegisterUrl,
    updatedAt:
      isoDate(data.meta?.goldenCopy?.publishDate) ??
      isoDate(attrs?.registration?.lastUpdateDate),
  };
}

async function fetchGleifRecord(): Promise<PublicCompanyRecord | null> {
  const res = await fetch(GLEIF_URL, {
    headers: {
      Accept: 'application/vnd.api+json',
    },
    signal: AbortSignal.timeout(8_000),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as GleifResponse;
  return mapGleif(data);
}

function cacheTtl(record: PublicCompanyRecord): number {
  return record.source === 'gleif' ? CACHE_TTL_MS : 60_000;
}

/** Live legal identity from the GLEIF LEI API, falling back to the static record. */
export async function getPublicCompany(): Promise<PublicCompanyRecord> {
  if (cache && Date.now() - cache.at < cacheTtl(cache.record)) {
    return cache.record;
  }
  if (inflight) return inflight;

  inflight = fetchGleifRecord()
    .then((live) => {
      const record = live ?? staticCompanyRecord();
      cache = { at: Date.now(), record };
      return record;
    })
    .catch(() => staticCompanyRecord())
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

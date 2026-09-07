import { useEffect, useState } from 'react';
import { API } from '../constants/api';
import { staticCompanyRecord, type PublicCompanyRecord } from '../lib/publicCompany';

type CompanyResponse = {
  ok?: boolean;
  company?: PublicCompanyRecord;
};

/**
 * Loads the GLEIF legal-identity record once on mount.
 * The static company snapshot is shown first (and kept if the request fails).
 */
export function usePublicCompany(): PublicCompanyRecord {
  const [record, setRecord] = useState<PublicCompanyRecord>(staticCompanyRecord);

  useEffect(() => {
    const controller = new AbortController();

    fetch(API.company, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('company request failed'))))
      .then((data: CompanyResponse) => {
        if (data.ok && data.company?.legalName) {
          setRecord(data.company);
        }
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      });

    return () => controller.abort();
  }, []);

  return record;
}

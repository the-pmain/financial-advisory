import { API } from '../constants/api';

export type ApiError = { ok: false; error?: string; authenticated?: boolean };
export type SessionResponse = {
  ok: boolean;
  authenticated: boolean;
  expiresAt?: string | null;
  error?: string;
};

export type OverviewResponse = {
  ok: true;
  overview: {
    articles: number;
    topics: number;
    teamMembers: number;
    legalPages: number;
    caseStudies: number;
    documents: number;
    videos: number;
  };
  generatedAt: string;
};

export type ArticlesResponse = {
  ok: true;
  articles: Array<{
    slug: string;
    title: string;
    tagline: string;
    publishedDate: string | null;
    author: string | null;
    kind: string;
    readingTimeMinutes: number | null;
  }>;
};

export type TopicsResponse = {
  ok: true;
  topics: Array<{
    path: string;
    title: string;
    subtitle: string;
    highlightCount: number;
    relatedCount: number;
  }>;
};

export type TeamResponse = {
  ok: true;
  team: Array<{
    slug: string;
    name: string;
    role: string;
    section: string;
    credentials: string[];
    languages: string[];
    expertise: string[];
  }>;
};

async function requestJson<T extends object>(input: string, init?: RequestInit): Promise<T | ApiError> {
  try {
    const res = await fetch(input, { credentials: 'include', ...init });
    let data: T | ApiError;
    try {
      data = (await res.json()) as T | ApiError;
    } catch {
      if (res.status === 401) {
        return { ok: false, authenticated: false, error: 'Unauthorized' };
      }
      return { ok: false, error: 'Could not reach the admin API.' };
    }
    if (res.status === 401) {
      const err = data as ApiError;
      return {
        ok: false,
        authenticated: false,
        error: err.error ?? 'Unauthorized',
      };
    }
    return data;
  } catch {
    return { ok: false, error: 'Could not reach the admin API.' };
  }
}

export async function fetchSession(): Promise<SessionResponse> {
  const res = await fetch('/api/auth/session', { credentials: 'include' });
  return (await res.json()) as SessionResponse;
}

export async function loginWithPin(pin: string): Promise<SessionResponse> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pin }),
  });
  return (await res.json()) as SessionResponse;
}

export async function logoutAdmin(): Promise<SessionResponse> {
  const res = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });
  return (await res.json()) as SessionResponse;
}

export function fetchOverview() {
  return requestJson<OverviewResponse>('/api/admin/overview');
}

export function fetchAdminArticles() {
  return requestJson<ArticlesResponse>('/api/admin/articles');
}

export function fetchAdminTopics() {
  return requestJson<TopicsResponse>('/api/admin/topics');
}

export function fetchAdminTeam() {
  return requestJson<TeamResponse>(API.team);
}

export type DocumentEntry = {
  fields: Record<string, string>;
  saved_at: string | null;
};

export type AdminClient = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  consent: boolean;
  instructed_person_slug: string | null;
  is_test: boolean;
  document_id: string | null;
  documents: {
    agreement: DocumentEntry | null;
    claim: DocumentEntry | null;
    p2p: DocumentEntry | null;
    matter: DocumentEntry | null;
    release: DocumentEntry | null;
    tracing: DocumentEntry | null;
  };
};

export type ClientsListResponse = {
  ok: true;
  items: AdminClient[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_prev: boolean;
  has_next: boolean;
};

export const TEST_DOCUMENT_KIND = 'agreement' as const;

export type AdminDocumentKind = keyof AdminClient['documents'];
export type ClientsTestFilter = 'all' | 'live' | 'test';

export function fetchAdminClients(
  page = 1,
  perPage = 10,
  filter: ClientsTestFilter = 'all',
) {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });
  if (filter === 'live') params.set('is_test', 'false');
  if (filter === 'test') params.set('is_test', 'true');
  return requestJson<ClientsListResponse>(`${API.adminClients}?${params}`);
}

export function patchAdminClientIsTest(id: string, is_test: boolean) {
  return requestJson<{ ok: true; item: AdminClient }>(API.adminClients, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, is_test }),
  });
}

export function saveAdminDocument(clientId: string, kind: AdminDocumentKind, fields: Record<string, string>) {
  return requestJson<{ ok: true } & { id: string; client_id: string; documents: AdminClient['documents'] }>(
    API.adminClientDocuments,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        kind,
        fields,
      }),
    },
  );
}

export function firstSavedDocumentKind(client: AdminClient): AdminDocumentKind | null {
  const kinds: AdminDocumentKind[] = ['agreement', 'claim', 'p2p', 'matter', 'release', 'tracing'];
  return kinds.find((kind) => client.documents[kind]) ?? null;
}

export type DocumentPdfResult =
  | { ok: true; blob: Blob; filename: string }
  | { ok: false; error: string; authenticated?: boolean };

function filenameFromDisposition(header: string | null): string | null {
  if (!header) return null;
  const match = /filename="([^"]+)"/i.exec(header);
  return match?.[1] ?? null;
}

/** Session cookie only — never put the admin PIN on the query string. */
export async function fetchAdminDocumentPdf(
  clientId: string,
  kind: AdminDocumentKind,
  disposition: 'inline' | 'attachment',
): Promise<DocumentPdfResult> {
  const params = new URLSearchParams({ client_id: clientId, kind });
  const path =
    disposition === 'inline'
      ? `${API.adminClientDocumentPreview}?${params}`
      : `${API.adminClientDocumentDownload}?${params}`;

  try {
    const res = await fetch(path, { credentials: 'include' });
    if (res.status === 401) {
      return { ok: false, authenticated: false, error: 'Unauthorized' };
    }
    if (!res.ok) {
      let error = 'Could not generate the PDF.';
      try {
        const data = (await res.json()) as { error?: string };
        if (typeof data.error === 'string' && data.error) error = data.error;
      } catch {
        /* keep default */
      }
      return { ok: false, error };
    }
    const blob = await res.blob();
    return {
      ok: true,
      blob,
      filename: filenameFromDisposition(res.headers.get('content-disposition')) ?? `helfenstein-${kind}.pdf`,
    };
  } catch {
    return { ok: false, error: 'Could not generate the PDF.' };
  }
}

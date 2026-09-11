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

export const TEST_DOCUMENT_FIELDS = {
  title: 'Test note',
  note: 'Simple test document',
};

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

export function saveAdminTestDocument(clientId: string) {
  return requestJson<{ ok: true } & { id: string; client_id: string; documents: AdminClient['documents'] }>(
    API.adminClientDocuments,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        kind: TEST_DOCUMENT_KIND,
        fields: TEST_DOCUMENT_FIELDS,
      }),
    },
  );
}

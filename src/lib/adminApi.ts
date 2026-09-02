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
  const res = await fetch(input, { credentials: 'include', ...init });
  const data = (await res.json()) as T | ApiError;
  if (res.status === 401) {
    const err = data as ApiError;
    return {
      ok: false,
      authenticated: false,
      error: err.error ?? 'Unauthorized',
    };
  }
  return data;
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
  return requestJson<TeamResponse>('/api/admin/team');
}

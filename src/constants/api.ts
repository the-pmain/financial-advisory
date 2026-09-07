/** Client-facing API paths (proxied to the Express server). */
export const API = {
  health: '/api/health',
  markets: '/api/markets',
  company: '/api/company',
  session: '/api/auth/session',
  login: '/api/auth/login',
  logout: '/api/auth/logout',
  overview: '/api/admin/overview',
  articles: '/api/admin/articles',
  topics: '/api/admin/topics',
  team: '/api/admin/team',
  documents: '/api/admin/documents',
} as const;

export type ApiPath = (typeof API)[keyof typeof API];

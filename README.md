# vermo-financial-advisor

React site plus two Node servers: the existing Express app that serves the site, and a **server-only intake API** (`server.mjs`) that writes to Supabase PostgREST. This file covers how to run both. No product marketing.

## Intake API (Supabase)

Node.js >= 20 ESM. Custom `node:http` server. No HTML, CSS, or files. Postgres is reached only through `{SUPABASE_URL}/rest/v1/...`.

### Run

```bash
cp .env.example .env
# set SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY), ADMIN_API_KEY
npm run start:intake
```

Equivalent: `node server.mjs`. Default port is `3000` (`PORT`).

`.env` is loaded only for keys that are not already set in the environment.

Create the two tables in the Supabase SQL editor using `supabase/schema.sql` (`public.clients` and `public.clients_documents`). Columns follow the **employee profile consultation form** (`name`, `email`, `phone`, `consent`, adviser slug) — not occupation or date of birth.

### Env

| Name | Required | Purpose |
|------|----------|---------|
| `SUPABASE_URL` | yes (on data routes) | Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | preferred | Bypasses RLS |
| `SUPABASE_ANON_KEY` | fallback | Used if service role is unset |
| `ADMIN_API_KEY` | yes in production | Bearer token for `/api/admin/*` |
| `PORT` | no | Defaults to `3000` |

If URL/key are missing, data routes return `500 { "error": "Missing Supabase credentials." }`. Keys are never returned or logged.

### Admin auth

Every `/api/admin/*` request must send:

```
Authorization: Bearer <ADMIN_API_KEY>
```

The server compares with a constant-time check. Missing or wrong token → `401 { "error": "Unauthorized." }`. `OPTIONS` is unauthenticated and returns `204`. Admin JSON is always `noindex`.

### Routes

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| `GET` | `/health` | no | `{ "ok": true }` |
| `POST` | `/api/clients` | public (20 req/min/IP) | Create a lead from an employee page |
| `GET` | `/api/admin/clients` | admin | Paginated list + flattened document bags |
| `PATCH` | `/api/admin/clients` | admin | Set `is_test` |
| `PUT` | `/api/admin/clients-documents` | admin | Merge one document kind into the 1:1 bag |

`POST /api/clients` body:

```json
{
  "name": "Anna Keller",
  "email": "anna@example.com",
  "phone": "+41 41 211 29 29",
  "consent": true,
  "instructed_person_slug": "anja-hoffmann"
}
```

`adviser.slug` from the team-member form is accepted as `instructed_person_slug`. `is_test` from the client is ignored (always stored `false`). Success: `201 { "ok": true }` (the row is not returned).

`GET /api/admin/clients?page=1&per_page=20&is_test=true|false`  
`per_page` or `limit`, clamped 1–100. Each item includes `document_id` and a flattened six-kind `documents` map.

`PATCH` body: `{ "id": "<uuid>", "is_test": true }`.

`PUT /api/admin/clients-documents` body: `{ "client_id": "<uuid>", "kind": "agreement", "fields": { "key": "value" } }`.

Kinds: `agreement` | `claim` | `p2p` | `matter` | `release` | `tracing`. Stored as `{ agreement, claim, release }` with `p2p` / `matter` / `tracing` nested under `claim`. The API always returns all six kinds at the top level (`null` if missing).

### Tests

```bash
npm test
```

---

## Site (Express + Vite)

```bash
npm install
npm run dev
```

- Site: [http://localhost:5173/](http://localhost:5173/)
- Admin: [http://localhost:5173/admin](http://localhost:5173/admin)
- API (direct): [http://localhost:3001/api/health](http://localhost:3001/api/health)

Vite proxies `/api` to the Express server. Admin PIN comes from `.env` (`ADMIN_PIN=1100`).

### Production (site)

```bash
npm run build
npm start
```

Serves the built site and Express API together (default port `4173`).

### Site admin API

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/health` | no | Health check |
| GET | `/api/auth/session` | cookie | Current admin session |
| POST | `/api/auth/login` | no | Body `{ "pin": "1100" }` |
| POST | `/api/auth/logout` | cookie | Clear session |
| GET | `/api/admin/overview` | yes | Content counts |
| GET | `/api/admin/articles` | yes | Article inventory |
| GET | `/api/admin/topics` | yes | Topic inventory |
| GET | `/api/admin/team` | yes | Team inventory |
| GET | `/api/admin/documents` | yes | Client documents |
| GET | `/api/admin/clients` | cookie | Paginated clients + document bags |
| PATCH | `/api/admin/clients` | cookie | Set `is_test` |
| PUT | `/api/admin/clients-documents` | cookie | Merge one document kind into the 1:1 bag |
| GET | `/api/admin/clients-documents/preview` | cookie | Regenerate a PDF (`inline`) from saved fields + current firm/people |
| GET | `/api/admin/clients-documents/download` | cookie | Same PDF as an attachment |

Preview and download take `client_id` (UUID) and `kind` (`agreement` \| `claim` \| `p2p` \| `matter` \| `release` \| `tracing`). There is no stored PDF: the file is built on each request. Auth is the admin session cookie, not a PIN on the query string.

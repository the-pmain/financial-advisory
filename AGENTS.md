# Agent map

Read this before adding a page, API route, document type, or chart. Rules in `.cursor/rules/` enforce the same invariants.

## What this is

Vite React 19 client + Express 5 API, laid out by bounded context. One repo, three portals:

| Role | Home | Nav |
|------|------|-----|
| Client (`advisor`) | `/overview` | Overview, Holdings, Documents, Messages |
| Employee | `/` | Applications, Clients |
| Super admin (`admin`) | `/admin/employees` | Employees, Clients |

Signup/login are custom cookie sessions (`sid` + `portal` hint), not Supabase Auth. The super admin is a PIN session: `ADMIN_PIN` from `.env`, entered on the `/admin` keypad, reachable from any auth screen by pressing A, D, M (Ctrl/Cmd optional, ignored while typing in a field). The server talks to Supabase with PostgREST when `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set; otherwise every port falls back to a memory adapter. `GET /api/health` reports which.

## Contexts

Four of them. Each owns its words and its tables.

| Context | Owns | Model | Server |
|---------|------|-------|--------|
| identity | sessions, roles, portal accounts (`users`), the admin PIN | `src/domains/identity` | `server/contexts/identity` |
| staff | employees, the public directory, portraits (`employees`) | `src/domains/staff` | `server/contexts/staff` |
| onboarding | applications and the clients they become (`clients_applicatitons`) | `src/domains/onboarding` | `server/contexts/onboarding` |
| documents | firm PDFs (`clients_documents`) and the engine in `src/js` | `src/domains/documents` | `server/contexts/documents` |

```
src/domains/<ctx>/model.ts  entities, invariants, wire contracts
                            imported as @domain/<ctx>/model.ts by both sides
                            browser safe: no express, no fetch, no I/O
src/domains/shared/         paging and other kernels no context owns
server/contexts/<ctx>/
  ports.ts                  what this context needs from the outside
  service.ts                use cases; throws DomainError, knows nothing of HTTP
  adapters/                 one PostgREST and one memory implementation per port
server/interfaces/http/     express routers, one per portal surface
server/platform/            postgrest, supabase access, rate limit, errors, http, secrets
server/container.ts         the only file that chooses Supabase or memory
```

```
src/pages       route screens
src/components  layout / ui / viz / documents / employees
src/hooks       data hooks: the client's application layer
src/documents   client KYC pack (localStorage) — not the firm PDF system
src/js          legacy firm PDF engine, reached through @domain/documents
src/sample      illustrative portfolio only — not live money
src/lib         shared formatters
src/i18n        user-visible copy
src/theme       design tokens
```

### Which way dependencies point

- Nothing in `src/domains` imports express, `postgrest`, `process.env`, `localStorage`, or React.
- A service talks to its ports. It never calls `postgrest()` or reads the environment.
- Contexts do not read each other's tables. Identity needs a client's name, so it takes a `ClientNameLookup` that onboarding happens to satisfy, and `container.ts` introduces them.
- Model to model, the only edge is staff → onboarding (`EmployeeAccountWithClients`). Keep the graph acyclic.
- A router in `interfaces/http` may compose several services. That is where a payload shaped for one portal gets assembled.

## Data truth

| Surface | Source |
|---------|--------|
| Client / employee login | `users` / `employees` through identity and staff, or memory |
| Super admin login | `ADMIN_PIN` env var only |
| Applications / clients | `clients_applicatitons` (spelling is live) through onboarding |
| Admin console | staff accounts joined with onboarding applications in `interfaces/http/adminConsole.ts`, from either end: `/api/admin/employees` or paged `GET /api/admin/clients`. Stored passwords only via `GET /api/admin/.../password`. |
| Staff portraits | Supabase Storage bucket `employees`, served by `GET /api/staff/photos/:file` |
| Client portraits | `photo_storage_path` on `clients_applicatitons`, private bucket `clients`, served by `GET /api/admin/clients/photos/:file` |
| Firm legal docs | `clients_documents` + the `src/js` PDF engine |
| Client KYC pack | `localStorage` key `portal.docs.v1.{userId}` — not the API |
| Overview / Holdings / Messages | `src/sample/portal.ts` — labelled illustrative |

Do not treat sample portfolio UI as live account data. Do not "fix" `clients_applicatitons`.

## Two document systems

| System | Catalog | Persistence | Use for |
|--------|---------|-------------|---------|
| KYC pack | `src/documents/catalog.ts` | Browser localStorage | Passport, licence, address, tax id, IBAN |
| Firm PDFs | `src/js/clients-documents-model.js` | Supabase / memory via the documents context | Agreement, brochure, claim, … |

Never merge these catalogs. Pick one before adding a document type.

## How to add work

**Client page:** `src/pages/X.tsx` → route in `src/App.tsx` under `ClientLayout` → nav in `src/app/nav.ts` `APP_NAV` → copy in `src/i18n/locales/en.ts`.

**Employee page:** same, but `EmployeeOrGuestLayout` / `EMPLOYEE_NAV`, guard with `isEmployee`.

**Admin page:** same, but `AdminLayout` / `ADMIN_NAV`, guard with `isAdmin`, data from `/api/admin` through `useAdminEmployees`, the paged `useAdminClients`, or `useAdminClient` for one record.

**API route:** find the context that owns the data. Put the use case in its `service.ts`; if it needs something new, add the method to `ports.ts` and implement it in both adapters. Expose it from a router in `server/interfaces/http/` and mount it in `server/index.ts` behind `requireAuth` plus `requireClient`, `requireEmployee`, or `requireAdmin`. Throw `notFound()` / `invalid()` / `conflict()` from `platform/errors.ts` and let `route()` turn them into a status and `{ error: string }`.

**New context:** `src/domains/<name>/model.ts`, then `server/contexts/<name>/{ports,service,adapters}`, then one wiring block in `container.ts`.

**A rule about the data** (validation, naming, a projection like `toClientSummary`): `src/domains/<ctx>/model.ts`, so the form and the API cannot disagree.

**KYC type:** `DOC_CATALOG` + `en.ts` `docs.kinds` / `docs.fields`.

**Legal PDF type:** `src/js/clients-documents-model.js` and the generate/fields/register modules, reached through `@domain/documents/agreement.ts`. Extend the JS engine; do not rewrite it to TypeScript in passing.

**Chart:** `src/components/viz/`, data via props, formatters from `src/lib/format.ts`.

**Copy:** `src/i18n/locales/en.ts`. PDF labels stay in the JS model / `src/data/company.ts`.

**Style:** new hex goes in `src/theme/tokens.css`. Authenticated shell uses BEM in `src/index.css` (`.app-*`, `.viz-*`, `.doc-*`, `.admin-*`). Auth/marketing screens may use Tailwind + `vz-*`. Icons: Lucide through `src/components/ui/icon.tsx`.

## Do not

- Push to `main` / `master` (use `app`)
- Read another context's table, or import one context's adapter from another
- Read `process.env` outside `server/platform` and `server/container.ts`
- Import express, `postgrest`, or React from `src/domains`
- Delete or rename `.sample-*` CSS because the class says sample — those styles power live pages
- Introduce Supabase Auth, JWT libraries, or bcrypt unless the task is auth
- Store a second password column or a raw-password workflow; the users table column is `password`
- Import `@supabase/supabase-js` on the client
- Add a new icon package
- Commit a real `ADMIN_PIN` or give it a hardcoded fallback in code
- Give `/admin` a dark or bespoke theme; it is a white auth card like the other sign-in screens

## Commands

```
npm run dev # API + Vite (proxies /api)
npm run typecheck
npm test # node:test over src/domains/**/*.test.js
```

Dev API defaults to port 3001. If that port is taken, set `API_PORT` (see `scripts/dev.ts`).

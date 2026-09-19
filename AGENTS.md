# Agent map

Read this before adding a page, API route, document type, or chart. Rules in `.cursor/rules/` enforce the same invariants.

## What this is

Vite React 19 client + Express 5 API. One repo, two portals:

| Role | Home | Nav |
|------|------|-----|
| Client (`advisor`) | `/overview` | Overview, Holdings, Documents, Messages |
| Employee | `/` | Applications, Clients |

Signup/login are custom cookie sessions (`sid` + `portal` hint), not Supabase Auth. The server talks to Supabase with PostgREST (`server/postgrest.ts`) when `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set; otherwise it uses in-memory maps.

```
src/pages          route screens
src/components     layout / ui / viz / documents / employees
src/documents      client KYC pack (passport, address, …)
src/js             firm legal PDFs (agreement, claim, …)
src/employees      staff types + agreement prep
src/sample         illustrative portfolio only — not live money
src/lib            shared formatters (not sample data)
src/hooks          client data hooks
src/i18n           user-visible copy
src/theme          design tokens
server             Express routers + guards
```

## Data truth

| Surface | Source |
|---------|--------|
| Client / employee login | Supabase `users` / `employees` or memory |
| Applications / clients | Supabase `clients_applicatitons` (spelling is live) or memory |
| Firm legal docs | Supabase `clients_documents` + `src/js` PDF engine |
| Client KYC pack | `localStorage` key `portal.docs.v1.{userId}` — not the API |
| Overview / Holdings / Messages | `src/sample/portal.ts` — labelled illustrative |

Do not treat sample portfolio UI as live account data. Do not “fix” `clients_applicatitons`.

## Two document systems

| System | Catalog | Persistence | Use for |
|--------|---------|-------------|---------|
| KYC pack | `src/documents/catalog.ts` | Browser localStorage | Passport, licence, address, tax id, IBAN |
| Firm PDFs | `src/js/clients-documents-model.js` | Supabase / memory via employees API | Agreement, brochure, claim, … |

Never merge these catalogs. Pick one before adding a document type.

## How to add work

**Client page:** `src/pages/X.tsx` → route in `src/App.tsx` under `ClientLayout` → nav in `src/app/nav.ts` `APP_NAV` → copy in `src/i18n/locales/en.ts`.

**Employee page:** same, but `EmployeeOrGuestLayout` / `EMPLOYEE_NAV`, guard with `isEmployee`.

**API route:** existing router or new `server/*.ts` mounted in `server/index.ts`. Guard with `requireAuth` plus `requireClient` or `requireEmployee`. Errors are `{ error: string }`. If you hit Supabase, keep the memory fallback.

**KYC type:** `DOC_CATALOG` + `en.ts` `docs.kinds` / `docs.fields`.

**Legal PDF type:** `src/js/clients-documents-model.js` and the generate/fields/register modules. Extend the JS engine; do not rewrite it to TypeScript in passing.

**Chart:** `src/components/viz/`, data via props, formatters from `src/lib/format.ts`.

**Copy:** `src/i18n/locales/en.ts`. PDF labels stay in the JS model / `src/data/company.ts`.

**Style:** new hex goes in `src/theme/tokens.css`. Authenticated shell uses BEM in `src/index.css` (`.app-*`, `.viz-*`, `.doc-*`). Auth/marketing screens may use Tailwind + `vz-*`. Icons: Lucide through `src/components/ui/icon.tsx`.

## Do not

- Push to `main` / `master` (use `app`)
- Delete or rename `.sample-*` CSS because the class says sample — those styles power live pages
- Introduce Supabase Auth, JWT libraries, or bcrypt unless the task is auth
- Store a second password column or a raw-password workflow; the users table column is `password`
- Import `@supabase/supabase-js` on the client
- Add a new icon package

## Commands

```
npm run dev        # API + Vite (proxies /api)
npm run typecheck
npm test           # agreement PDF only
```

Dev API defaults to port 3001. If that port is taken, set `API_PORT` (see `scripts/dev.ts`).

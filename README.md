# vermo-financial-advisor

Full-stack recreation of the VZ VermögensZentrum site — React 19, React Router 8, Vite 8, Tailwind CSS v4, Express API.

## Develop

```bash
npm install
npm run dev
```

- Site: [http://localhost:5173/](http://localhost:5173/)
- Admin: [http://localhost:5173/admin](http://localhost:5173/admin)
- API (direct): [http://localhost:3001/api/health](http://localhost:3001/api/health)

Vite proxies `/api` to the Express server. Admin PIN comes from `.env` (`ADMIN_PIN=1100`).

## Production

```bash
npm run build
npm start
```

Serves the built site and API together (default port `4173`).

## Admin API

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

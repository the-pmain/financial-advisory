import { Link } from "react-router";
import { Avatar } from "../components/ui/avatar.tsx";
import { useAdminEmployees } from "../hooks/useAdminEmployees.ts";
import { useI18n } from "../i18n/context.tsx";
import { plural } from "../lib/format.ts";

export function AdminEmployeesPage() {
  const { t } = useI18n();
  const copy = t.admin.employees;
  const { items, error } = useAdminEmployees(copy.error);

  return (
    <section className="app-page">
      <h1 className="app-page__title">{copy.title}</h1>
      <p className="app-page__note">{copy.lead}</p>
      {items && items.length > 0 ? (
        <p className="doc-pack__count">{plural(items.length, copy.countOne, copy.count)}</p>
      ) : null}

      {items === null ? (
        <p className="staff-apps__status" role="status">
          <span className="vz-loader" aria-hidden="true" />
          {copy.loading}
        </p>
      ) : error ? (
        <p className="appointment-form__error">{error}</p>
      ) : items.length === 0 ? (
        <p className="app-page__note">{copy.empty}</p>
      ) : (
        <ul className="admin-grid">
          {items.map((row) => (
            <li key={row.slug}>
              <Link className="admin-card" to={`/admin/employees/${encodeURIComponent(row.slug)}`}>
                <Avatar name={row.name} photoUrl={row.photoUrl} size="lg" />
                <span className="admin-card__name">{row.name}</span>
                <span className="admin-card__role">{row.role || copy.unset}</span>
                <span className="admin-card__meta">
                  {plural(row.clients.length, copy.clientCountOne, copy.clientCount)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

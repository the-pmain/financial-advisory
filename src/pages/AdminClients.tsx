import { ChevronLeft, ChevronRight } from "lucide-react";
import { MouseEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { CLIENT_FILTERS, type ClientFilter, type ClientWithAdviser } from "@domain/staff/model.ts";
import { RegisteredTag, filedCount, DOC_KINDS } from "../components/admin/ClientCard.tsx";
import { Avatar } from "../components/ui/avatar.tsx";
import { Icon } from "../components/ui/icon.tsx";
import { useAdminClients } from "../hooks/useAdminClients.ts";
import { useI18n } from "../i18n/context.tsx";
import { formatDay } from "../lib/format.ts";

export function AdminClientsPage() {
  const { t } = useI18n();
  const copy = t.admin.clients;
  const [status, setStatus] = useState<ClientFilter>("all");
  const [page, setPage] = useState(1);
  const { data, error } = useAdminClients({ page, status }, copy.error);
  const navigate = useNavigate();

  function pick(next: ClientFilter) {
    setStatus(next);
    setPage(1);
  }

  return (
    <section className="app-page">
      <h1 className="app-page__title">{copy.title}</h1>
      <p className="app-page__note">{copy.lead}</p>

      <div className="admin-tabs" role="tablist" aria-label={copy.tabsLabel}>
        {CLIENT_FILTERS.map((value) => (
          <button
            key={value}
            type="button"
            role="tab"
            id={`admin-tab-${value}`}
            aria-selected={status === value}
            aria-controls="admin-panel-clients"
            className={`admin-tab${status === value ? " is-active" : ""}`}
            onClick={() => pick(value)}
          >
            {copy.tabs[value]}
            {data ? <span className="admin-tab__count">{data.totals[value]}</span> : null}
          </button>
        ))}
      </div>

      <div role="tabpanel" id="admin-panel-clients" aria-labelledby={`admin-tab-${status}`}>
        <p className="doc-pack__count">{copy.hints[status]}</p>

        {error ? (
          <p className="appointment-form__error">{error}</p>
        ) : data === null ? (
          <p className="staff-apps__status" role="status">
            <span className="vz-loader" aria-hidden="true" />
            {copy.loading}
          </p>
        ) : data.items.length === 0 ? (
          <p className="app-page__note">{data.total === 0 ? copy.empty : copy.tabEmpty}</p>
        ) : (
          <>
            <div className="admin-table__scroll">
              <table className="admin-table">
                <caption className="visually-hidden">{copy.tableCaption}</caption>
                <thead>
                  <tr>
                    <th scope="col">{copy.columns.client}</th>
                    <th scope="col">{copy.columns.adviser}</th>
                    <th scope="col">{copy.columns.applied}</th>
                    <th scope="col">{copy.columns.status}</th>
                    <th scope="col">{copy.columns.papers}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((client) => (
                    <ClientRow
                      key={client.id}
                      client={client}
                      onOpen={() => navigate(`/admin/clients/${encodeURIComponent(client.id)}`)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <Pager
              page={data.page}
              pageCount={data.pageCount}
              shown={data.items.length}
              total={data.total}
              first={(data.page - 1) * data.pageSize + 1}
              onPage={setPage}
            />
          </>
        )}
      </div>
    </section>
  );
}

function ClientRow({ client, onOpen }: { client: ClientWithAdviser; onOpen: () => void }) {
  const { t } = useI18n();
  const copy = t.admin.clients;

  // The name is a real link for keyboard and middle click; the row is a
  // shortcut for the mouse, so a click already handled is left alone.
  function onRowClick(event: MouseEvent<HTMLTableRowElement>) {
    if ((event.target as HTMLElement).closest("a")) return;
    onOpen();
  }

  return (
    <tr className="admin-row" onClick={onRowClick}>
      <td>
        <span className="admin-who">
          <Avatar name={client.name} photoUrl={client.photoUrl} size="sm" />
          <span className="admin-who__text">
            <Link className="admin-who__name" to={`/admin/clients/${encodeURIComponent(client.id)}`}>
              {client.name}
            </Link>
            <span className="admin-who__meta">{client.email}</span>
          </span>
        </span>
      </td>
      <td>
        {client.adviser ? (
          <span className="admin-who">
            <Avatar name={client.adviser.name} photoUrl={client.adviser.photoUrl} size="sm" />
            <span className="admin-who__text">
              <span className="admin-who__name">{client.adviser.name}</span>
              <span className="admin-who__meta">{client.adviser.role || copy.unset}</span>
            </span>
          </span>
        ) : (
          <span className="admin-table__quiet">{copy.unassigned}</span>
        )}
      </td>
      <td>{formatDay(client.createdAt)}</td>
      <td>
        <RegisteredTag registered={client.registered} />
      </td>
      <td>
        <span className="admin-table__papers">
          {copy.filedCount
            .replace("{n}", String(filedCount(client)))
            .replace("{total}", String(DOC_KINDS.length))}
        </span>
      </td>
    </tr>
  );
}

function Pager({
  page,
  pageCount,
  shown,
  total,
  first,
  onPage,
}: {
  page: number;
  pageCount: number;
  shown: number;
  total: number;
  first: number;
  onPage: (page: number) => void;
}) {
  const { t } = useI18n();
  const copy = t.admin.clients;

  return (
    <div className="admin-pager">
      <p className="admin-pager__count">
        {copy.showing
          .replace("{first}", String(first))
          .replace("{last}", String(first + shown - 1))
          .replace("{total}", String(total))}
      </p>
      <div className="admin-pager__controls">
        <button
          type="button"
          className="admin-pager__step"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
        >
          <Icon icon={ChevronLeft} size={16} />
          {copy.previous}
        </button>
        <span className="admin-pager__page">
          {copy.pageOf.replace("{page}", String(page)).replace("{pages}", String(pageCount))}
        </span>
        <button
          type="button"
          className="admin-pager__step"
          disabled={page >= pageCount}
          onClick={() => onPage(page + 1)}
        >
          {copy.next}
          <Icon icon={ChevronRight} size={16} />
        </button>
      </div>
    </div>
  );
}

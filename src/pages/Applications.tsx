import { CircleCheck, CircleDashed } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client.ts";
import { Icon } from "../components/ui/icon.tsx";
import type { ClientApplication } from "@domain/onboarding/model.ts";
import { useI18n } from "../i18n/context.tsx";

function formatReceived(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function PortalTag({ registered, label }: { registered: boolean; label: string }) {
  return (
    <span className={`staff-apps__tag${registered ? " is-registered" : " is-open"}`}>
      <Icon icon={registered ? CircleCheck : CircleDashed} size={14} />
      {label}
    </span>
  );
}

export function ApplicationsPage() {
  const { t } = useI18n();
  const [items, setItems] = useState<ClientApplication[] | null>(null);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api<ClientApplication[]>("/api/employees/applications")
      .then((rows) => {
        if (cancelled) return;
        setItems(rows);
        setSelectedId(rows[0]?.id ?? null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : t.employee.applications.error);
        setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, [t.employee.applications.error]);

  const selected = useMemo(
    () => items?.find((row) => row.id === selectedId) ?? null,
    [items, selectedId],
  );

  const countLabel =
    items && items.length > 0
      ? t.employee.applications.count.replace("{n}", String(items.length))
      : null;

  return (
    <section className="app-page">
      <h1 className="app-page__title">{t.employee.applications.title}</h1>
      <p className="app-page__note">{t.employee.applications.lead}</p>
      {countLabel ? <p className="doc-pack__count">{countLabel}</p> : null}

      {items === null ? (
        <p className="staff-apps__status" role="status">
          <span className="vz-loader" aria-hidden="true" />
          {t.employee.applications.loading}
        </p>
      ) : error ? (
        <p className="appointment-form__error">{error}</p>
      ) : items.length === 0 ? (
        <p className="app-page__note">{t.employee.applications.empty}</p>
      ) : (
        <div className="staff-apps">
          <div
            className="staff-apps__tabs"
            role="tablist"
            aria-label={t.employee.applications.tabsLabel}
          >
            {items.map((row) => {
              const active = row.id === selected?.id;
              return (
                <button
                  key={row.id}
                  type="button"
                  role="tab"
                  id={`application-tab-${row.id}`}
                  aria-selected={active}
                  aria-controls={`application-panel-${row.id}`}
                  className={`staff-apps__tab${active ? " is-active" : ""}`}
                  onClick={() => setSelectedId(row.id)}
                >
                  <span className="staff-apps__tab-name">{row.name}</span>
                  <span className="staff-apps__tab-meta">{formatReceived(row.createdAt)}</span>
                  <PortalTag
                    registered={row.registered}
                    label={
                      row.registered
                        ? t.employee.applications.registered
                        : t.employee.applications.unregistered
                    }
                  />
                </button>
              );
            })}
          </div>
          {selected ? (
            <article
              className="staff-apps__panel"
              role="tabpanel"
              id={`application-panel-${selected.id}`}
              aria-labelledby={`application-tab-${selected.id}`}
            >
              <h2 className="staff-apps__heading">{selected.name}</h2>
              <PortalTag
                registered={selected.registered}
                label={
                  selected.registered
                    ? t.employee.applications.registered
                    : t.employee.applications.unregistered
                }
              />
              <dl className="staff-apps__dl">
                <dt>{t.employee.applications.email}</dt>
                <dd>
                  <a href={`mailto:${selected.email}`}>{selected.email}</a>
                </dd>
                <dt>{t.employee.applications.phone}</dt>
                <dd>
                  <a href={`tel:${selected.phone}`}>{selected.phone}</a>
                </dd>
                <dt>{t.employee.applications.received}</dt>
                <dd>{formatReceived(selected.createdAt)}</dd>
                {selected.registered && selected.portalAccount ? (
                  <>
                    <dt>{t.employee.applications.portalName}</dt>
                    <dd>{selected.portalAccount.name}</dd>
                  </>
                ) : (
                  <>
                    <dt>{t.employee.applications.portal}</dt>
                    <dd>{t.employee.applications.unregistered}</dd>
                  </>
                )}
              </dl>
            </article>
          ) : null}
        </div>
      )}
    </section>
  );
}

import { ScrollText } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client.ts";
import {
  adminPreviewCopy,
  DocumentPreviewDialog,
  type PreviewPrepare,
} from "../components/admin/DocumentPreviewDialog.tsx";
import { DocCard } from "../components/documents/DocCard.tsx";
import { DOC_CATALOG } from "../documents/catalog.ts";
import { emptyClientDocuments, prepareClientAgreement } from "../employees/agreement.ts";
import type { ClientApplication, EmployeeOption } from "../employees/types.ts";
import { useI18n } from "../i18n/context.tsx";
import { DOCUMENT_KIND_LABELS } from "../js/clients-documents-model.js";

function formatReceived(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function ClientsPage() {
  const { t } = useI18n();
  const [items, setItems] = useState<ClientApplication[] | null>(null);
  const [people, setPeople] = useState<EmployeeOption[]>([]);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ runKey: string; prepare: PreviewPrepare } | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      api<ClientApplication[]>("/api/employees/clients"),
      api<EmployeeOption[]>("/api/auth/employee/directory"),
    ])
      .then(([rows, directory]) => {
        if (cancelled) return;
        setItems(
          rows.map((row) => ({
            ...row,
            documents: row.documents ?? emptyClientDocuments(),
          })),
        );
        setPeople(directory);
        setSelectedId(rows[0]?.id ?? null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : t.employee.clients.error);
        setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, [t.employee.clients.error]);

  const selected = useMemo(
    () => items?.find((row) => row.id === selectedId) ?? null,
    [items, selectedId],
  );

  const countLabel =
    items && items.length > 0
      ? t.employee.clients.count.replace("{n}", String(items.length))
      : null;

  function openAgreement(client: ClientApplication) {
    setPreview({
      runKey: `${client.id}:agreement`,
      prepare: () => prepareClientAgreement(client, people),
    });
  }

  return (
    <section className="app-page">
      <h1 className="app-page__title">{t.employee.clients.title}</h1>
      <p className="app-page__note">{t.employee.clients.lead}</p>
      {countLabel ? <p className="doc-pack__count">{countLabel}</p> : null}

      {items === null ? (
        <p className="staff-apps__status" role="status">
          <span className="vz-loader" aria-hidden="true" />
          {t.employee.clients.loading}
        </p>
      ) : error ? (
        <p className="appointment-form__error">{error}</p>
      ) : items.length === 0 ? (
        <p className="app-page__note">{t.employee.clients.empty}</p>
      ) : (
        <div className="staff-apps">
          <div className="staff-apps__tabs" role="tablist" aria-label={t.employee.clients.tabsLabel}>
            {items.map((row) => {
              const active = row.id === selected?.id;
              return (
                <button
                  key={row.id}
                  type="button"
                  role="tab"
                  id={`client-tab-${row.id}`}
                  aria-selected={active}
                  aria-controls={`client-panel-${row.id}`}
                  className={`staff-apps__tab${active ? " is-active" : ""}`}
                  onClick={() => setSelectedId(row.id)}
                >
                  <span className="staff-apps__tab-name">{row.name}</span>
                  <span className="staff-apps__tab-meta">{row.email}</span>
                </button>
              );
            })}
          </div>
          {selected ? (
            <article
              className="staff-apps__panel"
              role="tabpanel"
              id={`client-panel-${selected.id}`}
              aria-labelledby={`client-tab-${selected.id}`}
            >
              <h2 className="staff-apps__heading">{selected.name}</h2>
              <dl className="staff-apps__dl">
                <dt>{t.employee.clients.email}</dt>
                <dd>
                  <a href={`mailto:${selected.email}`}>{selected.email}</a>
                </dd>
                <dt>{t.employee.clients.phone}</dt>
                <dd>
                  <a href={`tel:${selected.phone}`}>{selected.phone}</a>
                </dd>
                <dt>{t.employee.clients.applied}</dt>
                <dd>{formatReceived(selected.createdAt)}</dd>
                {selected.portalAccount ? (
                  <>
                    <dt>{t.employee.clients.portalName}</dt>
                    <dd>{selected.portalAccount.name}</dd>
                    <dt>{t.employee.clients.joined}</dt>
                    <dd>{formatReceived(selected.portalAccount.createdAt)}</dd>
                  </>
                ) : null}
              </dl>

              <h2 className="app-page__section">{t.employee.clients.houseDocuments}</h2>
              <p className="doc-pack__count">{t.employee.clients.houseLead}</p>
              <ul className="doc-grid">
                <li>
                  <DocCard
                    icon={ScrollText}
                    title={DOCUMENT_KIND_LABELS.agreement}
                    hint={t.employee.clients.agreementHint}
                    status="started"
                    statusLabel={t.employee.clients.preview}
                    onClick={() => openAgreement(selected)}
                  />
                </li>
              </ul>

              <h2 className="app-page__section">{t.employee.clients.personalDocuments}</h2>
              <p className="doc-pack__count">{t.employee.clients.personalLead}</p>
              <ul className="doc-grid">
                {DOC_CATALOG.map((item) => (
                  <li key={item.slug}>
                    <DocCard
                      icon={item.icon}
                      title={t.docs.kinds[item.slug].title}
                      hint={t.docs.kinds[item.slug].hint}
                      status="disabled"
                      statusLabel={t.docs.status.disabled}
                    />
                  </li>
                ))}
              </ul>
            </article>
          ) : null}
        </div>
      )}

      <DocumentPreviewDialog
        open={Boolean(preview)}
        copy={adminPreviewCopy(DOCUMENT_KIND_LABELS.agreement)}
        prepare={preview?.prepare ?? null}
        runKey={preview?.runKey}
        wait="close"
        onClose={() => setPreview(null)}
      />
    </section>
  );
}

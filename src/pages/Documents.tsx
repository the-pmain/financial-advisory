import { useMemo } from "react";
import { useAuth } from "../auth/AuthContext.tsx";
import { DocCard } from "../components/documents/DocCard.tsx";
import { DOC_CATALOG } from "../documents/catalog.ts";
import { readDocPack } from "../documents/storage.ts";
import { useI18n } from "../i18n/context.tsx";
import { DOC_KIND_ICON } from "../sample/kinds.ts";
import { sampleDocuments } from "../sample/portal.ts";

export function DocumentsPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const pack = useMemo(
    () => (user ? readDocPack(user.id, user.name) : null),
    [user],
  );
  const received = pack ? DOC_CATALOG.filter((item) => pack[item.slug].status === "complete").length : 0;
  const personalReady = received === DOC_CATALOG.length;

  return (
    <section className="app-page">
      <h1 className="app-page__title">{t.app.nav.documents}</h1>
      <p className="app-page__note">{t.docs.lead}</p>

      <h2 className="app-page__section">{t.docs.myDocuments}</h2>
      <p className="doc-pack__count">
        {received} / {DOC_CATALOG.length} {t.docs.receivedCount}
      </p>
      <ul className="doc-grid">
        {DOC_CATALOG.map((item) => {
          const record = pack?.[item.slug];
          const status = record?.status ?? "empty";
          return (
            <li key={item.slug}>
              <DocCard
                to={`/documents/${item.slug}`}
                icon={item.icon}
                title={t.docs.kinds[item.slug].title}
                hint={t.docs.kinds[item.slug].hint}
                status={status}
                statusLabel={t.docs.status[status]}
              />
            </li>
          );
        })}
      </ul>

      <h2 className="app-page__section">{t.docs.otherDocuments}</h2>
      <p className="doc-pack__count">{personalReady ? t.docs.otherLead : t.docs.otherLocked}</p>
      <ul className="doc-grid">
        {sampleDocuments.map((item) => (
          <li key={item.title}>
            <DocCard
              icon={DOC_KIND_ICON[item.kind]}
              title={item.title}
              hint={`${item.kind} · ${item.date}`}
              status={personalReady ? "complete" : "disabled"}
              statusLabel={personalReady ? t.docs.status.complete : undefined}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

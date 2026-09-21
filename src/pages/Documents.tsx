import { ScrollText } from "lucide-react";
import { useMemo, useState } from "react";
import {
  adminPreviewCopy,
  DocumentPreviewDialog,
  type PreviewPrepare,
} from "../components/admin/DocumentPreviewDialog.tsx";
import { DocCard } from "../components/documents/DocCard.tsx";
import { DOC_CATALOG } from "../documents/catalog.ts";
import { readDocPack } from "../documents/storage.ts";
import { emptyClientDocuments, prepareClientAgreement } from "@domain/documents/agreement.ts";
import type { ClientApplication } from "@domain/onboarding/model.ts";
import { useMandate } from "../hooks/useMandate.ts";
import { useI18n } from "../i18n/context.tsx";
import { DOCUMENT_KIND_LABELS } from "../js/clients-documents-model.js";
import { DOC_KIND_ICON } from "../sample/kinds.ts";
import { sampleDocuments } from "../sample/portal.ts";

function recordFromUser(
  user: { id: string; name: string; email: string },
  application: ClientApplication | null,
): ClientApplication {
  if (application) {
    return { ...application, documents: application.documents ?? emptyClientDocuments() };
  }
  return {
    id: user.id,
    createdAt: "",
    name: user.name,
    email: user.email,
    phone: "",
    instructedPersonSlug: null,
    registered: true,
    portalAccount: { id: user.id, name: user.name, email: user.email, createdAt: "" },
    photoStoragePath: null,
    documents: emptyClientDocuments(),
  };
}

export function DocumentsPage() {
  const { t } = useI18n();
  const { user, mandate, people, mandateReady } = useMandate();
  const pack = useMemo(
    () => (user ? readDocPack(user.id, user.name) : null),
    [user],
  );
  const received = pack ? DOC_CATALOG.filter((item) => pack[item.slug].status === "complete").length : 0;
  const [preview, setPreview] = useState<{ runKey: string; prepare: PreviewPrepare } | null>(null);

  function openAgreement() {
    if (!user) return;
    const client = recordFromUser(user, mandate);
    setPreview({
      runKey: `${client.id}:agreement`,
      prepare: () => prepareClientAgreement(client, people),
    });
  }

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
      <p className="doc-pack__count">{t.docs.houseLead}</p>
      <ul className="doc-grid">
        <li>
          <DocCard
            icon={ScrollText}
            title={DOCUMENT_KIND_LABELS.agreement}
            hint={t.docs.agreementHint}
            status={mandateReady ? "started" : "disabled"}
            statusLabel={mandateReady ? t.docs.preview : t.docs.status.disabled}
            onClick={mandateReady ? openAgreement : undefined}
          />
        </li>
        {sampleDocuments.map((item) => (
          <li key={item.title}>
            <DocCard
              icon={DOC_KIND_ICON[item.kind]}
              title={item.title}
              hint={`${item.kind} · ${item.date}`}
              status="disabled"
              statusLabel={t.docs.status.disabled}
            />
          </li>
        ))}
      </ul>

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

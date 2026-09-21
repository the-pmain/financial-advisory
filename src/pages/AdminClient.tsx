import { ArrowLeft, Camera } from "lucide-react";
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { emptyClientDocuments, prepareClientAgreement } from "@domain/documents/agreement.ts";
import type { ClientApplication } from "@domain/onboarding/model.ts";
import type { ClientWithAdviser, EmployeeProfile } from "@domain/staff/model.ts";
import { api } from "../api/client.ts";
import { ClientDocuments, DOC_KINDS, filedCount, RegisteredTag } from "../components/admin/ClientCard.tsx";
import {
  adminPreviewCopy,
  DocumentPreviewDialog,
  type PreviewPrepare,
} from "../components/admin/DocumentPreviewDialog.tsx";
import { SecretField } from "../components/admin/SecretField.tsx";
import { Avatar } from "../components/ui/avatar.tsx";
import { Icon } from "../components/ui/icon.tsx";
import { useAdminClient } from "../hooks/useAdminClient.ts";
import { useI18n } from "../i18n/context.tsx";
import { DOCUMENT_KIND_LABELS, type DocumentsMap } from "../js/clients-documents-model.js";
import { formatDay } from "../lib/format.ts";
import { squarePngBlob } from "../lib/image.ts";

type Tab = "profile" | "adviser" | "documents";

export function AdminClientPage() {
  const { id = "" } = useParams();
  const { t } = useI18n();
  const copy = t.admin.clients;
  const { client, error, savePhoto } = useAdminClient(id, copy.error);
  const [tab, setTab] = useState<Tab>("profile");

  const back = (
    <Link className="admin-back" to="/admin/clients">
      <Icon icon={ArrowLeft} size={15} />
      {copy.back}
    </Link>
  );

  if (!client) {
    return (
      <section className="app-page">
        {back}
        {error ? (
          <p className="appointment-form__error">{error}</p>
        ) : (
          <p className="staff-apps__status" role="status">
            <span className="vz-loader" aria-hidden="true" />
            {copy.loading}
          </p>
        )}
      </section>
    );
  }

  return (
    <section className="app-page">
      {back}
      <div className="admin-ident">
        <ClientPortrait client={client} onSave={savePhoto} />
        <div className="admin-ident__text">
          <h1 className="admin-ident__name">
            {client.name}
            <span className="admin-ident__role">
              {client.adviser ? copy.heldBy.replace("{name}", client.adviser.name) : copy.unassigned}
            </span>
          </h1>
          <RegisteredTag registered={client.registered} />
        </div>
      </div>

      <div className="admin-tabs" role="tablist" aria-label={copy.tabsLabel}>
        <TabButton current={tab} value="profile" onSelect={setTab}>
          {copy.profile}
        </TabButton>
        <TabButton current={tab} value="adviser" onSelect={setTab}>
          {copy.adviser}
        </TabButton>
        <TabButton current={tab} value="documents" onSelect={setTab}>
          {copy.documents}
          <span className="admin-tab__count">{filedCount(client)}</span>
        </TabButton>
      </div>

      <div role="tabpanel" id={`admin-panel-${tab}`} aria-labelledby={`admin-tab-${tab}`}>
        {tab === "profile" ? <ProfileTab client={client} /> : null}
        {tab === "adviser" ? <AdviserTab client={client} /> : null}
        {tab === "documents" ? <DocumentsTab client={client} /> : null}
      </div>
    </section>
  );
}

/**
 * The one field of a client record the console may write. Everything else on
 * this page is the application as it was filed.
 */
function ClientPortrait({
  client,
  onSave,
}: {
  client: ClientWithAdviser;
  onSave: (photo: Blob) => Promise<void>;
}) {
  const { t } = useI18n();
  const copy = t.admin.clients;
  const fileRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function onPick(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setPending(true);
    setError("");

    let squared: Blob;
    try {
      squared = await squarePngBlob(file);
    } catch {
      setError(copy.photoError);
      setPending(false);
      return;
    }

    try {
      await onSave(squared);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.error);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="admin-ident__portrait">
      <span className="admin-photo__frame">
        <Avatar name={client.name} photoUrl={client.photoUrl} size="lg" />
        <button
          type="button"
          className="admin-photo__edit"
          title={client.photoUrl ? copy.photoChange : copy.photoAdd}
          aria-label={client.photoUrl ? copy.photoChange : copy.photoAdd}
          disabled={pending}
          onClick={() => fileRef.current?.click()}
        >
          {pending ? <span className="vz-loader" aria-hidden="true" /> : <Icon icon={Camera} size={15} />}
        </button>
      </span>
      <input
        ref={fileRef}
        type="file"
        className="admin-photo__input"
        accept="image/png,image/jpeg,image/webp"
        onChange={(event) => void onPick(event)}
      />
      {error ? <p className="appointment-form__error">{error}</p> : null}
    </div>
  );
}

function TabButton({
  current,
  value,
  onSelect,
  children,
}: {
  current: Tab;
  value: Tab;
  onSelect: (tab: Tab) => void;
  children: ReactNode;
}) {
  const active = current === value;
  return (
    <button
      type="button"
      role="tab"
      id={`admin-tab-${value}`}
      aria-selected={active}
      aria-controls={`admin-panel-${value}`}
      className={`admin-tab${active ? " is-active" : ""}`}
      onClick={() => onSelect(value)}
    >
      {children}
    </button>
  );
}

function ProfileTab({ client }: { client: ClientWithAdviser }) {
  const { t } = useI18n();
  const copy = t.admin.clients;
  const shared = t.admin.client;

  return (
    <article className="staff-apps__panel">
      <h2 className="app-page__section admin-section--first">{copy.application}</h2>
      <dl className="staff-apps__dl">
        <dt>{copy.name}</dt>
        <dd>{client.name}</dd>
        <dt>{shared.email}</dt>
        <dd>
          <a href={`mailto:${client.email}`}>{client.email}</a>
        </dd>
        <dt>{shared.phone}</dt>
        <dd>
          <a href={`tel:${client.phone}`}>{client.phone}</a>
        </dd>
        <dt>{shared.applied}</dt>
        <dd>{formatDay(client.createdAt)}</dd>
        <dt>{copy.recordId}</dt>
        <dd>{client.id}</dd>
        <dt>{t.admin.secret.password}</dt>
        <dd>
          <SecretField
            path={
              client.portalAccount
                ? `/api/admin/clients/${encodeURIComponent(client.id)}/password`
                : null
            }
          />
        </dd>
      </dl>

      <h2 className="app-page__section">{copy.portalAccount}</h2>
      {client.portalAccount ? (
        <dl className="staff-apps__dl">
          <dt>{copy.name}</dt>
          <dd>{client.portalAccount.name}</dd>
          <dt>{shared.email}</dt>
          <dd>{client.portalAccount.email}</dd>
          <dt>{copy.signedUp}</dt>
          <dd>{formatDay(client.portalAccount.createdAt)}</dd>
          <dt>{copy.accountId}</dt>
          <dd>{client.portalAccount.id}</dd>
          <dt>{t.admin.secret.password}</dt>
          <dd>
            <SecretField path={`/api/admin/clients/${encodeURIComponent(client.id)}/password`} />
          </dd>
        </dl>
      ) : (
        <p className="app-page__note">{copy.portalEmpty}</p>
      )}
      <p className="admin-hint admin-hint--after">{copy.readOnly}</p>
    </article>
  );
}

function AdviserTab({ client }: { client: ClientWithAdviser }) {
  const { t } = useI18n();
  const copy = t.admin.clients;
  const { adviser, instructedPersonSlug } = client;

  return (
    <article className="staff-apps__panel">
      <h2 className="app-page__section admin-section--first">{copy.adviser}</h2>
      {adviser ? (
        <>
          <Link className="admin-adviser" to={`/admin/employees/${encodeURIComponent(adviser.slug)}`}>
            <Avatar name={adviser.name} photoUrl={adviser.photoUrl} size="md" />
            <span className="admin-adviser__text">
              <span className="admin-adviser__name">{adviser.name}</span>
              <span className="admin-adviser__role">{adviser.role || copy.unset}</span>
            </span>
          </Link>
          <dl className="staff-apps__dl">
            <dt>{copy.instructedSlug}</dt>
            <dd>{instructedPersonSlug}</dd>
          </dl>
        </>
      ) : (
        <p className="app-page__note">
          {instructedPersonSlug
            ? copy.adviserMissing.replace("{slug}", instructedPersonSlug)
            : copy.adviserNone}
        </p>
      )}
      <p className="admin-hint admin-hint--after">{copy.adviserHint}</p>
    </article>
  );
}

function applicationFromAdminClient(client: ClientWithAdviser): ClientApplication {
  return {
    id: client.id,
    createdAt: client.createdAt,
    name: client.name,
    email: client.email,
    phone: client.phone,
    instructedPersonSlug: client.instructedPersonSlug,
    registered: client.registered,
    portalAccount: client.portalAccount,
    photoStoragePath: null,
    documents: emptyClientDocuments(),
  };
}

function prepareAdminDocument(
  kind: keyof DocumentsMap,
  client: ClientWithAdviser,
  people: EmployeeProfile[],
): Promise<{ bytes: Uint8Array; filename: string }> {
  if (kind !== "agreement") {
    return Promise.reject(new Error("This workspace generates the client agreement only."));
  }
  return prepareClientAgreement(applicationFromAdminClient(client), people);
}

function DocumentsTab({ client }: { client: ClientWithAdviser }) {
  const { t } = useI18n();
  const copy = t.admin.clients;
  const shared = t.admin.client;
  const [people, setPeople] = useState<EmployeeProfile[]>(() => (client.adviser ? [client.adviser] : []));
  const [preview, setPreview] = useState<{ kind: keyof DocumentsMap; prepare: PreviewPrepare } | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;
    api<EmployeeProfile[]>("/api/auth/employee/directory")
      .then((directory) => {
        if (!cancelled) setPeople(directory);
      })
      .catch(() => {
        if (!cancelled) setPeople(client.adviser ? [client.adviser] : []);
      });
    return () => {
      cancelled = true;
    };
  }, [client.adviser]);

  function open(kind: keyof DocumentsMap) {
    if (kind !== "agreement") return;
    setPreview({
      kind,
      prepare: () => prepareAdminDocument(kind, client, people),
    });
  }

  return (
    <article className="staff-apps__panel">
      <h2 className="app-page__section admin-section--first">{shared.documents}</h2>
      <p className="doc-pack__count">
        {copy.filedCount
          .replace("{n}", String(filedCount(client)))
          .replace("{total}", String(DOC_KINDS.length))}
      </p>
      <ClientDocuments documents={client.documents} onOpen={open} />
      <p className="admin-hint admin-hint--after">{shared.kycNote}</p>
      <DocumentPreviewDialog
        open={Boolean(preview)}
        copy={{
          ...adminPreviewCopy(preview ? DOCUMENT_KIND_LABELS[preview.kind] : ""),
          ...(preview && preview.kind !== "agreement" ? { fail: shared.previewUnavailable } : {}),
        }}
        prepare={preview?.prepare ?? null}
        runKey={preview ? `${client.id}:${preview.kind}` : undefined}
        wait="close"
        onClose={() => setPreview(null)}
      />
    </article>
  );
}

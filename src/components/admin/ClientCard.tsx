import { CircleCheck, CircleDashed } from "lucide-react";
import { Link } from "react-router";
import type { ClientSummary } from "@domain/onboarding/model.ts";
import type { EmployeeProfile } from "@domain/staff/model.ts";
import { useI18n } from "../../i18n/context.tsx";
import type { DocumentsMap } from "../../js/clients-documents-model.js";
import { DOCUMENT_KIND_LABELS, DOCUMENT_KINDS } from "../../js/clients-documents-model.js";
import { formatDay } from "../../lib/format.ts";
import { Avatar } from "../ui/avatar.tsx";
import { Icon } from "../ui/icon.tsx";

export const DOC_KINDS = DOCUMENT_KINDS as readonly (keyof DocumentsMap)[];

export function filedCount(client: ClientSummary): number {
  return DOC_KINDS.filter((kind) => client.documents?.[kind]).length;
}

export function RegisteredTag({ registered }: { registered: boolean }) {
  const { t } = useI18n();
  const copy = t.admin.client;

  return (
    <span className={`staff-apps__tag${registered ? " is-registered" : ""}`}>
      <Icon icon={registered ? CircleCheck : CircleDashed} size={14} />
      {registered ? copy.registered : copy.unregistered}
    </span>
  );
}

/** What the firm has on file for a client, as dates. Field values stay server side. */
export function ClientDocuments({
  documents,
  onOpen,
}: {
  documents: ClientSummary["documents"];
  onOpen?: (kind: keyof DocumentsMap) => void;
}) {
  const { t } = useI18n();
  const copy = t.admin.client;

  return (
    <ul className="admin-docs">
      {DOC_KINDS.map((kind) => {
        const filedAt = documents?.[kind] ?? null;
        const className = `admin-doc${filedAt ? " is-filed" : ""}`;
        const body = (
          <>
            <Icon icon={filedAt ? CircleCheck : CircleDashed} size={13} />
            {DOCUMENT_KIND_LABELS[kind]}
            <span className="admin-doc__when">
              {filedAt
                ? copy.documentsFiled.replace("{date}", formatDay(filedAt))
                : copy.documentsPending}
            </span>
          </>
        );
        const canOpen = kind === "agreement" || (kind === "p2p" && filedAt) ? onOpen : undefined;
        return (
          <li key={kind}>
            {canOpen ? (
              <button type="button" className={className} onClick={() => canOpen(kind)}>
                {body}
              </button>
            ) : (
              <span className={className}>{body}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * One client as the console sees them. Pass `adviser` to show who holds them
 * — `null` says nobody does, leaving it out drops the row entirely.
 */
export function ClientCard({
  client,
  adviser,
  href,
}: {
  client: ClientSummary;
  adviser?: EmployeeProfile | null;
  href?: string;
}) {
  const { t } = useI18n();
  const copy = t.admin.client;

  return (
    <article className="admin-client">
      <div className="admin-client__head">
        <h3 className="admin-client__name">
          <span className="admin-who">
            <Avatar name={client.name} photoUrl={client.photoUrl} size="sm" />
            {href ? (
              <Link className="admin-client__link" to={href}>
                {client.name}
              </Link>
            ) : (
              client.name
            )}
          </span>
        </h3>
        <RegisteredTag registered={client.registered} />
      </div>
      <dl className="staff-apps__dl">
        {adviser !== undefined ? (
          <>
            <dt>{copy.adviser}</dt>
            <dd>
              {adviser ? (
                <Link to={`/admin/employees/${encodeURIComponent(adviser.slug)}`}>
                  {adviser.name}
                </Link>
              ) : (
                copy.unassigned
              )}
            </dd>
          </>
        ) : null}
        <dt>{copy.email}</dt>
        <dd>
          <a href={`mailto:${client.email}`}>{client.email}</a>
        </dd>
        <dt>{copy.phone}</dt>
        <dd>
          <a href={`tel:${client.phone}`}>{client.phone}</a>
        </dd>
        <dt>{copy.applied}</dt>
        <dd>{formatDay(client.createdAt)}</dd>
        {client.portalAccount ? (
          <>
            <dt>{copy.portal}</dt>
            <dd>{formatDay(client.portalAccount.createdAt)}</dd>
          </>
        ) : null}
      </dl>
      <p className="doc-pack__count admin-client__docs-label">{copy.documents}</p>
      <ClientDocuments documents={client.documents} />
    </article>
  );
}

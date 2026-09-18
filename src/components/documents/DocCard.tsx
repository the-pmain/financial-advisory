import { Link } from "react-router";
import { CircleCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Icon } from "../ui/icon.tsx";
import type { DocStatus } from "../../documents/storage.ts";

export function DocCard({
  to,
  icon,
  title,
  hint,
  status,
  statusLabel,
}: {
  to?: string;
  icon: LucideIcon;
  title: string;
  hint: string;
  status: DocStatus;
  statusLabel?: string;
}) {
  const className = `doc-card is-${status}${to ? "" : " is-static"}`;
  const body = (
    <>
      {status === "complete" ? (
        <span className="doc-card__mark" aria-hidden="true">
          <Icon icon={CircleCheck} />
        </span>
      ) : null}
      <span className="doc-card__icon" aria-hidden="true">
        <Icon icon={icon} size={28} />
      </span>
      <span className="doc-card__title">{title}</span>
      <span className="doc-card__hint">{hint}</span>
      {statusLabel ? <span className="doc-card__status">{statusLabel}</span> : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={className}>
        {body}
      </Link>
    );
  }

  return (
    <div className={className} aria-disabled={status === "disabled"}>
      {body}
    </div>
  );
}

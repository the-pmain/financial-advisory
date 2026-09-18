import { Icon } from "../ui/icon.tsx";
import { DOC_KIND_ICON } from "../../sample/kinds.ts";
import type { DocKind } from "../../sample/portal.ts";

export function DocRow({
  title,
  date,
  kind,
}: {
  title: string;
  date: string;
  kind: DocKind;
}) {
  return (
    <li className="viz-doc">
      <span className="viz-well" aria-hidden="true">
        <Icon icon={DOC_KIND_ICON[kind]} />
      </span>
      <span className="viz-doc__body">
        <span className="viz-doc__title">{title}</span>
        <span className="viz-doc__meta">
          {kind} · {date}
        </span>
      </span>
    </li>
  );
}

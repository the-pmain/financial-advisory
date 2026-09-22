import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  composeSeedKey,
  deriveComposeValues,
  DOCUMENT_FIELD_GROUPS,
  hydrateCompose,
  kindSaved,
  mockComposeValues,
  previewCompose,
  saveFieldsForCompose,
  showWhenMatches,
} from "@domain/documents/compose.ts";
import type { DocumentsMap } from "../../js/clients-documents-model.js";
import type { ClientApplication } from "@domain/onboarding/model.ts";
import type { EmployeeProfile } from "@domain/staff/model.ts";
import { api } from "../../api/client.ts";
import {
  adminPreviewCopy,
  DocumentPreviewDialog,
  type PreviewPrepare,
} from "../admin/DocumentPreviewDialog.tsx";

export type ComposeCopy = {
  title: string;
  mock: string;
  preview: string;
  save: string;
  update: string;
  replaceNote: string;
  close: string;
  saving: string;
  fail: string;
};

function visibleGroups(kind: string, values: Record<string, string>) {
  return (DOCUMENT_FIELD_GROUPS[kind] ?? []).map((group) => ({
    title: group.title,
    fields: group.fields.filter((item) => showWhenMatches(item.showWhen, values)),
  })).filter((group) => group.fields.length > 0);
}

export function DocumentComposeDialog({
  open,
  kind,
  client,
  people,
  copy,
  onClose,
  onSaved,
}: {
  open: boolean;
  kind: string;
  client: ClientApplication;
  people: EmployeeProfile[];
  copy: ComposeCopy;
  onClose: () => void;
  onSaved: (documents: DocumentsMap) => void;
}) {
  const saved = kindSaved(client.documents, kind);
  const seedKey = composeSeedKey(client.id, kind, client.documents);
  const clientRef = useRef(client);
  const peopleRef = useRef(people);
  clientRef.current = client;
  peopleRef.current = people;
  const [values, setValues] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<"save" | "preview" | null>(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<{ runKey: string; prepare: PreviewPrepare } | null>(null);

  useEffect(() => {
    if (!open) return;
    setValues(hydrateCompose(kind, clientRef.current, peopleRef.current));
    setError("");
    setBusy(null);
  }, [open, seedKey, kind]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open || busy) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, busy, onClose]);

  const groups = useMemo(() => visibleGroups(kind, values), [kind, values]);

  if (!open) return null;

  function setField(name: string, value: string) {
    setValues((current) => deriveComposeValues(kind, { ...current, [name]: value }, name));
  }

  async function save() {
    setBusy("save");
    setError("");
    try {
      const fields = saveFieldsForCompose(kind, values, client, people);
      const result = await api<{ documents: DocumentsMap }>(
        `/api/employees/clients/${encodeURIComponent(client.id)}/documents/${encodeURIComponent(kind)}`,
        {
          method: "PUT",
          body: JSON.stringify({ client_id: client.id, kind, fields }),
        },
      );
      onSaved(result.documents);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.fail);
    } finally {
      setBusy(null);
    }
  }

  function openPreview() {
    setBusy("preview");
    setPreview({
      runKey: `${seedKey}:${Date.now()}`,
      prepare: () => previewCompose(kind, values, client, people),
    });
  }

  return createPortal(
    <div className="doc-compose-scrim">
      <div role="dialog" aria-modal="true" aria-labelledby="document-compose-title" className="doc-compose">
        <header className="doc-compose__head">
          <h2 id="document-compose-title" className="doc-compose__title">
            {copy.title}
          </h2>
          <button type="button" disabled={Boolean(busy)} onClick={onClose} className="doc-preview__text-btn">
            {copy.close}
          </button>
        </header>

        <form
          className="doc-compose__body"
          onSubmit={(event) => {
            event.preventDefault();
            void save();
          }}
        >
          {groups.map((group) => (
            <fieldset key={group.title} className="doc-compose__group">
              <legend className="doc-compose__legend">{group.title}</legend>
              <div className="doc-compose__grid">
                {group.fields.map((item) => {
                  const wide = item.type === "textarea";
                  const id = `compose-${kind}-${item.name}`;
                  return (
                    <label
                      key={item.name}
                      className={`doc-compose__field${wide ? " doc-compose__field--wide" : ""}`}
                      htmlFor={item.locked ? undefined : id}
                    >
                      <span className="appointment-form__label">{item.label}</span>
                      {item.locked ? (
                        <>
                          <input
                            className="appointment-form__control"
                            value={values[item.name] ?? ""}
                            disabled
                            readOnly
                          />
                          <input type="hidden" name={item.name} value={values[item.name] ?? ""} />
                        </>
                      ) : item.type === "textarea" ? (
                        <textarea
                          id={id}
                          className="appointment-form__control doc-compose__area"
                          name={item.name}
                          value={values[item.name] ?? ""}
                          placeholder={item.placeholder}
                          rows={4}
                          disabled={Boolean(busy)}
                          onChange={(event) => setField(item.name, event.target.value)}
                        />
                      ) : item.type === "select" ? (
                        <select
                          id={id}
                          className="appointment-form__control"
                          name={item.name}
                          value={values[item.name] ?? ""}
                          disabled={Boolean(busy)}
                          onChange={(event) => setField(item.name, event.target.value)}
                        >
                          {(item.options ?? []).map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={id}
                          className="appointment-form__control"
                          name={item.name}
                          type={item.type ?? "text"}
                          value={values[item.name] ?? ""}
                          placeholder={item.placeholder}
                          disabled={Boolean(busy)}
                          onChange={(event) => setField(item.name, event.target.value)}
                        />
                      )}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
          {saved ? <p className="doc-compose__note">{copy.replaceNote}</p> : null}
          {error ? (
            <p className="appointment-form__error" role="alert">
              {error}
            </p>
          ) : null}
        </form>

        <footer className="doc-compose__foot">
          <button
            type="button"
            className="doc-preview__text-btn"
            disabled={Boolean(busy)}
            onClick={() => setValues((current) => mockComposeValues(kind, current))}
          >
            {copy.mock}
          </button>
          <button
            type="button"
            className="doc-preview__text-btn"
            disabled={Boolean(busy)}
            onClick={openPreview}
          >
            {copy.preview}
          </button>
          <button
            type="button"
            className="doc-preview__download"
            disabled={Boolean(busy)}
            onClick={() => void save()}
          >
            {busy === "save" ? copy.saving : saved ? copy.update : copy.save}
          </button>
        </footer>
      </div>

      <DocumentPreviewDialog
        open={Boolean(preview)}
        copy={adminPreviewCopy(copy.title)}
        prepare={preview?.prepare ?? null}
        runKey={preview?.runKey}
        wait="close"
        onClose={() => {
          setPreview(null);
          setBusy(null);
        }}
      />
    </div>,
    document.body,
  );
}

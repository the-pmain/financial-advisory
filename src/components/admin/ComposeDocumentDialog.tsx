import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  DOCUMENT_KIND_LABELS,
  kindSaved,
  type DocumentsMap,
} from '../../js/clients-documents-model.js';
import {
  applyLossCaps,
  DOCUMENT_FIELD_GROUPS,
  showWhenMatches,
  valuesForCompose,
} from '../../js/document-fields.js';
import { applyDocumentMock } from '../../js/document-mocks.js';
import { generateDocument } from '../../js/document-generate.js';
import { useEscape, useScrollLock } from '../../hooks/useScrollLock';
import type { AdminClient } from '../../lib/adminApi';
import { DocumentPreviewDialog, adminPreviewCopy } from './DocumentPreviewDialog';

export function ComposeDocumentDialog({
  open,
  client,
  kind,
  register,
  onClose,
  onSave,
  saving,
}: {
  open: boolean;
  client: AdminClient | null;
  kind: string | null;
  register: { feeEarner: string; people: unknown; filenamePrefix?: string } | null;
  onClose: () => void;
  onSave: (fields: Record<string, string>) => Promise<void>;
  saving: boolean;
}) {
  const alreadySaved = Boolean(client && kind && kindSaved(client.documents as DocumentsMap, kind));
  const initial = useMemo(
    () =>
      client && kind && register
        ? valuesForCompose(kind, client, client.documents, register)
        : {},
    [client, kind, register],
  );
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [previewing, setPreviewing] = useState(false);
  const formKey = `${client?.id ?? ''}:${kind ?? ''}:${alreadySaved ? 'saved' : 'new'}`;
  const [hydratedKey, setHydratedKey] = useState(formKey);
  if (formKey !== hydratedKey) {
    setHydratedKey(formKey);
    setValues(initial);
  }

  const inFlight = saving || previewing;
  useScrollLock(open);
  useEscape(open && !inFlight, onClose);

  if (!open || !client || !kind || !register) return null;

  const groups = DOCUMENT_FIELD_GROUPS[kind] ?? [];
  const label = DOCUMENT_KIND_LABELS[kind] ?? kind;

  function setField(name: string, value: string) {
    setValues((current) => {
      const next = { ...current, [name]: value };
      if (kind === 'tracing' && name === 'loss') return applyLossCaps(next);
      return next;
    });
  }

  function fieldsForSave() {
    const out: Record<string, string> = {};
    for (const group of groups) {
      for (const item of group.fields) {
        if (!showWhenMatches(item.showWhen, values)) continue;
        out[item.name] = values[item.name] ?? '';
      }
    }
    if (kind !== 'tracing' && register) out.feeEarner = register.feeEarner;
    return out;
  }

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(7,14,24,0.46)] p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="compose-document-title"
        className="flex max-h-[92vh] w-full max-w-[760px] flex-col overflow-hidden rounded-[4px] bg-white shadow-[0_12px_40px_rgba(7,14,24,0.28)]"
      >
        <header className="border-vz-rule flex items-center justify-between gap-3 border-b px-5 py-4">
          <h2 id="compose-document-title" className="text-vz-ink m-0 text-[18px] font-bold">
            {label}
          </h2>
          <button
            type="button"
            disabled={inFlight}
            onClick={onClose}
            className="text-vz-blue hover:bg-vz-blue-panel h-9 cursor-pointer rounded-[3px] px-3 text-[14px] font-bold disabled:opacity-50"
          >
            Close
          </button>
        </header>

        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            void onSave(fieldsForSave());
          }}
        >
          <div className="min-h-0 flex-1 space-y-6 overflow-auto px-5 py-4">
            {alreadySaved && (
              <p className="bg-vz-cream-light text-vz-ink m-0 rounded-[3px] px-3 py-2 text-[14px]">
                This document is already on file. Saving will replace it.
              </p>
            )}
            {groups.map((group) => (
              <fieldset key={group.title} className="m-0 border-0 p-0">
                <legend className="text-vz-blue mb-3 text-[13px] font-bold tracking-[0.04em] uppercase">
                  {group.title}
                </legend>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {group.fields.map((item) => {
                    if (!showWhenMatches(item.showWhen, values)) return null;
                    const locked = Boolean(item.locked) && kind !== 'tracing';
                    const value = locked ? register.feeEarner : (values[item.name] ?? '');
                    const id = `compose-${kind}-${item.name}`;
                    const control =
                      'text-vz-ink w-full rounded-[3px] border border-vz-rule bg-white px-3 py-[10px] text-[15px] leading-[1.4] disabled:bg-vz-blue-panel-faint';
                    return (
                      <label
                        key={item.name}
                        className={item.type === 'textarea' ? 'md:col-span-2' : ''}
                        htmlFor={id}
                        data-show-when={item.showWhen}
                      >
                        <span className="text-vz-ink mb-[6px] block text-[13px] font-bold">{item.label}</span>
                        {item.type === 'textarea' ? (
                          <textarea
                            id={id}
                            name={item.name}
                            rows={3}
                            value={value}
                            disabled={locked}
                            onChange={(event) => setField(item.name, event.target.value)}
                            className={control}
                          />
                        ) : item.type === 'select' ? (
                          <select
                            id={id}
                            name={item.name}
                            value={value}
                            disabled={locked}
                            onChange={(event) => setField(item.name, event.target.value)}
                            className={control}
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
                            name={item.name}
                            type={item.type === 'date' || item.type === 'email' || item.type === 'tel' ? item.type : 'text'}
                            value={value}
                            disabled={locked}
                            onChange={(event) => setField(item.name, event.target.value)}
                            className={control}
                          />
                        )}
                        {locked && <input type="hidden" name={item.name} value={register.feeEarner} />}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <footer className="border-vz-rule flex flex-wrap items-center justify-end gap-2 border-t px-5 py-4">
            <button
              type="button"
              disabled={inFlight}
              onClick={() => setValues((current) => applyDocumentMock(kind, current))}
              className="border-vz-rule text-vz-blue hover:bg-vz-blue-panel inline-flex h-10 cursor-pointer items-center rounded-[3px] border px-4 text-[14px] font-bold disabled:opacity-50"
            >
              Insert mock
            </button>
            <button
              type="button"
              disabled={inFlight}
              onClick={() => setPreviewing(true)}
              className="border-vz-rule text-vz-blue hover:bg-vz-blue-panel inline-flex h-10 cursor-pointer items-center rounded-[3px] border px-4 text-[14px] font-bold disabled:opacity-50"
            >
              Preview
            </button>
            <button
              type="submit"
              disabled={inFlight}
              className="bg-vz-blue hover:bg-vz-blue-mid inline-flex h-10 cursor-pointer items-center rounded-[3px] px-4 text-[14px] font-bold text-white disabled:opacity-50"
            >
              {saving ? 'Saving…' : alreadySaved ? 'Update' : 'Save'}
            </button>
          </footer>
        </form>
      </div>

      <DocumentPreviewDialog
        open={previewing}
        copy={adminPreviewCopy(label)}
        confirm={false}
        wait="ready"
        runKey={previewing && kind ? `${kind}` : undefined}
        prepare={
          previewing
            ? () =>
                generateDocument(kind, fieldsForSave(), { register, people: register.people }).then((result) => ({
                  bytes: result.bytes,
                  filename: result.filename,
                }))
            : null
        }
        onClose={() => setPreviewing(false)}
      />
    </div>,
    document.body,
  );
}

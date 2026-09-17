import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
  type Ref,
} from 'react';
import { createPortal } from 'react-dom';
import { FolderIcon, MoreIcon, PreviewIcon } from '../ui/Icons';
import { company } from '../../data/company';
import { teamBySlug, teamMembers } from '../../data/team';
import { useEscape } from '../../hooks/useScrollLock';
import { formatAdminDateTime } from '../../js/admin-date.js';
import {
  DOCUMENT_KIND_LABELS,
  composeKindsSaved,
  kindSaved,
} from '../../js/clients-documents-model.js';
import { valuesForCompose } from '../../js/document-fields.js';
import { generateDocument } from '../../js/document-generate.js';
import { buildDocumentRegister } from '../../js/document-register.js';
import {
  fetchAdminClients,
  patchAdminClientIsTest,
  saveAdminDocument,
  type AdminClient,
  type AdminDocumentKind,
  type ClientsTestFilter,
} from '../../lib/adminApi';
import { ComposeDocumentDialog } from './ComposeDocumentDialog';
import { DocumentPreviewDialog, adminPreviewCopy } from './DocumentPreviewDialog';

const ADMIN_DOCUMENT_KINDS = ['brochure'] as const satisfies readonly AdminDocumentKind[];
const PER_PAGE = 10;
const ROW_H = 76;
const LIST_MIN_H = PER_PAGE * ROW_H;
const ROW_GRID =
  'grid grid-cols-[minmax(0,1.4fr)_minmax(0,1.05fr)_minmax(0,0.9fr)_5.25rem_5rem_minmax(0,1.25fr)_7.75rem] items-center gap-x-4';

type TestFilter = ClientsTestFilter;
type MenuKind = 'folder' | 'kebab';
type OpenMenu = { id: string; kind: MenuKind } | null;

function formatWhen(iso: string): string {
  return formatAdminDateTime(iso);
}

function adviserName(slug: string | null): string {
  if (!slug) return '—';
  return teamBySlug.get(slug)?.name ?? slug;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function savedKindList(client: AdminClient): AdminDocumentKind[] {
  return ADMIN_DOCUMENT_KINDS.filter((kind) => kindSaved(client.documents, kind));
}

export function ClientsPanel({ onUnauthorized }: { onUnauthorized: () => void }) {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<TestFilter>('all');
  const [items, setItems] = useState<AdminClient[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [pdfBusyId, setPdfBusyId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [menu, setMenu] = useState<OpenMenu>(null);
  const [compose, setCompose] = useState<{ client: AdminClient; kind: AdminDocumentKind } | null>(null);
  const [preview, setPreview] = useState<{
    title: string;
    runKey: string;
    prepare: () => Promise<{
      bytes: Uint8Array;
      filename: string;
    }>;
  } | null>(null);

  const registerFor = useCallback(
    (client?: AdminClient | null) =>
      buildDocumentRegister({
        company,
        teamMembers,
        instructedSlug: client?.instructed_person_slug,
      }),
    [],
  );

  const load = useCallback(
    async (nextPage: number, nextFilter: TestFilter, silent = false) => {
      if (!silent) setLoading(true);
      setError(null);
      try {
        const result = await fetchAdminClients(nextPage, PER_PAGE, nextFilter);
        if ('authenticated' in result && result.authenticated === false) {
          onUnauthorized();
          return;
        }
        if (!('items' in result)) {
          setError(result.error ?? 'Could not load clients.');
          setItems([]);
          return;
        }
        setItems(result.items);
        setPage(result.page);
        setTotal(result.total);
        setTotalPages(result.total_pages);
        setHasPrev(result.has_prev);
        setHasNext(result.has_next);
      } catch {
        setError('Could not load clients.');
        setItems([]);
      } finally {
        setLoading(false);
      }
    },
    [onUnauthorized],
  );

  useEffect(() => {
    void load(page, filter);
  }, [load, page, filter]);

  function onFilterChange(next: TestFilter) {
    setMenu(null);
    setFilter(next);
    setPage(1);
  }

  function openPreview(client: AdminClient, kind: AdminDocumentKind) {
    const register = registerFor(client);
    const title = DOCUMENT_KIND_LABELS[kind] ?? kind;
    setMenu(null);
    setPdfBusyId(client.id);
    setPreview({
      title,
      runKey: `${client.id}:${kind}`,
      prepare: async () => {
        const values = valuesForCompose(kind, client, client.documents, register);
        const result = await generateDocument(kind, values, { register, people: register.people });
        return {
          bytes: result.bytes,
          filename: result.filename,
        };
      },
    });
  }

  async function onSaveCompose(fields: Record<string, string>) {
    if (!compose) return;
    const { client, kind } = compose;
    setSavingId(client.id);
    setError(null);
    const result = await saveAdminDocument(client.id, kind, fields);
    setSavingId(null);
    if ('authenticated' in result && result.authenticated === false) {
      onUnauthorized();
      return;
    }
    if (!('ok' in result) || result.ok !== true) {
      setError('error' in result && result.error ? result.error : 'Could not save the document.');
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.id === client.id ? { ...item, document_id: result.id, documents: result.documents } : item,
      ),
    );
    setCompose(null);
  }

  async function onToggleTest(client: AdminClient) {
    const next = !client.is_test;
    setMenu(null);
    setTogglingId(client.id);
    setError(null);
    setItems((current) =>
      current.map((item) => (item.id === client.id ? { ...item, is_test: next } : item)),
    );
    const result = await patchAdminClientIsTest(client.id, next);
    setTogglingId(null);
    if ('authenticated' in result && result.authenticated === false) {
      onUnauthorized();
      return;
    }
    if (!('ok' in result) || result.ok !== true) {
      setItems((current) =>
        current.map((item) => (item.id === client.id ? { ...item, is_test: client.is_test } : item)),
      );
      setError('error' in result && result.error ? result.error : 'Could not update the test flag.');
      return;
    }
    if ((filter === 'live' && next) || (filter === 'test' && !next)) {
      await load(page, filter, true);
    }
  }

  const empty = !loading && items.length === 0;
  const showSkeleton = loading && items.length === 0;

  return (
    <div className="overflow-hidden rounded-[4px] bg-white shadow-[0_0_2px_rgba(0,0,0,0.2)]">
      <div className="border-vz-rule flex flex-wrap items-center justify-between gap-4 border-b px-6 py-5 max-mob:px-4">
        <div>
          <p className="text-vz-ink m-0 text-[20px] leading-none font-bold tracking-vz-head">
            {loading && items.length === 0 ? 'Clients' : `${total} ${total === 1 ? 'client' : 'clients'}`}
          </p>
          <p className="text-vz-gray m-0 mt-1.5 min-h-[20px] text-[13px]">
            {totalPages > 0 ? `Page ${page} of ${totalPages}` : 'Intake from team consultation forms'}
          </p>
        </div>
        <TestFilterSwitch value={filter} onChange={onFilterChange} />
      </div>

      <div className="relative" style={{ minHeight: LIST_MIN_H + 44 }}>
        {error && (
          <p
            className="bg-vz-cream-light text-vz-orange absolute top-3 right-6 left-6 z-20 m-0 rounded-[3px] px-3 py-2 text-[14px]"
            role="alert"
          >
            {error}
          </p>
        )}

        <div className="overflow-x-auto px-6 max-mob:px-4">
          <div className="min-w-[980px]">
            <div className={`${ROW_GRID} text-vz-gray-mid bg-vz-blue-panel-faint border-vz-rule border-b py-3 pr-1 pl-1 text-[11px] font-bold tracking-[0.08em] uppercase`}>
              <span>Client</span>
              <span>Contact</span>
              <span>Adviser</span>
              <span>Consent</span>
              <span>Test</span>
              <span>Documents</span>
              <span className="overflow-hidden whitespace-nowrap text-[0px] text-transparent">Actions</span>
            </div>

            {empty ? (
              <div className="flex items-center justify-center" style={{ height: LIST_MIN_H }}>
                <p className="text-vz-gray-mid m-0 text-center text-[16px] leading-[1.45]">
                  {filter === 'all' ? 'No clients yet.' : `No ${filter} clients on this page.`}
                </p>
              </div>
            ) : (
              <ul className="m-0 list-none p-0">
                {(showSkeleton ? Array.from({ length: PER_PAGE }, (_, i) => i) : items).map((entry) =>
                  showSkeleton ? (
                    <SkeletonRow key={entry as number} />
                  ) : (
                    <ClientRow
                      key={(entry as AdminClient).id}
                      client={entry as AdminClient}
                      menu={menu}
                      pdfBusy={pdfBusyId === (entry as AdminClient).id}
                      toggling={togglingId === (entry as AdminClient).id}
                      onToggleMenu={(kind) =>
                        setMenu((current) =>
                          current?.id === (entry as AdminClient).id && current.kind === kind
                            ? null
                            : { id: (entry as AdminClient).id, kind },
                        )
                      }
                      onCloseMenu={() => setMenu(null)}
                      onPreviewKind={(kind) => openPreview(entry as AdminClient, kind)}
                      onComposeKind={(kind) => {
                        setMenu(null);
                        setCompose({ client: entry as AdminClient, kind });
                      }}
                      onToggleTest={() => void onToggleTest(entry as AdminClient)}
                    />
                  ),
                )}
              </ul>
            )}
          </div>
        </div>

        {loading && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center bg-white/80"
            aria-busy="true"
            aria-live="polite"
          >
            <LoaderMark label="Loading clients" />
          </div>
        )}
      </div>

      <nav
        className="border-vz-rule flex min-h-[72px] items-center justify-between gap-3 border-t px-6 max-mob:px-4"
        aria-label="Client list pages"
      >
        <PagerButton label="Previous" disabled={!hasPrev || loading} onClick={() => setPage((current) => Math.max(1, current - 1))} />
        <p className="text-vz-gray m-0 text-[13px] tabular-nums">{totalPages > 0 ? `${page} / ${totalPages}` : '—'}</p>
        <PagerButton label="Next" disabled={!hasNext || loading} onClick={() => setPage((current) => current + 1)} />
      </nav>

      <ComposeDocumentDialog
        open={Boolean(compose)}
        client={compose?.client ?? null}
        kind={compose?.kind ?? null}
        register={compose ? registerFor(compose.client) : null}
        saving={Boolean(compose && savingId === compose.client.id)}
        onClose={() => {
          if (!savingId) setCompose(null);
        }}
        onSave={onSaveCompose}
      />

      <DocumentPreviewDialog
        open={Boolean(preview)}
        copy={adminPreviewCopy(preview?.title ?? 'Document')}
        confirm={false}
        wait="close"
        runKey={preview?.runKey}
        prepare={preview?.prepare ?? null}
        onClose={() => {
          setPreview(null);
          setPdfBusyId(null);
        }}
        onReady={() => setPdfBusyId(null)}
      />
    </div>
  );
}

function ClientRow({
  client,
  menu,
  pdfBusy,
  toggling,
  onToggleMenu,
  onCloseMenu,
  onPreviewKind,
  onComposeKind,
  onToggleTest,
}: {
  client: AdminClient;
  menu: OpenMenu;
  pdfBusy: boolean;
  toggling: boolean;
  onToggleMenu: (kind: MenuKind) => void;
  onCloseMenu: () => void;
  onPreviewKind: (kind: AdminDocumentKind) => void;
  onComposeKind: (kind: AdminDocumentKind) => void;
  onToggleTest: () => void;
}) {
  const badges = savedKindList(client);
  return (
    <li
      className="border-vz-rule hover:bg-vz-blue-panel-faint relative min-h-[76px] border-b transition-colors duration-150 last:border-b-0"
      aria-busy={toggling}
    >
      <div className={`${ROW_GRID} min-h-[76px] px-1 py-2`}>
        <div className="flex min-w-0 items-center gap-3">
          <div className="bg-vz-blue-tint text-vz-blue relative flex size-11 shrink-0 items-center justify-center rounded-[3px] text-[13px] font-bold tracking-[0.04em]">
            <span className={toggling ? 'opacity-0' : undefined}>{initials(client.name)}</span>
            {toggling && (
              <span className="absolute inset-0 flex items-center justify-center">
                <RowSpinner label={`Updating test flag for ${client.name}`} />
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-vz-ink m-0 truncate text-[15px] font-bold">{client.name}</p>
            <p className="text-vz-gray m-0 mt-0.5 truncate text-[12px]">{formatWhen(client.created_at)}</p>
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-vz-ink m-0 truncate text-[14px]">{client.email}</p>
          <p className="text-vz-gray m-0 mt-0.5 truncate text-[13px]">{client.phone || '—'}</p>
        </div>
        <p className="text-vz-ink m-0 truncate text-[14px]">{adviserName(client.instructed_person_slug)}</p>
        <p className="m-0">
          <span
            className={`inline-block rounded-[3px] px-1.5 py-0.5 text-[11px] font-bold tracking-[0.04em] uppercase ${
              client.consent ? 'bg-vz-blue-panel text-vz-blue' : 'bg-vz-cream text-vz-orange'
            }`}
          >
            {client.consent ? 'Given' : 'No'}
          </span>
        </p>
        <TestSwitch
          checked={client.is_test}
          disabled={toggling}
          label={`Test record for ${client.name}`}
          onToggle={onToggleTest}
        />
        <div className="flex flex-wrap gap-1">
          {badges.length ? (
            badges.map((kind) => (
              <span
                key={kind}
                className="bg-vz-blue-panel text-vz-blue inline-block rounded-[3px] px-1.5 py-0.5 text-[10px] font-bold tracking-[0.03em] uppercase"
              >
                {DOCUMENT_KIND_LABELS[kind]}
              </span>
            ))
          ) : (
            <span className="text-vz-gray-mid text-[13px]">None</span>
          )}
        </div>
        <RowActions
          client={client}
          menu={menu}
          pdfBusy={pdfBusy}
          onToggleMenu={onToggleMenu}
          onCloseMenu={onCloseMenu}
          onPreviewKind={onPreviewKind}
          onComposeKind={onComposeKind}
        />
      </div>
    </li>
  );
}

function RowActions({
  client,
  menu,
  pdfBusy,
  onToggleMenu,
  onCloseMenu,
  onPreviewKind,
  onComposeKind,
}: {
  client: AdminClient;
  menu: OpenMenu;
  pdfBusy: boolean;
  onToggleMenu: (kind: MenuKind) => void;
  onCloseMenu: () => void;
  onPreviewKind: (kind: AdminDocumentKind) => void;
  onComposeKind: (kind: AdminDocumentKind) => void;
}) {
  const folderSaved = composeKindsSaved(client.documents).filter((kind) =>
    ADMIN_DOCUMENT_KINDS.includes(kind as (typeof ADMIN_DOCUMENT_KINDS)[number]),
  ) as AdminDocumentKind[];
  const folderOpen = menu?.id === client.id && menu.kind === 'folder';
  const kebabOpen = menu?.id === client.id && menu.kind === 'kebab';

  return (
    <div className="flex items-center justify-end gap-1">
      <ActionMenu
        label={`Saved documents for ${client.name}`}
        disabled={!folderSaved.length}
        title={folderSaved.length ? 'Saved documents' : 'No saved documents yet'}
        open={folderOpen}
        busy={pdfBusy}
        icon={<FolderIcon className="size-4" />}
        onToggle={() => onToggleMenu('folder')}
        onClose={onCloseMenu}
      >
        {folderSaved.map((kind) => (
          <MenuAction
            key={kind}
            label={DOCUMENT_KIND_LABELS[kind]}
            disabled={pdfBusy}
            onClick={() => onPreviewKind(kind)}
          />
        ))}
      </ActionMenu>
      <IconButton
        label={`Preview client agreement for ${client.name}`}
        title="Preview client agreement"
        disabled={pdfBusy}
        onClick={() => onPreviewKind('agreement')}
      >
        <PreviewIcon className="size-4" />
      </IconButton>
      <ActionMenu
        label={`Add or edit Private client brochure for ${client.name}`}
        title="Add or edit Private client brochure"
        open={kebabOpen}
        icon={<MoreIcon className="size-4" />}
        onToggle={() => onToggleMenu('kebab')}
        onClose={onCloseMenu}
      >
        {ADMIN_DOCUMENT_KINDS.map((kind) => {
          const saved = kindSaved(client.documents, kind);
          return (
            <MenuAction
              key={kind}
              label={saved ? `${DOCUMENT_KIND_LABELS[kind]} · Saved` : `Add ${DOCUMENT_KIND_LABELS[kind]}`}
              onClick={() => onComposeKind(kind)}
            />
          );
        })}
      </ActionMenu>
    </div>
  );
}

function ActionMenu({
  label,
  open,
  disabled,
  busy,
  title,
  icon,
  onToggle,
  onClose,
  children,
}: {
  label: string;
  open: boolean;
  disabled?: boolean;
  busy?: boolean;
  title?: string;
  icon: ReactNode;
  onToggle: () => void;
  onClose: () => void;
  children: ReactNode;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, right: 0 });

  useLayoutEffect(() => {
    if (!open || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const panelHeight = 220;
    const below = rect.bottom + 6;
    const top = below + panelHeight > window.innerHeight ? rect.top - panelHeight - 6 : below;
    setCoords({ top, right: window.innerWidth - rect.right });
    panelRef.current?.querySelector('button')?.focus();
  }, [open]);

  useEscape(open, onClose);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (buttonRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      onClose();
    };
    const onViewport = () => onClose();
    document.addEventListener('mousedown', onPointer);
    window.addEventListener('scroll', onViewport, true);
    window.addEventListener('resize', onViewport);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      window.removeEventListener('scroll', onViewport, true);
      window.removeEventListener('resize', onViewport);
    };
  }, [open, onClose]);

  return (
    <div>
      <IconButton
        ref={buttonRef}
        label={label}
        disabled={disabled || busy}
        title={title ?? label}
        expanded={open}
        onClick={onToggle}
      >
        {icon}
      </IconButton>
      {open &&
        createPortal(
          <div
            ref={panelRef}
            role="menu"
            className="border-vz-rule fixed z-50 min-w-[240px] rounded-[4px] border bg-white p-1.5 shadow-[0_8px_24px_rgba(7,14,24,0.18)]"
            style={{ top: coords.top, right: coords.right }}
          >
            {children}
          </div>,
          document.body,
        )}
    </div>
  );
}

function IconButton({
  label,
  disabled,
  title,
  expanded,
  onClick,
  children,
  ref,
}: {
  label: string;
  disabled?: boolean;
  title?: string;
  expanded?: boolean;
  onClick: () => void;
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}) {
  const tip = title ?? label;
  const innerRef = useRef<HTMLButtonElement>(null);
  const [tipPos, setTipPos] = useState<{ top: number; right: number } | null>(null);

  function setButtonRef(node: HTMLButtonElement | null) {
    innerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as MutableRefObject<HTMLButtonElement | null>).current = node;
  }

  function showTip() {
    if (expanded) return;
    const node = innerRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    setTipPos({ top: rect.top - 8, right: window.innerWidth - rect.right });
  }

  function hideTip() {
    setTipPos(null);
  }

  useEffect(() => {
    if (expanded) setTipPos(null);
  }, [expanded]);

  return (
    <span className="relative inline-flex" onMouseEnter={showTip} onMouseLeave={hideTip}>
      <button
        ref={setButtonRef}
        type="button"
        aria-label={label}
        aria-expanded={expanded}
        disabled={disabled}
        onFocus={showTip}
        onBlur={hideTip}
        onClick={onClick}
        className="border-vz-rule text-vz-blue hover:border-vz-blue hover:bg-vz-blue-panel focus-visible:outline-vz-orange flex size-9 cursor-pointer items-center justify-center rounded-[3px] border bg-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {children}
      </button>
      {tipPos &&
        createPortal(
          <span
            role="tooltip"
            className="pointer-events-none fixed z-[80] -translate-y-full rounded-[3px] bg-[#0B1F33] px-2 py-1 text-[11px] font-bold whitespace-nowrap text-white shadow-[0_4px_12px_rgba(7,14,24,0.2)]"
            style={{ top: tipPos.top, right: tipPos.right }}
          >
            {tip}
          </span>,
          document.body,
        )}
    </span>
  );
}

function MenuAction({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={onClick}
      className="text-vz-ink hover:bg-vz-blue-panel flex w-full cursor-pointer items-center rounded-[3px] px-2.5 py-2.5 text-left text-[14px] font-bold disabled:cursor-wait disabled:opacity-60"
    >
      {label}
    </button>
  );
}

function TestFilterSwitch({
  value,
  onChange,
}: {
  value: TestFilter;
  onChange: (value: TestFilter) => void;
}) {
  const options: { id: TestFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'live', label: 'Live' },
    { id: 'test', label: 'Test' },
  ];
  return (
    <div className="border-vz-rule inline-flex rounded-[3px] border p-0.5" role="radiogroup" aria-label="Filter by test status">
      {options.map((option) => {
        const selected = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.id)}
            className={`h-9 min-w-[72px] cursor-pointer rounded-[2px] px-3 text-[13px] font-bold transition-colors duration-150 ${
              selected ? 'bg-vz-blue text-white' : 'text-vz-blue hover:bg-vz-blue-panel bg-transparent'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function PagerButton({ label, disabled, onClick }: { label: string; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="bg-vz-blue hover:bg-vz-blue-mid focus-visible:outline-vz-orange disabled:bg-vz-blue-panel disabled:text-vz-blue-soft inline-flex h-10 min-w-[108px] cursor-pointer items-center justify-center rounded-[3px] px-4 text-[14px] font-bold text-white shadow-[1px_1px_2px_rgba(7,14,24,0.35)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default disabled:shadow-none"
    >
      {label}
    </button>
  );
}

function LoaderMark({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-4" role="status">
      <svg className="text-vz-blue size-24 animate-spin" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeOpacity="0.18" strokeWidth="4" />
        <path d="M42 24a18 18 0 00-18-18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span className="text-vz-ink text-[16px] font-bold">{label}</span>
    </div>
  );
}

function SkeletonRow() {
  return (
    <li className={`${ROW_GRID} border-vz-rule h-[76px] border-b px-1 last:border-b-0`} aria-hidden="true">
      <div className="flex items-center gap-3">
        <span className="bg-vz-blue-panel size-11 rounded-[3px]" />
        <span className="bg-vz-blue-panel h-3 w-36 rounded-[2px]" />
      </div>
      <span className="bg-vz-blue-panel h-3 w-40 rounded-[2px]" />
      <span className="bg-vz-blue-panel h-3 w-28 rounded-[2px]" />
      <span className="bg-vz-blue-panel h-3 w-12 rounded-[2px]" />
      <span className="bg-vz-blue-panel h-7 w-12 rounded-full" />
      <span className="bg-vz-blue-panel h-3 w-16 rounded-[2px]" />
      <span className="bg-vz-blue-panel size-9 justify-self-end rounded-[3px]" />
    </li>
  );
}

function TestSwitch({
  checked,
  disabled,
  label,
  onToggle,
}: {
  checked: boolean;
  disabled: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onToggle}
      className={`relative h-7 w-12 cursor-pointer rounded-full transition-colors duration-150 focus-visible:outline-vz-orange focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-wait ${
        checked ? 'bg-vz-blue' : 'bg-vz-rule'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 block size-6 rounded-full bg-white shadow-[1px_1px_2px_rgba(7,14,24,0.28)] transition-transform duration-150 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

function RowSpinner({ label }: { label: string }) {
  return (
    <svg className="text-vz-blue size-6 animate-spin" viewBox="0 0 48 48" fill="none" role="status" aria-label={label}>
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeOpacity="0.18" strokeWidth="4" />
      <path d="M42 24a18 18 0 00-18-18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

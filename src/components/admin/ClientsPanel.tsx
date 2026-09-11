import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MoreIcon, PlusIcon } from '../ui/Icons';
import { teamBySlug } from '../../data/team';
import { useEscape } from '../../hooks/useScrollLock';
import {
  fetchAdminClients,
  patchAdminClientIsTest,
  saveAdminTestDocument,
  type AdminClient,
  type ClientsTestFilter,
} from '../../lib/adminApi';

const PER_PAGE = 10;
const ROW_H = 76;
const LIST_MIN_H = PER_PAGE * ROW_H;

const ROW_GRID =
  'grid grid-cols-[minmax(0,1.5fr)_minmax(0,1.15fr)_minmax(0,1fr)_5.75rem_5.5rem_minmax(0,0.95fr)_2.75rem] items-center gap-x-5';

type TestFilter = ClientsTestFilter;

function formatWhen(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
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

function hasDocument(client: AdminClient): boolean {
  return Boolean(client.documents.agreement);
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
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [menuId, setMenuId] = useState<string | null>(null);

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
    setMenuId(null);
    setFilter(next);
    setPage(1);
  }

  async function onSaveTestDocument(clientId: string) {
    setSavingId(clientId);
    setMenuId(null);
    setError(null);
    const result = await saveAdminTestDocument(clientId);
    setSavingId(null);
    if ('authenticated' in result && result.authenticated === false) {
      onUnauthorized();
      return;
    }
    if (!('ok' in result) || result.ok !== true) {
      setError('error' in result && result.error ? result.error : 'Could not save the test document.');
      return;
    }
    await load(page, filter, true);
  }

  async function onToggleTest(client: AdminClient) {
    const next = !client.is_test;
    setMenuId(null);
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
          <div className="min-w-[920px]">
            <div className={`${ROW_GRID} text-vz-gray-mid bg-vz-blue-panel-faint border-vz-rule border-b py-3 pr-1 pl-1 text-[11px] font-bold tracking-[0.08em] uppercase`}>
              <span>Client</span>
              <span>Contact</span>
              <span>Adviser</span>
              <span>Consent</span>
              <span>Test</span>
              <span>Document</span>
              <span className="overflow-hidden whitespace-nowrap text-[0px] text-transparent">
                Actions
              </span>
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
                      menuOpen={menuId === (entry as AdminClient).id}
                      saving={savingId === (entry as AdminClient).id}
                      toggling={togglingId === (entry as AdminClient).id}
                      onToggleMenu={() =>
                        setMenuId((current) =>
                          current === (entry as AdminClient).id ? null : (entry as AdminClient).id,
                        )
                      }
                      onCloseMenu={() => setMenuId(null)}
                      onSaveDocument={() => void onSaveTestDocument((entry as AdminClient).id)}
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
        <PagerButton
          label="Previous"
          disabled={!hasPrev || loading}
          onClick={() => setPage((current) => Math.max(1, current - 1))}
        />
        <p className="text-vz-gray m-0 text-[13px] tabular-nums">
          {totalPages > 0 ? `${page} / ${totalPages}` : '—'}
        </p>
        <PagerButton
          label="Next"
          disabled={!hasNext || loading}
          onClick={() => setPage((current) => current + 1)}
        />
      </nav>
    </div>
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
    <div
      className="border-vz-rule inline-flex rounded-[3px] border p-0.5"
      role="radiogroup"
      aria-label="Filter by test status"
    >
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
              selected
                ? 'bg-vz-blue text-white'
                : 'text-vz-blue hover:bg-vz-blue-panel bg-transparent'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function PagerButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="bg-vz-blue hover:bg-vz-blue-mid focus-visible:outline-vz-orange disabled:bg-vz-blue-panel disabled:text-vz-blue-soft inline-flex h-10 min-w-[108px] cursor-pointer items-center justify-center rounded-[3px] px-4 text-[14px] font-bold text-white shadow-[1px_1px_2px_rgba(11,31,51,0.35)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default disabled:shadow-none"
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
        <path
          d="M42 24a18 18 0 00-18-18"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
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

function ClientRow({
  client,
  menuOpen,
  saving,
  toggling,
  onToggleMenu,
  onCloseMenu,
  onSaveDocument,
  onToggleTest,
}: {
  client: AdminClient;
  menuOpen: boolean;
  saving: boolean;
  toggling: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onSaveDocument: () => void;
  onToggleTest: () => void;
}) {
  const testDoc = client.documents.agreement;

  return (
    <li
      className="border-vz-rule hover:bg-vz-blue-panel-faint relative h-[76px] border-b transition-colors duration-150 last:border-b-0"
      aria-busy={toggling}
    >
      <div className={`${ROW_GRID} h-full px-1`}>
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

        <p className="m-0">
          {testDoc ? (
            <span className="bg-vz-blue-panel text-vz-blue inline-block rounded-[3px] px-1.5 py-0.5 text-[11px] font-bold tracking-[0.04em] uppercase">
              On file
            </span>
          ) : (
            <span className="text-vz-gray-mid text-[13px]">None</span>
          )}
        </p>

        <RowActions
          client={client}
          open={menuOpen}
          saving={saving}
          onToggle={onToggleMenu}
          onClose={onCloseMenu}
          onCreateDocument={onSaveDocument}
        />
      </div>
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
        className={`absolute top-0.5 left-0.5 block size-6 rounded-full bg-white shadow-[1px_1px_2px_rgba(11,31,51,0.28)] transition-transform duration-150 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

function RowSpinner({ label }: { label: string }) {
  return (
    <svg
      className="text-vz-blue size-6 animate-spin"
      viewBox="0 0 48 48"
      fill="none"
      role="status"
      aria-label={label}
    >
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeOpacity="0.18" strokeWidth="4" />
      <path
        d="M42 24a18 18 0 00-18-18"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RowActions({
  client,
  open,
  saving,
  onToggle,
  onClose,
  onCreateDocument,
}: {
  client: AdminClient;
  open: boolean;
  saving: boolean;
  onToggle: () => void;
  onClose: () => void;
  onCreateDocument: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, right: 0 });

  useLayoutEffect(() => {
    if (!open || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const panelHeight = 56;
    const below = rect.bottom + 6;
    const top = below + panelHeight > window.innerHeight ? rect.top - panelHeight - 6 : below;
    setCoords({
      top,
      right: window.innerWidth - rect.right,
    });
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
    document.addEventListener('mousedown', onPointer);
    return () => document.removeEventListener('mousedown', onPointer);
  }, [open, onClose]);

  const hasDoc = hasDocument(client);

  return (
    <div className="justify-self-end">
      <button
        ref={buttonRef}
        type="button"
        aria-label={`Actions for ${client.name}`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={onToggle}
        className="border-vz-rule text-vz-blue hover:border-vz-blue hover:bg-vz-blue-panel focus-visible:outline-vz-orange flex size-9 cursor-pointer items-center justify-center rounded-[3px] border bg-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <MoreIcon className="size-4" />
      </button>

      {open &&
        createPortal(
          <div
            ref={panelRef}
            role="menu"
            className="border-vz-rule fixed z-50 min-w-[220px] rounded-[4px] border bg-white p-1.5 shadow-[0_8px_24px_rgba(11,31,51,0.18)]"
            style={{ top: coords.top, right: coords.right }}
          >
            <button
              type="button"
              role="menuitem"
              disabled={saving}
              onClick={onCreateDocument}
              className="text-vz-ink hover:bg-vz-blue-panel flex w-full cursor-pointer items-center gap-2.5 rounded-[3px] px-2.5 py-2.5 text-left text-[14px] font-bold disabled:cursor-wait disabled:opacity-60"
            >
              <span className="bg-vz-blue flex size-7 items-center justify-center rounded-[3px] text-white">
                <PlusIcon className="size-3.5" />
              </span>
              {saving ? 'Saving…' : hasDoc ? 'Update document' : 'Create document'}
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}

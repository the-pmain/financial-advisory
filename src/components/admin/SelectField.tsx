import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDownIcon } from '../ui/Icons';
import { useEscape } from '../../hooks/useScrollLock';

export type SelectOption = { value: string; label: string };

function normalizeOptions(options: Array<string | SelectOption>): SelectOption[] {
  return options.map((option) => (typeof option === 'string' ? { value: option, label: option } : option));
}

export function SelectField({
  id,
  name,
  value,
  options,
  disabled,
  placeholder = 'Select',
  className = '',
  portal = true,
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  options: Array<string | SelectOption>;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  portal?: boolean;
  onChange: (value: string) => void;
}) {
  const items = normalizeOptions(options);
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef({ query: '', at: 0 });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(value);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  const selected = items.find((item) => item.value === value) ?? null;

  useEffect(() => {
    if (!open) return;
    setActive(value || items[0]?.value || '');
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const height = Math.min(320, items.length * 40 + 12);
    const below = rect.bottom + 6;
    const top = below + height > window.innerHeight - 12 ? rect.top - height - 6 : below;
    setCoords({
      top: Math.max(12, top),
      left: Math.max(12, Math.min(rect.left, window.innerWidth - rect.width - 12)),
      width: rect.width,
    });
  }, [open, items.length]);

  useLayoutEffect(() => {
    if (open) activeRef.current?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  useEscape(open, () => setOpen(false));

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (wrapRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    return () => document.removeEventListener('mousedown', onPointer);
  }, [open]);

  function pick(next: string) {
    onChange(next);
    setOpen(false);
  }

  function move(delta: number) {
    if (!items.length) return;
    const index = Math.max(0, items.findIndex((item) => item.value === active));
    const next = items[(index + delta + items.length) % items.length];
    setActive(next.value);
  }

  function typeahead(key: string) {
    const now = Date.now();
    const nextQuery = now - searchRef.current.at < 500 ? `${searchRef.current.query}${key}` : key;
    searchRef.current = { query: nextQuery, at: now };
    const match = items.find((item) => item.label.toLowerCase().startsWith(nextQuery.toLowerCase()));
    if (match) {
      setActive(match.value);
      if (!open) onChange(match.value);
    }
  }

  function onTriggerKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      move(event.key === 'ArrowDown' ? 1 : -1);
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      if (active) pick(active);
      return;
    }
    if (event.key === 'Home') {
      event.preventDefault();
      if (items[0]) setActive(items[0].value);
      return;
    }
    if (event.key === 'End') {
      event.preventDefault();
      if (items.length) setActive(items[items.length - 1].value);
      return;
    }
    if (event.key.length === 1 && /[\S]/.test(event.key)) {
      event.preventDefault();
      typeahead(event.key);
    }
  }

  const list = (
    <div
      ref={panelRef}
      id={listId}
      role="listbox"
      aria-labelledby={id}
      className={`border-vz-rule max-h-80 overflow-auto rounded-[4px] border bg-white p-1 shadow-[0_12px_32px_rgba(7,14,24,0.18)] ${
        portal ? 'fixed z-[85]' : 'absolute top-full right-0 left-0 z-20 mt-1'
      }`}
      style={portal ? { top: coords.top, left: coords.left, width: coords.width } : undefined}
    >
      {items.map((item) => {
        const isSelected = item.value === value;
        const isActive = item.value === active;
        return (
          <button
            key={item.value}
            ref={isActive ? activeRef : undefined}
            type="button"
            role="option"
            id={`${listId}-${item.value}`}
            aria-selected={isSelected}
            onMouseEnter={() => setActive(item.value)}
            onClick={() => pick(item.value)}
            className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-[3px] px-3 py-2 text-left text-[15px] leading-[1.3] ${
              isSelected
                ? 'bg-vz-blue font-bold text-white'
                : isActive
                  ? 'bg-vz-blue-panel text-vz-blue font-bold'
                  : 'text-vz-ink hover:bg-vz-blue-panel-faint'
            }`}
          >
            <span>{item.label}</span>
            {isSelected ? <SelectedMark /> : null}
          </button>
        );
      })}
    </div>
  );

  return (
    <div ref={wrapRef} className={portal ? 'relative' : 'relative min-w-0'}>
      <button
        id={id}
        type="button"
        name={name}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && active ? `${listId}-${active}` : undefined}
        onClick={() => !disabled && setOpen((current) => !current)}
        onKeyDown={onTriggerKey}
        className={`${className} flex items-center justify-between gap-3 text-left`}
      >
        <span className={selected ? 'text-vz-ink min-w-0 truncate' : 'text-[#8a8f96] min-w-0 truncate'}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDownIcon
          className={`size-3.5 shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (portal ? createPortal(list, document.body) : list)}
    </div>
  );
}

function SelectedMark() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 shrink-0" fill="none" aria-hidden="true">
      <path d="M3 8.2 6.4 11.5 13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

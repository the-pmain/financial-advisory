import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  MONTH_LABELS,
  WEEKDAY_LABELS,
  isoToEuropean,
  monthGrid,
  parseIsoDate,
  shiftIsoDate,
  todayIsoLocal,
} from '../../js/admin-date.js';
import { CalendarIcon } from '../ui/Icons';
import { useEscape } from '../../hooks/useScrollLock';
import { SelectField } from './SelectField';

const YEAR_START = 1990;
const YEAR_END = 2040;

export function DatePickerField({
  id,
  name,
  value,
  disabled,
  placeholder = 'dd.mm.yyyy',
  className = '',
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  onChange: (iso: string) => void;
}) {
  const parsed = parseIsoDate(value);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => ({
    year: parsed?.year ?? new Date().getFullYear(),
    month: parsed?.month ?? new Date().getMonth() + 1,
  }));
  const [cursor, setCursor] = useState(value || todayIsoLocal());
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 308 });

  useEffect(() => {
    if (!open) return;
    const next = parseIsoDate(value);
    setView({
      year: next?.year ?? new Date().getFullYear(),
      month: next?.month ?? new Date().getMonth() + 1,
    });
    setCursor(value || todayIsoLocal());
  }, [open, value]);

  useLayoutEffect(() => {
    if (!open || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const width = 308;
    const height = 360;
    const left = Math.min(rect.left, window.innerWidth - width - 12);
    const below = rect.bottom + 6;
    const top = below + height > window.innerHeight - 12 ? rect.top - height - 6 : below;
    setCoords({ top: Math.max(12, top), left: Math.max(12, left), width });
    panelRef.current?.focus();
  }, [open]);

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

  function pick(iso: string) {
    onChange(iso);
    setOpen(false);
  }

  function moveCursor(days: number) {
    const next = shiftIsoDate(cursor, days);
    setCursor(next);
    const parsedNext = parseIsoDate(next);
    if (parsedNext) setView({ year: parsedNext.year, month: parsedNext.month });
  }

  const display = isoToEuropean(value);
  const today = todayIsoLocal();
  const years = Array.from({ length: YEAR_END - YEAR_START + 1 }, (_, index) => YEAR_START + index);

  return (
    <div ref={wrapRef} className="relative">
      <button
        id={id}
        type="button"
        name={name}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`${id}-calendar`}
        onClick={() => !disabled && setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className={`${className} flex items-center justify-between gap-3 pr-3 text-left`}
      >
        <span className={display ? 'text-vz-ink min-w-0 truncate' : 'min-w-0 truncate text-[#8a8f96]'}>
          {display || placeholder}
        </span>
        <CalendarIcon className="text-vz-blue size-4 shrink-0" />
      </button>

      {open &&
        createPortal(
          <div
            ref={panelRef}
            id={`${id}-calendar`}
            role="dialog"
            tabIndex={-1}
            aria-label="Choose date"
            className="border-vz-rule fixed z-[80] rounded-[4px] border bg-white p-3 shadow-[0_12px_32px_rgba(7,14,24,0.2)] outline-none"
            style={{ top: coords.top, left: coords.left, width: coords.width }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') {
                event.preventDefault();
                moveCursor(-1);
              } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                moveCursor(1);
              } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                moveCursor(-7);
              } else if (event.key === 'ArrowDown') {
                event.preventDefault();
                moveCursor(7);
              } else if (event.key === 'Enter') {
                event.preventDefault();
                pick(cursor);
              } else if (event.key === 'PageUp') {
                event.preventDefault();
                setView((current) => shiftMonth(current, -1));
              } else if (event.key === 'PageDown') {
                event.preventDefault();
                setView((current) => shiftMonth(current, 1));
              }
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => setView((current) => shiftMonth(current, -1))}
                className="text-vz-blue hover:bg-vz-blue-panel flex size-8 cursor-pointer items-center justify-center rounded-[3px]"
              >
                <MonthChevron direction="prev" />
              </button>
              <div className="min-w-0 flex-1">
                <SelectField
                  id={`${id}-month`}
                  name={`${name}-month`}
                  value={String(view.month)}
                  options={MONTH_LABELS.map((label, index) => ({ value: String(index + 1), label }))}
                  portal={false}
                  className="text-vz-ink border-vz-rule w-full cursor-pointer rounded-[3px] border bg-white px-2 py-1.5 text-[13px] font-bold"
                  onChange={(next) => setView((current) => ({ ...current, month: Number(next) }))}
                />
              </div>
              <div className="w-[5.5rem]">
                <SelectField
                  id={`${id}-year`}
                  name={`${name}-year`}
                  value={String(view.year)}
                  options={years.map((year) => String(year))}
                  portal={false}
                  className="text-vz-ink border-vz-rule w-full cursor-pointer rounded-[3px] border bg-white px-2 py-1.5 text-[13px] font-bold"
                  onChange={(next) => setView((current) => ({ ...current, year: Number(next) }))}
                />
              </div>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => setView((current) => shiftMonth(current, 1))}
                className="text-vz-blue hover:bg-vz-blue-panel flex size-8 cursor-pointer items-center justify-center rounded-[3px]"
              >
                <MonthChevron direction="next" />
              </button>
            </div>

            <div className="mb-1 grid grid-cols-7 gap-0.5">
              {WEEKDAY_LABELS.map((label) => (
                <div key={label} className="text-vz-gray py-1 text-center text-[11px] font-bold tracking-[0.04em]">
                  {label}
                </div>
              ))}
            </div>
            <div role="grid" className="grid grid-cols-7 gap-0.5">
              {monthGrid(view.year, view.month).map((cell) => {
                const selected = cell.iso === value;
                const isToday = cell.iso === today;
                const isCursor = cell.iso === cursor;
                return (
                  <button
                    key={cell.iso}
                    type="button"
                    role="gridcell"
                    aria-selected={selected}
                    onClick={() => pick(cell.iso)}
                    onMouseEnter={() => setCursor(cell.iso)}
                    className={`flex h-9 cursor-pointer items-center justify-center rounded-[3px] text-[13px] font-bold ${
                      selected
                        ? 'bg-vz-blue text-white'
                        : isCursor
                          ? 'bg-vz-blue-panel text-vz-blue'
                          : cell.inMonth
                            ? 'text-vz-ink hover:bg-vz-blue-panel-faint'
                            : 'text-vz-gray-mid hover:bg-vz-blue-panel-faint'
                    } ${isToday && !selected ? 'ring-vz-blue ring-1 ring-inset' : ''}`}
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setOpen(false);
                }}
                className="text-vz-blue hover:bg-vz-blue-panel h-8 cursor-pointer rounded-[3px] px-2 text-[13px] font-bold"
              >
                Clear
              </button>
              <p className="text-vz-gray m-0 text-[12px]">{isoToEuropean(cursor) || 'dd.mm.yyyy'}</p>
              <button
                type="button"
                onClick={() => pick(today)}
                className="bg-vz-blue hover:bg-vz-blue-mid h-8 cursor-pointer rounded-[3px] px-3 text-[13px] font-bold text-white"
              >
                Today
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

function shiftMonth(view: { year: number; month: number }, delta: number) {
  const date = new Date(view.year, view.month - 1 + delta, 1);
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
}

function MonthChevron({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden="true">
      <path
        d={direction === 'prev' ? 'M10 3 5 8l5 5' : 'M6 3l5 5-5 5'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

import { Check, ChevronDown, Search } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { EmployeeOption } from "../../employees/types.ts";
import { Icon } from "../ui/icon.tsx";
import { StaffAvatar } from "./StaffAvatar.tsx";

export function StaffPicker({
  label,
  people,
  value,
  onChange,
  disabled = false,
  loading = false,
  invalid = false,
  placeholder,
  searchPlaceholder,
  emptyLabel,
  loadingLabel,
}: {
  label: string;
  people: EmployeeOption[];
  value: string;
  onChange: (slug: string) => void;
  disabled?: boolean;
  loading?: boolean;
  invalid?: boolean;
  placeholder: string;
  searchPlaceholder: string;
  emptyLabel: string;
  loadingLabel: string;
}) {
  const uid = useId();
  const listId = `${uid}-list`;
  const searchId = `${uid}-search`;
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const selected = people.find((person) => person.slug === value);
  const needle = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!needle) return people;
    return people.filter(
      (person) =>
        person.name.toLowerCase().includes(needle) || person.role.toLowerCase().includes(needle),
    );
  }, [people, needle]);

  useEffect(() => {
    setActive(0);
  }, [needle, open]);

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    function onDoc(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    function onKey(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const option = rootRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    option?.scrollIntoView({ block: "nearest" });
  }, [active, open, filtered]);

  function choose(slug: string) {
    onChange(slug);
    setOpen(false);
    setQuery("");
  }

  function onTriggerKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled || loading) return;
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  }

  function onSearchKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => Math.min(index + 1, Math.max(filtered.length - 1, 0)));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const person = filtered[active];
      if (person) choose(person.slug);
    }
  }

  return (
    <div className="appointment-form__field !mb-0" ref={rootRef}>
      <span className="appointment-form__label" id={`${uid}-label`}>
        {label}
      </span>
      <div className="staff-picker">
        <button
          type="button"
          className={`staff-picker__trigger${invalid ? " is-invalid" : ""}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${uid}-label`}
          aria-controls={listId}
          disabled={disabled || loading}
          onClick={() => {
            if (!disabled && !loading) setOpen((next) => !next);
          }}
          onKeyDown={onTriggerKey}
        >
          {selected ? (
            <>
              <StaffAvatar key={selected.slug} name={selected.name} photoUrl={selected.photoUrl} size="md" />
              <span className="staff-picker__copy">
                <span className="staff-picker__name">{selected.name}</span>
                {selected.role ? <span className="staff-picker__role">{selected.role}</span> : null}
              </span>
            </>
          ) : (
            <span className="staff-picker__placeholder">{loading ? loadingLabel : placeholder}</span>
          )}
          <Icon icon={ChevronDown} className={`staff-picker__chevron${open ? " is-open" : ""}`} />
        </button>
        {open ? (
          <div className="staff-picker__panel">
            <div className="staff-picker__search">
              <Icon icon={Search} className="staff-picker__search-icon" />
              <input
                ref={searchRef}
                id={searchId}
                type="text"
                name="staff-query"
                value={query}
                placeholder={searchPlaceholder}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                inputMode="search"
                data-lpignore="true"
                data-1p-ignore="true"
                data-bwignore="true"
                data-form-type="other"
                aria-autocomplete="list"
                aria-controls={listId}
                className="staff-picker__search-input"
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onSearchKey}
              />
            </div>
            <div className="staff-picker__list" role="listbox" id={listId} tabIndex={-1}>
              {filtered.length === 0 ? (
                <p className="staff-picker__empty">{emptyLabel}</p>
              ) : (
                filtered.map((person, index) => {
                  const isActive = index === active;
                  const isSelected = person.slug === value;
                  return (
                    <button
                      key={person.slug}
                      type="button"
                      role="option"
                      data-active={isActive ? "true" : undefined}
                      aria-selected={isSelected}
                      className={`staff-picker__option${isActive ? " is-active" : ""}${isSelected ? " is-selected" : ""}`}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => choose(person.slug)}
                    >
                      <StaffAvatar key={person.slug} name={person.name} photoUrl={person.photoUrl} size="sm" />
                      <span className="staff-picker__copy">
                        <span className="staff-picker__name">{person.name}</span>
                        {person.role ? <span className="staff-picker__role">{person.role}</span> : null}
                      </span>
                      {isSelected ? <Icon icon={Check} className="staff-picker__check" /> : null}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

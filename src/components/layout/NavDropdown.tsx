import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useLocation } from 'react-router';
import type { NavLink as NavLinkItem } from '../../data/navigation';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { ChevronDownIcon } from '../ui/Icons';

const MENU_MIN_WIDTH = 240;
const GUTTER = 8;

function placeMenu(trigger: DOMRect, align: 'start' | 'end', menuWidth: number) {
  const width = Math.max(menuWidth, MENU_MIN_WIDTH);
  let left = align === 'end' ? trigger.right - width : trigger.left;
  left = Math.min(Math.max(GUTTER, left), window.innerWidth - width - GUTTER);
  return { top: trigger.bottom, left };
}

export function NavDropdown({
  label,
  to,
  items,
  triggerClassName,
  align = 'start',
}: {
  label: string;
  to: string;
  items: NavLinkItem[];
  triggerClassName: (active: boolean) => string;
  align?: 'start' | 'end';
}) {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const closeTimer = useRef(0);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const { pathname } = useLocation();
  const hoverMenus = useMediaQuery('(hover: hover) and (pointer: fine)');

  const syncPos = useCallback(() => {
    const trigger = rootRef.current;
    if (!trigger) return;
    setPos(
      placeMenu(trigger.getBoundingClientRect(), align, menuRef.current?.offsetWidth ?? MENU_MIN_WIDTH),
    );
  }, [align]);

  const openMenu = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  }, []);

  const closeNow = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setOpen(false);
  }, []);

  useEffect(() => closeNow(), [pathname, closeNow]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useLayoutEffect(() => {
    if (!open) return;
    syncPos();
    const onMove = () => syncPos();
    window.addEventListener('scroll', onMove, true);
    window.addEventListener('resize', onMove);
    return () => {
      window.removeEventListener('scroll', onMove, true);
      window.removeEventListener('resize', onMove);
    };
  }, [open, syncPos]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (event: MouseEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      closeNow();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeNow();
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, closeNow]);

  const menu = open
    ? createPortal(
        <ul
          id={menuId}
          ref={menuRef}
          role="menu"
          onMouseEnter={hoverMenus ? openMenu : undefined}
          onMouseLeave={hoverMenus ? scheduleClose : undefined}
          style={{ top: pos.top, left: pos.left }}
          className="fixed z-300 m-0 min-w-[240px] list-none bg-white py-2 shadow-[0_10px_28px_rgba(7,14,24,0.14)]"
        >
          {items.map((item) => (
            <li key={item.to + item.label} role="none">
              <NavLink
                to={item.to}
                role="menuitem"
                onClick={closeNow}
                className={({ isActive }) =>
                  `text-vz-blue hover:text-vz-orange hover:bg-vz-blue-panel-faint block px-4 py-2.5 text-[15px] leading-[1.3] ${
                    isActive ? 'font-bold' : ''
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>,
        document.body,
      )
    : null;

  return (
    <div
      ref={rootRef}
      className="relative inline-flex items-center"
      onMouseEnter={hoverMenus ? openMenu : undefined}
      onMouseLeave={hoverMenus ? scheduleClose : undefined}
    >
      <div className="inline-flex items-center gap-0.5">
        <NavLink to={to} className={({ isActive }) => triggerClassName(isActive)}>
          {label}
        </NavLink>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-haspopup="menu"
          aria-label={`${label} menu`}
          onClick={() => (open ? closeNow() : openMenu())}
          className="text-vz-blue hover:text-vz-orange flex size-6 shrink-0 cursor-pointer items-center justify-center bg-transparent max-lap:size-11"
        >
          <ChevronDownIcon
            className={`block h-3.5 w-3.5 transition-transform duration-250 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
      {menu}
    </div>
  );
}

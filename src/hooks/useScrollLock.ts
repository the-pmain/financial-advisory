import { useLayoutEffect, useEffect } from 'react';

/**
 * Locks page scrolling while an overlay is open.
 * Does not set `position: fixed` on body — that would become the containing
 * block for every `position: fixed` child (header sheet, dialogs) and pull
 * them off-screen when the page was scrolled.
 */
export function useScrollLock(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return;
    const root = document.documentElement;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    root.classList.add('vz-scroll-locked');
    return () => {
      root.classList.remove('vz-scroll-locked');
      window.scrollTo(scrollX, scrollY);
    };
  }, [locked]);
}

/** Calls `onClose` when Escape is pressed. */
export function useEscape(active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active, onClose]);
}

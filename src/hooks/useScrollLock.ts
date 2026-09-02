import { useEffect } from 'react';

/** Locks page scrolling while a full-screen overlay (mega menu, search) is open. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const root = document.documentElement;
    root.classList.add('vz-scroll-locked');
    return () => root.classList.remove('vz-scroll-locked');
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

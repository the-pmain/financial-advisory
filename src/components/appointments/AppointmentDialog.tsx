import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useEscape, useScrollLock } from '../../hooks/useScrollLock';
import { CloseIcon } from '../ui/Icons';
import { ConsultationForm } from '../widgets/ConsultationForm';

const EXIT_MS = 280;

function focusables(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )].filter((el) => !el.closest('[hidden]') && el.getClientRects().length > 0);
}

export function AppointmentDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(open);
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);
  const [session, setSession] = useState(0);

  useScrollLock(mounted);
  useEscape(shown, onClose);

  useEffect(() => {
    if (open) {
      if (!wasOpen.current) {
        restoreRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        setSession((n) => n + 1);
      }
      wasOpen.current = true;
      setMounted(true);
      const frame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setShown(true));
      });
      return () => window.cancelAnimationFrame(frame);
    }
    wasOpen.current = false;
    setShown(false);
    const timer = window.setTimeout(() => setMounted(false), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!shown) return;
    const select = panelRef.current?.querySelector<HTMLElement>('select, input');
    select?.focus();
  }, [shown, session]);

  useEffect(() => {
    if (mounted) return;
    restoreRef.current?.focus();
  }, [mounted]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!shown || !panel) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const nodes = focusables(panel);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    panel.addEventListener('keydown', onKey);
    return () => panel.removeEventListener('keydown', onKey);
  }, [shown]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`appointment-layer${shown ? ' is-open' : ''}`}
      onMouseDown={(event) => {
        if (!panelRef.current?.contains(event.target as Node)) onClose();
      }}
    >
      <div className="appointment-layer__backdrop" aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="appointment-layer__panel"
      >
        <header className="appointment-layer__header">
          <div className="min-w-0">
            <h2 id={titleId} className="appointment-layer__title">
              Leave your contact details
            </h2>
            <p className="appointment-layer__lede">
              A first meeting is free and does not commit you to a mandate.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="appointment-layer__close"
            aria-label="Close"
          >
            <CloseIcon className="size-4" />
          </button>
        </header>
        <div className="appointment-layer__body">
          <ConsultationForm key={session} pickAdviser embedded idPrefix="appointment" />
        </div>
      </div>
    </div>,
    document.body,
  );
}

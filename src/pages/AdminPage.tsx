import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../constants/routes';
import { fetchSession, loginWithPin, logoutAdmin } from '../lib/adminApi';

const PIN_LENGTH = 4;

type Client = {
  id: string;
  name: string;
  email: string;
};

/** Placeholder list — wire to an API later. */
const clients: Client[] = [];

function BackspaceIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10.2 1.5H24a2.5 2.5 0 0 1 2.5 2.5v12a2.5 2.5 0 0 1-2.5 2.5H10.2a2.5 2.5 0 0 1-1.9-.9L1.8 10.8a1.5 1.5 0 0 1 0-1.6L8.3 2.4a2.5 2.5 0 0 1 1.9-.9Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M13 6.5 19 12.5M19 6.5 13 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AdminPasscodeGate({
  busy,
  error,
  onUnlock,
}: {
  busy: boolean;
  error: string | null;
  onUnlock: (pin: string) => Promise<void>;
}) {
  const [digits, setDigits] = useState('');
  const submitting = useRef(false);

  const tryUnlock = useCallback(
    async (pin: string) => {
      if (submitting.current || busy) return;
      submitting.current = true;
      try {
        await onUnlock(pin);
      } finally {
        submitting.current = false;
        setDigits('');
      }
    },
    [busy, onUnlock],
  );

  const appendDigit = useCallback(
    (digit: string) => {
      if (busy || submitting.current) return;
      setDigits((prev) => {
        if (prev.length >= PIN_LENGTH) return prev;
        const next = `${prev}${digit}`;
        if (next.length === PIN_LENGTH) {
          queueMicrotask(() => {
            void tryUnlock(next);
          });
        }
        return next;
      });
    },
    [busy, tryUnlock],
  );

  const clearDigits = useCallback(() => {
    if (busy) return;
    setDigits('');
  }, [busy]);

  const backspace = useCallback(() => {
    if (busy) return;
    setDigits((prev) => prev.slice(0, -1));
  }, [busy]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key >= '0' && event.key <= '9') {
        event.preventDefault();
        appendDigit(event.key);
      } else if (event.key === 'Backspace') {
        event.preventDefault();
        backspace();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        clearDigits();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [appendDigit, backspace, clearDigits]);

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[420px] flex-col justify-center px-4 py-10">
      <div className="mb-8 flex justify-end">
        <Link to={ROUTES.home} className="text-vz-blue hover:text-vz-orange text-[14px]">
          ← Back to site
        </Link>
      </div>

      <h1 className="text-vz-ink m-0 text-[42px] leading-[1.15] font-bold tracking-[-0.01em] max-mob:text-[32px]">
        Passcode
      </h1>
      <p className="text-vz-gray-mid m-0 mt-3 text-[17px] leading-[1.45]">
        Enter four digits to open the admin console.
      </p>

      <hr className="border-vz-rule mt-6 mb-8 border-0 border-t" />

      <div
        className="mx-auto flex w-4/5 gap-3"
        aria-live="polite"
        aria-label="Passcode digits"
      >
        {Array.from({ length: PIN_LENGTH }, (_, i) => {
          const filled = i < digits.length;
          const active = i === digits.length && digits.length < PIN_LENGTH;
          return (
            <div
              key={i}
              className={`flex aspect-square min-w-0 flex-1 items-center justify-center rounded-[3px] text-[28px] font-bold transition-colors duration-150 ${
                active
                  ? 'bg-vz-blue-tint text-vz-blue ring-vz-blue ring-2 ring-inset'
                  : 'bg-vz-blue-panel text-vz-ink'
              }`}
            >
              {filled ? '•' : ''}
            </div>
          );
        })}
      </div>

      {error && (
        <p className="mt-5 mb-0 text-center text-[14px] text-[#b42318]" role="alert">
          {error}
        </p>
      )}
      {busy && (
        <p className="text-vz-gray mt-5 mb-0 text-center text-[14px]">Checking passcode…</p>
      )}

      <div
        className="border-vz-rule mt-8 grid grid-cols-3 overflow-hidden rounded-[3px] border"
        role="group"
        aria-label="Numeric keypad"
      >
        {keys.map((key, index) => (
          <button
            key={key}
            type="button"
            disabled={busy}
            onClick={() => appendDigit(key)}
            className={`text-vz-ink hover:bg-vz-blue-panel active:bg-vz-blue-tint flex h-[72px] cursor-pointer items-center justify-center border-vz-rule bg-white text-[26px] font-bold transition-colors duration-150 disabled:cursor-wait disabled:opacity-60 max-mob:h-[64px] max-mob:text-[22px] ${
              index % 3 !== 2 ? 'border-r' : ''
            } ${index < 6 ? 'border-b' : ''}`}
          >
            {key}
          </button>
        ))}

        <button
          type="button"
          disabled={busy}
          onClick={clearDigits}
          className="text-vz-blue hover:bg-vz-blue-panel border-vz-rule flex h-[72px] cursor-pointer items-center justify-center border-t border-r bg-white text-[13px] font-bold tracking-[0.06em] uppercase transition-colors duration-150 disabled:opacity-60 max-mob:h-[64px]"
        >
          Clear
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => appendDigit('0')}
          className="text-vz-ink hover:bg-vz-blue-panel border-vz-rule flex h-[72px] cursor-pointer items-center justify-center border-t border-r bg-white text-[26px] font-bold transition-colors duration-150 disabled:opacity-60 max-mob:h-[64px] max-mob:text-[22px]"
        >
          0
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={backspace}
          aria-label="Delete last digit"
          className="text-vz-ink hover:bg-vz-blue-panel border-vz-rule flex h-[72px] cursor-pointer items-center justify-center border-t bg-white transition-colors duration-150 disabled:opacity-60 max-mob:h-[64px]"
        >
          <BackspaceIcon className="text-vz-blue" />
        </button>
      </div>
    </div>
  );
}

export function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const session = await fetchSession();
        if (cancelled) return;
        setAuthenticated(Boolean(session.authenticated));
      } catch {
        if (!cancelled) setAuthenticated(false);
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function unlockWithPin(pin: string) {
    setBusy(true);
    setError(null);
    try {
      const result = await loginWithPin(pin);
      if (!result.ok || !result.authenticated) {
        setError(result.error ?? 'Invalid passcode.');
        setAuthenticated(false);
        return;
      }
      setAuthenticated(true);
    } catch {
      setError('Could not reach the auth API. Is the server running?');
    } finally {
      setBusy(false);
    }
  }

  async function onLogout() {
    await logoutAdmin();
    setAuthenticated(false);
    setError(null);
  }

  if (checking) {
    return (
      <div className="bg-vz-page-mobile flex min-h-screen items-center justify-center px-4">
        <p className="text-vz-gray m-0 text-[15px]">Checking session…</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-white">
        <AdminPasscodeGate busy={busy} error={error} onUnlock={unlockWithPin} />
      </div>
    );
  }

  return (
    <div className="bg-vz-page-mobile min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-[960px]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-vz-blue m-0 text-[13px] font-bold tracking-[0.04em] uppercase">
              Helfenstein admin
            </p>
            <h1 className="text-vz-ink m-0 mt-1 text-[28px] font-bold">Clients</h1>
          </div>
          <div className="flex items-center gap-5">
            <Link to={ROUTES.home} className="text-vz-blue hover:text-vz-orange text-[14px]">
              ← Back to site
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="text-vz-blue hover:text-vz-orange cursor-pointer text-[14px]"
            >
              Log out
            </button>
          </div>
        </div>

        <div className="rounded-[4px] bg-white p-6 shadow-[0_0_2px_rgba(0,0,0,0.2)]">
          <div className="border-vz-rule flex items-center justify-between gap-3 border-b pb-4">
            <p className="text-vz-ink m-0 text-[15px] font-bold">
              {clients.length} {clients.length === 1 ? 'client' : 'clients'}
            </p>
          </div>

          {clients.length === 0 ? (
            <p className="text-vz-gray-mid m-0 mt-8 text-center text-[16px] leading-[1.45]">
              No clients yet.
            </p>
          ) : (
            <ul className="m-0 mt-2 list-none p-0">
              {clients.map((client) => (
                <li
                  key={client.id}
                  className="border-vz-rule flex flex-wrap items-baseline justify-between gap-2 border-b py-4"
                >
                  <span className="text-vz-ink text-[16px] font-bold">{client.name}</span>
                  <span className="text-vz-gray text-[14px]">{client.email}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { buttonOrangeClass } from '../ui/primitives';

type AppointmentModalContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const AppointmentModalContext = createContext<AppointmentModalContextValue | null>(null);

export function useAppointmentModal(): AppointmentModalContextValue {
  const ctx = useContext(AppointmentModalContext);
  if (!ctx) throw new Error('useAppointmentModal must be used within AppointmentModalProvider');
  return ctx;
}

export function useOptionalAppointmentModal(): AppointmentModalContextValue | null {
  return useContext(AppointmentModalContext);
}

export function AppointmentModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <AppointmentModalContext.Provider value={{ open, close, isOpen }}>
      {children}
    </AppointmentModalContext.Provider>
  );
}

export function AppointmentButton({
  children,
  className = '',
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const { open } = useAppointmentModal();
  return (
    <button
      type="button"
      className={`${buttonOrangeClass} cursor-pointer border-0 ${className}`}
      onClick={() => {
        onClick?.();
        open();
      }}
    >
      {children}
    </button>
  );
}

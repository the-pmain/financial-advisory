import { useEffect } from 'react';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { de } from './locales/de';
import { en } from './locales/en';
import { fr } from './locales/fr';
import { it } from './locales/it';
import type { Locale, Translations } from './types';
import { DEFAULT_LOCALE, LOCALES } from './types';

export type { Locale, Translations } from './types';
export { DEFAULT_LOCALE, LOCALES } from './types';

const STORAGE_KEY = 'vz-locale';

const catalogs: Record<Locale, Translations> = { de, en, fr, it };

export function getTranslations(locale: Locale): Translations {
  return catalogs[locale] ?? catalogs[DEFAULT_LOCALE];
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isLocale(stored)) return stored;
  } catch {
    /* ignore */
  }
  return DEFAULT_LOCALE;
}

export function storeLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
}

type LocaleContextValue = {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  initialLocale = DEFAULT_LOCALE,
  children,
}: {
  initialLocale?: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    storeLocale(next);
    document.documentElement.lang = next;
  }, []);

  useEffect(() => {
    const stored = readStoredLocale();
    setLocaleState((current) => (stored === current ? current : stored));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, t: getTranslations(locale), setLocale }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}

/** Shorthand when only strings are needed. */
export function useT(): Translations {
  return useLocale().t;
}

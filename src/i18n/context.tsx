import { createContext, useContext, type ReactNode } from "react";
import { en, type Messages } from "./locales/en.ts";

type I18nValue = {
  t: Messages;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  return <I18nContext.Provider value={{ t: en }}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

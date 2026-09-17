import type { ReactNode } from "react";
import { Header } from "./Header.tsx";
import { SkipNav } from "./SkipNav.tsx";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="max-tab:bg-vz-page-mobile min-h-screen pt-[25px] max-desk:pt-0">
      <SkipNav />
      <div className="relative mx-auto w-full max-w-[1280px] bg-white px-[30px] pb-[70px] shadow-[0_0_2px_rgba(0,0,0,0.25)] max-mast:px-[25px] max-lap:pb-[50px] max-mob:pb-[40px]">
        <Header />
        <main id="main" className="pt-[22px] max-mob:pt-[18px]">
          {children}
        </main>
      </div>
    </div>
  );
}

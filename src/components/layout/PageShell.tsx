import type { ReactNode } from 'react';
import { AppointmentModalHost, AppointmentModalProvider } from '../appointments/AppointmentModal';
import { CookieNotice } from './CookieNotice';
import { Footer } from './Footer';
import { Header } from './Header';
import { SkipNav } from './SkipNav';

/**
 * Grey canvas, then the white 1280px page card (27px top / 30px side / 70px
 * bottom padding, with the reference's 2px ambient shadow), then the footer
 * sitting on the grey outside the card.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <AppointmentModalProvider>
      <div className="max-tab:bg-vz-page-mobile pt-[25px] max-desk:pt-0">
        <SkipNav />

        <div className="relative mx-auto w-full max-w-[1280px] bg-white px-[30px] pb-[70px] shadow-[0_0_2px_rgba(0,0,0,0.25)] max-mast:px-[25px] max-lap:pb-[50px] max-mob:pb-[40px]">
          <Header />
          <main id="main" className="pt-[22px] max-mob:pt-[18px]">
            {children}
          </main>
        </div>

        <Footer />
        <CookieNotice />
        <AppointmentModalHost />
      </div>
    </AppointmentModalProvider>
  );
}

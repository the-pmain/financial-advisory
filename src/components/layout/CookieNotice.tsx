import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { CloseIcon } from '../ui/Icons';

const STORAGE_KEY = 'vz-cookie-notice-dismissed';

/** Fixed notice bar pinned to the bottom of the viewport, as on the reference. */
export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(STORAGE_KEY) !== '1');
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* storage unavailable — the notice simply returns next visit */
    }
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      data-cookie-notice=""
      className="fixed bottom-0 left-1/2 z-200 w-full max-w-[1280px] -translate-x-1/2 bg-white px-[30px] py-3 shadow-[0_0_20px_rgba(0,0,0,0.25)] max-mast:px-[25px] max-mob:px-5 max-mob:py-2.5 max-mob:pb-[max(10px,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center gap-3 max-mob:gap-2">
        <p className="text-vz-ink m-0 flex-1 text-[13px] leading-[1.4] max-mob:text-[12px]">
          This website uses cookies and other tracking technologies. For more information, please
          read our{' '}
          <Link
            to={ROUTES.legalNotices}
            className="text-vz-blue hover:text-vz-orange vz-underline inline-block"
          >
            Legal Notice
          </Link>{' '}
          and{' '}
          <Link
            to={ROUTES.privacyPolicy}
            className="text-vz-blue hover:text-vz-orange vz-underline inline-block"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss cookie notice"
          className="text-vz-orange hover:text-vz-orange-btn flex size-11 shrink-0 cursor-pointer items-center justify-center transition-colors duration-250"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

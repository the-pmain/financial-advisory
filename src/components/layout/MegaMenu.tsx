import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { portalLinks } from '../../data/navigation';
import type { NavGroup } from '../../data/navigation';
import { useT } from '../../i18n';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { ArrowRightIcon, ChevronDownIcon } from '../ui/Icons';

import { AppointmentButton } from '../appointments/AppointmentModal';
import { LanguageSwitcher } from './LanguageSwitcher';
import { VerificationRegisterCards } from './TrustSignals';

/**
 * The panel the Menu button reveals. On desktop it hangs from the header chrome
 * and covers the quick-links bar. Below 1025px it becomes a viewport sheet
 * pinned under `--nav-sheet-top` so it cannot overlap the logo row.
 */
export function MegaMenu({
  id,
  open,
  onClose,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const isPhone = useMediaQuery('(max-width: 740px)');
  const isDrawer = useMediaQuery('(width < 1025px)');
  const t = useT();
  const { mainNavigation } = t.nav;
  // Groups share the row evenly, so the panel stays balanced as the count changes.
  const columnWidth = mainNavigation.length >= 3 ? 'w-1/3' : 'w-1/2';

  useEffect(() => {
    if (!open || isDrawer) return;
    const first = panel.current?.querySelector<HTMLAnchorElement>('a');
    first?.focus({ preventScroll: true });
  }, [open, isDrawer]);

  return (
    <div
      id={id}
      ref={panel}
      hidden={!open}
      className={`absolute top-[71px] -right-[30px] -left-[30px] z-90 bg-white px-[30px] transition-[opacity,visibility] duration-250 ease-linear max-desk:top-[60px] max-lap:fixed max-lap:top-[var(--nav-sheet-top,74px)] max-lap:right-0 max-lap:bottom-0 max-lap:left-0 max-lap:overflow-y-auto max-lap:overscroll-y-contain max-lap:px-[25px] max-lap:pb-[max(2.5rem,env(safe-area-inset-bottom))] max-mob:px-5 ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      } after:pointer-events-none after:absolute after:-bottom-1 after:right-0 after:left-0 after:block after:h-1 after:bg-gradient-to-b after:from-black/15 after:to-transparent max-lap:after:hidden`}
    >
      <div className="flex py-5 max-lap:flex-col max-lap:gap-8 max-tab:gap-6">
        <nav aria-label={t.ui.mainNav} className="w-4/5 min-w-0 max-lap:w-full">
          <ul className="-ml-[18px] flex flex-row flex-wrap max-mob:ml-0 max-mob:block">
            {mainNavigation.map((group) => (
              <li
                key={group.label}
                className={`${columnWidth} min-w-0 shrink-0 grow-0 px-[18px] max-mob:w-full max-mob:px-0`}
              >
                {isPhone ? (
                  <PhoneGroup group={group} onClose={onClose} />
                ) : (
                  <>
                    <h3 className="text-vz-gray-mid vz-hairline-b mt-1 mb-[10px] pb-[17px] text-[20px] leading-[23px] font-normal">
                      <Link
                        to={group.to}
                        onClick={onClose}
                        className="hover:text-vz-orange transition-colors duration-250"
                      >
                        {group.label}
                      </Link>
                    </h3>
                    <ul>
                      {group.children.map((child) => (
                        <li key={child.to} className="vz-hairline-b py-3">
                          <Link
                            to={child.to}
                            onClick={onClose}
                            className="vz-break-long text-vz-blue hover:text-vz-orange block text-[16px] leading-[19px]"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Utility column: appointment CTA, portal links, newsletter, languages */}
        <div className="w-1/5 shrink-0 pl-[18px] max-lap:w-full max-lap:pl-0 max-mob:mt-2 max-mob:pb-6">
          <AppointmentButton className="max-mob:w-full" onClick={onClose}>
            {t.ui.makeAppointment}
          </AppointmentButton>

          <ul className="mt-6 hidden max-lap:block">
            {t.nav.topMenu
              .filter((link) => link.to !== ROUTES.appointments)
              .map((link) => (
                <li key={link.to} className="vz-hairline-b py-3">
                  <Link
                    to={link.to}
                    onClick={onClose}
                    className="vz-break-long text-vz-blue hover:text-vz-orange block text-[16px] leading-[19px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>

          {portalLinks.length > 0 && (
            <ul className="mt-4">
              {portalLinks.map((link) => (
                <li key={link.to} className="vz-hairline-b pb-[18px] last:after:hidden">
                  <Link
                    to={link.to}
                    onClick={onClose}
                    className="text-vz-blue hover:text-vz-orange group flex items-start justify-between gap-3 text-[16px] leading-[19px]"
                  >
                    <span>{link.label}</span>
                    <ArrowRightIcon className="text-vz-orange mt-[3px] h-[13px] w-[13px] shrink-0 transition-transform duration-250 group-hover:translate-x-[3px]" />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="vz-hairline-t mt-4 pt-[24px] leading-[19px]">
            <Link
              to={ROUTES.newsletter}
              onClick={onClose}
              className="text-vz-blue hover:text-vz-orange text-[16px] leading-[19px]"
            >
              {t.ui.subscribeNewsletter}
            </Link>
          </div>

          <LanguageSwitcher
            className="mt-[30px] gap-[15px]"
            buttonClassName="text-vz-blue hover:text-vz-orange"
          />
        </div>
      </div>

      <div className="vz-hairline-t pb-5 pt-4 max-mob:pb-8">
        <p className="text-vz-gray-mid m-0 text-[20px] leading-[23px] font-normal">
          {t.ui.verifyAuthorisation}
        </p>
        <ul className="m-0 mt-4 grid list-none grid-cols-4 gap-4 p-0 max-mast:grid-cols-2 max-mob:grid-cols-1">
          <VerificationRegisterCards />
        </ul>
      </div>
    </div>
  );
}

/**
 * On phones each group collapses behind its heading, which is how the reference
 * exposes `button.toggle-2nd` below 741px.
 */
function PhoneGroup({
  group,
  onClose,
}: {
  group: NavGroup;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `mega-${group.to.replace(/\W+/g, '-')}`;

  return (
    <div className="vz-rule-b">
      <div className="flex min-h-14 items-center gap-1">
        <h3 className="m-0 min-w-0 flex-1">
          <Link
            to={group.to}
            onClick={onClose}
            className="text-vz-gray-mid hover:text-vz-orange flex min-h-14 items-center text-left text-[20px] leading-[23px] font-normal transition-colors duration-250"
          >
            {group.label}
          </Link>
        </h3>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? 'Collapse' : 'Expand'} ${group.label}`}
          className="text-vz-gray-mid hover:text-vz-orange flex size-14 shrink-0 cursor-pointer items-center justify-center transition-colors duration-250"
        >
          <ChevronDownIcon
            className={`h-3 w-3 shrink-0 transition-transform duration-250 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
      <ul id={panelId} hidden={!open} className="pb-2">
        {group.children.map((child) => (
          <li key={child.to} className="vz-rule-t">
            <Link
              to={child.to}
              onClick={onClose}
              className="vz-break-long text-vz-blue hover:text-vz-orange flex min-h-12 items-center text-[16px] leading-[19px]"
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { topMenu } from '../../data/navigation';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useEscape, useScrollLock } from '../../hooks/useScrollLock';
import { SearchIcon } from '../ui/Icons';
import { Logo } from '../ui/Logo';
import { MegaMenu } from './MegaMenu';
import { NavToggle } from './NavToggle';
import { QuickLinksBar } from './QuickLinksBar';
import { SearchPanel } from './SearchPanel';

const MENU_ID = 'navigation-container';
const SEARCH_ID = 'search-block-input-container';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();
  const isPhone = useMediaQuery('(max-width: 740px)');

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, []);

  useEffect(closeAll, [pathname, closeAll]);
  useEscape(menuOpen || searchOpen, closeAll);
  // Only the phone drawer covers the viewport, so only it needs the page frozen.
  useScrollLock(menuOpen && isPhone);

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
    setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen((open) => !open);
    setMenuOpen(false);
  };

  return (
    <header
      id="header"
      className="sticky top-0 z-100 bg-white pt-[18px] shadow-[0_0.5px_0_#999999] max-lap:-mx-[25px] max-lap:px-[25px] max-lap:pt-[14px] max-mob:-mx-[12.5px] max-mob:px-[12.5px] max-mob:pt-[10px]"
    >
        {/* Row one: logo, utility links, menu trigger. Below 1281px the row
            collapses from 71px top-aligned to a 60px centred bar. */}
        <div className="flex min-h-[71px] items-center justify-end max-desk:min-h-[60px] max-desk:py-[10px]">
          <Logo />

          <div className="ml-auto flex items-center gap-[24px] max-desk:gap-[14px]">
            <button
              type="button"
              aria-expanded={searchOpen}
              aria-controls={SEARCH_ID}
              aria-label="Search"
              onClick={toggleSearch}
              className="text-vz-blue hover:text-vz-orange block size-[30px] shrink-0 cursor-pointer bg-transparent p-[3px] transition-colors duration-250 active:opacity-75 max-mob:order-2"
            >
              <SearchIcon className="h-6 w-6" stroke="currentColor" />
            </button>

            <nav aria-label="Top navigation" className="max-mob:hidden">
              <ul className="flex items-center gap-[24px] leading-[17px]">
                {topMenu.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-vz-blue hover:text-vz-orange vz-underline-hover tracking-vz-02 inline-block text-[15px] leading-[17px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* On phones the utility links move into the menu drawer and this
                compact chip takes their place. */}
            <Link
              to={ROUTES.financialPortal}
              className="text-vz-blue bg-vz-surface hover:text-vz-orange vz-underline-hover hidden rounded-[3px] px-2 pt-[7px] pb-[6px] text-[15px] leading-[17px] max-mob:order-1 max-mob:inline-block"
            >
              Login
            </Link>

            <div className="max-mob:order-3">
              <NavToggle open={menuOpen} onToggle={toggleMenu} controls={MENU_ID} />
            </div>
          </div>
        </div>

        <QuickLinksBar />

        <SearchPanel id={SEARCH_ID} open={searchOpen} onClose={closeAll} />
        <MegaMenu id={MENU_ID} open={menuOpen} onClose={closeAll} />

        {/* Mobile scrim behind the full-screen menu */}
        <div
          onClick={closeAll}
          aria-hidden="true"
          className={`fixed inset-0 z-90 hidden bg-black/50 transition-[opacity,visibility] duration-250 max-mob:block ${
            menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        />
    </header>
  );
}

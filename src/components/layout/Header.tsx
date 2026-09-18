import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { dropdownsFirst, topMenu } from '../../data/navigation';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useEscape, useScrollLock } from '../../hooks/useScrollLock';
import { SearchIcon } from '../ui/Icons';
import { Logo } from '../ui/Logo';
import { MegaMenu } from './MegaMenu';
import { NavToggle } from './NavToggle';
import { NavDropdown } from './NavDropdown';
import { QuickLinksBar } from './QuickLinksBar';
import { SearchPanel } from './SearchPanel';

const MENU_ID = 'navigation-container';
const SEARCH_ID = 'search-block-input-container';

/** Matches `max-lap` — the hamburger replaces the top utility row below 1025px. */
const DRAWER_QUERY = '(width < 1025px)';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();
  const isDrawer = useMediaQuery(DRAWER_QUERY);
  const chromeRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const overlayOpen = menuOpen || searchOpen;

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, []);

  useEffect(closeAll, [pathname, closeAll]);
  useEscape(overlayOpen, closeAll);

  useLayoutEffect(() => {
    const header = chromeRef.current?.closest('#header');
    const spacer = spacerRef.current;
    const root = document.documentElement;
    if (!(header instanceof HTMLElement)) return;

    const clearPin = () => {
      header.style.top = '';
      header.style.left = '';
      header.style.width = '';
      header.style.marginLeft = '';
      header.style.marginRight = '';
      header.style.removeProperty('--nav-sheet-left');
      header.style.removeProperty('--nav-sheet-width');
      if (spacer) spacer.style.height = '';
    };

    const pinFromBox = () => {
      const on = overlayOpen && isDrawer;
      if (!on) {
        root.classList.remove('vz-nav-open');
        clearPin();
        header.style.setProperty('--nav-sheet-top', `${Math.round(header.getBoundingClientRect().bottom)}px`);
        return;
      }

      const wasOpen = root.classList.contains('vz-nav-open');
      if (!wasOpen) {
        const box = header.getBoundingClientRect();
        if (spacer) spacer.style.height = `${box.height}px`;
        header.style.top = `${box.top}px`;
        header.style.left = `${box.left}px`;
        header.style.width = `${box.width}px`;
        header.style.marginLeft = '0';
        header.style.marginRight = '0';
        header.style.setProperty('--nav-sheet-left', `${box.left}px`);
        header.style.setProperty('--nav-sheet-width', `${box.width}px`);
        root.classList.add('vz-nav-open');
      }

      const pinned = header.getBoundingClientRect();
      header.style.setProperty('--nav-sheet-top', `${pinned.bottom}px`);
      header.style.setProperty('--nav-sheet-left', `${pinned.left}px`);
      header.style.setProperty('--nav-sheet-width', `${pinned.width}px`);
    };

    pinFromBox();
    window.addEventListener('resize', pinFromBox);
    window.visualViewport?.addEventListener('resize', pinFromBox);
    return () => {
      window.removeEventListener('resize', pinFromBox);
      window.visualViewport?.removeEventListener('resize', pinFromBox);
      root.classList.remove('vz-nav-open');
      clearPin();
    };
  }, [overlayOpen, isDrawer]);

  useScrollLock(overlayOpen && isDrawer);

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
    setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen((open) => !open);
    setMenuOpen(false);
  };

  return (
    <>
    <div ref={spacerRef} aria-hidden className="hidden max-lap:block" />
    <header
      id="header"
      className="sticky top-0 z-100 bg-white shadow-[0_0.5px_0_#999999] max-lap:-mx-[25px] max-lap:px-[25px] max-mob:-mx-[12.5px] max-mob:px-[12.5px]"
    >
      <div
        ref={chromeRef}
        className="relative z-[110] bg-white pt-[18px] max-lap:pt-[14px] max-mob:pt-[max(10px,env(safe-area-inset-top))]"
      >
        <div className="flex min-h-[71px] min-w-0 items-center justify-end max-desk:min-h-[60px] max-desk:py-[10px]">
          <Logo />

          <div className="ml-auto flex shrink-0 items-center gap-[24px] max-desk:gap-[14px] max-lap:gap-3">
            <button
              type="button"
              aria-expanded={searchOpen}
              aria-controls={SEARCH_ID}
              aria-label="Search"
              onClick={toggleSearch}
              className="text-vz-blue hover:text-vz-orange flex size-11 shrink-0 cursor-pointer items-center justify-center bg-transparent transition-colors duration-250 active:opacity-75"
            >
              <SearchIcon className="h-6 w-6" stroke="currentColor" />
            </button>

            <nav aria-label="Top navigation" className="max-lap:hidden">
              <ul className="flex items-center gap-6 leading-[17px] max-desk:gap-5">
                {dropdownsFirst(topMenu).map((link) => (
                  <li key={link.to}>
                    {link.children?.length ? (
                      <NavDropdown
                        label={link.label}
                        to={link.to}
                        items={link.children}
                        triggerClassName={(isActive) =>
                          `text-vz-blue hover:text-vz-orange tracking-vz-02 inline-block text-[15px] leading-[17px] ${
                            isActive ? 'font-bold' : ''
                          }`
                        }
                      />
                    ) : (
                      <Link
                        to={link.to}
                        className="text-vz-blue hover:text-vz-orange tracking-vz-02 inline-block text-[15px] leading-[17px]"
                      >
                        {link.label === 'Helfenstein Financial Portal' ? (
                          <>
                            <span className="max-desk:hidden">{link.label}</span>
                            <span className="hidden max-desk:inline">Portal</span>
                          </>
                        ) : (
                          link.label
                        )}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <NavToggle open={menuOpen} onToggle={toggleMenu} controls={MENU_ID} />
          </div>
        </div>
      </div>

      <QuickLinksBar />

      <SearchPanel id={SEARCH_ID} open={searchOpen} onClose={closeAll} />
      <MegaMenu id={MENU_ID} open={menuOpen} onClose={closeAll} />
    </header>
    </>
  );
}

import { NavLink } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { dropdownsFirst, quickLinks } from '../../data/navigation';
import { NavDropdown } from './NavDropdown';

const triggerClass = (isActive: boolean) =>
  `text-vz-blue hover:text-vz-orange tracking-vz-01 block py-[9px] text-[19px] leading-[22px] transition-colors duration-250 max-desk:py-[7px] max-desk:text-[17px] max-desk:leading-[20px] max-mob:py-3 ${
    isActive ? 'vz-underline' : ''
  }`;

/**
 * The second header row. Items with a real page tree open as dropdowns.
 */
export function QuickLinksBar() {
  const links = dropdownsFirst(quickLinks);

  return (
    <div className="relative min-h-[54px] overflow-x-auto overflow-y-visible max-desk:min-h-[48px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <nav aria-label="Quick links" className="vz-scroll-x pt-3">
        <ul className="inline-flex w-full items-center gap-6 whitespace-nowrap max-desk:gap-5 max-mob:gap-4">
          {links.map((link, i) => (
            <li key={link.to + link.label} className="inline-block whitespace-nowrap">
              {link.children?.length ? (
                <NavDropdown
                  label={link.label}
                  to={link.to}
                  items={link.children}
                  align={i === links.length - 1 ? 'end' : 'start'}
                  triggerClassName={triggerClass}
                />
              ) : (
                <NavLink
                  to={link.to}
                  end={link.to === ROUTES.about}
                  className={({ isActive }) => triggerClass(isActive)}
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-10 bg-gradient-to-l from-white to-transparent max-lap:block"
      />
    </div>
  );
}

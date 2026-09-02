import { NavLink } from 'react-router';
import { quickLinks } from '../../data/navigation';

/**
 * The second header row. Rules are drawn on the list itself (0.5px #999 top and
 * bottom) and the row scrolls horizontally with a hidden scrollbar, which is
 * how the reference copes with narrow viewports.
 */
export function QuickLinksBar() {
  return (
    <div className="min-h-[54px] overflow-x-clip overflow-y-visible max-desk:min-h-[48px]">
      {/* Below 1281px the row bleeds into the 25px page gutters so the list can
          scroll all the way to the viewport edge. */}
      <nav
        aria-label="Quick links"
        className="vz-scroll-x pt-3 max-desk:-mx-[25px] max-desk:-mt-3 max-desk:px-[25px] max-desk:pt-3"
      >
        <ul
          className="inline-flex w-full gap-[5px] whitespace-nowrap"
          style={{
            borderTop: '0.5px solid #999999',
            borderBottom: '0.5px solid #999999',
          }}
        >
          {quickLinks.map((link, i) => (
            <li
              key={link.to + link.label}
              className={`inline-block whitespace-nowrap ${
                i === 0
                  ? 'mr-[7px] max-desk:mr-[9px]'
                  : i === quickLinks.length - 1
                    ? 'ml-[7px] max-desk:ml-[9px]'
                    : 'mx-[7px] max-desk:mx-[9px]'
              }`}
            >
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-vz-blue hover:text-vz-orange tracking-vz-01 block py-[9px] text-[19px] leading-[22px] transition-[color,box-shadow] duration-250 max-desk:py-[7px] max-desk:text-[17px] max-desk:leading-[20px] ${
                    isActive ? 'vz-underline' : 'vz-underline-hover'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

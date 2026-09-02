import { Link } from 'react-router';
import type { Solution } from '../../data/content';
import { SectionTitle } from '../ui/primitives';

/**
 * Five equal text columns (244px each inside the 1220px mast). Every column
 * after the first carries a 4px #f5f5f7 rule on its left edge, with 18px of
 * trailing and 14px of leading padding around it.
 *
 * Below 1281px the reference stops reflowing and turns the row into a
 * horizontal scroller of fixed 200px columns that bleeds into the page gutters,
 * so the same five items stay side by side all the way down to phones.
 */
export function TextTeasers({ title, items }: { title: string; items: Solution[] }) {
  return (
    <section>
      <SectionTitle>{title}</SectionTitle>

      <ul className="vz-scroll-x flex list-none p-0 max-desk:-mx-[25px] max-desk:px-[25px]">
        {items.map((item, i) => (
          <li
            key={item.title}
            className={`w-1/5 shrink-0 max-desk:w-[200px] ${
              i === 0
                ? 'pr-[18px] max-mob:pr-0'
                : 'border-vz-surface border-l-4 pr-[18px] pl-[14px] max-desk:pl-[10px] max-mob:border-l-0 max-mob:pr-0 max-mob:pl-[18px]'
            } ${i === items.length - 1 ? '!pr-0' : ''}`}
          >
            <h3 className="tracking-vz-01 m-0 mb-[8px] text-[20px] leading-[25px] font-bold">
              <Link
                to={item.to}
                className="text-vz-blue-mid hover:text-vz-orange vz-underline-hover transition-colors duration-250"
              >
                {item.title}
              </Link>
            </h3>
            <p className="tracking-vz-02 m-0 text-[18px] leading-[25.4px] text-black max-mob:text-[16px] max-mob:leading-[22.4px]">
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

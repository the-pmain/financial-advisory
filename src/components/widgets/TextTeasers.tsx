import { Link } from 'react-router';
import type { Solution } from '../../data/content';
import { useLocale } from '../../i18n';
import { PhoneRichText } from '../ui/PhoneNumberDisplay';
import { SectionTitle } from '../ui/primitives';

/**
 * Equal text columns that share the mast. Long locale compounds wrap and
 * hyphenate inside the column instead of painting over the next one.
 *
 * Below 1281px the row becomes a horizontal scroller of bounded columns
 * that bleed into the page gutters.
 */
export function TextTeasers({ title, items }: { title: string; items: Solution[] }) {
  const { locale } = useLocale();

  return (
    <section lang={locale}>
      <SectionTitle>{title}</SectionTitle>

      <ul className="vz-scroll-x flex list-none p-0 max-desk:-mx-[25px] max-desk:px-[25px]">
        {items.map((item, i) => (
          <li
            key={item.title}
            className={`min-w-0 flex-1 basis-0 max-desk:w-[min(16.5rem,78vw)] max-desk:flex-none ${
              i === 0
                ? 'pr-[18px] max-mob:pr-0'
                : 'border-vz-surface border-l-4 pr-[18px] pl-[14px] max-desk:pl-[10px] max-mob:border-l-0 max-mob:pr-0 max-mob:pl-[18px]'
            } ${i === items.length - 1 ? '!pr-0' : ''}`}
          >
            <h3 className="tracking-vz-01 vz-break-long text-vz-ink m-0 mb-[8px] text-[20px] leading-[25px] font-bold">
              {item.to ? (
                <Link
                  to={item.to}
                  className="vz-break-long text-vz-blue-mid hover:text-vz-orange vz-underline-hover transition-colors duration-250"
                >
                  {item.title}
                </Link>
              ) : (
                item.title
              )}
            </h3>
            <p className="tracking-vz-02 vz-break-long m-0 text-[18px] leading-[25.4px] text-black max-mob:text-[16px] max-mob:leading-[22.4px]">
              <PhoneRichText text={item.text} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

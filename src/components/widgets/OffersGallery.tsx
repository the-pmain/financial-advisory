import { Link } from 'react-router';
import type { Offer } from '../../data/content';
import { offerIcons } from '../ui/Icons';
import { ButtonPill } from '../ui/primitives';

/**
 * Six-column gutter grid of cream cards. The reference draws gutters with a
 * -8px margin on the row and 8px padding on each item, which makes a two-column
 * card exactly 396px and a one-column card 190px inside a 1220px mast.
 *
 * The wide card lays its text column beside an image that bleeds off the right
 * edge; the narrow cards lead with a centred 72px icon and drop the teaser
 * (kept in the accessibility tree only), pinning the CTA to the card floor.
 */
export function OffersGallery({ offers }: { offers: Offer[] }) {
  return (
    <section aria-label="Offers" className="max-mob:-mx-[12.5px]">
      {/* Six tracks above 1281px, three below it, two on phones — where the
          gutter also tightens from 16px to 12px and the row bleeds 12.5px into
          each page gutter. */}
      <ul className="-m-2 flex list-none flex-wrap p-0 max-mob:-m-[6px]">
        {offers.map((offer) => (
          <li
            key={offer.id}
            className={`flex p-2 max-mob:p-[6px] ${
              offer.large ? 'w-2/6 max-desk:w-2/3 max-mob:w-full' : 'w-1/6 max-desk:w-1/3 max-mob:w-1/2'
            }`}
          >
            {offer.large ? <LargeCard offer={offer} /> : <SmallCard offer={offer} />}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* On phones the left inset drops from 14px to 8px, which is what lets the
   image column keep its full 170px while the copy narrows. */
const cardBase =
  'group bg-vz-cream shadow-vz-card relative flex w-full overflow-hidden rounded-[5px] pr-[14px] pl-[14px] text-inherit no-underline max-mob:pl-[8px] transition-[background-color,box-shadow] duration-250 ease-out hover:bg-vz-cream-light hover:shadow-[1px_1px_6px_rgba(0,0,0,0.14)] focus-visible:outline-offset-[-2px]';
const tagClass =
  'text-vz-ink tracking-vz-01 m-0 mb-[6px] text-[15px] leading-[17px] max-mob:mb-[2px]';

function LargeCard({ offer }: { offer: Offer }) {
  return (
    <Link
      to={offer.to}
      className={`${cardBase} pt-[22px] pb-[18px] max-mob:pb-[14px]`}
      aria-describedby={`offer-teaser-${offer.id}`}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <p className={tagClass}>{offer.tag}</p>
        <h3 className="text-vz-ink m-0 text-[21px] leading-[25px] font-bold transition-colors duration-250 group-hover:text-vz-orange max-mob:text-[20px]">
          {offer.title}
        </h3>
        <p
          id={`offer-teaser-${offer.id}`}
          className="text-vz-ink tracking-vz-01 mt-[6px] mb-[19px] text-[14px] leading-[18.7px] max-mob:mb-[12px]"
        >
          {offer.teaser}
        </p>
        <ButtonPill static className="mt-auto">
          {offer.cta}
        </ButtonPill>
      </div>

      {/* 154px of track plus a 16px bleed makes the reference's 170px media
          column, inside which a 246px image is centre-cropped. */}
      <div className="-mr-4 flex w-[154px] shrink-0 items-center overflow-hidden">
        {offer.image && (
          <img
            src={offer.image}
            alt=""
            className="h-[218px] w-[246px] max-w-none shrink-0"
          />
        )}
      </div>
    </Link>
  );
}

function SmallCard({ offer }: { offer: Offer }) {
  const Icon = offerIcons[offer.icon];

  return (
    <Link
      to={offer.to}
      className={`${cardBase} flex-col pt-[12px] pb-[18px] max-mob:py-[14px]`}
    >
      <Icon className="mx-auto mb-[14px] h-[72px] w-[72px] shrink-0 text-[#cdbfae]" />

      <div className="flex flex-1 flex-col">
        <p className={tagClass}>{offer.tag}</p>
        <h3 className="text-vz-ink m-0 mb-[19px] text-[16px] leading-[21px] font-bold transition-colors duration-250 group-hover:text-vz-orange max-mob:mb-[12px] max-mob:text-[15px] max-mob:leading-[20px]">
          {offer.title}
        </h3>
        <p className="visually-hidden">{offer.teaser}</p>
        <ButtonPill static block className="mt-auto">
          {offer.cta}
        </ButtonPill>
      </div>
    </Link>
  );
}

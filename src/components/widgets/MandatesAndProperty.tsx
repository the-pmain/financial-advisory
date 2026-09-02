import { Link } from 'react-router';
import { property } from '../../data/content';
import { UnderlineLink } from '../ui/primitives';

/**
 * Property card: a 300x210 photo with the key figures in a rule-separated
 * table beside it, offset 312px from the left edge as on the reference.
 */
export function PropertyTeaser() {
  return (
    <>
      <Link to={property.to} className="group relative block">
        {/* 300px of media above 1281px, then half the column capped at 300px,
            with a 12px gutter on both sides of the figures. */}
        <div className="flex max-mob:flex-col">
          {/* The media box is 210px tall at every width; only its width flexes. */}
          <div className="h-[210px] w-[300px] shrink-0 overflow-hidden bg-[#d3d3d3] max-desk:w-1/2 max-desk:max-w-[300px] max-mob:w-full max-mob:max-w-none">
            <img
              src={property.image}
              alt={property.imageAlt}
              className="h-full w-full object-cover"
            />
          </div>

          <dl className="m-0 min-w-0 flex-1 px-[12px] text-[16px] leading-[21px] max-mob:mt-[12px] max-mob:px-0">
            <div className="border-vz-gray-mid border-b pb-[6px]">
              <dt className="visually-hidden">Property type</dt>
              <dd className="text-vz-ink group-hover:text-vz-orange m-0 text-[20px] leading-[25.4px] font-bold transition-colors duration-250">
                {property.type}
              </dd>
            </div>

            {/* Label and value run together as "Address: Biberist, 4562",
                flush left — the reference does not justify the value. */}
            {property.specs.map((spec) => (
              <div
                key={spec.label}
                className={`border-vz-gray-mid border-b pt-[7px] pb-[6px] ${
                  spec.emphasis ? 'font-bold' : ''
                }`}
              >
                <dt className="text-vz-ink group-hover:text-vz-orange inline transition-colors duration-250 after:content-[':']">
                  {spec.label}
                </dt>
                <dd className="text-vz-ink group-hover:text-vz-orange m-0 ml-[4px] inline transition-colors duration-250">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Link>

      <p className="mt-[18px] mb-0 leading-[21px]">
        <UnderlineLink to={property.to} bold>
          More offerings
        </UnderlineLink>
      </p>
    </>
  );
}

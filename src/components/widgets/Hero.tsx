import { Link } from 'react-router';
import { audienceBands, hero } from '../../data/content';
import { UnderlineLink } from '../ui/primitives';

/**
 * Home lead: brand + slogan + positioning copy, with portrait as a
 * supporting visual rather than the sole message.
 */
export function Hero() {
  return (
    <section className="mx-auto grid max-w-[1100px] grid-cols-[minmax(0,1fr)_minmax(160px,220px)] items-center gap-10 max-mob:grid-cols-1 max-mob:gap-6 max-mob:text-center">
      <div className="min-w-0">
        <p className="text-vz-blue m-0 text-[15px] leading-[1.3] font-bold tracking-[0.02em]">
          {hero.brand}
        </p>
        <h1 className="text-vz-ink mt-3 mb-0 text-[40px] leading-[1.15] font-bold tracking-[-0.01em] max-lap:text-[32px] max-mob:text-[26px]">
          {hero.headline}
        </h1>
        <p className="text-vz-ink mt-4 mb-0 max-w-[40rem] text-[17px] leading-[1.5] max-mob:mx-auto max-mob:text-[16px]">
          {hero.subline}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 max-mob:justify-center">
          <UnderlineLink to={hero.secondaryCta.to}>{hero.secondaryCta.label}</UnderlineLink>
        </div>
      </div>

      <div className="mx-auto size-[200px] shrink-0 overflow-hidden rounded-full max-mob:size-[140px]">
        <img
          src={hero.image}
          alt={hero.imageAlt}
          width={200}
          height={200}
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}

export function AudienceBands() {
  return (
    <section className="grid grid-cols-2 gap-x-[68px] gap-y-8 max-tab:grid-cols-1">
      {audienceBands.map((band) => (
        <div key={band.id} className="border-vz-rule border-t pt-5">
          <h2 className="text-vz-ink m-0 text-[26px] leading-[1.25] font-bold max-mob:text-[22px]">
            {band.title}
          </h2>
          <p className="text-vz-ink mt-3 mb-0 text-[17px] leading-[1.45]">{band.text}</p>
          <p className="mt-4 mb-0">
            <Link
              to={band.to}
              className="text-vz-blue hover:text-vz-orange vz-underline-hover text-[15px]"
            >
              {band.cta}
            </Link>
          </p>
        </div>
      ))}
    </section>
  );
}

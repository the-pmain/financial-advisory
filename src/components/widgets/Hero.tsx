import { Link } from 'react-router';
import { audienceBands, hero } from '../../data/content';
import { AppointmentButton } from '../appointments/AppointmentModal';
import { CompassIcon, ShieldIcon } from '../ui/Icons';
import { PhoneRichText } from '../ui/PhoneNumberDisplay';
import { UnderlineLink } from '../ui/primitives';

const bandIcons = {
  individuals: CompassIcon,
  'independent-advice': ShieldIcon,
} as const;

/**
 * Home lead: one headline, one short line, one primary action.
 */
export function Hero() {
  return (
    <section className="mx-auto grid max-w-[1100px] grid-cols-[minmax(0,1fr)_minmax(160px,220px)] items-center gap-16 pt-6 max-mob:grid-cols-1 max-mob:gap-8 max-mob:pt-2 max-mob:text-center">
      <div className="min-w-0">
        <h1 className="text-vz-ink mt-0 mb-0 text-[40px] leading-[1.15] font-bold tracking-[-0.01em] max-lap:text-[32px] max-mob:text-[26px]">
          {hero.headline}
        </h1>
        <p className="text-vz-ink mt-6 mb-0 max-w-[32rem] text-[18px] leading-[1.45] max-mob:mx-auto max-mob:text-[16px]">
          <PhoneRichText text={hero.subline} />
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 max-mob:justify-center">
          <AppointmentButton>Make an appointment</AppointmentButton>
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
    <section className="grid grid-cols-2 gap-x-[68px] gap-y-10 max-tab:grid-cols-1">
      {audienceBands.map((band) => {
        const Icon = bandIcons[band.id];
        return (
          <div key={band.id} className="border-vz-rule border-t pt-6">
            <Icon className="text-vz-blue mb-4 h-10 w-10" />
            <h2 className="text-vz-ink m-0 text-[26px] leading-[1.25] font-bold max-mob:text-[22px]">
              {band.title}
            </h2>
            <p className="text-vz-ink mt-3 mb-0 text-[17px] leading-[1.45]">
              <PhoneRichText text={band.text} />
            </p>
            <p className="mt-4 mb-0">
              <Link
                to={band.to}
                className="text-vz-blue hover:text-vz-orange vz-underline-hover text-[15px]"
              >
                {band.cta}
              </Link>
            </p>
          </div>
        );
      })}
    </section>
  );
}

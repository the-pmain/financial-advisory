import { Link } from 'react-router';
import { audienceBands, hero } from '../../data/content';
import { AppointmentButton } from '../appointments/AppointmentModal';
import { ArrowRightIcon, ChartIcon, CompassIcon, PeopleIcon, ShieldIcon } from '../ui/Icons';
import { PhoneRichText } from '../ui/PhoneNumberDisplay';

const bandIcons = {
  individuals: CompassIcon,
  'independent-advice': ShieldIcon,
} as const;

const trustItems = [
  { label: 'Tailored advice', Icon: CompassIcon },
  { label: 'Independent advice', Icon: ChartIcon },
  { label: 'Long-term focus', Icon: ShieldIcon },
  { label: 'Trusted partnership', Icon: PeopleIcon },
] as const;

/**
 * Opening screen: photograph sits in the page container, darkened,
 * with the same private-client lead over it.
 */
export function Hero() {
  return (
    <section className="overflow-hidden rounded-[6px] text-white">
      <div className="relative min-h-[min(72vh,640px)] max-mob:min-h-[min(520px,calc(100dvh-14rem))]">
        <img
          src="/images/hero-lucerne.jpg"
          alt="Lake and Alpine view from a terrace — Lucerne and central Switzerland"
          width={1024}
          height={576}
          className="absolute inset-0 h-full w-full object-cover object-[center_42%] brightness-[0.45] contrast-[1.08] saturate-[0.92]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent" />

        <div className="relative z-1 flex min-h-[min(72vh,640px)] flex-col max-mob:min-h-[min(520px,calc(100dvh-14rem))]">
          <div className="flex flex-1 items-center px-10 py-14 max-mob:px-5 max-mob:py-10">
            <div className="min-w-0 max-w-[38rem]">
              <p className="m-0 text-[12px] leading-[1.4] font-bold tracking-[0.18em] text-white/80 uppercase">
                {hero.brand}
              </p>
              <h1 className="mt-4 mb-0 text-[48px] leading-[1.08] font-bold tracking-[-0.02em] text-white max-lap:text-[36px] max-mob:text-[28px]">
                {hero.headline}
              </h1>
              <p className="mt-6 mb-0 max-w-[34rem] text-[18px] leading-[1.5] text-white/90 max-mob:text-[16px]">
                <PhoneRichText text={hero.subline} />
              </p>
              <div className="mt-9">
                <AppointmentButton className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[13px] tracking-[0.08em] uppercase">
                  {hero.ctaLabel}
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </AppointmentButton>
              </div>
            </div>
          </div>

          <div className="bg-vz-blue/95 px-10 py-5 max-mob:px-5">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-5 max-mob:flex-col max-mob:items-start">
              <ul className="m-0 flex min-w-0 flex-1 list-none flex-wrap gap-x-8 gap-y-3 p-0">
                {trustItems.map(({ label, Icon }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2.5 text-[12px] font-bold tracking-[0.08em] text-white uppercase"
                  >
                    <Icon className="text-vz-orange-light h-5 w-5 shrink-0" />
                    {label}
                  </li>
                ))}
              </ul>
              <p className="m-0 max-w-[16rem] text-[12px] leading-[1.4] tracking-[0.06em] text-white/75 uppercase max-mob:max-w-none">
                More than investments. A lasting partnership.
              </p>
            </div>
          </div>
        </div>
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

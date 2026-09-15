import { useState } from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { ArrowRightIcon, ChevronDownIcon } from '../ui/Icons';
import { LogoMark } from '../ui/Logo';
import { ButtonOrange } from '../ui/primitives';
import { ComplianceMarks } from '../ui/ComplianceMarks';
import { TrustSignals } from './TrustSignals';
import { VersionStamp } from '../ui/VersionStamp';
import { Breadcrumb } from './Breadcrumb';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  actionLinks,
  legalLinks,
  mainNavigation,
  portalLinks,
} from '../../data/navigation';
import type { NavGroup } from '../../data/navigation';

/**
 * The footer sits outside the white page card, on the grey body colour, but
 * shares the card's 1280px measure and 30px gutters.
 *
 * Its middle band is a 836/257 grid with a 91px left inset reserved for the
 * logo mark. The menu is a four-track 182px grid of which only three are used,
 * which is what produces the reference's block of columns hugging the left
 * rather than spreading across the full width. It drops to two tracks below
 * 1271px and collapses into accordions below 861px.
 */
export function Footer() {
  const collapsible = useMediaQuery('(width < 861px)');

  return (
    <footer
      id="footer"
      className="relative mx-auto w-full max-w-[1280px] px-[30px] pt-4 pb-9 max-mast:px-[25px] max-tab:py-6"
    >
      <div className="mb-[38px] flex flex-wrap items-center justify-between gap-6 max-tab:mb-[31px] max-tab:flex-col max-tab:items-start max-tab:gap-[30px]">
        <Breadcrumb />
        <ButtonOrange to={ROUTES.appointments}>Make an appointment</ButtonOrange>
      </div>

      <TrustSignals className="mb-[50px] max-tab:mb-[40px]" />

      <div className="relative grid grid-cols-[minmax(0,836fr)_257px] items-start gap-x-[36px] gap-y-[44px] pl-[91px] max-tab:grid-cols-1 max-tab:gap-y-[43px] max-tab:pl-0">
        <Link
          to={ROUTES.home}
          aria-label="Home"
          className="absolute top-0 left-0 block size-[55px] opacity-100 transition-opacity duration-250 hover:opacity-70 max-tab:hidden"
        >
          <LogoMark className="size-[55px]" />
        </Link>

        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-3 gap-[36px] max-mast:grid-cols-2 max-tab:grid-cols-1 max-tab:gap-0"
        >
          {mainNavigation.map((group) =>
            collapsible ? (
              <FooterAccordion key={group.label} group={group} />
            ) : (
              <div key={group.label} className="pt-[5px]">
                <h2 className="text-vz-gray-mid m-0 text-[20px] leading-[24px] font-normal">
                  <Link
                    to={group.to}
                    className="hover:text-vz-orange transition-colors duration-250"
                  >
                    {group.label}
                  </Link>
                </h2>
                <FooterGroupLinks group={group} />
              </div>
            )
          )}
        </nav>

        <div className="max-lap:max-w-[257px] max-tab:max-w-none">
          {portalLinks.length > 0 && (
            <ul className="m-0 list-none p-0">
              {portalLinks.map((link) => (
                <li key={link.to}>
                  <FooterUtilityLink label={link.label} to={link.to} external={link.external} />
                </li>
              ))}
            </ul>
          )}

          {/* Only the newsletter row shows on wide screens; the others duplicate
              links already present in the menu columns. */}
          <ul className={`list-none p-0 ${portalLinks.length > 0 ? 'mt-[44px] max-tab:mt-0' : 'mt-0'}`}>
            {actionLinks.map((link, i) => (
              <li
                key={link.to}
                className={i < actionLinks.length - 1 ? 'hidden max-tab:block' : ''}
              >
                <FooterUtilityLink label={link.label} to={link.to} ruled />
              </li>
            ))}
          </ul>

          <ComplianceMarks className="mt-8 max-tab:mt-6" />
        </div>
      </div>

      {/* Legal row. Social icons live in the trust band; languages sit first
          on small screens, then the legal links. */}
      <div className="mt-[28px] grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-4 max-tab:mt-[17px] max-tab:grid-cols-1">
        <nav aria-label="Legal" className="max-tab:order-3">
          <ul className="m-0 flex list-none flex-wrap gap-4 p-0 max-tab:flex-col max-tab:gap-1">
            {legalLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-vz-slate hover:text-vz-orange text-[14px] leading-[17px] transition-colors duration-250 max-tab:text-[12px] max-tab:leading-[15px]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <LanguageSwitcher className="max-tab:order-1 max-tab:gap-10" />
      </div>

      <VersionStamp className="text-vz-gray-mid m-0 mt-4 text-[12px] leading-[15px]" />
    </footer>
  );
}

function FooterGroupLinks({ group }: { group: NavGroup }) {
  return (
    <ul className="mt-[18px] list-none p-0 max-tab:mt-0">
      {group.children.map((child) => (
        <li key={child.to} className="py-[10px] shadow-[inset_0_0.5px_0_rgba(0,0,0,0.4)]">
          <Link
            to={child.to}
            className="text-vz-slate hover:text-vz-orange block text-[16px] leading-[19px] transition-colors duration-250"
          >
            {child.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Below 861px each group becomes a 52px row that opens on tap. */
function FooterAccordion({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const panelId = `footer-group-${group.label.replace(/\W+/g, '-').toLowerCase()}`;

  return (
    <div className="shadow-[inset_0_0.5px_0_rgba(0,0,0,0.4)]">
      <h2 className="m-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="text-vz-slate hover:text-vz-orange flex w-full cursor-pointer items-center justify-between gap-3 pt-[14px] pb-[13px] text-left text-[21px] leading-[25px] font-normal transition-colors duration-250"
        >
          {group.label}
          <ChevronDownIcon
            className={`h-3 w-3 shrink-0 transition-transform duration-250 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
      </h2>
      <div id={panelId} hidden={!open} className="pb-[10px]">
        <FooterGroupLinks group={group} />
      </div>
    </div>
  );
}

function FooterUtilityLink({
  label,
  to,
  external,
  ruled = false,
}: {
  label: string;
  to: string;
  external?: boolean;
  ruled?: boolean;
}) {
  const className = `text-vz-slate hover:text-vz-orange group flex items-center justify-between gap-3 py-[10px] text-[16px] leading-[19px] transition-colors duration-250 ${
    ruled ? 'shadow-[inset_0_0.5px_0_rgba(0,0,0,0.4)]' : ''
  }`;

  /* Portal rows carry the reference's orange trailing arrow. */
  const arrow = !ruled ? (
    <ArrowRightIcon
      aria-hidden="true"
      className="text-vz-orange h-[10px] w-[14px] shrink-0 transition-transform duration-250 group-hover:translate-x-[3px]"
    />
  ) : null;

  if (external) {
    return (
      <a href={to} target="_blank" rel="noreferrer noopener" className={className}>
        <span>
          {label}
          <span className="visually-hidden"> (external link)</span>
        </span>
        {arrow}
      </a>
    );
  }

  return (
    <Link to={to} className={className}>
      <span>{label}</span>
      {arrow}
    </Link>
  );
}

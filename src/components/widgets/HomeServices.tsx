import { Link } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { CalendarIcon, ChartIcon, ChecklistIcon, CompassIcon } from '../ui/Icons';
import { SectionTitle } from '../ui/primitives';

const services = [
  { title: 'Retirement', to: ROUTES.retirement, Icon: CalendarIcon },
  { title: 'Pillar 3a', to: ROUTES.pensionPlanning, Icon: ChartIcon },
  { title: 'Tax', to: ROUTES.taxes, Icon: ChecklistIcon },
  { title: 'Investments', to: ROUTES.financialInvestments, Icon: CompassIcon },
] as const;

/**
 * Home offering as a scannable icon row — titles only, no body copy.
 */
export function HomeServices() {
  return (
    <section>
      <SectionTitle>How we can help</SectionTitle>
      <ul className="m-0 grid list-none grid-cols-4 gap-x-10 gap-y-12 p-0 max-tab:grid-cols-2 max-mob:gap-x-6 max-mob:gap-y-10">
        {services.map(({ title, to, Icon }) => (
          <li key={to} className="min-w-0">
            <Link
              to={to}
              className="group focus-visible:outline-vz-orange inline-flex flex-col items-start gap-5 no-underline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <Icon className="text-vz-blue h-12 w-12 shrink-0" />
              <span className="vz-break-long text-vz-ink group-hover:text-vz-orange text-[20px] leading-[1.25] font-bold transition-colors duration-250 max-mob:text-[18px]">
                {title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

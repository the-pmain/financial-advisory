import { quickLinks } from '../data/navigation';
import { ROUTES } from '../constants/routes';
import { ButtonOrange, SectionTitle } from '../components/ui/primitives';
import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="max-w-[802px]">
      <h1>Page not found</h1>
      <p className="text-vz-ink text-[19px] leading-[1.5]">
        The page you were looking for does not exist, or has been moved. Please use the navigation
        above, or start again from one of the topics below.
      </p>
      <ButtonOrange to={ROUTES.home}>Back to the home page</ButtonOrange>

      <div className="mt-12">
        <SectionTitle>Popular topics</SectionTitle>
        <ul className="grid grid-cols-3 gap-x-9 max-tab:grid-cols-2 max-mob:grid-cols-1">
          {quickLinks.map((link) => (
            <li key={link.to} className="vz-rule-b py-[10px]">
              <Link
                to={link.to}
                className="text-vz-blue hover:text-vz-orange vz-underline-hover inline-block text-[17px] leading-[1.3]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

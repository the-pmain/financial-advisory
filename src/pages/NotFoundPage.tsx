import { useT } from '../i18n';
import { ROUTES } from '../constants/routes';
import { ButtonOrange, SectionTitle } from '../components/ui/primitives';
import { Link } from 'react-router';

export function NotFoundPage() {
  const t = useT();

  return (
    <div className="max-w-[802px]">
      <h1>{t.ui.pageNotFound}</h1>
      <p className="text-vz-ink text-[19px] leading-[1.5]">{t.ui.pageNotFoundBody}</p>
      <ButtonOrange to={ROUTES.home}>{t.ui.backToHome}</ButtonOrange>

      <div className="mt-12">
        <SectionTitle>{t.ui.popularTopics}</SectionTitle>
        <ul className="grid grid-cols-3 gap-x-9 max-tab:grid-cols-2 max-mob:grid-cols-1">
          {t.nav.quickLinks.map((link) => (
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

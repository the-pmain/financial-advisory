import { languages } from '../../data/navigation';
import { useLocale, type Locale } from '../../i18n';

/** Language switcher used in the footer and mega menu. */
export function LanguageSwitcher({
  className = '',
  buttonClassName = 'text-vz-slate hover:text-vz-orange',
}: {
  className?: string;
  buttonClassName?: string;
}) {
  const { locale, setLocale } = useLocale();

  return (
    <ul className={`m-0 flex list-none gap-4 p-0 ${className}`}>
      {languages.map((lang) => (
        <li key={lang.code}>
          <button
            type="button"
            aria-current={locale === lang.code ? 'true' : undefined}
            onClick={() => setLocale(lang.code as Locale)}
            className={`${buttonClassName} cursor-pointer text-[16px] leading-[19px] uppercase transition-colors duration-250 ${
              locale === lang.code ? 'font-bold' : ''
            }`}
          >
            {lang.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

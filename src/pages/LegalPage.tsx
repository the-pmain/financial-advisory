import { useParams } from 'react-router';
import { legalBySlug } from '../data/legal';
import { useT } from '../i18n';
import { PhoneRichText } from '../components/ui/PhoneNumberDisplay';
import { AuditReports } from '../components/widgets/AuditReports';
import { DocumentsList } from '../components/widgets/DocumentsList';
import { CommercialRegisterExtract } from '../components/widgets/CommercialRegisterExtract';
import { OmbudsmanDisclosure } from '../components/widgets/OmbudsmanDisclosure';
import { NotFoundPage } from './NotFoundPage';

export function LegalPage() {
  const { slug } = useParams();
  const t = useT();
  const page = slug ? (t.legal[slug] ?? legalBySlug.get(slug)) : undefined;

  if (!page) return <NotFoundPage />;

  return (
    <article className="max-w-[802px]">
      <h1>{page.title}</h1>

      {page.sections.map((section, i) => (
        <section key={i} className={i > 0 ? 'mt-8' : 'mt-6'}>
          {section.heading && (
            <h2 className="text-vz-ink mb-3 text-[22px] leading-[1.3]">{section.heading}</h2>
          )}
          {section.paragraphs.map((paragraph, j) => (
            <p key={j} className="text-vz-ink text-[17px] leading-[1.55]">
              <PhoneRichText text={paragraph} />
            </p>
          ))}
        </section>
      ))}

      {slug === 'audit-reports' && (
        <div className="mt-10">
          <AuditReports />
        </div>
      )}

      {slug === 'documents-and-information' && (
        <>
          <div className="mt-10">
            <CommercialRegisterExtract />
          </div>
          <div className="mt-10">
            <OmbudsmanDisclosure />
          </div>
          <div className="mt-10">
            <DocumentsList title="Documents" />
          </div>
        </>
      )}
    </article>
  );
}

import { useParams } from 'react-router';
import { legalBySlug } from '../data/legal';
import { DocumentsList } from '../components/widgets/DocumentsList';
import { NotFoundPage } from './NotFoundPage';

export function LegalPage() {
  const { slug } = useParams();
  const page = slug ? legalBySlug.get(slug) : undefined;

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
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      {slug === 'documents-and-information' && (
        <div className="mt-10">
          <DocumentsList title="Downloadable documents" />
        </div>
      )}
    </article>
  );
}

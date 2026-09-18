import { sampleDocuments } from "../sample/portal.ts";
import { useI18n } from "../i18n/context.tsx";

export function DocumentsPage() {
  const { t } = useI18n();

  return (
    <section className="app-page">
      <h1 className="app-page__title">{t.app.nav.documents}</h1>
      <p className="app-page__note">{t.sample.notice}</p>
      <ul className="sample-docs">
        {sampleDocuments.map((doc) => (
          <li key={doc.title}>
            <p className="sample-docs__title">{doc.title}</p>
            <p className="sample-docs__meta">
              {doc.kind} · {doc.date}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { sampleAccount, sampleAllocations, sampleDocuments } from "../sample/portal.ts";
import { useI18n } from "../i18n/context.tsx";

export function OverviewPage() {
  const { t } = useI18n();

  return (
    <section className="app-page">
      <h1 className="app-page__title">{t.app.nav.overview}</h1>
      <p className="app-page__note">{t.sample.notice}</p>

      <p className="sample-figure">
        {sampleAccount.currency} {sampleAccount.value}
      </p>
      <p className="sample-figure__meta">
        {sampleAccount.mandate}
        <span className="sample-figure__up"> · {sampleAccount.ytd} {t.sample.ytd}</span>
      </p>

      <h2 className="app-page__section">{t.sample.allocation}</h2>
      <ul className="sample-alloc">
        {sampleAllocations.map((row) => (
          <li key={row.name} className="sample-alloc__item">
            <div className="sample-alloc__label">
              <span>{row.name}</span>
              <span>{row.share}%</span>
            </div>
            <div className="sample-alloc__track" aria-hidden="true">
              <span className="sample-alloc__fill" style={{ width: `${row.share}%` }} />
            </div>
          </li>
        ))}
      </ul>

      <h2 className="app-page__section">{t.sample.recentDocuments}</h2>
      <ul className="sample-list">
        {sampleDocuments.slice(0, 3).map((doc) => (
          <li key={doc.title}>
            <span>{doc.title}</span>
            <span>{doc.date}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

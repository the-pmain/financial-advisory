import { useI18n } from "../i18n/context.tsx";
import { initials } from "../lib/format.ts";
import { sampleMessages } from "../sample/portal.ts";

export function MessagesPage() {
  const { t } = useI18n();

  return (
    <section className="app-page">
      <h1 className="app-page__title">{t.app.nav.messages}</h1>
      <p className="app-page__note">{t.sample.notice}</p>
      <ol className="viz-timeline">
        {sampleMessages.map((item) => (
          <li key={item.subject} className={item.latest ? "is-latest" : undefined}>
            <span className={`viz-dot${item.latest ? " is-latest" : ""}`} aria-hidden="true" />
            <span className={`viz-initials${item.from === "Portal" ? " is-house" : ""}`} aria-hidden="true">
              {initials(item.from)}
            </span>
            <div className="viz-msg">
              <p className="sample-messages__subject">
                {item.subject}
                {item.latest ? <span className="viz-tag">{t.sample.latest}</span> : null}
              </p>
              <p className="sample-messages__meta">
                {item.from} · {item.date}
              </p>
              <p className="sample-messages__body">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

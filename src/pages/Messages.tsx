import { sampleMessages } from "../sample/portal.ts";
import { useI18n } from "../i18n/context.tsx";

export function MessagesPage() {
  const { t } = useI18n();

  return (
    <section className="app-page">
      <h1 className="app-page__title">{t.app.nav.messages}</h1>
      <p className="app-page__note">{t.sample.notice}</p>
      <ul className="sample-messages">
        {sampleMessages.map((item) => (
          <li key={item.subject}>
            <p className="sample-messages__subject">{item.subject}</p>
            <p className="sample-messages__meta">
              {item.from} · {item.date}
            </p>
            <p className="sample-messages__body">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

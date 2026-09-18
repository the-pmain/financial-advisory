import { sampleAccount, sampleHoldings } from "../sample/portal.ts";
import { useI18n } from "../i18n/context.tsx";

export function HoldingsPage() {
  const { t } = useI18n();

  return (
    <section className="app-page">
      <h1 className="app-page__title">{t.app.nav.holdings}</h1>
      <p className="app-page__note">{t.sample.notice}</p>
      <p className="sample-lede">
        {sampleAccount.currency} {sampleAccount.value} · {sampleHoldings.length} {t.sample.positions}
      </p>
      <div className="sample-table-wrap">
        <table className="sample-table">
          <thead>
            <tr>
              <th>{t.sample.holding}</th>
              <th>{t.sample.asset}</th>
              <th>{t.sample.marketValue}</th>
              <th>{t.sample.weight}</th>
            </tr>
          </thead>
          <tbody>
            {sampleHoldings.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.asset}</td>
                <td>
                  {sampleAccount.currency} {row.value}
                </td>
                <td>{row.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

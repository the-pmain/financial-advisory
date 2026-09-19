import { MixBar } from "../components/viz/MixBar.tsx";
import { useI18n } from "../i18n/context.tsx";
import { formatWeight } from "../lib/format.ts";
import { sampleAccount, sampleAllocations, sampleHoldings } from "../sample/portal.ts";

export function HoldingsPage() {
  const { t } = useI18n();

  return (
    <section className="app-page">
      <h1 className="app-page__title">{t.app.nav.holdings}</h1>
      <p className="app-page__note">{t.sample.notice}</p>
      <p className="sample-lede">
        {sampleAccount.currency} {sampleAccount.value} · {sampleHoldings.length} {t.sample.positions}
      </p>

      <div className="viz-panel viz-panel--solo">
        <p className="viz-caption">{t.sample.composition}</p>
        <MixBar slices={sampleAllocations} label={t.sample.allocationRing} />
        <ul className="viz-legend viz-legend--row">
          {sampleAllocations.map((row) => (
            <li key={row.name}>
              <span className={`viz-swatch viz-tone-${row.tone}`} />
              <span>{row.name}</span>
              <span>{row.share}%</span>
            </li>
          ))}
        </ul>
      </div>

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
                <td>
                  <span className="viz-asset">
                    <span className={`viz-swatch viz-tone-${row.tone}`} />
                    {row.asset}
                  </span>
                </td>
                <td>
                  {sampleAccount.currency} {row.value}
                </td>
                <td>
                  <div className="viz-weight">
                    <span>{formatWeight(row.weight)}</span>
                    <span className="viz-weight__track" aria-hidden="true">
                      <span
                        className={`viz-weight__fill viz-tone-${row.tone}`}
                        style={{ width: `${row.weight}%` }}
                      />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

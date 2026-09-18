import { AreaChart } from "../components/viz/AreaChart.tsx";
import { AllocRing } from "../components/viz/AllocRing.tsx";
import { DocRow } from "../components/viz/DocRow.tsx";
import { sampleAccount, sampleAllocations, sampleDocuments, sampleHoldings, sampleNav } from "../sample/portal.ts";
import { useI18n } from "../i18n/context.tsx";

export function OverviewPage() {
  const { t } = useI18n();

  return (
    <section className="app-page">
      <h1 className="app-page__title">{t.app.nav.overview}</h1>
      <p className="app-page__note">{t.sample.notice}</p>

      <div className="viz-board">
        <div className="viz-panel viz-panel--hero">
          <p className="sample-figure">
            {sampleAccount.currency} {sampleAccount.value}
          </p>
          <p className="sample-figure__meta">
            {sampleAccount.mandate}
            <span className="sample-figure__up">
              {" "}
              · {sampleAccount.ytd} {t.sample.ytd}
            </span>
          </p>
          <p className="viz-caption">{t.sample.performance}</p>
          <AreaChart
            series={sampleNav}
            label={t.sample.valueSeries}
            currency={sampleAccount.currency}
          />
        </div>
        <div className="viz-panel viz-panel--mix">
          <p className="viz-caption">{t.sample.allocation}</p>
          <div className="viz-ring-block">
            <AllocRing slices={sampleAllocations} label={t.sample.allocationRing} />
            <ul className="viz-legend">
              {sampleAllocations.map((row) => (
                <li key={row.name}>
                  <span className={`viz-swatch viz-tone-${row.tone}`} />
                  <span>{row.name}</span>
                  <span>{row.share}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ul className="viz-kpis">
        <li>
          <span className="viz-kpis__label">{t.sample.ytd}</span>
          <span className="viz-kpis__value sample-figure__up">{sampleAccount.ytd}</span>
        </li>
        <li>
          <span className="viz-kpis__label">{t.sample.cash}</span>
          <span className="viz-kpis__value">
            {sampleAccount.currency} {sampleAccount.cash}
          </span>
        </li>
        <li>
          <span className="viz-kpis__label">{t.sample.positionsLabel}</span>
          <span className="viz-kpis__value">{sampleHoldings.length}</span>
        </li>
        <li>
          <span className="viz-kpis__label">{t.sample.sleeves}</span>
          <span className="viz-kpis__value">{sampleAccount.sleeves}</span>
        </li>
      </ul>

      <h2 className="app-page__section">{t.sample.allocation}</h2>
      <ul className="sample-alloc">
        {sampleAllocations.map((row) => (
          <li key={row.name} className="sample-alloc__item">
            <div className="sample-alloc__label">
              <span>
                <span className={`viz-swatch viz-tone-${row.tone}`} />
                {row.name}
              </span>
              <span>{row.share}%</span>
            </div>
            <div className="sample-alloc__track" aria-hidden="true">
              <span className={`sample-alloc__fill viz-tone-${row.tone}`} style={{ width: `${row.share}%` }} />
            </div>
          </li>
        ))}
      </ul>

      <h2 className="app-page__section">{t.sample.recentDocuments}</h2>
      <ul className="viz-docs">
        {sampleDocuments.slice(0, 3).map((doc) => (
          <DocRow key={doc.title} title={doc.title} date={doc.date} kind={doc.kind} />
        ))}
      </ul>
    </section>
  );
}

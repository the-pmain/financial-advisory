import { Link } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { marketArticles } from '../../data/content';
import { useMarketQuotes } from '../../hooks/useMarketQuotes';
import { SectionTitle, UnderlineLink } from '../ui/primitives';
import { ArticleCompact } from './ArticleTeaser';

/**
 * "Markets & analysis": a pale blue panel with two equal columns — article
 * teasers and live market data — fenced by a 4px white rule.
 */
export function MarketsSection() {
  return (
    <section>
      <SectionTitle>Markets &amp; analysis</SectionTitle>

      {/* On phones the panel bleeds into the page gutters, the tracks stack and
          the quote table drops out entirely, as it does on the reference. */}
      <div className="bg-vz-blue-panel bm-grid px-[18px] py-[24px] max-mob:-mx-[12.5px] max-mob:px-[15px]">
        <div className="pr-9 max-mob:pr-0">
          {marketArticles.map((article, i) => (
            <ArticleCompact key={article.slug} article={article} first={i === 0} />
          ))}
        </div>

        <div className="border-l-4 border-white pl-9 max-mob:hidden">
          <MarketData />
        </div>
      </div>

      <p className="mt-[18px] mb-0 leading-[30px] max-mob:mt-[20px] max-mob:ml-[2.5px]">
        <UnderlineLink to={ROUTES.stockExchangesAndMarkets} bold>
          More market news and analysis
        </UnderlineLink>
      </p>
    </section>
  );
}

/**
 * Live index and FX levels via `/api/markets` (Yahoo Finance, with ECB
 * reference rates as the FX fallback), fetched once when this section mounts.
 */
function MarketData() {
  const quotes = useMarketQuotes();

  return (
    <>
      <h2 className="m-0 mb-[8px] text-[17px] leading-[17px] font-bold">
        <Link
          to={ROUTES.stockExchangesAndMarkets}
          className="vz-underline hover:text-vz-orange inline-block pb-[2px]"
        >
          Market data
        </Link>
      </h2>

      <table className="w-full border-collapse text-[14px] leading-[19px]">
        <caption className="visually-hidden">
          Indicative index and currency levels with the change since the previous close
        </caption>
        <thead className="visually-hidden">
          <tr>
            <th scope="col">Instrument</th>
            <th scope="col">Level</th>
            <th scope="col">Change</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => {
            const changeClass =
              quote.direction === 'up' ? 'text-vz-up' : 'text-vz-down';

            return (
              <tr
                key={quote.id}
                className={`h-[40px] border-b border-white ${
                  quote.sourceUrl
                    ? 'group relative cursor-pointer transition-colors duration-250 hover:bg-white'
                    : ''
                }`}
              >
                <th scope="row" className="text-vz-ink pr-2 text-left font-normal">
                  {quote.sourceUrl ? (
                    <a
                      href={quote.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-vz-ink after:absolute after:inset-0 after:z-10 group-hover:text-vz-orange"
                      aria-label={`${quote.symbol} on Yahoo Finance`}
                    >
                      {quote.symbol}
                    </a>
                  ) : (
                    quote.symbol
                  )}
                </th>
                <td className="text-vz-ink px-2 text-right tabular-nums whitespace-nowrap">
                  {quote.value}
                </td>
                <td className={`pl-2 text-right tabular-nums whitespace-nowrap ${changeClass}`}>
                  {quote.change}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

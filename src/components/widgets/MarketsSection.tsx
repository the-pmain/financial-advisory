import { Link } from 'react-router';
import { knowledgeHubArticlePath, ROUTES } from '../../constants/routes';
import { marketArticles, marketVideo, quotes } from '../../data/content';
import { VideoIcon } from '../ui/Icons';
import { SectionTitle, Tagline, UnderlineLink } from '../ui/primitives';
import { ArticleCompact } from './ArticleTeaser';

/**
 * "Stock exchange and Markets": a pale blue panel with 24/18 padding holding
 * three columns whose *content* boxes are equal width. The middle column is
 * fenced by 4px white borders and carries 36px of padding on both sides, so
 * the track widths are sized with `.bm-grid` in index.css to compensate.
 */
export function MarketsSection() {
  return (
    <section>
      <SectionTitle>Stock exchange and Markets</SectionTitle>

      {/* On phones the panel bleeds into the page gutters, the tracks stack and
          the quote table drops out entirely, as it does on the reference. */}
      <div className="bg-vz-blue-panel bm-grid px-[18px] py-[24px] max-mob:-mx-[12.5px] max-mob:px-[15px]">
        <div className="pr-9 max-mob:pr-0">
          {marketArticles.map((article, i) => (
            <ArticleCompact key={article.slug} article={article} first={i === 0} />
          ))}
        </div>

        <div className="border-x-4 border-white px-9 max-mob:hidden">
          <MarketData />
        </div>

        <div className="pl-9 max-mob:pl-0">
          <VideoTeaser />
        </div>
      </div>

      <p className="mt-[18px] mb-0 leading-[30px] max-mob:mt-[20px] max-mob:ml-[2.5px]">
        <UnderlineLink to={ROUTES.stockExchangesAndMarkets} bold>
          More stock market news
        </UnderlineLink>
      </p>
    </section>
  );
}

/**
 * The reference loads live quotes from a third-party widget; this is a static
 * snapshot of those values with the same layout and up/down colouring.
 */
function MarketData() {
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
          {quotes.map((quote) => (
            <tr key={quote.id} className="h-[40px] border-b border-white">
              <th scope="row" className="text-vz-ink pr-2 text-left font-normal">
                {quote.symbol}
              </th>
              <td className="text-vz-ink px-2 text-right tabular-nums whitespace-nowrap">
                {quote.value}
              </td>
              <td
                className={`pl-2 text-right tabular-nums whitespace-nowrap ${
                  quote.direction === 'up' ? 'text-vz-up' : 'text-vz-down'
                }`}
              >
                {quote.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/**
 * Featured video widget (`article-with-icon-featured` / `widget-icon-featured`).
 * The heading link stretches over the whole card; the poster sits above the
 * copy via source order. Hover turns every text node brand-blue, matching
 * the reference `:has(a:hover)` rule.
 */
function VideoTeaser() {
  const href = knowledgeHubArticlePath(marketVideo.slug);
  const describedBy = 'description-market-video';

  return (
    <article className="group relative">
      <div className="mb-[13px]">
        <img
          src={marketVideo.image}
          alt=""
          width={692}
          height={389}
          className="aspect-[692/389] w-full object-cover"
        />
      </div>

      <div className="group-active:opacity-75">
        <h3 className="m-0 mb-[12px] text-[20px] leading-[25.45px] font-bold">
          <Link
            to={href}
            aria-describedby={describedBy}
            className="text-vz-ink after:absolute after:inset-0 after:z-1 block no-underline transition-colors duration-250 group-hover:text-vz-blue"
          >
            <Tagline gap={4} className="transition-colors duration-250 group-hover:text-vz-blue">
              {marketVideo.tagline}
            </Tagline>
            <span className="block">
              <VideoIcon className="relative top-[-2px] mr-[5px] inline-block size-6 align-middle transition-colors duration-250" />
              {marketVideo.title}
            </span>
          </Link>
        </h3>
        <p
          id={describedBy}
          className="text-vz-gray m-0 text-[14px] leading-[22px] transition-colors duration-250 group-hover:text-vz-blue"
        >
          {marketVideo.videoNote}
        </p>
      </div>
    </article>
  );
}

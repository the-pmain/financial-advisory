import { quotes as fallbackQuotes, type Quote } from '../src/data/content.ts';
import { fallbackQuote, MARKET_INSTRUMENTS, type MarketInstrument } from '../src/data/markets.ts';
import { toMarketQuote } from '../src/lib/formatMarketQuote.ts';

const YAHOO_CHART = 'https://query1.finance.yahoo.com/v8/finance/chart';
const FRANKFURTER = 'https://api.frankfurter.app';
const CACHE_TTL_MS = 60_000;

type YahooChartResponse = {
  chart?: {
    result?: Array<{
      meta?: {
        regularMarketPrice?: number;
        chartPreviousClose?: number;
        previousClose?: number;
      };
    }>;
  };
};

type FrankfurterRangeResponse = {
  rates?: Record<string, { CHF?: number; USD?: number }>;
};

type Levels = { price: number; previousClose: number };

type CacheEntry = { at: number; quotes: Quote[] };

let cache: CacheEntry | null = null;
let inflight: Promise<Quote[]> | null = null;

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

async function fetchYahooLevels(yahooSymbol: string): Promise<Levels | null> {
  const url = new URL(`${YAHOO_CHART}/${encodeURIComponent(yahooSymbol)}`);
  url.searchParams.set('interval', '1d');
  url.searchParams.set('range', '5d');

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'Mozilla/5.0',
    },
    signal: AbortSignal.timeout(8_000),
  });
  if (!res.ok) return null;

  const data = (await res.json()) as YahooChartResponse;
  const meta = data.chart?.result?.[0]?.meta;
  const price = meta?.regularMarketPrice;
  const previousClose = meta?.chartPreviousClose ?? meta?.previousClose;
  if (!isFiniteNumber(price) || !isFiniteNumber(previousClose) || previousClose === 0) {
    return null;
  }
  return { price, previousClose };
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * ECB euro reference rates via Frankfurter (no API key). Covers the two FX
 * rows when Yahoo is down. Indices have no equivalent official free feed.
 */
async function fetchEcbFx(): Promise<Partial<Record<'eurchf' | 'usdchf', Levels>> | null> {
  const end = new Date();
  const start = new Date();
  start.setUTCDate(start.getUTCDate() - 14);

  const url = `${FRANKFURTER}/${isoDate(start)}..${isoDate(end)}?from=EUR&to=CHF,USD`;
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(8_000),
  });
  if (!res.ok) return null;

  const data = (await res.json()) as FrankfurterRangeResponse;
  const days = Object.entries(data.rates ?? {})
    .filter(([, rates]) => isFiniteNumber(rates.CHF) && isFiniteNumber(rates.USD) && rates.USD !== 0)
    .sort(([a], [b]) => a.localeCompare(b));

  if (days.length < 2) return null;

  const latest = days[days.length - 1]?.[1];
  const previous = days[days.length - 2]?.[1];
  if (!latest?.CHF || !latest.USD || !previous?.CHF || !previous.USD) return null;

  return {
    eurchf: { price: latest.CHF, previousClose: previous.CHF },
    usdchf: {
      price: latest.CHF / latest.USD,
      previousClose: previous.CHF / previous.USD,
    },
  };
}

function levelsFor(
  instrument: MarketInstrument,
  yahoo: PromiseSettledResult<Levels | null> | undefined,
  ecb: Partial<Record<'eurchf' | 'usdchf', Levels>> | null,
): Levels | null {
  if (yahoo?.status === 'fulfilled' && yahoo.value) return yahoo.value;
  if (instrument.id === 'eurchf' || instrument.id === 'usdchf') {
    return ecb?.[instrument.id] ?? null;
  }
  return null;
}

async function loadLiveQuotes(): Promise<Quote[]> {
  const [yahooSettled, ecb] = await Promise.all([
    Promise.allSettled(MARKET_INSTRUMENTS.map((instrument) => fetchYahooLevels(instrument.yahoo))),
    fetchEcbFx().catch(() => null),
  ]);

  return MARKET_INSTRUMENTS.map((instrument, index) => {
    const live = levelsFor(instrument, yahooSettled[index], ecb);
    if (!live) return fallbackQuote(instrument.id, fallbackQuotes);
    return toMarketQuote(instrument, live.price, live.previousClose);
  });
}

/** Live quotes: Yahoo Finance for the table, ECB/Frankfurter as FX fallback. */
export async function getMarketQuotes(): Promise<Quote[]> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
    return cache.quotes;
  }
  if (inflight) return inflight;

  inflight = loadLiveQuotes()
    .then((quotes) => {
      cache = { at: Date.now(), quotes };
      return quotes;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

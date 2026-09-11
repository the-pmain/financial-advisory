import type { Quote } from './content';

/**
 * Homepage market table. Yahoo Finance chart symbols (public, no API key)
 * cover indices and FX; ECB reference rates via Frankfurter backfill FX
 * if Yahoo is unavailable. No official free feed publishes SMI/DAX/SPX.
 */
export const MARKET_INSTRUMENTS = [
  { id: 'smi', symbol: 'SMI', yahoo: '^SSMI', decimals: 3 },
  { id: 'dax', symbol: 'DAX', yahoo: '^GDAXI', decimals: 3 },
  { id: 'eurozone-50', symbol: 'Eurozone 50', yahoo: '^STOXX50E', decimals: 3 },
  { id: 'spx', symbol: 'SPX (S&P500)', yahoo: '^GSPC', decimals: 3 },
  { id: 'eurchf', symbol: 'EUR/CHF', yahoo: 'EURCHF=X', decimals: 5 },
  { id: 'usdchf', symbol: 'USD/CHF', yahoo: 'USDCHF=X', decimals: 5 },
] as const;

export type MarketInstrument = (typeof MARKET_INSTRUMENTS)[number];
export type MarketInstrumentId = MarketInstrument['id'];

export function yahooFinanceQuoteUrl(yahooSymbol: string): string {
  return `https://finance.yahoo.com/quote/${encodeURIComponent(yahooSymbol)}`;
}

export function marketSourceUrl(id: string): string | undefined {
  const instrument = MARKET_INSTRUMENTS.find((row) => row.id === id);
  return instrument ? yahooFinanceQuoteUrl(instrument.yahoo) : undefined;
}

export function attachMarketSource(quote: Quote): Quote {
  const sourceUrl = marketSourceUrl(quote.id);
  return sourceUrl ? { ...quote, sourceUrl } : quote;
}

export function fallbackQuote(id: MarketInstrumentId, quotes: readonly Quote[]): Quote {
  const found = quotes.find((quote) => quote.id === id);
  if (!found) {
    throw new Error(`Missing fallback quote for ${id}`);
  }
  return attachMarketSource(found);
}

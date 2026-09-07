import type { Quote } from '../data/content';
import type { MarketInstrument } from '../data/markets';

/** Swiss grouping with an ASCII apostrophe, matching the reference table. */
export function formatMarketLevel(value: number, decimals: number): string {
  const sign = value < 0 ? '-' : '';
  const [whole, fraction = ''] = Math.abs(value).toFixed(decimals).split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  return decimals > 0 ? `${sign}${grouped}.${fraction}` : `${sign}${grouped}`;
}

export function formatMarketChange(percent: number): string {
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)} %`;
}

export function toMarketQuote(
  instrument: MarketInstrument,
  price: number,
  previousClose: number,
): Quote {
  const changePercent = ((price - previousClose) / previousClose) * 100;
  return {
    id: instrument.id,
    symbol: instrument.symbol,
    value: formatMarketLevel(price, instrument.decimals),
    change: formatMarketChange(changePercent),
    direction: changePercent >= 0 ? 'up' : 'down',
  };
}

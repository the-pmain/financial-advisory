import { useEffect, useState } from 'react';
import { API } from '../constants/api';
import { quotes as fallbackQuotes, type Quote } from '../data/content';

type MarketsResponse = {
  ok?: boolean;
  quotes?: Quote[];
};

/**
 * Loads the homepage market table once when the section mounts.
 * The static snapshot is shown first (and kept if the request fails).
 */
export function useMarketQuotes(): Quote[] {
  const [quotes, setQuotes] = useState<Quote[]>(fallbackQuotes);

  useEffect(() => {
    const controller = new AbortController();

    fetch(API.markets, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('markets request failed'))))
      .then((data: MarketsResponse) => {
        if (data.ok && Array.isArray(data.quotes) && data.quotes.length > 0) {
          setQuotes(data.quotes);
        }
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      });

    return () => controller.abort();
  }, []);

  return quotes;
}

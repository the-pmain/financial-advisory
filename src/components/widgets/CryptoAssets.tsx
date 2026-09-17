import type { ReactNode } from 'react';
import { SectionTitle } from '../ui/primitives';

type CryptoAsset = {
  id: string;
  name: string;
  ticker: string;
  use: string;
  Logo: () => ReactNode;
};

function BitcoinLogo() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill="#F7931A" />
      <path
        fill="#fff"
        d="M44.3 27.6c.6-3.9-2.4-6-6.4-7.4l1.3-5.3-3.2-.8-1.3 5.1c-.8-.2-1.7-.4-2.6-.6l1.3-5.1-3.2-.8-1.3 5.3c-.7-.2-1.4-.3-2-.5l.1-.1-4.4-1.1-.8 3.4s2.4.5 2.3.6c1.3.3 1.5 1.2 1.5 1.8l-1.5 6.1c.1 0 .2.1.3.1h-.3l-2.1 8.5c-.2.4-.6 1.1-1.5.8.1.1-2.3-.6-2.3-.6l-1.6 3.7 4.2 1c.8.2 1.5.4 2.3.6l-1.3 5.4 3.2.8 1.3-5.3c.9.2 1.7.4 2.6.6l-1.3 5.2 3.2.8 1.3-5.4c5.4 1 9.5.6 11.2-4.3 1.4-3.9-.1-6.2-2.9-7.6 2.1-.5 3.6-1.8 4-4.6Zm-7.2 10.1c-1 3.9-7.6 1.8-9.7 1.3l1.7-7c2.1.5 8.9 1.6 8 5.7Zm1-10.1c-.9 3.6-6.4 1.8-8.2 1.3l1.6-6.3c1.8.4 7.6 1.3 6.6 5Z"
      />
    </svg>
  );
}

function EthereumLogo() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill="#627EEA" />
      <path fill="#fff" fillOpacity=".85" d="M32.1 12.5v14.4l12.2 5.5L32.1 12.5Z" />
      <path fill="#fff" d="M32.1 12.5 19.9 32.4l12.2-5.5V12.5Z" />
      <path fill="#fff" fillOpacity=".85" d="M32.1 43.3v8.2L44.4 35.3 32.1 43.3Z" />
      <path fill="#fff" d="M32.1 51.5v-8.2L19.9 35.3 32.1 51.5Z" />
      <path fill="#fff" fillOpacity=".6" d="M32.1 40.1 44.3 32.4 32.1 26.9v13.2Z" />
      <path fill="#fff" fillOpacity=".8" d="M19.9 32.4 32.1 40.1V26.9L19.9 32.4Z" />
    </svg>
  );
}

function TetherLogo() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill="#26A17B" />
      <path
        fill="#fff"
        d="M36.6 29.2v3.2c4.6.2 8 .9 8 1.8 0 .9-3.4 1.6-8 1.8v7.2h-5.2v-7.2c-4.6-.2-8-.9-8-1.8 0-.9 3.4-1.6 8-1.8v-3.2H19.8v-5.1H44.2v5.1H36.6Z"
      />
    </svg>
  );
}

function UsdcLogo() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill="#2775CA" />
      <path
        fill="#fff"
        d="M32 16c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16Zm0 4.2c-6.5 0-11.8 5.3-11.8 11.8S25.5 43.8 32 43.8 43.8 38.5 43.8 32 38.5 20.2 32 20.2Zm.2 6.3c2.6 0 4.4 1.1 5.2 2.7l-3.1 1.6c-.4-.8-1.2-1.3-2.2-1.3-1.5 0-2.6 1.1-2.6 2.8 0 1.7 1.1 2.8 2.6 2.8 1 0 1.8-.5 2.2-1.3l3.1 1.6c-.8 1.6-2.6 2.7-5.2 2.7-3.6 0-6.2-2.6-6.2-5.8s2.6-5.8 6.2-5.8Z"
      />
    </svg>
  );
}

function BnbLogo() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill="#F3BA2F" />
      <path
        fill="#fff"
        d="m32 16 4.4 4.4-9.3 9.3-4.4-4.4L32 16Zm13.6 9.3-4.4-4.4L32 30.1l4.4 4.4 9.2-9.2ZM18.4 25.3 32 38.9l-4.4 4.4-13.6-13.6 4.4-4.4Zm22.8 13.6L32 47.9l-4.4-4.4 9.2-9.2 4.4 4.4Z"
      />
    </svg>
  );
}

function SolanaLogo() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill="#000" />
      <path
        fill="url(#sol-a)"
        d="M20.2 38.8c.3-.3.7-.5 1.1-.5h23.1c.7 0 1 .8.6 1.3l-4.2 4.6c-.3.3-.7.5-1.1.5H16.6c-.7 0-1-.8-.6-1.3l4.2-4.6Z"
      />
      <path
        fill="url(#sol-b)"
        d="M20.2 19.3c.3-.3.7-.5 1.1-.5h23.1c.7 0 1 .8.6 1.3l-4.2 4.6c-.3.3-.7.5-1.1.5H16.6c-.7 0-1-.8-.6-1.3l4.2-4.6Z"
      />
      <path
        fill="url(#sol-c)"
        d="M43.8 29c-.3-.3-.7-.5-1.1-.5H19.6c-.7 0-1 .8-.6 1.3l4.2 4.6c.3.3.7.5 1.1.5h23.1c.7 0 1-.8.6-1.3L43.8 29Z"
      />
      <defs>
        <linearGradient id="sol-a" x1="16" y1="48" x2="48" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <linearGradient id="sol-b" x1="16" y1="48" x2="48" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <linearGradient id="sol-c" x1="16" y1="48" x2="48" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function XrpLogo() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill="#23292F" />
      <path
        fill="#fff"
        d="M22.2 20.5h5.6L32 26.8l4.2-6.3h5.6L33.8 31.2 42 42.5h-5.6L32 35.8l-4.4 6.7H22L30.2 31.2 22.2 20.5Z"
      />
    </svg>
  );
}

const assets: CryptoAsset[] = [
  { id: 'btc', name: 'Bitcoin', ticker: 'BTC', use: 'Most held', Logo: BitcoinLogo },
  { id: 'eth', name: 'Ethereum', ticker: 'ETH', use: 'Most used network', Logo: EthereumLogo },
  { id: 'usdt', name: 'Tether', ticker: 'USDT', use: 'Most used stablecoin', Logo: TetherLogo },
  { id: 'usdc', name: 'USD Coin', ticker: 'USDC', use: 'Dollar token', Logo: UsdcLogo },
  { id: 'bnb', name: 'BNB', ticker: 'BNB', use: 'Exchange token', Logo: BnbLogo },
  { id: 'sol', name: 'Solana', ticker: 'SOL', use: 'High-throughput chain', Logo: SolanaLogo },
  { id: 'xrp', name: 'XRP', ticker: 'XRP', use: 'Payments', Logo: XrpLogo },
];

export function CryptoAssets({ className = '' }: { className?: string }) {
  return (
    <section className={className}>
      <SectionTitle>Widely used digital assets</SectionTitle>
      <p className="text-vz-ink m-0 max-w-[802px] text-[17px] leading-[1.5]">
        These are the crypto assets clients most often recognise and ask about. The marks identify
        the asset — they are not a buy list, and none of them is held by Helfenstein Group.
      </p>
      <ul className="mt-6 mb-0 grid list-none grid-cols-4 gap-4 p-0 max-lap:grid-cols-3 max-tab:grid-cols-2 max-mob:grid-cols-1">
        {assets.map(({ id, name, ticker, use, Logo }) => (
          <li key={id} className="border-vz-rule bg-white p-5">
            <div className="flex items-center gap-4">
              <Logo />
              <div className="min-w-0">
                <p className="text-vz-ink m-0 text-[16px] leading-[1.25] font-bold">{name}</p>
                <p className="text-vz-gray-mid m-0 mt-1 text-[13px] leading-[1.3] tracking-[0.04em] uppercase">
                  {ticker}
                </p>
              </div>
            </div>
            <p className="text-vz-ink m-0 mt-4 text-[14px] leading-[1.4]">{use}</p>
          </li>
        ))}
      </ul>
      <p className="text-vz-gray-mid mt-5 mb-0 max-w-[802px] text-[14px] leading-[1.45]">
        Prices move sharply. Tokens can go to zero. Custody, keys and the venue matter as much as
        the ticker. Any allocation we discuss is sized for a loss you can afford, after the listed
        core of the portfolio is in place.
      </p>
    </section>
  );
}

import { useState } from 'react';

const FINMA_URL =
  'https://www.finma.ch/en/finma-public/authorised-institutions-individuals-and-products/';

/** FINMA register link with official logo — used beside the verification steps. */
export function FinmaLink({ className = '' }: { className?: string }) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <a
      href={FINMA_URL}
      target="_blank"
      rel="noreferrer noopener"
      className={`inline-flex min-h-[44px] min-w-[44px] items-center opacity-100 transition-opacity duration-250 hover:opacity-75 ${className}`}
    >
      {logoFailed ? (
        <span className="text-vz-blue text-[15px] leading-[1.3]">FINMA register</span>
      ) : (
        <img
          src="/images/finma-logo.png"
          alt="FINMA — Authorised institutions, individuals and products"
          width={120}
          height={40}
          className="block h-auto w-[120px] max-mob:w-[108px]"
          loading="lazy"
          decoding="async"
          onError={() => setLogoFailed(true)}
        />
      )}
      <span className="visually-hidden"> (external link, opens in a new window)</span>
    </a>
  );
}

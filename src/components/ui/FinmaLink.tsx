const FINMA_URL =
  'https://www.finma.ch/en/finma-public/authorised-institutions-individuals-and-products/';

/** FINMA register link with official logo — used in footer and mega menu. */
export function FinmaLink({ className = '' }: { className?: string }) {
  return (
    <a
      href={FINMA_URL}
      target="_blank"
      rel="noreferrer noopener"
      className={`inline-flex min-h-[44px] min-w-[44px] items-center opacity-100 transition-opacity duration-250 hover:opacity-75 ${className}`}
    >
      <img
        src="/images/finma-logo.png"
        alt="FINMA — Authorised institutions, individuals and products"
        width={120}
        height={40}
        className="block h-auto w-[120px] max-mob:w-[108px]"
        loading="lazy"
        decoding="async"
      />
      <span className="visually-hidden"> (external link, opens in a new window)</span>
    </a>
  );
}

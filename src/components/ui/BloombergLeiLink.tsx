import { company } from '../../data/company';

/**
 * Official Bloomberg LEI mark — links to this firm's issued record.
 * White-on-black wordmark; keep it on a light surface so the plate reads.
 */
export function BloombergLeiLink({
  className = '',
  size = 'default',
}: {
  className?: string;
  size?: 'default' | 'compact' | 'large';
}) {
  const width = size === 'large' ? 180 : size === 'compact' ? 120 : 148;
  const height = Math.round((width * 73) / 216);

  return (
    <a
      href={company.leiIssuerUrl}
      target="_blank"
      rel="noreferrer noopener"
      className={`inline-flex min-h-[44px] items-center opacity-100 transition-opacity duration-250 hover:opacity-75 ${className}`}
    >
      <img
        src="/images/bloomberg-lei-logo.png"
        alt={`Bloomberg LEI record for ${company.legalName}`}
        width={width}
        height={height}
        className="block h-auto"
        style={{ width }}
        decoding="async"
      />
      <span className="visually-hidden"> (external link, opens in a new window)</span>
    </a>
  );
}

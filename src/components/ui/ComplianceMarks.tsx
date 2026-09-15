import { applicableLawLine, company, dataProtectionLine } from '../../data/company';

/** Compact applicable-law and data-protection lines for the site footer. */
export function ComplianceMarks({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-vz-ink m-0 text-[12px] leading-[1.45] font-bold">{applicableLawLine()}</p>
      <p className="text-vz-ink m-0 mt-1.5 text-[12px] leading-[1.45] font-bold">
        <a
          href={company.dataProtection.authorityUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="text-vz-ink hover:text-vz-orange"
        >
          {dataProtectionLine()}
          <span className="visually-hidden"> (external link, opens in a new window)</span>
        </a>
      </p>
    </div>
  );
}

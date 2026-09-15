import { company } from '../../data/company';
import { SectionTitle } from '../ui/primitives';

export function AuditReports({ className = '' }: { className?: string }) {
  const audit = company.audit;

  return (
    <section className={className}>
      <SectionTitle spaced={false}>Annual audit documentation</SectionTitle>
      <dl className="mt-6 max-w-[802px]">
        <AuditRow term="Audited by" detail={audit.firm} />
        <AuditRow term="Latest audit report" detail={`${audit.latestLabel} | Download PDF`} href={audit.pdfHref} />
        <AuditRow term="Audit partner" detail={audit.partner} />
        <AuditRow term="Next scheduled audit" detail={audit.nextAudit} />
      </dl>
      <p className="text-vz-ink mt-6 mb-0 max-w-[802px] text-[16px] leading-[1.5]">
        Swiss company law requires the statutory auditor — or a valid opting-out resolution — to be
        filed at the commercial register. We publish an information note here and the live
        appointment on Zefix, rather than a third-party opinion that is not ours to host.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={audit.pdfHref}
          download
          className="bg-vz-blue hover:bg-vz-blue-mid inline-flex h-10 items-center rounded-[3px] px-4 text-[14px] font-bold text-white no-underline"
        >
          Download filings information
        </a>
        <a
          href={audit.zefixUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="border-vz-rule text-vz-blue hover:bg-vz-blue-panel inline-flex h-10 items-center rounded-[3px] border bg-white px-4 text-[14px] font-bold no-underline"
        >
          Verify auditor on Zefix
          <span className="visually-hidden"> (external link, opens in a new window)</span>
        </a>
      </div>
    </section>
  );
}

function AuditRow({ term, detail, href }: { term: string; detail: string; href?: string }) {
  return (
    <div className="border-vz-rule grid grid-cols-[minmax(140px,220px)_minmax(0,1fr)] items-baseline gap-4 border-b py-3 max-mob:grid-cols-1 max-mob:gap-1">
      <dt className="text-vz-gray-mid m-0 text-[14px] leading-[1.3]">{term}</dt>
      <dd className="m-0">
        {href ? (
          <a href={href} className="text-vz-blue hover:text-vz-orange vz-underline-hover text-[16px] leading-[1.4]">
            {detail}
          </a>
        ) : (
          <span className="text-vz-ink text-[16px] leading-[1.4]">{detail}</span>
        )}
      </dd>
    </div>
  );
}

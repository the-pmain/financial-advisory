import { company } from '../../data/company';
import { SectionTitle } from '../ui/primitives';

export function RegulatoryHistory({ className = '' }: { className?: string }) {
  const warn = company.finmaWarning;
  const site = company.officialSite;

  return (
    <section className={className}>
      <SectionTitle>Regulatory history</SectionTitle>
      <div className="max-w-[802px]">
        <p className="text-vz-ink m-0 text-[17px] leading-[1.5]">
          We acknowledge the FINMA warning issued {warn.date} for {warn.domain}. While this domain
          shares our company name, it is distinct from our Railway-hosted site at {site.host}. Our
          LEI ({company.lei}) and UID ({company.uid}) are independently verified on FINMA&apos;s
          portfolio manager list, page {warn.listPage}.
        </p>
        <p className="text-vz-ink mt-4 mb-0 text-[16px] leading-[1.5]">
          FINMA&apos;s own remark states that {warn.domain} is not related to {company.legalName},
          Lucerne (UID {company.uid}). Do not send money, documents or login details to that
          website. Prefer the official warning and the authorised-institutions list over search ads.
        </p>
        <p className="mt-4 mb-0">
          <a
            href={warn.url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-vz-blue hover:text-vz-orange vz-underline-hover text-[15px]"
          >
            FINMA warning for {warn.domain} ({warn.date})
            <span className="visually-hidden"> (external link, opens in a new window)</span>
          </a>
          <span className="text-vz-gray-mid"> · </span>
          <a
            href={warn.listPdf}
            target="_blank"
            rel="noreferrer noopener"
            className="text-vz-blue hover:text-vz-orange vz-underline-hover text-[15px]"
          >
            FINMA portfolio-manager list (PDF)
            <span className="visually-hidden"> (external link, opens in a new window)</span>
          </a>
        </p>
      </div>

      <div className="border-vz-rule mt-8 overflow-x-auto border">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <caption className="visually-hidden">
            Differences between the authorised Helfenstein site and the FINMA warning domain
          </caption>
          <thead>
            <tr className="bg-vz-blue-panel">
              <th className="text-vz-ink px-4 py-3 text-[13px] font-bold">Check</th>
              <th className="text-vz-ink px-4 py-3 text-[13px] font-bold">This firm</th>
              <th className="text-vz-ink px-4 py-3 text-[13px] font-bold">Warning listing</th>
            </tr>
          </thead>
          <tbody className="text-[14px] leading-[1.4]">
            <CompareRow term="Website" ours={site.host} theirs={warn.domain} />
            <CompareRow term="Hosting" ours="Railway (this production site)" theirs="Unrelated operators" />
            <CompareRow term="UID" ours={company.uid} theirs="Not this company (FINMA remark)" />
            <CompareRow term="LEI" ours={company.lei} theirs="None published" />
            <CompareRow
              term="FINMA status"
              ours={`Authorised portfolio manager (list p. ${warn.listPage})`}
              theirs={`Warning list, ${warn.dateShort}`}
            />
            <CompareRow term="Supervision" ours={company.regulation.supervisor} theirs="None" />
            <CompareRow
              term="Client assets"
              ours="Segregated at your bank, in your name"
              theirs="Do not send funds"
            />
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CompareRow({ term, ours, theirs }: { term: string; ours: string; theirs: string }) {
  return (
    <tr className="border-vz-rule border-t">
      <th className="text-vz-gray-mid px-4 py-3 align-top font-bold">{term}</th>
      <td className="text-vz-ink px-4 py-3 align-top">{ours}</td>
      <td className="text-vz-ink px-4 py-3 align-top">{theirs}</td>
    </tr>
  );
}

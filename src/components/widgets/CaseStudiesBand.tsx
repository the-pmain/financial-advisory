import { Link } from 'react-router';
import { caseStudies } from '../../data/caseStudies';
import { SectionTitle } from '../ui/primitives';

export function CaseStudiesBand({
  title = 'Client stories',
  limit,
}: {
  title?: string;
  limit?: number;
}) {
  const items = limit ? caseStudies.slice(0, limit) : caseStudies;

  return (
    <section>
      <SectionTitle>{title}</SectionTitle>
      <ul className="m-0 grid list-none grid-cols-3 gap-x-8 gap-y-8 p-0 max-tab:grid-cols-1">
        {items.map((study) => (
          <li key={study.id} className="border-vz-rule border-t pt-4">
            <p className="text-vz-blue m-0 text-[13px] leading-[1.3] font-bold tracking-[0.02em]">
              {study.sector}
            </p>
            <h3 className="vz-break-long text-vz-ink mt-2 mb-0 text-[20px] leading-[1.3] font-bold">
              {study.title}
            </h3>
            <p className="text-vz-ink mt-3 mb-0 text-[15px] leading-[1.45]">{study.summary}</p>
            <p className="text-vz-gray-mid mt-3 mb-0 text-[15px] leading-[1.45]">{study.outcome}</p>
            <p className="mt-4 mb-0">
              <Link
                to={study.to}
                className="text-vz-blue hover:text-vz-orange vz-underline-hover text-[15px]"
              >
                Related service
              </Link>
            </p>
          </li>
        ))}
      </ul>
      <p className="text-vz-gray mt-6 mb-0 text-[13px] leading-[1.4]">
        Illustrative, anonymised examples. Not a guarantee of similar results.
      </p>
    </section>
  );
}

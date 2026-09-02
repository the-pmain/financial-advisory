import { clientDocuments } from '../../data/documents';
import { SectionTitle } from '../ui/primitives';

export function DocumentsList({ title = 'Client documents' }: { title?: string }) {
  return (
    <section>
      <SectionTitle>{title}</SectionTitle>
      <ul className="m-0 list-none p-0">
        {clientDocuments.map((doc) => (
          <li
            key={doc.id}
            className="border-vz-rule flex flex-wrap items-baseline justify-between gap-3 border-b py-4"
          >
            <div className="min-w-0 max-w-[70%]">
              <p className="text-vz-ink m-0 text-[17px] leading-[1.3] font-bold">{doc.title}</p>
              <p className="text-vz-gray-mid m-0 mt-1 text-[14px] leading-[1.4]">{doc.description}</p>
            </div>
            <a
              href={doc.href}
              download
              className="text-vz-blue hover:text-vz-orange vz-underline-hover shrink-0 text-[15px]"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
      <p className="text-vz-gray mt-4 mb-0 text-[13px] leading-[1.4]">
        Placeholder files for demonstration — replace with current PDFs before production use.
      </p>
    </section>
  );
}

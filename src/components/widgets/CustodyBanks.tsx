import { useState } from 'react';
import { company } from '../../data/company';
import { SectionTitle } from '../ui/primitives';

function BankMark({
  name,
  mark,
  city,
  logo,
}: {
  name: string;
  mark: string;
  city: string;
  logo: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="bg-vz-blue flex h-12 w-full max-w-[220px] items-center gap-2 px-4"
        aria-hidden="true"
      >
        <span className="font-serif text-[16px] leading-none font-bold text-white">{mark}</span>
        <span className="text-[11px] leading-none text-white/70">{city}</span>
      </div>
    );
  }

  return (
    <img
      src={logo}
      alt={name}
      width={220}
      height={48}
      className="h-12 w-auto max-w-full"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export function CustodyBanks({ className = '' }: { className?: string }) {
  const banks = company.preferredBanks;

  return (
    <section className={className}>
      <SectionTitle>Your preferred banks</SectionTitle>
      <p className="text-vz-ink m-0 max-w-[802px] text-[17px] leading-[1.5]">
        Clients can hold assets at major European banks — including leading German, Dutch and Nordic
        institutions:
      </p>
      <ul className="mt-6 mb-0 grid list-none grid-cols-4 gap-4 p-0 max-lap:grid-cols-3 max-tab:grid-cols-2 max-mob:grid-cols-1">
        {banks.map((bank) => (
          <li key={bank.id} className="border-vz-rule bg-white p-4">
            <BankMark name={bank.name} mark={bank.mark} city={bank.city} logo={bank.logo} />
            <p className="text-vz-ink m-0 mt-3 text-[16px] leading-[1.3] font-bold">{bank.name}</p>
            <p className="text-vz-gray-mid m-0 mt-1 text-[14px] leading-[1.3]">
              {bank.city} · {bank.region}
            </p>
          </li>
        ))}
      </ul>
      <p className="text-vz-ink mt-6 mb-0 max-w-[802px] text-[16px] leading-[1.5] font-bold">
        Assets stay in the client’s name at the chosen bank, segregated from our operating accounts.
        No commingling of funds.
      </p>
      <p className="text-vz-gray-mid mt-3 mb-0 max-w-[802px] text-[14px] leading-[1.45]">
        The custodian is chosen with you; not every mandate uses every bank. Custody and transaction
        fees are charged by the bank, never by us. {company.legalName} does not hold client assets.
      </p>
    </section>
  );
}

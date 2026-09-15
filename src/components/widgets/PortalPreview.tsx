import { ROUTES } from '../../constants/routes';
import { ButtonOrange, SectionTitle } from '../ui/primitives';

const features = [
  'Real-time holdings and performance across your custody accounts',
  'Document storage for statements, tax packs and letters',
  'Secure messaging with your adviser',
];

const security = [
  { label: '2FA', text: 'Two-factor authentication on every login' },
  { label: 'TLS 1.3', text: 'Encryption in transit for portal sessions' },
  { label: 'CH hosting', text: 'Swiss data hosting for portal records' },
];

export function PortalPreview({ className = '' }: { className?: string }) {
  return (
    <section className={className}>
      <SectionTitle>Client portal preview</SectionTitle>
      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-start gap-10 max-tab:grid-cols-1 max-tab:gap-6">
        <div
          className="border-vz-rule overflow-hidden rounded-[4px] border bg-[#f4f6f8] shadow-[0_8px_24px_rgba(11,31,51,0.08)]"
          aria-hidden="true"
        >
          <div className="bg-vz-blue flex items-center justify-between px-4 py-2.5 text-white">
            <span className="text-[13px] font-bold">Helfenstein Financial Portal</span>
            <span className="text-[11px] tracking-[0.04em] uppercase opacity-80">Sample view</span>
          </div>
          <div className="grid grid-cols-[132px_minmax(0,1fr)] max-mob:grid-cols-1">
            <aside className="bg-vz-blue-panel text-vz-ink space-y-2 px-3 py-4 text-[12px]">
              <p className="m-0 font-bold">Overview</p>
              <p className="text-vz-gray-mid m-0">Holdings</p>
              <p className="text-vz-gray-mid m-0">Documents</p>
              <p className="text-vz-gray-mid m-0">Messages</p>
            </aside>
            <div className="bg-white px-4 py-4">
              <p className="text-vz-gray-mid m-0 text-[11px] tracking-[0.04em] uppercase">
                Illustrative sample — not a live account
              </p>
              <p className="text-vz-ink m-0 mt-2 text-[22px] font-bold tabular-nums">CHF 1’240’500</p>
              <p className="text-vz-gray m-0 mt-1 text-[13px]">Consolidated custody value · +1.4% YTD</p>
              <div className="mt-4 space-y-2">
                <SampleBar label="CHF bonds" width="28%" />
                <SampleBar label="Swiss equities" width="36%" />
                <SampleBar label="Global equities" width="24%" />
                <SampleBar label="Cash at bank" width="12%" />
              </div>
              <div className="border-vz-rule mt-4 border-t pt-3 text-[12px] leading-[1.4]">
                <p className="text-vz-ink m-0 font-bold">Recent documents</p>
                <p className="text-vz-gray m-0 mt-1">Q2 custody statement · Tax pack 2025 · Suitability note</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-vz-ink m-0 text-[17px] leading-[1.5]">
            The portal is a window onto accounts held in your name at your Swiss custodian. It is
            not a place where money is received or sent. Access is issued after we know you — never
            through an unsolicited login link.
          </p>
          <ul className="text-vz-ink mt-5 mb-0 list-disc space-y-2 pl-5 text-[15px] leading-[1.45]">
            {features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <ul className="mt-5 mb-0 flex list-none flex-wrap gap-2 p-0">
            {security.map((item) => (
              <li
                key={item.label}
                className="border-vz-rule bg-vz-blue-panel text-vz-blue rounded-[3px] border px-2.5 py-1.5 text-[12px] font-bold"
                title={item.text}
              >
                {item.label}
              </li>
            ))}
          </ul>
          <p className="text-vz-gray-mid mt-3 mb-0 text-[13px] leading-[1.4]">
            {security.map((item) => item.text).join(' · ')}.
          </p>
          <ButtonOrange to={ROUTES.appointments} className="mt-6">
            Request access
          </ButtonOrange>
        </div>
      </div>
    </section>
  );
}

function SampleBar({ label, width }: { label: string; width: string }) {
  return (
    <div>
      <div className="text-vz-gray mb-1 flex justify-between text-[11px]">
        <span>{label}</span>
        <span>{width}</span>
      </div>
      <div className="bg-vz-blue-panel h-2 overflow-hidden rounded-[2px]">
        <div className="bg-vz-blue h-full" style={{ width }} />
      </div>
    </div>
  );
}

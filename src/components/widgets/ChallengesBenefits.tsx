import { PhoneRichText } from '../ui/PhoneNumberDisplay';
import { SectionTitle } from '../ui/primitives';

export function ChallengesBenefits({
  challenges,
  benefits,
}: {
  challenges?: { title: string; text: string }[];
  benefits?: { title: string; text: string }[];
}) {
  if (!challenges?.length && !benefits?.length) return null;

  return (
    <section className="grid grid-cols-2 gap-x-[68px] gap-y-10 max-tab:grid-cols-1">
      {challenges && challenges.length > 0 && (
        <div>
          <SectionTitle>Regulatory challenges</SectionTitle>
          <ul className="m-0 list-none space-y-5 p-0">
            {challenges.map((item) => (
              <li key={item.title}>
                <h3 className="text-vz-ink m-0 text-[18px] leading-[1.3] font-bold">{item.title}</h3>
                <p className="text-vz-ink mt-2 mb-0 text-[16px] leading-[1.45]">
                  <PhoneRichText text={item.text} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {benefits && benefits.length > 0 && (
        <div>
          <SectionTitle>How we help</SectionTitle>
          <ul className="m-0 list-none space-y-5 p-0">
            {benefits.map((item) => (
              <li key={item.title}>
                <h3 className="text-vz-ink m-0 text-[18px] leading-[1.3] font-bold">{item.title}</h3>
                <p className="text-vz-ink mt-2 mb-0 text-[16px] leading-[1.45]">
                  <PhoneRichText text={item.text} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

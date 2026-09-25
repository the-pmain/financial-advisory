import { Link } from 'react-router';
import { useT } from '../../i18n';
import { newsletterCta } from '../../data/content';
import { EnvelopeIcon } from '../ui/Icons';
import { PhoneRichText } from '../ui/PhoneNumberDisplay';

/**
 * Newsletter prompt: 19px Georgia italic on a 27px rhythm inside the
 * reference's 802px measure. The copy and its link are one continuous run of
 * text, and the envelope glyph is centred vertically in the 52px left inset —
 * which reads as "near the top" on the two-line desktop layout and as the
 * middle of the block once it wraps to five lines on a phone.
 */
export function NewsletterCta() {
  const t = useT();
  const copy = t.home.newsletter;
  return (
    <section className="mx-auto w-full max-w-[802px]">
      {/* Georgia italic, which needs none of the Inter tracking correction. */}
      <div className="relative font-serif text-[19px] leading-[27px] tracking-normal italic max-mob:text-[17px] max-mob:leading-[24px]">
        <EnvelopeIcon className="text-vz-ink absolute top-1/2 left-0 h-[26px] w-[34px] -translate-y-1/2 max-mob:h-5 max-mob:w-6" />
        <p className="text-vz-ink m-0 pl-[52px] text-center">
          <PhoneRichText text={copy.text} />{' '}
          <Link to={newsletterCta.to} className="text-vz-ink hover:text-vz-orange vz-underline">
            {copy.linkLabel}
          </Link>
        </p>
      </div>
    </section>
  );
}

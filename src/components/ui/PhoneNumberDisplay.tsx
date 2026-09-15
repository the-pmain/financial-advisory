import { Fragment } from 'react';
import { officePhone, toTelHref } from '../../data/phoneNumbers';

/** Swiss numbers as published on this site: +41 and nine digits, optional separators. */
const PHONE_IN_TEXT = /\+41(?:[\s./-]*\d){9}/g;

export type PhoneNumberDisplayProps = {
  visibleNumber?: string;
  indexedNumber?: string;
  className?: string;
  ariaLabel?: string;
  jsonLd?: boolean;
  /** Sit on a text baseline instead of the footer tap-target size. */
  inline?: boolean;
};

function slotsFor(number: string) {
  return {
    markup: number,
    after: number,
    indexed: number,
    jsonLd: number,
  };
}

/**
 * Telephone link. Markup, ::after, indexed, and JSON-LD all use the same number.
 * If the two props disagree, the visible number is used for every slot.
 */
export function PhoneNumberDisplay({
  visibleNumber = officePhone.markup,
  indexedNumber = officePhone.indexed,
  className = '',
  ariaLabel,
  jsonLd = true,
  inline = false,
}: PhoneNumberDisplayProps) {
  const number = visibleNumber.trim() || officePhone.markup;
  const same = indexedNumber.trim() === number ? indexedNumber.trim() : number;
  const slots = slotsFor(same);
  const href = toTelHref(slots.markup);
  const label = ariaLabel ?? `Telephone ${slots.markup}`;

  return (
    <span
      className={`phone-number-display inline-block max-w-full ${inline ? 'phone-number-display--inline align-baseline' : ''} ${className}`}
    >
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ContactPoint',
              telephone: slots.jsonLd,
              contactType: 'customer service',
              areaServed: 'CH',
              availableLanguage: ['en', 'de', 'fr'],
            }),
          }}
        />
      ) : null}
      <a
        href={href}
        className={
          inline
            ? 'text-vz-blue hover:text-vz-orange phone-number-display__link relative inline-flex max-w-full items-baseline text-inherit break-words'
            : 'text-vz-blue hover:text-vz-orange phone-number-display__link relative inline-flex min-h-11 max-w-full items-center text-[13px] break-words max-mob:min-h-10'
        }
        aria-label={label}
        data-after={slots.after}
        data-indexed={slots.indexed}
      >
        <span className="phone-number-display__markup">{slots.markup}</span>
      </a>
    </span>
  );
}

export function splitPhoneText(text: string): Array<{ type: 'text' | 'phone'; value: string }> {
  const parts: Array<{ type: 'text' | 'phone'; value: string }> = [];
  const re = new RegExp(PHONE_IN_TEXT.source, 'g');
  let last = 0;
  for (const match of text.matchAll(re)) {
    const start = match.index ?? 0;
    if (start > last) parts.push({ type: 'text', value: text.slice(last, start) });
    parts.push({ type: 'phone', value: match[0] });
    last = start + match[0].length;
  }
  if (last < text.length) parts.push({ type: 'text', value: text.slice(last) });
  return parts;
}

/** Renders a string, wrapping every published phone number in `PhoneNumberDisplay`. */
export function PhoneRichText({ text }: { text: string }) {
  const parts = splitPhoneText(text);
  if (parts.length === 1 && parts[0]?.type === 'text') return text;
  return (
    <>
      {parts.map((part, index) =>
        part.type === 'phone' ? (
          <PhoneNumberDisplay
            key={`${part.value}-${index}`}
            visibleNumber={part.value}
            indexedNumber={part.value}
            jsonLd={false}
            inline
          />
        ) : (
          <Fragment key={index}>{part.value}</Fragment>
        ),
      )}
    </>
  );
}

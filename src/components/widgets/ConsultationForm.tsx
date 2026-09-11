import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { company } from '../../data/company';
import type { TeamMember } from '../../data/team';
import { submitClient } from '../../lib/clientsApi';
import { SectionTitle } from '../ui/primitives';

type Values = {
  name: string;
  email: string;
  phone: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = {
  name: '',
  email: '',
  phone: '',
  consent: false,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE_ALLOWED = /^[+\d][\d\s()./-]*$/;

const FIELD_ORDER: (keyof Values)[] = ['name', 'email', 'phone', 'consent'];

const FIELD_LABELS: Record<keyof Values, string> = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  consent: 'Privacy consent',
};

function fieldId(name: keyof Values): string {
  return `consultation-${name}`;
}

function errorId(name: keyof Values): string {
  return `consultation-${name}-error`;
}

function validate(values: Values): Errors {
  const errors: Errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const phoneDigits = phone.replace(/\D/g, '');

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length < 2) errors.name = 'Please enter at least two characters.';

  if (!email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!phone) errors.phone = 'Please enter a phone number.';
  else if (!PHONE_ALLOWED.test(phone) || phoneDigits.length < 9 || phoneDigits.length > 15) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!values.consent) {
    errors.consent = 'Please confirm that we may use your details to answer this request.';
  }

  return errors;
}

const inputBase =
  'text-vz-ink w-full rounded-[3px] border bg-white px-3 py-[10px] text-[16px] leading-[1.4] transition-colors duration-250 placeholder:text-vz-gray-light/70';

function controlClass(invalid: boolean): string {
  return `${inputBase} ${invalid ? 'border-[#b42318]' : 'border-vz-rule hover:border-vz-blue-soft'}`;
}

export function ConsultationForm({ member }: { member: TeamMember }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const firstName = member.name.split(' ')[0] ?? member.name;

  const visible = (name: keyof Values): string | undefined =>
    submitAttempted || touched[name] ? errors[name] : undefined;

  function setValue<K extends keyof Values>(name: K, value: Values[K]) {
    const next = { ...values, [name]: value };
    setValues(next);
    if (submitAttempted || touched[name]) setErrors(validate(next));
  }

  function markTouched(name: keyof Values) {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(values));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitAttempted(true);
    setSubmitError(null);

    const firstInvalid = FIELD_ORDER.find((name) => nextErrors[name]);
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitClient({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        consent: true,
        instructed_person_slug: member.slug,
      });

      if (!result.ok) {
        setSubmitError(result.error);
        return;
      }

      setSent(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <section id="consultation" className="max-w-[480px]">
        <SectionTitle>Leave your contact details for {firstName}</SectionTitle>
        <p className="text-vz-ink m-0 text-[16px] leading-[1.45]" role="status">
          Thank you. {firstName} will get back to you.
        </p>
      </section>
    );
  }

  return (
    <section id="consultation" className="max-w-[480px]">
      <SectionTitle>Leave your contact details for {firstName}</SectionTitle>
      <p className="text-vz-ink m-0 text-[16px] leading-[1.45]">
        Send your details and {firstName} will get back to you.
      </p>

      <form noValidate onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor={fieldId('name')}
            className="text-vz-ink mb-[6px] block text-[14px] leading-[1.3] font-bold"
          >
            {FIELD_LABELS.name}
          </label>
          <input
            id={fieldId('name')}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            disabled={submitting}
            onChange={(event) => setValue('name', event.target.value)}
            onBlur={() => markTouched('name')}
            aria-invalid={visible('name') ? true : undefined}
            aria-describedby={visible('name') ? errorId('name') : undefined}
            className={controlClass(Boolean(visible('name')))}
          />
          {visible('name') && (
            <p id={errorId('name')} className="m-0 mt-[6px] text-[13px] text-[#b42318]">
              {visible('name')}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={fieldId('email')}
            className="text-vz-ink mb-[6px] block text-[14px] leading-[1.3] font-bold"
          >
            {FIELD_LABELS.email}
          </label>
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            disabled={submitting}
            onChange={(event) => setValue('email', event.target.value)}
            onBlur={() => markTouched('email')}
            aria-invalid={visible('email') ? true : undefined}
            aria-describedby={visible('email') ? errorId('email') : undefined}
            className={controlClass(Boolean(visible('email')))}
          />
          {visible('email') && (
            <p id={errorId('email')} className="m-0 mt-[6px] text-[13px] text-[#b42318]">
              {visible('email')}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={fieldId('phone')}
            className="text-vz-ink mb-[6px] block text-[14px] leading-[1.3] font-bold"
          >
            {FIELD_LABELS.phone}
          </label>
          <input
            id={fieldId('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            disabled={submitting}
            onChange={(event) => setValue('phone', event.target.value)}
            onBlur={() => markTouched('phone')}
            aria-invalid={visible('phone') ? true : undefined}
            aria-describedby={visible('phone') ? errorId('phone') : undefined}
            className={controlClass(Boolean(visible('phone')))}
          />
          {visible('phone') && (
            <p id={errorId('phone')} className="m-0 mt-[6px] text-[13px] text-[#b42318]">
              {visible('phone')}
            </p>
          )}
        </div>

        <label className="text-vz-ink flex cursor-pointer items-start gap-3 text-[14px] leading-[1.45]">
          <input
            id={fieldId('consent')}
            type="checkbox"
            name="consent"
            checked={values.consent}
            disabled={submitting}
            onChange={(event) => setValue('consent', event.target.checked)}
            onBlur={() => markTouched('consent')}
            aria-invalid={visible('consent') ? true : undefined}
            aria-describedby={visible('consent') ? errorId('consent') : undefined}
            className="accent-vz-orange-btn mt-[3px] size-[17px] shrink-0 cursor-pointer"
          />
          <span>
            I agree that {company.groupName} may use my details to answer this request. See the{' '}
            <Link to={ROUTES.privacyPolicy} className="vz-underline-hover text-vz-blue">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {visible('consent') && (
          <p id={errorId('consent')} className="m-0 text-[13px] text-[#b42318]">
            {visible('consent')}
          </p>
        )}

        {submitError && (
          <p className="m-0 text-[13px] text-[#b42318]" role="alert">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="bg-vz-orange-btn mt-2 cursor-pointer rounded-[21px] border-0 px-5 py-3 text-[14px] leading-4 font-bold text-white shadow-[1px_1px_2px_rgba(0,0,0,0.3)] transition-shadow duration-250 hover:shadow-[0.5px_0.5px_4px_rgba(0,0,0,0.15)] active:shadow-none disabled:cursor-wait disabled:opacity-60"
        >
          {submitting ? 'Sending…' : 'Send'}
        </button>
      </form>
    </section>
  );
}

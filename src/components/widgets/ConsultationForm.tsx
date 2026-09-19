import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { company } from '../../data/company';
import { type TeamMember } from '../../data/team';
import { useEmployees } from '../../hooks/useEmployees';
import { submitClient } from '../../lib/clientsApi';
import { useOptionalAppointmentModal } from '../appointments/appointmentModalContext';
import { ChevronDownIcon } from '../ui/Icons';
import { buttonOrangeClass, SectionTitle } from '../ui/primitives';

type Values = {
  adviser: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
};

type FieldName = keyof Values;
type Errors = Partial<Record<FieldName, string>>;

const EMPTY: Values = {
  adviser: '',
  name: '',
  email: '',
  phone: '',
  consent: false,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE_ALLOWED = /^[+\d][\d\s()./-]*$/;

const FIELD_LABELS: Record<FieldName, string> = {
  adviser: 'Adviser',
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  consent: 'Privacy consent',
};

function fieldOrder(pickAdviser: boolean): FieldName[] {
  return pickAdviser ? ['adviser', 'name', 'email', 'phone', 'consent'] : ['name', 'email', 'phone', 'consent'];
}

function validate(values: Values, pickAdviser: boolean, knownSlugs: Set<string>): Errors {
  const errors: Errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const phoneDigits = phone.replace(/\D/g, '');

  if (pickAdviser) {
    if (!values.adviser || !knownSlugs.has(values.adviser)) {
      errors.adviser = 'Please choose who should receive your details.';
    }
  }

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

function firstNameOf(member: TeamMember | undefined, fallback: string): string {
  if (!member) return fallback;
  return member.name.split(' ')[0] ?? member.name;
}

export function ConsultationForm({
  member,
  pickAdviser = false,
  embedded = false,
  idPrefix = 'consultation',
}: {
  member?: TeamMember;
  pickAdviser?: boolean;
  embedded?: boolean;
  idPrefix?: string;
}) {
  const [values, setValues] = useState<Values>({
    ...EMPTY,
    adviser: member && !pickAdviser ? member.slug : '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const { employees, bySlug } = useEmployees();
  const advisers = [...employees].sort((a, b) => a.name.localeCompare(b.name, 'en'));
  const knownSlugs = new Set(employees.map((person) => person.slug));

  const appointment = useOptionalAppointmentModal();
  const selected = pickAdviser ? bySlug.get(values.adviser) : member;
  const firstName = firstNameOf(selected, 'an adviser');

  const fieldId = (name: FieldName) => `${idPrefix}-${name}`;
  const errorId = (name: FieldName) => `${idPrefix}-${name}-error`;

  const visible = (name: FieldName): string | undefined =>
    submitAttempted || touched[name] ? errors[name] : undefined;

  function setValue<K extends FieldName>(name: K, value: Values[K]) {
    const next = { ...values, [name]: value };
    setValues(next);
    if (submitAttempted || touched[name]) setErrors(validate(next, pickAdviser, knownSlugs));
  }

  function markTouched(name: FieldName) {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(values, pickAdviser, knownSlugs));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validate(values, pickAdviser, knownSlugs);
    setErrors(nextErrors);
    setSubmitAttempted(true);
    setSubmitError(null);

    const firstInvalid = fieldOrder(pickAdviser).find((name) => nextErrors[name]);
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    const slug = pickAdviser ? values.adviser : member?.slug;
    if (!slug) {
      setSubmitError('Please choose who should receive your details.');
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitClient({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        consent: true,
        instructed_person_slug: slug,
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

  const heading = pickAdviser
    ? 'Leave your contact details'
    : `Leave your contact details for ${firstName}`;

  const inputBase = embedded
    ? 'appointment-form__control'
    : 'text-vz-ink w-full rounded-[3px] border bg-white px-3 py-[10px] text-[16px] leading-[1.4] transition-colors duration-250 placeholder:text-vz-gray-light/70';

  function controlClass(invalid: boolean): string {
    if (embedded) return `${inputBase}${invalid ? ' is-invalid' : ''}`;
    return `${inputBase} ${invalid ? 'border-[#b42318]' : 'border-vz-rule hover:border-vz-blue-soft'}`;
  }

  const labelClass = embedded
    ? 'appointment-form__label'
    : 'text-vz-ink mb-[6px] block text-[14px] leading-[1.3] font-bold';

  const errorClass = embedded
    ? 'appointment-form__error'
    : 'm-0 mt-[6px] text-[13px] text-[#b42318]';

  function textField(name: Exclude<FieldName, 'adviser' | 'consent'>, type: string, extra?: object) {
    const message = visible(name);
    return (
      <div className={embedded ? 'appointment-form__field' : undefined}>
        <label htmlFor={fieldId(name)} className={labelClass}>
          {FIELD_LABELS[name]}
        </label>
        <input
          id={fieldId(name)}
          name={name}
          type={type}
          value={values[name]}
          disabled={submitting}
          onChange={(event) => setValue(name, event.target.value)}
          onBlur={() => markTouched(name)}
          aria-invalid={message ? true : undefined}
          aria-describedby={message ? errorId(name) : undefined}
          className={controlClass(Boolean(message))}
          {...extra}
        />
        {message ? (
          <p id={errorId(name)} className={errorClass}>
            {message}
          </p>
        ) : null}
      </div>
    );
  }

  if (sent) {
    return (
      <section id={embedded ? undefined : 'consultation'} className={embedded ? 'appointment-form__success' : 'max-w-[480px]'}>
        {!embedded && <SectionTitle>{heading}</SectionTitle>}
        {embedded ? <h3>Thank you</h3> : null}
        <p className={embedded ? undefined : 'text-vz-ink m-0 text-[16px] leading-[1.45]'} role="status">
          {firstName} will get back to you. You can close this window.
        </p>
      </section>
    );
  }

  return (
    <section id={embedded ? undefined : 'consultation'} className={embedded ? 'appointment-form' : 'max-w-[480px]'}>
      {!embedded && <SectionTitle>{heading}</SectionTitle>}
      <p className={embedded ? 'appointment-form__intro' : 'text-vz-ink m-0 text-[16px] leading-[1.45]'}>
        {pickAdviser
          ? 'Choose who should receive your details. They will get back to you.'
          : `Send your details and ${firstName} will get back to you.`}
      </p>

      <form noValidate onSubmit={onSubmit} className={embedded ? '' : 'mt-6 space-y-4'}>
        {pickAdviser && (
          <div className={embedded ? 'appointment-form__field' : undefined}>
            <label htmlFor={fieldId('adviser')} className={labelClass}>
              {FIELD_LABELS.adviser}
              <span className="text-[#b42318]" aria-hidden="true">
                {' '}
                *
              </span>
            </label>
            <div className={embedded ? 'appointment-form__select-wrap' : undefined}>
              <select
                id={fieldId('adviser')}
                name="adviser"
                required
                value={values.adviser}
                disabled={submitting}
                onChange={(event) => setValue('adviser', event.target.value)}
                onBlur={() => markTouched('adviser')}
                aria-invalid={visible('adviser') ? true : undefined}
                aria-describedby={visible('adviser') ? errorId('adviser') : undefined}
                className={`${controlClass(Boolean(visible('adviser')))} ${embedded ? '' : 'cursor-pointer appearance-auto'}`}
              >
                <option value="">Select name and role</option>
                {advisers.map((person) => (
                  <option key={person.slug} value={person.slug}>
                    {person.name} — {person.role}
                  </option>
                ))}
              </select>
              {embedded ? <ChevronDownIcon className="appointment-form__chevron" /> : null}
            </div>
            {selected ? (
              <div className={embedded ? 'appointment-form__pick' : 'mt-2'}>
                {selected.photo ? (
                  <img src={selected.photo} alt="" width={44} height={44} />
                ) : null}
                <div>
                  <p className={embedded ? 'appointment-form__pick-name' : 'text-vz-ink m-0 text-[14px] font-bold'}>
                    {selected.name}
                  </p>
                  <p className={embedded ? 'appointment-form__pick-role' : 'text-vz-gray m-0 text-[13px]'}>
                    {selected.role}
                  </p>
                </div>
              </div>
            ) : null}
            {visible('adviser') ? (
              <p id={errorId('adviser')} className={errorClass}>
                {visible('adviser')}
              </p>
            ) : null}
          </div>
        )}

        {textField('name', 'text', { autoComplete: 'name' })}
        {textField('email', 'email', { inputMode: 'email', autoComplete: 'email' })}
        {textField('phone', 'tel', { inputMode: 'tel', autoComplete: 'tel' })}

        <label
          className={
            embedded
              ? 'appointment-form__consent'
              : 'text-vz-ink flex cursor-pointer items-start gap-3 text-[14px] leading-[1.45]'
          }
        >
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
            className={embedded ? undefined : 'accent-vz-orange-btn mt-[3px] size-[17px] shrink-0 cursor-pointer'}
          />
          <span>
            I agree that {company.groupName} may use my details to answer this request. See the{' '}
            <Link
              to={ROUTES.privacyPolicy}
              className="vz-underline-hover text-vz-blue"
              onClick={() => appointment?.close()}
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {visible('consent') ? (
          <p id={errorId('consent')} className={errorClass}>
            {visible('consent')}
          </p>
        ) : null}

        {submitError ? (
          <p className={errorClass} role="alert">
            {submitError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className={`${buttonOrangeClass} ${embedded ? 'appointment-form__submit' : 'mt-2'} cursor-pointer disabled:cursor-wait disabled:opacity-60`}
        >
          {submitting ? 'Sending…' : 'Send'}
        </button>
      </form>
    </section>
  );
}

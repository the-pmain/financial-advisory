import { FormEvent, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { CircleCheck } from "lucide-react";
import { useAuth } from "../auth/AuthContext.tsx";
import { ButtonNavy, FormField } from "../components/ui/primitives.tsx";
import { Icon } from "../components/ui/icon.tsx";
import { getDocKind, isDocSlug } from "../documents/catalog.ts";
import { readDocPack, upsertDocRecord, type DocRecord } from "../documents/storage.ts";
import { useI18n } from "../i18n/context.tsx";

const STEPS = ["details", "upload", "review"] as const;
type Step = (typeof STEPS)[number];

export function DocumentFormPage() {
  const { slug = "" } = useParams();
  const { t } = useI18n();
  const { user } = useAuth();
  const navigate = useNavigate();
  const kind = isDocSlug(slug) ? getDocKind(slug) : undefined;

  const initial = useMemo(() => {
    if (!user || !kind) return null;
    return readDocPack(user.id, user.name)[kind.slug];
  }, [user, kind]);

  const [step, setStep] = useState<Step>("details");
  const [fields, setFields] = useState<Record<string, string>>(initial?.fields ?? {});
  const [fileName, setFileName] = useState(initial?.fileName ?? "");
  const [error, setError] = useState("");

  if (!kind || !user) return <Navigate to="/documents" replace />;

  const doc = kind;
  const owner = user;
  const copy = t.docs.kinds[doc.slug];
  const stepIndex = STEPS.indexOf(step);

  function persist(status: DocRecord["status"]) {
    upsertDocRecord(owner.id, owner.name, doc.slug, { status, fields, fileName });
  }

  function onDetails(event: FormEvent) {
    event.preventDefault();
    const missing = doc.fields.some((field) => !String(fields[field.key] ?? "").trim());
    if (missing) {
      setError(t.docs.missingFields);
      return;
    }
    setError("");
    persist("started");
    setStep("upload");
  }

  function onUpload(event: FormEvent) {
    event.preventDefault();
    if (!fileName) {
      setError(t.docs.missingFile);
      return;
    }
    setError("");
    persist("started");
    setStep("review");
  }

  function onConfirm(event: FormEvent) {
    event.preventDefault();
    persist("complete");
    navigate("/documents");
  }

  return (
    <section className="app-page doc-form">
      <p className="doc-form__back">
        <Link to="/documents">{t.docs.back}</Link>
      </p>
      <h1 className="app-page__title">{copy.title}</h1>
      <p className="app-page__note">{copy.lead}</p>

      <ol className="doc-steps" aria-label={t.docs.stepsLabel}>
        {STEPS.map((key, index) => (
          <li
            key={key}
            className={
              index < stepIndex ? "is-done" : index === stepIndex ? "is-current" : undefined
            }
          >
            <span className="doc-steps__index">{index + 1}</span>
            <span>{t.docs.steps[key]}</span>
          </li>
        ))}
      </ol>

      {step === "details" ? (
        <form className="doc-form__panel" onSubmit={onDetails}>
          {doc.fields.map((field) => (
            <FormField
              key={field.key}
              label={t.docs.fields[field.key]}
              type={field.type}
              value={fields[field.key] ?? ""}
              autoComplete={field.autoComplete}
              required
              onChange={(event) =>
                setFields((current) => ({ ...current, [field.key]: event.target.value }))
              }
            />
          ))}
          {error ? <p className="appointment-form__error">{error}</p> : null}
          <div className="doc-form__actions">
            <ButtonNavy>{t.docs.next}</ButtonNavy>
          </div>
        </form>
      ) : null}

      {step === "upload" ? (
        <form className="doc-form__panel" onSubmit={onUpload}>
          <label className="doc-file">
            <span className="doc-file__title">{t.docs.chooseFile}</span>
            <span className="doc-file__name">{fileName || t.docs.noFile}</span>
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
            />
          </label>
          {error ? <p className="appointment-form__error">{error}</p> : null}
          <div className="doc-form__actions">
            <button type="button" className="doc-form__ghost" onClick={() => setStep("details")}>
              {t.docs.previous}
            </button>
            <ButtonNavy>{t.docs.next}</ButtonNavy>
          </div>
        </form>
      ) : null}

      {step === "review" ? (
        <form className="doc-form__panel" onSubmit={onConfirm}>
          <ul className="doc-review">
            {doc.fields.map((field) => (
              <li key={field.key}>
                <span>{t.docs.fields[field.key]}</span>
                <strong>{fields[field.key]}</strong>
              </li>
            ))}
            <li>
              <span>{t.docs.file}</span>
              <strong>{fileName}</strong>
            </li>
          </ul>
          <p className="doc-form__confirm">
            <Icon icon={CircleCheck} />
            {t.docs.confirmNote}
          </p>
          <div className="doc-form__actions">
            <button type="button" className="doc-form__ghost" onClick={() => setStep("upload")}>
              {t.docs.previous}
            </button>
            <ButtonNavy>{t.docs.confirm}</ButtonNavy>
          </div>
        </form>
      ) : null}
    </section>
  );
}

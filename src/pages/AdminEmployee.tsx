import { ArrowLeft, Camera, Save } from "lucide-react";
import { ChangeEvent, FormEvent, ReactNode, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ClientCard } from "../components/admin/ClientCard.tsx";
import { SecretField } from "../components/admin/SecretField.tsx";
import { Avatar } from "../components/ui/avatar.tsx";
import { Icon } from "../components/ui/icon.tsx";
import { ButtonNavy, FormField } from "../components/ui/primitives.tsx";
import type { EmployeeAccountPatch, EmployeeAccountWithClients } from "@domain/staff/model.ts";
import { useAdminEmployees } from "../hooks/useAdminEmployees.ts";
import { useI18n } from "../i18n/context.tsx";
import { plural } from "../lib/format.ts";
import { squarePngBlob } from "../lib/image.ts";

type Tab = "account" | "clients";

export function AdminEmployeePage() {
  const { slug = "" } = useParams();
  const { t } = useI18n();
  const copy = t.admin.employees;
  const { items, error, save, savePhoto, remove } = useAdminEmployees(copy.error);
  const [tab, setTab] = useState<Tab>("account");
  const navigate = useNavigate();

  const employee = items?.find((row) => row.slug === slug) ?? null;

  const back = (
    <Link className="admin-back" to="/admin/employees">
      <Icon icon={ArrowLeft} size={15} />
      {copy.back}
    </Link>
  );

  if (items === null) {
    return (
      <section className="app-page">
        {back}
        <p className="staff-apps__status" role="status">
          <span className="vz-loader" aria-hidden="true" />
          {copy.loading}
        </p>
      </section>
    );
  }

  if (!employee) {
    return (
      <section className="app-page">
        {back}
        <p className="appointment-form__error">{error || copy.notFound}</p>
      </section>
    );
  }

  return (
    <section className="app-page">
      {back}
      <div className="admin-ident">
        <Avatar name={employee.name} photoUrl={employee.photoUrl} size="md" />
        <h1 className="admin-ident__name">
          {employee.name}
          <span className="admin-ident__role">{employee.role || copy.unset}</span>
        </h1>
      </div>

      <div className="admin-tabs" role="tablist" aria-label={copy.tabsLabel}>
        <TabButton current={tab} value="account" onSelect={setTab}>
          {copy.account}
        </TabButton>
        <TabButton current={tab} value="clients" onSelect={setTab}>
          {copy.clients}
          <span className="admin-tab__count">{employee.clients.length}</span>
        </TabButton>
      </div>

      {tab === "account" ? (
        <div role="tabpanel" id="admin-panel-account" aria-labelledby="admin-tab-account">
          <AccountTab
            key={employee.slug}
            employee={employee}
            onSave={save}
            onSavePhoto={savePhoto}
            onRemove={async (target) => {
              await remove(target);
              navigate("/admin/employees");
            }}
          />
        </div>
      ) : (
        <div role="tabpanel" id="admin-panel-clients" aria-labelledby="admin-tab-clients">
          <ClientsTab employee={employee} />
        </div>
      )}
    </section>
  );
}

function TabButton({
  current,
  value,
  onSelect,
  children,
}: {
  current: Tab;
  value: Tab;
  onSelect: (tab: Tab) => void;
  children: ReactNode;
}) {
  const active = current === value;
  return (
    <button
      type="button"
      role="tab"
      id={`admin-tab-${value}`}
      aria-selected={active}
      aria-controls={`admin-panel-${value}`}
      className={`admin-tab${active ? " is-active" : ""}`}
      onClick={() => onSelect(value)}
    >
      {children}
    </button>
  );
}

function AccountTab({
  employee,
  onSave,
  onSavePhoto,
  onRemove,
}: {
  employee: EmployeeAccountWithClients;
  onSave: (slug: string, patch: EmployeeAccountPatch) => Promise<void>;
  onSavePhoto: (slug: string, photo: Blob) => Promise<void>;
  onRemove: (slug: string) => Promise<void>;
}) {
  const { t } = useI18n();
  const copy = t.admin.employees;
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(employee.name);
  const [role, setRole] = useState(employee.role);
  const [order, setOrder] = useState(employee.sortOrder === null ? "" : String(employee.sortOrder));
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState(0);
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [photoPending, setPhotoPending] = useState(false);
  const [photoError, setPhotoError] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setSaved(false);
    setError("");
    try {
      await onSave(employee.slug, {
        name: name.trim(),
        role: role.trim(),
        sortOrder: order.trim() === "" ? null : Number(order),
        password: password || undefined,
      });
      setPassword("");
      if (password) setSecretKey((key) => key + 1);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.error);
    } finally {
      setPending(false);
    }
  }

  async function onPick(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setPhotoPending(true);
    setPhotoError("");

    let squared: Blob;
    try {
      squared = await squarePngBlob(file);
    } catch {
      setPhotoError(copy.photoError);
      setPhotoPending(false);
      return;
    }

    try {
      await onSavePhoto(employee.slug, squared);
    } catch (err) {
      setPhotoError(err instanceof Error ? err.message : copy.error);
    } finally {
      setPhotoPending(false);
    }
  }

  async function onConfirmRemove() {
    setPending(true);
    setError("");
    try {
      await onRemove(employee.slug);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.error);
      setPending(false);
      setConfirming(false);
    }
  }

  return (
    <article className="staff-apps__panel">
      <h2 className="app-page__section admin-section--first">{copy.photo}</h2>
      <div className="admin-photo">
        <span className="admin-photo__frame">
          <Avatar name={employee.name} photoUrl={employee.photoUrl} size="xl" />
          <button
            type="button"
            className="admin-photo__edit"
            title={employee.photoUrl ? copy.photoChange : copy.photoAdd}
            aria-label={employee.photoUrl ? copy.photoChange : copy.photoAdd}
            disabled={photoPending}
            onClick={() => fileRef.current?.click()}
          >
            {photoPending ? (
              <span className="vz-loader" aria-hidden="true" />
            ) : (
              <Icon icon={Camera} size={17} />
            )}
          </button>
        </span>
        <input
          ref={fileRef}
          type="file"
          className="admin-photo__input"
          accept="image/png,image/jpeg,image/webp"
          onChange={(event) => void onPick(event)}
        />
      </div>
      {photoError ? <p className="appointment-form__error">{photoError}</p> : null}

      <h2 className="app-page__section">{copy.edit}</h2>
      <dl className="staff-apps__dl admin-secret__dl">
        <dt>{t.admin.secret.password}</dt>
        <dd>
          <SecretField
            key={secretKey}
            path={`/api/admin/employees/${encodeURIComponent(employee.slug)}/password`}
          />
        </dd>
      </dl>
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="admin-form">
          <FormField
            label={copy.name}
            type="text"
            value={name}
            required
            disabled={pending}
            autoComplete="off"
            onChange={(event) => setName(event.target.value)}
          />
          <FormField
            label={copy.role}
            type="text"
            value={role}
            disabled={pending}
            autoComplete="off"
            onChange={(event) => setRole(event.target.value)}
          />
          <FormField
            label={copy.order}
            type="number"
            inputMode="numeric"
            min={0}
            max={9999}
            step={1}
            value={order}
            disabled={pending}
            autoComplete="off"
            onChange={(event) => setOrder(event.target.value)}
          />
          <FormField
            label={copy.password}
            type="password"
            value={password}
            minLength={8}
            disabled={pending}
            autoComplete="new-password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <p className="admin-hint">{copy.passwordHint}</p>
        <div className="admin-form__actions">
          <ButtonNavy className="admin-save" loading={pending}>
            {pending ? null : <Icon icon={Save} size={16} />}
            {copy.save}
          </ButtonNavy>
          {saved ? <span className="admin-form__status">{copy.saved}</span> : null}
        </div>
        {error ? <p className="appointment-form__error">{error}</p> : null}
      </form>

      <h2 className="app-page__section">{copy.record}</h2>
      <dl className="staff-apps__dl">
        <dt>{copy.slug}</dt>
        <dd>{employee.slug}</dd>
        <dt>{copy.recordId}</dt>
        <dd>{employee.id}</dd>
        <dt>{t.admin.secret.password}</dt>
        <dd>
          <SecretField
            key={secretKey}
            path={`/api/admin/employees/${encodeURIComponent(employee.slug)}/password`}
          />
        </dd>
        <dt>{copy.clients}</dt>
        <dd>{plural(employee.clients.length, copy.clientCountOne, copy.clientCount)}</dd>
      </dl>
      <p className="admin-hint admin-hint--after">{copy.slugHint}</p>

      <h2 className="app-page__section">{copy.remove}</h2>
      {confirming ? (
        <div className="admin-confirm">
          <p className="admin-confirm__text">{copy.removeLead.replace("{name}", employee.name)}</p>
          <button
            type="button"
            className="admin-danger"
            disabled={pending}
            onClick={() => void onConfirmRemove()}
          >
            {copy.removeConfirm}
          </button>
          <button
            type="button"
            className="doc-form__ghost"
            disabled={pending}
            onClick={() => setConfirming(false)}
          >
            {copy.removeCancel}
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="admin-danger"
          disabled={pending}
          onClick={() => setConfirming(true)}
        >
          {copy.remove}
        </button>
      )}
    </article>
  );
}

function ClientsTab({ employee }: { employee: EmployeeAccountWithClients }) {
  const { t } = useI18n();
  const copy = t.admin.employees;

  return (
    <article className="staff-apps__panel">
      <p className="doc-pack__count">{copy.clientsLead}</p>
      {employee.clients.length === 0 ? (
        <p className="app-page__note">{copy.clientsEmpty}</p>
      ) : (
        <ul className="admin-clients">
          {employee.clients.map((client) => (
            <li key={client.id}>
              <ClientCard
                client={client}
                href={`/admin/clients/${encodeURIComponent(client.id)}`}
              />
            </li>
          ))}
        </ul>
      )}
      <p className="admin-hint admin-hint--after">{t.admin.client.kycNote}</p>
    </article>
  );
}

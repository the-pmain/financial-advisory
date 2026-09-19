import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type PreviewCopy = {
  title: string;
  agree?: string;
  sign: string;
  close: string;
  loading: string;
  fail: string;
  signing?: string;
};

export type PreviewFile = {
  bytes: Uint8Array;
  filename: string;
};

export type PreviewPrepare = () => Promise<PreviewFile>;

function clonePdfBytes(bytes: Uint8Array): Uint8Array {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy;
}

function pdfBlob(bytes: Uint8Array): Blob {
  const copy = clonePdfBytes(bytes);
  const buffer = new ArrayBuffer(copy.byteLength);
  new Uint8Array(buffer).set(copy);
  return new Blob([buffer], { type: "application/pdf" });
}

function safeDownloadFilename(name: string, fallbackExt = "pdf"): string {
  const cleaned = String(name || "document")
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (/\.pdf$/i.test(cleaned)) return cleaned;
  return `${cleaned || "document"}.${fallbackExt}`;
}

function triggerFileDownload(bytes: Uint8Array, filename: string): void {
  if (!bytes.byteLength) {
    throw new Error("The document is empty.");
  }
  const safeName = safeDownloadFilename(filename);
  const blob = pdfBlob(bytes);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = safeName;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  window.setTimeout(() => {
    link.remove();
    URL.revokeObjectURL(url);
  }, 4_000);
}

const ADMIN_COPY = (title: string): PreviewCopy => ({
  title,
  sign: "Download",
  close: "Close",
  loading: "Preparing the document…",
  fail: "The document could not be prepared. Close this window and try again.",
});

export function adminPreviewCopy(title: string): PreviewCopy {
  return ADMIN_COPY(title);
}

export function DocumentPreviewDialog({
  open,
  copy,
  prepare,
  runKey,
  confirm = false,
  wait = "close",
  onClose,
  onReady,
  onSign,
}: {
  open: boolean;
  copy: PreviewCopy;
  prepare: PreviewPrepare | null;
  runKey?: string;
  confirm?: boolean;
  wait?: "close" | "ready";
  onClose: () => void;
  onReady?: () => void;
  onSign?: (packed: { bytes: Uint8Array; filename: string }) => Promise<void>;
}) {
  const [status, setStatus] = useState<"loading" | "ready" | "error" | "signing">("loading");
  const [agreed, setAgreed] = useState(false);
  const [pages, setPages] = useState<string[]>([]);
  const [file, setFile] = useState<PreviewFile | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<PreviewFile | null>(null);
  const prepareRef = useRef(prepare);
  const onReadyRef = useRef(onReady);
  prepareRef.current = prepare;
  onReadyRef.current = onReady;
  const busy = status === "loading" || status === "signing";

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open || busy) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, busy, onClose]);

  useEffect(() => {
    if (!open) return;
    const run = prepareRef.current;
    if (!run) return;

    let cancelled = false;
    setStatus("loading");
    setAgreed(false);
    setPages([]);
    fileRef.current = null;
    setFile(null);

    void run()
      .then(async (next) => {
        if (cancelled) return;
        const packed = {
          bytes: clonePdfBytes(next.bytes),
          filename: next.filename,
        };
        fileRef.current = packed;
        setFile(packed);
        const rendered = await renderPdfPages(packed.bytes, stageRef.current?.clientWidth ?? 720);
        if (cancelled) return;
        if (!rendered.length) throw new Error("The document preview could not be drawn.");
        setPages(rendered);
        setStatus("ready");
        onReadyRef.current?.();
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [open, runKey]);

  if (!open) return null;

  async function download() {
    const packed = fileRef.current ?? file;
    if (!packed) return;
    if (onSign) {
      setStatus("signing");
      try {
        await onSign(packed);
      } finally {
        setStatus("ready");
      }
    }
    try {
      triggerFileDownload(packed.bytes, packed.filename);
    } catch {
      setStatus("error");
      return;
    }
    if (wait === "close") {
      window.setTimeout(onClose, 50);
    }
  }

  return createPortal(
    <div className="doc-preview-scrim">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="document-preview-title"
        className="doc-preview"
      >
        <header className="doc-preview__head">
          <h2 id="document-preview-title" className="doc-preview__title">
            {copy.title}
          </h2>
          <button type="button" disabled={busy} onClick={onClose} className="doc-preview__text-btn">
            {copy.close}
          </button>
        </header>

        <div ref={stageRef} className="doc-preview__stage">
          {status === "loading" && (
            <div className="doc-preview__status" role="status">
              <span className="vz-loader" aria-hidden="true" />
              <p>{copy.loading}</p>
            </div>
          )}
          {status === "error" && (
            <div className="doc-preview__status">
              <p className="appointment-form__error" role="alert">
                {copy.fail}
              </p>
            </div>
          )}
          {status === "signing" && (
            <div className="doc-preview__status" role="status">
              <span className="vz-loader" aria-hidden="true" />
              <p>{copy.signing}</p>
            </div>
          )}
          {status === "ready" && (
            <div className="doc-preview__pages">
              {pages.map((src, index) => (
                <img key={src} src={src} alt={`Page ${index + 1}`} className="doc-preview__page" />
              ))}
            </div>
          )}
        </div>

        <footer className="doc-preview__foot">
          {confirm ? (
            <label className="doc-preview__agree">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
              />
              {copy.agree ?? "I have read this document."}
            </label>
          ) : null}
          <button
            type="button"
            disabled={status !== "ready" || (confirm && !agreed)}
            onClick={() => void download()}
            className="doc-preview__download"
          >
            {copy.sign}
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}

async function renderPdfPages(bytes: Uint8Array, width: number): Promise<string[]> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();
  const task = pdfjs.getDocument({ data: clonePdfBytes(bytes) });
  const pdf = await task.promise;
  const urls: string[] = [];
  const pageWidth = Math.max(320, Math.min(width || 720, 720));
  for (let pageNo = 1; pageNo <= pdf.numPages; pageNo += 1) {
    const page = await pdf.getPage(pageNo);
    const unscaled = page.getViewport({ scale: 1 });
    const scale = pageWidth / unscaled.width;
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const context = canvas.getContext("2d");
    if (!context) continue;
    await page.render({ canvasContext: context, canvas, viewport }).promise;
    urls.push(canvas.toDataURL("image/png"));
  }
  return urls;
}

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useEscape, useScrollLock } from '../../hooks/useScrollLock';

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
  return new Blob([buffer], { type: 'application/pdf' });
}

function safeDownloadFilename(name: string, fallbackExt = 'pdf'): string {
  const cleaned = String(name || 'document')
    .replace(/[/\\?%*:|"<>]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (/\.pdf$/i.test(cleaned)) return cleaned;
  return `${cleaned || 'document'}.${fallbackExt}`;
}

function triggerFileDownload(bytes: Uint8Array, filename: string): void {
  if (!bytes.byteLength) {
    throw new Error('The document is empty.');
  }
  const safeName = safeDownloadFilename(filename);
  const blob = pdfBlob(bytes);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = safeName;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  window.setTimeout(() => {
    link.remove();
    URL.revokeObjectURL(url);
  }, 4_000);
}

const ADMIN_COPY = (title: string): PreviewCopy => ({
  title,
  sign: 'Download',
  close: 'Close',
  loading: 'Preparing the document…',
  fail: 'The document could not be prepared. Close this window and try again.',
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
  wait = 'close',
  onClose,
  onReady,
  onSign,
}: {
  open: boolean;
  copy: PreviewCopy;
  prepare: PreviewPrepare | null;
  runKey?: string;
  confirm?: boolean;
  wait?: 'close' | 'ready';
  onClose: () => void;
  onReady?: () => void;
  onSign?: (packed: { bytes: Uint8Array; filename: string }) => Promise<void>;
}) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error' | 'signing'>('loading');
  const [agreed, setAgreed] = useState(false);
  const [pages, setPages] = useState<string[]>([]);
  const [file, setFile] = useState<PreviewFile | null>(null);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<PreviewFile | null>(null);
  const prepareRef = useRef(prepare);
  const onReadyRef = useRef(onReady);
  prepareRef.current = prepare;
  onReadyRef.current = onReady;
  const busy = status === 'loading' || status === 'signing';

  useScrollLock(open);
  useEscape(open && !busy, onClose);

  useEffect(() => {
    if (!open) return;
    const run = prepareRef.current;
    if (!run) return;

    let cancelled = false;
    setStatus('loading');
    setAgreed(false);
    setPages([]);
    fileRef.current = null;
    setFile(null);
    setIframeUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });

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
        if (rendered.length) {
          setPages(rendered);
        } else {
          setIframeUrl(URL.createObjectURL(pdfBlob(packed.bytes)));
        }
        setStatus('ready');
        onReadyRef.current?.();
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [open, runKey]);

  useEffect(() => {
    return () => {
      if (iframeUrl) URL.revokeObjectURL(iframeUrl);
    };
  }, [iframeUrl]);

  if (!open) return null;

  async function download() {
    const packed = fileRef.current ?? file;
    if (!packed) return;
    if (onSign) {
      setStatus('signing');
      try {
        await onSign(packed);
      } finally {
        setStatus('ready');
      }
    }
    try {
      triggerFileDownload(packed.bytes, packed.filename);
    } catch {
      setStatus('error');
      return;
    }
    if (wait === 'close') {
      window.setTimeout(onClose, 50);
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(7,14,24,0.46)] p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="document-preview-title"
        className="flex h-[min(92vh,calc(100dvh-2rem))] w-full max-w-[880px] flex-col overflow-hidden rounded-[4px] bg-white shadow-[0_12px_40px_rgba(7,14,24,0.28)]"
      >
        <header className="border-vz-rule flex shrink-0 items-center justify-between gap-3 border-b px-5 py-4">
          <h2 id="document-preview-title" className="text-vz-ink m-0 text-[18px] font-bold">
            {copy.title}
          </h2>
          <button
            type="button"
            disabled={busy}
            onClick={onClose}
            className="text-vz-blue hover:bg-vz-blue-panel h-9 cursor-pointer rounded-[3px] px-3 text-[14px] font-bold disabled:cursor-wait disabled:opacity-50"
          >
            {copy.close}
          </button>
        </header>

        <div ref={stageRef} className="flex min-h-0 flex-1 flex-col overflow-auto bg-[#f4f6f8]">
          {status === 'loading' && (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5" role="status">
              <svg className="text-vz-blue size-24 animate-spin" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <circle cx="24" cy="24" r="18" stroke="currentColor" strokeOpacity="0.18" strokeWidth="4" />
                <path d="M42 24a18 18 0 00-18-18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <p className="text-vz-ink m-0 text-[16px] font-bold">{copy.loading}</p>
            </div>
          )}
          {status === 'error' && (
            <div className="flex flex-1 items-center justify-center px-5">
              <p className="text-vz-orange m-0 text-[15px]" role="alert">
                {copy.fail}
              </p>
            </div>
          )}
          {status === 'signing' && (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5" role="status">
              <svg className="text-vz-blue size-24 animate-spin" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <circle cx="24" cy="24" r="18" stroke="currentColor" strokeOpacity="0.18" strokeWidth="4" />
                <path d="M42 24a18 18 0 00-18-18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <p className="text-vz-ink m-0 text-[16px] font-bold">{copy.signing}</p>
            </div>
          )}
          {status === 'ready' && (
            <div className="px-5 py-4">
              {pages.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`Page ${index + 1}`}
                  className="mx-auto mb-4 block w-full max-w-[720px] bg-white shadow-[0_1px_4px_rgba(7,14,24,0.12)] last:mb-0"
                />
              ))}
              {iframeUrl && !pages.length && (
                <iframe title={copy.title} src={iframeUrl} className="h-full min-h-[70vh] w-full border-0 bg-white" />
              )}
            </div>
          )}
        </div>

        <footer className="border-vz-rule flex shrink-0 flex-wrap items-center justify-end gap-3 border-t px-5 py-4">
          {confirm && (
            <label className="text-vz-ink mr-auto flex items-center gap-2 text-[14px]">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
                className="accent-vz-orange-btn size-4"
              />
              {copy.agree ?? 'I have read this document.'}
            </label>
          )}
          <button
            type="button"
            disabled={status !== 'ready' || (confirm && !agreed)}
            onClick={() => void download()}
            className="bg-vz-blue hover:bg-vz-blue-mid disabled:bg-vz-blue-panel inline-flex h-10 cursor-pointer items-center rounded-[3px] px-4 text-[14px] font-bold text-white disabled:cursor-default"
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
  try {
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
    const worker = await import('pdfjs-dist/legacy/build/pdf.worker.min.mjs?url');
    pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
    const task = pdfjs.getDocument({ data: clonePdfBytes(bytes) });
    const pdf = await task.promise;
    const urls: string[] = [];
    for (let pageNo = 1; pageNo <= pdf.numPages; pageNo += 1) {
      const page = await pdf.getPage(pageNo);
      const unscaled = page.getViewport({ scale: 1 });
      const scale = Math.max(1, (width || 720) / unscaled.width);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext('2d');
      if (!context) continue;
      await page.render({ canvasContext: context, viewport }).promise;
      urls.push(canvas.toDataURL('image/png'));
    }
    return urls;
  } catch {
    return [];
  }
}

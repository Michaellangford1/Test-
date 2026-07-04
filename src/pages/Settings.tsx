import { useEffect, useRef, useState } from 'react';
import { Download, HardDrive, Minus, Plus, Upload } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { useTheme, type ThemePref } from '../ui/theme';
import { getSetting, setSetting } from '../db/db';
import { downloadBlob, exportFilename, exportZip, restoreZip, type RestoreMode } from '../lib/backup';
import { BLANK_SCHEMA_HELPER } from '../lib/prompt';
import { copyText } from '../lib/share';
import { useToast } from '../ui/Toast';

const APP_VERSION = '1.0.0';
const MIN_SIZE = 22;
const MAX_SIZE = 30;

function bytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export function Settings() {
  const [theme, setTheme] = useTheme();
  const toast = useToast();
  const restoreRef = useRef<HTMLInputElement>(null);

  const [textSize, setTextSize] = useState(24);
  const [storage, setStorage] = useState<{ usage: number; quota: number } | null>(null);
  const [persist, setPersist] = useState<boolean | null>(null);
  const [pendingRestore, setPendingRestore] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getSetting<number>('taskTextSize', 24).then(setTextSize);
    getSetting<boolean>('persist-granted', false).then(setPersist);
    if (navigator.storage?.estimate) {
      navigator.storage.estimate().then((est) =>
        setStorage({ usage: est.usage ?? 0, quota: est.quota ?? 0 }),
      );
    }
  }, []);

  const changeSize = (delta: number) => {
    setTextSize((s) => {
      const next = Math.max(MIN_SIZE, Math.min(MAX_SIZE, s + delta));
      void setSetting('taskTextSize', next);
      return next;
    });
  };

  const requestPersist = async () => {
    if (!navigator.storage?.persist) {
      toast.show('Persistent storage not supported here', 'error');
      return;
    }
    const granted = await navigator.storage.persist();
    setPersist(granted);
    await setSetting('persist-granted', granted);
    toast.show(granted ? 'Persistent storage granted' : 'Browser declined persistence', granted ? 'success' : 'info');
  };

  const doExport = async () => {
    setBusy(true);
    try {
      const blob = await exportZip();
      downloadBlob(blob, exportFilename());
      toast.show('Backup exported', 'success');
    } catch (e) {
      toast.show(e instanceof Error ? e.message : 'Export failed', 'error');
    } finally {
      setBusy(false);
    }
  };

  const doRestore = async (mode: RestoreMode) => {
    if (!pendingRestore) return;
    setBusy(true);
    try {
      const summary = await restoreZip(pendingRestore, mode);
      toast.show(
        `Restored ${summary.guides} guides, ${summary.reference} reference items, ${summary.photos} photos`,
        'success',
      );
    } catch (e) {
      toast.show(e instanceof Error ? e.message : 'Restore failed', 'error');
    } finally {
      setBusy(false);
      setPendingRestore(null);
      if (restoreRef.current) restoreRef.current.value = '';
    }
  };

  const copySchema = async () => {
    const res = await copyText(BLANK_SCHEMA_HELPER);
    toast.show(res === 'copied' ? 'Blank schema copied' : 'Could not copy', res === 'copied' ? 'success' : 'error');
  };

  return (
    <div>
      <PageHeader title="Settings" />

      {/* Theme */}
      <section className="card mb-4 p-4">
        <h2 className="mb-3 font-bold">Theme</h2>
        <div className="flex gap-2">
          {(['system', 'light', 'dark'] as ThemePref[]).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={
                'chip flex-1 justify-center capitalize ' +
                (theme === t ? 'border-accent bg-accent text-white' : 'border-line dark:border-slate-600')
              }
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Text size */}
      <section className="card mb-4 p-4">
        <h2 className="mb-1 font-bold">Task Mode text size</h2>
        <p className="mb-3 text-sm opacity-70">Default size for step text.</p>
        <div className="flex items-center gap-3">
          <button
            className="btn-secondary min-w-touch px-3"
            onClick={() => changeSize(-2)}
            disabled={textSize <= MIN_SIZE}
            aria-label="Smaller"
          >
            <Minus size={20} />
          </button>
          <span className="flex-1 text-center font-semibold" style={{ fontSize: `${textSize}px` }}>
            {textSize}px
          </span>
          <button
            className="btn-secondary min-w-touch px-3"
            onClick={() => changeSize(2)}
            disabled={textSize >= MAX_SIZE}
            aria-label="Larger"
          >
            <Plus size={20} />
          </button>
        </div>
      </section>

      {/* Storage */}
      <section className="card mb-4 p-4">
        <h2 className="mb-3 flex items-center gap-2 font-bold">
          <HardDrive size={20} /> Storage
        </h2>
        {storage ? (
          <p className="text-sm">
            Using <strong>{bytes(storage.usage)}</strong>
            {storage.quota ? <> of about {bytes(storage.quota)} available</> : null}.
          </p>
        ) : (
          <p className="text-sm opacity-70">Storage estimate not available.</p>
        )}
        <p className="mt-2 text-sm">
          Persistent storage:{' '}
          <strong>{persist === null ? '…' : persist ? 'granted' : 'not granted'}</strong>
        </p>
        {!persist && (
          <button className="btn-secondary mt-3" onClick={requestPersist}>
            Request persistent storage
          </button>
        )}
      </section>

      {/* Backup */}
      <section className="card mb-4 p-4">
        <h2 className="mb-3 font-bold">Backup &amp; restore</h2>
        <p className="mb-3 text-sm opacity-70">
          Everything stays on this device. Export a zip to keep it safe or move it to another phone.
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="btn-primary" onClick={doExport} disabled={busy}>
            <Download size={18} /> Export backup
          </button>
          <button
            className="btn-secondary"
            onClick={() => restoreRef.current?.click()}
            disabled={busy}
          >
            <Upload size={18} /> Restore
          </button>
          <input
            ref={restoreRef}
            type="file"
            accept=".zip,application/zip"
            className="sr-only"
            onChange={(e) => e.target.files?.[0] && setPendingRestore(e.target.files[0])}
          />
        </div>
      </section>

      {/* Schema helper */}
      <section className="card mb-4 p-4">
        <h2 className="mb-1 font-bold">Manual Claude chats</h2>
        <p className="mb-3 text-sm opacity-70">
          Copy a blank schema prompt to paste into any Claude chat by hand.
        </p>
        <button className="btn-secondary" onClick={copySchema}>
          Copy blank schema
        </button>
      </section>

      {/* About */}
      <section className="card mb-4 p-4">
        <h2 className="mb-1 font-bold">About</h2>
        <p className="text-sm opacity-70">
          House Manual v{APP_VERSION} — an offline-first personal DIY manual. No accounts, no network,
          no data leaves this device.
        </p>
      </section>

      {pendingRestore && (
        <div
          className="fixed inset-0 z-[65] flex items-end justify-center bg-black/50 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          onClick={() => setPendingRestore(null)}
        >
          <div className="card w-full max-w-md p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold">Restore from backup</h2>
            <p className="mt-2 text-base opacity-80">
              <strong>Replace all</strong> clears this device first, then restores the backup.
              <br />
              <strong>Merge</strong> keeps what you have; imported items win on any id clash.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <button className="btn-danger" disabled={busy} onClick={() => doRestore('replace')}>
                Replace all
              </button>
              <button className="btn-primary" disabled={busy} onClick={() => doRestore('merge')}>
                Merge
              </button>
              <button className="btn-secondary" onClick={() => setPendingRestore(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

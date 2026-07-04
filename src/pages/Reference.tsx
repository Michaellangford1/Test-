import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Plus } from 'lucide-react';
import { useReferenceItems } from '../hooks/data';
import { REFERENCE_CATEGORIES } from '../types/schema';
import { PageHeader } from '../components/PageHeader';
import { Photo } from '../components/Photo';
import { hasTodo } from '../lib/categories';
import { addPhoto } from '../lib/photos';
import { saveReference } from '../db/mutations';
import { slugify, uniqueSuffix, randomId } from '../lib/id';
import { db } from '../db/db';
import { useToast } from '../ui/Toast';
import type { ReferenceCategory } from '../types/schema';

export function Reference() {
  const items = useReferenceItems();
  const toast = useToast();
  const cameraRef = useRef<HTMLInputElement>(null);
  const [quickAdd, setQuickAdd] = useState<{ photoId: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof items>();
    for (const cat of REFERENCE_CATEGORIES) map.set(cat, []);
    for (const item of items ?? []) {
      const arr = map.get(item.category) ?? [];
      arr.push(item);
      map.set(item.category, arr);
    }
    return map;
  }, [items]);

  const onCapture = async (files: FileList | null) => {
    if (!files || !files[0]) return;
    setBusy(true);
    try {
      const photoId = await addPhoto(files[0]);
      setQuickAdd({ photoId });
    } catch (e) {
      toast.show(e instanceof Error ? e.message : 'Could not add photo', 'error');
    } finally {
      setBusy(false);
      if (cameraRef.current) cameraRef.current.value = '';
    }
  };

  if (!items) return <p className="opacity-60">Loading…</p>;

  return (
    <div>
      <PageHeader title="House Reference" subtitle="Where things are" />

      {items.length === 0 && (
        <p className="card p-6 text-center opacity-70">
          Nothing here yet. Use the camera button to capture your first reference photo.
        </p>
      )}

      {REFERENCE_CATEGORIES.map((cat) => {
        const list = grouped.get(cat) ?? [];
        if (list.length === 0) return null;
        return (
          <section key={cat} className="mb-6">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide opacity-60">{cat}</h2>
            <ul className="grid grid-cols-2 gap-3">
              {list.map((item) => (
                <li key={item.id}>
                  <Link to={`/reference/${item.id}`} className="card block overflow-hidden">
                    {item.photoIds[0] ? (
                      <Photo id={item.photoIds[0]} thumb className="h-32 w-full" />
                    ) : (
                      <div className="flex h-32 w-full items-center justify-center bg-accent/5 text-accent/40">
                        <Camera size={28} />
                      </div>
                    )}
                    <div className="p-3">
                      <p className="line-clamp-2 font-bold leading-tight">{item.title}</p>
                      {hasTodo(item.body) && (
                        <span className="mt-1 inline-block rounded-full bg-amber/20 px-2 py-0.5 text-xs font-semibold text-amber-deep dark:text-amber-soft">
                          Needs detail
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {/* quick-add FAB → camera */}
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={(e) => onCapture(e.target.files)}
      />
      <div className="fixed bottom-24 right-4 z-30 flex flex-col gap-3">
        <Link
          to="/reference/new"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-accent shadow-lg ring-1 ring-line dark:bg-slate-700 dark:ring-slate-600"
          aria-label="Add reference item"
        >
          <Plus size={26} />
        </Link>
        <button
          onClick={() => cameraRef.current?.click()}
          disabled={busy}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-lg"
          aria-label="Quick add with camera"
        >
          <Camera size={30} />
        </button>
      </div>

      {quickAdd && (
        <QuickAddSheet
          photoId={quickAdd.photoId}
          onCancel={async () => {
            await db.photos.delete(quickAdd.photoId);
            setQuickAdd(null);
          }}
          onSaved={() => {
            setQuickAdd(null);
            toast.show('Reference item saved', 'success');
          }}
        />
      )}
    </div>
  );
}

function QuickAddSheet({
  photoId,
  onCancel,
  onSaved,
}: {
  photoId: string;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ReferenceCategory>('Utilities');
  const toast = useToast();

  const save = async () => {
    const clean = title.trim();
    if (!clean) {
      toast.show('Give it a short title first', 'error');
      return;
    }
    const existing = await db.reference.toArray();
    const ids = new Set(existing.map((r) => r.id));
    const id = uniqueSuffix(slugify(clean) || randomId('ref'), (x) => ids.has(x));
    await saveReference({
      id,
      title: clean,
      category,
      body: '',
      photoIds: [photoId],
      tags: [],
      updatedAt: Date.now(),
    });
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-[65] flex items-end justify-center bg-black/50 p-4" onClick={onCancel}>
      <div className="card w-full max-w-md p-5" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-3 text-xl font-bold">Save this photo</h2>
        <Photo id={photoId} thumb className="mb-3 h-40 w-full rounded-xl" />
        <label className="label" htmlFor="qa-title">
          Title
        </label>
        <input
          id="qa-title"
          className="input mb-3"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Stopcock under the sink"
        />
        <label className="label" htmlFor="qa-cat">
          Category
        </label>
        <select
          id="qa-cat"
          className="input mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value as ReferenceCategory)}
        >
          {REFERENCE_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-2">
          <button className="btn-secondary" onClick={onCancel}>
            Discard
          </button>
          <button className="btn-primary" onClick={save}>
            Save item
          </button>
        </div>
      </div>
    </div>
  );
}

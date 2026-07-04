import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { StringListEditor } from '../components/StringListEditor';
import { AddPhotoButtons } from '../components/AddPhotoButtons';
import { Photo } from '../components/Photo';
import { useReferenceItem } from '../hooks/data';
import { db, type ReferenceRecord } from '../db/db';
import { deletePhoto } from '../lib/photos';
import { saveReference } from '../db/mutations';
import { slugify, uniqueSuffix } from '../lib/id';
import { REFERENCE_CATEGORIES, type ReferenceCategory } from '../types/schema';
import { useToast } from '../ui/Toast';

const EMPTY: ReferenceRecord = {
  id: '',
  title: '',
  category: 'Utilities',
  body: '',
  photoIds: [],
  tags: [],
  updatedAt: 0,
};

export function ReferenceEditor() {
  const { id } = useParams();
  const isNew = !id;
  const existing = useReferenceItem(id);
  const navigate = useNavigate();
  const toast = useToast();

  const [draft, setDraft] = useState<ReferenceRecord>(EMPTY);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isNew) {
      setLoaded(true);
      return;
    }
    if (existing) {
      setDraft(existing);
      setLoaded(true);
    }
  }, [isNew, existing]);

  if (!loaded) return <p className="opacity-60">Loading…</p>;

  const set = <K extends keyof ReferenceRecord>(key: K, value: ReferenceRecord[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const save = async () => {
    if (!draft.title.trim()) {
      toast.show('Give the item a title', 'error');
      return;
    }
    let finalId = draft.id;
    if (isNew || !finalId) {
      const all = new Set((await db.reference.toArray()).map((r) => r.id));
      finalId = uniqueSuffix(slugify(draft.title), (x) => all.has(x));
    }
    await saveReference({
      ...draft,
      id: finalId,
      tags: draft.tags.filter((t) => t.trim()),
    });
    toast.show('Reference item saved', 'success');
    navigate(`/reference/${finalId}`);
  };

  return (
    <div>
      <PageHeader title={isNew ? 'New reference item' : 'Edit reference item'} back />

      <label className="label" htmlFor="title">
        Title
      </label>
      <input
        id="title"
        className="input mb-4"
        value={draft.title}
        onChange={(e) => set('title', e.target.value)}
        placeholder="e.g. Where the stopcock is"
      />

      <label className="label" htmlFor="cat">
        Category
      </label>
      <select
        id="cat"
        className="input mb-4"
        value={draft.category}
        onChange={(e) => set('category', e.target.value as ReferenceCategory)}
      >
        {REFERENCE_CATEGORIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <label className="label" htmlFor="body">
        Notes (Markdown)
      </label>
      <textarea
        id="body"
        className="input mb-4 min-h-[140px] py-3 font-mono text-sm"
        value={draft.body}
        onChange={(e) => set('body', e.target.value)}
        placeholder="Describe where it is, model numbers, anything worth remembering…"
      />

      <label className="label">Photos</label>
      {draft.photoIds.length > 0 && (
        <div className="mb-2 grid grid-cols-3 gap-2">
          {draft.photoIds.map((pid) => (
            <div key={pid} className="relative">
              <Photo id={pid} thumb className="h-24 w-full rounded-lg" />
              <button
                className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#a23c46] text-white"
                aria-label="Remove photo"
                onClick={() => {
                  void deletePhoto(pid);
                  set(
                    'photoIds',
                    draft.photoIds.filter((p) => p !== pid),
                  );
                }}
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mb-4">
        <AddPhotoButtons onAdded={(pid) => set('photoIds', [...draft.photoIds, pid])} />
      </div>

      <StringListEditor label="Tags" items={draft.tags} onChange={(v) => set('tags', v)} />

      <div className="sticky bottom-24 mt-6 flex gap-2">
        <button className="btn-secondary flex-1" onClick={() => navigate(-1)}>
          Cancel
        </button>
        <button className="btn-primary flex-1" onClick={save}>
          Save item
        </button>
      </div>
    </div>
  );
}

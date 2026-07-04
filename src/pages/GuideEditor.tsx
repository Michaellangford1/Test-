import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, GripVertical, Plus, Trash2 } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { StringListEditor } from '../components/StringListEditor';
import { AddPhotoButtons } from '../components/AddPhotoButtons';
import { Photo } from '../components/Photo';
import { useGuide } from '../hooks/data';
import { db, type GuideRecord, type Step } from '../db/db';
import { deletePhoto } from '../lib/photos';
import { saveGuide } from '../db/mutations';
import { slugify, uniqueSuffix } from '../lib/id';
import {
  DIFFICULTIES,
  GUIDE_CATEGORIES,
  type Difficulty,
  type GuideCategory,
} from '../types/schema';
import { useToast } from '../ui/Toast';

const EMPTY: GuideRecord = {
  id: '',
  title: '',
  category: 'Plumbing',
  difficulty: 'Easy',
  timeEstimate: '',
  tools: [],
  materials: [],
  safety: [],
  houseNotes: '',
  steps: [{ text: '', note: '', photoIds: [] }],
  tags: [],
  source: 'manual',
  createdAt: 0,
  updatedAt: 0,
};

export function GuideEditor() {
  const { id } = useParams();
  const isNew = !id;
  const existing = useGuide(id);
  const navigate = useNavigate();
  const toast = useToast();

  const [draft, setDraft] = useState<GuideRecord>(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

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

  const set = <K extends keyof GuideRecord>(key: K, value: GuideRecord[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const setStep = (i: number, patch: Partial<Step>) =>
    setDraft((d) => ({
      ...d,
      steps: d.steps.map((s, x) => (x === i ? { ...s, ...patch } : s)),
    }));

  const moveStep = (from: number, to: number) => {
    if (to < 0 || to >= draft.steps.length) return;
    const steps = [...draft.steps];
    const [moved] = steps.splice(from, 1);
    steps.splice(to, 0, moved);
    set('steps', steps);
  };

  const removeStep = (i: number) => {
    const step = draft.steps[i];
    step.photoIds.forEach((pid) => void deletePhoto(pid));
    set(
      'steps',
      draft.steps.filter((_, x) => x !== i),
    );
  };

  const save = async () => {
    if (!draft.title.trim()) {
      toast.show('Give the guide a title', 'error');
      return;
    }
    const steps = draft.steps.filter((s) => s.text.trim());
    if (steps.length === 0) {
      toast.show('Add at least one step', 'error');
      return;
    }

    let finalId = draft.id;
    if (isNew || !finalId) {
      const all = new Set((await db.guides.toArray()).map((g) => g.id));
      finalId = uniqueSuffix(slugify(draft.title), (x) => all.has(x));
    }

    const record: GuideRecord = {
      ...draft,
      id: finalId,
      steps,
      tools: draft.tools.filter((t) => t.trim()),
      materials: draft.materials.filter((t) => t.trim()),
      safety: draft.safety.filter((t) => t.trim()),
      tags: draft.tags.filter((t) => t.trim()),
      source: isNew ? 'manual' : draft.source,
      createdAt: draft.createdAt || Date.now(),
    };
    await saveGuide(record);
    toast.show('Guide saved', 'success');
    navigate(`/guide/${finalId}`);
  };

  return (
    <div>
      <PageHeader title={isNew ? 'New guide' : 'Edit guide'} back />

      <label className="label" htmlFor="title">
        Title
      </label>
      <input
        id="title"
        className="input mb-4"
        value={draft.title}
        onChange={(e) => set('title', e.target.value)}
        placeholder="e.g. Replace the kitchen mixer tap"
      />

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div>
          <label className="label" htmlFor="cat">
            Category
          </label>
          <select
            id="cat"
            className="input"
            value={draft.category}
            onChange={(e) => set('category', e.target.value as GuideCategory)}
          >
            {GUIDE_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="diff">
            Difficulty
          </label>
          <select
            id="diff"
            className="input"
            value={draft.difficulty}
            onChange={(e) => set('difficulty', e.target.value as Difficulty)}
          >
            {DIFFICULTIES.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <label className="label" htmlFor="time">
        Time estimate
      </label>
      <input
        id="time"
        className="input mb-4"
        value={draft.timeEstimate}
        onChange={(e) => set('timeEstimate', e.target.value)}
        placeholder="e.g. 30–60 min"
      />

      <StringListEditor label="Tools" items={draft.tools} onChange={(v) => set('tools', v)} />
      <StringListEditor label="Materials" items={draft.materials} onChange={(v) => set('materials', v)} />
      <StringListEditor
        label="Safety"
        items={draft.safety}
        onChange={(v) => set('safety', v)}
        placeholder="Include a 'Stop and call a professional if…' item"
      />

      <label className="label" htmlFor="notes">
        Your house notes
      </label>
      <textarea
        id="notes"
        className="input mb-4 min-h-[80px] py-3"
        value={draft.houseNotes}
        onChange={(e) => set('houseNotes', e.target.value)}
        placeholder="House-specific pointers. Use [TODO: …] for details you still need."
      />

      <h3 className="label">Steps</h3>
      <ol className="space-y-3">
        {draft.steps.map((step, i) => (
          <li
            key={i}
            className={'card p-3 ' + (dragIndex === i ? 'ring-2 ring-accent' : '')}
            draggable
            onDragStart={() => setDragIndex(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragIndex !== null && dragIndex !== i) moveStep(dragIndex, i);
              setDragIndex(null);
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <GripVertical size={18} className="cursor-grab opacity-40" aria-hidden />
              <span className="text-sm font-bold opacity-60">Step {i + 1}</span>
              <div className="ml-auto flex gap-1">
                <button
                  className="btn-ghost min-w-touch px-2"
                  aria-label="Move step up"
                  onClick={() => moveStep(i, i - 1)}
                  disabled={i === 0}
                >
                  <ChevronUp size={18} />
                </button>
                <button
                  className="btn-ghost min-w-touch px-2"
                  aria-label="Move step down"
                  onClick={() => moveStep(i, i + 1)}
                  disabled={i === draft.steps.length - 1}
                >
                  <ChevronDown size={18} />
                </button>
                <button
                  className="btn-ghost min-w-touch px-2 text-[#a23c46]"
                  aria-label="Delete step"
                  onClick={() => removeStep(i)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <textarea
              className="input mb-2 min-h-[64px] py-2"
              value={step.text}
              onChange={(e) => setStep(i, { text: e.target.value })}
              placeholder="One clear action for this step"
            />
            <input
              className="input mb-2"
              value={step.note}
              onChange={(e) => setStep(i, { note: e.target.value })}
              placeholder="Optional note"
            />
            {step.photoIds.length > 0 && (
              <div className="mb-2 flex gap-2 overflow-x-auto">
                {step.photoIds.map((pid) => (
                  <div key={pid} className="relative shrink-0">
                    <Photo id={pid} thumb className="h-20 w-20 rounded-lg" />
                    <button
                      className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#a23c46] text-white"
                      aria-label="Remove photo"
                      onClick={() => {
                        void deletePhoto(pid);
                        setStep(i, { photoIds: step.photoIds.filter((p) => p !== pid) });
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <AddPhotoButtons
              compact
              onAdded={(pid) => setStep(i, { photoIds: [...step.photoIds, pid] })}
            />
          </li>
        ))}
      </ol>
      <button
        className="btn-secondary mt-3 w-full"
        onClick={() => set('steps', [...draft.steps, { text: '', note: '', photoIds: [] }])}
      >
        <Plus size={18} /> Add step
      </button>

      <div className="mt-4">
        <StringListEditor label="Tags" items={draft.tags} onChange={(v) => set('tags', v)} />
      </div>

      <div className="sticky bottom-24 mt-6 flex gap-2">
        <button className="btn-secondary flex-1" onClick={() => navigate(-1)}>
          Cancel
        </button>
        <button className="btn-primary flex-1" onClick={save}>
          Save guide
        </button>
      </div>
    </div>
  );
}

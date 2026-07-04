import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  AlertTriangle,
  Copy,
  Pencil,
  Play,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { useGuide } from '../hooks/data';
import { PageHeader } from '../components/PageHeader';
import { TodoText } from '../components/TodoText';
import { Photo } from '../components/Photo';
import { PhotoViewer } from '../components/PhotoViewer';
import { Confirm } from '../components/Confirm';
import { categoryAccent } from '../lib/categories';
import { deleteGuide } from '../db/mutations';
import { copyText } from '../lib/share';
import { useToast } from '../ui/Toast';

function Checklist({ title, items }: { title: string; items: string[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  if (items.length === 0) return null;
  return (
    <section className="mb-4">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide opacity-60">{title}</h3>
      <ul className="card divide-y divide-line dark:divide-slate-600">
        {items.map((item, i) => {
          const isChecked = checked.has(i);
          return (
            <li key={i}>
              <button
                className="flex min-h-touch w-full items-center gap-3 px-4 py-2.5 text-left"
                onClick={() =>
                  setChecked((prev) => {
                    const next = new Set(prev);
                    next.has(i) ? next.delete(i) : next.add(i);
                    return next;
                  })
                }
              >
                <span
                  className={
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 ' +
                    (isChecked
                      ? 'border-accent bg-accent text-white'
                      : 'border-line dark:border-slate-500')
                  }
                  aria-hidden
                >
                  {isChecked && '✓'}
                </span>
                <span className={isChecked ? 'line-through opacity-50' : ''}>{item}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function GuideView() {
  const { id } = useParams();
  const guide = useGuide(id);
  const navigate = useNavigate();
  const toast = useToast();
  const [viewPhoto, setViewPhoto] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (guide === undefined) return <p className="opacity-60">Loading…</p>;
  if (guide === null) return <p className="opacity-60">That guide was not found.</p>;

  const accent = categoryAccent(guide.category);

  const copyJson = async () => {
    const payload = {
      homeManual: 1,
      type: 'guide',
      guide: {
        id: guide.id,
        title: guide.title,
        category: guide.category,
        difficulty: guide.difficulty,
        timeEstimate: guide.timeEstimate,
        tools: guide.tools,
        materials: guide.materials,
        safety: guide.safety,
        houseNotes: guide.houseNotes,
        steps: guide.steps.map((s) => ({ text: s.text, note: s.note })),
        tags: guide.tags,
      },
    };
    const res = await copyText('```json\n' + JSON.stringify(payload, null, 2) + '\n```');
    toast.show(res === 'copied' ? 'Copied guide JSON' : 'Could not copy', res === 'copied' ? 'success' : 'error');
  };

  return (
    <div>
      <PageHeader title={guide.title} back />

      <div
        className="mb-4 flex flex-wrap gap-2 rounded-xl border-l-4 bg-surface p-3 dark:bg-slate-800"
        style={{ borderColor: accent }}
      >
        <span className="chip border-none px-0 text-sm opacity-80">{guide.category}</span>
        <span className="opacity-40">·</span>
        <span className="text-sm font-semibold">{guide.difficulty}</span>
        <span className="opacity-40">·</span>
        <span className="text-sm">{guide.timeEstimate}</span>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-2">
        <Link to={`/guide/${guide.id}/task`} className="btn-primary col-span-2 h-14 text-lg">
          <Play size={22} /> Start Task Mode
        </Link>
        <Link to={`/compose?intent=improve-guide&guide=${guide.id}`} className="btn-secondary">
          <Sparkles size={18} /> Improve
        </Link>
        <Link to={`/guide/${guide.id}/edit`} className="btn-secondary">
          <Pencil size={18} /> Edit
        </Link>
        <button className="btn-secondary" onClick={copyJson}>
          <Copy size={18} /> Copy JSON
        </button>
        <button className="btn-secondary text-[#a23c46]" onClick={() => setConfirmDelete(true)}>
          <Trash2 size={18} /> Delete
        </button>
      </div>

      {guide.safety.length > 0 && (
        <section className="mb-5 rounded-xl border border-amber/40 bg-amber-soft/60 p-4 dark:bg-amber-deep/30">
          <h3 className="mb-2 flex items-center gap-2 font-bold text-amber-deep dark:text-amber-soft">
            <AlertTriangle size={20} /> Safety
          </h3>
          <ul className="list-disc space-y-1.5 pl-5 text-amber-deep dark:text-amber-soft">
            {guide.safety.map((s, i) => (
              <li key={i}>
                <TodoText text={s} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {guide.houseNotes && (
        <section
          className="mb-5 rounded-xl border-l-4 bg-accent/5 p-4 dark:bg-accent/10"
          style={{ borderColor: accent }}
        >
          <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-accent">Your house</h3>
          <p className="leading-relaxed">
            <TodoText text={guide.houseNotes} />
          </p>
        </section>
      )}

      <Checklist title="Tools" items={guide.tools} />
      <Checklist title="Materials" items={guide.materials} />

      <section className="mb-6">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide opacity-60">
          Steps ({guide.steps.length})
        </h3>
        <ol className="space-y-2">
          {guide.steps.map((step, i) => (
            <li key={i} className="card p-3.5">
              <div className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="leading-relaxed">
                    <TodoText text={step.text} />
                  </p>
                  {step.note && (
                    <p className="mt-1 text-sm opacity-70">
                      <TodoText text={step.note} />
                    </p>
                  )}
                  {step.photoIds.length > 0 && (
                    <div className="mt-2 flex gap-2 overflow-x-auto">
                      {step.photoIds.map((pid) => (
                        <Photo
                          key={pid}
                          id={pid}
                          thumb
                          className="h-20 w-20 shrink-0 rounded-lg"
                          onClick={() => setViewPhoto(pid)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {viewPhoto && <PhotoViewer id={viewPhoto} onClose={() => setViewPhoto(null)} />}

      <Confirm
        open={confirmDelete}
        title="Delete this guide?"
        body="This removes the guide and its task progress from this device. This cannot be undone."
        confirmLabel="Delete guide"
        danger
        onCancel={() => setConfirmDelete(false)}
        onConfirm={async () => {
          await deleteGuide(guide.id);
          toast.show('Guide deleted', 'success');
          navigate('/');
        }}
      />
    </div>
  );
}

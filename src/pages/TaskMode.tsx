import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  List,
  Minus,
  Plus,
  RotateCcw,
  Square,
  X,
} from 'lucide-react';
import { useGuide, useProgress } from '../hooks/data';
import { useWakeLock } from '../hooks/useWakeLock';
import { getSetting, setSetting } from '../db/db';
import { resetProgress, updateProgress } from '../db/mutations';
import { TodoText } from '../components/TodoText';
import { Photo } from '../components/Photo';
import { PhotoViewer } from '../components/PhotoViewer';

const MIN_SIZE = 22;
const MAX_SIZE = 30;

export function TaskMode() {
  const { id } = useParams();
  const guide = useGuide(id);
  const savedProgress = useProgress(id);
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [listMode, setListMode] = useState(false);
  const [textSize, setTextSize] = useState(24);
  const [viewPhoto, setViewPhoto] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const wakeHeld = useWakeLock(true);

  // Hydrate from saved progress + persisted text size once.
  useEffect(() => {
    if (hydrated || savedProgress === undefined || guide === undefined) return;
    if (savedProgress) {
      setChecked(new Set(savedProgress.checkedSteps));
      setCurrent(Math.min(savedProgress.lastStep, (guide?.steps.length ?? 1) - 1));
    }
    getSetting<number>('taskTextSize', 24).then(setTextSize);
    setHydrated(true);
  }, [hydrated, savedProgress, guide]);

  const persist = useCallback(
    (next: { checked?: Set<number>; step?: number }) => {
      if (!id) return;
      void updateProgress(id, {
        checkedSteps: next.checked ? [...next.checked] : undefined,
        lastStep: next.step,
      });
    },
    [id],
  );

  const toggleStep = useCallback(
    (index: number) => {
      setChecked((prev) => {
        const next = new Set(prev);
        next.has(index) ? next.delete(index) : next.add(index);
        persist({ checked: next });
        return next;
      });
    },
    [persist],
  );

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, (guide?.steps.length ?? 1) - 1));
      setCurrent(clamped);
      persist({ step: clamped });
    },
    [guide, persist],
  );

  const changeSize = (delta: number) => {
    setTextSize((s) => {
      const next = Math.max(MIN_SIZE, Math.min(MAX_SIZE, s + delta));
      void setSetting('taskTextSize', next);
      return next;
    });
  };

  const steps = guide?.steps ?? [];
  const doneCount = useMemo(() => steps.filter((_, i) => checked.has(i)).length, [steps, checked]);
  const pct = steps.length ? Math.round((doneCount / steps.length) * 100) : 0;

  if (guide === undefined) return <div className="p-6 text-white">Loading…</div>;
  if (guide === null)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-slate-900 p-6 text-white">
        <p>That guide was not found.</p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Back to library
        </button>
      </div>
    );

  const step = steps[current];

  return (
    <div className="flex h-full flex-col bg-paper text-ink dark:bg-slate-900 dark:text-paper">
      {/* progress bar */}
      <div className="h-1.5 w-full bg-black/10 dark:bg-white/10">
        <div
          className="h-full bg-accent transition-[width]"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* top bar */}
      <div
        className="flex items-center gap-1 px-2 py-2"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 0.5rem)' }}
      >
        <button
          onClick={() => navigate(`/guide/${guide.id}`)}
          className="flex min-h-touch min-w-touch items-center justify-center rounded-xl"
          aria-label="Exit Task Mode"
        >
          <X size={26} />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{guide.title}</p>
          <p className="text-xs opacity-60">
            {doneCount}/{steps.length} done{wakeHeld ? ' · screen awake' : ''}
          </p>
        </div>
        <button
          onClick={() => changeSize(-2)}
          className="flex min-h-touch min-w-touch items-center justify-center rounded-xl"
          aria-label="Smaller text"
          disabled={textSize <= MIN_SIZE}
        >
          <Minus size={20} />
        </button>
        <button
          onClick={() => changeSize(2)}
          className="flex min-h-touch min-w-touch items-center justify-center rounded-xl"
          aria-label="Larger text"
          disabled={textSize >= MAX_SIZE}
        >
          <Plus size={20} />
        </button>
        <button
          onClick={() => setListMode((m) => !m)}
          className="flex min-h-touch min-w-touch items-center justify-center rounded-xl"
          aria-label={listMode ? 'One step per screen' : 'Scrolling list'}
          aria-pressed={listMode}
        >
          {listMode ? <Square size={20} /> : <List size={22} />}
        </button>
      </div>

      {listMode ? (
        <ListLayout
          steps={steps}
          checked={checked}
          textSize={textSize}
          onToggle={toggleStep}
          onPhoto={setViewPhoto}
          onReset={() => {
            setChecked(new Set());
            void resetProgress(guide.id);
          }}
        />
      ) : (
        <>
          {/* one step per screen */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <button
              onClick={() => toggleStep(current)}
              className="mx-auto flex min-h-full w-full max-w-xl flex-col items-start rounded-2xl border border-line bg-surface p-5 text-left dark:border-slate-600 dark:bg-slate-800"
            >
              <div className="mb-4 flex w-full items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-wide opacity-60">
                  Step {current + 1} of {steps.length}
                </span>
                <span
                  className={
                    'flex h-12 w-12 items-center justify-center rounded-xl border-2 ' +
                    (checked.has(current)
                      ? 'border-accent bg-accent text-white'
                      : 'border-line dark:border-slate-500')
                  }
                  aria-hidden
                >
                  {checked.has(current) && <Check size={28} />}
                </span>
              </div>
              <p
                className={'font-medium leading-snug ' + (checked.has(current) ? 'opacity-50' : '')}
                style={{ fontSize: `${textSize}px`, lineHeight: 1.35 }}
              >
                <TodoText text={step.text} />
              </p>
              {step.note && (
                <p className="mt-3 opacity-70" style={{ fontSize: `${textSize - 4}px` }}>
                  <TodoText text={step.note} />
                </p>
              )}
              {step.photoIds.length > 0 && (
                <div className="mt-4 flex w-full gap-2 overflow-x-auto">
                  {step.photoIds.map((pid) => (
                    <span key={pid} onClick={(e) => e.stopPropagation()}>
                      <Photo
                        id={pid}
                        thumb
                        className="h-28 w-28 shrink-0 rounded-xl"
                        onClick={() => setViewPhoto(pid)}
                      />
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-4 text-sm opacity-50">Tap anywhere to mark this step done.</p>
            </button>
          </div>

          {/* giant thumb-zone nav */}
          <div
            className="flex gap-3 border-t border-line px-4 pt-3 dark:border-slate-600"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.75rem)' }}
          >
            <button
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
              className="btn-secondary h-16 flex-1 text-lg disabled:opacity-40"
            >
              <ChevronLeft size={26} /> Previous
            </button>
            <button
              onClick={() => goTo(current + 1)}
              disabled={current === steps.length - 1}
              className="btn-primary h-16 flex-1 text-lg disabled:opacity-40"
            >
              Next <ChevronRight size={26} />
            </button>
          </div>
        </>
      )}

      {viewPhoto && <PhotoViewer id={viewPhoto} onClose={() => setViewPhoto(null)} />}
    </div>
  );
}

function ListLayout({
  steps,
  checked,
  textSize,
  onToggle,
  onPhoto,
  onReset,
}: {
  steps: { text: string; note: string; photoIds: string[] }[];
  checked: Set<number>;
  textSize: number;
  onToggle: (i: number) => void;
  onPhoto: (id: string) => void;
  onReset: () => void;
}) {
  return (
    <div
      className="flex-1 overflow-y-auto px-4 py-4"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)' }}
    >
      <ol className="mx-auto max-w-xl space-y-3">
        {steps.map((step, i) => (
          <li key={i}>
            <button
              onClick={() => onToggle(i)}
              className="flex w-full items-start gap-3 rounded-2xl border border-line bg-surface p-4 text-left dark:border-slate-600 dark:bg-slate-800"
            >
              <span
                className={
                  'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 ' +
                  (checked.has(i) ? 'border-accent bg-accent text-white' : 'border-line dark:border-slate-500')
                }
                aria-hidden
              >
                {checked.has(i) && <Check size={22} />}
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={'font-medium leading-snug ' + (checked.has(i) ? 'opacity-50' : '')}
                  style={{ fontSize: `${textSize}px`, lineHeight: 1.35 }}
                >
                  <span className="mr-1 opacity-50">{i + 1}.</span>
                  <TodoText text={step.text} />
                </p>
                {step.note && (
                  <p className="mt-2 opacity-70" style={{ fontSize: `${textSize - 5}px` }}>
                    <TodoText text={step.note} />
                  </p>
                )}
                {step.photoIds.length > 0 && (
                  <div className="mt-2 flex gap-2 overflow-x-auto">
                    {step.photoIds.map((pid) => (
                      <span key={pid} onClick={(e) => e.stopPropagation()}>
                        <Photo
                          id={pid}
                          thumb
                          className="h-24 w-24 shrink-0 rounded-lg"
                          onClick={() => onPhoto(pid)}
                        />
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </button>
          </li>
        ))}
      </ol>
      <button onClick={onReset} className="btn-ghost mx-auto mt-4 flex text-sm opacity-70">
        <RotateCcw size={16} /> Reset ticked steps
      </button>
    </div>
  );
}

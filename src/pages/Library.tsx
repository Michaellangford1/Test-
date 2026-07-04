import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlayCircle, Search, SlidersHorizontal, UserCog } from 'lucide-react';
import { useAllProgress, useGuides } from '../hooks/data';
import { GUIDE_CATEGORIES } from '../types/schema';
import { categoryAccent, hasTodo } from '../lib/categories';
import { PageHeader } from '../components/PageHeader';

export function Library() {
  const guides = useGuides();
  const progress = useAllProgress();
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const inProgress = useMemo(() => {
    if (!guides || !progress) return null;
    const active = progress
      .filter((p) => p.checkedSteps.length > 0)
      .sort((a, b) => b.updatedAt - a.updatedAt);
    for (const p of active) {
      const g = guides.find((x) => x.id === p.guideId);
      if (g) return { guide: g, progress: p };
    }
    return null;
  }, [guides, progress]);

  const filtered = useMemo(() => {
    if (!guides) return [];
    return activeCat ? guides.filter((g) => g.category === activeCat) : guides;
  }, [guides, activeCat]);

  if (!guides) return <p className="opacity-60">Loading…</p>;

  return (
    <div>
      <PageHeader
        title="House Manual"
        subtitle="Your offline DIY guides"
        actions={
          <Link to="/profile" className="btn-ghost min-w-touch px-2" aria-label="House profile">
            <UserCog size={24} />
          </Link>
        }
      />

      <button
        onClick={() => navigate('/search')}
        className="input mb-4 flex items-center gap-2 text-left text-ink/50 dark:text-paper/50"
      >
        <Search size={20} /> Search guides and reference…
      </button>

      {inProgress && (
        <Link
          to={`/guide/${inProgress.guide.id}/task`}
          className="card mb-5 block p-4"
          style={{ borderLeft: `4px solid ${categoryAccent(inProgress.guide.category)}` }}
        >
          <div className="flex items-center gap-3">
            <PlayCircle size={32} className="shrink-0 text-accent" aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide opacity-60">
                Continue task
              </p>
              <p className="truncate text-lg font-bold">{inProgress.guide.title}</p>
              <p className="text-sm opacity-70">
                {inProgress.progress.checkedSteps.length} of {inProgress.guide.steps.length} steps
                done
              </p>
            </div>
          </div>
        </Link>
      )}

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveCat(null)}
          className={
            'chip shrink-0 ' +
            (activeCat === null
              ? 'border-accent bg-accent text-white'
              : 'border-line dark:border-slate-600')
          }
        >
          <SlidersHorizontal size={16} /> All
        </button>
        {GUIDE_CATEGORIES.map((cat) => {
          const active = activeCat === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCat(active ? null : cat)}
              className={'chip shrink-0 ' + (active ? 'text-white' : '')}
              style={
                active
                  ? { backgroundColor: categoryAccent(cat), borderColor: categoryAccent(cat) }
                  : { borderColor: categoryAccent(cat), color: categoryAccent(cat) }
              }
            >
              {cat}
            </button>
          );
        })}
      </div>

      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide opacity-60">
        {activeCat ?? 'Recently updated'}
      </h2>
      <ul className="space-y-2">
        {filtered.map((g) => (
          <li key={g.id}>
            <Link
              to={`/guide/${g.id}`}
              className="card flex items-center gap-3 p-3.5"
              style={{ borderLeft: `4px solid ${categoryAccent(g.category)}` }}
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-bold leading-tight">{g.title}</p>
                <p className="mt-0.5 text-sm opacity-70">
                  {g.category} · {g.difficulty} · {g.timeEstimate}
                </p>
              </div>
              {(hasTodo(g.houseNotes) || g.steps.some((s) => hasTodo(s.text) || hasTodo(s.note))) && (
                <span
                  className="shrink-0 rounded-full bg-amber/20 px-2 py-0.5 text-xs font-semibold text-amber-deep dark:text-amber-soft"
                  title="Has unfilled house details"
                >
                  TODO
                </span>
              )}
            </Link>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="card p-6 text-center opacity-70">No guides in this category yet.</li>
        )}
      </ul>
    </div>
  );
}

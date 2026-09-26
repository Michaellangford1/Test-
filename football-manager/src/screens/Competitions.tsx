import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useWorld } from '../store/game';
import { leagueTable, resultFor } from '../game/table';
import type { Fixture, League, World } from '../game/types';
import { fmtShort } from '../game/dates';
import { ClubBadge, FormDots, RatingChip, Tabs, avgRating } from '../ui/components';

type Tab = 'table' | 'fixtures' | 'mine' | 'stats';

export default function Competitions() {
  const w = useWorld();
  const userLeague = w.clubs[w.manager.clubId].leagueId;
  const [leagueId, setLeagueId] = useState(userLeague);
  const [tab, setTab] = useState<Tab>('table');
  const lg = w.leagues.find((l) => l.id === leagueId)!;

  return (
    <div>
      <div className="p-3 pb-0 bg-ink-900">
        <select className="w-full font-bold" value={leagueId} onChange={(e) => setLeagueId(e.target.value)}>
          {w.leagues.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>
      </div>
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: 'table', label: 'Table' },
          { value: 'fixtures', label: 'Fixtures' },
          { value: 'mine', label: 'My Results' },
          { value: 'stats', label: 'Stats' },
        ]}
      />
      {tab === 'table' && <Table w={w} lg={lg} />}
      {tab === 'fixtures' && <Rounds w={w} lg={lg} />}
      {tab === 'mine' && <MyFixtures w={w} />}
      {tab === 'stats' && <LeagueStats w={w} lg={lg} />}
    </div>
  );
}

function zone(lg: League, pos: number, n: number): string {
  if (lg.tier === 1) {
    if (pos <= 4) return 'border-l-win';
    if (pos <= lg.europe + 1) return 'border-l-sky-400';
    if (lg.relegated && pos > n - lg.relegated) return 'border-l-loss';
    return 'border-l-transparent';
  }
  if (pos <= (lg.promotedAuto ?? 2)) return 'border-l-win';
  if (lg.playoffs && pos <= (lg.promotedAuto ?? 2) + 4) return 'border-l-sky-400';
  return 'border-l-transparent';
}

function Table({ w, lg }: { w: World; lg: League }) {
  const nav = useNavigate();
  const rows = leagueTable(w, lg.id);
  return (
    <div className="text-sm">
      <div className="flex items-center px-2 py-1.5 text-[11px] font-bold uppercase text-ink-300 bg-ink-850 border-b border-ink-700">
        <span className="w-6 text-center">#</span>
        <span className="flex-1 pl-9">Club</span>
        <span className="w-7 text-center">P</span>
        <span className="w-7 text-center">W</span>
        <span className="w-7 text-center">D</span>
        <span className="w-7 text-center">L</span>
        <span className="w-9 text-center">GD</span>
        <span className="w-9 text-center">Pts</span>
      </div>
      {rows.map((r, i) => {
        const c = w.clubs[r.clubId];
        const me = r.clubId === w.manager.clubId;
        return (
          <button
            key={r.clubId}
            className={`w-full flex items-center px-2 py-1.5 border-b border-ink-800 border-l-4 ${zone(lg, i + 1, rows.length)} ${me ? 'bg-ink-700/70 font-bold' : ''}`}
            onClick={() => nav(`/game/club/${c.id}`)}
          >
            <span className="w-6 text-center text-ink-300">{i + 1}</span>
            <ClubBadge club={c} size={24} />
            <span className="flex-1 text-left truncate pl-2">{c.name}</span>
            <span className="w-7 text-center tabular-nums">{r.p}</span>
            <span className="w-7 text-center tabular-nums text-ink-300">{r.w}</span>
            <span className="w-7 text-center tabular-nums text-ink-300">{r.d}</span>
            <span className="w-7 text-center tabular-nums text-ink-300">{r.l}</span>
            <span className="w-9 text-center tabular-nums">{r.gd > 0 ? `+${r.gd}` : r.gd}</span>
            <span className="w-9 text-center tabular-nums font-bold">{r.pts}</span>
          </button>
        );
      })}
      <div className="px-3 py-2 text-[11px] text-ink-400 flex flex-wrap gap-3">
        <span>
          <span className="inline-block w-2 h-2 bg-win mr-1" />
          {lg.tier === 1 ? 'Champions League' : 'Promotion'}
        </span>
        <span>
          <span className="inline-block w-2 h-2 bg-sky-400 mr-1" />
          {lg.tier === 1 ? 'Europe' : 'Play-offs'}
        </span>
        {lg.relegated && (
          <span>
            <span className="inline-block w-2 h-2 bg-loss mr-1" />
            Relegation
          </span>
        )}
      </div>
    </div>
  );
}

function FixtureRow({ w, f, showDate = false }: { w: World; f: Fixture; showDate?: boolean }) {
  const h = w.clubs[f.home];
  const a = w.clubs[f.away];
  const mine = f.home === w.manager.clubId || f.away === w.manager.clubId;
  return (
    <div className={`flex items-center gap-2 px-3 py-2 border-b border-ink-800 text-sm ${mine ? 'bg-ink-700/60' : ''}`}>
      {showDate && <span className="w-12 text-[11px] text-ink-300">{fmtShort(f.date)}</span>}
      <span className="flex-1 text-right truncate">{h.name}</span>
      <ClubBadge club={h} size={20} />
      <span className={`w-14 text-center font-bold tabular-nums ${f.played ? 'bg-ink-700 rounded' : 'text-ink-400 text-xs'}`}>
        {f.played ? `${f.hg} - ${f.ag}` : 'v'}
      </span>
      <ClubBadge club={a} size={20} />
      <span className="flex-1 truncate">{a.name}</span>
      {f.pens && <span className="text-[10px] text-ink-300">p{f.pens[0]}-{f.pens[1]}</span>}
    </div>
  );
}

function Rounds({ w, lg }: { w: World; lg: League }) {
  const fixtures = useMemo(() => w.fixtures.filter((f) => f.comp === lg.id || f.comp === `${lg.id}-po`), [w.fixtures, lg.id]);
  const rounds = useMemo(() => {
    const m = new Map<string, Fixture[]>();
    for (const f of fixtures) {
      const key = f.compType === 'playoff' ? `${f.label}` : `Matchday ${f.round}`;
      if (!m.has(key)) m.set(key, []);
      m.get(key)!.push(f);
    }
    return [...m.entries()];
  }, [fixtures]);
  const firstUnplayed = rounds.findIndex(([, fs]) => fs.some((f) => !f.played));
  const [idx, setIdx] = useState(Math.max(0, firstUnplayed === -1 ? rounds.length - 1 : firstUnplayed));
  if (!rounds.length) return <div className="p-4 text-ink-300 text-sm">No fixtures.</div>;
  const i = Math.min(idx, rounds.length - 1);
  const [label, fs] = rounds[i];
  return (
    <div>
      <div className="flex items-center justify-between px-2 py-1.5 bg-ink-850 border-b border-ink-700">
        <button className="btn-ghost !p-1" onClick={() => setIdx(Math.max(0, i - 1))} disabled={i === 0} aria-label="Previous round">
          <ChevronLeft size={20} />
        </button>
        <div className="text-center">
          <div className="font-bold text-sm">{label}</div>
          <div className="text-[11px] text-ink-300">{fmtShort(fs[0].date)}</div>
        </div>
        <button className="btn-ghost !p-1" onClick={() => setIdx(Math.min(rounds.length - 1, i + 1))} disabled={i === rounds.length - 1} aria-label="Next round">
          <ChevronRight size={20} />
        </button>
      </div>
      {fs.map((f) => (
        <FixtureRow key={f.id} w={w} f={f} />
      ))}
    </div>
  );
}

function MyFixtures({ w }: { w: World }) {
  const id = w.manager.clubId;
  const fs = w.fixtures.filter((f) => f.home === id || f.away === id);
  const results = fs.filter((f) => f.played).map((f) => resultFor(f, id)!);
  const wins = results.filter((r) => r === 'W').length;
  const draws = results.filter((r) => r === 'D').length;
  return (
    <div>
      <div className="px-3 py-2 text-sm bg-ink-850 border-b border-ink-700 flex items-center justify-between">
        <span>
          W{wins} D{draws} L{results.length - wins - draws}
        </span>
        <FormDots form={results.slice(-6)} />
      </div>
      {fs.map((f) => (
        <FixtureRow key={f.id} w={w} f={f} showDate />
      ))}
    </div>
  );
}

function LeagueStats({ w, lg }: { w: World; lg: League }) {
  const nav = useNavigate();
  const players = useMemo(() => Object.values(w.players).filter((p) => p.clubId != null && lg.clubIds.includes(p.clubId)), [w.players, lg.clubIds]);
  const scorers = [...players].filter((p) => p.stats.goals > 0).sort((a, b) => b.stats.goals - a.stats.goals || a.stats.apps - b.stats.apps).slice(0, 15);
  const assists = [...players].filter((p) => p.stats.assists > 0).sort((a, b) => b.stats.assists - a.stats.assists).slice(0, 10);
  const minApps = Math.max(3, Math.floor(leagueTable(w, lg.id)[0]?.p * 0.4 || 0));
  const rated = [...players].filter((p) => p.stats.apps >= minApps).sort((a, b) => (avgRating(b) ?? 0) - (avgRating(a) ?? 0)).slice(0, 10);
  const section = (title: string, list: typeof players, val: (p: (typeof players)[number]) => React.ReactNode) => (
    <div>
      <div className="panel-head">{title}</div>
      {list.length === 0 && <div className="p-3 text-sm text-ink-300">No data yet.</div>}
      {list.map((p, i) => (
        <button key={p.id} className="row-tap w-full text-left text-sm" onClick={() => nav(`/game/player/${p.id}`)}>
          <span className="w-5 text-ink-400">{i + 1}</span>
          <ClubBadge club={w.clubs[p.clubId!]} size={20} />
          <span className="flex-1 truncate">{p.name}</span>
          <span className="font-bold">{val(p)}</span>
        </button>
      ))}
    </div>
  );
  return (
    <div>
      {section('Top scorers', scorers, (p) => p.stats.goals)}
      {section('Assists', assists, (p) => p.stats.assists)}
      {section(`Average rating (min ${minApps} apps)`, rated, (p) => <RatingChip r={avgRating(p)} />)}
    </div>
  );
}

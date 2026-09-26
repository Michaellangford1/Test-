import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FastForward, Pause, Play, Shirt, SkipForward } from 'lucide-react';
import { useGame, useWorld } from '../store/game';
import type { MatchEngine, MatchEvent, SideState } from '../game/match/engine';
import type { Mentality, World } from '../game/types';
import { fmtDate } from '../game/dates';
import { validateLineup, repairLineup } from '../game/squad';
import { resultFor } from '../game/table';
import { positionRating } from '../game/attributes';
import { FORMATIONS } from '../game/formations';
import { ClubBadge, CondBar, FormDots, Panel, PosBadge, RatingChip, Segmented, Sheet, Tabs } from '../ui/components';

export default function MatchScreen() {
  const w = useWorld();
  const live = useGame((s) => s.live);
  const last = useGame((s) => s.lastMatch);
  const nav = useNavigate();

  useEffect(() => {
    if (w.pendingMatch == null && !live && !last) nav('/game/inbox', { replace: true });
  }, [w.pendingMatch, live, last, nav]);

  if (live) return <LiveMatch eng={live} />;
  if (last && w.pendingMatch == null) return <PostMatch eng={last} />;
  if (w.pendingMatch != null) return <PreMatch />;
  return null;
}

// ---------------------------------------------------------------------------

function PreMatch() {
  const w = useWorld();
  const nav = useNavigate();
  const mutate = useGame((s) => s.mutate);
  const startLive = useGame((s) => s.startLiveMatch);
  const quick = useGame((s) => s.quickMatch);
  const fx = w.fixtures.find((f) => f.id === w.pendingMatch)!;
  const club = w.clubs[w.manager.clubId];
  const oppId = fx.home === club.id ? fx.away : fx.home;
  const opp = w.clubs[oppId];
  const issues = validateLineup(w, club);
  const form = (id: number) =>
    w.fixtures
      .filter((f) => f.played && (f.home === id || f.away === id))
      .slice(-5)
      .map((f) => resultFor(f, id)!);
  const lg = w.leagues.find((l) => l.id === club.leagueId)!;

  return (
    <div className="h-full flex flex-col safe-top">
      <div className="bg-ink-900 border-b border-ink-700 p-4 text-center relative">
        <button className="btn-ghost !p-1 absolute left-2 top-2" onClick={() => nav('/game/inbox')} aria-label="Back">
          <ChevronLeft size={22} />
        </button>
        <div className="text-xs text-ink-300">
          {fx.label ?? lg.name} · {fmtDate(fx.date)}
        </div>
        <div className="flex items-center justify-center gap-4 mt-3">
          <TeamHead w={w} id={fx.home} />
          <div className="text-ink-400 font-black text-xl">v</div>
          <TeamHead w={w} id={fx.away} />
        </div>
        <div className="text-xs text-ink-400 mt-2">{fx.neutral ? 'Wembley Stadium' : w.clubs[fx.home].stadium}</div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <Panel title="Form guide">
          <div className="row">
            <span className="flex-1 truncate">{club.name}</span>
            <FormDots form={form(club.id)} />
          </div>
          <div className="row">
            <span className="flex-1 truncate">{opp.name}</span>
            <FormDots form={form(opp.id)} />
          </div>
        </Panel>
        {issues.length > 0 && (
          <div className="rounded-md bg-loss/15 border border-loss/50 p-3 text-sm space-y-2">
            <div className="font-bold">Team selection problems</div>
            {issues.slice(0, 4).map((i, k) => (
              <div key={k}>• {i}</div>
            ))}
            <button className="btn-secondary w-full" onClick={() => mutate((w) => repairLineup(w, w.clubs[club.id]))}>
              Let the assistant fix it
            </button>
          </div>
        )}
        <Panel title={`Your XI (${club.tactics.formation}, ${club.tactics.mentality})`} right={<button className="normal-case text-gold" onClick={() => nav('/game/tactics')}>Edit</button>}>
          {club.tactics.lineup.map((id, i) => {
            const p = id != null ? w.players[id] : null;
            if (!p) return null;
            return (
              <div key={i} className="row text-sm">
                <span className="w-6 text-right text-ink-400">{p.squadNo}</span>
                <PosBadge pos={FORMATIONS[club.tactics.formation]?.[i]?.pos ?? p.positions[0]} />
                <span className="flex-1 truncate">{p.name}</span>
                <CondBar value={p.condition} />
              </div>
            );
          })}
        </Panel>
      </div>
      <div className="p-3 grid grid-cols-2 gap-2 bg-ink-900 border-t border-ink-700 safe-bottom">
        <button className="btn-secondary !py-3" onClick={() => quick()}>
          <SkipForward size={16} /> Instant result
        </button>
        <button
          className="btn-primary !py-3"
          onClick={() => {
            if (issues.length) mutate((w) => repairLineup(w, w.clubs[club.id]), { save: false });
            startLive();
          }}
        >
          <Play size={16} /> Play match
        </button>
      </div>
    </div>
  );
}

function TeamHead({ w, id }: { w: World; id: number }) {
  const c = w.clubs[id];
  return (
    <div className="flex flex-col items-center gap-1 w-28">
      <ClubBadge club={c} size={48} />
      <div className="font-bold text-sm leading-tight">{c.name}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------

const SPEEDS = { slow: 900, normal: 380, fast: 120, turbo: 25 } as const;
type Speed = keyof typeof SPEEDS;

function LiveMatch({ eng }: { eng: MatchEngine }) {
  const w = useWorld();
  const finish = useGame((s) => s.finishLiveMatch);
  const [, force] = useState(0);
  const [running, setRunning] = useState(true);
  const [speed, setSpeed] = useState<Speed>('normal');
  const [tab, setTab] = useState<'comm' | 'stats' | 'ratings' | 'team'>('comm');
  const [flash, setFlash] = useState(0);
  const userSide: 0 | 1 = eng.sides[0].isUser ? 0 : 1;
  const lastLen = useRef(eng.events.length);

  useEffect(() => {
    if (!running || eng.finished) return;
    const t = setInterval(() => {
      const evs = eng.step();
      if (evs.some((e) => e.type === 'goal')) setFlash((f) => f + 1);
      if (evs.some((e) => e.type === 'halftime' || e.type === 'fulltime' || (e.type === 'period' && e.text.includes('extra time')))) setRunning(false);
      if (evs.some((e) => e.type === 'injury' && e.side === userSide) && speed !== 'turbo') setRunning(false);
      force((x) => x + 1);
    }, SPEEDS[speed]);
    return () => clearInterval(t);
  }, [running, speed, eng, userSide]);

  useEffect(() => {
    lastLen.current = eng.events.length;
  });

  const [h, a] = eng.sides;
  const poss = eng.possession();
  const minuteLabel = eng.finished ? 'FT' : eng.period === 1 && eng.minute > 45 ? `45+${eng.minute - 45}` : eng.period === 2 && eng.minute > 90 ? `90+${eng.minute - 90}` : `${eng.minute}'`;

  return (
    <div className="h-full flex flex-col safe-top bg-ink-950">
      <div key={flash} className={`bg-ink-900 border-b border-ink-700 px-3 pt-3 pb-2 ${flash ? 'goal-flash' : ''}`}>
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <ClubBadge club={w.clubs[h.clubId]} size={30} />
            <span className="font-bold truncate text-sm">{h.name}</span>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black tabular-nums tracking-wider">
              {h.goals}-{a.goals}
            </div>
            <div className="text-xs font-bold text-gold tabular-nums">{minuteLabel}</div>
          </div>
          <div className="flex-1 flex items-center gap-2 justify-end min-w-0">
            <span className="font-bold truncate text-sm text-right">{a.name}</span>
            <ClubBadge club={w.clubs[a.clubId]} size={30} />
          </div>
        </div>
        <Scorers eng={eng} />
        <MiniPitch eng={eng} />
        <div className="flex items-center justify-between mt-2 text-[11px] text-ink-300">
          <span>{poss[0]}%</span>
          <span>possession</span>
          <span>{poss[1]}%</span>
        </div>
      </div>

      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: 'comm', label: 'Commentary' },
          { value: 'stats', label: 'Stats' },
          { value: 'ratings', label: 'Ratings' },
          { value: 'team', label: 'My Team' },
        ]}
      />

      <div className="flex-1 overflow-y-auto scroll-thin">
        {tab === 'comm' && <Commentary eng={eng} />}
        {tab === 'stats' && <MatchStats eng={eng} />}
        {tab === 'ratings' && <Ratings eng={eng} w={w} />}
        {tab === 'team' && <TeamControl eng={eng} side={userSide} onChange={() => force((x) => x + 1)} />}
      </div>

      <div className="bg-ink-900 border-t border-ink-700 p-2 safe-bottom">
        {eng.finished ? (
          <button className="btn-primary w-full !py-3" onClick={finish}>
            Full time: see match report
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button className="btn-primary !px-4 !py-2.5" onClick={() => setRunning((r) => !r)} aria-label={running ? 'Pause' : 'Play'}>
              {running ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <div className="flex-1">
              <Segmented<Speed>
                small
                value={speed}
                onChange={setSpeed}
                options={[
                  { value: 'slow', label: 'Slow' },
                  { value: 'normal', label: 'Normal' },
                  { value: 'fast', label: 'Fast' },
                  { value: 'turbo', label: 'Turbo' },
                ]}
              />
            </div>
            <button
              className="btn-secondary !px-3 !py-2.5"
              aria-label="Skip to end"
              onClick={() => {
                eng.simulateToEnd();
                force((x) => x + 1);
              }}
            >
              <FastForward size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Scorers({ eng }: { eng: MatchEngine }) {
  const w = useWorld();
  const goals = eng.fx.goals;
  if (!goals.length) return null;
  const list = (side: 0 | 1) =>
    goals
      .filter((g) => g.side === side)
      .map((g) => `${w.players[g.playerId]?.short ?? '?'} ${g.minute}'${g.pen ? ' (p)' : ''}`)
      .join(', ');
  return (
    <div className="flex justify-between gap-4 text-[11px] text-ink-300 mt-1">
      <span className="flex-1 truncate">{list(0)}</span>
      <span className="flex-1 truncate text-right">{list(1)}</span>
    </div>
  );
}

function MiniPitch({ eng }: { eng: MatchEngine }) {
  const [h, a] = eng.sides;
  return (
    <div className="relative mt-2 h-7 rounded bg-pitch-600 border border-white/30 overflow-hidden">
      <div className="absolute left-1/2 top-0 bottom-0 border-l border-white/40" />
      <div className="absolute left-0 top-1/4 bottom-1/4 w-[8%] border border-l-0 border-white/40" />
      <div className="absolute right-0 top-1/4 bottom-1/4 w-[8%] border border-r-0 border-white/40" />
      <div className="absolute top-0 bottom-0 w-1 left-0" style={{ background: h.colors[0] }} />
      <div className="absolute top-0 bottom-0 w-1 right-0" style={{ background: a.colors[0] }} />
      <div
        className="absolute top-1/2 w-3 h-3 -mt-1.5 -ml-1.5 rounded-full bg-white shadow transition-all duration-300"
        style={{ left: `${Math.max(3, Math.min(97, eng.zone))}%` }}
      />
    </div>
  );
}

function eventClass(e: MatchEvent): string {
  switch (e.type) {
    case 'goal':
      return 'text-gold font-black';
    case 'red':
      return 'text-loss font-bold';
    case 'yellow':
      return 'text-yellow-300';
    case 'injury':
      return 'text-orange-300 font-bold';
    case 'halftime':
    case 'fulltime':
    case 'period':
    case 'kickoff':
      return 'text-white font-bold';
    case 'penalty':
      return 'text-white font-bold';
    case 'sub':
    case 'tactic':
      return 'text-sky-300';
    case 'save':
    case 'miss':
    case 'woodwork':
    case 'chance':
      return 'text-ink-100';
    default:
      return 'text-ink-300';
  }
}

function Commentary({ eng }: { eng: MatchEngine }) {
  const evs = eng.events.slice(-80).reverse();
  return (
    <div className="divide-y divide-ink-850">
      {evs.map((e, i) => (
        <div key={eng.events.length - i} className={`flex gap-2 px-3 py-1.5 text-[13px] ${e.type === 'goal' ? 'bg-gold/10' : ''}`}>
          <span className="w-8 shrink-0 text-right text-ink-400 tabular-nums">{e.minute}'</span>
          {e.side !== -1 && <span className="w-1 shrink-0 rounded" style={{ background: eng.sides[e.side].colors[0] }} />}
          <span className={eventClass(e)}>{e.text}</span>
        </div>
      ))}
    </div>
  );
}

function MatchStats({ eng }: { eng: MatchEngine }) {
  const [h, a] = eng.sides;
  const poss = eng.possession();
  const rows: [string, number | string, number | string][] = [
    ['Possession', `${poss[0]}%`, `${poss[1]}%`],
    ['Shots', h.shots, a.shots],
    ['On target', h.onTarget, a.onTarget],
    ['Expected goals', h.xg.toFixed(2), a.xg.toFixed(2)],
    ['Corners', h.corners, a.corners],
    ['Fouls', h.fouls, a.fouls],
    ['Offsides', h.offsides, a.offsides],
    ['Yellow cards', Object.values(h.yellows).reduce((s, x) => s + Math.min(1, x), 0), Object.values(a.yellows).reduce((s, x) => s + Math.min(1, x), 0)],
    ['Red cards', h.reds.length, a.reds.length],
  ];
  return (
    <div className="p-3">
      <div className="flex justify-between font-bold text-sm mb-2">
        <span>{h.short}</span>
        <span>{a.short}</span>
      </div>
      {rows.map(([l, x, y]) => {
        const nx = parseFloat(String(x));
        const ny = parseFloat(String(y));
        const tot = nx + ny || 1;
        return (
          <div key={l} className="mb-2.5">
            <div className="flex justify-between text-sm">
              <span className="font-bold tabular-nums">{x}</span>
              <span className="text-ink-300 text-xs">{l}</span>
              <span className="font-bold tabular-nums">{y}</span>
            </div>
            <div className="flex h-1.5 mt-1 rounded overflow-hidden bg-ink-700">
              <div style={{ width: `${(nx / tot) * 100}%`, background: h.colors[0] }} />
              <div style={{ width: `${(ny / tot) * 100}%`, background: a.colors[0] === h.colors[0] ? a.colors[1] : a.colors[0] }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function sideRows(side: SideState, w: World) {
  return side.appeared.map((id) => {
    const p = w.players[id];
    const on = side.onPitch.find((o) => o.id === id);
    return { id, p, on, r: side.ratings[id], off: side.left[id] != null, g: side.goalsBy[id] ?? 0, as: side.assistsBy[id] ?? 0 };
  });
}

function Ratings({ eng, w }: { eng: MatchEngine; w: World }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      {eng.sides.map((s, i) => (
        <div key={i}>
          <div className="panel-head">{s.name}</div>
          {sideRows(s, w).map((r) => (
            <div key={r.id} className={`row text-sm ${r.off ? 'opacity-50' : ''}`}>
              {r.on ? <PosBadge pos={r.on.pos} /> : <span className="chip bg-ink-700 min-w-[34px] justify-center">OFF</span>}
              <span className="flex-1 truncate">
                {r.p.short}
                {r.g > 0 && ' ⚽'.repeat(r.g)}
                {s.yellows[r.id] ? ' 🟨' : ''}
                {s.reds.includes(r.id) ? ' 🟥' : ''}
              </span>
              <CondBar value={s.cond[r.id] ?? 100} />
              <RatingChip r={Math.round((r.r ?? 6.6) * 10) / 10} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function TeamControl({ eng, side, onChange }: { eng: MatchEngine; side: 0 | 1; onChange: () => void }) {
  const w = useWorld();
  const s = eng.sides[side];
  const [subOff, setSubOff] = useState<number | null>(null);
  const bench = s.bench.map((id) => w.players[id]);
  const offPos = subOff != null ? s.onPitch.find((o) => o.id === subOff)?.pos : undefined;
  const benchSorted = useMemo(() => (offPos ? [...bench].sort((a, b) => positionRating(b, offPos) - positionRating(a, offPos)) : bench), [bench, offPos]);

  return (
    <div className="p-3 space-y-3">
      <Panel title="Mentality">
        <div className="p-2">
          <Segmented<Mentality>
            small
            value={s.mentality}
            onChange={(v) => {
              eng.setMentality(side, v);
              onChange();
            }}
            options={[
              { value: 'defensive', label: 'Defend' },
              { value: 'cautious', label: 'Cautious' },
              { value: 'balanced', label: 'Balanced' },
              { value: 'attacking', label: 'Attack' },
              { value: 'all-out', label: 'All-out' },
            ]}
          />
        </div>
        <div className="px-2 pb-2 grid grid-cols-2 gap-2">
          <Segmented
            small
            value={s.pressing}
            onChange={(v) => {
              eng.setInstruction(side, 'pressing', v);
              onChange();
            }}
            options={[
              { value: 'low', label: 'Sit' },
              { value: 'normal', label: 'Press' },
              { value: 'high', label: 'High' },
            ]}
          />
          <Segmented
            small
            value={s.passing}
            onChange={(v) => {
              eng.setInstruction(side, 'passing', v);
              onChange();
            }}
            options={[
              { value: 'short', label: 'Short' },
              { value: 'mixed', label: 'Mixed' },
              { value: 'direct', label: 'Direct' },
            ]}
          />
        </div>
        <label className="flex items-center gap-2 px-3 pb-3 text-sm">
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={s.autoSubs}
            onChange={(e) => {
              s.autoSubs = e.target.checked;
              onChange();
            }}
          />
          Let my assistant make substitutions
        </label>
      </Panel>

      <Panel title={`On the pitch · subs used ${s.subsMade}/5`}>
        {s.onPitch.map((o) => {
          const p = w.players[o.id];
          return (
            <button key={o.id} className="row-tap w-full text-left" onClick={() => setSubOff(o.id)} disabled={s.subsMade >= 5 || eng.finished}>
              <PosBadge pos={o.pos} />
              <span className="flex-1 truncate">
                {p.short}
                {s.yellows[o.id] ? ' 🟨' : ''}
                {s.injured.includes(o.id) ? ' 🚑' : ''}
              </span>
              <CondBar value={s.cond[o.id] ?? 100} />
              <RatingChip r={Math.round((s.ratings[o.id] ?? 6.6) * 10) / 10} />
            </button>
          );
        })}
        <div className="px-3 py-2 text-[11px] text-ink-400 flex items-center gap-1">
          <Shirt size={12} /> Tap a player to substitute him.
        </div>
      </Panel>

      <Sheet open={subOff != null} onClose={() => setSubOff(null)} title={subOff != null ? `Replace ${w.players[subOff].short}` : ''}>
        {benchSorted.length === 0 && <div className="p-4 text-ink-300 text-sm">No substitutes left on the bench.</div>}
        {benchSorted.map((p) => (
          <button
            key={p.id}
            className="row-tap w-full text-left"
            onClick={() => {
              if (subOff != null) eng.substitute(side, subOff, p.id);
              setSubOff(null);
              onChange();
            }}
          >
            <PosBadge pos={p.positions[0]} />
            <span className="flex-1 truncate">{p.name}</span>
            <CondBar value={p.condition} />
            {offPos && <span className="w-8 text-right font-bold text-sm">{Math.round(positionRating(p, offPos))}</span>}
          </button>
        ))}
      </Sheet>
    </div>
  );
}

// ---------------------------------------------------------------------------

function PostMatch({ eng }: { eng: MatchEngine }) {
  const w = useWorld();
  const nav = useNavigate();
  const clear = useGame((s) => s.clearLastMatch);
  const [h, a] = eng.sides;
  const motm = eng.motm();
  const fx = eng.fx;
  const others = w.fixtures.filter((f) => f.date === fx.date && f.id !== fx.id && f.comp === fx.comp && f.played);
  const [tab, setTab] = useState<'report' | 'stats' | 'ratings' | 'results'>('report');

  const done = () => {
    clear();
    nav('/game/inbox', { replace: true });
  };

  return (
    <div className="h-full flex flex-col safe-top">
      <div className="bg-ink-900 border-b border-ink-700 p-4">
        <div className="text-center text-xs text-ink-300 font-bold uppercase">Full time{fx.aet ? ' (aet)' : ''}</div>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 flex flex-col items-center gap-1 min-w-0">
            <ClubBadge club={w.clubs[h.clubId]} size={40} />
            <span className="font-bold text-sm text-center truncate max-w-full">{h.name}</span>
          </div>
          <div className="text-4xl font-black tabular-nums">
            {h.goals}-{a.goals}
          </div>
          <div className="flex-1 flex flex-col items-center gap-1 min-w-0">
            <ClubBadge club={w.clubs[a.clubId]} size={40} />
            <span className="font-bold text-sm text-center truncate max-w-full">{a.name}</span>
          </div>
        </div>
        {eng.pens && <div className="text-center text-sm text-gold mt-1">Penalties {eng.pens[0]}-{eng.pens[1]}</div>}
        <Scorers eng={eng} />
      </div>
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: 'report', label: 'Report' },
          { value: 'stats', label: 'Stats' },
          { value: 'ratings', label: 'Ratings' },
          { value: 'results', label: 'Other results' },
        ]}
      />
      <div className="flex-1 overflow-y-auto scroll-thin">
        {tab === 'report' && (
          <div className="p-3 space-y-3">
            {motm && (
              <Panel title="Man of the match">
                <div className="row">
                  <span className="flex-1 font-bold">
                    {w.players[motm.id]?.name} <span className="text-ink-300 font-normal">({eng.sides[motm.side].short})</span>
                  </span>
                  <RatingChip r={eng.sides[motm.side].ratings[motm.id]} />
                </div>
              </Panel>
            )}
            <Panel title="Key moments">
              {eng.events
                .filter((e) => ['goal', 'red', 'injury', 'penalty', 'sub', 'halftime', 'fulltime'].includes(e.type))
                .map((e, i) => (
                  <div key={i} className="flex gap-2 px-3 py-1.5 text-[13px] border-b border-ink-800">
                    <span className="w-8 text-right text-ink-400">{e.minute}'</span>
                    <span className={eventClass(e)}>{e.text}</span>
                  </div>
                ))}
            </Panel>
            {fx.attendance && <div className="text-center text-xs text-ink-400">Attendance: {fx.attendance.toLocaleString()}</div>}
          </div>
        )}
        {tab === 'stats' && <MatchStats eng={eng} />}
        {tab === 'ratings' && <Ratings eng={eng} w={w} />}
        {tab === 'results' && (
          <div>
            {others.length === 0 && <div className="p-4 text-sm text-ink-300">No other matches in this competition today.</div>}
            {others.map((f) => (
              <div key={f.id} className="flex items-center gap-2 px-3 py-2 border-b border-ink-800 text-sm">
                <span className="flex-1 text-right truncate">{w.clubs[f.home].name}</span>
                <span className="w-12 text-center font-bold bg-ink-700 rounded">
                  {f.hg}-{f.ag}
                </span>
                <span className="flex-1 truncate">{w.clubs[f.away].name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-3 bg-ink-900 border-t border-ink-700 safe-bottom">
        <button className="btn-primary w-full !py-3" onClick={done}>
          Continue
        </button>
      </div>
    </div>
  );
}

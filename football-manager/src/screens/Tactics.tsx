import { useMemo, useState } from 'react';
import { AlertTriangle, Wand2, X } from 'lucide-react';
import { useGame, useWorld } from '../store/game';
import { FORMATIONS, FORMATION_NAMES } from '../game/formations';
import { autoPick, getSquad, isAvailable, validateLineup } from '../game/squad';
import { positionRating } from '../game/attributes';
import type { Club, Mentality, Passing, Player, Pos, Pressing, Tempo, World } from '../game/types';
import { CondBar, Panel, PlayerStatusIcons, PosBadge, Segmented, Sheet } from '../ui/components';

export default function TacticsScreen() {
  const w = useWorld();
  const mutate = useGame((s) => s.mutate);
  const club = w.clubs[w.manager.clubId];
  const t = club.tactics;
  const slots = FORMATIONS[t.formation];
  const [pick, setPick] = useState<{ kind: 'slot'; index: number } | { kind: 'bench' } | null>(null);
  const issues = validateLineup(w, club);

  const setT = (fn: (c: Club) => void) => mutate((w) => fn(w.clubs[club.id]));

  const changeFormation = (f: string) =>
    setT((c) => {
      // keep players, re-seat them by suitability
      const current = c.tactics.lineup.filter((x): x is number => x != null);
      c.tactics.formation = f;
      const newSlots = FORMATIONS[f];
      const lineup: (number | null)[] = new Array(newSlots.length).fill(null);
      const left = new Set(current);
      const pairs: { s: number; id: number; i: number }[] = [];
      for (const id of current) newSlots.forEach((sl, i) => pairs.push({ s: positionRating(w.players[id], sl.pos), id, i }));
      pairs.sort((a, b) => b.s - a.s);
      for (const pr of pairs) {
        if (lineup[pr.i] != null || !left.has(pr.id)) continue;
        lineup[pr.i] = pr.id;
        left.delete(pr.id);
      }
      c.tactics.lineup = lineup;
      c.tactics.subs = [...left, ...c.tactics.subs].slice(0, 9);
    });

  const assistant = () =>
    setT((c) => {
      const p = autoPick(w, c);
      c.tactics.lineup = p.lineup;
      c.tactics.subs = p.subs;
    });

  return (
    <div className="p-3 space-y-3">
      <div className="flex gap-2">
        <select className="flex-1 font-bold" value={t.formation} onChange={(e) => changeFormation(e.target.value)}>
          {FORMATION_NAMES.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <button className="btn-secondary" onClick={assistant}>
          <Wand2 size={16} /> Assistant pick
        </button>
      </div>

      {issues.length > 0 && (
        <div className="rounded-md bg-loss/15 border border-loss/50 p-2 text-sm space-y-0.5">
          {issues.slice(0, 4).map((i, k) => (
            <div key={k} className="flex items-center gap-2">
              <AlertTriangle size={14} className="text-loss shrink-0" /> {i}
            </div>
          ))}
        </div>
      )}

      <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-lg overflow-hidden border-2 border-white/30 bg-pitch-600">
        <PitchMarkings />
        {slots.map((sl, i) => {
          const id = t.lineup[i];
          const p = id != null ? w.players[id] : null;
          const fit = p ? positionRating(p, sl.pos) / Math.max(1, p.ability) : 0;
          const ring = !p ? 'border-white/40 border-dashed' : fit >= 0.99 ? 'border-win' : fit >= 0.9 ? 'border-yellow-300' : 'border-loss';
          return (
            <button
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-[22%]"
              style={{ left: `${sl.x}%`, top: `${100 - sl.y * 0.92 - 4}%` }}
              onClick={() => setPick({ kind: 'slot', index: i })}
            >
              <span
                className={`w-9 h-9 rounded-full border-2 ${ring} flex items-center justify-center text-sm font-black shadow`}
                style={{ background: p ? club.colors[0] : 'rgba(0,0,0,.25)', color: club.colors[1], textShadow: '0 1px 2px rgba(0,0,0,.7)' }}
              >
                {p ? p.squadNo : '+'}
              </span>
              <span className="mt-0.5 max-w-full truncate text-[11px] font-bold bg-black/55 rounded px-1 leading-4">{p ? p.short : sl.pos}</span>
              {p && (p.injury || p.suspended > 0 || p.condition < 80) && (
                <span className={`text-[9px] font-bold rounded px-1 ${p.injury || p.suspended > 0 ? 'bg-loss' : 'bg-orange-500'}`}>
                  {p.injury ? 'INJ' : p.suspended > 0 ? 'SUS' : `${Math.round(p.condition)}%`}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <Panel title={`Substitutes (${t.subs.length}/9)`} right={<button className="normal-case text-gold" onClick={() => setPick({ kind: 'bench' })}>+ Add</button>}>
        {t.subs.length === 0 && <div className="p-3 text-sm text-ink-300">No substitutes selected.</div>}
        {t.subs.map((id) => {
          const p = w.players[id];
          if (!p) return null;
          return (
            <div key={id} className="row">
              <PosBadge pos={p.positions[0]} />
              <span className="flex-1 truncate">{p.name}</span>
              <PlayerStatusIcons p={p} />
              <CondBar value={p.condition} />
              <button className="btn-ghost !p-1" aria-label="Remove" onClick={() => setT((c) => (c.tactics.subs = c.tactics.subs.filter((x) => x !== id)))}>
                <X size={16} />
              </button>
            </div>
          );
        })}
      </Panel>

      <Panel title="Team instructions">
        <div className="p-3 space-y-3">
          <Instr label="Mentality">
            <Segmented<Mentality>
              small
              value={t.mentality}
              onChange={(v) => setT((c) => (c.tactics.mentality = v))}
              options={[
                { value: 'defensive', label: 'Defend' },
                { value: 'cautious', label: 'Cautious' },
                { value: 'balanced', label: 'Balanced' },
                { value: 'attacking', label: 'Attack' },
                { value: 'all-out', label: 'All-out' },
              ]}
            />
          </Instr>
          <Instr label="Passing">
            <Segmented<Passing>
              small
              value={t.passing}
              onChange={(v) => setT((c) => (c.tactics.passing = v))}
              options={[
                { value: 'short', label: 'Short' },
                { value: 'mixed', label: 'Mixed' },
                { value: 'direct', label: 'Direct' },
              ]}
            />
          </Instr>
          <Instr label="Pressing">
            <Segmented<Pressing>
              small
              value={t.pressing}
              onChange={(v) => setT((c) => (c.tactics.pressing = v))}
              options={[
                { value: 'low', label: 'Stand off' },
                { value: 'normal', label: 'Normal' },
                { value: 'high', label: 'Press high' },
              ]}
            />
          </Instr>
          <Instr label="Tempo">
            <Segmented<Tempo>
              small
              value={t.tempo}
              onChange={(v) => setT((c) => (c.tactics.tempo = v))}
              options={[
                { value: 'slow', label: 'Patient' },
                { value: 'normal', label: 'Normal' },
                { value: 'fast', label: 'Quick' },
              ]}
            />
          </Instr>
        </div>
      </Panel>

      <Panel title="Set pieces & captain">
        <RoleRow w={w} label="Captain" id={t.captain} />
        <RoleRow w={w} label="Penalties" id={t.penaltyTaker} fallback="Best available" />
        <RoleRow w={w} label="Free kicks" id={t.freeKickTaker} fallback="Best available" />
        <div className="px-3 py-2 text-[11px] text-ink-400">Set roles from a player's profile.</div>
      </Panel>

      {pick && <PickSheet w={w} club={club} pick={pick} onClose={() => setPick(null)} />}
    </div>
  );
}

function Instr({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase font-bold text-ink-300 mb-1">{label}</div>
      {children}
    </div>
  );
}

function RoleRow({ w, label, id, fallback = '-' }: { w: World; label: string; id: number | null; fallback?: string }) {
  const p = id != null ? w.players[id] : null;
  return (
    <div className="row text-sm">
      <span className="flex-1 text-ink-300">{label}</span>
      <b>{p && p.clubId === w.manager.clubId ? p.name : fallback}</b>
    </div>
  );
}

function PitchMarkings() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 10%, transparent 10% 20%)' }} />
      <div className="absolute left-0 right-0 top-1/2 border-t-2 border-white/30" />
      <div className="absolute left-1/2 top-1/2 w-[28%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/30" />
      <div className="absolute left-1/2 top-0 w-[56%] h-[15%] -translate-x-1/2 border-2 border-t-0 border-white/30" />
      <div className="absolute left-1/2 bottom-0 w-[56%] h-[15%] -translate-x-1/2 border-2 border-b-0 border-white/30" />
    </div>
  );
}

function PickSheet({ w, club, pick, onClose }: { w: World; club: Club; pick: { kind: 'slot'; index: number } | { kind: 'bench' }; onClose: () => void }) {
  const mutate = useGame((s) => s.mutate);
  const t = club.tactics;
  const pos: Pos | null = pick.kind === 'slot' ? FORMATIONS[t.formation][pick.index].pos : null;
  const squad = getSquad(w, club.id);
  const list = useMemo(() => {
    const arr = squad.map((p) => ({ p, r: pos ? positionRating(p, pos) : p.ability }));
    arr.sort((a, b) => Number(isAvailable(b.p)) - Number(isAvailable(a.p)) || b.r - a.r);
    return arr;
  }, [squad, pos]);
  const where = (p: Player) => {
    const i = t.lineup.indexOf(p.id);
    if (i >= 0) return FORMATIONS[t.formation][i].pos;
    if (t.subs.includes(p.id)) return 'SUB';
    return '';
  };

  const choose = (p: Player) => {
    mutate((w) => {
      const tc = w.clubs[club.id].tactics;
      if (pick.kind === 'bench') {
        if (tc.subs.includes(p.id)) return;
        const li = tc.lineup.indexOf(p.id);
        if (li >= 0) tc.lineup[li] = null;
        tc.subs = [...tc.subs, p.id].slice(0, 9);
        return;
      }
      const target = pick.index;
      const current = tc.lineup[target];
      const li = tc.lineup.indexOf(p.id);
      const si = tc.subs.indexOf(p.id);
      if (li >= 0) {
        tc.lineup[li] = current; // swap positions
      } else if (si >= 0) {
        if (current != null) tc.subs[si] = current;
        else tc.subs.splice(si, 1);
      }
      tc.lineup[target] = p.id;
    });
    onClose();
  };

  return (
    <Sheet open onClose={onClose} title={pos ? `Select ${pos}` : 'Add substitute'}>
      {pick.kind === 'slot' && t.lineup[pick.index] != null && (
        <button
          className="row-tap w-full text-left text-loss font-bold"
          onClick={() => {
            mutate((w) => (w.clubs[club.id].tactics.lineup[pick.index] = null));
            onClose();
          }}
        >
          Clear this position
        </button>
      )}
      {list.map(({ p, r }) => (
        <button key={p.id} className={`row-tap w-full text-left ${!isAvailable(p) ? 'opacity-50' : ''}`} onClick={() => choose(p)}>
          <PosBadge pos={p.positions[0]} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate">{p.name}</span>
              <PlayerStatusIcons p={p} />
            </div>
            <div className="text-[11px] text-ink-300">
              {p.positions.join(', ')} {where(p) && <span className="text-gold">· {where(p)}</span>}
            </div>
          </div>
          <CondBar value={p.condition} />
          <span className="w-8 text-right font-bold tabular-nums text-sm">{Math.round(r)}</span>
        </button>
      ))}
    </Sheet>
  );
}

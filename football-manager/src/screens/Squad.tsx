import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorld } from '../store/game';
import { getSquad } from '../game/squad';
import type { Player, World } from '../game/types';
import { posGroup } from '../game/attributes';
import { fmtMoney, clubWageBill } from '../game/valuation';
import { avgRating, CondBar, PlayerStatusIcons, PosBadge, RatingChip, Segmented, Stars } from '../ui/components';
import { abilityStars } from '../game/progression';

type View = 'general' | 'contract' | 'stats';

const ORDER: Record<string, number> = { GK: 0, CB: 1, FB: 2, DM: 3, CM: 4, WM: 5, AM: 6, W: 7, ST: 8 };
const SECTIONS: [string, string[]][] = [
  ['Goalkeepers', ['GK']],
  ['Defenders', ['CB', 'FB']],
  ['Midfielders', ['DM', 'CM', 'WM', 'AM']],
  ['Forwards', ['W', 'ST']],
];

export default function Squad() {
  const w = useWorld();
  const [view, setView] = useState<View>('general');
  const club = w.clubs[w.manager.clubId];
  const squad = getSquad(w, club.id);
  const lineup = new Set(club.tactics.lineup);

  return (
    <div>
      <div className="p-3 pb-2 space-y-2 bg-ink-900 border-b border-ink-800 sticky top-0 z-10">
        <div className="flex items-center justify-between text-xs text-ink-300">
          <span>
            {squad.length} players · Wages {fmtMoney(clubWageBill(w, club))}/wk
          </span>
          <span>
            {squad.filter((p) => p.injury).length} injured · {squad.filter((p) => p.suspended > 0).length} suspended
          </span>
        </div>
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: 'general', label: 'General' },
            { value: 'contract', label: 'Contracts' },
            { value: 'stats', label: 'Stats' },
          ]}
        />
      </div>
      {SECTIONS.map(([title, groups]) => {
        const list = squad
          .filter((p) => groups.includes(posGroup(p.positions[0])))
          .sort((a, b) => ORDER[posGroup(a.positions[0])] - ORDER[posGroup(b.positions[0])] || b.ability - a.ability);
        if (!list.length) return null;
        return (
          <div key={title}>
            <div className="panel-head">{title}</div>
            {list.map((p) => (
              <PlayerRow key={p.id} p={p} w={w} view={view} starter={lineup.has(p.id)} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function PlayerRow({ p, w, view, starter }: { p: Player; w: World; view: View; starter: boolean }) {
  const nav = useNavigate();
  const avg = avgRating(p);
  return (
    <button className="row-tap w-full text-left" onClick={() => nav(`/game/player/${p.id}`)}>
      <span className={`w-6 text-right text-xs tabular-nums ${starter ? 'text-gold font-bold' : 'text-ink-400'}`}>{p.squadNo}</span>
      <PosBadge pos={p.positions[0]} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className={`truncate ${starter ? 'font-bold' : ''}`}>{p.name}</span>
          <PlayerStatusIcons p={p} />
        </div>
        {view === 'general' && (
          <div className="flex items-center gap-2 text-[11px] text-ink-300">
            <span>{p.age}y</span>
            <span>{p.nat}</span>
            <Stars value={abilityStars(p)} size={10} />
          </div>
        )}
        {view === 'contract' && (
          <div className="text-[11px] text-ink-300">
            {fmtMoney(p.wage)}/wk · until {p.contractEnd}
            {p.contractEnd <= w.season + 1 && <span className="text-orange-300"> · expiring</span>}
          </div>
        )}
        {view === 'stats' && (
          <div className="text-[11px] text-ink-300">
            {p.stats.apps}
            {p.stats.subApps ? ` (${p.stats.subApps})` : ''} apps · {p.stats.goals} gls · {p.stats.assists} ast · {p.stats.yellows}🟨
          </div>
        )}
      </div>
      {view === 'general' && (
        <div className="flex flex-col items-end gap-1">
          <CondBar value={p.condition} />
          <RatingChip r={avg} />
        </div>
      )}
      {view === 'contract' && <div className="text-sm font-bold tabular-nums">{fmtMoney(p.value)}</div>}
      {view === 'stats' && <RatingChip r={avg} />}
    </button>
  );
}

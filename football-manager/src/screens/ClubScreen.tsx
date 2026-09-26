import { useNavigate, useParams } from 'react-router-dom';
import { useWorld } from '../store/game';
import { getSquad } from '../game/squad';
import { leagueTable, resultFor } from '../game/table';
import { fmtMoney } from '../game/valuation';
import { abilityStars } from '../game/progression';
import { ClubBadge, FormDots, PageHeader, Panel, PlayerStatusIcons, PosBadge, Stars, Stat, repStars } from '../ui/components';
import { ordinal } from './Inbox';

export default function ClubScreen() {
  const { id } = useParams();
  const w = useWorld();
  const nav = useNavigate();
  const club = w.clubs[Number(id)];
  if (!club) return <PageHeader title="Club not found" />;
  const lg = w.leagues.find((l) => l.id === club.leagueId)!;
  const table = leagueTable(w, lg.id);
  const pos = table.findIndex((r) => r.clubId === club.id) + 1;
  const squad = getSquad(w, club.id).sort((a, b) => b.ability - a.ability);
  const recent = w.fixtures.filter((f) => f.played && (f.home === club.id || f.away === club.id)).slice(-5);

  return (
    <div className="pb-6">
      <PageHeader title={club.name} sub={lg.name} />
      <div className="p-3 flex items-center gap-3 bg-ink-900 border-b border-ink-800">
        <ClubBadge club={club} size={52} />
        <div className="flex-1 min-w-0">
          <div className="text-sm text-ink-300">{club.stadium}</div>
          <div className="text-xs text-ink-400">Capacity {club.capacity.toLocaleString()}</div>
          <div className="mt-1">
            <Stars value={repStars(club.reputation)} size={12} />
          </div>
        </div>
      </div>
      <div className="p-3 space-y-3">
        <Panel>
          <div className="flex divide-x divide-ink-700">
            <Stat label="Position" value={table[pos - 1]?.p ? ordinal(pos) : '-'} sub={`${table[pos - 1]?.pts ?? 0} pts`} />
            <Stat label="Formation" value={club.tactics.formation} />
            <Stat label="Balance" value={fmtMoney(club.finances.balance)} />
          </div>
          {recent.length > 0 && (
            <div className="px-3 py-2 border-t border-ink-700 flex items-center gap-2 text-sm">
              <span className="text-ink-300">Form</span>
              <FormDots form={recent.map((f) => resultFor(f, club.id)!)} />
            </div>
          )}
        </Panel>
        <Panel title={`Squad (${squad.length})`}>
          {squad.map((p) => (
            <button key={p.id} className="row-tap w-full text-left" onClick={() => nav(`/game/player/${p.id}`)}>
              <PosBadge pos={p.positions[0]} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="truncate">{p.name}</span>
                  <PlayerStatusIcons p={p} />
                </div>
                <div className="text-[11px] text-ink-300">
                  {p.age}y · {p.nat} · {fmtMoney(p.value)}
                </div>
              </div>
              <Stars value={abilityStars(p)} size={10} />
            </button>
          ))}
        </Panel>
      </div>
    </div>
  );
}

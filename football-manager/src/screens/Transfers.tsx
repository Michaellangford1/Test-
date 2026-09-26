import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useWorld } from '../store/game';
import type { Player, World } from '../game/types';
import { posGroup } from '../game/attributes';
import { fmtMoney } from '../game/valuation';
import { abilityStars } from '../game/progression';
import { transferWindowOpen } from '../game/dates';
import { ClubBadge, Empty, PlayerStatusIcons, PosBadge, Stars, Tabs } from '../ui/components';

type Tab = 'search' | 'shortlist' | 'offers' | 'listed';

const GROUPS: [string, string][] = [
  ['', 'Any position'],
  ['GK', 'Goalkeeper'],
  ['CB', 'Centre-back'],
  ['FB', 'Full-back / wing-back'],
  ['DM', 'Defensive mid'],
  ['CM', 'Central mid'],
  ['WM', 'Wide mid'],
  ['AM', 'Attacking mid'],
  ['W', 'Winger'],
  ['ST', 'Striker'],
];

export default function Transfers() {
  const w = useWorld();
  const [tab, setTab] = useState<Tab>('search');
  const club = w.clubs[w.manager.clubId];
  return (
    <div>
      <div className="px-3 py-2 bg-ink-900 text-xs text-ink-300 flex justify-between">
        <span>
          Budget <b className="text-white">{fmtMoney(club.finances.transferBudget)}</b>
        </span>
        <span className={transferWindowOpen(w.date) ? 'text-gold font-bold' : ''}>{transferWindowOpen(w.date) ? 'Window open' : 'Window closed'}</span>
      </div>
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: 'search', label: 'Search' },
          { value: 'shortlist', label: `Shortlist (${w.shortlist.length})` },
          { value: 'offers', label: 'Offers' },
          { value: 'listed', label: 'Listed' },
        ]}
      />
      {tab === 'search' && <SearchTab w={w} />}
      {tab === 'shortlist' && <PlayerList w={w} players={w.shortlist.map((id) => w.players[id]).filter(Boolean)} empty="Tap the star on a player's profile to shortlist him." />}
      {tab === 'offers' && <OffersTab w={w} />}
      {tab === 'listed' && (
        <PlayerList
          w={w}
          players={Object.values(w.players)
            .filter((p) => p.transferListed && p.clubId !== w.manager.clubId)
            .sort((a, b) => b.ability - a.ability)
            .slice(0, 100)}
          empty="No players are currently transfer listed."
        />
      )}
    </div>
  );
}

function SearchTab({ w }: { w: World }) {
  const [q, setQ] = useState('');
  const [group, setGroup] = useState('');
  const [league, setLeague] = useState('');
  const [maxAge, setMaxAge] = useState(40);
  const [maxValue, setMaxValue] = useState(0);
  const [minStars, setMinStars] = useState(0);
  const [sort, setSort] = useState<'stars' | 'value' | 'age' | 'potential'>('stars');

  const results = useMemo(() => {
    const ql = q.trim().toLowerCase();
    const list = Object.values(w.players).filter((p) => {
      if (p.clubId === w.manager.clubId) return false;
      if (ql && !p.name.toLowerCase().includes(ql)) return false;
      if (group && posGroup(p.positions[0]) !== group && !p.positions.some((x) => posGroup(x) === group)) return false;
      if (league === 'free' && p.clubId != null) return false;
      if (league && league !== 'free' && (p.clubId == null || w.clubs[p.clubId].leagueId !== league)) return false;
      if (p.age > maxAge) return false;
      if (maxValue && p.value > maxValue) return false;
      if (minStars && abilityStars(p) < minStars) return false;
      return true;
    });
    list.sort((a, b) =>
      sort === 'value' ? b.value - a.value : sort === 'age' ? a.age - b.age || b.ability - a.ability : sort === 'potential' ? b.potential - a.potential : b.ability - a.ability,
    );
    return list.slice(0, 100);
  }, [w.players, w.manager.clubId, w.clubs, q, group, league, maxAge, maxValue, minStars, sort]);

  return (
    <div>
      <div className="p-3 space-y-2 bg-ink-850 border-b border-ink-700">
        <div className="relative">
          <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <input className="w-full !pl-8" placeholder="Search by name" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <select value={group} onChange={(e) => setGroup(e.target.value)}>
            {GROUPS.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
          <select value={league} onChange={(e) => setLeague(e.target.value)}>
            <option value="">All leagues</option>
            {w.leagues.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
            <option value="free">Free agents</option>
          </select>
          <select value={maxAge} onChange={(e) => setMaxAge(+e.target.value)}>
            {[40, 30, 27, 25, 23, 21, 19].map((a) => (
              <option key={a} value={a}>
                {a === 40 ? 'Any age' : `Age ≤ ${a}`}
              </option>
            ))}
          </select>
          <select value={maxValue} onChange={(e) => setMaxValue(+e.target.value)}>
            {[0, 500_000, 2_000_000, 5_000_000, 10_000_000, 20_000_000, 40_000_000, 80_000_000].map((v) => (
              <option key={v} value={v}>
                {v === 0 ? 'Any value' : `Value ≤ ${fmtMoney(v)}`}
              </option>
            ))}
          </select>
          <select value={minStars} onChange={(e) => setMinStars(+e.target.value)}>
            {[0, 2, 2.5, 3, 3.5, 4, 4.5].map((v) => (
              <option key={v} value={v}>
                {v === 0 ? 'Any ability' : `${v}+ stars`}
              </option>
            ))}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
            <option value="stars">Sort: ability</option>
            <option value="potential">Sort: potential</option>
            <option value="value">Sort: value</option>
            <option value="age">Sort: youngest</option>
          </select>
        </div>
      </div>
      <PlayerList w={w} players={results} empty="No players match your search." />
    </div>
  );
}

function PlayerList({ w, players, empty }: { w: World; players: Player[]; empty: string }) {
  const nav = useNavigate();
  if (!players.length) return <Empty>{empty}</Empty>;
  return (
    <div>
      {players.map((p) => {
        const c = p.clubId != null ? w.clubs[p.clubId] : null;
        return (
          <button key={p.id} className="row-tap w-full text-left" onClick={() => nav(`/game/player/${p.id}`)}>
            <PosBadge pos={p.positions[0]} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="truncate font-bold">{p.name}</span>
                <PlayerStatusIcons p={p} />
              </div>
              <div className="text-[11px] text-ink-300 truncate">
                {p.age}y · {p.nat} · {c ? c.name : 'Free agent'}
              </div>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <Stars value={abilityStars(p)} size={10} />
              <span className="text-xs font-bold tabular-nums">{fmtMoney(p.value)}</span>
            </div>
            {c && <ClubBadge club={c} size={22} />}
          </button>
        );
      })}
    </div>
  );
}

function OffersTab({ w }: { w: World }) {
  const nav = useNavigate();
  const mine = [...w.offers].filter((o) => o.userBuying).reverse();
  const incoming = [...w.offers].filter((o) => !o.userBuying).reverse();
  const newsFor = (offerId: number) => w.news.find((n) => n.offerId === offerId);
  const row = (o: (typeof w.offers)[number]) => {
    const p = w.players[o.playerId];
    if (!p) return null;
    const other = o.userBuying ? (o.fromClub != null ? w.clubs[o.fromClub].name : 'Free agent') : w.clubs[o.toClub].name;
    const n = newsFor(o.id);
    const actionable = (o.userBuying && (o.status === 'accepted' || o.status === 'countered')) || (!o.userBuying && o.status === 'pending');
    return (
      <button key={o.id} className="row-tap w-full text-left" onClick={() => (n ? nav(`/game/news/${n.id}`) : nav(`/game/player/${p.id}`))}>
        <PosBadge pos={p.positions[0]} />
        <div className="flex-1 min-w-0">
          <div className="truncate font-bold">{p.name}</div>
          <div className="text-[11px] text-ink-300 truncate">
            {other} · {fmtMoney(o.status === 'countered' ? o.counterFee ?? o.fee : o.fee)}
          </div>
        </div>
        <span className={`chip ${actionable ? 'bg-gold text-black' : o.status === 'completed' ? 'bg-win text-black' : o.status === 'rejected' || o.status === 'collapsed' ? 'bg-ink-600' : 'bg-ink-700'}`}>
          {actionable ? 'ACTION' : o.status.toUpperCase()}
        </span>
      </button>
    );
  };
  return (
    <div>
      <div className="panel-head">Your bids</div>
      {mine.length ? mine.map(row) : <Empty>No bids made.</Empty>}
      <div className="panel-head">Bids for your players</div>
      {incoming.length ? incoming.map(row) : <Empty>No offers received.</Empty>}
    </div>
  );
}

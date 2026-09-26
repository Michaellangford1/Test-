import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useGame, useWorld } from '../store/game';
import { ATTRS, GOALKEEPING, MENTAL, PHYSICAL, TECHNICAL, getAttrs, positionRating } from '../game/attributes';
import type { Player, Pos } from '../game/types';
import { askingPrice, fmtMoney } from '../game/valuation';
import { abilityStars } from '../game/progression';
import { NATIONS } from '../game/names';
import { acceptCounter, canMakeOffer, completeUserPurchase, makeOffer, releasePlayer, renewContract } from '../game/transfers';
import { describeDays } from '../game/results';
import { seasonLabel } from '../game/dates';
import { attrColor, avgRating, ClubBadge, CondBar, MoneyStepper, moraleText, PageHeader, Panel, PosBadge, RatingChip, Sheet, Stars, Tabs } from '../ui/components';
import { ContractSheet } from '../ui/ContractSheet';

type Tab = 'profile' | 'stats' | 'contract';

export default function PlayerScreen() {
  const { id } = useParams();
  const w = useWorld();
  const p = w.players[Number(id)];
  const [tab, setTab] = useState<Tab>('profile');
  if (!p) return <PageHeader title="Player not found" sub="He may have retired." />;
  const club = p.clubId != null ? w.clubs[p.clubId] : null;
  const mine = p.clubId === w.manager.clubId;

  return (
    <div className="pb-6">
      <PageHeader title={p.name} sub={club ? club.name : 'Free agent'} right={!mine ? <ShortlistButton p={p} /> : undefined} />
      <div className="p-3 flex items-center gap-3 bg-ink-900">
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl font-black border border-black/40 shrink-0"
          style={{ background: club?.colors[0] ?? '#40587c', color: club?.colors[1] ?? '#fff', textShadow: '0 1px 2px rgba(0,0,0,.6)' }}
        >
          {p.squadNo || '-'}
        </div>
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex flex-wrap gap-1">
            {p.positions.map((pos) => (
              <PosBadge key={pos} pos={pos} />
            ))}
          </div>
          <div className="text-xs text-ink-300">
            {p.age} years · {NATIONS[p.nat] ?? p.nat} · {p.foot === 'L' ? 'Left' : p.foot === 'B' ? 'Either' : 'Right'} foot
          </div>
          <div className="text-xs text-ink-300">
            Value <b className="text-white">{fmtMoney(p.value)}</b>
            {club && (
              <>
                {' '}
                · <Link to={`/game/club/${club.id}`} className="underline">{club.short}</Link>
              </>
            )}
          </div>
        </div>
        {club && <ClubBadge club={club} size={36} />}
      </div>
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: 'profile', label: 'Profile' },
          { value: 'stats', label: 'Stats & History' },
          { value: 'contract', label: mine ? 'Contract' : 'Transfer' },
        ]}
      />
      <div className="p-3 space-y-3">
        {tab === 'profile' && <Profile p={p} />}
        {tab === 'stats' && <Stats p={p} />}
        {tab === 'contract' && (mine ? <OwnContract p={p} /> : <TransferPanel p={p} />)}
      </div>
    </div>
  );
}

function ShortlistButton({ p }: { p: Player }) {
  const w = useWorld();
  const mutate = useGame((s) => s.mutate);
  const on = w.shortlist.includes(p.id);
  return (
    <button
      className="btn-ghost !p-2"
      aria-label={on ? 'Remove from shortlist' : 'Add to shortlist'}
      onClick={() => mutate((w) => (w.shortlist = on ? w.shortlist.filter((x) => x !== p.id) : [...w.shortlist, p.id]))}
    >
      <Star size={20} className={on ? 'text-gold' : ''} fill={on ? 'currentColor' : 'none'} />
    </button>
  );
}

function Profile({ p }: { p: Player }) {
  const attrs = getAttrs(p);
  const isGK = p.positions[0] === 'GK';
  const groups: [string, readonly string[]][] = isGK
    ? [
        ['Goalkeeping', GOALKEEPING],
        ['Mental', MENTAL],
        ['Physical', PHYSICAL],
        ['Technical', ['First Touch', 'Passing', 'Technique', 'Penalty Taking', 'Free Kicks']],
      ]
    : [
        ['Technical', TECHNICAL],
        ['Mental', MENTAL],
        ['Physical', PHYSICAL],
      ];
  const idx = (a: string) => (ATTRS as readonly string[]).indexOf(a);
  const avg = avgRating(p);
  return (
    <>
      <Panel title="Coach's report">
        <div className="grid grid-cols-2 divide-x divide-ink-700">
          <div className="p-3">
            <div className="text-[11px] uppercase font-bold text-ink-300">Current ability</div>
            <Stars value={abilityStars(p)} />
          </div>
          <div className="p-3">
            <div className="text-[11px] uppercase font-bold text-ink-300">Potential</div>
            <Stars value={abilityStars(p, 'potential')} />
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-ink-700 border-t border-ink-700 text-center">
          <div className="p-2">
            <div className="text-[11px] uppercase font-bold text-ink-300">Condition</div>
            <div className="flex justify-center mt-1">
              <CondBar value={p.condition} className="!w-14" />
            </div>
          </div>
          <div className="p-2">
            <div className="text-[11px] uppercase font-bold text-ink-300">Morale</div>
            <div className="text-sm font-bold">{moraleText(p.morale)}</div>
          </div>
          <div className="p-2">
            <div className="text-[11px] uppercase font-bold text-ink-300">Avg rating</div>
            <RatingChip r={avg} />
          </div>
        </div>
        {(p.injury || p.suspended > 0) && (
          <div className="px-3 py-2 border-t border-ink-700 text-sm text-loss font-bold">
            {p.injury && `Injured: ${p.injury.name} (${describeDays(p.injury.days)})`}
            {p.suspended > 0 && ` Suspended for ${p.suspended} match${p.suspended > 1 ? 'es' : ''}`}
          </div>
        )}
      </Panel>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {groups.map(([name, list]) => (
          <Panel key={name} title={name}>
            <div className="grid grid-cols-2">
              {list.map((a) => (
                <div key={a} className="flex items-center justify-between px-3 py-1 border-b border-ink-800 text-[13px] odd:border-r">
                  <span className="text-ink-200 truncate">{a}</span>
                  <span className={`font-bold tabular-nums ${attrColor(attrs[idx(a)])}`}>{attrs[idx(a)]}</span>
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </div>

      <PositionMap p={p} />
    </>
  );
}

const MAP: { pos: Pos; x: number; y: number }[] = [
  { pos: 'ST', x: 50, y: 10 },
  { pos: 'AML', x: 15, y: 25 },
  { pos: 'AMC', x: 50, y: 27 },
  { pos: 'AMR', x: 85, y: 25 },
  { pos: 'ML', x: 15, y: 45 },
  { pos: 'MC', x: 50, y: 45 },
  { pos: 'MR', x: 85, y: 45 },
  { pos: 'WBL', x: 15, y: 62 },
  { pos: 'DM', x: 50, y: 62 },
  { pos: 'WBR', x: 85, y: 62 },
  { pos: 'DL', x: 15, y: 78 },
  { pos: 'DC', x: 50, y: 78 },
  { pos: 'DR', x: 85, y: 78 },
  { pos: 'GK', x: 50, y: 92 },
];

function PositionMap({ p }: { p: Player }) {
  const ratings = useMemo(() => MAP.map((m) => ({ ...m, r: positionRating(p, m.pos) })), [p]);
  return (
    <Panel title="Positions">
      <div className="relative mx-auto my-3 w-[220px] h-[260px] rounded bg-pitch-600 border-2 border-white/40">
        <div className="absolute left-0 right-0 top-1/2 border-t border-white/30" />
        {ratings.map((m) => {
          const natural = p.positions.includes(m.pos);
          const c = natural ? 'bg-win text-black' : m.r >= p.ability * 0.9 ? 'bg-lime-600 text-white' : m.r >= p.ability * 0.75 ? 'bg-yellow-600 text-black' : 'bg-ink-800/80 text-ink-300';
          return (
            <div key={m.pos} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${m.x}%`, top: `${m.y}%` }}>
              <span className={`chip ${c} min-w-[30px] justify-center`}>{m.pos}</span>
            </div>
          );
        })}
      </div>
      <div className="text-[11px] text-ink-300 text-center pb-2">Green = natural · lime = competent · amber = awkward</div>
    </Panel>
  );
}

function Stats({ p }: { p: Player }) {
  const w = useWorld();
  const s = p.stats;
  const avg = avgRating(p);
  return (
    <>
      <Panel title={`This season (${seasonLabel(w.season)})`}>
        <div className="grid grid-cols-4 text-center divide-x divide-ink-700">
          {[
            ['Apps', `${s.apps}${s.subApps ? ` (${s.subApps})` : ''}`],
            ['Goals', s.goals],
            ['Assists', s.assists],
            ['Rating', avg ? avg.toFixed(2) : '-'],
          ].map(([l, v]) => (
            <div key={l as string} className="p-2">
              <div className="text-[11px] uppercase font-bold text-ink-300">{l}</div>
              <div className="font-bold">{v}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 text-center divide-x divide-ink-700 border-t border-ink-700">
          {[
            ['MotM', s.motm],
            ['Clean sh.', s.cleanSheets],
            ['Yellow', s.yellows],
            ['Red', s.reds],
          ].map(([l, v]) => (
            <div key={l as string} className="p-2">
              <div className="text-[11px] uppercase font-bold text-ink-300">{l}</div>
              <div className="font-bold">{v}</div>
            </div>
          ))}
        </div>
        {p.form.length > 0 && (
          <div className="px-3 py-2 border-t border-ink-700 flex items-center gap-2 text-sm">
            <span className="text-ink-300">Last {p.form.length}:</span>
            {p.form.map((r, i) => (
              <RatingChip key={i} r={r} />
            ))}
          </div>
        )}
      </Panel>
      <Panel title="Career">
        {p.career.length === 0 && <div className="p-3 text-sm text-ink-300">No completed seasons in this game yet.</div>}
        {[...p.career].reverse().map((c, i) => (
          <div key={i} className="row text-sm">
            <span className="w-14 text-ink-300">{seasonLabel(c.season)}</span>
            <span className="flex-1 truncate">{c.clubName}</span>
            <span className="w-10 text-right tabular-nums">{c.apps}</span>
            <span className="w-10 text-right tabular-nums">{c.goals}</span>
            <span className="w-12 text-right tabular-nums">{c.avg ? c.avg.toFixed(2) : '-'}</span>
          </div>
        ))}
      </Panel>
    </>
  );
}

function OwnContract({ p }: { p: Player }) {
  const w = useWorld();
  const mutate = useGame((s) => s.mutate);
  const toast = useGame((s) => s.showToast);
  const club = w.clubs[w.manager.clubId];
  const [renew, setRenew] = useState(false);
  const [confirmRelease, setConfirmRelease] = useState(false);
  const t = club.tactics;
  return (
    <>
      <Panel title="Contract">
        <div className="row">
          <span className="flex-1 text-ink-300">Wage</span>
          <b>{fmtMoney(p.wage)} p/w</b>
        </div>
        <div className="row">
          <span className="flex-1 text-ink-300">Expires</span>
          <b className={p.contractEnd <= w.season + 1 ? 'text-orange-300' : ''}>June {p.contractEnd}</b>
        </div>
        <div className="row">
          <span className="flex-1 text-ink-300">Value</span>
          <b>{fmtMoney(p.value)}</b>
        </div>
        <div className="row">
          <span className="flex-1 text-ink-300">Joined</span>
          <b>{p.joined.slice(0, 4)}</b>
        </div>
      </Panel>
      <div className="grid grid-cols-2 gap-2">
        <button className="btn-primary !py-3" onClick={() => setRenew(true)}>
          New contract
        </button>
        <button
          className="btn-secondary !py-3"
          onClick={() => {
            mutate((w) => (w.players[p.id].transferListed = !p.transferListed));
            toast(p.transferListed ? `${p.short} removed from the transfer list` : `${p.short} added to the transfer list`);
          }}
        >
          {p.transferListed ? 'Unlist' : 'Transfer list'}
        </button>
        <button className="btn-secondary !py-3" onClick={() => mutate((w) => (w.clubs[club.id].tactics.captain = p.id))} disabled={t.captain === p.id}>
          {t.captain === p.id ? 'Captain ✓' : 'Make captain'}
        </button>
        <button className="btn-secondary !py-3" onClick={() => mutate((w) => (w.clubs[club.id].tactics.penaltyTaker = p.id))} disabled={t.penaltyTaker === p.id}>
          {t.penaltyTaker === p.id ? 'Penalties ✓' : 'Take penalties'}
        </button>
        <button className="btn-secondary !py-3" onClick={() => mutate((w) => (w.clubs[club.id].tactics.freeKickTaker = p.id))} disabled={t.freeKickTaker === p.id}>
          {t.freeKickTaker === p.id ? 'Free kicks ✓' : 'Take free kicks'}
        </button>
        {confirmRelease ? (
          <button
            className="btn-danger !py-3"
            onClick={() => {
              let msg = '';
              mutate((w) => (msg = releasePlayer(w, w.players[p.id])));
              toast(msg);
              setConfirmRelease(false);
            }}
          >
            Confirm release
          </button>
        ) : (
          <button className="btn-secondary !py-3 !text-loss" onClick={() => setConfirmRelease(true)}>
            Release
          </button>
        )}
      </div>
      {renew && (
        <ContractSheet
          w={w}
          p={p}
          open={renew}
          onClose={() => setRenew(false)}
          title={`New contract: ${p.name}`}
          onSubmit={(wage, years) => {
            let r = { ok: false, msg: '' };
            mutate((w) => (r = renewContract(w, w.players[p.id], wage, years)));
            if (r.ok) toast(r.msg);
            return r;
          }}
        />
      )}
    </>
  );
}

function TransferPanel({ p }: { p: Player }) {
  const w = useWorld();
  const mutate = useGame((s) => s.mutate);
  const toast = useGame((s) => s.showToast);
  const club = w.clubs[w.manager.clubId];
  const asking = p.clubId != null ? askingPrice(w, p) : 0;
  const [open, setOpen] = useState(false);
  const [fee, setFee] = useState(() => Math.max(0, Math.round(p.value)));
  const [contractFor, setContractFor] = useState<number | null>(null);
  const blocked = canMakeOffer(w, p);
  const active = w.offers.filter((o) => o.playerId === p.id && o.userBuying).slice(-1)[0];

  return (
    <>
      <Panel title="Transfer status">
        <div className="row">
          <span className="flex-1 text-ink-300">Value</span>
          <b>{fmtMoney(p.value)}</b>
        </div>
        {p.clubId != null && (
          <div className="row">
            <span className="flex-1 text-ink-300">Club valuation (scout estimate)</span>
            <b>~{fmtMoney(asking)}</b>
          </div>
        )}
        <div className="row">
          <span className="flex-1 text-ink-300">Wage</span>
          <b>{fmtMoney(p.wage)} p/w</b>
        </div>
        <div className="row">
          <span className="flex-1 text-ink-300">Contract</span>
          <b>June {p.contractEnd}</b>
        </div>
        {p.transferListed && <div className="row text-gold font-bold">Transfer listed by his club</div>}
        {active && (
          <div className="row">
            <span className="flex-1 text-ink-300">Your offer</span>
            <b>
              {fmtMoney(active.fee)} · {active.status}
            </b>
          </div>
        )}
        <div className="row">
          <span className="flex-1 text-ink-300">Your transfer budget</span>
          <b>{fmtMoney(club.finances.transferBudget)}</b>
        </div>
      </Panel>
      {active && active.status === 'accepted' ? (
        <button className="btn-primary w-full !py-3" onClick={() => setContractFor(active.id)}>
          Negotiate personal terms
        </button>
      ) : active && active.status === 'countered' ? (
        <button
          className="btn-primary w-full !py-3"
          onClick={() => {
            mutate((w) => acceptCounter(w.offers.find((o) => o.id === active.id)!));
            setContractFor(active.id);
          }}
        >
          Pay {fmtMoney(active.counterFee ?? 0)} and negotiate terms
        </button>
      ) : blocked ? (
        <div className="text-sm text-ink-300 text-center">{blocked}</div>
      ) : p.clubId == null ? (
        <button
          className="btn-primary w-full !py-3"
          onClick={() => {
            let id = 0;
            mutate((w) => (id = makeOffer(w, w.players[p.id], 0).id));
            setContractFor(id);
          }}
        >
          Offer contract (free agent)
        </button>
      ) : (
        <button className="btn-primary w-full !py-3" onClick={() => setOpen(true)}>
          Make an offer
        </button>
      )}
      <Sheet open={open} onClose={() => setOpen(false)} title={`Bid for ${p.name}`}>
        <div className="p-4 space-y-4">
          <div className="text-sm text-ink-300">
            {w.clubs[p.clubId ?? 0]?.name} will respond tomorrow. Budget: {fmtMoney(club.finances.transferBudget)}.
          </div>
          <MoneyStepper value={fee} onChange={setFee} />
          <div className="grid grid-cols-3 gap-2">
            {[0.8, 1, 1.25].map((f) => (
              <button key={f} className="btn-secondary !py-1.5 text-xs" onClick={() => setFee(Math.round(p.value * f))}>
                {f === 1 ? 'Value' : `${f > 1 ? '+' : ''}${Math.round((f - 1) * 100)}%`}
              </button>
            ))}
          </div>
          {fee > club.finances.transferBudget && <div className="text-sm text-loss font-bold">This exceeds your transfer budget.</div>}
          <button
            className="btn-primary w-full !py-3"
            disabled={fee > club.finances.transferBudget}
            onClick={() => {
              mutate((w) => makeOffer(w, w.players[p.id], fee));
              toast('Offer submitted. Expect a response tomorrow.');
              setOpen(false);
            }}
          >
            Submit {fmtMoney(fee)}
          </button>
        </div>
      </Sheet>
      {contractFor != null && (
        <ContractSheet
          w={w}
          p={p}
          open
          onClose={() => setContractFor(null)}
          title={`Contract: ${p.name}`}
          fee={w.offers.find((o) => o.id === contractFor)?.fee}
          onSubmit={(wage, years) => {
            let r = { ok: false, msg: '' };
            mutate((w) => (r = completeUserPurchase(w, w.offers.find((o) => o.id === contractFor)!, wage, years)));
            if (r.ok) toast(r.msg);
            return r;
          }}
        />
      )}
    </>
  );
}

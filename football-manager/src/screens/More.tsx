import { Route, Routes, useNavigate } from 'react-router-dom';
import { Banknote, Building2, ChevronRight, Dumbbell, History, LogOut, Save, UserRound } from 'lucide-react';
import { useGame, useWorld } from '../store/game';
import { fmtMoney, clubWageBill } from '../game/valuation';
import { seasonLabel } from '../game/dates';
import { boardMoodText } from '../game/season';
import type { TrainingFocus } from '../game/types';
import { ClubBadge, PageHeader, Panel, Stat, repStars, Stars } from '../ui/components';
import { NATIONS } from '../game/names';
import { ordinal } from './Inbox';

export default function More() {
  return (
    <Routes>
      <Route index element={<Menu />} />
      <Route path="finances" element={<Finances />} />
      <Route path="training" element={<Training />} />
      <Route path="manager" element={<ManagerScreen />} />
      <Route path="history" element={<HistoryScreen />} />
    </Routes>
  );
}

function Menu() {
  const w = useWorld();
  const nav = useNavigate();
  const save = useGame((s) => s.save);
  const quit = useGame((s) => s.quit);
  const toast = useGame((s) => s.showToast);
  const club = w.clubs[w.manager.clubId];
  const item = (icon: React.ReactNode, label: string, to: string, sub?: string) => (
    <button className="row-tap w-full text-left !py-3" onClick={() => nav(to)}>
      {icon}
      <div className="flex-1">
        <div className="font-bold">{label}</div>
        {sub && <div className="text-xs text-ink-300">{sub}</div>}
      </div>
      <ChevronRight size={18} className="text-ink-400" />
    </button>
  );
  return (
    <div className="p-3 space-y-3">
      <Panel>
        {item(<Building2 size={20} />, club.name, `/game/club/${club.id}`, `${club.stadium} · ${club.capacity.toLocaleString()} seats`)}
        {item(<Banknote size={20} />, 'Finances', '/game/more/finances', `Balance ${fmtMoney(club.finances.balance)}`)}
        {item(<Dumbbell size={20} />, 'Training', '/game/more/training', `Focus: ${club.training}`)}
        {item(<UserRound size={20} />, 'Manager & Board', '/game/more/manager', `Board: ${boardMoodText(club.boardConfidence)}`)}
        {item(<History size={20} />, 'History', '/game/more/history', `${w.history.length} completed season${w.history.length === 1 ? '' : 's'}`)}
      </Panel>
      <Panel>
        <button
          className="row-tap w-full text-left !py-3"
          onClick={async () => {
            await save();
            toast('Game saved');
          }}
        >
          <Save size={20} />
          <span className="flex-1 font-bold">Save game</span>
        </button>
        <button
          className="row-tap w-full text-left !py-3"
          onClick={async () => {
            await save();
            quit();
            nav('/', { replace: true });
          }}
        >
          <LogOut size={20} />
          <span className="flex-1 font-bold">Save & exit to main menu</span>
        </button>
      </Panel>
      <p className="text-[11px] text-ink-400 text-center px-4">The game autosaves after every Continue and every match.</p>
    </div>
  );
}

function Finances() {
  const w = useWorld();
  const club = w.clubs[w.manager.clubId];
  const f = club.finances;
  const bill = clubWageBill(w, club);
  const inc = f.seasonIncome;
  const exp = f.seasonExpense;
  const totalIn = inc.gate + inc.tv + inc.commercial + inc.transfers + inc.prize;
  const totalOut = exp.wages + exp.transfers + exp.other;
  const line = (l: string, v: number, neg = false) => (
    <div className="row text-sm">
      <span className="flex-1 text-ink-300">{l}</span>
      <b className={neg ? 'text-loss' : ''}>{fmtMoney(v)}</b>
    </div>
  );
  return (
    <div className="pb-6">
      <PageHeader title="Finances" sub={seasonLabel(w.season)} />
      <div className="p-3 space-y-3">
        <Panel>
          <div className="flex divide-x divide-ink-700">
            <Stat label="Balance" value={<span className={f.balance < 0 ? 'text-loss' : ''}>{fmtMoney(f.balance)}</span>} />
            <Stat label="Transfer budget" value={fmtMoney(f.transferBudget)} />
          </div>
          <div className="flex divide-x divide-ink-700 border-t border-ink-700">
            <Stat label="Wage bill" value={`${fmtMoney(bill)}/wk`} />
            <Stat label="Wage budget" value={`${fmtMoney(f.wageBudget)}/wk`} sub={bill > f.wageBudget ? 'Over budget!' : `${fmtMoney(f.wageBudget - bill)} spare`} />
          </div>
        </Panel>
        <Panel title="Income this season">
          {line('Gate receipts', inc.gate)}
          {line('TV money', inc.tv)}
          {line('Commercial & sponsorship', inc.commercial)}
          {line('Prize money', inc.prize)}
          {line('Player sales', inc.transfers)}
          {line('Total', totalIn)}
        </Panel>
        <Panel title="Expenditure this season">
          {line('Wages', exp.wages, true)}
          {line('Transfer fees', exp.transfers, true)}
          {line('Other (pay-offs etc.)', exp.other, true)}
          {line('Total', totalOut, true)}
        </Panel>
        <p className="text-[11px] text-ink-400 px-1">
          {`Sales add ${Math.round(0.8 * 100)}% of the fee to your transfer budget. Budgets are reset by the board at the start of each season.`}
        </p>
      </div>
    </div>
  );
}

const FOCI: { value: TrainingFocus; label: string; desc: string }[] = [
  { value: 'balanced', label: 'Balanced', desc: 'All-round development.' },
  { value: 'technical', label: 'Technical', desc: 'Slightly faster development of young players.' },
  { value: 'physical', label: 'Physical', desc: 'Harder sessions: slower recovery between games.' },
  { value: 'attacking', label: 'Attacking', desc: 'Work on movement and finishing patterns.' },
  { value: 'defending', label: 'Defending', desc: 'Work on shape and concentration.' },
  { value: 'rest', label: 'Light / recovery', desc: 'Faster recovery of condition, slower development.' },
];

function Training() {
  const w = useWorld();
  const mutate = useGame((s) => s.mutate);
  const club = w.clubs[w.manager.clubId];
  return (
    <div>
      <PageHeader title="Training" sub={`Facilities ${club.facilities}/20 · Youth ${club.youthRating}/20`} />
      <div className="p-3">
        <Panel title="Team focus">
          {FOCI.map((f) => (
            <button key={f.value} className="row-tap w-full text-left" onClick={() => mutate((w) => (w.clubs[club.id].training = f.value))}>
              <span className={`w-4 h-4 rounded-full border-2 ${club.training === f.value ? 'bg-gold border-gold' : 'border-ink-400'}`} />
              <div className="flex-1">
                <div className="font-bold">{f.label}</div>
                <div className="text-xs text-ink-300">{f.desc}</div>
              </div>
            </button>
          ))}
        </Panel>
      </div>
    </div>
  );
}

function ManagerScreen() {
  const w = useWorld();
  const m = w.manager;
  const club = w.clubs[m.clubId];
  const games = m.wins + m.draws + m.losses;
  return (
    <div>
      <PageHeader title={m.name} sub={`${NATIONS[m.nat] ?? m.nat} · Manager of ${club.name}`} />
      <div className="p-3 space-y-3">
        <Panel title="Board">
          <div className="p-3">
            <div className="flex items-center justify-between">
              <span className="font-bold">{boardMoodText(club.boardConfidence)}</span>
              <span className="text-ink-300 text-sm">{Math.round(club.boardConfidence)}%</span>
            </div>
            <div className="h-2 rounded-full bg-ink-700 mt-2 overflow-hidden">
              <div className={`h-full ${club.boardConfidence >= 55 ? 'bg-win' : club.boardConfidence >= 30 ? 'bg-yellow-400' : 'bg-loss'}`} style={{ width: `${club.boardConfidence}%` }} />
            </div>
            <div className="text-sm text-ink-200 mt-3">
              Target: <b>{m.target?.text}</b> ({ordinal(m.target?.pos ?? 0)} or better)
            </div>
          </div>
        </Panel>
        <Panel title="Record">
          <div className="flex divide-x divide-ink-700">
            <Stat label="Games" value={games} />
            <Stat label="Won" value={m.wins} />
            <Stat label="Drawn" value={m.draws} />
            <Stat label="Lost" value={m.losses} />
          </div>
          <div className="px-3 py-2 border-t border-ink-700 text-sm text-ink-300">Win rate {games ? Math.round((m.wins / games) * 100) : 0}%</div>
        </Panel>
        <Panel title="Honours">
          {m.trophies.length === 0 && <div className="p-3 text-sm text-ink-300">No trophies yet.</div>}
          {m.trophies.map((t, i) => (
            <div key={i} className="row text-sm">
              🏆 {t}
            </div>
          ))}
        </Panel>
        <Panel title="Club reputation">
          <div className="p-3 flex items-center gap-3">
            <ClubBadge club={club} />
            <Stars value={repStars(club.reputation)} />
          </div>
        </Panel>
      </div>
    </div>
  );
}

function HistoryScreen() {
  const w = useWorld();
  return (
    <div>
      <PageHeader title="History" />
      <div className="p-3 space-y-3">
        {w.history.length === 0 && <div className="text-sm text-ink-300 p-3">Complete a season to build your history.</div>}
        {[...w.history].reverse().map((h) => (
          <Panel key={h.season} title={seasonLabel(h.season)}>
            <div className="row text-sm">
              <span className="flex-1 text-ink-300">Your finish</span>
              <b>
                {ordinal(h.userPos)} · {w.clubs[h.userClub]?.name}
              </b>
            </div>
            {w.leagues.map((l) =>
              h.champions[l.id] != null ? (
                <div key={l.id} className="row text-sm">
                  <span className="flex-1 text-ink-300">{l.name}</span>
                  <b>{w.clubs[h.champions[l.id]]?.name}</b>
                </div>
              ) : null,
            )}
            {h.promoted.length > 0 && (
              <div className="row text-sm">
                <span className="flex-1 text-ink-300">Promoted</span>
                <span className="text-right">{h.promoted.map((c) => w.clubs[c]?.short).join(', ')}</span>
              </div>
            )}
            {h.relegated.length > 0 && (
              <div className="row text-sm">
                <span className="flex-1 text-ink-300">Relegated</span>
                <span className="text-right">{h.relegated.map((c) => w.clubs[c]?.short).join(', ')}</span>
              </div>
            )}
          </Panel>
        ))}
      </div>
    </div>
  );
}

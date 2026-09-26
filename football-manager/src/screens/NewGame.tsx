import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import type { RawDatabase } from '../data/types';
import { loadActiveDatabase } from '../store/database';
import { useGame } from '../store/game';
import { ClubBadge, PageHeader, Stars, Tabs, repStars } from '../ui/components';
import { NATIONS } from '../game/names';
import { fmtMoney } from '../game/valuation';
import { seasonLabel } from '../game/dates';

export default function NewGame() {
  const nav = useNavigate();
  const newGame = useGame((s) => s.newGame);
  const busy = useGame((s) => s.busy);
  const [db, setDb] = useState<RawDatabase | null>(null);
  const [custom, setCustom] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [nat, setNat] = useState('ENG');
  const [league, setLeague] = useState('eng1');
  const [club, setClub] = useState<string | null>(null);

  useEffect(() => {
    void loadActiveDatabase().then(({ db, custom }) => {
      setDb(db);
      setCustom(custom);
      setLeague(db.leagues[0]?.id ?? 'eng1');
    });
  }, []);

  const lg = db?.leagues.find((l) => l.id === league);
  const clubs = useMemo(() => [...(lg?.clubs ?? [])].sort((a, b) => b.rep - a.rep), [lg]);
  const nations = useMemo(() => Object.entries(NATIONS).sort((a, b) => a[1].localeCompare(b[1])), []);

  const start = async () => {
    if (!db || !club) return;
    await newGame(db, { managerName: name.trim() || 'The Gaffer', managerNat: nat, clubName: club });
    nav('/game/inbox', { replace: true });
  };

  if (busy)
    return (
      <div className="h-full flex flex-col items-center justify-center gap-3 text-ink-200">
        <Loader2 className="animate-spin" size={32} />
        <div className="font-bold">Building the football world…</div>
        <div className="text-xs text-ink-400">Loading {db?.leagues.reduce((n, l) => n + l.clubs.length, 0)} clubs</div>
      </div>
    );

  if (step === 1)
    return (
      <div className="min-h-full flex flex-col safe-top">
        <PageHeader title="New Game" sub={db ? `${db.name}${custom ? ' (edited)' : ''}` : 'Loading…'} />
        <div className="p-4 space-y-4 max-w-md w-full mx-auto">
          <div className="panel p-4 space-y-3">
            <label className="block">
              <span className="text-xs font-bold uppercase text-ink-300">Manager name</span>
              <input className="w-full mt-1" value={name} placeholder="The Gaffer" onChange={(e) => setName(e.target.value)} maxLength={32} autoFocus />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase text-ink-300">Nationality</span>
              <select className="w-full mt-1" value={nat} onChange={(e) => setNat(e.target.value)}>
                {nations.map(([code, n]) => (
                  <option key={code} value={code}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button className="btn-primary w-full !py-3" onClick={() => setStep(2)} disabled={!db}>
            Choose your club
          </button>
        </div>
      </div>
    );

  return (
    <div className="h-full flex flex-col safe-top">
      <PageHeader title="Choose a club" sub={db ? `Season ${seasonLabel(db.season)}` : ''} />
      <Tabs value={league} tabs={(db?.leagues ?? []).map((l) => ({ value: l.id, label: l.name }))} onChange={(v) => setLeague(v)} />
      <div className="flex-1 overflow-y-auto scroll-thin pb-24">
        {clubs.map((c) => (
          <button key={c.name} className={`row-tap w-full text-left ${club === c.name ? 'bg-ink-700' : ''}`} onClick={() => setClub(c.name)}>
            <ClubBadge club={{ colors: c.colors, short: c.short }} size={34} />
            <div className="flex-1 min-w-0">
              <div className="font-bold truncate">{c.name}</div>
              <div className="text-xs text-ink-300 truncate">
                {c.stadium} · Bank {fmtMoney(c.money * 1_000_000)}
              </div>
            </div>
            <Stars value={repStars(c.rep)} size={12} />
          </button>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-ink-900 border-t border-ink-700 safe-bottom">
        <button className="btn-primary w-full !py-3 text-base max-w-md mx-auto flex" disabled={!club} onClick={start}>
          {club ? `Manage ${club}` : 'Select a club'}
        </button>
      </div>
    </div>
  );
}

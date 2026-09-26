import { useMemo, useState } from 'react';
import type { Player, World } from '../game/types';
import { contractDemand } from '../game/transfers';
import { fmtMoney, clubWageBill } from '../game/valuation';
import { MoneyStepper, Segmented, Sheet } from './components';

export function ContractSheet({
  w,
  p,
  open,
  onClose,
  title,
  fee,
  onSubmit,
}: {
  w: World;
  p: Player;
  open: boolean;
  onClose: () => void;
  title: string;
  fee?: number;
  onSubmit: (wage: number, years: number) => { ok: boolean; msg: string };
}) {
  const club = w.clubs[w.manager.clubId];
  const demand = useMemo(() => contractDemand(w, p, club), [w, p, club]);
  const [wage, setWage] = useState(() => demand.wage);
  const [years, setYears] = useState(() => String(Math.max(1, demand.years || 3)));
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const bill = clubWageBill(w, club) - (p.clubId === club.id ? p.wage : 0);

  return (
    <Sheet open={open} onClose={onClose} title={title}>
      <div className="p-4 space-y-4">
        <div className="text-sm text-ink-200">
          {demand.interested ? (
            <>
              {p.short}'s agent is looking for around <b className="text-white">{fmtMoney(demand.wage)}</b> a week over{' '}
              <b className="text-white">{demand.years}</b> year{demand.years === 1 ? '' : 's'}.
            </>
          ) : (
            <span className="text-loss">{demand.reason}</span>
          )}
        </div>
        {fee != null && fee > 0 && (
          <div className="text-sm text-ink-300">
            Agreed fee: <b className="text-white">{fmtMoney(fee)}</b> (budget {fmtMoney(club.finances.transferBudget)})
          </div>
        )}
        <div>
          <div className="text-xs font-bold uppercase text-ink-300 mb-1">Weekly wage</div>
          <MoneyStepper value={wage} onChange={setWage} min={500} suffix="p/w" />
          <div className="text-[11px] text-ink-400 mt-1 text-center">
            Wage bill after signing: {fmtMoney(bill + wage)} / {fmtMoney(club.finances.wageBudget)} budget
          </div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase text-ink-300 mb-1">Contract length (years)</div>
          <Segmented value={years} onChange={setYears} options={['1', '2', '3', '4', '5'].map((v) => ({ value: v, label: v }))} />
        </div>
        {msg && <div className={`text-sm font-bold ${msg.ok ? 'text-win' : 'text-orange-300'}`}>{msg.text}</div>}
        <button
          className="btn-primary w-full !py-3"
          disabled={!demand.interested}
          onClick={() => {
            const r = onSubmit(wage, +years);
            setMsg({ ok: r.ok, text: r.msg });
            if (r.ok) setTimeout(onClose, 900);
          }}
        >
          Offer contract
        </button>
      </div>
    </Sheet>
  );
}

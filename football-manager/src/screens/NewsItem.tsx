import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGame, useWorld } from '../store/game';
import { fmtDate } from '../game/dates';
import { fmtMoney } from '../game/valuation';
import { acceptCounter, acceptIncomingOffer, completeUserPurchase, counterIncomingOffer, rejectIncomingOffer } from '../game/transfers';
import { worldRng, saveRng } from '../game/advance';
import { MoneyStepper, PageHeader, Sheet } from '../ui/components';
import { ContractSheet } from '../ui/ContractSheet';

export default function NewsItemScreen() {
  const { id } = useParams();
  const w = useWorld();
  const mutate = useGame((s) => s.mutate);
  const toast = useGame((s) => s.showToast);
  const nav = useNavigate();
  const n = w.news.find((x) => x.id === Number(id));
  const offer = n?.offerId != null ? w.offers.find((o) => o.id === n.offerId) : undefined;
  const player = n?.playerId != null ? w.players[n.playerId] : undefined;
  const [counterOpen, setCounterOpen] = useState(false);
  const [counterFee, setCounterFee] = useState(() => (offer ? Math.round(offer.fee * 1.3) : 0));
  const [contractOpen, setContractOpen] = useState(false);

  useEffect(() => {
    if (n && !n.read) mutate((w) => (w.news.find((x) => x.id === n.id)!.read = true));
  }, [n, mutate]);

  if (!n) return <PageHeader title="Message not found" />;

  const incoming = offer && !offer.userBuying && offer.status === 'pending';
  const canSign = offer && offer.userBuying && offer.status === 'accepted';
  const countered = offer && offer.userBuying && offer.status === 'countered';

  return (
    <div>
      <PageHeader title={n.title} sub={fmtDate(n.date)} />
      <div className="p-4 space-y-4">
        <div className="whitespace-pre-wrap leading-relaxed text-ink-100">{n.body}</div>

        {offer && <div className="text-xs text-ink-400">Offer status: {offer.status}</div>}

        <div className="flex flex-col gap-2">
          {incoming && (
            <>
              <button
                className="btn-primary !py-3"
                onClick={() =>
                  mutate((w) => {
                    toast(acceptIncomingOffer(w, w.offers.find((o) => o.id === offer.id)!));
                  })
                }
              >
                Accept {fmtMoney(offer.fee)}
              </button>
              <button className="btn-secondary !py-3" onClick={() => setCounterOpen(true)}>
                Ask for more
              </button>
              <button
                className="btn-danger !py-3"
                onClick={() => {
                  mutate((w) => rejectIncomingOffer(w.offers.find((o) => o.id === offer.id)!));
                  toast('Offer rejected');
                }}
              >
                Reject
              </button>
            </>
          )}
          {countered && (
            <button
              className="btn-primary !py-3"
              onClick={() => {
                mutate((w) => acceptCounter(w.offers.find((o) => o.id === offer.id)!));
                setContractOpen(true);
              }}
            >
              Pay {fmtMoney(offer.counterFee ?? 0)} and negotiate terms
            </button>
          )}
          {canSign && (
            <button className="btn-primary !py-3" onClick={() => setContractOpen(true)}>
              Negotiate personal terms
            </button>
          )}
          {player && (
            <button className="btn-secondary !py-3" onClick={() => nav(`/game/player/${player.id}`)}>
              View {player.name}
            </button>
          )}
        </div>
      </div>

      {offer && incoming && (
        <Sheet open={counterOpen} onClose={() => setCounterOpen(false)} title="Counter offer">
          <div className="p-4 space-y-4">
            <div className="text-sm text-ink-300">
              {w.clubs[offer.toClub].name} offered {fmtMoney(offer.fee)}. {player ? `${player.short} is valued at ${fmtMoney(player.value)}.` : ''}
            </div>
            <MoneyStepper value={counterFee} onChange={setCounterFee} />
            <button
              className="btn-primary w-full !py-3"
              onClick={() => {
                mutate((w) => {
                  const rng = worldRng(w);
                  toast(counterIncomingOffer(w, w.offers.find((o) => o.id === offer.id)!, counterFee, rng));
                  saveRng(w, rng);
                });
                setCounterOpen(false);
              }}
            >
              Demand {fmtMoney(counterFee)}
            </button>
          </div>
        </Sheet>
      )}

      {offer && player && (canSign || countered || contractOpen) && (
        <ContractSheet
          w={w}
          p={player}
          open={contractOpen}
          onClose={() => setContractOpen(false)}
          title={`Contract: ${player.name}`}
          fee={offer.fee}
          onSubmit={(wage, years) => {
            let r = { ok: false, msg: '' };
            mutate((w) => {
              r = completeUserPurchase(w, w.offers.find((o) => o.id === offer.id)!, wage, years);
            });
            if (r.ok) toast(r.msg);
            return r;
          }}
        />
      )}
    </div>
  );
}

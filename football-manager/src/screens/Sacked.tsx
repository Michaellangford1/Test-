import { Navigate, useNavigate } from 'react-router-dom';
import { useGame, useWorld } from '../store/game';
import { takeJob } from '../game/season';
import { ClubBadge, Panel, Stars, repStars } from '../ui/components';

export default function Sacked() {
  const w = useWorld();
  const mutate = useGame((s) => s.mutate);
  const quit = useGame((s) => s.quit);
  const nav = useNavigate();
  const offers = w.manager.jobOffers ?? [];
  if (!w.manager.sacked) return <Navigate to="/game/inbox" replace />;
  return (
    <div className="p-4 space-y-4">
      <div className="text-center pt-6">
        <div className="text-5xl">📰</div>
        <h1 className="text-2xl font-black mt-2">You're fired!</h1>
        <p className="text-ink-300 text-sm mt-1">The board of {w.clubs[w.manager.clubId].name} have relieved you of your duties.</p>
      </div>
      {offers.length > 0 ? (
        <Panel title="Job offers">
          {offers.map((id) => {
            const c = w.clubs[id];
            const lg = w.leagues.find((l) => l.id === c.leagueId)!;
            return (
              <button
                key={id}
                className="row-tap w-full text-left !py-3"
                onClick={() => {
                  mutate((w) => takeJob(w, id));
                  nav('/game/inbox', { replace: true });
                }}
              >
                <ClubBadge club={c} size={34} />
                <div className="flex-1">
                  <div className="font-bold">{c.name}</div>
                  <div className="text-xs text-ink-300">{lg.name}</div>
                </div>
                <Stars value={repStars(c.reputation)} size={12} />
              </button>
            );
          })}
        </Panel>
      ) : (
        <div className="text-center text-ink-300 text-sm">No clubs are interested right now.</div>
      )}
      <button
        className="btn-secondary w-full !py-3"
        onClick={() => {
          quit();
          nav('/', { replace: true });
        }}
      >
        Retire to the main menu
      </button>
    </div>
  );
}

import { useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftRight, ChevronRight, Inbox as InboxIcon, Loader2, Menu, Shirt, Trophy, Users } from 'lucide-react';
import { useGame, useWorld } from '../store/game';
import { fmtDate, transferWindowOpen } from '../game/dates';
import { nextUserFixture } from '../game/advance';

export default function GameLayout() {
  const w = useWorld();
  const busy = useGame((s) => s.busy);
  const doContinue = useGame((s) => s.continue);
  const nav = useNavigate();
  const loc = useLocation();
  const club = w.clubs[w.manager.clubId];
  const unread = w.news.filter((n) => !n.read).length;
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [loc.pathname]);

  useEffect(() => {
    document.documentElement.style.setProperty('--club1', club.colors[0]);
    document.documentElement.style.setProperty('--club2', club.colors[1]);
  }, [club]);

  useEffect(() => {
    if (w.manager.sacked && !loc.pathname.endsWith('/sacked')) nav('/game/sacked', { replace: true });
  }, [w.manager.sacked, loc.pathname, nav]);

  const onContinue = async () => {
    if (w.pendingMatch != null) {
      nav('/match');
      return;
    }
    const r = await doContinue();
    if (r === 'match') nav('/match');
    else if (r === 'news' && !loc.pathname.endsWith('/inbox')) nav('/game/inbox');
    else if (r === 'sacked') nav('/game/sacked');
  };

  const next = nextUserFixture(w);
  const matchDay = w.pendingMatch != null;

  return (
    <div className="h-full flex flex-col">
      <header className="safe-top bg-ink-900 border-b border-ink-700 shrink-0">
        <div className="h-1" style={{ background: `linear-gradient(90deg, ${club.colors[0]} 0 70%, ${club.colors[1]} 70% 100%)` }} />
        <div className="flex items-center gap-2 px-3 py-2">
          <NavLink to="/game/more" className="btn-ghost !p-1.5" aria-label="Menu">
            <Menu size={20} />
          </NavLink>
          <div className="flex-1 min-w-0 leading-tight">
            <div className="font-bold truncate text-[15px]">{club.name}</div>
            <div className="text-[11px] text-ink-300 truncate">
              {fmtDate(w.date)}
              {transferWindowOpen(w.date) && <span className="text-gold"> · Window open</span>}
            </div>
          </div>
          <button
            className={`btn ${matchDay ? 'bg-gold text-ink-950 border border-yellow-300' : 'btn-primary'} !px-4 !py-2.5 min-w-[118px]`}
            onClick={onContinue}
            disabled={busy || w.manager.sacked}
          >
            {busy ? <Loader2 size={16} className="animate-spin" /> : matchDay ? 'Match Day' : 'Continue'}
            {!busy && <ChevronRight size={16} />}
          </button>
        </div>
        {next && !matchDay && (
          <div className="px-3 pb-1.5 text-[11px] text-ink-300 truncate">
            Next: {next.home === club.id ? w.clubs[next.away].name + ' (H)' : w.clubs[next.home].name + ' (A)'} · {fmtDate(next.date)}
          </div>
        )}
      </header>

      <main ref={mainRef} className="flex-1 overflow-y-auto scroll-thin relative">
        <Outlet />
      </main>

      <nav className="shrink-0 bg-ink-900 border-t border-ink-700 safe-bottom grid grid-cols-5">
        <Tab to="/game/inbox" icon={<InboxIcon size={20} />} label="Inbox" badge={unread} />
        <Tab to="/game/squad" icon={<Users size={20} />} label="Squad" />
        <Tab to="/game/tactics" icon={<Shirt size={20} />} label="Tactics" />
        <Tab to="/game/comps" icon={<Trophy size={20} />} label="League" />
        <Tab to="/game/transfers" icon={<ArrowLeftRight size={20} />} label="Transfers" />
      </nav>
    </div>
  );
}

function Tab({ to, icon, label, badge }: { to: string; icon: React.ReactNode; label: string; badge?: number }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `relative flex flex-col items-center justify-center py-2 gap-0.5 text-[11px] font-bold ${isActive ? 'text-gold' : 'text-ink-300'}`}
    >
      {icon}
      {label}
      {!!badge && (
        <span className="absolute top-1 right-[22%] bg-loss text-white text-[10px] rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </NavLink>
  );
}

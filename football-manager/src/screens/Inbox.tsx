import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeftRight, Briefcase, CircleDollarSign, FileText, GraduationCap, HeartPulse, Info, Trophy } from 'lucide-react';
import { useWorld } from '../store/game';
import { fmtDate, fmtShort } from '../game/dates';
import { nextUserFixture } from '../game/advance';
import { leagueTable } from '../game/table';
import { boardMoodText } from '../game/season';
import { ClubBadge, FormDots, Panel } from '../ui/components';
import type { NewsItem } from '../game/types';

const ICONS: Record<NewsItem['kind'], React.ReactNode> = {
  info: <Info size={16} />,
  board: <Briefcase size={16} />,
  transfer: <ArrowLeftRight size={16} />,
  offer: <CircleDollarSign size={16} className="text-gold" />,
  injury: <HeartPulse size={16} className="text-loss" />,
  match: <Trophy size={16} />,
  contract: <FileText size={16} />,
  youth: <GraduationCap size={16} />,
  season: <Trophy size={16} className="text-gold" />,
};

export default function Inbox() {
  const w = useWorld();
  const nav = useNavigate();
  const club = w.clubs[w.manager.clubId];
  const next = nextUserFixture(w);
  const table = leagueTable(w, club.leagueId);
  const pos = table.findIndex((r) => r.clubId === club.id);
  const row = table[pos];
  const lg = w.leagues.find((l) => l.id === club.leagueId)!;
  const conf = club.boardConfidence;

  return (
    <div className="p-3 space-y-3">
      {next && (
        <Panel title={next.date === w.date ? 'Match day' : 'Next match'} right={<span className="normal-case font-normal">{next.label ?? lg.name}</span>}>
          <button className="w-full flex items-center gap-3 p-3 text-left" onClick={() => (w.pendingMatch != null ? nav('/match') : nav(`/game/club/${next.home === club.id ? next.away : next.home}`))}>
            <ClubBadge club={w.clubs[next.home]} size={40} />
            <div className="flex-1 text-center min-w-0">
              <div className="font-bold truncate">
                {w.clubs[next.home].name} <span className="text-ink-400">v</span> {w.clubs[next.away].name}
              </div>
              <div className="text-xs text-ink-300">
                {fmtDate(next.date)} · {next.neutral ? 'Wembley Stadium' : w.clubs[next.home].stadium}
              </div>
            </div>
            <ClubBadge club={w.clubs[next.away]} size={40} />
          </button>
        </Panel>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Panel title={lg.short === 'EPL' ? 'League' : lg.name}>
          <button className="w-full p-3 text-left" onClick={() => nav('/game/comps')}>
            <div className="text-2xl font-black">
              {row && row.p > 0 ? ordinal(pos + 1) : '-'}
              <span className="text-sm font-bold text-ink-300"> {row?.pts ?? 0} pts</span>
            </div>
            <div className="mt-1 h-4">{row && <FormDots form={row.form} />}</div>
          </button>
        </Panel>
        <Panel title="Board">
          <div className="p-3">
            <div className="text-sm font-bold">{boardMoodText(conf)}</div>
            <div className="h-2 rounded-full bg-ink-700 mt-1.5 overflow-hidden">
              <div className={`h-full ${conf >= 55 ? 'bg-win' : conf >= 30 ? 'bg-yellow-400' : 'bg-loss'}`} style={{ width: `${conf}%` }} />
            </div>
            <div className="text-[11px] text-ink-300 mt-1.5 leading-tight">{w.manager.target?.text}</div>
          </div>
        </Panel>
      </div>

      {conf < 25 && (
        <div className="flex items-center gap-2 rounded-md bg-loss/20 border border-loss/60 p-2.5 text-sm">
          <AlertTriangle size={18} className="text-loss shrink-0" /> The board are unhappy with results. Improve quickly or you may lose your job.
        </div>
      )}

      <Panel title="Inbox" right={<span className="normal-case font-normal">{w.news.filter((n) => !n.read).length} unread</span>}>
        {w.news.length === 0 && <div className="p-4 text-ink-300 text-sm">No messages.</div>}
        {w.news.slice(0, 80).map((n) => (
          <button key={n.id} className="row-tap w-full text-left" onClick={() => nav(`/game/news/${n.id}`)}>
            <span className={n.read ? 'text-ink-400' : 'text-ink-100'}>{ICONS[n.kind]}</span>
            <div className="flex-1 min-w-0">
              <div className={`truncate ${n.read ? 'text-ink-300' : 'font-bold text-white'}`}>{n.title}</div>
              <div className="text-xs text-ink-400 truncate">{n.body.split('\n')[0]}</div>
            </div>
            <span className="text-[11px] text-ink-400 shrink-0">{fmtShort(n.date)}</span>
          </button>
        ))}
      </Panel>
    </div>
  );
}

export function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

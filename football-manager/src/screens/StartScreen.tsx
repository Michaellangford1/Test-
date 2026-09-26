import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, FolderOpen, Play, Plus, Trash2 } from 'lucide-react';
import { deleteSave, listSaves, type SaveMeta } from '../store/db';
import { useGame } from '../store/game';
import { fmtDate, seasonLabel } from '../game/dates';
import { ClubBadge } from '../ui/components';

export default function StartScreen() {
  const nav = useNavigate();
  const load = useGame((s) => s.load);
  const busy = useGame((s) => s.busy);
  const [saves, setSaves] = useState<SaveMeta[] | null>(null);
  const [confirmDel, setConfirmDel] = useState<number | null>(null);

  const refresh = () => listSaves().then(setSaves);
  useEffect(() => {
    void refresh();
  }, []);

  const open = async (id: number) => {
    if (await load(id)) nav('/game/inbox');
  };

  return (
    <div className="min-h-full flex flex-col safe-top safe-bottom bg-[radial-gradient(ellipse_at_top,_#22324a_0%,_#0a111b_70%)]">
      <div className="px-6 pt-12 pb-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-ink-900 border border-ink-600 shadow-lg mb-4">
          <img src="favicon.svg" alt="" className="w-14 h-14" />
        </div>
        <h1 className="text-4xl font-black tracking-tight">
          Gaffer <span className="text-gold">'05</span>
        </h1>
        <p className="text-ink-300 mt-1 text-sm">Football management, the way it used to be.</p>
        <p className="text-ink-400 text-xs mt-1">2025/26 database · 6 leagues · 120 clubs</p>
      </div>

      <div className="px-4 space-y-3 max-w-md w-full mx-auto">
        {saves && saves[0] && (
          <button className="btn-primary w-full !py-3.5 text-base" onClick={() => open(saves[0].id!)} disabled={busy}>
            <Play size={18} /> Continue as {saves[0].clubName}
          </button>
        )}
        <button className={`${saves && saves[0] ? 'btn-secondary' : 'btn-primary'} w-full !py-3.5 text-base`} onClick={() => nav('/new')}>
          <Plus size={18} /> New Game
        </button>
        <button className="btn-secondary w-full !py-3" onClick={() => nav('/editor')}>
          <Database size={18} /> Database Editor
        </button>
      </div>

      {saves && saves.length > 0 && (
        <div className="px-4 mt-8 max-w-md w-full mx-auto">
          <div className="panel">
            <div className="panel-head flex items-center gap-2">
              <FolderOpen size={14} /> Saved games
            </div>
            {saves.map((s) => (
              <div key={s.id} className="row">
                <button className="flex-1 flex items-center gap-3 text-left min-w-0" onClick={() => open(s.id!)} disabled={busy}>
                  <ClubBadge club={{ colors: s.clubColors, short: s.clubName.slice(0, 3).toUpperCase() }} size={32} />
                  <div className="min-w-0">
                    <div className="font-bold truncate">{s.clubName}</div>
                    <div className="text-xs text-ink-300 truncate">
                      {s.managerName} · {seasonLabel(s.season)} · {fmtDate(s.date, false)}
                    </div>
                  </div>
                </button>
                {confirmDel === s.id ? (
                  <button
                    className="btn-danger !py-1 text-xs"
                    onClick={async () => {
                      await deleteSave(s.id!);
                      setConfirmDel(null);
                      void refresh();
                    }}
                  >
                    Delete?
                  </button>
                ) : (
                  <button className="btn-ghost !p-2" onClick={() => setConfirmDel(s.id!)} aria-label="Delete save">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1" />
      <p className="text-center text-[11px] text-ink-500 px-6 py-6">
        An unofficial tribute to Football Manager 2005. Not affiliated with Sports Interactive, SEGA or any club or league. Player data is a
        best-effort snapshot and can be edited in the Database Editor.
      </p>
    </div>
  );
}

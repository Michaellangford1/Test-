import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, Download, Plus, RotateCcw, Trash2, Upload } from 'lucide-react';
import type { RawClub, RawDatabase } from '../data/types';
import { DEFAULT_DATABASE } from '../data';
import { cloneDatabase, loadActiveDatabase } from '../store/database';
import { setCustomDatabase } from '../store/db';
import { parsePlayerLine, validateDatabase } from '../game/build';
import { TRAITS } from '../game/attributes';
import type { Pos } from '../game/types';
import { ClubBadge, PageHeader, Panel, PosBadge, Sheet } from '../ui/components';
import { NATIONS } from '../game/names';

const ALL_POS: Pos[] = ['GK', 'DR', 'DC', 'DL', 'WBR', 'WBL', 'DM', 'MR', 'MC', 'ML', 'AMR', 'AMC', 'AML', 'ST'];

interface EditablePlayer {
  name: string;
  positions: Pos[];
  age: number;
  nat: string;
  ability: number;
  potential?: number;
  traits: string[];
}

function toLine(p: EditablePlayer): string {
  const ab = p.potential && p.potential > p.ability ? `${p.ability}/${p.potential}` : `${p.ability}`;
  const tr = p.traits.length ? `|${p.traits.join(',')}` : '';
  return `${p.name.replace(/\|/g, '')}|${p.positions.join('/')}|${p.age}|${p.nat}|${ab}${tr}`;
}

function parseClub(c: RawClub): { players: EditablePlayer[]; bad: string[] } {
  const players: EditablePlayer[] = [];
  const bad: string[] = [];
  for (const line of c.players.split('\n')) {
    const l = line.trim();
    if (!l) continue;
    try {
      const p = parsePlayerLine(l);
      players.push({ ...p, traits: p.traits ?? [] });
    } catch {
      bad.push(l);
    }
  }
  return { players, bad };
}

function serialiseClub(players: EditablePlayer[], bad: string[] = []): string {
  return '\n' + [...players.map(toLine), ...bad].join('\n') + '\n';
}

// ---------------------------------------------------------------------------

function useEditorDb() {
  const [db, setDb] = useState<RawDatabase | null>(null);
  const [custom, setCustom] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    void loadActiveDatabase().then(({ db, custom }) => {
      setDb(cloneDatabase(db));
      setCustom(custom);
    });
  }, []);
  const update = useCallback((fn: (d: RawDatabase) => void) => {
    setDb((prev) => {
      if (!prev) return prev;
      const next = cloneDatabase(prev);
      fn(next);
      if (!next.name.includes('(edited)')) next.name = `${next.name} (edited)`;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => void setCustomDatabase(next), 400);
      return next;
    });
    setCustom(true);
  }, []);
  const reset = useCallback(async () => {
    await setCustomDatabase(null);
    setDb(cloneDatabase(DEFAULT_DATABASE));
    setCustom(false);
  }, []);
  const replace = useCallback(async (d: RawDatabase) => {
    await setCustomDatabase(d);
    setDb(cloneDatabase(d));
    setCustom(true);
  }, []);
  return { db, custom, update, reset, replace };
}

export default function Editor() {
  const ed = useEditorDb();
  if (!ed.db) return <PageHeader title="Database Editor" sub="Loading…" />;
  return (
    <div className="min-h-full safe-top">
      <Routes>
        <Route index element={<Home {...ed} db={ed.db} />} />
        <Route path=":league" element={<LeagueView db={ed.db} />} />
        <Route path=":league/:club" element={<ClubEditor db={ed.db} update={ed.update} />} />
      </Routes>
    </div>
  );
}

function Home({ db, custom, reset, replace }: { db: RawDatabase; custom: boolean; reset: () => Promise<void>; replace: (d: RawDatabase) => Promise<void> }) {
  const nav = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const errors = useMemo(() => validateDatabase(db), [db]);
  const count = db.leagues.reduce((n, l) => n + l.clubs.reduce((m, c) => m + c.players.split('\n').filter((x) => x.trim()).length, 0), 0);

  const exportDb = () => {
    const blob = new Blob([JSON.stringify(db, null, 1)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `gaffer05-database-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };

  const importDb = async (file: File) => {
    try {
      const data = JSON.parse(await file.text()) as RawDatabase;
      if (!Array.isArray(data.leagues) || !data.leagues.length || typeof data.season !== 'number') throw new Error('Not a Gaffer database file');
      for (const l of data.leagues) if (!l.id || !Array.isArray(l.clubs)) throw new Error('Malformed league');
      await replace(data);
      const errs = validateDatabase(data);
      setMsg(`Imported "${data.name}"${errs.length ? ` with ${errs.length} invalid player lines (they will be skipped)` : ''}.`);
    } catch (e) {
      setMsg(`Import failed: ${(e as Error).message}`);
    }
  };

  return (
    <div className="pb-8">
      <PageHeader title="Database Editor" sub={`${db.name} · ${count.toLocaleString()} players`} />
      <div className="p-3 space-y-3">
        <p className="text-sm text-ink-300">
          Edit clubs and players before starting a new game. Changes are saved on this device and used for every new game. Existing saves are not affected.
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button className="btn-secondary !py-2.5 text-xs" onClick={exportDb}>
            <Download size={16} /> Export
          </button>
          <button className="btn-secondary !py-2.5 text-xs" onClick={() => fileRef.current?.click()}>
            <Upload size={16} /> Import
          </button>
          {confirmReset ? (
            <button
              className="btn-danger !py-2.5 text-xs"
              onClick={async () => {
                await reset();
                setConfirmReset(false);
                setMsg('Restored the bundled 2025/26 database.');
              }}
            >
              Confirm
            </button>
          ) : (
            <button className="btn-secondary !py-2.5 text-xs" onClick={() => setConfirmReset(true)} disabled={!custom}>
              <RotateCcw size={16} /> Reset
            </button>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void importDb(f);
            e.target.value = '';
          }}
        />
        {msg && <div className="text-sm text-gold">{msg}</div>}
        {errors.length > 0 && (
          <Panel title={`${errors.length} problems`}>
            {errors.slice(0, 10).map((e, i) => (
              <div key={i} className="row text-xs">
                <span className="flex-1 truncate">{e.line}</span>
                <span className="text-loss">{e.error}</span>
              </div>
            ))}
          </Panel>
        )}
        <Panel title="Leagues">
          {db.leagues.map((l) => (
            <button key={l.id} className="row-tap w-full text-left !py-3" onClick={() => nav(`/editor/${l.id}`)}>
              <div className="flex-1">
                <div className="font-bold">{l.name}</div>
                <div className="text-xs text-ink-300">{l.clubs.length} clubs</div>
              </div>
              <ChevronRight size={18} className="text-ink-400" />
            </button>
          ))}
        </Panel>
      </div>
    </div>
  );
}

function LeagueView({ db }: { db: RawDatabase }) {
  const { league } = useParams();
  const nav = useNavigate();
  const lg = db.leagues.find((l) => l.id === league);
  if (!lg) return <PageHeader title="League not found" />;
  return (
    <div>
      <PageHeader title={lg.name} sub={`${lg.clubs.length} clubs`} />
      {lg.clubs.map((c, i) => (
        <button key={i} className="row-tap w-full text-left" onClick={() => nav(`/editor/${lg.id}/${i}`)}>
          <ClubBadge club={{ colors: c.colors, short: c.short }} size={30} />
          <div className="flex-1 min-w-0">
            <div className="font-bold truncate">{c.name}</div>
            <div className="text-xs text-ink-300">
              {c.players.split('\n').filter((x) => x.trim()).length} players · rep {c.rep}
            </div>
          </div>
          <ChevronRight size={18} className="text-ink-400" />
        </button>
      ))}
    </div>
  );
}

function ClubEditor({ db, update }: { db: RawDatabase; update: (fn: (d: RawDatabase) => void) => void }) {
  const { league, club } = useParams();
  const lgIdx = db.leagues.findIndex((l) => l.id === league);
  const cIdx = Number(club);
  const c = db.leagues[lgIdx]?.clubs[cIdx];
  const parsed = useMemo(() => (c ? parseClub(c) : { players: [], bad: [] }), [c]);
  const [editing, setEditing] = useState<number | 'new' | null>(null);
  if (!c) return <PageHeader title="Club not found" />;

  const setClub = (fn: (c: RawClub) => void) => update((d) => fn(d.leagues[lgIdx].clubs[cIdx]));
  const setPlayers = (players: EditablePlayer[]) => setClub((c) => (c.players = serialiseClub(players, parsed.bad)));

  return (
    <div className="pb-8">
      <PageHeader title={c.name} sub={db.leagues[lgIdx].name} />
      <div className="p-3 space-y-3">
        <Panel title="Club">
          <div className="p-3 grid grid-cols-2 gap-2">
            <Field label="Name" span>
              <input className="w-full" value={c.name} onChange={(e) => setClub((c) => (c.name = e.target.value))} />
            </Field>
            <Field label="Short name">
              <input className="w-full" maxLength={4} value={c.short} onChange={(e) => setClub((c) => (c.short = e.target.value.toUpperCase()))} />
            </Field>
            <Field label="Reputation (1-100)">
              <input className="w-full" type="number" min={1} max={100} value={c.rep} onChange={(e) => setClub((c) => (c.rep = clamp(+e.target.value, 1, 100)))} />
            </Field>
            <Field label="Stadium" span>
              <input className="w-full" value={c.stadium} onChange={(e) => setClub((c) => (c.stadium = e.target.value))} />
            </Field>
            <Field label="Capacity">
              <input className="w-full" type="number" value={c.capacity} onChange={(e) => setClub((c) => (c.capacity = clamp(+e.target.value, 1000, 120000)))} />
            </Field>
            <Field label="Bank (£m)">
              <input className="w-full" type="number" value={c.money} onChange={(e) => setClub((c) => (c.money = clamp(+e.target.value, -500, 5000)))} />
            </Field>
            <Field label="Colours">
              <div className="flex gap-2">
                <input type="color" className="h-9 w-full !p-0.5" value={c.colors[0]} onChange={(e) => setClub((c) => (c.colors = [e.target.value, c.colors[1]]))} />
                <input type="color" className="h-9 w-full !p-0.5" value={c.colors[1]} onChange={(e) => setClub((c) => (c.colors = [c.colors[0], e.target.value]))} />
              </div>
            </Field>
          </div>
        </Panel>

        <Panel title={`Players (${parsed.players.length})`} right={<button className="normal-case text-gold flex items-center gap-1" onClick={() => setEditing('new')}><Plus size={14} /> Add</button>}>
          {parsed.players.map((p, i) => (
            <button key={i} className="row-tap w-full text-left" onClick={() => setEditing(i)}>
              <PosBadge pos={p.positions[0]} />
              <div className="flex-1 min-w-0">
                <div className="truncate">{p.name}</div>
                <div className="text-[11px] text-ink-300">
                  {p.age}y · {p.nat} · {p.positions.join('/')}
                  {p.traits.length ? ` · ${p.traits.join(', ')}` : ''}
                </div>
              </div>
              <span className="text-sm font-bold tabular-nums">
                {p.ability}
                {p.potential ? <span className="text-ink-400">/{p.potential}</span> : null}
              </span>
            </button>
          ))}
          {parsed.bad.length > 0 && <div className="px-3 py-2 text-xs text-loss">{parsed.bad.length} invalid lines kept as-is.</div>}
        </Panel>
      </div>

      {editing != null && (
        <PlayerForm
          db={db}
          initial={editing === 'new' ? { name: '', positions: ['MC'], age: 22, nat: 'ENG', ability: 65, traits: [] } : parsed.players[editing]}
          onClose={() => setEditing(null)}
          onSave={(p, moveTo) => {
            if (moveTo && editing !== 'new') {
              update((d) => {
                const src = d.leagues[lgIdx].clubs[cIdx];
                const srcParsed = parseClub(src);
                srcParsed.players.splice(editing, 1);
                src.players = serialiseClub(srcParsed.players, srcParsed.bad);
                const [tl, tc] = moveTo.split(':');
                const dst = d.leagues.find((l) => l.id === tl)!.clubs[+tc];
                dst.players = dst.players.replace(/\s*$/, '') + '\n' + toLine(p) + '\n';
              });
            } else {
              const list = [...parsed.players];
              if (editing === 'new') list.push(p);
              else list[editing] = p;
              setPlayers(list);
            }
            setEditing(null);
          }}
          onDelete={
            editing === 'new'
              ? undefined
              : () => {
                  const list = parsed.players.filter((_, i) => i !== editing);
                  setPlayers(list);
                  setEditing(null);
                }
          }
        />
      )}
    </div>
  );
}

function Field({ label, children, span }: { label: string; children: React.ReactNode; span?: boolean }) {
  return (
    <label className={`block ${span ? 'col-span-2' : ''}`}>
      <span className="text-[11px] uppercase font-bold text-ink-300">{label}</span>
      <div className="mt-0.5">{children}</div>
    </label>
  );
}

const clamp = (v: number, lo: number, hi: number) => (Number.isFinite(v) ? Math.max(lo, Math.min(hi, Math.round(v))) : lo);

function PlayerForm({
  db,
  initial,
  onClose,
  onSave,
  onDelete,
}: {
  db: RawDatabase;
  initial: EditablePlayer;
  onClose: () => void;
  onSave: (p: EditablePlayer, moveTo?: string) => void;
  onDelete?: () => void;
}) {
  const [p, setP] = useState<EditablePlayer>({ ...initial, positions: [...initial.positions], traits: [...initial.traits] });
  const [moveTo, setMoveTo] = useState('');
  const [confirmDel, setConfirmDel] = useState(false);
  const nations = useMemo(() => Object.entries(NATIONS).sort((a, b) => a[1].localeCompare(b[1])), []);
  const togglePos = (pos: Pos) =>
    setP((x) => {
      const has = x.positions.includes(pos);
      const positions = has ? x.positions.filter((q) => q !== pos) : [...x.positions, pos];
      return { ...x, positions: positions.length ? positions : x.positions };
    });
  const valid = p.name.trim().length > 1 && p.positions.length > 0;

  return (
    <Sheet open onClose={onClose} title={initial.name || 'New player'}>
      <div className="p-4 space-y-3">
        <Field label="Name">
          <input className="w-full" value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} />
        </Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Age">
            <input className="w-full" type="number" value={p.age} onChange={(e) => setP({ ...p, age: clamp(+e.target.value, 15, 45) })} />
          </Field>
          <Field label="Nationality">
            <select className="w-full" value={p.nat} onChange={(e) => setP({ ...p, nat: e.target.value })}>
              {!NATIONS[p.nat] && <option value={p.nat}>{p.nat}</option>}
              {nations.map(([code, n]) => (
                <option key={code} value={code}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Positions (first selected is natural position)">
          <div className="flex flex-wrap gap-1.5">
            {ALL_POS.map((pos) => {
              const i = p.positions.indexOf(pos);
              return (
                <button key={pos} type="button" onClick={() => togglePos(pos)} className={`chip !px-2 !leading-7 ${i >= 0 ? (i === 0 ? 'bg-gold text-black' : 'bg-ink-400 text-black') : 'bg-ink-700 text-ink-300'}`}>
                  {pos}
                </button>
              );
            })}
          </div>
        </Field>
        <Field label={`Ability: ${p.ability}`}>
          <input className="w-full !p-0 !border-0" type="range" min={30} max={99} value={p.ability} onChange={(e) => setP({ ...p, ability: +e.target.value, potential: p.potential && p.potential < +e.target.value ? +e.target.value : p.potential })} />
        </Field>
        <Field label={`Potential: ${p.potential ?? 'auto (from age)'}`}>
          <div className="flex items-center gap-2">
            <input className="flex-1 !p-0 !border-0" type="range" min={p.ability} max={99} value={p.potential ?? p.ability} onChange={(e) => setP({ ...p, potential: +e.target.value })} />
            <button type="button" className="btn-ghost text-xs" onClick={() => setP({ ...p, potential: undefined })}>
              Auto
            </button>
          </div>
        </Field>
        <Field label="Style traits">
          <div className="flex flex-wrap gap-1.5">
            {Object.keys(TRAITS).map((t) => {
              const on = p.traits.includes(t);
              return (
                <button key={t} type="button" onClick={() => setP({ ...p, traits: on ? p.traits.filter((x) => x !== t) : [...p.traits, t] })} className={`chip !px-2 !leading-7 ${on ? 'bg-sky-600 text-white' : 'bg-ink-700 text-ink-300'}`}>
                  {t}
                </button>
              );
            })}
          </div>
        </Field>
        {onDelete && (
          <Field label="Move to another club">
            <select className="w-full" value={moveTo} onChange={(e) => setMoveTo(e.target.value)}>
              <option value="">Keep at this club</option>
              {db.leagues.map((l) => (
                <optgroup key={l.id} label={l.name}>
                  {l.clubs.map((c, i) => (
                    <option key={i} value={`${l.id}:${i}`}>
                      {c.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </Field>
        )}
        <div className="flex gap-2 pt-2">
          {onDelete &&
            (confirmDel ? (
              <button className="btn-danger" onClick={onDelete}>
                Delete?
              </button>
            ) : (
              <button className="btn-secondary" onClick={() => setConfirmDel(true)} aria-label="Delete player">
                <Trash2 size={16} />
              </button>
            ))}
          <button className="btn-primary flex-1 !py-3" disabled={!valid} onClick={() => onSave({ ...p, name: p.name.trim() }, moveTo || undefined)}>
            Save player
          </button>
        </div>
      </div>
    </Sheet>
  );
}

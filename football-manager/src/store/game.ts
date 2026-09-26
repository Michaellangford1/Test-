import { create } from 'zustand';
import type { World } from '../game/types';
import type { RawDatabase } from '../data/types';
import { createWorld, type NewGameOptions } from '../game/build';
import { continueGame, completeUserMatch, quickSimUserMatch, startCareer, worldRng, saveRng, type StopReason } from '../game/advance';
import { MatchEngine } from '../game/match/engine';
import { newEngine } from '../game/results';
import { invalidateSquads } from '../game/squad';
import { clearAttrCache } from '../game/attributes';
import { readSave, writeSave } from './db';

interface GameState {
  world: World | null;
  saveId: number | null;
  version: number;
  busy: boolean;
  toast: string | null;
  live: MatchEngine | null;
  lastMatch: MatchEngine | null;

  newGame(db: RawDatabase, opts: NewGameOptions): Promise<void>;
  load(id: number): Promise<boolean>;
  quit(): void;
  save(): Promise<void>;
  /** Mutate the world and re-render */
  mutate(fn: (w: World) => void, opts?: { save?: boolean }): void;
  continue(): Promise<StopReason | null>;
  startLiveMatch(): MatchEngine | null;
  finishLiveMatch(): void;
  quickMatch(): void;
  showToast(msg: string): void;
  clearLastMatch(): void;
}

let saveTimer: ReturnType<typeof setTimeout> | null = null;

export const useGame = create<GameState>((set, get) => ({
  world: null,
  saveId: null,
  version: 0,
  busy: false,
  toast: null,
  live: null,
  lastMatch: null,

  async newGame(db, opts) {
    set({ busy: true });
    // let the UI paint the loading state first
    await new Promise((r) => setTimeout(r, 30));
    clearAttrCache();
    const w = createWorld(db, opts);
    startCareer(w);
    const id = await writeSave(w);
    set({ world: w, saveId: id, busy: false, version: get().version + 1, live: null, lastMatch: null });
  },

  async load(id) {
    set({ busy: true });
    const w = await readSave(id);
    if (!w) {
      set({ busy: false });
      return false;
    }
    clearAttrCache();
    invalidateSquads(w);
    set({ world: w, saveId: id, busy: false, version: get().version + 1, live: null, lastMatch: null });
    return true;
  },

  quit() {
    set({ world: null, saveId: null, live: null, lastMatch: null });
  },

  async save() {
    const { world, saveId } = get();
    if (!world) return;
    const id = await writeSave(world, saveId ?? undefined);
    if (saveId == null) set({ saveId: id });
  },

  mutate(fn, opts) {
    const w = get().world;
    if (!w) return;
    fn(w);
    set({ version: get().version + 1 });
    if (opts?.save !== false) scheduleSave();
  },

  async continue() {
    const w = get().world;
    if (!w || get().busy || w.pendingMatch != null) return null;
    set({ busy: true });
    await new Promise((r) => setTimeout(r, 16));
    let reason: StopReason;
    try {
      reason = continueGame(w, 21);
    } finally {
      set({ busy: false, version: get().version + 1 });
    }
    scheduleSave(0);
    return reason;
  },

  startLiveMatch() {
    const w = get().world;
    if (!w || w.pendingMatch == null) return null;
    const existing = get().live;
    if (existing && existing.fx.id === w.pendingMatch) return existing;
    const fx = w.fixtures.find((f) => f.id === w.pendingMatch)!;
    const rng = worldRng(w);
    const eng = newEngine(w, fx, rng, true);
    set({ live: eng });
    return eng;
  },

  finishLiveMatch() {
    const w = get().world;
    const eng = get().live;
    if (!w || !eng) return;
    if (!eng.finished) eng.simulateToEnd();
    saveRng(w, eng.rng);
    completeUserMatch(w, eng);
    set({ live: null, lastMatch: eng, version: get().version + 1 });
    scheduleSave(0);
  },

  quickMatch() {
    const w = get().world;
    if (!w) return;
    const eng = quickSimUserMatch(w);
    set({ lastMatch: eng ?? null, live: null, version: get().version + 1 });
    scheduleSave(0);
  },

  showToast(msg) {
    set({ toast: msg });
    setTimeout(() => {
      if (get().toast === msg) set({ toast: null });
    }, 2800);
  },

  clearLastMatch() {
    set({ lastMatch: null });
  },
}));

function scheduleSave(delay = 800) {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveTimer = null;
    void useGame.getState().save();
  }, delay);
}

/** Hook: the current world, re-rendering whenever it changes */
export function useWorld(): World {
  const w = useGame((s) => s.world);
  useGame((s) => s.version);
  if (!w) throw new Error('No game loaded');
  return w;
}

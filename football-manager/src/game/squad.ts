import type { Club, Player, Pos, Tactics, World } from './types';
import { FORMATIONS } from './formations';
import { positionRating } from './attributes';

// ---- squad index ----------------------------------------------------------
const index = new WeakMap<World, Map<number | null, Player[]>>();

export function invalidateSquads(w: World) {
  index.delete(w);
}

function build(w: World): Map<number | null, Player[]> {
  const m = new Map<number | null, Player[]>();
  for (const p of Object.values(w.players)) {
    const k = p.clubId;
    let arr = m.get(k);
    if (!arr) m.set(k, (arr = []));
    arr.push(p);
  }
  index.set(w, m);
  return m;
}

export function getSquad(w: World, clubId: number): Player[] {
  const m = index.get(w) ?? build(w);
  return m.get(clubId) ?? [];
}

export function getFreeAgents(w: World): Player[] {
  const m = index.get(w) ?? build(w);
  return m.get(null) ?? [];
}

export function movePlayer(w: World, p: Player, clubId: number | null) {
  p.clubId = clubId;
  p.joined = w.date;
  p.transferListed = false;
  invalidateSquads(w);
}

// ---- availability ---------------------------------------------------------
export function isAvailable(p: Player): boolean {
  return !p.injury && p.suspended <= 0;
}

export function conditionFactor(cond: number): number {
  return 0.72 + 0.28 * Math.min(100, Math.max(0, cond)) / 100;
}

/** Rating used when choosing players: ability in slot, adjusted for fitness */
export function selectionScore(p: Player, pos: Pos): number {
  const cond = p.condition;
  const penalty = cond < 75 ? (75 - cond) * 0.6 : 0;
  return positionRating(p, pos) - penalty;
}

// ---- automatic team selection --------------------------------------------
export function autoPick(w: World, club: Club, formation?: string): Pick<Tactics, 'lineup' | 'subs'> {
  const f = FORMATIONS[formation ?? club.tactics.formation] ?? FORMATIONS['4-4-2'];
  const squad = getSquad(w, club.id).filter(isAvailable);
  const lineup: (number | null)[] = new Array(f.length).fill(null);
  const used = new Set<number>();

  // Build score matrix then assign greedily by best (player, slot) pair.
  const pairs: { s: number; pi: number; si: number }[] = [];
  squad.forEach((p, pi) => {
    f.forEach((slot, si) => {
      pairs.push({ s: selectionScore(p, slot.pos), pi, si });
    });
  });
  pairs.sort((a, b) => b.s - a.s);
  for (const pr of pairs) {
    if (lineup[pr.si] != null) continue;
    const p = squad[pr.pi];
    if (used.has(p.id)) continue;
    lineup[pr.si] = p.id;
    used.add(p.id);
    if (used.size === f.length) break;
  }

  // Bench: one GK if possible, then best remaining outfielders by ability
  const rest = squad.filter((p) => !used.has(p.id));
  const subs: number[] = [];
  const gk = rest.filter((p) => p.positions[0] === 'GK').sort((a, b) => b.ability * cf(b) - a.ability * cf(a))[0];
  if (gk) subs.push(gk.id);
  rest
    .filter((p) => p.positions[0] !== 'GK')
    .sort((a, b) => b.ability * cf(b) - a.ability * cf(a))
    .slice(0, 9 - subs.length)
    .forEach((p) => subs.push(p.id));
  return { lineup, subs };
}

const cf = (p: Player) => conditionFactor(p.condition);

/** Make sure a club's tactics reference valid, available players */
export function validateLineup(w: World, club: Club): string[] {
  const issues: string[] = [];
  const t = club.tactics;
  const f = FORMATIONS[t.formation];
  if (!f) return ['Unknown formation'];
  const ids = new Set<number>();
  t.lineup.forEach((id, i) => {
    if (id == null) {
      issues.push(`No player selected at ${f[i].pos}`);
      return;
    }
    const p = w.players[id];
    if (!p || p.clubId !== club.id) issues.push(`A selected player has left the club`);
    else if (p.injury) issues.push(`${p.short} is injured`);
    else if (p.suspended > 0) issues.push(`${p.short} is suspended`);
    if (ids.has(id)) issues.push('Player selected twice');
    ids.add(id);
  });
  return issues;
}

/** Remove unavailable players from a lineup and refill the gaps automatically */
export function repairLineup(w: World, club: Club) {
  const t = club.tactics;
  const f = FORMATIONS[t.formation] ?? FORMATIONS['4-4-2'];
  if (t.lineup.length !== f.length) t.lineup = new Array(f.length).fill(null);
  const ok = (id: number | null) => {
    if (id == null) return false;
    const p = w.players[id];
    return !!p && p.clubId === club.id && isAvailable(p);
  };
  const seen = new Set<number>();
  t.lineup = t.lineup.map((id) => {
    if (!ok(id) || seen.has(id!)) return null;
    seen.add(id!);
    return id;
  });
  t.subs = t.subs.filter((id) => ok(id) && !seen.has(id));
  const available = getSquad(w, club.id).filter((p) => isAvailable(p) && !seen.has(p.id) && !t.subs.includes(p.id));
  t.lineup = t.lineup.map((id, i) => {
    if (id != null) return id;
    const pos = f[i].pos;
    let best: Player | null = null;
    let bs = -1e9;
    for (const p of available) {
      if (seen.has(p.id)) continue;
      const s = selectionScore(p, pos);
      if (s > bs) {
        bs = s;
        best = p;
      }
    }
    if (!best) {
      // raid the bench if needed
      const benchP = t.subs.map((sid) => w.players[sid]).sort((a, b) => selectionScore(b, pos) - selectionScore(a, pos))[0];
      if (benchP) {
        t.subs = t.subs.filter((s) => s !== benchP.id);
        seen.add(benchP.id);
        return benchP.id;
      }
      return null;
    }
    seen.add(best.id);
    return best.id;
  });
  if (t.subs.length < 9) {
    const more = getSquad(w, club.id)
      .filter((p) => isAvailable(p) && !seen.has(p.id) && !t.subs.includes(p.id))
      .sort((a, b) => b.ability - a.ability);
    for (const p of more) {
      if (t.subs.length >= 9) break;
      t.subs.push(p.id);
    }
  }
  if (t.captain == null || !seen.has(t.captain)) t.captain = pickCaptain(w, t.lineup);
}

export function pickCaptain(w: World, lineup: (number | null)[]): number | null {
  let best: number | null = null;
  let bs = -1;
  for (const id of lineup) {
    if (id == null) continue;
    const p = w.players[id];
    const s = p.ability + p.age * 0.6 + (p.traits?.includes('leader') ? 15 : 0);
    if (s > bs) {
      bs = s;
      best = id;
    }
  }
  return best;
}

/** AI: choose a formation that suits the squad */
export function bestFormation(w: World, club: Club): string {
  const squad = getSquad(w, club.id);
  const count = (pred: (p: Player) => boolean) => squad.filter((p) => p.ability > 0 && pred(p)).length;
  const wingers = count((p) => p.positions.some((x) => x === 'AMR' || x === 'AML'));
  const wide = count((p) => p.positions.some((x) => x === 'MR' || x === 'ML'));
  const strikers = count((p) => p.positions.includes('ST'));
  const amc = count((p) => p.positions.includes('AMC'));
  const wbs = count((p) => p.positions.some((x) => x === 'WBR' || x === 'WBL'));
  const dcs = count((p) => p.positions.includes('DC'));
  if (wbs >= 3 && dcs >= 5) return strikers >= 3 ? '3-5-2' : '3-4-3';
  if (wingers >= 4 && amc >= 2) return '4-2-3-1';
  if (wingers >= 4) return '4-3-3';
  if (wide >= 3 && strikers >= 4) return '4-4-2';
  if (amc >= 2 && strikers >= 3) return '4-1-2-1-2';
  return '4-2-3-1';
}

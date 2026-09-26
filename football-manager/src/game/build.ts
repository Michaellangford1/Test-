import type { RawClub, RawDatabase } from '../data/types';
import type { Club, League, Player, Pos, SeasonStats, Tactics, World } from './types';
import { Rng, hashString } from './rng';
import { TRAITS } from './attributes';
import { expectedWage, playerValue } from './valuation';
import { randomName, YOUTH_NATS } from './names';
import { generateSeasonFixtures } from './fixtures';
import { autoPick, bestFormation, invalidateSquads, pickCaptain } from './squad';
import { setBudgets } from './finance';

export const SAVE_VERSION = 1;
const VALID_POS = new Set<Pos>(['GK', 'DR', 'DC', 'DL', 'WBR', 'WBL', 'DM', 'MR', 'MC', 'ML', 'AMR', 'AMC', 'AML', 'ST']);
export const MIN_SQUAD = 24;

export function emptyStats(): SeasonStats {
  return { apps: 0, subApps: 0, goals: 0, assists: 0, ratingSum: 0, rated: 0, yellows: 0, reds: 0, motm: 0, cleanSheets: 0 };
}

export function defaultTactics(): Tactics {
  return {
    formation: '4-4-2',
    lineup: [],
    subs: [],
    mentality: 'balanced',
    passing: 'mixed',
    pressing: 'normal',
    tempo: 'normal',
    captain: null,
    penaltyTaker: null,
    freeKickTaker: null,
  };
}

export function defaultPotential(ability: number, age: number, rng: Rng): number {
  let gap = 0;
  if (age <= 17) gap = 14;
  else if (age <= 19) gap = 10;
  else if (age <= 21) gap = 6;
  else if (age <= 23) gap = 3;
  else if (age <= 25) gap = 1;
  gap += rng.int(-2, 3);
  return Math.min(96, Math.max(ability, ability + gap));
}

export interface ParseError {
  line: string;
  error: string;
}

/** Parse one database player line. Throws on malformed input. */
export function parsePlayerLine(line: string): {
  name: string;
  positions: Pos[];
  age: number;
  nat: string;
  ability: number;
  potential?: number;
  traits?: string[];
} {
  const parts = line.split('|').map((s) => s.trim());
  if (parts.length < 5) throw new Error('expected Name|Pos|Age|Nat|Ability');
  const [name, posStr, ageStr, nat, abStr, traitStr] = parts;
  const positions = posStr.split('/').map((s) => s.trim().toUpperCase()) as Pos[];
  for (const p of positions) if (!VALID_POS.has(p)) throw new Error(`unknown position "${p}"`);
  const age = parseInt(ageStr, 10);
  if (!(age >= 14 && age <= 45)) throw new Error('age must be 14-45');
  const [ab, pot] = abStr.split('/').map((s) => parseInt(s, 10));
  if (!(ab >= 1 && ab <= 100)) throw new Error('ability must be 1-100');
  if (pot != null && !(pot >= 1 && pot <= 100)) throw new Error('potential must be 1-100');
  const traits = traitStr ? traitStr.split(',').map((s) => s.trim()).filter((t) => TRAITS[t]) : undefined;
  return { name, positions, age, nat: nat.toUpperCase(), ability: ab, potential: pot, traits };
}

export function validateDatabase(db: RawDatabase): ParseError[] {
  const errors: ParseError[] = [];
  for (const lg of db.leagues)
    for (const c of lg.clubs)
      for (const line of c.players.split('\n')) {
        const l = line.trim();
        if (!l) continue;
        try {
          parsePlayerLine(l);
        } catch (e) {
          errors.push({ line: `${c.name}: ${l}`, error: (e as Error).message });
        }
      }
  return errors;
}

function shortName(name: string): string {
  const parts = name.split(' ');
  if (parts.length === 1) return name;
  // keep particles like "van", "de", "Di"
  const particles = new Set(['van', 'de', 'der', 'den', 'da', 'di', 'dos', 'do', 'le', 'la', 'von', 'el', 'al', 'Van', 'De', 'Di', 'Da', 'El', 'Al', 'Mac']);
  let i = parts.length - 1;
  while (i > 1 && particles.has(parts[i - 1])) i--;
  // Asian names already written as Family Given (e.g. "Kim Min-jae") keep first token
  return parts.slice(i).join(' ');
}

const KOREAN = new Set(['Kim', 'Lee', 'Hwang', 'Paik', 'Jeong', 'Bae', 'Son', 'Park']);

function contractYears(age: number, rng: Rng): number {
  if (age <= 21) return rng.int(2, 5);
  if (age <= 28) return rng.int(1, 5);
  if (age <= 31) return rng.int(1, 3);
  return rng.int(1, 2);
}

export function makePlayer(
  w: World,
  rng: Rng,
  data: { name: string; short?: string; positions: Pos[]; age: number; nat: string; ability: number; potential?: number; traits?: string[] },
  clubId: number | null,
  clubRep: number,
): Player {
  const id = w.nextId.player++;
  const firstToken = data.name.split(' ')[0];
  const short = data.short ?? (KOREAN.has(firstToken) && data.nat === 'KOR' ? firstToken : shortName(data.name));
  const p: Player = {
    id,
    name: data.name,
    short,
    nat: data.nat,
    age: data.age,
    positions: data.positions,
    foot: rng.chance(0.22) ? 'L' : rng.chance(0.05) ? 'B' : 'R',
    seed: hashString(data.name) ^ (id * 2654435761),
    traits: data.traits,
    ability: data.ability,
    potential: data.potential ?? defaultPotential(data.ability, data.age, rng),
    clubId,
    squadNo: 0,
    value: 0,
    wage: 0,
    contractEnd: w.season + contractYears(data.age, rng),
    morale: 13,
    condition: 100,
    sharpness: 60,
    injury: null,
    suspended: 0,
    form: [],
    stats: emptyStats(),
    career: [],
    transferListed: false,
    joined: `${w.season - rng.int(0, 4)}-07-01`,
  };
  p.value = playerValue(p, w.season);
  p.wage = expectedWage(p, clubRep);
  return p;
}

const GEN_POSITIONS: Pos[][] = [
  ['GK'],
  ['DC'],
  ['DC'],
  ['DR'],
  ['DL'],
  ['DM'],
  ['MC'],
  ['MC'],
  ['AMR'],
  ['AML'],
  ['AMC'],
  ['ST'],
  ['ST'],
];

/** Create a generated player (squad filler or youth intake) */
export function generatePlayer(
  w: World,
  rng: Rng,
  opts: { clubId: number | null; country: string; ability: number; potential?: number; age: number; positions?: Pos[]; clubRep: number },
): Player {
  const natMix = YOUTH_NATS[opts.country] ?? YOUTH_NATS.ENG;
  const nat = rng.weighted(natMix, ([, wt]) => wt)[0];
  const { name, short } = randomName(rng, nat);
  const positions = opts.positions ?? rng.pick(GEN_POSITIONS);
  return makePlayer(
    w,
    rng,
    {
      name,
      short,
      positions,
      age: opts.age,
      nat,
      ability: Math.round(opts.ability),
      potential: opts.potential,
    },
    opts.clubId,
    opts.clubRep,
  );
}

function makeClub(w: World, raw: RawClub, league: League, id: number): Club {
  const money = raw.money * 1_000_000;
  return {
    id,
    name: raw.name,
    short: raw.short,
    leagueId: league.id,
    reputation: raw.rep,
    stadium: raw.stadium,
    capacity: raw.capacity,
    colors: raw.colors,
    finances: {
      balance: money,
      transferBudget: Math.round(Math.max(1_000_000, money * 0.6 + raw.rep * raw.rep * 2_000) / 100_000) * 100_000,
      wageBudget: 0,
      seasonIncome: { gate: 0, tv: 0, commercial: 0, transfers: 0, prize: 0 },
      seasonExpense: { wages: 0, transfers: 0, other: 0 },
    },
    tactics: defaultTactics(),
    training: 'balanced',
    boardConfidence: 70,
    youthRating: Math.max(5, Math.min(20, Math.round(raw.rep / 5 + (w.rngState % 3)))),
    facilities: Math.max(5, Math.min(20, Math.round(raw.rep / 5))),
  };
}

/** Which positions a squad is missing, used to fill generated players sensibly */
function neededPositions(players: Player[]): Pos[] {
  const need: Pos[] = [];
  const has = (pred: (p: Player) => boolean) => players.filter(pred).length;
  const gk = has((p) => p.positions[0] === 'GK');
  for (let i = gk; i < 3; i++) need.push('GK');
  const dc = has((p) => p.positions.includes('DC'));
  for (let i = dc; i < 4; i++) need.push('DC');
  if (has((p) => p.positions.some((x) => x === 'DR' || x === 'WBR')) < 2) need.push('DR');
  if (has((p) => p.positions.some((x) => x === 'DL' || x === 'WBL')) < 2) need.push('DL');
  const mid = has((p) => p.positions.some((x) => x === 'MC' || x === 'DM'));
  for (let i = mid; i < 5; i++) need.push(i % 2 ? 'DM' : 'MC');
  const wide = has((p) => p.positions.some((x) => ['AMR', 'AML', 'MR', 'ML'].includes(x)));
  for (let i = wide; i < 4; i++) need.push(i % 2 ? 'AMR' : 'AML');
  const st = has((p) => p.positions.includes('ST'));
  for (let i = st; i < 3; i++) need.push('ST');
  return need;
}

export interface NewGameOptions {
  managerName: string;
  managerNat: string;
  clubName: string;
  saveName?: string;
  seed?: number;
}

export function createWorld(db: RawDatabase, opts: NewGameOptions): World {
  const seed = opts.seed ?? (Date.now() & 0x7fffffff);
  const rng = new Rng(seed);
  const w: World = {
    version: SAVE_VERSION,
    saveName: opts.saveName ?? `${opts.managerName} - ${opts.clubName}`,
    date: `${db.season}-07-01`,
    season: db.season,
    rngState: seed,
    nextId: { player: 1, fixture: 1, news: 1, offer: 1 },
    manager: { name: opts.managerName, nat: opts.managerNat, clubId: -1, seasons: 0, wins: 0, draws: 0, losses: 0, trophies: [] },
    leagues: [],
    clubs: {},
    players: {},
    fixtures: [],
    news: [],
    offers: [],
    shortlist: [],
    history: [],
    pendingMatch: null,
  };

  let clubId = 1;
  for (const rl of db.leagues) {
    const league: League = {
      id: rl.id,
      name: rl.name,
      short: rl.short,
      country: rl.country,
      tier: rl.tier,
      clubIds: [],
      promoteTo: rl.promoteTo,
      relegateTo: rl.relegateTo,
      promotedAuto: rl.promotedAuto,
      playoffs: rl.playoffs,
      relegated: rl.relegated,
      tvMoney: rl.tv * 1_000_000,
      europe: rl.europe,
    };
    w.leagues.push(league);
    for (const rc of rl.clubs) {
      const club = makeClub(w, rc, league, clubId++);
      w.clubs[club.id] = club;
      league.clubIds.push(club.id);
      const squad: Player[] = [];
      for (const line of rc.players.split('\n')) {
        const l = line.trim();
        if (!l) continue;
        let parsed;
        try {
          parsed = parsePlayerLine(l);
        } catch {
          continue; // skip malformed lines; the editor reports them
        }
        const p = makePlayer(w, rng, parsed, club.id, club.reputation);
        w.players[p.id] = p;
        squad.push(p);
      }
      // top up squad with generated fringe and youth players
      const avg = squad.length ? squad.reduce((s, p) => s + p.ability, 0) / squad.length : club.reputation * 0.8;
      const need = neededPositions(squad);
      while (squad.length < MIN_SQUAD || need.length) {
        const pos = need.shift();
        const youth = rng.chance(0.5);
        const age = youth ? rng.int(17, 20) : rng.int(21, 31);
        const ability = youth ? avg - rng.int(10, 18) : avg - rng.int(5, 12);
        const p = generatePlayer(w, rng, {
          clubId: club.id,
          country: league.country,
          ability: Math.max(40, ability),
          age,
          positions: pos ? [pos] : undefined,
          clubRep: club.reputation,
        });
        if (youth) p.youth = true;
        w.players[p.id] = p;
        squad.push(p);
        if (squad.length > 40) break;
      }
      assignSquadNumbers(squad);
    }
  }

  // finances: wage budget ~ 110% of current wage bill
  invalidateSquads(w);
  for (const c of Object.values(w.clubs)) {
    let bill = 0;
    for (const p of Object.values(w.players)) if (p.clubId === c.id) bill += p.wage;
    c.finances.wageBudget = Math.round((bill * 1.1) / 1000) * 1000;
    c.tactics.formation = bestFormation(w, c);
    const pick = autoPick(w, c);
    c.tactics.lineup = pick.lineup;
    c.tactics.subs = pick.subs;
    c.tactics.captain = pickCaptain(w, pick.lineup);
  }

  setBudgets(w);
  const userClub = Object.values(w.clubs).find((c) => c.name === opts.clubName) ?? Object.values(w.clubs)[0];
  w.manager.clubId = userClub.id;

  generateSeasonFixtures(w, rng);
  w.rngState = rng.state;
  return w;
}

export function assignSquadNumbers(squad: Player[]) {
  const used = new Set<number>();
  const order = [...squad].sort((a, b) => b.ability - a.ability);
  const pref: Record<string, number[]> = {
    GK: [1, 13, 12, 31, 40],
    DR: [2, 12, 22, 24],
    DL: [3, 23, 15, 26],
    WBR: [2, 22],
    WBL: [3, 26],
    DC: [4, 5, 6, 15, 16, 32, 33],
    DM: [6, 5, 16, 18],
    MC: [8, 6, 16, 18, 20, 24],
    MR: [7, 17, 19],
    ML: [11, 17, 21],
    AMC: [10, 8, 14, 20],
    AMR: [7, 17, 19, 27],
    AML: [11, 21, 27, 29],
    ST: [9, 19, 14, 18, 29],
  };
  for (const p of order) {
    if (p.squadNo && !used.has(p.squadNo)) {
      used.add(p.squadNo);
      continue;
    }
    const opts = pref[p.positions[0]] ?? [];
    let n = opts.find((x) => !used.has(x));
    if (n == null) {
      n = 2;
      while (used.has(n)) n++;
    }
    used.add(n);
    p.squadNo = n;
  }
}

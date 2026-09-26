// FM2005-style 1-20 attributes. Attributes are derived deterministically from a
// player's hidden ability, position, age, traits and personal seed, so the
// database only needs a single ability rating per player while every player
// still gets a distinctive attribute profile.

import type { Player, Pos } from './types';
import { Rng } from './rng';

export const TECHNICAL = [
  'Corners',
  'Crossing',
  'Dribbling',
  'Finishing',
  'First Touch',
  'Free Kicks',
  'Heading',
  'Long Shots',
  'Long Throws',
  'Marking',
  'Passing',
  'Penalty Taking',
  'Tackling',
  'Technique',
] as const;

export const MENTAL = [
  'Aggression',
  'Anticipation',
  'Bravery',
  'Composure',
  'Concentration',
  'Creativity',
  'Decisions',
  'Determination',
  'Flair',
  'Influence',
  'Off the Ball',
  'Positioning',
  'Teamwork',
  'Work Rate',
] as const;

export const PHYSICAL = [
  'Acceleration',
  'Agility',
  'Balance',
  'Jumping',
  'Natural Fitness',
  'Pace',
  'Stamina',
  'Strength',
] as const;

export const GOALKEEPING = [
  'Aerial Ability',
  'Command of Area',
  'Communication',
  'Handling',
  'Kicking',
  'One on Ones',
  'Reflexes',
  'Rushing Out',
  'Throwing',
] as const;

export const ATTRS = [...TECHNICAL, ...MENTAL, ...PHYSICAL, ...GOALKEEPING] as const;
export type AttrName = (typeof ATTRS)[number];

const IDX: Record<string, number> = {};
ATTRS.forEach((a, i) => (IDX[a] = i));
export const A = (name: AttrName): number => IDX[name];

type Group = 'GK' | 'CB' | 'FB' | 'DM' | 'CM' | 'WM' | 'AM' | 'W' | 'ST';

export function posGroup(p: Pos): Group {
  switch (p) {
    case 'GK':
      return 'GK';
    case 'DC':
      return 'CB';
    case 'DR':
    case 'DL':
    case 'WBR':
    case 'WBL':
      return 'FB';
    case 'DM':
      return 'DM';
    case 'MC':
      return 'CM';
    case 'MR':
    case 'ML':
      return 'WM';
    case 'AMC':
      return 'AM';
    case 'AMR':
    case 'AML':
      return 'W';
    case 'ST':
      return 'ST';
  }
}

type Offsets = Partial<Record<AttrName, number>>;

const OUTFIELD_GK: Offsets = {
  'Aerial Ability': -12,
  'Command of Area': -12,
  Communication: -8,
  Handling: -12,
  Kicking: -9,
  'One on Ones': -12,
  Reflexes: -12,
  'Rushing Out': -12,
  Throwing: -11,
};

// Attribute offsets (in 1-20 points) relative to the player's base level.
const TEMPLATES: Record<Group, Offsets> = {
  GK: {
    Corners: -12,
    Crossing: -11,
    Dribbling: -10,
    Finishing: -12,
    'First Touch': -6,
    'Free Kicks': -10,
    Heading: -9,
    'Long Shots': -12,
    'Long Throws': -8,
    Marking: -12,
    Passing: -4,
    'Penalty Taking': -8,
    Tackling: -12,
    Technique: -5,
    Aggression: -3,
    Anticipation: 1,
    Bravery: 1,
    Composure: 0,
    Concentration: 1,
    Creativity: -8,
    Decisions: 0,
    Flair: -8,
    'Off the Ball': -12,
    Positioning: 1,
    Teamwork: -1,
    'Work Rate': -3,
    Acceleration: -3,
    Agility: 1,
    Balance: -2,
    Jumping: 0,
    Pace: -4,
    Stamina: -3,
    Strength: -1,
    'Aerial Ability': 1,
    'Command of Area': 0,
    Communication: 0,
    Handling: 1,
    Kicking: -1,
    'One on Ones': 1,
    Reflexes: 2,
    'Rushing Out': -1,
    Throwing: -1,
  },
  CB: {
    ...OUTFIELD_GK,
    Corners: -8,
    Crossing: -6,
    Dribbling: -5,
    Finishing: -7,
    'First Touch': -2,
    'Free Kicks': -7,
    Heading: 2,
    'Long Shots': -6,
    'Long Throws': -4,
    Marking: 2,
    Passing: -1,
    'Penalty Taking': -5,
    Tackling: 2,
    Technique: -3,
    Aggression: 1,
    Anticipation: 1,
    Bravery: 2,
    Composure: 0,
    Concentration: 1,
    Creativity: -5,
    Decisions: 0,
    Flair: -6,
    'Off the Ball': -6,
    Positioning: 2,
    Teamwork: 0,
    Acceleration: -2,
    Agility: -2,
    Jumping: 2,
    Pace: -1,
    Strength: 2,
  },
  FB: {
    ...OUTFIELD_GK,
    Corners: -4,
    Crossing: 1,
    Dribbling: -1,
    Finishing: -6,
    'Free Kicks': -5,
    Heading: -2,
    'Long Shots': -4,
    'Long Throws': -1,
    Marking: 1,
    Passing: 0,
    'Penalty Taking': -4,
    Tackling: 1,
    Technique: -1,
    Creativity: -3,
    Flair: -3,
    'Off the Ball': -2,
    Positioning: 1,
    Teamwork: 1,
    'Work Rate': 1,
    Acceleration: 1,
    Pace: 1,
    Stamina: 2,
    Jumping: -2,
    Strength: -1,
  },
  DM: {
    ...OUTFIELD_GK,
    Corners: -4,
    Crossing: -3,
    Dribbling: -2,
    Finishing: -4,
    'Free Kicks': -3,
    Heading: 0,
    'Long Shots': -1,
    'Long Throws': -5,
    Marking: 1,
    Passing: 1,
    'Penalty Taking': -2,
    Tackling: 2,
    Anticipation: 2,
    Composure: 1,
    Concentration: 1,
    Creativity: -1,
    Decisions: 1,
    Flair: -3,
    'Off the Ball': -3,
    Positioning: 2,
    Teamwork: 2,
    'Work Rate': 2,
    Acceleration: -1,
    Pace: -1,
    Stamina: 2,
    Strength: 1,
  },
  CM: {
    ...OUTFIELD_GK,
    Corners: -1,
    Crossing: -1,
    Dribbling: 0,
    Finishing: -2,
    'First Touch': 1,
    'Free Kicks': -1,
    Heading: -2,
    'Long Shots': 0,
    'Long Throws': -6,
    Marking: -2,
    Passing: 2,
    'Penalty Taking': -1,
    Tackling: -1,
    Technique: 1,
    Anticipation: 1,
    Composure: 1,
    Creativity: 1,
    Decisions: 2,
    'Off the Ball': 0,
    Positioning: -1,
    Teamwork: 2,
    'Work Rate': 1,
    Stamina: 2,
    Strength: -1,
    Jumping: -2,
  },
  WM: {
    ...OUTFIELD_GK,
    Corners: 0,
    Crossing: 2,
    Dribbling: 1,
    Finishing: -2,
    'Free Kicks': -1,
    Heading: -3,
    'Long Shots': -1,
    'Long Throws': -5,
    Marking: -3,
    Passing: 1,
    'Penalty Taking': -2,
    Tackling: -2,
    Technique: 1,
    Creativity: 0,
    Flair: 0,
    'Off the Ball': 1,
    Positioning: -3,
    'Work Rate': 2,
    Teamwork: 1,
    Acceleration: 1,
    Pace: 1,
    Stamina: 2,
    Strength: -2,
    Jumping: -3,
  },
  AM: {
    ...OUTFIELD_GK,
    Corners: 0,
    Crossing: -1,
    Dribbling: 2,
    Finishing: 0,
    'First Touch': 2,
    'Free Kicks': 0,
    Heading: -4,
    'Long Shots': 1,
    'Long Throws': -7,
    Marking: -6,
    Passing: 2,
    'Penalty Taking': 0,
    Tackling: -5,
    Technique: 2,
    Aggression: -2,
    Bravery: -2,
    Composure: 1,
    Creativity: 3,
    Decisions: 1,
    Flair: 2,
    'Off the Ball': 1,
    Positioning: -5,
    Acceleration: 0,
    Agility: 1,
    Strength: -3,
    Jumping: -4,
  },
  W: {
    ...OUTFIELD_GK,
    Corners: -1,
    Crossing: 1,
    Dribbling: 3,
    Finishing: 0,
    'First Touch': 1,
    'Free Kicks': -1,
    Heading: -4,
    'Long Shots': 0,
    'Long Throws': -7,
    Marking: -6,
    Passing: 0,
    'Penalty Taking': -1,
    Tackling: -5,
    Technique: 2,
    Aggression: -2,
    Bravery: -1,
    Creativity: 1,
    Flair: 3,
    'Off the Ball': 2,
    Positioning: -5,
    Acceleration: 3,
    Agility: 2,
    Balance: 1,
    Pace: 3,
    Strength: -3,
    Jumping: -3,
  },
  ST: {
    ...OUTFIELD_GK,
    Corners: -5,
    Crossing: -3,
    Dribbling: 1,
    Finishing: 3,
    'First Touch': 1,
    'Free Kicks': -2,
    Heading: 1,
    'Long Shots': 0,
    'Long Throws': -7,
    Marking: -7,
    Passing: -2,
    'Penalty Taking': 1,
    Tackling: -6,
    Technique: 0,
    Anticipation: 1,
    Composure: 2,
    Creativity: -2,
    'Off the Ball': 3,
    Positioning: -6,
    Teamwork: -1,
    'Work Rate': -1,
    Acceleration: 1,
    Pace: 1,
    Strength: 1,
    Jumping: 1,
  },
};

// Traits nudge attributes to give star players their recognisable style.
export const TRAITS: Record<string, Offsets> = {
  pace: { Pace: 3, Acceleration: 3, Strength: -1 },
  aerial: { Heading: 3, Jumping: 3, Strength: 2, Agility: -1 },
  strong: { Strength: 3, Balance: 2, Aggression: 1, Acceleration: -1 },
  finisher: { Finishing: 3, Composure: 2, 'Off the Ball': 2 },
  playmaker: { Passing: 3, Creativity: 3, Technique: 1, Decisions: 1, Tackling: -1 },
  dribbler: { Dribbling: 3, Flair: 2, Agility: 2, Balance: 1, Heading: -1 },
  engine: { Stamina: 3, 'Work Rate': 3, Teamwork: 2, 'Natural Fitness': 2 },
  tackler: { Tackling: 3, Marking: 2, Aggression: 2, Bravery: 1, Flair: -1 },
  crosser: { Crossing: 3, Corners: 2, 'Free Kicks': 1 },
  sniper: { 'Long Shots': 3, 'Free Kicks': 3, Technique: 1 },
  leader: { Influence: 5, Determination: 2, Communication: 2, Composure: 1 },
  shotstopper: { Reflexes: 3, 'One on Ones': 2, Agility: 2 },
  sweeper: { Kicking: 3, Passing: 3, 'Rushing Out': 3, Composure: 2 },
  flair: { Flair: 4, Technique: 2, Dribbling: 1, Teamwork: -2 },
  hardman: { Aggression: 4, Bravery: 3, Strength: 1, Composure: -1 },
  set: { Corners: 3, 'Free Kicks': 3, 'Penalty Taking': 2 },
};

const PHYS = new Set<string>(['Acceleration', 'Pace', 'Agility', 'Stamina', 'Natural Fitness', 'Balance', 'Jumping']);
const MENTAL_EXP = new Set<string>([
  'Anticipation',
  'Composure',
  'Concentration',
  'Decisions',
  'Positioning',
  'Influence',
  'Communication',
  'Command of Area',
]);

interface CacheEntry {
  ability: number;
  age: number;
  positions: Pos[];
  traits: string[] | undefined;
  seed: number;
  attrs: number[];
  ratings: Partial<Record<Pos, number>>;
}
// ability (1-100) -> base attribute level (1-20): 90 -> ~16.7, 65 -> ~12.4
const ATTR_SCALE = 5.8;
const ATTR_OFFSET = 1.2;

const cache = new Map<number, CacheEntry>();

function entry(p: Player): CacheEntry {
  // Attributes follow whole-number ability so tiny weekly changes don't
  // force a re-derivation of every player.
  const ab = Math.round(p.ability);
  const hit = cache.get(p.id);
  if (hit && hit.ability === ab && hit.age === p.age && hit.positions === p.positions && hit.traits === p.traits && hit.seed === p.seed) return hit;
  const e: CacheEntry = { ability: ab, age: p.age, positions: p.positions, traits: p.traits, seed: p.seed, attrs: deriveAttrs(p, ab), ratings: {} };
  cache.set(p.id, e);
  return e;
}

/** Returns the player's 1-20 attributes (indexed by ATTRS). Cached. */
export function getAttrs(p: Player): number[] {
  return entry(p).attrs;
}

export function clearAttrCache() {
  cache.clear();
}

function deriveAttrs(p: Player, ability: number): number[] {
  const rng = new Rng(p.seed);
  const group = posGroup(p.positions[0]);
  const tpl = TEMPLATES[group];
  const base = ability / ATTR_SCALE + ATTR_OFFSET;
  const traits = p.traits && p.traits.length ? p.traits : autoTraits(p, rng);
  const out: number[] = new Array(ATTRS.length);
  // secondary positions blend in part of their template
  const secondary = p.positions.slice(1).map((pp) => TEMPLATES[posGroup(pp)]);
  for (let i = 0; i < ATTRS.length; i++) {
    const name = ATTRS[i];
    let off = tpl[name] ?? 0;
    for (const s of secondary) {
      const so = s[name] ?? 0;
      if (so > off) off = off + (so - off) * 0.4;
    }
    for (const t of traits) off += TRAITS[t]?.[name] ?? 0;
    // age shaping
    if (PHYS.has(name) && p.age > 29) off -= (p.age - 29) * (name === 'Pace' || name === 'Acceleration' ? 0.55 : 0.3);
    if (PHYS.has(name) && p.age < 21 && name !== 'Natural Fitness') off += 0.5;
    if (MENTAL_EXP.has(name)) off += Math.max(-2, Math.min(2, (p.age - 24) * 0.22));
    if (name === 'Determination') off += 1;
    const noise = rng.gauss() * 1.35;
    let v = base + off + noise;
    // GK-only / outfield-only attributes stay low in absolute terms
    if (off <= -8) v = Math.min(v, 2 + rng.next() * 6);
    out[i] = Math.max(1, Math.min(20, Math.round(v)));
  }
  return out;
}

const AUTO_TRAITS: Record<Group, string[]> = {
  GK: ['shotstopper', 'sweeper', 'leader'],
  CB: ['aerial', 'tackler', 'leader', 'pace', 'strong', 'playmaker'],
  FB: ['pace', 'crosser', 'engine', 'tackler', 'dribbler'],
  DM: ['tackler', 'playmaker', 'engine', 'hardman', 'strong'],
  CM: ['playmaker', 'engine', 'sniper', 'tackler', 'dribbler', 'set'],
  WM: ['crosser', 'pace', 'engine', 'dribbler', 'set'],
  AM: ['playmaker', 'dribbler', 'sniper', 'flair', 'set'],
  W: ['pace', 'dribbler', 'flair', 'crosser', 'sniper'],
  ST: ['finisher', 'aerial', 'pace', 'strong', 'dribbler', 'sniper'],
};

function autoTraits(p: Player, rng: Rng): string[] {
  const pool = AUTO_TRAITS[posGroup(p.positions[0])];
  const n = rng.next() < 0.35 ? 2 : 1;
  const out = new Set<string>();
  for (let i = 0; i < n; i++) out.add(rng.pick(pool));
  return [...out];
}

// Weights used to rate a player in a given position.
const RATING_WEIGHTS: Record<Group, Offsets> = {
  GK: {
    Reflexes: 5,
    Handling: 4,
    'One on Ones': 3,
    'Aerial Ability': 3,
    'Command of Area': 2,
    Positioning: 3,
    Concentration: 2,
    Composure: 1,
    Agility: 2,
    Communication: 1,
    Kicking: 1,
    'Rushing Out': 1,
    Decisions: 1,
  },
  CB: {
    Marking: 4,
    Tackling: 4,
    Heading: 3,
    Positioning: 4,
    Anticipation: 2,
    Concentration: 2,
    Strength: 2,
    Jumping: 2,
    Pace: 1,
    Bravery: 1,
    Decisions: 1,
    Composure: 1,
    Passing: 1,
  },
  FB: {
    Tackling: 3,
    Marking: 2,
    Positioning: 2,
    Pace: 3,
    Acceleration: 2,
    Stamina: 2,
    Crossing: 2,
    Passing: 1,
    'Work Rate': 2,
    Anticipation: 1,
    Teamwork: 1,
    Dribbling: 1,
    Decisions: 1,
  },
  DM: {
    Tackling: 3,
    Marking: 2,
    Positioning: 3,
    Anticipation: 3,
    Passing: 3,
    Decisions: 2,
    Teamwork: 2,
    'Work Rate': 2,
    Stamina: 1,
    Strength: 1,
    Composure: 1,
    Concentration: 1,
  },
  CM: {
    Passing: 4,
    Decisions: 3,
    Creativity: 2,
    'First Touch': 2,
    Technique: 2,
    Teamwork: 2,
    'Work Rate': 2,
    Stamina: 2,
    Anticipation: 1,
    Tackling: 1,
    Composure: 1,
    'Long Shots': 1,
  },
  WM: {
    Crossing: 3,
    Dribbling: 2,
    Pace: 3,
    Acceleration: 2,
    Passing: 2,
    Stamina: 2,
    'Work Rate': 2,
    Technique: 2,
    'Off the Ball': 1,
    Creativity: 1,
    Teamwork: 1,
    'First Touch': 1,
  },
  AM: {
    Creativity: 4,
    Passing: 3,
    Technique: 3,
    'First Touch': 3,
    Dribbling: 2,
    'Off the Ball': 2,
    Decisions: 2,
    Composure: 2,
    'Long Shots': 1,
    Finishing: 1,
    Flair: 1,
    Agility: 1,
  },
  W: {
    Dribbling: 4,
    Pace: 3,
    Acceleration: 3,
    Technique: 2,
    Crossing: 2,
    'Off the Ball': 2,
    Flair: 1,
    'First Touch': 2,
    Finishing: 2,
    Agility: 1,
    Creativity: 1,
    Composure: 1,
  },
  ST: {
    Finishing: 5,
    'Off the Ball': 3,
    Composure: 3,
    'First Touch': 2,
    Anticipation: 2,
    Pace: 2,
    Acceleration: 2,
    Heading: 2,
    Strength: 1,
    Dribbling: 1,
    Technique: 1,
    Jumping: 1,
  },
};

const CALIB: Record<string, number> = {};
for (const g of Object.keys(RATING_WEIGHTS) as Group[]) {
  const w = RATING_WEIGHTS[g];
  let sum = 0;
  let tot = 0;
  for (const [k, wt] of Object.entries(w)) {
    sum += (TEMPLATES[g][k as AttrName] ?? 0) * (wt as number);
    tot += wt as number;
  }
  CALIB[g] = sum / tot;
}

const WEIGHT_IDX: Record<string, [number, number][]> = {};
for (const g of Object.keys(RATING_WEIGHTS) as Group[]) {
  WEIGHT_IDX[g] = Object.entries(RATING_WEIGHTS[g]).map(([k, wt]) => [IDX[k], wt as number]);
}

/** Raw rating of an attribute set at a position group, on the ~1-100 ability scale */
export function attrRating(attrs: number[], pos: Pos): number {
  const g = posGroup(pos);
  let sum = 0;
  let tot = 0;
  for (const [i, wt] of WEIGHT_IDX[g]) {
    sum += attrs[i] * wt;
    tot += wt;
  }
  return (sum / tot - CALIB[g] - ATTR_OFFSET) * ATTR_SCALE;
}

const ADJACENT: Record<Pos, Pos[]> = {
  GK: [],
  DC: ['DM', 'DR', 'DL'],
  DR: ['WBR', 'DC', 'MR'],
  DL: ['WBL', 'DC', 'ML'],
  WBR: ['DR', 'MR'],
  WBL: ['DL', 'ML'],
  DM: ['MC', 'DC'],
  MC: ['DM', 'AMC'],
  MR: ['AMR', 'WBR', 'DR', 'ML'],
  ML: ['AML', 'WBL', 'DL', 'MR'],
  AMC: ['MC', 'ST', 'AMR', 'AML'],
  AMR: ['MR', 'AML', 'AMC', 'ST'],
  AML: ['ML', 'AMR', 'AMC', 'ST'],
  ST: ['AMC', 'AMR', 'AML'],
};

/** 1.0 natural, 0.94 adjacent (accomplished), lower otherwise */
export function familiarity(p: Player, pos: Pos): number {
  if (p.positions.includes(pos)) return 1;
  if (p.positions.some((pp) => ADJACENT[pp].includes(pos))) return 0.93;
  if (pos === 'GK' || p.positions[0] === 'GK') return 0.35;
  return 0.8;
}

/** Player's effective ability when playing in a given position (1-100ish) */
export function positionRating(p: Player, pos: Pos): number {
  const e = entry(p);
  const cached = e.ratings[pos];
  if (cached != null) return cached;
  const raw = attrRating(e.attrs, pos);
  // Blend attribute-derived rating with hidden ability so ratings stay stable.
  const natural = p.positions.includes(pos);
  const blended = natural ? raw * 0.5 + e.ability * 0.5 : raw * 0.7 + e.ability * 0.3;
  const r = blended * familiarity(p, pos);
  e.ratings[pos] = r;
  return r;
}

export function bestPosition(p: Player): Pos {
  return p.positions[0];
}

/** Attributes the UI highlights for a position group */
export function keyAttrs(pos: Pos): string[] {
  return Object.entries(RATING_WEIGHTS[posGroup(pos)])
    .filter(([, w]) => (w as number) >= 2)
    .map(([k]) => k);
}

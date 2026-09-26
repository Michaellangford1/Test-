// Core game model. The whole World is a plain, structured-cloneable object so
// it can be stored in IndexedDB as-is.

export type Pos =
  | 'GK'
  | 'DR'
  | 'DC'
  | 'DL'
  | 'WBR'
  | 'WBL'
  | 'DM'
  | 'MR'
  | 'MC'
  | 'ML'
  | 'AMR'
  | 'AMC'
  | 'AML'
  | 'ST';

export type Mentality = 'defensive' | 'cautious' | 'balanced' | 'attacking' | 'all-out';
export type Passing = 'short' | 'mixed' | 'direct';
export type Pressing = 'low' | 'normal' | 'high';
export type Tempo = 'slow' | 'normal' | 'fast';
export type TrainingFocus = 'balanced' | 'attacking' | 'defending' | 'technical' | 'physical' | 'rest';

export interface Tactics {
  formation: string;
  /** Player id per formation slot (index aligned with formation slots), null = empty */
  lineup: (number | null)[];
  subs: number[];
  mentality: Mentality;
  passing: Passing;
  pressing: Pressing;
  tempo: Tempo;
  captain: number | null;
  penaltyTaker: number | null;
  freeKickTaker: number | null;
}

export interface Injury {
  name: string;
  days: number;
}

export interface SeasonStats {
  apps: number;
  subApps: number;
  goals: number;
  assists: number;
  ratingSum: number;
  rated: number;
  yellows: number;
  reds: number;
  motm: number;
  cleanSheets: number;
}

export interface CareerEntry {
  season: number;
  clubId: number | null;
  clubName: string;
  apps: number;
  goals: number;
  avg: number;
}

export interface Player {
  id: number;
  name: string;
  /** Short display name, typically surname */
  short: string;
  nat: string;
  age: number;
  positions: Pos[];
  foot: 'R' | 'L' | 'B';
  /** Deterministic seed that gives the player his individual attribute profile */
  seed: number;
  /** Optional playing-style traits that shape attributes (e.g. 'pace', 'aerial') */
  traits?: string[];
  /** Hidden ability, 1-100 scale */
  ability: number;
  potential: number;
  clubId: number | null;
  squadNo: number;
  value: number;
  wage: number; // weekly, £
  contractEnd: number; // season end year, e.g. 2027 means expires June 2027
  morale: number; // 1-20
  condition: number; // 0-100
  sharpness: number; // 0-100 match sharpness
  injury: Injury | null;
  suspended: number; // matches
  form: number[]; // last match ratings
  stats: SeasonStats;
  career: CareerEntry[];
  transferListed: boolean;
  loanListed?: boolean;
  /** Days since joining club; new signings settle in */
  joined: string;
  retiring?: boolean;
  youth?: boolean;
}

export interface Finances {
  balance: number;
  transferBudget: number;
  wageBudget: number; // weekly
  seasonIncome: { gate: number; tv: number; commercial: number; transfers: number; prize: number };
  seasonExpense: { wages: number; transfers: number; other: number };
}

export interface Club {
  id: number;
  name: string;
  short: string;
  leagueId: string;
  reputation: number; // 1-100
  stadium: string;
  capacity: number;
  colors: [string, string];
  finances: Finances;
  tactics: Tactics;
  training: TrainingFocus;
  /** Board confidence 0-100 (user club only matters) */
  boardConfidence: number;
  youthRating: number; // 1-20
  facilities: number; // 1-20
}

export interface League {
  id: string;
  name: string;
  short: string;
  country: string;
  tier: number;
  clubIds: number[];
  /** Number of clubs promoted/relegated to linked leagues */
  promoteTo?: string;
  relegateTo?: string;
  promotedAuto?: number;
  playoffs?: boolean;
  relegated?: number;
  tvMoney: number; // total per season per club, base
  europe: number; // top N described as "European places"
}

export type CompType = 'league' | 'playoff';

export interface GoalEvent {
  minute: number;
  side: 0 | 1;
  playerId: number;
  assistId?: number;
  pen?: boolean;
  og?: boolean;
}

export interface Fixture {
  id: number;
  date: string; // YYYY-MM-DD
  comp: string; // league id or playoff id
  compType: CompType;
  round: number;
  home: number;
  away: number;
  played: boolean;
  hg: number;
  ag: number;
  goals: GoalEvent[];
  /** for knockout ties */
  pens?: [number, number];
  aet?: boolean;
  attendance?: number;
  neutral?: boolean;
  label?: string;
}

export interface NewsItem {
  id: number;
  date: string;
  title: string;
  body: string;
  kind: 'info' | 'board' | 'transfer' | 'offer' | 'injury' | 'match' | 'contract' | 'youth' | 'season';
  read: boolean;
  /** Optional linked offer requiring an answer */
  offerId?: number;
  playerId?: number;
}

export type OfferStatus =
  | 'pending' // awaiting response from the selling club
  | 'accepted' // selling club accepted, awaiting contract with player
  | 'countered'
  | 'rejected'
  | 'completed'
  | 'withdrawn'
  | 'collapsed';

export interface TransferOffer {
  id: number;
  playerId: number;
  fromClub: number | null; // selling club (null = free agent)
  toClub: number; // buying club
  fee: number;
  counterFee?: number;
  status: OfferStatus;
  date: string;
  respondBy: string;
  /** true when the user is the buyer */
  userBuying: boolean;
  isLoan?: boolean;
}

export interface SeasonRecord {
  season: number;
  champions: Record<string, number>;
  userLeague: string;
  userPos: number;
  userClub: number;
  promoted: number[];
  relegated: number[];
  topScorers: Record<string, { playerId: number; name: string; goals: number }>;
}

export interface Manager {
  name: string;
  nat: string;
  clubId: number;
  seasons: number;
  wins: number;
  draws: number;
  losses: number;
  trophies: string[];
  sacked?: boolean;
  /** Board's target league position this season, and its description */
  target?: { pos: number; text: string };
  jobOffers?: number[];
}

export interface World {
  version: number;
  saveName: string;
  date: string;
  season: number; // starting year, e.g. 2025 for 2025/26
  rngState: number;
  nextId: { player: number; fixture: number; news: number; offer: number };
  manager: Manager;
  leagues: League[];
  clubs: Record<number, Club>;
  players: Record<number, Player>;
  fixtures: Fixture[];
  news: NewsItem[];
  offers: TransferOffer[];
  shortlist: number[];
  history: SeasonRecord[];
  /** Fixture waiting for the user to play */
  pendingMatch: number | null;
  seasonOver?: boolean;
}

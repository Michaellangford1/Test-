// Raw database format. Each club lists its players one per line:
//
//   Name|Positions|Age|Nat|Ability[/Potential][|trait,trait]
//
//   Positions: FM-style codes separated by '/', natural position first
//              (GK DR DC DL WBR WBL DM MR MC ML AMR AMC AML ST)
//   Age:       age on 1 July of the database season
//   Nat:       3-letter nationality code
//   Ability:   current ability on a 1-100 scale
//   Potential: optional; derived from age when omitted
//   Traits:    optional playing-style tags (see game/attributes.ts TRAITS)
//
// Squads are topped up with generated fringe/youth players at game start if
// fewer than the minimum squad size are listed.

export interface RawClub {
  name: string;
  short: string;
  rep: number;
  stadium: string;
  capacity: number;
  colors: [string, string];
  /** Opening bank balance in £m */
  money: number;
  players: string;
}

export interface RawLeague {
  id: string;
  name: string;
  short: string;
  country: string;
  tier: number;
  /** Base TV money per club per season, £m */
  tv: number;
  europe: number;
  promoteTo?: string;
  relegateTo?: string;
  promotedAuto?: number;
  playoffs?: boolean;
  relegated?: number;
  clubs: RawClub[];
}

export interface RawDatabase {
  name: string;
  season: number;
  leagues: RawLeague[];
}

export const club = (
  name: string,
  short: string,
  rep: number,
  stadium: string,
  capacity: number,
  colors: [string, string],
  money: number,
  players: string,
): RawClub => ({ name, short, rep, stadium, capacity, colors, money, players });

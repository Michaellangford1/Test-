import type { RawDatabase } from './types';
import { eng1 } from './leagues/eng1';
import { eng2 } from './leagues/eng2';
import { esp1 } from './leagues/esp1';
import { ita1 } from './leagues/ita1';
import { ger1 } from './leagues/ger1';
import { fra1 } from './leagues/fra1';

/** Bundled database: squads as at the start of the 2025/26 season. */
export const DEFAULT_DATABASE: RawDatabase = {
  name: '2025/26 Season Database',
  season: 2025,
  leagues: [eng1, eng2, esp1, ita1, ger1, fra1],
};

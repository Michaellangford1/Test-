import { DEFAULT_DATABASE } from '../data';
import type { RawDatabase } from '../data/types';
import { getCustomDatabase } from './db';

/** The database new games start from: the user's edited copy, or the bundled one */
export async function loadActiveDatabase(): Promise<{ db: RawDatabase; custom: boolean }> {
  const custom = await getCustomDatabase();
  if (custom && Array.isArray(custom.leagues) && custom.leagues.length) return { db: custom, custom: true };
  return { db: DEFAULT_DATABASE, custom: false };
}

export function cloneDatabase(db: RawDatabase): RawDatabase {
  return JSON.parse(JSON.stringify(db)) as RawDatabase;
}

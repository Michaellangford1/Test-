import Dexie, { type Table } from 'dexie';
import type { World } from '../game/types';
import type { RawDatabase } from '../data/types';

export interface SaveMeta {
  id?: number;
  name: string;
  managerName: string;
  clubName: string;
  clubColors: [string, string];
  date: string;
  season: number;
  updatedAt: number;
}

export interface SaveBlob {
  id: number;
  world: World;
}

export interface Setting {
  key: string;
  value: unknown;
}

class GafferDB extends Dexie {
  saves!: Table<SaveMeta, number>;
  worlds!: Table<SaveBlob, number>;
  settings!: Table<Setting, string>;
  constructor() {
    super('gaffer05');
    this.version(1).stores({
      saves: '++id, updatedAt',
      worlds: 'id',
      settings: 'key',
    });
  }
}

export const db = new GafferDB();

export async function writeSave(world: World, id?: number): Promise<number> {
  const club = world.clubs[world.manager.clubId];
  const meta: SaveMeta = {
    name: world.saveName,
    managerName: world.manager.name,
    clubName: club?.name ?? '-',
    clubColors: club?.colors ?? ['#333', '#fff'],
    date: world.date,
    season: world.season,
    updatedAt: Date.now(),
  };
  return db.transaction('rw', db.saves, db.worlds, async () => {
    let saveId = id;
    if (saveId == null) saveId = await db.saves.add(meta);
    else await db.saves.put({ ...meta, id: saveId });
    await db.worlds.put({ id: saveId, world });
    return saveId;
  });
}

export async function readSave(id: number): Promise<World | undefined> {
  const blob = await db.worlds.get(id);
  return blob?.world;
}

export async function deleteSave(id: number) {
  await db.transaction('rw', db.saves, db.worlds, async () => {
    await db.saves.delete(id);
    await db.worlds.delete(id);
  });
}

export async function listSaves(): Promise<SaveMeta[]> {
  return db.saves.orderBy('updatedAt').reverse().toArray();
}

export async function getCustomDatabase(): Promise<RawDatabase | null> {
  const s = await db.settings.get('customDb');
  return (s?.value as RawDatabase) ?? null;
}

export async function setCustomDatabase(value: RawDatabase | null) {
  if (value == null) await db.settings.delete('customDb');
  else await db.settings.put({ key: 'customDb', value });
}

export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  const s = await db.settings.get(key);
  return (s?.value as T) ?? fallback;
}

export async function putSetting(key: string, value: unknown) {
  await db.settings.put({ key, value });
}

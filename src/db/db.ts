import Dexie, { type Table } from 'dexie';
import type {
  Difficulty,
  GuideCategory,
  ProfileData,
  ReferenceCategory,
  Source,
} from '../types/schema';

export interface Step {
  text: string;
  note: string;
  photoIds: string[];
}

export interface GuideRecord {
  id: string;
  title: string;
  category: GuideCategory;
  difficulty: Difficulty;
  timeEstimate: string;
  tools: string[];
  materials: string[];
  safety: string[];
  houseNotes: string;
  steps: Step[];
  tags: string[];
  source: Source;
  createdAt: number;
  updatedAt: number;
}

export interface ProgressRecord {
  guideId: string;
  checkedSteps: number[];
  lastStep: number;
  startedAt: number;
  updatedAt: number;
}

export interface ReferenceRecord {
  id: string;
  title: string;
  category: ReferenceCategory;
  body: string;
  photoIds: string[];
  tags: string[];
  updatedAt: number;
}

export interface PhotoRecord {
  id: string;
  blob: Blob;
  thumb: Blob;
  caption: string;
  createdAt: number;
}

export interface ProfileRecord {
  id: 'profile';
  data: ProfileData;
  updatedAt: number;
}

export interface SettingRecord {
  key: string;
  value: unknown;
}

export class HouseManualDB extends Dexie {
  guides!: Table<GuideRecord, string>;
  progress!: Table<ProgressRecord, string>;
  reference!: Table<ReferenceRecord, string>;
  photos!: Table<PhotoRecord, string>;
  profile!: Table<ProfileRecord, string>;
  settings!: Table<SettingRecord, string>;

  constructor() {
    super('house-manual');
    this.version(1).stores({
      guides: 'id, category, updatedAt, source',
      progress: 'guideId, updatedAt',
      reference: 'id, category, updatedAt',
      photos: 'id, createdAt',
      profile: 'id',
      settings: 'key',
    });
  }
}

export const db = new HouseManualDB();

// --- settings helpers ------------------------------------------------------
export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  const row = await db.settings.get(key);
  return row ? (row.value as T) : fallback;
}

export async function setSetting(key: string, value: unknown): Promise<void> {
  await db.settings.put({ key, value });
}

import { db, type GuideRecord, type ReferenceRecord, type Step } from './db';
import type {
  GuidePayload,
  ProfileData,
  ReferencePayload,
  Source,
} from '../types/schema';
import { pruneOrphanPhotos } from '../lib/photos';

// --- guides ----------------------------------------------------------------
export async function saveGuideFromPayload(
  payload: GuidePayload,
  source: Source,
  overrideId?: string,
): Promise<string> {
  const id = overrideId ?? payload.id;
  const now = Date.now();
  const existing = await db.guides.get(id);
  const steps: Step[] = payload.steps.map((s, i) => ({
    text: s.text,
    note: s.note ?? '',
    // preserve any in-app photo attachments on the same step index when updating
    photoIds: s.photoIds ?? existing?.steps[i]?.photoIds ?? [],
  }));
  const record: GuideRecord = {
    id,
    title: payload.title,
    category: payload.category,
    difficulty: payload.difficulty,
    timeEstimate: payload.timeEstimate,
    tools: payload.tools,
    materials: payload.materials,
    safety: payload.safety,
    houseNotes: payload.houseNotes ?? '',
    steps,
    tags: payload.tags,
    source,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
  await db.guides.put(record);
  return id;
}

export async function saveGuide(record: GuideRecord): Promise<void> {
  await db.guides.put({ ...record, updatedAt: Date.now() });
}

export async function deleteGuide(id: string): Promise<void> {
  await db.transaction('rw', db.guides, db.progress, async () => {
    await db.guides.delete(id);
    await db.progress.delete(id);
  });
  await pruneOrphanPhotos();
}

// --- reference -------------------------------------------------------------
export async function saveReferenceFromPayload(
  payload: ReferencePayload,
  overrideId?: string,
): Promise<string> {
  const id = overrideId ?? payload.id;
  const existing = await db.reference.get(id);
  const record: ReferenceRecord = {
    id,
    title: payload.title,
    category: payload.category,
    body: payload.body ?? '',
    photoIds: existing?.photoIds ?? [],
    tags: payload.tags,
    updatedAt: Date.now(),
  };
  await db.reference.put(record);
  return id;
}

export async function saveReference(record: ReferenceRecord): Promise<void> {
  await db.reference.put({ ...record, updatedAt: Date.now() });
}

export async function deleteReference(id: string): Promise<void> {
  await db.reference.delete(id);
  await pruneOrphanPhotos();
}

// --- profile ---------------------------------------------------------------
export async function saveProfile(data: ProfileData): Promise<void> {
  await db.profile.put({ id: 'profile', data, updatedAt: Date.now() });
}

// --- progress (Task Mode) --------------------------------------------------
export async function updateProgress(
  guideId: string,
  patch: Partial<{ checkedSteps: number[]; lastStep: number }>,
): Promise<void> {
  const now = Date.now();
  const existing = await db.progress.get(guideId);
  await db.progress.put({
    guideId,
    checkedSteps: patch.checkedSteps ?? existing?.checkedSteps ?? [],
    lastStep: patch.lastStep ?? existing?.lastStep ?? 0,
    startedAt: existing?.startedAt ?? now,
    updatedAt: now,
  });
}

export async function resetProgress(guideId: string): Promise<void> {
  await db.progress.delete(guideId);
}

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';

export function useGuides() {
  return useLiveQuery(() => db.guides.orderBy('updatedAt').reverse().toArray(), [], undefined);
}

export function useGuide(id: string | undefined) {
  return useLiveQuery(() => (id ? db.guides.get(id) : undefined), [id], undefined);
}

export function useReferenceItems() {
  return useLiveQuery(() => db.reference.orderBy('updatedAt').reverse().toArray(), [], undefined);
}

export function useReferenceItem(id: string | undefined) {
  return useLiveQuery(() => (id ? db.reference.get(id) : undefined), [id], undefined);
}

export function useProfile() {
  return useLiveQuery(() => db.profile.get('profile'), [], undefined);
}

export function useProgress(guideId: string | undefined) {
  return useLiveQuery(() => (guideId ? db.progress.get(guideId) : undefined), [guideId], undefined);
}

export function useAllProgress() {
  return useLiveQuery(() => db.progress.toArray(), [], undefined);
}

export function usePhoto(id: string | undefined) {
  return useLiveQuery(() => (id ? db.photos.get(id) : undefined), [id], undefined);
}

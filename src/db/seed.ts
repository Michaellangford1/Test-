import { db, getSetting, setSetting } from './db';
import { SEED_GUIDES, SEED_PROFILE, SEED_REFERENCE } from './seedData';

const SEED_FLAG = 'seeded-v1';

// Populate the database on first run. Idempotent: guarded by a settings flag,
// and uses put so a partial previous run is completed rather than duplicated.
export async function seedIfNeeded(): Promise<void> {
  const alreadySeeded = await getSetting<boolean>(SEED_FLAG, false);
  if (alreadySeeded) return;

  const now = Date.now();

  await db.transaction('rw', db.guides, db.reference, db.profile, db.settings, async () => {
    // House Profile
    const existingProfile = await db.profile.get('profile');
    if (!existingProfile) {
      await db.profile.put({ id: 'profile', data: SEED_PROFILE, updatedAt: now });
    }

    // Reference starter items
    for (const item of SEED_REFERENCE) {
      const existing = await db.reference.get(item.id);
      if (!existing) {
        await db.reference.put({ ...item, photoIds: [], updatedAt: now });
      }
    }

    // Twelve seed guides
    for (const guide of SEED_GUIDES) {
      const existing = await db.guides.get(guide.id);
      if (!existing) {
        await db.guides.put({
          ...guide,
          source: 'seed',
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    await setSetting(SEED_FLAG, true);
  });
}

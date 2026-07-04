import JSZip from 'jszip';
import { db, type PhotoRecord } from '../db/db';

interface BackupData {
  app: 'house-manual';
  version: 1;
  exportedAt: string;
  guides: unknown[];
  reference: unknown[];
  progress: unknown[];
  profile: unknown[];
  settings: unknown[];
  // photo metadata only; blobs live under /photos and /thumbs
  photos: { id: string; caption: string; createdAt: number }[];
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

// Build the export zip: data.json (all tables except blobs) + photo/thumb jpgs.
export async function exportZip(): Promise<Blob> {
  const [guides, reference, progress, profile, settings, photos] = await Promise.all([
    db.guides.toArray(),
    db.reference.toArray(),
    db.progress.toArray(),
    db.profile.toArray(),
    db.settings.toArray(),
    db.photos.toArray(),
  ]);

  const data: BackupData = {
    app: 'house-manual',
    version: 1,
    exportedAt: new Date().toISOString(),
    guides,
    reference,
    progress,
    profile,
    settings,
    photos: photos.map((p) => ({ id: p.id, caption: p.caption, createdAt: p.createdAt })),
  };

  const zip = new JSZip();
  zip.file('data.json', JSON.stringify(data, null, 2));
  const photoDir = zip.folder('photos');
  const thumbDir = zip.folder('thumbs');
  for (const p of photos) {
    photoDir?.file(`${p.id}.jpg`, p.blob);
    thumbDir?.file(`${p.id}.jpg`, p.thumb);
  }

  return zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
}

export function exportFilename(): string {
  return `house-manual-backup-${today()}.zip`;
}

export type RestoreMode = 'replace' | 'merge';

export interface RestoreSummary {
  guides: number;
  reference: number;
  photos: number;
}

// Restore from a backup zip. Replace clears everything first; Merge lets the
// imported records win on id clashes.
export async function restoreZip(file: Blob, mode: RestoreMode): Promise<RestoreSummary> {
  const zip = await JSZip.loadAsync(file);
  const dataFile = zip.file('data.json');
  if (!dataFile) throw new Error('That zip has no data.json — is it a House Manual backup?');
  const data = JSON.parse(await dataFile.async('string')) as BackupData;
  if (data.app !== 'house-manual') throw new Error('That backup is not from House Manual.');

  // Reassemble photo records by pairing metadata with the stored blobs.
  const photos: PhotoRecord[] = [];
  for (const meta of data.photos || []) {
    const full = zip.file(`photos/${meta.id}.jpg`);
    const thumb = zip.file(`thumbs/${meta.id}.jpg`);
    if (!full || !thumb) continue;
    photos.push({
      id: meta.id,
      blob: await full.async('blob'),
      thumb: await thumb.async('blob'),
      caption: meta.caption || '',
      createdAt: meta.createdAt || Date.now(),
    });
  }

  await db.transaction(
    'rw',
    [db.guides, db.reference, db.progress, db.profile, db.settings, db.photos],
    async () => {
      if (mode === 'replace') {
        await Promise.all([
          db.guides.clear(),
          db.reference.clear(),
          db.progress.clear(),
          db.profile.clear(),
          db.photos.clear(),
        ]);
        // settings: keep it simple and replace too, so theme/sizes come back
        await db.settings.clear();
      }
      // bulkPut = imported wins on id clash (merge) or fills a cleared store (replace)
      await db.guides.bulkPut((data.guides as never[]) || []);
      await db.reference.bulkPut((data.reference as never[]) || []);
      await db.progress.bulkPut((data.progress as never[]) || []);
      await db.profile.bulkPut((data.profile as never[]) || []);
      await db.settings.bulkPut((data.settings as never[]) || []);
      await db.photos.bulkPut(photos);
    },
  );

  return {
    guides: (data.guides || []).length,
    reference: (data.reference || []).length,
    photos: photos.length,
  };
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

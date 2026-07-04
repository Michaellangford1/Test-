import { db, type PhotoRecord } from '../db/db';
import { randomId } from './id';

const MAX_LONG_EDGE = 1600;
const THUMB_LONG_EDGE = 320;
const JPEG_QUALITY = 0.8;

function loadImage(file: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read that image.'));
    };
    img.src = url;
  });
}

function drawToBlob(img: HTMLImageElement, longEdge: number, quality: number): Promise<Blob> {
  const scale = Math.min(1, longEdge / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.max(1, Math.round(img.naturalWidth * scale));
  const h = Math.max(1, Math.round(img.naturalHeight * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not available.');
  ctx.drawImage(img, 0, 0, w, h);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Could not compress the image.'))),
      'image/jpeg',
      quality,
    );
  });
}

// Compress a picked/captured image and store both a full-size and thumbnail blob.
export async function addPhoto(file: Blob, caption = ''): Promise<string> {
  const img = await loadImage(file);
  const [full, thumb] = await Promise.all([
    drawToBlob(img, MAX_LONG_EDGE, JPEG_QUALITY),
    drawToBlob(img, THUMB_LONG_EDGE, JPEG_QUALITY),
  ]);
  const id = randomId('photo');
  const record: PhotoRecord = {
    id,
    blob: full,
    thumb,
    caption,
    createdAt: Date.now(),
  };
  await db.photos.put(record);
  return id;
}

export async function deletePhoto(id: string): Promise<void> {
  await db.photos.delete(id);
}

// Remove photos no longer referenced by any guide step, reference item, or profile.
export async function pruneOrphanPhotos(): Promise<void> {
  const [guides, refs] = await Promise.all([db.guides.toArray(), db.reference.toArray()]);
  const used = new Set<string>();
  for (const g of guides) for (const s of g.steps) for (const p of s.photoIds || []) used.add(p);
  for (const r of refs) for (const p of r.photoIds || []) used.add(p);
  const all = await db.photos.toArray();
  const orphans = all.filter((p) => !used.has(p.id)).map((p) => p.id);
  if (orphans.length) await db.photos.bulkDelete(orphans);
}

// Cache of object URLs so we do not recreate them constantly.
const urlCache = new Map<string, string>();

export function blobUrl(id: string, blob: Blob): string {
  const cached = urlCache.get(id);
  if (cached) return cached;
  const url = URL.createObjectURL(blob);
  urlCache.set(id, url);
  return url;
}

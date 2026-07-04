import { useEffect, useState } from 'react';
import { db } from '../db/db';
import { blobUrl } from '../lib/photos';
import { X } from 'lucide-react';

// Full-screen pinch-zoom viewer. Relies on the browser's native pinch-zoom
// inside a scrollable container (touch-action: pinch-zoom) for reliability.
export function PhotoViewer({ id, onClose }: { id: string; onClose: () => void }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    db.photos.get(id).then((rec) => rec && setUrl(blobUrl(id, rec.blob)));
  }, [id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-black" role="dialog" aria-modal="true">
      <div className="flex justify-end p-2">
        <button
          onClick={onClose}
          className="flex min-h-touch min-w-touch items-center justify-center rounded-full text-white"
          aria-label="Close photo"
        >
          <X size={28} />
        </button>
      </div>
      <div
        className="flex flex-1 items-center justify-center overflow-auto"
        style={{ touchAction: 'pinch-zoom' }}
        onClick={onClose}
      >
        {url && (
          <img
            src={url}
            alt="Full size photo"
            className="max-h-full max-w-full"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </div>
  );
}

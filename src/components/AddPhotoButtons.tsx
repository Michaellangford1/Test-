import { useRef, useState } from 'react';
import { Camera, ImagePlus } from 'lucide-react';
import { addPhoto } from '../lib/photos';
import { useToast } from '../ui/Toast';

interface Props {
  onAdded: (id: string) => void;
  compact?: boolean;
}

// Two sources per the spec: camera capture and gallery pick. Compresses on add.
export function AddPhotoButtons({ onAdded, compact = false }: Props) {
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const toast = useToast();

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    try {
      for (const file of Array.from(files)) {
        const id = await addPhoto(file);
        onAdded(id);
      }
    } catch (err) {
      toast.show(err instanceof Error ? err.message : 'Could not add that photo.', 'error');
    } finally {
      setBusy(false);
      if (cameraRef.current) cameraRef.current.value = '';
      if (galleryRef.current) galleryRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <input
        ref={galleryRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <button
        type="button"
        className={compact ? 'btn-secondary h-11 px-3 text-sm' : 'btn-secondary'}
        disabled={busy}
        onClick={() => cameraRef.current?.click()}
      >
        <Camera size={compact ? 18 : 20} aria-hidden /> {busy ? 'Saving…' : 'Camera'}
      </button>
      <button
        type="button"
        className={compact ? 'btn-secondary h-11 px-3 text-sm' : 'btn-secondary'}
        disabled={busy}
        onClick={() => galleryRef.current?.click()}
      >
        <ImagePlus size={compact ? 18 : 20} aria-hidden /> Gallery
      </button>
    </div>
  );
}

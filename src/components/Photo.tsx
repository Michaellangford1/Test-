import { useEffect, useState } from 'react';
import { db } from '../db/db';
import { blobUrl } from '../lib/photos';
import { ImageOff } from 'lucide-react';

interface PhotoProps {
  id: string;
  thumb?: boolean;
  className?: string;
  alt?: string;
  onClick?: () => void;
}

// Renders a stored photo (or its thumbnail) from IndexedDB by id.
export function Photo({ id, thumb = false, className = '', alt = 'Photo', onClick }: PhotoProps) {
  const [url, setUrl] = useState<string | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let active = true;
    db.photos.get(id).then((rec) => {
      if (!active) return;
      if (!rec) {
        setMissing(true);
        return;
      }
      setUrl(blobUrl(thumb ? `${id}-t` : id, thumb ? rec.thumb : rec.blob));
    });
    return () => {
      active = false;
    };
  }, [id, thumb]);

  if (missing) {
    return (
      <div className={`flex items-center justify-center bg-black/5 dark:bg-white/5 ${className}`}>
        <ImageOff size={20} className="opacity-40" aria-hidden />
      </div>
    );
  }
  if (!url) {
    return <div className={`animate-pulse bg-black/5 dark:bg-white/5 ${className}`} />;
  }
  const img = (
    <img src={url} alt={alt} className={`object-cover ${className}`} loading="lazy" />
  );
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="block" aria-label="Open photo">
        {img}
      </button>
    );
  }
  return img;
}

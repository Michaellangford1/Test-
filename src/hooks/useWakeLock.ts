import { useEffect, useRef, useState } from 'react';

// Holds a screen wake lock while active; re-acquires on visibilitychange, and
// releases cleanly on unmount. Returns whether the lock is currently held.
export function useWakeLock(active: boolean): boolean {
  const sentinel = useRef<WakeLockSentinel | null>(null);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;

    const acquire = async () => {
      if (!('wakeLock' in navigator)) return;
      try {
        const lock = await navigator.wakeLock.request('screen');
        if (cancelled) {
          void lock.release();
          return;
        }
        sentinel.current = lock;
        setHeld(true);
        lock.addEventListener('release', () => setHeld(false));
      } catch {
        setHeld(false);
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && active) void acquire();
    };

    void acquire();
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisibility);
      const lock = sentinel.current;
      sentinel.current = null;
      setHeld(false);
      if (lock) void lock.release().catch(() => undefined);
    };
  }, [active]);

  return held;
}

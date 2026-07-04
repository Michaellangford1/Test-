import { useEffect, useState } from 'react';
import { getSetting, setSetting } from '../db/db';

export type ThemePref = 'system' | 'light' | 'dark';

const THEME_KEY = 'theme';

function apply(pref: ThemePref) {
  const prefersDark =
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = pref === 'dark' || (pref === 'system' && prefersDark);
  const root = document.documentElement;
  root.classList.toggle('dark', dark);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', dark ? '#12151a' : '#f3f5f7');
}

// Hook used by Settings; also self-applies on system changes.
export function useTheme(): [ThemePref, (p: ThemePref) => void] {
  const [pref, setPref] = useState<ThemePref>('system');

  useEffect(() => {
    getSetting<ThemePref>(THEME_KEY, 'system').then((p) => {
      setPref(p);
      apply(p);
    });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => {
      if (pref === 'system') apply('system');
    };
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, [pref]);

  const update = (p: ThemePref) => {
    setPref(p);
    apply(p);
    void setSetting(THEME_KEY, p);
  };

  return [pref, update];
}

// Applied once at startup before React mounts, so there is no flash.
export async function initTheme(): Promise<void> {
  const pref = await getSetting<ThemePref>(THEME_KEY, 'system');
  apply(pref);
}

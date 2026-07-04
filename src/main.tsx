import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import { App } from './App';
import { seedIfNeeded } from './db/seed';
import { initTheme } from './ui/theme';
import { setSetting, getSetting } from './db/db';

// Request persistent storage once on first run and record the result so it can
// be surfaced in Settings. Kept here so it runs before any heavy data work.
async function requestPersistOnce() {
  const asked = await getSetting<boolean>('persist-asked', false);
  if (asked) return;
  let granted = false;
  try {
    if (navigator.storage?.persist) granted = await navigator.storage.persist();
  } catch {
    granted = false;
  }
  await setSetting('persist-asked', true);
  await setSetting('persist-granted', granted);
}

async function bootstrap() {
  await initTheme();
  await seedIfNeeded();
  await requestPersistOnce();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </StrictMode>,
  );
}

void bootstrap();

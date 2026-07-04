import { useEffect } from 'react';
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { BookOpen, Home, MapPin, Settings as SettingsIcon, Sparkles } from 'lucide-react';
import { ToastProvider } from './ui/Toast';
import { UpdateToast } from './ui/UpdateToast';
import { useGuides, useReferenceItems } from './hooks/data';
import { rebuildIndex } from './lib/search';

import { Library } from './pages/Library';
import { GuideView } from './pages/GuideView';
import { TaskMode } from './pages/TaskMode';
import { Reference } from './pages/Reference';
import { ReferenceItemView } from './pages/ReferenceItemView';
import { Profile } from './pages/Profile';
import { Composer } from './pages/Composer';
import { ImportScreen } from './pages/ImportScreen';
import { GuideEditor } from './pages/GuideEditor';
import { ReferenceEditor } from './pages/ReferenceEditor';
import { SearchScreen } from './pages/SearchScreen';
import { Settings } from './pages/Settings';

const NAV = [
  { to: '/', label: 'Library', icon: Home, end: true },
  { to: '/reference', label: 'Reference', icon: MapPin, end: false },
  { to: '/compose', label: 'Create', icon: Sparkles, end: false },
  { to: '/import', label: 'Import', icon: BookOpen, end: false },
  { to: '/settings', label: 'Settings', icon: SettingsIcon, end: false },
];

function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur dark:border-slate-600 dark:bg-slate-800/95"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Main"
    >
      <div className="mx-auto flex max-w-2xl">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              'flex min-h-touch flex-1 flex-col items-center justify-center gap-0.5 py-2 text-xs font-medium ' +
              (isActive ? 'text-accent' : 'text-ink/60 dark:text-paper/60')
            }
          >
            <Icon size={22} aria-hidden />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-full max-w-2xl px-4 pb-28 pt-4">{children}</div>
  );
}

function SearchIndexer() {
  const guides = useGuides();
  const reference = useReferenceItems();
  useEffect(() => {
    if (guides && reference) rebuildIndex(guides, reference);
  }, [guides, reference]);
  return null;
}

export function App() {
  const location = useLocation();
  // Task Mode and the photo viewer are full-screen; everything else uses the shell.
  const fullscreen = /\/task$/.test(location.pathname);

  return (
    <ToastProvider>
      <SearchIndexer />
      <UpdateToast />
      {fullscreen ? (
        <Routes>
          <Route path="/guide/:id/task" element={<TaskMode />} />
        </Routes>
      ) : (
        <>
          <Shell>
            <Routes>
              <Route path="/" element={<Library />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/guide/new" element={<GuideEditor />} />
              <Route path="/guide/:id" element={<GuideView />} />
              <Route path="/guide/:id/edit" element={<GuideEditor />} />
              <Route path="/reference" element={<Reference />} />
              <Route path="/reference/new" element={<ReferenceEditor />} />
              <Route path="/reference/:id" element={<ReferenceItemView />} />
              <Route path="/reference/:id/edit" element={<ReferenceEditor />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/compose" element={<Composer />} />
              <Route path="/import" element={<ImportScreen />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Shell>
          <BottomNav />
        </>
      )}
    </ToastProvider>
  );
}

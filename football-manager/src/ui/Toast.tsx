import { useGame } from '../store/game';

export default function Toast() {
  const toast = useGame((s) => s.toast);
  if (!toast) return null;
  return (
    <div className="fixed left-0 right-0 bottom-24 z-[60] flex justify-center px-4 pointer-events-none">
      <div className="max-w-md bg-ink-100 text-ink-950 font-bold text-sm rounded-lg px-4 py-2.5 shadow-xl animate-fade">{toast}</div>
    </div>
  );
}

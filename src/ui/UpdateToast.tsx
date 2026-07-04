import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw } from 'lucide-react';

// Small "Update ready — reload" toast when a new service worker is waiting.
export function UpdateToast() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div className="fixed inset-x-0 top-3 z-[60] flex justify-center px-4">
      <div className="card flex items-center gap-3 px-4 py-3 shadow-lg">
        <RefreshCw size={20} className="text-accent" aria-hidden />
        <span className="text-sm font-medium">Update ready</span>
        <button className="btn-primary h-10 px-3 text-sm" onClick={() => updateServiceWorker(true)}>
          Reload
        </button>
      </div>
    </div>
  );
}

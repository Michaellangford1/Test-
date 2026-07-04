import { type ReactNode } from 'react';

interface ConfirmProps {
  open: boolean;
  title: string;
  body?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

// Simple confirm dialog used for deletes and destructive resets.
export function Confirm({
  open,
  title,
  body,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[65] flex items-end justify-center bg-black/50 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
    >
      <div className="card w-full max-w-md p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold">{title}</h2>
        {body && <div className="mt-2 text-base opacity-80">{body}</div>}
        <div className="mt-5 flex justify-end gap-2">
          <button className="btn-secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className={danger ? 'btn-danger' : 'btn-primary'} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

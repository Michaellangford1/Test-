import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { type ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  back?: boolean;
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, back = false, actions }: Props) {
  const navigate = useNavigate();
  return (
    <header className="mb-4 flex items-start gap-2">
      {back && (
        <button
          onClick={() => navigate(-1)}
          className="btn-ghost -ml-2 min-w-touch px-2"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
      )}
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-2xl font-extrabold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm opacity-70">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-1">{actions}</div>}
    </header>
  );
}

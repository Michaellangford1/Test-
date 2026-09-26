import { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, Star, StarHalf, X } from 'lucide-react';
import type { Club, Player, Pos } from '../game/types';
import { posGroup } from '../game/attributes';
import { fmtMoney, roundMoney } from '../game/valuation';

export function Panel({ title, right, children, className = '' }: { title?: ReactNode; right?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`panel ${className}`}>
      {title != null && (
        <div className="panel-head flex items-center justify-between">
          <span>{title}</span>
          {right}
        </div>
      )}
      {children}
    </section>
  );
}

export function PageHeader({ title, sub, back = true, right }: { title: ReactNode; sub?: ReactNode; back?: boolean; right?: ReactNode }) {
  const nav = useNavigate();
  return (
    <div className="flex items-center gap-2 px-2 py-2 bg-ink-900 border-b border-ink-800 sticky top-0 z-10">
      {back && (
        <button className="btn-ghost !px-1" onClick={() => nav(-1)} aria-label="Back">
          <ChevronLeft size={22} />
        </button>
      )}
      <div className="flex-1 min-w-0 pl-1">
        <div className="font-bold truncate">{title}</div>
        {sub && <div className="text-xs text-ink-300 truncate">{sub}</div>}
      </div>
      {right}
    </div>
  );
}

const GROUP_COLORS: Record<string, string> = {
  GK: 'bg-yellow-500 text-black',
  CB: 'bg-blue-600 text-white',
  FB: 'bg-blue-500 text-white',
  DM: 'bg-teal-600 text-white',
  CM: 'bg-green-600 text-white',
  WM: 'bg-green-500 text-white',
  AM: 'bg-orange-500 text-white',
  W: 'bg-orange-500 text-white',
  ST: 'bg-red-600 text-white',
};

export function PosBadge({ pos, className = '' }: { pos: Pos; className?: string }) {
  return <span className={`chip justify-center min-w-[34px] ${GROUP_COLORS[posGroup(pos)]} ${className}`}>{pos}</span>;
}

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span className="inline-flex items-center text-gold" aria-label={`${value} stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
      ))}
      {half && <StarHalf size={size} fill="currentColor" strokeWidth={0} />}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => (
        <Star key={`e${i}`} size={size} className="text-ink-600" strokeWidth={1.5} />
      ))}
    </span>
  );
}

export function CondBar({ value, className = '' }: { value: number; className?: string }) {
  const v = Math.round(value);
  const color = v >= 90 ? 'bg-win' : v >= 75 ? 'bg-yellow-400' : v >= 60 ? 'bg-orange-500' : 'bg-loss';
  return (
    <div className={`h-1.5 w-10 rounded-full bg-ink-700 overflow-hidden ${className}`} title={`${v}%`}>
      <div className={`h-full ${color}`} style={{ width: `${v}%` }} />
    </div>
  );
}

export function attrColor(v: number): string {
  if (v >= 16) return 'text-win';
  if (v >= 13) return 'text-lime-300';
  if (v >= 10) return 'text-ink-100';
  if (v >= 6) return 'text-orange-300';
  return 'text-loss';
}

export function ClubBadge({ club, size = 28 }: { club: Pick<Club, 'colors' | 'short'>; size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-bold shrink-0 border border-black/40"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${club.colors[0]} 0 55%, ${club.colors[1]} 55% 100%)`,
        fontSize: Math.max(8, size * 0.3),
        color: '#fff',
        textShadow: '0 1px 2px #000, 0 0 2px #000',
      }}
    >
      {club.short.slice(0, 3)}
    </span>
  );
}

export function NatChip({ nat }: { nat: string }) {
  return <span className="chip bg-ink-700 text-ink-200">{nat}</span>;
}

export function RatingChip({ r }: { r: number | null }) {
  if (r == null || Number.isNaN(r)) return <span className="text-ink-400">-</span>;
  const c = r >= 8 ? 'bg-win text-black' : r >= 7 ? 'bg-lime-600 text-white' : r >= 6.3 ? 'bg-ink-600 text-white' : 'bg-loss text-white';
  return <span className={`chip ${c}`}>{r.toFixed(1)}</span>;
}

export function FormDots({ form }: { form: ('W' | 'D' | 'L')[] }) {
  return (
    <span className="inline-flex gap-0.5">
      {form.map((f, i) => (
        <span
          key={i}
          className={`w-4 h-4 rounded-sm text-[10px] font-bold flex items-center justify-center ${f === 'W' ? 'bg-win text-black' : f === 'D' ? 'bg-draw text-black' : 'bg-loss text-white'}`}
        >
          {f}
        </span>
      ))}
    </span>
  );
}

export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: ReactNode; children: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 animate-fade" onClick={onClose}>
      <div
        className="w-full max-w-lg max-h-[88vh] bg-ink-850 border-t border-ink-600 rounded-t-xl flex flex-col animate-slide-up safe-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-ink-700">
          <div className="font-bold">{title}</div>
          <button className="btn-ghost !p-1" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto scroll-thin">{children}</div>
      </div>
    </div>
  );
}

export function Segmented<T extends string>({ value, options, onChange, small }: { value: T; options: { value: T; label: string }[]; onChange: (v: T) => void; small?: boolean }) {
  return (
    <div className="flex rounded-md border border-ink-600 overflow-hidden">
      {options.map((o) => (
        <button
          key={o.value}
          className={`flex-1 ${small ? 'py-1 text-[11px]' : 'py-1.5 text-xs'} font-bold px-1 ${value === o.value ? 'bg-ink-500 text-white' : 'bg-ink-800 text-ink-300'}`}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Tabs<T extends string>({ value, tabs, onChange }: { value: T; tabs: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="flex bg-ink-900 border-b border-ink-700 overflow-x-auto no-scrollbar">
      {tabs.map((t) => (
        <button
          key={t.value}
          className={`px-3 py-2.5 text-sm font-bold whitespace-nowrap border-b-2 ${value === t.value ? 'border-gold text-white' : 'border-transparent text-ink-300'}`}
          onClick={() => onChange(t.value)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function step(v: number): number {
  if (v >= 50_000_000) return 2_500_000;
  if (v >= 10_000_000) return 1_000_000;
  if (v >= 2_000_000) return 250_000;
  if (v >= 500_000) return 50_000;
  if (v >= 100_000) return 25_000;
  if (v >= 10_000) return 5_000;
  return 1_000;
}

export function MoneyStepper({ value, onChange, min = 0, suffix }: { value: number; onChange: (v: number) => void; min?: number; suffix?: string }) {
  return (
    <div className="flex items-center gap-2">
      <button className="btn-secondary !px-3" onClick={() => onChange(Math.max(min, roundMoney(value - step(value - 1))))} aria-label="Decrease">
        <Minus size={18} />
      </button>
      <div className="flex-1 text-center text-lg font-bold tabular-nums">
        {fmtMoney(value)}
        {suffix && <span className="text-xs text-ink-300 font-normal"> {suffix}</span>}
      </div>
      <button className="btn-secondary !px-3" onClick={() => onChange(roundMoney(value + step(value)))} aria-label="Increase">
        <Plus size={18} />
      </button>
    </div>
  );
}

export function Stat({ label, value, sub }: { label: string; value: ReactNode; sub?: ReactNode }) {
  return (
    <div className="flex-1 min-w-0 px-3 py-2">
      <div className="text-[11px] uppercase text-ink-300 font-bold tracking-wide">{label}</div>
      <div className="font-bold truncate">{value}</div>
      {sub && <div className="text-xs text-ink-300 truncate">{sub}</div>}
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="px-4 py-8 text-center text-ink-300 text-sm">{children}</div>;
}

export function PlayerStatusIcons({ p }: { p: Player }) {
  return (
    <span className="inline-flex gap-1">
      {p.injury && <span className="chip bg-loss text-white" title={p.injury.name}>INJ</span>}
      {p.suspended > 0 && <span className="chip bg-red-800 text-white">SUS</span>}
      {p.transferListed && <span className="chip bg-blue-700 text-white">TL</span>}
      {p.youth && p.age <= 18 && <span className="chip bg-teal-800 text-white">U19</span>}
    </span>
  );
}

export function moraleText(m: number): string {
  if (m >= 17) return 'Superb';
  if (m >= 14) return 'Very Good';
  if (m >= 11) return 'Good';
  if (m >= 8) return 'Okay';
  if (m >= 5) return 'Poor';
  return 'Very Poor';
}

export function avgRating(p: Player): number | null {
  return p.stats.rated ? p.stats.ratingSum / p.stats.rated : null;
}

export function repStars(rep: number): number {
  return Math.max(0.5, Math.min(5, Math.round(((rep - 45) / 10) * 2) / 2));
}

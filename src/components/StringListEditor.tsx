import { Plus, X } from 'lucide-react';

interface Props {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

// Editable list of short strings (tools, materials, safety notes, tags).
export function StringListEditor({ label, items, onChange, placeholder }: Props) {
  const update = (i: number, value: string) => {
    const next = [...items];
    next[i] = value;
    onChange(next);
  };
  return (
    <div className="mb-4">
      <label className="label">{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              className="input"
              value={item}
              placeholder={placeholder}
              onChange={(e) => update(i, e.target.value)}
            />
            <button
              type="button"
              className="btn-secondary min-w-touch px-3"
              aria-label={`Remove ${label} item`}
              onClick={() => onChange(items.filter((_, x) => x !== i))}
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="btn-ghost mt-2 text-sm text-accent"
        onClick={() => onChange([...items, ''])}
      >
        <Plus size={16} /> Add {label.toLowerCase()}
      </button>
    </div>
  );
}

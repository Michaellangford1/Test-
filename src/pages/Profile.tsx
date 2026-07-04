import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Plus, Sparkles, Trash2 } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { StringListEditor } from '../components/StringListEditor';
import { useProfile } from '../hooks/data';
import { saveProfile } from '../db/mutations';
import { SEED_PROFILE } from '../db/seedData';
import { hasTodo } from '../lib/categories';
import { useToast } from '../ui/Toast';
import type { ProfileData } from '../types/schema';

interface Appliance {
  name: string;
  notes: string;
}

function Field({
  label,
  value,
  onChange,
  textarea = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="mb-4">
      <label className="label flex items-center gap-2">
        {label}
        {hasTodo(value) && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber/20 px-2 py-0.5 text-xs font-semibold text-amber-deep dark:text-amber-soft">
            <AlertCircle size={12} /> To do
          </span>
        )}
      </label>
      {textarea ? (
        <textarea
          className="input min-h-[72px] py-2"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export function Profile() {
  const rec = useProfile();
  const toast = useToast();
  const [data, setData] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (rec) setData(structuredClone(rec.data));
    else if (rec === null) setData(structuredClone(SEED_PROFILE));
  }, [rec]);

  if (!data) return <p className="opacity-60">Loading…</p>;

  const d = data as Record<string, any>;
  const property = (d.property ?? {}) as Record<string, any>;
  const utilities = (d.utilities ?? {}) as Record<string, any>;
  const decor = (d.decorAndFinishes ?? {}) as Record<string, any>;
  const appliances: Appliance[] = Array.isArray(d.appliances) ? d.appliances : [];

  const patch = (updater: (draft: Record<string, any>) => void) => {
    setData((prev) => {
      const next = structuredClone(prev) as Record<string, any>;
      updater(next);
      return next as ProfileData;
    });
  };

  const save = async () => {
    await saveProfile(data);
    toast.show('Profile saved', 'success');
  };

  return (
    <div>
      <PageHeader
        title="House Profile"
        subtitle="Injected into every Claude prompt"
        back
        actions={
          <Link
            to="/compose?intent=new-reference"
            className="btn-ghost min-w-touch px-2"
            aria-label="Create with Claude"
          >
            <Sparkles size={22} />
          </Link>
        }
      />

      <p className="mb-4 rounded-lg bg-accent/10 px-3 py-2 text-sm">
        Anything marked <span className="font-semibold text-amber-deep dark:text-amber-soft">To do</span>{' '}
        still needs filling in — the more you add, the more bespoke your guides become.
      </p>

      <Field
        label="Area & climate"
        value={d.areaAndClimate ?? ''}
        onChange={(v) => patch((n) => (n.areaAndClimate = v))}
        textarea
      />

      <h2 className="mb-2 mt-6 text-sm font-bold uppercase tracking-wide opacity-60">Property</h2>
      <Field
        label="Type"
        value={property.type ?? ''}
        onChange={(v) => patch((n) => ((n.property ??= {}).type = v))}
      />
      <StringListEditor
        label="Recent works"
        items={Array.isArray(property.recentWorks) ? property.recentWorks : []}
        onChange={(v) => patch((n) => ((n.property ??= {}).recentWorks = v))}
      />

      <h2 className="mb-2 mt-6 text-sm font-bold uppercase tracking-wide opacity-60">Utilities</h2>
      <Field
        label="Water stopcock"
        value={utilities.waterStopcock ?? ''}
        onChange={(v) => patch((n) => ((n.utilities ??= {}).waterStopcock = v))}
        textarea
      />
      <Field
        label="Electricity"
        value={utilities.electricity ?? ''}
        onChange={(v) => patch((n) => ((n.utilities ??= {}).electricity = v))}
        textarea
      />
      <Field
        label="Gas"
        value={utilities.gas ?? ''}
        onChange={(v) => patch((n) => ((n.utilities ??= {}).gas = v))}
        textarea
      />
      <Field
        label="Heating"
        value={utilities.heating ?? ''}
        onChange={(v) => patch((n) => ((n.utilities ??= {}).heating = v))}
        textarea
      />

      <h2 className="mb-2 mt-6 text-sm font-bold uppercase tracking-wide opacity-60">Known issues</h2>
      <StringListEditor
        label="Issues"
        items={Array.isArray(d.knownIssues) ? d.knownIssues : []}
        onChange={(v) => patch((n) => (n.knownIssues = v))}
      />

      <h2 className="mb-2 mt-6 text-sm font-bold uppercase tracking-wide opacity-60">Appliances</h2>
      <div className="space-y-3">
        {appliances.map((app, i) => (
          <div key={i} className="card p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-bold opacity-60">Appliance {i + 1}</span>
              <button
                className="btn-ghost min-w-touch px-2 text-[#a23c46]"
                aria-label="Remove appliance"
                onClick={() => patch((n) => n.appliances.splice(i, 1))}
              >
                <Trash2 size={18} />
              </button>
            </div>
            <input
              className="input mb-2"
              value={app.name}
              placeholder="Name / model"
              onChange={(e) => patch((n) => (n.appliances[i].name = e.target.value))}
            />
            <textarea
              className="input min-h-[60px] py-2"
              value={app.notes}
              placeholder="Notes"
              onChange={(e) => patch((n) => (n.appliances[i].notes = e.target.value))}
            />
          </div>
        ))}
      </div>
      <button
        className="btn-ghost mt-2 text-sm text-accent"
        onClick={() =>
          patch((n) => ((n.appliances ??= []).push({ name: '', notes: '' })))
        }
      >
        <Plus size={16} /> Add appliance
      </button>

      <h2 className="mb-2 mt-6 text-sm font-bold uppercase tracking-wide opacity-60">
        Decor & finishes
      </h2>
      <Field
        label="Paint codes"
        value={decor.paintCodes ?? ''}
        onChange={(v) => patch((n) => ((n.decorAndFinishes ??= {}).paintCodes = v))}
        textarea
      />
      <Field
        label="Kitchen floor"
        value={decor.kitchenFloor ?? ''}
        onChange={(v) => patch((n) => ((n.decorAndFinishes ??= {}).kitchenFloor = v))}
        textarea
      />

      <h2 className="mb-2 mt-6 text-sm font-bold uppercase tracking-wide opacity-60">
        Outdoors & household
      </h2>
      <Field
        label="Outdoors"
        value={d.outdoors ?? ''}
        onChange={(v) => patch((n) => (n.outdoors = v))}
        textarea
      />
      <Field
        label="Household"
        value={d.household ?? ''}
        onChange={(v) => patch((n) => (n.household = v))}
        textarea
      />
      <Field
        label="Freeform notes"
        value={d.freeformNotes ?? ''}
        onChange={(v) => patch((n) => (n.freeformNotes = v))}
        textarea
        placeholder="Anything else worth telling Claude about your house"
      />

      <div className="sticky bottom-24 mt-6">
        <button className="btn-primary w-full h-14 text-lg" onClick={save}>
          Save profile
        </button>
      </div>
    </div>
  );
}

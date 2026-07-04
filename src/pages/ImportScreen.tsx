import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { AlertTriangle, CheckCircle2, ClipboardPaste } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { TodoText } from '../components/TodoText';
import { Markdown } from '../components/Markdown';
import { parseJsonLoose } from '../lib/parse';
import { formatZodError, parseEnvelope, type ParsedPayload } from '../types/schema';
import { db } from '../db/db';
import { uniqueSuffix } from '../lib/id';
import {
  saveGuideFromPayload,
  saveReferenceFromPayload,
  saveProfile,
} from '../db/mutations';
import { useToast } from '../ui/Toast';

type Parsed =
  | { ok: true; payload: ParsedPayload }
  | { ok: false; error: string };

export function ImportScreen() {
  const [text, setText] = useState('');
  const [parsed, setParsed] = useState<Parsed | null>(null);
  const [idExists, setIdExists] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const validate = async () => {
    if (!text.trim()) {
      setParsed({ ok: false, error: 'Paste the reply from Claude first.' });
      return;
    }
    let obj: unknown;
    try {
      obj = parseJsonLoose(text);
    } catch {
      setParsed({
        ok: false,
        error:
          "That is not valid JSON. Paste Claude's whole reply — the app will find the ```json block for you.",
      });
      return;
    }
    try {
      const payload = parseEnvelope(obj);
      setParsed({ ok: true, payload });
      // check for an existing id
      if (payload.type === 'guide') setIdExists(!!(await db.guides.get(payload.guide.id)));
      else if (payload.type === 'reference') setIdExists(!!(await db.reference.get(payload.reference.id)));
      else setIdExists(true); // profile always replaces the single profile
    } catch (err) {
      if (err instanceof z.ZodError) {
        setParsed({ ok: false, error: formatZodError(err) });
      } else {
        setParsed({ ok: false, error: err instanceof Error ? err.message : 'Could not read that payload.' });
      }
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      if (clip) {
        setText(clip);
        setParsed(null);
      }
    } catch {
      toast.show('Paste into the box manually', 'info');
    }
  };

  const save = async (mode: 'update' | 'copy') => {
    if (!parsed || !parsed.ok) return;
    const p = parsed.payload;
    try {
      if (p.type === 'guide') {
        let id = p.guide.id;
        if (mode === 'copy') {
          const all = new Set((await db.guides.toArray()).map((g) => g.id));
          id = uniqueSuffix(p.guide.id, (x) => all.has(x));
        }
        await saveGuideFromPayload(p.guide, 'claude', id);
        toast.show(mode === 'copy' ? 'Saved as a copy' : 'Guide saved', 'success');
        navigate(`/guide/${id}`);
      } else if (p.type === 'reference') {
        let id = p.reference.id;
        if (mode === 'copy') {
          const all = new Set((await db.reference.toArray()).map((r) => r.id));
          id = uniqueSuffix(p.reference.id, (x) => all.has(x));
        }
        await saveReferenceFromPayload(p.reference, id);
        toast.show(mode === 'copy' ? 'Saved as a copy' : 'Reference saved', 'success');
        navigate(`/reference/${id}`);
      } else {
        await saveProfile(p.profile);
        toast.show('House Profile updated', 'success');
        navigate('/profile');
      }
    } catch (e) {
      toast.show(e instanceof Error ? e.message : 'Could not save', 'error');
    }
  };

  return (
    <div>
      <PageHeader title="Paste from Claude" subtitle="Import a guide, reference item or profile" back />

      <div className="mb-2 flex justify-end">
        <button className="btn-secondary h-11 px-3 text-sm" onClick={pasteFromClipboard}>
          <ClipboardPaste size={18} /> Paste from clipboard
        </button>
      </div>
      <textarea
        className="input min-h-[160px] py-3 font-mono text-sm"
        placeholder="Paste Claude's whole reply here (including the ```json block)…"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setParsed(null);
        }}
      />
      <button className="btn-primary mt-3 w-full h-14 text-lg" onClick={validate}>
        Check &amp; preview
      </button>

      {parsed && !parsed.ok && (
        <div className="mt-4 rounded-xl border border-[#a23c46]/40 bg-[#a23c46]/10 p-4">
          <p className="mb-1 flex items-center gap-2 font-bold text-[#a23c46]">
            <AlertTriangle size={20} /> Could not import
          </p>
          <pre className="whitespace-pre-wrap break-words text-sm text-[#a23c46]">{parsed.error}</pre>
        </div>
      )}

      {parsed && parsed.ok && (
        <div className="mt-4">
          <p className="mb-2 flex items-center gap-2 font-bold text-accent">
            <CheckCircle2 size={20} /> Looks good — preview below
          </p>
          <Preview payload={parsed.payload} />

          {idExists && parsed.payload.type !== 'profile' ? (
            <div className="mt-4 rounded-xl border border-amber/40 bg-amber-soft/50 p-4 dark:bg-amber-deep/25">
              <p className="mb-3 font-semibold text-amber-deep dark:text-amber-soft">
                An item with this id already exists. Update it, or save a separate copy?
              </p>
              <div className="flex flex-wrap gap-2">
                <button className="btn-primary" onClick={() => save('update')}>
                  Update existing
                </button>
                <button className="btn-secondary" onClick={() => save('copy')}>
                  Save as copy
                </button>
              </div>
            </div>
          ) : (
            <button className="btn-primary mt-4 w-full h-14 text-lg" onClick={() => save('update')}>
              {parsed.payload.type === 'profile' ? 'Replace House Profile' : 'Save'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Preview({ payload }: { payload: ParsedPayload }) {
  if (payload.type === 'guide') {
    const g = payload.guide;
    return (
      <div className="card p-4">
        <h2 className="text-xl font-bold">{g.title}</h2>
        <p className="mt-1 text-sm opacity-70">
          {g.category} · {g.difficulty} · {g.timeEstimate}
        </p>
        {g.safety.length > 0 && (
          <div className="mt-3 rounded-lg border border-amber/40 bg-amber-soft/50 p-3 text-sm dark:bg-amber-deep/25">
            <p className="font-bold text-amber-deep dark:text-amber-soft">Safety</p>
            <ul className="list-disc pl-4 text-amber-deep dark:text-amber-soft">
              {g.safety.map((s, i) => (
                <li key={i}>
                  <TodoText text={s} />
                </li>
              ))}
            </ul>
          </div>
        )}
        {g.houseNotes && (
          <p className="mt-3 rounded-lg bg-accent/10 p-3 text-sm">
            <TodoText text={g.houseNotes} />
          </p>
        )}
        <ol className="mt-3 list-decimal space-y-1 pl-5">
          {g.steps.map((s, i) => (
            <li key={i}>
              <TodoText text={s.text} />
            </li>
          ))}
        </ol>
      </div>
    );
  }
  if (payload.type === 'reference') {
    const r = payload.reference;
    return (
      <div className="card p-4">
        <h2 className="text-xl font-bold">{r.title}</h2>
        <p className="mt-1 text-sm opacity-70">{r.category}</p>
        <div className="mt-3">
          <Markdown>{r.body || '_(no body)_'}</Markdown>
        </div>
      </div>
    );
  }
  return (
    <div className="card p-4">
      <h2 className="text-xl font-bold">House Profile</h2>
      <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-black/5 p-3 text-xs dark:bg-white/5">
        {JSON.stringify(payload.profile, null, 2)}
      </pre>
    </div>
  );
}

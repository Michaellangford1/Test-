import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ClipboardCopy, Share2, ClipboardPaste } from 'lucide-react';
import { useGuide, useProfile } from '../hooks/data';
import { PageHeader } from '../components/PageHeader';
import { composePrompt, type ComposerIntent } from '../lib/prompt';
import { copyText, shareText } from '../lib/share';
import { useToast } from '../ui/Toast';
import { SEED_PROFILE } from '../db/seedData';

const INTENTS: { value: ComposerIntent; label: string; hint: string }[] = [
  { value: 'new-guide', label: 'New guide', hint: 'e.g. "guide for replacing the kitchen mixer tap"' },
  { value: 'improve-guide', label: 'Improve this guide', hint: 'e.g. "add a step about isolating the water first"' },
  { value: 'new-reference', label: 'New reference item', hint: 'e.g. "note where the stopcock is with a photo caption"' },
];

export function Composer() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const profileRec = useProfile();

  const initialIntent = (params.get('intent') as ComposerIntent) || 'new-guide';
  const guideId = params.get('guide') || undefined;
  const existingGuide = useGuide(guideId);

  const [intent, setIntent] = useState<ComposerIntent>(initialIntent);
  const [request, setRequest] = useState('');
  const [shared, setShared] = useState(false);

  useEffect(() => {
    if (guideId) setIntent('improve-guide');
  }, [guideId]);

  const profile = profileRec?.data ?? SEED_PROFILE;

  const prompt = useMemo(() => {
    if (intent === 'improve-guide' && !existingGuide) return '';
    return composePrompt({
      intent,
      profile,
      request: request || '…',
      existingGuide: intent === 'improve-guide' ? existingGuide ?? undefined : undefined,
    });
  }, [intent, profile, request, existingGuide]);

  const canSend = request.trim().length > 0 && !(intent === 'improve-guide' && !existingGuide);

  const doShare = async () => {
    if (!canSend) {
      toast.show('Type what you need first', 'error');
      return;
    }
    const res = await shareText(prompt);
    if (res === 'shared') {
      toast.show('Opened share sheet — paste into Claude', 'success');
      setShared(true);
    } else if (res === 'copied') {
      toast.show('Copied to clipboard — paste into Claude', 'success');
      setShared(true);
    } else if (res === 'cancelled') {
      toast.show('Share cancelled');
    } else {
      toast.show('Could not share or copy', 'error');
    }
  };

  const doCopy = async () => {
    if (!canSend) {
      toast.show('Type what you need first', 'error');
      return;
    }
    const res = await copyText(prompt);
    toast.show(res === 'copied' ? 'Prompt copied' : 'Could not copy', res === 'copied' ? 'success' : 'error');
    if (res === 'copied') setShared(true);
  };

  const current = INTENTS.find((i) => i.value === intent)!;

  return (
    <div>
      <PageHeader title="Create with Claude" subtitle="Compose a prompt, paste the reply back" back />

      <div className="mb-4 flex gap-2 overflow-x-auto">
        {INTENTS.map((i) => (
          <button
            key={i.value}
            onClick={() => setIntent(i.value)}
            disabled={i.value === 'improve-guide' && !guideId}
            className={
              'chip shrink-0 ' +
              (intent === i.value
                ? 'border-accent bg-accent text-white'
                : 'border-line dark:border-slate-600') +
              (i.value === 'improve-guide' && !guideId ? ' opacity-40' : '')
            }
          >
            {i.label}
          </button>
        ))}
      </div>

      {intent === 'improve-guide' && existingGuide && (
        <p className="mb-3 rounded-lg bg-accent/10 px-3 py-2 text-sm">
          Improving <strong>{existingGuide.title}</strong> — Claude keeps the same id, so pasting the
          reply updates this guide.
        </p>
      )}

      <label className="label" htmlFor="request">
        What do you need?
      </label>
      <textarea
        id="request"
        className="input mb-1 min-h-[96px] py-3"
        value={request}
        onChange={(e) => setRequest(e.target.value)}
        placeholder={current.hint}
      />
      <p className="mb-4 text-xs opacity-60">
        Your House Profile and the schema are added automatically.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <button className="btn-primary col-span-2 h-14 text-lg" onClick={doShare}>
          <Share2 size={22} /> Open share sheet
        </button>
        <button className="btn-secondary" onClick={doCopy}>
          <ClipboardCopy size={18} /> Copy prompt
        </button>
        <Link to="/import" className="btn-secondary">
          <ClipboardPaste size={18} /> Paste reply
        </Link>
      </div>

      {shared && (
        <p className="mb-4 rounded-lg bg-accent/10 px-3 py-2 text-sm">
          Sent. When Claude replies, copy the whole message and tap{' '}
          <button onClick={() => navigate('/import')} className="font-semibold underline">
            Paste reply
          </button>
          .
        </p>
      )}

      <details className="card p-4">
        <summary className="cursor-pointer font-semibold">Preview the exact prompt</summary>
        <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-black/5 p-3 text-xs dark:bg-white/5">
          {prompt || 'Pick a guide to improve first.'}
        </pre>
      </details>
    </div>
  );
}

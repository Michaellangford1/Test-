// Open the Android share sheet with the composed prompt; fall back to clipboard.
// Returns how the text left the app so the UI can show the right confirmation.
export type ShareResult = 'shared' | 'copied' | 'cancelled' | 'failed';

export async function shareText(text: string): Promise<ShareResult> {
  if (typeof navigator !== 'undefined' && 'share' in navigator) {
    try {
      await navigator.share({ text });
      return 'shared';
    } catch (err) {
      // User dismissing the sheet throws AbortError — not an error worth surfacing.
      if (err instanceof DOMException && err.name === 'AbortError') return 'cancelled';
      // Fall through to clipboard on any other share failure.
    }
  }
  return copyText(text);
}

export async function copyText(text: string): Promise<ShareResult> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return 'copied';
    }
  } catch {
    // fall through to legacy path
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok ? 'copied' : 'failed';
  } catch {
    return 'failed';
  }
}

import { Fragment } from 'react';
import { TODO_RE } from '../lib/categories';

// Renders text with any [TODO: …] placeholders visually flagged.
export function TodoText({ text, className = '' }: { text: string; className?: string }) {
  if (!text) return null;
  const globalRe = new RegExp(TODO_RE.source, 'gi');
  const parts: (string | { todo: string })[] = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = globalRe.exec(text)) !== null) {
    if (m.index > lastIndex) parts.push(text.slice(lastIndex, m.index));
    parts.push({ todo: m[0] });
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return (
    <span className={className}>
      {parts.map((p, i) =>
        typeof p === 'string' ? (
          <Fragment key={i}>{p}</Fragment>
        ) : (
          <mark
            key={i}
            className="rounded bg-amber/20 px-1 font-semibold text-amber-deep dark:bg-amber/25 dark:text-amber-soft"
            title="Unfilled — add this detail to your House Profile or Reference"
          >
            {p.todo}
          </mark>
        ),
      )}
    </span>
  );
}

// Extract JSON from a paste: accept raw JSON, or any text containing a fenced
// code block (take the first fenced block; strip an optional leading `json` tag).

export function extractJsonText(input: string): string {
  const text = input.trim();
  // First fenced block ``` ... ```
  const fenceMatch = text.match(/```[^\n]*\n([\s\S]*?)```/);
  if (fenceMatch) {
    let inner = fenceMatch[1].trim();
    // strip an optional leading language tag captured accidentally on the same line
    inner = inner.replace(/^json\s*\n/i, '');
    return inner.trim();
  }
  // Otherwise assume the whole thing is (or contains) JSON — grab the outermost braces.
  const first = text.indexOf('{');
  const last = text.lastIndexOf('}');
  if (first !== -1 && last !== -1 && last > first) {
    return text.slice(first, last + 1);
  }
  return text;
}

export function parseJsonLoose(input: string): unknown {
  const jsonText = extractJsonText(input);
  return JSON.parse(jsonText);
}

// Small id helpers. Photos get random ids; guides/reference use kebab-case slugs.

export function randomId(prefix = ''): string {
  const rnd =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36);
  return prefix ? `${prefix}-${rnd}` : rnd;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'item';
}

// Produce an unused id by suffixing -2, -3, … when the base already exists.
export function uniqueSuffix(base: string, exists: (id: string) => boolean): string {
  if (!exists(base)) return base;
  let n = 2;
  while (exists(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}

import type { GuideCategory } from '../types/schema';

// One quiet accent per category — used only as a thin edge or chip, never a
// flooded background. Values are chosen to hold AA contrast in both themes when
// used for text/edges on the app surfaces.
export const CATEGORY_ACCENT: Record<GuideCategory, string> = {
  Plumbing: '#3f7d8c', // teal
  Electrics: '#b7791f', // amber
  'Heating & Cooling': '#c0603a', // warm rust
  'Walls & Decorating': '#6b7a8f', // slate blue
  'Fixings & Furniture': '#7a6b52', // timber
  Appliances: '#5b7a5b', // sage
  'Outdoors & Garden': '#4f7a3f', // green
  'Safety & Monitoring': '#a23c46', // red
};

export function categoryAccent(category: string): string {
  return (CATEGORY_ACCENT as Record<string, string>)[category] ?? '#3f7d8c';
}

// Detect unfilled placeholders so we can flag them for the owner.
export const TODO_RE = /\[TODO:[^\]]*\]/i;

export function hasTodo(text: string | undefined | null): boolean {
  return !!text && TODO_RE.test(text);
}

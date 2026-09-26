// Dates are stored as 'YYYY-MM-DD' strings and manipulated in UTC.

const DAY = 86400000;

export function toTime(d: string): number {
  return Date.UTC(+d.slice(0, 4), +d.slice(5, 7) - 1, +d.slice(8, 10));
}

export function fromTime(t: number): string {
  return new Date(t).toISOString().slice(0, 10);
}

export function addDays(d: string, n: number): string {
  return fromTime(toTime(d) + n * DAY);
}

export function diffDays(a: string, b: string): number {
  return Math.round((toTime(a) - toTime(b)) / DAY);
}

/** 0 = Sunday ... 6 = Saturday */
export function weekday(d: string): number {
  return new Date(toTime(d)).getUTCDay();
}

const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function fmtDate(d: string, withDay = true): string {
  const dt = new Date(toTime(d));
  const s = `${dt.getUTCDate()} ${MO[dt.getUTCMonth()]} ${dt.getUTCFullYear()}`;
  return withDay ? `${WD[dt.getUTCDay()]} ${s}` : s;
}

export function fmtShort(d: string): string {
  const dt = new Date(toTime(d));
  return `${dt.getUTCDate()} ${MO[dt.getUTCMonth()]}`;
}

export function month(d: string): number {
  return +d.slice(5, 7);
}

export function year(d: string): number {
  return +d.slice(0, 4);
}

/** First date >= d that falls on the given weekday */
export function nextWeekday(d: string, wd: number): string {
  let x = d;
  while (weekday(x) !== wd) x = addDays(x, 1);
  return x;
}

export function seasonLabel(season: number): string {
  return `${season}/${String((season + 1) % 100).padStart(2, '0')}`;
}

/** Transfer windows: 1 Jul - 1 Sep, and 1 Jan - 2 Feb */
export function transferWindowOpen(d: string): boolean {
  const m = month(d);
  const day = +d.slice(8, 10);
  if (m === 7 || m === 8) return true;
  if (m === 9 && day === 1) return true;
  if (m === 1) return true;
  if (m === 2 && day <= 2) return true;
  return false;
}

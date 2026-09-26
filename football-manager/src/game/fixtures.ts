import type { Fixture, League, World } from './types';
import { Rng } from './rng';
import { addDays, diffDays, nextWeekday, toTime } from './dates';

/** Double round-robin pairings using the circle method. Returns rounds of [home, away]. */
export function roundRobin(teams: number[], rng: Rng): [number, number][][] {
  const t = rng.shuffle([...teams]);
  if (t.length % 2) t.push(-1);
  const n = t.length;
  const half: [number, number][][] = [];
  for (let r = 0; r < n - 1; r++) {
    const round: [number, number][] = [];
    for (let i = 0; i < n / 2; i++) {
      const a = t[i];
      const b = t[n - 1 - i];
      if (a === -1 || b === -1) continue;
      // alternate home/away to avoid long home/away runs
      round.push((r + i) % 2 === 0 ? [a, b] : [b, a]);
    }
    half.push(round);
    // rotate all but the first
    t.splice(1, 0, t.pop()!);
  }
  const second = half.map((round) => round.map(([h, a]) => [a, h] as [number, number]));
  return [...half, ...second];
}

interface LeagueCalendar {
  start: string; // first matchday on/after
  end: string; // last matchday on/before
  winterBreak?: [string, string];
}

function calendarFor(league: League, season: number): LeagueCalendar {
  const y = season;
  const y1 = season + 1;
  switch (league.id) {
    case 'eng2':
      return { start: `${y}-08-09`, end: `${y1}-05-02` };
    case 'eng1':
      return { start: `${y}-08-16`, end: `${y1}-05-24` };
    case 'ger1':
      return { start: `${y}-08-23`, end: `${y1}-05-16`, winterBreak: [`${y}-12-22`, `${y1}-01-09`] };
    case 'ita1':
      return { start: `${y}-08-23`, end: `${y1}-05-24` };
    case 'esp1':
      return { start: `${y}-08-16`, end: `${y1}-05-24` };
    case 'fra1':
      return { start: `${y}-08-16`, end: `${y1}-05-16`, winterBreak: [`${y}-12-22`, `${y1}-01-02`] };
    default:
      return { start: `${y}-08-16`, end: `${y1}-05-23` };
  }
}

/** International break weekends (no top-flight football) */
function intlBreaks(season: number): string[] {
  const y = season;
  const y1 = season + 1;
  return [`${y}-09-06`, `${y}-10-11`, `${y}-11-15`, `${y1}-03-28`].map((d) => nextWeekday(d, 6));
}

/** Choose `rounds` match dates between start and end */
export function matchDates(league: League, season: number, rounds: number): string[] {
  const cal = calendarFor(league, season);
  const breaks = new Set(league.tier === 1 ? intlBreaks(season) : []);
  const sats: string[] = [];
  for (let d = nextWeekday(cal.start, 6); toTime(d) <= toTime(cal.end); d = addDays(d, 7)) {
    if (breaks.has(d)) continue;
    if (cal.winterBreak && toTime(d) >= toTime(cal.winterBreak[0]) && toTime(d) <= toTime(cal.winterBreak[1])) continue;
    sats.push(d);
  }
  let dates: string[];
  if (sats.length >= rounds) {
    // spread evenly, keep first
    dates = [];
    for (let i = 0; i < rounds; i++) dates.push(sats[Math.round((i * (sats.length - 1)) / Math.max(1, rounds - 1))]);
    dates = [...new Set(dates)];
    let k = 0;
    while (dates.length < rounds && k < sats.length) {
      if (!dates.includes(sats[k])) dates.push(sats[k]);
      k++;
    }
  } else {
    // need midweek rounds: add Tuesdays after evenly spaced Saturdays
    const need = rounds - sats.length;
    const mids: string[] = [];
    // festive fixtures first
    const festive = [`${season}-12-26`, `${season}-12-30`, `${season + 1}-01-01`];
    for (const f of festive) {
      if (mids.length >= need) break;
      if (!sats.includes(f)) mids.push(f);
    }
    const step = (sats.length - 2) / Math.max(1, need - mids.length + 1);
    for (let i = 1; mids.length < need; i++) {
      const base = sats[Math.min(sats.length - 2, Math.max(1, Math.round(i * step)))];
      let tue = addDays(base, 3);
      while (mids.includes(tue) || sats.includes(tue)) tue = addDays(tue, 7);
      mids.push(tue);
      if (i > 200) break;
    }
    dates = [...sats, ...mids];
  }
  dates.sort((a, b) => toTime(a) - toTime(b));
  return dates.slice(0, rounds);
}

export function generateLeagueFixtures(w: World, league: League, rng: Rng): Fixture[] {
  const rounds = roundRobin(league.clubIds, rng);
  const dates = matchDates(league, w.season, rounds.length);
  const out: Fixture[] = [];
  rounds.forEach((round, r) => {
    for (const [home, away] of round) {
      out.push({
        id: w.nextId.fixture++,
        date: dates[r],
        comp: league.id,
        compType: 'league',
        round: r + 1,
        home,
        away,
        played: false,
        hg: 0,
        ag: 0,
        goals: [],
      });
    }
  });
  return out;
}

export function generateSeasonFixtures(w: World, rng: Rng) {
  w.fixtures = [];
  for (const lg of w.leagues) w.fixtures.push(...generateLeagueFixtures(w, lg, rng));
  w.fixtures.sort((a, b) => toTime(a.date) - toTime(b.date) || a.id - b.id);
}

export function lastLeagueDate(w: World): string {
  let last = w.fixtures[0]?.date ?? w.date;
  for (const f of w.fixtures) if (diffDays(f.date, last) > 0) last = f.date;
  return last;
}

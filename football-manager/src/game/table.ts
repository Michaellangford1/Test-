import type { Fixture, World } from './types';

export interface TableRow {
  clubId: number;
  p: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
  form: ('W' | 'D' | 'L')[];
}

export function leagueTable(w: World, leagueId: string): TableRow[] {
  const lg = w.leagues.find((l) => l.id === leagueId);
  if (!lg) return [];
  const rows = new Map<number, TableRow>();
  for (const id of lg.clubIds) rows.set(id, { clubId: id, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, form: [] });
  const played = w.fixtures.filter((f) => f.comp === leagueId && f.compType === 'league' && f.played);
  for (const f of played) {
    const h = rows.get(f.home);
    const a = rows.get(f.away);
    if (!h || !a) continue;
    h.p++;
    a.p++;
    h.gf += f.hg;
    h.ga += f.ag;
    a.gf += f.ag;
    a.ga += f.hg;
    if (f.hg > f.ag) {
      h.w++;
      a.l++;
      h.pts += 3;
      h.form.push('W');
      a.form.push('L');
    } else if (f.hg < f.ag) {
      a.w++;
      h.l++;
      a.pts += 3;
      h.form.push('L');
      a.form.push('W');
    } else {
      h.d++;
      a.d++;
      h.pts++;
      a.pts++;
      h.form.push('D');
      a.form.push('D');
    }
  }
  const out = [...rows.values()];
  for (const r of out) {
    r.gd = r.gf - r.ga;
    r.form = r.form.slice(-5);
  }
  out.sort((x, y) => y.pts - x.pts || y.gd - x.gd || y.gf - x.gf || w.clubs[x.clubId].name.localeCompare(w.clubs[y.clubId].name));
  return out;
}

export function clubFixtures(w: World, clubId: number): Fixture[] {
  return w.fixtures.filter((f) => f.home === clubId || f.away === clubId);
}

export function resultFor(f: Fixture, clubId: number): 'W' | 'D' | 'L' | null {
  if (!f.played) return null;
  const my = f.home === clubId ? f.hg : f.ag;
  const their = f.home === clubId ? f.ag : f.hg;
  if (my === their) {
    if (f.pens) {
      const mp = f.home === clubId ? f.pens[0] : f.pens[1];
      const tp = f.home === clubId ? f.pens[1] : f.pens[0];
      return mp > tp ? 'W' : 'L';
    }
    return 'D';
  }
  return my > their ? 'W' : 'L';
}

export function leaguePosition(w: World, clubId: number): number {
  const club = w.clubs[clubId];
  const t = leagueTable(w, club.leagueId);
  return t.findIndex((r) => r.clubId === clubId) + 1;
}

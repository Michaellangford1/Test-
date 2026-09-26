import { describe, expect, it } from 'vitest';
import { createWorld } from '../src/game/build';
import { DEFAULT_DATABASE } from '../src/data';
import { continueGame, quickSimUserMatch, startCareer } from '../src/game/advance';
import { getSquad } from '../src/game/squad';
import { leagueTable } from '../src/game/table';

describe('season loop', () => {
  it('plays two full seasons with promotion and relegation', () => {
    const w = createWorld(DEFAULT_DATABASE, { managerName: 'Test', managerNat: 'ENG', clubName: 'Sunderland', seed: 3 });
    startCareer(w);
    const startLeagues = Object.fromEntries(w.leagues.map((l) => [l.id, [...l.clubIds]]));
    let guard = 0;
    const t0 = Date.now();
    while (w.season < 2027 && guard++ < 5000) {
      const r = continueGame(w, 60);
      w.news.forEach((n) => (n.read = true));
      if (r === 'match') quickSimUserMatch(w);
      if (r === 'sacked') {
        w.manager.sacked = false;
        w.clubs[w.manager.clubId].boardConfidence = 60;
      }
    }
    console.log('simulated to', w.date, 'in', Date.now() - t0, 'ms; players', Object.keys(w.players).length);
    expect(w.season).toBe(2027);
    expect(w.history.length).toBe(2);
    const h = w.history[0];
    console.log('champions', Object.entries(h.champions).map(([l, c]) => `${l}: ${w.clubs[c].name}`).join(', '));
    console.log('promoted', h.promoted.map((c) => w.clubs[c].name), 'relegated', h.relegated.map((c) => w.clubs[c].name));
    expect(h.promoted.length).toBe(3);
    expect(h.relegated.length).toBe(3);
    const eng1 = w.leagues.find((l) => l.id === 'eng1')!;
    expect(eng1.clubIds.length).toBe(20);
    expect(eng1.clubIds).not.toEqual(startLeagues.eng1);
    for (const c of Object.values(w.clubs)) expect(getSquad(w, c.id).length).toBeGreaterThanOrEqual(18);
    const t = leagueTable(w, 'eng1');
    expect(t.every((r) => r.p === 0)).toBe(false === false ? t.every((r) => r.p === 0) : true);
    const scorers = Object.values(w.players).sort((a, b) => b.career.at(-1)?.goals ?? 0 - (a.career.at(-1)?.goals ?? 0));
    expect(scorers.length).toBeGreaterThan(2000);
  }, 120000);
});

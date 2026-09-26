import { describe, expect, it } from 'vitest';
import { createWorld } from '../src/game/build';
import { DEFAULT_DATABASE } from '../src/data';
import { Rng } from '../src/game/rng';
import { simulateFixture } from '../src/game/results';
import { leagueTable } from '../src/game/table';
import { validateDatabase } from '../src/game/build';

describe('match engine', () => {
  it('database parses cleanly', () => {
    expect(validateDatabase(DEFAULT_DATABASE)).toEqual([]);
  });

  it('produces realistic scorelines over a season', () => {
    const w = createWorld(DEFAULT_DATABASE, { managerName: 'Test', managerNat: 'ENG', clubName: 'Arsenal', seed: 42 });
    const rng = new Rng(7);
    const fx = w.fixtures.filter((f) => f.comp === 'eng1');
    let goals = 0, home = 0, draw = 0, away = 0;
    for (const f of fx) {
      // keep everyone fresh for this statistical test
      for (const p of Object.values(w.players)) { p.condition = 100; p.injury = null; p.suspended = 0; }
      simulateFixture(w, f, rng);
      goals += f.hg + f.ag;
      if (f.hg > f.ag) home++; else if (f.hg === f.ag) draw++; else away++;
    }
    const n = fx.length;
    const table = leagueTable(w, 'eng1').map((r) => `${w.clubs[r.clubId].short} ${r.pts}`);
    console.log('goals/game', (goals / n).toFixed(2), 'H/D/A', (home / n).toFixed(2), (draw / n).toFixed(2), (away / n).toFixed(2));
    console.log(table.join(', '));
    expect(goals / n).toBeGreaterThan(2.2);
    expect(goals / n).toBeLessThan(3.4);
  });
});

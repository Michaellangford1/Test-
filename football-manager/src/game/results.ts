import type { Fixture, Player, World } from './types';
import type { Rng } from './rng';
import { MatchEngine } from './match/engine';
import { addNews } from './news';
import { getSquad } from './squad';
import { A, getAttrs } from './attributes';

const INJURIES: [string, number, number, number][] = [
  // name, minDays, maxDays, weight
  ['Bruised Ankle', 2, 7, 18],
  ['Dead Leg', 2, 6, 14],
  ['Tight Hamstring', 4, 10, 12],
  ['Calf Strain', 7, 21, 10],
  ['Twisted Knee', 7, 20, 8],
  ['Hamstring Strain', 14, 35, 10],
  ['Groin Strain', 10, 28, 7],
  ['Sprained Ankle', 10, 30, 7],
  ['Concussion', 7, 14, 3],
  ['Thigh Strain', 14, 30, 5],
  ['Broken Foot', 45, 90, 2],
  ['Knee Ligament Damage', 60, 150, 2],
  ['Torn Cruciate Ligament', 180, 280, 1],
  ['Broken Leg', 120, 200, 1],
];

export function randomInjury(rng: Rng): { name: string; days: number } {
  const [name, lo, hi] = rng.weighted(INJURIES, (x) => x[3]);
  return { name, days: rng.int(lo, hi) };
}

export function newEngine(w: World, fx: Fixture, rng: Rng, commentary: boolean): MatchEngine {
  return new MatchEngine(w, fx, rng, {
    commentary,
    userClubId: w.manager.clubId,
    knockout: fx.compType === 'playoff',
    neutral: fx.neutral,
  });
}

export function applyMatch(w: World, fx: Fixture, eng: MatchEngine, rng: Rng) {
  const [h, a] = eng.sides;
  fx.played = true;
  fx.hg = h.goals;
  fx.ag = a.goals;
  if (eng.pens) fx.pens = eng.pens;
  if (eng.aet) fx.aet = true;
  const home = w.clubs[fx.home];
  const att = Math.round(Math.min(home.capacity, home.capacity * (0.72 + home.reputation / 400 + rng.next() * 0.08)));
  fx.attendance = att;

  // serve existing suspensions for both clubs
  for (const cid of [fx.home, fx.away]) {
    for (const p of getSquad(w, cid)) {
      if (p.suspended > 0 && !eng.sides[cid === fx.home ? 0 : 1].appeared.includes(p.id)) p.suspended--;
    }
  }

  const motm = eng.motm();
  const isLeague = fx.compType === 'league';

  for (const i of [0, 1] as const) {
    const s = eng.sides[i];
    const other = eng.sides[i === 0 ? 1 : 0];
    const won = s.goals > other.goals || (eng.pens != null && eng.pens[i] > eng.pens[i === 0 ? 1 : 0]);
    const lost = s.goals < other.goals || (eng.pens != null && eng.pens[i] < eng.pens[i === 0 ? 1 : 0]);
    const appeared = new Set(s.appeared);

    for (const id of s.appeared) {
      const p = w.players[id];
      if (!p) continue;
      const started = (s.entered[id] ?? 0) === 0;
      const mins = Math.max(0, (s.left[id] ?? eng.minute) - (s.entered[id] ?? 0));
      if (isLeague) {
        if (started) p.stats.apps++;
        else p.stats.subApps++;
        p.stats.goals += s.goalsBy[id] ?? 0;
        p.stats.assists += s.assistsBy[id] ?? 0;
        const r = s.ratings[id] ?? 6.6;
        p.stats.ratingSum += r;
        p.stats.rated++;
        if (motm && motm.id === id) p.stats.motm++;
        if (other.goals === 0 && mins >= 60 && ['GK', 'DC', 'DR', 'DL', 'WBR', 'WBL'].includes(p.positions[0])) p.stats.cleanSheets++;
        const y = s.yellows[id] ?? 0;
        if (y) {
          p.stats.yellows += Math.min(1, y);
          if (!s.reds.includes(id) && (p.stats.yellows === 5 || p.stats.yellows === 10)) {
            p.suspended += p.stats.yellows === 5 ? 1 : 2;
            if (s.isUser) addNews(w, { kind: 'info', title: `${p.name} suspended`, body: `${p.name} has picked up ${p.stats.yellows} yellow cards and will serve a ${p.stats.yellows === 5 ? 'one' : 'two'}-match ban.`, playerId: p.id });
          }
        }
      }
      p.form.push(s.ratings[id] ?? 6.6);
      if (p.form.length > 5) p.form.shift();
      if (s.reds.includes(id)) {
        if (isLeague) p.stats.reds++;
        const straight = (s.yellows[id] ?? 0) < 2;
        p.suspended += straight ? 3 : 1;
        if (s.isUser) addNews(w, { kind: 'info', title: `${p.name} suspended`, body: `${p.name} will miss the next ${straight ? 'three matches' : 'match'} after his red card.`, playerId: p.id });
      }
      // condition and sharpness
      const endCond = s.cond[id] ?? p.condition;
      p.condition = Math.max(20, Math.round(endCond - 6 - rng.next() * 4));
      p.sharpness = Math.min(100, p.sharpness + (mins / 90) * 14);
      // morale
      p.morale = clampMorale(p.morale + (won ? 1.2 : lost ? -1.2 : 0.2) + ((s.ratings[id] ?? 6.6) - 6.8) * 0.5);
    }

    // injuries
    for (const id of s.injured) {
      const p = w.players[id];
      if (!p) continue;
      const inj = randomInjury(rng);
      p.injury = inj;
      if (s.isUser) addNews(w, { kind: 'injury', title: `${p.name} injured`, body: `${p.name} picked up a ${inj.name.toLowerCase()} and is expected to be out for ${describeDays(inj.days)}.`, playerId: p.id });
    }

    // morale of squad members who did not play
    for (const p of getSquad(w, s.clubId)) {
      if (appeared.has(p.id)) continue;
      p.morale = clampMorale(p.morale + (won ? 0.3 : lost ? -0.3 : 0) - (p.ability > 75 && isAvailableNow(p) ? 0.15 : 0));
    }

    // club finances: gate receipts for the home side
    if (i === 0 && !fx.neutral) {
      const ticket = 12 + home.reputation * 0.55;
      const gate = Math.round(att * ticket);
      home.finances.balance += gate;
      home.finances.seasonIncome.gate += gate;
    }

    // manager record and board confidence
    if (s.clubId === w.manager.clubId) {
      if (won) w.manager.wins++;
      else if (lost) w.manager.losses++;
      else w.manager.draws++;
      const club = w.clubs[s.clubId];
      const oppClub = w.clubs[other.clubId];
      const expectation = (club.reputation - oppClub.reputation) / 20 + (i === 0 ? 0.2 : -0.2); // >0 expected to win
      const outcome = won ? 1 : lost ? -1 : 0;
      club.boardConfidence = Math.max(0, Math.min(100, club.boardConfidence + (outcome - Math.tanh(expectation) * 0.6) * 2.2));
    }
  }
}

function isAvailableNow(p: Player) {
  return !p.injury && p.suspended <= 0;
}

export function clampMorale(m: number): number {
  return Math.max(1, Math.min(20, m));
}

export function describeDays(d: number): string {
  if (d <= 6) return `${d} day${d === 1 ? '' : 's'}`;
  const weeks = Math.round(d / 7);
  if (weeks < 9) return `${weeks} week${weeks === 1 ? '' : 's'}`;
  return `${Math.round(d / 30)} months`;
}

/** Simulate a fixture in the background and apply the result */
export function simulateFixture(w: World, fx: Fixture, rng: Rng) {
  const eng = newEngine(w, fx, rng, false);
  eng.simulateToEnd();
  applyMatch(w, fx, eng, rng);
  return eng;
}

export function naturalFitness(p: Player): number {
  return getAttrs(p)[A('Natural Fitness')];
}

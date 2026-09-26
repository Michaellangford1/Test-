import type { Club, Fixture, League, Player, SeasonRecord, World } from './types';
import type { Rng } from './rng';
import { leagueTable } from './table';
import { addNews } from './news';
import { fmtMoney } from './valuation';
import { prizeMoney, setBudgets } from './finance';
import { generateSeasonFixtures } from './fixtures';
import { emptyStats, generatePlayer, assignSquadNumbers } from './build';
import { autoPick, bestFormation, getFreeAgents, getSquad, invalidateSquads, movePlayer, pickCaptain } from './squad';
import { seasonLabel, addDays, toTime } from './dates';
import { aiSignFreeAgents } from './transfers';

// ---------------------------------------------------------------------------
// Board expectations
// ---------------------------------------------------------------------------

export function setBoardTarget(w: World) {
  const club = w.clubs[w.manager.clubId];
  const lg = w.leagues.find((l) => l.id === club.leagueId)!;
  const ranked = [...lg.clubIds].sort((a, b) => w.clubs[b].reputation - w.clubs[a].reputation);
  const rank = ranked.indexOf(club.id) + 1;
  const n = lg.clubIds.length;
  let pos: number;
  let text: string;
  if (lg.tier === 1) {
    if (rank <= 2) [pos, text] = [1, 'Win the league title'];
    else if (rank <= 4) [pos, text] = [4, 'Qualify for the Champions League'];
    else if (rank <= 7) [pos, text] = [lg.europe + 1, 'Qualify for Europe'];
    else if (rank <= Math.ceil(n / 2)) [pos, text] = [Math.ceil(n / 2), 'Finish in the top half'];
    else if (rank <= n - 5) [pos, text] = [n - 4, 'A comfortable mid-table finish'];
    else [pos, text] = [n - (lg.relegated ?? 3), 'Avoid relegation'];
  } else {
    if (rank <= 3) [pos, text] = [2, 'Win automatic promotion'];
    else if (rank <= 8) [pos, text] = [6, 'Reach the play-offs'];
    else if (rank <= 16) [pos, text] = [12, 'A mid-table finish'];
    else [pos, text] = [n - 3, 'Avoid a relegation battle'];
  }
  w.manager.target = { pos, text };
}

export function boardMoodText(conf: number): string {
  if (conf >= 85) return 'Delighted';
  if (conf >= 70) return 'Very pleased';
  if (conf >= 55) return 'Pleased';
  if (conf >= 40) return 'Satisfied';
  if (conf >= 25) return 'Concerned';
  if (conf >= 12) return 'Very concerned';
  return 'Losing patience';
}

/** Called after every user match and at season end: sack the manager? */
export function checkSacking(w: World, rng: Rng): boolean {
  const club = w.clubs[w.manager.clubId];
  if (w.manager.sacked) return true;
  const m = +w.date.slice(5, 7);
  const early = m >= 7 && m <= 10;
  if (club.boardConfidence < 8 && !early) {
    sackManager(w, rng);
    return true;
  }
  return false;
}

export function sackManager(w: World, rng: Rng) {
  const club = w.clubs[w.manager.clubId];
  w.manager.sacked = true;
  // job offers from clubs of lower standing
  const pool = Object.values(w.clubs).filter((c) => c.id !== club.id && c.reputation <= club.reputation - 5 && c.reputation >= club.reputation - 30);
  rng.shuffle(pool);
  w.manager.jobOffers = pool.slice(0, 3).map((c) => c.id);
  addNews(w, {
    kind: 'board',
    title: 'You have been sacked',
    body: `The ${club.name} board have lost faith in your ability to take the club forward and have terminated your contract with immediate effect.`,
  });
}

export function takeJob(w: World, clubId: number) {
  w.manager.clubId = clubId;
  w.manager.sacked = false;
  w.manager.jobOffers = undefined;
  const club = w.clubs[clubId];
  club.boardConfidence = 65;
  setBoardTarget(w);
  addNews(w, { kind: 'board', title: `Welcome to ${club.name}`, body: `You have been appointed manager of ${club.name}. The board expect you to: ${w.manager.target!.text.toLowerCase()}.` });
}

// ---------------------------------------------------------------------------
// Youth intake (mid-March)
// ---------------------------------------------------------------------------

export function youthIntake(w: World, rng: Rng) {
  for (const club of Object.values(w.clubs)) {
    const lg = w.leagues.find((l) => l.id === club.leagueId)!;
    const n = rng.int(2, 4);
    const names: string[] = [];
    for (let i = 0; i < n; i++) {
      const gem = rng.chance(0.03 + club.youthRating * 0.002);
      const ability = 36 + club.youthRating * 1.1 + rng.int(-6, 6) + (gem ? 8 : 0);
      const potential = Math.min(95, ability + rng.int(8, 28) + (gem ? rng.int(10, 20) : 0));
      const p = generatePlayer(w, rng, { clubId: club.id, country: lg.country, ability, potential, age: rng.int(15, 17), clubRep: club.reputation });
      p.youth = true;
      p.wage = Math.max(500, Math.round(p.wage * 0.2 / 100) * 100);
      p.contractEnd = w.season + 3;
      p.joined = w.date;
      w.players[p.id] = p;
      names.push(`${p.name} (${p.positions[0]}, ${p.age})${p.potential >= 80 ? ' - highly rated' : ''}`);
    }
    invalidateSquads(w);
    assignSquadNumbers(getSquad(w, club.id));
    if (club.id === w.manager.clubId) {
      addNews(w, {
        kind: 'youth',
        title: 'Youth intake',
        body: `This year's crop of youngsters has arrived from the academy:\n\n${names.join('\n')}`,
      });
    }
  }
}

// ---------------------------------------------------------------------------
// Play-offs
// ---------------------------------------------------------------------------

export function schedulePlayoffSemis(w: World, lg: League) {
  const t = leagueTable(w, lg.id);
  const auto = lg.promotedAuto ?? 2;
  const [c3, c4, c5, c6] = [t[auto], t[auto + 1], t[auto + 2], t[auto + 3]].map((r) => r.clubId);
  const date = addDays(w.date, 7);
  const mk = (home: number, away: number, round: number, label: string): Fixture => ({
    id: w.nextId.fixture++,
    date,
    comp: `${lg.id}-po`,
    compType: 'playoff',
    round,
    home,
    away,
    played: false,
    hg: 0,
    ag: 0,
    goals: [],
    label,
  });
  w.fixtures.push(mk(c3, c6, 1, 'Play-off Semi-final'), mk(c4, c5, 1, 'Play-off Semi-final'));
  const names = (id: number) => w.clubs[id].name;
  addNews(w, {
    kind: 'season',
    title: `${lg.name} play-offs`,
    body: `The ${lg.name} play-off semi-finals will be played on ${date}: ${names(c3)} v ${names(c6)} and ${names(c4)} v ${names(c5)}. The final will be played at Wembley.`,
    read: ![c3, c4, c5, c6].includes(w.manager.clubId),
  });
}

function winnerOf(f: Fixture): number {
  if (f.hg !== f.ag) return f.hg > f.ag ? f.home : f.away;
  if (f.pens) return f.pens[0] > f.pens[1] ? f.home : f.away;
  return f.home;
}

export function schedulePlayoffFinal(w: World, lg: League) {
  const semis = w.fixtures.filter((f) => f.comp === `${lg.id}-po` && f.round === 1);
  if (semis.length !== 2 || semis.some((s) => !s.played)) return;
  const [a, b] = semis.map(winnerOf);
  w.fixtures.push({
    id: w.nextId.fixture++,
    date: addDays(w.date, 14),
    comp: `${lg.id}-po`,
    compType: 'playoff',
    round: 2,
    home: a,
    away: b,
    played: false,
    hg: 0,
    ag: 0,
    goals: [],
    neutral: true,
    label: 'Play-off Final',
  });
}

export function playoffWinner(w: World, lg: League): number | null {
  const fin = w.fixtures.find((f) => f.comp === `${lg.id}-po` && f.round === 2 && f.played);
  return fin ? winnerOf(fin) : null;
}

// ---------------------------------------------------------------------------
// Season end (early June)
// ---------------------------------------------------------------------------

export function seasonEnd(w: World, rng: Rng) {
  const record: SeasonRecord = {
    season: w.season,
    champions: {},
    userLeague: w.clubs[w.manager.clubId].leagueId,
    userPos: 0,
    userClub: w.manager.clubId,
    promoted: [],
    relegated: [],
    topScorers: {},
  };
  const moves: { clubId: number; to: string }[] = [];

  for (const lg of w.leagues) {
    const t = leagueTable(w, lg.id);
    if (!t.length) continue;
    record.champions[lg.id] = t[0].clubId;
    // prize money
    t.forEach((r, i) => {
      const c = w.clubs[r.clubId];
      const prize = prizeMoney(lg, i + 1);
      c.finances.balance += prize;
      c.finances.seasonIncome.prize += prize;
      // reputation drifts with performance
      const expected = [...lg.clubIds].sort((a, b) => w.clubs[b].reputation - w.clubs[a].reputation).indexOf(r.clubId);
      c.reputation = Math.max(30, Math.min(99, c.reputation + (expected - i) * 0.25));
    });
    // top scorer
    const scorers = Object.values(w.players)
      .filter((p) => p.clubId != null && w.clubs[p.clubId]?.leagueId === lg.id)
      .sort((a, b) => b.stats.goals - a.stats.goals);
    if (scorers[0]) record.topScorers[lg.id] = { playerId: scorers[0].id, name: scorers[0].name, goals: scorers[0].stats.goals };

    const userRow = t.findIndex((r) => r.clubId === w.manager.clubId);
    if (userRow >= 0) record.userPos = userRow + 1;

    if (lg.relegateTo && lg.relegated) {
      for (const r of t.slice(-lg.relegated)) {
        moves.push({ clubId: r.clubId, to: lg.relegateTo });
        record.relegated.push(r.clubId);
      }
    }
    if (lg.promoteTo) {
      const auto = lg.promotedAuto ?? 2;
      for (const r of t.slice(0, auto)) {
        moves.push({ clubId: r.clubId, to: lg.promoteTo });
        record.promoted.push(r.clubId);
      }
      if (lg.playoffs) {
        const pw = playoffWinner(w, lg) ?? t[auto].clubId;
        moves.push({ clubId: pw, to: lg.promoteTo });
        record.promoted.push(pw);
      }
    }

    const champ = w.clubs[t[0].clubId];
    addNews(w, {
      kind: 'season',
      title: `${champ.name} are ${lg.name} champions`,
      body: `${champ.name} have won the ${seasonLabel(w.season)} ${lg.name} with ${t[0].pts} points.${scorers[0] ? ` ${scorers[0].name} finished as top scorer with ${scorers[0].stats.goals} goals.` : ''}`,
      read: lg.id !== record.userLeague,
    });
    if (t[0].clubId === w.manager.clubId) w.manager.trophies.push(`${lg.name} ${seasonLabel(w.season)}`);
  }

  const pwEng = w.leagues.find((l) => l.playoffs);
  if (pwEng) {
    const pw = playoffWinner(w, pwEng);
    if (pw === w.manager.clubId) w.manager.trophies.push(`${pwEng.name} Play-off winners ${seasonLabel(w.season)}`);
  }

  // user evaluation
  const club = w.clubs[w.manager.clubId];
  const target = w.manager.target;
  const promotedUser = record.promoted.includes(club.id);
  const relegatedUser = record.relegated.includes(club.id);
  if (target && record.userPos) {
    const diff = target.pos - record.userPos;
    club.boardConfidence = Math.max(0, Math.min(100, club.boardConfidence + diff * 5 + (promotedUser ? 20 : 0) - (relegatedUser ? 30 : 0)));
    const verdict =
      diff >= 3 || promotedUser
        ? 'The board are delighted with your work this season.'
        : diff >= 0
          ? 'The board are satisfied that you met their expectations.'
          : diff >= -3
            ? 'The board are disappointed that you fell short of their expectations.'
            : 'The board are extremely unhappy with this season.';
    addNews(w, {
      kind: 'board',
      title: 'End of season review',
      body: `${club.name} finished ${ordinal(record.userPos)} in the ${w.leagues.find((l) => l.id === club.leagueId)!.name}. The target was: ${target.text.toLowerCase()}.\n\n${verdict}${promotedUser ? '\n\nCongratulations on promotion!' : ''}${relegatedUser ? '\n\nThe club has been relegated.' : ''}`,
    });
  }

  // career history
  for (const p of Object.values(w.players)) {
    const played = p.stats.apps + p.stats.subApps;
    if (!played && p.clubId == null) continue;
    p.career.push({
      season: w.season,
      clubId: p.clubId,
      clubName: p.clubId != null ? w.clubs[p.clubId].name : 'Free agent',
      apps: played,
      goals: p.stats.goals,
      avg: p.stats.rated ? Math.round((p.stats.ratingSum / p.stats.rated) * 100) / 100 : 0,
    });
    if (p.career.length > 20) p.career.shift();
  }

  // promotion / relegation
  for (const m of moves) {
    const c = w.clubs[m.clubId];
    const from = w.leagues.find((l) => l.id === c.leagueId)!;
    const to = w.leagues.find((l) => l.id === m.to)!;
    from.clubIds = from.clubIds.filter((id) => id !== c.id);
    to.clubIds.push(c.id);
    c.leagueId = to.id;
    // reputation adjusts to new division
    c.reputation = to.tier < from.tier ? Math.max(c.reputation, 66) : Math.min(c.reputation, 70);
  }

  // retirement decisions
  for (const p of Object.values(w.players)) {
    const retire = (p.age >= 38) || (p.age >= 35 && rng.chance(0.45)) || (p.age >= 33 && p.ability < 62 && rng.chance(0.5)) || (p.age >= 31 && p.clubId == null && rng.chance(0.4));
    if (retire) p.retiring = true;
  }

  w.history.push(record);
  if (!promotedUser && club.boardConfidence < 15) sackManager(w, rng);
  w.seasonOver = true;
}

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// ---------------------------------------------------------------------------
// New season (1 July)
// ---------------------------------------------------------------------------

export function newSeason(w: World, rng: Rng) {
  const yearEnding = w.season + 1;
  const user = w.manager.clubId;
  const retiredUser: string[] = [];
  const expiredUser: string[] = [];

  for (const p of Object.values(w.players)) {
    if (p.retiring) {
      if (p.clubId === user) retiredUser.push(p.name);
      delete w.players[p.id];
      continue;
    }
    if (p.clubId != null && p.contractEnd <= yearEnding) {
      if (p.clubId === user) expiredUser.push(p.name);
      const c = w.clubs[p.clubId];
      c.tactics.lineup = c.tactics.lineup.map((id) => (id === p.id ? null : id));
      c.tactics.subs = c.tactics.subs.filter((id) => id !== p.id);
      movePlayer(w, p, null);
      p.contractEnd = yearEnding;
    }
    p.age++;
    p.stats = emptyStats();
    p.form = [];
    p.suspended = 0;
    p.condition = 100;
    p.sharpness = 55;
    p.morale = (p.morale + 13) / 2;
    // potential is re-assessed as youngsters develop
    if (p.age <= 23) p.potential = Math.max(p.ability, Math.min(97, p.potential + rng.int(-3, 3)));
  }
  invalidateSquads(w);
  // AI clubs trim bloated squads, releasing their weakest players
  for (const club of Object.values(w.clubs)) {
    if (club.id === user) continue;
    const squad = getSquad(w, club.id).sort((a, b) => b.ability - a.ability);
    for (const p of squad.slice(30)) movePlayer(w, p, null);
  }
  // prune free agents nobody will sign to keep the database lean
  for (const p of getFreeAgents(w)) if (p.age >= 32 || p.ability < 52) delete w.players[p.id];
  invalidateSquads(w);

  w.season++;
  w.seasonOver = false;
  w.fixtures = [];
  w.offers = [];
  w.manager.seasons++;

  // squads: make sure every AI club can field a team
  aiSignFreeAgents(w, rng);
  for (const club of Object.values(w.clubs)) topUpSquad(w, club, rng);

  setBudgets(w);
  for (const club of Object.values(w.clubs)) {
    if (club.id !== user) {
      club.tactics.formation = bestFormation(w, club);
      const pick = autoPick(w, club);
      club.tactics.lineup = pick.lineup;
      club.tactics.subs = pick.subs;
      club.tactics.captain = pickCaptain(w, pick.lineup);
    }
  }
  generateSeasonFixtures(w, rng);
  setBoardTarget(w);
  const club = w.clubs[user];
  club.boardConfidence = Math.max(40, Math.min(90, club.boardConfidence * 0.6 + 30));

  let body = `Welcome to the ${seasonLabel(w.season)} season. The board expect you to: ${w.manager.target!.text.toLowerCase()}.\n\nTransfer budget: ${fmtMoney(club.finances.transferBudget)}\nWage budget: ${fmtMoney(club.finances.wageBudget)} p/w`;
  if (retiredUser.length) body += `\n\nRetired: ${retiredUser.join(', ')}`;
  if (expiredUser.length) body += `\n\nLeft on expiring contracts: ${expiredUser.join(', ')}`;
  addNews(w, { kind: 'season', title: `Season ${seasonLabel(w.season)}`, body });
}

export function topUpSquad(w: World, club: Club, rng: Rng) {
  const squad = getSquad(w, club.id);
  const lg = w.leagues.find((l) => l.id === club.leagueId)!;
  const gks = squad.filter((p) => p.positions[0] === 'GK').length;
  const toAdd: Player[] = [];
  let count = squad.length;
  let needGk = Math.max(0, 2 - gks);
  while (count < 20 || needGk > 0) {
    const p = generatePlayer(w, rng, {
      clubId: club.id,
      country: lg.country,
      ability: club.reputation * 0.78 - rng.int(0, 8),
      age: rng.int(18, 28),
      positions: needGk > 0 ? ['GK'] : undefined,
      clubRep: club.reputation,
    });
    if (needGk > 0) needGk--;
    w.players[p.id] = p;
    toAdd.push(p);
    count++;
  }
  if (toAdd.length) {
    invalidateSquads(w);
    assignSquadNumbers(getSquad(w, club.id));
  }
}

export function lastRoundDate(w: World, leagueId: string): string | null {
  let last: string | null = null;
  for (const f of w.fixtures) if (f.comp === leagueId && (!last || toTime(f.date) > toTime(last))) last = f.date;
  return last;
}

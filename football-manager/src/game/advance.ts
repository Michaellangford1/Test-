// The daily game loop.

import type { Fixture, World } from './types';
import { Rng } from './rng';
import { addDays, diffDays, month, weekday, fmtDate, seasonLabel } from './dates';
import { dailyRecovery, monthlyValues, weeklyDevelopment } from './progression';
import { monthlyTv, weeklyFinances } from './finance';
import { aiBidsForUserPlayers, aiRenewals, aiSignFreeAgents, aiTransferDay, processOffersDaily } from './transfers';
import { autoPick, getSquad } from './squad';
import { applyMatch, simulateFixture } from './results';
import type { MatchEngine } from './match/engine';
import { checkSacking, lastRoundDate, newSeason, playoffWinner, schedulePlayoffFinal, schedulePlayoffSemis, seasonEnd, setBoardTarget, youthIntake } from './season';
import { addNews } from './news';
import { fmtMoney } from './valuation';

export function worldRng(w: World): Rng {
  return new Rng(w.rngState);
}

export function saveRng(w: World, rng: Rng) {
  w.rngState = rng.state;
}

export function userFixtureToday(w: World): Fixture | undefined {
  return w.fixtures.find((f) => f.date === w.date && !f.played && (f.home === w.manager.clubId || f.away === w.manager.clubId));
}

export function nextUserFixture(w: World): Fixture | undefined {
  return w.fixtures.find((f) => !f.played && (f.home === w.manager.clubId || f.away === w.manager.clubId) && diffDays(f.date, w.date) >= 0);
}

/** AI managers pick their team for today's match, rotating tired players */
function prepareAiClub(w: World, clubId: number) {
  const club = w.clubs[clubId];
  if (clubId === w.manager.clubId) return;
  const pick = autoPick(w, club);
  club.tactics.lineup = pick.lineup;
  club.tactics.subs = pick.subs;
}

/** Simulate today's matches that don't involve the user */
function playAiMatches(w: World, rng: Rng) {
  const today = w.fixtures.filter((f) => f.date === w.date && !f.played);
  for (const f of today) {
    if (f.home === w.manager.clubId || f.away === w.manager.clubId) continue;
    prepareAiClub(w, f.home);
    prepareAiClub(w, f.away);
    simulateFixture(w, f, rng);
  }
}

/** Advance the calendar by one day */
export function advanceDay(w: World): void {
  if (w.pendingMatch != null) return;
  const rng = worldRng(w);
  w.date = addDays(w.date, 1);
  const d = w.date;
  const md = d.slice(5);

  dailyRecovery(w, rng);
  processOffersDaily(w, rng);
  aiTransferDay(w, rng);
  aiBidsForUserPlayers(w, rng);

  if (weekday(d) === 1) {
    weeklyDevelopment(w, rng);
    weeklyFinances(w);
  }
  if (d.endsWith('-01')) {
    monthlyValues(w);
    const m = month(d);
    if (m >= 8 || m <= 5) monthlyTv(w);
  }
  if (md === '01-02') {
    aiRenewals(w, rng);
    contractWarnings(w);
  }
  if (md === '04-01') aiRenewals(w, rng);
  if (md === '03-15') youthIntake(w, rng);
  if (md === '09-02' || md === '02-03') {
    aiSignFreeAgents(w, rng);
    addNews(w, { kind: 'transfer', title: 'Transfer window closed', body: 'The transfer window has now closed. Free agents can still be signed.', read: true });
  }
  if (md === '07-01' && w.seasonOver) newSeason(w, rng);
  if (md === '01-01') addNews(w, { kind: 'transfer', title: 'Transfer window open', body: 'The January transfer window is now open until 2 February.' });

  // play-offs are scheduled once the regular season finishes
  for (const lg of w.leagues) {
    if (!lg.playoffs) continue;
    const last = lastRoundDate(w, lg.id);
    const hasSemis = w.fixtures.some((f) => f.comp === `${lg.id}-po`);
    if (last && diffDays(d, last) === 1 && !hasSemis) schedulePlayoffSemis(w, lg);
    const semis = w.fixtures.filter((f) => f.comp === `${lg.id}-po` && f.round === 1);
    const hasFinal = w.fixtures.some((f) => f.comp === `${lg.id}-po` && f.round === 2);
    if (semis.length === 2 && semis.every((s) => s.played) && !hasFinal && diffDays(d, semis[0].date) >= 1) schedulePlayoffFinal(w, lg);
    const fin = w.fixtures.find((f) => f.comp === `${lg.id}-po` && f.round === 2);
    if (fin && fin.played && diffDays(d, fin.date) === 1) {
      const win = playoffWinner(w, lg);
      if (win != null) addNews(w, { kind: 'season', title: 'Play-off final', body: `${w.clubs[win].name} have won the ${lg.name} play-off final and are promoted!`, read: win !== w.manager.clubId });
    }
  }

  // season end: once every fixture has been played, on or after 1 June
  if (!w.seasonOver && month(d) === 6 && w.fixtures.every((f) => f.played)) {
    seasonEnd(w, rng);
  }

  playAiMatches(w, rng);
  const mine = userFixtureToday(w);
  if (mine) {
    w.pendingMatch = mine.id;
  }
  saveRng(w, rng);
}

function contractWarnings(w: World) {
  const expiring = getSquad(w, w.manager.clubId).filter((p) => p.contractEnd <= w.season + 1);
  if (!expiring.length) return;
  addNews(w, {
    kind: 'contract',
    title: 'Expiring contracts',
    body: `The following players' contracts expire in the summer. Offer them new deals or they will leave on a free:\n\n${expiring
      .sort((a, b) => b.ability - a.ability)
      .map((p) => `${p.name} (${p.positions[0]}, ${p.age})`)
      .join('\n')}`,
  });
}

export type StopReason = 'match' | 'news' | 'sacked' | 'limit';

/** Continue until something needs the manager's attention */
export function continueGame(w: World, maxDays = 30): StopReason {
  for (let i = 0; i < maxDays; i++) {
    const unreadBefore = w.news.filter((n) => !n.read).length;
    advanceDay(w);
    if (w.manager.sacked) return 'sacked';
    if (w.pendingMatch != null) return 'match';
    const unreadAfter = w.news.filter((n) => !n.read).length;
    if (unreadAfter > unreadBefore) return 'news';
  }
  return 'limit';
}

/** Apply the result of the user's match (live or quick-simulated) */
export function completeUserMatch(w: World, eng: MatchEngine) {
  const fx = w.fixtures.find((f) => f.id === w.pendingMatch);
  if (!fx) return;
  const rng = worldRng(w);
  applyMatch(w, fx, eng, rng);
  w.pendingMatch = null;
  checkSacking(w, rng);
  saveRng(w, rng);
}

export function quickSimUserMatch(w: World) {
  const fx = w.fixtures.find((f) => f.id === w.pendingMatch);
  if (!fx) return;
  const rng = worldRng(w);
  const eng = simulateFixture(w, fx, rng);
  w.pendingMatch = null;
  checkSacking(w, rng);
  saveRng(w, rng);
  return eng;
}

/** First-day setup once the user has chosen a club */
export function startCareer(w: World) {
  setBoardTarget(w);
  const club = w.clubs[w.manager.clubId];
  const lg = w.leagues.find((l) => l.id === club.leagueId)!;
  addNews(w, {
    kind: 'board',
    title: `Welcome to ${club.name}`,
    body: `The board of ${club.name} welcome you as the club's new manager for the ${seasonLabel(w.season)} ${lg.name} season.\n\nTheir expectation: ${w.manager.target!.text.toLowerCase()}.\n\nTransfer budget: ${fmtMoney(club.finances.transferBudget)}\nWage budget: ${fmtMoney(club.finances.wageBudget)} per week\n\nThe season kicks off in August. The transfer window is open until 1 September.`,
  });
  addNews(w, {
    kind: 'info',
    title: 'Getting started',
    body: `Today is ${fmtDate(w.date)}.\n\n- Squad: check your players, their condition and contracts.\n- Tactics: choose a formation and pick your starting XI (or let your assistant do it).\n- Transfers: search the database, shortlist targets and make offers.\n- Continue: advances the calendar until something needs your attention.`,
  });
}

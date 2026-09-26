import type { Club, League, World } from './types';
import { clubWageBill, roundMoney } from './valuation';
import { getSquad } from './squad';

export function weeklyCommercial(club: Club): number {
  return Math.round(Math.pow(club.reputation / 100, 4) * 4_000_000);
}

/** Mondays: wages out, commercial income in */
export function weeklyFinances(w: World) {
  for (const club of Object.values(w.clubs)) {
    let bill = 0;
    for (const p of getSquad(w, club.id)) bill += p.wage;
    const com = weeklyCommercial(club);
    club.finances.balance += com - bill;
    club.finances.seasonIncome.commercial += com;
    club.finances.seasonExpense.wages += bill;
    if (club.id !== w.manager.clubId && club.finances.balance < -20_000_000) club.finances.transferBudget = 0;
  }
}

/** 1st of each month Aug-May: TV money instalment */
export function monthlyTv(w: World) {
  for (const lg of w.leagues) {
    for (const id of lg.clubIds) {
      const c = w.clubs[id];
      const amt = Math.round(lg.tvMoney / 10);
      c.finances.balance += amt;
      c.finances.seasonIncome.tv += amt;
    }
  }
}

export function prizeMoney(league: League, pos: number): number {
  const n = league.clubIds.length;
  return roundMoney(league.tvMoney * 0.45 * ((n - pos + 1) / n));
}

/** Set budgets for a new season */
export function setBudgets(w: World) {
  for (const club of Object.values(w.clubs)) {
    const f = club.finances;
    const bill = clubWageBill(w, club);
    const lg = w.leagues.find((l) => l.id === club.leagueId)!;
    const income = lg.tvMoney + weeklyCommercial(club) * 52 + club.capacity * 19 * (12 + club.reputation * 0.55);
    f.transferBudget = roundMoney(Math.max(500_000, Math.max(0, f.balance) * 0.4 + income * 0.12));
    f.wageBudget = roundMoney(Math.max(bill * 1.05, (income * 0.62) / 52));
    f.seasonIncome = { gate: 0, tv: 0, commercial: 0, transfers: 0, prize: 0 };
    f.seasonExpense = { wages: 0, transfers: 0, other: 0 };
  }
}

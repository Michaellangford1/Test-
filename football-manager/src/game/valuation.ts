import type { Club, Player, World } from './types';

const AGE_FACTOR = (age: number): number => {
  if (age <= 19) return 1.25;
  if (age <= 22) return 1.3;
  if (age <= 25) return 1.15;
  if (age <= 27) return 1.0;
  if (age <= 29) return 0.8;
  if (age <= 30) return 0.62;
  if (age <= 31) return 0.48;
  if (age <= 32) return 0.36;
  if (age <= 33) return 0.26;
  if (age <= 34) return 0.18;
  return 0.1;
};

/** Round to a "football" figure */
export function roundMoney(v: number): number {
  if (v >= 10_000_000) return Math.round(v / 500_000) * 500_000;
  if (v >= 1_000_000) return Math.round(v / 100_000) * 100_000;
  if (v >= 100_000) return Math.round(v / 25_000) * 25_000;
  return Math.max(0, Math.round(v / 5_000) * 5_000);
}

export function playerValue(p: Player, season: number): number {
  const ab = p.ability;
  let v = 120_000_000 * Math.exp(0.125 * (ab - 90));
  v *= AGE_FACTOR(p.age);
  if (p.age <= 24) v *= 1 + Math.max(0, p.potential - ab) * 0.035;
  const yearsLeft = Math.max(0, p.contractEnd - season - 1);
  if (yearsLeft === 0) v *= 0.55;
  else if (yearsLeft === 1) v *= 0.8;
  if (p.injury && p.injury.days > 60) v *= 0.8;
  return roundMoney(Math.max(10_000, v));
}

/** Weekly wage a player expects, given the reputation of the club */
export function expectedWage(p: Player, clubRep = 70): number {
  let w = 280_000 * Math.exp(0.105 * (p.ability - 90));
  // bigger clubs pay more for the same player
  w *= 0.75 + clubRep / 200;
  if (p.age >= 32) w *= 0.8;
  if (p.age <= 20) w *= 0.6;
  return roundMoney(Math.max(1_000, w));
}

/** How much a club values a player above his market value */
export function askingPrice(w: World, p: Player): number {
  const club = p.clubId != null ? w.clubs[p.clubId] : null;
  if (!club) return 0;
  let f = 1.25;
  if (p.transferListed) f = 0.9;
  const squad = Object.values(w.players).filter((x) => x.clubId === club.id);
  const rank = squad.filter((x) => x.ability > p.ability).length;
  if (rank < 5) f += 0.35; // key player
  else if (rank < 11) f += 0.15;
  else if (rank > 18) f -= 0.2;
  const yearsLeft = p.contractEnd - w.season - 1;
  if (yearsLeft <= 0) f -= 0.25;
  const joinedDays = (Date.parse(w.date) - Date.parse(p.joined)) / 86400000;
  if (joinedDays < 180) f += 0.4; // just signed
  return roundMoney(p.value * Math.max(0.6, f));
}

export function fmtMoney(v: number): string {
  const neg = v < 0;
  const a = Math.abs(v);
  let s: string;
  if (a >= 1_000_000_000) s = `£${(a / 1_000_000_000).toFixed(2)}bn`;
  else if (a >= 1_000_000) s = `£${(a / 1_000_000).toFixed(a >= 100_000_000 ? 0 : 1).replace(/\.0$/, '')}m`;
  else if (a >= 1_000) s = `£${Math.round(a / 1_000)}K`;
  else s = `£${Math.round(a)}`;
  return neg ? `-${s}` : s;
}

export function clubWageBill(w: World, club: Club): number {
  let t = 0;
  for (const p of Object.values(w.players)) if (p.clubId === club.id) t += p.wage;
  return t;
}

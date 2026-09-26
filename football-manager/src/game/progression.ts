import type { Player, TrainingFocus, World } from './types';
import type { Rng } from './rng';
import { playerValue } from './valuation';
import { A, getAttrs } from './attributes';
import { randomInjury, describeDays } from './results';
import { addNews } from './news';

/** Expected change in ability per year from age alone (before potential gap) */
function ageCurve(age: number): number {
  if (age <= 18) return 0.3;
  if (age <= 21) return 0.26;
  if (age <= 23) return 0.19;
  if (age <= 25) return 0.12;
  if (age <= 27) return 0.06;
  return 0;
}

function declinePerYear(age: number): number {
  if (age <= 29) return 0;
  if (age === 30) return 0.4;
  if (age === 31) return 1;
  if (age === 32) return 1.6;
  if (age === 33) return 2.2;
  if (age === 34) return 2.8;
  return 3.5;
}

const TRAINING_GROWTH: Record<TrainingFocus, number> = {
  balanced: 1,
  attacking: 1,
  defending: 1,
  technical: 1.05,
  physical: 0.95,
  rest: 0.7,
};

/** Weekly development, run on Mondays */
export function weeklyDevelopment(w: World, rng: Rng) {
  for (const p of Object.values(w.players)) {
    const club = p.clubId != null ? w.clubs[p.clubId] : null;
    const training = club ? TRAINING_GROWTH[club.training] : 0.6;
    const facilities = club ? 0.85 + club.facilities / 66 : 0.7;
    const minutes = p.stats.apps + p.stats.subApps * 0.4;
    const playing = 0.6 + Math.min(0.6, minutes / 25);
    const gap = Math.max(0, p.potential - p.ability);
    const nf = getAttrs(p)[A('Natural Fitness')];
    let delta = (ageCurve(p.age) * gap * training * facilities * playing) / 44;
    delta -= (declinePerYear(p.age) * (1.15 - nf / 40)) / 44;
    delta += rng.gauss() * 0.06;
    if (p.injury && p.injury.days > 30) delta -= 0.02;
    p.ability = Math.max(20, Math.min(99, p.ability + delta));
    if (p.ability > p.potential) p.potential = Math.min(99, p.ability);
  }
}

/** Monthly: refresh valuations */
export function monthlyValues(w: World) {
  for (const p of Object.values(w.players)) p.value = playerValue(p, w.season);
}

/** Daily recovery of condition, injury healing, match sharpness decay */
export function dailyRecovery(w: World, rng: Rng) {
  const userId = w.manager.clubId;
  for (const p of Object.values(w.players)) {
    if (p.injury) {
      p.injury.days--;
      if (p.injury.days <= 0) {
        if (p.clubId === userId) addNews(w, { kind: 'injury', title: `${p.name} fit again`, body: `${p.name} has recovered from his ${p.injury.name.toLowerCase()} and is available for selection.`, playerId: p.id, read: true });
        p.injury = null;
        p.condition = Math.min(p.condition, 80);
        p.sharpness = Math.min(p.sharpness, 50);
      }
      continue;
    }
    if (p.condition < 100) {
      const nf = getAttrs(p)[A('Natural Fitness')];
      const club = p.clubId != null ? w.clubs[p.clubId] : null;
      const bonus = club?.training === 'rest' ? 3 : club?.training === 'physical' ? -1 : 0;
      p.condition = Math.min(100, p.condition + 5 + nf * 0.3 + bonus);
    }
    p.sharpness = Math.max(20, p.sharpness - 0.8);
    p.morale += (13 - p.morale) * 0.01;
    // occasional training injury
    if (p.clubId != null && rng.chance(0.00025)) {
      const inj = randomInjury(rng);
      inj.days = Math.min(inj.days, 21);
      p.injury = inj;
      if (p.clubId === userId) addNews(w, { kind: 'injury', title: `${p.name} injured in training`, body: `${p.name} suffered a ${inj.name.toLowerCase()} in training and will be out for ${describeDays(inj.days)}.`, playerId: p.id });
    }
  }
}

/** Player description used in the UI */
export function abilityStars(p: Player, scale: 'ability' | 'potential' = 'ability'): number {
  const v = scale === 'ability' ? p.ability : p.potential;
  // 5 stars ~ 90+, 0.5 stars ~ 40
  return Math.max(0.5, Math.min(5, Math.round(((v - 40) / 10) * 2) / 2));
}

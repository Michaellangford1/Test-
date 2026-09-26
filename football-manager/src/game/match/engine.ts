// Minute-by-minute match simulation. Used both for the live, commentated
// match the user watches and (without commentary) for every other fixture.

import type { Fixture, Mentality, Passing, Player, Pos, Pressing, Tempo, World } from '../types';
import { Rng } from '../rng';
import { A, getAttrs, positionRating } from '../attributes';
import { FORMATIONS } from '../formations';
import { conditionFactor, isAvailable, repairLineup } from '../squad';
import { C, say } from './commentary';

export type EvType =
  | 'kickoff'
  | 'build'
  | 'chance'
  | 'goal'
  | 'save'
  | 'miss'
  | 'woodwork'
  | 'foul'
  | 'yellow'
  | 'red'
  | 'penalty'
  | 'corner'
  | 'offside'
  | 'injury'
  | 'sub'
  | 'halftime'
  | 'fulltime'
  | 'tactic'
  | 'defence'
  | 'period';

export interface MatchEvent {
  minute: number;
  side: 0 | 1 | -1;
  type: EvType;
  text: string;
  playerId?: number;
  important?: boolean;
  /** ball zone 0..100 from home goal for the mini-pitch */
  zone?: number;
}

export interface OnPitch {
  id: number;
  pos: Pos;
  slot: number;
}

export interface SideState {
  clubId: number;
  name: string;
  short: string;
  colors: [string, string];
  onPitch: OnPitch[];
  bench: number[];
  appeared: number[];
  subsMade: number;
  mentality: Mentality;
  passing: Passing;
  pressing: Pressing;
  tempo: Tempo;
  goals: number;
  shots: number;
  onTarget: number;
  corners: number;
  fouls: number;
  offsides: number;
  xg: number;
  possTicks: number;
  yellows: Record<number, number>;
  reds: number[];
  injured: number[];
  ratings: Record<number, number>;
  goalsBy: Record<number, number>;
  assistsBy: Record<number, number>;
  savesBy: Record<number, number>;
  entered: Record<number, number>;
  left: Record<number, number>;
  cond: Record<number, number>;
  isUser: boolean;
  autoSubs: boolean;
  formation: string;
  penaltyTaker: number | null;
  freeKickTaker: number | null;
}

interface Strength {
  gk: number;
  def: number;
  mid: number;
  att: number;
}

const UNIT_W: Record<Pos, [number, number, number]> = {
  // [def, mid, att]
  GK: [0, 0, 0],
  DC: [1, 0.05, 0],
  DR: [0.75, 0.2, 0.1],
  DL: [0.75, 0.2, 0.1],
  WBR: [0.5, 0.35, 0.25],
  WBL: [0.5, 0.35, 0.25],
  DM: [0.5, 0.55, 0.05],
  MC: [0.2, 0.7, 0.2],
  MR: [0.15, 0.5, 0.4],
  ML: [0.15, 0.5, 0.4],
  AMC: [0.02, 0.45, 0.65],
  AMR: [0.02, 0.3, 0.8],
  AML: [0.02, 0.3, 0.8],
  ST: [0, 0.08, 1],
};
const NORM = { def: 4.3, mid: 3.4, att: 3.1 };

const MENT: Record<Mentality, { att: number; def: number; freq: number }> = {
  defensive: { att: 0.88, def: 1.08, freq: 0.8 },
  cautious: { att: 0.94, def: 1.04, freq: 0.9 },
  balanced: { att: 1, def: 1, freq: 1 },
  attacking: { att: 1.06, def: 0.95, freq: 1.1 },
  'all-out': { att: 1.12, def: 0.88, freq: 1.22 },
};

const SHOOT_W: Record<Pos, number> = {
  GK: 0,
  DC: 0.35,
  DR: 0.35,
  DL: 0.35,
  WBR: 0.6,
  WBL: 0.6,
  DM: 0.5,
  MC: 1.3,
  MR: 1.5,
  ML: 1.5,
  AMC: 2.8,
  AMR: 2.8,
  AML: 2.8,
  ST: 5,
};

export interface EngineOptions {
  commentary: boolean;
  userClubId: number;
  knockout?: boolean;
  neutral?: boolean;
}

export class MatchEngine {
  w: World;
  fx: Fixture;
  rng: Rng;
  opts: EngineOptions;
  sides: [SideState, SideState];
  minute = 0;
  period = 1; // 1,2 = halves, 3,4 = extra time, 5 = penalties
  added = 0;
  finished = false;
  events: MatchEvent[] = [];
  zone = 50;
  pens: [number, number] | null = null;
  aet = false;
  private strengthCache: [Strength, Strength] | null = null;

  constructor(w: World, fx: Fixture, rng: Rng, opts: EngineOptions) {
    this.w = w;
    this.fx = fx;
    this.rng = rng;
    this.opts = opts;
    this.sides = [this.makeSide(fx.home), this.makeSide(fx.away)];
    this.added = this.rng.int(0, 3);
    this.push(-1, 'kickoff', say(rng, C.kickoff, {
      ref: 'The referee',
      stadium: this.w.clubs[fx.home].stadium,
      home: this.sides[0].name,
      away: this.sides[1].name,
    }));
  }

  private makeSide(clubId: number): SideState {
    const club = this.w.clubs[clubId];
    const isUser = clubId === this.opts.userClubId;
    repairLineup(this.w, club);
    const t = club.tactics;
    const f = FORMATIONS[t.formation] ?? FORMATIONS['4-4-2'];
    const onPitch: OnPitch[] = [];
    t.lineup.forEach((id, i) => {
      if (id != null && i < f.length) onPitch.push({ id, pos: f[i].pos, slot: i });
    });
    const s: SideState = {
      clubId,
      name: club.name,
      short: club.short,
      colors: club.colors,
      onPitch,
      bench: t.subs.filter((id) => this.w.players[id] && isAvailable(this.w.players[id])).slice(0, 9),
      appeared: onPitch.map((o) => o.id),
      subsMade: 0,
      mentality: t.mentality,
      passing: t.passing,
      pressing: t.pressing,
      tempo: t.tempo,
      goals: 0,
      shots: 0,
      onTarget: 0,
      corners: 0,
      fouls: 0,
      offsides: 0,
      xg: 0,
      possTicks: 0,
      yellows: {},
      reds: [],
      injured: [],
      ratings: {},
      goalsBy: {},
      assistsBy: {},
      savesBy: {},
      entered: {},
      left: {},
      cond: {},
      isUser,
      autoSubs: !isUser || !this.opts.commentary,
      formation: t.formation,
      penaltyTaker: t.penaltyTaker,
      freeKickTaker: t.freeKickTaker,
    };
    for (const o of onPitch) {
      s.ratings[o.id] = 6.6;
      s.entered[o.id] = 0;
      s.cond[o.id] = this.w.players[o.id].condition;
    }
    return s;
  }

  private p(id: number): Player {
    return this.w.players[id];
  }

  private push(side: 0 | 1 | -1, type: EvType, text: string, extra: Partial<MatchEvent> = {}) {
    if (!this.opts.commentary && !extra.important && type !== 'goal') {
      // keep a lean event log when simulating in the background
      if (type !== 'red' && type !== 'injury' && type !== 'sub') return;
    }
    this.events.push({ minute: this.displayMinute(), side, type, text, zone: this.zone, ...extra });
  }

  displayMinute(): number {
    return this.minute;
  }

  scoreText(): string {
    return `${this.sides[0].short} ${this.sides[0].goals}-${this.sides[1].goals} ${this.sides[1].short}`;
  }

  // ---------------------------------------------------------------------
  strength(i: 0 | 1): Strength {
    if (!this.strengthCache) this.strengthCache = [this.calcStrength(0), this.calcStrength(1)];
    return this.strengthCache[i];
  }

  private invalidate() {
    this.strengthCache = null;
  }

  private calcStrength(i: 0 | 1): Strength {
    const s = this.sides[i];
    let gk = 30;
    const sum = { def: 0, mid: 0, att: 0 };
    const wt = { def: 0, mid: 0, att: 0 };
    for (const o of s.onPitch) {
      const pl = this.p(o.id);
      let r = positionRating(pl, o.pos) * conditionFactor(s.cond[o.id] ?? 100);
      r *= 0.96 + (pl.morale / 20) * 0.06;
      r *= 0.94 + (pl.sharpness / 100) * 0.06;
      if (o.pos === 'GK') {
        gk = r;
        continue;
      }
      const [d, m, a] = UNIT_W[o.pos];
      sum.def += r * d;
      wt.def += d;
      sum.mid += r * m;
      wt.mid += m;
      sum.att += r * a;
      wt.att += a;
    }
    const unit = (k: 'def' | 'mid' | 'att') => (wt[k] > 0 ? (sum[k] / wt[k]) * Math.pow(wt[k] / NORM[k], 0.3) : 20);
    const ment = MENT[s.mentality];
    let def = unit('def') * ment.def;
    let mid = unit('mid');
    let att = unit('att') * ment.att;
    if (s.pressing === 'high') {
      mid *= 1.03;
      def *= 0.99;
    } else if (s.pressing === 'low') {
      mid *= 0.97;
      def *= 1.02;
    }
    const training = this.w.clubs[s.clubId].training;
    if (training === 'attacking') att *= 1.015;
    if (training === 'defending') def *= 1.015;
    if (s.passing === 'short') mid *= 1.02;
    if (s.passing === 'direct') {
      mid *= 0.98;
      att *= 1.02;
    }
    const numbers = s.onPitch.length;
    if (numbers < 11) {
      const f = 1 - (11 - numbers) * 0.06;
      def *= f;
      mid *= f;
      att *= f;
    }
    if (i === 0 && !this.opts.neutral) {
      def *= 1.045;
      mid *= 1.04;
      att *= 1.045;
    }
    return { gk, def, mid, att };
  }

  // ---------------------------------------------------------------------
  private periodEnd(): number {
    return [0, 45, 90, 105, 120][this.period];
  }

  /** Advance one minute. Returns events generated during this minute. */
  step(): MatchEvent[] {
    if (this.finished) return [];
    const before = this.events.length;
    this.minute++;
    const end = this.periodEnd();
    if (this.minute > end + this.added) {
      this.endPeriod();
      return this.events.slice(before);
    }
    this.tick();
    return this.events.slice(before);
  }

  private endPeriod() {
    const [h, a] = this.sides;
    if (this.period === 1) {
      this.push(-1, 'halftime', say(this.rng, C.halftime, { score: this.scoreText() }), { important: true });
      this.period = 2;
      this.minute = 45;
      this.added = this.rng.int(2, 6);
      this.halfTimeRecovery();
      return;
    }
    if (this.period === 2) {
      if (this.opts.knockout && h.goals === a.goals) {
        this.push(-1, 'period', `End of normal time: ${this.scoreText()}. We go to extra time.`, { important: true });
        this.period = 3;
        this.minute = 90;
        this.added = this.rng.int(0, 2);
        this.aet = true;
        return;
      }
      this.finish();
      return;
    }
    if (this.period === 3) {
      this.push(-1, 'period', `Half time in extra time: ${this.scoreText()}.`);
      this.period = 4;
      this.minute = 105;
      this.added = this.rng.int(0, 2);
      return;
    }
    if (this.period === 4) {
      if (h.goals === a.goals) {
        this.penaltyShootout();
      }
      this.finish();
    }
  }

  private halfTimeRecovery() {
    for (const s of this.sides) for (const o of s.onPitch) s.cond[o.id] = Math.min(100, (s.cond[o.id] ?? 100) + 3);
    this.invalidate();
  }

  private finish() {
    this.finished = true;
    const [h, a] = this.sides;
    let txt = say(this.rng, C.fulltime, { score: this.scoreText() });
    if (this.pens) txt += ` ${this.pens[0] > this.pens[1] ? h.name : a.name} win ${Math.max(...this.pens)}-${Math.min(...this.pens)} on penalties.`;
    else if (this.aet) txt += ' (after extra time)';
    this.push(-1, 'fulltime', txt, { important: true });
    this.finaliseRatings();
  }

  private tick() {
    const [S0, S1] = [this.strength(0), this.strength(1)];
    // possession
    const m0 = Math.pow(S0.mid, 3);
    const m1 = Math.pow(S1.mid, 3);
    let p0 = m0 / (m0 + m1);
    if (this.sides[0].passing === 'short') p0 += 0.02;
    if (this.sides[1].passing === 'short') p0 -= 0.02;
    if (this.sides[0].passing === 'direct') p0 -= 0.015;
    if (this.sides[1].passing === 'direct') p0 += 0.015;
    const side: 0 | 1 = this.rng.chance(p0) ? 0 : 1;
    const opp: 0 | 1 = side === 0 ? 1 : 0;
    this.sides[side].possTicks++;

    this.fatigue();

    const atk = this.sides[side];
    const Sa = side === 0 ? S0 : S1;
    const Sd = side === 0 ? S1 : S0;
    const ratio = Sa.att / Math.max(1, Sd.def);
    let freq = 0.235 * Math.pow(ratio, 2.2) * MENT[atk.mentality].freq;
    if (atk.tempo === 'fast') freq *= 1.08;
    if (atk.tempo === 'slow') freq *= 0.9;
    if (atk.passing === 'direct') freq *= 1.08;
    if (atk.passing === 'short') freq *= 0.95;
    freq = Math.max(0.03, Math.min(0.55, freq));

    // ball zone for the mini-pitch
    const target = side === 0 ? 65 + this.rng.next() * 25 : 35 - this.rng.next() * 25;
    this.zone = this.zone + (target - this.zone) * 0.5;

    const r = this.rng.next();
    if (r < freq) {
      this.attack(side, opp, ratio);
    } else if (r < freq + 0.12) {
      this.foul(opp, side);
    } else if (this.opts.commentary && r < freq + 0.3) {
      const pl = this.randomOutfield(side);
      if (pl) this.push(side, 'build', say(this.rng, C.build, { p: this.p(pl).short, team: atk.name }));
    }

    // injuries
    for (const s of [0, 1] as const) {
      for (const o of this.sides[s].onPitch) {
        if (this.rng.chance(0.00012)) {
          this.injure(s, o.id);
          break;
        }
      }
    }

    // AI management (subs, tactics) every few minutes
    if (this.minute % 5 === 0 || this.minute > 85) {
      for (const s of [0, 1] as const) this.manage(s);
    }
  }

  private fatigue() {
    for (const s of this.sides) {
      let mult = 1;
      if (s.pressing === 'high') mult *= 1.15;
      if (s.pressing === 'low') mult *= 0.9;
      if (s.tempo === 'fast') mult *= 1.08;
      if (s.tempo === 'slow') mult *= 0.93;
      for (const o of s.onPitch) {
        const a = getAttrs(this.p(o.id));
        const stam = a[A('Stamina')];
        const nf = a[A('Natural Fitness')];
        const rate = (0.2 + (20 - stam) * 0.014 + (20 - nf) * 0.004) * (o.pos === 'GK' ? 0.35 : mult);
        s.cond[o.id] = Math.max(15, (s.cond[o.id] ?? 100) - rate);
      }
    }
    if (this.minute % 3 === 0) this.invalidate();
  }

  private randomOutfield(side: 0 | 1): number | null {
    const outs = this.sides[side].onPitch.filter((o) => o.pos !== 'GK');
    if (!outs.length) return null;
    return this.rng.pick(outs).id;
  }

  private gk(side: 0 | 1): Player | null {
    const g = this.sides[side].onPitch.find((o) => o.pos === 'GK');
    return g ? this.p(g.id) : null;
  }

  private rate(side: 0 | 1, id: number, delta: number) {
    const s = this.sides[side];
    if (s.ratings[id] == null) s.ratings[id] = 6.6;
    s.ratings[id] += delta;
  }

  private attack(side: 0 | 1, opp: 0 | 1, ratio: number) {
    const s = this.sides[side];
    const d = this.sides[opp];
    const outfield = s.onPitch.filter((o) => o.pos !== 'GK');
    if (!outfield.length) return;

    // Chance broken up before a shot?
    if (this.rng.chance(0.18)) {
      const defs = d.onPitch.filter((o) => ['DC', 'DR', 'DL', 'WBR', 'WBL', 'DM'].includes(o.pos));
      if (defs.length) {
        const def = this.rng.weighted(defs, (o) => getAttrs(this.p(o.id))[A('Tackling')] + getAttrs(this.p(o.id))[A('Positioning')]);
        this.rate(opp, def.id, 0.07);
        if (this.opts.commentary) this.push(opp, 'defence', say(this.rng, C.chanceBroken, { d: this.p(def.id).short }));
      }
      return;
    }
    if (this.rng.chance(0.07)) {
      const st = outfield.filter((o) => ['ST', 'AMR', 'AML', 'AMC'].includes(o.pos));
      const who = st.length ? this.rng.pick(st) : this.rng.pick(outfield);
      s.offsides++;
      if (this.opts.commentary) this.push(side, 'offside', say(this.rng, C.offside, { p: this.p(who.id).short }));
      return;
    }
    // penalty?
    if (this.rng.chance(0.028)) {
      const fouler = this.randomOutfield(opp);
      const victim = this.rng.weighted(outfield, (o) => SHOOT_W[o.pos]);
      this.push(side, 'penalty', say(this.rng, C.penaltyAward, { p: fouler ? this.p(fouler).short : 'a defender', v: this.p(victim.id).short }), { important: true });
      if (fouler && this.rng.chance(0.2)) this.card(opp, fouler, false);
      this.penaltyKick(side, opp);
      return;
    }

    const type = this.rng.weighted(
      [
        ['open', 55],
        ['long', 20],
        ['header', 14],
        ['oneOnOne', 6],
        ['close', 5],
      ] as const,
      ([, w]) => w,
    )[0];
    const shooter = this.pickShooter(side, type);
    const assisterOpts = outfield.filter((o) => o.id !== shooter.id);
    const assister = assisterOpts.length
      ? this.rng.weighted(assisterOpts, (o) => {
          const a = getAttrs(this.p(o.id));
          return (type === 'header' ? a[A('Crossing')] * 2 : a[A('Passing')] + a[A('Creativity')]) * (o.pos === 'GK' ? 0 : 1);
        })
      : null;
    const base = { open: 0.1, long: 0.035, header: 0.1, oneOnOne: 0.36, close: 0.42 }[type];
    let xg = base * Math.max(0.6, Math.min(1.5, Math.pow(ratio, 0.8)));
    if (s.passing === 'short') xg *= 1.05;
    if (s.passing === 'direct') xg *= 0.93;
    this.shoot(side, opp, shooter.id, assister?.id ?? null, type, xg);
  }

  private pickShooter(side: 0 | 1, type: string): OnPitch {
    const outs = this.sides[side].onPitch.filter((o) => o.pos !== 'GK');
    return this.rng.weighted(outs, (o) => {
      const a = getAttrs(this.p(o.id));
      let w = SHOOT_W[o.pos];
      if (type === 'header') w = w * 0.5 + (a[A('Heading')] + a[A('Jumping')]) / 10 + (o.pos === 'DC' ? 1.2 : 0);
      else if (type === 'long') w = w * 0.6 + a[A('Long Shots')] / 6;
      else w *= (a[A('Finishing')] + a[A('Off the Ball')]) / 24;
      return w;
    });
  }

  private shoot(side: 0 | 1, opp: 0 | 1, shooterId: number, assistId: number | null, type: string, xg: number) {
    const s = this.sides[side];
    const shooter = this.p(shooterId);
    const a = getAttrs(shooter);
    const gk = this.gk(opp);
    const ga = gk ? getAttrs(gk) : null;
    const nm = shooter.short;
    const an = assistId ? this.p(assistId).short : 'a team-mate';
    this.zone = side === 0 ? 92 : 8;

    if (this.opts.commentary) {
      const tpl = type === 'long' ? C.long : type === 'header' ? C.header : type === 'oneOnOne' ? C.oneOnOne : type === 'close' ? C.close : C.open;
      this.push(side, 'chance', say(this.rng, tpl, { p: nm, a: an }));
    }
    s.shots++;
    s.xg += xg;

    const main = type === 'header' ? a[A('Heading')] : type === 'long' ? a[A('Long Shots')] : a[A('Finishing')];
    const skill = (main * 2 + a[A('Composure')] + a[A('Technique')]) / 4;
    let keep = 6;
    if (ga) {
      keep =
        type === 'oneOnOne'
          ? (ga[A('One on Ones')] * 2 + ga[A('Reflexes')] + ga[A('Rushing Out')]) / 4
          : type === 'header'
            ? (ga[A('Aerial Ability')] + ga[A('Reflexes')] * 2 + ga[A('Command of Area')]) / 4
            : (ga[A('Reflexes')] * 2 + ga[A('Handling')] + ga[A('Positioning')]) / 4;
    }
    const cond = conditionFactor(s.cond[shooterId] ?? 100);
    const factor = Math.max(0.5, Math.min(1.65, 1 + (skill * cond - keep) * 0.045));
    const pGoal = Math.min(0.9, xg * factor);
    const pOnTarget = Math.min(0.95, 0.3 + skill * 0.017 + xg * 0.4);

    if (this.rng.chance(pGoal)) {
      this.scoreGoal(side, shooterId, assistId, type);
      return;
    }
    if (this.rng.chance(pOnTarget / (1 - pGoal + 0.0001) * 0.75)) {
      s.onTarget++;
      this.rate(side, shooterId, 0.08);
      if (gk) {
        const d = this.sides[opp];
        d.savesBy[gk.id] = (d.savesBy[gk.id] ?? 0) + 1;
        this.rate(opp, gk.id, xg > 0.25 ? 0.45 : 0.22);
      }
      if (this.opts.commentary) this.push(opp, 'save', say(this.rng, C.save, { gk: gk?.short ?? 'the keeper' }));
      if (this.rng.chance(0.3)) this.corner(side, opp);
      return;
    }
    // missed
    this.rate(side, shooterId, xg > 0.3 ? -0.3 : -0.04);
    if (this.rng.chance(0.04)) {
      if (this.opts.commentary) this.push(side, 'woodwork', say(this.rng, C.woodwork, { p: nm }));
    } else if (this.opts.commentary) {
      this.push(side, 'miss', say(this.rng, xg > 0.3 ? C.bigMiss : C.miss, { p: nm }));
    }
    if (this.rng.chance(0.18)) this.corner(side, opp);
  }

  private corner(side: 0 | 1, opp: 0 | 1) {
    const s = this.sides[side];
    s.corners++;
    if (this.opts.commentary) this.push(side, 'corner', say(this.rng, C.corner, { team: s.name }));
    if (this.rng.chance(0.28)) {
      const taker = this.setPieceTaker(side, 'Corners');
      const shooter = this.pickShooter(side, 'header');
      if (shooter.id === taker) return;
      this.shoot(side, opp, shooter.id, taker, 'header', 0.07);
    }
  }

  private setPieceTaker(side: 0 | 1, attr: 'Corners' | 'Free Kicks' | 'Penalty Taking'): number {
    const s = this.sides[side];
    const pref = attr === 'Penalty Taking' ? s.penaltyTaker : attr === 'Free Kicks' ? s.freeKickTaker : null;
    if (pref != null && s.onPitch.some((o) => o.id === pref)) return pref;
    let best = s.onPitch[0].id;
    let bv = -1;
    for (const o of s.onPitch) {
      if (o.pos === 'GK') continue;
      const v = getAttrs(this.p(o.id))[A(attr)];
      if (v > bv) {
        bv = v;
        best = o.id;
      }
    }
    return best;
  }

  private penaltyKick(side: 0 | 1, opp: 0 | 1) {
    const s = this.sides[side];
    const taker = this.setPieceTaker(side, 'Penalty Taking');
    const a = getAttrs(this.p(taker));
    const gk = this.gk(opp);
    const ga = gk ? getAttrs(gk) : null;
    if (this.opts.commentary) this.push(side, 'chance', say(this.rng, C.penTake, { p: this.p(taker).short }));
    s.shots++;
    s.xg += 0.78;
    const pGoal = Math.max(0.55, Math.min(0.92, 0.76 + (a[A('Penalty Taking')] + a[A('Composure')] - 26) * 0.012 - ((ga?.[A('Reflexes')] ?? 10) - 13) * 0.008));
    if (this.rng.chance(pGoal)) {
      this.scoreGoal(side, taker, null, 'pen');
    } else if (this.rng.chance(0.6) && gk) {
      s.onTarget++;
      this.rate(opp, gk.id, 0.8);
      this.rate(side, taker, -0.6);
      this.push(opp, 'save', `...SAVED! ${gk.short} guesses right and keeps it out!`, { important: true });
    } else {
      this.rate(side, taker, -0.6);
      this.push(side, 'miss', `...and he's put it wide! Penalty missed!`, { important: true });
    }
  }

  private scoreGoal(side: 0 | 1, scorer: number, assist: number | null, type: string) {
    const s = this.sides[side];
    const opp: 0 | 1 = side === 0 ? 1 : 0;
    const d = this.sides[opp];
    s.goals++;
    s.onTarget++;
    s.goalsBy[scorer] = (s.goalsBy[scorer] ?? 0) + 1;
    this.rate(side, scorer, 1.1);
    if (assist != null && type !== 'pen') {
      s.assistsBy[assist] = (s.assistsBy[assist] ?? 0) + 1;
      this.rate(side, assist, 0.6);
    }
    const g = this.gk(opp);
    if (g) this.rate(opp, g.id, -0.35);
    for (const o of d.onPitch) if (['DC', 'DR', 'DL', 'WBR', 'WBL'].includes(o.pos)) this.rate(opp, o.id, -0.12);
    const tpl = type === 'long' ? C.goalLong : type === 'header' ? C.goalHeader : C.goal;
    const text = say(this.rng, tpl, { p: this.p(scorer).short, score: this.scoreText(), team: s.name }) + (type === 'pen' ? ' (pen)' : '');
    this.push(side, 'goal', text, { playerId: scorer, important: true });
    this.fx.goals.push({ minute: this.minute, side, playerId: scorer, assistId: assist ?? undefined, pen: type === 'pen' || undefined });
    this.zone = 50;
    // morale swing in-game
    for (const o of s.onPitch) s.cond[o.id] = Math.min(100, (s.cond[o.id] ?? 100) + 0.5);
  }

  private foul(foulSide: 0 | 1, victimSide: 0 | 1) {
    const s = this.sides[foulSide];
    const outs = s.onPitch.filter((o) => o.pos !== 'GK');
    if (!outs.length) return;
    const fouler = this.rng.weighted(outs, (o) => getAttrs(this.p(o.id))[A('Aggression')] + 4);
    const victim = this.randomOutfield(victimSide);
    s.fouls++;
    this.rate(foulSide, fouler.id, -0.03);
    if (this.opts.commentary) this.push(foulSide, 'foul', say(this.rng, C.foul, { p: this.p(fouler.id).short, v: victim ? this.p(victim).short : 'his man' }));
    const agg = getAttrs(this.p(fouler.id))[A('Aggression')];
    if (this.rng.chance(0.004 + agg * 0.0002)) {
      this.card(foulSide, fouler.id, true);
    } else if (this.rng.chance(0.1 + agg * 0.004)) {
      this.card(foulSide, fouler.id, false);
    }
    // dangerous free kick
    if (this.rng.chance(0.09)) {
      const taker = this.setPieceTaker(victimSide, 'Free Kicks');
      if (this.opts.commentary) this.push(victimSide, 'chance', say(this.rng, C.freeKick, { p: this.p(taker).short }));
      const fk = getAttrs(this.p(taker))[A('Free Kicks')];
      this.shoot(victimSide, foulSide, taker, null, 'long', 0.04 + fk * 0.002);
    }
  }

  private card(side: 0 | 1, id: number, straightRed: boolean) {
    const s = this.sides[side];
    if (!s.onPitch.some((o) => o.id === id)) return;
    const nm = this.p(id).short;
    if (straightRed) {
      s.reds.push(id);
      this.rate(side, id, -1.5);
      this.sendOff(side, id);
      this.push(side, 'red', say(this.rng, C.red, { p: nm, team: s.name, n: String(s.onPitch.length) }), { playerId: id, important: true });
      return;
    }
    s.yellows[id] = (s.yellows[id] ?? 0) + 1;
    this.rate(side, id, -0.3);
    if (s.yellows[id] >= 2) {
      s.reds.push(id);
      this.rate(side, id, -1.0);
      this.sendOff(side, id);
      this.push(side, 'red', say(this.rng, C.secondYellow, { p: nm, team: s.name, n: String(s.onPitch.length) }), { playerId: id, important: true });
    } else {
      this.push(side, 'yellow', say(this.rng, C.yellow, { p: nm }), { playerId: id });
    }
  }

  private sendOff(side: 0 | 1, id: number) {
    const s = this.sides[side];
    const wasGK = s.onPitch.find((o) => o.id === id)?.pos === 'GK';
    s.onPitch = s.onPitch.filter((o) => o.id !== id);
    s.left[id] = this.minute;
    // if keeper sent off, bring on the sub keeper (sacrificing an outfielder) or put an outfielder in goal
    if (wasGK) {
      const benchGk = s.bench.find((b) => this.p(b).positions[0] === 'GK');
      if (benchGk != null && s.subsMade < 5) {
        const off = [...s.onPitch].filter((o) => o.pos !== 'GK').sort((a, b) => this.p(a.id).ability - this.p(b.id).ability)[0];
        if (off) this.substitute(side, off.id, benchGk, 'GK');
      } else if (s.onPitch.length) {
        s.onPitch[s.onPitch.length - 1].pos = 'GK';
      }
    }
    this.invalidate();
  }

  private injure(side: 0 | 1, id: number) {
    const s = this.sides[side];
    if (s.injured.includes(id)) return;
    s.injured.push(id);
    this.push(side, 'injury', say(this.rng, C.injury, { p: this.p(id).short }), { playerId: id, important: true });
    // injured player struggles until replaced
    s.cond[id] = Math.min(s.cond[id] ?? 100, 35);
    this.invalidate();
    // the assistant replaces injured players automatically, for both sides
    const o = s.onPitch.find((x) => x.id === id);
    if (o) {
      const sub = this.bestBenchFor(side, o.pos);
      if (sub != null && s.subsMade < 5) this.substitute(side, id, sub, o.pos);
    }
  }

  bestBenchFor(side: 0 | 1, pos: Pos): number | null {
    const s = this.sides[side];
    let best: number | null = null;
    let bv = -1e9;
    for (const b of s.bench) {
      const p = this.p(b);
      if (pos !== 'GK' && p.positions[0] === 'GK') continue;
      if (pos === 'GK' && p.positions[0] !== 'GK') continue;
      const v = positionRating(p, pos);
      if (v > bv) {
        bv = v;
        best = b;
      }
    }
    return best;
  }

  /** Public: make a substitution. Returns false if not allowed. */
  substitute(side: 0 | 1, offId: number, onId: number, pos?: Pos): boolean {
    const s = this.sides[side];
    if (s.subsMade >= 5 || this.finished) return false;
    const idx = s.onPitch.findIndex((o) => o.id === offId);
    if (idx < 0 || !s.bench.includes(onId)) return false;
    const slot = s.onPitch[idx];
    s.onPitch[idx] = { id: onId, pos: pos ?? slot.pos, slot: slot.slot };
    s.bench = s.bench.filter((b) => b !== onId);
    s.subsMade++;
    s.left[offId] = this.minute;
    s.entered[onId] = this.minute;
    s.appeared.push(onId);
    s.ratings[onId] = 6.6;
    s.cond[onId] = this.p(onId).condition;
    this.invalidate();
    this.push(side, 'sub', say(this.rng, C.sub, { team: s.name, on: this.p(onId).short, off: this.p(offId).short }), { important: s.isUser });
    return true;
  }

  setMentality(side: 0 | 1, m: Mentality) {
    const s = this.sides[side];
    if (s.mentality === m) return;
    s.mentality = m;
    this.invalidate();
    this.push(side, 'tactic', say(this.rng, C.tactic, { team: s.name, m: `${m} mentality` }));
  }

  setInstruction(side: 0 | 1, key: 'passing' | 'pressing' | 'tempo', value: string) {
    const s = this.sides[side];
    (s as unknown as Record<string, string>)[key] = value;
    this.invalidate();
  }

  /** Swap positions of two players on the pitch */
  swapPositions(side: 0 | 1, a: number, b: number) {
    const s = this.sides[side];
    const oa = s.onPitch.find((o) => o.id === a);
    const ob = s.onPitch.find((o) => o.id === b);
    if (!oa || !ob) return;
    [oa.pos, ob.pos] = [ob.pos, oa.pos];
    [oa.slot, ob.slot] = [ob.slot, oa.slot];
    this.invalidate();
  }

  private manage(side: 0 | 1) {
    const s = this.sides[side];
    if (!s.autoSubs) return;
    const opp = this.sides[side === 0 ? 1 : 0];
    const diff = s.goals - opp.goals;
    // tactical tweaks
    if (this.minute >= 70 && diff < 0 && s.mentality !== 'attacking' && s.mentality !== 'all-out') this.setMentality(side, 'attacking');
    else if (this.minute >= 83 && diff < 0 && s.mentality !== 'all-out') this.setMentality(side, 'all-out');
    else if (this.minute >= 80 && diff === 1 && (s.mentality === 'balanced' || s.mentality === 'attacking')) this.setMentality(side, 'cautious');

    if (this.minute < 55 || s.subsMade >= 5 || !s.bench.length) return;
    // tired or poor players get replaced
    const candidates = s.onPitch
      .filter((o) => o.pos !== 'GK')
      .map((o) => ({ o, cond: s.cond[o.id] ?? 100, rating: s.ratings[o.id] ?? 6.6 }))
      .sort((a, b) => a.cond + a.rating * 4 - (b.cond + b.rating * 4));
    const worst = candidates[0];
    if (!worst) return;
    const windowChance = this.minute >= 60 && this.minute <= 85 ? 0.35 : 0.1;
    if ((worst.cond < 72 || worst.rating < 6.2) && this.rng.chance(windowChance)) {
      let pos = worst.o.pos;
      // chasing the game: bring on an attacker for a defender
      if (diff < 0 && this.minute > 70 && ['DC', 'DM', 'DR', 'DL'].includes(pos)) pos = pos === 'DC' ? 'ST' : 'AMC';
      const sub = this.bestBenchFor(side, pos);
      if (sub != null) {
        const benchR = positionRating(this.p(sub), pos);
        const curR = positionRating(this.p(worst.o.id), worst.o.pos) * conditionFactor(worst.cond);
        if (benchR >= curR * 0.92) this.substitute(side, worst.o.id, sub, pos);
      }
    }
  }

  private penaltyShootout() {
    this.period = 5;
    this.push(-1, 'period', `It's all square after extra time. We go to penalties!`, { important: true });
    const order = (side: 0 | 1) =>
      [...this.sides[side].onPitch]
        .filter((o) => o.pos !== 'GK')
        .map((o) => o.id)
        .sort((a, b) => getAttrs(this.p(b))[A('Penalty Taking')] - getAttrs(this.p(a))[A('Penalty Taking')])
        .concat(this.sides[side].onPitch.filter((o) => o.pos === 'GK').map((o) => o.id));
    const takers = [order(0), order(1)];
    const score: [number, number] = [0, 0];
    const taken: [number, number] = [0, 0];
    let round = 0;
    const kick = (side: 0 | 1) => {
      const t = takers[side];
      const id = t[taken[side] % Math.max(1, t.length)];
      taken[side]++;
      const pa = getAttrs(this.p(id));
      const gk = this.gk(side === 0 ? 1 : 0);
      const ga = gk ? getAttrs(gk) : null;
      const p = Math.max(0.5, Math.min(0.92, 0.75 + (pa[A('Penalty Taking')] + pa[A('Composure')] - 26) * 0.012 - ((ga?.[A('Reflexes')] ?? 10) - 13) * 0.008));
      const scored = this.rng.chance(p);
      if (scored) score[side]++;
      this.push(side, scored ? 'goal' : 'save', `${this.sides[side].short}: ${this.p(id).short} ${scored ? 'scores' : 'misses'}. (${score[0]}-${score[1]})`, { important: true });
    };
    const decided = () => {
      const rem0 = Math.max(0, 5 - taken[0]);
      const rem1 = Math.max(0, 5 - taken[1]);
      return score[0] > score[1] + rem1 || score[1] > score[0] + rem0;
    };
    // best of five
    for (round = 0; round < 5 && !decided(); round++) {
      kick(0);
      if (decided()) break;
      kick(1);
    }
    // sudden death
    while (score[0] === score[1]) {
      kick(0);
      kick(1);
      if (taken[0] > 30) {
        score[0]++;
        break;
      }
    }
    this.pens = score;
  }

  private finaliseRatings() {
    const [h, a] = this.sides;
    const res = h.goals > a.goals ? 0 : h.goals < a.goals ? 1 : -1;
    for (const i of [0, 1] as const) {
      const s = this.sides[i];
      const other = this.sides[i === 0 ? 1 : 0];
      for (const id of s.appeared) {
        let r = s.ratings[id] ?? 6.6;
        const p = this.p(id);
        const mins = (s.left[id] ?? this.minute) - (s.entered[id] ?? 0);
        if (res === i) r += 0.3;
        else if (res !== -1) r -= 0.25;
        if (other.goals === 0 && mins >= 60 && ['GK', 'DC', 'DR', 'DL', 'WBR', 'WBL'].includes(p.positions[0])) r += 0.45;
        r += this.rng.gauss() * 0.22 + (p.ability - 75) * 0.006;
        if (mins < 20) r = 6.4 + (r - 6.6) * 0.5;
        s.ratings[id] = Math.round(Math.max(3, Math.min(10, r)) * 10) / 10;
      }
    }
  }

  simulateToEnd() {
    let guard = 0;
    while (!this.finished && guard++ < 400) this.step();
  }

  /** Man of the match (player id and side) */
  motm(): { id: number; side: 0 | 1 } | null {
    let best: { id: number; side: 0 | 1 } | null = null;
    let bv = -1;
    for (const i of [0, 1] as const) {
      for (const [id, r] of Object.entries(this.sides[i].ratings)) {
        if (r > bv) {
          bv = r;
          best = { id: +id, side: i };
        }
      }
    }
    return best;
  }

  possession(): [number, number] {
    const t = this.sides[0].possTicks + this.sides[1].possTicks || 1;
    const h = Math.round((this.sides[0].possTicks / t) * 100);
    return [h, 100 - h];
  }
}

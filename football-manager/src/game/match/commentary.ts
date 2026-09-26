// Text commentary templates in the spirit of the FM2005 text match engine.
import type { Rng } from '../rng';

type Tpl = (a: Record<string, string>) => string;

const pickT = (rng: Rng, arr: Tpl[], a: Record<string, string>) => rng.pick(arr)(a);

export const C = {
  kickoff: [
    (a) => `${a.ref} gets us under way at ${a.stadium}.`,
    (a) => `We're off! ${a.home} kick off against ${a.away}.`,
    (a) => `The whistle goes and ${a.home} v ${a.away} is under way.`,
  ] as Tpl[],
  build: [
    (a) => `${a.p} picks up the ball in midfield and looks for options.`,
    (a) => `${a.team} are knocking it about patiently at the back.`,
    (a) => `${a.p} drives forward with the ball.`,
    (a) => `${a.p} switches the play out to the flank.`,
    (a) => `Neat passing from ${a.team} as they try to build an attack.`,
    (a) => `${a.p} plays a one-two and tries to break the lines.`,
    (a) => `${a.team} win the ball back and look to counter.`,
    (a) => `Long ball forward from ${a.p}.`,
  ] as Tpl[],
  open: [
    (a) => `${a.a} slides the ball through to ${a.p}...`,
    (a) => `${a.p} finds a yard of space on the edge of the box...`,
    (a) => `Lovely move! ${a.a} cuts it back for ${a.p}...`,
    (a) => `${a.p} beats his man and cuts inside...`,
    (a) => `${a.a} whips in a low cross towards ${a.p}...`,
  ] as Tpl[],
  long: [
    (a) => `${a.p} decides to try his luck from distance...`,
    (a) => `${a.p} shapes to shoot from 25 yards...`,
    (a) => `The ball falls to ${a.p} well outside the area...`,
  ] as Tpl[],
  header: [
    (a) => `${a.a} swings in a cross and ${a.p} rises highest...`,
    (a) => `Great delivery from ${a.a}, ${a.p} attacks the ball...`,
    (a) => `${a.p} gets his head to ${a.a}'s cross...`,
  ] as Tpl[],
  oneOnOne: [
    (a) => `${a.a} splits the defence! ${a.p} is clean through on goal...`,
    (a) => `${a.p} races clear, just the keeper to beat...`,
    (a) => `A defensive mix-up and ${a.p} is in on goal...`,
  ] as Tpl[],
  close: [
    (a) => `Scramble in the six-yard box! The ball drops to ${a.p}...`,
    (a) => `${a.a}'s shot is parried and ${a.p} is first to the rebound...`,
  ] as Tpl[],
  goal: [
    (a) => `GOAL! ${a.p} slots it home! ${a.score}`,
    (a) => `GOAL! ${a.p} fires it into the bottom corner! ${a.score}`,
    (a) => `GOAL! What a finish from ${a.p}! ${a.score}`,
    (a) => `GOAL! ${a.p} makes no mistake! ${a.score}`,
    (a) => `GOAL! It's in! ${a.p} scores for ${a.team}! ${a.score}`,
  ] as Tpl[],
  goalLong: [
    (a) => `GOAL! An absolute screamer from ${a.p}! ${a.score}`,
    (a) => `GOAL! ${a.p} has found the top corner from distance! ${a.score}`,
  ] as Tpl[],
  goalHeader: [
    (a) => `GOAL! ${a.p} powers the header past the keeper! ${a.score}`,
    (a) => `GOAL! A bullet header from ${a.p}! ${a.score}`,
  ] as Tpl[],
  save: [
    (a) => `...but ${a.gk} gets down well to save.`,
    (a) => `...superb stop from ${a.gk}!`,
    (a) => `...${a.gk} is equal to it and holds on.`,
    (a) => `...${a.gk} tips it round the post!`,
  ] as Tpl[],
  miss: [
    () => `...but it flies wide of the post.`,
    () => `...and it sails over the bar.`,
    (a) => `...${a.p} snatches at it and it goes wide.`,
    () => `...but the effort is blocked by a defender.`,
    () => `...it's cleared off the line!`,
  ] as Tpl[],
  woodwork: [(a) => `...and ${a.p} hits the post!`, () => `...it crashes off the crossbar!`] as Tpl[],
  bigMiss: [
    (a) => `...how has ${a.p} missed that?! He really should have scored.`,
    (a) => `...${a.p} puts it wide! What a chance wasted.`,
  ] as Tpl[],
  foul: [
    (a) => `${a.p} brings down ${a.v}. Free kick.`,
    (a) => `Foul by ${a.p} on ${a.v}.`,
    (a) => `${a.p} goes in late on ${a.v} and the referee blows up.`,
  ] as Tpl[],
  yellow: [(a) => `${a.p} is shown a yellow card.`, (a) => `The referee books ${a.p}.`] as Tpl[],
  secondYellow: [(a) => `Second yellow for ${a.p}! He's off! ${a.team} are down to ${a.n} men.`] as Tpl[],
  red: [(a) => `RED CARD! ${a.p} is sent off for a terrible challenge! ${a.team} down to ${a.n} men.`] as Tpl[],
  penaltyAward: [
    (a) => `PENALTY! ${a.v} is brought down in the box by ${a.p}!`,
    (a) => `The referee points to the spot! Handball against ${a.p}.`,
  ] as Tpl[],
  penTake: [(a) => `${a.p} steps up to take it...`] as Tpl[],
  freeKick: [(a) => `Free kick in a dangerous position. ${a.p} stands over it...`] as Tpl[],
  corner: [(a) => `Corner to ${a.team}.`, (a) => `${a.team} win a corner.`] as Tpl[],
  offside: [(a) => `${a.p} is caught offside.`, (a) => `The flag goes up against ${a.p}.`] as Tpl[],
  injury: [
    (a) => `${a.p} is down injured and needs treatment.`,
    (a) => `${a.p} pulls up clutching his hamstring. That doesn't look good.`,
  ] as Tpl[],
  sub: [(a) => `Substitution for ${a.team}: ${a.on} replaces ${a.off}.`] as Tpl[],
  halftime: [(a) => `Half time: ${a.score}.`] as Tpl[],
  fulltime: [(a) => `FULL TIME: ${a.score}.`] as Tpl[],
  tactic: [(a) => `${a.team} change their approach: ${a.m}.`] as Tpl[],
  chanceBroken: [
    (a) => `${a.d} reads it well and intercepts.`,
    (a) => `Great tackle by ${a.d} to snuff out the danger.`,
    (a) => `${a.d} heads the ball clear.`,
    (a) => `${a.d} does well to block.`,
  ] as Tpl[],
};

export const say = (rng: Rng, t: Tpl[], a: Record<string, string>) => pickT(rng, t, a);

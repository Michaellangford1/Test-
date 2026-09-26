import type { Club, Player, Pos, TransferOffer, World } from './types';
import type { Rng } from './rng';
import { addDays, diffDays, transferWindowOpen } from './dates';
import { askingPrice, clubWageBill, expectedWage, fmtMoney, roundMoney } from './valuation';
import { addNews } from './news';
import { getFreeAgents, getSquad, movePlayer } from './squad';
import { posGroup } from './attributes';
import { assignSquadNumbers } from './build';

export const SELL_BUDGET_SHARE = 0.8;

export function userClub(w: World): Club {
  return w.clubs[w.manager.clubId];
}

// ---------------------------------------------------------------------------
// User buying
// ---------------------------------------------------------------------------

export function canMakeOffer(w: World, p: Player): string | null {
  if (p.clubId === w.manager.clubId) return 'He already plays for you.';
  if (!transferWindowOpen(w.date) && p.clubId != null) return 'The transfer window is closed.';
  if (w.offers.some((o) => o.playerId === p.id && o.userBuying && (o.status === 'pending' || o.status === 'accepted' || o.status === 'countered')))
    return 'You already have an active offer for this player.';
  if (p.retiring) return 'He is retiring at the end of the season.';
  return null;
}

export function makeOffer(w: World, p: Player, fee: number): TransferOffer {
  const offer: TransferOffer = {
    id: w.nextId.offer++,
    playerId: p.id,
    fromClub: p.clubId,
    toClub: w.manager.clubId,
    fee: roundMoney(fee),
    status: p.clubId == null ? 'accepted' : 'pending',
    date: w.date,
    respondBy: addDays(w.date, 1),
    userBuying: true,
  };
  w.offers.push(offer);
  return offer;
}

/** Selling club responds to a pending user bid */
function respondToUserBid(w: World, o: TransferOffer, rng: Rng) {
  const p = w.players[o.playerId];
  if (!p || p.clubId !== o.fromClub) {
    o.status = 'collapsed';
    return;
  }
  const seller = w.clubs[o.fromClub!];
  const asking = askingPrice(w, p);
  const buyer = w.clubs[o.toClub];
  // Big clubs are reluctant to sell key players to smaller rivals
  const reluctance = seller.reputation > buyer.reputation + 10 ? 1.15 : 1;
  const target = asking * reluctance * (0.95 + rng.next() * 0.1);
  if (o.fee >= target) {
    o.status = 'accepted';
    addNews(w, {
      kind: 'transfer',
      title: `Bid accepted for ${p.name}`,
      body: `${seller.name} have accepted your offer of ${fmtMoney(o.fee)} for ${p.name}. You now need to agree personal terms with the player.`,
      offerId: o.id,
      playerId: p.id,
    });
  } else if (o.fee >= target * 0.75) {
    o.status = 'countered';
    o.counterFee = roundMoney(target * 1.02);
    addNews(w, {
      kind: 'transfer',
      title: `Counter-offer for ${p.name}`,
      body: `${seller.name} have rejected your bid of ${fmtMoney(o.fee)} for ${p.name} but would accept ${fmtMoney(o.counterFee)}.`,
      offerId: o.id,
      playerId: p.id,
    });
  } else {
    o.status = 'rejected';
    addNews(w, {
      kind: 'transfer',
      title: `Bid rejected for ${p.name}`,
      body: `${seller.name} have rejected your offer of ${fmtMoney(o.fee)} for ${p.name}. They value him at considerably more.`,
      offerId: o.id,
      playerId: p.id,
    });
  }
}

export function acceptCounter(o: TransferOffer) {
  if (o.status !== 'countered' || o.counterFee == null) return;
  o.fee = o.counterFee;
  o.status = 'accepted';
}

/** What the player wants to join the user's club */
export function contractDemand(w: World, p: Player, club: Club): { wage: number; years: number; interested: boolean; reason?: string } {
  const current = p.clubId != null ? w.clubs[p.clubId] : null;
  let wage = expectedWage(p, club.reputation);
  if (current && current.id !== club.id) {
    wage = Math.max(wage, p.wage * 1.1);
    if (club.reputation < current.reputation - 12 && p.ability > 70) {
      return { wage, years: 0, interested: false, reason: `${p.short} is not interested in moving to a club of ${club.name}'s stature.` };
    }
  }
  if (club.id === p.clubId) {
    // renewal: happier players ask for less
    wage = Math.max(p.wage, wage) * (p.morale >= 14 ? 1 : p.morale >= 9 ? 1.1 : 1.25);
  }
  const years = p.age >= 33 ? 1 : p.age >= 30 ? 2 : p.age <= 21 ? 5 : 4;
  return { wage: roundMoney(wage), years, interested: true };
}

export function negotiate(w: World, p: Player, club: Club, wage: number, years: number): { ok: boolean; msg: string } {
  const d = contractDemand(w, p, club);
  if (!d.interested) return { ok: false, msg: d.reason! };
  const billAfter = clubWageBill(w, club) - (p.clubId === club.id ? p.wage : 0) + wage;
  if (billAfter > club.finances.wageBudget) return { ok: false, msg: `The board will not sanction this - it would take you over your wage budget of ${fmtMoney(club.finances.wageBudget)} p/w.` };
  if (years > 5) return { ok: false, msg: 'Contracts are limited to five years.' };
  if (p.age >= 33 && years > 2) return { ok: false, msg: `${p.short} wants no more than a ${d.years}-year deal at his age... but he'd accept up to two.` };
  if (wage < d.wage * 0.93) return { ok: false, msg: `${p.short} wants around ${fmtMoney(d.wage)} a week.` };
  return { ok: true, msg: `${p.short} has agreed terms!` };
}

export function completeUserPurchase(w: World, o: TransferOffer, wage: number, years: number): { ok: boolean; msg: string } {
  const p = w.players[o.playerId];
  const club = w.clubs[o.toClub];
  if (!transferWindowOpen(w.date) && p.clubId != null) return { ok: false, msg: 'The transfer window is closed.' };
  if (club.finances.transferBudget < o.fee) return { ok: false, msg: `You only have ${fmtMoney(club.finances.transferBudget)} available for transfers.` };
  const r = negotiate(w, p, club, wage, years);
  if (!r.ok) return r;
  const seller = p.clubId != null ? w.clubs[p.clubId] : null;
  executeTransfer(w, p, seller, club, o.fee, wage, years);
  o.status = 'completed';
  addNews(w, {
    kind: 'transfer',
    title: `${p.name} signs`,
    body: `${p.name} has joined ${club.name}${seller ? ` from ${seller.name} for ${fmtMoney(o.fee)}` : ' on a free transfer'}. He has signed a ${years}-year contract worth ${fmtMoney(wage)} a week.`,
    playerId: p.id,
  });
  return { ok: true, msg: `${p.name} has signed for ${club.name}!` };
}

export function executeTransfer(w: World, p: Player, seller: Club | null, buyer: Club, fee: number, wage: number, years: number) {
  if (seller) {
    seller.finances.balance += fee;
    seller.finances.seasonIncome.transfers += fee;
    seller.finances.transferBudget += Math.round(fee * (seller.id === w.manager.clubId ? SELL_BUDGET_SHARE : 0.6));
    seller.tactics.lineup = seller.tactics.lineup.map((id) => (id === p.id ? null : id));
    seller.tactics.subs = seller.tactics.subs.filter((id) => id !== p.id);
  }
  buyer.finances.balance -= fee;
  buyer.finances.transferBudget = Math.max(0, buyer.finances.transferBudget - fee);
  buyer.finances.seasonExpense.transfers += fee;
  if (w.manager.clubId !== buyer.id) buyer.finances.wageBudget = Math.max(buyer.finances.wageBudget, clubWageBill(w, buyer) + wage);
  p.wage = wage;
  p.contractEnd = w.season + years;
  p.morale = Math.min(20, p.morale + 3);
  p.squadNo = 0;
  p.loanListed = false;
  movePlayer(w, p, buyer.id);
  w.shortlist = w.shortlist.filter((id) => id !== p.id);
  assignSquadNumbers(getSquad(w, buyer.id));
  // cancel other offers for this player
  for (const o of w.offers) if (o.playerId === p.id && (o.status === 'pending' || o.status === 'accepted' || o.status === 'countered')) o.status = 'collapsed';
}

// ---------------------------------------------------------------------------
// User selling
// ---------------------------------------------------------------------------

export function acceptIncomingOffer(w: World, o: TransferOffer): string {
  const p = w.players[o.playerId];
  const buyer = w.clubs[o.toClub];
  if (!p || p.clubId !== w.manager.clubId) return 'This offer is no longer valid.';
  if (!transferWindowOpen(w.date)) return 'The transfer window has closed.';
  const wage = Math.max(p.wage, expectedWage(p, buyer.reputation));
  executeTransfer(w, p, userClub(w), buyer, o.fee, wage, p.age >= 30 ? 2 : 4);
  o.status = 'completed';
  addNews(w, { kind: 'transfer', title: `${p.name} sold`, body: `${p.name} has completed his move to ${buyer.name} for ${fmtMoney(o.fee)}.`, playerId: p.id });
  return `${p.name} has joined ${buyer.name} for ${fmtMoney(o.fee)}.`;
}

export function rejectIncomingOffer(o: TransferOffer) {
  o.status = 'rejected';
}

export function counterIncomingOffer(w: World, o: TransferOffer, fee: number, rng: Rng): string {
  const p = w.players[o.playerId];
  const buyer = w.clubs[o.toClub];
  const max = p.value * (1.25 + rng.next() * 0.35) * (buyer.reputation > 85 ? 1.2 : 1);
  if (fee <= max && fee <= buyer.finances.transferBudget * 1.2) {
    o.fee = roundMoney(fee);
    return acceptIncomingOffer(w, o);
  }
  o.status = 'rejected';
  addNews(w, { kind: 'transfer', title: `${buyer.name} walk away`, body: `${buyer.name} have decided not to meet your valuation of ${fmtMoney(fee)} for ${p.name}.`, playerId: p.id });
  return `${buyer.name} are not prepared to pay ${fmtMoney(fee)}.`;
}

export function releasePlayer(w: World, p: Player): string {
  const club = userClub(w);
  const weeksLeft = Math.max(0, (p.contractEnd - w.season) * 52 - Math.floor(diffDays(w.date, `${w.season}-07-01`) / 7));
  const payoff = roundMoney(p.wage * weeksLeft * 0.5);
  club.finances.balance -= payoff;
  club.finances.seasonExpense.other += payoff;
  club.tactics.lineup = club.tactics.lineup.map((id) => (id === p.id ? null : id));
  club.tactics.subs = club.tactics.subs.filter((id) => id !== p.id);
  movePlayer(w, p, null);
  p.transferListed = false;
  addNews(w, { kind: 'contract', title: `${p.name} released`, body: `${p.name} has been released. His contract was paid off for ${fmtMoney(payoff)}.`, playerId: p.id });
  return `${p.name} released (${fmtMoney(payoff)} pay-off).`;
}

export function renewContract(w: World, p: Player, wage: number, years: number): { ok: boolean; msg: string } {
  const club = userClub(w);
  const r = negotiate(w, p, club, wage, years);
  if (!r.ok) return r;
  p.wage = roundMoney(wage);
  p.contractEnd = w.season + years;
  p.morale = Math.min(20, p.morale + 2);
  addNews(w, { kind: 'contract', title: `${p.name} signs new deal`, body: `${p.name} has signed a new contract until June ${p.contractEnd}.`, playerId: p.id });
  return { ok: true, msg: `${p.short} has signed a new ${years}-year contract.` };
}

// ---------------------------------------------------------------------------
// Daily transfer activity
// ---------------------------------------------------------------------------

export function processOffersDaily(w: World, rng: Rng) {
  for (const o of w.offers) {
    if (o.userBuying && o.status === 'pending' && diffDays(w.date, o.respondBy) >= 0) respondToUserBid(w, o, rng);
    // AI bids for the user's players expire after a week
    if (!o.userBuying && o.status === 'pending' && diffDays(w.date, o.respondBy) > 0) {
      o.status = 'withdrawn';
    }
    // accepted bids lapse if the user never agrees terms
    if (o.userBuying && (o.status === 'accepted' || o.status === 'countered') && diffDays(w.date, o.date) > 14) o.status = 'collapsed';
  }
  if (w.offers.length > 200) w.offers = w.offers.filter((o) => ['pending', 'accepted', 'countered'].includes(o.status) || diffDays(w.date, o.date) < 60);
}

function needScore(w: World, club: Club, pos: Pos): number {
  const squad = getSquad(w, club.id);
  const g = posGroup(pos);
  const inGroup = squad.filter((p) => posGroup(p.positions[0]) === g).sort((a, b) => b.ability - a.ability);
  const want = g === 'GK' ? 2 : g === 'CB' ? 4 : g === 'ST' ? 3 : 3;
  const best = inGroup[0]?.ability ?? 40;
  return (want - inGroup.length) * 5 + (club.reputation * 0.9 - best);
}

export function aiTransferDay(w: World, rng: Rng) {
  if (!transferWindowOpen(w.date)) return;
  const clubs = Object.values(w.clubs).filter((c) => c.id !== w.manager.clubId);
  const deadline = w.date.endsWith('-08-31') || w.date.endsWith('-09-01') || w.date.endsWith('-02-01') || w.date.endsWith('-02-02');
  const attempts = deadline ? 8 : 3;
  for (let k = 0; k < attempts; k++) {
    const buyer = rng.pick(clubs);
    if (buyer.finances.transferBudget < 500_000) continue;
    const squad = getSquad(w, buyer.id);
    if (squad.length >= 32) continue;
    const pos = rng.pick<Pos>(['GK', 'DC', 'DR', 'DL', 'DM', 'MC', 'AMC', 'AMR', 'AML', 'ST']);
    if (needScore(w, buyer, pos) < 0 && rng.chance(0.7)) continue;
    const minAbility = Math.max(55, buyer.reputation * 0.88 - 4);
    const maxAbility = buyer.reputation * 0.98 + 4;
    // candidates: players from smaller clubs, or listed/unhappy players
    const pool = Object.values(w.players).filter((p) => {
      if (p.clubId === buyer.id || p.retiring) return false;
      if (posGroup(p.positions[0]) !== posGroup(pos)) return false;
      if (p.ability < minAbility || p.ability > maxAbility) return false;
      if (p.clubId === w.manager.clubId) return false; // AI bids for user players go through offers
      if (p.clubId != null) {
        const c = w.clubs[p.clubId];
        if (c.reputation > buyer.reputation + 3 && !p.transferListed) return false;
        if (diffDays(w.date, p.joined) < 150) return false;
      }
      return p.age <= 31;
    });
    if (!pool.length) continue;
    const target = rng.weighted(pool, (p) => (p.clubId == null ? 3 : 1) * (p.transferListed ? 3 : 1) * Math.max(1, p.potential - 60));
    const fee = target.clubId == null ? 0 : askingPrice(w, target);
    if (fee > buyer.finances.transferBudget) continue;
    const seller = target.clubId != null ? w.clubs[target.clubId] : null;
    if (seller) {
      const sellerSquad = getSquad(w, seller.id);
      if (sellerSquad.length <= 20) continue;
    }
    const wage = expectedWage(target, buyer.reputation);
    executeTransfer(w, target, seller, buyer, fee, wage, target.age >= 30 ? 2 : rng.int(3, 5));
    const important = target.ability >= 80 || (seller && (seller.leagueId === userClub(w).leagueId)) || buyer.leagueId === userClub(w).leagueId;
    if (important) {
      addNews(w, {
        kind: 'transfer',
        title: `${target.name} joins ${buyer.name}`,
        body: seller
          ? `${buyer.name} have signed ${target.name} from ${seller.name} for ${fmtMoney(fee)}.`
          : `${buyer.name} have signed free agent ${target.name}.`,
        playerId: target.id,
        read: true,
      });
    }
  }
}

/** AI clubs occasionally bid for the user's players */
export function aiBidsForUserPlayers(w: World, rng: Rng) {
  if (!transferWindowOpen(w.date)) return;
  const club = userClub(w);
  const squad = getSquad(w, club.id);
  if (!rng.chance(squad.some((p) => p.transferListed) ? 0.12 : 0.04)) return;
  const target = rng.weighted(squad, (p) => (p.transferListed ? 6 : 1) * Math.max(1, p.ability - 55) * (diffDays(w.date, p.joined) < 150 ? 0.1 : 1));
  if (!target) return;
  if (w.offers.some((o) => o.playerId === target.id && o.status === 'pending')) return;
  const buyers = Object.values(w.clubs).filter(
    (c) => c.id !== club.id && c.reputation >= target.ability - 8 && c.reputation <= target.ability + 20 && c.finances.transferBudget > target.value * 0.8,
  );
  if (!buyers.length) return;
  const buyer = rng.pick(buyers);
  const fee = roundMoney(target.value * (target.transferListed ? 0.8 : 0.95) * (0.9 + rng.next() * 0.35));
  const o: TransferOffer = {
    id: w.nextId.offer++,
    playerId: target.id,
    fromClub: club.id,
    toClub: buyer.id,
    fee,
    status: 'pending',
    date: w.date,
    respondBy: addDays(w.date, 7),
    userBuying: false,
  };
  w.offers.push(o);
  addNews(w, {
    kind: 'offer',
    title: `Offer for ${target.name}`,
    body: `${buyer.name} have made an offer of ${fmtMoney(fee)} for ${target.name}. The offer will be withdrawn in 7 days.`,
    offerId: o.id,
    playerId: target.id,
  });
}

/** AI clubs renew contracts of players they want to keep */
export function aiRenewals(w: World, rng: Rng) {
  for (const club of Object.values(w.clubs)) {
    if (club.id === w.manager.clubId) continue;
    const squad = getSquad(w, club.id).sort((a, b) => b.ability - a.ability);
    squad.forEach((p, rank) => {
      if (p.contractEnd > w.season + 1) return;
      const wanted = rank < 20 && p.age <= 32;
      if (wanted && rng.chance(0.75)) {
        p.contractEnd = w.season + 1 + (p.age >= 30 ? 1 : rng.int(2, 4));
        p.wage = Math.max(p.wage, expectedWage(p, club.reputation));
      }
    });
  }
}

/** AI clubs sign free agents to keep squads healthy */
export function aiSignFreeAgents(w: World, rng: Rng) {
  const free = getFreeAgents(w).filter((p) => !p.retiring);
  if (!free.length) return;
  for (const club of Object.values(w.clubs)) {
    if (club.id === w.manager.clubId) continue;
    const squad = getSquad(w, club.id);
    if (squad.length >= 22) continue;
    const need = 22 - squad.length;
    for (let i = 0; i < need; i++) {
      const cands = free.filter((p) => p.clubId == null && p.ability <= club.reputation + 2 && p.ability >= club.reputation * 0.7);
      if (!cands.length) break;
      const p = rng.weighted(cands, (x) => x.ability - 40);
      executeTransfer(w, p, null, club, 0, expectedWage(p, club.reputation), rng.int(1, 3));
    }
  }
}

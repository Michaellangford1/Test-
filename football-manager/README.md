# Gaffer '05

A mobile-first football management game in the spirit of **Football Manager 2005** — text
commentary, FM-style 1–20 attributes, the grey/blue skin — running on a **modern 2025/26
player database**. It's an installable, offline-capable web app (PWA), so it plays on any phone.

> Unofficial fan project. Not affiliated with Sports Interactive, SEGA, or any club or league.

## What's in it

- **Database**: 6 leagues, 120 clubs, ~2,600 real players, squads as at the start of the
  2025/26 season (after the summer 2025 window): Premier League, Championship, La Liga,
  Serie A, Bundesliga, Ligue 1. Each player has position(s), age, nationality, ability,
  potential and optional style traits; the full FM-style attribute profile (technical, mental,
  physical, goalkeeping) is derived from those.
- **Match engine**: minute-by-minute simulation with live text commentary, a mini pitch, stats,
  live player ratings, fatigue, cards, injuries, penalties, extra time and shootouts. Watch at
  four speeds, or take an instant result. Make up to 5 subs and change mentality, pressing and
  passing mid-game.
- **Tactics**: 10 formations, tap-to-pick XI on a pitch view, 9-man bench, mentality / passing /
  pressing / tempo, captain and set-piece takers, or let the assistant pick.
- **Transfers**: search the whole database, shortlist, bid (clubs accept, reject or counter),
  negotiate wages and contract length, sign free agents; AI clubs trade with each other and bid
  for your players. Summer and January windows.
- **Club management**: contracts and renewals, releases, transfer/wage budgets, gate receipts,
  TV and prize money, training focus, board confidence (you can be sacked, then take a job
  elsewhere).
- **Seasons**: full fixtures for every league, Championship play-offs (with a Wembley final),
  promotion/relegation between the Premier League and Championship, player development and
  decline, retirements, youth intakes each March, history and honours.
- **Database editor** (from the main menu): edit clubs and players, move players between clubs,
  export/import the database as JSON — handy for keeping squads up to date.
- **Saves**: multiple save slots stored on the device (IndexedDB), autosaved after each
  Continue and each match. Works offline after the first load.

## Play it on your phone

```bash
npm install
npm run build        # outputs dist/
```

Host `dist/` on any static HTTPS host (GitHub Pages, Netlify, Cloudflare Pages…), open it on
your phone and use **Add to Home Screen** / **Install app**. For a sub-path host such as GitHub
Pages, build with `BASE_PATH=/your-repo/ npm run build`.

For a quick local try on the same Wi-Fi: `npm run dev -- --host` and open the printed network
URL on your phone.

## Develop

```bash
npm run dev      # dev server
npm test         # engine balance + two-season simulation tests
npm run lint     # typecheck
```

### Layout

- `src/data/leagues/*.ts` — the database, one line per player:
  `Name|Positions|Age|Nat|Ability[/Potential][|traits]`
- `src/game/` — pure game logic (no UI): world building, attributes, match engine,
  transfers, finances, progression, season cycle, daily loop
- `src/store/` — Zustand game store and Dexie (IndexedDB) persistence
- `src/screens/`, `src/ui/` — React + Tailwind mobile UI

## Notes on the data

The player data is a best-effort snapshot of 2025/26 squads with subjective ability ratings.
Some transfers or ratings will be out of date or wrong — fix them in the in-app Database Editor
(changes apply to new games) or edit the league files directly. Smaller squads are topped up
with generated players at game start.

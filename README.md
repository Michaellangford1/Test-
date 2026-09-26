> **Also in this repo:** [`football-manager/`](football-manager/) — *Gaffer '05*, a mobile football management game in the spirit of FM2005 with a 2025/26 player database.

# House Manual

An **offline-first Progressive Web App** — a personal, step-by-step DIY manual for one specific
house. Content is created and improved through a **paste round-trip with Claude**: the app itself
makes **zero network requests** at runtime, and everything (guides, reference notes, photos) lives
on-device in IndexedDB.

Built for a homeowner on an Android phone, often mid-task with dirty hands: large type, huge touch
targets, and a screen that stays awake in **Task Mode**.

## Highlights

- **Offline-first** — after one online load, every feature works in airplane mode. No runtime
  `fetch`, no analytics, no CDN fonts, no external images.
- **Task Mode** — the flagship reading experience. One step per screen with giant Previous/Next
  buttons, a scrolling large-type alternative, oversized checkboxes, a progress bar, an adjustable
  22–30 px text size, and a screen **Wake Lock** so the display never sleeps mid-job.
- **Bespoke by default** — a structured **House Profile** is injected into every prompt the app
  composes for Claude, so generated guides are tailored to your house automatically.
- **Private & portable** — all data stays on the device; one-tap zip **export / restore**.
- Seeded on first run with a full House Profile, six reference stubs, and **twelve complete DIY
  guides**.

## The Claude round-trip

The app never calls an API. Instead:

1. Tap **Create with Claude** (or **Improve** on a guide) and type a short request.
2. The app composes a full prompt — House Profile JSON + schema + rules + your request — and opens
   the Android **share sheet** (Web Share API) so it lands in the Claude app. Clipboard copy is the
   fallback.
3. Claude replies with a single fenced `json` block.
4. Copy the reply, return to the app, and paste it into **Import**.
5. The app validates the payload (zod), shows a full preview, and saves it — as a new item, or as
   an update when the `id` matches an existing one.

Manual editing keeps the LLM optional: full CRUD for guides and reference items is built in.

## Tech

Vite + React 18 + TypeScript · Tailwind CSS · lucide-react · Dexie (IndexedDB) · zod · MiniSearch ·
JSZip · react-markdown (raw HTML disabled) · vite-plugin-pwa (Workbox, `autoUpdate`).

Routing uses `HashRouter`, so static hosting needs no rewrite rules. Maskable PWA icons are
generated at build time by `scripts/generate-icons.mjs` (a dependency-free PNG encoder).

## Develop

```bash
npm install
npm run dev        # start the dev server
npm run build      # typecheck + generate icons + production build to dist/
npm run preview    # preview the production build locally
```

## Deploy

Any free static HTTPS host works — hosting is only the install/update channel; after first load the
app runs fully offline and no personal data is ever transmitted.

```bash
npm run build
# then upload the contents of dist/ to your host
```

**GitHub Pages (project site under a sub-path):** set the base path so asset URLs resolve.

```bash
BASE_PATH=/your-repo-name/ npm run build
# publish dist/ to the gh-pages branch (or via GitHub Actions)
```

**Netlify:** build command `npm run build`, publish directory `dist`.

## Install on Android (Add to Home Screen)

1. Open the deployed site in **Chrome on Android** (must be HTTPS).
2. Tap the **⋮** menu → **Add to Home screen** (or **Install app** if offered).
3. Launch it from the home screen — it opens standalone, in portrait, and works offline.
4. On first run the app requests **persistent storage**; its status is shown in **Settings**.

## Data & backup

- All content lives in IndexedDB on the device. Photos are compressed on capture (long edge
  ≤ 1600 px, JPEG ≈ 0.8) with a 320 px thumbnail, and stored as blobs.
- **Settings → Export backup** produces `house-manual-backup-YYYY-MM-DD.zip` containing `data.json`
  plus `/photos/{id}.jpg` and `/thumbs/{id}.jpg`.
- **Settings → Restore** offers **Replace all** or **Merge** (imported items win on id clash).

## Content exchange format (schema v1)

Every payload is a single JSON object with an envelope:

```json
{ "homeManual": 1, "type": "guide" }
```

where `type` is `"guide"`, `"reference"` or `"profile"`. See `src/types/schema.ts` for the full
zod schema and `Settings → Copy blank schema` for a ready-to-paste prompt for manual Claude chats.
Photos are never part of the exchange format — they are attached in-app.

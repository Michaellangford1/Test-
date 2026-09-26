# Pip's Super Quest

A side-scrolling platform game for **UK Year 1** children. Pip the fox runs and jumps through four
worlds. Bumping a **?** block opens a short phonics or maths challenge, and right answers give coins,
hearts and star power.

## Play

No build step or install is needed. Open `game/index.html` in a browser, or serve the folder:

```sh
cd game && python3 -m http.server 8000   # then visit http://localhost:8000
```

| Action | Keyboard | Touch |
| --- | --- | --- |
| Move | ← → or A D | ◀ ▶ buttons |
| Jump (hold for higher) | Space, ↑, W or Z | ⤒ button |
| Answer | 1, 2, 3 or click | tap an answer |
| Pause | P or Esc | ❚❚ |

## Learning content

The title screen lets you choose **Phonics**, **Maths** or **Both**. The content gets harder in each world:

| World | Phonics | Maths |
| --- | --- | --- |
| Meadow | Phase 3: ch sh th ng ai ee oa oo, CVC decoding | counting to 10, bonds to 10, adding within 10, one more/less, 2D shapes |
| Desert | Phase 3: igh ar or ur ow oi ear air er | counting to 20, add/subtract, counting in 2s, 5s and 10s |
| Snow | Phase 5: ay ou ie ea oy ir aw ph ew ue | bonds to 20, tens and ones, 3D shapes, numbers to 100 |
| Crystal | Split digraphs a‑e i‑e o‑e u‑e, plus Phase 5 | missing numbers, place value to 99, comparing |

Phonics question types:
- Spot the sound
- Missing sound, with a picture clue
- Read and match, using UK-style sound buttons
- Real or alien words, in the style of the Phonics Screening Check

Children get a second try. After that, the answer is shown and explained. Progress, stars and
per-skill scores are saved in the browser. You can see them under **For grown-ups**.

## Code

Plain JavaScript with classic scripts, so it also runs from `file://`. All graphics are drawn in
code with Canvas 2D, and all sound is made with Web Audio.

- `js/content.js`: word bank and question generators
- `js/art.js`: tiles, scenery, characters and parallax backgrounds
- `js/levels.js`: chunk-based level builder (seeded, so every level is always the same)
- `js/game.js`: physics, enemies, camera, HUD and screens
- `js/quiz.js`: the question pop-up
- `js/audio.js`: sound effects and music

Pip, the Grumblob and bee enemies, the music and all the art are original. The game is inspired by
classic platformers but uses no third-party characters or assets.

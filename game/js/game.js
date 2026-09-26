// Main game: loop, physics, entities, camera, screens and saving.
(function (PQ) {
  const T = PQ.T, VIEW_H = PQ.VIEW_H;
  const { clamp, el } = PQ;
  const Art = PQ.Art;

  const SOLID = new Set(['#', 'X', 'B', '?', 'U', 'p']);
  const PHYS = {
    gravity: 2600, holdGravity: 0.58, maxFall: 900, jumpV: 700,
    accel: 2100, airAccel: 1500, friction: 2400, maxSpeed: 290,
    coyote: 0.1, jumpBuffer: 0.13, stompBounce: 520,
  };
  const MAX_HEARTS = 5, START_HEARTS = 3;
  const STEP = 1 / 120;

  // ------------------------------------------------------------------------------------------
  // Save data
  // ------------------------------------------------------------------------------------------
  const save = Object.assign(
    { unlocked: 0, stars: {}, mode: 'both', stats: {}, sound: true, music: true, coins: 0 },
    PQ.store.load() || {}
  );
  const persist = () => PQ.store.save(save);

  // ------------------------------------------------------------------------------------------
  // Canvas & sizing
  // ------------------------------------------------------------------------------------------
  const canvas = el('game');
  const ctx = canvas.getContext('2d');
  let viewW = 1024, scale = 1, dpr = 1, S = 1;
  let tiles = null;

  function resize() {
    const W = window.innerWidth, H = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    viewW = clamp(Math.round((VIEW_H * W) / H), 760, 1400);
    scale = Math.min(W / viewW, H / VIEW_H);
    S = scale * dpr;
    const cssW = Math.round(viewW * scale), cssH = Math.round(VIEW_H * scale);
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    const stage = el('stage');
    stage.style.width = cssW + 'px';
    stage.style.height = cssH + 'px';
    stage.style.setProperty('--ui-scale', Math.max(0.55, Math.min(1.25, scale)));
    if (world) tiles = new Art.TileCache(world.theme, S);
  }

  // ------------------------------------------------------------------------------------------
  // Input
  // ------------------------------------------------------------------------------------------
  const input = { left: false, right: false, jump: false, jumpPressed: false };
  const KEYS = {
    ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right',
    ArrowUp: 'jump', KeyW: 'jump', Space: 'jump', KeyZ: 'jump',
  };
  window.addEventListener('keydown', (e) => {
    PQ.Audio.unlock();
    if (PQ.Quiz.active) {
      if (PQ.Quiz.handleKey(e)) e.preventDefault();
      return;
    }
    if (e.code === 'Escape' || e.code === 'KeyP') {
      if (state === 'play') pause();
      else if (state === 'paused') resume();
      return;
    }
    const k = KEYS[e.code];
    if (k && state === 'play') {
      if (k === 'jump' && !input.jump) input.jumpPressed = true;
      input[k] = true;
      e.preventDefault();
    }
  });
  window.addEventListener('keyup', (e) => {
    const k = KEYS[e.code];
    if (k) input[k] = false;
  });
  window.addEventListener('blur', () => { input.left = input.right = input.jump = false; });

  function bindTouch(id, key) {
    const b = el(id);
    const on = (e) => {
      e.preventDefault();
      PQ.Audio.unlock();
      if (key === 'jump' && !input.jump) input.jumpPressed = true;
      input[key] = true;
      b.classList.add('down');
    };
    const off = (e) => {
      e.preventDefault();
      input[key] = false;
      b.classList.remove('down');
    };
    b.addEventListener('pointerdown', on);
    b.addEventListener('pointerup', off);
    b.addEventListener('pointercancel', off);
    b.addEventListener('pointerleave', off);
    b.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  // ------------------------------------------------------------------------------------------
  // World state
  // ------------------------------------------------------------------------------------------
  let state = 'title';     // title | map | play | quiz | paused | finish | results
  let world = null;        // current level runtime
  let camX = 0, time = 0;
  let demo = null;         // scenery used behind the menus

  function makeWorld(levelIndex) {
    const def = PQ.Levels.LEVELS[levelIndex];
    const lvl = PQ.Levels.build(def);
    const theme = Art.THEMES[def.theme];
    const w = {
      index: levelIndex, def, lvl, theme,
      tiles: lvl.tiles,
      bumps: new Map(),
      coins: lvl.coins.map((c) => ({ x: c.x * T + T / 2, y: c.y * T + T / 2, taken: false, phase: Math.random() * 6 })),
      enemies: lvl.enemies.map(spawnEnemy),
      checkpoints: lvl.checkpoints.map((c) => ({ x: c.x * T + T / 2, y: (c.y + 1) * T, active: false })),
      items: [],
      particles: [],
      popups: [],
      flag: lvl.flag ? { x: lvl.flag.x * T + T / 2, groundY: (lvl.flag.y + 1) * T, flagY: (lvl.flag.y + 1) * T - T * 7.3 } : null,
      respawn: { x: lvl.spawn.x * T + 6, y: (lvl.spawn.y + 1) * T - 50 },
      stats: { asked: 0, firstTry: 0, correct: 0, coins: 0, skills: {} },
      pendingQuiz: null,
      finishT: 0,
    };
    w.player = makePlayer(w.respawn.x, w.respawn.y);
    return w;
  }

  function spawnEnemy(e) {
    if (e.kind === 'bee') {
      return { kind: 'bee', x: e.x * T + 6, y: e.y * T + 8, w: 36, h: 30, vx: -1, baseX: e.x * T + 6, baseY: e.y * T + 8, t: Math.random() * 6, dead: false, deadT: 0, active: false };
    }
    return { kind: 'blob', x: e.x * T + 4, y: (e.y + 1) * T - 34, w: 40, h: 34, vx: -60, vy: 0, dead: false, deadT: 0, onGround: false, active: false };
  }

  function makePlayer(x, y) {
    return {
      x, y, w: 34, h: 50, vx: 0, vy: 0, dir: 1, onGround: false,
      coyote: 0, jumpBuf: 0, invuln: 0, star: 0, runPhase: 0, sx: 1, sy: 1,
      hearts: START_HEARTS, coins: 0, wasGround: false,
    };
  }

  // ------------------------------------------------------------------------------------------
  // Tile helpers
  // ------------------------------------------------------------------------------------------
  const tileAt = (tx, ty) => {
    if (!world || tx < 0 || tx >= world.lvl.W) return tx < 0 ? 'X' : '.';
    if (ty < 0 || ty >= PQ.ROWS) return '.';
    return world.tiles[ty][tx];
  };
  const isSolid = (tx, ty) => SOLID.has(tileAt(tx, ty));

  // Move an entity with tile collisions. Returns collision info.
  function moveBody(b, dt, opts = {}) {
    const info = { hitX: false, landed: false, headTiles: [] };
    // X
    b.x += b.vx * dt;
    let y0 = Math.floor(b.y / T), y1 = Math.floor((b.y + b.h - 0.01) / T);
    if (b.vx > 0) {
      const tx = Math.floor((b.x + b.w) / T);
      for (let ty = y0; ty <= y1; ty++) if (isSolid(tx, ty)) { b.x = tx * T - b.w; info.hitX = true; break; }
    } else if (b.vx < 0) {
      const tx = Math.floor(b.x / T);
      for (let ty = y0; ty <= y1; ty++) if (isSolid(tx, ty)) { b.x = (tx + 1) * T; info.hitX = true; break; }
    }
    if (info.hitX) b.vx = 0;
    // Y
    const prevBottom = b.y + b.h;
    b.y += b.vy * dt;
    const x0 = Math.floor((b.x + 1) / T), x1 = Math.floor((b.x + b.w - 1) / T);
    b.onGround = false;
    if (b.vy >= 0) {
      const ty = Math.floor((b.y + b.h) / T);
      for (let tx = x0; tx <= x1; tx++) {
        const t = tileAt(tx, ty);
        if (SOLID.has(t) || (t === '=' && !opts.dropThrough && prevBottom <= ty * T + 0.5)) {
          b.y = ty * T - b.h;
          b.vy = 0;
          b.onGround = true;
          info.landed = true;
          break;
        }
      }
    } else {
      const ty = Math.floor(b.y / T);
      for (let tx = x0; tx <= x1; tx++) if (isSolid(tx, ty)) info.headTiles.push([tx, ty]);
      if (info.headTiles.length) {
        b.y = (ty + 1) * T;
        b.vy = 0;
      }
    }
    return info;
  }

  const overlap = (a, b, shrink = 0) =>
    a.x + shrink < b.x + b.w && a.x + a.w - shrink > b.x && a.y + shrink < b.y + b.h && a.y + a.h - shrink > b.y;

  // ------------------------------------------------------------------------------------------
  // Effects
  // ------------------------------------------------------------------------------------------
  function burst(x, y, n, colors, speed = 220, life = 0.6, grav = 900, size = 4) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, s = speed * (0.4 + Math.random() * 0.6);
      world.particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - speed * 0.3, life, max: life, grav, size: size * (0.6 + Math.random() * 0.8), color: PQ.pick(colors), kind: 'dot' });
    }
  }
  function dust(x, y, n = 6) {
    for (let i = 0; i < n; i++) {
      world.particles.push({ x: x + (Math.random() - 0.5) * 20, y, vx: (Math.random() - 0.5) * 120, vy: -Math.random() * 60, life: 0.4, max: 0.4, grav: 0, size: 5 + Math.random() * 5, color: 'rgba(255,255,255,.75)', kind: 'puff' });
    }
  }
  function sparkle(x, y) {
    for (let i = 0; i < 5; i++) {
      world.particles.push({ x: x + (Math.random() - 0.5) * 24, y: y + (Math.random() - 0.5) * 24, vx: 0, vy: -40, life: 0.5, max: 0.5, grav: 0, size: 5, color: '#fff7a8', kind: 'star' });
    }
  }
  function popup(x, y, text, color = '#fff') {
    world.popups.push({ x, y, text, color, life: 1 });
  }

  // ------------------------------------------------------------------------------------------
  // Gameplay events
  // ------------------------------------------------------------------------------------------
  function collectCoin(c) {
    c.taken = true;
    world.player.coins++;
    world.stats.coins++;
    PQ.Audio.play('coin');
    sparkle(c.x, c.y);
    updateHud();
  }

  function hurtPlayer() {
    const p = world.player;
    if (p.invuln > 0 || p.star > 0 || state !== 'play') return;
    p.hearts--;
    PQ.Audio.play('hurt');
    p.invuln = 1.6;
    p.vy = -380;
    p.vx = -p.dir * 200;
    burst(p.x + p.w / 2, p.y + 20, 10, ['#ff6b81', '#ffd6de'], 200);
    if (p.hearts <= 0) respawn(true);
    updateHud();
  }

  function respawn(outOfHearts) {
    const p = world.player;
    showToast(outOfHearts ? 'Oops! Back to the checkpoint – you can do it!' : 'Whoops! Watch out for gaps.');
    const coins = p.coins;
    const hearts = outOfHearts ? START_HEARTS : Math.max(1, p.hearts);
    Object.assign(p, makePlayer(world.respawn.x, world.respawn.y), { coins, hearts, invuln: 1.5 });
    camX = clamp(p.x - viewW * 0.35, 0, world.lvl.W * T - viewW);
    updateHud();
  }

  function stomp(e, p) {
    e.dead = true;
    e.deadT = 0;
    p.vy = -(input.jump ? PHYS.stompBounce * 1.35 : PHYS.stompBounce);
    p.onGround = false;
    PQ.Audio.play('stomp');
    burst(e.x + e.w / 2, e.y + 6, 10, ['#fff', '#ffe066', '#c9a2ff'], 180, 0.45);
    popup(e.x + e.w / 2, e.y - 10, 'Pop!', '#fff');
  }

  function hitHead(tx, ty) {
    const t = world.tiles[ty][tx];
    world.bumps.set(tx + ',' + ty, 0.2);
    // Knock out enemies standing on the bumped tile
    world.enemies.forEach((e) => {
      if (!e.dead && e.kind === 'blob' && Math.abs(e.y + e.h - ty * T) < 4 && e.x + e.w > tx * T && e.x < (tx + 1) * T) {
        e.dead = true;
        e.flip = true;
        PQ.Audio.play('stomp');
      }
    });
    if (t === '?') {
      world.tiles[ty][tx] = 'U';
      PQ.Audio.play('block');
      burst(tx * T + T / 2, ty * T, 8, ['#ffe066', '#fff'], 160, 0.4);
      world.pendingQuiz = { tx, ty, timer: 0.25 };
    } else {
      PQ.Audio.play('bump');
    }
  }

  function openQuiz(tx, ty) {
    state = 'quiz';
    input.left = input.right = input.jump = false;
    PQ.Audio.duck(true);
    const q = PQ.Content.next(world.def.world, save.mode);
    world.stats.asked++;
    PQ.Quiz.open(q, (res) => {
      PQ.Audio.duck(false);
      recordAnswer(q, res);
      reward(tx, ty, res);
      state = 'play';
      last = performance.now();
    });
  }

  function recordAnswer(q, res) {
    const first = res.correct && res.attempts === 1;
    if (res.correct) world.stats.correct++;
    if (first) world.stats.firstTry++;
    const s = (world.stats.skills[q.skill] = world.stats.skills[q.skill] || { topic: q.topic, right: 0, total: 0 });
    s.total++;
    if (first) s.right++;
    const g = (save.stats[q.skill] = save.stats[q.skill] || { topic: q.topic, right: 0, total: 0 });
    g.total++;
    if (first) g.right++;
    persist();
    updateHud();
  }

  function reward(tx, ty, res) {
    const x = tx * T + T / 2, y = ty * T;
    const p = world.player;
    const nCoins = res.correct ? (res.attempts === 1 ? 5 : 3) : 1;
    for (let i = 0; i < nCoins; i++) {
      world.items.push({ kind: 'flycoin', x, y: y - 10, vx: (i - (nCoins - 1) / 2) * 60, vy: -520 - Math.random() * 80, t: 0 });
    }
    if (res.correct) {
      const wantHeart = p.hearts < START_HEARTS || (p.hearts < MAX_HEARTS && Math.random() < 0.4);
      world.items.push({ kind: wantHeart ? 'heart' : 'star', x: x - 16, y: y - 32, w: 32, h: 32, vx: 0, vy: -200, emerge: 0.35, t: 0, onGround: false });
      popup(x, y - 30, res.attempts === 1 ? '★ Super! ★' : 'Well done!', '#fff3a0');
    } else {
      popup(x, y - 30, 'Keep going!', '#fff');
    }
  }

  function collectItem(it) {
    const p = world.player;
    if (it.kind === 'heart') {
      p.hearts = Math.min(MAX_HEARTS, p.hearts + 1);
      PQ.Audio.play('heart');
      popup(it.x + 16, it.y, '+1 ♥', '#ff8a9a');
    } else if (it.kind === 'star') {
      p.star = 8;
      PQ.Audio.play('power');
      popup(it.x + 16, it.y, 'Star power!', '#fff3a0');
    }
    burst(it.x + 16, it.y + 16, 12, ['#fff', '#ffe066', '#ff8a9a'], 200, 0.5);
    updateHud();
  }

  // ------------------------------------------------------------------------------------------
  // Update
  // ------------------------------------------------------------------------------------------
  function updatePlayer(dt) {
    const p = world.player;
    const dir = (input.right ? 1 : 0) - (input.left ? 1 : 0);

    if (dir) {
      const acc = p.onGround ? PHYS.accel : PHYS.airAccel;
      if (Math.sign(p.vx) === -dir) p.vx += dir * PHYS.friction * dt; // quick turn
      p.vx += dir * acc * dt;
      p.vx = clamp(p.vx, -PHYS.maxSpeed, PHYS.maxSpeed);
      p.dir = dir;
    } else {
      const f = (p.onGround ? PHYS.friction : 500) * dt;
      p.vx = Math.abs(p.vx) <= f ? 0 : p.vx - Math.sign(p.vx) * f;
    }

    if (input.jumpPressed) { p.jumpBuf = PHYS.jumpBuffer; input.jumpPressed = false; }
    p.jumpBuf -= dt;
    p.coyote = p.onGround ? PHYS.coyote : p.coyote - dt;
    if (p.jumpBuf > 0 && p.coyote > 0) {
      p.vy = -PHYS.jumpV;
      p.jumpBuf = 0;
      p.coyote = 0;
      p.onGround = false;
      p.sx = 0.8; p.sy = 1.2;
      PQ.Audio.play('jump');
      dust(p.x + p.w / 2, p.y + p.h, 4);
    }

    const g = p.vy < 0 && input.jump ? PHYS.gravity * PHYS.holdGravity : PHYS.gravity;
    p.vy = Math.min(PHYS.maxFall, p.vy + g * dt);

    const info = moveBody(p, dt);
    if (info.headTiles.length) {
      // choose the tile nearest Pip's centre
      const cx = p.x + p.w / 2;
      info.headTiles.sort((a, b) => Math.abs(a[0] * T + T / 2 - cx) - Math.abs(b[0] * T + T / 2 - cx));
      const [tx, ty] = info.headTiles[0];
      hitHead(tx, ty);
    }
    if (info.landed && !p.wasGround) {
      p.sx = 1.2; p.sy = 0.82;
      dust(p.x + p.w / 2, p.y + p.h, 5);
    }
    p.wasGround = p.onGround;
    if (p.x < 0) { p.x = 0; p.vx = 0; }

    // squash & stretch relax
    p.sx += (1 - p.sx) * Math.min(1, dt * 12);
    p.sy += (1 - p.sy) * Math.min(1, dt * 12);
    p.runPhase += Math.abs(p.vx) * dt * 0.055;
    if (p.invuln > 0) p.invuln -= dt;
    if (p.star > 0) {
      p.star -= dt;
      if (Math.random() < 0.3) sparkle(p.x + p.w / 2, p.y + p.h / 2);
    }

    // Fell into a pit
    if (p.y > VIEW_H + 80) {
      PQ.Audio.play('fall');
      p.hearts--;
      respawn(p.hearts <= 0);
    }

    // Coins
    for (const c of world.coins) {
      if (!c.taken && Math.abs(c.x - (p.x + p.w / 2)) < 26 && Math.abs(c.y - (p.y + p.h / 2)) < 36) collectCoin(c);
    }
    // Checkpoints
    for (const c of world.checkpoints) {
      if (!c.active && p.x + p.w > c.x - 10 && p.x < c.x + 10) {
        c.active = true;
        world.respawn = { x: c.x - 17, y: c.y - 50 };
        PQ.Audio.play('checkpoint');
        popup(c.x, c.y - 90, 'Checkpoint!', '#b9ffcf');
        burst(c.x + 15, c.y - 60, 14, ['#ff4d6d', '#ffd23f', '#fff'], 220);
      }
    }
    // Flag
    if (world.flag && p.x + p.w > world.flag.x - 4) startFinish();
  }

  function updateEnemies(dt) {
    const p = world.player;
    for (const e of world.enemies) {
      if (e.dead) {
        e.deadT += dt;
        if (e.flip) { e.vy = (e.vy || -300) + 1600 * dt; e.y += e.vy * dt; }
        continue;
      }
      if (!e.active) {
        if (e.x < camX + viewW + 120) e.active = true;
        else continue;
      }
      if (e.kind === 'blob') {
        e.vy = Math.min(PHYS.maxFall, e.vy + PHYS.gravity * dt);
        const before = e.vx;
        const info = moveBody(e, dt);
        if (info.hitX) e.vx = -before;
        // turn around at ledges (friendlier for young players)
        if (e.onGround) {
          const aheadX = e.vx > 0 ? e.x + e.w + 2 : e.x - 2;
          const below = Math.floor((e.y + e.h + 4) / T);
          const t = tileAt(Math.floor(aheadX / T), below);
          if (!SOLID.has(t) && t !== '=') e.vx = -e.vx;
        }
        if (e.y > VIEW_H + 100) { e.dead = true; e.deadT = 1; }
      } else {
        e.t += dt;
        const nx = e.baseX + Math.sin(e.t * 0.9) * 90;
        e.vx = nx - e.x;
        e.x = nx;
        e.y = e.baseY + Math.sin(e.t * 3.2) * 12;
      }

      // Player interaction
      if (state === 'play' && overlap(p, e, 4)) {
        const falling = p.vy > 60 && p.y + p.h - e.y < 22;
        if (p.star > 0) {
          e.dead = true;
          e.flip = true;
          e.vy = -350;
          PQ.Audio.play('stomp');
          popup(e.x + e.w / 2, e.y - 10, 'Pow!', '#fff3a0');
        } else if (falling) stomp(e, p);
        else hurtPlayer();
      }
    }
    world.enemies = world.enemies.filter((e) => !(e.dead && e.deadT > 1.2));
  }

  function updateItems(dt) {
    const p = world.player;
    for (const it of world.items) {
      it.t += dt;
      if (it.kind === 'flycoin') {
        it.vy += 1600 * dt;
        it.x += it.vx * dt;
        it.y += it.vy * dt;
        if (it.vy > 250) {
          it.done = true;
          world.player.coins++;
          world.stats.coins++;
          PQ.Audio.play('coin');
          sparkle(it.x, it.y);
          updateHud();
        }
        continue;
      }
      if (it.emerge > 0) { it.emerge -= dt; it.y -= 90 * dt; continue; }
      if (!it.vx) it.vx = it.kind === 'star' ? 170 : 110;
      it.vy = Math.min(PHYS.maxFall, it.vy + PHYS.gravity * 0.8 * dt);
      const before = it.vx;
      const info = moveBody(it, dt);
      if (info.hitX) it.vx = -before;
      if (it.kind === 'star' && info.landed) it.vy = -560;
      if (it.y > VIEW_H + 60) it.done = true;
      if (!it.done && overlap(p, it)) { it.done = true; collectItem(it); }
    }
    world.items = world.items.filter((i) => !i.done);
  }

  function updateFx(dt) {
    for (const pt of world.particles) {
      pt.life -= dt;
      pt.vy += pt.grav * dt;
      pt.x += pt.vx * dt;
      pt.y += pt.vy * dt;
    }
    world.particles = world.particles.filter((pt) => pt.life > 0);
    for (const pp of world.popups) { pp.life -= dt * 0.9; pp.y -= 40 * dt; }
    world.popups = world.popups.filter((pp) => pp.life > 0);
    for (const [k, v] of world.bumps) {
      if (v - dt <= 0) world.bumps.delete(k);
      else world.bumps.set(k, v - dt);
    }
  }

  function updateCamera(dt, instant) {
    const p = world.player;
    const target = clamp(p.x + p.w / 2 - viewW * 0.4 + p.dir * 50, 0, Math.max(0, world.lvl.W * T - viewW));
    camX = instant ? target : camX + (target - camX) * Math.min(1, dt * 6);
  }

  // Level-end sequence: slide down the pole, walk home, then show results.
  function startFinish() {
    if (state !== 'play') return;
    state = 'finish';
    world.finishT = 0;
    const p = world.player;
    p.x = world.flag.x - p.w + 2;
    p.vx = 0;
    p.vy = 0;
    p.star = 0;
    PQ.Audio.stopMusic();
    PQ.Audio.play('flag');
    burst(world.flag.x, p.y, 24, ['#4ade80', '#ffd23f', '#fff', '#ff6b81'], 320, 0.9);
  }

  function updateFinish(dt) {
    const p = world.player;
    const f = world.flag;
    world.finishT += dt;
    const ground = f.groundY - 20;
    if (f.flagY < ground - 44) f.flagY += 260 * dt;
    if (world.finishT < 1.1) {
      p.y = Math.min(ground - p.h, p.y + 240 * dt);
      p.onGround = p.y >= ground - p.h;
    } else {
      p.dir = 1;
      p.vx = 160;
      p.vy = Math.min(PHYS.maxFall, p.vy + PHYS.gravity * dt);
      moveBody(p, dt);
      p.runPhase += p.vx * dt * 0.055;
      if (Math.random() < 0.05) burst(f.x + 150 + Math.random() * 100, 120 + Math.random() * 100, 18, ['#ff6b81', '#ffd23f', '#4dabf7', '#4ade80'], 260, 0.9, 300, 3);
    }
    updateCamera(dt);
    if (world.finishT > 3.4 && state === 'finish') showResults();
  }

  function update(dt) {
    time += dt;
    if (state === 'play') {
      updatePlayer(dt);
      updateEnemies(dt);
      updateItems(dt);
      if (world.pendingQuiz) {
        world.pendingQuiz.timer -= dt;
        if (world.pendingQuiz.timer <= 0) {
          const { tx, ty } = world.pendingQuiz;
          world.pendingQuiz = null;
          openQuiz(tx, ty);
        }
      }
      updateCamera(dt);
    } else if (state === 'finish') {
      updateFinish(dt);
      updateEnemies(dt);
    }
    if (world) updateFx(dt);
  }

  // ------------------------------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------------------------------
  function tileKey(t, tx, ty) {
    switch (t) {
      case '#': {
        const top = tileAt(tx, ty - 1) !== '#';
        const l = tileAt(tx - 1, ty) !== '#' && tx > 0;
        const r = tileAt(tx + 1, ty) !== '#' && tx < world.lvl.W - 1;
        return `ground:${+top}:${+l}:${+r}:${(tx * 7 + ty * 3) % 4}`;
      }
      case 'B': return 'brick';
      case '?': return 'qblock';
      case 'U': return 'used';
      case 'X': return 'stone';
      case '=': return `plank:${+(tileAt(tx - 1, ty) !== '=')}:${+(tileAt(tx + 1, ty) !== '=')}`;
      case 'p': return `pipe:${+(tileAt(tx, ty - 1) !== 'p')}:${pipeSide(tx, ty)}`;
      default: return null;
    }
  }
  // Pipes are always two wide: work out whether a pipe cell is the left or right half.
  function pipeSide(tx, ty) {
    let n = 0;
    while (tileAt(tx - n - 1, ty) === 'p') n++;
    return n % 2;
  }

  function render() {
    const W = viewW, H = VIEW_H;
    const w = world || demo;
    if (!w) return;
    if (!tiles || tiles.theme !== w.theme || tiles.S !== S) tiles = new Art.TileCache(w.theme, S);
    const cam = world ? camX : demo.camX;

    ctx.setTransform(S, 0, 0, S, 0, 0);
    Art.drawBackground(ctx, w.theme, cam, time, W, H);

    const camR = Math.round(cam * S) / S;
    ctx.setTransform(S, 0, 0, S, -camR * S, 0);

    // scenery behind tiles
    for (const d of w.lvl.decos) {
      if (d.x < cam - 150 || d.x > cam + W + 150) continue;
      Art.DECO[d.kind](ctx, d.x, d.y, d.v, w.theme, time);
    }
    if (w.flag) Art.drawHouse(ctx, w.flag.x + 7 * T, w.flag.groundY, w.theme);

    // tiles, drawn in device pixels so neighbours meet exactly
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const tx0 = Math.max(0, Math.floor(cam / T) - 1), tx1 = Math.min(w.lvl.W - 1, Math.ceil((cam + W) / T));
    const shimmer = 0.5 + 0.5 * Math.sin(time * 4);
    const saved = world;
    world = w; // tileAt reads from `world`
    for (let ty = 0; ty < PQ.ROWS; ty++) {
      for (let tx = tx0; tx <= tx1; tx++) {
        const t = w.tiles[ty][tx];
        if (t === '.') continue;
        const key = tileKey(t, tx, ty);
        if (!key) continue;
        const bump = w.bumps.get(tx + ',' + ty);
        const oy = bump ? -Math.sin((bump / 0.2) * Math.PI) * 10 : 0;
        const dx = Math.round((tx * T - cam) * S), dy = Math.round((ty * T + oy) * S);
        const dw = Math.round(((tx + 1) * T - cam) * S) - dx, dh = Math.round(((ty + 1) * T + oy) * S) - dy;
        ctx.drawImage(tiles.get(key), dx, dy, dw, dh);
        if (t === '?') {
          ctx.fillStyle = `rgba(255,255,255,${0.18 * shimmer})`;
          ctx.fillRect(dx, dy, dw, dh);
        }
      }
    }
    world = saved;

    ctx.setTransform(S, 0, 0, S, -camR * S, 0);
    if (w.flag) Art.drawFlag(ctx, w.flag.x, w.flag.groundY, w.flag.flagY, time);
    for (const c of w.checkpoints) Art.drawCheckpoint(ctx, c.x, c.y, c.active, time);
    for (const c of w.coins) if (!c.taken && c.x > cam - 40 && c.x < cam + W + 40) Art.drawCoin(ctx, c.x, c.y, time, c.phase);
    for (const it of w.items) {
      if (it.kind === 'flycoin') Art.drawCoin(ctx, it.x, it.y, time * 3, 0);
      else if (it.kind === 'heart') Art.drawHeart(ctx, it.x + 16, it.y + 16, 1.4, time);
      else Art.drawStarItem(ctx, it.x + 16, it.y + 16, time);
    }
    for (const e of w.enemies) {
      if (e.x < cam - 80 || e.x > cam + W + 80) continue;
      if (e.kind === 'bee') Art.drawBee(ctx, e, time);
      else Art.drawBlob(ctx, e, time, w.theme);
    }
    if (world && world.player) Art.drawPlayer(ctx, world.player, time);

    // particles
    for (const pt of w.particles) {
      const a = Math.max(0, pt.life / pt.max);
      ctx.globalAlpha = a;
      ctx.fillStyle = pt.color;
      if (pt.kind === 'star') {
        Art.starPath(ctx, pt.x, pt.y, pt.size, pt.size * 0.4, 4);
        ctx.fill();
      } else {
        Art.ellipse(ctx, pt.x, pt.y, pt.kind === 'puff' ? pt.size * (1.5 - a) : pt.size, pt.kind === 'puff' ? pt.size * (1.5 - a) : pt.size);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    // popups
    ctx.textAlign = 'center';
    ctx.font = '800 22px "Baloo 2", "Arial Rounded MT Bold", sans-serif';
    for (const pp of w.popups) {
      ctx.globalAlpha = Math.min(1, pp.life * 2);
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'rgba(40,20,60,.8)';
      ctx.strokeText(pp.text, pp.x, pp.y);
      ctx.fillStyle = pp.color;
      ctx.fillText(pp.text, pp.x, pp.y);
    }
    ctx.globalAlpha = 1;

    ctx.setTransform(S, 0, 0, S, 0, 0);
    Art.drawWeather(ctx, w.theme, cam, time, W, H);
  }

  // ------------------------------------------------------------------------------------------
  // Main loop (fixed-step physics)
  // ------------------------------------------------------------------------------------------
  let last = performance.now(), acc = 0;
  function frame(now) {
    let dt = (now - last) / 1000;
    last = now;
    if (dt > 0.25) dt = 0.25;
    if (state === 'play' || state === 'finish') {
      acc += dt;
      let n = 0;
      while (acc >= STEP && n++ < 8) { update(STEP); acc -= STEP; }
      if (n >= 8) acc = 0;
    } else {
      time += dt;
      if (demo && !world) {
        demo.camX += dt * 40;
        if (demo.camX > demo.lvl.W * T - viewW) demo.camX = 0;
      }
      if (world) updateFx(dt);
    }
    render();
    requestAnimationFrame(frame);
  }

  // ------------------------------------------------------------------------------------------
  // Screens & HUD
  // ------------------------------------------------------------------------------------------
  const SCREENS = ['screen-title', 'screen-map', 'screen-pause', 'screen-results', 'screen-grownups'];
  function show(id) {
    SCREENS.forEach((s) => el(s).classList.toggle('hidden', s !== id));
  }

  let toastTimer = null;
  function showToast(msg) {
    const t = el('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
  }

  function updateHud() {
    if (!world) return;
    const p = world.player;
    let h = '';
    const svg = '<svg viewBox="0 0 24 22"><path d="M12 21C1 13 0 7 3 3.5 6 0.5 10 1.5 12 5 14 1.5 18 0.5 21 3.5 24 7 23 13 12 21Z" fill="#ff4d6d" stroke="#fff" stroke-width="2"/><ellipse cx="7" cy="7" rx="2.4" ry="1.5" fill="#fff" opacity=".7" transform="rotate(-35 7 7)"/></svg>';
    for (let i = 0; i < Math.max(START_HEARTS, p.hearts); i++) h += `<span class="hud-heart${i < p.hearts ? '' : ' empty'}">${svg}</span>`;
    el('hud-hearts').innerHTML = h;
    el('hud-coins').textContent = p.coins;
    el('hud-q').textContent = `${world.stats.correct}/${world.lvl.questionTotal}`;
  }

  function startLevel(i) {
    PQ.Audio.unlock();
    world = makeWorld(i);
    tiles = new Art.TileCache(world.theme, S);
    camX = 0;
    updateCamera(0, true);
    show(null);
    el('hud').classList.remove('hidden');
    el('hud-level').textContent = `${world.def.id} ${world.def.name}`;
    el('touch').classList.toggle('hidden', !isTouch());
    updateHud();
    state = 'play';
    last = performance.now();
    acc = 0;
    PQ.Audio.stopMusic();
    PQ.Audio.startMusic(world.def.world);
    showToast(save.mode === 'phonics' ? 'Bump the ? blocks for phonics challenges!' : save.mode === 'maths' ? 'Bump the ? blocks for maths challenges!' : 'Bump the ? blocks for phonics & maths challenges!');
  }

  function leaveLevel() {
    world = null;
    state = 'map';
    el('hud').classList.add('hidden');
    el('touch').classList.add('hidden');
    PQ.Audio.stopMusic();
    renderMap();
    show('screen-map');
  }

  function pause() {
    if (state !== 'play') return;
    state = 'paused';
    input.left = input.right = input.jump = false;
    PQ.Audio.duck(true);
    show('screen-pause');
  }
  function resume() {
    if (state !== 'paused') return;
    show(null);
    PQ.Audio.duck(false);
    state = 'play';
    last = performance.now();
  }

  // Stars reward both finding ? blocks and answering right first time.
  function starsFor(stats, total) {
    if (!total) return 3;
    const r = stats.firstTry / total;
    return r >= 0.75 ? 3 : r >= 0.4 ? 2 : 1;
  }

  function showResults() {
    state = 'results';
    const st = world.stats;
    const stars = starsFor(st, world.lvl.questionTotal);
    const id = world.def.id;
    save.stars[id] = Math.max(save.stars[id] || 0, stars);
    save.unlocked = Math.max(save.unlocked, Math.min(PQ.Levels.LEVELS.length - 1, world.index + 1));
    save.coins = (save.coins || 0) + st.coins;
    persist();

    el('res-title').textContent = `${world.def.name} complete!`;
    el('res-stars').innerHTML = [0, 1, 2].map((i) => `<span class="big-star${i < stars ? ' on' : ''}" style="animation-delay:${0.2 + i * 0.25}s"></span>`).join('');
    el('res-coins').textContent = st.coins;
    el('res-first').textContent = `${st.firstTry}/${st.asked}`;
    el('res-blocks').textContent = `${st.asked}/${world.lvl.questionTotal}`;
    const rows = Object.entries(st.skills)
      .map(([k, v]) => `<li><span class="tag ${v.topic}">${v.topic === 'phonics' ? 'Phonics' : 'Maths'}</span> ${k} <b>${v.right}/${v.total}</b></li>`)
      .join('');
    el('res-skills').innerHTML = rows || '<li>No ? blocks this time – try bumping some next go!</li>';
    el('res-msg').textContent = stars === 3 ? 'Superstar learner! 🌟' : stars === 2 ? 'Great work! Find more ? blocks for 3 stars.' : 'Well done for finishing! Bump more ? blocks to earn stars.';
    const isLast = world.index >= PQ.Levels.LEVELS.length - 1;
    el('btn-next').classList.toggle('hidden', isLast);
    el('res-final').classList.toggle('hidden', !isLast);
    show('screen-results');
  }

  function renderMap() {
    const host = el('map-worlds');
    host.innerHTML = '';
    PQ.Levels.WORLD_NAMES.forEach((wn, wi) => {
      const col = document.createElement('div');
      col.className = 'map-world theme-' + ['meadow', 'desert', 'snow', 'cave'][wi];
      col.innerHTML = `<h3>${wn}</h3>`;
      PQ.Levels.LEVELS.forEach((L, i) => {
        if (L.world !== wi) return;
        const locked = i > save.unlocked;
        const b = document.createElement('button');
        b.className = 'map-level' + (locked ? ' locked' : '');
        b.disabled = locked;
        const st = save.stars[L.id] || 0;
        b.innerHTML = `<span class="lv-id">${L.id}</span><span class="lv-name">${L.name}</span><span class="lv-stars">${[0, 1, 2].map((k) => `<i class="${k < st ? 'on' : ''}"></i>`).join('')}</span>${locked ? '<span class="lock">🔒</span>' : ''}`;
        b.addEventListener('click', () => { PQ.Audio.play('click'); startLevel(i); });
        col.appendChild(b);
      });
      host.appendChild(col);
    });
    const total = Object.values(save.stars).reduce((a, b) => a + b, 0);
    el('map-total').textContent = `${total} / ${PQ.Levels.LEVELS.length * 3}`;
  }

  function renderGrownups() {
    const rows = Object.entries(save.stats).sort((a, b) => a[1].topic.localeCompare(b[1].topic) || a[0].localeCompare(b[0]));
    el('gu-table').innerHTML = rows.length
      ? rows.map(([k, v]) => {
        const pct = Math.round((100 * v.right) / v.total);
        return `<tr><td><span class="tag ${v.topic}">${v.topic === 'phonics' ? 'Phonics' : 'Maths'}</span></td><td>${k}</td><td>${v.right}/${v.total}</td><td><div class="bar"><i style="width:${pct}%"></i></div></td></tr>`;
      }).join('')
      : '<tr><td colspan="4">No answers yet – play a level to see progress here.</td></tr>';
  }

  function setMode(m) {
    save.mode = m;
    persist();
    document.querySelectorAll('[data-mode]').forEach((b) => b.classList.toggle('on', b.dataset.mode === m));
  }

  function syncAudioButtons() {
    document.querySelectorAll('.btn-sound').forEach((b) => { b.classList.toggle('off', !save.sound); b.setAttribute('aria-pressed', save.sound); });
    document.querySelectorAll('.btn-music').forEach((b) => { b.classList.toggle('off', !save.music); b.setAttribute('aria-pressed', save.music); });
    PQ.Audio.setSound(save.sound);
    PQ.Audio.setMusic(save.music);
  }

  const isTouch = () => window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

  function wireUi() {
    const on = (id, fn) => el(id).addEventListener('click', () => { PQ.Audio.unlock(); PQ.Audio.play('click'); fn(); });
    on('btn-play', () => { renderMap(); state = 'map'; show('screen-map'); });
    on('btn-grownups', () => { renderGrownups(); show('screen-grownups'); });
    on('btn-gu-back', () => show('screen-title'));
    on('btn-gu-reset', () => {
      if (!confirm('Reset all progress and scores?')) return;
      Object.assign(save, { unlocked: 0, stars: {}, stats: {}, coins: 0 });
      persist();
      renderGrownups();
    });
    on('btn-map-back', () => { state = 'title'; show('screen-title'); });
    on('btn-pause', pause);
    on('btn-resume', resume);
    on('btn-restart', () => startLevel(world.index));
    on('btn-quit', leaveLevel);
    on('btn-next', () => startLevel(world.index + 1));
    on('btn-replay', () => startLevel(world.index));
    on('btn-res-map', leaveLevel);
    document.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => { PQ.Audio.play('click'); setMode(b.dataset.mode); }));
    document.querySelectorAll('.btn-sound').forEach((b) => b.addEventListener('click', () => { save.sound = !save.sound; persist(); syncAudioButtons(); }));
    document.querySelectorAll('.btn-music').forEach((b) => b.addEventListener('click', () => { save.music = !save.music; persist(); syncAudioButtons(); }));
    bindTouch('t-left', 'left');
    bindTouch('t-right', 'right');
    bindTouch('t-jump', 'jump');
    document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  }

  // ------------------------------------------------------------------------------------------
  // Boot
  // ------------------------------------------------------------------------------------------
  function boot() {
    const lvl = PQ.Levels.build(PQ.Levels.LEVELS[0]);
    demo = {
      lvl, tiles: lvl.tiles, theme: Art.THEMES.meadow, bumps: new Map(), camX: 0,
      coins: lvl.coins.map((c) => ({ x: c.x * T + T / 2, y: c.y * T + T / 2, phase: Math.random() * 6 })),
      enemies: [], items: [], particles: [], popups: [], checkpoints: [],
      flag: lvl.flag ? { x: lvl.flag.x * T + T / 2, groundY: (lvl.flag.y + 1) * T, flagY: (lvl.flag.y + 1) * T - T * 7.3 } : null,
    };
    resize();
    window.addEventListener('resize', resize);
    wireUi();
    setMode(save.mode);
    syncAudioButtons();
    show('screen-title');
    // Re-render cached tiles once web fonts arrive (the "?" glyph uses Baloo 2).
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { tiles = null; });
    requestAnimationFrame(frame);
  }

  PQ.Game = {
    boot,
    // Debug/testing hooks
    get state() { return state; },
    get world() { return world; },
    startLevel,
    teleport(tx) { if (world) { world.player.x = tx * T; world.player.y = 0; } },
  };
})(window.PQ);

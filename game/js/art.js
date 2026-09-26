// All graphics are drawn procedurally with Canvas 2D paths and gradients, so they stay sharp at
// any screen size. Tiles are pre-rendered into a cache at the current device resolution.
(function (PQ) {
  const T = PQ.T;
  const hash = PQ.hash;

  const THEMES = {
    meadow: {
      name: 'meadow',
      sky: ['#3fa9f5', '#9fdcff', '#e3f6ff'],
      far: ['#9ccbe6', '#7fb0d6'], farCap: '#ffffff',
      mid: ['#8fdc6a', '#5bbf49'], near: ['#5cbf4a', '#3a9a3a'],
      grass: ['#8ae65a', '#48b32f'], grassEdge: '#2f8a26',
      dirt: ['#c9824a', '#9a5528'], dirtDark: '#6e3717', pebble: '#e6a870',
      brick: ['#e0673f', '#b0442a'], mortar: '#6b2716',
      stone: ['#c8b69a', '#978467'], plank: ['#e2a860', '#a8703a'],
      pipe: ['#1e7a2e', '#6fe06c', '#2fa845'], enemy: ['#b56cf0', '#6b2fb3'],
      deco: ['bush', 'flower', 'flower', 'tuft', 'tree', 'tuft'],
      clouds: true, sun: '#fff3a0',
    },
    desert: {
      name: 'desert',
      sky: ['#ff7b54', '#ffb26b', '#ffe6b0'],
      far: ['#d9875a', '#b86a45'], farCap: null,
      mid: ['#f0b76a', '#dc9a4d'], near: ['#e5a553', '#c98639'],
      grass: ['#ffe39a', '#f2c060'], grassEdge: '#c9913a',
      dirt: ['#e7a95e', '#c07a36'], dirtDark: '#8a5222', pebble: '#ffd08a',
      brick: ['#d9784a', '#a9532d'], mortar: '#6b3416',
      stone: ['#e8c890', '#b8935a'], plank: ['#c98b4a', '#8a5a2a'],
      pipe: ['#1b6e5e', '#5ed6b8', '#2a9a80'], enemy: ['#ff6b8a', '#c2305a'],
      deco: ['cactus', 'rock', 'tuft', 'cactus'],
      clouds: true, sun: '#fff0c0',
    },
    snow: {
      name: 'snow',
      sky: ['#5b8def', '#a9c9ff', '#eef5ff'],
      far: ['#b7cdef', '#8fabdb'], farCap: '#ffffff',
      mid: ['#f4f9ff', '#d5e5f8'], near: ['#e2eefc', '#bcd3ef'],
      grass: ['#ffffff', '#dbe9f9'], grassEdge: '#9fb9da',
      dirt: ['#7f97c9', '#56699c'], dirtDark: '#3b4a78', pebble: '#b0c4ec',
      brick: ['#7fa8d8', '#4f78b0'], mortar: '#2c4675',
      stone: ['#c9d6ea', '#8ea3c4'], plank: ['#b98b5e', '#7a5530'],
      pipe: ['#2a5aa8', '#7fb6ff', '#3f7fd8'], enemy: ['#4fc3f7', '#1976d2'],
      deco: ['pine', 'pine', 'snowman', 'tuft', 'rock'],
      clouds: true, sun: '#ffffff', snowfall: true,
    },
    cave: {
      name: 'cave',
      sky: ['#140b2e', '#2c1a5a', '#4a2c7c'],
      far: ['#2a1d57', '#1d1440'], farCap: null,
      mid: ['#3a2a74', '#2b1f5a'], near: ['#4a3690', '#35276b'],
      grass: ['#7ff2cf', '#35b894'], grassEdge: '#1f7a64',
      dirt: ['#6b5bb0', '#43377e'], dirtDark: '#2b2256', pebble: '#9a8ae0',
      brick: ['#8a6fd8', '#5a44a8'], mortar: '#2b1f5a',
      stone: ['#8d86b8', '#5d5690'], plank: ['#b08a5a', '#6e5030'],
      pipe: ['#7a1f8a', '#e07aff', '#a83fc0'], enemy: ['#ff9f43', '#d35400'],
      deco: ['crystal', 'mushroom', 'crystal', 'tuft'],
      clouds: false, sun: null, fireflies: true,
    },
  };

  // ------------------------------------------------------------------------------------------
  // Small drawing helpers
  // ------------------------------------------------------------------------------------------
  function rr(g, x, y, w, h, r) {
    g.beginPath();
    g.moveTo(x + r, y);
    g.arcTo(x + w, y, x + w, y + h, r);
    g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r);
    g.arcTo(x, y, x + w, y, r);
    g.closePath();
  }
  function vgrad(g, y0, y1, stops) {
    const gr = g.createLinearGradient(0, y0, 0, y1);
    stops.forEach((c, i) => gr.addColorStop(i / (stops.length - 1), c));
    return gr;
  }
  function ellipse(g, x, y, rx, ry, rot = 0) {
    g.beginPath();
    g.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), rot, 0, Math.PI * 2);
  }
  function rivet(g, x, y, col) {
    g.fillStyle = col;
    ellipse(g, x, y, 2.4, 2.4);
    g.fill();
    g.fillStyle = 'rgba(255,255,255,.6)';
    ellipse(g, x - 0.7, y - 0.7, 0.9, 0.9);
    g.fill();
  }

  // ------------------------------------------------------------------------------------------
  // Tile painters (draw into a 48x48 unit space)
  // ------------------------------------------------------------------------------------------
  const PAINT = {
    ground(g, th, top, left, right, v) {
      g.fillStyle = vgrad(g, 0, T, th.dirt);
      g.fillRect(0, 0, T, T);
      const r = PQ.rng(v * 977 + 13);
      for (let i = 0; i < 7; i++) {
        const x = 4 + r() * 40, y = (top ? 18 : 4) + r() * (top ? 26 : 40), s = 1.5 + r() * 3.5;
        g.fillStyle = 'rgba(0,0,0,.14)';
        ellipse(g, x + 0.8, y + 1, s * 1.2, s * 0.85);
        g.fill();
        g.fillStyle = th.pebble;
        g.globalAlpha = 0.55;
        ellipse(g, x, y, s * 1.2, s * 0.8);
        g.fill();
        g.globalAlpha = 1;
      }
      // subtle strata line
      g.strokeStyle = 'rgba(0,0,0,.07)';
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(0, 34 + r() * 6);
      g.bezierCurveTo(16, 30 + r() * 8, 32, 38, 48, 33 + r() * 6);
      g.stroke();
      if (left) {
        g.fillStyle = th.dirtDark;
        g.fillRect(0, 0, 4, T);
        g.fillStyle = 'rgba(255,255,255,.12)';
        g.fillRect(4, 0, 2, T);
      }
      if (right) {
        g.fillStyle = 'rgba(0,0,0,.12)';
        g.fillRect(T - 7, 0, 3, T);
        g.fillStyle = th.dirtDark;
        g.fillRect(T - 4, 0, 4, T);
      }
      if (top) {
        // grass cap with scalloped underside
        g.beginPath();
        g.moveTo(0, 0);
        g.lineTo(T, 0);
        g.lineTo(T, 14);
        const n = 4;
        for (let i = n; i > 0; i--) {
          const x0 = (i / n) * T, x1 = ((i - 1) / n) * T;
          g.quadraticCurveTo((x0 + x1) / 2, 23 + ((i + v) % 2) * 3, x1, 14);
        }
        g.closePath();
        g.fillStyle = th.grassEdge;
        g.save();
        g.translate(0, 2.5);
        g.fill();
        g.restore();
        g.fillStyle = vgrad(g, 0, 20, th.grass);
        g.fill();
        g.fillStyle = 'rgba(255,255,255,.35)';
        g.fillRect(0, 2, T, 2.5);
        g.fillStyle = 'rgba(0,0,0,.08)';
        for (let i = 0; i < 6; i++) {
          const x = 3 + r() * 42;
          g.beginPath();
          g.moveTo(x, 12);
          g.lineTo(x + 1.5, 6);
          g.lineTo(x + 3, 12);
          g.fill();
        }
        if (left) {
          g.fillStyle = th.grassEdge;
          rr(g, 0, 0, 5, 20, 2);
          g.fill();
        }
        if (right) {
          g.fillStyle = th.grassEdge;
          rr(g, T - 5, 0, 5, 20, 2);
          g.fill();
        }
      }
    },

    brick(g, th) {
      g.fillStyle = th.mortar;
      g.fillRect(0, 0, T, T);
      const rows = 3, bh = T / rows;
      for (let r = 0; r < rows; r++) {
        const off = r % 2 ? -12 : 0;
        for (let c = -1; c < 3; c++) {
          const x = off + c * 24 + 1.5, y = r * bh + 1.5, w = 24 - 3, h = bh - 3;
          if (x + w < 0 || x > T) continue;
          g.fillStyle = vgrad(g, y, y + h, th.brick);
          rr(g, x, y, w, h, 2);
          g.fill();
          g.fillStyle = 'rgba(255,255,255,.28)';
          g.fillRect(x + 2, y + 1.5, w - 4, 2);
          g.fillStyle = 'rgba(0,0,0,.18)';
          g.fillRect(x + 2, y + h - 3, w - 4, 2);
        }
      }
      g.strokeStyle = 'rgba(0,0,0,.35)';
      g.lineWidth = 2;
      g.strokeRect(1, 1, T - 2, T - 2);
    },

    qblock(g) {
      g.fillStyle = '#8a4b00';
      rr(g, 0.5, 0.5, T - 1, T - 1, 6);
      g.fill();
      g.fillStyle = vgrad(g, 2, T - 2, ['#ffe680', '#ffc233', '#f09a12']);
      rr(g, 2.5, 2.5, T - 5, T - 5, 5);
      g.fill();
      g.strokeStyle = 'rgba(255,255,255,.7)';
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(6, T - 8);
      g.lineTo(6, 6);
      g.lineTo(T - 8, 6);
      g.stroke();
      g.strokeStyle = 'rgba(120,60,0,.45)';
      g.beginPath();
      g.moveTo(8, T - 5.5);
      g.lineTo(T - 5.5, T - 5.5);
      g.lineTo(T - 5.5, 8);
      g.stroke();
      [[8, 8], [T - 8, 8], [8, T - 8], [T - 8, T - 8]].forEach(([x, y]) => rivet(g, x, y, '#a85f00'));
      g.font = '800 32px "Baloo 2", "Arial Black", sans-serif';
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillStyle = '#9a5200';
      g.fillText('?', T / 2 + 2, T / 2 + 4);
      g.fillStyle = '#fff';
      g.fillText('?', T / 2, T / 2 + 2);
    },

    used(g) {
      g.fillStyle = '#5a3418';
      rr(g, 0.5, 0.5, T - 1, T - 1, 6);
      g.fill();
      g.fillStyle = vgrad(g, 2, T - 2, ['#c98d5a', '#a86b3c', '#8a5228']);
      rr(g, 2.5, 2.5, T - 5, T - 5, 5);
      g.fill();
      g.strokeStyle = 'rgba(255,255,255,.3)';
      g.lineWidth = 2;
      g.strokeRect(6, 6, T - 12, T - 12);
      [[8, 8], [T - 8, 8], [8, T - 8], [T - 8, T - 8]].forEach(([x, y]) => rivet(g, x, y, '#5a3418'));
      // little star to show it's been solved
      g.fillStyle = 'rgba(255,230,120,.9)';
      starPath(g, T / 2, T / 2 + 1, 9, 4);
      g.fill();
    },

    stone(g, th) {
      g.fillStyle = th.stone[1];
      rr(g, 0, 0, T, T, 4);
      g.fill();
      g.fillStyle = vgrad(g, 0, T, [th.stone[0], th.stone[1]]);
      rr(g, 3, 3, T - 6, T - 6, 3);
      g.fill();
      g.fillStyle = 'rgba(255,255,255,.35)';
      g.beginPath();
      g.moveTo(3, 3);
      g.lineTo(T - 3, 3);
      g.lineTo(T - 9, 9);
      g.lineTo(9, 9);
      g.lineTo(9, T - 9);
      g.lineTo(3, T - 3);
      g.closePath();
      g.fill();
      g.fillStyle = 'rgba(0,0,0,.2)';
      g.beginPath();
      g.moveTo(T - 3, T - 3);
      g.lineTo(3, T - 3);
      g.lineTo(9, T - 9);
      g.lineTo(T - 9, T - 9);
      g.lineTo(T - 9, 9);
      g.lineTo(T - 3, 3);
      g.closePath();
      g.fill();
    },

    plank(g, th, left, right) {
      const x0 = left ? 3 : 0, x1 = right ? T - 3 : T;
      g.fillStyle = 'rgba(0,0,0,.25)';
      g.fillRect(x0, 16, x1 - x0, 4);
      g.fillStyle = '#5a3a1a';
      rr(g, x0, 0, x1 - x0, 17, left || right ? 5 : 0);
      g.fill();
      g.fillStyle = vgrad(g, 1, 15, th.plank);
      rr(g, x0 + 1.5, 1.5, x1 - x0 - 3, 13, 4);
      g.fill();
      g.strokeStyle = 'rgba(90,50,20,.35)';
      g.lineWidth = 1.2;
      g.beginPath();
      g.moveTo(x0 + 4, 6);
      g.bezierCurveTo(16, 4, 30, 9, x1 - 4, 6);
      g.moveTo(x0 + 6, 11);
      g.bezierCurveTo(20, 13, 30, 9, x1 - 6, 11);
      g.stroke();
      g.fillStyle = 'rgba(255,255,255,.35)';
      g.fillRect(x0 + 3, 2.5, x1 - x0 - 6, 1.5);
      if (left) rivet(g, x0 + 7, 8, '#4a2a10');
      if (right) rivet(g, x1 - 7, 8, '#4a2a10');
      if (left) { g.fillStyle = '#6b4520'; g.fillRect(x0 + 5, 17, 4, 12); }
      if (right) { g.fillStyle = '#6b4520'; g.fillRect(x1 - 9, 17, 4, 12); }
    },

    // Two-tile-wide pipe. `side` 0 = left half, 1 = right half.
    pipe(g, th, isTop, side) {
      g.translate(-side * T, 0);
      const [dark, light, mid] = th.pipe;
      const hg = g.createLinearGradient(0, 0, 2 * T, 0);
      hg.addColorStop(0, dark);
      hg.addColorStop(0.25, light);
      hg.addColorStop(0.45, mid);
      hg.addColorStop(1, dark);
      g.fillStyle = '#10301a';
      g.fillRect(4, 0, 2 * T - 8, T);
      g.fillStyle = hg;
      g.fillRect(6, 0, 2 * T - 12, T);
      g.fillStyle = 'rgba(255,255,255,.4)';
      g.fillRect(20, 0, 5, T);
      if (isTop) {
        g.fillStyle = '#10301a';
        rr(g, 0, 0, 2 * T, 24, 4);
        g.fill();
        g.fillStyle = hg;
        rr(g, 2, 2, 2 * T - 4, 20, 3);
        g.fill();
        g.fillStyle = 'rgba(255,255,255,.45)';
        g.fillRect(16, 4, 6, 16);
        g.fillStyle = 'rgba(0,0,0,.25)';
        g.fillRect(4, 20, 2 * T - 8, 3);
      }
    },
  };

  function starPath(g, x, y, R, r, n = 5) {
    g.beginPath();
    for (let i = 0; i < n * 2; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / n;
      const rad = i % 2 ? r : R;
      g.lineTo(x + Math.cos(a) * rad, y + Math.sin(a) * rad);
    }
    g.closePath();
  }

  class TileCache {
    constructor(theme, S) {
      this.theme = theme;
      this.S = S;
      this.map = new Map();
    }
    get(key) {
      let c = this.map.get(key);
      if (!c) {
        c = this.make(key);
        this.map.set(key, c);
      }
      return c;
    }
    make(key) {
      const size = Math.max(8, Math.round(T * this.S));
      const cv = document.createElement('canvas');
      cv.width = cv.height = size;
      const g = cv.getContext('2d');
      g.scale(size / T, size / T);
      const [kind, ...args] = key.split(':');
      PAINT[kind](g, this.theme, ...args.map(Number));
      return cv;
    }
  }

  // ------------------------------------------------------------------------------------------
  // Parallax backgrounds (drawn in screen-space logical units)
  // ------------------------------------------------------------------------------------------
  function ridge(ctx, camX, par, W, baseY, amp, seed, fill, H) {
    ctx.beginPath();
    ctx.moveTo(0, H);
    for (let x = 0; x <= W + 16; x += 16) {
      const wx = x + camX * par;
      const y = baseY - amp * (0.55 * Math.sin(wx * 0.004 + seed) + 0.3 * Math.sin(wx * 0.011 + seed * 2.3) + 0.15 * Math.sin(wx * 0.023 + seed * 5.1));
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W + 16, H);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
  }

  function mountains(ctx, th, camX, par, W, baseY, H, flatTop) {
    const sp = 240;
    const off = camX * par;
    const k0 = Math.floor((off - 300) / sp), k1 = Math.ceil((off + W + 300) / sp);
    for (let k = k0; k <= k1; k++) {
      const cx = k * sp + hash(k) * sp * 0.6 - off;
      const h = 120 + hash(k + 7.3) * 150;
      const hw = h * (0.8 + hash(k + 2.1) * 0.5);
      const top = baseY - h;
      ctx.fillStyle = vgrad(ctx, top, baseY, th.far);
      ctx.beginPath();
      if (flatTop) {
        ctx.moveTo(cx - hw, baseY);
        ctx.lineTo(cx - hw * 0.45, top + 6);
        ctx.quadraticCurveTo(cx - hw * 0.4, top, cx - hw * 0.3, top);
        ctx.lineTo(cx + hw * 0.3, top);
        ctx.quadraticCurveTo(cx + hw * 0.4, top, cx + hw * 0.45, top + 6);
        ctx.lineTo(cx + hw, baseY);
      } else {
        ctx.moveTo(cx - hw, baseY);
        ctx.lineTo(cx - 10, top + 6);
        ctx.quadraticCurveTo(cx, top - 4, cx + 10, top + 6);
        ctx.lineTo(cx + hw, baseY);
      }
      ctx.closePath();
      ctx.fill();
      // shaded right face
      ctx.fillStyle = 'rgba(0,0,0,.08)';
      ctx.beginPath();
      ctx.moveTo(cx + (flatTop ? hw * 0.3 : 5), top + 3);
      ctx.lineTo(cx + hw, baseY);
      ctx.lineTo(cx + hw * 0.2, baseY);
      ctx.closePath();
      ctx.fill();
      if (th.farCap && !flatTop) {
        const ch = h * 0.28;
        ctx.fillStyle = th.farCap;
        ctx.beginPath();
        ctx.moveTo(cx - 10, top + 6);
        ctx.quadraticCurveTo(cx, top - 4, cx + 10, top + 6);
        const sx = (hw / h) * ch;
        ctx.lineTo(cx + sx, top + ch);
        ctx.lineTo(cx + sx * 0.4, top + ch * 0.75);
        ctx.lineTo(cx, top + ch * 1.05);
        ctx.lineTo(cx - sx * 0.45, top + ch * 0.7);
        ctx.lineTo(cx - sx, top + ch);
        ctx.closePath();
        ctx.fill();
      }
    }
  }

  function cloud(ctx, x, y, s, a = 1) {
    ctx.save();
    ctx.globalAlpha = a;
    ctx.fillStyle = 'rgba(80,120,170,.18)';
    ellipse(ctx, x + 4, y + 22 * s, 58 * s, 12 * s);
    ctx.fill();
    ctx.fillStyle = '#fff';
    [[-34, 6, 22], [-12, -8, 28], [18, -4, 24], [38, 8, 18], [0, 10, 26]].forEach(([dx, dy, r]) => {
      ellipse(ctx, x + dx * s, y + dy * s, r * s, r * s);
      ctx.fill();
    });
    ctx.fillStyle = 'rgba(200,225,255,.6)';
    ellipse(ctx, x, y + 18 * s, 46 * s, 8 * s);
    ctx.fill();
    ctx.restore();
  }

  function drawBackground(ctx, th, camX, t, W, H) {
    ctx.fillStyle = vgrad(ctx, 0, H, th.sky);
    ctx.fillRect(0, 0, W, H);

    if (th.sun) {
      const sx = W * 0.78 - camX * 0.02, sy = th.name === 'desert' ? 250 : 90;
      const r = th.name === 'desert' ? 70 : 42;
      const glow = ctx.createRadialGradient(sx, sy, r * 0.5, sx, sy, r * 3);
      glow.addColorStop(0, 'rgba(255,255,220,.55)');
      glow.addColorStop(1, 'rgba(255,255,220,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(sx - r * 3, sy - r * 3, r * 6, r * 6);
      ctx.fillStyle = th.sun;
      ellipse(ctx, sx, sy, r, r);
      ctx.fill();
    }

    if (th.name === 'cave') {
      // twinkling crystal dust
      for (let i = 0; i < 70; i++) {
        const x = ((hash(i) * 2400 - camX * 0.05) % W + W) % W, y = hash(i + 50) * H * 0.7;
        ctx.fillStyle = `rgba(200,180,255,${0.25 + 0.35 * Math.sin(t * 2 + i)})`;
        ctx.fillRect(x, y, 2, 2);
      }
      // hanging stalactites
      const sp = 90, off = camX * 0.2;
      for (let k = Math.floor(off / sp) - 1; k < Math.ceil((off + W) / sp) + 1; k++) {
        const x = k * sp - off + hash(k) * 40, len = 40 + hash(k + 3) * 110, w = 18 + hash(k + 9) * 26;
        ctx.fillStyle = '#1a1038';
        ctx.beginPath();
        ctx.moveTo(x - w, 0);
        ctx.lineTo(x, len);
        ctx.lineTo(x + w, 0);
        ctx.fill();
      }
    }

    mountains(ctx, th, camX, 0.1, W, H - 150, H, th.name === 'desert');

    if (th.clouds) {
      for (let k = 0; k < 7; k++) {
        const span = W + 400;
        const x = (((hash(k + 1.7) * span - camX * 0.18 - t * (6 + k)) % span) + span) % span - 200;
        cloud(ctx, x, 50 + hash(k + 4.2) * 150, 0.6 + hash(k + 8) * 0.6, th.name === 'desert' ? 0.7 : 0.95);
      }
    }

    ridge(ctx, camX, 0.3, W, H - 140, 45, 1.3, vgrad(ctx, H - 220, H, th.mid), H);
    if (th.name === 'cave') glowCrystals(ctx, camX, 0.45, W, H, t);
    if (th.name === 'snow') pineRow(ctx, camX, 0.45, W, H);
    ridge(ctx, camX, 0.5, W, H - 90, 30, 4.2, vgrad(ctx, H - 150, H, th.near), H);
  }

  function pineRow(ctx, camX, par, W, H) {
    const sp = 70, off = camX * par;
    for (let k = Math.floor(off / sp) - 1; k < Math.ceil((off + W) / sp) + 1; k++) {
      if (hash(k + 0.5) < 0.35) continue;
      const x = k * sp - off, h = 60 + hash(k) * 50, y = H - 120 + hash(k + 1) * 20;
      ctx.fillStyle = '#7d98c2';
      ctx.beginPath();
      ctx.moveTo(x, y - h);
      ctx.lineTo(x + h * 0.32, y);
      ctx.lineTo(x - h * 0.32, y);
      ctx.fill();
    }
  }

  function glowCrystals(ctx, camX, par, W, H, t) {
    const sp = 160, off = camX * par;
    for (let k = Math.floor(off / sp) - 1; k < Math.ceil((off + W) / sp) + 1; k++) {
      const x = k * sp - off + hash(k) * 60, y = H - 120, h = 40 + hash(k + 2) * 70;
      const hue = hash(k + 5) < 0.5 ? '120,230,255' : '255,140,230';
      const gl = ctx.createRadialGradient(x, y - h / 2, 2, x, y - h / 2, h);
      gl.addColorStop(0, `rgba(${hue},${0.25 + 0.1 * Math.sin(t * 2 + k)})`);
      gl.addColorStop(1, `rgba(${hue},0)`);
      ctx.fillStyle = gl;
      ctx.fillRect(x - h, y - h * 1.5, h * 2, h * 2);
      ctx.fillStyle = `rgba(${hue},.55)`;
      ctx.beginPath();
      ctx.moveTo(x - 10, y);
      ctx.lineTo(x - 6, y - h);
      ctx.lineTo(x, y - h - 12);
      ctx.lineTo(x + 6, y - h);
      ctx.lineTo(x + 10, y);
      ctx.fill();
    }
  }

  // Screen-space weather particles drawn on top of the world.
  function drawWeather(ctx, th, camX, t, W, H) {
    if (th.snowfall) {
      ctx.fillStyle = 'rgba(255,255,255,.85)';
      for (let i = 0; i < 60; i++) {
        const sp = 20 + hash(i) * 30;
        const x = ((hash(i + 3) * W * 1.3 + Math.sin(t + i) * 20 - camX * 0.6) % W + W) % W;
        const y = (hash(i + 7) * H + t * sp) % H;
        const r = 1.2 + hash(i + 9) * 2.3;
        ellipse(ctx, x, y, r, r);
        ctx.fill();
      }
    }
    if (th.fireflies) {
      for (let i = 0; i < 24; i++) {
        const x = ((hash(i + 3) * W * 1.5 + Math.sin(t * 0.7 + i) * 40 - camX * 0.8) % W + W) % W;
        const y = H * 0.25 + hash(i + 11) * H * 0.55 + Math.cos(t * 0.9 + i * 2) * 20;
        const a = 0.4 + 0.4 * Math.sin(t * 3 + i);
        const gl = ctx.createRadialGradient(x, y, 0, x, y, 10);
        gl.addColorStop(0, `rgba(255,255,170,${a})`);
        gl.addColorStop(1, 'rgba(255,255,170,0)');
        ctx.fillStyle = gl;
        ctx.fillRect(x - 10, y - 10, 20, 20);
      }
    }
  }

  // ------------------------------------------------------------------------------------------
  // Scenery decorations (world space, drawn behind tiles). (x, y) = bottom centre on ground.
  // ------------------------------------------------------------------------------------------
  const DECO = {
    bush(ctx, x, y, v) {
      const s = 0.8 + v * 0.5;
      ctx.fillStyle = '#2f8a26';
      [[-26, -14, 18], [0, -22, 24], [24, -14, 18]].forEach(([dx, dy, r]) => {
        ellipse(ctx, x + dx * s, y + dy * s + 2, r * s + 2, r * s + 2);
        ctx.fill();
      });
      [[-26, -14, 18], [0, -22, 24], [24, -14, 18]].forEach(([dx, dy, r]) => {
        ctx.fillStyle = vgrad(ctx, y + (dy - r) * s, y, ['#7fe05a', '#3fa530']);
        ellipse(ctx, x + dx * s, y + dy * s, r * s, r * s);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.3)';
        ellipse(ctx, x + (dx - r * 0.3) * s, y + (dy - r * 0.4) * s, r * 0.35 * s, r * 0.2 * s, -0.4);
        ctx.fill();
      });
    },
    flower(ctx, x, y, v) {
      const col = ['#ff5a7a', '#ffd23f', '#ffffff', '#b87bff'][Math.floor(v * 4)];
      ctx.strokeStyle = '#2f8a26';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x - 3, y - 10, x, y - 20);
      ctx.stroke();
      ctx.fillStyle = '#3fa530';
      ellipse(ctx, x - 5, y - 8, 5, 2.5, -0.5);
      ctx.fill();
      ctx.fillStyle = col;
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        ellipse(ctx, x + Math.cos(a) * 5, y - 20 + Math.sin(a) * 5, 4.2, 4.2);
        ctx.fill();
      }
      ctx.fillStyle = '#ffae00';
      ellipse(ctx, x, y - 20, 3.2, 3.2);
      ctx.fill();
    },
    tuft(ctx, x, y, v, th) {
      ctx.fillStyle = th.grassEdge;
      ctx.beginPath();
      ctx.moveTo(x - 10, y);
      ctx.quadraticCurveTo(x - 9, y - 10, x - 12, y - 16);
      ctx.quadraticCurveTo(x - 4, y - 8, x - 2, y);
      ctx.moveTo(x - 3, y);
      ctx.quadraticCurveTo(x, y - 14, x + 1, y - 20);
      ctx.quadraticCurveTo(x + 4, y - 10, x + 4, y);
      ctx.moveTo(x + 3, y);
      ctx.quadraticCurveTo(x + 8, y - 10, x + 13, y - 14);
      ctx.quadraticCurveTo(x + 9, y - 6, x + 10, y);
      ctx.fill();
    },
    tree(ctx, x, y, v) {
      const h = 80 + v * 30;
      ctx.fillStyle = '#7a4a24';
      rr(ctx, x - 6, y - h * 0.55, 12, h * 0.55, 3);
      ctx.fill();
      ctx.fillStyle = '#5a3418';
      ctx.fillRect(x + 1, y - h * 0.55, 5, h * 0.55);
      const blobs = [[0, -h * 0.75, 30], [-22, -h * 0.58, 22], [22, -h * 0.58, 22], [0, -h * 0.5, 24]];
      ctx.fillStyle = '#2f7a26';
      blobs.forEach(([dx, dy, r]) => { ellipse(ctx, x + dx, y + dy + 3, r + 2, r + 2); ctx.fill(); });
      blobs.forEach(([dx, dy, r]) => {
        ctx.fillStyle = vgrad(ctx, y + dy - r, y + dy + r, ['#7ee05a', '#3a9a30']);
        ellipse(ctx, x + dx, y + dy, r, r);
        ctx.fill();
      });
      ctx.fillStyle = 'rgba(255,255,255,.25)';
      ellipse(ctx, x - 10, y - h * 0.85, 10, 6, -0.5);
      ctx.fill();
      ctx.fillStyle = '#ff4d4d';
      [[-12, -h * 0.62], [14, -h * 0.72], [4, -h * 0.5]].forEach(([dx, dy]) => { ellipse(ctx, x + dx, y + dy, 3.5, 3.5); ctx.fill(); });
    },
    cactus(ctx, x, y, v) {
      const h = 50 + v * 30;
      const g1 = ctx.createLinearGradient(x - 10, 0, x + 10, 0);
      g1.addColorStop(0, '#2e8b3a');
      g1.addColorStop(0.4, '#5fcf5a');
      g1.addColorStop(1, '#23702c');
      ctx.fillStyle = '#1b5a22';
      rr(ctx, x - 11, y - h - 1, 22, h + 1, 11);
      ctx.fill();
      ctx.fillStyle = g1;
      rr(ctx, x - 9.5, y - h, 19, h, 9.5);
      ctx.fill();
      // arms
      const arm = (dir, ay, ah) => {
        ctx.fillStyle = '#1b5a22';
        rr(ctx, x + dir * 8 - (dir < 0 ? 16 : 0), y - ay - 1, 16, 12, 6);
        ctx.fill();
        rr(ctx, x + dir * 20 - 7, y - ay - ah, 14, ah + 6, 7);
        ctx.fill();
        ctx.fillStyle = '#4fbf4a';
        rr(ctx, x + dir * 8 - (dir < 0 ? 15 : -1), y - ay + 0.5, 14, 9, 5);
        ctx.fill();
        rr(ctx, x + dir * 20 - 5.5, y - ay - ah + 1.5, 11, ah + 3, 5.5);
        ctx.fill();
      };
      arm(-1, h * 0.45, 22);
      if (v > 0.4) arm(1, h * 0.6, 18);
      ctx.strokeStyle = 'rgba(0,60,0,.35)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x - 3, y - h + 6);
      ctx.lineTo(x - 3, y - 2);
      ctx.moveTo(x + 3, y - h + 6);
      ctx.lineTo(x + 3, y - 2);
      ctx.stroke();
      if (v > 0.6) {
        ctx.fillStyle = '#ff6fa8';
        ellipse(ctx, x, y - h - 2, 5, 4);
        ctx.fill();
      }
    },
    rock(ctx, x, y, v, th) {
      const w = 18 + v * 14;
      ctx.fillStyle = 'rgba(0,0,0,.2)';
      ellipse(ctx, x + 2, y, w, 4);
      ctx.fill();
      ctx.fillStyle = vgrad(ctx, y - w, y, [th.stone[0], th.stone[1]]);
      ctx.beginPath();
      ctx.moveTo(x - w, y);
      ctx.quadraticCurveTo(x - w, y - w * 0.8, x - w * 0.2, y - w * 0.9);
      ctx.quadraticCurveTo(x + w, y - w, x + w, y);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.3)';
      ellipse(ctx, x - w * 0.35, y - w * 0.6, w * 0.3, w * 0.12, -0.3);
      ctx.fill();
    },
    pine(ctx, x, y, v) {
      const h = 90 + v * 40;
      ctx.fillStyle = '#6b4526';
      ctx.fillRect(x - 5, y - 16, 10, 16);
      for (let i = 0; i < 3; i++) {
        const ty = y - 12 - i * h * 0.26, w = (3 - i) * 16 + 8, th2 = h * 0.42;
        ctx.fillStyle = '#1f5e3a';
        ctx.beginPath();
        ctx.moveTo(x, ty - th2);
        ctx.lineTo(x + w, ty);
        ctx.lineTo(x - w, ty);
        ctx.fill();
        ctx.fillStyle = '#2f7d4d';
        ctx.beginPath();
        ctx.moveTo(x, ty - th2);
        ctx.lineTo(x - w, ty);
        ctx.lineTo(x - w * 0.1, ty);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(x, ty - th2);
        ctx.lineTo(x + w * 0.35, ty - th2 * 0.62);
        ctx.lineTo(x + w * 0.1, ty - th2 * 0.55);
        ctx.lineTo(x - w * 0.15, ty - th2 * 0.64);
        ctx.lineTo(x - w * 0.35, ty - th2 * 0.6);
        ctx.fill();
      }
    },
    snowman(ctx, x, y) {
      const ball = (cy, r) => {
        ctx.fillStyle = '#cfdcf0';
        ellipse(ctx, x + 1.5, cy + 1.5, r, r);
        ctx.fill();
        ctx.fillStyle = vgrad(ctx, cy - r, cy + r, ['#ffffff', '#dfe9f7']);
        ellipse(ctx, x, cy, r, r);
        ctx.fill();
      };
      ball(y - 16, 17);
      ball(y - 42, 12);
      ctx.fillStyle = '#222';
      ellipse(ctx, x - 4, y - 45, 1.8, 1.8);
      ctx.fill();
      ellipse(ctx, x + 4, y - 45, 1.8, 1.8);
      ctx.fill();
      ctx.fillStyle = '#ff8a1f';
      ctx.beginPath();
      ctx.moveTo(x, y - 42);
      ctx.lineTo(x + 11, y - 40);
      ctx.lineTo(x, y - 39);
      ctx.fill();
      ctx.fillStyle = '#d63031';
      ctx.fillRect(x - 11, y - 33, 22, 5);
      ctx.fillRect(x + 4, y - 33, 5, 14);
      ctx.fillStyle = '#333';
      ctx.fillRect(x - 9, y - 58, 18, 4);
      ctx.fillRect(x - 6, y - 70, 12, 13);
    },
    crystal(ctx, x, y, v, th, t) {
      const hue = v < 0.5 ? ['#7ff2ff', '#2fb8e8'] : ['#ff9ff0', '#d94fc2'];
      const gl = ctx.createRadialGradient(x, y - 18, 2, x, y - 18, 40);
      gl.addColorStop(0, `rgba(255,255,255,${0.15 + 0.1 * Math.sin(t * 2 + v * 9)})`);
      gl.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gl;
      ctx.fillRect(x - 40, y - 60, 80, 70);
      [[-9, 22, -0.35], [0, 36, 0], [10, 26, 0.3]].forEach(([dx, h, a]) => {
        ctx.save();
        ctx.translate(x + dx, y);
        ctx.rotate(a);
        ctx.fillStyle = hue[1];
        ctx.beginPath();
        ctx.moveTo(-6, 0);
        ctx.lineTo(-6, -h);
        ctx.lineTo(0, -h - 9);
        ctx.lineTo(6, -h);
        ctx.lineTo(6, 0);
        ctx.fill();
        ctx.fillStyle = hue[0];
        ctx.beginPath();
        ctx.moveTo(-6, 0);
        ctx.lineTo(-6, -h);
        ctx.lineTo(0, -h - 9);
        ctx.lineTo(0, 0);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.6)';
        ctx.fillRect(-4, -h + 4, 2, h * 0.6);
        ctx.restore();
      });
    },
    mushroom(ctx, x, y, v, th, t) {
      const gl = ctx.createRadialGradient(x, y - 18, 2, x, y - 18, 30);
      gl.addColorStop(0, `rgba(120,255,200,${0.25 + 0.1 * Math.sin(t * 3 + v * 7)})`);
      gl.addColorStop(1, 'rgba(120,255,200,0)');
      ctx.fillStyle = gl;
      ctx.fillRect(x - 30, y - 48, 60, 50);
      ctx.fillStyle = '#e8e0ff';
      rr(ctx, x - 4, y - 16, 8, 16, 3);
      ctx.fill();
      ctx.fillStyle = vgrad(ctx, y - 30, y - 14, ['#9fffe0', '#2fbf94']);
      ctx.beginPath();
      ctx.ellipse(x, y - 15, 15, 14, 0, Math.PI, 0);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.8)';
      [[-7, -21], [3, -25], [8, -18]].forEach(([dx, dy]) => { ellipse(ctx, x + dx, y + dy, 2.2, 2.2); ctx.fill(); });
    },
  };

  // ------------------------------------------------------------------------------------------
  // Characters and items
  // ------------------------------------------------------------------------------------------
  const OUT = '#3d1c0b';

  // Pip the fox. p: {x,y,w,h,dir,vx,onGround,runPhase,sx,sy,invuln,star}
  function drawPlayer(ctx, p, t) {
    const cx = p.x + p.w / 2, by = p.y + p.h;
    ctx.save();
    ctx.translate(cx, by);
    if (p.invuln > 0 && Math.floor(t * 18) % 2 === 0) ctx.globalAlpha = 0.4;

    if (p.star > 0) {
      const gl = ctx.createRadialGradient(0, -30, 5, 0, -30, 50);
      gl.addColorStop(0, `hsla(${(t * 400) % 360},100%,70%,.55)`);
      gl.addColorStop(1, `hsla(${(t * 400 + 90) % 360},100%,70%,0)`);
      ctx.fillStyle = gl;
      ctx.fillRect(-50, -80, 100, 100);
    }

    // soft shadow
    if (p.onGround) {
      ctx.fillStyle = 'rgba(0,0,0,.18)';
      ellipse(ctx, 0, 0, 16, 3.5);
      ctx.fill();
    }

    ctx.scale(p.dir * p.sx, p.sy);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = OUT;

    const moving = p.onGround && Math.abs(p.vx) > 25;
    const sw = moving ? Math.sin(p.runPhase) : 0;
    const air = !p.onGround;
    const bob = moving ? Math.abs(Math.cos(p.runPhase)) * 2 : 0;
    ctx.translate(0, -bob);

    const ORANGE = ['#ffa34d', '#f06a1a'];

    // Tail
    ctx.save();
    ctx.translate(-9, -18);
    ctx.rotate(-0.35 + Math.sin(t * 7) * 0.18 + (air ? -0.5 : 0) - Math.abs(sw) * 0.2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-6, 6, -22, 6, -28, -4);
    ctx.bezierCurveTo(-32, -12, -26, -20, -18, -16);
    ctx.bezierCurveTo(-10, -12, -4, -6, 0, 0);
    ctx.fillStyle = vgrad(ctx, -18, 6, ORANGE);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-22, -1);
    ctx.bezierCurveTo(-26, 3, -30, -2, -30, -6);
    ctx.bezierCurveTo(-31, -12, -26, -18, -20, -16);
    ctx.bezierCurveTo(-24, -10, -24, -5, -22, -1);
    ctx.fillStyle = '#fff6ea';
    ctx.fill();
    ctx.restore();

    // Legs
    const leg = (x, ang, col) => {
      ctx.save();
      ctx.translate(x, -13);
      ctx.rotate(ang);
      ctx.fillStyle = col;
      rr(ctx, -3.5, 0, 7, 12, 3.5);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#4a2a18';
      ellipse(ctx, 1.5, 12, 5.5, 3.2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };
    leg(-5, air ? 0.6 : sw * 0.7, '#d9571a');
    leg(5, air ? -0.5 : -sw * 0.7, '#d9571a');

    // Body
    ctx.fillStyle = vgrad(ctx, -34, -8, ORANGE);
    ellipse(ctx, 0, -21, 12, 12.5);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#fff6ea';
    ellipse(ctx, 4, -19, 6.5, 8);
    ctx.fill();

    // Arms
    const armA = air ? -1.2 : -sw * 0.6;
    ctx.save();
    ctx.translate(3, -26);
    ctx.rotate(0.4 + armA);
    ctx.fillStyle = '#e8621c';
    rr(ctx, -3, 0, 6, 11, 3);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Scarf (hero touch) with a flowing tail
    const wave = Math.sin(t * 10) * 3 + (moving || air ? 0 : -2);
    ctx.fillStyle = '#2f80ed';
    ctx.beginPath();
    ctx.moveTo(-6, -31);
    ctx.bezierCurveTo(-14, -33 + wave * 0.3, -20, -30 + wave, -25, -33 + wave);
    ctx.lineTo(-23, -27 + wave);
    ctx.bezierCurveTo(-18, -26 + wave * 0.5, -12, -27, -6, -27);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = vgrad(ctx, -34, -26, ['#56a0ff', '#1f63c9']);
    rr(ctx, -10, -34, 22, 7, 3.5);
    ctx.fill();
    ctx.stroke();

    // Head
    ctx.save();
    ctx.translate(3, -44);
    ctx.rotate(air ? -0.08 : Math.sin(t * 3) * 0.03);
    // ears
    const ear = (x, tilt) => {
      ctx.save();
      ctx.translate(x, -8);
      ctx.rotate(tilt);
      ctx.beginPath();
      ctx.moveTo(-6, 2);
      ctx.lineTo(0, -15);
      ctx.lineTo(6, 2);
      ctx.closePath();
      ctx.fillStyle = '#f07a2a';
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-3, 0);
      ctx.lineTo(0, -10);
      ctx.lineTo(3, 0);
      ctx.fillStyle = '#5a2a14';
      ctx.fill();
      ctx.restore();
    };
    ear(-6, -0.25);
    // head shape
    ctx.fillStyle = vgrad(ctx, -14, 12, ORANGE);
    ctx.beginPath();
    ctx.moveTo(-13, 0);
    ctx.bezierCurveTo(-14, -12, -4, -15, 3, -14);
    ctx.bezierCurveTo(12, -13, 16, -6, 22, 0);
    ctx.bezierCurveTo(24, 3, 21, 6, 16, 7);
    ctx.bezierCurveTo(8, 10, -8, 12, -13, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ear(6, 0.25);
    // muzzle
    ctx.fillStyle = '#fff6ea';
    ctx.beginPath();
    ctx.moveTo(2, 3);
    ctx.bezierCurveTo(8, -2, 16, -3, 21, 0.5);
    ctx.bezierCurveTo(23, 3, 20, 6, 15, 7);
    ctx.bezierCurveTo(9, 9, 3, 7, 2, 3);
    ctx.fill();
    // nose
    ctx.fillStyle = '#2a140a';
    ellipse(ctx, 22, 0.5, 3, 2.4);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.7)';
    ellipse(ctx, 21.3, -0.3, 1, 0.7);
    ctx.fill();
    // eye (blinks)
    const blink = (t % 3.7) < 0.12;
    if (blink) {
      ctx.beginPath();
      ctx.moveTo(6, -4);
      ctx.lineTo(11, -4);
      ctx.stroke();
    } else {
      ctx.fillStyle = '#2a140a';
      ellipse(ctx, 8.5, -4.5, 2.6, 3.6);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ellipse(ctx, 9.3, -5.8, 1.1, 1.3);
      ctx.fill();
    }
    // brow + cheek + smile
    ctx.strokeStyle = 'rgba(61,28,11,.8)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(5, -10);
    ctx.quadraticCurveTo(8.5, -11.5, 12, -9.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(13, 4);
    ctx.quadraticCurveTo(16, 6.5, 19, 4.2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,110,120,.45)';
    ellipse(ctx, 4, 1, 3.5, 2.2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  // Grumblob – a grumpy jelly that walks back and forth.
  function drawBlob(ctx, e, t, th) {
    const cx = e.x + e.w / 2, by = e.y + e.h;
    ctx.save();
    ctx.translate(cx, by);
    if (e.dead) {
      ctx.globalAlpha = Math.max(0, 1 - e.deadT * 2);
      if (e.flip) {
        ctx.translate(0, -e.h / 2);
        ctx.rotate(Math.PI);
        ctx.translate(0, e.h / 2);
      } else {
        ctx.scale(1.3, 0.35);
      }
    }
    const wob = e.dead ? 0 : Math.sin(t * 10 + e.x * 0.05) * 0.06;
    ctx.scale(1 + wob, 1 - wob);
    ctx.fillStyle = 'rgba(0,0,0,.2)';
    ellipse(ctx, 0, 0, 20, 4);
    ctx.fill();
    // feet
    const step = Math.sin(t * 12 + e.x) * 3;
    ctx.fillStyle = '#2b1a3a';
    ellipse(ctx, -9, -2 + (step > 0 ? -step * 0.5 : 0), 7, 4.5);
    ctx.fill();
    ellipse(ctx, 9, -2 + (step < 0 ? step * 0.5 : 0), 7, 4.5);
    ctx.fill();
    // body
    ctx.beginPath();
    ctx.moveTo(-21, -4);
    ctx.bezierCurveTo(-24, -26, -12, -36, 0, -36);
    ctx.bezierCurveTo(12, -36, 24, -26, 21, -4);
    ctx.quadraticCurveTo(0, 2, -21, -4);
    ctx.closePath();
    ctx.fillStyle = vgrad(ctx, -36, 0, th.enemy);
    ctx.fill();
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = '#2b1a3a';
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.35)';
    ellipse(ctx, -9, -26, 6, 3.5, -0.5);
    ctx.fill();
    // eyes look in walking direction
    const d = e.vx < 0 ? -1 : 1;
    [-7, 7].forEach((ex) => {
      ctx.fillStyle = '#fff';
      ellipse(ctx, ex, -19, 5.2, 6.2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#1a0f22';
      ellipse(ctx, ex + d * 2, -18, 2.4, 3.2);
      ctx.fill();
    });
    // grumpy brows
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-13, -28);
    ctx.lineTo(-3, -24);
    ctx.moveTo(13, -28);
    ctx.lineTo(3, -24);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-4, -9);
    ctx.quadraticCurveTo(0, -12, 4, -9);
    ctx.stroke();
    ctx.restore();
  }

  function drawBee(ctx, e, t) {
    const cx = e.x + e.w / 2, cy = e.y + e.h / 2;
    ctx.save();
    ctx.translate(cx, cy);
    if (e.dead) {
      ctx.globalAlpha = Math.max(0, 1 - e.deadT * 2);
      ctx.rotate(Math.PI);
    }
    ctx.scale(e.vx < 0 ? -1 : 1, 1);
    // wings
    const flap = Math.abs(Math.sin(t * 38));
    ctx.fillStyle = 'rgba(220,240,255,.8)';
    ctx.strokeStyle = 'rgba(80,110,150,.8)';
    ctx.lineWidth = 1.5;
    ellipse(ctx, -3, -12, 7, 11 * (0.4 + flap * 0.6), -0.3);
    ctx.fill();
    ctx.stroke();
    ellipse(ctx, 5, -12, 6, 10 * (0.4 + flap * 0.6), 0.3);
    ctx.fill();
    ctx.stroke();
    // body with stripes (clipped)
    ctx.save();
    ellipse(ctx, 0, 2, 16, 11);
    ctx.clip();
    ctx.fillStyle = vgrad(ctx, -9, 13, ['#ffe14d', '#f5a800']);
    ctx.fillRect(-18, -12, 36, 26);
    ctx.fillStyle = '#2b2233';
    ctx.fillRect(-6, -12, 5, 26);
    ctx.fillRect(3, -12, 5, 26);
    ctx.restore();
    ctx.strokeStyle = '#2b2233';
    ctx.lineWidth = 2.2;
    ellipse(ctx, 0, 2, 16, 11);
    ctx.stroke();
    // stinger
    ctx.fillStyle = '#2b2233';
    ctx.beginPath();
    ctx.moveTo(-16, 2);
    ctx.lineTo(-23, 4);
    ctx.lineTo(-16, 6);
    ctx.fill();
    // face
    ctx.fillStyle = '#fff';
    ellipse(ctx, 10, -1, 4.5, 5);
    ctx.fill();
    ctx.fillStyle = '#2b2233';
    ellipse(ctx, 11.5, -0.5, 2.2, 3);
    ctx.fill();
    ctx.strokeStyle = '#2b2233';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(6, -7);
    ctx.lineTo(13, -5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(10, -9);
    ctx.quadraticCurveTo(14, -18, 18, -16);
    ctx.stroke();
    ctx.restore();
  }

  function drawCoin(ctx, x, y, t, phase = 0) {
    const sx = Math.cos(t * 5 + phase);
    const w = Math.max(0.12, Math.abs(sx));
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(w, 1);
    ctx.fillStyle = '#a86400';
    ellipse(ctx, 0, 0, 12, 15);
    ctx.fill();
    ctx.fillStyle = vgrad(ctx, -14, 14, ['#fff3a0', '#ffc928', '#f08c00']);
    ellipse(ctx, 0, 0, 10.5, 13.5);
    ctx.fill();
    ctx.strokeStyle = 'rgba(160,90,0,.7)';
    ctx.lineWidth = 1.6;
    ellipse(ctx, 0, 0, 6.5, 9.5);
    ctx.stroke();
    if (sx > 0) {
      ctx.fillStyle = 'rgba(255,255,255,.85)';
      ellipse(ctx, -4, -6, 2, 4, 0.3);
      ctx.fill();
    }
    ctx.restore();
  }

  function heartPath(ctx, x, y, s) {
    ctx.beginPath();
    ctx.moveTo(x, y + 6 * s);
    ctx.bezierCurveTo(x - 12 * s, y - 2 * s, x - 8 * s, y - 12 * s, x, y - 6 * s);
    ctx.bezierCurveTo(x + 8 * s, y - 12 * s, x + 12 * s, y - 2 * s, x, y + 6 * s);
    ctx.closePath();
  }
  function drawHeart(ctx, x, y, s, t) {
    const p = 1 + Math.sin(t * 6) * 0.06;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(p, p);
    heartPath(ctx, 0, 0, s);
    ctx.fillStyle = vgrad(ctx, -12 * s, 8 * s, ['#ff8a9a', '#e8203c']);
    ctx.fill();
    ctx.strokeStyle = '#8a0f22';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.7)';
    ellipse(ctx, -4 * s, -5 * s, 2.2 * s, 1.4 * s, -0.6);
    ctx.fill();
    ctx.restore();
  }

  function drawStarItem(ctx, x, y, t) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.sin(t * 4) * 0.15);
    const gl = ctx.createRadialGradient(0, 0, 4, 0, 0, 30);
    gl.addColorStop(0, 'rgba(255,240,120,.7)');
    gl.addColorStop(1, 'rgba(255,240,120,0)');
    ctx.fillStyle = gl;
    ctx.fillRect(-30, -30, 60, 60);
    starPath(ctx, 0, 0, 17, 8);
    ctx.fillStyle = vgrad(ctx, -17, 17, ['#fff7b0', '#ffd21f', '#ff9f00']);
    ctx.fill();
    ctx.strokeStyle = '#b86a00';
    ctx.lineWidth = 2.2;
    ctx.lineJoin = 'round';
    ctx.stroke();
    ctx.fillStyle = '#4a2a00';
    ellipse(ctx, -3.5, -1, 1.6, 3);
    ctx.fill();
    ellipse(ctx, 3.5, -1, 1.6, 3);
    ctx.fill();
    ctx.restore();
  }

  function drawFlag(ctx, x, groundY, flagY, t) {
    const top = groundY - T * 7.5;
    // base block
    ctx.fillStyle = '#5a3a1a';
    rr(ctx, x - 16, groundY - 20, 32, 20, 4);
    ctx.fill();
    ctx.fillStyle = vgrad(ctx, groundY - 20, groundY, ['#b88a5a', '#7a5530']);
    rr(ctx, x - 14, groundY - 18, 28, 16, 3);
    ctx.fill();
    // pole
    const pg = ctx.createLinearGradient(x - 4, 0, x + 4, 0);
    pg.addColorStop(0, '#9aa7b8');
    pg.addColorStop(0.4, '#ffffff');
    pg.addColorStop(1, '#6f7c8f');
    ctx.fillStyle = pg;
    ctx.fillRect(x - 3.5, top, 7, groundY - 20 - top);
    ctx.fillStyle = vgrad(ctx, top - 20, top, ['#fff38a', '#e8a800']);
    ellipse(ctx, x, top - 8, 9, 9);
    ctx.fill();
    ctx.strokeStyle = '#8a5a00';
    ctx.lineWidth = 2;
    ctx.stroke();
    // flag
    const fy = flagY;
    const wv = Math.sin(t * 6) * 4;
    ctx.beginPath();
    ctx.moveTo(x + 3, fy);
    ctx.quadraticCurveTo(x + 28, fy + 6 + wv, x + 56, fy + 4 + wv);
    ctx.quadraticCurveTo(x + 44, fy + 20, x + 56, fy + 38 - wv);
    ctx.quadraticCurveTo(x + 28, fy + 30 - wv, x + 3, fy + 40);
    ctx.closePath();
    ctx.fillStyle = vgrad(ctx, fy, fy + 40, ['#4ade80', '#16a34a']);
    ctx.fill();
    ctx.strokeStyle = '#0f5a2a';
    ctx.lineWidth = 2;
    ctx.stroke();
    starPath(ctx, x + 24, fy + 20, 9, 4);
    ctx.fillStyle = '#fff';
    ctx.fill();
  }

  function drawCheckpoint(ctx, x, groundY, active, t) {
    ctx.fillStyle = '#6b4526';
    rr(ctx, x - 3, groundY - 70, 6, 70, 3);
    ctx.fill();
    ctx.fillStyle = active ? '#ffd23f' : '#c9c9c9';
    ellipse(ctx, x, groundY - 72, 6, 6);
    ctx.fill();
    const wv = active ? Math.sin(t * 7) * 3 : 0;
    ctx.beginPath();
    ctx.moveTo(x + 3, groundY - 68);
    ctx.quadraticCurveTo(x + 18, groundY - 64 + wv, x + 34, groundY - 60 + wv);
    ctx.lineTo(x + 3, groundY - 46);
    ctx.closePath();
    ctx.fillStyle = active ? '#ff4d6d' : '#8d8d99';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // Pip's cosy home at the end of each level.
  function drawHouse(ctx, x, groundY, th) {
    const w = 150, h = 110;
    const left = x - w / 2, top = groundY - h;
    ctx.fillStyle = 'rgba(0,0,0,.2)';
    ellipse(ctx, x, groundY, w * 0.6, 8);
    ctx.fill();
    // walls
    ctx.fillStyle = '#6b4526';
    rr(ctx, left - 2, top - 2, w + 4, h + 4, 6);
    ctx.fill();
    ctx.fillStyle = vgrad(ctx, top, groundY, th.name === 'cave' ? ['#b7a4ff', '#7d68d8'] : ['#fff1d6', '#f0cf9a']);
    rr(ctx, left, top, w, h, 5);
    ctx.fill();
    // roof
    ctx.fillStyle = '#7a1f1f';
    ctx.beginPath();
    ctx.moveTo(left - 22, top + 6);
    ctx.lineTo(x, top - 70);
    ctx.lineTo(left + w + 22, top + 6);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = vgrad(ctx, top - 66, top, ['#ff6b5a', '#c93a2a']);
    ctx.beginPath();
    ctx.moveTo(left - 14, top + 1);
    ctx.lineTo(x, top - 62);
    ctx.lineTo(left + w + 14, top + 1);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(120,20,10,.35)';
    ctx.lineWidth = 2;
    for (let i = 1; i < 4; i++) {
      const yy = top + 1 - i * 15;
      const hw = (w / 2 + 14) * (1 - (i * 15) / 63);
      ctx.beginPath();
      ctx.moveTo(x - hw, yy);
      ctx.lineTo(x + hw, yy);
      ctx.stroke();
    }
    // chimney
    ctx.fillStyle = '#8a5a3a';
    ctx.fillRect(x + 32, top - 58, 18, 36);
    ctx.fillStyle = '#6b4526';
    ctx.fillRect(x + 29, top - 62, 24, 7);
    // door
    ctx.fillStyle = '#5a3418';
    rr(ctx, x - 17, groundY - 58, 34, 58, 16);
    ctx.fill();
    ctx.fillStyle = vgrad(ctx, groundY - 56, groundY, ['#b8733a', '#8a4f22']);
    rr(ctx, x - 14, groundY - 55, 28, 55, 14);
    ctx.fill();
    ctx.fillStyle = '#ffd23f';
    ellipse(ctx, x + 8, groundY - 26, 3, 3);
    ctx.fill();
    // windows (warm glow)
    [[left + 26, top + 26], [left + w - 26, top + 26]].forEach(([wx, wy]) => {
      ctx.fillStyle = '#5a3418';
      rr(ctx, wx - 17, wy - 15, 34, 30, 5);
      ctx.fill();
      ctx.fillStyle = vgrad(ctx, wy - 13, wy + 13, ['#fff6b0', '#ffc94d']);
      rr(ctx, wx - 14, wy - 12, 28, 24, 3);
      ctx.fill();
      ctx.fillStyle = '#5a3418';
      ctx.fillRect(wx - 1.5, wy - 12, 3, 24);
      ctx.fillRect(wx - 14, wy - 1.5, 28, 3);
    });
  }

  PQ.Art = {
    THEMES, TileCache, rr, ellipse, vgrad, starPath, heartPath,
    drawBackground, drawWeather, DECO,
    drawPlayer, drawBlob, drawBee, drawCoin, drawHeart, drawStarItem, drawFlag, drawCheckpoint, drawHouse,
  };
})(window.PQ);

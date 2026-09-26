// Shared helpers. Classic (non-module) scripts so the game also runs straight from file://.
window.PQ = window.PQ || {};

(function (PQ) {
  PQ.T = 48;          // tile size in logical pixels
  PQ.ROWS = 12;       // level height in tiles
  PQ.VIEW_H = PQ.T * PQ.ROWS;

  PQ.clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  PQ.lerp = (a, b, t) => a + (b - a) * t;

  // mulberry32 – small seeded PRNG so levels are the same every time they are played.
  PQ.rng = function (seed) {
    let s = seed >>> 0 || 1;
    return function () {
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  // Deterministic 0..1 noise for a number (used by the art for scenery placement).
  PQ.hash = function (n) {
    const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return s - Math.floor(s);
  };

  PQ.pick = (arr, r = Math.random) => arr[Math.floor(r() * arr.length)];
  PQ.randInt = (a, b, r = Math.random) => a + Math.floor(r() * (b - a + 1));
  PQ.shuffle = function (arr, r = Math.random) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  PQ.el = (id) => document.getElementById(id);

  // Browser storage can be unavailable (private mode, blocked site data), so never let it throw.
  const KEY = 'pips-super-quest-v1';
  PQ.store = {
    load() {
      try {
        return JSON.parse(localStorage.getItem(KEY)) || null;
      } catch (e) {
        return null;
      }
    },
    save(data) {
      try {
        localStorage.setItem(KEY, JSON.stringify(data));
      } catch (e) {
        /* progress just won't persist */
      }
    },
    clear() {
      try {
        localStorage.removeItem(KEY);
      } catch (e) {
        /* ignore */
      }
    },
  };
})(window.PQ);

// Synthesised sound effects and a small original background tune (Web Audio, no files).
(function (PQ) {
  let ctx = null, master = null, sfxBus = null, musicBus = null, noiseBuf = null;
  let soundOn = true, musicOn = true;
  let musicTimer = null, nextTime = 0, step = 0, tempo = 0.2;

  const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);

  function init() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = soundOn ? 0.6 : 0;
      master.connect(ctx.destination);
      sfxBus = ctx.createGain();
      sfxBus.gain.value = 0.9;
      sfxBus.connect(master);
      musicBus = ctx.createGain();
      musicBus.gain.value = musicOn ? 0.2 : 0;
      musicBus.connect(master);
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(f, t0, dur, o = {}) {
    const { type = 'square', vol = 0.12, slideTo = null, attack = 0.006, dest = sfxBus } = o;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(f, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(dest);
    osc.start(t0);
    osc.stop(t0 + dur + 0.03);
  }

  function noise(t0, dur, vol = 0.2, freq = 1200) {
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    const f = ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f);
    f.connect(g);
    g.connect(sfxBus);
    src.start(t0);
    src.stop(t0 + dur + 0.02);
  }

  const arp = (t, notes, gap, dur, o) => notes.forEach((n, i) => tone(midi(n), t + i * gap, dur, o));

  const SFX = {
    jump: (t) => tone(300, t, 0.16, { vol: 0.07, slideTo: 700 }),
    coin: (t) => { tone(988, t, 0.07, { vol: 0.07 }); tone(1319, t + 0.065, 0.28, { vol: 0.07 }); },
    stomp: (t) => { tone(280, t, 0.16, { type: 'triangle', vol: 0.35, slideTo: 80 }); noise(t, 0.08, 0.12, 700); },
    bump: (t) => tone(160, t, 0.1, { type: 'triangle', vol: 0.35, slideTo: 70 }),
    block: (t) => arp(t, [79, 84, 91], 0.05, 0.12, { vol: 0.06 }),
    hurt: (t) => { tone(520, t, 0.12, { type: 'sawtooth', vol: 0.06, slideTo: 260 }); tone(300, t + 0.12, 0.25, { type: 'sawtooth', vol: 0.06, slideTo: 110 }); },
    fall: (t) => tone(700, t, 0.6, { type: 'triangle', vol: 0.25, slideTo: 90 }),
    power: (t) => arp(t, [60, 64, 67, 72, 76, 79, 84], 0.045, 0.14, { vol: 0.06 }),
    heart: (t) => arp(t, [72, 79, 84], 0.07, 0.2, { type: 'triangle', vol: 0.25 }),
    correct: (t) => arp(t, [72, 76, 79, 84], 0.09, 0.32, { type: 'triangle', vol: 0.28 }),
    wrong: (t) => { tone(midi(64), t, 0.18, { type: 'triangle', vol: 0.22 }); tone(midi(60), t + 0.16, 0.3, { type: 'triangle', vol: 0.22 }); },
    click: (t) => tone(880, t, 0.05, { type: 'triangle', vol: 0.15 }),
    checkpoint: (t) => arp(t, [67, 72, 76], 0.08, 0.18, { type: 'triangle', vol: 0.25 }),
    flag: (t) => {
      arp(t, [60, 64, 67, 72, 76, 79], 0.1, 0.2, { vol: 0.07 });
      arp(t + 0.7, [84, 84, 84], 0.12, 0.2, { vol: 0.07 });
      tone(midi(88), t + 1.1, 0.8, { vol: 0.07 });
      arp(t + 0.7, [48, 55, 60], 0.12, 0.3, { type: 'triangle', vol: 0.3 });
    },
    star: (t) => arp(t, [84, 88, 91, 96], 0.04, 0.1, { vol: 0.05 }),
  };

  // --- Background music: an original, bouncy tune in C major (64 eighth-note steps) ---
  // 0 = rest, -1 = hold previous note.
  const MELODY = [
    76, 0, 79, 0, 84, 0, 79, 0, 77, 0, 81, 0, 84, 0, 81, 0,
    76, 0, 79, 0, 83, 0, 79, 0, 74, 0, 77, 0, 79, -1, -1, 0,
    72, 0, 76, 0, 79, 0, 76, 0, 77, 0, 76, 0, 74, 0, 72, 0,
    71, 0, 74, 0, 77, 0, 74, 0, 72, -1, -1, 0, 79, 0, 81, 83,
  ];
  const BASS = [48, 48, 53, 53, 48, 48, 55, 55, 48, 48, 53, 53, 43, 43, 48, 48]; // one per 4 steps
  let transpose = 0;

  function scheduleMusic() {
    if (!ctx) return;
    while (nextTime < ctx.currentTime + 0.15) {
      const m = MELODY[step % MELODY.length];
      if (m > 0) {
        let len = 1;
        while (MELODY[(step + len) % MELODY.length] === -1) len++;
        tone(midi(m + transpose), nextTime, tempo * len * 0.9, { type: 'square', vol: 0.05, dest: musicBus });
        tone(midi(m + transpose + 12), nextTime, tempo * 0.5, { type: 'triangle', vol: 0.02, dest: musicBus });
      }
      if (step % 4 === 0) {
        const b = BASS[(step / 4) % BASS.length];
        tone(midi(b + transpose), nextTime, tempo * 3.2, { type: 'triangle', vol: 0.22, dest: musicBus });
      }
      if (step % 2 === 1) noise(nextTime, 0.03, 0.035, 6000);
      nextTime += tempo;
      step++;
    }
  }

  PQ.Audio = {
    unlock() { init(); },
    play(name) {
      if (!soundOn || !init() || !SFX[name]) return;
      SFX[name](ctx.currentTime + 0.005);
    },
    startMusic(world = 0) {
      if (!init()) return;
      transpose = [0, -3, 2, -5][world % 4];
      tempo = [0.19, 0.2, 0.18, 0.21][world % 4];
      if (musicTimer) return;
      step = 0;
      nextTime = ctx.currentTime + 0.1;
      musicTimer = setInterval(scheduleMusic, 40);
    },
    stopMusic() {
      if (musicTimer) clearInterval(musicTimer);
      musicTimer = null;
    },
    duck(on) {
      if (musicBus && ctx) musicBus.gain.setTargetAtTime(musicOn ? (on ? 0.07 : 0.2) : 0, ctx.currentTime, 0.1);
    },
    setSound(on) {
      soundOn = on;
      if (master && ctx) master.gain.setTargetAtTime(on ? 0.6 : 0, ctx.currentTime, 0.02);
    },
    setMusic(on) {
      musicOn = on;
      if (musicBus && ctx) musicBus.gain.setTargetAtTime(on ? 0.2 : 0, ctx.currentTime, 0.05);
    },
    get soundOn() { return soundOn; },
    get musicOn() { return musicOn; },
  };
})(window.PQ);

// Year 1 (England National Curriculum) learning content.
// Phonics follows Letters and Sounds / Little Wandle style progression: Phase 3 digraphs &
// trigraphs, Phase 5 alternative graphemes and split digraphs, plus "real or alien" words in the
// style of the Year 1 Phonics Screening Check.
// Maths covers the Year 1 programme: counting, one more / one less, counting in 2s, 5s and 10s,
// number bonds to 10 and 20, adding and subtracting within 20, missing numbers, tens and ones,
// comparing numbers, and naming 2D and 3D shapes.
(function (PQ) {
  const { pick, shuffle, randInt } = PQ;

  // ---------------------------------------------------------------------------------------------
  // Word bank. Each word lists its graphemes (sounds) separated by spaces; split digraphs use a_e.
  // ---------------------------------------------------------------------------------------------
  const W = (word, emoji, segs) => ({ word, emoji, segs: segs.split(' ') });
  const WORDS = [
    // CVC / CCVC words (Phase 2 & 4) for decoding practice
    W('cat', '🐱', 'c a t'), W('dog', '🐶', 'd o g'), W('pig', '🐷', 'p i g'), W('hat', '🎩', 'h a t'),
    W('bus', '🚌', 'b u s'), W('fox', '🦊', 'f o x'), W('web', '🕸️', 'w e b'), W('van', '🚐', 'v a n'),
    W('box', '📦', 'b o x'), W('cup', '☕', 'c u p'), W('bed', '🛏️', 'b e d'), W('hen', '🐔', 'h e n'),
    W('bug', '🐛', 'b u g'), W('six', '6️⃣', 's i x'), W('ten', '🔟', 't e n'), W('egg', '🥚', 'e gg'),
    W('ant', '🐜', 'a n t'), W('bat', '🦇', 'b a t'), W('frog', '🐸', 'f r o g'), W('crab', '🦀', 'c r a b'),
    W('drum', '🥁', 'd r u m'), W('tent', '⛺', 't e n t'), W('milk', '🥛', 'm i l k'), W('hand', '✋', 'h a n d'),
    W('bell', '🔔', 'b e ll'), W('sock', '🧦', 's o ck'), W('duck', '🦆', 'd u ck'), W('sun', '🌞', 's u n'),
    // Phase 3
    W('chick', '🐥', 'ch i ck'), W('chips', '🍟', 'ch i p s'), W('cherry', '🍒', 'ch e rr y'),
    W('ship', '🚢', 'sh i p'), W('fish', '🐟', 'f i sh'), W('shell', '🐚', 'sh e ll'), W('sheep', '🐑', 'sh ee p'),
    W('bath', '🛁', 'b a th'), W('teeth', '🦷', 't ee th'), W('three', '3️⃣', 'th r ee'),
    W('ring', '💍', 'r i ng'), W('king', '🤴', 'k i ng'),
    W('queen', '👸', 'qu ee n'),
    W('rain', '🌧️', 'r ai n'), W('snail', '🐌', 's n ai l'), W('train', '🚆', 't r ai n'), W('paint', '🎨', 'p ai n t'),
    W('bee', '🐝', 'b ee'), W('tree', '🌳', 't r ee'), W('feet', '🦶', 'f ee t'),
    W('boat', '⛵', 'b oa t'), W('goat', '🐐', 'g oa t'), W('coat', '🧥', 'c oa t'), W('soap', '🧼', 's oa p'),
    W('moon', '🌕', 'm oo n'), W('spoon', '🥄', 's p oo n'), W('boot', '👢', 'b oo t'),
    W('night', '🌃', 'n igh t'), W('light', '💡', 'l igh t'),
    W('car', '🚗', 'c ar'), W('star', '⭐', 's t ar'), W('shark', '🦈', 'sh ar k'),
    W('fork', '🍴', 'f or k'), W('corn', '🌽', 'c or n'), W('horn', '📯', 'h or n'), W('storm', '⛈️', 's t or m'),
    W('church', '⛪', 'ch ur ch'), W('purse', '👛', 'p ur se'), W('burger', '🍔', 'b ur g er'),
    W('cow', '🐄', 'c ow'), W('owl', '🦉', 'ow l'), W('crown', '👑', 'c r ow n'), W('clown', '🤡', 'c l ow n'),
    W('coin', '🪙', 'c oi n'), W('oil', '🛢️', 'oi l'), W('point', '👉', 'p oi n t'),
    W('ear', '👂', 'ear'), W('beard', '🧔', 'b ear d'),
    W('hair', '💇', 'h air'), W('chair', '🪑', 'ch air'), W('fair', '🎡', 'f air'),
    W('hammer', '🔨', 'h a mm er'), W('letter', '✉️', 'l e tt er'), W('flower', '🌸', 'f l ow er'),
    // Phase 5
    W('crayon', '🖍️', 'c r ay o n'), W('tray', '🍱', 't r ay'), W('hay', '🌾', 'h ay'),
    W('house', '🏠', 'h ou se'), W('mouse', '🐭', 'm ou se'), W('cloud', '☁️', 'c l ou d'), W('mouth', '👄', 'm ou th'),
    W('pie', '🥧', 'p ie'), W('tie', '👔', 't ie'),
    W('leaf', '🍃', 'l ea f'), W('peach', '🍑', 'p ea ch'), W('tea', '🍵', 't ea'), W('sea', '🌊', 's ea'),
    W('boy', '👦', 'b oy'), W('toy', '🧸', 't oy'),
    W('bird', '🐦', 'b ir d'), W('girl', '👧', 'g ir l'), W('shirt', '👕', 'sh ir t'),
    W('saw', '🪚', 's aw'), W('paw', '🐾', 'p aw'), W('straw', '🥤', 's t r aw'), W('prawn', '🦐', 'p r aw n'),
    W('dolphin', '🐬', 'd o l ph i n'), W('photo', '📷', 'ph o t o'), W('elephant', '🐘', 'e l e ph a n t'),
    W('screw', '🔩', 's c r ew'), W('stew', '🍲', 's t ew'), W('news', '📰', 'n ew s'),
    W('whale', '🐳', 'wh a_e l'), W('wheat', '🌾', 'wh ea t'),
    W('glue', '🧴', 'g l ue'), W('blue', '🔵', 'b l ue'),
    W('cake', '🎂', 'c a_e k'), W('snake', '🐍', 's n a_e k'), W('plane', '✈️', 'p l a_e n'), W('grapes', '🍇', 'g r a_e p s'),
    W('bike', '🚲', 'b i_e k'), W('kite', '🪁', 'k i_e t'), W('five', '5️⃣', 'f i_e v'), W('smile', '😊', 's m i_e l'),
    W('rose', '🌹', 'r o_e s'), W('bone', '🦴', 'b o_e n'), W('nose', '👃', 'n o_e s'), W('phone', '📱', 'ph o_e n'),
    W('cube', '🧊', 'c u_e b'), W('tune', '🎵', 't u_e n'),
  ];

  const BASIC = new Set('a b c d e f g h i j k l m n o p q r s t u v w x y z ck ll ss ff zz rr mm dd tt gg se'.split(' '));

  // Sounds taught in each world (world index 0..3).
  const FOCUS = [
    ['ch', 'sh', 'th', 'ng', 'ai', 'ee', 'oa', 'oo'],
    ['igh', 'ar', 'or', 'ur', 'ow', 'oi', 'ear', 'air', 'er', 'ch', 'sh', 'ai', 'ee'],
    ['ay', 'ou', 'ie', 'ea', 'oy', 'ir', 'aw', 'ph', 'ew', 'ue'],
    ['a_e', 'i_e', 'o_e', 'u_e', 'ay', 'ou', 'ea', 'ir', 'aw', 'wh', 'ph'],
  ];
  const KNOWN = FOCUS.map((_, w) => {
    const s = new Set(BASIC);
    for (let i = 0; i <= w; i++) FOCUS[i].forEach((g) => s.add(g));
    s.add('qu');
    return s;
  });
  const poolFor = (w) => WORDS.filter((x) => x.segs.every((g) => KNOWN[w].has(g)));

  // Made-up "alien" words (never real English words), grouped by the sounds they use.
  const ALIENS = [
    ['vap', 'jick', 'chom', 'shig', 'thop', 'quem', 'yeb', 'goam', 'meep', 'zeg', 'foon', 'sheb', 'naib', 'kig', 'hoab', 'jeeb', 'chab', 'wuz', 'thung', 'bengs'],
    ['zort', 'tharn', 'blorn', 'voiz', 'nurt', 'marb', 'bligh', 'dair', 'keer', 'sharb', 'jurk', 'vorn', 'moich', 'fowp', 'gigh', 'terp'],
    ['plou', 'groy', 'stirp', 'dawk', 'pheb', 'blea', 'gour', 'spoy', 'thirk', 'hawp', 'phont', 'yie', 'vewb', 'smay', 'boud', 'veap', 'krue'],
    ['fape', 'bime', 'zote', 'mube', 'glike', 'trame', 'sporn', 'vite', 'snabe', 'grome', 'prute', 'clobe', 'whub', 'phoy', 'blirt', 'jeam'],
  ];

  const disp = (g) => g.replace('_', '‑'); // a_e -> a‑e (non-breaking hyphen)
  const gph = (g) => `<span class="gph">${disp(g)}</span>`;
  const segText = (w) => w.segs.map(disp).join(' • ');

  // Word with UK-style "sound buttons": a dot under single-letter sounds, a dash under digraphs.
  function soundButtons(w) {
    if (w.segs.some((g) => g.includes('_'))) return `<span class="sb-word">${w.word}</span>`;
    return `<span class="sb-word">${w.segs
      .map((g) => `<span class="sb${g.length > 1 ? ' sb-dash' : ''}">${g}</span>`)
      .join('')}</span>`;
  }

  // Word with the focus grapheme's letters replaced by blanks (handles split digraphs).
  function blanked(w, focus) {
    let out = '';
    let pendingE = null;
    const blank = (n) => '<span class="blank"></span>'.repeat(n);
    w.segs.forEach((g) => {
      if (g.includes('_')) {
        const [v, e] = g.split('_');
        out += g === focus ? blank(v.length) : v;
        pendingE = g === focus ? blank(1) : e;
        return;
      }
      out += g === focus ? blank(g.length) : g;
      if (pendingE) { out += pendingE; pendingE = null; }
    });
    if (pendingE) out += pendingE;
    return `<span class="sb-word">${out}</span>`;
  }

  function uniqueEmoji(list) {
    const seen = new Set();
    return list.filter((w) => (seen.has(w.emoji) ? false : (seen.add(w.emoji), true)));
  }

  // ---------------------------------------------------------------------------------------------
  // Phonics question generators
  // ---------------------------------------------------------------------------------------------
  function spotTheSound(w) {
    const pool = poolFor(w);
    const focus = pick(FOCUS[w].filter((g) => pool.some((x) => x.segs.includes(g))));
    const target = pick(pool.filter((x) => x.segs.includes(focus)));
    const others = uniqueEmoji(shuffle(pool.filter((x) => !x.segs.includes(focus) && x.emoji !== target.emoji))).slice(0, 2);
    const opts = shuffle([target, ...others]);
    return {
      topic: 'phonics', skill: 'Spot the sound', key: 'spot:' + target.word,
      prompt: `Which word has the ${gph(focus)} sound?`,
      visual: '',
      layout: 'cards',
      options: opts.map((x) => ({ html: `<span class="o-emoji">${x.emoji}</span><span class="o-word">${x.word}</span>`, label: x.word })),
      answer: opts.indexOf(target),
      explain: `<b>${target.word}</b> has the ${gph(focus)} sound: ${segText(target)}`,
    };
  }

  function missingSound(w) {
    const pool = poolFor(w);
    const cands = pool.filter((x) => x.segs.some((g) => FOCUS[w].includes(g)));
    const target = pick(cands);
    const focus = pick(target.segs.filter((g) => FOCUS[w].includes(g)));
    const others = FOCUS[w].filter((g) => g !== focus && !target.segs.includes(g));
    // Prefer graphemes of the same shape (digraph vs trigraph vs split digraph).
    const sameShape = (g) => g.length === focus.length && g.includes('_') === focus.includes('_');
    const wrong = shuffle(others.filter(sameShape)).concat(shuffle(others.filter((g) => !sameShape(g)))).slice(0, 2);
    while (wrong.length < 2) {
      const g = pick(FOCUS[Math.min(3, w + 1)].concat(FOCUS[0]));
      if (g !== focus && !wrong.includes(g)) wrong.push(g);
    }
    const opts = shuffle([focus, ...wrong]);
    return {
      topic: 'phonics', skill: 'Missing sound', key: 'miss:' + target.word,
      prompt: 'Which sound is missing?',
      visual: `<div class="big-emoji">${target.emoji}</div>${blanked(target, focus)}`,
      layout: 'sounds',
      options: opts.map((g) => ({ html: `<span class="o-gph">${disp(g)}</span>`, label: disp(g) })),
      answer: opts.indexOf(focus),
      explain: `It says <b>${target.word}</b>: ${segText(target)}`,
    };
  }

  function readAndMatch(w) {
    const pool = uniqueEmoji(shuffle(poolFor(w)));
    // Prefer words using this world's focus sounds, but allow CVC words in world 1.
    const focused = pool.filter((x) => x.segs.some((g) => FOCUS[w].includes(g)));
    const target = pick(w === 0 && Math.random() < 0.4 ? pool : focused.length ? focused : pool);
    const others = pool.filter((x) => x !== target).slice(0, 2);
    const opts = shuffle([target, ...others]);
    return {
      topic: 'phonics', skill: 'Read and match', key: 'read:' + target.word,
      prompt: 'Read the word. Which picture matches?',
      visual: soundButtons(target),
      layout: 'pictures',
      options: opts.map((x) => ({ html: `<span class="o-pic">${x.emoji}</span>`, label: x.word })),
      answer: opts.indexOf(target),
      explain: `${target.emoji} <b>${target.word}</b>: ${segText(target)}`,
    };
  }

  function realOrAlien(w) {
    const real = Math.random() < 0.5;
    let word;
    if (real) {
      const pool = poolFor(w).filter((x) => x.word.length <= 6 && x.segs.some((g) => g.length > 1 || w === 0));
      word = pick(pool).word;
    } else {
      word = pick(ALIENS[Math.max(0, w - (Math.random() < 0.3 ? 1 : 0))]);
    }
    return {
      topic: 'phonics', skill: 'Real or alien word', key: 'alien:' + word,
      prompt: 'Sound it out. Is it a real word or an alien word?',
      visual: `<div class="alien-card"><span class="alien-word">${word}</span></div>`,
      layout: 'two',
      options: [
        { html: '<span class="o-emoji">⭐</span><span class="o-word">Real word</span>', label: 'Real word' },
        { html: '<span class="o-emoji">👽</span><span class="o-word">Alien word</span>', label: 'Alien word' },
      ],
      answer: real ? 0 : 1,
      explain: real ? `<b>${word}</b> is a real word!` : `<b>${word}</b> is a made-up alien word 👽`,
    };
  }

  // ---------------------------------------------------------------------------------------------
  // Maths helpers (visuals are inline SVG so they stay crisp at any size)
  // ---------------------------------------------------------------------------------------------
  function numOptions(ans, lo = 0, hi = 100, spread = 2) {
    const set = new Set([ans]);
    let guard = 0;
    while (set.size < 3 && guard++ < 50) {
      const d = randInt(1, spread) * (Math.random() < 0.5 ? -1 : 1);
      const v = ans + d;
      if (v >= lo && v <= hi) set.add(v);
    }
    for (let v = lo; set.size < 3; v++) set.add(v);
    const opts = shuffle([...set]);
    return { options: opts.map((n) => ({ html: `<span class="o-num">${n}</span>`, label: String(n) })), answer: opts.indexOf(ans) };
  }

  const COUNTERS = ['#ff5a5f', '#2d9cdb'];
  function tenFrame(filled, color = COUNTERS[0], extra = 0) {
    const c = 34, pad = 6;
    let s = `<svg class="tenframe" viewBox="0 0 ${5 * c + pad * 2} ${2 * c + pad * 2}" width="${5 * c + pad * 2}" height="${2 * c + pad * 2}">`;
    s += `<rect x="2" y="2" width="${5 * c + pad * 2 - 4}" height="${2 * c + pad * 2 - 4}" rx="8" fill="#fff8e7" stroke="#8a5a2b" stroke-width="3"/>`;
    for (let i = 0; i < 10; i++) {
      const x = pad + (i % 5) * c, y = pad + Math.floor(i / 5) * c;
      s += `<rect x="${x}" y="${y}" width="${c}" height="${c}" fill="none" stroke="#c49a6c" stroke-width="2"/>`;
      if (i < filled) s += `<circle cx="${x + c / 2}" cy="${y + c / 2}" r="${c * 0.36}" fill="${color}" stroke="rgba(0,0,0,.25)" stroke-width="2"/>`;
      else if (i < filled + extra) s += `<circle cx="${x + c / 2}" cy="${y + c / 2}" r="${c * 0.36}" fill="${COUNTERS[1]}" stroke="rgba(0,0,0,.25)" stroke-width="2"/>`;
    }
    return s + '</svg>';
  }

  // n counters in rows of 5; the last `crossed` are crossed out (for subtraction).
  function dotGroup(n, color, crossed = 0) {
    const c = 30, cols = Math.min(5, n) || 1, rows = Math.ceil(n / 5) || 1;
    let s = `<svg class="dots" viewBox="0 0 ${cols * c + 8} ${rows * c + 8}" width="${cols * c + 8}" height="${rows * c + 8}">`;
    for (let i = 0; i < n; i++) {
      const x = 4 + (i % 5) * c + c / 2, y = 4 + Math.floor(i / 5) * c + c / 2;
      const gone = i >= n - crossed;
      s += `<circle cx="${x}" cy="${y}" r="${c * 0.38}" fill="${color}" opacity="${gone ? 0.35 : 1}" stroke="rgba(0,0,0,.25)" stroke-width="2"/>`;
      if (gone) s += `<path d="M${x - 10} ${y - 10}L${x + 10} ${y + 10}M${x + 10} ${y - 10}L${x - 10} ${y + 10}" stroke="#333" stroke-width="3.5" stroke-linecap="round"/>`;
    }
    return s + '</svg>';
  }

  function emojiGroup(emoji, n) {
    let s = '<div class="emoji-grid">';
    for (let r = 0; r < Math.ceil(n / 5); r++) {
      s += '<div class="emoji-row">';
      for (let i = r * 5; i < Math.min(n, r * 5 + 5); i++) s += `<span>${emoji}</span>`;
      s += '</div>';
    }
    return s + '</div>';
  }

  function rodsAndCubes(tens, ones) {
    const u = 14, gap = 10;
    const w = tens * (u + gap) + (ones ? gap + Math.ceil(ones / 5) * (u + 4) : 0) + 8;
    const h = 10 * u + 8;
    let s = `<svg class="rods" viewBox="0 0 ${w} ${h}" width="${w * 1.3}" height="${h * 1.3}">`;
    for (let t = 0; t < tens; t++) {
      const x = 4 + t * (u + gap);
      s += `<rect x="${x}" y="4" width="${u}" height="${10 * u}" rx="2" fill="#3fb950" stroke="#1d6b2c" stroke-width="2"/>`;
      for (let k = 1; k < 10; k++) s += `<line x1="${x}" x2="${x + u}" y1="${4 + k * u}" y2="${4 + k * u}" stroke="#1d6b2c" stroke-width="1.2"/>`;
    }
    const ox = 4 + tens * (u + gap) + gap;
    for (let o = 0; o < ones; o++) {
      const x = ox + Math.floor(o / 5) * (u + 4), y = h - 4 - u - (o % 5) * (u + 2);
      s += `<rect x="${x}" y="${y}" width="${u}" height="${u}" rx="2" fill="#ffb020" stroke="#9a6200" stroke-width="2"/>`;
    }
    return s + '</svg>';
  }

  const SHAPES_2D = {
    circle: '<circle cx="60" cy="60" r="46"/>',
    triangle: '<polygon points="60,12 108,104 12,104"/>',
    square: '<rect x="16" y="16" width="88" height="88"/>',
    rectangle: '<rect x="6" y="30" width="108" height="62"/>',
    pentagon: '<polygon points="60,10 110,46 91,106 29,106 10,46"/>',
    hexagon: '<polygon points="32,12 88,12 114,60 88,108 32,108 6,60"/>',
    oval: '<ellipse cx="60" cy="60" rx="52" ry="34"/>',
  };
  const SHAPE_COLORS = ['#ff6b6b', '#4dabf7', '#51cf66', '#fcc419', '#b197fc', '#ff922b'];
  function shape2dSvg(name) {
    const col = pick(SHAPE_COLORS);
    return `<svg class="shape" viewBox="0 0 120 120" width="180" height="180"><g fill="${col}" stroke="#2b2b40" stroke-width="5" stroke-linejoin="round">${SHAPES_2D[name]}</g></svg>`;
  }

  const SHAPES_3D = {
    cube: (c) => `<polygon points="30,45 75,45 75,95 30,95" fill="${c}"/><polygon points="30,45 50,25 95,25 75,45" fill="${c}" opacity=".75"/><polygon points="75,45 95,25 95,75 75,95" fill="${c}" opacity=".55"/>`,
    cuboid: (c) => `<polygon points="10,50 85,50 85,95 10,95" fill="${c}"/><polygon points="10,50 30,30 105,30 85,50" fill="${c}" opacity=".75"/><polygon points="85,50 105,30 105,75 85,95" fill="${c}" opacity=".55"/>`,
    sphere: (c) => `<defs><radialGradient id="sg" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="${c}"/><stop offset="1" stop-color="#333"/></radialGradient></defs><circle cx="60" cy="60" r="46" fill="url(#sg)"/>`,
    cylinder: (c) => `<path d="M25 30 V92 A35 12 0 0 0 95 92 V30" fill="${c}"/><ellipse cx="60" cy="30" rx="35" ry="12" fill="${c}" opacity=".7"/><path d="M25 92 A35 12 0 0 0 95 92" fill="none"/>`,
    cone: (c) => `<path d="M60 10 L95 95 A35 12 0 0 1 25 95 Z" fill="${c}"/><path d="M25 95 A35 12 0 0 0 95 95" fill="none" stroke-dasharray="5 5" opacity=".5"/>`,
    pyramid: (c) => `<polygon points="60,10 20,90 70,105" fill="${c}"/><polygon points="60,10 70,105 105,85" fill="${c}" opacity=".6"/>`,
  };
  function shape3dSvg(name) {
    const col = pick(SHAPE_COLORS);
    return `<svg class="shape" viewBox="0 0 120 120" width="180" height="180"><g stroke="#2b2b40" stroke-width="4" stroke-linejoin="round">${SHAPES_3D[name](col)}</g></svg>`;
  }

  const eq = (s) => `<div class="equation">${s}</div>`;
  const box = '<span class="qbox">?</span>';
  const mathsQ = (skill, key, prompt, visual, opts, explain, layout = 'numbers') => ({
    topic: 'maths', skill, key, prompt, visual, layout, options: opts.options, answer: opts.answer, explain,
  });

  // ---------------------------------------------------------------------------------------------
  // Maths question generators
  // ---------------------------------------------------------------------------------------------
  const COUNT_THINGS = ['🍎', '⭐', '🐞', '🍓', '🐟', '🌼', '🍪', '🎈', '🐥', '🍌'];

  function countObjects(w) {
    const n = w === 0 ? randInt(3, 10) : randInt(8, 20);
    const e = pick(COUNT_THINGS);
    return mathsQ('Counting', 'count:' + n + e, 'How many are there?', emojiGroup(e, n),
      numOptions(n, 1, 30, 2), `There are <b>${n}</b>. Count in rows of 5 to help!`);
  }

  function bondTo10() {
    const a = randInt(1, 9);
    return mathsQ('Number bonds to 10', 'b10:' + a, `How many more make <b>10</b>?`,
      tenFrame(a) + eq(`${a} + ${box} = 10`), numOptions(10 - a, 0, 10, 2), `${a} + <b>${10 - a}</b> = 10`);
  }

  function bondTo20() {
    const a = randInt(3, 17);
    return mathsQ('Number bonds to 20', 'b20:' + a, `What goes in the box?`,
      eq(`${a} + ${box} = 20`), numOptions(20 - a, 0, 20, 2), `${a} + <b>${20 - a}</b> = 20`);
  }

  function addition(w) {
    const max = w === 0 ? 10 : 20;
    const a = randInt(1, max - 2), b = randInt(1, Math.min(9, max - a));
    const vis = a + b <= 20 && w < 2
      ? `<div class="dot-sum">${dotGroup(a, COUNTERS[0])}<span class="op">+</span>${dotGroup(b, COUNTERS[1])}</div>`
      : '';
    return mathsQ('Adding', `add:${a}+${b}`, 'Add them together!', vis + eq(`${a} + ${b} = ${box}`),
      numOptions(a + b, 0, 40, 2), `${a} + ${b} = <b>${a + b}</b>`);
  }

  function subtraction(w) {
    const max = w <= 1 ? 10 : 20;
    const a = randInt(4, max), b = randInt(1, Math.min(9, a - 1));
    const vis = a <= 20 && w < 3 ? `<div class="dot-sum">${dotGroup(a, COUNTERS[0], b)}</div>` : '';
    return mathsQ('Taking away', `sub:${a}-${b}`, 'Take away!', vis + eq(`${a} − ${b} = ${box}`),
      numOptions(a - b, 0, 20, 2), `${a} − ${b} = <b>${a - b}</b>`);
  }

  function missingNumber(w) {
    const c = randInt(8, 20), a = randInt(1, c - 1), b = c - a;
    if (Math.random() < 0.5) {
      return mathsQ('Missing numbers', `mn:${c}-${a}`, 'What is the missing number?', eq(`${box} + ${b} = ${c}`),
        numOptions(a, 0, 20, 2), `<b>${a}</b> + ${b} = ${c}`);
    }
    return mathsQ('Missing numbers', `mn2:${c}-${b}`, 'What is the missing number?', eq(`${c} − ${box} = ${a}`),
      numOptions(b, 0, 20, 2), `${c} − <b>${b}</b> = ${a}`);
  }

  function oneMoreLess(w) {
    const max = [20, 50, 100, 100][w];
    const n = randInt(2, max - 1);
    const more = Math.random() < 0.5;
    const ans = more ? n + 1 : n - 1;
    const track = [n - 2, n - 1, n, n + 1, n + 2]
      .map((v) => `<span class="track-cell${v === n ? ' here' : ''}${v === ans ? ' ask' : ''}">${v === ans ? '?' : v < 0 ? '' : v}</span>`)
      .join('');
    return mathsQ(more ? 'One more' : 'One less', `oml:${n}${more}`, `What is one ${more ? 'more' : 'less'} than <b>${n}</b>?`,
      `<div class="track">${track}</div>`, numOptions(ans, 0, 101, 2), `One ${more ? 'more' : 'less'} than ${n} is <b>${ans}</b>`);
  }

  function countingIn(w) {
    const step = pick(w === 0 ? [2, 10] : w === 1 ? [2, 10, 5] : [2, 5, 10]);
    const maxStart = w <= 1 ? 4 : 12;
    const start = step * randInt(0, maxStart);
    const seq = [0, 1, 2, 3].map((i) => start + i * step);
    const ans = start + 4 * step;
    const cells = seq.map((v) => `<span class="seq-cell">${v}</span>`).join('') + `<span class="seq-cell ask">?</span>`;
    const opts = {};
    // Make distractors plausible for skip counting (off by one, or wrong step).
    const alt = shuffle([...new Set([ans + 1, ans - 1, ans + step, ans + step + 1])].filter((v) => v >= 0 && v !== ans)).slice(0, 2);
    const all = shuffle([ans, ...alt]);
    opts.options = all.map((n) => ({ html: `<span class="o-num">${n}</span>`, label: String(n) }));
    opts.answer = all.indexOf(ans);
    return mathsQ(`Counting in ${step}s`, `ci:${start}:${step}`, `Count in <b>${step}s</b>. What comes next?`,
      `<div class="seq">${cells}</div>`, opts, `${seq.join(', ')}, <b>${ans}</b>`);
  }

  function placeValue(w) {
    const n = randInt(11, w <= 2 ? 50 : 99);
    const tens = Math.floor(n / 10), ones = n % 10;
    return mathsQ('Tens and ones', 'pv:' + n, 'Tens and ones. What number is this?', rodsAndCubes(tens, ones),
      (() => {
        const swapped = ones > 0 && ones !== tens ? ones * 10 + tens : n + 10;
        const opts = shuffle([...new Set([n, swapped, n + (Math.random() < 0.5 ? 1 : -1)])]);
        while (opts.length < 3) opts.push(n + 10 + opts.length);
        return { options: opts.map((v) => ({ html: `<span class="o-num">${v}</span>`, label: String(v) })), answer: opts.indexOf(n) };
      })(),
      `${tens} tens and ${ones} ones make <b>${n}</b>`);
  }

  function compare(w) {
    const max = [20, 20, 50, 100][w];
    const nums = new Set();
    while (nums.size < 3) nums.add(randInt(1, max));
    const arr = [...nums];
    const biggest = Math.random() < 0.6;
    const ans = biggest ? Math.max(...arr) : Math.min(...arr);
    const opts = shuffle(arr);
    return {
      topic: 'maths', skill: 'Comparing numbers', key: 'cmp:' + arr.join(','),
      prompt: `Which number is the <b>${biggest ? 'biggest' : 'smallest'}</b>?`, visual: '', layout: 'numbers',
      options: opts.map((n) => ({ html: `<span class="o-num">${n}</span>`, label: String(n) })),
      answer: opts.indexOf(ans), explain: `<b>${ans}</b> is the ${biggest ? 'biggest' : 'smallest'}`,
    };
  }

  function shapes2d(w) {
    const names = w === 0 ? ['circle', 'triangle', 'square', 'rectangle'] : Object.keys(SHAPES_2D);
    const name = pick(names);
    const opts = shuffle([name, ...shuffle(names.filter((n) => n !== name)).slice(0, 2)]);
    return {
      topic: 'maths', skill: '2D shapes', key: 's2:' + name, prompt: 'What is this shape called?',
      visual: shape2dSvg(name), layout: 'words',
      options: opts.map((n) => ({ html: `<span class="o-word">${n}</span>`, label: n })),
      answer: opts.indexOf(name), explain: `It is a <b>${name}</b>`,
    };
  }

  function shapes3d() {
    const names = Object.keys(SHAPES_3D);
    const name = pick(names);
    const opts = shuffle([name, ...shuffle(names.filter((n) => n !== name)).slice(0, 2)]);
    return {
      topic: 'maths', skill: '3D shapes', key: 's3:' + name, prompt: 'What is this 3D shape called?',
      visual: shape3dSvg(name), layout: 'words',
      options: opts.map((n) => ({ html: `<span class="o-word">${n}</span>`, label: n })),
      answer: opts.indexOf(name), explain: `It is a <b>${name}</b>`,
    };
  }

  // Generators by world, with rough weights (repeat = more likely).
  const PHONICS_GEN = [
    [spotTheSound, spotTheSound, missingSound, readAndMatch, readAndMatch, realOrAlien],
    [spotTheSound, missingSound, missingSound, readAndMatch, realOrAlien, realOrAlien],
    [spotTheSound, missingSound, readAndMatch, realOrAlien, realOrAlien],
    [spotTheSound, missingSound, missingSound, readAndMatch, realOrAlien, realOrAlien],
  ];
  const MATHS_GEN = [
    [countObjects, countObjects, bondTo10, bondTo10, addition, oneMoreLess, shapes2d, countingIn, compare],
    [countObjects, bondTo10, addition, addition, subtraction, subtraction, countingIn, shapes2d, oneMoreLess],
    [bondTo20, addition, subtraction, placeValue, placeValue, countingIn, shapes3d, oneMoreLess, missingNumber],
    [bondTo20, subtraction, missingNumber, missingNumber, placeValue, countingIn, shapes3d, compare, oneMoreLess, addition],
  ];

  const recent = [];
  let flip = 0;

  PQ.Content = {
    WORDS, FOCUS, ALIENS, poolFor,
    // mode: 'phonics' | 'maths' | 'both'
    next(world, mode) {
      const w = PQ.clamp(world, 0, 3);
      let topic = mode;
      if (mode === 'both') topic = flip++ % 2 === 0 ? 'phonics' : 'maths';
      const gens = topic === 'phonics' ? PHONICS_GEN[w] : MATHS_GEN[w];
      let q;
      for (let i = 0; i < 12; i++) {
        q = pick(gens)(w);
        if (!recent.includes(q.key)) break;
      }
      recent.push(q.key);
      if (recent.length > 16) recent.shift();
      return q;
    },
  };
})(window.PQ);

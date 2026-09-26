// The learning pop-up shown when Pip bumps a "?" block.
// Children get a second try; after that the answer is shown kindly and they carry on.
(function (PQ) {
  const PRAISE = ['Brilliant!', 'Super!', 'Well done!', 'Fantastic!', 'Amazing!', 'You got it!', 'Great reading!', 'Clever fox!'];
  const NUDGE = ['Nearly! Try again.', 'Not quite – have another go!', 'Good try! Look again.'];

  let current = null;

  function confetti(host) {
    const colors = ['#ff5a5f', '#ffd23f', '#3ddc97', '#4dabf7', '#b197fc', '#ff922b'];
    for (let i = 0; i < 36; i++) {
      const s = document.createElement('i');
      s.className = 'confetti';
      s.style.left = 50 + (Math.random() - 0.5) * 30 + '%';
      s.style.background = colors[i % colors.length];
      s.style.setProperty('--dx', (Math.random() - 0.5) * 520 + 'px');
      s.style.setProperty('--dy', -(180 + Math.random() * 260) + 'px');
      s.style.setProperty('--r', Math.random() * 720 - 360 + 'deg');
      s.style.animationDelay = Math.random() * 0.08 + 's';
      host.appendChild(s);
      setTimeout(() => s.remove(), 1400);
    }
  }

  function open(q, onDone) {
    const scr = PQ.el('screen-quiz');
    const card = PQ.el('quiz-card');
    const opts = PQ.el('quiz-options');
    const fb = PQ.el('quiz-feedback');
    const cont = PQ.el('quiz-continue');

    PQ.el('quiz-topic').textContent = q.topic === 'phonics' ? 'Phonics' : 'Maths';
    PQ.el('quiz-topic').className = 'quiz-topic ' + q.topic;
    PQ.el('quiz-skill').textContent = q.skill;
    PQ.el('quiz-prompt').innerHTML = q.prompt;
    PQ.el('quiz-visual').innerHTML = q.visual || '';
    PQ.el('quiz-visual').classList.toggle('empty', !q.visual);
    fb.textContent = '';
    fb.className = 'quiz-feedback';
    cont.classList.add('hidden');
    opts.className = 'quiz-options layout-' + q.layout;
    opts.innerHTML = '';

    let wrong = 0;
    let finished = false;
    const buttons = q.options.map((o, i) => {
      const b = document.createElement('button');
      b.className = 'opt';
      b.type = 'button';
      b.innerHTML = `<span class="opt-key">${i + 1}</span>${o.html}`;
      b.setAttribute('aria-label', o.label);
      b.addEventListener('click', () => choose(i));
      opts.appendChild(b);
      return b;
    });

    function finish(result) {
      if (finished) return;
      finished = true;
      current = null;
      scr.classList.add('closing');
      setTimeout(() => {
        scr.classList.add('hidden');
        scr.classList.remove('closing');
        onDone(result);
      }, 220);
    }

    function reveal() {
      buttons.forEach((b, i) => {
        b.disabled = true;
        if (i === q.answer) b.classList.add('reveal');
      });
      fb.innerHTML = `Let's learn it: ${q.explain}`;
      fb.className = 'quiz-feedback learn';
      cont.classList.remove('hidden');
      cont.onclick = () => finish({ correct: false, attempts: wrong + 1 });
      setTimeout(() => cont.focus(), 50);
    }

    function choose(i) {
      if (finished || buttons[i].disabled || !cont.classList.contains('hidden')) return;
      if (i === q.answer) {
        buttons.forEach((b) => (b.disabled = true));
        buttons[i].classList.add('right');
        fb.innerHTML = `<b>${PQ.pick(PRAISE)}</b> ${q.explain}`;
        fb.className = 'quiz-feedback good';
        PQ.Audio.play('correct');
        confetti(card);
        setTimeout(() => finish({ correct: true, attempts: wrong + 1 }), 1500);
      } else {
        wrong++;
        buttons[i].classList.add('wrong');
        buttons[i].disabled = true;
        PQ.Audio.play('wrong');
        const remaining = buttons.filter((b) => !b.disabled).length;
        if (wrong >= 2 || remaining <= 1) reveal();
        else {
          fb.textContent = PQ.pick(NUDGE);
          fb.className = 'quiz-feedback try';
        }
      }
    }

    current = {
      key(e) {
        const n = parseInt(e.key, 10);
        if (n >= 1 && n <= buttons.length) { choose(n - 1); return true; }
        if ((e.key === 'Enter' || e.key === ' ') && !cont.classList.contains('hidden')) { cont.click(); return true; }
        return false;
      },
    };

    scr.classList.remove('hidden');
    card.classList.remove('pop');
    void card.offsetWidth; // restart the pop-in animation
    card.classList.add('pop');
  }

  PQ.Quiz = {
    open,
    get active() { return !!current; },
    handleKey(e) { return current ? current.key(e) : false; },
  };
})(window.PQ);

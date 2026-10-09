'use strict';

(function () {
  const content = document.getElementById('content');
  const nav = document.getElementById('nav');
  const sidebar = document.getElementById('sidebar');
  const groups = ['Start', 'Lessons', 'Exam prep'];

  const doneSet = () => new Set(Store.get('done', []));
  const lessonIds = () => Site.lessons.filter(l => l.group === 'Lessons').map(l => l.id);

  function buildNav() {
    const done = doneSet();
    nav.innerHTML = '';
    groups.forEach(g => {
      const items = Site.lessons.filter(l => l.group === g);
      if (!items.length) return;
      nav.appendChild(el('div', { class: 'nav-group-title' }, g));
      items.forEach(l => {
        const a = el('a', { class: 'nav-link', href: '#/' + l.id, 'data-id': l.id },
          '<span class="nav-num">' + (l.num || '') + '</span><span>' + l.title + '</span>' + (done.has(l.id) ? '<span class="nav-check">✓</span>' : ''));
        a.onclick = () => sidebar.classList.remove('open');
        nav.appendChild(a);
      });
    });
    const ids = lessonIds();
    const pct = ids.length ? Math.round(100 * ids.filter(i => done.has(i)).length / ids.length) : 0;
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-text').textContent = pct + '% of lessons';
  }

  function render(id) {
    const L = Site.byId[id] || Site.byId.home;
    const order = Site.lessons;
    const i = order.indexOf(L);
    const prev = order[i - 1], next = order[i + 1];
    const done = doneSet().has(L.id);
    let foot = '<div class="lesson-foot">';
    foot += prev ? '<a class="navbtn" href="#/' + prev.id + '"><small>&larr; Previous</small>' + (prev.num ? prev.num + ' ' : '') + prev.title + '</a>' : '<span></span>';
    if (L.group === 'Lessons') foot += '<button class="btn done-btn' + (done ? ' isdone' : '') + '">' + (done ? '✓ Marked as understood' : 'Mark this section as understood') + '</button>';
    foot += next ? '<a class="navbtn" style="text-align:right" href="#/' + next.id + '"><small>Next &rarr;</small>' + (next.num ? next.num + ' ' : '') + next.title + '</a>' : '<span></span>';
    foot += '</div>';
    content.innerHTML = '<article class="lesson">' + L.html + foot + '</article>';
    renderMath(content);

    content.querySelectorAll('[data-widget]').forEach(w => {
      const name = w.dataset.widget;
      let cfg = {};
      try { cfg = w.dataset.cfg ? JSON.parse(w.dataset.cfg) : {}; } catch (e) { console.error('Bad widget config', w.dataset.cfg); }
      if (!w.classList.contains('stepper')) w.classList.add('widget');
      try { Widgets[name](w, cfg); } catch (e) { console.error(e); w.innerHTML = '<p class="pill bad">Widget failed to load: ' + e.message + '</p>'; }
    });
    content.querySelectorAll('.reveal').forEach(mountReveal);
    content.querySelectorAll('a[data-scroll]').forEach(a => a.onclick = (e) => {
      e.preventDefault();
      const t = document.getElementById(a.dataset.scroll);
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    content.querySelectorAll('.quiz[data-quiz]').forEach(q => {
      const qs = L.quizzes && L.quizzes[q.dataset.quiz];
      if (qs) mountQuiz(q, qs, L.id + ':' + q.dataset.quiz, q.dataset.title);
    });
    const db = content.querySelector('.done-btn');
    if (db) db.onclick = () => {
      const s = doneSet();
      if (s.has(L.id)) s.delete(L.id); else s.add(L.id);
      Store.set('done', [...s]);
      buildNav(); render(L.id);
      highlight(L.id);
    };
    if (L.init) { try { L.init(content); } catch (e) { console.error(e); } }
    highlight(L.id);
    document.title = (L.num ? L.num + ' ' : '') + L.title + ' · MTH 215 Exam 1';
    Store.set('last', L.id);
  }

  function highlight(id) {
    nav.querySelectorAll('.nav-link').forEach(a => a.classList.toggle('active', a.dataset.id === id));
  }

  function route() {
    const raw = location.hash.replace(/^#\/?/, '');
    const [id, anchor] = raw.split('/');
    render(id || 'home');
    if (anchor) {
      const t = document.getElementById(anchor);
      if (t) { t.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }

  const toggles = document.querySelectorAll('.theme-toggle');
  function applyTheme(t, save) {
    document.documentElement.dataset.theme = t;
    toggles.forEach(b => b.setAttribute('aria-pressed', String(t === 'dark')));
    if (save) Store.set('theme', t);
    Plane.redrawAll();
  }
  toggles.forEach(b => b.onclick = () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true));
  applyTheme(document.documentElement.dataset.theme || 'light', false);

  document.getElementById('menu-btn').onclick = () => sidebar.classList.toggle('open');
  window.addEventListener('hashchange', route);
  window.App = { buildNav, render };
  buildNav();
  route();
})();

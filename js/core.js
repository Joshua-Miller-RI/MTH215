'use strict';

/* Lesson content is written with tx`...` (String.raw) so LaTeX backslashes need no escaping. */
const tx = String.raw;

const Site = {
  lessons: [],
  byId: {},
  register(lesson) { this.lessons.push(lesson); this.byId[lesson.id] = lesson; }
};
const Widgets = {};

const Store = {
  get(k, d) { try { const v = localStorage.getItem('mth215:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('mth215:' + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
};

/* ======================= Exact fractions ======================= */
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a || 1; }

class Frac {
  constructor(n, d = 1) {
    if (d === 0) throw new Error('Division by zero');
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d);
    this.n = n / g; this.d = d / g;
    if (this.n === 0) { this.n = 0; this.d = 1; }
  }
  static from(x) {
    if (x instanceof Frac) return x;
    if (typeof x === 'number') {
      if (!isFinite(x)) throw new Error('Not a finite number');
      if (Number.isInteger(x)) return new Frac(x, 1);
      let d = 1;
      while (Math.abs(x * d - Math.round(x * d)) > 1e-9 && d < 1e7) d *= 10;
      return new Frac(Math.round(x * d), d);
    }
    if (typeof x === 'string') {
      const s = x.trim().replace(/\u2212/g, '-');
      if (s === '') throw new Error('Empty entry');
      if (s.includes('/')) {
        const [a, b] = s.split('/');
        return Frac.from(a).div(Frac.from(b));
      }
      if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(s)) throw new Error('Could not read "' + x + '" as a number');
      return Frac.from(parseFloat(s));
    }
    throw new Error('Bad number');
  }
  add(o) { o = Frac.from(o); return new Frac(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = Frac.from(o); return new Frac(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = Frac.from(o); return new Frac(this.n * o.n, this.d * o.d); }
  div(o) { o = Frac.from(o); if (o.n === 0) throw new Error('Division by zero'); return new Frac(this.n * o.d, this.d * o.n); }
  neg() { return new Frac(-this.n, this.d); }
  abs() { return new Frac(Math.abs(this.n), this.d); }
  isZero() { return this.n === 0; }
  isOne() { return this.n === 1 && this.d === 1; }
  eq(o) { o = Frac.from(o); return this.n === o.n && this.d === o.d; }
  sign() { return Math.sign(this.n); }
  valueOf() { return this.n / this.d; }
  toString() { return this.d === 1 ? String(this.n) : this.n + '/' + this.d; }
  toTex() { return this.d === 1 ? String(this.n) : (this.n < 0 ? '-' : '') + '\\frac{' + Math.abs(this.n) + '}{' + this.d + '}'; }
}

const F = (x) => Frac.from(x);
const cloneM = (M) => M.map(r => r.slice());
const toFracM = (M) => M.map(r => r.map(F));

/* "1 2 3; 4 5 6" or multi-line. A "|" marks an augmented matrix. */
function parseMatrix(text) {
  const rows = String(text).trim().split(/[;\n]+/).map(r => r.trim()).filter(r => r.length);
  if (!rows.length) throw new Error('Type a matrix first.');
  let aug = false;
  const M = rows.map(r => {
    if (r.includes('|')) aug = true;
    return r.replace(/[\[\]]/g, ' ').replace(/\|/g, ' ').split(/[\s,]+/).filter(s => s.length).map(s => Frac.from(s));
  });
  const n = M[0].length;
  if (M.some(r => r.length !== n)) throw new Error('Every row must have the same number of entries.');
  if (M.length > 7 || n > 8) throw new Error('Please keep it to at most 7 rows and 8 columns.');
  return { M, aug };
}
function matrixToText(M, aug) {
  return M.map(r => r.map((x, j) => (aug && j === r.length - 1 ? '| ' : '') + x.toString()).join(' ')).join('\n');
}

/* ======================= TeX helpers ======================= */
const COLORS = { pivot: '#e11d48', changed: '#2563eb', free: '#d97706', good: '#059669' };

function multTex(f) { // a coefficient (may be negative) written in front of something
  f = F(f);
  if (f.d === 1) return String(f.n);
  return (f.n < 0 ? '-' : '') + '\\tfrac{' + Math.abs(f.n) + '}{' + f.d + '}';
}
function posCoefTex(f) { // |f| as a coefficient, omitting 1
  f = F(f).abs();
  if (f.isOne()) return '';
  return f.d === 1 ? String(f.n) : '\\tfrac{' + f.n + '}{' + f.d + '}';
}
function matTex(M, o = {}) {
  const n = M[0].length;
  const spec = o.aug ? 'c'.repeat(n - 1) + '|c' : 'c'.repeat(n);
  const piv = new Set((o.pivots || []).map(([r, c]) => r + ',' + c));
  const hl = new Set(o.hlRows || []);
  const hlc = new Set(o.hlCols || []);
  const body = M.map((row, i) => row.map((x, j) => {
    let t = (x instanceof Frac) ? x.toTex() : String(x);
    if (piv.has(i + ',' + j)) t = '\\textcolor{' + COLORS.pivot + '}{\\boldsymbol{' + t + '}}';
    else if (hl.has(i)) t = '\\textcolor{' + COLORS.changed + '}{' + t + '}';
    else if (hlc.has(j)) t = '\\textcolor{' + COLORS.free + '}{' + t + '}';
    return t;
  }).join(' & ')).join(' \\\\ ');
  return '\\left[\\begin{array}{' + spec + '} ' + body + ' \\end{array}\\right]';
}
function fmtNum(x, dp = 2) {
  if (x instanceof Frac) return x.toTex();
  const r = Math.round(x * 10 ** dp) / 10 ** dp;
  return (Object.is(r, -0) ? 0 : r).toString();
}
function vecTex(v, dp) { return '\\begin{bmatrix} ' + v.map(x => fmtNum(x, dp)).join(' \\\\ ') + ' \\end{bmatrix}'; }

/* constant + sum c_i v_i, e.g. "4 - 2x_2" */
function linTex(constant, terms) {
  const parts = [];
  constant = F(constant);
  terms = terms.filter(t => !F(t.c).isZero());
  if (!constant.isZero() || terms.length === 0) parts.push({ c: constant, v: '' });
  parts.push(...terms);
  return parts.map((p, i) => {
    const c = F(p.c);
    const neg = c.n < 0;
    const body = p.v ? posCoefTex(c) + p.v : c.abs().toTex();
    if (i === 0) return (neg ? '-' : '') + body;
    return (neg ? ' - ' : ' + ') + body;
  }).join('');
}

function systemTex(M) { // augmented matrix -> system of equations
  const nv = M[0].length - 1;
  const rows = M.map(r => {
    const terms = [];
    for (let j = 0; j < nv; j++) terms.push({ c: r[j], v: 'x_{' + (j + 1) + '}' });
    const nonzero = terms.filter(t => !F(t.c).isZero());
    const lhs = nonzero.length ? linTex(0, nonzero) : '0';
    return lhs + ' &= ' + r[nv].toTex();
  });
  return '\\begin{aligned} ' + rows.join(' \\\\ ') + ' \\end{aligned}';
}

function tex(el, s, display = true) {
  if (window.katex) katex.render(s, el, { displayMode: display, throwOnError: false });
  else el.textContent = s;
}
function texStr(s, display = false) {
  return window.katex ? katex.renderToString(s, { displayMode: display, throwOnError: false }) : s;
}
function renderMath(el) {
  if (window.renderMathInElement) {
    renderMathInElement(el, {
      delimiters: [
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false
    });
  }
}

/* ======================= Row reduction engine ======================= */
function opTex(s) {
  const r = (i) => 'R_{' + (i + 1) + '}';
  if (s.type === 'swap') return r(s.a) + ' \\leftrightarrow ' + r(s.b);
  if (s.type === 'scale') {
    const f = s.factor;
    const c = f.n < 0 ? '\\left(' + multTex(f) + '\\right)' : multTex(f);
    return r(s.target) + ' \\leftarrow ' + c + '\\,' + r(s.target);
  }
  if (s.type === 'replace') {
    const f = s.factor;
    return r(s.target) + ' \\leftarrow ' + r(s.target) + (f.n < 0 ? ' - ' : ' + ') + posCoefTex(f) + r(s.src);
  }
  return '';
}

function applyOp(M, s) {
  const A = cloneM(M);
  if (s.type === 'swap') { const t = A[s.a]; A[s.a] = A[s.b]; A[s.b] = t; }
  else if (s.type === 'scale') { A[s.target] = A[s.target].map(x => x.mul(s.factor)); }
  else if (s.type === 'replace') { A[s.target] = A[s.target].map((x, k) => x.add(s.factor.mul(A[s.src][k]))); }
  return A;
}

/* Returns every elementary row operation (one per step) taking M to RREF, following
   the course algorithm: forward phase to REF, then backward phase from the rightmost pivot. */
function rrefSteps(M0) {
  let M = toFracM(M0);
  const m = M.length, n = M[0].length;
  const steps = [{ type: 'start', M: cloneM(M), pivots: [], changed: [], phase: 'start', tex: '', why: 'This is the starting matrix.' }];
  const pivots = [];
  let r = 0;
  const push = (op, why, phase) => {
    M = applyOp(M, op);
    const changed = op.type === 'swap' ? [op.a, op.b] : [op.target];
    steps.push(Object.assign({}, op, { M: cloneM(M), pivots: pivots.slice(), changed, phase, tex: opTex(op), why }));
  };
  for (let c = 0; c < n && r < m; c++) {
    let p = -1;
    for (let i = r; i < m; i++) if (!M[i][c].isZero()) { p = i; break; }
    if (p === -1) continue;
    if (!M[p][c].isOne()) {
      for (let i = r; i < m; i++) if (M[i][c].isOne()) { p = i; break; }
    }
    pivots.push([r, c]);
    if (p !== r) {
      const why = M[r][c].isZero()
        ? tx`The pivot position (row ${r + 1}, column ${c + 1}) holds a 0, so swap in a row that has a nonzero entry there.`
        : tx`Swap so the pivot position (row ${r + 1}, column ${c + 1}) holds a 1. This is optional, but it avoids fractions.`;
      push({ type: 'swap', a: r, b: p }, why, 'forward');
    }
    for (let i = r + 1; i < m; i++) {
      if (!M[i][c].isZero()) {
        const f = M[i][c].div(M[r][c]).neg();
        push({ type: 'replace', target: i, src: r, factor: f },
          tx`Create a 0 below the pivot in column ${c + 1}: the entry \(${M[i][c].toTex()}\) is cancelled by adding \(${multTex(f)}\) times row ${r + 1}.`, 'forward');
      }
    }
    r++;
  }
  const refIndex = steps.length - 1;
  for (let k = pivots.length - 1; k >= 0; k--) {
    const [pr, pc] = pivots[k];
    if (!M[pr][pc].isOne()) {
      const f = new Frac(1).div(M[pr][pc]);
      push({ type: 'scale', target: pr, factor: f }, tx`Scale row ${pr + 1} so its pivot becomes 1.`, 'backward');
    }
    for (let i = pr - 1; i >= 0; i--) {
      if (!M[i][pc].isZero()) {
        const f = M[i][pc].neg();
        push({ type: 'replace', target: i, src: pr, factor: f },
          tx`Create a 0 above the pivot in column ${pc + 1} (backward phase works upward from the rightmost pivot).`, 'backward');
      }
    }
  }
  return { steps, pivots, R: M, refIndex };
}

function rref(M0) { return rrefSteps(M0).R; }

function leadIndex(row) { return row.findIndex(x => !F(x).isZero()); }
function pivotPositions(R) {
  const out = [];
  R.forEach((row, i) => { const c = leadIndex(row); if (c >= 0) out.push([i, c]); });
  return out;
}
function isREF(M) {
  let last = -1, seenZero = false;
  for (const row of M) {
    const l = leadIndex(row);
    if (l === -1) { seenZero = true; continue; }
    if (seenZero || l <= last) return false;
    last = l;
  }
  return true;
}
function isRREF(M) {
  if (!isREF(M)) return false;
  for (const [i, c] of pivotPositions(M)) {
    if (!F(M[i][c]).isOne()) return false;
    for (let k = 0; k < M.length; k++) if (k !== i && !F(M[k][c]).isZero()) return false;
  }
  return true;
}

/* Interpret the RREF of an augmented matrix. */
function describeSystem(R) {
  const nv = R[0].length - 1;
  const pp = pivotPositions(R);
  const bad = pp.find(([, c]) => c === nv);
  if (bad) {
    return {
      status: 'none',
      html: tx`<span class="pill bad">Inconsistent: no solutions</span>
        <p>Row ${bad[0] + 1} says \(0x_1 + \cdots + 0x_${nv} = ${R[bad[0]][nv].toTex()}\), i.e. \(0 = ${R[bad[0]][nv].toTex()}\), which is impossible.
        The last (augmented) column is a pivot column, so by the Existence &amp; Uniqueness Theorem the system has no solution.</p>`
    };
  }
  const basic = new Map(pp.map(([i, c]) => [c, i]));
  const free = [];
  for (let j = 0; j < nv; j++) if (!basic.has(j)) free.push(j);
  const xv = (j) => 'x_{' + (j + 1) + '}';
  const lines = [];
  for (let j = 0; j < nv; j++) {
    if (basic.has(j)) {
      const i = basic.get(j);
      lines.push(xv(j) + ' &= ' + linTex(R[i][nv], free.map(f => ({ c: R[i][f].neg(), v: xv(f) }))));
    } else lines.push(xv(j) + ' &\\ \\text{is free}');
  }
  const eqs = '\\begin{aligned} ' + lines.join(' \\\\ ') + ' \\end{aligned}';
  const pivNames = [...basic.keys()].sort((a, b) => a - b).map(j => '\\(' + xv(j) + '\\)').join(', ') || 'none';
  const freeNames = free.map(j => '\\(' + xv(j) + '\\)').join(', ');
  if (!free.length) {
    const sol = [];
    for (let j = 0; j < nv; j++) sol.push(R[basic.get(j)][nv]);
    return {
      status: 'unique',
      html: tx`<span class="pill good">Consistent with a unique solution</span>
        <p>Every variable is basic (pivot in every coefficient column) and the last column is not a pivot column.</p>
        \[\vec{x} = ${vecTex(sol)}\]`
    };
  }
  const p = [], vs = free.map(() => []);
  for (let j = 0; j < nv; j++) {
    if (basic.has(j)) {
      const i = basic.get(j);
      p.push(R[i][nv]);
      free.forEach((f, k) => vs[k].push(R[i][f].neg()));
    } else {
      p.push(new Frac(0));
      free.forEach((f, k) => vs[k].push(new Frac(f === j ? 1 : 0)));
    }
  }
  const pZero = p.every(x => x.isZero());
  const param = (pZero ? '' : vecTex(p) + ' + ') + free.map((f, k) => xv(f) + vecTex(vs[k])).join(' + ');
  return {
    status: 'infinite',
    html: tx`<span class="pill info">Consistent with infinitely many solutions</span>
      <p>Basic variables: ${pivNames}. Free variable${free.length > 1 ? 's' : ''}: ${freeNames}. The last column is not a pivot column, so the system is consistent, and a free variable means infinitely many solutions.</p>
      \[${eqs}\]
      <p>Parametric vector form:</p>
      \[\vec{x} = ${param}\]`
  };
}

/* Interpret the RREF of a (non-augmented) matrix A in terms of its columns. */
function describeColumns(R) {
  const m = R.length, n = R[0].length;
  const pp = pivotPositions(R);
  const pc = pp.map(([, c]) => c);
  const everyRow = pp.length === m;
  const everyCol = pp.length === n;
  const a = (j) => '\\vec{a}_{' + (j + 1) + '}';
  const rel = [];
  for (let j = 0; j < n; j++) {
    if (pc.includes(j)) continue;
    const terms = pp.map(([i, c]) => ({ c: R[i][j], v: a(c) }));
    rel.push(a(j) + ' = ' + linTex(0, terms));
  }
  let html = tx`<p><b>Pivot columns:</b> ${pc.length ? pc.map(c => c + 1).join(', ') : 'none'} &nbsp;·&nbsp; <b>${pp.length}</b> pivot${pp.length === 1 ? '' : 's'} in a ${m}\(\times\)${n} matrix.</p>`;
  html += tx`<p>${everyRow ? '<span class="pill good">Pivot in every row</span>' : '<span class="pill bad">Not every row has a pivot</span>'}
    ${everyRow
      ? tx` The columns span \(\mathbb{R}^${m}\), and \(A\vec{x}=\vec{b}\) is consistent for <i>every</i> \(\vec{b}\in\mathbb{R}^${m}\) (Theorem 1.36).`
      : tx` The columns do <b>not</b> span \(\mathbb{R}^${m}\); some \(\vec{b}\) make \(A\vec{x}=\vec{b}\) inconsistent (Theorem 1.36).`}</p>`;
  html += tx`<p>${everyCol ? '<span class="pill good">Pivot in every column</span>' : '<span class="pill bad">Not every column has a pivot</span>'}
    ${everyCol
      ? tx` The columns are linearly independent, so \(A\vec{x}=\vec{0}\) has only the trivial solution.`
      : tx` The columns are linearly <b>dependent</b>, so \(A\vec{x}=\vec{0}\) has nontrivial solutions (free variables).`}</p>`;
  if (rel.length) {
    html += tx`<p>Each non-pivot column is a combination of the pivot columns. Read the weights straight from its column in the RREF:</p>\[\begin{aligned}${rel.map(s => s.replace(' = ', ' &= ')).join(' \\\\ ')}\end{aligned}\]`;
  }
  if (m === n && everyRow) html += tx`<p>Square with \(n\) pivots, so \(\text{RREF}(A)=I_${n}\).</p>`;
  return { html, everyRow, everyCol, pivotCols: pc };
}

/* ======================= UI components ======================= */
function el(tag, attrs = {}, html = '') {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') e.className = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v);
  }
  if (html) e.innerHTML = html;
  return e;
}

function mountReveal(root) {
  const steps = [...root.querySelectorAll(':scope > .step')];
  if (!steps.length) return;
  let shown = 1;
  const ctr = el('div', { class: 'reveal-controls' });
  const next = el('button', { class: 'btn small primary' }, 'Next step');
  const all = el('button', { class: 'btn small' }, 'Show all');
  const reset = el('button', { class: 'btn small' }, 'Reset');
  const cnt = el('span', { class: 'cnt' });
  ctr.append(next, all, reset, cnt);
  root.appendChild(ctr);
  const update = (animateIdx) => {
    steps.forEach((s, i) => {
      s.hidden = i >= shown;
      s.classList.toggle('appear', i === animateIdx);
    });
    cnt.textContent = 'Step ' + shown + ' of ' + steps.length;
    next.disabled = shown >= steps.length;
    all.disabled = shown >= steps.length;
  };
  next.onclick = () => { shown = Math.min(steps.length, shown + 1); update(shown - 1); };
  all.onclick = () => { shown = steps.length; update(-1); };
  reset.onclick = () => { shown = 1; update(-1); };
  update(-1);
}

function mountQuiz(root, questions, key, title) {
  root.innerHTML = '';
  const head = el('div', { class: 'quiz-head' });
  const scoreEl = el('span', { class: 'quiz-score' });
  const resetBtn = el('button', { class: 'btn small' }, 'Reset quiz');
  head.append(el('span', { class: 'title' }, title || 'Check your understanding'), el('span', { class: 'row' }));
  head.lastChild.append(scoreEl, resetBtn);
  root.appendChild(head);
  const results = new Array(questions.length).fill(null);
  const best = Store.get('quiz:' + key, null);
  const updateScore = () => {
    const answered = results.filter(r => r !== null).length;
    const right = results.filter(r => r === true).length;
    scoreEl.textContent = answered ? right + ' / ' + answered + ' correct' : (best ? 'Last score: ' + best : questions.length + ' questions');
    if (answered === questions.length) Store.set('quiz:' + key, right + '/' + questions.length);
  };
  questions.forEach((q, qi) => {
    const isTF = q.tf !== undefined;
    const choices = isTF ? ['True', 'False'] : q.choices;
    const answer = isTF ? (q.tf ? 0 : 1) : q.answer;
    const multi = Array.isArray(answer);
    const card = el('div', { class: 'q-card' });
    card.innerHTML = '<div class="q-num">Question ' + (qi + 1) + (isTF ? ' · True or False' : multi ? ' · Select all that apply' : '') + '</div>' +
      '<div class="q-text">' + q.q + '</div>';
    const ch = el('div', { class: 'q-choices' + (isTF ? ' inline' : '') });
    const fb = el('div', { class: 'q-feedback' });
    const btns = choices.map((c, ci) => {
      const b = el('button', { class: 'q-choice' }, c);
      b.onclick = () => {
        if (card.classList.contains('done')) return;
        if (multi) b.classList.toggle('selected');
        else grade([ci]);
      };
      ch.appendChild(b);
      return b;
    });
    card.append(ch);
    if (multi) {
      const sub = el('button', { class: 'btn small primary', style: 'margin-top:8px' }, 'Check answer');
      sub.onclick = () => {
        if (card.classList.contains('done')) return;
        grade(btns.map((b, i) => b.classList.contains('selected') ? i : -1).filter(i => i >= 0));
      };
      card.append(sub);
    }
    card.append(fb);
    function grade(sel) {
      card.classList.add('done');
      const want = multi ? answer : [answer];
      const ok = sel.length === want.length && sel.every(s => want.includes(s));
      btns.forEach((b, i) => {
        if (want.includes(i)) b.classList.add('correct');
        else if (sel.includes(i)) b.classList.add('wrong');
      });
      fb.classList.add('show');
      fb.innerHTML = '<span class="verdict ' + (ok ? 'good' : 'bad') + '">' + (ok ? 'Correct.' : 'Not quite.') + '</span>' + (q.explain || '');
      renderMath(fb);
      results[qi] = ok;
      updateScore();
    }
    root.appendChild(card);
  });
  resetBtn.onclick = () => mountQuiz(root, questions, key, title);
  renderMath(root);
  updateScore();
}

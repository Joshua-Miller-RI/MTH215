'use strict';

/* ======================= theme-aware canvas colors ======================= */
const isDark = () => document.documentElement.dataset.theme === 'dark';
const DARK_HEX = {
  '#2563eb': '#60a5fa', '#059669': '#34d399', '#7c3aed': '#a78bfa', '#dc2626': '#f87171',
  '#ea580c': '#fb923c', '#d97706': '#fbbf24', '#111827': '#f3f4f6', '#6b7280': '#a3aac2',
  '#9ca3b8': '#7c84a3', '#fff': '#171b2c',
  '#f1f2f7': '#1c2133', '#e9ebf3': '#232a3f', '#c9cdd9': '#394060', '#a0a7ba': '#737b98'
};
const DARK_RGB = {
  '124,58,237': '167,139,250', '37,99,235': '96,165,250', '5,150,105': '52,211,153',
  '55,48,163': '165,180,252', '79,70,229': '129,140,248', '100,116,139': '148,163,184'
};
function themeColor(c) {
  if (typeof c !== 'string' || !isDark()) return c;
  if (DARK_HEX[c]) return DARK_HEX[c];
  return c.replace(/^rgba\((\d+),(\d+),(\d+),/, (m, r, g, b) => {
    const k = DARK_RGB[r + ',' + g + ',' + b];
    return k ? 'rgba(' + k + ',' : m;
  });
}
// Lets every widget keep its light-mode colors in code; they are swapped at draw time in dark mode.
function themedContext(ctx) {
  return new Proxy(ctx, {
    get(t, k) { const v = t[k]; return typeof v === 'function' ? v.bind(t) : v; },
    set(t, k, v) { t[k] = (k === 'strokeStyle' || k === 'fillStyle') ? themeColor(v) : v; return true; }
  });
}

/* ======================= 2D coordinate plane ======================= */
class Plane {
  constructor(canvas, range = 6) {
    this.cv = canvas;
    this.ctx = themedContext(canvas.getContext('2d'));
    this.range = range;
    this.draw = null;
    this.resize();
    Plane.all.add(this);
    if (window.ResizeObserver) {
      new ResizeObserver(() => { this.resize(); if (this.draw) this.draw(); }).observe(canvas);
    }
  }
  static redrawAll() {
    Plane.all.forEach(p => {
      if (!p.cv.isConnected) Plane.all.delete(p);
      else if (p.draw) p.draw();
    });
  }
  resize() {
    const r = this.cv.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.w = r.width || 520; this.h = r.height || 390;
    this.cv.width = Math.round(this.w * dpr); this.cv.height = Math.round(this.h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.s = Math.min(this.w, this.h) / (2 * this.range);
    this.ox = this.w / 2; this.oy = this.h / 2;
  }
  X(x) { return this.ox + x * this.s; }
  Y(y) { return this.oy - y * this.s; }
  world(px, py) { return [(px - this.ox) / this.s, (this.oy - py) / this.s]; }
  clear() { this.ctx.clearRect(0, 0, this.w, this.h); }
  grid(step, light) {
    const c = this.ctx;
    const xr = Math.ceil(this.w / 2 / this.s), yr = Math.ceil(this.h / 2 / this.s);
    c.lineWidth = 1; c.strokeStyle = light ? '#f1f2f7' : '#e9ebf3';
    c.beginPath();
    for (let i = -xr; i <= xr; i++) { c.moveTo(this.X(i), 0); c.lineTo(this.X(i), this.h); }
    for (let j = -yr; j <= yr; j++) { c.moveTo(0, this.Y(j)); c.lineTo(this.w, this.Y(j)); }
    c.stroke();
    c.strokeStyle = light ? '#c9cdd9' : '#9ca3b8'; c.lineWidth = 1.3;
    c.beginPath();
    c.moveTo(0, this.Y(0)); c.lineTo(this.w, this.Y(0));
    c.moveTo(this.X(0), 0); c.lineTo(this.X(0), this.h);
    c.stroke();
    step = step || (this.range > 7 ? 2 : 1);
    c.fillStyle = '#a0a7ba'; c.font = '11px Segoe UI, sans-serif';
    c.textAlign = 'center'; c.textBaseline = 'top';
    for (let i = -xr; i <= xr; i++) if (i && i % step === 0) c.fillText(i, this.X(i), this.Y(0) + 3);
    c.textAlign = 'right'; c.textBaseline = 'middle';
    for (let j = -yr; j <= yr; j++) if (j && j % step === 0) c.fillText(j, this.X(0) - 4, this.Y(j));
  }
  seg(x0, y0, x1, y1, color, w = 2, dash) {
    const c = this.ctx;
    c.save(); c.strokeStyle = color; c.lineWidth = w; c.lineCap = 'round';
    if (dash) c.setLineDash(dash);
    c.beginPath(); c.moveTo(this.X(x0), this.Y(y0)); c.lineTo(this.X(x1), this.Y(y1)); c.stroke();
    c.restore();
  }
  arrow(x0, y0, x1, y1, color, w = 3, label, dash) {
    const c = this.ctx;
    const X0 = this.X(x0), Y0 = this.Y(y0), X1 = this.X(x1), Y1 = this.Y(y1);
    const len = Math.hypot(X1 - X0, Y1 - Y0);
    if (len < 1.5) { this.dot(x1, y1, color, 3.5); if (label) this.label(label, X1 + 8, Y1 - 8, color); return; }
    const ux = (X1 - X0) / len, uy = (Y1 - Y0) / len;
    const hs = Math.min(13, len * 0.45);
    c.save();
    c.strokeStyle = color; c.fillStyle = color; c.lineWidth = w; c.lineCap = 'round';
    if (dash) c.setLineDash(dash);
    c.beginPath(); c.moveTo(X0, Y0); c.lineTo(X1 - ux * hs * 0.75, Y1 - uy * hs * 0.75); c.stroke();
    c.setLineDash([]);
    c.beginPath();
    c.moveTo(X1, Y1);
    c.lineTo(X1 - ux * hs - uy * hs * 0.48, Y1 - uy * hs + ux * hs * 0.48);
    c.lineTo(X1 - ux * hs + uy * hs * 0.48, Y1 - uy * hs - ux * hs * 0.48);
    c.closePath(); c.fill();
    c.restore();
    if (label) this.label(label, X1 + ux * 12 + (Math.abs(uy) > 0.7 ? 10 : 0), Y1 + uy * 12 + (Math.abs(ux) > 0.7 ? -8 : 0), color);
  }
  label(text, X, Y, color, size = 13) {
    const c = this.ctx;
    c.save();
    c.font = '700 ' + size + 'px Segoe UI, sans-serif';
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.lineWidth = 4; c.strokeStyle = isDark() ? 'rgba(23,27,44,.92)' : 'rgba(255,255,255,.92)'; c.strokeText(text, X, Y);
    c.fillStyle = color; c.fillText(text, X, Y);
    c.restore();
  }
  dot(x, y, color, r = 5, ring) {
    const c = this.ctx;
    c.save(); c.beginPath(); c.arc(this.X(x), this.Y(y), r, 0, Math.PI * 2);
    if (ring) { c.lineWidth = 2.5; c.strokeStyle = color; c.fillStyle = '#fff'; c.fill(); c.stroke(); }
    else { c.fillStyle = color; c.fill(); }
    c.restore();
  }
  lineEq(a, b, k, color, w = 2.5, dash) { // a x + b y = k
    if (Math.abs(a) < 1e-12 && Math.abs(b) < 1e-12) return;
    const far = 200;
    if (Math.abs(b) > Math.abs(a)) this.seg(-far, (k + a * far) / b, far, (k - a * far) / b, color, w, dash);
    else this.seg((k + b * far) / a, -far, (k - b * far) / a, far, color, w, dash);
  }
  lineDir(px, py, dx, dy, color, w = 2, dash) {
    const L = Math.hypot(dx, dy); if (L < 1e-12) return;
    const k = 200 / L;
    this.seg(px - dx * k, py - dy * k, px + dx * k, py + dy * k, color, w, dash);
  }
  poly(pts, fill, stroke, w = 1.5) {
    const c = this.ctx;
    c.save(); c.beginPath();
    pts.forEach(([x, y], i) => i ? c.lineTo(this.X(x), this.Y(y)) : c.moveTo(this.X(x), this.Y(y)));
    c.closePath();
    if (fill) { c.fillStyle = fill; c.fill(); }
    if (stroke) { c.strokeStyle = stroke; c.lineWidth = w; c.stroke(); }
    c.restore();
  }
  polyline(pts, color, w = 1.5) {
    const c = this.ctx;
    c.save(); c.strokeStyle = color; c.lineWidth = w; c.beginPath();
    pts.forEach(([x, y], i) => i ? c.lineTo(this.X(x), this.Y(y)) : c.moveTo(this.X(x), this.Y(y)));
    c.stroke(); c.restore();
  }
}
Plane.all = new Set();

function addDrag(plane, getHandles, onMove, snap = 1) {
  const cv = plane.cv;
  let active = null;
  const pos = (e) => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const find = (px, py) => {
    let best = null, bd = 18;
    for (const h of getHandles()) {
      const d = Math.hypot(plane.X(h.x) - px, plane.Y(h.y) - py);
      if (d < bd) { bd = d; best = h; }
    }
    return best;
  };
  cv.addEventListener('pointerdown', e => {
    const [px, py] = pos(e);
    const h = find(px, py);
    if (h) { active = h; cv.setPointerCapture(e.pointerId); cv.style.cursor = 'grabbing'; e.preventDefault(); }
  });
  cv.addEventListener('pointermove', e => {
    const [px, py] = pos(e);
    if (active) {
      let [x, y] = plane.world(px, py);
      if (snap) { x = Math.round(x / snap) * snap; y = Math.round(y / snap) * snap; }
      const lim = plane.range;
      x = Math.max(-lim, Math.min(lim, x)); y = Math.max(-lim, Math.min(lim, y));
      active.set(x, y);
      onMove();
    } else cv.style.cursor = find(px, py) ? 'grab' : 'default';
  });
  const end = () => { active = null; cv.style.cursor = 'default'; };
  cv.addEventListener('pointerup', end);
  cv.addEventListener('pointercancel', end);
}

const num = (s, d = 0) => { try { return Frac.from(String(s)).valueOf(); } catch (e) { return d; } };
const ease = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
function animate(ms, fn, done) {
  const t0 = performance.now();
  const tick = (now) => {
    const t = Math.min(1, (now - t0) / ms);
    fn(ease(t));
    if (t < 1) requestAnimationFrame(tick); else if (done) done();
  };
  requestAnimationFrame(tick);
}

/* ======================= Widget: two lines (Section 1.1) ======================= */
Widgets.lines = function (root, cfg) {
  const presets = {
    one: { name: 'One solution', v: ['1', '-2', '-1', '-1', '3', '3'] },
    none: { name: 'No solution', v: ['-1', '2', '5', '2', '-4', '6'] },
    inf: { name: 'Infinitely many', v: ['3', '-9', '4', '-2', '6', '-8/3'] },
    ex15: { name: 'Example 1.5', v: ['4', '6', '-12', '-2', '1', '-10'] }
  };
  root.innerHTML = tx`
    <div class="w-title">Two equations = two lines</div>
    <div class="w-sub">Each equation \(ax+by=c\) is a line. A solution of the system is a point on <b>both</b> lines at once. Type any numbers (fractions like -8/3 are fine) and watch what happens.</div>
    <div class="w-grid">
      <canvas class="plane"></canvas>
      <div class="w-panel">
        <div class="lbl" style="color:#2563eb">Equation 1 (blue)</div>
        <div class="eqn-row"><input class="num" data-k="0"> \(x\) + <input class="num" data-k="1"> \(y\) = <input class="num" data-k="2"></div>
        <div class="lbl" style="color:#ea580c">Equation 2 (orange)</div>
        <div class="eqn-row"><input class="num" data-k="3"> \(x\) + <input class="num" data-k="4"> \(y\) = <input class="num" data-k="5"></div>
        <div class="lbl">Presets</div>
        <div class="row preset-row"></div>
        <div class="w-out"></div>
      </div>
    </div>`;
  renderMath(root);
  const inputs = [...root.querySelectorAll('input.num')];
  const out = root.querySelector('.w-out');
  const pr = root.querySelector('.preset-row');
  Object.entries(presets).forEach(([k, p]) => {
    const b = el('button', { class: 'btn small' }, p.name);
    b.onclick = () => { p.v.forEach((v, i) => inputs[i].value = v); update(); };
    pr.appendChild(b);
  });
  (presets[cfg.preset || 'one']).v.forEach((v, i) => inputs[i].value = v);
  const plane = new Plane(root.querySelector('canvas'), 6);
  let sol = null, vals = [];
  plane.draw = () => {
    plane.clear(); plane.grid();
    const [a1, b1, c1, a2, b2, c2] = vals;
    plane.lineEq(a1, b1, c1, '#2563eb', 3);
    plane.lineEq(a2, b2, c2, '#ea580c', 3, sol && sol.status === 'infinite' ? [10, 8] : null);
    if (sol && sol.status === 'unique') {
      plane.dot(sol.x, sol.y, '#7c3aed', 6);
      plane.label('(' + fmtNum(sol.x) + ', ' + fmtNum(sol.y) + ')', plane.X(sol.x) + 8, plane.Y(sol.y) - 16, '#7c3aed');
    }
  };
  function update() {
    let M;
    try { M = [inputs.slice(0, 3).map(i => F(i.value)), inputs.slice(3).map(i => F(i.value))]; }
    catch (e) { out.innerHTML = '<span class="pill bad">Check your entries</span>'; return; }
    vals = M.flat().map(x => x.valueOf());
    const R = rref(M);
    const d = describeSystem(R);
    sol = { status: d.status };
    let msg = '';
    if (d.status === 'unique') {
      sol.x = R[0][2].valueOf(); sol.y = R[1][2].valueOf();
      msg = tx`<p>The lines cross at exactly one point, which is the unique solution \((x,y)=(${R[0][2].toTex()}, ${R[1][2].toTex()})\).</p>`;
    } else if (d.status === 'none') msg = '<p>The lines are parallel and never meet, so no point is on both. The system is inconsistent.</p>';
    else msg = '<p>Both equations describe the <b>same line</b>, so every point on it solves both equations. There are infinitely many solutions.</p>';
    out.innerHTML = tx`<div class="small muted">Augmented matrix, then its RREF:</div>
      \[${matTex(M, { aug: true })} \;\longrightarrow\; ${matTex(R, { aug: true, pivots: pivotPositions(R) })}\]
      ${d.status === 'unique' ? '<span class="pill good">One solution</span>' : d.status === 'none' ? '<span class="pill bad">No solution</span>' : '<span class="pill info">Infinitely many solutions</span>'}
      ${msg}`;
    renderMath(out);
    plane.draw();
  }
  inputs.forEach(i => i.addEventListener('input', update));
  update();
};

/* ======================= Widget: linear combinations in R^2 (Section 1.3) ======================= */
Widgets.combo = function (root, cfg) {
  const st = {
    v1: (cfg.v1 || [2, 1]).slice(), v2: (cfg.v2 || [-2, 2]).slice(),
    c1: cfg.c1 ?? 1, c2: cfg.c2 ?? 1, span: cfg.showSpan ?? true, target: null
  };
  const targets = cfg.targets || [];
  root.innerHTML = tx`
    <div class="w-title">${cfg.title || 'Build linear combinations'}</div>
    <div class="w-sub">${cfg.sub || tx`Drag the tips of \(\vec v_1\) and \(\vec v_2\). Use the sliders to choose the weights \(c_1, c_2\). The purple arrow is \(c_1\vec v_1 + c_2\vec v_2\), built tip-to-tail.`}</div>
    <div class="w-grid">
      <canvas class="plane tall"></canvas>
      <div class="w-panel">
        <div class="lbl">Weights</div>
        <div class="slider-row"><span>\(c_1\)</span><input type="range" min="-5" max="5" step="0.25" data-c="1"><span class="val" data-v="1"></span></div>
        <div class="slider-row"><span>\(c_2\)</span><input type="range" min="-5" max="5" step="0.25" data-c="2"><span class="val" data-v="2"></span></div>
        <div class="w-out eq-out"></div>
        <div class="row" style="margin-top:8px">
          <label class="chk"><input type="checkbox" class="span-chk"> Show span</label>
        </div>
        <div class="lbl">Challenge: reach a target</div>
        <div class="row target-row"></div>
        <div class="target-msg" style="margin-top:6px"></div>
        <div class="algebra"></div>
        <div class="span-msg w-out small"></div>
      </div>
    </div>
    <div class="legend"><span style="--c:#2563eb">\(\vec v_1\) and \(c_1\vec v_1\)</span><span style="--c:#059669">\(\vec v_2\) and \(c_2\vec v_2\)</span><span style="--c:#7c3aed">\(c_1\vec v_1+c_2\vec v_2\)</span><span style="--c:#dc2626">target</span></div>`;
  renderMath(root);
  const sl1 = root.querySelector('[data-c="1"]'), sl2 = root.querySelector('[data-c="2"]');
  const val1 = root.querySelector('[data-v="1"]'), val2 = root.querySelector('[data-v="2"]');
  const eqOut = root.querySelector('.eq-out'), spanMsg = root.querySelector('.span-msg');
  const tRow = root.querySelector('.target-row'), tMsg = root.querySelector('.target-msg'), alg = root.querySelector('.algebra');
  const spanChk = root.querySelector('.span-chk');
  spanChk.checked = st.span;
  sl1.value = st.c1; sl2.value = st.c2;
  const plane = new Plane(root.querySelector('canvas'), cfg.range || 7);

  const mkTarget = (t) => {
    const b = el('button', { class: 'btn small' }, t.name);
    b.onclick = () => { st.target = t; alg.innerHTML = ''; tRow.querySelectorAll('.btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); update(); };
    tRow.appendChild(b);
  };
  targets.forEach(mkTarget);
  const rnd = el('button', { class: 'btn small' }, 'Random target');
  rnd.onclick = () => {
    let c1, c2;
    do { c1 = (Math.floor(Math.random() * 9) - 4) / 2; c2 = (Math.floor(Math.random() * 9) - 4) / 2; }
    while (Math.abs(c1 * st.v1[0] + c2 * st.v2[0]) > 6.5 || Math.abs(c1 * st.v1[1] + c2 * st.v2[1]) > 6.5 || (c1 === 0 && c2 === 0));
    st.target = { name: 'b', v: [c1 * st.v1[0] + c2 * st.v2[0], c1 * st.v1[1] + c2 * st.v2[1]] };
    tRow.querySelectorAll('.btn').forEach(x => x.classList.remove('active'));
    alg.innerHTML = ''; update();
  };
  const how = el('button', { class: 'btn small' }, 'Show me the algebra');
  how.onclick = () => {
    if (!st.target) { alg.innerHTML = '<p class="small muted">Pick a target first.</p>'; return; }
    const M = [[st.v1[0], st.v2[0], st.target.v[0]], [st.v1[1], st.v2[1], st.target.v[1]]].map(r => r.map(F));
    const R = rref(M);
    const d = describeSystem(R);
    alg.innerHTML = tx`<div class="w-out small">Asking "is \(\vec ${st.target.name}\) a combination of \(\vec v_1,\vec v_2\)?" means solving \(c_1\vec v_1 + c_2\vec v_2 = \vec ${st.target.name}\), i.e. row reducing \([\,\vec v_1\ \vec v_2 \mid \vec ${st.target.name}\,]\):
      \[${matTex(M, { aug: true })}\longrightarrow ${matTex(R, { aug: true, pivots: pivotPositions(R) })}\]
      ${d.status === 'unique' ? tx`So \(c_1 = ${R[0][2].toTex()}\) and \(c_2 = ${R[1][2].toTex()}\).` : d.status === 'none' ? 'Inconsistent, so this target is NOT in the span.' : 'Infinitely many weight choices work (the vectors are parallel).'}</div>`;
    renderMath(alg);
  };
  tRow.append(rnd, how);

  plane.draw = () => {
    const { v1, v2, c1, c2 } = st;
    plane.clear(); plane.grid();
    const det = v1[0] * v2[1] - v1[1] * v2[0];
    if (st.span) {
      if (Math.abs(det) > 1e-9) {
        for (let k = -12; k <= 12; k++) {
          plane.lineDir(k * v1[0], k * v1[1], v2[0], v2[1], 'rgba(124,58,237,.16)', 1.2);
          plane.lineDir(k * v2[0], k * v2[1], v1[0], v1[1], 'rgba(124,58,237,.16)', 1.2);
        }
      } else {
        const d = (v1[0] || v1[1]) ? v1 : v2;
        if (d[0] || d[1]) plane.lineDir(0, 0, d[0], d[1], 'rgba(124,58,237,.28)', 9);
      }
    }
    const p1 = [c1 * v1[0], c1 * v1[1]];
    const p = [p1[0] + c2 * v2[0], p1[1] + c2 * v2[1]];
    if (st.target) {
      plane.dot(st.target.v[0], st.target.v[1], '#dc2626', 8, true);
      plane.label(st.target.name, plane.X(st.target.v[0]) + 14, plane.Y(st.target.v[1]) - 14, '#dc2626');
    }
    plane.arrow(0, 0, p1[0], p1[1], 'rgba(37,99,235,.45)', 4);
    plane.arrow(p1[0], p1[1], p[0], p[1], 'rgba(5,150,105,.5)', 4);
    plane.arrow(0, 0, v1[0], v1[1], '#2563eb', 3, 'v₁');
    plane.arrow(0, 0, v2[0], v2[1], '#059669', 3, 'v₂');
    plane.arrow(0, 0, p[0], p[1], '#7c3aed', 3.5);
    plane.dot(v1[0], v1[1], '#2563eb', 6, true);
    plane.dot(v2[0], v2[1], '#059669', 6, true);
  };
  function update() {
    st.c1 = parseFloat(sl1.value); st.c2 = parseFloat(sl2.value); st.span = spanChk.checked;
    val1.textContent = st.c1; val2.textContent = st.c2;
    const { v1, v2, c1, c2 } = st;
    const p = [c1 * v1[0] + c2 * v2[0], c1 * v1[1] + c2 * v2[1]];
    tex(eqOut, fmtNum(c1) + vecTex(v1) + (c2 < 0 ? '' : '+') + fmtNum(c2) + vecTex(v2) + ' = ' + vecTex(p));
    const det = v1[0] * v2[1] - v1[1] * v2[0];
    spanMsg.innerHTML = Math.abs(det) > 1e-9
      ? tx`\(\vec v_1,\vec v_2\) are <b>not</b> scalar multiples of each other, so their span is the <b>entire plane</b> \(\mathbb{R}^2\). Every target can be reached.`
      : (v1[0] || v1[1] || v2[0] || v2[1])
        ? tx`\(\vec v_1,\vec v_2\) lie on the <b>same line</b> through the origin, so their span is only that line. Targets off the line cannot be reached.`
        : tx`Both vectors are \(\vec 0\), so the span is just \(\{\vec 0\}\).`;
    renderMath(spanMsg);
    if (st.target) {
      const hit = Math.abs(p[0] - st.target.v[0]) < 1e-6 && Math.abs(p[1] - st.target.v[1]) < 1e-6;
      tMsg.innerHTML = hit
        ? tx`<span class="success">You reached \(\vec ${st.target.name}\): \(\vec ${st.target.name} = ${fmtNum(c1)}\vec v_1 ${c2 < 0 ? '-' : '+'} ${fmtNum(Math.abs(c2))}\vec v_2\).</span>`
        : tx`Target \(\vec ${st.target.name} = ${vecTex(st.target.v)}\). Move the sliders until the purple arrow lands on the red circle.`;
      renderMath(tMsg);
    } else tMsg.innerHTML = '';
    plane.draw();
  }
  addDrag(plane, () => [
    { x: st.v1[0], y: st.v1[1], set: (x, y) => { st.v1 = [x, y]; } },
    { x: st.v2[0], y: st.v2[1], set: (x, y) => { st.v2 = [x, y]; } }
  ], () => { alg.innerHTML = ''; update(); });
  [sl1, sl2].forEach(s => s.addEventListener('input', update));
  spanChk.addEventListener('change', update);
  update();
};

/* ======================= Widget: vectors & span in R^3 ======================= */
Widgets.space3d = function (root, cfg) {
  const names = cfg.names || ['v_1', 'v_2', 'v_3'];
  const labels = names.map(n => n.replace('_1', '₁').replace('_2', '₂').replace('_3', '₃'));
  const colors = ['#2563eb', '#059669', '#ea580c'];
  root.innerHTML = tx`
    <div class="w-title">${cfg.title || 'Vectors and their span in 3D'}</div>
    <div class="w-sub">Drag the picture to rotate it. The shaded region is the <b>span</b>: a line, a plane, or all of \(\mathbb{R}^3\). Edit the vectors or try a preset.</div>
    <div class="w-grid">
      <canvas class="plane tall"></canvas>
      <div class="w-panel">
        <div class="lbl">Vectors (use the checkboxes to include or exclude)</div>
        <div class="vec-inputs"></div>
        <div class="lbl">Presets</div>
        <div class="row preset-row"></div>
        <div class="row" style="margin-top:8px"><label class="chk"><input type="checkbox" class="spin" checked> Auto-rotate</label></div>
        <div class="w-out analysis"></div>
      </div>
    </div>`;
  renderMath(root.querySelector('.w-sub'));
  const vin = root.querySelector('.vec-inputs');
  const rows = [0, 1, 2].map(i => {
    const r = el('div', { class: 'eqn-row' });
    r.innerHTML = tx`<input type="checkbox" checked> <span style="color:${colors[i]};font-weight:700;min-width:26px">\(\vec ${names[i]}\)</span> = ( <input class="num" style="width:50px"> , <input class="num" style="width:50px"> , <input class="num" style="width:50px"> )`;
    vin.appendChild(r);
    return { chk: r.querySelector('input[type=checkbox]'), ins: [...r.querySelectorAll('input.num')] };
  });
  renderMath(vin);
  const setVecs = (vecs) => {
    rows.forEach((r, i) => {
      const v = vecs[i];
      r.chk.checked = !!v;
      r.ins.forEach((inp, k) => inp.value = v ? v[k] : (inp.value || 0));
    });
    update();
  };
  const pr = root.querySelector('.preset-row');
  (cfg.presets || []).forEach(p => {
    const b = el('button', { class: 'btn small' }, p.name);
    b.onclick = () => setVecs(p.vecs);
    pr.appendChild(b);
  });
  const cv = root.querySelector('canvas');
  const plane = new Plane(cv, 6);
  const ctx = plane.ctx;
  let yaw = -0.75, pitch = 0.42, vecs = [], basis = [], rank = 0;
  const spin = root.querySelector('.spin');
  const analysis = root.querySelector('.analysis');

  function project(v, L) {
    const s = Math.min(plane.w, plane.h) / (2.7 * L);
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const x1 = v[0] * cy - v[1] * sy, y1 = v[0] * sy + v[1] * cy;
    const z2 = y1 * sp + v[2] * cp;
    return [plane.w / 2 + x1 * s, plane.h / 2 - z2 * s];
  }
  const sub = (a, b) => a.map((x, i) => x - b[i]);
  const scal = (k, a) => a.map(x => k * x);
  const add = (a, b) => a.map((x, i) => x + b[i]);
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const norm = (a) => Math.sqrt(dot(a, a));

  function line3(a, b, color, w = 1.5, L, dash) {
    const A = project(a, L), B = project(b, L);
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; if (dash) ctx.setLineDash(dash);
    ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); ctx.restore();
  }
  function arrow3(v, color, label, L) {
    const O = project([0, 0, 0], L), P = project(v, L);
    const len = Math.hypot(P[0] - O[0], P[1] - O[1]);
    ctx.save(); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 3.2; ctx.lineCap = 'round';
    if (len > 2) {
      const ux = (P[0] - O[0]) / len, uy = (P[1] - O[1]) / len, hs = Math.min(13, len * 0.4);
      ctx.beginPath(); ctx.moveTo(O[0], O[1]); ctx.lineTo(P[0] - ux * hs * .7, P[1] - uy * hs * .7); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(P[0], P[1]);
      ctx.lineTo(P[0] - ux * hs - uy * hs * .48, P[1] - uy * hs + ux * hs * .48);
      ctx.lineTo(P[0] - ux * hs + uy * hs * .48, P[1] - uy * hs - ux * hs * .48);
      ctx.closePath(); ctx.fill();
    } else { ctx.beginPath(); ctx.arc(P[0], P[1], 4, 0, 7); ctx.fill(); }
    ctx.restore();
    plane.label(label, P[0] + 12, P[1] - 10, color, 14);
  }
  plane.draw = () => {
    plane.clear();
    const active = vecs.filter(Boolean);
    const L = Math.max(3, ...active.flatMap(v => v.map(Math.abs))) * 1.15;
    if (rank === 2) {
      const a = basis[0], b = basis[1];
      const u = scal(1 / norm(a), a);
      let w = sub(b, scal(dot(b, u), u)); w = scal(1 / norm(w), w);
      const P = L * 1.25;
      const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([s, t]) => project(add(scal(s * P, u), scal(t * P, w)), L));
      ctx.save(); ctx.fillStyle = 'rgba(124,58,237,.13)'; ctx.strokeStyle = 'rgba(124,58,237,.45)'; ctx.lineWidth = 1.2;
      ctx.beginPath(); corners.forEach((c, i) => i ? ctx.lineTo(c[0], c[1]) : ctx.moveTo(c[0], c[1])); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
      for (let k = -4; k <= 4; k++) {
        const t = k * P / 4;
        line3(add(scal(t, u), scal(-P, w)), add(scal(t, u), scal(P, w)), 'rgba(124,58,237,.18)', 1, L);
        line3(add(scal(-P, u), scal(t, w)), add(scal(P, u), scal(t, w)), 'rgba(124,58,237,.18)', 1, L);
      }
    } else if (rank === 1) {
      const b = scal(1 / norm(basis[0]), basis[0]);
      line3(scal(-1.6 * L, b), scal(1.6 * L, b), 'rgba(124,58,237,.35)', 8, L);
    } else if (rank === 3) {
      const c = L;
      const pts = [[-c, -c, -c], [c, -c, -c], [c, c, -c], [-c, c, -c], [-c, -c, c], [c, -c, c], [c, c, c], [-c, c, c]];
      [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]
        .forEach(([i, j]) => line3(pts[i], pts[j], 'rgba(124,58,237,.25)', 1, L, [4, 4]));
      ctx.save(); ctx.fillStyle = 'rgba(124,58,237,.06)'; ctx.fillRect(0, 0, plane.w, plane.h); ctx.restore();
      plane.label('span = all of ℝ³', 80, 20, '#7c3aed', 14);
    }
    const ax = [[[1, 0, 0], 'x₁'], [[0, 1, 0], 'x₂'], [[0, 0, 1], 'x₃']];
    ax.forEach(([e, name]) => {
      line3(scal(-L, e), scal(L, e), '#9ca3b8', 1.3, L);
      const P = project(scal(L * 1.08, e), L);
      plane.label(name, P[0], P[1], '#6b7280', 12);
    });
    vecs.forEach((v, i) => { if (v) arrow3(v, colors[i], labels[i], L); });
  };
  function update() {
    try {
      vecs = rows.map(r => r.chk.checked ? r.ins.map(i => num(i.value)) : null);
    } catch (e) { return; }
    const idx = vecs.map((v, i) => v ? i : -1).filter(i => i >= 0);
    if (!idx.length) { rank = 0; basis = []; analysis.innerHTML = 'Include at least one vector.'; plane.draw(); return; }
    let M;
    try { M = [0, 1, 2].map(r => idx.map(i => F(rows[i].ins[r].value || 0))); }
    catch (e) { analysis.innerHTML = '<span class="pill bad">Check the vector entries</span>'; return; }
    const R = rref(M);
    const pp = pivotPositions(R);
    rank = pp.length;
    basis = pp.map(([, c]) => vecs[idx[c]]);
    const k = idx.length;
    const vn = (i) => '\\vec ' + names[idx[i]];
    const rels = [];
    for (let j = 0; j < k; j++) {
      if (pp.some(([, c]) => c === j)) continue;
      rels.push(vn(j) + ' = ' + linTex(0, pp.map(([i, c]) => ({ c: R[i][j], v: vn(c) }))));
    }
    const what = rank === 0 ? tx`just the origin \(\{\vec 0\}\)` : rank === 1 ? 'a <b>line</b> through the origin' : rank === 2 ? 'a <b>plane</b> through the origin' : tx`<b>all of</b> \(\mathbb{R}^3\)`;
    analysis.innerHTML = tx`\[ [\,${idx.map(i => '\\vec ' + names[i]).join('\\ ')}\,] = ${matTex(M)} \sim ${matTex(R, { pivots: pp })}\]
      <p><b>${rank}</b> pivot${rank === 1 ? '' : 's'} for ${k} vector${k === 1 ? '' : 's'}. The span is ${what}.</p>
      <p>${rank === k ? '<span class="pill good">Linearly independent</span> Pivot in every column, so no vector is a combination of the others.' : '<span class="pill bad">Linearly dependent</span> Some column has no pivot.'}</p>
      ${rels.length ? tx`\[${rels.join(',\\qquad ')}\]` : ''}
      <p class="small muted">${rank === 3 ? 'Pivot in every row too, so these vectors span R³.' : 'Not every row has a pivot, so these vectors do not span R³.'}</p>`;
    renderMath(analysis);
    plane.draw();
  }
  rows.forEach(r => { r.chk.addEventListener('change', update); r.ins.forEach(i => i.addEventListener('input', update)); });
  let drag = null;
  cv.addEventListener('pointerdown', e => { drag = [e.clientX, e.clientY]; cv.setPointerCapture(e.pointerId); spin.checked = false; });
  cv.addEventListener('pointermove', e => {
    if (!drag) return;
    yaw += (e.clientX - drag[0]) * 0.01;
    pitch = Math.max(-1.4, Math.min(1.4, pitch + (e.clientY - drag[1]) * 0.01));
    drag = [e.clientX, e.clientY];
    plane.draw();
  });
  cv.addEventListener('pointerup', () => drag = null);
  cv.style.cursor = 'grab';
  const loop = () => {
    if (!document.body.contains(root)) return;
    if (spin.checked) { yaw += 0.004; plane.draw(); }
    requestAnimationFrame(loop);
  };
  setVecs(cfg.vecs || [[2, 2, 0], [1, 1, -1], [-1, 0, 1]]);
  requestAnimationFrame(loop);
};

/* ======================= Widget: matrix-vector product (Section 1.4) ======================= */
Widgets.matvec = function (root, cfg) {
  root.innerHTML = tx`
    <div class="w-title">Matrix &times; vector, step by step</div>
    <div class="w-sub">Type a matrix (rows separated by semicolons or new lines) and a vector. You'll see \(A\vec x\) computed both ways: as a combination of columns, and with the row-times-column shortcut.</div>
    <div class="w-grid" style="grid-template-columns:1fr 1fr">
      <div><div class="lbl small muted">Matrix A</div><textarea class="mat amat"></textarea></div>
      <div><div class="lbl small muted">Vector x (entries separated by spaces)</div><textarea class="mat xvec" style="min-height:44px"></textarea>
        <div class="row" style="margin-top:8px"><button class="btn primary go">Compute A x</button></div>
        <div class="row" style="margin-top:8px"><span class="small muted">Try:</span><span class="row ex-row"></span></div>
      </div>
    </div>
    <div class="mv-out"></div>`;
  renderMath(root.querySelector('.w-sub'));
  const aIn = root.querySelector('.amat'), xIn = root.querySelector('.xvec'), out = root.querySelector('.mv-out');
  aIn.value = cfg.A || '1 2 -1\n0 -5 3';
  xIn.value = cfg.x || '4 3 7';
  const examples = cfg.examples || [
    { name: 'Ex 1.32a', A: '1 2 -1\n0 -5 3', x: '4 3 7' },
    { name: 'Ex 1.32b', A: '2 -3\n8 0\n-5 2', x: '4 7' },
    { name: 'Review 19b', A: '2\n6\n-1', x: '1 -1' }
  ];
  const exRow = root.querySelector('.ex-row');
  examples.forEach(e => {
    const b = el('button', { class: 'btn small' }, e.name);
    b.onclick = () => { aIn.value = e.A; xIn.value = e.x; go(); };
    exRow.appendChild(b);
  });
  const paren = (f) => f.n < 0 ? '(' + f.toTex() + ')' : f.toTex();
  function go() {
    let A, x;
    try { A = parseMatrix(aIn.value).M; x = parseMatrix(xIn.value.replace(/\n/g, ' ')).M[0]; }
    catch (e) { out.innerHTML = '<p class="pill bad">' + e.message + '</p>'; return; }
    const m = A.length, n = A[0].length, k = x.length;
    const cols = [...Array(n).keys()].map(j => A.map(r => r[j]));
    let html = '<div class="reveal">';
    html += tx`<div class="step"><div class="step-label">Size check</div>
      \(A\) is \(${m}\times${n}\) (it has ${n} column${n > 1 ? 's' : ''}). \(\vec x\) has ${k} entr${k > 1 ? 'ies' : 'y'}.
      ${n === k ? tx` These match, so \(A\vec x\) is defined, and the answer is in \(\mathbb{R}^${m}\) (one entry per row of \(A\)).` : tx` <b>These don't match, so \(A\vec x\) is NOT defined.</b> You need one weight for each column of \(A\).`}</div>`;
    if (n === k) {
      const res = A.map(r => r.reduce((s, a, j) => s.add(a.mul(x[j])), new Frac(0)));
      const lc = cols.map((c, j) => paren(x[j]) + vecTex(c)).join(' + ');
      const scaled = cols.map((c, j) => vecTex(c.map(a => a.mul(x[j])))).join(' + ');
      html += tx`<div class="step"><div class="step-label">Definition: a combination of the columns</div>
        Use the entries of \(\vec x\) as weights on the columns of \(A\):
        \[A\vec x = ${x.map((_, j) => 'x_{' + (j + 1) + '}\\vec a_{' + (j + 1) + '}').join(' + ')} = ${lc}\]</div>`;
      html += tx`<div class="step"><div class="step-label">Scale each column</div>\[= ${scaled}\]</div>`;
      html += tx`<div class="step"><div class="step-label">Add</div>\[A\vec x = ${vecTex(res)}\]</div>`;
      const rowsTex = A.map((r, i) => '\\text{entry } ' + (i + 1) + ': &\\ ' + r.map((a, j) => paren(a) + '\\cdot' + paren(x[j])).join(' + ') + ' = ' + res[i].toTex()).join(' \\\\ ');
      html += tx`<div class="step"><div class="step-label">Shortcut check: row times column</div>
        Each entry of \(A\vec x\) is (row \(i\) of \(A\)) times \(\vec x\), multiplied entry by entry and then added:
        \[\begin{aligned}${rowsTex}\end{aligned}\]
        Same answer.</div>`;
    }
    html += '</div>';
    out.innerHTML = html;
    renderMath(out);
    mountReveal(out.querySelector('.reveal'));
  }
  root.querySelector('.go').onclick = go;
  go();
};

/* ======================= Widget: solution sets (Section 1.5) ======================= */
Widgets.solset = function (root, cfg) {
  const a = cfg.a || [1, -2];
  const st = { b: cfg.b ?? 3, t: 1 };
  root.innerHTML = tx`
    <div class="w-title">Homogeneous vs. nonhomogeneous solutions</div>
    <div class="w-sub">The equation is \(${linTex(0, [{ c: a[0], v: 'x_1' }, { c: a[1], v: 'x_2' }])} = b\) (one equation, two unknowns). Slide \(b\) and see how the solution line <b>shifts</b> without turning. Slide \(t\) to move along it.</div>
    <div class="w-grid">
      <canvas class="plane tall"></canvas>
      <div class="w-panel">
        <div class="slider-row"><span>\(b\)</span><input type="range" min="-6" max="6" step="0.5" class="sb"><span class="val vb"></span></div>
        <div class="slider-row"><span>\(t\)</span><input type="range" min="-3" max="3" step="0.1" class="st"><span class="val vt"></span></div>
        <div class="w-out out"></div>
      </div>
    </div>
    <div class="legend"><span style="--c:#9ca3b8">solutions of \(A\vec x=\vec 0\)</span><span style="--c:#2563eb">solutions of \(A\vec x=b\)</span><span style="--c:#ea580c">particular solution \(\vec p\)</span><span style="--c:#059669">\(t\vec v\)</span></div>`;
  renderMath(root);
  const sb = root.querySelector('.sb'), stt = root.querySelector('.st'), out = root.querySelector('.out');
  sb.value = st.b; stt.value = st.t;
  const plane = new Plane(root.querySelector('canvas'), 6);
  plane.draw = () => {
    const { b, t } = st;
    const p = [b / a[0], 0], v = [-a[1] / a[0], 1];
    const q = [p[0] + t * v[0], p[1] + t * v[1]];
    plane.clear(); plane.grid();
    plane.lineEq(a[0], a[1], 0, '#9ca3b8', 3, [9, 7]);
    plane.lineEq(a[0], a[1], b, '#2563eb', 3.2);
    plane.arrow(0, 0, v[0], v[1], 'rgba(5,150,105,.55)', 2.5, 'v');
    plane.arrow(0, 0, t * v[0], t * v[1], 'rgba(5,150,105,.35)', 2.5, null, [5, 5]);
    plane.arrow(0, 0, p[0], p[1], '#ea580c', 3.2, 'p');
    plane.arrow(p[0], p[1], q[0], q[1], '#059669', 3);
    plane.dot(q[0], q[1], '#7c3aed', 6);
    plane.label('p + t v', plane.X(q[0]) + 26, plane.Y(q[1]) - 14, '#7c3aed');
  };
  function update() {
    st.b = parseFloat(sb.value); st.t = parseFloat(stt.value);
    root.querySelector('.vb').textContent = st.b;
    root.querySelector('.vt').textContent = st.t;
    const p = [F(st.b).div(a[0]), F(0)], v = [F(-a[1]).div(a[0]), F(1)];
    const q = [p[0].add(v[0].mul(st.t)), p[1].add(v[1].mul(st.t))];
    out.innerHTML = tx`<div class="small muted">Homogeneous (\(b=0\)): a line through the origin</div>
      \[\vec x = t${vecTex(v)}\]
      <div class="small muted">Nonhomogeneous (\(b=${st.b}\)): the same line, shifted by \(\vec p\)</div>
      \[\vec x = \underbrace{${vecTex(p)}}_{\vec p} + t\underbrace{${vecTex(v)}}_{\vec v}\]
      <div class="small">At \(t=${st.t}\): \(\vec x = ${vecTex(q)}\). Check: \(${linTex(0, [{ c: a[0], v: '(' + fmtNum(q[0]) + ')' }, { c: a[1], v: '(' + fmtNum(q[1]) + ')' }])} = ${fmtNum(st.b)}\) ✓</div>
      ${st.b === 0 ? '<p class="small"><b>b = 0:</b> the two lines coincide, and p is the zero vector.</p>' : ''}`;
    renderMath(out);
    plane.draw();
  }
  [sb, stt].forEach(s => s.addEventListener('input', update));
  update();
};

/* ======================= Widget: linear transformations of the plane (1.8, 1.9) ======================= */
const TRANSFORM_PRESETS = [
  { id: 'identity', name: 'Identity  I₂ (does nothing)', A: [[1, 0], [0, 1]] },
  { id: 'mystery', name: 'Mystery function from 1.4', A: [[1, 3], [-2, 0]] },
  { id: 'rot', name: 'Rotation by angle θ', rot: Math.PI / 4 },
  { id: 'reflx', name: 'Reflection over the x-axis', A: [[1, 0], [0, -1]] },
  { id: 'refly', name: 'Reflection over the y-axis', A: [[-1, 0], [0, 1]] },
  { id: 'reflyx', name: 'Reflection over the line y = x', A: [[0, 1], [1, 0]] },
  { id: 'stretch', name: 'Stretch: x by 2, y by 3', A: [[2, 0], [0, 3]] },
  { id: 'shear', name: 'Horizontal shear', A: [[1, 1], [0, 1]] },
  { id: 'projx', name: 'Projection onto the x-axis', A: [[1, 0], [0, 0]] },
  { id: 'squash', name: 'Dependent columns (squash onto a line)', A: [[1, 2], [0.5, 1]] },
  { id: 'translate', name: 'NOT linear: T(x) = x + (1, 1)', nonlinear: true, f: (x, y) => [x + 1, y + 1],
    why: tx`\(T(\vec 0) = (1,1) \neq \vec 0\). A linear transformation must send \(\vec 0\) to \(\vec 0\). Look at the ring labeled \(T(\vec 0)\): the origin moved.` },
  { id: 'abs', name: 'NOT linear: T(x₁,x₂) = (x₁, |x₂|)', nonlinear: true, f: (x, y) => [x, Math.abs(y)],
    why: tx`\(T(\vec 0)=\vec 0\), but it still fails: \(T(-\vec e_2) = (0,1)\) while \(-T(\vec e_2) = (0,-1)\). The lower half-plane gets folded up, and grid lines bend at the x-axis.` },
  { id: 'bend', name: 'NOT linear: T(x₁,x₂) = (x₁, x₂ + 0.2x₁²)', nonlinear: true, f: (x, y) => [x, y + 0.2 * x * x],
    why: tx`Grid lines bend into curves. For example \(T(2\vec e_1) = (2, 0.8)\) but \(2T(\vec e_1) = (2, 0.4)\).` }
];
Widgets.transform = function (root, cfg) {
  const list = cfg.presets ? TRANSFORM_PRESETS.filter(p => cfg.presets.includes(p.id)) : TRANSFORM_PRESETS.filter(p => !p.nonlinear);
  const st = { p: list.find(p => p.id === cfg.initial) || list[0], A: [[1, 0], [0, 1]], theta: Math.PI / 4, t: 1, edited: false, x: [2, 1], shape: true };
  root.innerHTML = tx`
    <div class="w-title">${cfg.title || 'Watch a matrix transform the plane'}</div>
    <div class="w-sub">${cfg.sub || tx`Press <b>Play</b> to watch the grid move from "before" to "after". The red arrow is where \(\vec e_1\) lands and the green arrow is where \(\vec e_2\) lands. Those landing spots are exactly the <b>columns</b> of the matrix. Drag the purple point to see \(T(\vec x)\).`}</div>
    <div class="w-grid">
      <canvas class="plane tall"></canvas>
      <div class="w-panel">
        <div class="lbl">Transformation</div>
        <select class="psel"></select>
        <div class="theta-row" style="display:none">
          <div class="slider-row"><span>\(\theta\)</span><input type="range" min="-180" max="180" step="15" class="th"><span class="val thv"></span></div>
        </div>
        <div class="mat-row">
          <div class="lbl">Matrix A (edit me)</div>
          <div class="row" style="align-items:stretch">
            <span style="font-size:42px;line-height:1;font-weight:200">[</span>
            <div><div class="row"><input class="num m" data-i="0"><input class="num m" data-i="1"></div><div class="row" style="margin-top:4px"><input class="num m" data-i="2"><input class="num m" data-i="3"></div></div>
            <span style="font-size:42px;line-height:1;font-weight:200">]</span>
          </div>
        </div>
        <div class="row" style="margin-top:10px"><button class="btn primary play">Play</button>
          <input type="range" min="0" max="1" step="0.01" class="tt" style="flex:1"><span class="small muted">before → after</span></div>
        <div class="row" style="margin-top:6px"><label class="chk"><input type="checkbox" class="shp" checked> Show the "F" shape</label></div>
        <div class="w-out info"></div>
      </div>
    </div>
    <div class="legend"><span style="--c:#dc2626">\(T(\vec e_1)\) = column 1</span><span style="--c:#059669">\(T(\vec e_2)\) = column 2</span><span style="--c:#7c3aed">\(\vec x\) and \(T(\vec x)\)</span><span style="--c:#f59e0b">the F shape</span></div>`;
  renderMath(root);
  const sel = root.querySelector('.psel');
  list.forEach(p => sel.appendChild(el('option', { value: p.id }, p.name)));
  sel.value = st.p.id;
  const mins = [...root.querySelectorAll('input.m')];
  const th = root.querySelector('.th'), thv = root.querySelector('.thv');
  const tt = root.querySelector('.tt'), info = root.querySelector('.info');
  const plane = new Plane(root.querySelector('canvas'), cfg.range || 5);
  const rotM = (a) => [[Math.cos(a), -Math.sin(a)], [Math.sin(a), Math.cos(a)]];

  function loadPreset() {
    const p = st.p;
    st.edited = false;
    root.querySelector('.theta-row').style.display = p.rot !== undefined ? '' : 'none';
    root.querySelector('.mat-row').style.display = p.nonlinear ? 'none' : '';
    if (p.rot !== undefined) { th.value = Math.round(st.theta * 180 / Math.PI); st.A = rotM(st.theta); }
    else if (p.A) st.A = p.A.map(r => r.slice());
    syncInputs();
  }
  function syncInputs() {
    const flat = st.A.flat();
    mins.forEach((m, i) => m.value = +flat[i].toFixed(3));
  }
  function mapAt(x, y, t) {
    const p = st.p;
    if (p.nonlinear) { const [u, v] = p.f(x, y); return [(1 - t) * x + t * u, (1 - t) * y + t * v]; }
    let M;
    if (p.rot !== undefined && !st.edited) M = rotM(t * st.theta);
    else M = [[1 - t + t * st.A[0][0], t * st.A[0][1]], [t * st.A[1][0], 1 - t + t * st.A[1][1]]];
    return [M[0][0] * x + M[0][1] * y, M[1][0] * x + M[1][1] * y];
  }
  const F_SHAPE = [[0, 0], [0, 2], [1.2, 2], [1.2, 1.6], [0.4, 1.6], [0.4, 1.1], [1, 1.1], [1, 0.7], [0.4, 0.7], [0.4, 0]];
  plane.draw = () => {
    const t = st.t;
    plane.clear(); plane.grid(1, true);
    const N = 10, stp = 0.25;
    for (let k = -N; k <= N; k++) {
      const v = [], h = [];
      for (let s = -N; s <= N + 1e-9; s += stp) { v.push(mapAt(k, s, t)); h.push(mapAt(s, k, t)); }
      const col = k === 0 ? 'rgba(55,48,163,.75)' : 'rgba(79,70,229,.28)';
      plane.polyline(v, col, k === 0 ? 2 : 1.2);
      plane.polyline(h, col, k === 0 ? 2 : 1.2);
    }
    if (st.shape) {
      const pts = [];
      for (let i = 0; i < F_SHAPE.length; i++) {
        const a = F_SHAPE[i], b = F_SHAPE[(i + 1) % F_SHAPE.length];
        for (let s = 0; s < 1; s += 0.1) pts.push(mapAt(a[0] + (b[0] - a[0]) * s, a[1] + (b[1] - a[1]) * s, t));
      }
      plane.poly(pts, 'rgba(245,158,11,.35)', '#d97706', 1.6);
    }
    const o = mapAt(0, 0, t), e1 = mapAt(1, 0, t), e2 = mapAt(0, 1, t);
    plane.arrow(0, 0, e1[0], e1[1], '#dc2626', 3.5, 'T(e₁)');
    plane.arrow(0, 0, e2[0], e2[1], '#059669', 3.5, 'T(e₂)');
    const tx_ = mapAt(st.x[0], st.x[1], t);
    plane.arrow(0, 0, st.x[0], st.x[1], 'rgba(124,58,237,.35)', 2, null, [5, 5]);
    plane.dot(st.x[0], st.x[1], 'rgba(124,58,237,.6)', 6, true);
    plane.arrow(0, 0, tx_[0], tx_[1], '#7c3aed', 3, 'T(x)');
    if (st.p.nonlinear) {
      plane.dot(o[0], o[1], '#111827', 7, true);
      if (Math.hypot(o[0], o[1]) > 0.05) plane.label('T(0)', plane.X(o[0]) + 22, plane.Y(o[1]) + 14, '#111827');
    }
  };
  function updateInfo() {
    const p = st.p;
    if (p.nonlinear) {
      const Tx = p.f(st.x[0], st.x[1]);
      info.innerHTML = tx`<span class="pill bad">Not linear</span><p>${p.why}</p>
        <p class="small">\(\vec x = (${fmtNum(st.x[0])}, ${fmtNum(st.x[1])})\ \mapsto\ T(\vec x) = (${fmtNum(Tx[0])}, ${fmtNum(Tx[1])})\)</p>
        <p class="small muted">Linear maps keep the origin fixed and keep grid lines straight, parallel, and evenly spaced.</p>`;
    } else {
      const A = st.A, x = st.x;
      const Tx = [A[0][0] * x[0] + A[0][1] * x[1], A[1][0] * x[0] + A[1][1] * x[1]];
      const rotNote = p.rot !== undefined && !st.edited
        ? tx`<p class="small">Rotation matrix: \(\begin{bmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{bmatrix}\). For \(\theta=\pi/4\) it is \(\begin{bmatrix}\frac{\sqrt2}{2} & -\frac{\sqrt2}{2}\\ \frac{\sqrt2}{2} & \frac{\sqrt2}{2}\end{bmatrix}\).</p>` : '';
      const det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
      info.innerHTML = tx`\[A = \begin{bmatrix} ${fmtNum(A[0][0])} & ${fmtNum(A[0][1])} \\ ${fmtNum(A[1][0])} & ${fmtNum(A[1][1])}\end{bmatrix} = \big[\,T(\vec e_1)\ \ T(\vec e_2)\,\big]\]
        <p class="small">\(T(\vec e_1) = ${vecTex([A[0][0], A[1][0]])}\) (column 1), &nbsp; \(T(\vec e_2) = ${vecTex([A[0][1], A[1][1]])}\) (column 2)</p>
        <p class="small">\(T(\vec x) = x_1T(\vec e_1) + x_2T(\vec e_2) = ${fmtNum(x[0])}${vecTex([A[0][0], A[1][0]])} + ${fmtNum(x[1])}${vecTex([A[0][1], A[1][1]])} = ${vecTex(Tx)}\)</p>
        ${rotNote}
        ${Math.abs(det) < 1e-9 ? tx`<p class="small"><span class="pill warnp">Columns are dependent</span> The whole plane gets squashed onto a line (or a point), so the range is NOT all of \(\mathbb{R}^2\).</p>` : tx`<p class="small"><span class="pill good">Columns independent</span> The range is all of \(\mathbb{R}^2\).</p>`}`;
    }
    renderMath(info);
  }
  function update() { updateInfo(); plane.draw(); }
  sel.onchange = () => { st.p = list.find(p => p.id === sel.value); loadPreset(); play(); };
  th.oninput = () => { st.theta = th.value * Math.PI / 180; thv.textContent = th.value + '°'; st.A = rotM(st.theta); st.edited = false; syncInputs(); update(); };
  mins.forEach((m, i) => m.addEventListener('input', () => {
    const v = num(m.value, NaN);
    if (isNaN(v)) return;
    st.A[Math.floor(i / 2)][i % 2] = v; st.edited = true; update();
  }));
  tt.oninput = () => { st.t = parseFloat(tt.value); plane.draw(); };
  root.querySelector('.shp').onchange = (e) => { st.shape = e.target.checked; plane.draw(); };
  function play() {
    updateInfo();
    animate(1600, (t) => { st.t = t; tt.value = t; plane.draw(); });
  }
  root.querySelector('.play').onclick = play;
  addDrag(plane, () => [{ x: st.x[0], y: st.x[1], set: (x, y) => { st.x = [x, y]; } }], update, 0.5);
  if (st.p.rot !== undefined) thv.textContent = '45°';
  loadPreset();
  tt.value = 1;
  update();
};

/* ======================= Widget: animated row-reduction stepper ======================= */
Widgets.rrstepper = function (root, cfg) {
  let M, aug = !!cfg.aug;
  try {
    if (cfg.M) M = cfg.M;
    else { const p = parseMatrix(cfg.matrix); M = p.M; if (p.aug) aug = true; }
  } catch (e) { root.innerHTML = '<p class="pill bad">' + e.message + '</p>'; return; }
  const res = rrefSteps(M);
  const N = res.steps.length - 1;
  let k = 0, timer = null;
  root.classList.add('widget', 'stepper');
  root.innerHTML = tx`
    <div class="st-top"><div class="w-title">${cfg.title || 'Row reduction, one operation at a time'}</div><span class="phase pill info"></span></div>
    ${cfg.showSystem && aug ? '<div class="st-system"></div>' : ''}
    <div class="st-matrix"></div>
    <div class="st-op"></div>
    <div class="st-why"></div>
    <div class="row st-controls">
      <button class="btn small" data-a="first">&laquo; Start</button>
      <button class="btn small" data-a="prev">&lsaquo; Back</button>
      <button class="btn small primary" data-a="next">Next &rsaquo;</button>
      <button class="btn small" data-a="last">End &raquo;</button>
      <button class="btn small" data-a="play">Play</button>
      <span class="st-count"></span>
    </div>
    <div class="legend"><span style="--c:${COLORS.pivot}">pivot</span><span style="--c:${COLORS.changed}">row just changed</span></div>
    <div class="st-result"></div>`;
  const q = (s) => root.querySelector(s);
  if (cfg.showSystem && aug) { q('.st-system').innerHTML = '<div class="small muted">The system:</div>'; const d = el('div'); q('.st-system').appendChild(d); tex(d, systemTex(toFracM(M))); }
  const matEl = q('.st-matrix'), opEl = q('.st-op'), whyEl = q('.st-why'), cnt = q('.st-count'), resEl = q('.st-result'), phase = q('.phase');
  function show() {
    const s = res.steps[k];
    tex(matEl, matTex(s.M, { aug, pivots: s.pivots, hlRows: s.changed }));
    matEl.classList.remove('flash'); void matEl.offsetWidth; matEl.classList.add('flash');
    opEl.innerHTML = k === 0 ? 'Starting matrix' : 'Step ' + k + ': &nbsp;' + texStr(s.tex);
    let why = s.why;
    if (k === res.refIndex && N > 0) why += tx` <b>The matrix is now in row echelon form (REF).</b>${res.refIndex < N ? ' Next comes the backward phase, which produces RREF.' : ''}`;
    if (k === N) why += tx` <b>Done: this is the reduced row echelon form (RREF).</b>`;
    whyEl.innerHTML = why; renderMath(whyEl);
    phase.textContent = s.phase === 'forward' ? 'Forward phase: getting to REF' : s.phase === 'backward' ? 'Backward phase: REF to RREF' : (N === 0 ? 'Already in RREF' : 'Ready');
    cnt.textContent = k + ' / ' + N;
    if (k === N) {
      const d = aug ? describeSystem(res.R) : describeColumns(res.R);
      resEl.innerHTML = '<div class="w-out">' + (cfg.resultNote || '') + d.html + '</div>';
      renderMath(resEl);
    } else resEl.innerHTML = '';
  }
  const stop = () => { if (timer) { clearInterval(timer); timer = null; q('[data-a=play]').textContent = 'Play'; } };
  root.querySelectorAll('[data-a]').forEach(b => b.onclick = () => {
    const a = b.dataset.a;
    if (a === 'play') {
      if (timer) { stop(); return; }
      if (k === N) k = 0;
      b.textContent = 'Pause';
      show();
      timer = setInterval(() => { if (k >= N || !document.body.contains(root)) { stop(); return; } k++; show(); }, 1900);
      return;
    }
    stop();
    if (a === 'first') k = 0; else if (a === 'prev') k = Math.max(0, k - 1); else if (a === 'next') k = Math.min(N, k + 1); else k = N;
    show();
  });
  show();
};

/* ======================= Random system generator ======================= */
function randInt(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
function genSystem(type, m, n) {
  for (let attempt = 0; attempt < 400; attempt++) {
    let r;
    if (type === 'unique') { if (m < n) return null; r = n; }
    else if (type === 'infinite') r = Math.min(m, n - 1);
    else r = Math.min(m - 1, n);
    if (r < 1 && type !== 'none') return null;
    const cols = [...Array(n).keys()];
    let pc;
    if (type === 'unique') pc = cols;
    else { pc = cols.slice().sort(() => Math.random() - 0.5).slice(0, r).sort((a, b) => a - b); if (type === 'none' && r === n && m <= n) continue; }
    const R = [...Array(m)].map(() => new Array(n + 1).fill(0));
    pc.forEach((c, i) => {
      R[i][c] = 1;
      for (let j = c + 1; j < n; j++) if (!pc.includes(j)) R[i][j] = randInt(-3, 3);
      R[i][n] = randInt(-5, 5);
    });
    if (type === 'none') { if (r >= m) continue; R[r][n] = randInt(1, 4) * (Math.random() < .5 ? -1 : 1); }
    const A = R.map(row => row.slice());
    const ops = randInt(5, 9);
    for (let o = 0; o < ops; o++) {
      const i = randInt(0, m - 1); let j = randInt(0, m - 1);
      if (i === j) j = (j + 1) % m;
      if (Math.random() < 0.15) { const t = A[i]; A[i] = A[j]; A[j] = t; }
      else { const k = randInt(-3, 3) || 1; for (let c = 0; c <= n; c++) A[i][c] += k * A[j][c]; }
    }
    const maxAbs = Math.max(...A.flat().map(Math.abs));
    if (maxAbs > 14) continue;
    if (A.some(row => row.slice(0, n).every(x => x === 0))) continue;
    if (A.every(row => row[0] === 0)) continue;
    if (isRREF(toFracM(A))) continue;
    if (describeSystem(rref(A)).status !== type) continue;
    return toFracM(A);
  }
  return null;
}

/* ======================= Widget: Row Reduction Lab ======================= */
Widgets.lab = function (root, cfg) {
  root.classList.add('widget');
  root.innerHTML = tx`
    <div class="tabs">
      <button class="btn small" data-tab="solver">Step-by-step solver</button>
      <button class="btn small" data-tab="diy">Do it yourself</button>
      <button class="btn small" data-tab="random">Random practice problems</button>
    </div>
    <div data-pane="solver">
      <p class="small muted" style="margin-top:0">Type any matrix. Separate entries with spaces and rows with new lines or semicolons. Put a <code>|</code> before the last column to mark an augmented matrix. Fractions like <code>-7/13</code> work.</p>
      <textarea class="mat s-in"></textarea>
      <div class="row" style="margin-top:8px">
        <label class="chk"><input type="radio" name="mode-${Math.random()}" value="aug" class="m-aug"> It's an augmented matrix (solve the system)</label>
        <label class="chk"><input type="radio" name="mode-x" value="mat" class="m-mat"> It's just a matrix (analyze its columns)</label>
      </div>
      <div class="row" style="margin-top:8px"><button class="btn primary s-go">Row reduce, step by step</button><span class="small muted">Examples:</span><span class="row s-ex"></span></div>
      <div class="s-out"></div>
    </div>
    <div data-pane="diy">
      <p class="small muted" style="margin-top:0">This is exam practice: <b>you</b> choose each row operation and the lab does the arithmetic and keeps a log, the way you must write it on the exam. Use "Hint" if you're stuck.</p>
      <textarea class="mat d-in" style="min-height:70px"></textarea>
      <div class="row" style="margin-top:6px"><button class="btn small d-load">Load this matrix</button><span class="d-status"></span></div>
      <div class="diy-matrix" style="margin-top:10px"></div>
      <div class="row" style="margin-top:10px">
        <select class="d-type">
          <option value="replace">Replacement: Ri ← Ri + c·Rj</option>
          <option value="swap">Interchange: Ri ↔ Rj</option>
          <option value="scale">Scaling: Ri ← c·Ri (c ≠ 0)</option>
        </select>
        <span>i =</span><select class="d-i"></select>
        <span class="d-jwrap">j =</span><select class="d-j"></select>
        <span class="d-cwrap">c =</span><input class="num d-c" value="1">
      </div>
      <div class="row" style="margin-top:8px">
        <button class="btn primary d-apply">Apply</button>
        <button class="btn d-undo">Undo</button>
        <button class="btn d-hint">Hint</button>
      </div>
      <div class="d-msg small" style="margin-top:6px"></div>
      <div class="lbl small muted" style="margin-top:10px;font-weight:700">Your work (operations used)</div>
      <div class="oplog"></div>
      <div class="d-result"></div>
    </div>
    <div data-pane="random">
      <div class="row">
        <select class="r-type">
          <option value="any">Surprise me</option>
          <option value="unique">Unique solution</option>
          <option value="infinite">Infinitely many solutions</option>
          <option value="none">No solution</option>
        </select>
        <select class="r-size">
          <option value="2,2">2 equations, 2 unknowns</option>
          <option value="3,3" selected>3 equations, 3 unknowns</option>
          <option value="2,3">2 equations, 3 unknowns</option>
          <option value="3,4">3 equations, 4 unknowns</option>
          <option value="3,2">3 equations, 2 unknowns</option>
          <option value="4,4">4 equations, 4 unknowns</option>
        </select>
        <button class="btn primary r-go">New problem</button>
      </div>
      <div class="r-prob"></div>
      <div class="r-sol"></div>
    </div>`;
  const q = (s) => root.querySelector(s);
  const mAug = q('.m-aug'), mMat = q('.m-mat');
  const gname = 'mode-' + Math.random().toString(36).slice(2);
  mAug.name = gname; mMat.name = gname;
  const tabs = [...root.querySelectorAll('[data-tab]')];
  const showTab = (name) => {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    root.querySelectorAll('[data-pane]').forEach(p => p.style.display = p.dataset.pane === name ? '' : 'none');
  };
  tabs.forEach(t => t.onclick = () => showTab(t.dataset.tab));

  // ---- solver
  const sIn = q('.s-in'), sOut = q('.s-out');
  sIn.value = cfg.matrix || '0 1 -4 | 8\n2 -3 2 | 1\n4 -8 12 | 1';
  (cfg.mode === 'matrix' ? mMat : mAug).checked = true;
  sIn.addEventListener('input', () => { if (sIn.value.includes('|')) mAug.checked = true; });
  const exs = cfg.examples || [
    { name: 'Ex 1.6 (no solution)', m: '0 1 -4 | 8\n2 -3 2 | 1\n4 -8 12 | 1' },
    { name: 'Ex 1.13', m: '0 3 -6 6 4 -5\n3 -7 8 -5 8 9\n3 -9 12 -9 6 15', mode: 'mat' },
    { name: 'Review 20', m: '1 -2 3 | 9\n-1 3 0 | -4\n2 -5 5 | 17' },
    { name: 'Ex 1.50 (columns)', m: '5 6 -1 -11 6\n-4 0 2 22 -6\n2 3 4 10 -2', mode: 'mat' }
  ];
  exs.forEach(e => {
    const b = el('button', { class: 'btn small' }, e.name);
    b.onclick = () => { sIn.value = e.m; (e.mode === 'mat' ? mMat : mAug).checked = true; solve(); };
    q('.s-ex').appendChild(b);
  });
  function solve() {
    let p;
    try { p = parseMatrix(sIn.value); } catch (e) { sOut.innerHTML = '<p><span class="pill bad">' + e.message + '</span></p>'; return; }
    const aug = p.aug || mAug.checked;
    if (aug && p.M[0].length < 2) { sOut.innerHTML = '<p><span class="pill bad">An augmented matrix needs at least 2 columns.</span></p>'; return; }
    sOut.innerHTML = '';
    const d = el('div'); sOut.appendChild(d);
    Widgets.rrstepper(d, { M: p.M, aug, showSystem: aug, title: aug ? 'Solving the system' : 'Analyzing the matrix' });
  }
  q('.s-go').onclick = solve;

  // ---- do it yourself
  let cur = null, hist = [], log = [], diyAug = true;
  const dIn = q('.d-in'), dMat = q('.diy-matrix'), dType = q('.d-type'), dI = q('.d-i'), dJ = q('.d-j'), dC = q('.d-c');
  const dMsg = q('.d-msg'), dLog = q('.oplog'), dRes = q('.d-result'), dStatus = q('.d-status');
  dIn.value = cfg.diy || '1 -2 3 | 9\n-1 3 0 | -4\n2 -5 5 | 17';
  function load(M, aug) {
    cur = M; diyAug = aug; hist = []; log = [];
    const opts = M.map((_, i) => '<option value="' + i + '">' + (i + 1) + '</option>').join('');
    dI.innerHTML = opts; dJ.innerHTML = opts; dJ.value = M.length > 1 ? 1 : 0;
    dMsg.innerHTML = ''; renderDiy();
  }
  function renderDiy() {
    tex(dMat, matTex(cur, { aug: diyAug, pivots: isREF(cur) ? pivotPositions(cur) : [] }));
    const ref = isREF(cur), rr = isRREF(cur);
    dStatus.innerHTML = (ref ? '<span class="pill good">REF ✓</span>' : '<span class="pill warnp">not REF yet</span>') + ' ' + (rr ? '<span class="pill good">RREF ✓</span>' : '<span class="pill warnp">not RREF yet</span>');
    dLog.innerHTML = log.length ? log.map((l, i) => '<div>' + (i + 1) + '. ' + texStr(l) + '</div>').join('') : '<div class="muted">No operations yet.</div>';
    if (rr) {
      const d = diyAug ? describeSystem(cur) : describeColumns(cur);
      dRes.innerHTML = '<div class="w-out"><b>You reached RREF in ' + log.length + ' operation' + (log.length === 1 ? '' : 's') + '.</b> ' + d.html + '</div>';
      renderMath(dRes);
    } else if (ref && diyAug && describeSystem(rref(cur)).status === 'none') {
      dRes.innerHTML = '<div class="w-out">' + describeSystem(rref(cur)).html + '<p class="small muted">You can stop here: once a row [0 … 0 | c] with c ≠ 0 appears, there are no solutions.</p></div>';
      renderMath(dRes);
    } else dRes.innerHTML = '';
    const t = dType.value;
    q('.d-jwrap').style.display = dJ.style.display = t === 'scale' ? 'none' : '';
    q('.d-cwrap').style.display = dC.style.display = t === 'swap' ? 'none' : '';
  }
  dType.onchange = renderDiy;
  q('.d-load').onclick = () => {
    try { const p = parseMatrix(dIn.value); load(p.M, p.aug); } catch (e) { dMsg.innerHTML = '<span class="pill bad">' + e.message + '</span>'; }
  };
  q('.d-apply').onclick = () => {
    if (!cur) return;
    const t = dType.value, i = +dI.value, j = +dJ.value;
    let c;
    try { c = F(dC.value); } catch (e) { dMsg.innerHTML = '<span class="pill bad">c must be a number like 3, -1/2, or 0.5</span>'; return; }
    let op;
    if (t === 'swap') { if (i === j) { dMsg.innerHTML = '<span class="pill bad">Pick two different rows.</span>'; return; } op = { type: 'swap', a: i, b: j }; }
    else if (t === 'scale') { if (c.isZero()) { dMsg.innerHTML = '<span class="pill bad">Scaling by 0 is NOT allowed. It destroys information.</span>'; return; } op = { type: 'scale', target: i, factor: c }; }
    else { if (i === j) { dMsg.innerHTML = '<span class="pill bad">Replacement uses a different row: Ri ← Ri + c·Rj with i ≠ j.</span>'; return; } op = { type: 'replace', target: i, src: j, factor: c }; }
    hist.push(cur); cur = applyOp(cur, op); log.push(opTex(op)); dMsg.innerHTML = '';
    renderDiy();
    dMat.classList.remove('flash'); void dMat.offsetWidth; dMat.classList.add('flash');
  };
  q('.d-undo').onclick = () => { if (hist.length) { cur = hist.pop(); log.pop(); renderDiy(); } };
  q('.d-hint').onclick = () => {
    if (!cur) return;
    const s = rrefSteps(cur).steps[1];
    if (!s) { dMsg.innerHTML = 'Already in RREF.'; return; }
    dMsg.innerHTML = 'Suggested next operation: ' + texStr(s.tex) + '. ' + s.why;
    renderMath(dMsg);
    dType.value = s.type;
    if (s.type === 'swap') { dI.value = s.a; dJ.value = s.b; }
    else if (s.type === 'scale') { dI.value = s.target; dC.value = s.factor.toString(); }
    else { dI.value = s.target; dJ.value = s.src; dC.value = s.factor.toString(); }
    renderDiy();
  };
  load(parseMatrix(dIn.value).M, true);

  // ---- random
  const rProb = q('.r-prob'), rSol = q('.r-sol');
  let lastProb = null;
  q('.r-go').onclick = () => {
    let type = q('.r-type').value;
    const [m, n] = q('.r-size').value.split(',').map(Number);
    if (type === 'any') {
      const opts = ['infinite', 'none']; if (m >= n) opts.push('unique', 'unique');
      type = opts[randInt(0, opts.length - 1)];
    }
    const A = genSystem(type, m, n);
    rSol.innerHTML = '';
    if (!A) {
      rProb.innerHTML = tx`<p class="w-out">That combination is impossible. ${type === 'unique' ? `With ${m} equations and ${n} unknowns there are at most ${m} pivots, which is fewer than ${n} variables, so there is always a free variable and never a unique solution.` : ''}</p>`;
      return;
    }
    lastProb = A;
    rProb.innerHTML = '<div class="w-out"><b>Solve the system.</b> Write the augmented matrix, state each row operation, and describe the solution set.<div class="sys"></div></div><div class="row" style="margin-top:8px"><button class="btn small r-diy">Practice it in "Do it yourself"</button><button class="btn small r-show">Show full solution</button></div>';
    tex(rProb.querySelector('.sys'), systemTex(A));
    rProb.querySelector('.r-diy').onclick = () => { dIn.value = matrixToText(lastProb, true); load(lastProb, true); showTab('diy'); };
    rProb.querySelector('.r-show').onclick = () => { rSol.innerHTML = ''; const d = el('div'); rSol.appendChild(d); Widgets.rrstepper(d, { M: lastProb, aug: true, title: 'Full solution' }); };
  };
  showTab(cfg.tab || 'solver');
  if (cfg.autorun !== false && (cfg.tab || 'solver') === 'solver') solve();
};

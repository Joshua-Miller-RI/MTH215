Site.register({
  id: 'home',
  num: '',
  title: 'Start here',
  group: 'Start',
  html: tx`
  <div class="hero">
    <canvas id="hero-canvas"></canvas>
    <div class="kicker" style="color:#c7d2fe">MTH 215 · Linear Algebra</div>
    <h1>Exam 1, from zero to confident</h1>
    <p>This guide teaches every topic on the exam (Sections 1.1, 1.2, 1.3, 1.4, 1.5, 1.7, 1.8, 1.9) as if you've never seen it. Each lesson mixes plain-English explanations, visuals you can play with, step-by-step worked examples, and quick self-checks.</p>
  </div>

  <h2 style="border-top:none;margin-top:.6em">The one question this whole exam is about</h2>
  <div class="box idea big">
    <div class="box-title">The big question</div>
    <p>You're given some equations. <b>Do they have a solution? If so, how many, and what are they?</b></p>
    <p>Almost everything on Exam 1 is this question in a different costume:</p>
    <ul>
      <li>"Is \(\vec b\) a linear combination of these vectors?" (Section 1.3)</li>
      <li>"Is \(\vec b\) in the span of the columns of \(A\)?" (1.3, 1.4)</li>
      <li>"Does \(A\vec x = \vec b\) have a solution for <i>every</i> \(\vec b\)?" (1.4)</li>
      <li>"Are these vectors linearly independent?" (1.7)</li>
      <li>"Is \(\vec b\) in the range of the transformation \(T\)?" (1.8)</li>
    </ul>
    <p>And every one is answered the same way: <b>write a matrix, row reduce it, and look at where the pivots are.</b> Once that clicks, this exam gets much easier.</p>
  </div>

  <div class="flow">
    <div class="node"><b>System of equations</b>\(x_1+4x_2=-1\)<br>\(\vdots\)</div>
    <div class="arrow">⇄</div>
    <div class="node"><b>Vector equation</b>\(x_1\vec a_1 + x_2\vec a_2 = \vec b\)</div>
    <div class="arrow">⇄</div>
    <div class="node"><b>Matrix equation</b>\(A\vec x = \vec b\)</div>
    <div class="arrow">⇄</div>
    <div class="node"><b>Augmented matrix</b>\([\,A \mid \vec b\,]\)</div>
  </div>
  <p class="center muted small">Four ways to write the same problem. Row reduction works on the last one, and pivots give the answer.</p>

  <h2>The lessons</h2>
  <p>Go in order. Each section builds on the one before. Mark a section as understood at the bottom of its page to track your progress.</p>
  <div class="cards" id="home-cards"></div>

  <h2>About the exam (from your review sheet)</h2>
  <table class="tbl">
    <tr><th>What</th><th>Details</th></tr>
    <tr><td>Length</td><td>50 minutes, during normal class time. The real exam is much shorter than the review sheet.</td></tr>
    <tr><td>Format</td><td>True/false, multiple choice, and open response (show your work). No partial credit on T/F or multiple choice.</td></tr>
    <tr><td>Allowed</td><td>Nothing: no calculators, notes, textbook, or software. Practice arithmetic with fractions by hand.</td></tr>
    <tr><td>Row operations</td><td><b>You must write every row operation you use</b> (like \(R_2 \leftarrow R_2 - 3R_1\)). Without them, you can't get partial credit.</td></tr>
    <tr><td>Proofs</td><td>Not asked, but you must know the <b>statements</b> of the theorems and definitions precisely.</td></tr>
    <tr><td>Big warning</td><td>Watch "<b>some</b>" vs. "<b>every</b>". A solution for <i>some</i> \(\vec b\) is very different from a solution for <i>every</i> \(\vec b\).</td></tr>
  </table>

  <h2>A study plan that works</h2>
  <ol>
    <li><b>Learn:</b> do the lessons in order. Play with every widget until the picture makes sense, then do the quiz at the end.</li>
    <li><b>Drill the vocabulary:</b> use the <a href="#/cheatsheet">Cheat sheet</a>. The exam tests exact definitions and theorem statements.</li>
    <li><b>Do true/false:</b> the <a href="#/tfdrill">T/F drill</a> has dozens of exam-style statements with explanations. Aim for 90%+.</li>
    <li><b>Compute by hand:</b> use <a href="#/lab">Row Reduction Lab</a> &rarr; "Random practice problems" and "Do it yourself". Write the operations on paper as you go.</li>
    <li><b>Simulate the exam:</b> work through the <a href="#/practice">Practice exam</a> (every problem from your review, fully solved) <i>before</i> peeking at solutions.</li>
  </ol>

  <div class="box tip">
    <div class="box-title">Notation used everywhere</div>
    <p>Vectors have arrows, like \(\vec x, \vec b, \vec v_1\), and are columns of numbers. Matrices are capital letters like \(A, B\). "\(A\) is \(m\times n\)" means \(m\) rows and \(n\) columns. \(\mathbb{R}^n\) (read "R-n") is the set of all vectors with \(n\) real entries. All numbers are real; there are no complex numbers.</p>
  </div>
  `,
  init(root) {
    const cards = root.querySelector('#home-cards');
    const done = new Set(Store.get('done', []));
    Site.lessons.filter(l => l.group !== 'Start').forEach(l => {
      const a = el('a', { class: 'card', href: '#/' + l.id });
      a.innerHTML = (done.has(l.id) ? '<span class="c-done">✓ done</span>' : '') +
        '<div class="c-num">' + (l.num ? 'SECTION ' + l.num : l.group.toUpperCase()) + '</div>' +
        '<div class="c-title">' + l.title + '</div><div class="c-desc">' + (l.desc || '') + '</div>';
      cards.appendChild(a);
    });
    renderMath(cards);

    const cv = root.querySelector('#hero-canvas');
    if (!cv) return;
    const plane = new Plane(cv, 4);
    const mats = [[[1, 0], [0, 1]], [[1, 1], [0, 1]], [[0.7, -0.7], [0.7, 0.7]], [[2, 0], [0, 0.6]], [[1, 0], [0, 1]]];
    let k = 0, t = 0;
    const loop = () => {
      if (!document.body.contains(cv)) return;
      t += 0.008;
      if (t >= 1) { t = 0; k = (k + 1) % (mats.length - 1); }
      const e = ease(Math.min(1, t * 1.6));
      const A = mats[k], B = mats[k + 1];
      const M = [0, 1].map(i => [0, 1].map(j => A[i][j] + (B[i][j] - A[i][j]) * e));
      plane.clear();
      for (let s = -8; s <= 8; s++) {
        const p = (x, y) => [M[0][0] * x + M[0][1] * y, M[1][0] * x + M[1][1] * y];
        plane.polyline([p(s, -8), p(s, 8)], 'rgba(255,255,255,.35)', 1);
        plane.polyline([p(-8, s), p(8, s)], 'rgba(255,255,255,.35)', 1);
      }
      plane.arrow(0, 0, M[0][0], M[1][0], '#fca5a5', 3);
      plane.arrow(0, 0, M[0][1], M[1][1], '#86efac', 3);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
});

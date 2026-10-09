Site.register({
  id: 'tfdrill',
  num: '',
  title: 'True/False Drill',
  group: 'Exam prep',
  desc: 'Rapid-fire true/false statements from every section, including all 11 from the exam review, with an explanation after each one.',
  html: tx`
  <div class="kicker">Exam prep</div>
  <h1>True/False Drill</h1>
  <p class="lede">The exam has true/false questions with no partial credit, and they love subtle wording ("some" vs. "every", "a" vs. "only"). Answer each statement, read the explanation, and repeat until you can get them all right quickly.</p>
  <div class="box tip"><div class="box-title">How to approach a T/F question</div>
    <ul>
      <li>To show <b>False</b>, find <b>one</b> counterexample. Small matrices (\(2\times2\), zero rows, the zero vector) are your friends.</li>
      <li>To believe <b>True</b>, connect it to a theorem: usually a pivot fact (pivot in every row or every column) or a size fact.</li>
      <li>Read every word: "some/every", "a/the only", "if/if and only if", "codomain/range".</li>
    </ul></div>
  <div id="drill-root"></div>
  `,
  bank: [
    { s: '1.1', t: tx`A system of linear equations can have exactly two solutions.`, a: false, e: tx`Theorem 1.2: zero, one, or infinitely many. If there are two solutions, every point on the line through them is also a solution.` },
    { s: '1.1', t: tx`Two linear systems are equivalent if they have the same solution set.`, a: true, e: tx`That's the definition of equivalent systems.` },
    { s: '1.1', t: tx`Every elementary row operation is reversible.`, a: true, e: tx`Undo a replacement with \(R_i \leftarrow R_i - cR_j\), a swap with the same swap, and a scaling by \(c\) with scaling by \(1/c\).` },
    { s: '1.1', t: tx`Multiplying a row by 0 is an elementary row operation.`, a: false, e: tx`Scaling requires \(c \neq 0\). Multiplying by 0 destroys information and can't be undone.` },
    { s: '1.1', t: tx`\(x_1 + 2x_1x_2 = 5\) is a linear equation.`, a: false, e: tx`The product \(x_1x_2\) is not allowed.` },
    { s: '1.1', t: tx`\(\sqrt2\,x_1 - \pi x_2 = e\) is a linear equation.`, a: true, e: tx`The coefficients can be any real numbers. Only the <b>variables</b> must appear to the first power, with no products.` },
    { s: '1.1', t: tx`An inconsistent system has no solutions.`, a: true, e: tx`That's the definition of inconsistent.` },

    { s: '1.2', t: tx`If a system of equations has no free variables, then it has a unique solution.`, a: false, review: 1, e: tx`It could be inconsistent, e.g. \(\left[\begin{array}{c|c}1&2\\0&1\end{array}\right]\) (row 2: \(0=1\)). Check consistency first.` },
    { s: '1.2', t: tx`Each matrix is row equivalent to one and only one matrix in row echelon form.`, a: false, e: tx`REF is <b>not</b> unique (you can scale rows, etc.). The <b>RREF</b> is unique (Theorem 1.11).` },
    { s: '1.2', t: tx`If an augmented matrix has a row \([\,0\ 0\ 0 \mid 0\,]\), the system is inconsistent.`, a: false, e: tx`That row says \(0 = 0\), which is harmless. Inconsistent means \([\,0\cdots0\mid c\,]\) with \(c\neq0\).` },
    { s: '1.2', t: tx`A consistent system with at least one free variable has infinitely many solutions.`, a: true, e: tx`Theorem 1.18 (uniqueness part).` },
    { s: '1.2', t: tx`In RREF, every pivot is 1 and is the only nonzero entry in its column.`, a: true, e: tx`Definition 1.10.` },
    { s: '1.2', t: tx`The pivot positions of a matrix depend on which row operations you choose.`, a: false, e: tx`The RREF is unique, so the pivot positions are too.` },
    { s: '1.2', t: tx`If an \(n\times n\) matrix has \(n\) pivot positions, then its RREF is \(I_n\).`, a: true, review: 5, e: tx`\(n\) pivots in \(n\) rows and \(n\) columns put a pivot on every diagonal entry. In RREF those are 1's with zeros elsewhere.` },
    { s: '1.2', t: tx`A system of three equations in two unknowns cannot have a unique solution.`, a: false, review: 7, e: tx`\(x = 1,\ y = 2,\ x + y = 3\) has the unique solution \((1,2)\). Extra equations can be redundant.` },
    { s: '1.2', t: tx`If the last column of an augmented matrix is a pivot column, the system is inconsistent.`, a: true, e: tx`Theorem 1.18: that pivot gives a row \([0\cdots0\mid 1]\).` },
    { s: '1.2', t: tx`If a system has a free variable, it has infinitely many solutions.`, a: false, e: tx`Only if it's consistent. A system can have free variables <i>and</i> a \([0\cdots0\mid c]\) row.` },

    { s: '1.3', t: tx`If \(\vec u\) and \(\vec v\) are in \(\mathbb{R}^n\), then \(-\vec u\) is in \(\operatorname{span}\{\vec u, \vec v\}\).`, a: true, review: 6, e: tx`\(-\vec u = (-1)\vec u + 0\vec v\).` },
    { s: '1.3', t: tx`The zero vector is in every span.`, a: true, e: tx`Use all weights equal to 0.` },
    { s: '1.3', t: tx`For any \(\vec u, \vec v \in \mathbb{R}^3\), \(\operatorname{span}\{\vec u, \vec v\}\) is a plane.`, a: false, e: tx`If they're parallel it's a line, and if both are \(\vec 0\) it's just \(\{\vec 0\}\).` },
    { s: '1.3', t: tx`If \(\vec u_4\) is a linear combination of \(\vec u_1, \vec u_2, \vec u_3\), then \(\operatorname{span}\{\vec u_1, \vec u_2, \vec u_3\} = \operatorname{span}\{\vec u_1, \vec u_2, \vec u_3, \vec u_4\}\).`, a: true, review: 8, e: tx`Anything built with \(\vec u_4\) can be rebuilt by substituting \(\vec u_4\)'s combination, so adding \(\vec u_4\) adds nothing new.` },
    { s: '1.3', t: tx`\(\vec b \in \operatorname{span}\{\vec a_1, \dots, \vec a_n\}\) if and only if \([\,\vec a_1 \cdots \vec a_n \mid \vec b\,]\) is consistent.`, a: true, e: tx`Theorem 1.27.` },
    { s: '1.3', t: tx`Any two nonzero vectors in \(\mathbb{R}^2\) span \(\mathbb{R}^2\).`, a: false, e: tx`Not if they're parallel, e.g. \((1,2)\) and \((2,4)\) span only a line.` },

    { s: '1.4', t: tx`If \(A\) is \(m\times n\) and \(A\vec x = \vec b\) is consistent for some \(\vec b\), then the columns of \(A\) span \(\mathbb{R}^m\).`, a: false, review: 3, e: tx`"Some" is not "every". \(A\vec x = \vec 0\) is always consistent. Spanning needs <b>every</b> \(\vec b\) (Theorem 1.36).` },
    { s: '1.4', t: tx`If \(A\) is \(3\times 2\), then \(A\vec x = \vec b\) cannot be consistent for every \(\vec b \in \mathbb{R}^3\).`, a: true, e: tx`There are at most 2 pivots for 3 rows, so some row has no pivot (Theorem 1.36).` },
    { s: '1.4', t: tx`\(A\vec x\) is a linear combination of the columns of \(A\), with the entries of \(\vec x\) as the weights.`, a: true, e: tx`Definition 1.31.` },
    { s: '1.4', t: tx`If \([A \mid \vec b]\) has a pivot in every row, then \(A\vec x = \vec b\) is consistent.`, a: false, e: tx`The pivot might be in the last column: \(\left[\begin{array}{cc|c}1&0&2\\0&0&1\end{array}\right]\). Theorem 1.36 is about pivots of \(A\).` },
    { s: '1.4', t: tx`If the columns of \(A\) span \(\mathbb{R}^m\), then \(A\vec x = \vec b\) is consistent for every \(\vec b\in\mathbb{R}^m\).`, a: true, e: tx`Theorem 1.36.` },
    { s: '1.4', t: tx`If \(A\) is \(3\times 5\), then its columns span \(\mathbb{R}^3\).`, a: false, e: tx`Size alone can't guarantee it. The zero matrix is \(3\times5\) and spans nothing. (Size only <i>rules out</i> spanning when there are fewer columns than rows.)` },
    { s: '1.4', t: tx`\(A(\vec u + \vec v) = A\vec u + A\vec v\) and \(A(c\vec u) = cA\vec u\).`, a: true, e: tx`Proposition 1.40.` },

    { s: '1.5', t: tx`If a system \(A\vec x = \vec b\) has more than one solution, then so does \(A\vec x = \vec 0\).`, a: true, review: 2, e: tx`If \(\vec p \neq \vec q\) both solve \(A\vec x=\vec b\), then \(A(\vec p - \vec q) = \vec b - \vec b = \vec 0\) and \(\vec p - \vec q \neq \vec 0\). Together with \(\vec 0\), that's two solutions.` },
    { s: '1.5', t: tx`The equation \(A\vec x = \vec 0\) has the trivial solution if and only if there are no free variables.`, a: false, review: 4, e: tx`It <b>always</b> has the trivial solution. The correct version: it has <b>only</b> the trivial solution iff there are no free variables.` },
    { s: '1.5', t: tx`The product \(A\vec x\) can be \(\vec 0\) even if \(A\) and \(\vec x\) are nonzero.`, a: true, review: 11, e: tx`\(\begin{bmatrix}1&1\\1&1\end{bmatrix}\begin{bmatrix}1\\-1\end{bmatrix} = \begin{bmatrix}0\\0\end{bmatrix}\).` },
    { s: '1.5', t: tx`A homogeneous system is always consistent.`, a: true, e: tx`\(\vec x = \vec 0\) is always a solution.` },
    { s: '1.5', t: tx`If \(A\vec x = \vec 0\) has only the trivial solution, then \(A\vec x = \vec b\) is consistent for every \(\vec b\).`, a: false, e: tx`Pivot in every column is not the same as pivot in every row. For \(A = \begin{bmatrix}1&0\\0&1\\0&0\end{bmatrix}\), \(\vec b = (0,0,1)\) has no solution.` },
    { s: '1.5', t: tx`If \(A\vec x=\vec b\) is consistent, its solution set is the solution set of \(A\vec x=\vec 0\) shifted by any particular solution.`, a: true, e: tx`Theorem 1.46.` },
    { s: '1.5', t: tx`If \(A\) is \(3\times 5\), then \(A\vec x = \vec 0\) has a nontrivial solution.`, a: true, e: tx`At most 3 pivots in 5 columns means at least 2 free variables.` },
    { s: '1.5', t: tx`If \(\vec b \neq \vec 0\), the solution set of \(A\vec x = \vec b\) can contain \(\vec 0\).`, a: false, e: tx`\(A\vec 0 = \vec 0 \neq \vec b\).` },

    { s: '1.7', t: tx`The columns of \(A\) are linearly independent if and only if \(A\vec x = \vec 0\) has only the trivial solution.`, a: true, e: tx`Proposition 1.49.` },
    { s: '1.7', t: tx`A set of vectors containing \(\vec 0\) is linearly dependent.`, a: true, e: tx`\(1\cdot\vec 0 + 0\cdot(\text{others}) = \vec 0\) is a nontrivial relation.` },
    { s: '1.7', t: tx`If a set of vectors is linearly dependent, then each vector is a linear combination of the others.`, a: false, e: tx`Only at least one is (Warning 1.52). In \(\{(1,0), (2,0), (0,1)\}\), \((0,1)\) isn't a combination of the others.` },
    { s: '1.7', t: tx`Any four vectors in \(\mathbb{R}^3\) are linearly dependent.`, a: true, e: tx`Theorem 1.53: \(4 &gt; 3\).` },
    { s: '1.7', t: tx`Any three vectors in \(\mathbb{R}^4\) are linearly independent.`, a: false, e: tx`\(p \le n\) gives no guarantee (Warning 1.54), e.g. \(\vec v, 2\vec v, 3\vec v\).` },
    { s: '1.7', t: tx`Two vectors are linearly dependent if and only if one is a scalar multiple of the other.`, a: true, e: tx`This is the two-vector special case.` },
    { s: '1.7', t: tx`If \(\vec v_3\) is not in \(\operatorname{span}\{\vec v_1, \vec v_2\}\), then \(\{\vec v_1, \vec v_2, \vec v_3\}\) is linearly independent.`, a: false, e: tx`\(\vec v_1, \vec v_2\) themselves could be dependent, e.g. \(\vec v_2 = 2\vec v_1\).` },
    { s: '1.7', t: tx`If the columns of a \(5\times 3\) matrix are linearly independent, then they span \(\mathbb{R}^5\).`, a: false, e: tx`3 pivots (one per column) leave 2 rows without pivots. Three vectors can't span \(\mathbb{R}^5\).` },
    { s: '1.7', t: tx`If the columns of an \(n\times n\) matrix span \(\mathbb{R}^n\), then they are linearly independent.`, a: true, e: tx`A pivot in each of the \(n\) rows means \(n\) pivots, which is one in each of the \(n\) columns too.` },

    { s: '1.8', t: tx`The codomain of the linear transformation \(T:\mathbb{R}^n\to\mathbb{R}^m\), \(T(\vec x) = A\vec x\), is the set of all linear combinations of the columns of \(A\).`, a: false, review: 9, e: tx`That set is the <b>range</b>. The codomain is \(\mathbb{R}^m\).` },
    { s: '1.8', t: tx`The transformation \(T:\mathbb{R}^t\to\mathbb{R}^s\) is not linear if \(s &lt; t\).`, a: false, review: 10, e: tx`Linearity has nothing to do with dimensions. \(T(x_1,x_2) = x_1\) is linear from \(\mathbb{R}^2\) to \(\mathbb{R}\).` },
    { s: '1.8', t: tx`Every matrix transformation is a linear transformation.`, a: true, e: tx`Proposition 1.40.` },
    { s: '1.8', t: tx`If \(T(\vec 0) = \vec 0\), then \(T\) is linear.`, a: false, e: tx`\(S(x_1,x_2) = (4x_1 - 2x_2, 3|x_2|)\) has \(S(\vec 0)=\vec 0\) but isn't linear.` },
    { s: '1.8', t: tx`If \(T\) is linear, then \(T(\vec 0) = \vec 0\).`, a: true, e: tx`Proposition 1.58.` },
    { s: '1.8', t: tx`The range of a transformation is always its entire codomain.`, a: false, e: tx`Range \(\subseteq\) codomain. E.g. \(x^2+1\) has range \([1,\infty)\).` },
    { s: '1.8', t: tx`If \(A\) is \(3\times 4\), then \(T(\vec x) = A\vec x\) maps \(\mathbb{R}^3\) to \(\mathbb{R}^4\).`, a: false, e: tx`It maps \(\mathbb{R}^4\to\mathbb{R}^3\). The inputs need 4 entries (columns) and the outputs have 3 (rows).` },
    { s: '1.8', t: tx`\(T(x_1, x_2) = (x_1 + 1,\ x_2)\) is a linear transformation.`, a: false, e: tx`\(T(\vec 0) = (1, 0) \neq \vec 0\).` },

    { s: '1.9', t: tx`Every linear transformation \(T:\mathbb{R}^n\to\mathbb{R}^m\) is a matrix transformation.`, a: true, e: tx`Theorem 1.62.` },
    { s: '1.9', t: tx`The standard matrix of a linear \(T:\mathbb{R}^2\to\mathbb{R}^3\) is \(2\times 3\).`, a: false, e: tx`It's \(3\times 2\): one column for each \(\vec e_j \in \mathbb{R}^2\), each column in \(\mathbb{R}^3\).` },
    { s: '1.9', t: tx`The columns of the standard matrix of \(T\) are \(T(\vec e_1), \dots, T(\vec e_n)\).`, a: true, e: tx`Theorem 1.62.` },
    { s: '1.9', t: tx`A linear \(T:\mathbb{R}^2\to\mathbb{R}^2\) is completely determined by \(T(\vec e_1)\) and \(T(\vec e_2)\).`, a: true, e: tx`\(T(\vec x) = x_1T(\vec e_1) + x_2T(\vec e_2)\).` },
    { s: '1.9', t: tx`\(\begin{bmatrix}0&-1\\1&0\end{bmatrix}\) rotates the plane \(90^\circ\) clockwise.`, a: false, e: tx`It sends \(\vec e_1\to\vec e_2\), which is <b>counterclockwise</b>.` },
    { s: '1.9', t: tx`The range of projection onto the x-axis, \(\begin{bmatrix}1&0\\0&0\end{bmatrix}\), is all of \(\mathbb{R}^2\).`, a: false, e: tx`The range is just the x-axis. There's no pivot in row 2.` },
    { s: '1.9', t: tx`\(I_n\vec x = \vec x\) for every \(\vec x \in \mathbb{R}^n\).`, a: true, e: tx`\(I_n\vec x = x_1\vec e_1 + \cdots + x_n\vec e_n = \vec x\).` }
  ],
  init(root) {
    const bank = Site.byId.tfdrill.bank;
    const mount = root.querySelector('#drill-root');
    const filters = ['All', 'Review T/F', 'Missed', '1.1', '1.2', '1.3', '1.4', '1.5', '1.7', '1.8', '1.9'];
    const saved = Store.get('tfdrill', { right: 0, total: 0, best: 0, missed: [] });
    const st = { filter: 'All', queue: [], cur: null, answered: false, streak: 0, ...saved, missed: new Set(saved.missed || []) };
    const save = () => Store.set('tfdrill', { right: st.right, total: st.total, best: st.best, missed: [...st.missed] });

    mount.innerHTML = `
      <div class="row drill-filters" style="margin-top:14px"></div>
      <div class="drill-card">
        <div class="row" style="justify-content:space-between"><span class="pill info d-tag"></span><span class="small muted d-left"></span></div>
        <div class="drill-statement"></div>
        <div class="drill-btns">
          <button class="btn d-true">True</button>
          <button class="btn d-false">False</button>
          <button class="btn primary d-next" style="margin-left:auto;display:none">Next statement &rarr;</button>
        </div>
        <div class="q-feedback d-fb"></div>
      </div>
      <div class="drill-stats">
        <span>Answered: <b class="s-total"></b></span>
        <span>Correct: <b class="s-right"></b></span>
        <span>Accuracy: <b class="s-acc"></b></span>
        <span>Streak: <b class="s-streak"></b></span>
        <span>Best streak: <b class="s-best"></b></span>
        <span>To review: <b class="s-missed"></b></span>
        <button class="btn small d-reset" style="margin-left:auto">Reset stats</button>
      </div>
      <p class="small muted">Keyboard: press T or F to answer, and Enter for the next statement. "Missed" collects every statement you got wrong until you get it right.</p>`;
    const $ = (s) => mount.querySelector(s);
    const fbar = $('.drill-filters');
    filters.forEach(f => {
      const b = el('button', { class: 'btn small' }, f);
      b.onclick = () => { st.filter = f; refill(); next(); };
      fbar.appendChild(b);
    });
    const pool = () => bank.map((q, i) => i).filter(i => {
      const q = bank[i];
      if (st.filter === 'All') return true;
      if (st.filter === 'Review T/F') return !!q.review;
      if (st.filter === 'Missed') return st.missed.has(i);
      return q.s === st.filter;
    });
    function refill() {
      const p = pool();
      for (let i = p.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
      if (st.filter === 'Review T/F') p.sort((a, b) => bank[a].review - bank[b].review);
      st.queue = p;
      fbar.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.textContent === st.filter));
    }
    function stats() {
      $('.s-total').textContent = st.total;
      $('.s-right').textContent = st.right;
      $('.s-acc').textContent = st.total ? Math.round(100 * st.right / st.total) + '%' : '–';
      $('.s-streak').textContent = st.streak;
      $('.s-best').textContent = st.best;
      $('.s-missed').textContent = st.missed.size;
    }
    function next() {
      st.answered = false;
      $('.d-fb').className = 'q-feedback d-fb'; $('.d-fb').innerHTML = '';
      $('.d-next').style.display = 'none';
      ['.d-true', '.d-false'].forEach(s => { $(s).disabled = false; $(s).className = 'btn ' + s.slice(1); $(s).style.borderColor = ''; });
      if (!st.queue.length) {
        if (!pool().length) {
          st.cur = null;
          $('.d-tag').textContent = st.filter;
          $('.d-left').textContent = '';
          $('.drill-statement').innerHTML = st.filter === 'Missed' ? 'Nothing to review. Every statement you missed has since been answered correctly.' : 'No statements in this set.';
          $('.d-true').disabled = $('.d-false').disabled = true;
          return;
        }
        refill();
      }
      st.cur = st.queue.shift();
      const q = bank[st.cur];
      $('.d-tag').textContent = 'Section ' + q.s + (q.review ? '  ·  Exam Review T/F #' + q.review : '');
      $('.d-left').textContent = st.queue.length + ' left in this round';
      $('.drill-statement').innerHTML = q.t;
      renderMath($('.drill-statement'));
    }
    function answer(v) {
      if (st.answered || st.cur === null) return;
      st.answered = true;
      const q = bank[st.cur];
      const ok = v === q.a;
      st.total++;
      if (ok) { st.right++; st.streak++; st.best = Math.max(st.best, st.streak); st.missed.delete(st.cur); }
      else { st.streak = 0; st.missed.add(st.cur); }
      save();
      const chosen = v ? '.d-true' : '.d-false', correct = q.a ? '.d-true' : '.d-false';
      $(correct).classList.add('primary');
      if (!ok) $(chosen).style.borderColor = 'var(--bad)';
      $('.d-true').disabled = $('.d-false').disabled = true;
      const fb = $('.d-fb');
      fb.className = 'q-feedback d-fb show';
      fb.innerHTML = '<span class="verdict ' + (ok ? 'good' : 'bad') + '">' + (ok ? 'Correct.' : 'Not quite.') + '</span> The statement is <b>' + (q.a ? 'TRUE' : 'FALSE') + '</b>. ' + q.e;
      renderMath(fb);
      $('.d-next').style.display = '';
      stats();
    }
    $('.d-true').onclick = () => answer(true);
    $('.d-false').onclick = () => answer(false);
    $('.d-next').onclick = next;
    $('.d-reset').onclick = () => { st.right = st.total = st.best = st.streak = 0; st.missed.clear(); save(); stats(); };
    const onKey = (e) => {
      if (!document.body.contains(mount)) { document.removeEventListener('keydown', onKey); return; }
      if (e.target.tagName === 'INPUT' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 't' || e.key === 'T') answer(true);
      else if (e.key === 'f' || e.key === 'F') answer(false);
      else if ((e.key === 'Enter' || e.key === 'n') && st.answered) { e.preventDefault(); next(); }
    };
    document.addEventListener('keydown', onKey);
    refill(); next(); stats();
  }
});

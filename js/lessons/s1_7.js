Site.register({
  id: 's1_7',
  num: '1.7',
  title: 'Linear Independence',
  group: 'Lessons',
  desc: 'Redundant vectors, the definition of linear independence, reading dependence relations from RREF, and the "too many vectors" theorem.',
  html: tx`
  <div class="kicker">Section 1.7</div>
  <h1>Linear Independence</h1>
  <p class="lede">Span asks what you can build. Linear independence asks whether any of your building blocks are <b>redundant</b>. Together they answer "how many solutions?"</p>

  <div class="toc"><div class="toc-title">In this lesson</div><ol>
    <li><a href="#" data-scroll="mot">Redundant vectors</a></li>
    <li><a href="#" data-scroll="def">The definition</a></li>
    <li><a href="#" data-scroll="mat">Checking with a matrix</a></li>
    <li><a href="#" data-scroll="table">Span vs. independence</a></li>
    <li><a href="#" data-scroll="rel">Reading dependence relations from RREF</a></li>
    <li><a href="#" data-scroll="small">Small sets: 1, 2, 3 vectors and \(\vec 0\)</a></li>
    <li><a href="#" data-scroll="thms">Two key theorems</a></li>
    <li><a href="#" data-scroll="count">Counting: span vs. independence by size</a></li>
    <li><a href="#" data-scroll="practice">Worksheet and review problems</a></li>
    <li><a href="#" data-scroll="quiz">Quiz</a></li>
  </ol></div>

  <h2 id="mot">1. Motivation: redundant vectors</h2>
  <p>Take these four vectors in \(\mathbb{R}^3\):</p>
  \[\vec v_1 = \begin{bmatrix}2\\2\\0\end{bmatrix},\quad \vec v_2 = \begin{bmatrix}1\\1\\-1\end{bmatrix},\quad \vec v_3 = \begin{bmatrix}-1\\0\\1\end{bmatrix},\quad \vec w = \begin{bmatrix}-5\\-5\\1\end{bmatrix}.\]
  <ul>
    <li>\(\operatorname{RREF}[\,\vec v_1\ \vec v_2\ \vec v_3\,] = I_3\), so there's a pivot in every row: \(\operatorname{span}\{\vec v_1, \vec v_2, \vec v_3\} = \mathbb{R}^3\).</li>
    <li>\(\operatorname{RREF}[\,\vec v_1\ \vec v_2\ \vec w\,] = \begin{bmatrix}1&0&-2\\0&1&-1\\0&0&0\end{bmatrix}\). Only 2 pivots, and the third column says \(\vec w = -2\vec v_1 - \vec v_2\).</li>
  </ul>
  <p>So \(\vec w\) brings nothing new. It's already buildable from \(\vec v_1, \vec v_2\), so \(\operatorname{span}\{\vec v_1, \vec v_2, \vec w\} = \operatorname{span}\{\vec v_1, \vec v_2\}\), which is just a plane. Three vectors, but only "two vectors' worth" of span. See it:</p>
  <div data-widget="space3d" data-cfg='{"names":["v_1","v_2","v_3"],"vecs":[[2,2,0],[1,1,-1],[-5,-5,1]],"title":"Independent vs. dependent sets in 3D","presets":[{"name":"v₁, v₂, v₃ (independent)","vecs":[[2,2,0],[1,1,-1],[-1,0,1]]},{"name":"v₁, v₂, w (w = −2v₁ − v₂)","vecs":[[2,2,0],[1,1,-1],[-5,-5,1]]},{"name":"Two parallel vectors","vecs":[[1,2,2],[-2,-4,-4]]},{"name":"Includes the zero vector","vecs":[[1,0,2],[0,0,0],[0,1,1]]}]}'></div>
  <p class="small muted">In the second preset, the third vector (labelled v₃ in the picture) is \(\vec w\). Notice it lies flat in the plane of the other two.</p>

  <h2 id="def">2. The definition</h2>
  <p>"Some vector is a combination of the others" can be restated in a more symmetric way. \(\vec w = -2\vec v_1 - \vec v_2\) rearranges to</p>
  \[-2\vec v_1 - \vec v_2 - \vec w = \vec 0,\]
  <p>a way to combine the vectors into \(\vec 0\) <b>without all weights being zero</b>. That's the definition:</p>
  <div class="box def">
    <div class="box-title">Definition 1.48 · Linearly independent / dependent</div>
    <p>A set of vectors \(\{\vec v_1, \dots, \vec v_p\}\) in \(\mathbb{R}^n\) is <b>linearly independent</b> if the vector equation</p>
    \[c_1\vec v_1 + c_2\vec v_2 + \cdots + c_p\vec v_p = \vec 0\]
    <p>has <b>only the trivial solution</b> \(c_1 = c_2 = \cdots = c_p = 0\).</p>
    <p>Otherwise the set is <b>linearly dependent</b>: there are weights, <b>not all zero</b>, with \(c_1\vec v_1 + \cdots + c_p\vec v_p = \vec 0\). Such an equation is called a <b>linear dependence relation</b>.</p>
  </div>
  <div class="box idea"><div class="box-title">In plain English</div>
    <p><b>Independent:</b> the only way to get back to the origin is to not move at all. Every vector adds a genuinely new direction.<br>
    <b>Dependent:</b> you can take a real trip using these vectors and end up back at the origin, because some vector is redundant.</p></div>

  <h2 id="mat">3. Checking independence with a matrix</h2>
  <p>The vector equation \(c_1\vec v_1 + \cdots + c_p\vec v_p = \vec 0\) is the homogeneous system \(A\vec c = \vec 0\) where \(A = [\,\vec v_1 \cdots \vec v_p\,]\) (Theorem 1.33). From Section 1.5, that has a nontrivial solution exactly when there's a free variable. So:</p>
  <div class="box thm">
    <div class="box-title">Proposition 1.49</div>
    <p>The columns of a matrix \(A\) are linearly independent \(\iff\) \(A\vec x = \vec 0\) has <b>only</b> the trivial solution \(\iff\) <b>no free variables</b> \(\iff\) \(A\) has a <b>pivot in every column</b>.</p>
  </div>
  <p>With the vectors above, let \(A = [\,\vec v_1\ \vec v_2\ \vec v_3\,]\) and \(B = [\,\vec v_1\ \vec v_2\ \vec w\,]\):</p>
  \[A\vec x = \vec 0:\ \left[\begin{array}{ccc|c}1&0&0&0\\0&1&0&0\\0&0&1&0\end{array}\right] \Rightarrow \vec x = \vec 0 \text{ only.}\qquad B\vec x = \vec 0:\ \left[\begin{array}{ccc|c}1&0&-2&0\\0&1&-1&0\\0&0&0&0\end{array}\right]\Rightarrow \vec x = x_3\begin{bmatrix}2\\1\\1\end{bmatrix}.\]
  <p>The columns of \(A\) are independent. The columns of \(B\) are dependent, and \(x_3 = 1\) gives the relation \(2\vec v_1 + \vec v_2 + \vec w = \vec 0\).</p>

  <h2 id="table">4. The big comparison: span vs. independence</h2>
  <p>This table (from your notes) is worth memorizing. Let \(A\) be \(m\times n\) with columns \(\vec v_1, \dots, \vec v_n\).</p>
  <table class="tbl">
    <tr><th style="width:50%">Span</th><th>Linear independence</th></tr>
    <tr><td>A vector is in the span of a set when it's a linear combination of them.</td><td>A set is linearly <b>dependent</b> if one of the vectors is a linear combination of the others.</td></tr>
    <tr><td>\(\vec b \in \operatorname{span}\{\vec v_1, \dots, \vec v_n\}\) iff \(A\vec x = \vec b\) has a solution.</td><td>\(\vec v_1, \dots, \vec v_n\) are independent iff \(A\vec x = \vec 0\) has <b>only the trivial</b> solution.</td></tr>
    <tr><td>The columns span \(\mathbb{R}^m\) iff \(A\) has a <b>pivot in every row</b>.</td><td>The columns are independent iff \(A\) has a <b>pivot in every column</b>.</td></tr>
    <tr><td>Answers "does a solution <b>exist</b> (for every \(\vec b\))?"</td><td>Answers "is the solution <b>unique</b>?"</td></tr>
  </table>
  <div class="box tip"><div class="box-title">Mnemonic</div><p><b>S</b>pan needs pivots in every <b>row</b> (think "spans sideways across all \(m\) coordinates"). <b>I</b>ndependence needs pivots in every <b>column</b> (every vector gets its own pivot, so none is redundant).</p></div>

  <h2 id="rel">5. Reading dependence relations from the RREF</h2>
  <div class="box ex">
    <div class="box-title">Example 1.50</div>
    <p>Are the columns of \(A = \begin{bmatrix}5&6&-1&-11&6\\-4&0&2&22&-6\\2&3&4&10&-2\end{bmatrix}\) linearly independent? Find the dependence relations.</p>
    \[\operatorname{RREF}(A) = \begin{bmatrix}1&0&0&-4&1\\0&1&0&2&0\\0&0&1&3&-1\end{bmatrix}.\]
    <p>Columns 4 and 5 have no pivot, so the columns are <b>dependent</b> (it's 5 vectors in \(\mathbb{R}^3\), so this had to happen). \(\{\vec a_1, \vec a_2, \vec a_3\}\) (the pivot columns) is independent. Read each non-pivot column of the RREF as weights on the pivot columns:</p>
    \[\vec a_4 = -4\vec a_1 + 2\vec a_2 + 3\vec a_3, \qquad \vec a_5 = \vec a_1 - \vec a_3.\]
    <p>Check \(\vec a_5\): \((5,-4,2) - (-1,2,4) = (6,-6,-2)\) ✓. As dependence relations: \(-4\vec a_1 + 2\vec a_2 + 3\vec a_3 - \vec a_4 + 0\vec a_5 = \vec 0\), and \(\vec a_1 + 0\vec a_2 - \vec a_3 + 0\vec a_4 - \vec a_5 = \vec 0\).</p>
  </div>
  <div class="box thm">
    <div class="box-title">Why does this work?</div>
    <p>A dependence relation \(c_1\vec a_1 + \cdots + c_n\vec a_n = \vec 0\) is just a solution of \(A\vec c = \vec 0\). Row operations don't change the solutions of \(A\vec c = \vec 0\). So <b>the columns of \(A\) and the columns of \(\operatorname{RREF}(A)\) satisfy exactly the same linear relations</b>. In the RREF the relations are obvious: column 4 of the RREF is \(-4(\text{col }1) + 2(\text{col }2) + 3(\text{col }3)\), so the same holds for the original columns.</p>
  </div>
  <div class="box warn"><div class="box-title">Careful</div><p>Read the relation from the RREF, but apply it to the <b>original</b> columns of \(A\). The columns of the RREF itself are different vectors. Likewise, "the pivot columns of \(A\)" means the original columns in those positions.</p></div>

  <h2 id="small">6. Small sets: easy rules</h2>
  <div class="box thm">
    <div class="box-title">One vector</div>
    <p>\(\{\vec v_1\}\) is independent \(\iff\) \(\vec v_1 \neq \vec 0\). (If \(\vec v_1 \neq \vec 0\), then \(c\vec v_1 = \vec 0\) forces \(c = 0\).)</p>
  </div>
  <div class="box thm">
    <div class="box-title">Two vectors</div>
    <p>\(\{\vec v_1, \vec v_2\}\) is independent \(\iff\) <b>neither is a scalar multiple of the other</b>. Geometrically: they don't lie on the same line through the origin.</p>
    <p class="small">Why: if \(c_1\vec v_1 + c_2\vec v_2 = \vec 0\) with \(c_1 \neq 0\), then \(\vec v_1 = -\tfrac{c_2}{c_1}\vec v_2\), a multiple.</p>
  </div>
  <div class="box thm">
    <div class="box-title">Three vectors in \(\mathbb{R}^3\)</div>
    <p>If \(\vec u, \vec v\) are independent, then \(\{\vec u, \vec v, \vec w\}\) is dependent \(\iff\) \(\vec w\) lies in the plane spanned by \(\vec u\) and \(\vec v\).</p>
  </div>
  <div class="box thm">
    <div class="box-title">Any set containing \(\vec 0\) is dependent</div>
    <p>\(\{\vec 0, \vec v_1, \dots, \vec v_p\}\) is always dependent, because \(1\cdot\vec 0 + 0\vec v_1 + \cdots + 0\vec v_p = \vec 0\) is a nontrivial relation (the weight on \(\vec 0\) is 1, not 0).</p>
  </div>

  <h2 id="thms">7. Two key theorems</h2>
  <div class="box thm">
    <div class="box-title">Theorem 1.51 · Characterization of dependent sets</div>
    <p>A set \(S = \{\vec v_1, \dots, \vec v_p\}\) with \(p \ge 2\) is linearly dependent \(\iff\) <b>at least one</b> vector in \(S\) is a linear combination of the others.</p>
    <p>Moreover, if \(S\) is dependent and \(\vec v_1 \neq \vec 0\), then some \(\vec v_j\) (with \(j \geq 2\)) is a combination of the vectors <b>before</b> it, \(\vec v_1, \dots, \vec v_{j-1}\).</p>
  </div>
  <div class="box warn">
    <div class="box-title">Warning 1.52</div>
    <p>"Dependent" does <b>not</b> mean <i>every</i> vector is a combination of the others. Example: \(\left\{\begin{bmatrix}1\\0\end{bmatrix}, \begin{bmatrix}2\\0\end{bmatrix}, \begin{bmatrix}0\\1\end{bmatrix}\right\}\) is dependent (the second is twice the first), but \(\begin{bmatrix}0\\1\end{bmatrix}\) is <b>not</b> a combination of the other two.</p>
  </div>
  <div class="box thm big">
    <div class="box-title">Theorem 1.53 · Too many vectors</div>
    <p>Any set of \(p\) vectors in \(\mathbb{R}^n\) is linearly dependent if \(p &gt; n\), i.e., if there are <b>more vectors than entries in each vector</b>.</p>
  </div>
  <p><b>Why:</b> put them in a matrix \(A = [\,\vec v_1 \cdots \vec v_p\,]\), which is \(n \times p\), a wide matrix. \(A\vec x = \vec 0\) has more unknowns (\(p\)) than equations (\(n\)), so there are at most \(n\) pivots for \(p\) columns. There must be a free variable, which gives a nontrivial solution.</p>
  \[\underbrace{\begin{bmatrix}*&*&*&*&*\\ *&*&*&*&*\\ *&*&*&*&*\end{bmatrix}}_{n = 3 \text{ rows},\ p = 5 \text{ columns}}\quad\Longrightarrow\quad\text{at most 3 pivots for 5 columns}\]
  <div class="box warn"><div class="box-title">Warning 1.54</div><p>If \(p \le n\), the theorem says <b>nothing</b>. The set may or may not be independent. (Two vectors in \(\mathbb{R}^3\) could be parallel or not.) You have to row reduce.</p></div>

  <h2 id="count">8. Counting: what's possible for \(p\) vectors in \(\mathbb{R}^n\)</h2>
  <table class="tbl">
    <tr><th>Number of vectors \(p\) in \(\mathbb{R}^n\)</th><th>Can they be independent?</th><th>Can they span \(\mathbb{R}^n\)?</th></tr>
    <tr><td>\(p &lt; n\) (e.g. 2 vectors in \(\mathbb{R}^3\))</td><td>Maybe (check pivots)</td><td><b>Never</b> (fewer than \(n\) pivots, so some row is empty)</td></tr>
    <tr><td>\(p = n\) (e.g. 3 vectors in \(\mathbb{R}^3\))</td><td>Maybe</td><td>Maybe. For a square matrix it's <b>both or neither</b>: \(n\) pivots means one in every row <i>and</i> every column.</td></tr>
    <tr><td>\(p &gt; n\) (e.g. 4 vectors in \(\mathbb{R}^3\))</td><td><b>Never</b> (Theorem 1.53)</td><td>Maybe (check pivots)</td></tr>
  </table>
  <div class="box ex">
    <div class="box-title">Review 15 and 16</div>
    <p><b>15(a)</b> Three linearly independent vectors in \(\mathbb{R}^5\): \(\vec e_1 = (1,0,0,0,0),\ \vec e_2 = (0,1,0,0,0),\ \vec e_3 = (0,0,1,0,0)\). Each has its own pivot.</p>
    <p><b>15(b)</b> Four distinct nonzero vectors that span \(\mathbb{R}^3\): \((1,0,0), (0,1,0), (0,0,1), (1,1,1)\). (Four vectors in \(\mathbb{R}^3\) must be dependent, so one is a combination of the others. Here \((1,1,1)\) is the sum of the first three.)</p>
    <p><b>16</b> Which sets in \(\mathbb{R}^3\) <i>can possibly</i> be independent: \(\{\vec 0\}\), \(\{\vec u_1\}\), \(\{\vec u_1, \vec u_2\}\), \(\{\vec u_1, \vec u_2, \vec u_3\}\), \(\{\vec u_1, \dots, \vec u_4\}\)? <b>Answer: the middle three.</b> \(\{\vec 0\}\) contains the zero vector (always dependent), and 4 vectors in \(\mathbb{R}^3\) is too many.</p>
  </div>

  <h2 id="practice">9. Worksheet and review problems</h2>
  <div class="problem">
    <div class="p-head"><span class="p-num">Worksheet 4 · #1</span></div>
    <p>Let \(A = \begin{bmatrix}8&11&-6&-7&13\\-7&-8&5&6&-9\\11&7&-7&-9&-6\\-3&4&1&8&7\end{bmatrix}\) with \(\operatorname{RREF}(A) = \begin{bmatrix}1&0&-\frac{7}{13}&0&0\\0&1&-\frac{2}{13}&0&0\\0&0&0&1&0\\0&0&0&0&1\end{bmatrix}\).</p>
    <p>(a) Do the columns of \(A\) span \(\mathbb{R}^4\)? (b) Find a dependence relation among all the columns. (c) Which columns span \(\mathbb{R}^4\) and are independent?</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p><b>(a)</b> Yes. There's a pivot in every row (4 pivots, 4 rows), so by Theorem 1.36 the columns span \(\mathbb{R}^4\).</p>
      <p><b>(b)</b> Column 3 has no pivot: \(\vec a_3 = -\tfrac{7}{13}\vec a_1 - \tfrac{2}{13}\vec a_2\), so \(-\tfrac{7}{13}\vec a_1 - \tfrac{2}{13}\vec a_2 - \vec a_3 + 0\vec a_4 + 0\vec a_5 = \vec 0\).</p>
      <p><b>(c)</b> Remove column 3. Then \(\{\vec a_1, \vec a_2, \vec a_4, \vec a_5\}\) has a pivot in every row <i>and</i> every column, so these columns span \(\mathbb{R}^4\) and are independent.</p>
    </div></details>
  </div>
  <div class="problem">
    <div class="p-head"><span class="p-num">Worksheet 4 · #2</span></div>
    <p>Let \(\vec v_1 = \begin{bmatrix}-1\\0\\0\end{bmatrix}, \vec v_2 = \begin{bmatrix}2\\5\\1\end{bmatrix}, \vec v_3 = \begin{bmatrix}6\\10\\2\end{bmatrix}, \vec v_4 = \begin{bmatrix}-1\\5\\1\end{bmatrix}\). (a) Why is the set dependent (no math needed)? (b) Find the smallest subset with the same span. Is there more than one answer?</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p><b>(a)</b> Four vectors in \(\mathbb{R}^3\): too many, so dependent by Theorem 1.53.</p>
      <p><b>(b)</b> Row reduce \([\,\vec v_1\ \vec v_2\ \vec v_3\ \vec v_4\,]\):</p>
      \[\begin{bmatrix}-1&2&6&-1\\0&5&10&5\\0&1&2&1\end{bmatrix} \xrightarrow{R_3 \leftarrow R_3 - \frac15R_2} \begin{bmatrix}-1&2&6&-1\\0&5&10&5\\0&0&0&0\end{bmatrix}\]
      \[\xrightarrow[R_2 \leftarrow \frac15R_2]{R_1 \leftarrow -R_1} \begin{bmatrix}1&-2&-6&1\\0&1&2&1\\0&0&0&0\end{bmatrix} \xrightarrow{R_1 \leftarrow R_1 + 2R_2} \begin{bmatrix}1&0&-2&3\\0&1&2&1\\0&0&0&0\end{bmatrix}\]
      <p>Pivots in columns 1 and 2, so \(\operatorname{span}\{\vec v_1, \vec v_2\} = \operatorname{span}\{\vec v_1, \dots, \vec v_4\}\) (a plane), with \(\vec v_3 = -2\vec v_1 + 2\vec v_2\) and \(\vec v_4 = 3\vec v_1 + \vec v_2\). We need at least 2 vectors, since one vector spans only a line. <b>More than one answer:</b> no two of these vectors are parallel, so <i>any</i> two of them span the same plane.</p>
    </div></details>
  </div>
  <div class="problem">
    <div class="p-head"><span class="p-num">Review 23</span></div>
    <p>Do the columns of \(\begin{bmatrix}2&1&-3&5\\1&4&2&6\\0&3&3&3\end{bmatrix}\) span \(\mathbb{R}^3\)?</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      \[\xrightarrow{R_1 \leftrightarrow R_2}\begin{bmatrix}1&4&2&6\\2&1&-3&5\\0&3&3&3\end{bmatrix}\xrightarrow{R_2 \leftarrow R_2 - 2R_1}\begin{bmatrix}1&4&2&6\\0&-7&-7&-7\\0&3&3&3\end{bmatrix}\]
      \[\xrightarrow{R_2 \leftarrow -\frac17R_2}\begin{bmatrix}1&4&2&6\\0&1&1&1\\0&3&3&3\end{bmatrix}\xrightarrow{R_3 \leftarrow R_3 - 3R_2}\begin{bmatrix}1&4&2&6\\0&1&1&1\\0&0&0&0\end{bmatrix}\]
      <p>Only 2 pivots, and row 3 has none, so the columns do <b>not</b> span \(\mathbb{R}^3\) (Theorem 1.36). Even with 4 vectors, only two "independent directions" are present, which gives a plane.</p>
    </div></details>
  </div>
  <div class="problem">
    <div class="p-head"><span class="p-num">Review 32</span></div>
    <p>In \(A = \begin{bmatrix}4&1&6\\-7&5&3\\9&-3&3\end{bmatrix}\), the third column equals the first plus twice the second: \(\vec a_3 = \vec a_1 + 2\vec a_2\). Find a nontrivial solution of \(A\vec x = \vec 0\).</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p>Columns 1 and 2 aren't multiples, so they're independent pivot columns. Column 3 depends on them, so it can't be a pivot column. Since the RREF satisfies the same relation, \(\operatorname{RREF}(A) = \begin{bmatrix}1&0&1\\0&1&2\\0&0&0\end{bmatrix}\). The solutions are \(\vec x = x_3\begin{bmatrix}-1\\-2\\1\end{bmatrix}\), and \(x_3 = 1\) gives the nontrivial solution \((-1, -2, 1)\).</p>
      <p><b>Shortcut:</b> \(\vec a_3 = \vec a_1 + 2\vec a_2\) means \(-1\vec a_1 - 2\vec a_2 + 1\vec a_3 = \vec 0\). The weights \((-1,-2,1)\) <i>are</i> a solution of \(A\vec x = \vec 0\).</p>
    </div></details>
  </div>

  <div class="summary">
    <h3>What to remember from 1.7</h3>
    <ul>
      <li><b>Independent:</b> \(c_1\vec v_1 + \cdots + c_p\vec v_p = \vec 0\) only when all \(c_i = 0\). <b>Dependent:</b> some nontrivial combination gives \(\vec 0\).</li>
      <li>Columns of \(A\) independent \(\iff\) \(A\vec x=\vec 0\) has only the trivial solution \(\iff\) <b>pivot in every column</b>.</li>
      <li>Dependent \(\iff\) some vector (not necessarily every one) is a combination of the others.</li>
      <li>One vector: independent iff nonzero. Two: independent iff not multiples. A set containing \(\vec 0\) is dependent.</li>
      <li>More vectors than entries (\(p &gt; n\)) means dependent. Fewer vectors than entries (\(p &lt; n\)) means they can't span \(\mathbb{R}^n\).</li>
      <li>Dependence relations: read the non-pivot columns of the RREF and apply them to the original columns.</li>
    </ul>
  </div>

  <h2 id="quiz">Quiz</h2>
  <div class="quiz" data-quiz="main"></div>
  `,
  quizzes: {
    main: [
      { q: tx`The columns of \(A\) are linearly independent if and only if \(A\vec x = \vec 0\) has only the trivial solution.`, tf: true, explain: tx`Proposition 1.49.` },
      { q: tx`A set of vectors that contains \(\vec 0\) is:`, choices: ['always independent', 'always dependent', 'independent only if the other vectors are independent', 'impossible to determine'], answer: 1,
        explain: tx`\(1\cdot\vec 0 + 0\cdot(\text{others}) = \vec 0\) is a nontrivial dependence relation.` },
      { q: tx`Two vectors \(\{\vec u, \vec v\}\) are linearly dependent exactly when:`, choices: ['they are perpendicular', 'one is a scalar multiple of the other', 'they have the same length', 'they are both nonzero'], answer: 1,
        explain: tx`For two vectors, dependent means they lie on a common line through the origin.` },
      { q: tx`Any 4 vectors in \(\mathbb{R}^3\) are:`, choices: ['linearly independent', 'linearly dependent', tx`a spanning set for \(\mathbb{R}^3\)`, 'could be independent'], answer: 1,
        explain: tx`Theorem 1.53: \(p = 4 &gt; n = 3\). (They might or might not span.)` },
      { q: tx`If a set \(S\) is linearly dependent, then every vector in \(S\) is a linear combination of the others.`, tf: false,
        explain: tx`Warning 1.52: only <i>at least one</i> is. Example: \(\{(1,0),(2,0),(0,1)\}\), where \((0,1)\) is not a combination of the others.` },
      { q: tx`Two linearly independent vectors in \(\mathbb{R}^3\) can span \(\mathbb{R}^3\).`, tf: false,
        explain: tx`A \(3\times2\) matrix has at most 2 pivots, but spanning \(\mathbb{R}^3\) needs 3 (one per row). Two vectors span at most a plane.` },
      { q: tx`\(\operatorname{RREF}[\,\vec a_1\ \vec a_2\ \vec a_3\,] = \begin{bmatrix}1&0&2\\0&1&-1\\0&0&0\end{bmatrix}\). Then \(\vec a_3 = \)`, choices: [tx`\(2\vec a_1 - \vec a_2\)`, tx`\(-2\vec a_1 + \vec a_2\)`, tx`\(\vec a_1 + \vec a_2\)`, 'it is not a combination'], answer: 0,
        explain: tx`Column 3 of the RREF gives the weights 2 and \(-1\) on the pivot columns 1 and 2.` },
      { q: tx`If \(p \le n\), then any \(p\) vectors in \(\mathbb{R}^n\) are linearly independent.`, tf: false,
        explain: tx`Warning 1.54: Theorem 1.53 only applies for \(p &gt; n\). For example, \((1,1,1)\) and \((2,2,2)\) are dependent.` },
      { q: tx`\(A\) is \(5\times 3\) with 3 pivot positions. Then:`, choices: [tx`columns independent, and they span \(\mathbb{R}^5\)`, tx`columns independent, but don't span \(\mathbb{R}^5\)`, tx`columns dependent, but span \(\mathbb{R}^5\)`, 'columns dependent, and do not span'], answer: 1,
        explain: tx`3 pivots in 3 columns gives a pivot in every column (independent). But only 3 of the 5 rows have pivots, so they don't span.` }
    ]
  }
});

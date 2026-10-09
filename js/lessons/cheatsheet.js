Site.register({
  id: 'cheatsheet',
  num: '',
  title: 'Cheat Sheet',
  group: 'Exam prep',
  desc: 'Every definition, theorem, procedure and trap from 1.1–1.9 on one page, plus the big "everything is pivots" table.',
  html: tx`
  <div class="kicker">Exam prep</div>
  <h1>Cheat Sheet: Everything on One Page</h1>
  <p class="lede">You can't bring notes to the exam, so this page is for <b>memorizing</b>. Read it top to bottom the night before and the morning of. Every item links back to ideas covered in the lessons.</p>
  <div class="row"><button class="btn" onclick="window.print()">Print this page</button></div>

  <div class="toc"><div class="toc-title">On this page</div><ol>
    <li><a href="#" data-scroll="pivots">Everything is pivots (the master table)</a></li>
    <li><a href="#" data-scroll="sizes">Size facts</a></li>
    <li><a href="#" data-scroll="defs">Definitions</a></li>
    <li><a href="#" data-scroll="thms">Theorems and propositions</a></li>
    <li><a href="#" data-scroll="procs">Procedures</a></li>
    <li><a href="#" data-scroll="traps">Traps</a></li>
    <li><a href="#" data-scroll="examrules">Exam rules</a></li>
  </ol></div>

  <h2 id="pivots">1. Everything is pivots</h2>
  <p>Almost every question on this exam comes down to: <b>row reduce, then look at where the pivots are</b>. Let \(A\) be \(m\times n\) with columns \(\vec a_1, \dots, \vec a_n\), and \(T(\vec x) = A\vec x\).</p>
  <table class="tbl">
    <tr><th>Pivot pattern</th><th>Equivalent statements</th></tr>
    <tr><td><b>Pivot in every ROW of \(A\)</b><br><span class="small muted">(Theorem 1.36)</span></td>
      <td>\(A\vec x = \vec b\) has a solution for <b>every</b> \(\vec b\in\mathbb{R}^m\)<br>
      every \(\vec b\in\mathbb{R}^m\) is a linear combination of the columns<br>
      the columns <b>span</b> \(\mathbb{R}^m\)<br>
      range of \(T\) = codomain \(\mathbb{R}^m\)</td></tr>
    <tr><td><b>Pivot in every COLUMN of \(A\)</b><br><span class="small muted">(Prop 1.43, Prop 1.49)</span></td>
      <td>no free variables<br>
      \(A\vec x = \vec 0\) has <b>only</b> the trivial solution<br>
      the columns are <b>linearly independent</b><br>
      \(A\vec x = \vec b\) has <b>at most one</b> solution for each \(\vec b\)</td></tr>
    <tr><td><b>Pivot in the LAST column of \([A\mid\vec b]\)</b><br><span class="small muted">(Theorem 1.18)</span></td>
      <td>a row \([0\ \cdots\ 0\mid c]\) with \(c\neq 0\)<br>the system is <b>inconsistent</b> (no solution)<br>\(\vec b\notin\operatorname{span}\{\vec a_1,\dots,\vec a_n\}\), and \(\vec b\) is not in the range of \(T\)</td></tr>
    <tr><td><b>Square \(n\times n\) with \(n\) pivots</b></td>
      <td>\(\operatorname{RREF}(A) = I_n\)<br>pivot in every row <b>and</b> every column<br>columns are independent <b>and</b> span \(\mathbb{R}^n\)<br>\(A\vec x=\vec b\) has exactly one solution for every \(\vec b\)</td></tr>
  </table>
  <div class="flow">
    <div class="node"><b>Consistent?</b>Last column of \([A\mid\vec b]\) is not a pivot column</div>
    <div class="arrow">+</div>
    <div class="node"><b>No free variables</b>Every column of \(A\) has a pivot</div>
    <div class="arrow">=</div>
    <div class="node"><b>Unique solution</b>(Review 30)</div>
  </div>

  <h2 id="sizes">2. Size facts (decide without computing)</h2>
  <table class="tbl">
    <tr><th>Situation</th><th>Conclusion</th></tr>
    <tr><td>An \(m\times n\) matrix</td><td>At most \(\min(m,n)\) pivots (at most one per row and one per column)</td></tr>
    <tr><td>More columns than rows (\(n &gt; m\)), wide</td><td>Columns are <b>dependent</b>. \(A\vec x=\vec 0\) has nontrivial solutions. A consistent \(A\vec x=\vec b\) has infinitely many solutions.</td></tr>
    <tr><td>Fewer columns than rows (\(n &lt; m\)), tall</td><td>Columns <b>can't span</b> \(\mathbb{R}^m\). Some \(\vec b\) gives no solution.</td></tr>
    <tr><td>\(p\) vectors in \(\mathbb{R}^n\) with \(p &gt; n\)</td><td>Dependent (Theorem 1.53)</td></tr>
    <tr><td>\(p\) vectors in \(\mathbb{R}^n\) with \(p &lt; n\)</td><td>Don't span \(\mathbb{R}^n\)</td></tr>
    <tr><td>\(p\le n\), or \(p \ge n\)</td><td><b>No conclusion</b> from size alone. Row reduce.</td></tr>
    <tr><td>Set contains \(\vec 0\)</td><td>Dependent</td></tr>
    <tr><td>\(A\) is \(m\times n\)</td><td>\(A\vec x\) needs \(\vec x\in\mathbb{R}^n\) and gives a vector in \(\mathbb{R}^m\). \(T(\vec x)=A\vec x\) maps \(\mathbb{R}^n\to\mathbb{R}^m\).</td></tr>
    <tr><td>\(T:\mathbb{R}^n\to\mathbb{R}^m\) linear</td><td>Standard matrix is \(m\times n\)</td></tr>
  </table>

  <h2 id="defs">3. Definitions</h2>
  <h3>1.1 · Systems</h3>
  <ul>
    <li><b>Linear equation</b>: \(a_1x_1 + \cdots + a_nx_n = b\) (constants times variables; no products, powers, roots, or functions of variables).</li>
    <li><b>Solution</b>: a list \((s_1,\dots,s_n)\) satisfying <i>every</i> equation. The <b>solution set</b> is the set of all solutions.</li>
    <li><b>Consistent</b>: at least one solution. <b>Inconsistent</b>: none.</li>
    <li><b>Equivalent systems</b>: same solution set.</li>
    <li><b>Coefficient matrix</b> \(A\) (\(m\times n\)); <b>augmented matrix</b> \([A\mid\vec b]\) (\(m\times(n+1)\)).</li>
    <li><b>Elementary row operations</b>: replacement \(R_i\leftarrow R_i + cR_j\); interchange \(R_i\leftrightarrow R_j\); scaling \(R_i\leftarrow cR_i\) with \(c\neq0\). All are reversible. <b>Row equivalent</b>: connected by row operations.</li>
  </ul>
  <h3>1.2 · Echelon forms</h3>
  <ul>
    <li><b>REF</b>: each leading entry is to the right of the one above it, zeros below each leading entry, zero rows at the bottom.</li>
    <li><b>RREF</b>: REF, plus every pivot is 1, plus zeros <i>above</i> each pivot as well.</li>
    <li><b>Pivot position</b>: location of a leading 1 in the RREF. <b>Pivot column</b>: a column containing one.</li>
    <li><b>Basic variable</b>: its column is a pivot column. <b>Free variable</b>: its column isn't, and it can take any value.</li>
  </ul>
  <h3>1.3 · Vectors</h3>
  <ul>
    <li>\(\mathbb{R}^n\): all column vectors with \(n\) real entries. Add and scale entry by entry.</li>
    <li><b>Linear combination</b>: \(c_1\vec v_1 + \cdots + c_p\vec v_p\) where the \(c_i\) are <b>weights</b> (any real numbers, including 0).</li>
    <li>\(\operatorname{span}\{\vec v_1,\dots,\vec v_p\}\): the set of <b>all</b> linear combinations. It always contains \(\vec 0\) and each \(\vec v_i\).</li>
  </ul>
  <h3>1.4 · \(A\vec x\)</h3>
  <ul>
    <li>\(A\vec x = x_1\vec a_1 + \cdots + x_n\vec a_n\): a combination of the columns, with the entries of \(\vec x\) as weights. Shortcut: entry \(i\) = row \(i\) of \(A\) dotted with \(\vec x\).</li>
    <li><b>Columns of \(A\) span \(\mathbb{R}^m\)</b>: every \(\vec b\in\mathbb{R}^m\) is a combination of them.</li>
  </ul>
  <h3>1.5 · Solution sets</h3>
  <ul>
    <li><b>Homogeneous</b>: \(A\vec x=\vec 0\). It always has the <b>trivial solution</b> \(\vec x = \vec 0\). A <b>nontrivial</b> solution is any \(\vec x\neq\vec 0\).</li>
    <li><b>Parametric vector form</b>: \(\vec x = \vec p + t_1\vec v_1 + \cdots + t_k\vec v_k\), where the free variables are the parameters.</li>
  </ul>
  <h3>1.7 · Independence</h3>
  <ul>
    <li><b>Linearly independent</b>: \(c_1\vec v_1 + \cdots + c_p\vec v_p = \vec 0\) only when all \(c_i=0\).</li>
    <li><b>Linearly dependent</b>: some weights, <i>not all zero</i>, give \(\vec 0\). That equation is a <b>linear dependence relation</b>.</li>
  </ul>
  <h3>1.8 · Transformations</h3>
  <ul>
    <li>\(T:\mathbb{R}^n\to\mathbb{R}^m\): <b>domain</b> \(\mathbb{R}^n\), <b>codomain</b> \(\mathbb{R}^m\). \(T(\vec x)\) is the <b>image</b> of \(\vec x\). <b>Range</b> = set of all images (a subset of the codomain).</li>
    <li>For \(T(\vec x)=A\vec x\): range = span of the columns of \(A\). \(\vec b\) is in the range \(\iff\) \(A\vec x = \vec b\) is consistent.</li>
    <li><b>Linear</b>: \(T(\vec u+\vec v) = T(\vec u)+T(\vec v)\) and \(T(c\vec u) = cT(\vec u)\) for all \(\vec u,\vec v, c\).</li>
  </ul>
  <h3>1.9 · Standard matrix</h3>
  <ul>
    <li>\(I_n\): 1's on the diagonal, 0 elsewhere. Columns \(\vec e_1,\dots,\vec e_n\). \(I_n\vec x = \vec x\).</li>
    <li><b>Standard matrix</b> of linear \(T\): \(A = [\,T(\vec e_1)\ \cdots\ T(\vec e_n)\,]\).</li>
  </ul>

  <h2 id="thms">4. Theorems and propositions</h2>
  <table class="tbl">
    <tr><th style="width:120px">Result</th><th>Statement</th></tr>
    <tr><td>Thm 1.2</td><td>A linear system has either <b>no</b> solution, exactly <b>one</b>, or <b>infinitely many</b>. Never exactly 2, 3, ….</td></tr>
    <tr><td>Prop 1.4</td><td>Row equivalent augmented matrices have the <b>same solution set</b>.</td></tr>
    <tr><td>Thm 1.11</td><td>Each matrix is row equivalent to exactly one RREF, so pivot positions are well defined.</td></tr>
    <tr><td>Thm 1.18</td><td><b>Existence:</b> consistent \(\iff\) the last column of the augmented matrix is <b>not</b> a pivot column (no \([0\cdots0\mid c\neq0]\) row). <b>Uniqueness:</b> if consistent, there's a unique solution when there are no free variables, and infinitely many when there's at least one.</td></tr>
    <tr><td>Thm 1.24</td><td>Vector algebra works like numbers: commutative, associative, \(\vec u + \vec 0 = \vec u\), \(\vec u + (-\vec u) = \vec 0\), \(c(\vec u+\vec v) = c\vec u + c\vec v\), \((c+d)\vec u = c\vec u + d\vec u\), \(c(d\vec u) = (cd)\vec u\), \(1\vec u = \vec u\).</td></tr>
    <tr><td>Thm 1.27</td><td>\(x_1\vec a_1+\cdots+x_n\vec a_n = \vec b\) has the same solutions as the system with augmented matrix \([\,\vec a_1\cdots\vec a_n\mid\vec b\,]\). So \(\vec b\in\operatorname{span}\iff\) that system is consistent.</td></tr>
    <tr><td>Thm 1.33</td><td>\(A\vec x=\vec b\), \(x_1\vec a_1+\cdots+x_n\vec a_n=\vec b\), and \([A\mid\vec b]\) all have the same solution set. \(A\vec x=\vec b\) is solvable \(\iff\) \(\vec b\) is a combination of the columns of \(A\).</td></tr>
    <tr><td>Thm 1.36</td><td>For \(A\) \(m\times n\), these are equivalent: \(A\vec x=\vec b\) is solvable for <b>every</b> \(\vec b\); every \(\vec b\) is a combination of the columns; the columns span \(\mathbb{R}^m\); \(A\) has a <b>pivot in every row</b>.</td></tr>
    <tr><td>Prop 1.40</td><td>\(A(\vec u+\vec v) = A\vec u + A\vec v\) and \(A(c\vec u) = cA\vec u\).</td></tr>
    <tr><td>Prop 1.43</td><td>\(A\vec x=\vec 0\) has a nontrivial solution \(\iff\) it has at least one free variable.</td></tr>
    <tr><td>Thm 1.46</td><td>If \(A\vec x=\vec b\) is consistent with a particular solution \(\vec p\), then the solution set is \(\{\vec p + \vec v_h\}\), where \(\vec v_h\) ranges over the solutions of \(A\vec x=\vec 0\). It's the homogeneous solution set shifted by \(\vec p\).</td></tr>
    <tr><td>Prop 1.49</td><td>Columns of \(A\) are independent \(\iff\) \(A\vec x=\vec 0\) has only the trivial solution \(\iff\) pivot in every column.</td></tr>
    <tr><td>Special cases</td><td>\(\{\vec v\}\) is independent \(\iff\) \(\vec v\neq\vec 0\). \(\{\vec u,\vec v\}\) is dependent \(\iff\) one is a multiple of the other. Any set containing \(\vec 0\) is dependent.</td></tr>
    <tr><td>Thm 1.51</td><td>A set of \(p\ge2\) vectors is dependent \(\iff\) <b>at least one</b> vector is a combination of the others. (Not necessarily every one; see Warning 1.52.)</td></tr>
    <tr><td>Thm 1.53</td><td>If \(p &gt; n\), any \(p\) vectors in \(\mathbb{R}^n\) are dependent. (If \(p\le n\), no conclusion; see Warning 1.54.)</td></tr>
    <tr><td>Prop 1.58</td><td>If \(T\) is linear: \(T(\vec 0)=\vec 0\), and \(T(c\vec u+d\vec v) = cT(\vec u)+dT(\vec v)\). More generally \(T(\sum c_i\vec u_i) = \sum c_iT(\vec u_i)\).</td></tr>
    <tr><td>Thm 1.62</td><td>Every linear \(T:\mathbb{R}^n\to\mathbb{R}^m\) has a unique standard matrix \(A = [\,T(\vec e_1)\cdots T(\vec e_n)\,]\) with \(T(\vec x)=A\vec x\).</td></tr>
  </table>

  <h2 id="procs">5. Procedures</h2>
  <div class="box tip"><div class="box-title">Row reduction</div>
    <p><b>Forward:</b> take the leftmost nonzero column. Get a nonzero entry on top (swap; prefer a row with a 1). Zero out everything below it. Cover that row and repeat. That gives REF.<br>
    <b>Backward:</b> start at the rightmost pivot. Scale it to 1 and zero out everything above it. Move up and left. That gives RREF.</p></div>
  <div class="box tip"><div class="box-title">Solve a system</div>
    <p>Augmented matrix → REF → check for \([0\cdots0\mid c\neq0]\) (if there is one, stop: no solution) → RREF → basic variables in terms of free variables → (optional) parametric vector form.</p></div>
  <div class="box tip"><div class="box-title">Is \(\vec b\) in \(\operatorname{span}\{\vec v_1,\dots,\vec v_p\}\)? Is \(\vec b\) in the range of \(T(\vec x)=A\vec x\)?</div>
    <p>Row reduce \([\,\vec v_1\cdots\vec v_p\mid\vec b\,]\). It's in the span or range \(\iff\) the system is consistent. The weights are a solution.</p></div>
  <div class="box tip"><div class="box-title">Do the columns span \(\mathbb{R}^m\)? For which \(\vec b\) is the system consistent?</div>
    <p>Row reduce \(A\) alone: is there a pivot in every row? For "which \(\vec b\)", row reduce \([A\mid\vec b]\) with symbols \(b_1, b_2, \dots\) and require the entries next to the zero rows to equal 0 (Example 1.34).</p></div>
  <div class="box tip"><div class="box-title">Are the vectors independent? Find a dependence relation.</div>
    <p>Row reduce \([\,\vec v_1\cdots\vec v_p\,]\). Is there a pivot in every column? If not, each non-pivot column of the RREF gives the weights on the pivot columns: if column \(j\) of the RREF is \((c_1, c_2, \dots)\), then \(\vec v_j = c_1(\text{1st pivot col}) + c_2(\text{2nd pivot col}) + \cdots\), applied to the <b>original</b> vectors.</p></div>
  <div class="box tip"><div class="box-title">Parametric vector form</div>
    <p>From the RREF, write each basic variable in terms of the free variables. Write \(\vec x\) as a column, then split it into (constant vector) + (free var)(vector) + …. For \(A\vec x=\vec 0\), the constant part is \(\vec 0\).</p></div>
  <div class="box tip"><div class="box-title">Is \(T\) linear?</div>
    <p>(1) \(T(\vec 0)\neq\vec 0\) means not linear. (2) If each output entry is a combination \(a_1x_1+\cdots+a_nx_n\) with no constants, powers, products, or \(|\ |\), it's linear: write the matrix. (3) Otherwise find a counterexample, e.g. \(T(-\vec u)\neq -T(\vec u)\).</p></div>
  <div class="box tip"><div class="box-title">Standard matrix</div>
    <p>Column \(j\) = \(T(\vec e_j)\). From a formula: plug in \(\vec e_j\), or read the coefficients row by row (0 for missing variables). Geometric: where do \((1,0)\) and \((0,1)\) land?</p>
    <p>\(R_\theta = \begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}\), reflect over the x-axis \(\begin{bmatrix}1&0\\0&-1\end{bmatrix}\), reflect over the y-axis \(\begin{bmatrix}-1&0\\0&1\end{bmatrix}\), reflect over \(y=x\) \(\begin{bmatrix}0&1\\1&0\end{bmatrix}\), stretch \(\begin{bmatrix}a&0\\0&b\end{bmatrix}\), project onto the x-axis \(\begin{bmatrix}1&0\\0&0\end{bmatrix}\).</p></div>
  <div class="box tip"><div class="box-title">Parameter problems (Review 12 style)</div>
    <p>Row reduce with the letters in place. No solution: make a row \([0\cdots0\mid\text{nonzero}]\). Unique: pivot in every coefficient column. Infinite: a zero coefficient row whose right side is also 0. Don't divide by an expression that could be 0 (like \(h-9\)) without splitting into cases.</p></div>

  <h2 id="traps">6. Traps (these show up as true/false)</h2>
  <table class="tbl">
    <tr><th>Statement</th><th>Verdict</th></tr>
    <tr><td>No free variables means a unique solution.</td><td><span class="pill bad">False</span> It could be inconsistent. Check consistency first.</td></tr>
    <tr><td>Free variables mean infinitely many solutions.</td><td><span class="pill bad">False</span> Only if the system is consistent.</td></tr>
    <tr><td>\(A\vec x=\vec b\) consistent for <i>some</i> \(\vec b\) means the columns span \(\mathbb{R}^m\).</td><td><span class="pill bad">False</span> "Some" is not "every". \(\vec b=\vec 0\) always works.</td></tr>
    <tr><td>\(A\vec x=\vec 0\) has the trivial solution iff there are no free variables.</td><td><span class="pill bad">False</span> It <i>always</i> has the trivial solution.</td></tr>
    <tr><td>If \(A\vec x=\vec b\) has more than one solution, so does \(A\vec x=\vec 0\).</td><td><span class="pill good">True</span> The difference of two solutions is a nonzero homogeneous solution.</td></tr>
    <tr><td>\(n\times n\) with \(n\) pivots means \(\operatorname{RREF} = I_n\).</td><td><span class="pill good">True</span></td></tr>
    <tr><td>\(-\vec u\in\operatorname{span}\{\vec u,\vec v\}\).</td><td><span class="pill good">True</span> \(-\vec u = (-1)\vec u + 0\vec v\).</td></tr>
    <tr><td>3 equations in 2 unknowns can't have a unique solution.</td><td><span class="pill bad">False</span> E.g. \(x=1, y=2, x+y=3\).</td></tr>
    <tr><td>If \(\vec u_4\) is a combination of \(\vec u_1,\vec u_2,\vec u_3\), then the span doesn't change when \(\vec u_4\) is added.</td><td><span class="pill good">True</span></td></tr>
    <tr><td>The codomain of \(T(\vec x)=A\vec x\) is the span of the columns.</td><td><span class="pill bad">False</span> That's the range. The codomain is \(\mathbb{R}^m\).</td></tr>
    <tr><td>\(T:\mathbb{R}^t\to\mathbb{R}^s\) is not linear if \(s&lt;t\).</td><td><span class="pill bad">False</span> Dimensions don't matter.</td></tr>
    <tr><td>\(A\vec x\) can be \(\vec 0\) with \(A\neq0\), \(\vec x\neq\vec 0\).</td><td><span class="pill good">True</span> \(\begin{bmatrix}1&1\\1&1\end{bmatrix}\begin{bmatrix}1\\-1\end{bmatrix} = \vec 0\).</td></tr>
    <tr><td>Dependent means every vector is a combination of the others.</td><td><span class="pill bad">False</span> At least one is.</td></tr>
    <tr><td>\(p\le n\) vectors in \(\mathbb{R}^n\) are independent.</td><td><span class="pill bad">False</span> No conclusion from size.</td></tr>
    <tr><td>\(T(\vec 0)=\vec 0\) means \(T\) is linear.</td><td><span class="pill bad">False</span> Necessary, not sufficient.</td></tr>
    <tr><td>A pivot in every row of \([A\mid\vec b]\) means consistent.</td><td><span class="pill bad">False</span> It's about \(A\). A pivot in the last column means inconsistent.</td></tr>
    <tr><td>A linear system can have exactly 2 solutions.</td><td><span class="pill bad">False</span> 0, 1, or infinitely many.</td></tr>
  </table>

  <h2 id="examrules">7. Exam rules (from the review sheet)</h2>
  <ul>
    <li>50 minutes. True/false, multiple choice, and open response. No partial credit on T/F or MC.</li>
    <li><b>State every row operation</b> you use (e.g. \(R_2\leftarrow R_2-3R_1\)). Without it, no partial credit.</li>
    <li>No calculators, notes, or software. Practice arithmetic with fractions by hand.</li>
    <li>Proofs won't be asked, but you must know the <b>statements</b> of the results.</li>
    <li>Watch for "<b>some</b>" vs. "<b>every</b>", and "a" vs. "the only".</li>
    <li>Covers 1.1, 1.2, 1.3, 1.4, 1.5, 1.7, 1.8, 1.9 (no 1.6).</li>
  </ul>
  `
});

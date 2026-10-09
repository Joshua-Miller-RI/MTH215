Site.register({
  id: 's1_5',
  num: '1.5',
  title: 'Solution Sets of Linear Systems',
  group: 'Lessons',
  desc: 'Homogeneous systems, trivial vs nontrivial solutions, parametric vector form, and why solutions of Ax=b are shifted copies of solutions of Ax=0.',
  html: tx`
  <div class="kicker">Section 1.5</div>
  <h1>Solution Sets of Linear Systems</h1>
  <p class="lede">When a system has infinitely many solutions, what does that set of solutions look like? This section answers that: it's always a line, plane, etc., through the origin (for \(A\vec x = \vec 0\)), or a <b>shifted</b> copy of one (for \(A\vec x = \vec b\)).</p>

  <div class="toc"><div class="toc-title">In this lesson</div><ol>
    <li><a href="#" data-scroll="homog">Homogeneous systems</a></li>
    <li><a href="#" data-scroll="nontriv">When are there nontrivial solutions?</a></li>
    <li><a href="#" data-scroll="pvf">Parametric vector form</a></li>
    <li><a href="#" data-scroll="nonhomog">Nonhomogeneous systems</a></li>
    <li><a href="#" data-scroll="thm">Theorem 1.46: shift the homogeneous solutions</a></li>
    <li><a href="#" data-scroll="review">Review problem 31</a></li>
    <li><a href="#" data-scroll="quiz">Quiz</a></li>
  </ol></div>

  <h2 id="homog">1. Homogeneous systems</h2>
  <div class="box def">
    <div class="box-title">Definition 1.41 · Homogeneous system</div>
    <p>A linear system is <b>homogeneous</b> if it can be written \(A\vec x = \vec 0\), where \(A\) is \(m\times n\) and \(\vec 0\) is the zero vector in \(\mathbb{R}^m\). In other words, <b>every right-hand side is 0</b>.</p>
  </div>
  <p>A homogeneous system <b>always</b> has at least one solution: \(\vec x = \vec 0\), because \(A\vec 0 = \vec 0\). This solution is called the <b>trivial solution</b>. It's "trivial" because it's boring and always there.</p>
  <p>The interesting question is: <b>is there a nontrivial solution</b>, some \(\vec x \neq \vec 0\) with \(A\vec x = \vec 0\)?</p>
  <div class="box idea">
    <div class="box-title">Remark 1.42 · matrices are not like numbers here</div>
    <p>For real numbers, \(ax = 0\) forces \(a = 0\) or \(x = 0\). For matrices that's <b>false</b>. A nonzero matrix times a nonzero vector can give \(\vec 0\):</p>
    \[\begin{bmatrix}1&1\\1&1\end{bmatrix}\begin{bmatrix}1\\-1\end{bmatrix} = 1\begin{bmatrix}1\\1\end{bmatrix} - 1\begin{bmatrix}1\\1\end{bmatrix} = \begin{bmatrix}0\\0\end{bmatrix}.\]
    <p>(This is Review T/F #11: "\(A\vec x\) can be \(\vec 0\) even if \(A\) and \(\vec x\) are nonzero" is <b>True</b>.)</p>
  </div>

  <h2 id="nontriv">2. When are there nontrivial solutions?</h2>
  <p>The augmented matrix of a homogeneous system is \([\,A \mid \vec 0\,]\). Row operations keep a column of zeros as zeros, so the last column stays all zeros forever. That means a bad row \([0 \cdots 0 \mid c]\) with \(c \neq 0\) can <b>never</b> appear, which confirms that homogeneous systems are always consistent.</p>
  <p>So by the Existence and Uniqueness Theorem, only one question is left: are there free variables?</p>
  <div class="box thm">
    <div class="box-title">Proposition 1.43</div>
    <p>The homogeneous equation \(A\vec x = \vec 0\) has a <b>nontrivial solution</b> if and only if it has <b>at least one free variable</b>.</p>
  </div>
  <p><b>Why:</b> no free variables gives a unique solution, which must be the trivial one. A free variable gives infinitely many solutions, and set it to 1 and you get one that isn't \(\vec 0\). Conversely, if \(\vec v \neq \vec 0\) solves it, then so does \(t\vec v\) for every \(t\) (because \(A(t\vec v) = tA\vec v = \vec 0\)). That's infinitely many solutions, so there must be a free variable.</p>
  <div class="box tip"><div class="box-title">Quick consequence</div>
    <p>If \(A\) has <b>more columns than rows</b> (more unknowns than equations), \(A\vec x = \vec 0\) <b>always</b> has nontrivial solutions, since there aren't enough pivots to cover every column.</p></div>
  <div class="box warn"><div class="box-title">Trap (Review T/F #4)</div>
    <p>"\(A\vec x = \vec 0\) has the trivial solution if and only if there are no free variables" is <b>False</b>. It <i>always</i> has the trivial solution. The correct statement is: \(A\vec x = \vec 0\) has <b>only</b> the trivial solution if and only if there are no free variables.</p></div>

  <h2 id="pvf">3. Parametric vector form</h2>
  <p>When there are free variables, we write all the solutions as a vector expression called <b>parametric vector form</b>.</p>
  <div class="box ex">
    <div class="box-title">Example 1.44</div>
    <p>Does \(\ 2x_1 + 4x_2 - 6x_3 = 0,\ \ 4x_1 + 8x_2 - 10x_3 = 0\ \) have nontrivial solutions? Describe all solutions.</p>
    <div class="reveal">
      <div class="step"><div class="step-label">Row reduce</div>
        \[\left[\begin{array}{ccc|c}2&4&-6&0\\4&8&-10&0\end{array}\right] \xrightarrow{R_2 \leftarrow R_2 - 2R_1} \left[\begin{array}{ccc|c}2&4&-6&0\\0&0&2&0\end{array}\right]\]
        \[\xrightarrow[R_2 \leftarrow \frac12R_2]{R_1 \leftarrow \frac12R_1} \left[\begin{array}{ccc|c}1&2&-3&0\\0&0&1&0\end{array}\right] \xrightarrow{R_1 \leftarrow R_1 + 3R_2} \left[\begin{array}{ccc|c}1&2&0&0\\0&0&1&0\end{array}\right]\]</div>
      <div class="step"><div class="step-label">Basic in terms of free</div>Pivots are in columns 1 and 3, so \(x_2\) is <b>free</b>. That means yes, there are nontrivial solutions. The equations: \(x_1 + 2x_2 = 0\) and \(x_3 = 0\), so \(x_1 = -2x_2\), \(x_3 = 0\).</div>
      <div class="step"><div class="step-label">Write \(\vec x\) as a vector</div>\[\vec x = \begin{bmatrix}x_1\\x_2\\x_3\end{bmatrix} = \begin{bmatrix}-2x_2\\x_2\\0\end{bmatrix}\]</div>
      <div class="step"><div class="step-label">Factor out the free variable</div>\[\vec x = x_2\begin{bmatrix}-2\\1\\0\end{bmatrix}\]This is <b>parametric vector form</b>. Geometrically, the solution set is a <b>line through the origin</b> in \(\mathbb{R}^3\), namely \(\operatorname{span}\{(-2,1,0)\}\).</div>
    </div>
  </div>
  <div class="box def">
    <div class="box-title">Recipe · parametric vector form</div>
    <ol>
      <li>Row reduce the augmented matrix to RREF.</li>
      <li>Solve for each basic variable in terms of the free variables.</li>
      <li>Write \(\vec x\) as a column, substituting those expressions (each free variable stays as itself).</li>
      <li>Split the vector into: (a constant vector) + (free variable 1)(vector) + (free variable 2)(vector) + …</li>
    </ol>
  </div>

  <h2 id="nonhomog">4. Nonhomogeneous systems</h2>
  <div class="box ex">
    <div class="box-title">Example 1.45 · same left side, new right side</div>
    <p>Solve \(\ 2x_1 + 4x_2 - 6x_3 = 0,\ \ 4x_1 + 8x_2 - 10x_3 = 4\).</p>
    <div class="reveal">
      <div class="step">\[\left[\begin{array}{ccc|c}2&4&-6&0\\4&8&-10&4\end{array}\right] \longrightarrow \cdots \longrightarrow \left[\begin{array}{ccc|c}1&2&0&6\\0&0&1&2\end{array}\right]\]
        (These are the same row operations as before. Only the last column changes.)</div>
      <div class="step">\(x_2\) is free, \(x_1 = 6 - 2x_2\), \(x_3 = 2\).</div>
      <div class="step">\[\vec x = \begin{bmatrix}6 - 2x_2\\x_2\\2\end{bmatrix} = \underbrace{\begin{bmatrix}6\\0\\2\end{bmatrix}}_{\vec p} + x_2\underbrace{\begin{bmatrix}-2\\1\\0\end{bmatrix}}_{\text{same as before!}}\]</div>
      <div class="step">Compare with Example 1.44: the solutions are the <b>homogeneous solutions shifted by \(\vec p = (6, 0, 2)\)</b>. It's a line parallel to the old one, but it no longer passes through the origin. (\(\vec p\) itself is one solution: plug in \(x_2 = 0\).)</div>
    </div>
  </div>

  <h2 id="thm">5. Theorem 1.46: solutions of \(A\vec x = \vec b\) are shifted solutions of \(A\vec x = \vec 0\)</h2>
  <div class="box thm big">
    <div class="box-title">Theorem 1.46</div>
    <p>Suppose \(\vec p\) is any one particular solution of \(A\vec x = \vec b\). Then the solution set of \(A\vec x = \vec b\) is the set of all vectors of the form</p>
    \[\vec x = \vec p + \vec v_h,\]
    <p>where \(\vec v_h\) is any solution of the homogeneous equation \(A\vec x = \vec 0\).</p>
  </div>
  <p><b>Why it works:</b> \(A(\vec p + \vec v_h) = A\vec p + A\vec v_h = \vec b + \vec 0 = \vec b\), so every such vector is a solution. Conversely, if \(\vec x\) is any solution, then \(A(\vec x - \vec p) = \vec b - \vec b = \vec 0\), so \(\vec x - \vec p\) is a homogeneous solution. That covers every solution.</p>
  <p><b>Picture:</b> take the solution set of \(A\vec x = \vec 0\) (a line, plane, … through the origin) and <b>slide it</b> by \(\vec p\). Try it:</p>
  <div data-widget="solset" data-cfg='{"a":[1,-2],"b":3}'></div>
  <div class="box ex">
    <div class="box-title">Example 1.47 · planes in \(\mathbb{R}^3\)</div>
    <p>Compare the solution sets of \(2x_1 - 4x_2 - 4x_3 = 0\) and \(2x_1 - 4x_2 - 4x_3 = 6\).</p>
    <p><b>Homogeneous:</b> \([\,2\ \ {-4}\ \ {-4} \mid 0\,] \to [\,1\ \ {-2}\ \ {-2} \mid 0\,]\), so \(x_1 = 2x_2 + 2x_3\) with \(x_2, x_3\) free:</p>
    \[\vec x = x_2\begin{bmatrix}2\\1\\0\end{bmatrix} + x_3\begin{bmatrix}2\\0\\1\end{bmatrix}\quad\text{(a plane through the origin).}\]
    <p><b>Nonhomogeneous:</b> \([\,2\ \ {-4}\ \ {-4} \mid 6\,] \to [\,1\ \ {-2}\ \ {-2} \mid 3\,]\), so \(x_1 = 3 + 2x_2 + 2x_3\):</p>
    \[\vec x = \begin{bmatrix}3\\0\\0\end{bmatrix} + x_2\begin{bmatrix}2\\1\\0\end{bmatrix} + x_3\begin{bmatrix}2\\0\\1\end{bmatrix}\quad\text{(the same plane, shifted by } (3,0,0)\text{).}\]
  </div>
  <div class="box tip">
    <div class="box-title">Big consequence (Review T/F #2)</div>
    <p>"If \(A\vec x = \vec b\) has more than one solution, then so does \(A\vec x = \vec 0\)." <b>True.</b> If \(\vec x_1 \neq \vec x_2\) both solve \(A\vec x = \vec b\), then \(\vec x_1 - \vec x_2 \neq \vec 0\) solves \(A\vec x = \vec 0\), so the homogeneous system has a nontrivial solution as well as the trivial one. Equivalently, both systems have the same free variables.</p>
  </div>
  <div class="box warn">
    <div class="box-title">Careful</div>
    <p>Theorem 1.46 needs \(A\vec x = \vec b\) to be <b>consistent</b> (it needs some \(\vec p\) to exist). \(A\vec x = \vec 0\) can have infinitely many solutions while \(A\vec x = \vec b\) has none. Think of two parallel lines: the homogeneous line exists, but a particular \(\vec b\) might be inconsistent.</p>
  </div>

  <h2 id="review">6. Review problem 31 · putting it together</h2>
  <p>Let \(A = \begin{bmatrix}1&5&-2&0\\-3&1&9&-5\\4&-8&-1&7\end{bmatrix},\ \vec p = \begin{bmatrix}3\\-2\\0\\-4\end{bmatrix},\ \vec b = \begin{bmatrix}-7\\9\\0\end{bmatrix}\).</p>
  <div class="problem">
    <p><b>(a)</b> Verify that \(\vec p\) is a solution of \(A\vec x = \vec b\).</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      \[A\vec p = 3\begin{bmatrix}1\\-3\\4\end{bmatrix} - 2\begin{bmatrix}5\\1\\-8\end{bmatrix} + 0\begin{bmatrix}-2\\9\\-1\end{bmatrix} - 4\begin{bmatrix}0\\-5\\7\end{bmatrix} = \begin{bmatrix}3 - 10 + 0 - 0\\-9 - 2 + 0 + 20\\12 + 16 + 0 - 28\end{bmatrix} = \begin{bmatrix}-7\\9\\0\end{bmatrix} = \vec b\ ✓\]
    </div></details>
    <p><b>(b)</b> Is \(\vec b\) in the span of the columns of \(A\)?</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p><b>Yes</b>, immediately. \(\vec b = A\vec p = 3\vec a_1 - 2\vec a_2 + 0\vec a_3 - 4\vec a_4\) is a linear combination of the columns (with the entries of \(\vec p\) as weights), so it's in their span by definition.</p>
    </div></details>
    <p><b>(c)</b> Write \(\vec b\) as a combination of the columns of \(A\). Is there more than one way?</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p>One way: \(\vec b = 3\vec a_1 - 2\vec a_2 + 0\vec a_3 - 4\vec a_4\). There are <b>infinitely many</b> ways. \(A\) is \(3\times 4\), so it has at most 3 pivots among 4 columns, hence a free variable. Row reducing \([A \mid \vec b]\) (step through it below) gives</p>
      \[\left[\begin{array}{cccc|c}1&0&0&\frac87&-\frac{11}{7}\\0&1&0&-\frac27&-\frac67\\0&0&1&-\frac17&\frac47\end{array}\right]\quad\Longrightarrow\quad \vec x = \begin{bmatrix}-11/7\\-6/7\\4/7\\0\end{bmatrix} + x_4\begin{bmatrix}-8/7\\2/7\\1/7\\1\end{bmatrix}.\]
      <p>Setting \(x_4 = -4\) recovers \(\vec p\): \(\left(-\tfrac{11}{7} + \tfrac{32}{7},\ -\tfrac67 - \tfrac87,\ \tfrac47 - \tfrac47,\ -4\right) = (3, -2, 0, -4)\) ✓. That's Theorem 1.46 in action.</p>
    </div></details>
  </div>
  <div data-widget="rrstepper" data-cfg='{"matrix":"1 5 -2 0 | -7; -3 1 9 -5 | 9; 4 -8 -1 7 | 0","aug":true,"title":"Review 31: row reducing [A | b]"}'></div>

  <div class="summary">
    <h3>What to remember from 1.5</h3>
    <ul>
      <li>Homogeneous means \(A\vec x = \vec 0\). It's <b>always consistent</b> (the trivial solution \(\vec x = \vec 0\)).</li>
      <li>Nontrivial solutions exist \(\iff\) at least one free variable. More columns than rows guarantees this.</li>
      <li>Parametric vector form: \(\vec x = \vec p + t_1\vec v_1 + t_2\vec v_2 + \cdots\) with the free variables as parameters.</li>
      <li><b>Theorem 1.46:</b> if \(A\vec x=\vec b\) is consistent with particular solution \(\vec p\), then all solutions are \(\vec p + (\text{homogeneous solutions})\). It's a parallel shift of a line or plane through the origin.</li>
      <li>\(A\vec x = \vec 0\) can happen with \(A \neq 0\) and \(\vec x \neq \vec 0\).</li>
    </ul>
  </div>

  <h2 id="quiz">Quiz</h2>
  <div class="quiz" data-quiz="main"></div>
  `,
  quizzes: {
    main: [
      { q: tx`A homogeneous system \(A\vec x = \vec 0\) is always consistent.`, tf: true, explain: tx`\(\vec x = \vec 0\) always works.` },
      { q: tx`The equation \(A\vec x = \vec 0\) has the trivial solution if and only if there are no free variables.`, tf: false,
        explain: tx`It <i>always</i> has the trivial solution. The true version says it has <b>only</b> the trivial solution iff there are no free variables (Review T/F #4).` },
      { q: tx`If \(A\vec x = \vec b\) has more than one solution, then so does \(A\vec x = \vec 0\).`, tf: true,
        explain: tx`The difference of two different solutions of \(A\vec x=\vec b\) is a nonzero solution of \(A\vec x=\vec 0\) (Review T/F #2).` },
      { q: tx`If \(A\) is \(3\times 5\), the equation \(A\vec x = \vec 0\):`, choices: ['has only the trivial solution', 'always has a nontrivial solution', 'might be inconsistent', 'depends on the entries'], answer: 1,
        explain: tx`At most 3 pivots in 5 columns means at least 2 free variables, so nontrivial solutions exist.` },
      { q: tx`The product \(A\vec x\) can be \(\vec 0\) even if \(A\) and \(\vec x\) are both nonzero.`, tf: true,
        explain: tx`Example: \(\begin{bmatrix}1&1\\1&1\end{bmatrix}\begin{bmatrix}1\\-1\end{bmatrix} = \vec 0\) (Review T/F #11).` },
      { q: tx`The solution set of a consistent system \(A\vec x = \vec b\) is \(\vec x = \begin{bmatrix}1\\0\\2\end{bmatrix} + t\begin{bmatrix}3\\1\\0\end{bmatrix}\). What is the solution set of \(A\vec x = \vec 0\)?`, choices: [tx`\(\vec x = t\begin{bmatrix}3\\1\\0\end{bmatrix}\)`, tx`\(\vec x = \begin{bmatrix}1\\0\\2\end{bmatrix}\) only`, tx`only \(\vec x = \vec 0\)`, tx`\(\vec x = \begin{bmatrix}1\\0\\2\end{bmatrix} + \begin{bmatrix}3\\1\\0\end{bmatrix}\)`], answer: 0,
        explain: tx`By Theorem 1.46, remove the particular solution \(\vec p\). What's left is the homogeneous part.` },
      { q: tx`Geometrically, the solution set of \(A\vec x = \vec 0\) with exactly one free variable is:`, choices: ['a single point', 'a line through the origin', 'a line not through the origin', 'a plane through the origin'], answer: 1,
        explain: tx`\(\vec x = t\vec v\) is a line through \(\vec 0\). (Two free variables give a plane.)` },
      { q: tx`If \(A\vec x = \vec 0\) has infinitely many solutions, then \(A\vec x = \vec b\) has infinitely many solutions for every \(\vec b\).`, tf: false,
        explain: tx`\(A\vec x=\vec b\) might be <b>inconsistent</b> for some \(\vec b\). Theorem 1.46 only applies when a particular solution exists.` }
    ]
  }
});

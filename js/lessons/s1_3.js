Site.register({
  id: 's1_3',
  num: '1.3',
  title: 'Vector Equations',
  group: 'Lessons',
  desc: 'Vectors, adding and scaling them, linear combinations, and span, with the big link back to linear systems.',
  html: tx`
  <div class="kicker">Section 1.3</div>
  <h1>Vector Equations</h1>
  <p class="lede">Now we look at linear algebra geometrically. A vector is an arrow. Adding arrows and stretching them lets us build new ones, and the question "can I build this arrow?" turns out to be the same as "does this system have a solution?"</p>

  <div class="toc"><div class="toc-title">In this lesson</div><ol>
    <li><a href="#" data-scroll="vec">What a vector is</a></li>
    <li><a href="#" data-scroll="ops">Adding and scaling</a></li>
    <li><a href="#" data-scroll="lc">Linear combinations</a></li>
    <li><a href="#" data-scroll="sys">Combinations = systems</a></li>
    <li><a href="#" data-scroll="span">Span</a></li>
    <li><a href="#" data-scroll="recipe">Intuition: span as recipes</a></li>
    <li><a href="#" data-scroll="quiz">Quiz</a></li>
  </ol></div>

  <h2 id="vec">1. What is a vector?</h2>
  <div class="box def">
    <div class="box-title">Definition 1.21 · Vector</div>
    <p>A matrix with only one column is called a <b>column vector</b>, or just a <b>vector</b>, written with an arrow: \(\vec x\).</p>
  </div>
  \[\vec u = \begin{bmatrix} 3 \\ -1 \end{bmatrix},\quad \vec v = \begin{bmatrix} \pi \\ 0.1 \end{bmatrix},\quad \vec w = \begin{bmatrix} -0.5 \\ 45 \end{bmatrix},\quad \vec 0 = \begin{bmatrix} 0 \\ 0 \end{bmatrix}\]
  <p>A vector with 2 entries, \(\begin{bmatrix}x_1\\x_2\end{bmatrix}\), corresponds to the point \((x_1, x_2)\) in the plane. Draw it as an <b>arrow from the origin to that point</b>. The set of all such vectors is</p>
  \[\mathbb{R}^2 = \left\{\begin{bmatrix}x_1\\x_2\end{bmatrix} : x_1, x_2 \in \mathbb{R}\right\}.\]
  <div class="box def">
    <div class="box-title">Definition 1.23 · \(\mathbb{R}^n\)</div>
    <p>For \(n \geq 1\), \(\mathbb{R}^n\) (read "R-n," not "R to the n") is the collection of all lists of \(n\) real numbers written as columns:</p>
    \[\mathbb{R}^n = \left\{\begin{bmatrix}u_1\\ \vdots \\ u_n\end{bmatrix} : u_1, \dots, u_n \in \mathbb{R}\right\}.\]
  </div>
  <p>\(\mathbb{R}^3\) is 3D space. Past that we can't draw pictures, but the algebra works exactly the same.</p>
  <div class="box warn"><div class="box-title">Notation</div><p>In text, \(\vec v = (3, 1)\) means the column vector \(\begin{bmatrix}3\\1\end{bmatrix}\). Two vectors are equal only if <b>every</b> entry matches, in order: \((1,2) \neq (2,1)\).</p></div>

  <h2 id="ops">2. Adding and scaling vectors</h2>
  <h3>Addition: add the matching entries</h3>
  \[\vec u = \begin{bmatrix}1\\3\end{bmatrix},\ \vec v = \begin{bmatrix}2\\1\end{bmatrix} \quad\Longrightarrow\quad \vec u + \vec v = \begin{bmatrix}1+2\\3+1\end{bmatrix} = \begin{bmatrix}3\\4\end{bmatrix}.\]
  <div class="box thm">
    <div class="box-title">Proposition 1.22 · Parallelogram rule</div>
    <p>If \(\vec u, \vec v \in \mathbb{R}^2\), then \(\vec u + \vec v\) is the fourth corner of the parallelogram whose other corners are \(\vec u\), \(\vec 0\), and \(\vec v\).</p>
  </div>
  <p>Another way to see it is <b>tip-to-tail</b>: walk along \(\vec u\), then from where you ended up, walk along \(\vec v\). You land at \(\vec u + \vec v\).</p>
  <h3>Scalar multiplication: multiply every entry</h3>
  <p>A <b>scalar</b> is just a real number. To multiply a vector by a scalar \(c\), multiply each entry by \(c\):</p>
  \[\vec x = \begin{bmatrix}1\\-2\end{bmatrix}:\quad 3\vec x = \begin{bmatrix}3\\-6\end{bmatrix},\quad -2\vec x = \begin{bmatrix}-2\\4\end{bmatrix},\quad \tfrac12\vec x = \begin{bmatrix}1/2\\-1\end{bmatrix}.\]
  <p>Geometrically, \(c\vec x\) <b>stretches</b> the arrow by a factor \(|c|\), and if \(c &lt; 0\) it also <b>flips</b> it to point the opposite way. It always stays on the same line through the origin. Subtraction is \(\vec u - \vec v = \vec u + (-1)\vec v\).</p>
  <div class="box thm">
    <div class="box-title">Theorem 1.24 · Algebraic properties of \(\mathbb{R}^n\)</div>
    <p>For all \(\vec u, \vec v, \vec w\) in \(\mathbb{R}^n\) and scalars \(c, d\):</p>
    <table class="tbl" style="box-shadow:none">
      <tr><td>1. \(\vec u + \vec v = \vec v + \vec u\)</td><td>2. \((\vec u + \vec v) + \vec w = \vec u + (\vec v + \vec w)\)</td></tr>
      <tr><td>3. \(\vec u + \vec 0 = \vec u\)</td><td>4. \(\vec u + (-1)\vec u = \vec u - \vec u = \vec 0\)</td></tr>
      <tr><td>5. \(c(\vec u + \vec v) = c\vec u + c\vec v\)</td><td>6. \((c+d)\vec u = c\vec u + d\vec u\)</td></tr>
      <tr><td>7. \(c(d\vec u) = (cd)\vec u\)</td><td>8. \(1\vec u = \vec u\)</td></tr>
    </table>
    <p class="small muted">In short, vectors follow the same algebra rules as ordinary numbers for adding and scaling.</p>
  </div>

  <h2 id="lc">3. Linear combinations</h2>
  <p>Combine both operations (scale some vectors, then add) and you get a <b>linear combination</b>. This is the most important idea in the course.</p>
  <div class="box def">
    <div class="box-title">Definition 1.25 · Linear combination</div>
    <p>Given vectors \(\vec v_1, \vec v_2, \dots, \vec v_p\) in \(\mathbb{R}^n\) and scalars \(c_1, c_2, \dots, c_p\) (called <b>weights</b>), the vector</p>
    \[\vec y = c_1\vec v_1 + c_2\vec v_2 + \cdots + c_p\vec v_p\]
    <p>is a <b>linear combination</b> of \(\vec v_1, \dots, \vec v_p\). Weights can be any real numbers, including 0 and negatives.</p>
  </div>
  <p>Think of \(\vec v_1\) and \(\vec v_2\) as two kinds of steps you're allowed to take. The weights say how many of each step to take (a negative weight means walking backwards). Play with Example 1.26: \(\vec v_1 = (2,1)\), \(\vec v_2 = (-2,2)\). Try to reach each target \(\vec a, \vec b, \vec c, \vec d\).</p>
  <div data-widget="combo" data-cfg='{"v1":[2,1],"v2":[-2,2],"c1":1,"c2":1,"targets":[{"name":"a","v":[0,3]},{"name":"b","v":[-4,1]},{"name":"c","v":[4,8]},{"name":"d","v":[7,-4]}]}'></div>
  <details class="solution"><summary>Example 1.26 answers</summary><div class="sol-body">
    \[\vec a = \vec v_1 + \vec v_2,\qquad \vec b = -\vec v_1 + \vec v_2,\qquad \vec c = 4\vec v_1 + 2\vec v_2,\qquad \vec d = \vec v_1 - \tfrac52\vec v_2.\]
    <p>Check \(\vec d\): \(\begin{bmatrix}2\\1\end{bmatrix} - \tfrac52\begin{bmatrix}-2\\2\end{bmatrix} = \begin{bmatrix}2+5\\1-5\end{bmatrix} = \begin{bmatrix}7\\-4\end{bmatrix}\) ✓.</p>
    <p>With the "Show span" box checked, the purple skewed grid is made of the lines \(c_1\vec v_1 + c_2\vec v_2\) with whole-number weights. Every point of the plane is reachable, which is why the span is all of \(\mathbb{R}^2\).</p>
  </div></details>
  <p>Now drag \(\vec v_2\) so it points along the same line as \(\vec v_1\), say \(\vec v_2 = (4, 2)\). Suddenly the purple arrow can only move along one line. That's the difference between a span that's a <b>plane</b> and one that's a <b>line</b>.</p>

  <h2 id="sys">4. "Is \(\vec b\) a linear combination?" is a linear system</h2>
  <p>Guessing weights by sliding works in 2D with nice numbers. In general, we need a method. Take</p>
  \[\vec a_1 = \begin{bmatrix}1\\0\\3\end{bmatrix},\ \vec a_2 = \begin{bmatrix}4\\2\\14\end{bmatrix},\ \vec a_3 = \begin{bmatrix}3\\6\\10\end{bmatrix},\ \vec b = \begin{bmatrix}-1\\8\\-5\end{bmatrix}.\]
  <p>Is \(\vec b\) a linear combination of \(\vec a_1, \vec a_2, \vec a_3\)? That is, are there weights \(c_1, c_2, c_3\) with</p>
  \[c_1\begin{bmatrix}1\\0\\3\end{bmatrix} + c_2\begin{bmatrix}4\\2\\14\end{bmatrix} + c_3\begin{bmatrix}3\\6\\10\end{bmatrix} = \begin{bmatrix}-1\\8\\-5\end{bmatrix}?\]
  <p>Compute the left side entry by entry. Two vectors are equal exactly when each entry matches, so this one <b>vector equation</b> is really three ordinary equations:</p>
  \[\begin{aligned} 1c_1 + 4c_2 + 3c_3 &= -1 \\ 0c_1 + 2c_2 + 6c_3 &= 8 \\ 3c_1 + 14c_2 + 10c_3 &= -5 \end{aligned}\]
  <p>Its augmented matrix is the vectors placed side by side as columns: \([\,\vec a_1\ \vec a_2\ \vec a_3 \mid \vec b\,]\). Row reduce:</p>
  <div data-widget="rrstepper" data-cfg='{"matrix":"1 4 3 | -1; 0 2 6 | 8; 3 14 10 | -5","aug":true,"title":"Solving for the weights","resultNote":"<p><b>The solution gives the weights:</b> c₁ = 1, c₂ = −2, c₃ = 2. So b = a₁ − 2a₂ + 2a₃.</p>"}'></div>
  <p>So \(\vec b = 1\vec a_1 - 2\vec a_2 + 2\vec a_3\). Check: \((1 - 8 + 6,\ 0 - 4 + 12,\ 3 - 28 + 20) = (-1, 8, -5)\) ✓.</p>
  <div class="box thm">
    <div class="box-title">Theorem 1.27</div>
    <p>The vector \(\vec b\) is a linear combination of \(\vec a_1, \dots, \vec a_n\) if and only if there exist weights \(c_1, \dots, c_n\) with</p>
    \[c_1\vec a_1 + c_2\vec a_2 + \cdots + c_n\vec a_n = \vec b,\]
    <p>which holds if and only if the linear system with augmented matrix</p>
    \[[\,\vec a_1\ \ \vec a_2\ \cdots\ \vec a_n \mid \vec b\,]\]
    <p>has a solution (is consistent). The solution values are the weights.</p>
  </div>
  <div class="box tip"><div class="box-title">The recipe</div><p>To decide whether \(\vec b\) is a combination of some vectors: put the vectors in as <b>columns</b>, put \(\vec b\) in as the <b>last column</b>, and row reduce. Consistent means yes. Inconsistent means no.</p></div>

  <h2 id="span">5. Span: everything you can build</h2>
  <div class="box def">
    <div class="box-title">Definition 1.28 · Span</div>
    <p>The set of <b>all</b> linear combinations of \(\vec v_1, \dots, \vec v_p\) is called the <b>span</b> of those vectors:</p>
    \[\operatorname{span}\{\vec v_1, \dots, \vec v_p\} = \{\,c_1\vec v_1 + \cdots + c_p\vec v_p \ :\ c_1, \dots, c_p \in \mathbb{R}\,\}.\]
  </div>
  <p>So "\(\vec b\) is in \(\operatorname{span}\{\vec v_1, \dots, \vec v_p\}\)" means exactly "\(\vec b\) is a linear combination of \(\vec v_1, \dots, \vec v_p\)," and Theorem 1.27 tells you how to check it.</p>
  <h3>What does a span look like? (Example 1.29)</h3>
  <p>Let \(\vec u\) and \(\vec v\) be <b>nonzero</b> vectors in \(\mathbb{R}^3\).</p>
  <ul>
    <li>\(\operatorname{span}\{\vec u\}\) is all multiples \(c\vec u\): the <b>line through \(\vec 0\) and \(\vec u\)</b>.</li>
    <li>If \(\vec v\) is <b>not</b> a multiple of \(\vec u\), then \(\operatorname{span}\{\vec u, \vec v\}\) is the <b>plane</b> through \(\vec 0\) containing \(\vec u\) and \(\vec v\).</li>
    <li>If \(\vec v\) <b>is</b> a multiple of \(\vec u\), then \(\vec v\) adds nothing new: \(\operatorname{span}\{\vec u, \vec v\} = \operatorname{span}\{\vec u\} = \operatorname{span}\{\vec v\}\), the same line.</li>
    <li>\(\vec 0\) is <b>always</b> in every span, because \(\vec 0 = 0\vec u + 0\vec v\) (choose all weights 0).</li>
  </ul>
  <p>Rotate the picture and try the presets:</p>
  <div data-widget="space3d" data-cfg='{"vecs":[[1,2,0],[0,1,2]],"presets":[{"name":"One vector: a line","vecs":[[1,2,1]]},{"name":"Two non-parallel: a plane","vecs":[[1,2,0],[0,1,2]]},{"name":"Two parallel: a line","vecs":[[1,1,2],[-2,-2,-4]]},{"name":"Three vectors: all of R³","vecs":[[2,2,0],[1,1,-1],[-1,0,1]]}]}'></div>
  <div class="box warn"><div class="box-title">Spans always pass through the origin</div><p>A span is a line, plane, etc. <b>through the origin</b> (or just \(\{\vec 0\}\), if all the vectors are zero). A line that doesn't pass through \(\vec 0\) can never be a span.</p></div>
  <div class="box ex">
    <div class="box-title">Example 1.30 · not in the span</div>
    <p>Let \(A = \begin{bmatrix}1&2\\3&1\\0&5\end{bmatrix}\) and \(\vec b = \begin{bmatrix}8\\3\\17\end{bmatrix}\). Is \(\vec b\) in the span of the columns of \(A\)?</p>
    <div class="reveal">
      <div class="step">By Theorem 1.27, row reduce \(\left[\begin{array}{cc|c}1&2&8\\3&1&3\\0&5&17\end{array}\right]\).</div>
      <div class="step">\[\xrightarrow{R_2 \leftarrow R_2 - 3R_1} \left[\begin{array}{cc|c}1&2&8\\0&-5&-21\\0&5&17\end{array}\right] \xrightarrow{R_3 \leftarrow R_3 + R_2} \left[\begin{array}{cc|c}1&2&8\\0&-5&-21\\0&0&-4\end{array}\right]\]</div>
      <div class="step">Row 3 says \(0 = -4\), so the system is inconsistent: \(\vec b\) is <b>not</b> in the span of the columns. Geometrically, the two columns span a plane in \(\mathbb{R}^3\), and \(\vec b\) is off that plane.</div>
    </div>
  </div>

  <h2 id="recipe">6. Intuition: span as recipes (Worksheet 2)</h2>
  <p>Your worksheet put it this way. Let</p>
  <p class="center">\(S = \{\)flour, yeast, sugar, water, eggs, tomatoes, pasta, marinara sauce\(\}\).</p>
  <ul>
    <li><b>\(\operatorname{span} S\)</b> is every recipe you can make by choosing <i>amounts</i> (the weights) of these ingredients.</li>
    <li>Pasta with breadsticks is in the span. So are scrambled eggs, because a weight can be zero, so you don't have to use everything.</li>
    <li>Pepperoni pizza is <b>not</b> in the span: no amount of these ingredients gives you pepperoni.</li>
    <li>You can remove <b>pasta</b> (it's made from flour and eggs) or <b>marinara</b> (made from tomatoes) and the span doesn't change. They're <b>redundant</b>. This idea, a vector that's a combination of the others, is <b>linear dependence</b> (Section 1.7).</li>
  </ul>
  <div class="box ex">
    <div class="box-title">Worksheet 2, problem 2</div>
    <p>Let \(\vec v_1 = \begin{bmatrix}2\\1\end{bmatrix}, \vec v_2 = \begin{bmatrix}-1\\1\end{bmatrix}, \vec v_3 = \begin{bmatrix}-2\\0\end{bmatrix}\). <b>(a)</b> Describe all ways to write \(\vec 0\) as a combination of \(\vec v_1, \vec v_2, \vec v_3\). <b>(b)</b> What about using only \(\vec v_1, \vec v_2\)?</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p><b>(a)</b> Solve \(x_1\vec v_1 + x_2\vec v_2 + x_3\vec v_3 = \vec 0\):</p>
      \[\left[\begin{array}{ccc|c}2&-1&-2&0\\1&1&0&0\end{array}\right] \xrightarrow{R_1 \leftrightarrow R_2} \left[\begin{array}{ccc|c}1&1&0&0\\2&-1&-2&0\end{array}\right]\]
      \[\xrightarrow{R_2 \leftarrow R_2 - 2R_1} \left[\begin{array}{ccc|c}1&1&0&0\\0&-3&-2&0\end{array}\right] \xrightarrow{R_1 \leftarrow R_1 + \frac13R_2} \left[\begin{array}{ccc|c}1&0&-\frac23&0\\0&-3&-2&0\end{array}\right]\]
      <p>\(x_3\) is free. Row 2: \(-3x_2 - 2x_3 = 0\), so \(x_2 = -\tfrac23x_3\). Row 1: \(x_1 = \tfrac23x_3\). All solutions: \((x_1, x_2, x_3) = \left(\tfrac23x_3,\ -\tfrac23x_3,\ x_3\right)\). For example, \(x_3 = 3\) gives \(2\vec v_1 - 2\vec v_2 + 3\vec v_3 = \vec 0\). Infinitely many ways!</p>
      <p><b>(b)</b> Drop column 3: \(\left[\begin{array}{cc|c}1&0&0\\0&-3&0\end{array}\right]\), which has the <b>unique</b> solution \((0,0)\). The only way is the boring one, \(0\vec v_1 + 0\vec v_2\). (This is a preview of linear independence.)</p>
    </div></details>
  </div>

  <div class="summary">
    <h3>What to remember from 1.3</h3>
    <ul>
      <li>Vectors add entry by entry (tip-to-tail, parallelogram) and scale entry by entry (stretch or flip).</li>
      <li>A <b>linear combination</b> is \(c_1\vec v_1 + \cdots + c_p\vec v_p\), and the weights can be any real numbers.</li>
      <li>\(\vec b\) is a combination of \(\vec a_1, \dots, \vec a_n\) \(\iff\) \([\,\vec a_1 \cdots \vec a_n \mid \vec b\,]\) is <b>consistent</b> (Theorem 1.27).</li>
      <li><b>Span</b> = the set of all linear combinations. In \(\mathbb{R}^3\): one nonzero vector spans a line, and two non-parallel vectors span a plane, both through \(\vec 0\).</li>
      <li>\(\vec 0\) is in every span. Each vector is in its own span (weight 1 on itself, 0 on the others).</li>
    </ul>
  </div>

  <h2 id="quiz">Quiz</h2>
  <div class="quiz" data-quiz="main"></div>
  `,
  quizzes: {
    main: [
      { q: tx`If \(\vec u = (1,-2)\) and \(\vec v = (3,1)\), what is \(2\vec u - \vec v\)?`, choices: [tx`\((-1,-5)\)`, tx`\((5,-3)\)`, tx`\((-1,-3)\)`, tx`\((2,-5)\)`], answer: 0,
        explain: tx`\(2\vec u = (2,-4)\), then \((2,-4) - (3,1) = (-1,-5)\).` },
      { q: tx`If \(\vec u\) and \(\vec v\) are in \(\mathbb{R}^n\), then \(-\vec u\) is in \(\operatorname{span}\{\vec u, \vec v\}\).`, tf: true,
        explain: tx`\(-\vec u = (-1)\vec u + 0\vec v\) is a linear combination (Review T/F #6).` },
      { q: tx`The zero vector is in the span of any nonempty set of vectors.`, tf: true, explain: tx`Use all weights equal to 0.` },
      { q: tx`If \(\vec u \neq \vec 0\) is in \(\mathbb{R}^3\), then \(\operatorname{span}\{\vec u\}\) is:`, choices: ['a single point', 'a line through the origin', 'a plane through the origin', tx`all of \(\mathbb{R}^3\)`], answer: 1,
        explain: tx`All multiples \(c\vec u\) trace out the line through \(\vec 0\) and \(\vec u\).` },
      { q: tx`Nonzero \(\vec u, \vec v \in \mathbb{R}^3\) are not multiples of each other. Then \(\operatorname{span}\{\vec u, \vec v\}\) is:`, choices: ['a line through the origin', 'a plane through the origin', tx`all of \(\mathbb{R}^3\)`, 'a plane that might miss the origin'], answer: 1,
        explain: tx`Two directions that aren't parallel make a plane, and spans always contain \(\vec 0\). Two vectors can never span all of \(\mathbb{R}^3\).` },
      { q: tx`Deciding whether \(\vec b \in \operatorname{span}\{\vec a_1, \vec a_2\}\) is the same as deciding whether which augmented matrix is consistent?`, choices: [tx`\([\,\vec a_1\ \ \vec a_2 \mid \vec b\,]\)`, tx`\([\,\vec b\ \ \vec a_1 \mid \vec a_2\,]\)`, tx`\([\,\vec a_1 \mid \vec a_2\ \ \vec b\,]\)`, tx`rows \(\vec a_1, \vec a_2, \vec b\) stacked`], answer: 0,
        explain: tx`Theorem 1.27: the vectors become columns and \(\vec b\) goes in the augmented column.` },
      { q: tx`Is \(\begin{bmatrix}1\\1\end{bmatrix}\) in \(\operatorname{span}\left\{\begin{bmatrix}1\\2\end{bmatrix}, \begin{bmatrix}2\\4\end{bmatrix}\right\}\)?`, choices: ['Yes', 'No'], answer: 1,
        explain: tx`Both vectors lie on the line \(y = 2x\), so their span is that line. \((1,1)\) isn't on it. Row reducing \(\left[\begin{array}{cc|c}1&2&1\\2&4&1\end{array}\right]\) gives \([0\ 0\mid -1]\).` },
      { q: tx`If \(\vec u_4\) is a linear combination of \(\vec u_1, \vec u_2, \vec u_3\), then \(\operatorname{span}\{\vec u_1,\vec u_2,\vec u_3\} = \operatorname{span}\{\vec u_1,\vec u_2,\vec u_3,\vec u_4\}\).`, tf: true,
        explain: tx`Like pasta in the recipe example, \(\vec u_4\) is redundant: anything built using \(\vec u_4\) can be rebuilt by substituting its formula in terms of \(\vec u_1,\vec u_2,\vec u_3\) (Review T/F #8).` }
    ]
  }
});

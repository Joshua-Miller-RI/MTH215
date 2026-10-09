Site.register({
  id: 'practice',
  num: '',
  title: 'Practice Exam (fully solved)',
  group: 'Exam prep',
  desc: 'All 32 Exam 1 Review problems and all four worksheets, with complete worked solutions, including answers to the T/F questions the review leaves blank.',
  html: tx`
  <div class="kicker">Exam prep</div>
  <h1>Practice Exam: Exam 1 Review + Worksheets, Fully Solved</h1>
  <p class="lede">Every problem from the Exam 1 Review and Worksheets 1–4. <b>Try each problem on paper first</b>, writing out every row operation as the exam requires, then open the solution.</p>
  <div class="box warn"><div class="box-title">Exam conditions</div><p>50 minutes, no calculator, no notes. True/false and multiple choice get no partial credit. On open-response problems you <b>must state each row operation</b>. The review says the real exam is much shorter than this document.</p></div>
  <div class="row"><button class="btn" id="exp-all">Expand all solutions</button><button class="btn" id="col-all">Collapse all solutions</button></div>

  <div class="toc"><div class="toc-title">Contents</div><ol>
    <li><a href="#" data-scroll="partA">Part A · True/False (Review 1–11)</a></li>
    <li><a href="#" data-scroll="partB">Part B · Multiple choice (Review 16)</a></li>
    <li><a href="#" data-scroll="partC">Part C · Open response (Review 12–32)</a></li>
    <li><a href="#" data-scroll="partD">Part D · Worksheets 1–4</a></li>
  </ol></div>

  <h2 id="partA">Part A · True/False (Review 1–11)</h2>
  <p>The review leaves these unanswered. Answer each one, then read the explanation. A wrong answer on the exam costs the whole question, so be sure you understand <i>why</i>.</p>
  <div class="quiz" data-quiz="tf" data-title="Review True/False 1–11"></div>

  <h2 id="partB">Part B · Multiple choice</h2>
  <div class="quiz" data-quiz="mc" data-title="Review 16 (choose all that apply)"></div>

  <h2 id="partC">Part C · Open response</h2>

  <div class="problem">
    <div class="p-head"><span class="p-num">12</span><span class="p-tag">1.1–1.2 · parameters</span></div>
    <p>Find values of \(h\) and \(k\) such that the system \(\begin{cases}x + 3y = 2\\ 3x + hy = k\end{cases}\) has (a) no solutions, (b) a unique solution, (c) infinitely many solutions.</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      \[\left[\begin{array}{cc|c}1&3&2\\3&h&k\end{array}\right] \xrightarrow{R_2\leftarrow R_2 - 3R_1} \left[\begin{array}{cc|c}1&3&2\\0&h-9&k-6\end{array}\right]\]
      <p><b>(a) No solutions</b> needs a row \([0\ 0\mid b]\) with \(b\neq0\): take \(h = 9\) and \(k\neq 6\).</p>
      <p><b>(b) Unique</b> needs a pivot in every coefficient column and not in the last column. If \(h\neq 9\), column 2 has a pivot \(h-9\). The matrix is square, so the last column can't also be a pivot column. So \(h\neq 9\), with \(k\) anything.</p>
      <p><b>(c) Infinitely many</b> needs a free variable (no pivot in column 2: \(h=9\)) and consistency (\(k - 6 = 0\)). So \(h = 9, k = 6\).</p>
    </div></details>
  </div>

  <div class="problem">
    <div class="p-head"><span class="p-num">13</span><span class="p-tag">1.4 · Theorem 1.36</span></div>
    <p>Let \(A = \begin{bmatrix}2&2\\-1&1\end{bmatrix}\). (a) Does \(A\vec x = \vec b\) have a solution for every \(\vec b\in\mathbb{R}^2\)? (b) Is \(\begin{bmatrix}h\\k\end{bmatrix}\in\operatorname{span}\{\vec u, \vec v\}\) for all \(h,k\), where \(\vec u = \begin{bmatrix}2\\-1\end{bmatrix}\), \(\vec v = \begin{bmatrix}2\\1\end{bmatrix}\)?</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p><b>(a) Yes.</b> \(A \xrightarrow{R_1\leftarrow\frac12R_1}\begin{bmatrix}1&1\\-1&1\end{bmatrix}\xrightarrow{R_2\leftarrow R_2 + R_1}\begin{bmatrix}1&1\\0&2\end{bmatrix}\). There's a pivot in every row, so by Theorem 1.36 \(A\vec x=\vec b\) is solvable for every \(\vec b\).</p>
      <p><b>(b) Yes.</b> \(\vec u, \vec v\) are the columns of \(A\), and by (a) and Theorem 1.36 they span \(\mathbb{R}^2\). You don't need to find the weights: the question didn't ask for them.</p>
    </div></details>
  </div>

  <div class="problem">
    <div class="p-head"><span class="p-num">14</span><span class="p-tag">1.4 · \(A\vec x\)</span></div>
    <p>Find \(a, b\) such that \(G\vec x = \vec y\), where \(G = \begin{bmatrix}a&-b\\b&a\end{bmatrix}\), \(a^2+b^2 = 1\), \(\vec x = \begin{bmatrix}4\\3\end{bmatrix}\), \(\vec y = \begin{bmatrix}5\\0\end{bmatrix}\).</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      \[G\vec x = \begin{bmatrix}4a - 3b\\4b + 3a\end{bmatrix} = \begin{bmatrix}5\\0\end{bmatrix}.\]
      <p>From \(4b + 3a = 0\), \(b = -\tfrac34 a\). Substituting: \(4a + \tfrac94 a = \tfrac{25}{4}a = 5\), so \(a = \tfrac45\) and \(b = -\tfrac35\). (Check: \(a^2 + b^2 = \tfrac{16}{25}+\tfrac{9}{25} = 1\) ✓.) \(G\) is a rotation matrix (Section 1.9).</p>
    </div></details>
  </div>

  <div class="problem">
    <div class="p-head"><span class="p-num">15</span><span class="p-tag">1.7 · independence / span</span></div>
    <p>(a) Write three linearly independent vectors in \(\mathbb{R}^5\). (b) Find four distinct nonzero vectors that span \(\mathbb{R}^3\).</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p><b>(a)</b> \(\vec e_1, \vec e_2, \vec e_3\in\mathbb{R}^5\): \((1,0,0,0,0), (0,1,0,0,0), (0,0,1,0,0)\). As columns of a matrix, each has its own pivot.</p>
      <p><b>(b)</b> \((1,0,0), (0,1,0), (0,0,1), (1,1,1)\). The first three already give a pivot in every row. Four vectors in \(\mathbb{R}^3\) must be dependent, so (at least) one is a combination of the others: here \((1,1,1)\) is the sum of the first three.</p>
    </div></details>
  </div>

  <div class="problem">
    <div class="p-head"><span class="p-num">17</span><span class="p-tag">1.4 · three forms</span></div>
    <p>Write \(x_1\begin{bmatrix}1\\5\end{bmatrix} + x_2\begin{bmatrix}-3\\10\end{bmatrix} + x_3\begin{bmatrix}2\\2\end{bmatrix}\) as a matrix-vector product.</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p>The vectors become the columns: \(\begin{bmatrix}1&-3&2\\5&10&2\end{bmatrix}\begin{bmatrix}x_1\\x_2\\x_3\end{bmatrix}\). This is the only possible answer.</p>
    </div></details>
  </div>

  <div class="problem">
    <div class="p-head"><span class="p-num">18</span><span class="p-tag">1.4 · three forms</span></div>
    <p>Write \(\begin{bmatrix}7&-3\\2&1\\9&-6\\-3&2\end{bmatrix}\begin{bmatrix}-2\\-5\end{bmatrix} = \begin{bmatrix}1\\-9\\12\\-4\end{bmatrix}\) as a vector equation.</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      \[-2\begin{bmatrix}7\\2\\9\\-3\end{bmatrix} - 5\begin{bmatrix}-3\\1\\-6\\2\end{bmatrix} = \begin{bmatrix}1\\-9\\12\\-4\end{bmatrix}.\]
    </div></details>
  </div>

  <div class="problem">
    <div class="p-head"><span class="p-num">19</span><span class="p-tag">1.4 · computing \(A\vec x\)</span></div>
    <p>Compute, or state that it is not defined: (a) \(\begin{bmatrix}6&5\\-4&-3\\7&6\end{bmatrix}\begin{bmatrix}1\\-3\end{bmatrix}\) (b) \(\begin{bmatrix}2\\6\\-1\end{bmatrix}\begin{bmatrix}1\\-1\end{bmatrix}\)</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p><b>(a)</b> \(1\begin{bmatrix}6\\-4\\7\end{bmatrix} - 3\begin{bmatrix}5\\-3\\6\end{bmatrix} = \begin{bmatrix}-9\\5\\-11\end{bmatrix}\).</p>
      <p><b>(b) Not defined.</b> The \(3\times1\) matrix has 1 column, but the vector has 2 entries. You need one weight per column.</p>
    </div></details>
  </div>

  <div class="problem">
    <div class="p-head"><span class="p-num">20</span><span class="p-tag">1.1–1.2 · solve</span></div>
    <p>Solve \(\begin{cases}x_1 - 2x_2 + 3x_3 = 9\\ -x_1 + 3x_2 = -4\\ 2x_1 - 5x_2 + 5x_3 = 17\end{cases}\)</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      \[\left[\begin{array}{ccc|c}1&-2&3&9\\-1&3&0&-4\\2&-5&5&17\end{array}\right]\xrightarrow[R_3\leftarrow R_3-2R_1]{R_2\leftarrow R_2+R_1}\left[\begin{array}{ccc|c}1&-2&3&9\\0&1&3&5\\0&-1&-1&-1\end{array}\right]\xrightarrow[R_1\leftarrow R_1+2R_2]{R_3\leftarrow R_3+R_2}\left[\begin{array}{ccc|c}1&0&9&19\\0&1&3&5\\0&0&2&4\end{array}\right]\]
      \[\xrightarrow{R_3\leftarrow\frac12R_3}\left[\begin{array}{ccc|c}1&0&9&19\\0&1&3&5\\0&0&1&2\end{array}\right]\xrightarrow[R_1\leftarrow R_1-9R_3]{R_2\leftarrow R_2-3R_3}\left[\begin{array}{ccc|c}1&0&0&1\\0&1&0&-1\\0&0&1&2\end{array}\right]\]
      <p>Unique solution: \((x_1,x_2,x_3) = (1,-1,2)\).</p>
    </div></details>
  </div>

  <div class="problem">
    <div class="p-head"><span class="p-num">21</span><span class="p-tag">1.2 · free variables</span></div>
    <p>Find the solution of the system with augmented matrix \(\left[\begin{array}{ccc|c}1&-2&-1&3\\3&-6&-2&2\end{array}\right]\).</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      \[\xrightarrow{R_2\leftarrow R_2-3R_1}\left[\begin{array}{ccc|c}1&-2&-1&3\\0&0&1&-7\end{array}\right]\xrightarrow{R_1\leftarrow R_1+R_2}\left[\begin{array}{ccc|c}1&-2&0&-4\\0&0&1&-7\end{array}\right]\]
      <p>\(x_1, x_3\) are basic and \(x_2\) is free: \(\begin{cases}x_1 = -4 + 2x_2\\ x_2 \text{ free}\\ x_3 = -7\end{cases}\), or \(\vec x = \begin{bmatrix}-4\\0\\-7\end{bmatrix} + x_2\begin{bmatrix}2\\1\\0\end{bmatrix}\).</p>
    </div></details>
  </div>

  <div class="problem">
    <div class="p-head"><span class="p-num">22</span><span class="p-tag">1.3–1.4 · forms + solve</span></div>
    <p>Consider \(\begin{cases}x_1 + 2x_2 + x_3 = 0\\ -3x_1 - x_2 + 2x_3 = 1\\ 5x_2 + 3x_3 = -1\end{cases}\) (a) Write it as a vector equation and as a matrix equation. (b) Solve it.</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p><b>(a)</b> \(x_1\begin{bmatrix}1\\-3\\0\end{bmatrix} + x_2\begin{bmatrix}2\\-1\\5\end{bmatrix} + x_3\begin{bmatrix}1\\2\\3\end{bmatrix} = \begin{bmatrix}0\\1\\-1\end{bmatrix}\), and \(\begin{bmatrix}1&2&1\\-3&-1&2\\0&5&3\end{bmatrix}\begin{bmatrix}x_1\\x_2\\x_3\end{bmatrix} = \begin{bmatrix}0\\1\\-1\end{bmatrix}\).</p>
      <p><b>(b)</b> Row operations, in order:</p>
      \[\left[\begin{array}{ccc|c}1&2&1&0\\-3&-1&2&1\\0&5&3&-1\end{array}\right]\xrightarrow{R_2\leftarrow R_2+3R_1}\left[\begin{array}{ccc|c}1&2&1&0\\0&5&5&1\\0&5&3&-1\end{array}\right]\xrightarrow{R_3\leftarrow R_3-R_2}\left[\begin{array}{ccc|c}1&2&1&0\\0&5&5&1\\0&0&-2&-2\end{array}\right]\]
      \[\xrightarrow{R_3\leftarrow-\frac12R_3}\left[\begin{array}{ccc|c}1&2&1&0\\0&5&5&1\\0&0&1&1\end{array}\right]\xrightarrow[R_1\leftarrow R_1-R_3]{R_2\leftarrow R_2-5R_3}\left[\begin{array}{ccc|c}1&2&0&-1\\0&5&0&-4\\0&0&1&1\end{array}\right]\]
      \[\xrightarrow{R_2\leftarrow\frac15R_2}\left[\begin{array}{ccc|c}1&2&0&-1\\0&1&0&-\frac45\\0&0&1&1\end{array}\right]\xrightarrow{R_1\leftarrow R_1-2R_2}\left[\begin{array}{ccc|c}1&0&0&\frac35\\0&1&0&-\frac45\\0&0&1&1\end{array}\right]\]
      <p>\(\vec x = \left(\tfrac35, -\tfrac45, 1\right)\).</p>
    </div></details>
  </div>

  <div class="problem">
    <div class="p-head"><span class="p-num">23</span><span class="p-tag">1.4 · span</span></div>
    <p>Determine whether the columns of \(\begin{bmatrix}2&1&-3&5\\1&4&2&6\\0&3&3&3\end{bmatrix}\) span \(\mathbb{R}^3\).</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      \[\xrightarrow{R_1\leftrightarrow R_2}\begin{bmatrix}1&4&2&6\\2&1&-3&5\\0&3&3&3\end{bmatrix}\xrightarrow{R_2\leftarrow R_2-2R_1}\begin{bmatrix}1&4&2&6\\0&-7&-7&-7\\0&3&3&3\end{bmatrix}\]
      \[\xrightarrow{R_2\leftarrow-\frac17R_2}\begin{bmatrix}1&4&2&6\\0&1&1&1\\0&3&3&3\end{bmatrix}\xrightarrow{R_3\leftarrow R_3-3R_2}\begin{bmatrix}1&4&2&6\\0&1&1&1\\0&0&0&0\end{bmatrix}\]
      <p>Only two pivots, and row 3 has none. By Theorem 1.36 the columns <b>do not</b> span \(\mathbb{R}^3\). Only two of the columns are independent, and spanning \(\mathbb{R}^3\) needs 3.</p>
    </div></details>
  </div>

  <div class="problem">
    <div class="p-head"><span class="p-num">24</span><span class="p-tag">1.3–1.4 · combinations</span></div>
    <p>\(\vec u = \begin{bmatrix}-1\\6\\-5\end{bmatrix}, \vec v = \begin{bmatrix}1\\2\\1\end{bmatrix}, \vec w = \begin{bmatrix}1\\0\\2\end{bmatrix}\). (a) Express \(\vec u\) as a linear combination of \(\vec v, \vec w\). (b) If \(A\vec v = \begin{bmatrix}1\\1\end{bmatrix}\) and \(A\vec w = \begin{bmatrix}0\\2\end{bmatrix}\), find \(A\vec u\).</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      \[[\,\vec v\ \vec w\mid\vec u\,] = \left[\begin{array}{cc|c}1&1&-1\\2&0&6\\1&2&-5\end{array}\right]\xrightarrow{R_3\leftarrow R_3-R_1}\left[\begin{array}{cc|c}1&1&-1\\2&0&6\\0&1&-4\end{array}\right]\xrightarrow{R_2\leftarrow R_2-2R_1}\left[\begin{array}{cc|c}1&1&-1\\0&-2&8\\0&1&-4\end{array}\right]\]
      \[\xrightarrow{R_3\leftarrow R_3+\frac12R_2}\left[\begin{array}{cc|c}1&1&-1\\0&-2&8\\0&0&0\end{array}\right]\xrightarrow{R_2\leftarrow-\frac12R_2}\left[\begin{array}{cc|c}1&1&-1\\0&1&-4\\0&0&0\end{array}\right]\xrightarrow{R_1\leftarrow R_1-R_2}\left[\begin{array}{cc|c}1&0&3\\0&1&-4\\0&0&0\end{array}\right]\]
      <p><b>(a)</b> \(\vec u = 3\vec v - 4\vec w\).</p>
      <p><b>(b)</b> By Proposition 1.40, \(A\vec u = 3A\vec v - 4A\vec w = 3\begin{bmatrix}1\\1\end{bmatrix} - 4\begin{bmatrix}0\\2\end{bmatrix} = \begin{bmatrix}3\\-5\end{bmatrix}\).</p>
    </div></details>
  </div>

  <div class="problem">
    <div class="p-head"><span class="p-num">25</span><span class="p-tag">1.8 · linear?</span></div>
    <p>State the domain, codomain, and range, and decide whether each is linear:<br>
      (a) \(T(x_1,x_2,x_3,x_4) = (0,\ x_1+x_2,\ x_2+x_3,\ x_3+x_4)\)
      (b) \(T(x_1,x_2) = (2x_2 - 3x_1,\ x_1 - 4x_2,\ 0,\ x_2)\)<br>
      (c) \(T(x_1,x_2,x_3,x_4) = 2x_1 + 3x_3 - 4x_4\)
      (d) \(T(x_1,x_2) = (2x_1 - x_2,\ x_2 + x_1 + 3,\ 3x_1 + 4x_2)\)</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p><b>(a)</b> \(\mathbb{R}^4\to\mathbb{R}^4\). Linear: \(T(\vec x) = \begin{bmatrix}0&0&0&0\\1&1&0&0\\0&1&1&0\\0&0&1&1\end{bmatrix}\vec x\). Range = span of these columns.</p>
      <p><b>(b)</b> \(\mathbb{R}^2\to\mathbb{R}^4\). Linear: \(T(\vec x) = \begin{bmatrix}-3&2\\1&-4\\0&0\\0&1\end{bmatrix}\vec x\). Range = span of these columns.</p>
      <p><b>(c)</b> \(\mathbb{R}^4\to\mathbb{R}\). Linear: \(T(\vec x) = [\,2\ \ 0\ \ 3\ \ {-4}\,]\vec x\). Range = span of the columns = \(\mathbb{R}\).</p>
      <p><b>(d)</b> \(\mathbb{R}^2\to\mathbb{R}^3\). <b>Not linear</b>: \(T(0,0) = (0,3,0)\neq\vec 0\).</p>
      <p class="small muted">Alternatively, prove (a)–(c) directly from the definition: \(T(\vec x+\vec y) = T(\vec x)+T(\vec y)\) and \(T(c\vec x) = cT(\vec x)\).</p>
    </div></details>
  </div>

  <div class="problem">
    <div class="p-head"><span class="p-num">26</span><span class="p-tag">1.9 · standard matrix</span></div>
    <p>Find the standard matrix of \(T(x,y) = (3x+y,\ 5x+7y,\ x+3y)\).</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p>\(T(\vec e_1) = (3,5,1)\) and \(T(\vec e_2) = (1,7,3)\), so \(A = \begin{bmatrix}3&1\\5&7\\1&3\end{bmatrix}\) and \(T(\vec x) = A\vec x\) for all \(\vec x\in\mathbb{R}^2\).</p>
    </div></details>
  </div>

  <div class="problem">
    <div class="p-head"><span class="p-num">27</span><span class="p-tag">1.8 · not linear</span></div>
    <p>Show that \(T(x_1,x_2) = (2x_1 - 3x_2,\ x_1 + 2,\ 3x_2)\) is not a linear transformation.</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p>\(T(0,0) = (0,2,0)\neq(0,0,0)\). A linear transformation must satisfy \(T(\vec 0)=\vec 0\), so \(T\) is not linear.</p>
    </div></details>
  </div>

  <div class="problem">
    <div class="p-head"><span class="p-num">28</span><span class="p-tag">1.9 · from \(T(\vec e_i)\)</span></div>
    <p>\(T:\mathbb{R}^3\to\mathbb{R}^2\) is linear with \(T(\vec e_1) = \begin{bmatrix}1\\2\end{bmatrix}, T(\vec e_2) = \begin{bmatrix}0\\-1\end{bmatrix}, T(\vec e_3) = \begin{bmatrix}7\\-9\end{bmatrix}\). Find a formula for \(T(\vec x)\).</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p>A linear transformation is determined by its action on the columns of the identity: \(T(\vec x) = \begin{bmatrix}1&0&7\\2&-1&-9\end{bmatrix}\vec x\) for all \(\vec x\in\mathbb{R}^3\), i.e. \(T(\vec x) = (x_1 + 7x_3,\ 2x_1 - x_2 - 9x_3)\).</p>
    </div></details>
  </div>

  <div class="problem">
    <div class="p-head"><span class="p-num">29</span><span class="p-tag">1.2 · existence</span></div>
    <p>A system has a \(3\times5\) augmented matrix whose fifth column is a pivot column. Is it consistent?</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p><b>No.</b> The fifth column is the right-hand side. If it's a pivot column, the RREF contains the row \([\,0\ 0\ 0\ 0\mid 1\,]\), which says \(0 = 1\). By Theorem 1.18 there are no solutions.</p>
    </div></details>
  </div>

  <div class="problem">
    <div class="p-head"><span class="p-num">30</span><span class="p-tag">1.2 · uniqueness</span></div>
    <p>What must you know about the pivot columns of an augmented matrix to conclude that the system has a unique solution?</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p>Every column of the <b>coefficient</b> matrix is a pivot column (so there are no free variables, which gives uniqueness), and the <b>rightmost</b> column is <b>not</b> a pivot column (which gives consistency, i.e. existence).</p>
    </div></details>
  </div>

  <div class="problem">
    <div class="p-head"><span class="p-num">31</span><span class="p-tag">1.4–1.5 · solution sets</span></div>
    <p>\(A = \begin{bmatrix}1&5&-2&0\\-3&1&9&-5\\4&-8&-1&7\end{bmatrix}\), \(\vec p = \begin{bmatrix}3\\-2\\0\\-4\end{bmatrix}\), \(\vec b = \begin{bmatrix}-7\\9\\0\end{bmatrix}\). (a) Verify that \(\vec p\) solves \(A\vec x=\vec b\). (b) Is \(\vec b\) in the span of the columns of \(A\)? (c) If yes, write \(\vec b\) as a combination of the columns. Is there more than one way?</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p><b>(a)</b> \(A\vec p = 3\begin{bmatrix}1\\-3\\4\end{bmatrix} - 2\begin{bmatrix}5\\1\\-8\end{bmatrix} + 0\begin{bmatrix}-2\\9\\-1\end{bmatrix} - 4\begin{bmatrix}0\\-5\\7\end{bmatrix} = \begin{bmatrix}3-10+0-0\\-9-2+0+20\\12+16+0-28\end{bmatrix} = \begin{bmatrix}-7\\9\\0\end{bmatrix} = \vec b\) ✓</p>
      <p><b>(b)</b> Yes. \(\vec b = A\vec p\) is a combination of the columns with weights from \(\vec p\).</p>
      <p><b>(c)</b> \(\vec b = 3\vec a_1 - 2\vec a_2 + 0\vec a_3 - 4\vec a_4\). There are <b>infinitely many</b> ways: \(A\) is \(3\times 4\), so it can't have a pivot in every column, and there's a free variable. Indeed</p>
      \[\operatorname{RREF}[A\mid\vec b] = \left[\begin{array}{cccc|c}1&0&0&\frac87&-\frac{11}{7}\\0&1&0&-\frac27&-\frac67\\0&0&1&-\frac17&\frac47\end{array}\right],\qquad \vec x = \begin{bmatrix}-\frac{11}{7}\\-\frac67\\\frac47\\0\end{bmatrix} + x_4\begin{bmatrix}-\frac87\\\frac27\\\frac17\\1\end{bmatrix}.\]
      <p>Setting \(x_4 = -4\) recovers \(\vec p\).</p>
    </div></details>
  </div>
  <div data-widget="rrstepper" data-cfg='{"matrix":"1 5 -2 0 | -7; -3 1 9 -5 | 9; 4 -8 -1 7 | 0","aug":true,"title":"Review 31(c): step through RREF of [A | b]"}'></div>

  <div class="problem">
    <div class="p-head"><span class="p-num">32</span><span class="p-tag">1.7 · dependence</span></div>
    <p>In \(A = \begin{bmatrix}4&1&6\\-7&5&3\\9&-3&3\end{bmatrix}\), \(\vec a_3 = \vec a_1 + 2\vec a_2\). Find a nontrivial solution of \(A\vec x=\vec 0\).</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p>Columns 1 and 2 aren't multiples, so they're independent pivot columns. Column 3 depends on them, so it can't be a pivot column. The RREF must be \(\begin{bmatrix}1&0&1\\0&1&2\\0&0&0\end{bmatrix}\), whose column 3 encodes \(\vec a_3 = 1\vec a_1 + 2\vec a_2\). Solutions: \(\vec x = x_3\begin{bmatrix}-1\\-2\\1\end{bmatrix}\). With \(x_3 = 1\): \(\vec x = (-1,-2,1)\). (Check: \(-\vec a_1 - 2\vec a_2 + \vec a_3 = \vec 0\) ✓.)</p>
    </div></details>
  </div>

  <h2 id="partD">Part D · Worksheets</h2>

  <div class="problem">
    <div class="p-head"><span class="p-num">W1 · #1</span><span class="p-tag">1.1</span></div>
    <p>Solve by row reducing the augmented matrix: \(\begin{cases}-x_1 + 2x_2 = 5\\ 2x_1 - 4x_2 = 6\end{cases}\)</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      \[\left[\begin{array}{cc|c}-1&2&5\\2&-4&6\end{array}\right]\xrightarrow{R_2\leftarrow R_2+2R_1}\left[\begin{array}{cc|c}-1&2&5\\0&0&16\end{array}\right]\xrightarrow{R_1\leftarrow-R_1}\left[\begin{array}{cc|c}1&-2&-5\\0&0&16\end{array}\right]\]
      <p>Row 2 says \(0 = 16\), a contradiction: <b>no solutions</b>. (Geometrically, two parallel lines.)</p>
    </div></details>
  </div>
  <div class="problem">
    <div class="p-head"><span class="p-num">W1 · #2</span><span class="p-tag">1.2</span></div>
    <p>Solve \(\begin{cases}x_1 + 2x_2 + 3x_3 = 1\\ 2x_1 + 4x_2 + 8x_3 = 0\end{cases}\), denoting any free variables.</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      \[\left[\begin{array}{ccc|c}1&2&3&1\\2&4&8&0\end{array}\right]\xrightarrow{R_2\leftarrow R_2-2R_1}\left[\begin{array}{ccc|c}1&2&3&1\\0&0&2&-2\end{array}\right]\]
      \[\xrightarrow{R_2\leftarrow\frac12R_2}\left[\begin{array}{ccc|c}1&2&3&1\\0&0&1&-1\end{array}\right]\xrightarrow{R_1\leftarrow R_1-3R_2}\left[\begin{array}{ccc|c}1&2&0&4\\0&0&1&-1\end{array}\right]\]
      <p>\(x_1 + 2x_2 = 4\) and \(x_3 = -1\), so \((x_1,x_2,x_3) = (4 - 2x_2,\ x_2,\ -1)\) with \(x_2\) free.</p>
    </div></details>
  </div>
  <div class="problem">
    <div class="p-head"><span class="p-num">W2 · #1</span><span class="p-tag">1.3 · span intuition</span></div>
    <p>\(S = \{\)flour, yeast, sugar, water, eggs, tomatoes, pasta, marinara sauce\(\}\). (a) Describe \(\operatorname{span}S\) intuitively. (b) A meal in \(\operatorname{span}S\)? (c) A meal not in it? (d) Can an element be removed without changing the span?</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p><b>(a)</b> All the recipes you can make from these ingredients by choosing the amounts (the weights) of each.</p>
      <p><b>(b)</b> Pasta with marinara and breadsticks. Also scrambled eggs: zero weights are allowed, so you don't have to use everything.</p>
      <p><b>(c)</b> Pepperoni pizza needs pepperoni, which isn't in \(S\). (A meal made from a <i>subset</i> of the ingredients doesn't count, because zero weights are allowed.)</p>
      <p><b>(d)</b> Yes: pasta (made from flour and eggs) or marinara (made from tomatoes). They're "linear combinations" of other ingredients, so they're redundant. That's the idea behind linear dependence (1.7).</p>
    </div></details>
  </div>
  <div class="problem">
    <div class="p-head"><span class="p-num">W2 · #2</span><span class="p-tag">1.3 / 1.7</span></div>
    <p>\(\vec v_1 = \begin{bmatrix}2\\1\end{bmatrix}, \vec v_2 = \begin{bmatrix}-1\\1\end{bmatrix}, \vec v_3 = \begin{bmatrix}-2\\0\end{bmatrix}\). (a) Can you write \(\vec 0\) as a combination of \(\vec v_1,\vec v_2,\vec v_3\)? Describe all ways. (b) Using just \(\vec v_1, \vec v_2\)?</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      \[\left[\begin{array}{ccc|c}2&-1&-2&0\\1&1&0&0\end{array}\right]\xrightarrow{R_1\leftrightarrow R_2}\left[\begin{array}{ccc|c}1&1&0&0\\2&-1&-2&0\end{array}\right]\]
      \[\xrightarrow{R_2\leftarrow R_2-2R_1}\left[\begin{array}{ccc|c}1&1&0&0\\0&-3&-2&0\end{array}\right]\xrightarrow{R_1\leftarrow R_1+\frac13R_2}\left[\begin{array}{ccc|c}1&0&-\frac23&0\\0&-3&-2&0\end{array}\right]\]
      <p><b>(a)</b> Yes, in infinitely many ways: \(-3x_2 - 2x_3 = 0\) gives \(x_2 = -\tfrac23x_3\), and \(x_1 = \tfrac23x_3\). So \((x_1,x_2,x_3) = \left(\tfrac23x_3, -\tfrac23x_3, x_3\right)\) with \(x_3\) free. (That makes the set dependent: 3 vectors in \(\mathbb{R}^2\).)</p>
      <p><b>(b)</b> Drop column 3: \(\left[\begin{array}{cc|c}1&0&0\\0&-3&0\end{array}\right]\), so only \((x_1,x_2) = (0,0)\). The trivial way is the only way, so \(\{\vec v_1,\vec v_2\}\) is independent.</p>
    </div></details>
  </div>
  <div class="problem">
    <div class="p-head"><span class="p-num">W3</span><span class="p-tag">1.2 · designing RREFs</span></div>
    <p>If possible, give an augmented matrix in RREF for: (1) 3 equations, 2 unknowns with (a) no solutions, (b) one solution, (c) infinitely many. (2) 2 equations, 3 unknowns with (a), (b), (c).</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p><b>(1)</b> The augmented matrix is \(3\times3\). (a) \(\left[\begin{array}{cc|c}1&0&0\\0&1&0\\0&0&1\end{array}\right]\) (b) \(\left[\begin{array}{cc|c}1&0&0\\0&1&0\\0&0&0\end{array}\right]\) (c) \(\left[\begin{array}{cc|c}1&0&0\\0&0&0\\0&0&0\end{array}\right]\)</p>
      <p><b>(2)</b> The augmented matrix is \(2\times4\). (a) \(\left[\begin{array}{ccc|c}1&0&0&0\\0&0&0&1\end{array}\right]\) (b) <b>Not possible</b>: at most 2 pivots for 3 variable columns, so there's always a free variable. (c) \(\left[\begin{array}{ccc|c}1&0&0&0\\0&0&1&1\end{array}\right]\)</p>
    </div></details>
  </div>
  <div class="problem">
    <div class="p-head"><span class="p-num">W4 · #1</span><span class="p-tag">1.4 / 1.7</span></div>
    <p>\(A = \begin{bmatrix}8&11&-6&-7&13\\-7&-8&5&6&-9\\11&7&-7&-9&-6\\-3&4&1&8&7\end{bmatrix}\), \(\operatorname{RREF}(A) = \begin{bmatrix}1&0&-\frac7{13}&0&0\\0&1&-\frac2{13}&0&0\\0&0&0&1&0\\0&0&0&0&1\end{bmatrix}\). (a) Do the columns span \(\mathbb{R}^4\)? (b) Give a dependence relation among the columns. (c) Which columns span \(\mathbb{R}^4\) and are independent?</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p><b>(a)</b> Yes: there's a pivot in every row (Theorem 1.36).</p>
      <p><b>(b)</b> \(\vec a_3 = -\tfrac7{13}\vec a_1 - \tfrac2{13}\vec a_2\), i.e. \(-\tfrac7{13}\vec a_1 - \tfrac2{13}\vec a_2 - \vec a_3 + 0\vec a_4 + 0\vec a_5 = \vec 0\).</p>
      <p><b>(c)</b> \(\vec a_1, \vec a_2, \vec a_4, \vec a_5\) (the pivot columns) have a pivot in every row and every column.</p>
    </div></details>
  </div>
  <div class="problem">
    <div class="p-head"><span class="p-num">W4 · #2</span><span class="p-tag">1.7</span></div>
    <p>\(\vec v_1 = (-1,0,0), \vec v_2 = (2,5,1), \vec v_3 = (6,10,2), \vec v_4 = (-1,5,1)\). (a) Without computing, why is the set dependent? (b) Find the smallest subset with the same span. Is there more than one answer?</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p><b>(a)</b> 4 vectors in \(\mathbb{R}^3\): Theorem 1.53.</p>
      \[\begin{bmatrix}-1&2&6&-1\\0&5&10&5\\0&1&2&1\end{bmatrix}\xrightarrow{R_3\leftarrow R_3-\frac15R_2}\begin{bmatrix}-1&2&6&-1\\0&5&10&5\\0&0&0&0\end{bmatrix}\]
      \[\xrightarrow[R_2\leftarrow\frac15R_2]{R_1\leftarrow-R_1}\begin{bmatrix}1&-2&-6&1\\0&1&2&1\\0&0&0&0\end{bmatrix}\xrightarrow{R_1\leftarrow R_1+2R_2}\begin{bmatrix}1&0&-2&3\\0&1&2&1\\0&0&0&0\end{bmatrix}\]
      <p><b>(b)</b> \(\{\vec v_1,\vec v_2\}\), the pivot columns. Here \(\vec v_3 = -2\vec v_1 + 2\vec v_2\) and \(\vec v_4 = 3\vec v_1 + \vec v_2\). The span is a plane, so it needs at least 2 vectors. <b>Not unique:</b> no two of the four vectors are parallel, so any two of them span the same plane.</p>
    </div></details>
  </div>

  <div class="summary">
    <h3>After the practice exam</h3>
    <ul>
      <li>Missed a T/F? Go to the <a href="#/tfdrill" style="color:#c7d2fe">True/False Drill</a> and use the "Missed" filter.</li>
      <li>Row reduction slow or error-prone? Do 5 random systems in the <a href="#/lab" style="color:#c7d2fe">Row Reduction Lab</a> by hand, and check each step.</li>
      <li>Shaky on a theorem? Re-read the <a href="#/cheatsheet" style="color:#c7d2fe">Cheat Sheet</a>, then revisit the lesson.</li>
    </ul>
  </div>
  `,
  quizzes: {
    tf: [
      { q: tx`<b>1.</b> If a system of equations has no free variables, then it has a unique solution.`, tf: false,
        explain: tx`It might be inconsistent. \(\left[\begin{array}{c|c}1&2\\0&1\end{array}\right]\) has no free variables but row 2 says \(0 = 1\). Existence must be checked separately (Theorem 1.18).` },
      { q: tx`<b>2.</b> If a system \(A\vec x=\vec b\) has more than one solution, then so does the system \(A\vec x=\vec 0\).`, tf: true,
        explain: tx`If \(\vec p\neq\vec q\) are solutions, \(A(\vec p-\vec q) = \vec 0\) with \(\vec p - \vec q\neq\vec 0\). Equivalently, more than one solution means a free variable, and \(A\vec x=\vec 0\) has the same free variables.` },
      { q: tx`<b>3.</b> If \(A\) is an \(m\times n\) matrix and \(A\vec x=\vec b\) is consistent for some \(\vec b\), then the columns of \(A\) span \(\mathbb{R}^m\).`, tf: false,
        explain: tx`"Some" is not "every". \(\vec b = \vec 0\) always works, even for the zero matrix. Spanning requires <b>every</b> \(\vec b\) (Theorem 1.36).` },
      { q: tx`<b>4.</b> The equation \(A\vec x=\vec 0\) has the trivial solution if and only if there are no free variables.`, tf: false,
        explain: tx`\(A\vec x = \vec 0\) <b>always</b> has the trivial solution. The true statement uses "<b>only</b> the trivial solution".` },
      { q: tx`<b>5.</b> If an \(n\times n\) matrix has \(n\) pivot positions, then its reduced row echelon form is the \(n\times n\) identity matrix \(I_n\).`, tf: true,
        explain: tx`\(n\) pivots fill every row and column, so they sit on the diagonal. In RREF they're 1's with zeros elsewhere.` },
      { q: tx`<b>6.</b> If \(\vec u\) and \(\vec v\) are in \(\mathbb{R}^n\), then \(-\vec u\) is in \(\operatorname{span}\{\vec u, \vec v\}\).`, tf: true,
        explain: tx`\(-\vec u = (-1)\vec u + 0\vec v\).` },
      { q: tx`<b>7.</b> A system of three equations in two unknowns cannot have a unique solution.`, tf: false,
        explain: tx`\(x=1,\ y=2,\ x+y=3\) has the unique solution \((1,2)\). Augmented RREF: \(\left[\begin{array}{cc|c}1&0&1\\0&1&2\\0&0&0\end{array}\right]\).` },
      { q: tx`<b>8.</b> If \(\vec u_4\) is a linear combination of \(\{\vec u_1,\vec u_2,\vec u_3\}\), then \(\operatorname{span}\{\vec u_1,\vec u_2,\vec u_3\} = \operatorname{span}\{\vec u_1,\vec u_2,\vec u_3,\vec u_4\}\).`, tf: true,
        explain: tx`Any combination using \(\vec u_4\) can be rewritten without it by substituting \(\vec u_4 = c_1\vec u_1 + c_2\vec u_2 + c_3\vec u_3\).` },
      { q: tx`<b>9.</b> The codomain of the linear transformation \(T:\mathbb{R}^n\to\mathbb{R}^m\), \(T(\vec x) = A\vec x\), is the set of all linear combinations of the columns of \(A\).`, tf: false,
        explain: tx`That set is the <b>range</b>. The codomain is \(\mathbb{R}^m\).` },
      { q: tx`<b>10.</b> The transformation \(T:\mathbb{R}^t\to\mathbb{R}^s\) is not linear if \(s &lt; t\).`, tf: false,
        explain: tx`Dimensions have nothing to do with linearity. \(T(\vec x) = [\,1\ \ 0\,]\vec x\) maps \(\mathbb{R}^2\to\mathbb{R}\) and is linear.` },
      { q: tx`<b>11.</b> The product \(A\vec x\) can be \(\vec 0\) even if \(A\) and \(\vec x\) are nonzero.`, tf: true,
        explain: tx`\(\begin{bmatrix}1&1\\1&1\end{bmatrix}\begin{bmatrix}1\\-1\end{bmatrix} = \vec 0\).` }
    ],
    mc: [
      { q: tx`<b>16.</b> Which of the following sets of vectors in \(\mathbb{R}^3\) can possibly be linearly independent?`,
        choices: [tx`\(\{\vec 0\}\)`, tx`\(\{\vec u_1\}\)`, tx`\(\{\vec u_1, \vec u_2\}\)`, tx`\(\{\vec u_1, \vec u_2, \vec u_3\}\)`, tx`\(\{\vec u_1, \vec u_2, \vec u_3, \vec u_4\}\)`], answer: [1, 2, 3],
        explain: tx`B, C, D. A set containing \(\vec 0\) is always dependent, and 4 vectors in \(\mathbb{R}^3\) are always dependent (Theorem 1.53). Sets of 1, 2, or 3 vectors <i>can</i> be independent (e.g. \(\vec e_1, \vec e_2, \vec e_3\)).` }
    ]
  },
  init(root) {
    const all = () => root.querySelectorAll('details.solution');
    const e = root.querySelector('#exp-all'), c = root.querySelector('#col-all');
    if (e) e.onclick = () => all().forEach(d => d.open = true);
    if (c) c.onclick = () => all().forEach(d => d.open = false);
  }
});

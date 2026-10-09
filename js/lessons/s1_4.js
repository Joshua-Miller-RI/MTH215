Site.register({
  id: 's1_4',
  num: '1.4',
  title: 'The Matrix Equation Ax = b',
  group: 'Lessons',
  desc: 'Matrix times vector, the three equivalent forms of a system, and the critical Theorem 1.36 (pivot in every row).',
  html: tx`
  <div class="kicker">Section 1.4</div>
  <h1>The Matrix Equation \(A\vec x = \vec b\)</h1>
  <p class="lede">We define what it means to multiply a matrix by a vector, which gives a compact way to write any linear system as \(A\vec x = \vec b\). Then comes the theorem your professor called "critically important": when can \(A\vec x = \vec b\) be solved for every \(\vec b\)?</p>

  <div class="toc"><div class="toc-title">In this lesson</div><ol>
    <li><a href="#" data-scroll="why">Why multiply a matrix by a vector?</a></li>
    <li><a href="#" data-scroll="def">The definition of \(A\vec x\)</a></li>
    <li><a href="#" data-scroll="rowcol">The row-column shortcut</a></li>
    <li><a href="#" data-scroll="three">Three ways to write one system</a></li>
    <li><a href="#" data-scroll="every">Solvable for every \(\vec b\)?</a></li>
    <li><a href="#" data-scroll="thm">Theorem 1.36</a></li>
    <li><a href="#" data-scroll="props">Properties of \(A\vec x\)</a></li>
    <li><a href="#" data-scroll="quiz">Quiz</a></li>
  </ol></div>

  <h2 id="why">1. Why multiply a matrix by a vector?</h2>
  <p>Suppose a mysterious function \(f\) takes vectors in \(\mathbb{R}^2\) to vectors in \(\mathbb{R}^2\), and it respects linear combinations: \(f(c_1\vec u + c_2\vec v) = c_1f(\vec u) + c_2f(\vec v)\). All we know is</p>
  \[f\left(\begin{bmatrix}1\\0\end{bmatrix}\right) = \begin{bmatrix}1\\-2\end{bmatrix}, \qquad f\left(\begin{bmatrix}0\\1\end{bmatrix}\right) = \begin{bmatrix}3\\0\end{bmatrix}.\]
  <p>That's actually enough to know \(f\) <b>everywhere</b>. Any \(\vec x = (x_1, x_2)\) is a combination of those two special vectors:</p>
  \[f\left(\begin{bmatrix}x_1\\x_2\end{bmatrix}\right) = f\left(x_1\begin{bmatrix}1\\0\end{bmatrix} + x_2\begin{bmatrix}0\\1\end{bmatrix}\right) = x_1\begin{bmatrix}1\\-2\end{bmatrix} + x_2\begin{bmatrix}3\\0\end{bmatrix}.\]
  <p>The answer is "a linear combination of the two output vectors, with the entries of \(\vec x\) as weights." That operation comes up so often that we give it a name and notation: <b>matrix-vector multiplication</b>. Here, \(f(\vec x) = \begin{bmatrix}1 & 3\\-2&0\end{bmatrix}\vec x\). Watch what this function does to the whole plane (Sections 1.8 and 1.9 come back to this):</p>
  <div data-widget="transform" data-cfg='{"presets":["identity","mystery"],"initial":"mystery","title":"The mystery function as a matrix"}'></div>

  <h2 id="def">2. The definition of \(A\vec x\)</h2>
  <div class="box def">
    <div class="box-title">Definition 1.31 · Matrix-vector product</div>
    <p>Let \(A\) be an \(m \times n\) matrix with columns \(\vec a_1, \dots, \vec a_n\) (each in \(\mathbb{R}^m\)), and let \(\vec x \in \mathbb{R}^n\). Then</p>
    \[A\vec x = \big[\,\vec a_1\ \ \vec a_2\ \cdots\ \vec a_n\,\big]\begin{bmatrix}x_1\\x_2\\ \vdots\\ x_n\end{bmatrix} = x_1\vec a_1 + x_2\vec a_2 + \cdots + x_n\vec a_n.\]
    <p>In words: <b>\(A\vec x\) is the linear combination of the columns of \(A\), using the entries of \(\vec x\) as the weights.</b></p>
  </div>
  <div class="box warn">
    <div class="box-title">Size rule</div>
    <p>\(A\vec x\) is defined only when <b>the number of columns of \(A\) equals the number of entries of \(\vec x\)</b> (one weight per column). If \(A\) is \(m\times n\), then \(\vec x\) must be in \(\mathbb{R}^n\), and the result \(A\vec x\) is in \(\mathbb{R}^m\).</p>
    \[\underset{m\times n}{A}\ \underset{n\times 1}{\vec x} = \underset{m \times 1}{A\vec x}\qquad\text{(the inner numbers must match)}\]
  </div>
  <div class="box ex">
    <div class="box-title">Example 1.32</div>
    \[\begin{bmatrix}1&2&-1\\0&-5&3\end{bmatrix}\begin{bmatrix}4\\3\\7\end{bmatrix} = 4\begin{bmatrix}1\\0\end{bmatrix} + 3\begin{bmatrix}2\\-5\end{bmatrix} + 7\begin{bmatrix}-1\\3\end{bmatrix} = \begin{bmatrix}4\\0\end{bmatrix} + \begin{bmatrix}6\\-15\end{bmatrix} + \begin{bmatrix}-7\\21\end{bmatrix} = \begin{bmatrix}3\\6\end{bmatrix}\]
    \[\begin{bmatrix}2&-3\\8&0\\-5&2\end{bmatrix}\begin{bmatrix}4\\7\end{bmatrix} = 4\begin{bmatrix}2\\8\\-5\end{bmatrix} + 7\begin{bmatrix}-3\\0\\2\end{bmatrix} = \begin{bmatrix}8-21\\32+0\\-20+14\end{bmatrix} = \begin{bmatrix}-13\\32\\-6\end{bmatrix}\]
  </div>
  <p>Try your own. Click "Next step" to see each stage. The "Review 19b" button shows a product that is <b>not defined</b>.</p>
  <div data-widget="matvec"></div>

  <h2 id="rowcol">3. The row-column shortcut</h2>
  <p>There's a faster way to compute each entry: <b>entry \(i\) of \(A\vec x\) = (row \(i\) of \(A\)) times \(\vec x\)</b>. Multiply the matching entries and add them up (a "dot product").</p>
  \[\begin{bmatrix}2&3&4\\-1&5&-3\\6&-2&8\end{bmatrix}\begin{bmatrix}x_1\\x_2\\x_3\end{bmatrix} = \begin{bmatrix}2x_1 + 3x_2 + 4x_3\\ -x_1 + 5x_2 - 3x_3\\ 6x_1 - 2x_2 + 8x_3\end{bmatrix}\]
  <p>Both methods always give the same answer. Use the row method for speed, and the column definition for <b>understanding</b>: the column view is what makes all the theorems make sense.</p>
  <div class="box ex"><div class="box-title">Review problem 19a</div>
    <p>\(\begin{bmatrix}6&5\\-4&-3\\7&6\end{bmatrix}\begin{bmatrix}1\\-3\end{bmatrix} = \begin{bmatrix}6(1)+5(-3)\\-4(1)+(-3)(-3)\\7(1)+6(-3)\end{bmatrix} = \begin{bmatrix}-9\\5\\-11\end{bmatrix}.\)
    And \(\begin{bmatrix}2\\6\\-1\end{bmatrix}\begin{bmatrix}1\\-1\end{bmatrix}\) is <b>not defined</b>: the matrix has 1 column but the vector has 2 entries.</p></div>

  <h2 id="three">4. Three ways to write the same system</h2>
  <p>Look at one problem written three ways:</p>
  <table class="tbl">
    <tr><th>System of equations</th><th>Vector equation</th><th>Matrix equation</th></tr>
    <tr>
      <td>\(\begin{aligned} x_1 + 4x_2 + 3x_3 &= -1\\ 2x_2 + 6x_3 &= 8\\ 3x_1 + 14x_2 + 10x_3 &= -5\end{aligned}\)</td>
      <td>\(x_1\!\begin{bmatrix}1\\0\\3\end{bmatrix} + x_2\!\begin{bmatrix}4\\2\\14\end{bmatrix} + x_3\!\begin{bmatrix}3\\6\\10\end{bmatrix} = \begin{bmatrix}-1\\8\\-5\end{bmatrix}\)</td>
      <td>\(\begin{bmatrix}1&4&3\\0&2&6\\3&14&10\end{bmatrix}\!\begin{bmatrix}x_1\\x_2\\x_3\end{bmatrix} = \begin{bmatrix}-1\\8\\-5\end{bmatrix}\)</td>
    </tr>
  </table>
  <div class="box thm">
    <div class="box-title">Theorem 1.33</div>
    <p>Let \(A = [\,\vec a_1 \cdots \vec a_n\,]\) be \(m\times n\) and \(\vec b \in \mathbb{R}^m\). These all have the <b>same solution set</b>:</p>
    <ul>
      <li>the matrix equation \(A\vec x = \vec b\);</li>
      <li>the vector equation \(x_1\vec a_1 + \cdots + x_n\vec a_n = \vec b\);</li>
      <li>the linear system with augmented matrix \([\,\vec a_1 \cdots \vec a_n \mid \vec b\,]\).</li>
    </ul>
    <p>Consequently: <b>\(A\vec x = \vec b\) has a solution if and only if \(\vec b\) is a linear combination of the columns of \(A\)</b>, i.e., \(\vec b \in \operatorname{span}\{\vec a_1, \dots, \vec a_n\}\).</p>
  </div>
  <div class="box ex">
    <div class="box-title">Translating between forms (Review 17, 18, 22a)</div>
    <p><b>17.</b> Write \(x_1\begin{bmatrix}1\\5\end{bmatrix} + x_2\begin{bmatrix}-3\\10\end{bmatrix} + x_3\begin{bmatrix}2\\2\end{bmatrix}\) as a matrix-vector product. The vectors become columns: \(\begin{bmatrix}1&-3&2\\5&10&2\end{bmatrix}\begin{bmatrix}x_1\\x_2\\x_3\end{bmatrix}\).</p>
    <p><b>18.</b> Write \(\begin{bmatrix}7&-3\\2&1\\9&-6\\-3&2\end{bmatrix}\begin{bmatrix}-2\\-5\end{bmatrix} = \begin{bmatrix}1\\-9\\12\\-4\end{bmatrix}\) as a vector equation: \(-2\begin{bmatrix}7\\2\\9\\-3\end{bmatrix} - 5\begin{bmatrix}-3\\1\\-6\\2\end{bmatrix} = \begin{bmatrix}1\\-9\\12\\-4\end{bmatrix}\).</p>
    <p><b>22a.</b> The system \(x_1 + 2x_2 + x_3 = 0,\ -3x_1 - x_2 + 2x_3 = 1,\ 5x_2 + 3x_3 = -1\) is the vector equation \(x_1\begin{bmatrix}1\\-3\\0\end{bmatrix} + x_2\begin{bmatrix}2\\-1\\5\end{bmatrix} + x_3\begin{bmatrix}1\\2\\3\end{bmatrix} = \begin{bmatrix}0\\1\\-1\end{bmatrix}\), or the matrix equation \(\begin{bmatrix}1&2&1\\-3&-1&2\\0&5&3\end{bmatrix}\vec x = \begin{bmatrix}0\\1\\-1\end{bmatrix}\).</p>
  </div>

  <h2 id="every">5. Is \(A\vec x = \vec b\) solvable for <i>every</i> \(\vec b\)?</h2>
  <p>So far we asked about <b>one</b> specific \(\vec b\). Now: for a given \(A\), is there a solution <b>no matter which</b> \(\vec b\) we pick?</p>
  <div class="box ex">
    <div class="box-title">Example 1.34</div>
    <p>Is \(A\vec x = \vec b\) consistent for every \(\vec b = (b_1, b_2, b_3)\), where \(A = \begin{bmatrix}1&3&4\\-4&2&-6\\-3&-2&-7\end{bmatrix}\)?</p>
    <div class="reveal">
      <div class="step">Row reduce with a general right side. The last column holds expressions instead of numbers:
      \[\left[\begin{array}{ccc|c}1&3&4&b_1\\-4&2&-6&b_2\\-3&-2&-7&b_3\end{array}\right] \xrightarrow[R_3 \leftarrow R_3 + 3R_1]{R_2 \leftarrow R_2 + 4R_1} \left[\begin{array}{ccc|c}1&3&4&b_1\\0&14&10&4b_1 + b_2\\0&7&5&3b_1 + b_3\end{array}\right]\]</div>
      <div class="step">\[\xrightarrow{R_3 \leftarrow R_3 - \frac12R_2} \left[\begin{array}{ccc|c}1&3&4&b_1\\0&14&10&4b_1 + b_2\\0&0&0&b_1 - \frac12b_2 + b_3\end{array}\right]\]</div>
      <div class="step">Row 3 says \(0 = b_1 - \tfrac12b_2 + b_3\). So the system is consistent <b>only</b> for those \(\vec b\) with \(b_1 - \tfrac12 b_2 + b_3 = 0\). For example, \(\vec b = (1,1,1)\) gives \(1 - \tfrac12 + 1 = \tfrac32 \neq 0\), so there's <b>no solution</b>. The answer is <b>no</b>, not for every \(\vec b\).</div>
      <div class="step">Notice <i>why</i> it failed: the coefficient part of row 3 became <b>all zeros</b> (\(A\) has no pivot in row 3). That left the last entry entirely up to \(\vec b\), and a bad \(\vec b\) makes it nonzero.</div>
    </div>
  </div>
  <div class="box def">
    <div class="box-title">Definition 1.35 · Columns span \(\mathbb{R}^m\)</div>
    <p>If \(A = [\,\vec a_1 \cdots \vec a_n\,]\) is \(m\times n\), we say <b>the columns of \(A\) span \(\mathbb{R}^m\)</b> if <b>every</b> \(\vec b \in \mathbb{R}^m\) is a linear combination of the columns. We write \(\operatorname{span}\{\vec a_1, \dots, \vec a_n\} = \mathbb{R}^m\).</p>
  </div>
  <p>In Example 1.34, the columns do <b>not</b> span \(\mathbb{R}^3\), since \((1,1,1)\) isn't a combination of them. (In fact the three columns only span a plane.)</p>

  <h2 id="thm">6. Theorem 1.36 · the "critically important" theorem</h2>
  <div class="box thm big">
    <div class="box-title">Theorem 1.36</div>
    <p>Let \(A\) be an \(m \times n\) matrix. The following are <b>logically equivalent</b> (either all true or all false):</p>
    <ol>
      <li>For <b>every</b> \(\vec b \in \mathbb{R}^m\), the equation \(A\vec x = \vec b\) has a solution.</li>
      <li><b>Every</b> \(\vec b \in \mathbb{R}^m\) is a linear combination of the columns of \(A\).</li>
      <li>The columns of \(A\) <b>span</b> \(\mathbb{R}^m\).</li>
      <li>\(A\) has a <b>pivot position in every row</b>.</li>
    </ol>
  </div>
  <p><b>Why it's true, in plain language.</b> Statements 1, 2, 3 are the same idea in different words (Theorem 1.33 plus the definition of span). The surprising part is 4, which you can check by row reducing \(A\) alone, with no \(\vec b\) needed:</p>
  <ul>
    <li><b>If every row of \(A\) has a pivot:</b> row reduce \([A \mid \vec b]\). Every row's pivot sits in the coefficient part, so the last column can never be a pivot column, and there's never a row \([0 \cdots 0 \mid c]\). The system is consistent for every \(\vec b\).</li>
    <li><b>If some row of \(A\) has no pivot:</b> the echelon form of \(A\) has a zero row at the bottom. Then you can choose a \(\vec b\) that makes the last entry of that row nonzero, producing \([0 \cdots 0 \mid c \neq 0]\), so that \(\vec b\) has no solution. (That's exactly what happened in Example 1.34.)</li>
  </ul>
  <p>Here it is in 2D. The columns of \(A = \begin{bmatrix}1&2\\2&4\end{bmatrix}\) point along the same line, so \(A\) row reduces to \(\begin{bmatrix}1&2\\0&0\end{bmatrix}\), with no pivot in row 2. Try to reach a target off the line:</p>
  <div data-widget="combo" data-cfg='{"v1":[1,2],"v2":[2,4],"c1":1,"c2":0.5,"title":"Columns that do NOT span R²","sub":"Here v₁ and v₂ are the columns of A = [1 2; 2 4]. Every combination stays on one line, so most targets b cannot be reached. Drag v₂ off the line and the span becomes the whole plane (then A would have a pivot in every row).","targets":[{"name":"b","v":[3,1]}]}'></div>
  <div class="box warn">
    <div class="box-title">Warning 1 · it's pivots of \(A\), not of \([A \mid \vec b]\) (Example 1.39)</div>
    <p>Theorem 1.36 is about the <b>coefficient matrix \(A\)</b>. If the <i>augmented</i> matrix has a pivot in every row, that can mean the opposite! \(\left[\begin{array}{c c|c}1&0&2\\0&0&1\end{array}\right]\) has a pivot in every row, but row 2 says \(0 = 1\): no solution.</p>
  </div>
  <div class="box warn">
    <div class="box-title">Warning 2 · "some" vs "every"</div>
    <p>"\(A\vec x = \vec b\) is consistent for <b>some</b> \(\vec b\)" says almost nothing. It's always consistent for \(\vec b = \vec 0\)! It does <b>not</b> mean the columns span \(\mathbb{R}^m\) (Review T/F #3 is <b>False</b>). Theorem 1.36 is about <b>every</b> \(\vec b\).</p>
  </div>
  <h3>Using the theorem with only the size of \(A\)</h3>
  <div class="box ex">
    <div class="box-title">Example 1.37 · a \(3\times 2\) matrix</div>
    <p>If \(A\) is \(3\times 2\), is \(A\vec x = \vec b\) consistent for all \(\vec b \in \mathbb{R}^3\)? <b>No.</b> \(A\) has only 2 columns, so at most 2 pivots, but 3 rows. Some row lacks a pivot, so by Theorem 1.36 the columns can't span \(\mathbb{R}^3\). (Two vectors span at most a plane.)</p>
  </div>
  <div class="box ex">
    <div class="box-title">Example 1.38 · a \(3 \times 6\) matrix</div>
    <p>If \(A\) is \(3\times 6\)? <b>We can't tell</b> from the size alone. It <i>could</i> have 3 pivots, but might not. For example, \(A = \begin{bmatrix}1&1&1&1&1&1\\0&0&0&0&0&0\\0&0&0&0&0&0\end{bmatrix}\) works for \(\vec b = (1,0,0)\) but fails for \(\vec b = (1,1,1)\).</p>
  </div>
  <div class="box thm"><div class="box-title">Size consequence (memorize)</div>
    <p>If \(A\) is \(m \times n\) with <b>\(n &lt; m\)</b> (fewer columns than rows), then the columns of \(A\) <b>cannot</b> span \(\mathbb{R}^m\). Fewer than \(m\) vectors can never span \(\mathbb{R}^m\).</p></div>
  <p>Check Theorem 1.36 on any matrix (choose "just a matrix"). The analysis at the end tells you whether there's a pivot in every row:</p>
  <div data-widget="lab" data-cfg='{"tab":"solver","matrix":"1 3 4\n-4 2 -6\n-3 -2 -7","mode":"matrix","examples":[{"name":"Ex 1.34 matrix","m":"1 3 4\n-4 2 -6\n-3 -2 -7","mode":"mat"},{"name":"Review 13 matrix","m":"2 2\n-1 1","mode":"mat"},{"name":"Review 23","m":"2 1 -3 5\n1 4 2 6\n0 3 3 3","mode":"mat"},{"name":"Worksheet 4","m":"8 11 -6 -7 13\n-7 -8 5 6 -9\n11 7 -7 -9 -6\n-3 4 1 8 7","mode":"mat"}]}'></div>
  <div class="box ex">
    <div class="box-title">Review problem 13</div>
    <p>Let \(A = \begin{bmatrix}2&2\\-1&1\end{bmatrix}\). (a) Does \(A\vec x = \vec b\) have a solution for every \(\vec b \in \mathbb{R}^2\)? (b) Is \(\begin{bmatrix}h\\k\end{bmatrix} \in \operatorname{span}\{\vec u, \vec v\}\) for all \(h, k\), where \(\vec u = \begin{bmatrix}2\\-1\end{bmatrix}, \vec v = \begin{bmatrix}2\\1\end{bmatrix}\)?</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p><b>(a)</b> Yes. \(\begin{bmatrix}2&2\\-1&1\end{bmatrix} \xrightarrow{R_1 \leftarrow \frac12R_1} \begin{bmatrix}1&1\\-1&1\end{bmatrix} \xrightarrow{R_2 \leftarrow R_2 + R_1} \begin{bmatrix}1&1\\0&2\end{bmatrix}\). There's a pivot in every row, so by Theorem 1.36 there's a solution for every \(\vec b\).</p>
      <p><b>(b)</b> Yes. \(\vec u, \vec v\) are exactly the columns of \(A\), and by part (a) they span \(\mathbb{R}^2\). No extra computation is needed. The question didn't ask for the weights, so read questions carefully!</p>
    </div></details>
  </div>

  <h2 id="props">7. Properties of the matrix-vector product</h2>
  <div class="box thm">
    <div class="box-title">Proposition 1.40</div>
    <p>If \(A\) is \(m\times n\), \(\vec u, \vec v \in \mathbb{R}^n\), and \(c\) is a scalar, then</p>
    \[A(\vec u + \vec v) = A\vec u + A\vec v \qquad\text{and}\qquad A(c\vec u) = c\,(A\vec u).\]
  </div>
  <p>These two rules are what "linear" will mean in Section 1.8. A handy consequence: if you know \(A\) on a few vectors, you know it on all their combinations.</p>
  <div class="box ex">
    <div class="box-title">Review problem 24</div>
    <p>Let \(\vec u = \begin{bmatrix}-1\\6\\-5\end{bmatrix}, \vec v = \begin{bmatrix}1\\2\\1\end{bmatrix}, \vec w = \begin{bmatrix}1\\0\\2\end{bmatrix}\). (a) Write \(\vec u\) as a combination of \(\vec v, \vec w\). (b) If \(A\vec v = \begin{bmatrix}1\\1\end{bmatrix}\) and \(A\vec w = \begin{bmatrix}0\\2\end{bmatrix}\), find \(A\vec u\).</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p><b>(a)</b> Row reduce \([\,\vec v\ \vec w \mid \vec u\,]\):</p>
      \[\left[\begin{array}{cc|c}1&1&-1\\2&0&6\\1&2&-5\end{array}\right] \xrightarrow{R_3 \leftarrow R_3 - R_1} \left[\begin{array}{cc|c}1&1&-1\\2&0&6\\0&1&-4\end{array}\right] \xrightarrow{R_2 \leftarrow R_2 - 2R_1} \left[\begin{array}{cc|c}1&1&-1\\0&-2&8\\0&1&-4\end{array}\right]\]
      \[\xrightarrow{R_3 \leftarrow R_3 + \frac12R_2} \left[\begin{array}{cc|c}1&1&-1\\0&-2&8\\0&0&0\end{array}\right] \xrightarrow{R_2 \leftarrow -\frac12R_2} \left[\begin{array}{cc|c}1&1&-1\\0&1&-4\\0&0&0\end{array}\right] \xrightarrow{R_1 \leftarrow R_1 - R_2} \left[\begin{array}{cc|c}1&0&3\\0&1&-4\\0&0&0\end{array}\right]\]
      <p>So \(\vec u = 3\vec v - 4\vec w\).</p>
      <p><b>(b)</b> By Proposition 1.40: \(A\vec u = A(3\vec v - 4\vec w) = 3A\vec v - 4A\vec w = 3\begin{bmatrix}1\\1\end{bmatrix} - 4\begin{bmatrix}0\\2\end{bmatrix} = \begin{bmatrix}3\\-5\end{bmatrix}\). We never needed to know \(A\) itself.</p>
    </div></details>
  </div>

  <div class="summary">
    <h3>What to remember from 1.4</h3>
    <ul>
      <li>\(A\vec x = x_1\vec a_1 + \cdots + x_n\vec a_n\): a combination of the <b>columns</b> of \(A\), weighted by the entries of \(\vec x\). It needs (# columns of \(A\)) = (# entries of \(\vec x\)).</li>
      <li>System \(\iff\) vector equation \(\iff\) matrix equation \(\iff\) augmented matrix: same solutions.</li>
      <li>\(A\vec x = \vec b\) is consistent \(\iff\) \(\vec b\) is in the span of the columns of \(A\).</li>
      <li><b>Theorem 1.36:</b> \(A\vec x=\vec b\) is solvable for <b>every</b> \(\vec b\) \(\iff\) the columns span \(\mathbb{R}^m\) \(\iff\) <b>pivot in every row of \(A\)</b>.</li>
      <li>Fewer columns than rows means the columns can't span. Check the pivots of \(A\), not \([A\mid\vec b]\).</li>
      <li>\(A(\vec u+\vec v) = A\vec u + A\vec v\) and \(A(c\vec u) = cA\vec u\).</li>
    </ul>
  </div>

  <h2 id="quiz">Quiz</h2>
  <div class="quiz" data-quiz="main"></div>
  `,
  quizzes: {
    main: [
      { q: tx`If \(A\) is \(3 \times 4\), then \(A\vec x\) is defined for \(\vec x\) in ___ and the result is in ___.`, choices: [tx`\(\mathbb{R}^3\); \(\mathbb{R}^4\)`, tx`\(\mathbb{R}^4\); \(\mathbb{R}^3\)`, tx`\(\mathbb{R}^4\); \(\mathbb{R}^4\)`, tx`\(\mathbb{R}^3\); \(\mathbb{R}^3\)`], answer: 1,
        explain: tx`\(\vec x\) needs one entry per column (4). The result has one entry per row (3).` },
      { q: tx`\(\begin{bmatrix}1&2\\3&4\end{bmatrix}\begin{bmatrix}1\\-1\end{bmatrix} = \)`, choices: [tx`\(\begin{bmatrix}-1\\-1\end{bmatrix}\)`, tx`\(\begin{bmatrix}-2\\-2\end{bmatrix}\)`, tx`\(\begin{bmatrix}1\\-4\end{bmatrix}\)`, tx`\(\begin{bmatrix}3\\7\end{bmatrix}\)`], answer: 0,
        explain: tx`\(1\begin{bmatrix}1\\3\end{bmatrix} - 1\begin{bmatrix}2\\4\end{bmatrix} = \begin{bmatrix}-1\\-1\end{bmatrix}\).` },
      { q: tx`If \(A\) is \(m\times n\) and \(A\vec x = \vec b\) is consistent for <b>some</b> \(\vec b\), then the columns of \(A\) span \(\mathbb{R}^m\).`, tf: false,
        explain: tx`"Some" isn't "every." \(A\vec x=\vec 0\) is always consistent, for any \(A\). Spanning needs every \(\vec b\) (Review T/F #3).` },
      { q: tx`If \(A\) is \(3\times 2\), then \(A\vec x = \vec b\) is consistent for every \(\vec b \in \mathbb{R}^3\).`, tf: false,
        explain: tx`At most 2 pivots but 3 rows, so some row has no pivot. Two vectors can't span \(\mathbb{R}^3\).` },
      { q: tx`If the augmented matrix \([A \mid \vec b]\) has a pivot in every row, then \(A\vec x = \vec b\) is consistent.`, tf: false,
        explain: tx`Example 1.39: \(\left[\begin{array}{cc|c}1&0&2\\0&0&1\end{array}\right]\). The pivot in row 2 is in the <i>last</i> column, which means no solution. Theorem 1.36 is about pivots of \(A\).` },
      { q: tx`\(A\) is \(4\times 5\) and has a pivot in every row. Which must be true?`, choices: [tx`The columns of \(A\) span \(\mathbb{R}^4\)`, tx`The columns of \(A\) span \(\mathbb{R}^5\)`, tx`\(A\vec x=\vec b\) has a unique solution for every \(\vec b\)`, tx`\(A\vec x = \vec b\) is inconsistent for some \(\vec b\)`], answer: 0,
        explain: tx`Theorem 1.36 with \(m = 4\). (Solutions aren't unique: 5 columns but only 4 pivots means a free variable.)` },
      { q: tx`If \(A\vec v = \begin{bmatrix}1\\2\end{bmatrix}\) and \(A\vec w = \begin{bmatrix}3\\0\end{bmatrix}\), then \(A(2\vec v - \vec w) = \)`, choices: [tx`\(\begin{bmatrix}-1\\4\end{bmatrix}\)`, tx`\(\begin{bmatrix}5\\4\end{bmatrix}\)`, tx`\(\begin{bmatrix}-1\\2\end{bmatrix}\)`, 'not enough information'], answer: 0,
        explain: tx`\(2A\vec v - A\vec w = (2,4) - (3,0) = (-1, 4)\), by Proposition 1.40.` },
      { q: tx`\(A\vec x = \vec b\) has a solution if and only if:`, choices: [tx`\(\vec b\) is a linear combination of the rows of \(A\)`, tx`\(\vec b\) is a linear combination of the columns of \(A\)`, tx`\(A\) has a pivot in every row`, tx`\(A\) is square`], answer: 1,
        explain: tx`Theorem 1.33. (A pivot in every row is enough but not necessary for <i>one particular</i> \(\vec b\).)` }
    ]
  }
});

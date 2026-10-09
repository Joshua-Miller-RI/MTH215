Site.register({
  id: 's1_2',
  num: '1.2',
  title: 'Row Reduction and Echelon Forms',
  group: 'Lessons',
  desc: 'REF and RREF, pivots, the row reduction algorithm, basic and free variables, and the Existence and Uniqueness Theorem.',
  html: tx`
  <div class="kicker">Section 1.2</div>
  <h1>Row Reduction and Echelon Forms</h1>
  <p class="lede">Section 1.1 gave us the moves (row operations). This section gives us the destination, a shape called "echelon form," and a recipe for getting there. Then we learn to read the answer straight off that shape.</p>

  <div class="toc"><div class="toc-title">In this lesson</div><ol>
    <li><a href="#" data-scroll="ref">Echelon forms (REF and RREF)</a></li>
    <li><a href="#" data-scroll="pivots">Pivots and pivot columns</a></li>
    <li><a href="#" data-scroll="alg">The row reduction algorithm</a></li>
    <li><a href="#" data-scroll="free">Basic and free variables</a></li>
    <li><a href="#" data-scroll="eu">Existence and Uniqueness Theorem</a></li>
    <li><a href="#" data-scroll="count">Counting pivots</a></li>
    <li><a href="#" data-scroll="proc">The full procedure and a practice lab</a></li>
    <li><a href="#" data-scroll="quiz">Quiz</a></li>
  </ol></div>

  <h2 id="ref">1. Echelon forms: the shape we're aiming for</h2>
  <p>The <b>leading entry</b> of a row is its leftmost nonzero number. In an echelon form, these leading entries are called <b>pivots</b>.</p>
  <div class="box def">
    <div class="box-title">Definition 1.9 · Row echelon form (REF)</div>
    <p>A matrix is in <b>row echelon form</b> if:</p>
    <ol>
      <li>Each row's pivot (leftmost nonzero entry) is strictly to the <b>right</b> of the pivot in the row above it.</li>
      <li>Every entry <b>below</b> a pivot is \(0\).</li>
      <li>All zero rows are at the <b>bottom</b>.</li>
    </ol>
  </div>
  <p>Picture a staircase going down and to the right. Each step can be one column wide or skip several columns.</p>
  \[\begin{bmatrix} \blacksquare & * & * & * \\ 0 & \blacksquare & * & * \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0\end{bmatrix} \qquad \begin{bmatrix} \blacksquare & * & * \\ 0 & \blacksquare & * \\ 0 & 0 & \blacksquare \\ 0 & 0 & 0\end{bmatrix}\qquad \begin{bmatrix} 0 & \blacksquare & * & * & * & * & * \\ 0 & 0 & 0 & \blacksquare & * & * & * \\ 0 & 0 & 0 & 0 & \blacksquare & * & * \\ 0&0&0&0&0&0&\blacksquare\end{bmatrix}\]
  <p class="small muted">\(\blacksquare\) = pivot (nonzero), \(*\) = anything (zero or not).</p>
  <div class="box def">
    <div class="box-title">Definition 1.10 · Reduced row echelon form (RREF)</div>
    <p>A matrix is in <b>reduced row echelon form</b> if:</p>
    <ol>
      <li>It is in REF;</li>
      <li>Every pivot equals \(1\);</li>
      <li>Every entry <b>above</b> a pivot is \(0\) too, so each pivot is alone in its column.</li>
    </ol>
  </div>
  \[\begin{bmatrix} 1 & 0 & * & * \\ 0 & 1 & * & * \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0\end{bmatrix} \qquad \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \\ 0 & 0 & 0\end{bmatrix}\qquad \begin{bmatrix} 0 & 1 & * & 0 & 0 & * & 0 \\ 0 & 0 & 0 & 1 & 0 & * & 0 \\ 0 & 0 & 0 & 0 & 1 & * & 0 \\ 0&0&0&0&0&0&1\end{bmatrix}\]
  <p>RREF is the "fully simplified" version. When an augmented matrix is in RREF, you can read the solution directly.</p>
  <div class="box thm">
    <div class="box-title">Theorem 1.11 · RREF is unique</div>
    <p>Every matrix is row equivalent to <b>exactly one</b> reduced row echelon form matrix.</p>
  </div>
  <p>A matrix has many possible REFs (you could scale a row by 2 and still be in REF), but only <b>one</b> RREF. So no matter which correct row operations you choose, you'll end at the same RREF. A useful consequence: <b>the pivot positions are the same in every echelon form</b> of a matrix, so "where the pivots are" is a well-defined property of the matrix.</p>
  <div class="quiz" data-quiz="spot" data-title="Practice: REF, RREF, or neither?"></div>

  <h2 id="pivots">2. Pivot positions and pivot columns</h2>
  <div class="box def">
    <div class="box-title">Definition · pivot position, pivot column</div>
    <p>A <b>pivot position</b> in a matrix \(A\) is a location that holds a pivot (a leading 1) in the RREF of \(A\). A <b>pivot column</b> is a column of \(A\) that contains a pivot position.</p>
  </div>
  <p>To find the pivot columns of a matrix, row reduce it (an REF is enough) and see which columns have pivots. Those are the pivot columns <b>of the original matrix</b> too. Pivots will answer nearly every question on this exam.</p>

  <h2 id="alg">3. The row reduction algorithm</h2>
  <div class="box def">
    <div class="box-title">Row reduction steps</div>
    <p><b>Forward phase (gets REF):</b></p>
    <ol>
      <li>Find the leftmost nonzero column. This is a pivot column. If the top entry is 0, <b>swap</b> in a row with a nonzero entry there, which becomes the pivot.</li>
      <li>Use <b>replacement</b> operations to make every entry <b>below</b> the pivot zero.</li>
      <li>Cover up that row (and everything above). Repeat steps 1–2 on the smaller matrix that remains, until no rows are left.</li>
    </ol>
    <p><b>Backward phase (REF to RREF):</b></p>
    <ol start="4">
      <li>Start with the <b>rightmost</b> pivot and work upward and left: <b>scale</b> each pivot to 1 and use replacement to create zeros <b>above</b> it.</li>
    </ol>
  </div>
  <p>Watch the algorithm run on Example 1.12. Red entries are pivots, and blue marks the row that just changed.</p>
  <div data-widget="rrstepper" data-cfg='{"matrix":"2 3 2 3; -2 1 6 1; -1 -3 -4 1","title":"Example 1.12: find RREF(A)"}'></div>
  <p>And Example 1.13, a wider matrix whose first column starts with a 0, so a swap is needed right away:</p>
  <div data-widget="rrstepper" data-cfg='{"matrix":"0 3 -6 6 4 -5; 3 -7 8 -5 8 9; 3 -9 12 -9 6 15","title":"Example 1.13"}'></div>
  <div class="box tip">
    <div class="box-title">Hand-computation tips (no calculator on the exam)</div>
    <ul>
      <li>If some row has a <b>1</b> (or \(-1\)) in the pivot column, swap it to the top. It makes the multipliers whole numbers.</li>
      <li>Scale a row to get rid of a common factor early (for example, \(R_2 \leftarrow \tfrac12 R_2\) on \([0\ 2\ {-4}\ 4]\)).</li>
      <li>Do one column at a time, left to right, and don't skip around.</li>
      <li>You can write several operations in one step <b>if</b> they use the same pivot row (like \(R_2 \leftarrow R_2 + R_1\) and \(R_3 \leftarrow R_3 + \tfrac12 R_1\) together), but list every one.</li>
      <li>Check a final answer by plugging it into the <b>original</b> equations.</li>
    </ul>
  </div>

  <h2 id="free">4. Basic and free variables: reading the solution</h2>
  <div class="box def">
    <div class="box-title">Definition 1.14 · Basic and free variables</div>
    <p>In the (augmented) matrix of a system:</p>
    <ul>
      <li>Variables whose columns are <b>pivot columns</b> are <b>basic variables</b>.</li>
      <li>Variables whose columns have <b>no pivot</b> are <b>free variables</b>.</li>
    </ul>
  </div>
  <p>"Free" means exactly that: you can choose <b>any</b> value for a free variable, and the equations then tell you what each basic variable must be. Each choice gives a different solution.</p>
  <div class="box ex">
    <div class="box-title">Example 1.15</div>
    <p>A system's augmented matrix has RREF \(\left[\begin{array}{ccc|c} 1 & 0 & -5 & 1 \\ 0 & 1 & 1 & 4 \\ 0 & 0 & 0 & 0\end{array}\right]\).</p>
    <p>Columns 1 and 2 have pivots, so \(x_1, x_2\) are <b>basic</b>. Column 3 has no pivot, so \(x_3\) is <b>free</b>. The rows say</p>
    \[\begin{aligned} x_1 - 5x_3 &= 1 \\ x_2 + x_3 &= 4 \\ 0 &= 0 \end{aligned}\qquad\Longrightarrow\qquad \begin{cases} x_1 = 1 + 5x_3 \\ x_2 = 4 - x_3 \\ x_3 \text{ is free} \end{cases}\]
    <p>So the system is consistent, with infinitely many solutions (one for each value of \(x_3\)). For instance \(x_3 = 0\) gives \((1, 4, 0)\), and \(x_3 = 1\) gives \((6, 3, 1)\).</p>
  </div>
  <div class="box ex">
    <div class="box-title">Example 1.16</div>
    <p>RREF of an augmented matrix: \(\left[\begin{array}{ccccc|c} 1 & 6 & 0 & 3 & 0 & 0 \\ 0 & 0 & 1 & -4 & 0 & 5 \\ 0 & 0 & 0 & 0 & 1 & 7\end{array}\right]\).</p>
    <p>Pivot columns: 1, 3, 5, so the basic variables are \(x_1, x_3, x_5\). Non-pivot columns: 2, 4, so the free variables are \(x_2, x_4\).</p>
    \[\begin{cases} x_1 = -6x_2 - 3x_4 \\ x_2 \text{ is free} \\ x_3 = 5 + 4x_4 \\ x_4 \text{ is free} \\ x_5 = 7 \end{cases}\]
    <p class="small"><b>How:</b> each nonzero row of the RREF is one equation. Move the free-variable terms to the right side, leaving the basic variable alone on the left.</p>
  </div>
  <div class="box warn"><div class="box-title">Careful</div><p>Only use the <b>RREF</b> to read off the solution this way. In a non-reduced REF, a basic variable might still appear in another row's equation, so you'd have to back-substitute.</p></div>

  <h2 id="eu">5. The Existence and Uniqueness Theorem</h2>
  <p>This theorem answers the big question: does a solution exist, and is it unique?</p>
  <div class="box thm">
    <div class="box-title">Theorem 1.18 · Existence and Uniqueness</div>
    <p><b>Existence:</b> A linear system is consistent <b>if and only if</b> the rightmost column of its augmented matrix is <b>not</b> a pivot column. Equivalently, an echelon form of the augmented matrix has <b>no</b> row of the form</p>
    \[[\,0\ \ 0\ \cdots\ 0 \mid c\,] \quad\text{with } c \neq 0.\]
    <p><b>Uniqueness:</b> If the system is consistent, its solution set contains</p>
    <ol>
      <li>a <b>unique</b> solution if there are <b>no free variables</b>;</li>
      <li><b>infinitely many</b> solutions if there is <b>at least one</b> free variable.</li>
    </ol>
  </div>
  <p>As a flowchart:</p>
  <div class="flow">
    <div class="node"><b>Step 1</b>Row reduce the augmented matrix to REF</div>
    <div class="arrow">&rarr;</div>
    <div class="node"><b>Pivot in the last column?</b>(a row \([0\cdots0\mid c]\), \(c\neq0\))<br>Yes: <span class="pill bad">no solution</span></div>
    <div class="arrow">&rarr;</div>
    <div class="node"><b>No: consistent.</b> Any free variables?<br>No: <span class="pill good">unique</span><br>Yes: <span class="pill info">infinitely many</span></div>
  </div>
  <div class="box ex">
    <div class="box-title">Example 1.17 · decide existence and uniqueness</div>
    <p><b>(a)</b> \(\left[\begin{array}{ccccc|c} 3 & -9 & 12 & -9 & 6 & 15 \\ 0 & 2 & -4 & 4 & 2 & -6 \\ 0 & 0 & 0 & 0 & 1 & 4\end{array}\right]\). There's no \([0\cdots0\mid c\neq0]\) row, so it's <b>consistent</b>. Pivots are in columns 1, 2, 5, so \(x_3, x_4\) are free. <b>Infinitely many</b> solutions.</p>
    <p><b>(b)</b> \(\left[\begin{array}{cc|c} 3 & 4 & -3 \\ 0 & 1 & 3 \\ 0 & 0 & 0\end{array}\right]\). Consistent, and both variables are basic (no free variables), so there's a <b>unique</b> solution. A zero row \([0\ 0 \mid 0]\) is harmless.</p>
    <p><b>(c)</b> \(\left[\begin{array}{cccc|c} 1 & -2 & -1 & 3 & 0 \\ 0 & 0 & 3 & 1 & 3 \\ 0 & 0 & 0 & 0 & 5\end{array}\right]\). There are free variables (\(x_2, x_4\)), <b>but</b> row 3 says \(0 = 5\). <b>No solution.</b></p>
  </div>
  <div class="box warn">
    <div class="box-title">The classic trap (Review T/F #1)</div>
    <p>"Free variables" does <b>not</b> mean "infinitely many solutions" by itself, and "no free variables" does <b>not</b> mean "unique solution" by itself. <b>First</b> check consistency. Free variables only count once you know the system is consistent.</p>
  </div>
  <div class="box idea">
    <div class="box-title">Exploration 1.19 · which pivots does a unique solution need?</div>
    <p>For a consistent system to have a unique solution, <b>every column of the coefficient matrix must have a pivot</b> (no free variables), and the last column must not.</p>
    <p>Does every <b>row</b> need a pivot? <b>No.</b> For example, \(\left[\begin{array}{cc|c} 1 & 0 & 2 \\ 0 & 1 & 3 \\ 0 & 0 & 0 \end{array}\right]\) has a zero row but a unique solution \((2,3)\). Zero rows just mean an equation was redundant.</p>
  </div>

  <h2 id="count">6. Counting pivots</h2>
  <p>Each row can have <b>at most one</b> pivot (it's the leading entry), and each column can have <b>at most one</b> pivot (the staircase moves right every row). So:</p>
  <div class="box thm"><div class="box-title">Key fact</div>
    <p>An \(m \times n\) matrix has at most \(\min(m, n)\) pivots.</p></div>
  <div class="box ex">
    <div class="box-title">Example 1.20 · try each before revealing</div>
    <div class="reveal">
      <div class="step"><b>1.</b> What is the largest possible number of pivots in a \(4\times 6\) matrix?</div>
      <div class="step"><b>Answer: 4.</b> There are only 4 rows, with at most one pivot each.</div>
      <div class="step"><b>2.</b> The largest possible number of pivots in a \(6 \times 4\) matrix?</div>
      <div class="step"><b>Answer: 4.</b> There are only 4 columns, with at most one pivot each.</div>
      <div class="step"><b>3.</b> A consistent linear system has 3 equations and 4 unknowns. How many solutions does it have?</div>
      <div class="step"><b>Answer: infinitely many.</b> The coefficient matrix is \(3\times4\), so it has at most 3 pivots among 4 variable columns. At least one variable is free, and since the system is consistent, there are infinitely many solutions. Example shape: \(\left[\begin{array}{cccc|c} 1 & 0 & 0 & * & * \\ 0 & 1 & 0 & * & * \\ 0 & 0 & 1 & * & *\end{array}\right]\).</div>
      <div class="step"><b>4.</b> A system's coefficient matrix is \(4 \times 6\) with 3 pivot columns. If the system is inconsistent, how many pivot columns does the augmented matrix have?</div>
      <div class="step"><b>Answer: 4.</b> Inconsistent means the last column of the augmented matrix is a pivot column. That's the 3 coefficient pivots plus 1.</div>
    </div>
  </div>
  <div class="box ex">
    <div class="box-title">Worksheet 3 · design an RREF</div>
    <p>Find an augmented matrix in RREF for each description (or explain why it's impossible).</p>
    <details class="solution"><summary>3 equations, 2 unknowns (augmented matrix is 3×3)</summary><div class="sol-body">
      <p><b>No solution:</b> \(\left[\begin{array}{cc|c}1&0&0\\0&1&0\\0&0&1\end{array}\right]\) (the last row is \(0=1\)).
      &nbsp; <b>One solution:</b> \(\left[\begin{array}{cc|c}1&0&0\\0&1&0\\0&0&0\end{array}\right]\).
      &nbsp; <b>Infinitely many:</b> \(\left[\begin{array}{cc|c}1&0&0\\0&0&0\\0&0&0\end{array}\right]\) (\(x_2\) free).</p>
    </div></details>
    <details class="solution"><summary>2 equations, 3 unknowns (augmented matrix is 2×4)</summary><div class="sol-body">
      <p><b>No solution:</b> \(\left[\begin{array}{ccc|c}1&0&0&0\\0&0&0&1\end{array}\right]\).
      &nbsp; <b>One solution: impossible!</b> At most 2 pivots among 3 variable columns, so there's always a free variable.
      &nbsp; <b>Infinitely many:</b> \(\left[\begin{array}{ccc|c}1&0&0&0\\0&0&1&1\end{array}\right]\).</p>
    </div></details>
  </div>
  <div class="box tip"><div class="box-title">Remember</div><p><b>More unknowns than equations</b> (\(n &gt; m\)): never a unique solution. Either none or infinitely many. <b>More equations than unknowns</b> (\(m &gt; n\)): anything can happen, including a unique solution (Review T/F #7).</p></div>

  <h2 id="proc">7. The full procedure, plus a practice lab</h2>
  <div class="box def">
    <div class="box-title">Solving a linear system via row reduction</div>
    <ol>
      <li>Write the augmented matrix of the system.</li>
      <li>Row reduce to an REF. If a row \([0 \cdots 0 \mid c]\) with \(c \neq 0\) appears, <b>stop</b>: there's no solution.</li>
      <li>Otherwise, continue to the RREF.</li>
      <li>Write the system of equations given by the RREF.</li>
      <li>Solve each equation for its basic variable in terms of the free variables.</li>
    </ol>
  </div>
  <p>Practice right here. Type any matrix or click an example. For more (random problems, and doing the operations yourself), go to the full <a href="#/lab">Row Reduction Lab</a>.</p>
  <div data-widget="lab" data-cfg='{"tab":"solver","matrix":"1 6 2 -5 -2 | -4\n0 0 2 -8 -1 | 3\n0 0 0 0 1 | 7","mode":"aug"}'></div>

  <div class="summary">
    <h3>What to remember from 1.2</h3>
    <ul>
      <li><b>REF:</b> staircase pivots, zeros below the pivots, zero rows at the bottom. <b>RREF:</b> also every pivot is 1 and has zeros above it. RREF is unique.</li>
      <li><b>Basic</b> variables have pivot columns; <b>free</b> variables don't.</li>
      <li><b>Consistent</b> \(\iff\) the last column of the augmented matrix is not a pivot column (no row \([0\cdots 0\mid c\neq 0]\)).</li>
      <li>If consistent: <b>no free variables means unique; at least one free variable means infinitely many.</b></li>
      <li>An \(m\times n\) matrix has at most \(\min(m,n)\) pivots. More unknowns than equations means never unique.</li>
    </ul>
  </div>

  <h2 id="quiz">Quiz</h2>
  <div class="quiz" data-quiz="main"></div>
  `,
  quizzes: {
    spot: [
      { q: tx`\(\begin{bmatrix}1&2&0\\0&0&1\\0&0&0\end{bmatrix}\)`, choices: ['RREF', 'REF but not RREF', 'Neither'], answer: 0,
        explain: tx`The pivots (1s) step right, each is alone in its column, and the zero row is at the bottom.` },
      { q: tx`\(\begin{bmatrix}2&3&4\\0&0&5\\0&0&0\end{bmatrix}\)`, choices: ['RREF', 'REF but not RREF', 'Neither'], answer: 1,
        explain: tx`It's a staircase with zeros below the pivots, so it's REF. But the pivots 2 and 5 aren't 1, and there's a 4 above the pivot 5, so it's not RREF.` },
      { q: tx`\(\begin{bmatrix}1&0&3\\0&0&0\\0&1&2\end{bmatrix}\)`, choices: ['RREF', 'REF but not RREF', 'Neither'], answer: 2,
        explain: tx`A zero row sits above a nonzero row. Zero rows must be at the bottom.` },
      { q: tx`\(\begin{bmatrix}0&1&2\\1&0&3\end{bmatrix}\)`, choices: ['RREF', 'REF but not RREF', 'Neither'], answer: 2,
        explain: tx`Row 2's pivot (column 1) is to the <i>left</i> of row 1's pivot (column 2). Swapping the rows would fix it.` },
      { q: tx`\(\begin{bmatrix}1&4&0\\0&1&0\\0&0&1\end{bmatrix}\)`, choices: ['RREF', 'REF but not RREF', 'Neither'], answer: 1,
        explain: tx`It's REF with all pivots equal to 1, but the 4 sits above the pivot in column 2. RREF needs zeros above every pivot.` },
      { q: tx`\(\begin{bmatrix}1&0&5&0\\0&1&-2&0\\0&0&0&1\end{bmatrix}\)`, choices: ['RREF', 'REF but not RREF', 'Neither'], answer: 0,
        explain: tx`Pivots in columns 1, 2, 4 are 1s with zeros above and below. Column 3 has no pivot, so it can contain anything.` }
    ],
    main: [
      { q: tx`If a system of equations has no free variables, then it has a unique solution.`, tf: false,
        explain: tx`It might be <b>inconsistent</b>. Example: \(\left[\begin{array}{c|c}1&0\\0&1\end{array}\right]\) (one variable, two equations: \(x_1 = 0\) and \(0 = 1\)) has no free variables and no solution. Uniqueness only applies once the system is consistent.` },
      { q: tx`A system of three equations in two unknowns cannot have a unique solution.`, tf: false,
        explain: tx`It can: \(\left[\begin{array}{cc|c}1&0&2\\0&1&3\\0&0&0\end{array}\right]\) has the unique solution \((2,3)\). It's having <i>more unknowns than equations</i> that rules out uniqueness.` },
      { q: tx`A consistent system with 5 unknowns and 3 equations must have:`, choices: ['a unique solution', 'infinitely many solutions', 'no solutions', 'not enough information'], answer: 1,
        explain: tx`At most 3 pivots among 5 variable columns gives at least 2 free variables. Consistent with free variables means infinitely many.` },
      { q: tx`The augmented matrix of a system is \(3\times 5\) and its fifth column is a pivot column. The system is:`, choices: ['consistent', 'inconsistent', 'could be either'], answer: 1,
        explain: tx`The last column of the augmented matrix being a pivot column means some row is \([0\ 0\ 0\ 0 \mid 1]\), so the system is inconsistent (Review #29).` },
      { q: tx`Every matrix has a unique row echelon form (REF).`, tf: false,
        explain: tx`REF is not unique (scale a row and it's still REF). The <b>RREF</b> is unique (Theorem 1.11).` },
      { q: tx`If an \(n\times n\) matrix has \(n\) pivot positions, then its RREF is \(I_n\), the \(n\times n\) identity matrix.`, tf: true,
        explain: tx`\(n\) pivots in \(n\) rows and \(n\) columns means one in each row and column, on the diagonal. In RREF each pivot is 1 with zeros elsewhere in its column, which is exactly \(I_n\).` },
      { q: tx`What is the maximum number of pivots in a \(5 \times 3\) matrix?`, choices: ['3', '5', '8', '15'], answer: 0,
        explain: tx`At most one per column, and there are 3 columns.` },
      { q: tx`To guarantee a consistent system has a unique solution, you need a pivot in:`, choices: ['every row of the coefficient matrix', 'every column of the coefficient matrix', 'the last column of the augmented matrix', 'every row of the augmented matrix'], answer: 1,
        explain: tx`A pivot in every coefficient column means no free variables, so the solution is unique (given consistency). Pivots in every row aren't needed (Exploration 1.19).` }
    ]
  }
});

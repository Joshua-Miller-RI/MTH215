Site.register({
  id: 's1_1',
  num: '1.1',
  title: 'Systems of Linear Equations',
  group: 'Lessons',
  desc: 'What a linear system is, why it has 0, 1, or infinitely many solutions, augmented matrices, and the three row operations.',
  html: tx`
  <div class="kicker">Section 1.1</div>
  <h1>Systems of Linear Equations</h1>
  <p class="lede">Linear algebra starts here: several equations that must all be true at once. You'll learn what makes an equation "linear," what the solutions look like, and the matrix tool for finding them.</p>

  <div class="toc"><div class="toc-title">In this lesson</div><ol>
    <li><a href="#" data-scroll="lin">What "linear" means</a></li>
    <li><a href="#" data-scroll="sys">Systems and solutions</a></li>
    <li><a href="#" data-scroll="pic">The picture: lines</a></li>
    <li><a href="#" data-scroll="three">Only 0, 1, or infinitely many</a></li>
    <li><a href="#" data-scroll="equiv">The strategy: equivalent systems</a></li>
    <li><a href="#" data-scroll="mat">Coefficient and augmented matrices</a></li>
    <li><a href="#" data-scroll="ops">The three row operations</a></li>
    <li><a href="#" data-scroll="exs">Worked examples</a></li>
    <li><a href="#" data-scroll="quiz">Quiz</a></li>
  </ol></div>

  <h2 id="lin">1. What does "linear" mean?</h2>
  <p>A <b>linear equation</b> is the simplest kind of equation: each variable is multiplied by a constant, the results are added up, and the total is set equal to a constant. Nothing fancier happens to the variables.</p>
  <div class="box def">
    <div class="box-title">Definition 1.1 · Linear equation</div>
    <p>A linear equation in the variables \(x_1, \dots, x_n\) is an equation that can be written as</p>
    \[a_1x_1 + a_2x_2 + \cdots + a_nx_n = b,\]
    <p>where the <b>coefficients</b> \(a_1, \dots, a_n\) and the right-hand side \(b\) are real numbers.</p>
  </div>
  <p>Variables are allowed to be multiplied by numbers and added together, and that's it. These are <b>not</b> linear:</p>
  <table class="tbl">
    <tr><th>Equation</th><th>Linear?</th><th>Why</th></tr>
    <tr><td>\(3x_1 - 5x_2 = 7\)</td><td><span class="pill good">Yes</span></td><td>Constants times variables, added.</td></tr>
    <tr><td>\(2x_1 + \sqrt{3}\,x_2 = \pi\)</td><td><span class="pill good">Yes</span></td><td>\(\sqrt3\) and \(\pi\) are just constants. Weird numbers are fine.</td></tr>
    <tr><td>\(x_2 = 4x_1 - 1\)</td><td><span class="pill good">Yes</span></td><td>Rearrange: \(-4x_1 + x_2 = -1\).</td></tr>
    <tr><td>\(4x_1 - 6x_2 = x_1x_2\)</td><td><span class="pill bad">No</span></td><td>\(x_1x_2\) multiplies two variables together.</td></tr>
    <tr><td>\(x_2 = 2\sqrt{x_1} + 5\)</td><td><span class="pill bad">No</span></td><td>A square root of a variable.</td></tr>
    <tr><td>\(x_1^2 + x_2 = 3\), \(\ \sin x_1 = 0\), \(\ 1/x_1 = 2\)</td><td><span class="pill bad">No</span></td><td>Powers, functions, or dividing by a variable.</td></tr>
  </table>
  <div class="box tip"><div class="box-title">Quick test</div><p>Ask: "Is every variable just multiplied by a constant, with the terms added?" If anything else happens to a variable (squaring, rooting, multiplying by another variable, sitting inside a function), the equation is not linear.</p></div>

  <h2 id="sys">2. Systems and their solutions</h2>
  <div class="box def">
    <div class="box-title">Definitions · system, solution, solution set</div>
    <ul>
      <li>A <b>system of linear equations</b> (or <b>linear system</b>) is a collection of linear equations in the same variables.</li>
      <li>A <b>solution</b> is a list of numbers \((s_1, \dots, s_n)\) that makes <b>every</b> equation true when you plug in \(x_1 = s_1, \dots, x_n = s_n\).</li>
      <li>The <b>solution set</b> is the set of <i>all</i> solutions.</li>
    </ul>
  </div>
  <div class="box ex">
    <div class="box-title">Example · solving by hand</div>
    <p>Solve
    \[\begin{aligned} x_1 - 2x_2 &= -1 \\ -x_1 + 3x_2 &= 3 \end{aligned}\]</p>
    <p>Add the two equations. The \(x_1\)'s cancel: \((x_1 - x_1) + (-2x_2 + 3x_2) = -1 + 3\), so \(x_2 = 2\). Then the first equation gives \(x_1 - 4 = -1\), so \(x_1 = 3\).</p>
    <p><b>Check</b> (always worth 10 seconds): \(3 - 2(2) = -1\) ✓ and \(-3 + 3(2) = 3\) ✓. The solution is \((x_1, x_2) = (3, 2)\).</p>
  </div>
  <p>That trick, adding equations so a variable cancels, is what <b>row operations</b> will make systematic.</p>

  <h2 id="pic">3. The picture: every equation is a line</h2>
  <p>With two variables, the solutions of a single equation \(ax + by = c\) form a <b>line</b> in the plane. A solution to a <i>system</i> of two equations must be on <b>both</b> lines, so it's where they intersect. Play with this:</p>
  <div data-widget="lines" data-cfg='{"preset":"one"}'></div>
  <p>Try the three presets. Two lines in a plane can only:</p>
  <ul>
    <li><b>cross at one point</b>: exactly one solution;</li>
    <li><b>be parallel</b> (same slope, different position): no solution;</li>
    <li><b>be the same line</b>: infinitely many solutions (every point on it).</li>
  </ul>
  <p>With 3 variables, each equation is a <i>plane</i> in 3D space, and the same three outcomes happen.</p>

  <h2 id="three">4. The fundamental fact: 0, 1, or infinitely many</h2>
  <div class="box thm">
    <div class="box-title">Theorem 1.2</div>
    <p>A linear system (with any number of variables and equations) has exactly one of:</p>
    <ol><li>exactly <b>one</b> solution,</li><li><b>infinitely many</b> solutions, or</li><li><b>no</b> solutions.</li></ol>
  </div>
  <div class="box def">
    <div class="box-title">Definition · consistent / inconsistent</div>
    <p>A system is <b>consistent</b> if it has at least one solution (one <i>or</i> infinitely many). It is <b>inconsistent</b> if it has no solutions.</p>
  </div>
  <p><b>Why can't there be exactly 2 solutions?</b> If two different points both solve a linear system, then every point on the line through them also solves it (you'll see exactly why in Section 1.5). So two solutions automatically become infinitely many. That's the difference from equations like \(x^2 = 4\), which has exactly 2 solutions but isn't linear.</p>
  <div class="box idea"><div class="box-title">Our main goal for the whole exam</div><p>Given a linear system: (1) decide if it is consistent, and (2) if it is, decide whether it has one or infinitely many solutions, and find them.</p></div>

  <h2 id="equiv">5. The strategy: turn a hard system into an easy one</h2>
  <p>Some systems are easy to solve. Look at this "triangular" one:</p>
  \[\begin{aligned} x_1 - 2x_2 + x_3 &= 0 \\ x_2 - 4x_3 &= 4 \\ x_3 &= -1 \end{aligned}\]
  <p>Work from the bottom up (<b>back-substitution</b>): \(x_3 = -1\). Then \(x_2 = 4 + 4x_3 = 4 - 4 = 0\). Then \(x_1 = 2x_2 - x_3 = 0 + 1 = 1\). Solution: \((1, 0, -1)\).</p>
  <div class="box def">
    <div class="box-title">Definition 1.3 · Equivalent systems</div>
    <p>Two linear systems are <b>equivalent</b> if they have the <b>same solution set</b>.</p>
  </div>
  <p>The plan for every problem: <b>convert a hard system into an equivalent easy system</b>, then read off the answer. To do that without making a mess, we strip the system down to just its numbers.</p>

  <h2 id="mat">6. Coefficient matrix and augmented matrix</h2>
  <p>A <b>matrix</b> is a rectangular grid of numbers. Its <b>size</b> is written (number of rows) \(\times\) (number of columns). For example, \(\begin{bmatrix}1&2&3&4\\5&6&7&8\end{bmatrix}\) is \(2\times 4\).</p>
  <p>For the system</p>
  \[\begin{aligned} x_1 - 2x_2 + x_3 &= 0 \\ 2x_2 - 8x_3 &= 8 \\ 5x_1 \phantom{{}-2x_2} - 5x_3 &= 10 \end{aligned}\]
  <p>we build:</p>
  \[\underbrace{\begin{bmatrix} 1 & -2 & 1 \\ 0 & 2 & -8 \\ 5 & 0 & -5 \end{bmatrix}}_{\text{coefficient matrix } (3\times3)} \qquad\qquad \underbrace{\left[\begin{array}{ccc|c} 1 & -2 & 1 & 0 \\ 0 & 2 & -8 & 8 \\ 5 & 0 & -5 & 10 \end{array}\right]}_{\text{augmented matrix } (3\times 4)}\]
  <ul>
    <li>Each <b>row</b> is one equation. Each <b>column</b> (except the last) belongs to one variable.</li>
    <li>The <b>augmented matrix</b> adds the right-hand sides as an extra last column. The bar is just a visual reminder.</li>
    <li>A variable that is <b>missing</b> from an equation gets a <b>0</b> (look at the 0s above).</li>
  </ul>
  <div class="box thm"><div class="box-title">Sizes to memorize</div>
    <p>A system of \(m\) equations in \(n\) unknowns has a coefficient matrix of size \(m \times n\) and an augmented matrix of size \(m \times (n+1)\).</p></div>
  <div class="box warn"><div class="box-title">Common trap</div><p>Line the variables up in the same order in every row, and remember the zeros. Writing \(5x_1 - 5x_3 = 10\) as the row \([5\ \ {-5}\ \ 10]\) (forgetting the 0 for \(x_2\)) is the #1 setup mistake.</p></div>

  <h2 id="ops">7. The three elementary row operations</h2>
  <p>These are the only moves you're allowed to make on an augmented matrix. Each is a legal move on the <i>equations</i>, so it never changes the solution set.</p>
  <div class="box def">
    <div class="box-title">Elementary row operations</div>
    <ol>
      <li><b>Replacement:</b> add a multiple of one row to another row. Notation: \(R_i \leftarrow R_i + cR_j\).</li>
      <li><b>Interchange:</b> swap two rows. Notation: \(R_i \leftrightarrow R_j\).</li>
      <li><b>Scaling:</b> multiply a row by a <b>nonzero</b> constant. Notation: \(R_i \leftarrow cR_i\) with \(c \neq 0\).</li>
    </ol>
  </div>
  <p><b>Why don't they change the solutions?</b> Translate each one back into equations:</p>
  <ul>
    <li>Replacement means adding \(c\) times one equation to another. If both equations were true, the new one is still true. And you can <b>undo</b> it by subtracting \(c\) times that equation again.</li>
    <li>Interchange just lists the equations in a different order. Undo it by swapping back.</li>
    <li>Scaling multiplies both sides of an equation by \(c \neq 0\). Undo it by multiplying by \(1/c\). (This is why \(c = 0\) is forbidden: multiplying by 0 turns the equation into \(0 = 0\), which throws away information and can't be undone.)</li>
  </ul>
  <p>Every operation can be reversed, so no solutions are ever gained or lost.</p>
  <div class="box thm"><div class="box-title">Proposition 1.4</div><p>Any sequence of elementary row operations applied to an augmented matrix produces a <b>row equivalent</b> matrix, whose system has the <b>same solution set</b>.</p></div>
  <div class="box tip"><div class="box-title">Exam rule</div><p>Write down every operation in this notation. Your professor said explicitly that without it, no partial credit can be given.</p></div>
  <p><b>Goal:</b> use row operations to reach a "triangular" (staircase) shape, then finish solving:</p>
  \[\begin{bmatrix} \blacksquare & * & * & \cdots & * \\ 0 & \blacksquare & * & \cdots & * \\ 0 & 0 & \blacksquare & \cdots & * \\ \vdots & & & \ddots & \vdots \end{bmatrix}\qquad \blacksquare = \text{nonzero},\ * = \text{anything}\]

  <h2 id="exs">8. Worked examples</h2>
  <h3>Example 1.5 · a unique solution</h3>
  <p>Solve \(\ 4x_1 + 6x_2 = -12,\ \ -2x_1 + x_2 = -10\). Click "Next step" to reveal one move at a time. Try to predict each one first.</p>
  <div class="reveal">
    <div class="step"><div class="step-label">Set up</div>Augmented matrix: \(\left[\begin{array}{cc|c} 4 & 6 & -12 \\ -2 & 1 & -10 \end{array}\right]\)</div>
    <div class="step"><div class="step-label">Zero out below the first pivot</div>We want a 0 where the \(-2\) is. Adding half of row 1 does it: \(-2 + \tfrac12(4) = 0\).
      \[\xrightarrow{R_2 \leftarrow R_2 + \frac12 R_1} \left[\begin{array}{cc|c} 4 & 6 & -12 \\ 0 & 4 & -16 \end{array}\right]\]</div>
    <div class="step"><div class="step-label">Make the second pivot 1</div>\[\xrightarrow{R_2 \leftarrow \frac14 R_2} \left[\begin{array}{cc|c} 4 & 6 & -12 \\ 0 & 1 & -4 \end{array}\right]\]Row 2 now says \(x_2 = -4\).</div>
    <div class="step"><div class="step-label">Zero out above the second pivot</div>\[\xrightarrow{R_1 \leftarrow R_1 - 6R_2} \left[\begin{array}{cc|c} 4 & 0 & 12 \\ 0 & 1 & -4 \end{array}\right]\]</div>
    <div class="step"><div class="step-label">Make the first pivot 1</div>\[\xrightarrow{R_1 \leftarrow \frac14 R_1} \left[\begin{array}{cc|c} 1 & 0 & 3 \\ 0 & 1 & -4 \end{array}\right]\]</div>
    <div class="step"><div class="step-label">Read off and check</div>\((x_1, x_2) = (3, -4)\). Check: \(4(3) + 6(-4) = -12\) ✓, \(-2(3) + (-4) = -10\) ✓.</div>
  </div>

  <h3>Example 1.7 · three equations, animated</h3>
  <p>Here's the 3×3 system from Section 6. Press <b>Play</b>, or step through it. Blue marks the row that just changed and red marks the pivots. (The computer may use a slightly different order of operations than your notes. Many correct sequences exist, and they all reach the same final answer.)</p>
  <div data-widget="rrstepper" data-cfg='{"matrix":"1 -2 1 | 0; 0 2 -8 | 8; 5 0 -5 | 10","aug":true,"title":"Example 1.7","showSystem":true}'></div>

  <h3>Example 1.6 · no solution</h3>
  <p>Solve \(\ x_2 - 4x_3 = 8,\ \ 2x_1 - 3x_2 + 2x_3 = 1,\ \ 4x_1 - 8x_2 + 12x_3 = 1\).</p>
  <div class="reveal">
    <div class="step"><div class="step-label">Set up</div>\[\left[\begin{array}{ccc|c} 0 & 1 & -4 & 8 \\ 2 & -3 & 2 & 1 \\ 4 & -8 & 12 & 1 \end{array}\right]\]The top-left entry is 0, so it can't be a pivot. We need to swap.</div>
    <div class="step"><div class="step-label">Swap</div>\[\xrightarrow{R_1 \leftrightarrow R_2}\left[\begin{array}{ccc|c} 2 & -3 & 2 & 1 \\ 0 & 1 & -4 & 8 \\ 4 & -8 & 12 & 1 \end{array}\right]\]</div>
    <div class="step"><div class="step-label">Clear below the first pivot</div>\[\xrightarrow{R_3 \leftarrow R_3 - 2R_1}\left[\begin{array}{ccc|c} 2 & -3 & 2 & 1 \\ 0 & 1 & -4 & 8 \\ 0 & -2 & 8 & -1 \end{array}\right]\]</div>
    <div class="step"><div class="step-label">Clear below the second pivot</div>\[\xrightarrow{R_3 \leftarrow R_3 + 2R_2}\left[\begin{array}{ccc|c} 2 & -3 & 2 & 1 \\ 0 & 1 & -4 & 8 \\ 0 & 0 & 0 & 15 \end{array}\right]\]</div>
    <div class="step"><div class="step-label">Interpret</div>The last row means \(0x_1 + 0x_2 + 0x_3 = 15\), i.e. \(\mathbf{0 = 15}\). That's impossible, so <b>no solution</b>: the system is <b>inconsistent</b>. You can stop as soon as a row like \([\,0\ 0\ 0 \mid \text{nonzero}\,]\) appears.</div>
  </div>

  <h3>Example 1.8 · a parameter in the system</h3>
  <p>For what values of \(h\) is \(\ 3x_1 - 9x_2 = 4,\ \ -2x_1 + 6x_2 = h\ \) consistent? How many solutions are there then?</p>
  <div class="reveal">
    <div class="step">\[\left[\begin{array}{cc|c} 3 & -9 & 4 \\ -2 & 6 & h \end{array}\right] \xrightarrow{R_1 \leftarrow \frac13 R_1} \left[\begin{array}{cc|c} 1 & -3 & \frac43 \\ -2 & 6 & h \end{array}\right] \xrightarrow{R_2 \leftarrow R_2 + 2R_1} \left[\begin{array}{cc|c} 1 & -3 & \frac43 \\ 0 & 0 & h + \frac83 \end{array}\right]\]</div>
    <div class="step">Row 2 says \(0 = h + \tfrac83\). That's true only if \(h = -\tfrac83\). For any other \(h\), it's a false statement and the system is inconsistent.</div>
    <div class="step">When \(h = -\tfrac83\), row 2 is \(0 = 0\) (always true, no information). Only \(x_1 - 3x_2 = \tfrac43\) remains, so \(x_2\) can be <b>anything</b> and \(x_1 = \tfrac43 + 3x_2\). That's <b>infinitely many solutions</b>. (Geometrically, the two lines are the same line. Try the "Infinitely many" preset in the widget above, which is exactly this system.)</div>
  </div>

  <h3>Review problem 12 · two parameters</h3>
  <p>Find values of \(h\) and \(k\) so that \(\ x + 3y = 2,\ \ 3x + hy = k\ \) has (a) no solution, (b) a unique solution, (c) infinitely many solutions.</p>
  <details class="solution"><summary>Show solution</summary><div class="sol-body">
    \[\left[\begin{array}{cc|c} 1 & 3 & 2 \\ 3 & h & k \end{array}\right] \xrightarrow{R_2 \leftarrow R_2 - 3R_1} \left[\begin{array}{cc|c} 1 & 3 & 2 \\ 0 & h - 9 & k - 6 \end{array}\right]\]
    <ul>
      <li><b>No solution:</b> we need row 2 to read \([\,0\ \ 0 \mid \text{nonzero}\,]\), so \(h = 9\) and \(k \neq 6\).</li>
      <li><b>Unique solution:</b> we need \(h - 9 \neq 0\), so that row 2 has a pivot in column 2 and both variables are pinned down. So \(h \neq 9\), and \(k\) can be anything.</li>
      <li><b>Infinitely many:</b> row 2 must be all zeros, so \(h = 9\) and \(k = 6\). Then \(y\) is free.</li>
    </ul>
  </div></details>

  <h3>Worksheet 1, problem 1</h3>
  <p>Solve \(\ -x_1 + 2x_2 = 5,\ \ 2x_1 - 4x_2 = 6\) using the augmented matrix.</p>
  <details class="solution"><summary>Show solution</summary><div class="sol-body">
    \[\left[\begin{array}{cc|c} -1 & 2 & 5 \\ 2 & -4 & 6 \end{array}\right] \xrightarrow{R_2 \leftarrow R_2 + 2R_1} \left[\begin{array}{cc|c} -1 & 2 & 5 \\ 0 & 0 & 16 \end{array}\right]\]
    <p>Row 2 says \(0 = 16\), a contradiction, so there are <b>no solutions</b>. (The lines are parallel: the second equation's left side is \(-2\) times the first's, but the right sides don't match.)</p>
  </div></details>

  <div class="summary">
    <h3>What to remember from 1.1</h3>
    <ul>
      <li>Linear means constants times variables, added up. No products of variables, powers, roots, or functions.</li>
      <li>Every linear system has <b>0, 1, or infinitely many</b> solutions. Consistent means at least one; inconsistent means none.</li>
      <li>\(m\) equations, \(n\) unknowns: coefficient matrix \(m\times n\), augmented matrix \(m\times(n+1)\).</li>
      <li>Three row operations: replacement \(R_i \leftarrow R_i + cR_j\), interchange \(R_i \leftrightarrow R_j\), scaling \(R_i \leftarrow cR_i\) (\(c\neq 0\)). They never change the solution set.</li>
      <li>A row \([\,0\ \cdots\ 0 \mid c\,]\) with \(c \neq 0\) means no solution.</li>
    </ul>
  </div>

  <h2 id="quiz">Quiz</h2>
  <div class="quiz" data-quiz="main"></div>
  `,
  quizzes: {
    main: [
      { q: tx`Which equation is linear?`, choices: [tx`\(3x_1 - \sqrt{2}\,x_2 = 7\)`, tx`\(x_1x_2 = 4\)`, tx`\(x_2 = 2\sqrt{x_1} + 5\)`, tx`\(\frac{1}{x_1} + x_2 = 0\)`], answer: 0,
        explain: tx`\(\sqrt2\) is just a constant coefficient. The others multiply variables together, take a root of a variable, or divide by a variable.` },
      { q: tx`A linear system can have exactly two solutions.`, tf: false,
        explain: tx`Theorem 1.2: only 0, 1, or infinitely many. Two different solutions force infinitely many (every point on the line through them).` },
      { q: tx`A system of 4 equations in 3 unknowns has an augmented matrix of size:`, choices: [tx`\(3\times 4\)`, tx`\(4\times 3\)`, tx`\(4\times 4\)`, tx`\(3 \times 3\)`], answer: 2,
        explain: tx`Rows = equations = 4. Columns = 3 variables + 1 right-hand-side column = 4.` },
      { q: tx`Which of these is <b>not</b> an elementary row operation?`, choices: [tx`\(R_2 \leftarrow R_2 - 5R_1\)`, tx`\(R_1 \leftrightarrow R_3\)`, tx`\(R_2 \leftarrow 0\cdot R_2\)`, tx`\(R_3 \leftarrow -\tfrac12 R_3\)`], answer: 2,
        explain: tx`Scaling must use a <b>nonzero</b> constant. Multiplying by 0 destroys an equation and can't be undone.` },
      { q: tx`Two linear systems are called equivalent if they have the same solution set.`, tf: true, explain: tx`That's Definition 1.3. Row operations produce equivalent systems.` },
      { q: tx`An augmented matrix row reduces to \(\left[\begin{array}{cc|c}1&0&2\\0&0&5\end{array}\right]\). The system has:`, choices: ['exactly one solution', 'infinitely many solutions', 'no solution'], answer: 2,
        explain: tx`Row 2 says \(0 = 5\), which is impossible, so the system is inconsistent.` },
      { q: tx`A system is <b>consistent</b> if:`, choices: ['it has exactly one solution', 'it has at least one solution', 'it has infinitely many solutions', 'it has no free variables'], answer: 1,
        explain: tx`Consistent means one <i>or</i> infinitely many solutions, i.e. at least one.` },
      { q: tx`For which \(h\) is the system with augmented matrix \(\left[\begin{array}{cc|c}1&2&3\\2&4&h\end{array}\right]\) consistent?`, choices: [tx`\(h = 6\) only`, tx`every \(h\) except 6`, tx`every \(h\)`, tx`no \(h\)`], answer: 0,
        explain: tx`\(R_2 \leftarrow R_2 - 2R_1\) gives \([\,0\ \ 0 \mid h - 6\,]\). Consistent only if \(h - 6 = 0\).` }
    ]
  }
});

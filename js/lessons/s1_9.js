Site.register({
  id: 's1_9',
  num: '1.9',
  title: 'The Matrix of a Linear Transformation',
  group: 'Lessons',
  desc: 'The identity matrix, why every linear transformation is a matrix transformation, and finding the standard matrix of rotations, reflections, stretches and projections.',
  html: tx`
  <div class="kicker">Section 1.9</div>
  <h1>The Matrix of a Linear Transformation</h1>
  <p class="lede">Every matrix gives a linear transformation (1.8). The reverse is also true: every linear transformation \(\mathbb{R}^n\to\mathbb{R}^m\) is "multiply by some matrix." This section shows how to <b>find that matrix</b>, and the answer is beautifully simple.</p>

  <div class="toc"><div class="toc-title">In this lesson</div><ol>
    <li><a href="#" data-scroll="id">The identity matrix and \(\vec e_i\)</a></li>
    <li><a href="#" data-scroll="derive">The key idea</a></li>
    <li><a href="#" data-scroll="thm">Theorem 1.62: the standard matrix</a></li>
    <li><a href="#" data-scroll="ex63">Example 1.63: from a formula</a></li>
    <li><a href="#" data-scroll="rot">Example 1.64: rotation</a></li>
    <li><a href="#" data-scroll="geo">Example 1.65: geometric transformations</a></li>
    <li><a href="#" data-scroll="detective">Game: matrix detective</a></li>
    <li><a href="#" data-scroll="review">Review problems</a></li>
    <li><a href="#" data-scroll="quiz">Quiz</a></li>
  </ol></div>
  <p class="small muted">Note from your notes: the textbook covers more in this section (one-to-one and onto) than this course does. This lesson covers what was covered in class.</p>

  <h2 id="id">1. The identity matrix and the vectors \(\vec e_i\)</h2>
  <div class="box def">
    <div class="box-title">Definition 1.61 · Identity matrix</div>
    <p>The \(n\times n\) <b>identity matrix</b> \(I_n\) (or just \(I\)) has 1's on the main diagonal and 0's everywhere else:</p>
    \[I_n = \begin{bmatrix}1&0&\cdots&0\\0&1&\cdots&0\\ \vdots&\vdots&\ddots&\vdots\\0&0&\cdots&1\end{bmatrix}.\]
    <p>The \(i\)-th column of \(I_n\) is written \(\vec e_i\in\mathbb{R}^n\). For example, \(I_3 = [\,\vec e_1\ \vec e_2\ \vec e_3\,]\) with \(\vec e_1 = \begin{bmatrix}1\\0\\0\end{bmatrix}, \vec e_2 = \begin{bmatrix}0\\1\\0\end{bmatrix}, \vec e_3 = \begin{bmatrix}0\\0\\1\end{bmatrix}\).</p>
  </div>
  <p>\(I\) plays the role of the number 1 in multiplication: \(I_n\vec x = \vec x\) for every \(\vec x\in\mathbb{R}^n\). For example,</p>
  \[I_3\vec x = x_1\begin{bmatrix}1\\0\\0\end{bmatrix} + x_2\begin{bmatrix}0\\1\\0\end{bmatrix} + x_3\begin{bmatrix}0\\0\\1\end{bmatrix} = \begin{bmatrix}x_1\\x_2\\x_3\end{bmatrix} = \vec x.\]
  <p>That middle expression is the key fact for this section: <b>every vector is a combination of the \(\vec e_i\)'s, with its own entries as the weights</b>: \(\vec x = x_1\vec e_1 + x_2\vec e_2 + \cdots + x_n\vec e_n\).</p>

  <h2 id="derive">2. The key idea: a linear map is determined by where it sends \(\vec e_1, \dots, \vec e_n\)</h2>
  <div class="box ex">
    <div class="box-title">Motivating example</div>
    <p>Suppose \(T:\mathbb{R}^2\to\mathbb{R}^3\) is linear, and all we know is</p>
    \[T(\vec e_1) = \begin{bmatrix}2\\-3\\4\end{bmatrix},\qquad T(\vec e_2) = \begin{bmatrix}5\\0\\1\end{bmatrix}.\]
    <p>What is \(T(\vec x)\) for <b>any</b> \(\vec x = \begin{bmatrix}x_1\\x_2\end{bmatrix}\)?</p>
  </div>
  <div class="reveal">
    <div class="step"><div class="step-label">Write x in terms of e₁ and e₂</div>
      \[\vec x = \begin{bmatrix}x_1\\x_2\end{bmatrix} = x_1\begin{bmatrix}1\\0\end{bmatrix} + x_2\begin{bmatrix}0\\1\end{bmatrix} = x_1\vec e_1 + x_2\vec e_2\]</div>
    <div class="step"><div class="step-label">Use linearity</div>
      \[T(\vec x) = T(x_1\vec e_1 + x_2\vec e_2) = x_1T(\vec e_1) + x_2T(\vec e_2) = x_1\begin{bmatrix}2\\-3\\4\end{bmatrix} + x_2\begin{bmatrix}5\\0\\1\end{bmatrix}\]</div>
    <div class="step"><div class="step-label">Recognize a matrix-vector product</div>
      <p>A linear combination of vectors with weights \(x_1, x_2\) is exactly a matrix times \(\vec x\) (Definition 1.31):</p>
      \[T(\vec x) = \begin{bmatrix}2&5\\-3&0\\4&1\end{bmatrix}\begin{bmatrix}x_1\\x_2\end{bmatrix} = \begin{bmatrix}2x_1 + 5x_2\\-3x_1\\4x_1 + x_2\end{bmatrix}.\]
      <p>Knowing just two outputs was enough to know \(T\) <b>everywhere</b>. The matrix's columns are \(T(\vec e_1)\) and \(T(\vec e_2)\).</p></div>
  </div>

  <h2 id="thm">3. Theorem 1.62: the standard matrix</h2>
  <div class="box thm big">
    <div class="box-title">Theorem 1.62</div>
    <p>Let \(T:\mathbb{R}^n\to\mathbb{R}^m\) be a linear transformation. Then there is a <b>unique</b> \(m\times n\) matrix \(A\) such that \(T(\vec x) = A\vec x\) for all \(\vec x\in\mathbb{R}^n\). In fact,</p>
    \[A = \big[\,T(\vec e_1)\ \ T(\vec e_2)\ \ \cdots\ \ T(\vec e_n)\,\big],\]
    <p>where \(\vec e_i\) is the \(i\)-th column of \(I_n\). This \(A\) is called the <b>standard matrix</b> for \(T\).</p>
  </div>
  <div class="box tip"><div class="box-title">The recipe</div>
    <p><b>Column \(j\) of the standard matrix = where \(T\) sends \(\vec e_j\).</b></p>
    <ol>
      <li>Figure out the sizes: \(T:\mathbb{R}^n\to\mathbb{R}^m\) means \(A\) is \(m\times n\) (\(n\) columns, one for each \(\vec e_j\)).</li>
      <li>Compute \(T(\vec e_1), \dots, T(\vec e_n)\) using a formula, a geometric description, or given data.</li>
      <li>Stack them as columns.</li>
    </ol>
  </div>
  <p>Why does it work in general? Exactly as in the example: \(T(\vec x) = T(x_1\vec e_1 + \cdots + x_n\vec e_n) = x_1T(\vec e_1) + \cdots + x_nT(\vec e_n) = [\,T(\vec e_1)\cdots T(\vec e_n)\,]\vec x\).</p>

  <h2 id="ex63">4. Example 1.63: standard matrix from a formula</h2>
  <div class="box ex">
    <div class="box-title">Example 1.63</div>
    <p>Find the \(3\times 2\) matrix \(A\) such that \(A\begin{bmatrix}x_1\\x_2\end{bmatrix} = \begin{bmatrix}x_1 - 2x_2\\4x_1\\3x_1 + 2x_2\end{bmatrix} = T(\vec x)\).</p>
    <p><b>Method 1 (Theorem 1.62).</b> Plug in \(\vec e_1 = (1,0)\) and \(\vec e_2 = (0,1)\):</p>
    \[T(\vec e_1) = \begin{bmatrix}1 - 0\\4\\3 + 0\end{bmatrix} = \begin{bmatrix}1\\4\\3\end{bmatrix}, \qquad T(\vec e_2) = \begin{bmatrix}0-2\\0\\0+2\end{bmatrix} = \begin{bmatrix}-2\\0\\2\end{bmatrix} \quad\Longrightarrow\quad A = \begin{bmatrix}1&-2\\4&0\\3&2\end{bmatrix}.\]
    <p><b>Method 2 (read the coefficients).</b> Row \(i\) of \(A\) holds the coefficients of \(x_1, x_2\) in output entry \(i\). Write a 0 for any missing variable: "\(4x_1\)" is \(4x_1 + 0x_2\), so row 2 is \([\,4\ \ 0\,]\).</p>
  </div>
  <div class="box warn"><div class="box-title">Common mistakes</div><p>Forgetting zeros for missing variables, mixing up the order when a formula lists \(x_2\) before \(x_1\) (like \(2x_2 - 3x_1\)), and writing \(T(\vec e_j)\) as <b>rows</b> instead of columns.</p></div>

  <h2 id="rot">5. Example 1.64: rotation</h2>
  <div class="box ex">
    <div class="box-title">Example 1.64</div>
    <p>Find the standard matrix of \(T:\mathbb{R}^2\to\mathbb{R}^2\) that rotates every point about the origin counterclockwise by \(\pi/4\) radians (45°).</p>
  </div>
  <div class="reveal">
    <div class="step"><div class="step-label">Where does e₁ go?</div>
      <p>\(\vec e_1 = (1,0)\) is on the unit circle at angle 0. Rotating by \(\pi/4\) lands it on the unit circle at angle \(\pi/4\):</p>
      \[T(\vec e_1) = \begin{bmatrix}\cos\frac{\pi}{4}\\ \sin\frac{\pi}{4}\end{bmatrix} = \begin{bmatrix}\frac{\sqrt2}{2}\\ \frac{\sqrt2}{2}\end{bmatrix}.\]</div>
    <div class="step"><div class="step-label">Where does e₂ go?</div>
      <p>\(\vec e_2 = (0,1)\) is at angle \(\pi/2\). After rotating, it's at angle \(\pi/2 + \pi/4 = 3\pi/4\):</p>
      \[T(\vec e_2) = \begin{bmatrix}\cos\frac{3\pi}{4}\\ \sin\frac{3\pi}{4}\end{bmatrix} = \begin{bmatrix}-\frac{\sqrt2}{2}\\ \frac{\sqrt2}{2}\end{bmatrix}.\]</div>
    <div class="step"><div class="step-label">Stack as columns</div>
      \[A = \begin{bmatrix}\frac{\sqrt2}{2} & -\frac{\sqrt2}{2}\\[2pt] \frac{\sqrt2}{2} & \frac{\sqrt2}{2}\end{bmatrix}.\]</div>
    <div class="step"><div class="step-label">General angle θ</div>
      <p>The same reasoning (\(\vec e_1 \to (\cos\theta, \sin\theta)\), and \(\vec e_2 \to (-\sin\theta, \cos\theta)\)) gives the rotation matrix</p>
      \[R_\theta = \begin{bmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{bmatrix}.\]
      <p>Check: \(\theta = 90^\circ\) gives \(\begin{bmatrix}0&-1\\1&0\end{bmatrix}\), which sends \(\vec e_1 \to \vec e_2\) and \(\vec e_2 \to -\vec e_1\). ✓</p></div>
  </div>
  <div data-widget="transform" data-cfg='{"presets":["rot"],"initial":"rot","title":"Rotation by θ","sub":"Move the θ slider and watch the red and green arrows (the columns) travel around the unit circle. Press Play to animate."}'></div>
  <div class="box idea"><div class="box-title">Connection: Review 14</div>
    <p>Review 14 used \(G = \begin{bmatrix}a&-b\\b&a\end{bmatrix}\) with \(a^2+b^2 = 1\) and found \(a = \tfrac45, b = -\tfrac35\) so that \(G\begin{bmatrix}4\\3\end{bmatrix} = \begin{bmatrix}5\\0\end{bmatrix}\). Since \(a^2+b^2=1\), you can write \(a = \cos\theta, b = \sin\theta\), so \(G\) is a <b>rotation</b> matrix. It rotates \((4,3)\) (length 5) clockwise down onto the x-axis at \((5,0)\).</p></div>

  <h2 id="geo">6. Example 1.65: more geometric transformations</h2>
  <p>For each one, ask "where do \(\vec e_1\) and \(\vec e_2\) go?" and use those as the columns.</p>
  <table class="tbl">
    <tr><th>Transformation</th><th>\(T(\vec e_1)\)</th><th>\(T(\vec e_2)\)</th><th>Standard matrix</th></tr>
    <tr><td><b>Reflection over the x-axis</b></td><td>\((1,0)\) stays</td><td>\((0,1)\to(0,-1)\)</td><td>\(\begin{bmatrix}1&0\\0&-1\end{bmatrix}\)</td></tr>
    <tr><td><b>Stretch x by 2, y by 3</b></td><td>\((2,0)\)</td><td>\((0,3)\)</td><td>\(\begin{bmatrix}2&0\\0&3\end{bmatrix}\)</td></tr>
    <tr><td><b>Projection onto the x-axis</b></td><td>\((1,0)\) stays</td><td>\((0,1)\to(0,0)\)</td><td>\(\begin{bmatrix}1&0\\0&0\end{bmatrix}\)</td></tr>
    <tr><td>Reflection over the y-axis</td><td>\((-1,0)\)</td><td>\((0,1)\)</td><td>\(\begin{bmatrix}-1&0\\0&1\end{bmatrix}\)</td></tr>
    <tr><td>Reflection over \(y = x\)</td><td>\((0,1)\)</td><td>\((1,0)\)</td><td>\(\begin{bmatrix}0&1\\1&0\end{bmatrix}\)</td></tr>
    <tr><td>Horizontal shear (factor 1)</td><td>\((1,0)\)</td><td>\((1,1)\)</td><td>\(\begin{bmatrix}1&1\\0&1\end{bmatrix}\)</td></tr>
    <tr><td>Rotation by \(90^\circ\)</td><td>\((0,1)\)</td><td>\((-1,0)\)</td><td>\(\begin{bmatrix}0&-1\\1&0\end{bmatrix}\)</td></tr>
  </table>
  <p class="small muted">The first three rows are Example 1.65. The rest are extra practice in the same style.</p>
  <p>Explore all of them. You can also type any matrix into the boxes:</p>
  <div data-widget="transform" data-cfg='{"initial":"reflx","title":"Gallery of linear transformations"}'></div>
  <div class="box idea"><div class="box-title">Connections to 1.7 and 1.8</div>
    <p>Projection onto the x-axis has dependent columns, \((1,0)\) and \((0,0)\). It squashes the whole plane onto a line, so its <b>range</b> is just the x-axis, not all of \(\mathbb{R}^2\). Rotations, reflections and stretches have independent columns (a pivot in every row and column), so their range is all of \(\mathbb{R}^2\).</p></div>

  <h2 id="detective">7. Game: matrix detective</h2>
  <p>A secret linear transformation has been applied to the plane. The faint grid is "before" and the blue grid is "after." Read off where \(\vec e_1\) (red) and \(\vec e_2\) (green) landed, and enter the standard matrix.</p>
  <div class="widget" id="detective-game">
    <div class="w-title">Find the standard matrix</div>
    <div class="w-sub">Hint: column 1 = tip of the red arrow, and column 2 = tip of the green arrow. All entries are integers.</div>
    <div class="w-grid">
      <canvas class="plane"></canvas>
      <div class="w-panel">
        <div class="lbl">Your matrix</div>
        <div class="row" style="align-items:stretch">
          <span style="font-size:42px;line-height:1;font-weight:200">[</span>
          <div><div class="row"><input class="num dm" style="width:56px"><input class="num dm" style="width:56px"></div><div class="row" style="margin-top:4px"><input class="num dm" style="width:56px"><input class="num dm" style="width:56px"></div></div>
          <span style="font-size:42px;line-height:1;font-weight:200">]</span>
        </div>
        <div class="row" style="margin-top:10px">
          <button class="btn primary dcheck">Check</button>
          <button class="btn dnew">New puzzle</button>
          <button class="btn dshow">Reveal</button>
        </div>
        <div class="w-out dout">Enter your answer and press Check.</div>
        <p class="small muted dscore"></p>
      </div>
    </div>
  </div>

  <h2 id="review">8. Review problems</h2>
  <div class="problem">
    <div class="p-head"><span class="p-num">Review 26</span></div>
    <p>Find the standard matrix for the linear transformation \(T(x,y) = (3x + y,\ 5x + 7y,\ x + 3y)\).</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p>\(T:\mathbb{R}^2\to\mathbb{R}^3\), so \(A\) is \(3\times 2\). \(T(\vec e_1) = T(1,0) = (3,5,1)\) and \(T(\vec e_2) = T(0,1) = (1,7,3)\):</p>
      \[A = \begin{bmatrix}3&1\\5&7\\1&3\end{bmatrix},\qquad T(\vec x) = A\vec x \text{ for all } \vec x \in\mathbb{R}^2.\]
    </div></details>
  </div>
  <div class="problem">
    <div class="p-head"><span class="p-num">Review 28</span></div>
    <p>\(T:\mathbb{R}^3\to\mathbb{R}^2\) is linear with \(T(\vec e_1) = \begin{bmatrix}1\\2\end{bmatrix}, T(\vec e_2) = \begin{bmatrix}0\\-1\end{bmatrix}, T(\vec e_3) = \begin{bmatrix}7\\-9\end{bmatrix}\), where \(\vec e_1, \vec e_2, \vec e_3\) are the columns of \(I_3\). Find a formula for \(T(\vec x)\).</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p>A linear transformation is determined by what it does to the columns of the identity matrix:</p>
      \[T(\vec x) = A\vec x,\quad A = \begin{bmatrix}1&0&7\\2&-1&-9\end{bmatrix},\quad\text{i.e.}\quad T(x_1,x_2,x_3) = (x_1 + 7x_3,\ 2x_1 - x_2 - 9x_3).\]
    </div></details>
  </div>
  <div class="problem">
    <div class="p-head"><span class="p-num">Practice</span><span class="p-tag">combine with 1.8</span></div>
    <p>\(T:\mathbb{R}^2\to\mathbb{R}^2\) first reflects over the x-axis, then stretches horizontally by 3. Find its standard matrix and \(T(2, 5)\).</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p>\(\vec e_1 \to (1,0) \to (3,0)\), and \(\vec e_2 \to (0,-1) \to (0,-1)\). So \(A = \begin{bmatrix}3&0\\0&-1\end{bmatrix}\) and \(T(2,5) = A\begin{bmatrix}2\\5\end{bmatrix} = \begin{bmatrix}6\\-5\end{bmatrix}\).</p>
    </div></details>
  </div>

  <div class="summary">
    <h3>What to remember from 1.9</h3>
    <ul>
      <li>\(I_n\) has 1's on the diagonal. Its columns are \(\vec e_1, \dots, \vec e_n\), and \(I_n\vec x = \vec x\).</li>
      <li>Every \(\vec x\) is \(x_1\vec e_1 + \cdots + x_n\vec e_n\), so a linear \(T\) is completely determined by \(T(\vec e_1), \dots, T(\vec e_n)\).</li>
      <li><b>Theorem 1.62:</b> the standard matrix is \(A = [\,T(\vec e_1)\ \cdots\ T(\vec e_n)\,]\), size \(m\times n\) for \(T:\mathbb{R}^n\to\mathbb{R}^m\).</li>
      <li>Rotation by \(\theta\): \(\begin{bmatrix}\cos\theta&-\sin\theta\\ \sin\theta&\cos\theta\end{bmatrix}\). Reflect over the x-axis: \(\begin{bmatrix}1&0\\0&-1\end{bmatrix}\). Stretch: \(\begin{bmatrix}a&0\\0&b\end{bmatrix}\). Project onto the x-axis: \(\begin{bmatrix}1&0\\0&0\end{bmatrix}\).</li>
      <li>From a formula, plug in each \(\vec e_j\), or read the coefficients row by row (and put 0 for missing variables).</li>
    </ul>
  </div>

  <h2 id="quiz">Quiz</h2>
  <div class="quiz" data-quiz="main"></div>
  `,
  quizzes: {
    main: [
      { q: tx`The standard matrix of a linear \(T:\mathbb{R}^4\to\mathbb{R}^2\) has size:`, choices: [tx`\(4\times 2\)`, tx`\(2\times 4\)`, tx`\(4\times 4\)`, tx`\(2\times 2\)`], answer: 1,
        explain: tx`\(m\times n\) for \(\mathbb{R}^n\to\mathbb{R}^m\). There are 4 columns (one per \(\vec e_j\in\mathbb{R}^4\)), each in \(\mathbb{R}^2\).` },
      { q: tx`Column 2 of the standard matrix of \(T\) is:`, choices: [tx`\(T(\vec e_2)\)`, tx`\(\vec e_2\)`, tx`the second row of \(T(\vec e_1)\)`, tx`\(T(\vec e_1) + T(\vec e_2)\)`], answer: 0,
        explain: tx`Theorem 1.62: \(A = [\,T(\vec e_1)\ T(\vec e_2)\ \cdots\,]\).` },
      { q: tx`The standard matrix of \(T(x_1,x_2) = (x_2,\ -x_1,\ x_1 + x_2)\) is:`, choices: [tx`\(\begin{bmatrix}0&1\\-1&0\\1&1\end{bmatrix}\)`, tx`\(\begin{bmatrix}0&-1&1\\1&0&1\end{bmatrix}\)`, tx`\(\begin{bmatrix}1&0\\0&-1\\1&1\end{bmatrix}\)`, tx`\(\begin{bmatrix}0&1\\1&0\\1&1\end{bmatrix}\)`], answer: 0,
        explain: tx`\(T(\vec e_1) = (0,-1,1)\) and \(T(\vec e_2) = (1,0,1)\) are the columns.` },
      { q: tx`Which matrix rotates \(\mathbb{R}^2\) by \(90^\circ\) counterclockwise?`, choices: [tx`\(\begin{bmatrix}0&1\\-1&0\end{bmatrix}\)`, tx`\(\begin{bmatrix}0&-1\\1&0\end{bmatrix}\)`, tx`\(\begin{bmatrix}-1&0\\0&-1\end{bmatrix}\)`, tx`\(\begin{bmatrix}0&1\\1&0\end{bmatrix}\)`], answer: 1,
        explain: tx`\(\vec e_1\to(0,1)\) and \(\vec e_2\to(-1,0)\). (The first choice rotates clockwise, and the last reflects over \(y=x\).)` },
      { q: tx`The standard matrix of projection onto the x-axis in \(\mathbb{R}^2\) is:`, choices: [tx`\(\begin{bmatrix}1&0\\0&0\end{bmatrix}\)`, tx`\(\begin{bmatrix}0&0\\0&1\end{bmatrix}\)`, tx`\(\begin{bmatrix}1&0\\0&-1\end{bmatrix}\)`, tx`\(\begin{bmatrix}1&1\\0&0\end{bmatrix}\)`], answer: 0,
        explain: tx`\(\vec e_1\) stays put and \(\vec e_2\) gets flattened to \(\vec 0\).` },
      { q: tx`If \(T\) is linear with \(T(\vec e_1) = (1,4)\) and \(T(\vec e_2) = (-2,3)\), then \(T(3,1) = \)`, choices: [tx`\((1,15)\)`, tx`\((3,4)\)`, tx`\((-5,13)\)`, tx`\((1,7)\)`], answer: 0,
        explain: tx`\(3(1,4) + 1(-2,3) = (1,15)\).` },
      { q: tx`\(I_n\vec x = \vec x\) for every \(\vec x\in\mathbb{R}^n\).`, tf: true, explain: tx`\(I_n\vec x = x_1\vec e_1 + \cdots + x_n\vec e_n = \vec x\).` },
      { q: tx`Every linear transformation \(T:\mathbb{R}^n\to\mathbb{R}^m\) can be written as \(T(\vec x) = A\vec x\) for exactly one matrix \(A\).`, tf: true,
        explain: tx`Theorem 1.62: the standard matrix exists and is unique.` }
    ]
  },
  init(root) {
    const box = root.querySelector('#detective-game');
    if (!box) return;
    const cv = box.querySelector('canvas');
    const plane = new Plane(cv, 4);
    const ins = [...box.querySelectorAll('input.dm')];
    const out = box.querySelector('.dout'), scoreEl = box.querySelector('.dscore');
    const bank = [
      [[0, -1], [1, 0]], [[-1, 0], [0, -1]], [[0, 1], [1, 0]], [[-1, 0], [0, 1]], [[1, 0], [0, -1]],
      [[2, 0], [0, 1]], [[1, 2], [0, 1]], [[1, 0], [0, 0]], [[0, 0], [0, 1]], [[1, 0], [-1, 1]], [[0, 1], [-1, 0]], [[2, 0], [0, 2]]
    ];
    const names = ['rotation by 90°', 'rotation by 180°', 'reflection over y = x', 'reflection over the y-axis', 'reflection over the x-axis',
      'horizontal stretch by 2', 'horizontal shear', 'projection onto the x-axis', 'projection onto the y-axis', 'vertical shear', 'rotation by 90° clockwise', 'scaling by 2'];
    let A = bank[0], name = names[0], t = 1, score = 0, tries = 0, last = -1;
    const F = [[0, 0], [0, 2], [1.2, 2], [1.2, 1.6], [0.4, 1.6], [0.4, 1.1], [1, 1.1], [1, 0.7], [0.4, 0.7], [0.4, 0]];
    const map = (x, y) => {
      const M = [[1 - t + t * A[0][0], t * A[0][1]], [t * A[1][0], 1 - t + t * A[1][1]]];
      return [M[0][0] * x + M[0][1] * y, M[1][0] * x + M[1][1] * y];
    };
    plane.draw = () => {
      plane.clear(); plane.grid(1, false);
      for (let k = -8; k <= 8; k++) {
        const v = [], h = [];
        for (let s = -8; s <= 8.001; s += 0.5) { v.push(map(k, s)); h.push(map(s, k)); }
        const col = k === 0 ? 'rgba(55,48,163,.8)' : 'rgba(79,70,229,.3)';
        plane.polyline(v, col, k === 0 ? 2 : 1.2); plane.polyline(h, col, k === 0 ? 2 : 1.2);
      }
      plane.poly(F, 'rgba(148,163,184,.18)', 'rgba(100,116,139,.5)', 1);
      const pts = [];
      for (let i = 0; i < F.length; i++) {
        const a = F[i], b = F[(i + 1) % F.length];
        for (let s = 0; s < 1; s += 0.1) pts.push(map(a[0] + (b[0] - a[0]) * s, a[1] + (b[1] - a[1]) * s));
      }
      plane.poly(pts, 'rgba(245,158,11,.38)', '#d97706', 1.6);
      const e1 = map(1, 0), e2 = map(0, 1);
      plane.arrow(0, 0, e1[0], e1[1], '#dc2626', 3.5, 'T(e₁)');
      plane.arrow(0, 0, e2[0], e2[1], '#059669', 3.5, 'T(e₂)');
    };
    const newPuzzle = () => {
      let i;
      if (Math.random() < 0.6) {
        do { i = Math.floor(Math.random() * bank.length); } while (i === last);
        last = i; A = bank[i]; name = names[i];
      } else {
        const r = () => Math.floor(Math.random() * 5) - 2;
        do { A = [[r(), r()], [r(), r()]]; } while ((A[0][0] === 0 && A[1][0] === 0) || (A[0][1] === 0 && A[1][1] === 0));
        name = null;
      }
      ins.forEach(x => { x.value = ''; x.style.borderColor = ''; });
      out.innerHTML = 'Enter your answer and press Check.';
      animate(1400, (s) => { t = s; plane.draw(); });
    };
    const answerTex = () => matTex(A.map(r => r.map(v => F_(v))));
    const F_ = (v) => Frac.from(v);
    box.querySelector('.dcheck').onclick = () => {
      const vals = ins.map(x => num(x.value, NaN));
      if (vals.some(isNaN)) { out.innerHTML = 'Fill in all four entries.'; return; }
      tries++;
      const flat = A.flat();
      const ok = vals.every((v, i) => Math.abs(v - flat[i]) < 1e-9);
      ins.forEach((x, i) => x.style.borderColor = Math.abs(vals[i] - flat[i]) < 1e-9 ? 'var(--good)' : 'var(--bad)');
      if (ok) {
        score++;
        out.innerHTML = tx`<span class="pill good">Correct</span> \(A = ${answerTex()}\)${name ? ` This is the <b>${name}</b>.` : ''}`;
      } else {
        out.innerHTML = tx`<span class="pill bad">Not quite</span> The entries outlined in red are wrong. Column 1 should be the tip of the red arrow \(T(\vec e_1)\), and column 2 the tip of the green arrow.`;
      }
      scoreEl.textContent = 'Score: ' + score + ' correct out of ' + tries + ' checks';
      renderMath(out);
    };
    box.querySelector('.dnew').onclick = newPuzzle;
    box.querySelector('.dshow').onclick = () => {
      out.innerHTML = tx`\(A = \big[\,T(\vec e_1)\ \ T(\vec e_2)\,\big] = ${answerTex()}\)${name ? ` (the <b>${name}</b>)` : ''}`;
      renderMath(out);
    };
    newPuzzle();
  }
});

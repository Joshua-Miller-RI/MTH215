Site.register({
  id: 's1_8',
  num: '1.8',
  title: 'Introduction to Linear Transformations',
  group: 'Lessons',
  desc: 'Matrices as functions: domain, codomain, range, the definition of a linear transformation, and how to test whether a transformation is linear.',
  html: tx`
  <div class="kicker">Section 1.8</div>
  <h1>Introduction to Linear Transformations</h1>
  <p class="lede">So far a matrix has been a table of numbers we row reduce. Now we see a matrix as a <b>function</b>: feed in a vector \(\vec x\in\mathbb{R}^n\), get out a vector \(A\vec x \in \mathbb{R}^m\). This viewpoint ties together everything from 1.1–1.7.</p>

  <div class="toc"><div class="toc-title">In this lesson</div><ol>
    <li><a href="#" data-scroll="warm">Warm-up: functions on \(\mathbb{R}\)</a></li>
    <li><a href="#" data-scroll="def">Transformations \(\mathbb{R}^n \to \mathbb{R}^m\)</a></li>
    <li><a href="#" data-scroll="matrix">Matrix transformations</a></li>
    <li><a href="#" data-scroll="ex56">Example 1.56</a></li>
    <li><a href="#" data-scroll="linear">Linear transformations</a></li>
    <li><a href="#" data-scroll="see">See linear vs. not linear</a></li>
    <li><a href="#" data-scroll="test">How to test for linearity</a></li>
    <li><a href="#" data-scroll="review">Review problems</a></li>
    <li><a href="#" data-scroll="quiz">Quiz</a></li>
  </ol></div>

  <h2 id="warm">1. Warm-up: a function on the real numbers</h2>
  <p>Let \(T:\mathbb{R}\to\mathbb{R}\) be \(T(x) = x^2 + 1\). Three sets are attached to every function:</p>
  <table class="tbl">
    <tr><th>Name</th><th>Meaning</th><th>For \(T(x) = x^2+1\)</th></tr>
    <tr><td><b>Domain</b></td><td>where the inputs live</td><td>\(\operatorname{dom}(T) = \mathbb{R}\)</td></tr>
    <tr><td><b>Codomain</b></td><td>where the outputs live (the "target" space)</td><td>\(\operatorname{codom}(T) = \mathbb{R}\)</td></tr>
    <tr><td><b>Range</b></td><td>the outputs that actually happen: \(\{T(x) \mid x \in \operatorname{dom}(T)\}\)</td><td>\(\{x^2+1 \mid x\in\mathbb{R}\} = [1, \infty)\)</td></tr>
  </table>
  <ul>
    <li>Is \(-3\) in the range? <b>No</b>: \(x^2 + 1 = -3\) has no real solution.</li>
    <li>Is \(5\) in the range? <b>Yes</b>: \(T(-2) = (-2)^2 + 1 = 5\).</li>
  </ul>
  <div class="box idea"><div class="box-title">Key distinction</div><p>The <b>codomain</b> is declared up front: "outputs land somewhere in here." The <b>range</b> is the part of the codomain that is actually hit. The range is always a <b>subset</b> of the codomain, and it can be smaller.</p></div>
  <p>Is \(T(x) = x^2+1\) linear? Of course not, it's quadratic. In linear algebra, the linear functions \(\mathbb{R}\to\mathbb{R}\) are exactly \(f(x) = mx\). Note that there's no "\(+\,b\)": a line that doesn't pass through the origin is <b>not</b> a linear function in this course. You'll see why below.</p>

  <h2 id="def">2. Transformations from \(\mathbb{R}^n\) to \(\mathbb{R}^m\)</h2>
  <div class="box def">
    <div class="box-title">Definition 1.55 · Transformation</div>
    <p>A <b>transformation</b> (or function, or mapping) \(T\) from \(\mathbb{R}^n\) to \(\mathbb{R}^m\), written \(T:\mathbb{R}^n\to\mathbb{R}^m\), is a rule that assigns to each vector \(\vec x\in\mathbb{R}^n\) a vector \(T(\vec x)\in\mathbb{R}^m\).</p>
    <ul>
      <li>The <b>domain</b> of \(T\) is \(\mathbb{R}^n\). The <b>codomain</b> of \(T\) is \(\mathbb{R}^m\).</li>
      <li>\(T(\vec x)\) is called the <b>image</b> of \(\vec x\) under \(T\).</li>
      <li>The <b>range</b> of \(T\) is the set of all images: \(\operatorname{range}(T) = \{T(\vec x) \mid \vec x \in \operatorname{dom}(T)\}\).</li>
    </ul>
  </div>
  <div class="center">
    <svg class="diagram" viewBox="0 0 640 230" style="max-width:640px;width:100%" role="img" aria-label="domain, codomain and range diagram">
      <defs><marker id="arr18" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#4f46e5"/></marker></defs>
      <ellipse cx="140" cy="118" rx="115" ry="88" fill="#eef2ff" stroke="#6366f1" stroke-width="2"/>
      <text x="140" y="24" text-anchor="middle" font-weight="700" fill="#3730a3" font-size="15">Domain ℝⁿ</text>
      <ellipse cx="500" cy="118" rx="125" ry="92" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
      <text x="500" y="20" text-anchor="middle" font-weight="700" fill="#166534" font-size="15">Codomain ℝᵐ</text>
      <ellipse cx="490" cy="128" rx="68" ry="46" fill="#bbf7d0" stroke="#16a34a" stroke-dasharray="5 4"/>
      <text x="490" y="190" text-anchor="middle" fill="#166534" font-size="13" font-weight="700">Range (what's actually hit)</text>
      <circle cx="105" cy="85" r="5" fill="#1e293b"/><text x="88" y="80" font-size="14" font-style="italic">x</text>
      <circle cx="160" cy="150" r="5" fill="#1e293b"/><text x="145" y="168" font-size="14" font-style="italic">u</text>
      <circle cx="470" cy="110" r="5" fill="#1e293b"/><text x="478" y="106" font-size="14" font-style="italic">T(x)</text>
      <circle cx="510" cy="145" r="5" fill="#1e293b"/><text x="518" y="150" font-size="14" font-style="italic">T(u)</text>
      <circle cx="585" cy="92" r="5" fill="#94a3b8"/><text x="572" y="80" text-anchor="middle" font-size="11" fill="#64748b">not in the range</text>
      <path d="M112,84 C250,40 360,60 463,108" fill="none" stroke="#4f46e5" stroke-width="2" marker-end="url(#arr18)"/>
      <path d="M167,150 C280,190 400,180 503,147" fill="none" stroke="#4f46e5" stroke-width="2" marker-end="url(#arr18)"/>
      <text x="300" y="52" text-anchor="middle" fill="#4f46e5" font-weight="700">T</text>
    </svg>
  </div>

  <h2 id="matrix">3. Matrix transformations</h2>
  <p>The most important kind: pick an \(m\times n\) matrix \(A\) and define \(T(\vec x) = A\vec x\).</p>
  <div class="box thm">
    <div class="box-title">For \(T(\vec x) = A\vec x\) with \(A\) of size \(m \times n\)</div>
    <ul>
      <li>\(\operatorname{dom}(T) = \mathbb{R}^n\), since \(\vec x\) needs \(n\) entries (one per <b>column</b>).</li>
      <li>\(\operatorname{codom}(T) = \mathbb{R}^m\), since \(A\vec x\) has \(m\) entries (one per <b>row</b>).</li>
      <li>\(\operatorname{range}(T) = \{A\vec x \mid \vec x\in\mathbb{R}^n\} = \) the set of all linear combinations of the columns of \(A\) \(= \operatorname{span}\{\text{columns of } A\}\).</li>
      <li>A vector \(\vec b \in \mathbb{R}^m\) is in the range of \(T\) \(\iff\) \(A\vec x = \vec b\) is <b>consistent</b>.</li>
    </ul>
  </div>
  <div class="box warn">
    <div class="box-title">The sizes are "backwards"</div>
    <p>An \(m\times n\) matrix gives \(T:\mathbb{R}^n\to\mathbb{R}^m\). For example, a \(3\times 2\) matrix maps \(\mathbb{R}^2 \to \mathbb{R}^3\). Columns tell you the input size and rows tell you the output size.</p>
  </div>
  <div class="box warn">
    <div class="box-title">Review T/F 9: codomain vs. range</div>
    <p>"The codomain of \(T:\mathbb{R}^n\to\mathbb{R}^m\), \(T(\vec x) = A\vec x\), is the set of all linear combinations of the columns of \(A\)." <b>False.</b> That set is the <b>range</b>. The codomain is all of \(\mathbb{R}^m\). They're equal only when the columns span \(\mathbb{R}^m\) (pivot in every row).</p>
  </div>
  <p>This gives a new way to say things we already know:</p>
  <table class="tbl">
    <tr><th>Old language (1.3–1.4)</th><th>New language (1.8)</th></tr>
    <tr><td>\(A\vec x = \vec b\) is consistent</td><td>\(\vec b\) is in the range of \(T\)</td></tr>
    <tr><td>\(\vec b \in\) span of the columns of \(A\)</td><td>\(\vec b\) is an image: \(\vec b = T(\vec x)\) for some \(\vec x\)</td></tr>
    <tr><td>Columns of \(A\) span \(\mathbb{R}^m\) (pivot in every row)</td><td>range = codomain: every \(\vec b\in\mathbb{R}^m\) is hit</td></tr>
    <tr><td>\(A\vec x = \vec b\) has a unique solution</td><td>exactly one \(\vec x\) maps to \(\vec b\)</td></tr>
  </table>

  <h2 id="ex56">4. Example 1.56</h2>
  <div class="box ex">
    <div class="box-title">Example 1.56</div>
    <p>Let \(A = \begin{bmatrix}1&-3\\3&5\\-1&7\end{bmatrix}\) and \(T:\mathbb{R}^2\to\mathbb{R}^3\), \(T(\vec x) = A\vec x\). Let \(\vec u = \begin{bmatrix}2\\-1\end{bmatrix}\), \(\vec b = \begin{bmatrix}3\\2\\-5\end{bmatrix}\), \(\vec c = \begin{bmatrix}3\\2\\5\end{bmatrix}\).</p>
    <p>(1) Find the image of \(\vec u\). (2) Find \(\vec x\) whose image is \(\vec b\). Is it unique? (3) Is \(\vec c\) in the range of \(T\)?</p>
  </div>
  <div class="reveal">
    <div class="step"><div class="step-label">(1) The image of u: just multiply</div>
      \[T(\vec u) = \begin{bmatrix}1&-3\\3&5\\-1&7\end{bmatrix}\begin{bmatrix}2\\-1\end{bmatrix} = \begin{bmatrix}2+3\\6-5\\-2-7\end{bmatrix} = \begin{bmatrix}5\\1\\-9\end{bmatrix}.\]</div>
    <div class="step"><div class="step-label">(2) Set up</div>
      <p>"Find \(\vec x\) with \(T(\vec x) = \vec b\)" means solve \(A\vec x = \vec b\). Row reduce \([\,A\mid\vec b\,]\) with \(R_2 \leftarrow R_2 - 3R_1\), \(R_3 \leftarrow R_3 + R_1\), \(R_2 \leftarrow \tfrac1{14}R_2\), \(R_3 \leftarrow R_3 - 4R_2\), \(R_1 \leftarrow R_1 + 3R_2\):</p>
      \[\left[\begin{array}{cc|c}1&-3&3\\3&5&2\\-1&7&-5\end{array}\right] \longrightarrow \left[\begin{array}{cc|c}1&0&1.5\\0&1&-0.5\\0&0&0\end{array}\right]\]</div>
    <div class="step"><div class="step-label">(2) Answer</div>
      <p>\(\vec x = \begin{bmatrix}1.5\\-0.5\end{bmatrix}\). It's <b>unique</b> because there's a pivot in every coefficient column (no free variables). Exactly one input maps to \(\vec b\).</p></div>
    <div class="step"><div class="step-label">(3) Is c in the range?</div>
      <p>\(\vec c\) is in the range only if \(A\vec x = \vec c\) is consistent:</p>
      \[\left[\begin{array}{cc|c}1&-3&3\\3&5&2\\-1&7&5\end{array}\right] \longrightarrow \left[\begin{array}{cc|c}1&-3&3\\0&2&-1\\0&0&10\end{array}\right]\]
      <p>The last row says \(0 = 10\), so the system is inconsistent and <b>\(\vec c\) is not in the range of \(T\)</b>. (\(\vec c\) is in the codomain \(\mathbb{R}^3\), but no input reaches it.)</p></div>
  </div>
  <p>Step through part (2) yourself:</p>
  <div data-widget="rrstepper" data-cfg='{"matrix":"1 -3 | 3; 3 5 | 2; -1 7 | -5","aug":true,"title":"Example 1.56(2): solve Ax = b"}'></div>
  <div class="box idea"><div class="box-title">Big picture</div><p>The range here is the span of 2 vectors in \(\mathbb{R}^3\), a plane through the origin. \(\vec b\) lies on that plane and \(\vec c\) doesn't. A \(3\times2\) matrix can never hit all of \(\mathbb{R}^3\), because there are only 2 columns for 3 rows.</p></div>

  <h2 id="linear">5. Linear transformations</h2>
  <p>Recall Proposition 1.40: \(A(\vec u + \vec v) = A\vec u + A\vec v\) and \(A(c\vec u) = cA\vec u\). Transformations with these two properties get a special name.</p>
  <div class="box def">
    <div class="box-title">Definition 1.57 · Linear transformation</div>
    <p>A transformation \(T\) is <b>linear</b> if</p>
    <ol>
      <li>\(T(\vec u + \vec v) = T(\vec u) + T(\vec v)\) for all \(\vec u, \vec v \in \operatorname{dom}(T)\) (it <b>preserves addition</b>), and</li>
      <li>\(T(c\vec u) = cT(\vec u)\) for all scalars \(c\) and all \(\vec u\in\operatorname{dom}(T)\) (it <b>preserves scaling</b>).</li>
    </ol>
  </div>
  <p>By Proposition 1.40, <b>every matrix transformation \(T(\vec x) = A\vec x\) is linear.</b> (Section 1.9 shows the converse: every linear transformation is a matrix transformation.)</p>
  <div class="box thm">
    <div class="box-title">Proposition 1.58</div>
    <p>If \(T\) is a linear transformation, then</p>
    <ol>
      <li>\(T(\vec 0) = \vec 0\), and</li>
      <li>\(T(c\vec u + d\vec v) = cT(\vec u) + dT(\vec v)\) for all scalars \(c, d\) and all \(\vec u, \vec v\).</li>
    </ol>
    <p>More generally, \(T(c_1\vec u_1 + \cdots + c_p\vec u_p) = c_1T(\vec u_1) + \cdots + c_pT(\vec u_p)\) (the <b>superposition principle</b>). A transformation is linear <b>if and only if</b> property 2 holds.</p>
  </div>
  <details class="solution"><summary>Why? (short proof)</summary><div class="sol-body">
    <p>\(T(\vec 0) = T(0\cdot\vec 0) = 0\cdot T(\vec 0) = \vec 0\), using property 2 of the definition with \(c = 0\).</p>
    <p>\(T(c\vec u + d\vec v) = T(c\vec u) + T(d\vec v) = cT(\vec u) + dT(\vec v)\), using property 1 and then property 2.</p>
  </div></details>
  <div class="box idea"><div class="box-title">In plain English</div><p>A linear transformation <b>respects linear combinations</b>: transforming a combination gives the same combination of the transformed vectors. Geometrically, it keeps the origin fixed, keeps grid lines straight, and keeps them parallel and evenly spaced.</p></div>
  <div class="box warn"><div class="box-title">Review T/F 10</div><p>"\(T:\mathbb{R}^t\to\mathbb{R}^s\) is not linear if \(s &lt; t\)." <b>False.</b> Linearity is about the two properties, not the dimensions. For example, \(T(x_1, x_2) = x_1\) maps \(\mathbb{R}^2 \to \mathbb{R}^1\) and is linear (matrix \([\,1\ \ 0\,]\)).</p></div>

  <h2 id="see">6. See it: linear vs. not linear</h2>
  <p>Pick a transformation and watch what it does to the grid. Linear ones keep the origin fixed and grid lines straight, parallel, and evenly spaced. The "NOT linear" presets break at least one of these, and the panel explains which property fails.</p>
  <div data-widget="transform" data-cfg='{"presets":["identity","shear","stretch","translate","abs","bend"],"initial":"translate","title":"Linear vs. not linear"}'></div>

  <h2 id="test">7. How to test whether \(T\) is linear</h2>
  <div class="flow">
    <div class="node"><b>Step 1</b>Compute \(T(\vec 0)\). If it's not \(\vec 0\): <b>not linear</b>, done.</div>
    <div class="arrow">→</div>
    <div class="node"><b>Step 2a</b>If each output entry is \(a_1x_1 + \cdots + a_nx_n\) (no constants, powers, products, \(|\cdot|\), etc.), write \(T(\vec x) = A\vec x\): <b>linear</b>.</div>
    <div class="arrow">or</div>
    <div class="node"><b>Step 2b</b>Otherwise find specific \(\vec u, c\) where \(T(c\vec u) \neq cT(\vec u)\) or \(T(\vec u+\vec v) \neq T(\vec u)+T(\vec v)\): <b>not linear</b>.</div>
  </div>
  <div class="box warn"><div class="box-title">Careful</div><p>\(T(\vec 0) = \vec 0\) is <b>necessary but not sufficient</b>. Passing step 1 doesn't prove linearity (see \(S\) in Example 1.60 below).</p></div>

  <div class="box ex">
    <div class="box-title">Example 1.59 · Is this linear?</div>
    <p>\(T:\mathbb{R}^4\to\mathbb{R}^3\), \(T(x_1,x_2,x_3,x_4) = (x_1 + x_2,\ x_2 + x_3,\ x_3 + x_4)\).</p>
    <p><b>Method 1 (definition).</b> For \(\vec x, \vec y \in \mathbb{R}^4\) and \(c\in\mathbb{R}\):</p>
    \[T(\vec x + \vec y) = \begin{bmatrix}(x_1+y_1) + (x_2+y_2)\\(x_2+y_2)+(x_3+y_3)\\(x_3+y_3)+(x_4+y_4)\end{bmatrix} = \begin{bmatrix}x_1+x_2\\x_2+x_3\\x_3+x_4\end{bmatrix} + \begin{bmatrix}y_1+y_2\\y_2+y_3\\y_3+y_4\end{bmatrix} = T(\vec x) + T(\vec y)\]
    \[T(c\vec x) = \begin{bmatrix}cx_1+cx_2\\cx_2+cx_3\\cx_3+cx_4\end{bmatrix} = c\begin{bmatrix}x_1+x_2\\x_2+x_3\\x_3+x_4\end{bmatrix} = cT(\vec x)\]
    <p><b>Method 2 (faster).</b> Write it as a matrix transformation:</p>
    \[T(\vec x) = \begin{bmatrix}1&1&0&0\\0&1&1&0\\0&0&1&1\end{bmatrix}\begin{bmatrix}x_1\\x_2\\x_3\\x_4\end{bmatrix},\]
    <p>so \(T\) is linear by the properties of matrix-vector products.</p>
  </div>

  <div class="box ex">
    <div class="box-title">Example 1.60 · Are these linear?</div>
    <p><b>(a)</b> \(T:\mathbb{R}^2\to\mathbb{R}^3\), \(T(x_1,x_2) = (2x_1 + 3x_2,\ x_1 + 5,\ x_2 - 2x_1)\).</p>
    <details class="solution"><summary>Answer (a)</summary><div class="sol-body">
      <p><b>Not linear.</b> \(T(0,0) = (0,\ 5,\ 0) \neq \vec 0\). The "+5" is the culprit: constants are not allowed.</p>
    </div></details>
    <p><b>(b)</b> \(S:\mathbb{R}^2\to\mathbb{R}^2\), \(S(x_1,x_2) = (4x_1 - 2x_2,\ 3|x_2|)\).</p>
    <details class="solution"><summary>Answer (b)</summary><div class="sol-body">
      <p>\(S(0,0) = (0,0)\), so step 1 passes, but that doesn't prove anything. The absolute value is suspicious, so test scaling with \(c = -1\) and \(\vec u = (0,1)\):</p>
      \[S(-\vec u) = S(0,-1) = (2,\ 3), \qquad -S(\vec u) = -S(0,1) = -(-2,\ 3) = (2,\ -3).\]
      <p>These differ, so \(S(c\vec u) \neq cS(\vec u)\) and <b>\(S\) is not linear.</b></p>
    </div></details>
    <p><b>(c)</b> \(P:\mathbb{R}^3\to\mathbb{R}^3\), \(P(x_1,x_2,x_3) = (x_1,\ x_2,\ -x_3)\).</p>
    <details class="solution"><summary>Answer (c)</summary><div class="sol-body">
      <p><b>Linear.</b> \(P(\vec x) = \begin{bmatrix}1&0&0\\0&1&0\\0&0&-1\end{bmatrix}\vec x\). Geometrically, it reflects \(\mathbb{R}^3\) across the \(x_1x_2\)-plane (it flips the sign of the height).</p>
    </div></details>
  </div>

  <h2 id="review">8. Review problems</h2>
  <div class="problem">
    <div class="p-head"><span class="p-num">Review 25</span><span class="p-tag">domain · codomain · range · linear?</span></div>
    <p>For each, state the domain, codomain, and range, and decide whether it's linear.</p>
    <p>(a) \(T(x_1,x_2,x_3,x_4) = (0,\ x_1+x_2,\ x_2+x_3,\ x_3+x_4)\)<br>
       (b) \(T(x_1,x_2) = (2x_2 - 3x_1,\ x_1 - 4x_2,\ 0,\ x_2)\)<br>
       (c) \(T(x_1,x_2,x_3,x_4) = 2x_1 + 3x_3 - 4x_4\)<br>
       (d) \(T(x_1,x_2) = (2x_1 - x_2,\ x_2 + x_1 + 3,\ 3x_1 + 4x_2)\)</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p><b>(a)</b> \(\mathbb{R}^4 \to \mathbb{R}^4\). <b>Linear</b>: \(T(\vec x) = \begin{bmatrix}0&0&0&0\\1&1&0&0\\0&1&1&0\\0&0&1&1\end{bmatrix}\vec x\). The range is the span of the columns of this matrix. (The first output entry is always 0, so the range is not all of \(\mathbb{R}^4\).)</p>
      <p><b>(b)</b> \(\mathbb{R}^2 \to \mathbb{R}^4\). <b>Linear</b>: \(T(\vec x) = \begin{bmatrix}-3&2\\1&-4\\0&0\\0&1\end{bmatrix}\vec x\). Watch the order: \(2x_2 - 3x_1\) means the \(x_1\) coefficient is \(-3\). Range = span of the columns.</p>
      <p><b>(c)</b> \(\mathbb{R}^4 \to \mathbb{R}\). <b>Linear</b>: \(T(\vec x) = [\,2\ \ 0\ \ 3\ \ {-4}\,]\vec x\) (a \(1\times4\) matrix; note the 0 for the missing \(x_2\)). Range = span of the columns = \(\mathbb{R}\).</p>
      <p><b>(d)</b> \(\mathbb{R}^2 \to \mathbb{R}^3\). <b>Not linear</b>: \(T(0,0) = (0,3,0) \neq \vec 0\).</p>
    </div></details>
  </div>
  <div class="problem">
    <div class="p-head"><span class="p-num">Review 27</span></div>
    <p>Show that \(T(x_1,x_2) = (2x_1 - 3x_2,\ x_1 + 2,\ 3x_2)\) is not a linear transformation.</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p>\(T(0,0) = (0,\ 2,\ 0) \neq (0,0,0)\). Every linear transformation sends \(\vec 0\) to \(\vec 0\) (Proposition 1.58), so \(T\) is not linear.</p>
    </div></details>
  </div>
  <div class="problem">
    <div class="p-head"><span class="p-num">Range check</span><span class="p-tag">practice</span></div>
    <p>\(T(\vec x) = A\vec x\) with \(A = \begin{bmatrix}1&2\\2&4\end{bmatrix}\). What is the range? Is \((1,3)\) in it?</p>
    <details class="solution"><summary>Show solution</summary><div class="sol-body">
      <p>The columns \((1,2)\) and \((2,4)\) are multiples, so the range is \(\operatorname{span}\{(1,2)\}\), the line \(y = 2x\). \((1,3)\) is not on it: \([A\mid(1,3)] \xrightarrow{R_2 \leftarrow R_2 - 2R_1} \left[\begin{array}{cc|c}1&2&1\\0&0&1\end{array}\right]\) is inconsistent. So \((1,3)\) is in the codomain \(\mathbb{R}^2\) but <b>not</b> in the range.</p>
    </div></details>
  </div>

  <div class="summary">
    <h3>What to remember from 1.8</h3>
    <ul>
      <li>\(T:\mathbb{R}^n\to\mathbb{R}^m\): domain \(\mathbb{R}^n\), codomain \(\mathbb{R}^m\), range = the set of outputs actually achieved (a subset of the codomain).</li>
      <li>\(T(\vec x) = A\vec x\) with \(A\) of size \(m\times n\) maps \(\mathbb{R}^n\to\mathbb{R}^m\). Its range is the span of the columns of \(A\). \(\vec b\) is in the range \(\iff\) \(A\vec x=\vec b\) is consistent.</li>
      <li><b>Linear:</b> \(T(\vec u+\vec v) = T(\vec u)+T(\vec v)\) and \(T(c\vec u) = cT(\vec u)\). Every matrix transformation is linear.</li>
      <li>Linear implies \(T(\vec 0) = \vec 0\). If \(T(\vec 0)\neq\vec 0\), it's not linear. But \(T(\vec 0) = \vec 0\) alone doesn't prove linearity.</li>
      <li>Constants, powers, products of variables, \(|\cdot|\), etc. make a transformation non-linear. Dimensions have nothing to do with it.</li>
    </ul>
  </div>

  <h2 id="quiz">Quiz</h2>
  <div class="quiz" data-quiz="main"></div>
  `,
  quizzes: {
    main: [
      { q: tx`If \(A\) is \(3\times 5\), then \(T(\vec x) = A\vec x\) is a transformation from:`, choices: [tx`\(\mathbb{R}^3\) to \(\mathbb{R}^5\)`, tx`\(\mathbb{R}^5\) to \(\mathbb{R}^3\)`, tx`\(\mathbb{R}^3\) to \(\mathbb{R}^3\)`, tx`\(\mathbb{R}^{15}\) to \(\mathbb{R}\)`], answer: 1,
        explain: tx`\(\vec x\) needs 5 entries (one per column), and the output has 3 entries (one per row).` },
      { q: tx`The codomain of \(T(\vec x) = A\vec x\) is the set of all linear combinations of the columns of \(A\).`, tf: false,
        explain: tx`That's the <b>range</b>. The codomain is all of \(\mathbb{R}^m\) (Review T/F 9).` },
      { q: tx`A transformation \(T:\mathbb{R}^t\to\mathbb{R}^s\) cannot be linear if \(s &lt; t\).`, tf: false,
        explain: tx`Dimensions don't matter. \(T(x_1,x_2) = x_1\) is linear from \(\mathbb{R}^2\) to \(\mathbb{R}\) (Review T/F 10).` },
      { q: tx`Which transformation is linear?`, choices: [tx`\(T(x_1,x_2) = (x_1 + 1,\ x_2)\)`, tx`\(T(x_1,x_2) = (x_1x_2,\ x_2)\)`, tx`\(T(x_1,x_2) = (3x_2,\ x_1 - x_2,\ 0)\)`, tx`\(T(x_1,x_2) = (x_1^2,\ x_2)\)`], answer: 2,
        explain: tx`It equals \(\begin{bmatrix}0&3\\1&-1\\0&0\end{bmatrix}\vec x\). The others have a constant, a product, or a square.` },
      { q: tx`If \(T(\vec 0) = \vec 0\), then \(T\) is linear.`, tf: false,
        explain: tx`Necessary but not sufficient. \(S(x_1,x_2) = (4x_1 - 2x_2,\ 3|x_2|)\) has \(S(\vec 0)=\vec 0\) but isn't linear.` },
      { q: tx`\(\vec b\) is in the range of \(T(\vec x) = A\vec x\) if and only if:`, choices: [tx`\(A\vec x = \vec b\) is consistent`, tx`\(A\vec x = \vec b\) has a unique solution`, tx`\(A\) has a pivot in every row`, tx`\(\vec b \neq \vec 0\)`], answer: 0,
        explain: tx`Being in the range means \(\vec b = A\vec x\) for <i>some</i> \(\vec x\), i.e., the system has at least one solution.` },
      { q: tx`If \(T\) is linear and \(T(\vec u) = (1,2)\), \(T(\vec v) = (0,-1)\), then \(T(2\vec u - 3\vec v) = \)`, choices: [tx`\((2,7)\)`, tx`\((2,1)\)`, tx`\((-1,7)\)`, 'cannot be determined'], answer: 0,
        explain: tx`\(2T(\vec u) - 3T(\vec v) = (2,4) - (0,-3) = (2,7)\).` },
      { q: tx`The range of a transformation is always equal to its codomain.`, tf: false,
        explain: tx`The range is a subset of the codomain and can be smaller, e.g. \(x^2+1\) has range \([1,\infty)\) inside the codomain \(\mathbb{R}\).` }
    ]
  }
});

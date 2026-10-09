Site.register({
  id: 'lab',
  num: '',
  title: 'Row Reduction Lab',
  group: 'Exam prep',
  desc: 'Step-by-step solver for any matrix, a do-it-yourself mode where you choose each row operation, and unlimited random practice systems.',
  html: tx`
  <div class="kicker">Exam prep</div>
  <h1>Row Reduction Lab</h1>
  <p class="lede">Row reduction is the engine behind almost every exam problem, and you'll do it by hand with no calculator. This lab helps you build speed and accuracy.</p>
  <div class="flow">
    <div class="node"><b>Step-by-step solver</b>Type any matrix (or pick a course example) and watch every operation with the reason for it. It ends with a full interpretation: solutions, span, independence.</div>
    <div class="node"><b>Do it yourself</b>You choose each operation, and the lab does the arithmetic and logs your work exactly as you'd write it on the exam. Ask for a hint any time.</div>
    <div class="node"><b>Random practice</b>Fresh systems with integer answers. Choose unique, infinitely many, or no solution, and a size. Solve on paper, then check.</div>
  </div>
  <div data-widget="lab" data-cfg='{"tab":"solver","matrix":"1 -2 3 | 9\n-1 3 0 | -4\n2 -5 5 | 17","examples":[{"name":"Ex 1.6 (no solution)","m":"0 1 -4 | 8\n2 -3 2 | 1\n4 -8 12 | 1"},{"name":"Ex 1.12","m":"2 3 2 3\n-2 1 6 1\n-1 -3 -4 1","mode":"mat"},{"name":"Ex 1.13","m":"0 3 -6 6 4 -5\n3 -7 8 -5 8 9\n3 -9 12 -9 6 15","mode":"mat"},{"name":"Review 20","m":"1 -2 3 | 9\n-1 3 0 | -4\n2 -5 5 | 17"},{"name":"Review 21","m":"1 -2 -1 | 3\n3 -6 -2 | 2"},{"name":"Review 22","m":"1 2 1 | 0\n-3 -1 2 | 1\n0 5 3 | -1"},{"name":"Review 24","m":"1 1 | -1\n2 0 | 6\n1 2 | -5"},{"name":"Review 31","m":"1 5 -2 0 | -7\n-3 1 9 -5 | 9\n4 -8 -1 7 | 0"},{"name":"Review 32 (columns)","m":"4 1 6\n-7 5 3\n9 -3 3","mode":"mat"},{"name":"Ex 1.50 (columns)","m":"5 6 -1 -11 6\n-4 0 2 22 -6\n2 3 4 10 -2","mode":"mat"},{"name":"Worksheet 1 #2","m":"1 2 3 | 1\n2 4 8 | 0"},{"name":"Worksheet 4 #2","m":"-1 2 6 -1\n0 5 10 5\n0 1 2 1","mode":"mat"}],"diy":"1 2 1 | 0\n-3 -1 2 | 1\n0 5 3 | -1"}'></div>

  <h2>Hand-computation checklist</h2>
  <div class="box tip"><div class="box-title">Before the exam, practice until these are automatic</div>
    <ul>
      <li><b>Write every operation</b> next to the arrow, e.g. \(R_2 \leftarrow R_2 - 3R_1\). The exam gives no partial credit without them.</li>
      <li><b>Get a 1 into the pivot spot first</b> when you can: swap in a row that starts with 1 or \(-1\), or scale. This avoids fractions.</li>
      <li><b>Work one column at a time</b>: zeros below the pivot, then move right. Do the backward phase (zeros above) only after REF is finished.</li>
      <li><b>Stop early when you can.</b> Existence, span, independence, and counting pivots only need an <b>REF</b>. You need the RREF to write out the solution.</li>
      <li><b>Spot \([0\ \cdots\ 0 \mid c]\) immediately.</b> If \(c \neq 0\), stop: there's no solution.</li>
      <li><b>Check your answer</b> by plugging it into the <b>original</b> equations (one equation is usually enough to catch an arithmetic slip).</li>
      <li><b>Fractions:</b> keep them as fractions (no decimals). Scaling a row by a common factor early (e.g. \(\tfrac12R_2\)) keeps numbers small.</li>
    </ul>
  </div>
  <div class="box idea"><div class="box-title">A good 20-minute session</div>
    <ol>
      <li>Random practice: one 3×3 "Unique" system, fully by hand to RREF. Check.</li>
      <li>Random practice: one "Infinitely many" system, written in parametric vector form. Check.</li>
      <li>Random practice: one "No solution" system. Stop as soon as you see the bad row.</li>
      <li>Do it yourself: Review 22 (pre-loaded) using the fewest operations you can.</li>
      <li>Solver: pick a "columns" example and, before looking, predict whether the columns span and whether they're independent.</li>
    </ol>
  </div>
  `
});

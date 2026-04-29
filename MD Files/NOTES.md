# Notes & Decisions Log

_A running reference for Binwa — decisions made, concepts explained, function hierarchy, session summaries._

---

## Decisions Log

| Date | Decision | Reason |
|------|----------|--------|
| 2026-04-20 | Project planning finalized, MD system set up | Starting fresh, capstone begins |
| 2026-04-21 | Vanilla JS over React | No framework needed — adds complexity with no benefit for this project |
| 2026-04-21 | Canvas over DOM (divs/tables) for grid rendering | DOM with 4 instances × ~2000 cells is fine for static render but janky during animation; canvas wins on animation control |
| 2026-04-21 | Fixed canvas size (not responsive) | Resizing mid-algorithm would invalidate the run; visualizers don't need to be mobile-friendly |
| 2026-04-22 | 2D JS array is source of truth; canvas is just the renderer | Keeps algorithm logic fully separate from drawing — algorithms never touch the canvas |
| 2026-04-22 | All instances share one maze array | Maze drawn once; all instances read same layout, run their algorithms independently |
| 2026-04-22 | Maze values: 0=open, 1=wall, 100=start, -100=end | Integer encoding — simple to check, easy to extend for weighted terrain later |
| 2026-04-22 | async/await + pause() for animation | Cleaner than staggered setTimeout — loop reads naturally, delay is explicit per step |
| 2026-04-28 | Visited nodes tracked in a separate array, not written back to maze[][] | Mutating the maze breaks Clear and re-runs; keep maze as read-only truth during algorithm |
| 2026-04-28 | BFS node identity as 'col,row' string | Simple to push/compare in queue/visited arrays; parse with .split(',') for two-digit coords |
| 2026-04-28 | Pause/resume: global `running` flag + `continue` not `break` | `break` would kill the loop; `continue` keeps it alive spinning at 100ms intervals, resumes cleanly when `running` flips back to true |
| 2026-04-28 | Start/Stop merged into one toggle button | Simpler UX; swaps text, class, and onclick — only one button state to manage |
| 2026-04-28 | `algoPause` in mainAlgo.js is a duplicate of `pause` in drawCanvas.js | Both are in global scope; should consolidate to just `pause` eventually |

---

## Session Summaries

### 2026-04-20
- First session. Set up full MD tracking system (CLAUDE.md, CONTEXT.md, NOTES.md, PROGRESS.md).
- Confirmed approach: Claude acts as tutor/mentor, not code writer (CSS/frontend exception added later).
- Ready to begin Phase 1 next session.

### 2026-04-21
- Built full dark mode navbar: Start, Stop, Clear, +/− instance counter, difficulty picker.
- Decided on vanilla JS (no React). Canvas-based rendering confirmed over DOM grid.
- Learned: script tag placement, bracket vs dot notation, CSS variables, flexbox layout.

### 2026-04-22
- `drawCanvas.js` working: canvas draws a grid responsive to window width, driven by difficulty preset.
- Established the core mental model: array = truth, canvas = view, algorithm = operates on array only.
- Learned: canvas API basics, cellSize derivation, align-self for flex canvas fix, ctx.translate(0.5,0.5) for crisp lines.

### 2026-04-27
- `mazeGen.js` created with hardcoded maze (0/1/100/-100 encoding), full border walls, denser internal walls.
- `fillRectMaze()` now colors walls white, start red, end green.
- Fixed `ctx.rect` → `ctx.fillRect` bug (rect accumulates path, fillRect draws immediately).
- Added reveal animation: `async/await` + `pause(ms)` helper staggered per cell — maze appears left-to-right, row by row.
- Confirmed canvas handles animation fine — not a reason to switch to divs.
- BFS started: queue/visited arrays, '1,1' start, neighbour generation via string concat, bounds checking.

### 2026-04-28 — BFS complete + code review
- Fixed all BFS bugs: queue != [] comparison, queue.pop vs shift, i vs possibilities[i], QZNS[0][0] double-indexing, char indexing for two-digit coords (→ .split(',')), 100K push bug (visited check on enqueue not just dequeue).
- `drawVisited()` added to `drawCanvas.js`, wired into BFS loop with animation delay.
- `main.js` created: start/stop toggle, `running` flag, algo-picker routing.
- Full code review session: bugs documented, architecture verified, known gaps identified (see Open Questions).

---

## Code Function Hierarchy

```
mazeGen.js
  maze[][]                  ← 2D array, source of truth (0=open, 1=wall, 100=start, -100=end)
  generateMaze()            ← calls fillRectMaze() to kick off canvas render

drawCanvas.js
  rowColumnList             ← maps difficulty → [cols, rows]
  initialGridDraw()         ← reads difficulty picker, sizes canvas, draws grid lines
    └── reads rowColumnList
    └── reads window.innerWidth
  pause(ms)                 ← Promise wrapper around setTimeout (used for animation delays)
  fillRectMaze()  [async]   ← loops maze[][], draws each cell with correct color + await pause()
    └── reads maze          (global from mazeGen.js)
    └── sets global sqSide  ← BUG NOTE: sqSide only exists after fillRectMaze runs
  drawVisited(col, row)     ← fills one cell grey on the canvas; called by BFS per visited node
    └── uses global sqSide

mainAlgo.js
  battleMode                ← flag (unused, always false — reserved for Phase 4)
  algoPause(ms)             ← DUPLICATE of pause() from drawCanvas.js, should be removed
  bfs()  [async]            ← BFS on maze[][], uses queue + visited string arrays ('col,row' format)
    └── reads maze          (global)
    └── calls drawVisited() (global from drawCanvas.js)
    └── checks running flag (global from main.js)
    └── calls stopAlgo()    (global from main.js) when end node found

main.js
  running                   ← global pause/resume flag (true = running, false = paused)
  startAlgo()               ← flips button to Stop, sets running=true, reads algo-picker, calls bfs()
  stopAlgo()                ← flips button to Start, sets running=false
  btn.onclick = startAlgo   ← initial wiring on page load
```

**Load order (index.html script tags):** drawCanvas.js → mazeGen.js → mainAlgo.js → main.js
Each file uses globals defined by earlier files. Order matters.

---

## Concepts Explained

**Canvas dimensions (HTML attr vs CSS):** Canvas `width`/`height` HTML attributes set the drawing resolution. CSS `width`/`height` just scales the pixels visually — this distorts your grid. Always set canvas size in JS (`c.width = ...`), never via CSS.

**`ctx.translate(0.5, 0.5)`:** Canvas draws lines centered on pixel boundaries, so a 1px line bleeds across 2 pixels and looks blurry. Shifting by 0.5 snaps lines to the pixel grid — crisp edges.

**`ctx.rect` vs `ctx.fillRect`:** `ctx.rect()` adds a rectangle to the current path. `ctx.fill()` fills the entire path at once with the last `fillStyle` set — so all rects get the last color. `ctx.fillRect(x, y, w, h)` draws and fills one rectangle immediately, independently. Always use `fillRect` for per-cell coloring.

**Array-canvas separation:** The 2D grid array (`maze[row][col]`) is the source of truth. The canvas only reads it and draws colors. Algorithms only read/write the array. This means multiple canvases can show the same maze running different algorithms simultaneously.

**cellSize:** Derived as `gridWidth / numCols`. Every canvas operation uses this — drawing lines, filling cells, future mouse-to-cell conversion. Keep it as a named variable.

**async/await + Promise for animation:** `pause(ms)` wraps `setTimeout` in a Promise. `await pause(ms)` tells JS to pause the loop for ms milliseconds before continuing. The function must be marked `async` to use `await`. This is the right pattern for all algorithm step animations going forward.

---

## Open Questions / Things to Decide
- **Path reconstruction:** BFS needs a `parent` map (`visited[node] = parentNode`) alongside the queue to trace back the shortest path after finding the end. Without it, you can never draw the path. This is the main missing piece in Phase 2.
- **sqSide timing bug:** `sqSide` is only set when `fillRectMaze()` runs. If Start is clicked before Generate Maze, `drawVisited` breaks. Fix: set sqSide in `initialGridDraw()` too, or auto-call generateMaze on first Start.
- **Double-BFS bug:** clicking Stop then Start spawns a new `bfs()` while the old one is paused, creating two concurrent loops on the same canvas. Fix: add a guard (e.g., a separate `hasAlgoStarted` boolean) to block re-entry while a loop is alive.
- **Negative bounds not checked:** BFS checks `partX < maze[0].length` but not `partX >= 0`. Safe now because border walls prevent reaching col 0 / row 0, but will break on a maze without full border walls.
- **Multi-instance (Phase 4):** Everything is ID-based (`main-grid`, `algo-picker`, etc.). Multiple instances will require parameterizing all these references — likely a class-based `MazeInstance` approach. Know this is coming.
- **`algoPause` duplicate:** remove it from mainAlgo.js, just use the global `pause()` from drawCanvas.js.
- **+/− and Clear buttons:** not wired up yet.
- **Mouse drawing (click to place walls):** low priority, can be skipped if time is tight.

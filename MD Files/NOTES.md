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
- Next session: implement BFS on the maze array.

---

## Code Function Hierarchy

```
mazeGen.js
  maze[][]                  ← 2D array, source of truth (0=open, 1=wall, 100=start, -100=end)
  generateMaze()            ← calls fillRectMaze() to kick off render

drawCanvas.js
  rowColumnList             ← maps difficulty → [cols, rows]
  initialGridDraw()         ← reads difficulty picker, sizes canvas, draws grid lines
    └── reads rowColumnList
    └── reads window.innerWidth
  pause(ms)                 ← returns a Promise that resolves after ms milliseconds
  fillRectMaze()  [async]   ← loops maze[][], draws each cell with correct color + await pause()
    └── reads maze          ← from mazeGen.js (shared global scope)
    └── calls pause()
```

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
- BFS node representation during search — track visited as a separate array, or mark directly in `maze[][]`? (Separate array is cleaner — don't mutate the maze)
- Multi-instance implementation: `MazeInstance` class in JS, each with its own canvas, all reading shared `maze[][]`
- Mouse drawing (click to place walls) — low priority, can be skipped if time is tight

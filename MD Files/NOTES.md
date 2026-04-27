# Notes & Decisions Log

_A running reference for Binwa — decisions made, concepts explained, function hierarchy, session summaries._

---

## Decisions Log
_(Each entry: date + what was decided + why)_

| Date | Decision | Reason |
|------|----------|--------|
| 2026-04-20 | Project planning finalized, MD system set up | Starting fresh, capstone begins |
| 2026-04-21 | Vanilla JS over React | No framework needed — adds complexity with no benefit for this project |
| 2026-04-21 | Canvas over DOM (divs/tables) for grid rendering | DOM with 4 instances × ~2000 cells would be too slow to animate |
| 2026-04-21 | Fixed canvas size (not responsive) | Resizing mid-algorithm would invalidate the run; visualizers don't need to be mobile-friendly |
| 2026-04-22 | 2D JS array is source of truth; canvas is just the renderer | Keeps algorithm logic fully separate from drawing logic — algorithms never touch the canvas |
| 2026-04-22 | All instances share one `mazeState` object | User draws walls once; all instances read the same grid and run their algorithms independently |

---

## Session Summaries
_(Short recap at the end of each session — "what happened today")_

### 2026-04-20
- First session. Set up full MD tracking system (CLAUDE.md, CONTEXT.md, NOTES.md, PROGRESS.md).
- Reviewed prior context and project plan. No code written yet.
- Confirmed approach: Claude acts as tutor/mentor, not code writer.
- Ready to begin Phase 1 next session.

### 2026-04-21
- Built full dark mode navbar: Start, Stop, Clear, +/− instance counter, difficulty picker.
- Decided on vanilla JS (no React). Canvas-based rendering confirmed over DOM grid.
- Learned: script tag placement, bracket vs dot notation, CSS variables, flexbox layout.

### 2026-04-22
- `drawCanvas.js` working: canvas draws a grid responsive to window width, driven by difficulty preset.
- Established the core mental model: array = truth, canvas = view, algorithm = operates on array only.
- Learned: canvas API basics, cellSize derivation, align-self for flex canvas fix.
- Next session starts at: pull `cellSize` out as a named variable, then loop maze array to fill wall cells.

---

## Code Function Hierarchy
_(Updated as code gets written — shows how functions relate to each other)_

```
initialDraw()                 ← drawCanvas.js — reads difficulty picker, sets canvas size, draws grid lines
  └── reads rowColumnList     ← object mapping difficulty → [cols, rows]
  └── reads window.innerWidth ← for responsive canvas width
```

---

## Concepts Explained
_(Key explanations from sessions — so you don't have to ask twice)_

**Canvas dimensions (HTML attr vs CSS):** Canvas `width`/`height` HTML attributes set the drawing resolution. CSS `width`/`height` just scales the pixels visually — this distorts your grid. Always set canvas size via attributes (or `c.width = ...` in JS), never via CSS.

**Array-canvas separation:** The 2D grid array (`grid[row][col]`) is the source of truth. The canvas only reads it and draws colors. Algorithms only read/write the array. This separation means multiple canvases can show the same maze running different algorithms simultaneously.

**cellSize:** Derived as `gridWidth / numCols`. Every canvas operation (drawing lines, filling cells, converting mouse clicks to row/col) uses this number. It should be a named variable, not recalculated inline.

---

## Open Questions / Things to Decide
- How to represent a node in the grid array — `{ type: 'wall' | 'open' | 'visited' | 'path' }` object, or just integers?
- When implementing multi-instance: generate instance cards fully in JS (`MazeInstance` class) — hardcoded HTML duplicates don't work because IDs must be unique
- Mouse drawing (click to place walls) — low priority, can be added after algorithms work

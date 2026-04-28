# Progress Tracker

_For Binwa's teacher — daily log of what was built, decided, or learned._

---

## Summary Table

| Date | Phase | What Was Done |
|------|-------|---------------|
| 2026-04-20 | Setup | Project planning, MD tracking system initialized |
| 2026-04-21 | Phase 1 | Dark mode navbar built (Start, Stop, Clear, +/-, difficulty picker) |
| 2026-04-22 | Phase 1 | Canvas grid rendering working — draws responsive grid from difficulty presets |
| 2026-04-27 | Phase 1 | Maze array connected, cell coloring working, reveal animation implemented |

---

## Daily Logs

### 2026-04-20 — Project Setup
**Phase:** Pre-development / Planning

**What was done:**
- Defined full project scope: pathfinding visualizer with BFS, Dijkstra's, A*
- Planned 4 standout features: algorithm battle mode, maze generation, weighted terrain, real map mode
- Created phased build plan
- Set up project documentation system (CLAUDE.md, CONTEXT.md, NOTES.md, PROGRESS.md)

**What was learned:**
- Project architecture planning: how to break a large build into phases
- Why phased development matters — ship something working early, layer complexity on top

**Next up:** Phase 1 — build the grid and canvas rendering

---

### 2026-04-21 — Navbar
**Phase:** 1 — Foundation

**What was done:**
- Built dark mode navbar with Start, Stop, Clear buttons and +/− instance counter
- Added difficulty picker (Easy / Medium / Hard / Crazy) to navbar
- Established CSS variable system for dark theme (--bg, --surface, --border, --text, etc.)
- Decided on vanilla JS over React — no framework needed for this project

**What was learned:**
- CSS flexbox for navbar layout
- CSS custom properties (variables) for theming
- Why `<script>` tag must go before `</body>`, not in `<head>` — DOM must exist before JS runs
- Bracket notation vs dot notation for dynamic object key access (`obj[variable]` vs `obj.key`)

**Next up:** Canvas grid rendering

---

### 2026-04-22 — Canvas Grid
**Phase:** 1 — Foundation

**What was done:**
- `drawCanvas.js`: canvas draws a responsive grid driven by difficulty preset
- Difficulty picker triggers live grid redraw
- Added resize warning event listener

**What was learned:**
- Canvas API basics: `getContext("2d")`, `moveTo`, `lineTo`, `stroke`
- Why canvas size must be set in JS, not CSS
- `cellSize` derivation: `gridWidth / numCols`
- `align-self: center` fixes canvas stretching inside flex column container
- `ctx.translate(0.5, 0.5)` for crisp grid lines

**Next up:** Connect maze array to draw function

---

### 2026-04-27 — Maze Array + Cell Coloring + Animation
**Phase:** 1 — Foundation

**What was done:**
- `drawCanvas.js`: canvas draws a responsive grid driven by difficulty preset (easy=20×12, medium=40×24, hard=60×36, crazy=100×60)
- Difficulty picker triggers live grid redraw
- `mazeGen.js` created: hardcoded maze array with full border walls, interior corridors, start (100) and end (-100) nodes
- `fillRectMaze()` reads the maze array and colors each cell: white=wall, red=start, green=end
- Reveal animation implemented using `async/await` + `pause()` — maze appears cell by cell, left to right, row by row
- Fixed `ctx.rect` → `ctx.fillRect` bug (all cells were taking the last color set)
- Added `ctx.translate(0.5, 0.5)` for crisp grid lines

**What was learned:**
- Canvas API: `fillRect`, `getContext`, `translate`, difference between path-based and immediate drawing
- Why CSS must not set canvas width/height (distorts resolution)
- `async/await` and Promises — how to make a loop wait between iterations
- Canvas scales better than DOM for animation-heavy use cases

**Next up:** Phase 2 — implement BFS, animate it visiting cells step by step, draw the final path

---

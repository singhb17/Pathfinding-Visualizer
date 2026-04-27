# Progress Tracker

_For Binwa's teacher — daily log of what was built, decided, or learned._

---

## Summary Table

| Date | Phase | What Was Done |
|------|-------|---------------|
| 2026-04-20 | Setup | Project planning, MD tracking system initialized |
| 2026-04-21 | Phase 1 | Dark mode navbar built (Start, Stop, Clear, +/-, difficulty picker) |
| 2026-04-22 | Phase 1 | Canvas grid rendering working — draws responsive grid from difficulty presets |

---

## Daily Logs

### 2026-04-20 — Project Setup
**Phase:** Pre-development / Planning

**What was done:**
- Defined full project scope: pathfinding visualizer with BFS, Dijkstra's, A*
- Planned 4 standout features: algorithm battle mode, maze generation, weighted terrain, real map mode
- Created 15-week phased build plan
- Set up project documentation system (CLAUDE.md, CONTEXT.md, NOTES.md, PROGRESS.md)

**What was learned:**
- Project architecture planning: how to break a large build into phases
- Why phased development matters — ship something working early, layer complexity on top

**Next up:** Phase 1 — build the grid, clickable walls, start/end node placement

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
- Built `drawCanvas.js` with `initialDraw()` function
- Canvas draws a responsive grid scaled to 50% of window width
- Grid dimensions driven by difficulty preset (`rowColumnList` object with easy/medium/hard/crazy)
- Difficulty picker in navbar triggers `initialDraw()` on change — grid redraws live
- Added resize event listener with warning alert

**What was learned:**
- Canvas API basics: `getContext("2d")`, `moveTo`, `lineTo`, `stroke`
- Why canvas size must be set via HTML attributes, not CSS (CSS scales pixels, doesn't set resolution)
- How `cellSize` is derived: `gridWidth / numCols`
- The array-canvas mental model: 2D JS array is the truth, canvas just draws what the array says
- Why `align-self: center` fixes canvas stretching inside a flex column container

**Next up:** Connect a hardcoded maze array (0s and 1s) to the draw function — wall cells render as filled rectangles, open cells stay empty

---

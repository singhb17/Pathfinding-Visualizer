# Project Context — Pathfinding Visualizer

_Last updated: 2026-04-27_

---

## What We're Building
An interactive **pathfinding visualizer** — CLC capstone project at Semiahmoo Secondary (Grade 11) and a CS portfolio piece for UBC application.

Users will be able to:
- Watch pathfinding algorithms animate step by step on a maze
- Race multiple algorithms side by side on the same maze (battle mode)
- Choose difficulty (Easy / Medium / Hard / Crazy) which changes grid size
- Generate mazes procedurally
- Use weighted terrain (different movement costs per node)
- Eventually plug in real OpenStreetMap data

---

## Tech Stack
- **Frontend:** HTML + CSS + Vanilla JavaScript
- **Rendering:** Canvas API (one `<canvas>` per instance)
- **Deployment:** GitHub Pages
- **Map data (Phase 7):** OpenStreetMap API

---

## Algorithms Planned
| Algorithm | Notes |
|-----------|-------|
| BFS | Unweighted, guarantees shortest path |
| Dijkstra's | Weighted, guarantees shortest path |
| A* | Weighted + heuristic, fastest in practice |

---

## Build Plan
| Phase | Focus | Status |
|-------|-------|--------|
| 1 | Foundation — grid, canvas rendering, maze array, reveal animation | In progress |
| 2 | First algorithm — BFS + step animation | Not started |
| 3 | More algorithms — Dijkstra's, A* | Not started |
| 4 | Algorithm battle mode (multi-instance) | Not started |
| 5 | Procedural maze generation | Not started |
| 6 | Weighted terrain | Not started |
| 7 | Real map mode (OpenStreetMap) | Not started |

---

## Current State (2026-04-27)
- Navbar fully built: Start, Stop, Clear, +/− instance counter, difficulty picker
- `drawCanvas.js`: canvas draws responsive grid from difficulty preset, fills wall/start/end cells with color
- `mazeGen.js`: hardcoded maze array (0=open, 1=wall, 100=start, -100=end), full border walls
- `fillRectMaze()` animates the maze reveal using `async/await` + `pause()` helper
- Files: `index.html`, `style.css`, `drawCanvas.js`, `mazeGen.js`
- **Next:** implement BFS — algorithm reads the maze array, marks visited cells, animates step by step

---

## Key Design Decisions
- Vanilla JS, no React
- Canvas API for rendering (one `<canvas>` per instance)
- 2D array (`maze[row][col]`) is source of truth — canvas only reads and draws it, never owns data
- Maze values: `0` = open, `1` = wall, `100` = start, `-100` = end
- All instances share one maze array — each runs its own algorithm independently on the same layout
- Fixed canvas size — not responsive to window resize (intentional, resize invalidates algorithm runs)
- Multi-instance cards must be generated in JS — hardcoded HTML duplicates break because IDs must be unique
- Animation uses `async/await` + `pause(ms)` helper — cleaner than staggered `setTimeout` with index multiplier

# Project Context — Pathfinding Visualizer

_Last updated: 2026-04-22_

---

## What We're Building
An interactive **pathfinding visualizer** — CLC capstone project at Semiahmoo Secondary (Grade 11) and a CS portfolio piece for UBC application.

Users will be able to:
- Draw walls and set start/end points on a grid
- Run pathfinding algorithms and watch them animate step by step
- Race two algorithms side by side (battle mode)
- Generate mazes procedurally
- Use weighted terrain (different movement costs per node)
- Eventually plug in real OpenStreetMap data

---

## Tech Stack
- **Frontend:** HTML + CSS + Vanilla JavaScript (React ruled out — unnecessary complexity)
- **Rendering:** Canvas API (not DOM/divs — too slow for multi-instance animation)
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

## 15-Week Build Plan
| Phase | Focus | Status |
|-------|-------|--------|
| 1 | Foundation — grid, canvas rendering, maze array, start/end nodes | In progress |
| 2 | First algorithm — BFS + step animation | Not started |
| 3 | More algorithms — Dijkstra's, A* | Not started |
| 4 | Algorithm battle mode | Not started |
| 5 | Procedural maze generation | Not started |
| 6 | Weighted terrain | Not started |
| 7 | Real map mode (OpenStreetMap) | Not started |

---

## Current State (2026-04-22)
- Navbar fully built and styled (dark mode, all controls working visually)
- `drawCanvas.js`: canvas draws a responsive grid based on difficulty preset
- Files: `index.html`, `style.css`, `drawCanvas.js`
- Next: connect a hardcoded `maze[][]` array to the draw function so 1s render as wall cells

---

## Key Design Decisions
- Vanilla JS, no React
- Canvas API for rendering (one `<canvas>` per instance)
- 2D array (`grid[row][col]`) is source of truth — canvas only reads and draws it
- All instances share one `mazeState` object (walls/start/end defined once, all algos read it)
- Fixed canvas size — not responsive to window resize (intentional)
- Multi-instance cards must be generated in JS, not hardcoded in HTML (duplicate IDs don't work)


let rowColumnList = {
  "easy": [20, 12],
  "medium": [40, 24],
  "hard": [60, 36],
  "crazy": [100, 60]
}

// Resize Warning
window.addEventListener('resize', function () {
  alert("Please keep page size the same before pressing 'Start' ");
  initialGridDraw();
});

//! Global scope to access in other JS files
let difficulty;
let finalRowColumn;
var c;
var ctx;
let gridWidth;
let gridHeight;

function initialGridDraw() {

  // Difficulty chosen from the select dropdown in the navbar, then the num of rows and columns are fassed to finalRowColumn
  difficulty = document.getElementById("difficulty-picker").value;
  finalRowColumn = rowColumnList[difficulty];

  c = document.getElementById("main-grid");
  ctx = c.getContext("2d");
  ctx.translate(0.5, 0.5);

  gridWidth = Math.floor(window.innerWidth * 0.65);
  gridHeight = gridWidth * 0.6;

  c.width = gridWidth;
  c.height = gridHeight;

  ctx.strokeStyle = "white";

  for (let x = 0; x < gridWidth; x += (gridWidth / finalRowColumn[0])) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, gridHeight);
    ctx.stroke();
  }

  for (let y = 0; y < gridHeight; y += (gridHeight / finalRowColumn[1])) {
    ctx.moveTo(0, y);
    ctx.lineTo(gridWidth, y);
    ctx.stroke();
  }
}

const pause = (ms) => new Promise(res => setTimeout(res, ms));

async function fillRectMaze() {

  let sqSide = gridWidth / finalRowColumn[0];

  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {

        if (maze[y][x] == 1) {
          ctx.fillStyle = "white";
          ctx.fillRect(x * sqSide, y * sqSide, sqSide, sqSide);
          ctx.fill();
        }

        else if (maze[y][x] == 100) {
          ctx.fillStyle = "green";
          ctx.fillRect(x * sqSide, y * sqSide, sqSide, sqSide);
          ctx.fill();
        }

        else if (maze[y][x] == -100) {
          ctx.fillStyle = "red";
          ctx.fillRect(x * sqSide, y * sqSide, sqSide, sqSide);
          ctx.fill();
        }

      await pause(10);
    }
  }
}

initialGridDraw();

let rowColumnList = {
  "easy": [21, 13],
  "medium": [41, 25],
  "hard": [61, 37],
  "crazy": [101, 61]
}

// Resize Warning
// TODO: uncomment this after finishing development
// window.addEventListener('resize', function () {
//   alert("Please keep page size the same before pressing 'Start' ");
//   initialGridDraw();
// });

//! Global scope to access in other JS files
let difficulty;
let finalRowColumn;
var c;
var ctx;
let gridWidth;
let gridHeight;

let sqW;
let sqH;


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

  sqW = gridWidth / finalRowColumn[0];
  sqH = gridHeight / finalRowColumn[1];

  ctx.strokeStyle = "grey";

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

  sqW = gridWidth / finalRowColumn[0];
  sqH = gridHeight / finalRowColumn[1];

  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {

      if (maze[y][x] == 1) {
        ctx.fillStyle = "white";
        ctx.fillRect(x * sqW, y * sqH, sqW, sqH);
        ctx.fill();
      }

      else if (maze[y][x] == 100) {
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(x * sqW, y * sqH, sqW, sqH);
        ctx.fill();
      }

      else if (maze[y][x] == -100) {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(x * sqW, y * sqH, sqW, sqH);
        ctx.fill();
      }

      // await pause(1);
    }
  }
}

function drawVisited(visitedX, visitedY) {
  console.log("VISITED DRAW");

  ctx.fillStyle = "#65cdf0";
  ctx.fillRect(visitedX * sqW, visitedY * sqH, sqW, sqH);
  ctx.fill();

}

async function drawPath(path) {

  for (let i = 0; i < path.length; i++) {
    ctx.fillStyle = "#7365f0";
    ctx.fillRect(path[i][0] * sqW, path[i][1] * sqH, sqW, sqH);
    ctx.fill();
    await pause(25);
  }
}

initialGridDraw();
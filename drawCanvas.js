
let rowColumnList = {
  "easy": [20, 12],
  "medium": [40, 24],
  "hard": [60, 36],
  "crazy": [100, 60]
}

// Resize Warning
window.addEventListener('resize', function() {
    alert("Please keep page size the same before pressing 'Start' ");
    initialDraw();
});

function initialDraw() {

  // Difficulty chosen from the select dropdown in the navbar, then the num of rows and columns are fassed to finalRowColumn
  let difficulty = document.getElementById("difficulty-picker").value;
  let finalRowColumn = rowColumnList[difficulty];

  var c = document.getElementById("main-grid");
  var ctx = c.getContext("2d");

  let gridWidth = Math.floor(window.innerWidth * 0.65);
  let gridHeight = gridWidth * 0.6;

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

initialDraw();
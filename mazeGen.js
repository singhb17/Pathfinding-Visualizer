let maze = [
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // [1, 100, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
  // [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
  // [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1],
  // [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  // [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1],
  // [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
  // [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1],
  // [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
  // [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
  // [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, -100, 1, 1],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

console.log(finalRowColumn);

let maxRow;
let maxColumn;

function generateMaze() {

  maxRow = finalRowColumn[0];
  maxColumn = finalRowColumn[1];

  clearAll();
  for (let y = 0; y < maxColumn; y++) {
    maze[y] = []
    for (let x = 0; x < maxRow; x++) {
      maze[y].push(1);
    }
  }

  // let randX = getRandom(1, maxRow - 2);
  // let randY = getRandom(1, maxColumn - 2);
  let randX = getRandom(0, (maxRow - 3) / 2) * 2 + 1;
  let randY = getRandom(0, (maxColumn - 3) / 2) * 2 + 1;

  console.log("randX: " + randX);
  console.log("randY: " + randY);

  dig(randX, randY);

  if (!hardMaze) {
    for (let y = 1; y < maxColumn - 2; y++) {
      for (let x = 1; x < maxRow - 2; x++) {
        if (getRandom(0, 100) <= 10) {
          maze[y][x] = 0
        }
      }
    }
  }
  
  maze[1][1] = 100;
  maze[maxColumn - 2][maxRow - 2] = -100;
  fillRectMaze();
}

function dig(x, y) {
  let directions = [
    [x, y - 2], //up
    [x, y + 2], //down
    [x - 2, y], //left
    [x + 2, y]  //right
  ]

  directions = shuffle(directions);

  directions.forEach(chosenDirection => {
    digTo(chosenDirection[0], chosenDirection[1], x, y);
  });

}

function digTo(destinationX, destinationY, fromX, fromY) {

  let midX = (destinationX + fromX) / 2;
  let midY = (destinationY + fromY) / 2;

  if (!isWithinBounds(destinationX, destinationY)) {
    return;
  }

  let destination = maze[destinationY][destinationX];
  let mid = maze[midY][midX];

  if ((destination == 1) && (mid == 1)) {
    maze[destinationY][destinationX] = 0;
    maze[midY][midX] = 0;
    dig(destinationX, destinationY);
  }

}

function isWithinBounds(x, y) {
  if ((x < maxRow - 1) && (x > 0)) {
    if ((y < maxColumn - 1) && (y > 0)) {
      return true;
    }
  }
}

function shuffle(array) {
  let temp;

  for (let i = 0; i < array.length; i++) {
    let elem = i;
    let toSwapWith = getRandom(0, array.length - 1);

    temp = array[elem];

    array[elem] = array[toSwapWith];
    array[toSwapWith] = temp;
  }

  return array;
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
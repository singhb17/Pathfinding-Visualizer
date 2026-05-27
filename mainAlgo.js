let battleMode = false;
let algoFinished = true;

async function BFS() {
  algoFinished = false;

  let visited = [];
  let queue = [];
  queue.push('1,1');

  let cameFromList = {}

  while (queue.length > 0) {
    if (!running) {
      await pause(100);
      continue;  // keeps waiting until running becomes true again
    }

    visited.push(queue[0]);
    let parts = queue[0].split(',');
    let QZNS = [Number(parts[0]), Number(parts[1])]; // QZNS: queueZerothNonString

    if (queue[0] != '1,1') {
      drawVisited(QZNS[0], QZNS[1]);
      if (!battleMode) { await pause(10); }
    }

    //! =========================================================
    let up = String(QZNS[0]) + ',' + String(QZNS[1] - 1);
    // console.log(up);
    let down = String(QZNS[0]) + ',' + String(QZNS[1] + 1);
    // console.log(down);
    let left = String(QZNS[0] - 1) + ',' + String(QZNS[1]);
    // console.log(left);
    let right = String(QZNS[0] + 1) + ',' + String(QZNS[1]);
    // console.log(right);
    //! =========================================================

    let possibilities = [up, down, left, right];

    for (let i = 0; i < possibilities.length; i++) {
      let parts = possibilities[i].split(',');
      let partX = Number(parts[0]);
      let partY = Number(parts[1]);

      if (!queue.includes(possibilities[i]) && !visited.includes(possibilities[i])) { //if its in queue or visited already

        // if ((partX < maze[0].length) && (partY < maze.length)) { // if the node is in bounds or not // ! Didnt need this check since the maze is covered with walls an all edge so cant go there anyway cause of the next check
          if (maze[partY][partX] != 1) { // if it is a wall

            queue.push(possibilities[i]);
            cameFromList[possibilities[i]] = queue[0];

            if (maze[partY][partX] == -100) {
              console.log("FOUND END AT: " + partX + ',' + partY);
              queue = [];

              console.log(cameFromList);
              let path = [[partX,partY]];

              while (true) {
                let cameFromString = cameFromList[String(path[0])];
                let AKAAL = cameFromString.split(',');
                let akX = Number(AKAAL[0]);
                let akY = Number(AKAAL[1]);

                let toBePushed = [akX, akY];
                if (String(toBePushed) == '1,1') {
                  path.pop()
                  break;
                }
                
                path.unshift(toBePushed);
              } // backtracking

              drawPath(path);
              stopAlgo();
              break;
            }
          }
        // }
      }
    }
    queue.shift();
  }
  algoFinished = true;
}

let AAAA;
async function DFS() {
  algoFinished = false;

  let visited = [];
  let stack = [];
  stack.push('1,1');
  
  let cameFromList = {}
  
  while (stack.length > 0) {

    let lastInStack = stack.length - 1;
    
    if (!running) {
      await pause(100);
      continue;  // keeps waiting until running becomes true again
    }
    
    let current = stack.pop();

    if (visited.includes(current)){continue;}
    visited.push(current);
    
    let parts = current.split(',');
    let QZNS = [Number(parts[0]), Number(parts[1])]; // QZNS: queueZerothNonString
    
    if (current != '1,1') {
      drawVisited(QZNS[0], QZNS[1]);
      if (!battleMode) { await pause(10); }
    }

    //! =========================================================
    let up = String(QZNS[0]) + ',' + String(QZNS[1] - 1);
    // console.log(up);
    let down = String(QZNS[0]) + ',' + String(QZNS[1] + 1);
    // console.log(down);
    let left = String(QZNS[0] - 1) + ',' + String(QZNS[1]);
    // console.log(left);
    let right = String(QZNS[0] + 1) + ',' + String(QZNS[1]);
    // console.log(right);
    //! =========================================================

    let possibilities = [up, down, left, right];

    for (let i = 0; i < possibilities.length; i++) {
      let parts = possibilities[i].split(',');
      let partX = Number(parts[0]);
      let partY = Number(parts[1]);

      if ((maze[partY][partX] != 1) && !visited.includes(possibilities[i])) { // if it is a wall
        stack.push(possibilities[i]);

        if (!(possibilities[i] in cameFromList)) {
          cameFromList[possibilities[i]] = current;
        }

        if (maze[partY][partX] == -100) {
          console.log("FOUND END AT: " + partX + ',' + partY);
          stack = [];

          console.log(cameFromList);
          let path = [[partX,partY]];

          while (true) {
            let cameFromString = cameFromList[String(path[0])];
            let AKAAL = cameFromString.split(',');
            let akX = Number(AKAAL[0]);
            let akY = Number(AKAAL[1]);

            let toBePushed = [akX, akY];
            if (String(toBePushed) == '1,1') {
              path.pop()
              break;
            }
            
            path.unshift(toBePushed);
          } // backtracking

          drawPath(path);
          stopAlgo();
          break;
        }
      }
    }
  }
  algoFinished = true;
}
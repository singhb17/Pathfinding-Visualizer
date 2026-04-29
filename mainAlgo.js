let battleMode = false;

// const algoPause = (ms) => new Promise(res => setTimeout(res, ms));

async function bfs() {

  let queue = [];
  let visited = [];

  queue.push('1,1');

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
        if ((partX < maze[0].length) && (partY < maze.length)) { // if the node is in bounds or not
          if (maze[partY][partX] != 1) { // if it is a wall

            queue.push(possibilities[i]);

            if (maze[partY][partX] == -100) {
              console.log("FOUND END AT: " + partX + ',' + partY);
              queue = [];
              stopAlgo();
              break;
            }

          }
        }
      }
    }
    queue.shift();
  }
}
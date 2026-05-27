const btn = document.getElementById('start-stop-btn');

let running = false;
let hardMaze = false;

function toggleHardMaze() {
  hardMaze = !hardMaze;
  const hardMazeBtn = document.getElementById('hard-maze-btn');
  if (hardMaze) {
    hardMazeBtn.className = 'btn btn-toggle-hard';
    hardMazeBtn.textContent = 'Hard Maze';
  } else {
    hardMazeBtn.className = 'btn btn-toggle-easy';
    hardMazeBtn.textContent = 'Easy Maze';
  }
}

function startAlgo() {
  btn.textContent = 'Stop';
  btn.className = 'btn btn-red';
  btn.onclick = stopAlgo;
  
  running = true;

  // start logic
  let algoPicked = document.getElementById('algo-picker').value;

  if (algoFinished == true) {
    if (algoPicked == "BFS") {
      BFS();
    }
    
    if (algoPicked == "DFS") {
      DFS();
    }
  } 
  
  // else {
  //   console.log("SORRY OTHER ALGORITHMS NOT AVALIABLE YET!");
  //   stopAlgo();
  // }
}

function stopAlgo() {
  btn.textContent = 'Start';
  btn.className = 'btn btn-green';
  btn.onclick = startAlgo;

  // stop logic
  running = false;
}

function clearAll() {
  stopAlgo();
  algoFinished = true;
  initialGridDraw();
  // location.reload();
}

btn.onclick = startAlgo;

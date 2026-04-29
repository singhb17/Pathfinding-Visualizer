const btn = document.getElementById('start-stop-btn');

let running = false;

function startAlgo() {
  btn.textContent = 'Stop';
  btn.className = 'btn btn-red';
  btn.onclick = stopAlgo;
  
  running = true;

  // start logic
  let algoPicked = document.getElementById('algo-picker').value;

  if (algoPicked == "BFS") {
    bfs();
  } else {
    console.log("SORRY OTHER ALGORITHMS NOT AVALIABLE YET!");
    stopAlgo();
  }
}

function stopAlgo() {
  btn.textContent = 'Start';
  btn.className = 'btn btn-green';
  btn.onclick = startAlgo;

  // stop logic
  running = false;
}


btn.onclick = startAlgo;

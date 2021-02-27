let grid = document.getElementById("grid");
let testMode = false;

const GRID_SIZE = 20;
const BOMB_COUNT = Math.floor(GRID_SIZE * GRID_SIZE * 0.2);

generateGrid();

function generateGrid() {
  grid.innerHTML = "";
  for (let i = 0; i < GRID_SIZE; i++) {
    row = grid.insertRow(i);
    for (let j = 0; j < GRID_SIZE; j++) {
      cell = row.insertCell(j);
      cell.onclick = function () {
        clickCell(this);
      };
      let mine = document.createAttribute("data-mine");
      mine.value = "false";
      cell.setAttributeNode(mine);
    }
  }
  addMines();
}

function addMines() {
  for (let i = 0; i < BOMB_COUNT; i++) {
    let row = Math.floor(Math.random() * GRID_SIZE);
    let col = Math.floor(Math.random() * GRID_SIZE);
    let cell = grid.rows[row].cells[col];
    cell.setAttribute("data-mine", "true");
    if (testMode) cell.innerHTML = "X";
  }
}

function revealMines() {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      let cell = grid.rows[i].cells[j];
      if (cell.getAttribute("data-mine") == "true") cell.className = "mine";
    }
  }
}

function checkLevelCompletion() {
  let levelComplete = true;
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (
        grid.rows[i].cells[j].getAttribute("data-mine") == "false" &&
        grid.rows[i].cells[j].innerHTML == ""
      )
        levelComplete = false;
    }
  }
  if (levelComplete) {
    alert("You Win!");
    revealMines();
  }
}

function clickCell(cell) {
  if (cell.getAttribute("data-mine") == "true") {
    revealMines();
    alert("Game Over");
  } else {
    cell.className = "clicked";
    let mineCount = 0;
    let cellRow = cell.parentNode.rowIndex;
    let cellCol = cell.cellIndex;
    for (
      let i = Math.max(cellRow - 1, 0);
      i <= Math.min(cellRow + 1, GRID_SIZE - 1);
      i++
    ) {
      for (
        let j = Math.max(cellCol - 1, 0);
        j <= Math.min(cellCol + 1, GRID_SIZE - 1);
        j++
      ) {
        if (grid.rows[i].cells[j].getAttribute("data-mine") == "true")
          mineCount++;
      }
    }
    cell.innerHTML = mineCount;
    if (mineCount == 0) {
      for (
        let i = Math.max(cellRow - 1, 0);
        i <= Math.min(cellRow + 1, GRID_SIZE - 1);
        i++
      ) {
        for (
          let j = Math.max(cellCol - 1, 0);
          j <= Math.min(cellCol + 1, GRID_SIZE - 1);
          j++
        ) {
          if (grid.rows[i].cells[j].innerHTML == "")
            clickCell(grid.rows[i].cells[j]);
        }
      }
    }
    checkLevelCompletion();
  }
}

function startSolve() {
  
}
let Opiece, Ipiece, Tpiece, Lpiece, Jpiece, Spiece, Zpiece;

const gameBoard = document.getElementById("GameBoard");

Opiece = {
  class: "OPiece",
  positions: {
    turn0: [
      [0, -1],
      [-1, -1],
      [-1, 0],
    ],
    turn1: [
      [0, -1],
      [-1, -1],
      [-1, 0],
    ],
    turn2: [
      [0, -1],
      [-1, -1],
      [-1, 0],
    ],
    turn3: [
      [0, -1],
      [-1, -1],
      [-1, 0],
    ],
  },
  PivotPos: [2, 6],
};
Ipiece = {
  class: "IPiece",
  positions: {
    turn0: [
      [0, -2],
      [0, -1],
      [0, 1],
    ],
    turn1: [
      [1, 0],
      [-1, 0],
      [-2, 0],
    ],
    turn2: [
      [0, -2],
      [0, -1],
      [0, 1],
    ],
    turn3: [
      [1, 0],
      [-1, 0],
      [-2, 0],
    ],
  },
  PivotPos: [2, 6],
};
Zpiece = {
  class: "ZPiece",
  positions: {
    turn0: [
      [0, -1],
      [-1, 0],
      [1, -1],
    ],
    turn1: [
      [0, -1],
      [1, 0],
      [1, 1],
    ],
    turn2: [
      [0, -1],
      [1, 0],
      [1, 1],
    ],
    turn3: [
      [0, -1],
      [1, 0],
      [1, 1],
    ],
  },
  PivotPos: [2, 6],
};
Spiece = {
  class: "SPiece",
  positions: {
    turn0: [
      [0, -1],
      [1, 0],
      [-1, -1],
    ],
    turn1: [
      [1, 0],
      [0, 1],
      [1, -1],
    ],
    turn2: [
      [0, -1],
      [1, 0],
      [-1, -1],
    ],
    turn3: [
      [1, 0],
      [0, 1],
      [1, -1],
    ],
  },
  PivotPos: [2, 6],
};
Jpiece = {
  class: "JPiece",
  positions: {
    turn0: [
      [-1, 0],
      [1, -1],
      [1, 0],
    ],
    turn1: [
      [0, 1],
      [1, 1],
      [0, -1],
    ],
    turn2: [
      [-1, 1],
      [0, -1],
      [0, 1],
    ],
    turn3: [
      [-1, -1],
      [0, -1],
      [0, 1],
    ],
  },
  PivotPos: [2, 6],
};
Lpiece = {
  class: "LPiece",
  positions: {
    turn0: [
      [-1, 0],
      [1, 0],
      [-1, -1],
    ],
    turn1: [
      [0, 1],
      [1, -1],
      [0, -1],
    ],
    turn2: [
      [1, 1],
      [-1, 0],
      [1, 0],
    ],
    turn3: [
      [0, 1],
      [0, -1],
      [-1, 1],
    ],
  },
  PivotPos: [2, 6],
};
Tpiece = {
  class: "TPiece",
  positions: {
    turn0: [
      [0, -1],
      [1, 0],
      [-1, 0],
    ],
    turn1: [
      [1, 0],
      [0, 1],
      [0, -1],
    ],
    turn2: [
      [1, 0],
      [-1, 0],
      [0, 1],
    ],
    turn3: [
      [0, 1],
      [0, -1],
      [-1, 0],
    ],
  },
  PivotPos: [2, 6],
};

const Blocks = [Ipiece, Opiece, Tpiece, Spiece, Zpiece, Lpiece, Jpiece];
let BlocksDroped = [[5, -1]],
  currentBlock,
  rotation = 0;

const GAME_SPEED = 3;
let lastRenderTime;
GameLoop();

function GameLoop(currentTime) {
  window.requestAnimationFrame(GameLoop);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / GAME_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

function update() {
  if (currentBlock == null) {
    let index = Math.floor(Math.random() * (Blocks.length - 1));
    currentBlock = { ...Blocks[index] };
  }
}

function draw() {
  gameBoard.innerHTML = "";

  for (let i = 0; i < currentBlock.positions.turn0.length; i++) {
    let TempObj = { ...currentBlock }, TempPos;

    if (rotation == 0) {
      TempPos = TempObj.positions.turn0;
    } else if (rotation == 90) {
      TempPos = TempObj.positions.turn1;
    } else if (rotation == 180) {
      TempPos = TempObj.positions.turn2;
    } else if (rotation == 270) {
      TempPos = TempObj.positions.turn3;
    }

    for (let j = 0; j < TempPos.length; j++) {
      console.log(currentBlock);
      TempPos[j][0] += TempObj.PivotPos[0];
      TempPos[j][1] += TempObj.PivotPos[1];
    }

    for (let j = 0; j < TempPos.length; j++) {
      const TempBlock = document.createElement("div");
      TempBlock.style.gridRowStart = TempPos[j][1];
      TempBlock.style.gridColumnStart = TempPos[j][0];
      TempBlock.classList.add("IPiece");
      gameBoard.appendChild(TempBlock);
    }
  }

  for (let i = 0; i < BlocksDroped.length; i++) {
    let TempPos = BlocksDroped[i];
    const TempBlock = document.createElement("div");
    TempBlock.style.gridRowStart = TempPos[1];
    TempBlock.style.gridColumnStart = TempPos[0];
    TempBlock.classList.add("IPiece");
    gameBoard.appendChild(TempBlock);
  }
}

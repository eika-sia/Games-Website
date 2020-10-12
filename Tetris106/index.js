const gameBoard = document.getElementById("GameBoard");

class Opiece {
  class = "OPiece";
  positions = {
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
  }
  PivotPos = [2, 6];
};
class Ipiece {
  class = "IPiece";
  positions = {
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
  }
  PivotPos = [2, 6];
};
class Zpiece {
  class = "ZPiece"
  positions = {
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
  }
  PivotPos = [2, 6];
};
class Spiece {
  class = "SPiece"
  positions = {
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
  }
  PivotPos = [2, 6]
};
class Jpiece {
  class = "JPiece";
  positions = {
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
  };
  PivotPos = [2, 6]; 
};
class Lpiece {
  class = "LPiece";
  positions = {
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
  };
  PivotPos = [2, 6];
}
class Tpiece {
  class = "TPiece";
  positions = {
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
  };
  PivotPos = [2, 6];
}

const Blocks = [new Ipiece, new Opiece, new Tpiece, new Spiece, new Zpiece, new Lpiece, new Jpiece];
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
    currentBlock = Blocks[index];
  }
}

function draw() {
  gameBoard.innerHTML = "";

  for (let i = 0; i < currentBlock.positions.turn0.length; i++) {
    let TempObj = { ...currentBlock },
      TempPos = [];

    if (rotation == 0) {
      TempPos = TempObj.positions.turn0;
    } else if (rotation == 90) {
      TempPos = TempObj.positions.turn1;
    } else if (rotation == 180) {
      TempPos = TempObj.positions.turn2;
    } else if (rotation == 270) {
      TempPos = TempObj.positions.turn3;
    }

    TempPos.map((x) => x.slice());

    for (let j = 0; j < TempPos.length; j++) {
      TempPos[j][0] += TempObj.PivotPos[0];
      TempPos[j][1] += TempObj.PivotPos[1];
    }

    for (let j = 0; j < TempPos.length; j++) {
      console.log(TempPos[j]);
      let TempBlock = document.createElement("div");
      TempBlock.style.gridRowStart = TempPos[j][1];
      TempBlock.style.gridColumnStart = TempPos[j][0];
      TempBlock.classList.add("IPiece");
      gameBoard.appendChild(TempBlock);
    }
  }
}

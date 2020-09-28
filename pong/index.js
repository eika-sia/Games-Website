let canvas, ctx;
let playerLeft, playerRight, ball;
const GAME_SPEED = 75;
let lastRenderTime = 0;
let direction = { x: 1, y: 0 };
let keyMap = [];

function init() {
  canvas = document.getElementById("gameBoard");
  ctx = canvas.getContext("2d");

  playerLeft = new Rectangle(10, 50, 10, 30, "white", 0);
  playerLeft.draw();

  ball = new Circle(150, 65, 2, "white", "white", 0);
  ball.draw();

  playerRight = new Rectangle(280, 50, 10, 30, "white", 0);
  playerRight.draw();

  gameLoop();
}

function gameLoop(currentTime) {
  window.requestAnimationFrame(gameLoop);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / GAME_SPEED) return;

  lastRenderTime = currentTime;

  update();
}

function update() {
  move();

  ctx.clearRect(0, 0, 300, 150);

  playerLeft.draw();
  playerRight.draw();

  ball.x += direction.x;
  ball.y += direction.y;

  if (
    RectCircleColliding(ball, playerRight) ||
    RectCircleColliding(ball, playerLeft)
  ) {
    if (direction.x == 0) {
      direction.x = 0;
    } else if (direction.x == 1) {
      direction.x = -1;
    } else if (direction.x == -1) {
      direction.x = 1;
    }

    if (direction.y == 0) {
      direction.y = 0;
    } else if (direction.y == 1) {
      direction.y = -1;
    } else if (direction.y == -1) {
      direction.y = 1;
    }

    ball.x += direction.x * 2;
    ball.y += direction.y * 2;
  }

  ball.draw();

  //console.log(RectCircleColliding(ball, playerRight));
}

function move() {
  // S 83, W 87, arrowDown 40,  arrowUp 38
  if(keyMap['s']) {
    playerLeft.y += 1;
    if (playerLeft.y+playerLeft.height > canvas.height) {
      playerLeft.y -= 1;
    }
  }
  if(keyMap['w']) {
    playerLeft.y -= 1;
    if (playerLeft.y < 0) {
      playerLeft.y += 1;
    }
  }
  if (keyMap['ArrowUp']) {
    playerRight.y -= 1;
    if (playerRight.y < 0) {
      playerRight.y += 1;
    }
  }
  if (keyMap['ArrowDown']) {
    playerRight.y += 1;
    if (playerRight.y+playerRight.height > canvas.height) {
      playerRight.y -= 1;
    }
  }
}

document.addEventListener('keydown', (event) => {
  keyMap[event.key] = true;
});
document.addEventListener('keyup', (event) => {
  delete keyMap[event.key];
});

function RectCircleColliding(circle, rect) {
  var distX = Math.abs(circle.x - rect.x - rect.width / 2);
  var distY = Math.abs(circle.y - rect.y - rect.height / 2);

  if (distX > rect.width / 2 + circle.r) {
    return false;
  }
  if (distY > rect.height / 2 + circle.r) {
    return false;
  }

  if (distX <= rect.width / 2) {
    return true;
  }
  if (distY <= rect.height / 2) {
    return true;
  }

  var dx = distX - rect.width / 2;
  var dy = distY - rect.height / 2;
  return dx * dx + dy * dy <= circle.r * circle.r;
}

document.addEventListener("DOMContentLoaded", init);

class Rectangle {
  constructor(
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    fillColor = "",
    strokeColor = "",
    strokeWidth = 2
  ) {
    this.x = Number(x);
    this.y = Number(y);
    this.width = Number(width);
    this.height = Number(height);
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
  }

  get area() {
    return this.width * this.height;
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.y + this.height;
  }

  draw() {
    // destructuring
    const { x, y, width, height, fillColor, strokeColor, strokeWidth } = this;

    ctx.save();

    ctx.fillStyle = fillColor;
    ctx.lineWidth = strokeWidth;

    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.rect(x, y, width, height);

    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }
}

class Circle {
  constructor(
    x = 0,
    y = 0,
    radius = 0,
    fillColor = "",
    strokeColor = "",
    strokeWidth = 2
  ) {
    this.x = Number(x);
    this.y = Number(y);
    this.r = radius;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
  }

  get area() {
    return Math.floor(this.r * this.r * Math.PI);
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.r;
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.y + this.radius;
  }

  get radius() {
    return this.r;
  }

  draw() {
    // destructuring
    const { x, y, radius, fillColor, strokeColor, strokeWidth } = this;

    ctx.save();

    ctx.fillStyle = fillColor;
    ctx.lineWidth = strokeWidth;

    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);

    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }
  move({ xNew, yNew }) {
    const { x, y, radius, fillColor, strokeColor, strokeWidth } = this;

    this.fillColor = "black";
    this.strokeColor = "black";

    ctx.save();

    ctx.fillStyle = fillColor;
    ctx.lineWidth = strokeWidth;

    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);

    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }
}

let canvas = document.querySelector("#game");
let ctx = canvas.getContext("2d");
let keyMap = [];
let objectsOnTheShithole = [];
let deadStuff = [];

let scoreElm = document.getElementById("score");

const shoot = new Audio("./music/Randomize.wav");
shoot.volume = "0.3";
const destroy = new Audio("./music/Randomize6.wav");
destroy.volume = "0.3";

const death = new Audio("./music/Randomize7.wav");
death.volume = "0.3";

const GAME_SPEED = 120;
let lastRenderTime = 0;

//? ASTEROID SHOOTER PLAYER
class player {
  constructor(startingX, startingY, height, width, speed, initDir, turnSpeed) {
    this.x = startingX;
    this.y = startingY;
    this.h = height;
    this.w = width;
    this.s = speed;
    this.dir = initDir;
    this.tS = turnSpeed;
  }

  draw() {
    ctx.restore();
    let x, y;
    ctx.strokeStyle = "#FFF";
    ctx.beginPath();
    x = this.x + Math.cos(this.dir * (Math.PI / 180)) * this.h;
    y = this.y + Math.sin(this.dir * (Math.PI / 180)) * this.h;
    ctx.moveTo(x, y);
    x = this.x + Math.cos((this.dir + 90) * (Math.PI / 180)) * (this.w / 2);
    y = this.y + Math.sin((this.dir + 90) * (Math.PI / 180)) * (this.w / 2);
    ctx.lineTo(x, y);
    x = this.x + Math.cos((this.dir + 270) * (Math.PI / 180)) * (this.w / 2);
    y = this.y + Math.sin((this.dir + 270) * (Math.PI / 180)) * (this.w / 2);
    ctx.lineTo(x, y);
    ctx.closePath();

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#FFF";
    ctx.stroke();

    ctx.fillStyle = "#FFF";
    ctx.fill();
  }

  clear() {
    let x, y;
    ctx.beginPath();
    x = this.x + Math.cos(this.dir * (Math.PI / 180)) * this.h;
    y = this.y + Math.sin(this.dir * (Math.PI / 180)) * this.h;
    ctx.moveTo(x, y);
    x = this.x + Math.cos((this.dir + 90) * (Math.PI / 180)) * (this.w / 2);
    y = this.y + Math.sin((this.dir + 90) * (Math.PI / 180)) * (this.w / 2);
    ctx.lineTo(x, y);
    x = this.x + Math.cos((this.dir + 270) * (Math.PI / 180)) * (this.w / 2);
    y = this.y + Math.sin((this.dir + 270) * (Math.PI / 180)) * (this.w / 2);
    ctx.lineTo(x, y);
    ctx.closePath();

    ctx.lineWidth = 8;
    ctx.strokeStyle = "rgb(11, 11, 29)";
    ctx.stroke();

    ctx.fillStyle = "rgb(11, 11, 29)";
    ctx.fill();
  }

  move() {
    if (keyMap["w"]) {
      let dir = this.dir,
        speed = this.s,
        x = this.x,
        y = this.y;
      x = x + Math.cos(dir * (Math.PI / 180)) * speed;
      y = y + Math.sin(dir * (Math.PI / 180)) * speed;
      if (
        x < canvas.width - this.s &&
        y < canvas.height - this.s / 2 &&
        0 < x &&
        0 + this.w / 2 < y
      ) {
        this.x = x;
        this.y = y;
      }
      this.draw();
    }
    if (keyMap["s"]) {
      let dir = this.dir,
        speed = this.s,
        x = this.x,
        y = this.y;
      x = x - Math.cos(dir * (Math.PI / 180)) * speed;
      y = y - Math.sin(dir * (Math.PI / 180)) * speed;
      if (
        x < canvas.width - this.s &&
        y < canvas.height - this.s &&
        0 < x &&
        0 + this.w / 2 < y
      ) {
        this.x = x;
        this.y = y;
      }
      this.draw();
    }
    if (keyMap["a"]) {
      if (this.dir - this.tS < 0) {
        this.dir = 360 - this.tS;
      } else {
        this.dir -= this.tS;
      }
    }
    if (keyMap["d"]) {
      if (this.dir + this.tS > 360) {
        this.dir = this.tS;
      } else {
        this.dir += this.tS;
      }
    }
    if (keyMap[" "]) {
      if (shot == 1) {
        objectsOnTheShithole.push(
          new ShootyMcShoot(
            theFucker.x,
            theFucker.y,
            20,
            5,
            10,
            theFucker.dir,
            0
          )
        );
        shot = 0;
        shoot.pause();
        shoot.currentTime = 0;
        shoot.play();
      }
    }
    this.draw();
    this.isCol();
  }
  isCol() {
    objectsOnTheShithole.forEach((obj) => {
      if (obj instanceof Asteroids) {
        let ast = [obj.x, obj.x + obj.w, obj.y, obj.y + obj.h];
        let line = [
          [
            this.x + Math.cos((this.dir + 90) * (Math.PI / 180)) * (this.w / 2),
            this.y + Math.sin((this.dir + 90) * (Math.PI / 180)) * (this.w / 2),
          ],
          [
            this.x +
              Math.cos((this.dir + 270) * (Math.PI / 180)) * (this.w / 2),
            this.y +
              Math.sin((this.dir + 270) * (Math.PI / 180)) * (this.w / 2),
          ],
          [
            this.x + Math.cos(this.dir * (Math.PI / 180)) * this.h,
            this.y + Math.sin(this.dir * (Math.PI / 180)) * this.h,
          ],
        ];
        line.forEach((point) => {
          if (
            point[0] > ast[0] &&
            point[0] < ast[1] &&
            point[1] > ast[2] &&
            point[1] < ast[3]
          ) {
            death.pause();
            death.currentTime = 0;
            death.play();
            for (let i = 0; i < objectsOnTheShithole.length; i++) {
              if (
                JSON.stringify(this) == JSON.stringify(objectsOnTheShithole[i])
              ) {
                if (confirm(`You had ${scoreElm.innerHTML} points, click ok to retry, cancel for main page`)) {
                  location.reload();
                } else {
                  window.location = "../HomePage.html";
                }
              }
            }
            for (let i = 0; i < objectsOnTheShithole.length; i++) {
              if (
                JSON.stringify(obj) == JSON.stringify(objectsOnTheShithole[i])
              ) {
                objectsOnTheShithole.splice(i, 1);
                deadStuff.push(obj);
                return this.isCol();
              }
            }
          }
        });
      }
    });
  }
}

//? ASTEROIDS

class Asteroids {
  constructor(startingX, startingY, height, width, speed, initDir, turnSpeed) {
    this.x = startingX;
    this.y = startingY;
    this.h = height;
    this.w = width;
    this.s = speed;
    this.dir = initDir;
    this.tS = turnSpeed;
  }

  draw() {
    ctx.restore();
    ctx.fillStyle = "#FAF";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#FAF";

    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  clear() {
    ctx.fillStyle = "rgb(11, 11, 29)";
    ctx.lineWidth = 8;

    ctx.beginPath();
    ctx.strokeStyle = "rgb(11, 11, 29)";
    ctx.rect(this.x, this.y, this.w, this.h);

    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  move() {
    let dir = this.dir,
      speed = this.s,
      x = this.x,
      y = this.y;
    x = x + Math.cos(dir * (Math.PI / 180)) * speed;
    y = y + Math.sin(dir * (Math.PI / 180)) * speed;
    if (
      x < canvas.width - this.s &&
      y < canvas.height - this.s / 2 &&
      0 < x &&
      0 + this.w / 2 < y
    ) {
      this.x = x;
      this.y = y;
    } else {
      for (let i = 0; i < objectsOnTheShithole.length; i++) {
        if (JSON.stringify(this) == JSON.stringify(objectsOnTheShithole[i])) {
          objectsOnTheShithole.splice(i, 1);
          deadStuff.push(this);
        }
      }
    }
    this.draw();
  }
}

//? LASERS

class ShootyMcShoot {
  constructor(startingX, startingY, height, width, speed, initDir, turnSpeed) {
    this.x = startingX;
    this.y = startingY;
    this.h = height;
    this.w = width;
    this.s = speed;
    this.dir = initDir;
    this.tS = turnSpeed;
  }

  draw() {
    ctx.restore();
    ctx.fillStyle = "#FAA";
    ctx.lineWidth = this.w;

    ctx.strokeStyle = "#FAA";
    ctx.beginPath();
    let x = this.x + Math.cos(this.dir * (Math.PI / 180)) * this.h;
    let y = this.y + Math.sin(this.dir * (Math.PI / 180)) * this.h;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();

    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#FFF";
  }

  clear() {
    ctx.fillStyle = "#0B0B1D";
    ctx.lineWidth = this.w + 5;

    ctx.strokeStyle = "#0B0B1D";
    let x = this.x + Math.cos(this.dir * (Math.PI / 180)) * this.h;
    let y = this.y + Math.sin(this.dir * (Math.PI / 180)) * this.h;
    ctx.moveTo(x, y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();

    ctx.restore();
  }

  move() {
    let dir = this.dir,
      speed = this.s,
      x = this.x,
      y = this.y;
    x = x + Math.cos(dir * (Math.PI / 180)) * speed;
    y = y + Math.sin(dir * (Math.PI / 180)) * speed;
    if (
      x < canvas.width - this.s &&
      y < canvas.height - this.s / 2 &&
      0 < x &&
      0 + this.w / 2 < y
    ) {
      this.x = x;
      this.y = y;
    } else {
      for (let i = 0; i < objectsOnTheShithole.length; i++) {
        if (JSON.stringify(this) == JSON.stringify(objectsOnTheShithole[i])) {
          objectsOnTheShithole.splice(i, 1);
          deadStuff.push(this);
        }
      }
    }
    this.draw();
    this.isCol();
  }
  isCol() {
    objectsOnTheShithole.forEach((obj) => {
      if (obj instanceof Asteroids) {
        let ast = [obj.x, obj.x + obj.w, obj.y, obj.y + obj.h];
        let line = [
          [this.x, this.y],
          [
            this.x + Math.cos(this.dir * (Math.PI / 180)) * this.h,
            this.y + Math.sin(this.dir * (Math.PI / 180)) * this.h,
          ],
        ];
        line.forEach((point) => {
          if (
            point[0] > ast[0] &&
            point[0] < ast[1] &&
            point[1] > ast[2] &&
            point[1] < ast[3]
          ) {
            destroy.pause();
            destroy.currentTime = 0;
            destroy.play();
            scoreElm.innerHTML = Number(scoreElm.innerHTML) + 100
            for (let i = 0; i < objectsOnTheShithole.length; i++) {
              if (
                JSON.stringify(this) == JSON.stringify(objectsOnTheShithole[i])
              ) {
                objectsOnTheShithole.splice(i, 1);
                deadStuff.push(this);
              }
            }
            for (let i = 0; i < objectsOnTheShithole.length; i++) {
              if (
                JSON.stringify(obj) == JSON.stringify(objectsOnTheShithole[i])
              ) {
                objectsOnTheShithole.splice(i, 1);
                deadStuff.push(obj);
                return this.isCol();
              }
            }
          }
        });
      }
    });
  }
}

//? MOVEMENT SCRIPT

document.addEventListener("keydown", (event) => {
  keyMap[event.key] = true;
});
document.addEventListener("keyup", (event) => {
  delete keyMap[event.key];
});

//? UPDATE LOOP
function gameLoop(currentTime) {
  window.requestAnimationFrame(gameLoop);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / GAME_SPEED) return;

  lastRenderTime = currentTime;

  update();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgb(11, 11, 29)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  objectsOnTheShithole.forEach((obj) => obj.move());
  deadStuff.forEach((obj) => obj.clear());
  deadStuff = [];
}

//? INIT
let theFucker = new player(
  canvas.width / 2,
  canvas.height / 2,
  20,
  15,
  5,
  0,
  3
);
objectsOnTheShithole.push(theFucker);
ctx.fillStyle = "rgb(11, 11, 29)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

setInterval(() => {
  let as = new Asteroids(
    Math.floor(Math.random() * (1000 - 5) + 5),
    Math.random() > 0.5 ? 5 : 995,
    Math.floor(Math.random() * (30 - 10) + 10),
    Math.floor(Math.random() * (30 - 10) + 10),
    Math.floor(Math.random() * (10 - 1) + 1),
    Math.floor(Math.random() * (360 - 0) + 0),
    1.5
  );
  objectsOnTheShithole.push(as);
}, 200);

let shot = 1;

setInterval(() => {
  shot = 1;
}, 300);

gameLoop();

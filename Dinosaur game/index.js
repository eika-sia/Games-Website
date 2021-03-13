let canvas = document.querySelector("#game");
let ctx = canvas.getContext("2d");
let keyMap = [];

let scoreElm = document.getElementById("score");

const GAME_SPEED = 120;
let lastRenderTime = 0;
const GRAVITY = 0.5;

let shitsNobodyWantsOrNeedsButStillExistForSomeReasonButIdontFuckingKnowWhySoDealWithItAndDontComplainItsNotALongNameJustForAListOfObjectsThatExistOnThatFuckingPlaneItsNotLikeSomeoneIsGonnaSeeThisAnywayButIJustWantToTellYouReaderIsThatYouWastedASurprisingAmountOfTimeBecauseItsALongName = [];

let reset = true;

//? THE FUCKER 2 ELECTIC BOOGALOO

class hopper {
  constructor(h, w, hop) {
    this.h = h;
    this.w = w;
    this.hop = hop;
    this.x = 200;
    this.y = (canvas.width / 5) * 4 - 3 - this.h;
    this.hs = 0;
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

  move() {
    if (keyMap[" "] || keyMap["w"]) {
      if (this.y == (canvas.width / 5) * 4 - 3 - this.h) {
        this.hs += this.hop;
      }
    }
    this.y -= this.hs;
    if (this.y < (canvas.width / 5) * 4 - 3 - this.h) {
      this.hs -= GRAVITY;
    }

    if (this.y > (canvas.width / 5) * 4 - 3 - this.h) {
      this.hs = 0;
      this.y = (canvas.width / 5) * 4 - 3 - this.h;
    }
    this.draw();
  }
}

//? POINTY OBJECTS NO ONE LIKES (YOU FOR EXAMPLE)

class cactus {
  constructor(h, w, s) {
    this.h = h;
    this.w = w;
    this.s = s;
    this.x = canvas.width;
    this.y = (canvas.width / 5) * 4 - 3 - this.h;
  }

  draw() {
    ctx.restore();
    ctx.fillStyle = "#FFA";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#FFA";

    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  move() {
    this.x -= this.s;
    let p = [
      [theFuckerTwo.x, theFuckerTwo.y],
      [theFuckerTwo.x + theFuckerTwo.w, theFuckerTwo.y],
      [theFuckerTwo.x + theFuckerTwo.w, theFuckerTwo.y + theFuckerTwo.h],
      [theFuckerTwo.x, theFuckerTwo.y + theFuckerTwo.h],
    ];
    let ast = [this.x, this.x + this.w, this.y, this.y + this.h];
    p.forEach((poo) => {
      if (poo[0] > ast[0] && poo[0] < ast[1] && poo[1] >= ast[3]) {
        if (reset == true) {
          reset = false;
          if (
            confirm(
              `You had ${scoreElm.innerHTML} points, click ok to retry, cancel for main page`
            )
          ) {
            console.log(poo);
            return location.reload();
          } else {
            p = [];
            return (window.location = "../HomePage.html");
          }
        }
      }
    });
    this.draw();
  }
}

//? MOVEMENT SCRIPT

document.addEventListener("keydown", (event) => {
  keyMap[event.key.toLowerCase()] = true;
});
document.addEventListener("keyup", (event) => {
  delete keyMap[event.key.toLowerCase()];
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
  ctx.fillStyle = "#FFF";
  ctx.fillRect(0, (canvas.height / 5) * 4 - 3, canvas.width, 6);

  shitsNobodyWantsOrNeedsButStillExistForSomeReasonButIdontFuckingKnowWhySoDealWithItAndDontComplainItsNotALongNameJustForAListOfObjectsThatExistOnThatFuckingPlaneItsNotLikeSomeoneIsGonnaSeeThisAnywayButIJustWantToTellYouReaderIsThatYouWastedASurprisingAmountOfTimeBecauseItsALongName.forEach(
    (shit) => {
      shit.move();
    }
  );
}

//? INIT

let theFuckerTwo = new hopper(60, 30, 12);
shitsNobodyWantsOrNeedsButStillExistForSomeReasonButIdontFuckingKnowWhySoDealWithItAndDontComplainItsNotALongNameJustForAListOfObjectsThatExistOnThatFuckingPlaneItsNotLikeSomeoneIsGonnaSeeThisAnywayButIJustWantToTellYouReaderIsThatYouWastedASurprisingAmountOfTimeBecauseItsALongName.push(
  theFuckerTwo
);

setInterval(
  function () {
    shitsNobodyWantsOrNeedsButStillExistForSomeReasonButIdontFuckingKnowWhySoDealWithItAndDontComplainItsNotALongNameJustForAListOfObjectsThatExistOnThatFuckingPlaneItsNotLikeSomeoneIsGonnaSeeThisAnywayButIJustWantToTellYouReaderIsThatYouWastedASurprisingAmountOfTimeBecauseItsALongName.push(
      new cactus(30, 20, 5)
    );
  },
  Math.random() > 0.5 ? 2500 : 3000
);

gameLoop();

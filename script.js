// Game constants

const inputDir = { x: 0, y: 0 };
const foodSound = new Audio("./music/food.mp3");
const moveSound = new Audio("./music/move.mp3");
const musicSound = new Audio("./music/music.mp3");
const gameOverSound = new Audio("./music/gameover.mp3");
const board = document.querySelector(".board");
let speed = 2;
let lastPaintTime = 0;
const snakeArr = [{ x: 14, y: 16 }];
const score = 0;

food = { x: 12, y: 10 };

// Game Functions
function main(cTime) {
  window.requestAnimationFrame(main);
  if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = cTime;
  gameEngine();
  // console.log(cTime);
}

function isCollide(sarr){
    return false;
}


function gameEngine() {
  // part 1 : updating snake array & food

  if(isCollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0 , y: 0};
    alert("Game Over , Press any key to continue");
    const snakeArr = [{ x: 14, y: 16 }];
    musicSound.play();
    score = 0;

  }

  // part 2 : display snake array & food

  //  displaysnake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // display food
  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Game logic

window.requestAnimationFrame(main);
window,
  addEventListener("keydown", (e) => {
    let inputDir = { x: 0, y: 0 };
    moveSound.play();
    switch (e.key) {
      case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x = 0;
        inputDir.y = -1;
        break;
      case "ArrowDown":
        console.log("ArrowDown");
        inputDir.x = 0;
        inputDir.y = 1;
        break;
      case "ArrowLeft":
        console.log("ArrowLeft");
        inputDir.x = -1;
        inputDir.y = 0;
        break;
      case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x = 1;
        inputDir.y = 0;
        break;
    default:
        break;
    }
  });

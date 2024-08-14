// Game constants

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("./music/food.mp3");
const moveSound = new Audio("./music/move.mp3");
const musicSound = new Audio("./music/music.mp3");
const gameOverSound = new Audio("./music/gameover.mp3");
const board = document.querySelector(".board");
let speed = 7;
let lastPaintTime = 0;
let snakeArr = [{ x: 14, y: 16 }];
let score = 0;

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

function isCollide(snake){
    // if snake bump into itself
    for ( let i = 1 ; i < snakeArr.length ; i++){
      if (snake[i].x === snake[0].x  &&  snake[i].y === snake[0].y){
        return true;
      }
    }
    // if snake bump into the wall 
    if ( snake[0].x >= 20 || snake[0].x <= 0 ||  snake[0].y >= 20 || snake[0].y <= 0 ){
      return true;
    }
    return false;
}


function gameEngine() {
  // musicSound.play()
  // part 1 : updating snake array & food

  if(isCollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0 , y: 0};
    alert("Game Over , Press any key to continue");
    snakeArr = [{ x: 14 , y: 16 }];
    musicSound.play();
    score = 0 ;
  }

  // if snake has eaten the food increment the score and regenerate the food

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    foodSound.play();
    score = score + 1 ;
    scoreBox.innerHTML = "Score " +  score;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y} );
    let a = 2;
    let b = 18;
    food = {x: Math.round( a + (b - a) * Math.random()), y: Math.round( a + (b - a) * Math.random()) }
  } 

  // moving snake 
  for (let i = snakeArr.length - 2 ; i >= 0 ; i--){
    snakeArr[ i+ 1] = {...snakeArr[i]};
  }

  snakeArr[0].x += inputDir.x ; 
  snakeArr[0].y += inputDir.y ;


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
window.addEventListener("keydown", (e) => {
    moveSound.play();
    switch (e.key) {
      case "ArrowUp":
        // console.log("ArrowUp");
        inputDir.x = 0;
        inputDir.y = -1;
        break;
      case "ArrowDown":
        // console.log("ArrowDown");
        inputDir.x = 0;
        inputDir.y = 1;
        break;
      case "ArrowLeft":
        // console.log("ArrowLeft");
        inputDir.x = -1;
        inputDir.y = 0;
        break;
      case "ArrowRight":
        // console.log("ArrowRight");
        inputDir.x = 1;
        inputDir.y = 0;
        break;
    default:
        break;
    }
  });

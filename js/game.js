// Переменные
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const snakeImg = new Image();
snakeImg.src = "img/snake.png";

const snakeHeadImg = new Image();
snakeHeadImg.src = "img/snake1.png";

const gameOver = document.querySelector("h1");
const restart = document.querySelector("h2");

let box = 32;

let score = 0;

let dir;

let foodForSnake = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

// События
document.addEventListener("keydown", direction);

document.addEventListener("keydown", event => {
  if (event.keyCode === 13) {
    window.location.reload();
  }
});

/***  Логика игры ***/

function drawGame() {
  // Рисуем поле
  ctx.drawImage(ground, 0, 0);
  // Рисуем яблоки
  ctx.drawImage(foodImg, foodForSnake.x, foodForSnake.y);
  // ctx.drawImage(foodImg, foodForSnake.x, foodForSnake.y);
  // Рисуем змейку
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      ctx.drawImage(snakeHeadImg, snake[i].x, snake[i].y, box, box);
    } else {
      ctx.drawImage(snakeImg, snake[i].x, snake[i].y, box, box);
    }
  }

  // Счетчик
  ctx.fillStyle = "lime";
  ctx.font = "35px Bradley Hand";
  ctx.fillText(score, box * 2.2, box * 1.6);

  // Условия движений
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == foodForSnake.x && snakeY == foodForSnake.y) {
    score++;
    foodForSnake = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    };
  } else {
    snake.pop();
  }

  if (
    snakeX < box ||
    snakeX > box * 17 ||
    snakeY < 3 * box ||
    snakeY > box * 17
  ) {
    clearInterval(game);
    gameOver.classList.remove("none");
    restart.classList.remove("none");
  }
  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);

  // Сложность
  if (score === 5) {
    clearInterval(game);
    game = setInterval(drawGame, 280);
  } else if (score === 12) {
    clearInterval(game);
    game = setInterval(drawGame, 220);
  } else if (score === 20) {
    clearInterval(game);
    game = setInterval(drawGame, 160);
  } else if (score === 28) {
    clearInterval(game);
    game = setInterval(drawGame, 100);
  } else if (score === 50) {
    clearInterval(game);
    game = setInterval(drawGame, 60);
  }
}

// Управление
function direction(event) {
  if (event.keyCode === 37 && dir !== "right") {
    dir = "left";
  } else if (event.keyCode === 38 && dir !== "down") {
    dir = "up";
  } else if (event.keyCode === 39 && dir !== "left") {
    dir = "right";
  } else if (event.keyCode === 40 && dir !== "up") {
    dir = "down";
  }
}

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
      gameOver.classList.remove("none");
      restart.classList.remove("none");
    }
  }
}

//скорость

let game = setInterval(drawGame, 340);


let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let rows = 20;
let cols = 20;
let snake = [{ x: 9, y: 3 }];
let food;
let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;
let direction = "LEFT";
let foodCollected = false;
let gameOver = false;
document.cookie = "HIGHSCORE: 0";

placeFood();
setInterval(gameLoop, 150);
document.getElementById("points").style.display = "none";
document.addEventListener("keydown", keyDown);

function start() {
  document.getElementById("start").style.display = "none";
  document.getElementById("points").style.display = "block";
  canvas.style.display = "block";
  placeFood();
  snake = [{ x: 9, y: 3 }];
  draw();
  gameOver = false;
}

function draw() {
  // Clear the canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "white";
  snake.forEach((part) => add(part.x, part.y));

  // Draw food
  ctx.fillStyle = "yellow";
  add(food.x, food.y);

  requestAnimationFrame(draw);
}

function add(x, y) {
  ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);
}

function shiftSnake() {
  for (let i = snake.length - 1; i > 0; i--) {
    const part = snake[i];
    const lastPart = snake[i - 1];

    part.x = lastPart.x;
    part.y = lastPart.y;
  }
}

function gameLoop() {
  testGameOver();
  if (gameOver) {
    stop();
  }
  if (foodCollected) {
    snake = [{ x: snake[0].x, y: snake[0].y }, ...snake];
    foodCollected = false;
  }
  document.getElementById("points").innerHTML = "Punkte: " + snake.length;
  shiftSnake();

  if (direction == "LEFT") snake[0].x--;
  if (direction == "RIGHT") snake[0].x++;
  if (direction == "UP") snake[0].y--;
  if (direction == "DOWN") snake[0].y++;
  goesOverCanvas();
  if (snake[0].x == food.x && snake[0].y == food.y) {
    placeFood();
    foodCollected = true;
  }
}
function goesOverCanvas() {
  if (snake[0].x < 0) {
    snake[0].x = cols - 1;
  }
  if (snake[0].x >= cols) {
    snake[0].x = 0;
  }
  if (snake[0].y < 0) {
    snake[0].y = rows - 1;
  }
  if (snake[0].y >= rows) {
    snake[0].y = 0;
  }
}
function testGameOver() {
  let firstPart = snake[0];
  let otherParts = snake.slice(1);
  let duplicatePart = otherParts.find(
    (part) => part.x == firstPart.x && part.y == firstPart.y
  );

  // Check for collision with the wall boundaries
  if (duplicatePart) {
    document.getElementById("points").innerHTML = "";
    gameOver = true;
    let highScore = document.cookie.split(" ")[1];
    if (snake.length > highScore) {
      alert("New Highscore: " + snake.length);
      document.cookie = "HIGHSCORE: " + snake.length;
    }
  }
}

function drawGameOver() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "red";
  ctx.font = "30px Arial";
  ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2 - 30);

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(
    "Your Score: " + snake.length,
    canvas.width / 2 - 60,
    canvas.height / 2 + 20
  );

  ctx.fillStyle = "yellow";
  ctx.font = "15px Arial";
  ctx.fillText(
    "Press 'R' to restart",
    canvas.width / 2 - 75,
    canvas.height / 2 + 60
  );
}

function keyDown(e) {
  if (e.keyCode == 37) {
    direction = "LEFT";
  }
  if (e.keyCode == 38) {
    direction = "UP";
  }
  if (e.keyCode == 39) {
    direction = "RIGHT";
  }
  if (e.keyCode == 40) {
    direction = "DOWN";
  }
  if (e.keyCode == 82 && gameOver) {
    start();
  }
}

function placeFood() {
  let randomX = Math.floor(Math.random() * cols);
  let randomY = Math.floor(Math.random() * rows);
  food = { x: randomX, y: randomY };
}

function stop() {
  document.getElementById("start").style.display = "block"; // Show the start button
  document.getElementById("points").innerHTML = "";
  document.getElementById("canvas").style.display = "none"; // Hide the canvas
}
/*
function autoPlay() {
  if (!gameOver) {
    const dx = snake[0].x - food.x;
    const dy = snake[0].y - food.y;

    const allowedDirections = [];
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) allowedDirections.push("LEFT");
      if (dx < 0) allowedDirections.push("RIGHT");
    } else {
      if (dy > 0) allowedDirections.push("UP");
      if (dy < 0) allowedDirections.push("DOWN");
    }
   

    // Choose a direction based on allowed directions and no collision
    direction = allowedDirections.find((dir) => !isCollision(dir)) || direction;
    
  }
}

function isCollision(newDirection) {
  // Check if moving in the new direction would cause a collision with the snake
  const nextX =
    snake[0].x +
    (newDirection === "LEFT" ? -1 : newDirection === "RIGHT" ? 1 : 0);
  if (nextX < 0) nextX = cols - 1;
  if (nextX >= cols) nextX = 0;
  const nextY =
    snake[0].y + (newDirection === "UP" ? -1 : newDirection === "DOWN" ? 1 : 0);
  if (nextY < 0) nextY = rows - 1;
  if (nextY >= rows) nextY = 0;
  if(snake.some((part) => part.x === nextX && part.y === nextY)) alert("Collision")
  // Check for collision with any part of the snake's body
  return snake.some((part) => part.x === nextX && part.y === nextY);
} 
*/

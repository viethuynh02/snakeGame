//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake
var snakeX = 3 * blockSize;
var snakeY = 3 * blockSize;

var velocityX = 0;
var velocityY = 0;

//apple
var appleX;
var appleY;



window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeApple ();
    document.addEventListener('keyup', changeDrection);
    
}
setInterval(update, 100);

function update() {
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(appleX, appleY, blockSize, blockSize);

    snakeEat ();

    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillStyle="green";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
}

//random place apple
function placeApple() {
    appleX = Math.floor(Math.random() * cols) * blockSize;
    appleY = Math.floor(Math.random() * rows) * blockSize;  
}

function changeDrection(e) {
    if (e.code == "ArrowUp"){
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown"){
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowRight"){
        velocityX = 1;
        velocityY = 0;
    }
    else if (e.code == "ArrowLeft"){
        velocityX = -1;
        velocityY = 0;
    }
}

function snakeEat() {
    if (snakeX == appleX && snakeY == appleY){
        placeApple();
    }
}
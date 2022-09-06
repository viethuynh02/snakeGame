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

var snakeBody = [];

var score = 0;
document.getElementById('score').innerHTML = score;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); 

    placeApple ();
    document.addEventListener('keyup', changeDrection);
    const snakeInterval = setInterval(update, 100);
}


function update() {
    

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(appleX, appleY, blockSize, blockSize);

    snakeEat ();
    for (let i = snakeBody.length - 1; i > 0; i-- ){
        snakeBody[i] = snakeBody [i-1]
    }
    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillStyle="green";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over
    if (snakeX < 0 || snakeX > 20 * blockSize || snakeY < 0 || snakeY > 20 * blockSize){
        alert ("Game over");
        clearInterval(snakeInterval);
    }
    for (i = 1; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            alert ("Game over");
        }
    }
}

function snakeEat() {
    if (snakeX == appleX && snakeY == appleY){
        snakeBody.push([appleX, appleY]);
        placeApple();
        score ++;
        document.getElementById('score').innerHTML = score;
    }
}

//random place apple
function placeApple() {
    appleX = Math.floor(Math.random() * cols) * blockSize;
    appleY = Math.floor(Math.random() * rows) * blockSize;  
}

function changeDrection(e) {
    if (e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }

}


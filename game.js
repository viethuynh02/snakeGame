//board
var blockSize = 25;
var rows = 17;
var cols = 25;
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

let speed = 10;
let appleScore = 1;


//walls
let wall1 = [];
let wall2 = [];

let myInterval = setInterval(update, 1000/speed);
window.onload = function start() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); 

    level();
    document.addEventListener('keyup', changeDrection);
    placeApple ();
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

    //draw walls
    context.fillStyle = "bisque";
    for (let i = 0; i < 11; i++){
        wall1.push([7 * blockSize, i * blockSize])
        wall2.push([14 * blockSize, (16 - i) * blockSize])
        context.fillRect(wall1 [i][0], wall1 [i][1], blockSize, blockSize);
        context.fillRect(wall2 [i][0], wall2 [i][1], blockSize, blockSize);
    }

    //game over
    if (snakeX < 0 || snakeX == 25 * blockSize || snakeY < 0 || snakeY == 17 * blockSize){
        alert ("Game over");
        resetGame ();
    }
    for (i = 1; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            alert ("Game over");
            resetGame ();
        }
    }
    for (let i = 0; i < 11; i++){
        if (snakeX == wall1[i][0] && snakeY == wall1[i][1]){
            alert ("Game over");
            resetGame ();
        }
        if (snakeX == wall2[i][0] && snakeY == wall2[i][1]){
            alert ("Game over");
            resetGame ();
        }
    }
}

function snakeEat() {
    if (snakeX == appleX && snakeY == appleY){
        snakeBody.push([appleX, appleY]);
        placeApple();
        score += appleScore;
        document.getElementById('score').innerHTML = score;
    }
}

//random place apple
function placeApple() {
    let a = false;
    do {
        a = false;
        appleX = Math.floor(Math.random() * cols) * blockSize;
        appleY = Math.floor(Math.random() * rows) * blockSize;  
        for (let i = 0; i < 11; i++){
            if (appleX == wall1[i][0] && appleY == wall1[i][1]){
                a = true;         
            }
            if (appleX == wall2[i][0] && appleX== wall2[i][1]){
                a = true;
            }
        }
    } while (a)
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

function resetGame (){
    //snake
    snakeX = 3 * blockSize;
    snakeY = 3 * blockSize;

    velocityX = 0;
    velocityY = 0;

    snakeBody = [];

    score = 0;
    document.getElementById('score').innerHTML = score;
}



function level () {
    const element1 = document.getElementById("levelEasy");
        element1.addEventListener("click", levelEasy);
    const element2 = document.getElementById("levelNormal");
        element2.addEventListener("click", levelNormal);
    const element3 = document.getElementById("levelHard");
        element3.addEventListener("click", levelHard);
}
function levelEasy (){
    speed = 1;
    appleScore = 1;
    console.log(speed);
    clearInterval(myInterval)
    let myInterval = setInterval(update, 1000/speed);
}

function levelNormal (){
    speed = 10;
    appleScore = 5;
    console.log(speed);
    clearInterval(myInterval)
    let myInterval = setInterval(update, 1000/speed);
}

function levelHard (){
    speed = 60;
    appleScore = 10;
    console.log(speed);
    clearInterval(myInterval)
    let myInterval = setInterval(update, 1000/speed);
}

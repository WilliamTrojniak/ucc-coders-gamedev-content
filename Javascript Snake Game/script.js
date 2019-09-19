//HTML Element Information
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//Frame Rate Limit
var lastFrameTimeMS = 0;
const maxFPS = 10;

//Game State Control
var startHasDrawn = false;
var gameStateEnum = {
    START: 1,
    PLAY: 2,
    PAUSE: 3,
    GAMEOVER: 4,
}
var gameState = gameStateEnum.START;

//Font Settings
var scoreFont = "30px Arial";
var scoreFontColour = "#FFFF00";
var gameStateFont = "70px Arial";
var gameStateFontAlt = "35px Arial";
var gameStateFontColour = "#FFFFFF";

//Game Settings
const columnCount = 15;
const rowCount = 15;
const boxSize = 32;
const tileColours = ["#38732F", "#38732F"]; //Can be set to different colours for checkerboard pattern

//Tile Array
var tiles = [];
for(var c = 0; c < columnCount; c++){
    for(var r = 0; r < rowCount; r++){
        tiles.push([r, c])
    }
}

//Scoring Settings
var score = 0;
var scoreIncrement = 100;

//Snake Settings
const snakeColours = ["#0055FF","#0000FF"];
var snake = [{x: 7, y: 7}, {x: 7, y: 8}, {x:7, y: 9}];

//Movement Information & Control
var directionEnum = {
    LEFT: 1,
    UP: 2,
    RIGHT: 3,
    DOWN: 4,
}
var direction = 0;
var canChangeDirection = true;

//Apple Settings
const appleColour = "#FF0000";
var apple = {
    x:0,
    y:0
}

function DrawBG(){
    for(var c = 0; c < columnCount; c++){
        for(var r = 0; r < rowCount; r++){

            //Alternate Tile Colours
            ctx.fillStyle = tileColours[(r+c)%2];
            
            //Draw tiles
            ctx.fillRect(c*boxSize, r*boxSize, boxSize, boxSize );

        }
    }
}

document.addEventListener("keydown", TakeInput);
function TakeInput(event){
    //Directional Movement
    if(canChangeDirection){
        if((event.keyCode == 37 || event.keyCode == 65) && direction != directionEnum.RIGHT && (gameState == gameStateEnum.PLAY || gameState == gameStateEnum.START)){
            direction = directionEnum.LEFT;
            canChangeDirection = false;
            gameState = gameStateEnum.PLAY;
        }else if((event.keyCode == 38 || event.keyCode == 87) && direction != directionEnum.DOWN && (gameState == gameStateEnum.PLAY || gameState == gameStateEnum.START)){
            direction = directionEnum.UP;
            canChangeDirection = false;
            gameState = gameStateEnum.PLAY;
        }else if((event.keyCode == 39 || event.keyCode == 68) && direction != directionEnum.LEFT && (gameState == gameStateEnum.PLAY || gameState == gameStateEnum.START)){
            direction = directionEnum.RIGHT;
            canChangeDirection = false;
            gameState = gameStateEnum.PLAY;
        }else if((event.keyCode == 40 || event.keyCode == 83) && direction != directionEnum.UP && gameState == gameStateEnum.PLAY){
            direction = directionEnum.DOWN;
            canChangeDirection = false;
        }
    }
    //Check if ESC key is pressed and pause/unpause game
    if(event.keyCode == 27){
        if(gameState == gameStateEnum.PLAY){
            gameState = gameStateEnum.PAUSE;
        }else if(gameState == gameStateEnum.PAUSE){
            gameState = gameStateEnum.PLAY;
        }
    }
    //Check if SPACE key is pressed and restart game
    if(event.keyCode == 32 && gameState == gameStateEnum.GAMEOVER){
        gameState = gameStateEnum.START;
    }
}

function MoveSnake(){   
    if(direction == directionEnum.LEFT){ 
        snake.unshift({x: snake[0].x - 1, y: snake[0].y})
    }else if(direction == directionEnum.UP){  
        snake.unshift({x: snake[0].x, y: snake[0].y-1})
    }else if (direction == directionEnum.RIGHT){
        snake.unshift({x: snake[0].x + 1, y: snake[0].y})
    }else if (direction == directionEnum.DOWN){
        snake.unshift({x: snake[0].x, y: snake[0].y+1})
    }

    canChangeDirection = true;
    
    CheckForSnakeCollision();
}

function CheckForSnakeCollision(){
    //Check for collision with apple
    if(snake[0].x == apple.x && snake[0].y == apple.y){
        CollectApple();
        return;
    }

    //Check for collision with outer walls
    if(snake[0].x < 0 || snake[0].x >= columnCount || snake[0].y < 0 || snake[0].y >= rowCount){
        gameState = gameStateEnum.GAMEOVER;
        snake.shift();
        return;
    }

    //Check for collison with self
    for(var i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            snake.shift();
            gameState = gameStateEnum.GAMEOVER;
            return;
        }
    }
    snake.pop();
}

function DrawSnake(){   
    for(var i = 0; i < snake.length; i++){
        if(i == 0){
            ctx.fillStyle = snakeColours[0];
        }else{
            ctx.fillStyle = snakeColours[1];
        }
        ctx.fillRect(snake[i].x * boxSize, snake[i].y * boxSize, boxSize, boxSize);
    }
}

function DrawApple(){
    ctx.fillStyle = appleColour;
    ctx.fillRect(apple.x*boxSize, apple.y*boxSize, boxSize, boxSize);
}

function CollectApple(){
    IncreaseScore();
    MoveApple(); 
}

function IncreaseScore(){
    score += scoreIncrement;    
}

function DrawScore(){
    ctx.textAlign = "left";
    ctx.fillStyle = scoreFontColour;
    ctx.font = scoreFont;
    ctx.fillText("Score: ", 8, 28);
    ctx.fillText(score, 100, 28);
}

function MoveApple(){
    var availableTiles = GetAvailableTiles();
    var newCoordinates = Math.floor(Math.random() * availableTiles.length);
    apple.x = availableTiles[newCoordinates][0];
    apple.y = availableTiles[newCoordinates][1];
}

function GetAvailableTiles(){
    return availableTiles = tiles.filter(function(value, index, arr){    
        for(var t = 0; t < snake.length; t++){
            if(snake[t].x == value[0] && snake[t].y == value[1]){
                return false;
            }
        }
        return true;  
    });
}


function StartScene(){
    if(!startHasDrawn){
        score = 0;
        snake = [{x: 7, y: 7}, {x: 7, y: 8}, {x:7, y: 9}];
        MoveApple();
    }
    DrawBG();
    DrawSnake();
    DrawApple();
    DrawScore();
    startHasDrawn = true;
}

function PlayScene(){
    DrawBG();
    MoveSnake();
    DrawSnake();
    DrawApple();
    DrawScore();   
}

function PauseScene(){
    ctx.textAlign = "center";
    ctx.fillStyle = gameStateFontColour;
    ctx.font = gameStateFont;
    ctx.fillText("PAUSED", 240, 240);
}

function GameoverScene(){
    ctx.textAlign = "center";
    ctx.fillStyle = gameStateFontColour;
    ctx.font = gameStateFont;
    ctx.fillText("GAME OVER", 240, 240);
    ctx.font = gameStateFontAlt;
    ctx.fillText("Press SPACE", 240, 300);
}

function MainLoop(timestamp){
    if(timestamp < lastFrameTimeMS + (1000 / maxFPS)){
        requestAnimationFrame(MainLoop);
        return;
    }
    lastFrameTimeMS = timestamp;   

    if(gameState == gameStateEnum.START){
        StartScene();
    }else if(gameState == gameStateEnum.PLAY){
        PlayScene();
    }else if(gameState == gameStateEnum.PAUSE){
        PauseScene();
    }else if(gameState == gameStateEnum.GAMEOVER){
        GameoverScene();
    }

    if(startHasDrawn && gameState != gameStateEnum.START){
        startHasDrawn = false;
    }
    
    requestAnimationFrame(MainLoop);
}

requestAnimationFrame(MainLoop);
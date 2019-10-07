
const paddle = new Paddle(canvas.width/2 - 42, 550, 85, 13);
const ball = new Ball(50, 50, 10, 7, 7, paddle);
const brick = new Brick(100, 100, 300, 10, ball, 1);

canvas.addEventListener("mousemove", TakeInput);
function TakeInput(event){
    paddle.move(event.clientX);
}

function clearScreen(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Main Game Loop
function main(){
    clearScreen();
    paddle.update();
    ball.update();
    brick.update();
    requestAnimationFrame(main);

}

requestAnimationFrame(main);